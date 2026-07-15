from fastapi import APIRouter, HTTPException, Depends
from models.user import UserLogin, UserRegister, UserResponse
from database import get_db
import uuid

router = APIRouter()

@router.post("/login")
async def login(user: UserLogin, db = Depends(get_db)):
    # Basic lookup for demo purposes
    db_user = await db["users"].find_one({"email": user.email, "password": user.password})
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    return {"message": "Login successful", "user": {"id": db_user["_id"], "email": db_user["email"], "name": db_user["name"]}}

@router.post("/register")
async def register(user: UserRegister, db = Depends(get_db)):
    existing = await db["users"].find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = {
        "_id": str(uuid.uuid4()),
        "name": user.name,
        "email": user.email,
        "password": user.password # In production, hash this password!
    }
    await db["users"].insert_one(new_user)
    
    return {"message": "User registered successfully", "user": {"id": new_user["_id"], "email": new_user["email"], "name": new_user["name"]}}
