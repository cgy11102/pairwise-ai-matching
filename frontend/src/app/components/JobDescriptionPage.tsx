import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Target, MapPin, Briefcase, ArrowLeft, CheckCircle, Sparkles, ThumbsUp, TrendingUp } from "lucide-react";
import { Badge } from "./ui/badge";
import { MOCK_ROLES } from "../../lib/mockData";

export function JobDescriptionPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState<any>(null);
    const [applied, setApplied] = useState(false);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleCheckFit = () => {
        setIsAnalyzing(true);
        // Simulate API call for AI analysis
        setTimeout(() => {
            setIsAnalyzing(false);
            setShowAnalysis(true);
        }, 1500);
    };

    useEffect(() => {
        // Scroll to top on load
        window.scrollTo(0, 0);
        // Find job from mock data
        const foundJob = MOCK_ROLES.find((r) => r.id === id);
        if (foundJob) {
            setJob(foundJob);
        }
    }, [id]);

    if (!job) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Card className="max-w-md w-full">
                    <CardContent className="pt-6 text-center">
                        <p className="text-primary mb-4">Job not found.</p>
                        <Button onClick={() => navigate('/candidate')} className="bg-primary hover:bg-primary/90">
                            Back to Dashboard
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-12">
            {/* Header */}
            <header className="border-b border-border bg-background sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <Target className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-semibold text-primary">Pairwise</span>
                        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-accent/30 text-accent-foreground font-medium">
                            Candidate
                        </span>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/candidate")}
                        className="text-muted-foreground hover:text-primary"
                    >
                        Back to Dashboard
                    </Button>
                </div>
            </header>

            <div className="container mx-auto px-4 mt-8">
                <div className="max-w-3xl mx-auto">
                    {/* Back button */}
                    <button
                        onClick={() => navigate("/candidate")}
                        className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Open Roles
                    </button>

                    <Card className="border-secondary/30 shadow-lg">
                        <CardHeader className="bg-primary/5 border-b border-border pb-6">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div>
                                    <CardTitle className="text-3xl text-primary mb-2">{job.title}</CardTitle>
                                    <CardDescription className="text-lg text-primary">{job.company}</CardDescription>

                                    <div className="flex items-center gap-4 mt-4 flex-wrap">
                                        <span className="flex items-center gap-1.5 text-sm text-muted-foreground bg-background px-2.5 py-1 rounded-md border border-border">
                                            <MapPin className="w-4 h-4" />
                                            {job.location}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-sm text-muted-foreground bg-background px-2.5 py-1 rounded-md border border-border">
                                            <Briefcase className="w-4 h-4" />
                                            {job.department}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Button (Desktop) */}
                                <div className="hidden md:block">
                                    {!showAnalysis ? (
                                        <Button
                                            size="lg"
                                            className="w-48 bg-primary hover:bg-primary/90 transition-all font-medium"
                                            onClick={handleCheckFit}
                                            disabled={isAnalyzing}
                                        >
                                            {isAnalyzing ? (
                                                <span className="flex items-center animate-pulse">
                                                    <Sparkles className="w-4 h-4 mr-2" /> Analyzing...
                                                </span>
                                            ) : (
                                                <><Sparkles className="w-4 h-4 mr-2" /> Check Skills Fit</>
                                            )}
                                        </Button>
                                    ) : (
                                        <Button
                                            size="lg"
                                            className={`w-40 transition-all ${applied ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90' : 'bg-primary hover:bg-primary/90'}`}
                                            onClick={() => setApplied(true)}
                                            disabled={applied}
                                        >
                                            {applied ? (
                                                <><CheckCircle className="w-4 h-4 mr-2" /> Interest Shown</>
                                            ) : (
                                                "Show Interest"
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="pt-8">
                            <div className="space-y-8">
                                {/* Description */}
                                <div>
                                    <h3 className="text-xl font-semibold text-primary mb-3">About the Role</h3>
                                    <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                                        <p>{job.description}</p>
                                    </div>
                                </div>

                                {/* Requirements */}
                                <div>
                                    <h3 className="text-xl font-semibold text-primary mb-3">What You Need</h3>
                                    <ul className="space-y-2">
                                        {job.requirements.map((req: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-2.5">
                                                <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0" />
                                                <span className="text-muted-foreground">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Preferred */}
                                {job.preferred && job.preferred.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-primary mb-3">Nice to Have</h3>
                                        <ul className="space-y-2">
                                            {job.preferred.map((pref: string, idx: number) => (
                                                <li key={idx} className="flex items-start gap-2.5">
                                                    <div className="w-1.5 h-1.5 bg-accent/80 rounded-full mt-2 flex-shrink-0" />
                                                    <span className="text-muted-foreground">{pref}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* AI Skills Fit Analysis Section */}
                                {showAnalysis && (
                                    <div className="mt-12 pt-8 border-t border-border animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex items-center gap-2 mb-6">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Sparkles className="w-4 h-4 text-primary" />
                                            </div>
                                            <h3 className="text-2xl font-bold rounded-lg text-primary">Pairwise Analysis</h3>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* Strengths */}
                                            <Card className="border-green-500/30 bg-green-500/5">
                                                <CardHeader className="pb-3 text-green-700 dark:text-green-500">
                                                    <CardTitle className="flex items-center text-lg">
                                                        <ThumbsUp className="w-5 h-5 mr-2" />
                                                        What you're doing well
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <ul className="space-y-3">
                                                        <li className="flex items-start gap-2 text-sm text-foreground/80">
                                                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-500 mt-0.5 shrink-0" />
                                                            <span>Strong alignment with required technical stack based on your recent projects.</span>
                                                        </li>
                                                        <li className="flex items-start gap-2 text-sm text-foreground/80">
                                                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-500 mt-0.5 shrink-0" />
                                                            <span>Demonstrated experience in similar industry domains.</span>
                                                        </li>
                                                    </ul>
                                                </CardContent>
                                            </Card>

                                            {/* Areas for Growth */}
                                            <Card className="border-warning/30 bg-warning/5">
                                                <CardHeader className="pb-3 text-warning-foreground">
                                                    <CardTitle className="flex items-center text-lg">
                                                        <TrendingUp className="w-5 h-5 mr-2" />
                                                        Areas for growth
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <ul className="space-y-3">
                                                        <li className="flex items-start gap-2 text-sm text-foreground/80">
                                                            <div className="w-4 h-4 rounded-full bg-warning/20 flex items-center justify-center mt-0.5 shrink-0">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-warning" />
                                                            </div>
                                                            <span>Less direct experience with team leadership, though you have good collaborative skills.</span>
                                                        </li>
                                                        <li className="flex items-start gap-2 text-sm text-foreground/80">
                                                            <div className="w-4 h-4 rounded-full bg-warning/20 flex items-center justify-center mt-0.5 shrink-0">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-warning" />
                                                            </div>
                                                            <span>Missing some nice-to-have specific tool certifications mentioned in the job post.</span>
                                                        </li>
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        {/* Bottom Apply (Mobile layout usually handles the sticky one) */}
                                        <div className="mt-8 flex justify-center md:hidden">
                                            <Button
                                                size="lg"
                                                className={`w-full max-w-sm transition-all ${applied ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90' : 'bg-primary hover:bg-primary/90'}`}
                                                onClick={() => setApplied(true)}
                                                disabled={applied}
                                            >
                                                {applied ? (
                                                    <><CheckCircle className="w-4 h-4 mr-2" /> Interest Shown</>
                                                ) : (
                                                    "Show Interest"
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Button (Mobile Sticky Bottom) */}
                    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border md:hidden z-20">
                        {!showAnalysis ? (
                            <Button
                                className="w-full bg-primary hover:bg-primary/90"
                                onClick={handleCheckFit}
                                disabled={isAnalyzing}
                                size="lg"
                            >
                                {isAnalyzing ? (
                                    <span className="flex items-center animate-pulse">
                                        <Sparkles className="w-4 h-4 mr-2" /> Analyzing...
                                    </span>
                                ) : (
                                    <><Sparkles className="w-4 h-4 mr-2" /> Check Skills Fit</>
                                )}
                            </Button>
                        ) : null /* The apply button is rendered inline above after analysis */}
                    </div>
                </div>
            </div>
        </div>
    );
}
