import { motion } from 'framer-motion';
import { Sidebar } from '@/sections/Sidebar';
import { Introduction } from '@/sections/Introduction';
import { AboutMe } from '@/sections/AboutMe';
import { Projects } from '@/sections/Projects';
import { Skills } from '@/sections/Skills';
import { Experience } from '@/sections/Experience';
import { Education } from '@/sections/Education';
import { Contact } from '@/sections/Contact';
import { Stats } from '@/sections/Stats';
import { Music } from '@/sections/Music';
import { BotShowcase } from '@/sections/BotShowcase';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { useLanguage } from '@/i18n/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';

function AppContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Mobile Header */}
      <MobileHeader />

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="lg:ml-[280px]"
      >
        <Introduction />
        <AboutMe />
        <Projects />
        <BotShowcase />
        <Skills />
        <Experience />
        <Education />
        <Contact />
        <Stats />
        <Music />

        {/* Footer */}
        <footer className="px-8 py-8 lg:px-16 border-t border-zinc-800">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-zinc-500">
              © 2026 - {t('builtWith')}{' '}
              <span className="text-zinc-400">React</span>,{' '}
              <span className="text-zinc-400">shadcn/ui</span> and{' '}
              <span className="text-zinc-400">Tailwind CSS</span>
            </p>
            <p className="text-sm text-zinc-500 mt-1">
              {t('developedBy')}{' '}
              <span className="text-violet-400">Hoang The Hieu</span>
            </p>
          </div>
        </footer>
      </motion.main>
    </div>
  );
}

function MobileHeader() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-zinc-800">
      <div className="flex items-center justify-between px-4 py-3">
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
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            ~
          </motion.span>
          <span>hiuhoang.dev</span>
        </a>

        {/* Language Toggle only on mobile */}
        <LanguageToggle />
      </div>
    </header>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
