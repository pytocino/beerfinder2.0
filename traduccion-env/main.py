from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from deep_translator import GoogleTranslator

app = FastAPI()

# Habilitar CORS para tu dominio (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Frontend (React) en este caso
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)

class TranslateRequest(BaseModel):
    text: str
    source: str = 'auto'
    target: str = 'en'

@app.post("/api/translate/")
async def translate(request: TranslateRequest):
    try:
        translated_text = GoogleTranslator(source=request.source, target=request.target).translate(request.text)
        return {"translated_text": translated_text}
    except Exception as e:
        return {"error": str(e)}
