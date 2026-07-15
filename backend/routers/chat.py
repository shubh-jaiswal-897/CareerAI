from fastapi import APIRouter
from pydantic import BaseModel
from ai_service import generate_career_advice

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    context: dict = {}

@router.post("/")
async def chat_interaction(req: ChatRequest):
    reply = await generate_career_advice(req.message, req.context)
    return {"reply": reply}
