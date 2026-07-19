from fastapi import APIRouter, Request
from pydantic import BaseModel
from ai_service import generate_with_gemini
import json

router = APIRouter()

class RoadmapRequest(BaseModel):
    goal: str
    skills: str

@router.post("/")
async def generate_roadmap(request: Request, req: RoadmapRequest):
    prompt = f"""
    You are an expert Career Advisor. Create a step-by-step learning roadmap for a user whose career goal is '{req.goal}' and who currently has these skills: '{req.skills}'.
    
    Return the output STRICTLY in JSON format matching this schema:
    [
      {{"step": 1, "title": "Step title", "description": "Short description"}},
      {{"step": 2, "title": "Step title", "description": "Short description"}}
    ]
    """
    
    api_key = request.headers.get("x-api-key")
    response_text = await generate_with_gemini(prompt, api_key=api_key)
    
    if not response_text:
        return {
            "roadmap": [
                {"step": 1, "title": "Learn HTML/CSS", "description": "The basics of the web."},
                {"step": 2, "title": "Master React", "description": "Build interactive UIs."},
                {"step": 3, "title": "Backend with FastAPI", "description": "Learn to serve APIs."}
            ]
        }
        
    text = response_text.strip()
    
    if text.startswith("```json"):
        text = text[7:-3]
    elif text.startswith("```"):
        text = text[3:-3]
        
    try:
        data = json.loads(text)
        return {"roadmap": data}
    except:
        return {"roadmap": [{"step": 1, "title": "Error parsing AI response", "description": "Try again."}]}
