import React from "react";
import { Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import BackgroundDoodles from "./components/BackgroundDoodles";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import SelectedWorkSection from "./components/SelectedWorkSection";
import FinalSection from "./components/FinalSection";
import ContactPage from "./pages/ContactPage";   // ✅ new import

// Portfolio homepage
function PortfolioPage() {
  return (
    <div className="bg-[var(--bg)] text-white min-h-screen font-sans relative">
      <BackgroundDoodles />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <SelectedWorkSection />
      <ProjectsSection />
      <FinalSection
        avatar="/assets/avatar.png"
        resumeHref="/Keshav_CV.pdf"
        linkedinHref="https://www.linkedin.com/in/your-handle"
        instagramHref="https://www.instagram.com/your-handle"
      />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}
