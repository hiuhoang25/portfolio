import { ArrowRight, ArrowLeft } from 'lucide-react';
import { SectionWrapper } from '@/components/SectionWrapper';
import { useLanguage } from '@/i18n/LanguageContext';

export function AboutMe() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="px-8 py-16 lg:px-16">
      <div className="max-w-4xl">
        <SectionWrapper>
          <h2 className="text-4xl font-bold text-white mb-2">{t('aboutTitle')}</h2>
          <p className="text-xl text-zinc-500 mb-8">{t('aboutSubtitle')}</p>
        </SectionWrapper>

        <div className="space-y-6">
          <SectionWrapper delay={0.1}>
            <p className="text-zinc-400 leading-relaxed">{t('aboutP1')}</p>
          </SectionWrapper>

          <SectionWrapper delay={0.2}>
            <p className="text-zinc-400 leading-relaxed">{t('aboutP2')}</p>
          </SectionWrapper>

          <SectionWrapper delay={0.3}>
            <p className="text-zinc-400 leading-relaxed">{t('aboutP3')}</p>
          </SectionWrapper>
        </div>

        {/* Navigation arrows */}
        <SectionWrapper delay={0.4}>
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-zinc-800">
            <button
              onClick={() => scrollToSection('introduction')}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('introduction')}</span>
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
            >
              <span>{t('projects')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
