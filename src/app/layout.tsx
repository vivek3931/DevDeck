import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'DevDeck | Privacy-Focused Local Developer Toolkit',
  description: 'An all-in-one, privacy-focused Developer Utilities Deck. Run secure, local micro-tools directly in your browser without exposing sensitive data.',
  metadataBase: new URL('https://devdeck.online'),
  openGraph: {
    title: 'DevDeck | Local Developer Toolkit',
    description: 'Zero-Knowledge Ephemeral Sharing, Secure Password Generation, Local File Compression and more.',
    url: 'https://devdeck.online',
    siteName: 'DevDeck',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevDeck | Privacy-Focused Local Developer Toolkit',
    description: 'An all-in-one, privacy-focused Developer Utilities Deck.',
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
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <Header />
        <CommandPalette />
        <main>{children}</main>
        <Footer />
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
