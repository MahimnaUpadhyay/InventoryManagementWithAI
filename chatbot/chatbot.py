import json
import torch
import pandas as pd
from rapidfuzz import process, fuzz
from transformers import pipeline
from sentence_transformers import SentenceTransformer, util
from config import MYSQL_CONFIG


# ----------------------------
# Global setup (load once)
# ----------------------------

# Load intents
with open("intents.json", "r", encoding="utf-8") as f:
    INTENTS = json.load(f)

# Sentence embedder
EMBEDDER = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# Precompute intent embeddings once
intent_texts = []
intent_labels = []
for intent, examples in INTENTS.items():
    for ex in examples:
        intent_texts.append(ex)
        intent_labels.append(intent)

INTENT_EMBEDDINGS = EMBEDDER.encode(intent_texts, convert_to_tensor=True)

# QA pipeline
QA_PIPELINE = pipeline(
    "question-answering",
    model="deepset/roberta-base-squad2",
    tokenizer="deepset/roberta-base-squad2",
    device=0 if torch.cuda.is_available() else -1,
)


# ----------------------------
# Data loading and preprocessing
# ----------------------------

def load_data_mysql():
    import mysql.connector

    conn = mysql.connector.connect(**MYSQL_CONFIG)
    df = pd.read_sql("SELECT * FROM grocery_inventory_1", conn)
    conn.close()
    return preprocess(df)


def preprocess(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df.fillna("", inplace=True)

    # Robust price parsing
    df["Parsed_Price"] = (
        df["Unit_Price"]
        .astype(str)
        .replace(r"[\$,]", "", regex=True)
        .astype(float)
    )

    # Ensure numeric columns
    for col in ["Stock_Quantity", "Reorder_Level", "Sales_Volume"]:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0).astype(int)

    return df


def row_to_text(row: pd.Series) -> str:
    return (
        f"Product: {row.get('Product_Name', '')}, "
        f"Category: {row.get('Catagory', '')}, "
        f"Supplier: {row.get('Supplier_Name', '')}, "
        f"Warehouse: {row.get('Warehouse_Location', '')}, "
        f"Status: {row.get('Status', '')}, "
        f"Stock: {row.get('Stock_Quantity', '')} units, "
        f"Price: {row.get('Unit_Price', '')}, "
        f"Sales Volume: {row.get('Sales_Volume', '')}."
    )


# ----------------------------
# Intent matching
# ----------------------------

def fuzzy_intent_match(question: str, threshold: int = 70):
    q = question.lower()
    best_intent = None
    best_score = 0

    for intent, phrases in INTENTS.items():
        match = process.extractOne(q, phrases, scorer=fuzz.partial_ratio)
        if match is None:
            continue
        _, score, _ = match
        if score > best_score:
            best_score = score
            best_intent = intent

    if best_score >= threshold:
        return best_intent, best_score / 100.0

    return None, 0.0


def semantic_intent_match(question: str, threshold: float = 0.6):
    q_emb = EMBEDDER.encode(question, convert_to_tensor=True)
    cos_scores = util.cos_sim(q_emb, INTENT_EMBEDDINGS)[0]
    best_idx = torch.argmax(cos_scores).item()
    best_score = cos_scores[best_idx].item()

    if best_score >= threshold:
        return intent_labels[best_idx], best_score

    return None, 0.0


def detect_intent(question: str):
    # 1) Fuzzy
    intent, score = fuzzy_intent_match(question)
    if intent is not None:
        return intent, round(score, 4)

    # 2) Semantic
    intent, score = semantic_intent_match(question)
    if intent is not None:
        return intent, round(score, 4)

    return None, 0.0


# ----------------------------
# Intent-based response
# ----------------------------
def intent_response(df: pd.DataFrame, intent: str):
    if intent == "low_stock":
        if "Reorder_Level" not in df.columns:
            return "Reorder level information is not available.", []
        rows = df[df["Stock_Quantity"] < df["Reorder_Level"]]

    elif intent == "highest_sales":
        if "Sales_Volume" not in df.columns:
            return "Sales volume information is not available.", []
        max_sales = df["Sales_Volume"].max()
        rows = df[df["Sales_Volume"] == max_sales]

    elif intent == "discontinued":
        rows = df[df["Status"].str.lower() == "discontinued"]

    elif intent == "cheapest":
        min_price = df["Parsed_Price"].min()
        rows = df[df["Parsed_Price"] == min_price]

    elif intent == "expensive":
        max_price = df["Parsed_Price"].max()
        rows = df[df["Parsed_Price"] == max_price]

    elif intent == "out_of_stock":
        rows = df[df["Stock_Quantity"] == 0]

    else:
        return "No matching intent found.", []

    if rows.empty:
        return "No matching products.", []

    rows = rows.sample(frac=1, random_state=None)

    products = rows["Product_Name"].astype(str).tolist()
    text = "\n".join(products)

    return text, products

# ----------------------------
# QA fallback with caching
# ----------------------------

class InventoryEmbedder:
    """
    Cache inventory texts + embeddings so they are computed once.
    """

    def __init__(self, df: pd.DataFrame):
        self.df = df
        self.texts = df.apply(row_to_text, axis=1).tolist()
        self.embeddings = EMBEDDER.encode(self.texts, convert_to_tensor=True)

    def answer(self, question: str, top_k: int = 5):
        q_emb = EMBEDDER.encode(question, convert_to_tensor=True)
        hits = util.semantic_search(q_emb, self.embeddings, top_k=top_k)[0]
        context = " ".join([self.texts[hit["corpus_id"]] for hit in hits])
        result = QA_PIPELINE(question=question, context=context)
        return result.get("answer", ""), float(result.get("score", 0.0))


# ----------------------------
# Chatbot factory (stateful)
# ----------------------------

def build_chatbot(df: pd.DataFrame):
    inventory = InventoryEmbedder(df)

    def chatbot(question: str):
        intent, intent_score = detect_intent(question)

        if intent is not None:
            text, products = intent_response(df, intent)
            return {
                "mode": "intent",
                "intent": intent,
                "intent_score": intent_score,
                "answer": text,
                "products": products,   # <--- new
            }

        answer, qa_score = inventory.answer(question)
        return {
            "mode": "qa",
            "intent": None,
            "intent_score": 0.0,
            "answer": answer,
            "qa_score": round(qa_score, 4),
        }

    return chatbot
