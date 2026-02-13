import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Target, Plus, X } from "lucide-react";
import { useNavigate } from "react-router";
import { postMatch } from "../../lib/api";
import type { JobPosting, Resume } from "../../lib/api";

interface Requirement {
  id: string;
  text: string;
}

export function RequirementsForm() {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [requirements, setRequirements] = useState<Requirement[]>([
    { id: "1", text: "" }
  ]);
  const [preferred, setPreferred] = useState<Requirement[]>([
    { id: "1", text: "" }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addRequirement = () => {
    setRequirements([...requirements, { id: Date.now().toString(), text: "" }]);
  };
  const removeRequirement = (id: string) => {
    if (requirements.length > 1) setRequirements(requirements.filter(r => r.id !== id));
  };
  const updateRequirement = (id: string, text: string) => {
    setRequirements(requirements.map(r => r.id === id ? { ...r, text } : r));
  };

  const addPreferred = () => {
    setPreferred([...preferred, { id: Date.now().toString(), text: "" }]);
  };
  const removePreferred = (id: string) => {
    if (preferred.length > 1) setPreferred(preferred.filter(p => p.id !== id));
  };
  const updatePreferred = (id: string, text: string) => {
    setPreferred(preferred.map(p => p.id === id ? { ...p, text } : p));
  };

  const handleFindMatches = async () => {
    if (!jobTitle || !requirements.some(r => r.text)) return;

    setLoading(true);
    setError("");

    try {
      // Build job posting from form
      const job: JobPosting = {
        id: `J-${Date.now()}`,
        title: jobTitle,
        company: company || "Your Company",
        description: jobDescription || `${jobTitle} role at ${company || "our company"}`,
        requirements: requirements.filter(r => r.text).map(r => r.text),
        preferred: preferred.filter(p => p.text).map(p => p.text),
        location: "Remote (US)",
        department: "Engineering",
      };

      // Get resume data from sessionStorage or use sample data
      const resumeText = sessionStorage.getItem("pairwise_resume_text");
      let resumes: Resume[];

      if (resumeText) {
        try {
          // Try parsing as JSON array of resumes
          const parsed = JSON.parse(resumeText);
          resumes = Array.isArray(parsed) ? parsed : [parsed];
        } catch {
          // Treat as raw text resume
          resumes = [{
            id: "C-uploaded",
            candidate_name: "Uploaded Candidate",
            email: "",
            summary: resumeText.substring(0, 500),
            experience: [resumeText.substring(0, 300)],
            skills: [],
            education: [],
            raw_text: resumeText,
          }];
        }
      } else {
        // Use sample resumes for demo
        const sampleRes = await fetch('/api/v1/health');
        if (!sampleRes.ok) throw new Error("Backend not running. Start the Python server on port 8000.");

        resumes = [
          {
            id: "C-1001", candidate_name: "Alex Chen", email: "alex.chen@email.com",
            summary: "Backend engineer with 7 years of experience building distributed systems at scale.",
            experience: ["Senior Software Engineer at CloudScale (3 years)", "Backend Engineer at DataPipe Inc. (4 years)"],
            skills: ["Python", "Go", "Kubernetes", "AWS", "PostgreSQL", "gRPC", "Docker"],
            education: ["M.S. Computer Science, Stanford University"], raw_text: "",
          },
          {
            id: "C-1002", candidate_name: "Priya Sharma", email: "priya.sharma@email.com",
            summary: "Full-stack engineer transitioning to backend. Led monolith to microservices migration.",
            experience: ["Lead Engineer at StartupXYZ (3 years)", "Software Engineer at TechCorp (2 years)"],
            skills: ["Python", "Go", "AWS", "Docker", "Django", "Redis", "PostgreSQL"],
            education: ["B.S. Computer Science, UC Berkeley"], raw_text: "",
          },
          {
            id: "C-1003", candidate_name: "Jordan Williams", email: "jordan.w@email.com",
            summary: "Software engineer with 5 years full-stack experience, backend emphasis.",
            experience: ["Software Engineer at MidMarket SaaS Co. (3 years)", "Junior Developer at WebAgency (2 years)"],
            skills: ["Python", "Node.js", "Docker", "PostgreSQL", "REST APIs"],
            education: ["B.S. Software Engineering, Arizona State University"], raw_text: "",
          },
          {
            id: "C-1004", candidate_name: "Sam Torres", email: "sam.torres@email.com",
            summary: "Data analyst transitioning into backend engineering with growing portfolio.",
            experience: ["Data Analyst at Analytics Corp (3 years)", "Freelance Developer (1 year)"],
            skills: ["Python", "SQL", "Flask", "Pandas", "Docker"],
            education: ["Coding bootcamp, General Assembly", "B.A. Mathematics, UCLA"], raw_text: "",
          },
          {
            id: "C-1005", candidate_name: "Morgan Lee", email: "morgan.lee@email.com",
            summary: "DevOps engineer with deep backend experience. Kubernetes and SaaS infrastructure.",
            experience: ["Senior DevOps Engineer at SaaSPlatform (4 years)", "Backend Engineer at InfraTech (3 years)"],
            skills: ["Python", "Go", "Kubernetes", "Terraform", "AWS", "Datadog", "Docker"],
            education: ["B.S. Computer Engineering, Georgia Tech"], raw_text: "",
          },
        ];
      }

      const results = await postMatch(job, resumes, 20);

      // Store results and navigate
      sessionStorage.setItem("pairwise_results", JSON.stringify(results));
      navigate('/results');
    } catch (err: any) {
      setError(err.message || "Failed to run matching. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-primary">Pairwise</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-secondary-foreground">&#10003;</span>
                </div>
                <span className="text-secondary">Upload Resumes</span>
              </div>
              <div className="flex-1 h-px bg-secondary mx-4"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground">2</span>
                </div>
                <span className="text-primary">Requirements</span>
              </div>
              <div className="flex-1 h-px bg-border mx-4"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-muted-foreground">3</span>
                </div>
                <span className="text-muted-foreground">Results</span>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Define Job Requirements</CardTitle>
              <CardDescription>
                Add job details and requirements — Pairwise will match candidates using semantic AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Job Title */}
              <div className="space-y-2">
                <Label htmlFor="job-title" className="text-primary">Job Title</Label>
                <Input
                  id="job-title"
                  placeholder="e.g. Senior Backend Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="border-border focus:border-primary"
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <Label htmlFor="company" className="text-primary">Company</Label>
                <Input
                  id="company"
                  placeholder="e.g. Acme SaaS Inc."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="border-border focus:border-primary"
                />
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-primary">Job Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role, responsibilities, and team context..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="border-border focus:border-primary min-h-[100px]"
                />
              </div>

              {/* Requirements */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-primary">Job Requirements</Label>
                  <Button
                    type="button" variant="outline" size="sm"
                    onClick={addRequirement}
                    className="border-primary text-primary hover:bg-primary/5"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Requirement
                  </Button>
                </div>
                <div className="space-y-2">
                  {requirements.map((req, index) => (
                    <div key={req.id} className="flex gap-2">
                      <Input
                        placeholder={`Requirement ${index + 1} (e.g. 5+ years Python experience)`}
                        value={req.text}
                        onChange={(e) => updateRequirement(req.id, e.target.value)}
                        className="flex-1 border-border focus:border-primary"
                      />
                      {requirements.length > 1 && (
                        <Button type="button" variant="outline" size="icon"
                          onClick={() => removeRequirement(req.id)}
                          className="border-destructive text-destructive hover:bg-destructive/5"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Preferred */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-primary">Preferred Qualifications (Optional)</Label>
                  <Button type="button" variant="outline" size="sm"
                    onClick={addPreferred}
                    className="border-primary text-primary hover:bg-primary/5"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Preferred
                  </Button>
                </div>
                <div className="space-y-2">
                  {preferred.map((pref, index) => (
                    <div key={pref.id} className="flex gap-2">
                      <Input
                        placeholder={`Preferred ${index + 1} (e.g. Experience with Kubernetes)`}
                        value={pref.text}
                        onChange={(e) => updatePreferred(pref.id, e.target.value)}
                        className="flex-1 border-border focus:border-primary"
                      />
                      {preferred.length > 1 && (
                        <Button type="button" variant="outline" size="icon"
                          onClick={() => removePreferred(pref.id)}
                          className="border-destructive text-destructive hover:bg-destructive/5"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Info Box */}
              <div className="p-4 bg-accent/10 rounded-lg">
                <p className="text-sm text-primary mb-1">How does Pairwise match?</p>
                <p className="text-sm text-muted-foreground">
                  Pairwise converts both job requirements and resumes into vector embeddings,
                  then ranks candidates by semantic similarity. Groq LLM generates three
                  Fit Evidence bullets per candidate explaining why they match.
                </p>
              </div>

              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => navigate('/upload')}
                  className="border-border text-foreground hover:bg-muted"
                >
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={handleFindMatches}
                  disabled={!jobTitle || !requirements.some(r => r.text) || loading}
                  className="bg-primary hover:bg-primary/90 disabled:opacity-50"
                >
                  {loading ? "Matching..." : "Find Top Candidates"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
