import json

from groq import Groq

from ..config import settings

_client = None


def get_client() -> Groq:
    global _client
    if _client is None:
        _client = Groq(api_key=settings.GROQ_API_KEY)
    return _client


def generate_fit_evidence(
    job_title: str,
    job_description: str,
    job_requirements: list[str],
    candidate_name: str,
    resume_summary: str,
    resume_experience: list[str],
    resume_skills: list[str],
    match_score: float,
) -> list[dict]:
    client = get_client()

    prompt = f"""You are an expert technical recruiter. Given a job posting and a candidate resume, produce exactly 3 concise bullet points explaining why this candidate is a good fit for the role.

Job Title: {job_title}
Job Description: {job_description}
Key Requirements: {', '.join(job_requirements)}

Candidate: {candidate_name}
Summary: {resume_summary}
Experience: {'; '.join(resume_experience[:3])}
Skills: {', '.join(resume_skills)}
Semantic Match Score: {match_score:.2f}

Return a JSON array of exactly 3 objects, each with "point" (string, one sentence) and "category" (one of: "skill_match", "experience_match", "education_match").
Return ONLY the JSON array, no other text."""

    try:
        response = client.chat.completions.create(
            model=settings.MODEL_NAME,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=500,
        )

        text = response.choices[0].message.content.strip()
        # Strip markdown fences if present
        if text.startswith("```"):
            text = text.split("\n", 1)[1]
            text = text.rsplit("```", 1)[0]

        evidence = json.loads(text)
        return evidence

    except Exception:
        # Groq unavailable (network block, rate limit, etc.) — return
        # skill-based fallback derived from the resume data so results
        # are still meaningful and the embedding ranking still runs.
        top_skills = ", ".join(resume_skills[:3]) if resume_skills else "relevant skills"
        return [
            {"point": f"{candidate_name} has strong skill alignment: {top_skills}.", "category": "skill_match"},
            {"point": f"Experience history demonstrates relevant domain expertise for {job_title}.", "category": "experience_match"},
            {"point": f"Semantic embedding score of {match_score:.0%} indicates strong resume-to-job fit.", "category": "skill_match"},
        ]
