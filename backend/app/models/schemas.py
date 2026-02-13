from pydantic import BaseModel, Field


class JobPosting(BaseModel):
    id: str
    title: str
    company: str
    description: str
    requirements: list[str]
    preferred: list[str] = []
    location: str = ""
    department: str = ""


class Resume(BaseModel):
    id: str
    candidate_name: str
    email: str = ""
    summary: str
    experience: list[str]
    skills: list[str]
    education: list[str]
    raw_text: str = ""


class FitEvidence(BaseModel):
    point: str
    category: str = ""  # "skill_match", "experience_match", "education_match"


class MatchResult(BaseModel):
    candidate_id: str
    candidate_name: str
    job_id: str
    match_score: float = Field(ge=0.0, le=1.0)
    fit_evidence: list[FitEvidence]
    ats_tag: str = ""  # e.g. "strong_match", "good_match", "review"


class MatchPayload(BaseModel):
    job_id: str
    job_title: str
    total_applicants: int
    top_matches: list[MatchResult]


class MatchRequest(BaseModel):
    job: JobPosting
    resumes: list[Resume]
    top_k: int = 20
