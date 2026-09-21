import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import {
  Code,
  Layers,
  Globe2,
  Terminal,
  Zap,
  CheckCircle,
  Cpu,
  Database,
  Layout,
} from 'lucide-react';

export const About: React.FC = () => {
  const { t } = useLanguage();
  const { developer } = portfolioData;

  const corePillars = [
    {
      title: 'Frontend Engineering',
      desc: 'Expertise in building component-based interfaces using React, Next.js, TypeScript, and modern JavaScript, coupled with Tailwind CSS for pixel-precise layouts.',
      icon: Layout,
    },
    {
      title: 'Backend & REST APIs',
      desc: 'Developing robust server logic with Node.js and Express.js, featuring secure authentication (JWT), request validation, and clean RESTful endpoint architecture.',
      icon: Terminal,
    },
    {
      title: 'Data & Cloud Integration',
      desc: 'Connecting applications to structured databases including MongoDB, Supabase (PostgreSQL), and Firebase, alongside external third-party API services via Axios.',
      icon: Database,
    },
    {
      title: 'Responsive Craftsmanship',
      desc: 'Prioritizing mobile-first design, fluid grid systems, sub-second loading performance, and accessibility across phones, tablets, and desktops.',
      icon: Zap,
    },
  ];

  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-950/50"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white" />
            <span>{t.about.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
            {t.about.title}
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>

        {/* Narrative & Statistics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Story (Col 7) */}
          <div className="lg:col-span-7 space-y-6 text-neutral-700 dark:text-neutral-300 leading-relaxed text-base sm:text-lg">
            {/* Developer Identity Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <div className="relative w-16 h-20 rounded-xl overflow-hidden border border-neutral-300 dark:border-neutral-700 shrink-0 shadow-xs">
                <img
                  src="/images/main-image.jpg"
                  alt="Ariyan Akash"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 mb-1">
                  <span>Professional Bio</span>
                </div>
                <h4 className="font-bold text-neutral-950 dark:text-white text-base sm:text-lg">
                  Ariyan Akash 
                </h4>
                <p className="text-xs sm:text-sm font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Full Stack Web Developer • JavaScript / TypeScript / React / Node.js
                </p>
              </div>
            </div>

            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>

            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <h3 className="text-xs uppercase font-mono tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
                {t.about.coreCompetencies}
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'React.js',
                  'Node.js',
                  'Express.js',
                  'JavaScript (ES6+)',
                  'TypeScript',
                  'Next.js',
                  'Tailwind CSS',
                  'MongoDB',
                  'REST APIs',
                  'Responsive Web Design',
                  'API Integration',
                  'Supabase',
                  'Firebase',
                  'Git & GitHub',
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono rounded-md bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Metric Stats Cards (Col 5) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {developer.stats.map((stat, i) => (
              <div
                key={stat.label}
                className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 shadow-sm flex flex-col justify-between"
              >
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white">
                  {stat.value}
                </div>
                <div className="mt-3 text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                  {i === 0
                    ? t.about.yearsExp
                    : i === 1
                    ? t.about.completedProjects
                    : i === 2
                    ? t.about.codeQuality
                    : t.about.remoteWork}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {corePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-neutral-950 dark:text-white mb-2">
                  {pillar.title}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
