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

    try:
        evidence = json.loads(text)
    except json.JSONDecodeError:
        evidence = [
            {"point": "Strong semantic alignment with job requirements.", "category": "skill_match"},
            {"point": "Relevant professional experience in the domain.", "category": "experience_match"},
            {"point": "Educational background supports role requirements.", "category": "education_match"},
        ]
    return evidence
