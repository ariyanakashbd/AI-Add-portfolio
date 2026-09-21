import React, { useState } from 'react';
import { portfolioData, Project } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import {
  ExternalLink,
  Github,
  Maximize2,
  Grid,
  SlidersHorizontal,
  X,
  Sparkles,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const { projects } = portfolioData;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: t.projects.all },
    { id: 'E-commerce', label: t.projects.ecommerce },
    { id: 'Full Stack', label: t.projects.fullstack },
    { id: 'Web App', label: t.projects.webapp },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      className="py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white" />
              <span>{t.projects.sectionTag}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
              {t.projects.title}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t.projects.subtitle}
            </p>
          </div>

          {/* Controls: Filter Pills & View Mode Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter */}
            <div className="flex items-center gap-1 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-neutral-950 dark:bg-white text-white dark:text-black font-semibold shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* View Mode Switcher */}
            <div className="hidden sm:flex items-center p-1 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-neutral-950 dark:bg-white text-white dark:text-black'
                    : 'text-neutral-500 hover:text-black dark:hover:text-white'
                }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('carousel')}
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  viewMode === 'carousel'
                    ? 'bg-neutral-950 dark:bg-white text-white dark:text-black'
                    : 'text-neutral-500 hover:text-black dark:hover:text-white'
                }`}
                title="Slider View"
                aria-label="Slider View"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Projects View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenModal={() => setActiveModalProject(project)}
                t={t}
              />
            ))}
          </div>
        ) : (
          <div className="relative pb-12">
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
              }}
              navigation
              pagination={{ clickable: true }}
              className="py-4"
            >
              {filteredProjects.map((project) => (
                <SwiperSlide key={project.id} className="h-auto">
                  <ProjectCard
                    project={project}
                    onOpenModal={() => setActiveModalProject(project)}
                    t={t}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Project Detail Modal */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="relative w-full max-w-2xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-black dark:hover:text-white"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="aspect-video w-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div>
                <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 mb-2">
                  {activeModalProject.category}
                </div>
                <h3 className="text-2xl font-bold text-neutral-950 dark:text-white">
                  {activeModalProject.name}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                  {activeModalProject.detailedDescription || activeModalProject.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase font-mono text-neutral-500 dark:text-neutral-400 mb-2">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <a
                  href={activeModalProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-black font-semibold text-xs text-center flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t.projects.viewLive}</span>
                </a>
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>{t.projects.viewCode}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  onOpenModal: () => void;
  t: any;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal, t }) => {
  return (
    <div className="group rounded-2xl border border-neutral-200 dark:border-neutral-800/90 bg-white dark:bg-neutral-950 overflow-hidden flex flex-col justify-between shadow-xs hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200">
      <div>
        {/* Preview Frame */}
        <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800/80">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <button
            type="button"
            onClick={onOpenModal}
            className="absolute top-3 right-3 p-2 rounded-lg bg-neutral-900/80 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity"
            title="Expand Preview"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wide bg-neutral-950/85 text-white backdrop-blur-xs">
            {project.category}
          </div>
        </div>

        {/* Info */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-neutral-950 dark:text-white mb-2 tracking-tight">
            {project.name}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[11px] font-mono rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-6 pt-0 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-900 mt-4">
        <button
          type="button"
          onClick={onOpenModal}
          className="text-xs font-medium text-neutral-500 hover:text-black dark:hover:text-white"
        >
          {t.projects.details}
        </button>

        <div className="flex items-center gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            title={t.projects.viewCode}
            aria-label={`GitHub repo for ${project.name}`}
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-950 dark:bg-white text-white dark:text-black text-xs font-semibold hover:opacity-90 transition-opacity"
            title={t.projects.viewLive}
          >
            <span>{t.projects.viewLive}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
