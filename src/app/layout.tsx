import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Toaster } from 'sonner';
import { OfflineIndicator } from '@/components/ui/OfflineIndicator';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'DevDeck | Free Online Developer Tools, Image Tools & PDF Tools',
    template: '%s',
  },
  description: 'Free online developer toolkit with 23+ tools: JSON formatter, image compressor, PDF merger, JWT decoder, regex tester, and more. 100% privacy-focused — everything runs in your browser.',
  metadataBase: new URL('https://devdeck.online'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DevDeck | Free Online Developer Tools & Utilities',
    description: 'JSON formatter, image compressor, PDF merger, JWT decoder, QR code generator and 20+ more tools. 100% free, privacy-focused, runs in your browser.',
    url: 'https://devdeck.online',
    siteName: 'DevDeck',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevDeck | Free Online Developer Tools',
    description: '23+ free developer, image, and PDF tools running 100% in your browser. Private and secure.',
  },
  verification: {
    google: 'nDBkpJuQu9pqGMgsrebRQ3_lf3AMG2HN0aTXF55q6rc',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <a href="#main-content" className="visually-hidden" style={{ position: 'absolute', top: 0, left: 0, padding: '8px 16px', background: '#000', color: '#fff', zIndex: 9999, fontSize: '14px' }}>
          Skip to main content
        </a>
        <Header />
        <CommandPalette />
        <main id="main-content">{children}</main>
        <Footer />
        <OfflineIndicator />
        <Toaster 
          position="bottom-center" 
          toastOptions={{
            style: {
              background: 'var(--color-surface-soft)',
              color: 'var(--color-ink)',
              border: '1px solid var(--color-hairline)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
              fontFamily: 'var(--font-sans)',
            },
          }} 
        />
      </body>
    </html>
  );
}
