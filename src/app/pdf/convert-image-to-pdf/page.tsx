import { SoftwareAppSchema, FaqSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import ImageToPdfClient from './ImageToPdfClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata: Metadata = {
  title: 'Image to PDF Converter | Free in your Browser JPG/PNG to PDF | DevDeck',
  description: 'Convert JPG, PNG, and WebP images into a single PDF document. 100% secure, pure client-side processing.',
  openGraph: {
    title: 'Image to PDF Converter | Free in your Browser JPG/PNG to PDF | DevDeck',
    description: 'Convert JPG, PNG, and WebP images into a single PDF document. 100% secure, pure client-side processing.',
  }
};

export default function ImageToPdfPage() {
  return (
    <article>
      <ColorBlock color="cream">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Image to PDF Converter</h1>
        <TrustBadge />
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Combine multiple images into a single PDF document. Fast, secure, and securely in your browser.
            </p>
          </header>
          <main>
            <ImageToPdfClient />
          
        <RelatedTools currentPath="/pdf/convert-image-to-pdf" category="pdf" />
        <SoftwareAppSchema name="DevDeck convert-image-to-pdf" description="A free, secure developer tool." url="https://devdeck.com/pdf/convert-image-to-pdf" />
      </main>
        </div>
      </ColorBlock>
    </article>
  );
}
