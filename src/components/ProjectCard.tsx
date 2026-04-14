import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from '@/config/projects';
import { useLanguage } from '@/i18n/LanguageContext';

interface ProjectCardProps {
  project: Project;
  showTechnologies?: boolean;
  showAchievements?: boolean;
  showImage?: boolean;
}

export function ProjectCard({
  project,
  showTechnologies = true,
  showAchievements = true,
  showImage = true,
}: ProjectCardProps) {
  const { t } = useLanguage();
  const {
    title,
    subtitle,
    description,
    achievements,
    technologies,
    imageUrl,
    images,
    githubUrl,
    demoUrl,
    docsUrl,
    featured,
  } = project;

  const allImages = images && images.length > 0 ? images : imageUrl ? [imageUrl] : [];
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((i) => (i - 1 + allImages.length) % allImages.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((i) => (i + 1) % allImages.length);
  };

  return (
    <motion.div
      whileHover={{ 
        y: -8, 
        borderColor: 'rgba(139, 92, 246, 0.5)',
        boxShadow: '0 20px 40px rgba(139, 92, 246, 0.15)',
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-xl border bg-zinc-900/50 hover:bg-zinc-800/50 transition-all overflow-hidden group ${
        featured
          ? 'border-violet-500/30 ring-1 ring-violet-500/20'
          : 'border-zinc-800'
      }`}
    >
      {/* Project Image / Carousel */}
      {showImage && allImages.length > 0 && (
        <div className="relative w-full h-48 overflow-hidden">
          <motion.img
            key={activeIndex}
            src={allImages[activeIndex]}
            alt={`${title} screenshot ${activeIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          {/* Featured badge */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-violet-500/90 text-white text-xs font-medium"
            >
              <Star className="w-3 h-3" />
              <span>Featured</span>
            </motion.div>
          )}
          {/* Carousel controls — only when multiple images */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              {/* Dot indicators */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activeIndex ? 'bg-white' : 'bg-white/40'}`}
                  />
                ))}
              </div>
            </>
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent pointer-events-none" />
          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <motion.h3 
                className="text-lg font-semibold text-white truncate group-hover:text-violet-400 transition-colors"
              >
                {title}
              </motion.h3>
              {/* Featured badge (when no image) */}
              {featured && (!showImage || !imageUrl) && (
                <motion.span 
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-medium"
                >
                  <Star className="w-3 h-3" />
                </motion.span>
              )}
            </div>
            {subtitle && (
              <p className="text-sm text-violet-400 mt-1">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Technologies */}
        {showTechnologies && technologies && technologies.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-800 text-zinc-400 text-xs border border-transparent hover:border-violet-500/30 transition-colors"
                >
                  <Code2 className="w-3 h-3" />
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {showAchievements && achievements && achievements.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
              {t('keyAchievements')}
            </p>
            <ul className="space-y-1.5">
              {achievements.map((achievement, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-sm text-zinc-400 flex items-start gap-2"
                >
                  <motion.span 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    className="text-violet-500 mt-1"
                  >
                    •
                  </motion.span>
                  <span>{achievement}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
          {githubUrl && (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: 2 }}
              className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-violet-400 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>{t('code')}</span>
            </motion.a>
          )}
          {demoUrl && (
            <motion.a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: 2 }}
              className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-violet-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t('demo')}</span>
            </motion.a>
          )}
          {docsUrl && (
            <motion.a
              href={docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: 2 }}
              className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-violet-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t('docs')}</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
