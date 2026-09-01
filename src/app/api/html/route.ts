import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'No slug' }, { status: 400 });

  // Prevent path traversal
  const safe = slug.replace(/\.\./g, '').replace(/^\/+/, '');
  const htmlPath = path.join(process.cwd(), 'public', safe, 'index.html');

  if (!fs.existsSync(htmlPath)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const raw = fs.readFileSync(htmlPath, 'utf-8');

  // Extract page-body content using index-based slicing (safe on large HTML)
  const START = '<div class="page-body">';
  const END = '</article>';
  const startIdx = raw.indexOf(START);
  const endIdx = raw.lastIndexOf(END);

  let html = '';
  if (startIdx !== -1 && endIdx !== -1) {
    html = raw.slice(startIdx + START.length, endIdx).replace(/\s*<\/div>\s*$/, '');
  } else {
    // Fallback: extract body tag content
    const m = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    html = m?.[1] ?? raw;
  }

  // Remove the first <h1> — BlogReader already shows the title in its header
  html = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, '');

  // Strip Notion UUID id="" attributes (cosmetic only)
  html = html.replace(/\s+id="[^"]*"/g, '');

  // Strip style from <code> elements only — Notion sets white-space:pre-wrap;word-break:break-all
  // on <code> which fights the scroll container. All other elements keep their styles:
  // - <img style="width:Xpx"> preserves Notion's original image sizes
  // - KaTeX <span style="..."> needs inline styles for correct math spacing
  html = html.replace(/(<code\b[^>]*?)\s+style="[^"]*"/g, '$1');

  // Remove <script> tags (Prism etc — won't execute inside dangerouslySetInnerHTML)
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Rewrite relative src="" to absolute paths (images live in the same folder as index.html)
  const base = `/${safe}`;
  html = html.replace(/\bsrc="(?!https?:\/\/)([^"]+)"/g, (_, p) => `src="${base}/${p}"`);

  // Rewrite figure anchor hrefs (they point to the same image files)
  html = html.replace(/\bhref="(?!https?:\/\/)(?!#)([^"]+)"/g, (_, p) => `href="${base}/${p}"`);

  // Wrap <pre> blocks in a scroll div so overflow-x-clip on the outer reader doesn't clip them
  html = html.replace(/(<pre\b[^>]*>[\s\S]*?<\/pre>)/gi, '<div class="cg-pre-scroll">$1</div>');

  return NextResponse.json({ html });
}
