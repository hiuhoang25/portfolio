import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface TimelineItemProps {
  title: string;
  subtitle?: string;
  date: string;
  description: string | ReactNode;
  isLatest?: boolean;
  delay?: number;
}

export function TimelineItem({
  title,
  subtitle,
  date,
  description,
  isLatest = false,
  delay = 0,
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ x: 5 }}
      className="relative pl-8 pb-8 last:pb-0 group"
    >
      {/* Timeline line with gradient */}
      <motion.div 
        className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-gradient-to-b from-violet-500/50 via-zinc-700 to-zinc-800 last:hidden"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
        style={{ originY: 0 }}
      />

      {/* Timeline dot with glow effect */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + 0.1, type: 'spring' }}
        className={`absolute left-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center ${
          isLatest 
            ? 'bg-violet-500' 
            : 'bg-zinc-700 group-hover:bg-violet-500/50'
        } transition-colors duration-300`}
      >
        {/* Glow ring for latest */}
        {isLatest && (
          <motion.div
            className="absolute inset-0 rounded-full bg-violet-500"
            animate={{ 
              boxShadow: [
                '0 0 0 0 rgba(139, 92, 246, 0.4)',
                '0 0 0 10px rgba(139, 92, 246, 0)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        <motion.div 
          className="w-2.5 h-2.5 rounded-full bg-white relative z-10"
          whileHover={{ scale: 1.2 }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        whileHover={{ 
          backgroundColor: 'rgba(39, 39, 42, 0.3)',
        }}
        className="p-3 -m-3 rounded-lg transition-colors duration-300"
      >
        <div className="flex items-center gap-3 mb-1">
          <motion.h3 
            className="text-base font-semibold text-white group-hover:text-violet-400 transition-colors"
          >
            {title}
          </motion.h3>
          {isLatest && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="px-2 py-0.5 text-xs font-medium bg-violet-500/20 text-violet-400 rounded-full"
            >
              Latest
            </motion.span>
          )}
        </div>
        {subtitle && (
          <p className="text-sm text-violet-400 mb-1">{subtitle}</p>
        )}
        <p className="text-sm text-zinc-500 mb-3">{date}</p>
        <div className="text-zinc-400 text-sm leading-relaxed">{description}</div>
      </motion.div>
    </motion.div>
  );
}

interface TimelineProps {
  children: ReactNode;
}

export function Timeline({ children }: TimelineProps) {
  return <div className="relative">{children}</div>;
}
