import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { downloadResumeFile } from '../utils/printResume';
import {
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  Phone,
  FileText,
  ArrowDown,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Download,
  Maximize2,
  X,
  Loader2,
} from 'lucide-react';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  const { t } = useLanguage();
  const { developer } = portfolioData;

  // Subtle Tagline Rotation in Fixed Height Container to prevent layout jumping
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % developer.taglines.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [developer.taglines.length]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Presentation & Content (Col 7) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Status / Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-800 bg-neutral-100/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200 text-xs font-medium tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{t.hero.availableForWork}</span>
              <span className="text-neutral-400 dark:text-neutral-600">•</span>
              <span className="text-neutral-500 dark:text-neutral-400 font-mono text-[11px]">{developer.location}</span>
            </div>

            {/* Name & Title */}
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-widest font-mono text-neutral-500 dark:text-neutral-400">
                {t.hero.greeting}
              </div>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.08]">
                Ariyan Akash
              </h1>

              {/* Tagline Container with Fixed Height to Prevent Layout Shifting */}
              <div className="h-10 sm:h-12 flex items-center overflow-hidden">
                <div
                  key={taglineIndex}
                  className="font-mono text-xl sm:text-2xl font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-2 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
                >
                  <span className="text-neutral-400 dark:text-neutral-600">~</span>
                  <span>{developer.taglines[taglineIndex]}</span>
                </div>
              </div>
            </div>

            {/* Professional Introduction Statement */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
              {developer.intro}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
              {/* View Projects */}
              <button
                id="hero-view-projects-btn"
                type="button"
                onClick={() => handleScrollTo('projects')}
                className="px-5 py-3 rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-black font-semibold text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{t.hero.viewProjects}</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              {/* Download Resume Button */}
              <button
                id="hero-download-resume-btn"
                type="button"
                onClick={async () => {
                  setIsDownloading(true);
                  try {
                    await downloadResumeFile();
                  } finally {
                    setIsDownloading(false);
                  }
                }}
                disabled={isDownloading}
                className="px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-semibold text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-neutral-500" />
                ) : (
                  <Download className="w-4 h-4 text-neutral-500" />
                )}
                <span>{isDownloading ? 'Downloading...' : t.hero.downloadResume}</span>
              </button>

              {/* View Resume in Modal */}
              <button
                id="hero-view-resume-btn"
                type="button"
                onClick={onOpenResumeModal}
                className="px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium text-sm hover:text-black dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-900/60 transition-all flex items-center justify-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>{t.hero.viewResume}</span>
              </button>

              {/* Contact Me */}
              <button
                id="hero-contact-me-btn"
                type="button"
                onClick={() => handleScrollTo('contact')}
                className="px-4 py-3 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white font-medium text-sm transition-all flex items-center justify-center gap-1.5"
              >
                <span>{t.hero.contactMe}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Social Icons Strip */}
            <div className="pt-4 flex items-center gap-3 border-t border-neutral-200 dark:border-neutral-800/80 w-full">
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mr-1">Connect:</span>
              <a
                href={developer.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 rounded-md text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={developer.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 rounded-md text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={developer.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Profile"
                className="p-2 rounded-md text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={developer.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="p-2 rounded-md text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${developer.email}`}
                aria-label="Send Email"
                className="p-2 rounded-md text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={developer.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Chat"
                className="p-2 rounded-md text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Profile Presentation (Col 5) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end  items-center">
            <div className="relative w-full  max-w-sm sm:max-w-md">
              {/* Outer decorative border container */}
              <div className="relative rounded-3xl p-3 bg-gradient-to-b from-white via-neutral-50 to-neutral-100 dark:from-neutral-900 dark:via-neutral-900/90 dark:to-neutral-950 border border-neutral-200/90 dark:border-neutral-800 shadow-2xl transition-all duration-300">
                {/* Full Portrait Container - 2:3 Aspect Ratio for Full Uncropped Image */}
                <div
                  className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 shadow-inner group cursor-pointer"
                  onClick={() => setIsLightboxOpen(true)}
                  title="Click to view full photo"
                >
                  {!imageError ? (
                    <img
                   
                      src='/images/main-image.jpg'
                      alt="Ariyan Akash - Full Stack Developer"
                      loading="eager"
                      referrerPolicy="no-referrer"
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageError(true)}
                      className={`w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-[1.02] ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-neutral-900 text-white">
                      <div className="w-20 h-20 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-2xl font-bold font-mono text-white mb-3">
                        AA
                      </div>
                      <h3 className="font-bold text-lg">Ariyan Akash</h3>
                      <p className="text-neutral-400 text-xs mt-1">Full Stack Developer</p>
                    </div>
                  )}

                  {/* Hover Click To Expand Pill */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-3 h-3" />
                    <span>Full View</span>
                  </div>

                  {/* Subtle Online Badge at Top Left */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Available for Work</span>
                  </div>
                </div>

                {/* Experience & Tech Focus Stats Strip - Positioned Below Image So Nothing Blocks The Photo */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800/80 shadow-xs">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 dark:text-neutral-400">
                      Experience
                    </div>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>3+ Years Web Dev</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800/80 shadow-xs">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 dark:text-neutral-400">
                      Tech Focus
                    </div>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white mt-0.5 font-mono">
                      React • Node.js
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Subtle Accent Tag */}
              <div className="absolute -top-3 -right-2 px-3 py-1 rounded-full bg-white dark:bg-black border border-neutral-300 dark:border-neutral-700 shadow-md flex items-center gap-1.5 text-[11px] font-mono font-medium text-neutral-900 dark:text-neutral-200">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                <span>Ariyan Akash</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Image Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-2xl max-h-[92vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <img
                src="/images/main-image.jpg"
                alt="Ariyan Akash - Full Stack Developer"
                className="max-h-[82vh] w-auto object-contain rounded-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-3 text-center text-white/80 font-mono text-xs">
              Ariyan Akash (আরিয়ান আকাশ) • Full Stack Developer
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
