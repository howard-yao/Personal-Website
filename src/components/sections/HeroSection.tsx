'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const NAME_COLORS = ['#e84040','#3a7bd5','rgb(var(--ink))','#2daa55','#f0a020','rgb(var(--ink))','#3a7bd5','rgb(var(--ink))','#e84040'];
const HOWARD = ['H','o','w','a','r','d'];
const YAO    = ['Y','a','o'];

const EMAIL = 'howardyao1@gmail.com';

const HOVER = { y: -8, rotate: -4, transition: { type: 'spring' as const, stiffness: 400, damping: 10 } };

const CARDS = [
  { icon: '/icons/about.png',    title: 'About me',  sub: 'researcher · creator',   bg: '#e84040', shadow: '#b52020', section: 'about'    },
  { icon: '/icons/works.png',    title: 'Works',     sub: 'research & engineering',  bg: '#3a7bd5', shadow: '#1a4fa0', section: 'works'    },
  { icon: '/icons/creative.png', title: 'Creative',  sub: 'music, photo & 3D',       bg: '#f0a020', shadow: '#c07010', section: 'creative' },
  { icon: '/icons/blogs.png',    title: 'Blogs',     sub: 'thoughts & notes',        bg: '#2daa55', shadow: '#1a7a35', section: 'blog'     },
];

export default function HeroSection() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const [copied, setCopied] = useState(false);
  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-ink text-cream text-xs font-bold tracking-widest px-4 py-1.5 rounded-pill mb-6">
            Creator
          </span>

          {/* Bouncy name */}
          <div className="font-maru font-black leading-none mb-6" style={{ fontSize: 'clamp(3rem, 7vw, 5rem)' }}>
            {/* Howard */}
            <div>
              {HOWARD.map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block cursor-default"
                  style={{ color: NAME_COLORS[i] }}
                  whileHover={HOVER}
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            {/* Yao */}
            <div>
              {YAO.map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block cursor-default"
                  style={{ color: NAME_COLORS[i + 7] }}
                  whileHover={HOVER}
                >
                  {ch}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Contact icons — own row, aligned with Y */}
          <div className="flex items-center gap-4 mb-8 ml-3">
            <div className="relative">
              <button
                onClick={copyEmail}
                aria-label="Copy email"
                className="text-gray-400 hover:text-ink transition-colors mt-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" />
                </svg>
              </button>
              <motion.span
                animate={copied ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 bg-ink text-cream text-xs px-2.5 py-1 rounded-pill whitespace-nowrap pointer-events-none"
              >
                Copied!
              </motion.span>
            </div>

            <a href="https://www.linkedin.com/in/howard-yao-miku39/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="text-gray-400 hover:text-ink transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
            </a>

            <a href="https://github.com/howard-yao" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="text-gray-400 hover:text-ink transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button className="pill-btn pill-btn-primary" onClick={() => scrollTo('works')}>
              See my work
            </button>
            <button className="pill-btn pill-btn-outline" onClick={() => scrollTo('blog')}>
              Read my blog
            </button>
          </div>
        </motion.div>

        {/* Right — cards grid */}
        <div className="grid grid-cols-2 gap-4">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.08, type: 'spring', stiffness: 260, damping: 20 }}
              whileHover={{ y: -6, rotate: 1.5, transition: { type: 'spring', stiffness: 300 } }}
              onClick={() => scrollTo(card.section)}
              className="rounded-card p-5 cursor-pointer relative overflow-hidden select-none"
              style={{
                background: card.bg,
                boxShadow: `6px 6px 0 ${card.shadow}`,
              }}
            >
              <div
                className="absolute -top-5 -right-5 w-16 h-16 rounded-full"
                style={{ background: 'rgba(255,255,255,.15)' }}
              />
              <img src={card.icon} alt="" className="w-10 h-10 mb-2 object-contain" />
              <div className="font-maru font-black text-white text-base leading-tight">{card.title}</div>
              <div className="text-white/70 text-xs mt-1 font-normal">{card.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
