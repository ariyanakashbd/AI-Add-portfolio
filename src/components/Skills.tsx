import React, { useState } from 'react';
import { portfolioData, SkillCategory } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import {
  Code2,
  Server,
  Database,
  Wrench,
  CheckCircle2,
  Terminal,
  Cpu,
  Boxes,
  ShieldCheck,
  FolderGit2,
} from 'lucide-react';

export const Skills: React.FC = () => {
  const { t } = useLanguage();
  const { skills } = portfolioData;
  const [activeTab, setActiveTab] = useState<string>('all');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend':
        return Code2;
      case 'Backend':
        return Server;
      case 'Database':
        return Database;
      default:
        return Wrench;
    }
  };

  const filteredCategories = activeTab === 'all'
    ? skills
    : skills.filter((c) => c.category.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <section
      id="skills"
      className="py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white" />
              <span>{t.skills.sectionTag}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
              {t.skills.title}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t.skills.subtitle}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
            {['all', 'frontend', 'backend', 'database', 'tools'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveTab(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
                  activeTab === cat
                    ? 'bg-neutral-950 dark:bg-white text-white dark:text-black font-semibold shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((group) => {
            const Icon = getCategoryIcon(group.category);
            return (
              <div
                key={group.category}
                className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40 shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-neutral-950 dark:text-white">
                          {group.category}
                        </h3>
                        <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                          {group.skills.length} core technologies
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills Tag Cloud & Detail Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {group.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/60 hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors flex flex-col justify-between group"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-sm text-neutral-900 dark:text-white group-hover:text-black dark:group-hover:text-white">
                            {skill.name}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-tight bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                            {skill.level}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1.5 leading-snug line-clamp-2">
                          {skill.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notice on Real Competencies (Respecting anti-slop mandate) */}
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950 text-center text-xs font-mono text-neutral-500 dark:text-neutral-400">
          {t.skills.noFakeBarsNotice}
        </div>
      </div>
    </section>
  );
};
