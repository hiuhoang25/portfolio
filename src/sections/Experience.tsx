import { ArrowRight, ArrowLeft } from 'lucide-react';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Timeline, TimelineItem } from '@/components/Timeline';
import { useLanguage } from '@/i18n/LanguageContext';

export function Experience() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="experience" className="min-h-screen px-8 py-16 lg:px-16">
      <div className="max-w-4xl">
        <SectionWrapper>
          <h2 className="text-4xl font-bold text-white mb-2">{t('experienceTitle')}</h2>
          <p className="text-xl text-zinc-500 mb-6">{t('experienceSubtitle')}</p>
          <p className="text-zinc-400 leading-relaxed mb-8">
            {t('experienceDescription')}
          </p>
        </SectionWrapper>

        <SectionWrapper delay={0.2}>
          <Timeline>
            <TimelineItem
              title="Kiri Discord"
              subtitle="Leader & Fullstack Developer"
              date="Dec 2023 - Dec 2025"
              isLatest={true}
              description={
                <div className="space-y-3">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-violet-500 mt-1 flex-shrink-0">•</span>
                      <span>
                        Led a 4-member development team to build and scale a Discord bot
                        serving 1M+ users across 250k+ servers, implementing WebSocket-based
                        reliability and scalability enhancements.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-500 mt-1 flex-shrink-0">•</span>
                      <span>
                        Architected backend systems using Express.js, MongoDB, and Redis.
                        Implemented real-time audio streaming with Opus and event-driven architecture.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-500 mt-1 flex-shrink-0">•</span>
                      <span>
                        Established observability and reliability mechanisms with structured logging
                        and concurrent operations management.
                      </span>
                    </li>
                  </ul>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
                      {t('keyAchievements')}
                    </p>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="text-violet-500 mt-1 flex-shrink-0">•</span>
                        <span>
                          Monetization strategy generating ~$150/month through premium features/subscriptions
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-violet-500 mt-1 flex-shrink-0">•</span>
                        <span>1 million servers milestone achieved</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-violet-500 mt-1 flex-shrink-0">•</span>
                        <span>Real-time audio streaming with Opus codec and data consistency mechanisms</span>
                      </li>
                    </ul>
                  </div>
                </div>
              }
            />
            <TimelineItem
              title="Du Lịch Quốc Tế Đại Việt (GrandViet Tour)"
              subtitle="Frontend Web Developer Intern"
              date="Jan 2024 - Oct 2025"
              description={
                <div className="space-y-3">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-violet-500 mt-1 flex-shrink-0">•</span>
                      <span>
                        Improved system security and conducted regular vulnerability assessments
                        to ensure platform integrity.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-500 mt-1 flex-shrink-0">•</span>
                      <span>
                        Optimized the website for SEO compliance, including on-page structure
                        adjustments and technical fixes to improve search engine indexing.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-500 mt-1 flex-shrink-0">•</span>
                      <span>
                        Monitored and analyzed performance via Google Search Console to track
                        indexing status and search visibility.
                      </span>
                    </li>
                  </ul>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
                      {t('keyAchievements')}
                    </p>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="text-violet-500 mt-1 flex-shrink-0">•</span>
                        <span>
                          Improved organic search visibility and keyword rankings through structured SEO fixes
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-violet-500 mt-1 flex-shrink-0">•</span>
                        <span>Identified and resolved security vulnerabilities, strengthening platform integrity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-violet-500 mt-1 flex-shrink-0">•</span>
                        <span>Enhanced frontend performance, improving page load speed and user experience</span>
                      </li>
                    </ul>
                  </div>
                </div>
              }
            />
          </Timeline>
        </SectionWrapper>

        {/* Navigation arrows */}
        <SectionWrapper delay={0.4}>
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-zinc-800">
            <button
              onClick={() => scrollToSection('skills')}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('skillsAndTools')}</span>
            </button>
            <button
              onClick={() => scrollToSection('education')}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
            >
              <span>{t('education')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
