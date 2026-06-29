'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DetailDrawer from '@/components/ui/DetailDrawer';
import BlogReader from '@/components/ui/BlogReader';

type Work = { cat: string; slug: string; title: string; desc: string; year: string; color: string; thumb?: string };

const WORKS: Work[] = [
  { cat: 'vocaloid',    slug: 'creative/b-no-revenge',   title: 'Bのリベンジ — B小町 feat. Rose SV & Kasane Teto SV', desc: 'Opening song from the anime TVアニメ「【推しの子】」- 「Oshi no Ko」 Season 3', year: '2026', color: '#9b59b6', thumb: '/creative/b-no-revenge/cover.jpg' },
  { cat: 'vocaloid',    slug: 'creative/vocaloid-cover', title: 'Idol — YOASOBI feat. Hatsune Miku (V6 Cover)', desc: 'A Vocaloid V6 cover arrangement of YOASOBI’s "Idol," feats. Hatsune Miku', year: '2026', color: '#3a7bd5', thumb: '/creative/idol/idol-cover-art.jpg' },
  { cat: 'photography', slug: 'creative/sf-zine',        title: 'SF Zine — Photo Series', desc: 'A photo series shot in San Francisco.', year: '2026', color: '#f0a020', thumb: '/creative/sf-zine/1.png' },
  { cat: '3d',          slug: 'creative/pochita',        title: 'Pochita — 3D CAD & Print', desc: 'A 3D model of Pochita from Chainsaw Man, designed in Blender and printed in full color', year: '2026', color: '#e84040', thumb: '/creative/pochita/print-photo.jpg' },
];

const FILTERS = ['all', 'vocaloid', 'photography', '3d'] as const;

export default function CreativeSection() {
  const [filter, setFilter]     = useState<string>('all');
  const [drawerSlug, setDrawer] = useState<string | null>(null);
  const [photoWork, setPhotoWork] = useState<Work | null>(null);
  const shown = filter === 'all' ? WORKS : WORKS.filter(w => w.cat === filter);

  const photoPost = photoWork ? {
    slug: photoWork.slug, title: photoWork.title, date: photoWork.year,
    tags: [photoWork.cat], thumb: photoWork.thumb, color: photoWork.color, lang: 'en' as const,
  } : null;

  return (
    <>
      <section className="max-w-3xl mx-auto px-8 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block bg-ink text-cream text-xs font-bold tracking-widest px-4 py-1.5 rounded-pill mb-4">
            creative
          </span>
          <h2 className="font-maru font-black text-4xl text-ink mb-8 tracking-tight">Creative</h2>

          <div className="flex gap-2 flex-wrap mb-8">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`font-maru font-bold text-sm px-5 py-2 rounded-pill border-2 transition-all ${
                  filter === f
                    ? 'bg-ink text-cream border-ink'
                    : 'bg-transparent text-gray-400 border-gray-200 hover:border-ink hover:text-ink'
                }`}>
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <AnimatePresence mode="popLayout">
              {shown.map((w, i) => (
                <motion.div key={`${w.title}-${w.year}`} layout
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }} transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  onClick={() => w.cat === 'photography' ? setPhotoWork(w) : setDrawer(w.slug)}
                  className="group bg-white rounded-card overflow-hidden cursor-pointer border-2 border-transparent hover:border-gray-100 transition-colors">

                  {/* Thumbnail */}
                  <div className="aspect-[4/3] relative overflow-hidden bg-gray-50">
                    {w.thumb ? (
                      <img
                        src={w.thumb}
                        alt={w.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${w.color}22, ${w.color}08)` }}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ background: `${w.color}26` }}>
                          <div className="w-4 h-4 rounded-full" style={{ background: w.color }} />
                        </div>
                      </div>
                    )}
                    <span className="absolute top-3 right-3 font-mono text-[11px] text-gray-400 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-pill">
                      {w.year}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: w.color }} />
                      <p className="font-maru font-bold text-ink text-[15px] leading-tight">{w.title}</p>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{w.desc}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      <DetailDrawer slug={drawerSlug} onClose={() => setDrawer(null)} />
      <BlogReader post={photoPost} onClose={() => setPhotoWork(null)} />
    </>
  );
}
