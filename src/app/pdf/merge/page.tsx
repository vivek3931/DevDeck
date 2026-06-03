import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import PdfMergeClient from './PdfMergeClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata: Metadata = {
  title: 'Merge PDF Files Offline | Free Private PDF Merger | DevDeck',
  description: 'Combine multiple PDF files into one instantly. 100% offline, pure client-side processing means your sensitive documents never leave your device.',
  openGraph: {
    title: 'Merge PDF Files Offline | Free Private PDF Merger | DevDeck',
    description: 'Combine multiple PDF files into one instantly. 100% offline, pure client-side processing means your sensitive documents never leave your device.',
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
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Select multiple PDFs, drag to reorder them, and click merge. 100% offline and secure.
            </p>
          </header>
          <main>
            <PdfMergeClient />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
