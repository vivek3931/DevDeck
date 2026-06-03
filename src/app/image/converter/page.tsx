import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import ImageConverterClient from './ImageConverterClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata: Metadata = {
  title: 'Free Image Format Converter | PNG, JPG, WebP | DevDeck',
  description: 'Convert images instantly between WebP, PNG, and JPEG. All processing happens offline in your browser.',
  openGraph: {
    title: 'Free Image Format Converter | PNG, JPG, WebP | DevDeck',
    description: 'Convert images instantly between WebP, PNG, and JPEG. All processing happens offline in your browser.',
  }
};

export default function ImageConverterPage() {
  return (
    <article>
      <ColorBlock color="navy">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <h1 className="display-xl" style={{ marginBottom: 'var(--spacing-sm)' }}>Image Format Converter</h1>
            <p className="body-lg" style={{ color: 'var(--color-ink-muted)' }}>
              Convert instantly between WebP, PNG, and JPEG. Fast, lossless (for PNG/WebP), and completely client-side.
            </p>
          </header>
          <main>
            <ImageConverterClient />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
