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
    1. A match score out of 100
    2. An ATS compatibility score out of 100
    3. A layout formatting score out of 100
    4. A concise summary review
    5. A list of 3-4 strengths (pros)
    6. A list of 3-4 gaps (weaknesses / missing keywords)
    7. A list of actionable recommendations
    
    Return the output STRICTLY in JSON format matching this schema:
    {{
      "score": int,
      "atsScore": int,
      "formattingScore": int,
      "summary": "conciliation summary here",
      "strengths": ["strength1", "strength2"],
      "gaps": ["gap1", "gap2"],
      "recommendations": ["rec1", "rec2"]
    }}
    
    Resume Text:
    {resume_text}
    """
    
    response_text = await generate_with_gemini(prompt)
    
    if not response_text:
        return {
            "score": 75,
            "atsScore": 80,
            "formattingScore": 72,
            "summary": "The resume possesses solid experience definitions, but needs critical keywords integration to pass standard ATS filters.",
            "strengths": ["Clean sections outline", "Strong experience definitions"],
            "gaps": ["Missing target framework keywords", "Lacks quantifiable metrics"],
            "recommendations": ["Add specific keywords matching target role descriptions", "Quantify bullet points with numeric impact achievements"]
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
            "atsScore": 50,
            "formattingScore": 50,
            "summary": "Failed to parse AI review. Please check file format content.",
            "strengths": ["Readable layout"],
            "gaps": ["Unclear layout parameters"],
            "recommendations": ["Ensure resume text is clear and uncorrupted"]
        }
