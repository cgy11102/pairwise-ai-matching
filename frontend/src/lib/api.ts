// Check for a production API URL, otherwise fallback to the local Vite proxy or direct localhost
const VITE_API_URL = import.meta.env.VITE_API_URL || '';
const API_BASE = VITE_API_URL ? `${VITE_API_URL}/api/v1` : '/api/v1';

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  preferred: string[];
  location: string;
  department: string;
}

export interface Resume {
  id: string;
  candidate_name: string;
  email: string;
  summary: string;
  experience: string[];
  skills: string[];
  education: string[];
  raw_text: string;
}

export interface FitEvidence {
  point: string;
  category: string;
}

export interface MatchResult {
  candidate_id: string;
  candidate_name: string;
  job_id: string;
  match_score: number;
  fit_evidence: FitEvidence[];
  ats_tag: string;
}

export interface MatchPayload {
  job_id: string;
  job_title: string;
  total_applicants: number;
  top_matches: MatchResult[];
}

export async function postMatch(
  job: JobPosting,
  resumes: Resume[],
  topK = 20
): Promise<MatchPayload> {
  const res = await fetch(`${API_BASE}/match`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ job, resumes, top_k: topK }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Match request failed (${res.status})`);
  }
  return res.json();
}

export async function healthCheck() {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}
