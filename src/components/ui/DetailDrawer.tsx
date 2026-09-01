'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

type DrawerData = {
  mdxSource: MDXRemoteSerializeResult;
  frontmatter: {
    title?: string;
    year?: string;
    cat?: string;
    color?: string;
  };
};

const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-maru font-black text-xl text-ink mt-8 mb-3" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-maru font-bold text-base text-ink mt-6 mb-2" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-500 text-sm leading-relaxed mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside text-gray-500 text-sm space-y-1 mb-4 ml-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside text-gray-500 text-sm space-y-1 mb-4 ml-2" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="w-full rounded-card my-6 object-cover" alt={props.alt ?? ''} {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-[#3a7bd5] underline underline-offset-2 hover:opacity-70 transition-opacity"
      target="_blank" rel="noopener noreferrer" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-gray-200 pl-4 text-gray-400 text-sm italic my-4" {...props} />
  ),
  hr: () => <hr className="border-gray-100 my-8" />,
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-[#0e0e10] text-gray-300 text-xs leading-relaxed rounded-card p-4 my-6 overflow-x-auto font-mono whitespace-pre" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="font-mono" {...props} />
  ),
};

export default function DetailDrawer({ slug, onClose }: { slug: string | null; onClose: () => void }) {
  const [data, setData]       = useState<DrawerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) { setData(null); return; }
    setLoading(true);
    setNotFound(false);
    fetch(`/api/mdx?slug=${encodeURIComponent(slug)}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d  => { setData(d); setLoading(false); })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = slug ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [slug]);

  return (
    <AnimatePresence>
      {slug && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/25 z-40 backdrop-blur-sm"
          />
          <motion.div
            key="drawer"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-cream z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-4 border-b border-black/5 bg-cream/95 backdrop-blur-sm flex-shrink-0">
              <span className="font-mono text-xs tracking-widest text-gray-400 uppercase">
                {loading ? '…' : (data?.frontmatter?.cat ?? '')}
              </span>
              <button onClick={onClose} aria-label="Close"
                className="text-gray-400 hover:text-ink transition-colors p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-8 py-8">
              {loading && (
                <div className="flex items-center justify-center h-40 text-gray-300 text-sm font-mono">
                  Loading…
                </div>
              )}
              {notFound && !loading && (
                <div className="flex items-center justify-center h-40 text-gray-300 text-sm font-mono">
                  Content coming soon.
                </div>
              )}
              {data && !loading && (
                <>
                  {data.frontmatter.year && (
                    <span className="font-mono text-xs text-gray-400">{data.frontmatter.year}</span>
                  )}
                  <h1 className="font-maru font-black text-3xl text-ink mt-1 mb-8 tracking-tight leading-tight">
                    {data.frontmatter.title}
                  </h1>
                  <MDXRemote {...data.mdxSource} components={components} />
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
