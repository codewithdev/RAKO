from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import openai
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.post("/generate_next_paragraph")
async def generate_next_paragraph(request: Request):
    body = await request.json()
    text = body.get('text') 

    prediction = openai.Completion.create(
        model="text-davinci-002",  
        prompt=text,
        max_tokens=40
    )
    next_paragraph = prediction.choices[0].text.strip()
    
    return {"nextParagraph": next_paragraph}
