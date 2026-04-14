import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface SkillBadgeProps {
  icon: LucideIcon;
  name: string;
  color?: string;
}

export function SkillBadge({ icon: Icon, name, color = 'violet' }: SkillBadgeProps) {
  const colorClasses: Record<string, string> = {
    violet: 'hover:border-violet-500/50 hover:text-violet-400 hover:shadow-violet-500/20',
    blue: 'hover:border-blue-500/50 hover:text-blue-400 hover:shadow-blue-500/20',
    green: 'hover:border-green-500/50 hover:text-green-400 hover:shadow-green-500/20',
    yellow: 'hover:border-yellow-500/50 hover:text-yellow-400 hover:shadow-yellow-500/20',
    pink: 'hover:border-pink-500/50 hover:text-pink-400 hover:shadow-pink-500/20',
    cyan: 'hover:border-cyan-500/50 hover:text-cyan-400 hover:shadow-cyan-500/20',
    orange: 'hover:border-orange-500/50 hover:text-orange-400 hover:shadow-orange-500/20',
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.05, 
        y: -3,
        boxShadow: `0 10px 30px rgba(139, 92, 246, 0.15)`,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-800/50 text-zinc-300 text-sm font-medium transition-all cursor-default ${colorClasses[color] || colorClasses.violet}`}
    >
      <motion.div
        whileHover={{ rotate: 10 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="w-4 h-4" />
      </motion.div>
      <span>{name}</span>
    </motion.div>
  );
}
