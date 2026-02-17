import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ArrowRight, Zap, Target, TrendingUp, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-primary">Pairwise</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate('/candidate')}
              className="border-primary text-primary hover:bg-primary/5"
            >
              Find Jobs
            </Button>
            <Button
              onClick={() => navigate('/recruiter')}
              className="bg-primary hover:bg-primary/90"
            >
              Post a Role
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-accent/20 rounded-full">
            <span className="text-sm text-primary">AI-Powered Recruitment Matching</span>
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 text-primary">
            Find Perfect Candidates in Minutes, Not Hours
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Pairwise uses resume and job embeddings to rank and explain the top 20 matches
            for each role, reducing screening time from hours to minutes for US mid-market
            SaaS teams hiring technical talent.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              onClick={() => navigate('/recruiter')}
              className="bg-primary hover:bg-primary/90"
            >
              I'm a Recruiter <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/candidate')}
              className="border-primary text-primary hover:bg-primary/5"
            >
              I'm a Candidate <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="bg-muted/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl text-center mb-12 text-primary">The Problem with Traditional Screening</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-destructive/20">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="mb-2 text-primary">Slow & Manual</h3>
                  <p className="text-muted-foreground">
                    Hours spent manually reviewing 150-500 resumes per role
                  </p>
                </CardContent>
              </Card>
              <Card className="border-destructive/20">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="mb-2 text-primary">Keyword Filters</h3>
                  <p className="text-muted-foreground">
                    ATS systems miss qualified candidates with non-standard backgrounds
                  </p>
                </CardContent>
              </Card>
              <Card className="border-destructive/20">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="mb-2 text-primary">Hidden Bias</h3>
                  <p className="text-muted-foreground">
                    Experience that doesn't fit on one page gets overlooked
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl text-center mb-12 text-primary">How Pairwise Works</h2>
            <div className="space-y-6">
              <Card className="border-secondary/30">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-primary">Upload Resumes</h3>
                      <p className="text-muted-foreground">
                        Upload candidate resumes in any format for AI-powered analysis
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-secondary/30">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-primary">Define Requirements</h3>
                      <p className="text-muted-foreground">
                        Add job requirements so our semantic engine can match beyond keywords
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-secondary/30">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-primary">Get Top 20 Matches</h3>
                      <p className="text-muted-foreground">
                        Receive ranked candidates with Match Scores, Fit Evidence, and ATS tags
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-4 text-primary-foreground">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join leading mid-market SaaS companies in finding the perfect technical talent faster
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              onClick={() => navigate('/recruiter')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Post a Role <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              onClick={() => navigate('/candidate')}
              className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border border-primary-foreground/30"
            >
              Find Jobs <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2026 Pairwise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
