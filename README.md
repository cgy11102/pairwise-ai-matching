# Pairwise — AI Resume Matching Engine

Pairwise uses semantic embeddings and LLM-powered explanations to rank and match candidates to job openings. It replaces slow, keyword-based ATS filtering with real-time AI matching built for US mid-market SaaS teams hiring technical talent.

## How It Works

1. **Upload Resumes** — Upload candidate resumes (PDF, JSON, or text)
2. **Define Requirements** — Enter job title, description, and requirements
3. **Get Ranked Matches** — Receive the top 20 candidates with Match Scores (0.0–1.0), three Fit Evidence bullets each, and automated ATS tags

## Architecture

```
├── backend/          Python + FastAPI + Groq
│   ├── app/
│   │   ├── main.py           FastAPI app with CORS
│   │   ├── config.py         Settings from environment
│   │   ├── api/routes.py     POST /api/v1/match endpoint
│   │   ├── models/schemas.py Pydantic models (MatchPayload, FitEvidence, etc.)
│   │   └── services/
│   │       ├── embeddings.py   sentence-transformers for vector similarity
│   │       ├── groq_client.py  Groq LLM for fit evidence generation
│   │       └── matcher.py      Core ranking engine (embed → rank → explain)
│   └── data/                 Sample job posting and resumes
│
├── frontend/         React + Vite + Tailwind CSS v4
│   └── src/
│       ├── app/
│       │   ├── App.tsx                 4-page flow: Landing → Upload → Requirements → Results
│       │   └── components/             shadcn/ui + Figma design system
│       ├── lib/api.ts                  Typed API client
│       └── styles/                     Tailwind v4 theme (navy/sage/gold)
│
└── Clickable prototype for SaaS/      Original Figma Make export
```

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Backend | Python 3.11+, FastAPI | API server |
| AI / LLM | Groq (llama-3.3-70b) | Fit evidence generation |
| Embeddings | sentence-transformers (all-MiniLM-L6-v2) | Semantic resume ↔ job matching |
| Frontend | React 18, Vite, Tailwind CSS v4 | Dashboard UI |
| UI Components | shadcn/ui (Radix primitives) | Buttons, cards, inputs, badges |
| Design | Figma Make export | Original prototype reference |

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- A [Groq API key](https://console.groq.com/)

### Backend

```bash
cd backend
cp .env.example .env       # Add your GROQ_API_KEY
pip install -r requirements.txt
python run.py              # Starts on http://localhost:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev                # Starts on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

## API

### `POST /api/v1/match`

Send a job posting and array of resumes, receive ranked candidates.

**Request:**
```json
{
  "job": {
    "id": "J-101",
    "title": "Senior Backend Engineer",
    "company": "Acme SaaS",
    "description": "Build scalable microservices...",
    "requirements": ["5+ years Python", "Distributed systems"],
    "preferred": ["Kubernetes experience"],
    "location": "Remote (US)",
    "department": "Engineering"
  },
  "resumes": [...],
  "top_k": 20
}
```

**Response (Match JSON Payload):**
```json
{
  "job_id": "J-101",
  "job_title": "Senior Backend Engineer",
  "total_applicants": 150,
  "top_matches": [
    {
      "candidate_id": "C-1001",
      "candidate_name": "Alex Chen",
      "match_score": 0.93,
      "fit_evidence": [
        {"point": "7 years distributed systems experience aligns with requirements.", "category": "experience_match"},
        {"point": "Proficient in Python and Kubernetes.", "category": "skill_match"},
        {"point": "M.S. Computer Science with systems focus.", "category": "education_match"}
      ],
      "ats_tag": "strong_match"
    }
  ]
}
```

### `GET /api/v1/health`

Returns service health status.

## Match Score Thresholds

| Score | ATS Tag | Meaning |
|-------|---------|---------|
| 0.82+ | `strong_match` | Advance to interview |
| 0.65–0.81 | `good_match` | Recruiter review recommended |
| 0.50–0.64 | `review` | Possible fit, needs closer look |
| < 0.50 | `below_threshold` | Does not meet minimum criteria |

## Target Customer

US-based B2B SaaS and IT services companies with 300–1,500 employees hiring 20–100 technical roles annually. Integrates with mid-tier ATS platforms (Greenhouse, Lever, Ashby).

## Team

Arizona State University — MS-AIB AI Business Strategy Group Project, 2026
