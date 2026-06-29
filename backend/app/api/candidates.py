from fastapi import APIRouter

router = APIRouter()

@router.get("/candidates")
def list_candidates():
    return [{"id": 1, "name": "Sample Candidate"}]
