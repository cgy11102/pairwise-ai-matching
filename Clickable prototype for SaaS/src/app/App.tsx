import { BrowserRouter, Routes, Route } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { UploadResume } from "./components/UploadResume";
import { RequirementsForm } from "./components/RequirementsForm";
import { ResultsPage } from "./components/ResultsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/requirements" element={<RequirementsForm />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
