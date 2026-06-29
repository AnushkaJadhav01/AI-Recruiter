from fastapi import APIRouter

router = APIRouter()

@router.get("/jobs")
def list_jobs():
    return [{"id": 1, "title": "Senior Python Engineer"}]
