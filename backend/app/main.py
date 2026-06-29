from fastapi import FastAPI

app = FastAPI(title="AI Recruiter API")

@app.get("/health")
def health_check():
    return {"status": "ok"}
