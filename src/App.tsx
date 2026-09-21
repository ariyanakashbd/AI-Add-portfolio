import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Reviews } from './components/Reviews';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AiAssistant } from './components/AiAssistant';
import { ResumeModal } from './components/ResumeModal';
import { Bot, Sparkles } from 'lucide-react';

function PortfolioApp() {
  const { t } = useLanguage();
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [selectedServiceSubject, setSelectedServiceSubject] = useState('');

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServiceSubject(serviceTitle);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 transition-colors duration-200 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* Navigation Header */}
      <Navbar onOpenAi={() => setAiAssistantOpen(true)} />

      {/* Main Content Sections */}
      <main id="main-content" tabIndex={-1}>
        {/* Hero Section */}
        <Hero onOpenResumeModal={() => setResumeModalOpen(true)} />

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Services Section */}
        <Services onSelectService={handleSelectService} />

        {/* Projects Showcase */}
        <Projects />

        {/* Experience Milestones */}
        <Experience />

        {/* Client Reviews (Swiper.js) */}
        <Reviews />

        {/* Contact & Inquiry Section */}
        <Contact selectedSubject={selectedServiceSubject} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating AI Agent Trigger Button (bottom-right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="floating-ai-agent-btn"
          type="button"
          onClick={() => setAiAssistantOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-black shadow-xl hover:scale-105 transition-all duration-200 border border-neutral-800 dark:border-neutral-200"
          aria-label="Ask Ariyan AI Representative"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <Bot className="w-4 h-4" />
          <span className="text-xs font-bold tracking-tight">Ask Ariyan</span>
        </button>
      </div>

      {/* AI Assistant Modal (Portfolio Representative) */}
      <AiAssistant
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
      />

      {/* Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PortfolioApp />
      </LanguageProvider>
    </ThemeProvider>
  );
}
