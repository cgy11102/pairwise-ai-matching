from fastapi import APIRouter, HTTPException

from ..models.schemas import MatchPayload, MatchRequest
from ..services.matcher import rank_candidates

router = APIRouter(prefix="/api/v1", tags=["matching"])


@router.post("/match", response_model=MatchPayload)
async def match_candidates(request: MatchRequest):
    if not request.resumes:
        raise HTTPException(status_code=400, detail="No resumes provided")
    if not request.job.description:
        raise HTTPException(status_code=400, detail="Job description is required")

    payload = rank_candidates(
        job=request.job,
        resumes=request.resumes,
        top_k=request.top_k,
    )
    return payload


@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "pairwise"}
