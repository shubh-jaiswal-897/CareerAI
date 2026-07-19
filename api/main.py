import os
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Ensure backend package is on the Python path
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend"))
if backend_path not in sys.path:
    sys.path.append(backend_path)

# Import routers from existing backend package
from routers import users, chat, resume, roadmap

app = FastAPI(title="CareerAI Backend", version="1.0.0")

# CORS – needed for Vercel
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers under the /api prefix (Vercel will route /api/* to this)
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(chat.router, prefix="/chat", tags=["chat"])
app.include_router(resume.router, prefix="/resume", tags=["resume"])
app.include_router(roadmap.router, prefix="/roadmap", tags=["roadmap"])

@app.get("/")
def read_root():
    return {"message": "CareerAI FastAPI Backend (Vercel)"}
