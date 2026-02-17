import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Target, Plus, X, MapPin, Briefcase, ArrowRight,
  CheckCircle, Upload, FileText, Trash2,
} from "lucide-react";
import { useNavigate } from "react-router";
import { MOCK_ROLES, CANDIDATE_MOCK_SCORE } from "../../lib/mockData";

const SUGGESTED_FIELDS = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "DevOps Engineer",
  "UX Designer",
  "ML Engineer",
];

type ExperienceLevel = "Junior" | "Mid" | "Senior";
type LocationPref = "Remote" | "Hybrid" | "On-site";
type MatchFilter = "All" | "Strong Match" | "Good Match";

const getScoreColor = (score: number) => {
  if (score >= 0.82) return "text-secondary";
  if (score >= 0.65) return "text-accent-foreground";
  return "text-muted-foreground";
};

const getScoreBg = (score: number) => {
  if (score >= 0.82) return "bg-secondary/10";
  if (score >= 0.65) return "bg-accent/20";
  return "bg-muted/20";
};

const getAtsTag = (score: number) => {
  if (score >= 0.82) return "Strong Match";
  if (score >= 0.65) return "Good Match";
  return "Partial Match";
};

export function CandidateDashboard() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile state
  const [name, setName] = useState("Your Name");
  const [desiredFields, setDesiredFields] = useState<string[]>(["Software Engineer"]);
  const [fieldInput, setFieldInput] = useState("");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>("Mid");
  const [locationPref, setLocationPref] = useState<LocationPref>("Remote");
  const [profileSaved, setProfileSaved] = useState(false);

  // Resume upload state
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Job board state
  const [matchFilter, setMatchFilter] = useState<MatchFilter>("All");

  // ── Field helpers ──
  const addField = (field: string) => {
    const trimmed = field.trim();
    if (trimmed && !desiredFields.includes(trimmed)) {
      setDesiredFields([...desiredFields, trimmed]);
    }
    setFieldInput("");
  };

  const removeField = (field: string) => {
    setDesiredFields(desiredFields.filter((f) => f !== field));
  };

  // ── Resume upload helpers ──
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setResumeFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setResumeFile(file);
  };

  // ── Profile save ──
  const handleSaveProfile = () => {
    if (resumeFile) {
      sessionStorage.setItem("pairwise_resume_filename", resumeFile.name);
    }
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  // ── Job board ──
  const handleViewRole = (roleId: string) => {
    const role = MOCK_ROLES.find((r) => r.id === roleId);
    if (role) {
      sessionStorage.setItem("pairwise_results", JSON.stringify(role.results));
      navigate("/recruiter/results");
    }
  };

  const filteredRoles = MOCK_ROLES.filter((role) => {
    if (matchFilter === "All") return true;
    const score = CANDIDATE_MOCK_SCORE[role.id] ?? 0;
    if (matchFilter === "Strong Match") return score >= 0.82;
    if (matchFilter === "Good Match") return score >= 0.65 && score < 0.82;
    return true;
  });

  const experienceLevels: ExperienceLevel[] = ["Junior", "Mid", "Senior"];
  const locationPrefs: LocationPref[] = ["Remote", "Hybrid", "On-site"];
  const matchFilters: MatchFilter[] = ["All", "Strong Match", "Good Match"];

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
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-accent/30 text-accent-foreground font-medium">
              Candidate
            </span>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/recruiter")}
            className="border-primary text-primary hover:bg-primary/5"
          >
            Switch to Recruiter
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[340px_1fr] gap-8 items-start">

            {/* ── Left Panel: Profile ── */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Your Profile</CardTitle>
                  <CardDescription>
                    Tell us what you're looking for — we'll surface the best matches.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">

                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="candidate-name" className="text-primary">Name</Label>
                    <Input
                      id="candidate-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border-border focus:border-primary"
                    />
                  </div>

                  {/* ── Resume Upload ── */}
                  <div className="space-y-2">
                    <Label className="text-primary">Resume</Label>

                    {resumeFile ? (
                      /* Uploaded state */
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-secondary/40 bg-secondary/5">
                        <div className="w-9 h-9 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4 text-secondary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-primary truncate">{resumeFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(resumeFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="p-1.5 rounded hover:bg-secondary/10 text-muted-foreground hover:text-primary transition-colors"
                            title="Replace file"
                          >
                            <Upload className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setResumeFile(null);
                              if (fileInputRef.current) fileInputRef.current.value = "";
                            }}
                            className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                            title="Remove file"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Drop zone */
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-colors ${
                          isDragging
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50 hover:bg-primary/2"
                        }`}
                      >
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Upload className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-sm text-primary font-medium mb-0.5">
                          Drop your resume here
                        </p>
                        <p className="text-xs text-muted-foreground">
                          or click to browse · PDF, DOC, TXT
                        </p>
                      </div>
                    )}

                    {/* Hidden file input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt,.json"
                      onChange={handleFileSelect}
                    />
                  </div>

                  {/* Desired Fields */}
                  <div className="space-y-2">
                    <Label className="text-primary">Desired Career Fields</Label>

                    {desiredFields.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {desiredFields.map((field) => (
                          <Badge
                            key={field}
                            className="bg-primary/10 text-primary border-0 flex items-center gap-1 pr-1"
                          >
                            {field}
                            <button
                              onClick={() => removeField(field)}
                              className="ml-0.5 rounded-full hover:bg-primary/20 p-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Suggestions */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {SUGGESTED_FIELDS.filter((f) => !desiredFields.includes(f)).map((f) => (
                        <button
                          key={f}
                          onClick={() => addField(f)}
                          className="text-xs px-2 py-1 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                        >
                          + {f}
                        </button>
                      ))}
                    </div>

                    {/* Custom input */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a custom field…"
                        value={fieldInput}
                        onChange={(e) => setFieldInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addField(fieldInput);
                          }
                        }}
                        className="border-border focus:border-primary text-sm"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addField(fieldInput)}
                        className="border-primary text-primary hover:bg-primary/5 flex-shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Experience Level */}
                  <div className="space-y-2">
                    <Label className="text-primary">Experience Level</Label>
                    <div className="flex gap-2">
                      {experienceLevels.map((level) => (
                        <Button
                          key={level}
                          size="sm"
                          variant="outline"
                          onClick={() => setExperienceLevel(level)}
                          className={`flex-1 transition-colors ${
                            experienceLevel === level
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                          }`}
                        >
                          {level}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Location Preference */}
                  <div className="space-y-2">
                    <Label className="text-primary">Location Preference</Label>
                    <div className="flex gap-2">
                      {locationPrefs.map((loc) => (
                        <Button
                          key={loc}
                          size="sm"
                          variant="outline"
                          onClick={() => setLocationPref(loc)}
                          className={`flex-1 transition-colors ${
                            locationPref === loc
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                          }`}
                        >
                          {loc}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Save button */}
                  <Button
                    onClick={handleSaveProfile}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {profileSaved ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Profile Updated!
                      </span>
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* ── Right Panel: Job Listings ── */}
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-xl text-primary">Open Roles Matching Your Profile</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Ranked by your compatibility score
                  </p>
                </div>

                {/* Filter tabs */}
                <div className="flex gap-1.5 p-1 bg-muted/10 rounded-lg border border-border">
                  {matchFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setMatchFilter(filter)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        matchFilter === filter
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {filteredRoles.length === 0 ? (
                <Card>
                  <CardContent className="pt-8 pb-8 text-center">
                    <p className="text-muted-foreground">No roles match this filter.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredRoles.map((role) => {
                    const score = CANDIDATE_MOCK_SCORE[role.id] ?? 0;
                    const pct = (score * 100).toFixed(0);

                    return (
                      <Card key={role.id} className="hover:shadow-md transition-all">
                        <CardContent className="pt-5 pb-5">
                          <div className="flex items-start gap-4">
                            {/* Match Score Ring */}
                            <div
                              className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${getScoreBg(score)}`}
                            >
                              <span className={`text-xl font-semibold ${getScoreColor(score)}`}>
                                {pct}
                              </span>
                            </div>

                            {/* Role Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div>
                                  <h3 className="text-primary font-medium leading-tight">
                                    {role.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">{role.company}</p>
                                </div>
                                <Badge
                                  className={`flex-shrink-0 border-0 text-xs ${
                                    score >= 0.82
                                      ? "bg-secondary/10 text-secondary"
                                      : score >= 0.65
                                      ? "bg-accent/30 text-accent-foreground"
                                      : "bg-muted/20 text-muted-foreground"
                                  }`}
                                >
                                  {getAtsTag(score)}
                                </Badge>
                              </div>

                              <div className="flex items-center gap-3 mb-3 flex-wrap">
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <MapPin className="w-3.5 h-3.5" />
                                  {role.location}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Briefcase className="w-3.5 h-3.5" />
                                  {role.department}
                                </span>
                              </div>

                              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                {role.description}
                              </p>

                              {/* Match score bar */}
                              <div className="mb-4">
                                <div className="h-1.5 bg-primary/10 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
                                      score >= 0.82
                                        ? "bg-secondary"
                                        : score >= 0.65
                                        ? "bg-accent"
                                        : "bg-muted"
                                    }`}
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                              </div>

                              <div className="flex items-center justify-between gap-3">
                                <div className="flex flex-wrap gap-1.5">
                                  {role.requirements.slice(0, 2).map((req, i) => (
                                    <Badge
                                      key={i}
                                      variant="outline"
                                      className="text-xs border-border text-muted-foreground"
                                    >
                                      {req}
                                    </Badge>
                                  ))}
                                </div>
                                <Button
                                  size="sm"
                                  onClick={() => handleViewRole(role.id)}
                                  className="bg-primary hover:bg-primary/90 flex-shrink-0"
                                >
                                  View Role <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
