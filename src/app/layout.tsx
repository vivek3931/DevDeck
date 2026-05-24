import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';

export const metadata: Metadata = {
  title: 'DevDeck | Privacy-Focused Local Developer Toolkit',
  description: 'An all-in-one, privacy-focused Developer Utilities Deck. Run secure, local micro-tools directly in your browser without exposing sensitive data.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <CommandPalette />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
