import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Target, Plus, Users, Briefcase, TrendingUp, ArrowRight, Clock } from "lucide-react";
import { useNavigate } from "react-router";
import { MOCK_ROLES } from "../../lib/mockData";

export function RecruiterDashboard() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState<string | null>(null);

  const totalInterested = MOCK_ROLES.reduce((sum, r) => sum + r.applicants, 0);
  const totalStrongMatches = MOCK_ROLES.reduce((sum, r) => sum + r.strongMatches, 0);

  const handleViewMatches = (roleId: string) => {
    const role = MOCK_ROLES.find((r) => r.id === roleId);
    if (role) {
      sessionStorage.setItem("pairwise_results", JSON.stringify(role.results));
      navigate("/recruiter/results");
    }
  };

  const departmentColor: Record<string, string> = {
    Engineering: "bg-primary/10 text-primary",
    Product: "bg-accent/30 text-accent-foreground",
    "Data & AI": "bg-secondary/20 text-secondary",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-primary">Pairwise</span>
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-secondary/20 text-secondary font-medium">
              Recruiter
            </span>
          </div>
          <Button
            onClick={() => navigate("/recruiter/post")}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Post New Role
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto">
          {/* Page Heading */}
          <div className="mb-8">
            <h1 className="text-3xl text-primary mb-1">Recruiter Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your open roles and review AI-matched candidates.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            <Card className="border-secondary/30">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-primary">{MOCK_ROLES.length}</p>
                    <p className="text-sm text-muted-foreground">Active Roles</p>
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
                    <p className="text-2xl font-semibold text-primary">{totalInterested}</p>
                    <p className="text-sm text-muted-foreground">Total Interested</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-secondary/30">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-primary">{totalStrongMatches}</p>
                    <p className="text-sm text-muted-foreground">Strong Matches</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Roles List */}
          <div className="space-y-4">
            <h2 className="text-xl text-primary">Posted Roles</h2>

            {MOCK_ROLES.map((role) => (
              <Card
                key={role.id}
                className={`transition-all cursor-pointer hover:shadow-md ${activeRole === role.id ? "ring-2 ring-primary" : ""
                  }`}
                onClick={() =>
                  setActiveRole(activeRole === role.id ? null : role.id)
                }
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <CardTitle className="text-primary">{role.title}</CardTitle>
                        <Badge
                          className={`border-0 text-xs ${departmentColor[role.department] ?? "bg-muted/20 text-muted-foreground"
                            }`}
                        >
                          {role.department}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                          {role.location}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{role.company}</p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground flex-shrink-0 mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Posted {role.postedDays}d ago</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {role.description}
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {role.applicants} interested
                      </span>
                      <span className="flex items-center gap-1.5 text-secondary font-medium">
                        <TrendingUp className="w-4 h-4" />
                        {role.strongMatches} strong matches
                      </span>
                    </div>

                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewMatches(role.id);
                      }}
                      className="bg-primary hover:bg-primary/90"
                    >
                      View Matches <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                    </Button>
                  </div>

                  {/* Expanded requirements */}
                  {activeRole === role.id && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-primary mb-2">Requirements</p>
                          <ul className="space-y-1">
                            {role.requirements.map((req, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {role.preferred.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-primary mb-2">Preferred</p>
                            <ul className="space-y-1">
                              {role.preferred.map((pref, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-accent-foreground/40 mt-1.5 flex-shrink-0" />
                                  {pref}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Post new role CTA */}
          <div className="mt-8">
            <Card className="border-dashed border-2 border-border bg-transparent hover:border-primary/40 transition-colors cursor-pointer"
              onClick={() => navigate("/recruiter/post")}
            >
              <CardContent className="pt-6 pb-6 flex items-center justify-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Plus className="w-5 h-5" />
                <span className="font-medium">Post a new role</span>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
