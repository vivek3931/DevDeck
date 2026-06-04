import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import ImageBase64Client from './ImageBase64Client';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata: Metadata = {
  title: 'Image to Base64 Converter | Encode Images in your Browser | DevDeck',
  description: 'Convert any image to a Base64 data URI string instantly. Perfect for embedding images directly into HTML or CSS.',
  openGraph: {
    title: 'Image to Base64 Converter | Encode Images in your Browser | DevDeck',
    description: 'Convert any image to a Base64 data URI string instantly. Perfect for embedding images directly into HTML or CSS.',
  }
};

export default function ImageBase64Page() {
  return (
    <article>
      <ColorBlock color="navy">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Image to Base64</h1>
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Encode images into Base64 strings for direct embedding in CSS/HTML. 100% secure.
            </p>
          </header>
          <main>
            <ImageBase64Client />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
