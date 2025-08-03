from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from chatbot import load_data_mysql, rule_based_response, embed_and_answer

app = FastAPI()

origins = [
    "localhost:3000",
    "http://localhost:3000",
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


df = load_data_mysql()

class Query(BaseModel):
    question: str

@app.post("/askQuestion")
async def ask_question(query: Query):
    question = query.question

    rule_response = rule_based_response(df, question)
    if rule_response:
        return {"type": "rule-based", "answer": rule_response}

    try:
        answer, confidence = embed_and_answer(df, question)
        return {"type": "ml-based", "answer": answer, "confidence": confidence}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
