import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import CurlConverterClient from './CurlConverterClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata: Metadata = {
  title: 'Free Online cURL to Fetch Converter | DevDeck',
  description: 'Instantly convert raw cURL commands into clean JavaScript fetch() code. Free online developer tool with zero tracking.',
  openGraph: {
    title: 'Free Online cURL to Fetch Converter | DevDeck',
    description: 'Instantly convert raw cURL commands into clean JavaScript fetch() code.',
  }
};

export default function CurlConverterPage() {
  return (
    <article>
      <ColorBlock color="lime">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <h1 className="display-xl" style={{ marginBottom: 'var(--spacing-sm)' }}>cURL to Fetch Converter</h1>
            <p className="body-lg" style={{ color: 'var(--color-ink-muted)' }}>
              Paste a cURL command from your terminal or Chrome DevTools to generate JavaScript `fetch()` syntax.
            </p>
          </header>
          <main>
            <CurlConverterClient />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
