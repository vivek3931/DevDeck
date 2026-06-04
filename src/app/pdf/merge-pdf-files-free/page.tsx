import { SoftwareAppSchema, FaqSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import PdfMergeClient from './PdfMergeClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata: Metadata = {
  title: 'Merge PDF Files in your Browser | Free Private PDF Merger | DevDeck',
  description: 'Combine multiple PDF files into one instantly. 100% secure, pure client-side processing means your sensitive documents never leave your device.',
  openGraph: {
    title: 'Merge PDF Files in your Browser | Free Private PDF Merger | DevDeck',
    description: 'Combine multiple PDF files into one instantly. 100% secure, pure client-side processing means your sensitive documents never leave your device.',
  }
};

export default function PdfMergePage() {
  return (
    <article>
      <ColorBlock color="cream">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Merge PDF Files</h1>
        <TrustBadge />
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Select multiple PDFs, drag to reorder them, and click merge. completely secure and secure.
            </p>
          </header>
          <main>
            <PdfMergeClient />
          
        <RelatedTools currentPath="/pdf/merge-pdf-files-free" category="pdf" />
        <SoftwareAppSchema name="DevDeck merge-pdf-files-free" description="A free, secure developer tool." url="https://devdeck.com/pdf/merge-pdf-files-free" />
      </main>
        </div>
      </ColorBlock>
    </article>
  );
}
