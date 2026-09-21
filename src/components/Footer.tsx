import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import {
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  Phone,
  ArrowUp,
  Heart,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { developer } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.reviews, href: '#reviews' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black text-neutral-900 dark:text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          {/* Brand Info (Col 5) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-md bg-neutral-950 dark:bg-white text-white dark:text-black flex items-center justify-center font-mono text-sm font-extrabold">
                AA
              </span>
              <span className="font-bold text-lg tracking-tight">
                Ariyan Akash
              </span>
              <span className="text-neutral-400 dark:text-neutral-600 font-mono text-xs">
                /&gt;
              </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed">
              Full Stack Developer specializing in building modern, responsive, and performant web applications with 3+ years of experience.
            </p>
            <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              {developer.location} • Available for Remote Work
            </div>
          </div>

          {/* Quick Nav Links (Col 4) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs uppercase font-mono tracking-wider font-bold text-neutral-400">
              Navigation
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect & Back to Top (Col 3) */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between space-y-4">
            <div className="space-y-2 text-left md:text-right">
              <div className="text-xs uppercase font-mono tracking-wider font-bold text-neutral-400">
                Direct Contact
              </div>
              <a
                href={`mailto:${developer.email}`}
                className="block text-xs font-mono text-neutral-600 dark:text-neutral-300 hover:underline"
              >
                {developer.email}
              </a>
              <a
                href={`tel:${developer.phone}`}
                className="block text-xs font-mono text-neutral-600 dark:text-neutral-300 hover:underline"
              >
                {developer.phone}
              </a>
            </div>

            {/* Back to Top */}
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              aria-label="Back to Top"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <div>
            © {new Date().getFullYear()} Ariyan Akash. All rights reserved.
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href={developer.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={developer.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={developer.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={developer.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
