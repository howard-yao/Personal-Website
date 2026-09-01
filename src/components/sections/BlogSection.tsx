"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlogReader from "@/components/ui/BlogReader";

type Category = "all" | "movies" | "vn" | "cg";
type Post = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  tags: string[];
  thumb?: string;
  color: string;
  category: "movies" | "vn" | "cg";
  contentType?: "mdx" | "html";
};

const POSTS: Post[] = [
  {
    slug: "blog/totoro-monomyth",
    date: "Jun 2026",
    title: "My Neighbor Totoro and the Monomyth",
    excerpt: "Only children can see Totoro. Only adults can become Totoro.",
    tags: ["film"],
    color: "#4a9e6b",
    thumb: "/blogs/totoro/cover.jpg",
    category: "movies",
  },
  {
    slug: "blog/song-of-saya",
    date: "Jun 2026",
    title: "Song of Saya",
    excerpt:
      "Pure oxygen must be diluted with five parts nitrogen before humans can breathe it—so too must some truth be diluted with lies.",
    tags: ["visual novel"],
    color: "#8b1a1a",
    thumb: "/blogs/song-of-saya/cover.jpg",
    category: "vn",
  },
  {
    slug: "blog/sea-bed",
    date: "Jun 2026",
    title: "Sea Bed",
    excerpt:
      "A critically acclaimed yuri-themed mystery visual novel that explores themes of love, memory, and the complexities of human relationships through the perspectives of three main characters.",
    tags: ["visual novel"],
    color: "#1e5f7a",
    thumb: "/blogs/sea-bed/cover.jpg",
    category: "vn",
  },
  {
    slug: "blogs/computer-graphics/how_to_draw_a_triangle",
    date: "Jul 2026",
    title: "How to Draw a Triangle?",
    excerpt:
      "Rasterization, Transformation, and Texture Mapping in Computer graphics with OpenGL",
    tags: ["CG", "OpenGL"],
    color: "#2c5282",
    thumb: "/blogs/computer-graphics/how_to_draw_a_triangle/image.png",
    category: "cg",
    contentType: "html",
  },
  {
    slug: "blogs/computer-graphics/half_edge_structure",
    date: "Jul 2026",
    title: "Bézier Curves, Meshes, and the Half-Edge Data Structure",
    excerpt:
      "Build a interactive mesh-processing system using the half edge structure, which explicitly repreents the connectivity between verices, edges, and faces",
    tags: ["CG", "Meshes"],
    color: "#7c3aed",
    thumb: "/blogs/computer-graphics/half_edge_structure/image.png",
    category: "cg",
    contentType: "html",
  },
  {
    slug: "blogs/computer-graphics/monte_carlo_path_tracer",
    date: "Aug 2026",
    title: "Monte Carlo Path Tracer with Adaptive Sampling",
    excerpt:
      "Implement a physically based path tracer that uses Monte Carlo integration to simulate direct and indirect illumination. The renderer combines importance sampling, Roussian roulette, adaptive sampling and BVH acceleration to optimize the solution",
    tags: ["CG", "Ray Tracing"],
    color: "#c2410c",
    thumb: "/blogs/computer-graphics/monte_carlo_path_tracer/bunny_rr100.png",
    category: "cg",
    contentType: "html",
  },
];

const FILTERS: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "movies", label: "Movies" },
  { key: "vn", label: "Visual Novels" },
  { key: "cg", label: "Computer Graphics" },
];

const COLLAPSED_COUNT = 2;

export default function BlogSection() {
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [category, setCategory] = useState<Category>("all");
  const [expanded, setExpanded] = useState(false);

  const filtered = POSTS.filter(
    (p) => category === "all" || p.category === category,
  );

  const showExpander = category === "all" && filtered.length > COLLAPSED_COUNT;
  const visible =
    showExpander && !expanded ? filtered.slice(0, COLLAPSED_COUNT) : filtered;
  const hiddenCount = filtered.length - COLLAPSED_COUNT;

  return (
    <>
      <section className="max-w-3xl mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-ink text-cream text-xs font-bold tracking-widest px-4 py-1.5 rounded-pill mb-4">
            writing
          </span>

          <div className="flex items-end justify-between mb-6">
            <h2 className="font-maru font-black text-4xl text-ink tracking-tight">
              Thoughts & notes
            </h2>
          </div>

          {/* Category filter tabs */}
          <div className="flex gap-2 mb-8">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => {
                  setCategory(f.key);
                  setExpanded(false);
                }}
                className={`font-maru font-bold text-sm px-5 py-2 rounded-pill border-2 transition-all ${
                  category === f.key
                    ? "bg-ink text-cream border-ink"
                    : "bg-transparent text-gray-400 border-gray-200 hover:border-ink hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <AnimatePresence mode="popLayout">
              {visible.map((post, i) => (
                <motion.article
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -3 }}
                  onClick={() =>
                    post.contentType === "html"
                      ? window.open(`/${post.slug}/index.html`, "_blank")
                      : setActivePost(post)
                  }
                  className="group bg-white rounded-card overflow-hidden cursor-pointer border-2 border-transparent hover:border-gray-100 transition-all"
                >
                  {/* Cover image */}
                  <div className="w-full aspect-[2/1] relative overflow-hidden bg-gray-50">
                    {post.thumb ? (
                      <img
                        src={post.thumb}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-end p-6"
                        style={{
                          background: `linear-gradient(135deg, ${post.color}18, ${post.color}06)`,
                        }}
                      >
                        <span
                          className="font-maru font-black text-[96px] leading-none select-none"
                          style={{ color: `${post.color}22` }}
                        >
                          "
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Text */}
                  <div className="px-6 py-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[11px] text-gray-300 tracking-widest uppercase">
                        {post.date}
                      </span>
                      <div className="flex gap-1.5">
                        {post.tags.map((t) => (
                          <span
                            key={t}
                            className="font-maru font-bold text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border"
                            style={{
                              color: post.color,
                              borderColor: `${post.color}44`,
                              background: `${post.color}0a`,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h3 className="font-maru font-black text-ink text-xl leading-snug mb-2 tracking-tight group-hover:text-gray-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div
                      className="mt-4 flex items-center gap-1 text-[12px] font-maru font-bold tracking-wide"
                      style={{ color: post.color }}
                    >
                      Read
                      <svg
                        className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>

            {/* Expand / collapse button — only in All tab */}
            <AnimatePresence>
              {showExpander && (
                <motion.button
                  key="expander"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setExpanded((v) => !v)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-card border-2 border-dashed border-gray-200 text-gray-400 hover:border-gray-300 hover:text-ink font-maru font-bold text-sm transition-all group"
                >
                  <span>
                    {expanded ? "Show less" : `Show ${hiddenCount} more`}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      <BlogReader post={activePost} onClose={() => setActivePost(null)} />
    </>
  );
}
