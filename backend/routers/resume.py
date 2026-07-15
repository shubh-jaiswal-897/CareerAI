from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
import fitz  # PyMuPDF
from io import BytesIO
from ai_service import analyze_resume_text
from database import get_db
from models.resume import ResumeAnalysisInDB
import uuid

router = APIRouter()

@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...), 
    user_id: str = Form("anonymous"),
    db = Depends(get_db)
):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
        
    content = await file.read()
    
    # Extract text from PDF
    text = ""
    try:
        doc = fitz.open(stream=content, filetype="pdf")
        for page in doc:
            text += page.get_text()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse PDF: {str(e)}")
        
    if not text.strip():
        raise HTTPException(status_code=400, detail="No extractable text found in PDF")
        
    # Send to AI
    analysis = await analyze_resume_text(text)
    
    # Save to MongoDB
    record_id = str(uuid.uuid4())
    record = {
        "_id": record_id,
        "user_id": user_id,
        "filename": file.filename,
        "score": analysis.get("score", 0),
        "pros": analysis.get("pros", []),
        "cons": analysis.get("cons", []),
        "recommendations": analysis.get("recommendations", [])
    }
    
    # Fire and forget save
    await db["resumes"].insert_one(record)
    
    return {
        "message": "Resume analyzed successfully",
        "id": record_id,
        "analysis": analysis
    }
