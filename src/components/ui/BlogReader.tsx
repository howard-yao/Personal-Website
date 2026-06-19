'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  thumb?: string;
  color: string;
  lang: 'en' | 'zh';
};

type Props = { post: BlogPost | null; onClose: () => void };

type MDXData = { mdxSource: MDXRemoteSerializeResult; frontmatter: Record<string, unknown> };

const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-maru font-black text-2xl text-ink mt-14 mb-4 tracking-tight" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-maru font-bold text-lg text-ink mt-10 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-[17px] text-gray-600 leading-[1.9] mb-5" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className="border-l-[3px] border-gray-200 pl-5 my-7 italic text-gray-400 text-[16px] leading-relaxed"
      {...props}
    />
  ),
  hr: () => <div className="my-12 h-px bg-gray-100" />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="underline underline-offset-2 decoration-gray-300 hover:decoration-current transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <span className="block my-10">
      <img className="w-full rounded-card object-cover" {...props} />
      {props.alt && (
        <span className="block text-center text-xs text-gray-300 mt-2 font-mono tracking-wide">
          {props.alt}
        </span>
      )}
    </span>
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-[#0e0e10] text-gray-300 text-xs leading-relaxed rounded-card p-4 my-6 overflow-x-auto font-mono whitespace-pre"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="font-mono text-sm bg-gray-100 px-1 py-0.5 rounded text-gray-700" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-gray-700" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-ink" {...props} />
  ),
};

export default function BlogReader({ post, onClose }: Props) {
  const [data, setData] = useState<MDXData | null>(null);

  useEffect(() => {
    if (!post) { setData(null); return; }
    setData(null);
    fetch(`/api/mdx?slug=${post.slug}`)
      .then(r => r.json())
      .then(setData);
  }, [post?.slug]);

  useEffect(() => {
    if (post) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [post]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const backLabel = post?.lang === 'zh' ? '返回' : 'Back';

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          key="blog-reader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 bg-[#fafaf8] overflow-y-auto"
        >
          {/* Sticky nav bar */}
          <div className="sticky top-0 z-10 bg-[#fafaf8]/90 backdrop-blur-sm border-b border-gray-100">
            <div className="max-w-[740px] mx-auto px-6 py-3.5 flex items-center justify-between">
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 text-sm font-maru font-bold text-gray-400 hover:text-ink transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {backLabel}
              </button>
              <div className="flex gap-1.5">
                {post.tags.map(t => (
                  <span
                    key={t}
                    className="font-maru font-bold text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border"
                    style={{ color: post.color, borderColor: `${post.color}44`, background: `${post.color}0a` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {/* Hero image */}
            {post.thumb && (
              <div className="w-full max-h-[52vh] overflow-hidden">
                <img
                  src={post.thumb}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  style={{ maxHeight: '52vh' }}
                />
              </div>
            )}

            {/* Article header */}
            <div className="max-w-[680px] mx-auto px-6 pt-12 pb-2">
              <span className="font-mono text-[11px] text-gray-300 tracking-widest uppercase">
                {post.date}
              </span>
              <h1
                className="font-maru font-black text-[2.4rem] text-ink leading-[1.2] tracking-tight mt-3 mb-10"
              >
                {post.title}
              </h1>
              <div className="h-px bg-gray-100" />
            </div>

            {/* Body */}
            <div className="max-w-[680px] mx-auto px-6 pt-10 pb-28">
              {data ? (
                <MDXRemote {...data.mdxSource} components={components as never} />
              ) : (
                <div className="flex justify-center py-24">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-200 border-t-gray-400 animate-spin" />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
