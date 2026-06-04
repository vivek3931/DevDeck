import { SoftwareAppSchema, FaqSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Metadata } from 'next';
import { ColorBlock } from '@/components/ui/ColorBlock';
import SqliteExplorerClient from './SqliteExplorerClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Local SQLite Explorer | DevDeck',
  description: 'Run SQL queries on your SQLite databases entirely in the browser using WebAssembly. No server uploads.',
};

export default function SqliteExplorerPage() {
  return (
    <article>
      <ColorBlock color="navy">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>SQLite Explorer</h1>
        <TrustBadge />
            <p className="body-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Run SQL queries locally via WebAssembly. Your database never leaves your machine.
            </p>
          </header>
          <main>
            <SqliteExplorerClient />
          
        <RelatedTools currentPath="/dev/client-side-sqlite-viewer" category="dev" />
        <SoftwareAppSchema name="DevDeck client-side-sqlite-viewer" description="A free, secure developer tool." url="https://devdeck.com/dev/client-side-sqlite-viewer" />
      </main>
        </div>
      </ColorBlock>
    </article>
  );
}
