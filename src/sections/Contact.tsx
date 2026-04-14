import { useState } from 'react';
import { ArrowRight, ArrowLeft, Mail, Copy, Check, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionWrapper, StaggerContainer, StaggerItem } from '@/components/SectionWrapper';
import { useLanguage } from '@/i18n/LanguageContext';

const EMAIL = 'thehieu32@gmail.com';

const socials = [
  {
    id: 'email',
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: Mail,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'hover:border-violet-500/40',
    copyable: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/hiuhoang',
    href: 'https://www.linkedin.com/in/the-hieu-hoang-4249273b9/',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'hover:border-blue-500/40',
    copyable: false,
  },
  {
    id: 'facebook',
    label: 'Facebook',
    value: 'facebook.com/hiuhoang',
    href: 'https://www.facebook.com/hhieu25/',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'hover:border-sky-500/40',
    copyable: false,
  },
];

export function Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="min-h-screen px-8 py-16 lg:px-16">
      <div className="max-w-2xl">
        <SectionWrapper>
          <h2 className="text-4xl font-bold text-white mb-2">{t('contactTitle')}</h2>
          <p className="text-xl text-zinc-500 mb-8">{t('contactSubtitle')}</p>
        </SectionWrapper>

        <SectionWrapper delay={0.1}>
          <p className="text-zinc-400 leading-relaxed mb-10">
            Feel free to reach out via any of the platforms below. I'm always open to new opportunities, collaborations, or just a friendly chat.
          </p>
        </SectionWrapper>

        <StaggerContainer className="space-y-4">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <StaggerItem key={social.id}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center justify-between gap-4 p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 transition-all ${social.border}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-lg ${social.bg} ${social.color}`}>
                      <Icon />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 mb-0.5">{social.label}</p>
                      <p className="text-white font-medium">{social.value}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {social.copyable && (
                      <button
                        onClick={copyEmail}
                        className="p-2 rounded-lg hover:bg-zinc-700 transition-colors text-zinc-400 hover:text-white"
                        title="Copy email"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    )}
                    <a
                      href={social.href}
                      target={social.copyable ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-zinc-700 transition-colors text-zinc-400 hover:text-white"
                      title={`Open ${social.label}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Navigation arrows */}
        <SectionWrapper delay={0.4}>
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-zinc-800">
            <button
              onClick={() => scrollToSection('education')}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('education')}</span>
            </button>
            <button
              onClick={() => scrollToSection('stats')}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
            >
              <span>{t('stats')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
