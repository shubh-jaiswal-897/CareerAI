from fastapi import APIRouter, Request
from pydantic import BaseModel
from ai_service import generate_career_advice

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    context: dict = {}

@router.post("/")
async def chat_interaction(request: Request, req: ChatRequest):
    api_key = request.headers.get("x-api-key")
    reply = await generate_career_advice(req.message, req.context, api_key=api_key)
    return {"reply": reply}
