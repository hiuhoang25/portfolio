import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800/50 border border-zinc-700 hover:border-violet-500/50 transition-colors"
    >
      <Globe className="w-4 h-4 text-violet-400" />
      <div className="flex items-center gap-1">
        <motion.span
          animate={{
            color: language === 'en' ? '#a78bfa' : '#71717a',
          }}
          className="text-sm font-medium"
        >
          EN
        </motion.span>
        <span className="text-zinc-600">/</span>
        <motion.span
          animate={{
            color: language === 'vi' ? '#a78bfa' : '#71717a',
          }}
          className="text-sm font-medium"
        >
          VI
        </motion.span>
      </div>
    </motion.button>
  );
}
