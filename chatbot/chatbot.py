import pandas as pd
from transformers import pipeline
from sentence_transformers import SentenceTransformer, util
import torch
import json
from rapidfuzz import process, fuzz
from config import MYSQL_CONFIG


# Load data from MySQL
def load_data_mysql():
    import mysql.connector
    conn = mysql.connector.connect(**MYSQL_CONFIG)
    df = pd.read_sql("SELECT * FROM grocery_inventory_1", conn)
    conn.close()
    return preprocess(df)


def preprocess(df):
    df.fillna("", inplace=True)
    df["Parsed_Price"] = df["Unit_Price"].replace(r'[\$,]', '', regex=True).astype(float)
    return df


# Converting row into text
def row_to_text(row):
    return (
        f"Product: {row['Product_Name']}, Category: {row['Catagory']}, "
        f"Supplier: {row['Supplier_Name']}, Warehouse: {row['Warehouse_Location']}, "
        f"Status: {row['Status']}, Stock: {row['Stock_Quantity']} units, "
        f"Price: {row['Unit_Price']}, Sales Volume: {row['Sales_Volume']}."
    )


# Loading Intents (Hindi + English)
with open("intents.json", "r", encoding="utf-8") as f:
    INTENTS = json.load(f)

# Flatten examples for embedding
embedder = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
intent_examples = []
intent_labels = []
for intent, examples in INTENTS.items():
    for ex in examples:
        intent_examples.append(embedder.encode(ex, convert_to_tensor=True))
        intent_labels.append(intent)
intent_embeddings = torch.stack(intent_examples)


# Fuzzy Matching
def fuzzy_intent_match(question, threshold=70):
    question = question.lower()
    for intent, phrases in INTENTS.items():
        match, score, _ = process.extractOne(question, phrases, scorer=fuzz.partial_ratio)
        if score >= threshold:
            return intent
    return None


# Embedding-based Matching
def semantic_intent_match(question, threshold=0.6):
    q_emb = embedder.encode(question, convert_to_tensor=True)
    cos_scores = util.cos_sim(q_emb, intent_embeddings)[0]
    best_idx = torch.argmax(cos_scores).item()
    best_score = cos_scores[best_idx].item()
    if best_score >= threshold:
        return intent_labels[best_idx]
    return None


# Intent-based Response
def intent_response(df, intent):
    if intent == "low_stock":
        rows = df[df["Stock_Quantity"] < df["Reorder_Level"]]
    elif intent == "highest_sales":
        rows = df[df["Sales_Volume"] == df["Sales_Volume"].max()]
    elif intent == "discontinued":
        rows = df[df["Status"].str.lower() == "discontinued"]
    elif intent == "cheapest":
        rows = df[df["Parsed_Price"] == df["Parsed_Price"].min()]
    elif intent == "expensive":
        rows = df[df["Parsed_Price"] == df["Parsed_Price"].max()]
    elif intent == "out_of_stock":
        rows = df[df["Stock_Quantity"] == 0]
    else:
        return None

    return "\n".join(rows["Product_Name"].tolist()) or "No matching products."


# QA Pipeline Fallback
qa_pipeline = pipeline(
    "question-answering",
    model="timpal0l/mdeberta-v3-base-squad2",
    tokenizer="timpal0l/mdeberta-v3-base-squad2",
    device=0 if torch.cuda.is_available() else -1,
)


def embed_and_answer(df, question):
    texts = df.apply(row_to_text, axis=1).tolist()
    context_embeddings = embedder.encode(texts, convert_to_tensor=True)
    question_embedding = embedder.encode(question, convert_to_tensor=True)
    hits = util.semantic_search(question_embedding, context_embeddings, top_k=5)[0]
    context = " ".join([texts[hit['corpus_id']] for hit in hits])
    result = qa_pipeline(question=question, context=context)
    return result["answer"], round(result["score"], 4)


# Master chatbot function
def chatbot(df, question):
    # Try fuzzy intent
    intent = fuzzy_intent_match(question)
    if intent:
        return intent_response(df, intent)

    # Try semantic intent
    intent = semantic_intent_match(question)
    if intent:
        return intent_response(df, intent)

    # Fallback to QA pipeline
    answer, score = embed_and_answer(df, question)
    return f"Answer: {answer} (confidence: {score})"
