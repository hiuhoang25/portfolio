import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

// Typing animation hook
function useTypingAnimation(text: string, speed: number = 50, delay: number = 0) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayedText, isComplete };
}

// Floating particles component
function FloatingParticles() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-violet-500/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Animated code symbols
function FloatingCodeSymbols() {
  const symbols = ['{ }', '< />', '[ ]', '( )', ';;', '//'];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {symbols.map((symbol, i) => (
        <motion.div
          key={i}
          className="absolute text-violet-500/10 font-mono text-lg font-bold"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
          }}
          animate={{
            y: [-30, 30, -30],
            rotate: [-5, 5, -5],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  );
}

export function Introduction() {
  const { t } = useLanguage();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { displayedText, isComplete } = useTypingAnimation(t('tagline'), 40, 800);

  // Avatar URL - replace with your actual avatar image
  const avatarUrl = '/me/avatar.jpg';

  return (
    <section
      id="introduction"
      className="min-h-screen flex flex-col justify-center px-6 py-20 lg:px-16 relative overflow-hidden"
    >
      {/* Background effects */}
      <FloatingParticles />
      <FloatingCodeSymbols />

      {/* Gradient orb background */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-12">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              type: 'spring',
              stiffness: 100,
            }}
            className="relative flex-shrink-0"
          >
            {/* Glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                padding: '3px',
              }}
            >
              <div className="w-full h-full rounded-full bg-background" />
            </motion.div>

            {/* Avatar container */}
            <motion.div
              className="relative w-28 h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden bg-zinc-800 border-4 border-background"
              animate={{
                y: [-5, 5, -5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Hoang The Hieu"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-blue-500/20">
                  <Code2 className="w-14 h-14 lg:w-16 lg:h-16 text-violet-400" />
                </div>
              )}
            </motion.div>

            {/* Status indicator */}
            <motion.div
              className="absolute bottom-2 right-2 w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-green-500 border-4 border-background"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left min-w-0">
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-1"
            >
              <span className="text-violet-400 text-sm font-medium">
                {t('greeting')}
              </span>
            </motion.div>

            {/* Name with glow effect */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3"
            >
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                Hoang The Hieu
              </span>
            </motion.h1>

            {/* Tagline with typing animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 min-h-[2rem]"
            >
              <span className="text-violet-400">{displayedText}</span>
              {!isComplete && (
                <motion.span
                  className="inline-block w-0.5 h-6 sm:h-8 bg-violet-400 ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-base lg:text-lg text-zinc-400 leading-relaxed mb-5 max-w-2xl"
            >
              {t('heroDescription')}
            </motion.p>

            {/* Tech stack badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6"
            >
              {['Full-Stack', 'Vue.js', 'React', 'Node.js', 'MongoDB'].map(
                (tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.5 + i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-3 py-1 rounded-full bg-zinc-800/80 text-zinc-300 text-xs sm:text-sm border border-zinc-700 hover:border-violet-500/50 transition-colors"
                  >
                    {tech}
                  </motion.span>
                )
              )}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap justify-center lg:justify-start items-center gap-3"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 text-sm sm:text-base"
                  onClick={() =>
                    window.open(
                      'https://drive.google.com/file/d/1h2X7eKd3_P2uyM5wX8BwADQpKE9Lw9mf/view?usp=sharing',
                      '_blank'
                    )
                  }
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t('getResume')}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800 px-5 py-2.5 rounded-lg font-medium transition-all text-sm sm:text-base"
                  onClick={() => scrollToSection('contact')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {t('sendMail')}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8"
      >
        <motion.button
          onClick={() => scrollToSection('about')}
          className="flex items-center gap-2 text-zinc-500 hover:text-violet-400 transition-colors text-sm group"
          whileHover={{ x: 5 }}
        >
          <span>{t('aboutMe')}</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <ArrowRight className="w-4 h-4 group-hover:text-violet-400" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
