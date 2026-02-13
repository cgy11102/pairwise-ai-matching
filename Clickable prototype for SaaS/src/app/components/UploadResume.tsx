import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Upload, FileText, CheckCircle, Target } from "lucide-react";
import { useNavigate } from "react-router";

export function UploadResume() {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setUploadedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setUploadedFile(files[0]);
    }
  };

  const handleContinue = () => {
    if (uploadedFile) {
      navigate('/requirements');
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
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground">1</span>
                </div>
                <span className="text-primary">Upload Resume</span>
              </div>
              <div className="flex-1 h-px bg-border mx-4"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-muted-foreground">2</span>
                </div>
                <span className="text-muted-foreground">Requirements</span>
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
              <CardTitle className="text-primary">Upload Candidate Resume</CardTitle>
              <CardDescription>
                Upload the candidate's resume to get started with AI-powered job matching
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {uploadedFile ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-secondary" />
                    </div>
                    <div>
                      <p className="text-primary mb-1">File uploaded successfully!</p>
                      <p className="text-muted-foreground">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setUploadedFile(null)}
                      className="border-primary text-primary hover:bg-primary/5"
                    >
                      Upload Different File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-primary mb-2">
                        Drag and drop your resume here
                      </p>
                      <p className="text-muted-foreground mb-4">
                        or click to browse files
                      </p>
                      <label htmlFor="file-upload">
                        <Button
                          type="button"
                          className="bg-primary hover:bg-primary/90"
                          onClick={() => document.getElementById('file-upload')?.click()}
                        >
                          Select File
                        </Button>
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileSelect}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Supports PDF, DOC, DOCX, and TXT files
                    </p>
                  </div>
                )}
              </div>

              {/* Example Resume Info */}
              <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-accent-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-primary mb-1">
                      What happens next?
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Our AI will analyze the resume and extract key skills, experience, 
                      and qualifications. You'll then define job requirements to find the 
                      best matching positions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  size="lg"
                  onClick={handleContinue}
                  disabled={!uploadedFile}
                  className="bg-primary hover:bg-primary/90 disabled:opacity-50"
                >
                  Continue to Requirements
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
