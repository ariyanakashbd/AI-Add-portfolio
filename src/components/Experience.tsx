import React from 'react';
import { portfolioData, ExperienceItem } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Briefcase, Calendar, CheckCircle2, Award, Terminal } from 'lucide-react';

export const Experience: React.FC = () => {
  const { t } = useLanguage();
  const { experience } = portfolioData;

  return (
    <section
      id="experience"
      className="py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-950/50"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white" />
            <span>{t.experience.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
            {t.experience.title}
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {t.experience.subtitle}
          </p>
        </div>

        {/* Experience Banner Card */}
        <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs uppercase font-mono tracking-wider text-neutral-500 dark:text-neutral-400">
              {t.experience.yearsHighlight}
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
              Proven Track Record in Modern Full Stack Systems
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200">
              Continuous Production Work
            </div>
          </div>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-neutral-200 dark:border-neutral-800 ml-3 sm:ml-6 space-y-12">
          {experience.map((item: ExperienceItem, idx: number) => (
            <div key={idx} className="relative pl-6 sm:pl-10 group">
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-black border-2 border-neutral-900 dark:border-white transition-colors group-hover:scale-125" />

              <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/40 hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors space-y-4">
                {/* Period & Role Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
                      {item.title}
                    </h3>
                    <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {item.subtitle}
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {item.description}
                </p>

                {/* Highlights List */}
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
                  <div className="text-xs uppercase font-mono text-neutral-500 dark:text-neutral-400">
                    {t.experience.keyAchievements}
                  </div>
                  <ul className="space-y-1.5">
                    {item.highlights.map((highlight: string, hIdx: number) => (
                      <li
                        key={hIdx}
                        className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-neutral-400 dark:text-neutral-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
