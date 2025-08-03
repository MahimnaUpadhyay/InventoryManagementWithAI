import pandas as pd
from transformers import pipeline
from sentence_transformers import SentenceTransformer, util
import torch
from config import MYSQL_CONFIG

# Loading table data from MySQL
def load_data_mysql():
    import mysql.connector
    conn = mysql.connector.connect(**MYSQL_CONFIG)
    df = pd.read_sql("SELECT * FROM grocery_inventory_1", conn)
    conn.close()
    return preprocess(df)

# Removing null values in table as well as parsing Unit_Price
def preprocess(df):
    df.fillna("", inplace=True)
    df["Parsed_Price"] = df["Unit_Price"].replace(r'[\$,]', '', regex=True).astype(float)
    return df

# Converting records into a text
def row_to_text(row):
    return (
        f"Product: {row['Product_Name']}, Category: {row['Catagory']}, "
        f"Supplier: {row['Supplier_Name']}, Warehouse: {row['Warehouse_Location']}, "
        f"Status: {row['Status']}, Stock: {row['Stock_Quantity']} units, "
        f"Price: {row['Unit_Price']}, Sales Volume: {row['Sales_Volume']}."
    )

# Function for rule based response
def rule_based_response(df, question):
    q = question.lower()
    if "low in stock" in q:
        rows = df[df["Stock_Quantity"] < df["Reorder_Level"]]
    elif "highest sales" in q:
        rows = df[df["Sales_Volume"] == df["Sales_Volume"].max()]
    elif "discontinued" in q:
        rows = df[df["Status"].str.lower() == "discontinued"]
    elif "cheapest" in q:
        rows = df[df["Parsed_Price"] == df["Parsed_Price"].min()]
    elif "most expensive" in q:
        rows = df[df["Parsed_Price"] == df["Parsed_Price"].max()]
    elif "out of stock" in q:
        rows = df[df["Stock_Quantity"] == 0]
    else:
        return None
    return "\n".join(rows["Product_Name"].tolist()) or "No matching products."

# Load models
embedder = SentenceTransformer("all-MiniLM-L6-v2")
qa_pipeline = pipeline("question-answering", model="deepset/roberta-base-squad2", tokenizer="deepset/roberta-base-squad2", device=0 if torch.cuda.is_available() else -1)

# Embeding the answer
def embed_and_answer(df, question):
    texts = df.apply(row_to_text, axis=1).tolist()
    context_embeddings = embedder.encode(texts, convert_to_tensor=True)
    question_embedding = embedder.encode(question, convert_to_tensor=True)
    hits = util.semantic_search(question_embedding, context_embeddings, top_k=5)[0]
    context = " ".join([texts[hit['corpus_id']] for hit in hits])
    result = qa_pipeline(question=question, context=context)
    return result["answer"], round(result["score"], 4)