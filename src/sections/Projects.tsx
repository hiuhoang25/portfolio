import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, Github, Star, Code2, X } from 'lucide-react';
import { SectionWrapper } from '@/components/SectionWrapper';
import { projectsConfig, getSortedProjects } from '@/config/projects';
import { useLanguage } from '@/i18n/LanguageContext';

// Project Detail Modal
function ProjectModal({
  project,
  isOpen,
  onClose
}: {
  project: typeof projectsConfig.projects[0] | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const [modalImgIndex, setModalImgIndex] = useState(0);
  
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-4 sm:inset-8 md:inset-16 lg:inset-20 z-50 overflow-hidden"
          >
            <div className="w-full h-full bg-zinc-900 rounded-2xl border border-zinc-700 overflow-hidden flex flex-col">
              {/* Header */}
              {(() => {
                const imgs = project.images && project.images.length > 0
                  ? project.images
                  : project.imageUrl ? [project.imageUrl] : [];
                return (
                  <div className="relative h-48 sm:h-64 flex-shrink-0 group/modal">
                    {imgs.length > 0 ? (
                      <motion.img
                        key={modalImgIndex}
                        src={imgs[modalImgIndex]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-violet-500/30 via-purple-500/30 to-blue-500/30 flex items-center justify-center">
                        <Code2 className="w-24 h-24 text-violet-400/50" />
                      </div>
                    )}
                    {imgs.length > 1 && (
                      <>
                        <button
                          onClick={() => setModalImgIndex((i) => (i - 1 + imgs.length) % imgs.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover/modal:opacity-100 transition-opacity z-10"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setModalImgIndex((i) => (i + 1) % imgs.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover/modal:opacity-100 transition-opacity z-10"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                          {imgs.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setModalImgIndex(i)}
                              className={`w-1.5 h-1.5 rounded-full transition-colors ${i === modalImgIndex ? 'bg-white' : 'bg-white/40'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent pointer-events-none" />
                    {/* Close Button */}
                    <button
                      onClick={onClose}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors z-10"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-violet-500 text-white text-sm font-medium z-10">
                        <Star className="w-4 h-4" />
                        <span>{t('featured')}</span>
                      </div>
                    )}
                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                        {project.title}
                      </h2>
                      {project.subtitle && (
                        <p className="text-violet-400 text-lg">{project.subtitle}</p>
                      )}
                    </div>
                  </div>
                );
              })()}
              
              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                <div className="max-w-3xl mx-auto">
                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3">
                      {t('aboutMe')}
                    </h3>
                    <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">
                      {project.description}
                    </p>
                  </div>
                  
                  {/* Screenshots */}
                  {(() => {
                    const imgs = project.images && project.images.length > 1
                      ? project.images
                      : [];
                    if (imgs.length === 0) return null;
                    return (
                      <div className="mb-8">
                        <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3">
                          Screenshots
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {imgs.map((src, i) => (
                            <button
                              key={i}
                              onClick={() => setModalImgIndex(i)}
                              className={`relative rounded-lg overflow-hidden aspect-video border-2 transition-colors ${i === modalImgIndex ? 'border-violet-500' : 'border-zinc-700 hover:border-zinc-500'}`}
                            >
                              <img src={src} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3">
                        {t('skillsAndTools')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 text-sm border border-zinc-700 hover:border-violet-500/50 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Achievements */}
                  {project.achievements && project.achievements.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3">
                        {t('keyAchievements')}
                      </h3>
                      <ul className="space-y-3">
                        {project.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-3 text-zinc-300">
                            <span className="text-violet-500 mt-1">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 pt-6 border-t border-zinc-800">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                        <span>{t('code')}</span>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>{t('demo')}</span>
                      </a>
                    )}
                    {project.docsUrl && (
                      <a
                        href={project.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>{t('docs')}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Project Card Component for Carousel
function ProjectSlide({
  project,
  isActive,
  onClick
}: {
  project: typeof projectsConfig.projects[0];
  isActive: boolean;
  onClick: () => void;
}) {
  const { t } = useLanguage();
  const [imgIndex, setImgIndex] = useState(0);
  const allImages = project.images && project.images.length > 0
    ? project.images
    : project.imageUrl ? [project.imageUrl] : [];

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((i) => (i - 1 + allImages.length) % allImages.length);
  };
  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((i) => (i + 1) % allImages.length);
  };

  return (
    <motion.div
      onClick={onClick}
      className="w-full max-w-md mx-auto cursor-pointer"
      animate={{
        scale: isActive ? 1 : 0.85,
        opacity: isActive ? 1 : 0.4,
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={isActive ? { scale: 1.02 } : {}}
    >
      <div
        className={`h-full rounded-2xl border overflow-hidden transition-all duration-500 ${
          isActive
            ? 'border-violet-500/50 shadow-2xl shadow-violet-500/20 bg-zinc-900'
            : 'border-zinc-800 bg-zinc-900/50'
        }`}
      >
        {/* Project Image / Carousel */}
        <div className="relative h-48 sm:h-52 overflow-hidden group/img">
          {allImages.length > 0 ? (
            <motion.img
              key={imgIndex}
              src={allImages[imgIndex]}
              alt={project.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-blue-500/20 flex items-center justify-center">
              <Code2 className="w-16 h-16 text-violet-400/50" />
            </div>
          )}
          {allImages.length > 1 && (
            <>
              <button
                onClick={prevImg}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover/img:opacity-100 transition-opacity z-10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImg}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover/img:opacity-100 transition-opacity z-10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${i === imgIndex ? 'bg-white' : 'bg-white/40'}`}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-violet-500 text-white text-xs font-medium">
              <Star className="w-3 h-3" />
              <span>{t('featured')}</span>
            </div>
          )}
          
          {/* Click Hint */}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
            <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur text-white text-sm font-medium">
              Click for details
            </span>
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {/* Title & Subtitle */}
          <div className="mb-3">
            <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="text-sm text-violet-400">{project.subtitle}</p>
            )}
          </div>

          {/* Description */}
          <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 text-xs border border-zinc-700"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-500 text-xs">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Action Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-violet-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>{t('code')}</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-violet-400 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t('demo')}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Progress Indicator
function ProgressIndicator({ 
  total, 
  current, 
  onSelect 
}: { 
  total: number; 
  current: number; 
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <motion.button
          key={i}
          onClick={() => onSelect(i)}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === current 
              ? 'w-8 bg-violet-500' 
              : 'w-2 bg-zinc-700 hover:bg-zinc-600'
          }`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        />
      ))}
    </div>
  );
}

export function Projects() {
  const { t, language } = useLanguage();
  const { title, subtitle, description } = projectsConfig;
  const projects = getSortedProjects();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof projectsConfig.projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const openProjectModal = (project: typeof projectsConfig.projects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
  };

  return (
    <section id="projects" className="min-h-screen py-16 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{title}</h2>
            <p className="text-lg sm:text-xl text-zinc-500 mb-3">{subtitle}</p>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
              {description}
            </p>
          </div>
        </SectionWrapper>

        {/* Carousel Container */}
        <SectionWrapper delay={0.2}>
          <div 
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-800/90 border border-zinc-700 flex items-center justify-center text-white hover:bg-violet-500 hover:border-violet-500 transition-all duration-300 shadow-lg"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-800/90 border border-zinc-700 flex items-center justify-center text-white hover:bg-violet-500 hover:border-violet-500 transition-all duration-300 shadow-lg"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Slides Container */}
            <div className="overflow-hidden py-4 sm:py-8 px-12 sm:px-16">
              <div className="relative flex items-center justify-center min-h-[500px] sm:min-h-[550px]">
                {projects.map((project, index) => {
                  const offset = index - currentIndex;
                  const isVisible = Math.abs(offset) <= 1;
                  
                  return (
                    <motion.div
                      key={project.id}
                      className={`absolute w-full max-w-sm ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
                      initial={false}
                      animate={{
                        x: offset * 120 + '%',
                        scale: offset === 0 ? 1 : 0.8,
                        opacity: Math.abs(offset) > 1 ? 0 : offset === 0 ? 1 : 0.5,
                        zIndex: offset === 0 ? 10 : 5 - Math.abs(offset),
                      }}
                      transition={{ 
                        duration: 0.5, 
                        ease: [0.22, 1, 0.36, 1] 
                      }}
                    >
                      <ProjectSlide
                        project={project}
                        isActive={index === currentIndex}
                        onClick={() => openProjectModal(project)}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="mt-6 sm:mt-8">
              <ProgressIndicator 
                total={projects.length} 
                current={currentIndex}
                onSelect={goToSlide}
              />
            </div>

            {/* Slide Counter */}
            <div className="text-center mt-4">
              <span className="text-sm text-zinc-500">
                <span className="text-violet-400 font-medium">{currentIndex + 1}</span>
                {' / '}
                {projects.length}
              </span>
            </div>

            {/* Swipe Hint */}
            <div className="text-center mt-2 text-xs text-zinc-600">
              {language === 'vi' 
                ? 'Vuốt hoặc dùng phím mũi tên để điều hướng. Nhấn để xem chi tiết.' 
                : 'Swipe or use arrow keys to navigate. Click to view details.'}
            </div>
          </div>
        </SectionWrapper>

        {/* Navigation */}
        <SectionWrapper delay={0.4}>
          <div className="flex items-center justify-between mt-12 sm:mt-16 pt-8 border-t border-zinc-800">
            <button
              onClick={() => scrollToSection('about')}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('aboutMe')}</span>
            </button>
            <button
              onClick={() => scrollToSection('showcase')}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
            >
              <span>{t('showcase') || 'Showcase'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </SectionWrapper>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeProjectModal}
      />
    </section>
  );
}
