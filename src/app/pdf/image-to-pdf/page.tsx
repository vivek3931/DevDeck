import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import ImageToPdfClient from './ImageToPdfClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata: Metadata = {
  title: 'Image to PDF Converter | Free Offline JPG/PNG to PDF | DevDeck',
  description: 'Convert JPG, PNG, and WebP images into a single PDF document. 100% offline, pure client-side processing.',
  openGraph: {
    title: 'Image to PDF Converter | Free Offline JPG/PNG to PDF | DevDeck',
    description: 'Convert JPG, PNG, and WebP images into a single PDF document. 100% offline, pure client-side processing.',
  }
};

export default function ImageToPdfPage() {
  return (
    <article>
      <ColorBlock color="navy">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <h1 className="display-xl" style={{ marginBottom: 'var(--spacing-sm)' }}>Image to PDF Converter</h1>
            <p className="body-lg" style={{ color: 'var(--color-ink-muted)' }}>
              Combine multiple images into a single PDF document. Fast, secure, and completely offline.
            </p>
          </header>
          <main>
            <ImageToPdfClient />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
