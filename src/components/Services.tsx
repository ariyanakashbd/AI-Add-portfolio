import React from 'react';
import { portfolioData, Service } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import {
  Briefcase,
  ShoppingBag,
  GraduationCap,
  UserCheck,
  LayoutDashboard,
  Flame,
  Code2,
  Server,
  ArrowUpRight,
} from 'lucide-react';

interface ServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const { t } = useLanguage();
  const { services } = portfolioData;

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return Briefcase;
      case 'ShoppingBag':
        return ShoppingBag;
      case 'GraduationCap':
        return GraduationCap;
      case 'UserCheck':
        return UserCheck;
      case 'LayoutDashboard':
        return LayoutDashboard;
      case 'Flame':
        return Flame;
      case 'Code2':
        return Code2;
      case 'Server':
        return Server;
      default:
        return Code2;
    }
  };

  const handleInquire = (serviceTitle: string) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const navHeight = 80;
      const top = contactSection.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      className="py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-950/50"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white" />
            <span>{t.services.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
            {t.services.title}
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service: Service) => {
            const Icon = getServiceIcon(service.iconName);
            return (
              <div
                key={service.id}
                className="group relative p-6 sm:p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/60 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  {/* Top Row: Index number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 font-semibold">
                      /{service.number}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-neutral-950 dark:text-white mb-2.5 tracking-tight group-hover:text-black dark:group-hover:text-white">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleInquire(service.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>{t.services.requestService}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
