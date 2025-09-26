from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import joblib
import pandas as pd

# Import chatbot function
from chatbot import load_data_mysql, chatbot

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load chatbot data
df = load_data_mysql()

# Load trained ML model + feature columns
model = joblib.load("linear_model.pkl")
feature_columns = joblib.load("feature_columns.pkl")

# Request models
class Query(BaseModel):
    question: str

class ForecastInput(BaseModel):
    Catagory: str
    Stock_Quantity: int
    Unit_Price: float
    Date_Received: str
    Last_Order_Date: str
    Sales_Volume: int


# Preprocess function (same as training pipeline)
def preprocess_input(data: dict):
    df = pd.DataFrame([data])

    # Convert to correct types
    df["Unit_Price"] = df["Unit_Price"].astype(float)
    df["Date_Received"] = pd.to_datetime(df["Date_Received"])
    df["Last_Order_Date"] = pd.to_datetime(df["Last_Order_Date"])

    # Extract date parts
    df["received_year"] = df["Date_Received"].dt.year
    df["received_month"] = df["Date_Received"].dt.month
    df["received_day"] = df["Date_Received"].dt.day

    df["order_year"] = df["Last_Order_Date"].dt.year
    df["order_month"] = df["Last_Order_Date"].dt.month
    df["order_day"] = df["Last_Order_Date"].dt.day

    # Days between
    df["days_between"] = (df["Last_Order_Date"] - df["Date_Received"]).dt.days

    # Lag & rolling (placeholder with Sales_Volume since single-row)
    for lag in [1, 3, 7]:
        df[f"sales_lag_{lag}"] = df["Sales_Volume"]

    df["sales_roll_3"] = df["Sales_Volume"]
    df["sales_roll_7"] = df["Sales_Volume"]

    # Derived feature
    df["price_stock"] = df["Unit_Price"] * df["Stock_Quantity"]

    # Drop raw dates
    df = df.drop(columns=["Date_Received", "Last_Order_Date"])

    # One-hot encode category
    df = pd.get_dummies(df, columns=["Catagory"], drop_first=True)

    # Align with training features
    df = df.reindex(columns=feature_columns, fill_value=0)

    return df


# Chatbot endpoint
@app.post("/askQuestion")
async def ask_question(query: Query):
    try:
        answer, confidence = chatbot(df, query.question)
        return {"answer": answer, "confidence": confidence}
    except Exception as e:
        return {"error": str(e)}


# Forecast endpoint
@app.post("/forecast")
async def forecast(data: ForecastInput):
    try:
        input_df = preprocess_input(data.dict())
        prediction = model.predict(input_df)[0]
        return {"forecasted_sales": float(prediction)}
    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
