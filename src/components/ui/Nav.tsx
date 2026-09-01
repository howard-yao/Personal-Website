'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { id: 'about',    label: 'about me' },
  { id: 'works',    label: 'works' },
  { id: 'creative', label: 'creative' },
  { id: 'blog',     label: 'blogs' },
  { id: 'resume',   label: 'résumé' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('theme') === 'dark';
    setDark(saved);
    if (saved) document.documentElement.setAttribute('data-dark', 'true');
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    if (next) document.documentElement.setAttribute('data-dark', 'true');
    else document.documentElement.removeAttribute('data-dark');
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 sm:px-8 py-3 transition-all duration-300 ${
        scrolled || menuOpen ? 'bg-cream/90 backdrop-blur-sm shadow-sm' : ''
      }`}
      style={{ overflow: 'visible' }}
    >
      <div className="flex items-center justify-between">
        <button
          onClick={() => scrollTo('home')}
          className="font-maru font-black text-lg text-ink hover:text-[#e84040] transition-colors flex-shrink-0"
        >
          Howard Yao
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-2 items-center">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => scrollTo(l.id)}
                className={`font-maru font-bold text-sm px-4 py-2 rounded-pill transition-all duration-200 ${
                  active === l.id
                    ? 'bg-ink text-cream'
                    : 'text-gray-500 hover:bg-ink hover:text-cream'
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
          <li>
            <button onClick={toggleDark} aria-label="Toggle dark mode"
              className="ml-1 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-ink transition-colors rounded-full">
              {dark ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round">
                  <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
                  <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggleDark} aria-label="Toggle dark mode"
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-ink transition-colors rounded-full">
            {dark ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
                <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            className="flex flex-col justify-center items-center gap-1.5 w-9 h-9 flex-shrink-0"
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} className="block w-6 h-0.5 bg-ink rounded-full" />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block w-6 h-0.5 bg-ink rounded-full" />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} className="block w-6 h-0.5 bg-ink rounded-full" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown — absolutely positioned overlay so it never shifts page layout */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="md:hidden absolute top-full left-0 right-0 mt-1 mx-6 sm:mx-8 flex flex-col gap-1 p-2 rounded-card bg-cream/95 backdrop-blur-sm shadow-lg"
          >
            {links.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => scrollTo(l.id)}
                  className={`w-full text-left font-maru font-bold text-sm px-4 py-2.5 rounded-pill transition-all duration-200 ${
                    active === l.id
                      ? 'bg-ink text-cream'
                      : 'text-gray-500 hover:bg-ink hover:text-cream'
                  }`}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
