import type { MatchPayload } from "./api";

export interface MockRole {
  id: string;
  title: string;
  company: string;
  department: string;
  location: string;
  description: string;
  requirements: string[];
  preferred: string[];
  applicants: number;
  strongMatches: number;
  postedDays: number;
  results: MatchPayload;
}

export const MOCK_ROLES: MockRole[] = [
  {
    id: "J-001",
    title: "Senior Backend Engineer",
    company: "CloudScale",
    department: "Engineering",
    location: "Remote (US)",
    description:
      "Build and scale distributed microservices powering our SaaS platform. You'll own backend architecture decisions and mentor junior engineers.",
    requirements: ["5+ years Python or Go", "Distributed systems experience", "Kubernetes & AWS"],
    preferred: ["Prior SaaS company experience", "gRPC / Protobuf"],
    applicants: 147,
    strongMatches: 2,
    postedDays: 3,
    results: {
      job_id: "J-001",
      job_title: "Senior Backend Engineer",
      total_applicants: 147,
      top_matches: [
        {
          candidate_id: "C-1001",
          candidate_name: "Alex Chen",
          job_id: "J-001",
          match_score: 0.93,
          ats_tag: "strong_match",
          fit_evidence: [
            { point: "7 years of distributed systems experience directly aligns with core requirements.", category: "experience_match" },
            { point: "Proficient in Python, Go, and Kubernetes — all listed as key skills.", category: "skill_match" },
            { point: "M.S. Computer Science from Stanford demonstrates strong technical foundation.", category: "education_match" },
          ],
        },
        {
          candidate_id: "C-1005",
          candidate_name: "Morgan Lee",
          job_id: "J-001",
          match_score: 0.88,
          ats_tag: "strong_match",
          fit_evidence: [
            { point: "7 years combined backend and DevOps experience at SaaS companies.", category: "experience_match" },
            { point: "Deep Kubernetes, Terraform, and AWS expertise matches infrastructure requirements.", category: "skill_match" },
            { point: "Datadog monitoring experience indicates strong operational maturity.", category: "experience_match" },
          ],
        },
        {
          candidate_id: "C-1002",
          candidate_name: "Priya Sharma",
          job_id: "J-001",
          match_score: 0.79,
          ats_tag: "good_match",
          fit_evidence: [
            { point: "Led a monolith-to-microservices migration, showing architectural depth.", category: "experience_match" },
            { point: "Solid Python and Go skills; Redis and PostgreSQL background is a plus.", category: "skill_match" },
            { point: "5 years of experience is slightly below ideal but trajectory is strong.", category: "experience_match" },
          ],
        },
        {
          candidate_id: "C-1003",
          candidate_name: "Jordan Williams",
          job_id: "J-001",
          match_score: 0.67,
          ats_tag: "good_match",
          fit_evidence: [
            { point: "5 years of backend-focused full-stack experience at a mid-market SaaS company.", category: "experience_match" },
            { point: "Python, Docker, and REST API skills cover essential requirements.", category: "skill_match" },
            { point: "Lacks Kubernetes and distributed systems depth mentioned in requirements.", category: "skill_match" },
          ],
        },
        {
          candidate_id: "C-1004",
          candidate_name: "Sam Torres",
          job_id: "J-001",
          match_score: 0.44,
          ats_tag: "below_threshold",
          fit_evidence: [
            { point: "Python and SQL skills are relevant but experience is primarily in data analytics.", category: "skill_match" },
            { point: "Limited backend engineering portfolio; bootcamp background needs more depth.", category: "experience_match" },
            { point: "Does not meet minimum years of experience for this seniority level.", category: "experience_match" },
          ],
        },
      ],
    },
  },
  {
    id: "J-002",
    title: "Product Manager",
    company: "TechFlow",
    department: "Product",
    location: "Hybrid — Austin, TX",
    description:
      "Define and drive the product roadmap for our core B2B SaaS platform. Partner closely with engineering, design, and customers to ship features that matter.",
    requirements: ["3+ years B2B SaaS product management", "Strong data analysis skills", "Experience with agile delivery"],
    preferred: ["Technical background or CS degree", "Familiarity with CRM/ATS tools"],
    applicants: 89,
    strongMatches: 3,
    postedDays: 7,
    results: {
      job_id: "J-002",
      job_title: "Product Manager",
      total_applicants: 89,
      top_matches: [
        {
          candidate_id: "C-2001",
          candidate_name: "Taylor Nguyen",
          job_id: "J-002",
          match_score: 0.91,
          ats_tag: "strong_match",
          fit_evidence: [
            { point: "5 years of B2B SaaS PM experience including two full 0→1 product launches.", category: "experience_match" },
            { point: "Built and shipped agile roadmaps with cross-functional teams of 20+.", category: "skill_match" },
            { point: "MBA with concentration in technology strategy adds business depth.", category: "education_match" },
          ],
        },
        {
          candidate_id: "C-2002",
          candidate_name: "Casey Rivera",
          job_id: "J-002",
          match_score: 0.85,
          ats_tag: "strong_match",
          fit_evidence: [
            { point: "4 years of PM experience at a Series B SaaS startup, strong data skills.", category: "experience_match" },
            { point: "Comfortable with SQL and Mixpanel for product analytics.", category: "skill_match" },
            { point: "Computer Science background enables effective technical collaboration.", category: "education_match" },
          ],
        },
        {
          candidate_id: "C-2003",
          candidate_name: "Dana Kim",
          job_id: "J-002",
          match_score: 0.82,
          ats_tag: "strong_match",
          fit_evidence: [
            { point: "3 years PM experience with proven track record of feature adoption growth.", category: "experience_match" },
            { point: "Prior ATS integration project aligns directly with preferred qualifications.", category: "skill_match" },
            { point: "Strong storytelling and stakeholder alignment skills across C-suite.", category: "skill_match" },
          ],
        },
        {
          candidate_id: "C-2004",
          candidate_name: "Jamie Okafor",
          job_id: "J-002",
          match_score: 0.61,
          ats_tag: "review",
          fit_evidence: [
            { point: "2 years as associate PM; transitioning from a UX design background.", category: "experience_match" },
            { point: "Agile experience is limited to one product cycle, needs broader exposure.", category: "skill_match" },
            { point: "Strong design sensibility could add value but PM depth is still developing.", category: "skill_match" },
          ],
        },
      ],
    },
  },
  {
    id: "J-003",
    title: "Data Scientist",
    company: "Analytix",
    department: "Data & AI",
    location: "Remote (US)",
    description:
      "Develop predictive models and ML pipelines that power customer-facing analytics. You'll work across the full data lifecycle from raw ingestion to production deployment.",
    requirements: ["3+ years ML/data science in production", "Python, scikit-learn, or PyTorch", "Experience with SQL and cloud data warehouses"],
    preferred: ["NLP or LLM experience", "MLflow or similar experiment tracking"],
    applicants: 112,
    strongMatches: 2,
    postedDays: 5,
    results: {
      job_id: "J-003",
      job_title: "Data Scientist",
      total_applicants: 112,
      top_matches: [
        {
          candidate_id: "C-3001",
          candidate_name: "Reese Patel",
          job_id: "J-003",
          match_score: 0.95,
          ats_tag: "strong_match",
          fit_evidence: [
            { point: "5 years of production ML experience including NLP pipelines — direct match.", category: "experience_match" },
            { point: "Extensive PyTorch and scikit-learn usage across 3 shipped products.", category: "skill_match" },
            { point: "Ph.D. in Statistics with published research in predictive modeling.", category: "education_match" },
          ],
        },
        {
          candidate_id: "C-3002",
          candidate_name: "Avery Simmons",
          job_id: "J-003",
          match_score: 0.86,
          ats_tag: "strong_match",
          fit_evidence: [
            { point: "4 years building and shipping recommendation systems at scale.", category: "experience_match" },
            { point: "Proficient with Snowflake and BigQuery; MLflow used in current role.", category: "skill_match" },
            { point: "Strong SQL background covers data warehouse requirement fully.", category: "skill_match" },
          ],
        },
        {
          candidate_id: "C-3003",
          candidate_name: "Quinn Nakamura",
          job_id: "J-003",
          match_score: 0.72,
          ats_tag: "good_match",
          fit_evidence: [
            { point: "3 years data science experience, mostly in exploratory analytics roles.", category: "experience_match" },
            { point: "Python proficiency is strong; limited exposure to production ML pipelines.", category: "skill_match" },
            { point: "Cloud warehouse experience with Redshift but not Snowflake or BigQuery.", category: "skill_match" },
          ],
        },
        {
          candidate_id: "C-3004",
          candidate_name: "Blake Foster",
          job_id: "J-003",
          match_score: 0.55,
          ats_tag: "review",
          fit_evidence: [
            { point: "2 years as a data analyst transitioning into data science role.", category: "experience_match" },
            { point: "scikit-learn experience from personal projects; no production ML deployment.", category: "skill_match" },
            { point: "SQL skills are strong but ML maturity needs to grow for this role level.", category: "skill_match" },
          ],
        },
      ],
    },
  },
];

export const CANDIDATE_MOCK_SCORE: Record<string, number> = {
  "J-001": 0.87,
  "J-002": 0.74,
  "J-003": 0.91,
};
