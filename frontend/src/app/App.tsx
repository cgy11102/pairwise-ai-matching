import { BrowserRouter, Routes, Route } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { UploadResume } from "./components/UploadResume";
import { RequirementsForm } from "./components/RequirementsForm";
import { ResultsPage } from "./components/ResultsPage";
import { RecruiterDashboard } from "./components/RecruiterDashboard";
import { CandidateDashboard } from "./components/CandidateDashboard";
import { JobDescriptionPage } from "./components/JobDescriptionPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Recruiter flow */}
        <Route path="/recruiter" element={<RecruiterDashboard />} />
        <Route path="/recruiter/post" element={<RequirementsForm />} />
        <Route path="/recruiter/results" element={<ResultsPage />} />
        {/* Candidate flow */}
        <Route path="/candidate" element={<CandidateDashboard />} />
        <Route path="/candidate/job/:id" element={<JobDescriptionPage />} />
        {/* Legacy routes kept for compatibility */}
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/requirements" element={<RequirementsForm />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
