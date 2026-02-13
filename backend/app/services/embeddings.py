import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

from ..config import settings

_model = None


def get_model() -> SentenceTransformer:
    global _model
    if _model is None:
        _model = SentenceTransformer(settings.EMBEDDING_MODEL)
    return _model


def embed_texts(texts: list[str]) -> np.ndarray:
    model = get_model()
    return model.encode(texts, normalize_embeddings=True)


def compute_similarity(job_embedding: np.ndarray, resume_embeddings: np.ndarray) -> np.ndarray:
    if job_embedding.ndim == 1:
        job_embedding = job_embedding.reshape(1, -1)
    return cosine_similarity(job_embedding, resume_embeddings).flatten()


def build_job_text(job: dict) -> str:
    parts = [
        f"Job Title: {job['title']}",
        f"Description: {job['description']}",
        f"Requirements: {', '.join(job['requirements'])}",
    ]
    if job.get("preferred"):
        parts.append(f"Preferred: {', '.join(job['preferred'])}")
    return "\n".join(parts)


def build_resume_text(resume: dict) -> str:
    if resume.get("raw_text"):
        return resume["raw_text"]
    parts = [
        f"Summary: {resume['summary']}",
        f"Experience: {'; '.join(resume['experience'])}",
        f"Skills: {', '.join(resume['skills'])}",
        f"Education: {', '.join(resume['education'])}",
    ]
    return "\n".join(parts)
