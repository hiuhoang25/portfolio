import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function LiveClock() {
  const [time, setTime] = useState<Date | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    // Set initial time on client side only
    setTime(new Date());

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format time for GMT+7 (Vietnam time)
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Bangkok', // GMT+7
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      timeZone: 'Asia/Bangkok',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  // Prevent hydration mismatch by not rendering until client-side
  if (!time) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800/50 border border-zinc-700">
        <Clock className="w-4 h-4 text-violet-400" />
        <span className="text-zinc-400 text-sm font-mono">--:--:--</span>
        <span className="text-xs text-zinc-500">{t('timeZone')}</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-1"
    >
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800/50 border border-zinc-700">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <Clock className="w-4 h-4 text-violet-400" />
        </motion.div>
        <motion.span
          key={time.getSeconds()}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          className="text-zinc-200 text-sm font-mono tabular-nums"
        >
          {formatTime(time)}
        </motion.span>
        <span className="text-xs text-zinc-500">{t('timeZone')}</span>
      </div>
      <span className="text-xs text-zinc-500 text-center">
        {formatDate(time)}
      </span>
    </motion.div>
  );
}
