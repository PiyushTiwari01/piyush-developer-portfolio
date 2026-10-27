import os
from datetime import datetime, timezone
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

app = FastAPI(title="Piyush Portfolio API", version="1.0.0")
origins = [x.strip() for x in os.getenv("ALLOWED_ORIGINS", "*").split(",") if x.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if "*" in origins else origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

class ContactMessage(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(min_length=3, max_length=160)
    message: str = Field(min_length=10, max_length=5000)

@app.get("/")
def root():
    return {"message": "Piyush Portfolio API", "docs": "/docs", "health": "/health"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/api/contact")
def contact(payload: ContactMessage):
    # Starter implementation: validate and log the message.
    # Connect an email provider or database before using this as a production inbox.
    print({
        "received_at": datetime.now(timezone.utc).isoformat(),
        "name": payload.name,
        "email": payload.email,
        "subject": payload.subject,
        "message": payload.message,
    }, flush=True)
    return {"ok": True, "message": "Thanks! Your message was received."}
