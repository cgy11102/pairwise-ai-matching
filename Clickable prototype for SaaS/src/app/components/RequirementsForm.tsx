import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Target, Plus, X } from "lucide-react";
import { useNavigate } from "react-router";

interface Requirement {
  id: string;
  text: string;
}

export function RequirementsForm() {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [requirements, setRequirements] = useState<Requirement[]>([
    { id: "1", text: "" }
  ]);
  const [questions, setQuestions] = useState<Requirement[]>([
    { id: "1", text: "" }
  ]);

  const addRequirement = () => {
    setRequirements([
      ...requirements,
      { id: Date.now().toString(), text: "" }
    ]);
  };

  const removeRequirement = (id: string) => {
    if (requirements.length > 1) {
      setRequirements(requirements.filter(req => req.id !== id));
    }
  };

  const updateRequirement = (id: string, text: string) => {
    setRequirements(
      requirements.map(req => req.id === id ? { ...req, text } : req)
    );
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now().toString(), text: "" }
    ]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const updateQuestion = (id: string, text: string) => {
    setQuestions(
      questions.map(q => q.id === id ? { ...q, text } : q)
    );
  };

  const handleFindMatches = () => {
    if (jobTitle && requirements.some(r => r.text)) {
      navigate('/results');
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
            <span className="text-xl font-semibold text-primary">TalentMatch AI</span>
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
                  <span className="text-secondary-foreground">✓</span>
                </div>
                <span className="text-secondary">Upload Resume</span>
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
                Add job requirements and interview questions to help our AI find the best matches
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Job Title */}
              <div className="space-y-2">
                <Label htmlFor="job-title" className="text-primary">Job Title</Label>
                <Input
                  id="job-title"
                  placeholder="e.g. Senior Frontend Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="border-border focus:border-primary"
                />
              </div>

              {/* Requirements */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-primary">Job Requirements</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addRequirement}
                    className="border-primary text-primary hover:bg-primary/5"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Requirement
                  </Button>
                </div>
                <div className="space-y-2">
                  {requirements.map((req, index) => (
                    <div key={req.id} className="flex gap-2">
                      <Input
                        placeholder={`Requirement ${index + 1} (e.g. 5+ years React experience)`}
                        value={req.text}
                        onChange={(e) => updateRequirement(req.id, e.target.value)}
                        className="flex-1 border-border focus:border-primary"
                      />
                      {requirements.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
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

              {/* Interview Questions */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-primary">Interview Questions (Optional)</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addQuestion}
                    className="border-primary text-primary hover:bg-primary/5"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Question
                  </Button>
                </div>
                <div className="space-y-2">
                  {questions.map((q, index) => (
                    <div key={q.id} className="flex gap-2">
                      <Textarea
                        placeholder={`Question ${index + 1} (e.g. Describe your experience with state management)`}
                        value={q.text}
                        onChange={(e) => updateQuestion(q.id, e.target.value)}
                        className="flex-1 border-border focus:border-primary min-h-[80px]"
                      />
                      {questions.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeQuestion(q.id)}
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
                <p className="text-sm text-primary mb-1">
                  How does this work?
                </p>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes the candidate's resume against your requirements and creates 
                  a semantic understanding of both. We then rank matching positions based on 
                  skill alignment, experience relevance, and cultural fit indicators.
                </p>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/upload')}
                  className="border-border text-foreground hover:bg-muted"
                >
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={handleFindMatches}
                  disabled={!jobTitle || !requirements.some(r => r.text)}
                  className="bg-primary hover:bg-primary/90 disabled:opacity-50"
                >
                  Find Matching Jobs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
