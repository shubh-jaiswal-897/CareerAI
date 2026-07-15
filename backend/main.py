from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users, chat, resume, roadmap

app = FastAPI(title="CareerAI Backend", version="1.0.0")

# Allow CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(resume.router, prefix="/api/resume", tags=["resume"])
app.include_router(roadmap.router, prefix="/api/roadmap", tags=["roadmap"])

@app.get("/")
def read_root():
    return {"message": "Welcome to CareerAI FastAPI Backend"}
