import { Metadata } from 'next';
import ImageCompressorClient from './ImageCompressorClient';
import { ColorBlock } from '@/components/ui/ColorBlock';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Online Image Compressor | Compress JPEG & PNG Offline | DevDeck',
  description: 'Compress images online for free without uploading them to a server. Secure, offline-first image compression in your browser.',
  openGraph: {
    title: 'Free Online Image Compressor | Compress JPEG & PNG Offline | DevDeck',
    description: 'Compress images online for free without uploading them to a server. Secure, offline-first image compression in your browser.',
  }
};

export default function ImageCompressorPage() {
  return (
    <article>
      <ColorBlock color="navy">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Image Compressor</h1>
            <p className="body-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Compress and scale images entirely client-side. Complete privacy.
            </p>
          </header>
          <main>
            <ImageCompressorClient />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
