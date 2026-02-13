import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Target, MapPin, Building2, DollarSign, ArrowRight, TrendingUp, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
  matchReasons: string[];
  skills: string[];
  experienceLevel: string;
}

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechFlow Solutions",
    location: "San Francisco, CA",
    salary: "$140k - $180k",
    matchScore: 96,
    matchReasons: [
      "8 years React experience matches senior level requirement",
      "Strong TypeScript and state management expertise",
      "Previous SaaS product experience aligns perfectly"
    ],
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    experienceLevel: "Senior"
  },
  {
    id: "2",
    title: "Frontend Engineering Lead",
    company: "DataStream Inc",
    location: "Austin, TX",
    salary: "$150k - $190k",
    matchScore: 94,
    matchReasons: [
      "Leadership experience matches lead role requirements",
      "Component architecture expertise highly relevant",
      "Team mentoring background is a strong fit"
    ],
    skills: ["React", "Vue.js", "Architecture", "Team Leadership", "CI/CD"],
    experienceLevel: "Lead"
  },
  {
    id: "3",
    title: "Full Stack Engineer",
    company: "CloudNine Technologies",
    location: "Remote",
    salary: "$130k - $170k",
    matchScore: 91,
    matchReasons: [
      "Full-stack experience covers all technical requirements",
      "Microservices architecture knowledge is valuable",
      "Database optimization skills match needs"
    ],
    skills: ["React", "Node.js", "PostgreSQL", "Docker", "Kubernetes"],
    experienceLevel: "Senior"
  },
  {
    id: "4",
    title: "Senior Software Engineer",
    company: "Nexus Labs",
    location: "New York, NY",
    salary: "$145k - $185k",
    matchScore: 89,
    matchReasons: [
      "Scalability experience matches enterprise requirements",
      "Performance optimization expertise is highly valued",
      "Cross-functional collaboration skills fit team culture"
    ],
    skills: ["React", "Python", "Redis", "Elasticsearch", "Kafka"],
    experienceLevel: "Senior"
  },
  {
    id: "5",
    title: "Frontend Architect",
    company: "InnovateSoft",
    location: "Seattle, WA",
    salary: "$160k - $200k",
    matchScore: 87,
    matchReasons: [
      "Architecture design experience aligns with role scope",
      "Technical strategy background is a key match",
      "Large-scale application experience is relevant"
    ],
    skills: ["React", "Architecture", "Web Performance", "Security", "Design Systems"],
    experienceLevel: "Architect"
  },
  {
    id: "6",
    title: "Principal Engineer",
    company: "VectorAI",
    location: "Boston, MA",
    salary: "$170k - $220k",
    matchScore: 85,
    matchReasons: [
      "Technical leadership aligns with principal role",
      "System design expertise matches requirements",
      "Innovation track record is highly valued"
    ],
    skills: ["React", "System Design", "ML/AI", "Distributed Systems", "Golang"],
    experienceLevel: "Principal"
  }
];

export function ResultsPage() {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-secondary";
    if (score >= 80) return "text-accent-foreground";
    return "text-muted-foreground";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return "bg-secondary/10";
    if (score >= 80) return "bg-accent/20";
    return "bg-muted/20";
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
            <span className="text-xl font-semibold text-primary">TalentMatch AI</span>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/upload')}
            className="border-primary text-primary hover:bg-primary/5"
          >
            New Search
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-secondary-foreground">✓</span>
                </div>
                <span className="text-secondary">Upload Resume</span>
              </div>
              <div className="flex-1 h-px bg-secondary mx-4"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-secondary-foreground">✓</span>
                </div>
                <span className="text-secondary">Requirements</span>
              </div>
              <div className="flex-1 h-px bg-secondary mx-4"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground">3</span>
                </div>
                <span className="text-primary">Results</span>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl mb-3 text-primary">Top Job Matches</h1>
            <p className="text-muted-foreground">
              Found {mockJobs.length} matching positions ranked by AI compatibility score
            </p>
          </div>

          {/* Stats Summary */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="border-secondary/30">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-primary">96%</p>
                    <p className="text-sm text-muted-foreground">Highest Match</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-secondary/30">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-primary">{mockJobs.length}</p>
                    <p className="text-sm text-muted-foreground">Total Matches</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-secondary/30">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-primary">91%</p>
                    <p className="text-sm text-muted-foreground">Avg Match Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {mockJobs.map((job) => (
              <Card 
                key={job.id} 
                className={`transition-all cursor-pointer hover:shadow-lg ${
                  selectedJob?.id === job.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-primary">{job.title}</CardTitle>
                        <Badge 
                          variant="secondary"
                          className={`${getScoreBgColor(job.matchScore)} ${getScoreColor(job.matchScore)} border-0`}
                        >
                          {job.matchScore}% Match
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {job.company}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </div>
                      </div>
                    </div>
                    <div 
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${getScoreBgColor(job.matchScore)} flex-shrink-0`}
                    >
                      <span className={`text-2xl font-semibold ${getScoreColor(job.matchScore)}`}>
                        {job.matchScore}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Skills */}
                    <div>
                      <p className="text-sm text-primary mb-2">Required Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <Badge 
                            key={skill} 
                            variant="outline"
                            className="border-secondary/50 text-secondary-foreground bg-secondary/5"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Match Reasons - Show when selected */}
                    {selectedJob?.id === job.id && (
                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-primary mb-3">Why This Is a Great Match:</p>
                        <div className="space-y-2">
                          {job.matchReasons.map((reason, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-muted-foreground">{reason}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex gap-3">
                          <Button 
                            className="bg-primary hover:bg-primary/90"
                          >
                            Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary/5"
                          >
                            Save for Later
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 text-center">
            <Card className="bg-primary">
              <CardContent className="pt-6">
                <h3 className="text-xl mb-2 text-primary-foreground">
                  Want to see more matches?
                </h3>
                <p className="text-primary-foreground/80 mb-4">
                  Upload another resume or refine your search criteria
                </p>
                <Button
                  onClick={() => navigate('/upload')}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Start New Search
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
