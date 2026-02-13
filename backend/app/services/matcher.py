import numpy as np

from ..models.schemas import (
    FitEvidence,
    JobPosting,
    MatchPayload,
    MatchResult,
    Resume,
)
from .embeddings import (
    build_job_text,
    build_resume_text,
    compute_similarity,
    embed_texts,
)
from .groq_client import generate_fit_evidence


def classify_ats_tag(score: float) -> str:
    if score >= 0.82:
        return "strong_match"
    if score >= 0.65:
        return "good_match"
    if score >= 0.50:
        return "review"
    return "below_threshold"


def rank_candidates(job: JobPosting, resumes: list[Resume], top_k: int = 20) -> MatchPayload:
    job_text = build_job_text(job.model_dump())
    resume_texts = [build_resume_text(r.model_dump()) for r in resumes]

    all_texts = [job_text] + resume_texts
    embeddings = embed_texts(all_texts)

    job_emb = embeddings[0]
    resume_embs = embeddings[1:]

    scores = compute_similarity(job_emb, resume_embs)

    # Normalize scores to 0-1 range (cosine sim can range -1 to 1)
    min_s, max_s = scores.min(), scores.max()
    if max_s - min_s > 0:
        normalized = (scores - min_s) / (max_s - min_s)
    else:
        normalized = np.ones_like(scores) * 0.5

    ranked_indices = np.argsort(-normalized)[:top_k]

    top_matches: list[MatchResult] = []
    for idx in ranked_indices:
        idx = int(idx)
        resume = resumes[idx]
        score = float(normalized[idx])

        evidence_data = generate_fit_evidence(
            job_title=job.title,
            job_description=job.description,
            job_requirements=job.requirements,
            candidate_name=resume.candidate_name,
            resume_summary=resume.summary,
            resume_experience=resume.experience,
            resume_skills=resume.skills,
            match_score=score,
        )

        fit_evidence = [FitEvidence(**e) for e in evidence_data]
        ats_tag = classify_ats_tag(score)

        top_matches.append(
            MatchResult(
                candidate_id=resume.id,
                candidate_name=resume.candidate_name,
                job_id=job.id,
                match_score=round(score, 4),
                fit_evidence=fit_evidence,
                ats_tag=ats_tag,
            )
        )

    return MatchPayload(
        job_id=job.id,
        job_title=job.title,
        total_applicants=len(resumes),
        top_matches=top_matches,
    )
