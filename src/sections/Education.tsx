import { ArrowRight, ArrowLeft, Award, BookOpen, Users } from 'lucide-react';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Timeline, TimelineItem } from '@/components/Timeline';
import { educationConfig } from '@/config/education';
import { useLanguage } from '@/i18n/LanguageContext';

export function Education() {
  const { t } = useLanguage();
  const {
    education,
    certificates,
    awards,
    extracurricular,
    display,
  } = educationConfig;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="education" className="min-h-screen px-8 py-16 lg:px-16">
      <div className="max-w-4xl">
        <SectionWrapper>
          <h2 className="text-4xl font-bold text-white mb-2">{t('educationTitle')}</h2>
          <p className="text-xl text-zinc-500 mb-6">{t('educationSubtitle')}</p>
          <p className="text-zinc-400 leading-relaxed mb-8">
            {t('educationDescription')}
          </p>
        </SectionWrapper>

        {/* Education Timeline */}
        <SectionWrapper delay={0.2}>
          <Timeline>
            {education.map((edu, index) => (
              <TimelineItem
                key={edu.id}
                title={edu.degree}
                subtitle={edu.institution}
                date={`${edu.startDate} - ${edu.endDate}`}
                isLatest={edu.isCurrent || index === 0}
                description={
                  <div className="space-y-3">
                    {/* Location */}
                    {edu.location && (
                      <p className="text-sm text-zinc-500">{edu.location}</p>
                    )}

                    {/* Description */}
                    <p>{edu.description}</p>

                    {/* GPA */}
                    {display.showGpa && edu.gpa && (
                      <p className="text-sm">
                        <span className="text-violet-400 font-medium">
                          GPA: {edu.gpa}
                        </span>
                      </p>
                    )}

                    {/* Courses */}
                    {display.showCourses && edu.courses && edu.courses.length > 0 && (
                      <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
                          {t('keyCourses')}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {edu.courses.map((course) => (
                            <span
                              key={course}
                              className="px-2 py-1 rounded-md bg-zinc-800 text-zinc-400 text-xs"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                }
              />
            ))}
          </Timeline>
        </SectionWrapper>

        {/* Certificates */}
        {display.showCertificates && certificates.enabled && certificates.items.length > 0 && (
          <SectionWrapper delay={0.3}>
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-violet-500" />
                <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
                  {t('certificates')}
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {certificates.items.map((cert) => (
                  <div
                    key={cert.id}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-900/50 text-zinc-300 hover:border-violet-500/30 transition-colors"
                  >
                    <Award className="w-4 h-4 text-violet-500" />
                    <span className="text-sm font-medium">{cert.name}</span>
                    {cert.score && (
                      <span className="text-xs text-violet-400">
                        ({cert.score})
                      </span>
                    )}
                    <span className="text-xs text-zinc-500">({cert.year})</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionWrapper>
        )}

        {/* Awards */}
        {display.showAwards && awards.enabled && awards.items.length > 0 && (
          <SectionWrapper delay={0.4}>
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-violet-500" />
                <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
                  {t('awards')}
                </h3>
              </div>
              <div className="space-y-3">
                {awards.items.map((award) => (
                  <div
                    key={award.id}
                    className="flex items-start gap-3 p-4 rounded-lg border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-800/30 transition-colors"
                  >
                    <BookOpen className="w-5 h-5 text-violet-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-zinc-300">
                        {award.title}
                      </p>
                      {award.organization && (
                        <p className="text-xs text-zinc-500 mt-0.5">
                          {award.organization}
                        </p>
                      )}
                      <p className="text-xs text-zinc-500 mt-1">{award.date}</p>
                      {award.description && (
                        <p className="text-sm text-zinc-400 mt-2">
                          {award.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionWrapper>
        )}

        {/* Extracurricular Activities */}
        {display.showExtracurricular &&
          extracurricular.enabled &&
          extracurricular.items.length > 0 && (
            <SectionWrapper delay={0.5}>
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-violet-500" />
                  <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
                    {t('extracurricular')}
                  </h3>
                </div>
                <div className="space-y-3">
                  {extracurricular.items.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-4 rounded-lg border border-zinc-800 bg-zinc-900/30"
                    >
                      <Users className="w-5 h-5 text-violet-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-medium text-zinc-300">
                            {activity.title}
                          </p>
                          <span className="text-xs text-violet-400">
                            {activity.role}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          {activity.period}
                        </p>
                        <p className="text-sm text-zinc-400 mt-2">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionWrapper>
          )}

        {/* Navigation arrows */}
        <SectionWrapper delay={0.5}>
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-zinc-800">
            <button
              onClick={() => scrollToSection('experience')}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('experience')}</span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
            >
              <span>{t('contact')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
