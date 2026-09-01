import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Howard Yao',
  description: 'Researcher, Vocaloid producer, photographer, and writer.',
  openGraph: {
    title: 'Howard Yao',
    description: 'Researcher, Vocaloid producer, photographer, and writer.',
    siteName: 'Howard Yao',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.25/dist/katex.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
