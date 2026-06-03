import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';
import { Metadata } from 'next';
import QuickDumpClient from './QuickDumpClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata: Metadata = {
  title: 'Secure Online Text Sharing & Pastebin | Quick Dump | DevDeck',
  description: 'Free online text sharing. Paste text, JSON, or links securely. Get a 4-letter code and fetch it on any device instantly.',
  openGraph: {
    title: 'Secure Online Text Sharing & Pastebin | Quick Dump | DevDeck',
    description: 'Free online text sharing. Paste text, JSON, or links securely. Get a 4-letter code and fetch it on any device instantly.',
  }
};

export default function QuickDumpPage() {
  return (
    <article>
      <ColorBlock color="navy">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <h1 className="display-xl" style={{ marginBottom: 'var(--spacing-sm)' }}>Quick Dump</h1>
            <p className="body-lg" style={{ color: 'var(--color-ink-muted)' }}>
              Ephemeral text sharing. Paste anything here, grab the 4-letter code, and pull it on any other device instantly.
            </p>
          </header>
          <main>
            <Suspense fallback={<div style={{ padding: 'var(--spacing-xxl)', textAlign: 'center' }}>Loading Secure Sandbox...</div>}>
              <QuickDumpClient />
            </Suspense>
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
