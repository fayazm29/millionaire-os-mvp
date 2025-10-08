import os
import logging
from datetime import datetime
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI

# --- Initialize app ---
app = FastAPI(title="Millionaire OS Backend", version="1.2")

# --- Logging setup ---
logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

# --- CORS setup ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://millionaireos.app",
        "https://millionaire-os-mvp.vercel.app",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Initialize OpenAI client ---
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)


@app.get("/")
def root():
    """Simple health check"""
    return {"status": "ok", "message": "Millionaire OS backend running"}


@app.post("/coach")
def coach(prompt: dict = Body(...)):
    """
    AI Success Coach endpoint
    Example payload:
      {
        "user_name": "Fayaz",
        "prompt": "How can I build a better morning routine?"
      }
    """
    user_name = prompt.get("user_name", "Friend")
    q = prompt.get("prompt", "").strip()

    # Log the incoming request
    short_q = (q[:70] + "...") if len(q) > 70 else q
    logging.info(f"🧠 {user_name} asked: {short_q}")

    system_message = (
        "You are an AI Success Coach from Millionaire OS. "
        "You speak with calm authority, helping people think, plan, "
        "and act like their higher, wealthier, more focused selves. "
        "You guide them to replace fear with clarity and procrastination "
        "with small, confident actions. Keep your tone practical, encouraging, "
        "and identity-shifting."
    )

    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_message},
                {
                    "role": "user",
                    "content": (
                        f"The user's name is {user_name}. "
                        f"Respond personally using their name naturally. "
                        f"Here’s their question:\n\n{q}"
                    ),
                },
            ],
            max_completion_tokens=250,
        )

        reply = completion.choices[0].message.content if completion.choices else "(no reply returned)"
        reply = reply.strip()

        token_count = len(reply.split())
        logging.info(f"✅ AI Coach reply sent to {user_name} ({token_count} words)")

        return {"user": user_name, "reply": reply}

    except Exception as e:
        logging.error(f"❌ AI Coach error for {user_name}: {str(e)}")
        return {
            "error": "Coach unavailable right now. Please try again shortly.",
            "details": str(e)[:200],
        }
