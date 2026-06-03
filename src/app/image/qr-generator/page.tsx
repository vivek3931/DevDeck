import { Metadata } from 'next';
import QrGeneratorClient from './QrGeneratorClient';
import { ColorBlock } from '@/components/ui/ColorBlock';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Online QR Code Generator | Download SVG & PNG | DevDeck',
  description: 'Create and download QR codes for URLs, text, and Wi-Fi instantly. Free online QR code generator running locally in your browser.',
  openGraph: {
    title: 'Free Online QR Code Generator | Download SVG & PNG | DevDeck',
    description: 'Create and download QR codes for URLs, text, and Wi-Fi instantly. Free online QR code generator running locally in your browser.',
  }
};

export default function QrGeneratorPage() {
  return (
    <article>
      <ColorBlock color="mint">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>QR Code Generator</h1>
            <p className="body-lg" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Create vector (SVG) QR codes instantly.
            </p>
          </header>
          <main>
            <QrGeneratorClient />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
