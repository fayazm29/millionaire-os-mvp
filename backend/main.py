import os
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI

# --- Initialize app ---
app = FastAPI(title="Millionaire OS Backend", version="1.1")

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
    user_name = prompt.get("user_name", "Friend")
    q = prompt.get("prompt", "")

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
            model="gpt-4o-mini",  # ✅ use this instead of gpt-5
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

        print("✅ AI Coach reply:", reply)  # ✅ local debug print

        return {
            "user": user_name,
            "reply": reply.strip(),
        }

    except Exception as e:
        print("❌ AI Coach error:", str(e))  # ✅ debug visible in terminal
        return {
            "error": "Coach unavailable right now. Please try again shortly.",
            "details": str(e)[:200],
        }
