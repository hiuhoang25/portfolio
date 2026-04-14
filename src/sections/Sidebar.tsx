import { motion } from 'framer-motion';
import {
  User,
  Briefcase,
  Code2,
  Wrench,
  GraduationCap,
  Mail,
  BarChart3,
  Home,
  Music2,
  Bot,
} from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useLanguage } from '@/i18n/LanguageContext';
import { LiveClock } from '@/components/LiveClock';
import { LanguageToggle } from '@/components/LanguageToggle';

export function Sidebar() {
  const { activeSection, scrollToSection } = useActiveSection();
  const { t } = useLanguage();

  const navItems = [
    { id: 'introduction', label: t('introduction'), icon: Home },
    { id: 'about', label: t('aboutMe'), icon: User },
    { id: 'projects', label: t('projects'), icon: Briefcase },
    { id: 'showcase', label: t('showcase') || 'Showcase', icon: Bot },
    { id: 'skills', label: t('skillsAndTools'), icon: Wrench },
    { id: 'experience', label: t('experience'), icon: Code2 },
    { id: 'education', label: t('education'), icon: GraduationCap },
    { id: 'contact', label: t('contact'), icon: Mail },
    { id: 'stats', label: t('stats'), icon: BarChart3 },
    { id: 'music', label: t('music'), icon: Music2 },
  ];

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed left-0 top-0 h-screen w-[280px] bg-background border-r border-zinc-800 z-50 hidden lg:flex flex-col"
    >
      <div className="p-6 flex flex-col h-full">
        {/* Logo */}
        <div className="mb-6">
          <a
            href="#introduction"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('introduction');
            }}
            className="flex items-center gap-2 text-white font-semibold"
          >
            <motion.span
              className="text-violet-500"
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              ~
            </motion.span>
            <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              hiuhoang.dev
            </span>
          </a>
        </div>

        {/* Clock and Language Toggle */}
        <div className="flex flex-col gap-3 mb-6">
          <LiveClock />
          <LanguageToggle />
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
            {t('sections')}
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ x: 4 }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                      : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400"
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-zinc-800">
          <p className="text-xs text-zinc-500">
            © 2026 Hoang The Hieu
          </p>
        </div>
      </div>
    </motion.aside>
  );
}
