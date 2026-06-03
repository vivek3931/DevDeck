import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import ImageResizerClient from './ImageResizerClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata: Metadata = {
  title: 'Free Image Resizer | Resize PNG & JPG Offline | DevDeck',
  description: 'Resize images instantly by exact pixels or percentages. 100% offline, pure client-side processing in your browser.',
  openGraph: {
    title: 'Free Image Resizer | Resize PNG & JPG Offline | DevDeck',
    description: 'Resize images instantly by exact pixels or percentages. 100% offline, pure client-side processing.',
  }
};

export default function ImageResizerPage() {
  return (
    <article>
      <ColorBlock color="navy">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <h1 className="display-xl" style={{ marginBottom: 'var(--spacing-sm)' }}>Image Resizer</h1>
            <p className="body-lg" style={{ color: 'var(--color-ink-muted)' }}>
              Resize any image by dimensions or percentage. Completely private and offline.
            </p>
          </header>
          <main>
            <ImageResizerClient />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
