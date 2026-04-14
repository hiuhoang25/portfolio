import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Eye, Heart, Github } from 'lucide-react';
import { SectionWrapper } from '@/components/SectionWrapper';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

const GITHUB_METRICS_SVG_URL =
  'https://raw.githubusercontent.com/ryzenix/ryzenix/refs/heads/main/github-metrics.svg';

export function Stats() {
  const { t } = useLanguage();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <section id="stats" className="min-h-screen px-8 py-16 lg:px-16">
      <div className="max-w-4xl">
        <SectionWrapper>
          <h2 className="text-4xl font-bold text-white mb-2">
            {t('statsTitle')}
          </h2>
          <p className="text-xl text-zinc-500 mb-8">
            {t('statsSubtitle')}
          </p>
        </SectionWrapper>

        {/* Stats Cards */}
        <SectionWrapper delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Total Views */}
            <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-violet-500" />
                <span className="text-sm font-medium text-zinc-400">
                  {t('totalViews')}
                </span>
              </div>
              <div className="text-4xl font-bold text-violet-500 mb-2">
                <AnimatedCounter end={1784} duration={2000} />
              </div>
              <p className="text-sm text-zinc-500">
                {t('viewsDescription')}
              </p>
            </div>

            {/* Appreciation Count */}
            <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-pink-500" />
                <span className="text-sm font-medium text-zinc-400">
                  {t('appreciationCount')}
                </span>
              </div>
              <motion.div
                key={likeCount}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-4xl font-bold text-pink-500 mb-2"
              >
                {likeCount}
              </motion.div>
              <Button
                onClick={handleLike}
                variant="outline"
                className={`mt-2 ${
                  liked
                    ? 'bg-pink-500/20 border-pink-500 text-pink-400'
                    : 'border-zinc-700 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                <Heart
                  className={`w-4 h-4 mr-2 ${liked ? 'fill-current' : ''}`}
                />
                {liked ? t('liked') : t('lovePortfolio')}
              </Button>
            </div>
          </div>
        </SectionWrapper>

        {/* GitHub Stats */}
        <SectionWrapper delay={0.3}>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Github className="w-5 h-5 text-zinc-400" />
              <h3 className="text-xl font-semibold text-white">{t('githubStats')}</h3>
            </div>
            <p className="text-zinc-500 text-sm mb-6">
              {t('githubDescription')}
            </p>

            {/* GitHub Metrics SVG */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
              <img
                src={GITHUB_METRICS_SVG_URL}
                alt="GitHub Metrics"
                className="w-full h-auto"
              />
            </div>
          </div>
        </SectionWrapper>

        {/* Navigation arrows */}
        <SectionWrapper delay={0.4}>
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-zinc-800">
            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('contact')}</span>
            </button>
            <button
              onClick={() => scrollToSection('music')}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
            >
              <span>{t('music')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
