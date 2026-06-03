import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import PdfSplitClient from './PdfSplitClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata: Metadata = {
  title: 'Split PDF Offline | Extract PDF Pages | DevDeck',
  description: 'Extract specific pages or page ranges from a PDF document instantly. 100% offline, pure client-side processing.',
  openGraph: {
    title: 'Split PDF Offline | Extract PDF Pages | DevDeck',
    description: 'Extract specific pages or page ranges from a PDF document instantly. 100% offline, pure client-side processing.',
  }
};

export default function PdfSplitPage() {
  return (
    <article>
      <ColorBlock color="cream">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Split PDF Document</h1>
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Extract exact pages from your PDF file. No server uploads—completely secure and instant.
            </p>
          </header>
          <main>
            <PdfSplitClient />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
