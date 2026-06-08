import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import SqliteExplorerClient from './SqliteExplorerClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

const seo = toolSeoData['client-side-sqlite-viewer'];

export const metadata: Metadata = {
  title: 'Free Online SQLite Viewer | Browser-Based Database Explorer | DevDeck',
  description: 'Open, browse, and query SQLite databases directly in your browser. No upload required. Free online SQLite viewer powered by WebAssembly. 100% client-side.',
  alternates: { canonical: '/dev/client-side-sqlite-viewer' },
  openGraph: {
    title: 'Free Online SQLite Viewer & Explorer | DevDeck',
    description: 'Browse and query SQLite databases in your browser. No upload, no installation.',
  }
};

export default function SqliteExplorerPage() {
  return (
    <article>
      <ColorBlock color="lime">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Dev Tools', href: '/dev' },
            { label: 'SQLite Explorer' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Local SQLite Explorer</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Run SQL queries on your SQLite databases entirely in the browser using WebAssembly.
            </p>
          </header>
          <main>
            <SqliteExplorerClient />
            <ToolSeoContent whatIs={seo.whatIs} howTo={seo.howTo} faq={seo.faq} whyDevDeck={seo.whyDevDeck} />
            <RelatedTools currentPath="/dev/client-side-sqlite-viewer" category="dev" />
            <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Dev Tools', path: '/dev' }, { name: 'SQLite Explorer', path: '/dev/client-side-sqlite-viewer' }]} />
            <SoftwareAppSchema name="Free Online SQLite Viewer" description="Browse and query SQLite databases in your browser using WebAssembly. No upload needed." url="/dev/client-side-sqlite-viewer" />
            <HowToSchema name="How to View SQLite Databases Online" description="View SQLite databases using DevDeck's browser-based explorer" steps={seo.howTo.steps} />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
