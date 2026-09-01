'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DetailDrawer from '@/components/ui/DetailDrawer';

type Work = { cat: string; slug: string; title: string; desc: string; year: string; color: string; thumb?: string; tag?: string; diagram?: boolean };

const WORKS: Work[] = [
  { cat: 'research', slug: 'works/fmcw-radar',     title: 'A 60 GHz Millimeter-Wave FMCW Radar System for Real-Time Observations in Remote Outdoor Environments', desc: 'IEEE SAS 2025 — Best Poster Award. Weatherproof mmWave radar for long-term environmental field deployments.', year: '2025', color: '#e84040', thumb: '/works/fmcw/block-diagram.png', tag: 'FIG. 01 — SYSTEM BLOCK DIAGRAM', diagram: true },
  { cat: 'research', slug: 'works/kriging-spatial', title: 'Portable Cellular Signal Towers for 5G-based Data Collection and Kriging-based Spatial Interpolation in Fields', desc: 'DOE CCI Program. Raspberry Pi + 5G sensor platform with Ordinary Kriging for real-time geospatial RSSI mapping.', year: '2024', color: '#3a7bd5', thumb: '/works/kriging/kriging-map.jpg', tag: 'FIG. 01 — RSSI INTERPOLATION MAP' },
];

const FILTERS = ['all', 'research', 'engineering'] as const;

function CornerMarks({ color }: { color: string }) {
  const base = 'absolute w-3 h-3 border-[1.5px]';
  return (
    <>
      <span className={`${base} top-2 left-2 border-r-0 border-b-0`}    style={{ borderColor: color }} />
      <span className={`${base} top-2 right-2 border-l-0 border-b-0`}   style={{ borderColor: color }} />
      <span className={`${base} bottom-2 left-2 border-r-0 border-t-0`} style={{ borderColor: color }} />
      <span className={`${base} bottom-2 right-2 border-l-0 border-t-0`} style={{ borderColor: color }} />
    </>
  );
}

export default function WorksSection() {
  const [filter, setFilter]       = useState<string>('all');
  const [drawerSlug, setDrawer]   = useState<string | null>(null);
  const shown = filter === 'all' ? WORKS : WORKS.filter(w => w.cat === filter);

  return (
    <>
      <section className="max-w-3xl mx-auto px-8 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block bg-ink text-cream text-xs font-bold tracking-widest px-4 py-1.5 rounded-pill mb-4">
            technical
          </span>
          <h2 className="font-maru font-black text-4xl text-ink mb-8 tracking-tight">Works</h2>

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

          <div className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {shown.map((w, i) => (
                <motion.div key={w.title} layout
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }} transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -3 }}
                  onClick={() => setDrawer(w.slug)}
                  className="group flex flex-col sm:flex-row gap-0 sm:gap-5 bg-white rounded-card overflow-hidden cursor-pointer border-2 border-transparent hover:border-gray-100 transition-colors">

                  {/* Preview / figure panel */}
                  <div className={`relative w-full sm:w-48 h-40 sm:h-auto flex-shrink-0 overflow-hidden ${w.diagram ? 'bg-cream' : 'bg-[#0e0e10]'}`}>
                    {w.thumb ? (
                      <img
                        src={w.thumb}
                        alt={w.title}
                        className={w.diagram
                          ? 'w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500'
                          : 'w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500'}
                      />
                    ) : (
                      <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${w.color}33, #0e0e10)` }} />
                    )}
                    {/* technical grid overlay */}
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: `linear-gradient(${w.color}55 1px, transparent 1px), linear-gradient(90deg, ${w.color}55 1px, transparent 1px)`,
                      backgroundSize: '16px 16px',
                    }} />
                    <CornerMarks color={w.color} />
                    {w.tag && (
                      <span className={`absolute bottom-2 left-2 right-8 font-mono text-[9px] tracking-wider uppercase truncate ${w.diagram ? 'text-gray-400' : 'text-white/80'}`}>
                        {w.tag}
                      </span>
                    )}
                    <span className={`absolute top-2.5 right-2.5 font-mono text-[10px] tracking-widest ${w.diagram ? 'text-gray-400' : 'text-white/70'}`}>
                      {w.year}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="flex-1 px-5 py-4 sm:py-5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-pill border"
                        style={{ color: w.color, borderColor: `${w.color}55`, background: `${w.color}0d` }}>
                        {w.cat}
                      </span>
                    </div>
                    <p className="font-maru font-bold text-ink text-[15px] leading-snug mb-1.5">{w.title}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{w.desc}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      <DetailDrawer slug={drawerSlug} onClose={() => setDrawer(null)} />
    </>
  );
}
