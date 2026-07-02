from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import app.config  # Loads the .env file
from app.api import linkedin, resume

app = FastAPI(title="AI Recruiter API", root_path="/api")

# Setup CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Since it's a hackathon demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(linkedin.router, prefix="/api/linkedin", tags=["linkedin"])
app.include_router(resume.router, prefix="/api/resume", tags=["resume"])

@app.get("/")
def root():
    return RedirectResponse(url="/docs")

@app.get("/health")
def health_check():
    return {"status": "ok"}

