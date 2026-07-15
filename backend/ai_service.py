import os
import httpx
from dotenv import load_dotenv
import json

load_dotenv()

async def generate_with_gemini(prompt: str) -> str:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return None
        
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    headers = {"Content-Type": "application/json"}
    payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(url, headers=headers, json=payload, timeout=30.0)
            response.raise_for_status()
            data = response.json()
            return data["candidates"][0]["content"]["parts"][0]["text"]
        except Exception as e:
            print("Gemini API Error:", e)
            return None

async def generate_career_advice(user_message: str, context: dict = None):
    prompt = f"""
    You are an expert AI Career Coach. 
    Context about the user: {context}
    User message: {user_message}
    
    Provide helpful, actionable, and encouraging career advice based on the context.
    """
    response_text = await generate_with_gemini(prompt)
    if not response_text:
        return "Demo Mock Mode: This is a simulated response since no API key is provided or the API request failed. You should focus on learning Python, React, and System Design to advance your career."
    return response_text

async def analyze_resume_text(resume_text: str):
    prompt = f"""
    You are an expert ATS and Resume Reviewer. Analyze the following resume text and provide:
    1. A score out of 100
    2. A list of 3-4 pros (strengths)
    3. A list of 3-4 cons (weaknesses)
    4. A list of actionable recommendations
    
    Return the output STRICTLY in JSON format matching this schema:
    {{
      "score": int,
      "pros": ["pro1", "pro2"],
      "cons": ["con1", "con2"],
      "recommendations": ["rec1", "rec2"]
    }}
    
    Resume Text:
    {resume_text}
    """
    
    response_text = await generate_with_gemini(prompt)
    
    if not response_text:
        return {
            "score": 75,
            "pros": ["Good layout", "Clear experience section"],
            "cons": ["Lacks quantifiable metrics", "Missing keyword optimization"],
            "recommendations": ["Add more numbers to your impact bullets", "Include a skills summary at the top"]
        }
        
    text = response_text.strip()
    
    # Strip markdown block if returned
    if text.startswith("```json"):
        text = text[7:-3]
    elif text.startswith("```"):
        text = text[3:-3]
        
    try:
        return json.loads(text)
    except:
        # Fallback if parsing fails
        return {
            "score": 50,
            "pros": ["Could not parse pros"],
            "cons": ["Could not parse cons"],
            "recommendations": ["Ensure resume text is clear"]
        }
