import os
from openai import OpenAI
from fastapi import Body

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)

@app.post("/coach")
def coach(prompt: dict = Body(...)):
    q = prompt.get("prompt", "")
    completion = client.chat.completions.create(
        model="gpt-5",
        messages=[
            {"role": "system", "content": "You are Future Fayaz, an identity coach who speaks directly, calmly, and helps Fayaz embody his millionaire self."},
            {"role": "user", "content": q}
        ],
        max_tokens=200
    )
    return completion.choices[0].message.content
