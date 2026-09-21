import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { printResumeDocument, downloadResumeFile } from '../utils/printResume';
import {
  X,
  Download,
  Printer,
  ExternalLink,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  MapPin,
  CheckCircle2,
  FileCheck,
  Loader2,
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { developer, skills, experience, projects } = portfolioData;
  const [isPrinting, setIsPrinting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [printSuccess, setPrintSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePrint = async () => {
    setIsPrinting(true);
    try {
      const ok = await printResumeDocument();
      if (ok) {
        setPrintSuccess(true);
        setTimeout(() => setPrintSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Print trigger error:', err);
    } finally {
      setIsPrinting(false);
    }
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDownloading(true);
    try {
      await downloadResumeFile();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      id="resume-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="modal-card relative w-full max-w-4xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar (Hidden on print) */}
        <div className="modal-top-bar px-4 sm:px-6 py-3.5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/70 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs uppercase font-bold tracking-wider text-neutral-800 dark:text-neutral-200">
              Curriculum Vitae (2-Page Verified)
            </span>
            {printSuccess && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                <FileCheck className="w-3 h-3" />
                Print ready
              </span>
            )}
            {downloadSuccess && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                <CheckCircle2 className="w-3 h-3" />
                PDF downloaded (675 KB)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* View Raw PDF in New Tab */}
            <a
              href="/resume.pdf?v=2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shadow-xs"
              title="Open full PDF in a new browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
              <span className="hidden sm:inline">Open in Tab</span>
            </a>

            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              disabled={isPrinting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
              title="Print Resume"
            >
              {isPrinting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-neutral-500" />
              ) : (
                <Printer className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-300" />
              )}
              <span>{isPrinting ? 'Preparing...' : 'Print'}</span>
            </button>

            {/* Download PDF Button */}
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-black text-xs font-bold hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50 cursor-pointer"
              title="Download official PDF resume (675 KB)"
            >
              {isDownloading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close CV Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div
          id="printable-resume"
          className="flex-1 p-6 sm:p-10 overflow-y-auto space-y-8 text-neutral-900 dark:text-neutral-100 print:text-black print:p-0"
        >
          {/* Header */}
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-5">
              <div className="relative w-20 h-24 sm:w-22 sm:h-28 rounded-xl overflow-hidden border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 shrink-0 shadow-sm">
                <img
                  src={developer.profileImage}
                  alt={developer.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
                  {developer.name}
                </h1>
                <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 font-mono mt-1">
                  {developer.role} • 3+ Years Experience
                </p>
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Remote / Worldwide (Dhaka, Bangladesh)</span>
                </div>
              </div>
            </div>

            <div className="text-xs font-mono space-y-1.5 text-neutral-600 dark:text-neutral-400 self-stretch sm:self-auto bg-neutral-50 dark:bg-neutral-900/40 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <a href={`mailto:${developer.email}`} className="hover:underline">
                  {developer.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <a href={developer.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {developer.displayPhone} (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <a href="https://akash31.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  akash31.vercel.app
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <a href={developer.socials.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  github.com/ariyanakashbd
                </a>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs uppercase font-mono tracking-wider font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
              <span>Professional Summary</span>
            </h2>
            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              Results-driven Full Stack Developer with 3+ years of practical experience engineering modern, accessible, and scalable web applications. Adept across the complete development lifecycle from responsive React and Next.js frontends to secure Node.js RESTful APIs and optimized databases (MongoDB, Supabase, Firebase). Passionate about clean architecture, reusable component systems, rapid page-load performance, and delivering robust digital solutions tailored to client and business needs.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h2 className="text-xs uppercase font-mono tracking-wider font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
              <span>Technical Competencies</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {skills.map((cat) => (
                <div
                  key={cat.category}
                  className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40"
                >
                  <div className="font-bold font-mono mb-1 text-neutral-900 dark:text-white">
                    {cat.category}
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h2 className="text-xs uppercase font-mono tracking-wider font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
              <span>Work & Development Experience</span>
            </h2>
            <div className="space-y-4">
              {experience.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/20 space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-sm font-bold text-neutral-950 dark:text-white">
                      {item.title} — <span className="text-neutral-500 font-normal">{item.subtitle}</span>
                    </h3>
                    <span className="text-xs font-mono font-semibold text-neutral-600 dark:text-neutral-300">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    {item.description}
                  </p>
                  <ul className="text-xs text-neutral-700 dark:text-neutral-300 space-y-1.5 mt-2">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-3">
            <h2 className="text-xs uppercase font-mono tracking-wider font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
              <span>Key Selected Web Projects</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/30 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-neutral-950 dark:text-white text-sm">
                        {proj.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                        {proj.category}
                      </span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 text-xs mt-2 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-neutral-500 truncate max-w-[170px]">
                      {proj.technologies.slice(0, 3).join(', ')}
                    </span>
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-900 dark:text-white font-semibold hover:underline inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Live App</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Credentials */}
          <div className="space-y-3">
            <h2 className="text-xs uppercase font-mono tracking-wider font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
              <span>Education & Credentials</span>
            </h2>
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/20 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-neutral-900 dark:text-white">
                <span>Bachelor of Science in Computer Science & Engineering (B.Sc in CSE)</span>
                <span className="font-mono text-neutral-500">Graduated</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">
                Core Coursework: Data Structures, Algorithms, Web Engineering, Database Management Systems, Software Architecture.
              </p>
            </div>
          </div>

          {/* Footer of CV */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-mono gap-2">
            <span>Portfolio: https://akash31.vercel.app/</span>
            <span>GitHub: github.com/ariyanakashbd</span>
          </div>
        </div>
      </div>
    </div>
  );
};
