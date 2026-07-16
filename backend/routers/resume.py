from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
import fitz  # PyMuPDF
from io import BytesIO
from ai_service import analyze_resume_text
from database import get_db
from models.resume import ResumeAnalysisInDB
import uuid

router = APIRouter()

@router.post("/analyze-resume")
async def upload_resume(
    resume: UploadFile = File(...), 
    targetRole: str = Form(...),
    user_id: str = Form("anonymous"),
    db = Depends(get_db)
):
    filename = resume.filename
    ext = filename.split('.')[-1].lower()
    if ext not in ['pdf', 'txt']:
        raise HTTPException(status_code=400, detail="Only PDF and TXT files are supported")
        
    content = await resume.read()
    
    # Extract text
    text = ""
    if ext == 'pdf':
        try:
            doc = fitz.open(stream=content, filetype="pdf")
            for page in doc:
                text += page.get_text()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to parse PDF: {str(e)}")
    else:
        text = content.decode("utf-8", errors="ignore")
        
    if not text.strip():
        raise HTTPException(status_code=400, detail="No extractable text found in resume")
        
    # Send to AI
    analysis = await analyze_resume_text(text)
    
    # Save to MongoDB (Resilient save, do not block request if database is offline)
    record_id = str(uuid.uuid4())
    record = {
        "_id": record_id,
        "user_id": user_id,
        "filename": filename,
        "targetRole": targetRole,
        "score": analysis.get("score", 0),
        "atsScore": analysis.get("atsScore", 0),
        "formattingScore": analysis.get("formattingScore", 0),
        "summary": analysis.get("summary", ""),
        "strengths": analysis.get("strengths", []),
        "gaps": analysis.get("gaps", []),
        "recommendations": analysis.get("recommendations", [])
    }
    
    try:
        # motor has lazy client, but insertion will request connection
        # we can wrap in try-except with short timeout or just fail-safe catch
        await db["resumes"].insert_one(record)
    except Exception as e:
        print("MongoDB Save Warning (continuing):", e)
        
    return {
        "success": True,
        "data": analysis
    }
