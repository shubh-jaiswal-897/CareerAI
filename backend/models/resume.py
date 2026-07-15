from pydantic import BaseModel, Field
from typing import List
from datetime import datetime

class ResumeAnalysisBase(BaseModel):
    user_id: str
    filename: str
    score: int
    pros: List[str]
    cons: List[str]
    recommendations: List[str]

class ResumeAnalysisInDB(ResumeAnalysisBase):
    id: str = Field(alias="_id")
    analyzed_at: datetime = Field(default_factory=datetime.utcnow)
