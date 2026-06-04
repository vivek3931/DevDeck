import { SoftwareAppSchema, FaqSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import ImageResizerClient from './ImageResizerClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata: Metadata = {
  title: 'Free Image Resizer | Resize PNG & JPG in your Browser | DevDeck',
  description: 'Resize images instantly by exact pixels or percentages. 100% secure, pure client-side processing in your browser.',
  openGraph: {
    title: 'Free Image Resizer | Resize PNG & JPG in your Browser | DevDeck',
    description: 'Resize images instantly by exact pixels or percentages. 100% secure, pure client-side processing.',
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
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Image Resizer</h1>
        <TrustBadge />
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Resize any image by dimensions or percentage. Completely private and client-side.
            </p>
          </header>
          <main>
            <ImageResizerClient />
          
        <RelatedTools currentPath="/image/free-image-resizer-tool" category="image" />
        <SoftwareAppSchema name="DevDeck free-image-resizer-tool" description="A free, secure developer tool." url="https://devdeck.com/image/free-image-resizer-tool" />
      </main>
        </div>
      </ColorBlock>
    </article>
  );
}
