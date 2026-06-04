import { SoftwareAppSchema, FaqSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import JsonToTsClient from './JsonToTsClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata: Metadata = {
  title: 'Free Online JSON to TypeScript Converter | DevDeck',
  description: 'Instantly convert JSON payloads to perfectly formatted TypeScript interfaces. Free, locally, and secure zero-tracking developer utility.',
  openGraph: {
    title: 'Free Online JSON to TypeScript Converter | DevDeck',
    description: 'Instantly convert JSON payloads to perfectly formatted TypeScript interfaces.',
  }
};

export default function JsonToTsPage() {
  return (
    <article>
      <ColorBlock color="navy">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>JSON to TypeScript</h1>
        <TrustBadge />
            <p className="body-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Paste JSON on the left to instantly generate TypeScript interfaces on the right.
            </p>
          </header>
          <main>
            <JsonToTsClient />
          
        <RelatedTools currentPath="/dev/json-to-typescript-interface-converter" category="dev" />
        <SoftwareAppSchema name="DevDeck json-to-typescript-interface-converter" description="A free, secure developer tool." url="https://devdeck.com/dev/json-to-typescript-interface-converter" />
      </main>
        </div>
      </ColorBlock>
    </article>
  );
}
