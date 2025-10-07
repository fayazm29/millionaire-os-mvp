import os
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI

app = FastAPI(title="Millionaire OS Backend", version="1.1")

# Allow access from your frontends
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

@app.get("/")
def root():
    return {"status": "ok", "message": "Millionaire OS backend running"}

# --- AI Coach Endpoint ---
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)

@app.post("/coach")
def coach(prompt: dict = Body(...)):
    """
    Personalised millionaire mindset coach.
    Expects JSON body like:
      {
        "user_name": "Aisha",
        "prompt": "I feel anxious about money lately."
      }
    """
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

    completion = client.chat.completions.create(
        model="gpt-5",
        messages=[
            {"role": "system", "content": system_message},
            {
                "role": "user",
                "content": (
                    f"The user’s name is {user_name}. "
                    f"Respond to them personally using their name in a natural way. "
                    f"Here’s their question or situation:\n\n{q}"
                ),
            },
        ],
        max_tokens=250,
    )

    return {
        "user": user_name,
        "reply": completion.choices[0].message.content.strip(),
    }
