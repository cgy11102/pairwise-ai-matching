import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
    ArrowLeft, BrainCircuit, Target, CheckCircle, ListChecks, ArrowRight, XCircle
} from "lucide-react";
import type { MatchPayload } from "../../lib/api";

type CandidateMatch = MatchPayload["top_matches"][0];

export function CandidateDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [match, setMatch] = useState<CandidateMatch | null>(null);

    useEffect(() => {
        // In a real app, we'd fetch the candidate by ID.
        // For this demo, we stored the selected candidate match in sessionStorage.
        const storedMatch = sessionStorage.getItem("pairwise_active_candidate");
        if (storedMatch) {
            setMatch(JSON.parse(storedMatch));
        } else {
            // Fallback if accessed directly
            navigate("/recruiter");
        }
    }, [id, navigate]);

    if (!match) return null;

    return (
        <div className="min-h-screen bg-background pb-12">
            {/* Header */}
            <header className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-4">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="mb-4 text-muted-foreground hover:text-primary pl-0"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Results
                    </Button>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-primary">{match.candidate_name}</h1>
                                <Badge className="bg-primary/10 text-primary border-primary/20">
                                    {match.ats_tag.replace(/_/g, ' ')}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground flex items-center gap-2">
                                <Target className="w-4 h-4" /> Matched for: <span className="font-medium text-foreground">{match.job_id}</span>
                            </p>
                        </div>

                        {/* Top Action Buttons */}
                        <div className="flex gap-3">
                            <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                                <XCircle className="w-4 h-4 mr-2" /> Reject
                            </Button>
                            <Button className="bg-primary hover:bg-primary/90">
                                Advance Candidate <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 mt-8">
                <div className="grid lg:grid-cols-[1fr_340px] gap-8">

                    {/* Main Content: Deep Dive */}
                    <div className="space-y-6">
                        {/* Score Overview */}
                        <Card className="border-secondary/30 bg-secondary/5">
                            <CardContent className="pt-6 flex items-center gap-6">
                                <div className="w-24 h-24 rounded-full border-4 border-secondary flex items-center justify-center bg-background flex-shrink-0">
                                    <span className="text-3xl font-bold text-primary">
                                        {Math.round((match.match_score || 0) * 100)}%
                                    </span>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                        <BrainCircuit className="w-5 h-5 text-secondary" />
                                        AI Match Summary
                                    </h2>
                                    <p className="text-muted-foreground">
                                        {match.candidate_name} is an exceptionally strong fit for this role. Their expertise aligns perfectly with the core technical requirements, and their trajectory demonstrates the operational maturity necessary to succeed in this position.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Fit Evidence Categories */}
                        <div className="space-y-4">
                            <h3 className="text-xl text-primary font-medium flex items-center gap-2">
                                <ListChecks className="w-5 h-5" /> Evidence Breakdown
                            </h3>
                            <div className="grid gap-4">
                                {match.fit_evidence?.map((ev, i) => (
                                    <Card key={i} className="border-border shadow-sm">
                                        <CardContent className="pt-5 p-5 flex items-start gap-4">
                                            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                <CheckCircle className="w-4 h-4 text-secondary" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-foreground text-sm md:text-base leading-relaxed">
                                                    {ev.point}
                                                </p>
                                                {ev.category && (
                                                    <Badge variant="outline" className="mt-2 text-xs border-primary/20 text-primary bg-primary/5">
                                                        {ev.category.replace(/_/g, ' ').toUpperCase()}
                                                    </Badge>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Simulated Raw Data */}
                    <div className="space-y-6">
                        <Card className="border-border">
                            <CardHeader className="bg-muted/30 border-b border-border pb-4">
                                <CardTitle className="text-lg">Extracted Profile Data</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-4">
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Core Skills Found</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {["Python", "Go", "Kubernetes", "Distributed Systems", "SQL", "Docker"].map((sk, i) => (
                                            <Badge key={i} variant="secondary" className="font-normal">{sk}</Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="border-t border-border pt-4">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Experience Context</p>
                                    <p className="text-sm text-foreground">
                                        7+ years total experience. Primarily focused in B2B SaaS environments, scaled backend architectures for high user volume platforms.
                                    </p>
                                </div>
                                <div className="border-t border-border pt-4">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Missing/Gaps</p>
                                    <p className="text-sm text-foreground">
                                        No explicit mention of gRPC/Protobuf in recent roles, though foundational concepts are present.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}
