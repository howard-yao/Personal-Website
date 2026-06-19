'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlogReader from '@/components/ui/BlogReader';

type Post = { slug: string; date: string; title: string; excerpt: string; tags: string[]; thumb?: string; color: string; lang: 'en' | 'zh' };

const POSTS: Post[] = [
  {
    slug: 'blog/totoro-monomyth-cn',
    date: 'Jun 2026',
    title: '《龙猫》：成长之后，我们终将成为别人的龙猫',
    excerpt: '幻想从来不是现实的对立面，而是现实能够被温柔看待的原因。',
    tags: ['film', 'essay'],
    color: '#4a9e6b',
    thumb: '/blogs/totoro/cover.jpg',
    lang: 'zh',
  },
  {
    slug: 'blog/totoro-monomyth',
    date: 'Jun 2026',
    title: 'My Neighbor Totoro and the Monomyth',
    excerpt: 'How a film without a conventional villain quietly follows the oldest story structure in the world.',
    tags: ['film', 'essay'],
    color: '#4a9e6b',
    thumb: '/blogs/totoro/cover.jpg',
    lang: 'en',
  },
];

export default function BlogSection() {
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [lang, setLang] = useState<'en' | 'zh'>('en');

  const shown = POSTS.filter(p => p.lang === lang);

  return (
    <>
      <section className="max-w-3xl mx-auto px-8 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block bg-ink text-cream text-xs font-bold tracking-widest px-4 py-1.5 rounded-pill mb-4">
            writing
          </span>

          {/* Heading row with language toggle */}
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-maru font-black text-4xl text-ink tracking-tight">Thoughts & notes</h2>
            <div className="flex items-center bg-gray-100 rounded-pill p-0.5 gap-0.5 mb-1">
              {(['en', 'zh'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`font-maru font-bold text-xs px-3 py-1.5 rounded-pill transition-all ${
                    lang === l
                      ? 'bg-ink text-cream shadow-sm'
                      : 'text-gray-400 hover:text-ink'
                  }`}
                >
                  {l === 'en' ? 'EN' : '中文'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {shown.map((post, i) => (
                <motion.article key={post.slug}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -3 }}
                  onClick={() => setActivePost(post)}
                  className="group bg-white rounded-card overflow-hidden cursor-pointer border-2 border-transparent hover:border-gray-100 transition-all">

                  {/* Cover image */}
                  <div className="w-full aspect-[2/1] relative overflow-hidden bg-gray-50">
                    {post.thumb ? (
                      <img src={post.thumb} alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-end p-6"
                        style={{ background: `linear-gradient(135deg, ${post.color}18, ${post.color}06)` }}>
                        <span className="font-maru font-black text-[96px] leading-none select-none"
                          style={{ color: `${post.color}22` }}>
                          "
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Text */}
                  <div className="px-6 py-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[11px] text-gray-300 tracking-widest uppercase">{post.date}</span>
                      <div className="flex gap-1.5">
                        {post.tags.map(t => (
                          <span key={t} className="font-maru font-bold text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border"
                            style={{ color: post.color, borderColor: `${post.color}44`, background: `${post.color}0a` }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h3 className="font-maru font-black text-ink text-xl leading-snug mb-2 tracking-tight group-hover:text-gray-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
                    <div className="mt-4 flex items-center gap-1 text-[12px] font-maru font-bold tracking-wide"
                      style={{ color: post.color }}>
                      {lang === 'zh' ? '阅读' : 'Read'}
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      <BlogReader post={activePost} onClose={() => setActivePost(null)} />
    </>
  );
}
