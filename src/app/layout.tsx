import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../styles.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Muhammad Sahil Khatri — Backend Engineer',
  description:
    'Muhammad Sahil Khatri, backend engineer and Computer Systems Engineering student @ MUET. Exploring reliable systems, infrastructure, and AI-powered workflows.',
  authors: [{ name: 'Muhammad Sahil Khatri' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Muhammad Sahil Khatri — Backend Engineer',
    description:
      'An engineering portfolio exploring reliable backend systems, scalable infrastructure, and intelligent workflows.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Sahil Khatri — Backend Engineer',
    description:
      'An engineering portfolio exploring reliable backend systems, scalable infrastructure, and intelligent workflows.',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700;750;800&family=IBM+Plex+Mono:wght@400;500&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var saved = localStorage.getItem('portfolio-theme');
                if (saved === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
