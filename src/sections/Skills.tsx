import { ArrowRight, ArrowLeft } from 'lucide-react';
import {
  SectionWrapper,
  StaggerContainer,
  StaggerItem,
} from '@/components/SectionWrapper';
import { SkillBadge } from '@/components/SkillBadge';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  Code2,
  Database,
  Server,
  Layout,
  FileCode,
  Terminal,
  Layers,
  Cpu,
  Network,
  HardDrive,
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'JavaScript', icon: Code2 },
      { name: 'Python', icon: Terminal },
      { name: 'Java', icon: Cpu },
      { name: 'SQL', icon: Database },
      { name: 'PHP', icon: FileCode },
      { name: 'Bash', icon: Terminal },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'Vue.js', icon: Layout },
      { name: 'React', icon: Code2 },
      { name: 'HTML', icon: FileCode },
      { name: 'CSS', icon: Layout },
      { name: 'Tailwind CSS', icon: Layers },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: Server },
      { name: 'Express.js', icon: Server },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'PostgreSQL', icon: Database },
      { name: 'MongoDB', icon: HardDrive },
      { name: 'Redis', icon: Database },
    ],
  },
  {
    title: 'Core Knowledge',
    skills: [
      { name: 'Data Structures & Algorithms', icon: Cpu },
      { name: 'Operating Systems', icon: Terminal },
      { name: 'Database Systems', icon: Database },
      { name: 'Computer Networks', icon: Network },
    ],
  },
];

export function Skills() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="skills" className="min-h-screen px-8 py-16 lg:px-16">
      <div className="max-w-4xl">
        <SectionWrapper>
          <h2 className="text-4xl font-bold text-white mb-2">{t('skillsTitle')}</h2>
          <p className="text-xl text-zinc-500 mb-6">{t('skillsSubtitle')}</p>
          <p className="text-zinc-400 leading-relaxed mb-8">
            {t('skillsDescription')}
          </p>
        </SectionWrapper>

        <div className="space-y-8">
          {skillCategories.map((category, categoryIndex) => (
            <SectionWrapper key={category.title} delay={categoryIndex * 0.1}>
              <div>
                <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
                  {category.title}
                </h3>
                <StaggerContainer className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <StaggerItem key={skill.name}>
                      <SkillBadge icon={skill.icon} name={skill.name} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </SectionWrapper>
          ))}
        </div>

        {/* Navigation arrows */}
        <SectionWrapper delay={0.5}>
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-zinc-800">
            <button
              onClick={() => scrollToSection('showcase')}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('showcase') || 'Showcase'}</span>
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
            >
              <span>{t('experience')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
