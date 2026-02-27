import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Target, TrendingUp, CheckCircle, ArrowRight, Users, Mail, Send } from "lucide-react";
import { useNavigate } from "react-router";
import type { MatchPayload, MatchResult } from "../../lib/api";
import { CandidateDetailsPage } from "./CandidateDetailsPage"; // Added import for CandidateDetailsPage

const tagStyles: Record<string, { bg: string; text: string }> = {
  strong_match: { bg: "bg-secondary/10", text: "text-secondary" },
  good_match: { bg: "bg-accent/20", text: "text-accent-foreground" },
  review: { bg: "bg-muted/20", text: "text-muted-foreground" },
  below_threshold: { bg: "bg-destructive/10", text: "text-destructive" },
};

export function ResultsPage() {
  const navigate = useNavigate();
  const [results, setResults] = useState<MatchPayload | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<MatchResult | null>(null);
  const [advancingCandidate, setAdvancingCandidate] = useState<MatchResult | null>(null);
  const [emailBody, setEmailBody] = useState("");

  // Update email body when advancing a candidate
  useEffect(() => {
    if (advancingCandidate && results) {
      setEmailBody(`Hi ${advancingCandidate.candidate_name},\n\We were impressed by your background and would love to schedule a first interview with you for the ${results.job_title} role.\n\nPlease let us know your availability using the link below:\n[Insert Scheduling Link]\n\nBest,\nPairwise Recruiting Team`);
    }
  }, [advancingCandidate, results]);

  useEffect(() => {
    const stored = sessionStorage.getItem("pairwise_results");
    if (stored) {
      try {
        setResults(JSON.parse(stored));
      } catch {
        // Invalid data
      }
    }
  }, []);

  if (!results) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-primary mb-4">No match results found.</p>
            <Button onClick={() => navigate('/recruiter')} className="bg-primary hover:bg-primary/90">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const topScore = results.top_matches.length > 0
    ? (results.top_matches[0].match_score * 100).toFixed(0)
    : "0";
  const avgScore = results.top_matches.length > 0
    ? (results.top_matches.reduce((sum, m) => sum + m.match_score, 0) / results.top_matches.length * 100).toFixed(0)
    : "0";

  const getScoreColor = (score: number) => {
    if (score >= 0.82) return "text-secondary";
    if (score >= 0.65) return "text-accent-foreground";
    return "text-muted-foreground";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 0.82) return "bg-secondary/10";
    if (score >= 0.65) return "bg-accent/20";
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
            <span className="text-xl font-semibold text-primary">Pairwise</span>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/recruiter')}
            className="border-primary text-primary hover:bg-primary/5"
          >
            Back to Dashboard
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
                  <span className="text-secondary-foreground">&#10003;</span>
                </div>
                <span className="text-secondary">Upload Resumes</span>
              </div>
              <div className="flex-1 h-px bg-secondary mx-4"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-secondary-foreground">&#10003;</span>
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
            <h1 className="text-4xl mb-3 text-primary">Match Results: {results.job_title}</h1>
            <p className="text-muted-foreground">
              Top {results.top_matches.length} candidates ranked from {results.total_applicants} applicants by AI compatibility score
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
                    <p className="text-2xl font-semibold text-primary">{topScore}%</p>
                    <p className="text-sm text-muted-foreground">Highest Match</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-secondary/30">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-primary">{results.top_matches.length}</p>
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
                    <p className="text-2xl font-semibold text-primary">{avgScore}%</p>
                    <p className="text-sm text-muted-foreground">Avg Match Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {advancingCandidate ? (
            <div className="space-y-6">
              <Button
                variant="ghost"
                onClick={() => setAdvancingCandidate(null)}
                className="mb-2 text-muted-foreground hover:text-primary"
              >
                &larr; Back to Results
              </Button>
              <Card className="border-secondary/30 shadow-md">
                <CardHeader className="bg-muted/30 border-b border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-primary">Schedule Interview</CardTitle>
                      <p className="text-sm text-muted-foreground">Drafting email to {advancingCandidate.candidate_name}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div className="bg-background rounded p-3 border border-border">
                        <span className="text-muted-foreground block mb-1">Candidate</span>
                        <span className="font-medium text-primary">{advancingCandidate.candidate_name}</span>
                      </div>
                      <div className="bg-background rounded p-3 border border-border">
                        <span className="text-muted-foreground block mb-1">Role</span>
                        <span className="font-medium text-primary">{results?.job_title}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary">Message</label>
                      <textarea
                        className="w-full h-48 p-4 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y text-foreground"
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-border">
                      <Button
                        variant="outline"
                        onClick={() => setAdvancingCandidate(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                        onClick={() => {
                          alert(`Email sent to ${advancingCandidate.candidate_name}! Candidate advanced.`);
                          setAdvancingCandidate(null);
                        }}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send & Advance
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <>
              {/* Candidate Cards */}
              <div className="space-y-4">
                {results.top_matches.map((match, index) => {
                  const pct = (match.match_score * 100).toFixed(1);
                  const tag = tagStyles[match.ats_tag] || tagStyles.review;

                  return (
                    <Card
                      key={match.candidate_id}
                      className={`transition-all cursor-pointer hover:shadow-lg ${selectedCandidate?.candidate_id === match.candidate_id ? 'ring-2 ring-primary' : ''
                        }`}
                      onClick={() =>
                        setSelectedCandidate(
                          selectedCandidate?.candidate_id === match.candidate_id ? null : match
                        )
                      }
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">
                                {index + 1}
                              </span>
                              <CardTitle className="text-primary">{match.candidate_name}</CardTitle>
                              <Badge
                                variant="secondary"
                                className={`${tag.bg} ${tag.text} border-0`}
                              >
                                {match.ats_tag.replace(/_/g, ' ')}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Candidate ID: {match.candidate_id}
                            </p>
                          </div>
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center ${getScoreBgColor(match.match_score)} flex-shrink-0`}
                          >
                            <span className={`text-2xl font-semibold ${getScoreColor(match.match_score)}`}>
                              {pct.split('.')[0]}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Match Score Bar */}
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Match Score</span>
                              <span className={`font-medium ${getScoreColor(match.match_score)}`}>{pct}%</span>
                            </div>
                            <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${match.match_score >= 0.82 ? 'bg-secondary' :
                                  match.match_score >= 0.65 ? 'bg-accent' : 'bg-muted'
                                  }`}
                                style={{ width: `${parseFloat(pct)}%` }}
                              />
                            </div>
                          </div>

                          {/* Fit Evidence — shown when selected */}
                          {selectedCandidate?.candidate_id === match.candidate_id && (
                            <div className="pt-4 border-t border-border">
                              <p className="text-sm text-primary mb-3">Fit Evidence:</p>
                              <div className="space-y-2">
                                {match.fit_evidence.map((ev, i) => (
                                  <div key={i} className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                                    <div>
                                      <p className="text-sm text-muted-foreground">{ev.point}</p>
                                      {ev.category && (
                                        <Badge variant="outline" className="mt-1 text-xs border-secondary/50 text-secondary-foreground bg-secondary/5">
                                          {ev.category.replace(/_/g, ' ')}
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="mt-4 flex gap-3">
                                <Button
                                  className="bg-primary hover:bg-primary/90"
                                  onClick={() => setAdvancingCandidate(match)}
                                >
                                  Advance Candidate <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  className="border-primary text-primary hover:bg-primary/5"
                                  onClick={() => {
                                    sessionStorage.setItem("pairwise_active_candidate", JSON.stringify(match));
                                    navigate(`/recruiter/candidate/${match.candidate_id}`);
                                  }}
                                >
                                  Dive Deeper
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}

          {/* Bottom CTA */}
          <div className="mt-8 text-center">
            <Card className="bg-primary">
              <CardContent className="pt-6">
                <h3 className="text-xl mb-2 text-primary-foreground">
                  Want to match more candidates?
                </h3>
                <p className="text-primary-foreground/80 mb-4">
                  Upload additional resumes or refine your job requirements
                </p>
                <Button
                  onClick={() => navigate('/recruiter')}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Back to Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
