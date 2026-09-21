import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../data/translations';
import { Sun, Moon, Globe, Menu, X, Bot, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenAi: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAi }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navHeight = 80;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: 'EN' },
    { code: 'bn', label: 'বাংলা', flag: 'BN' },
    { code: 'hi', label: 'हिन्दी', flag: 'HI' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/85 dark:bg-black/85 backdrop-blur-md border-b border-neutral-800/80 shadow-sm py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-2.5 text-neutral-900 dark:text-white font-bold tracking-tight text-lg"
          id="nav-logo"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-800 shrink-0 group-hover:ring-2 group-hover:ring-neutral-400 dark:group-hover:ring-neutral-500 transition-all">
            <img
              src="/images/main-image.jpg"
              alt="Ariyan Akash"
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="flex items-center">
            Ariyan Akash
            <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs ml-1 font-normal">
              
            </span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3 py-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white rounded-md hover:bg-neutral-100/80 dark:hover:bg-neutral-900/80 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Representative Trigger */}
          <button
            id="nav-ai-agent-btn"
            onClick={onOpenAi}
            type="button"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all shadow-sm"
            aria-label="Open AI Representative"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Bot className="w-3.5 h-3.5" />
            <span>{t.nav.aiAssistant}</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              id="lang-selector-btn"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              type="button"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Select Language"
              aria-expanded={langDropdownOpen}
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="uppercase font-mono">{language}</span>
            </button>

            {langDropdownOpen && (
              <div
                id="lang-dropdown-menu"
                className="absolute right-0 mt-2 w-32 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    type="button"
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between ${
                      language === lang.code
                        ? 'font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-white'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
                    }`}
                  >
                    <span>{lang.label}</span>
                    <span className="font-mono text-[10px] text-neutral-400 uppercase">{lang.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            type="button"
            className="p-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-neutral-300 hover:text-white transition-colors" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-700 hover:text-black transition-colors" />
            )}
          </button>

          {/* Hire Me CTA (Desktop) */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden md:inline-flex items-center gap-1 px-4 py-1.5 text-xs font-semibold rounded-md bg-neutral-950 dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all"
            id="nav-hire-btn"
          >
            {t.nav.hireMe}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="lg:hidden p-2 rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 mt-2 shadow-2xl animate-in slide-in-from-top-2 duration-200"
        >
          <div className="grid grid-cols-2 gap-1 pb-3 border-b border-neutral-200 dark:border-neutral-800">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAi();
              }}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs font-semibold"
            >
              <Bot className="w-4 h-4" />
              {t.nav.aiAssistant}
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-md bg-neutral-950 dark:bg-white text-white dark:text-black text-xs font-semibold"
            >
              {t.nav.hireMe}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
