import { SoftwareAppSchema, FaqSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import JsonValidatorClient from './JsonValidatorClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata: Metadata = {
  title: 'Free Online JSON Formatter & Validator | DevDeck',
  description: 'Instantly format, minify, and validate JSON payloads. Catch syntax errors exactly where they happen.',
  openGraph: {
    title: 'Free Online JSON Formatter & Validator | DevDeck',
    description: 'Instantly format, minify, and validate JSON payloads. Catch syntax errors exactly where they happen.',
  }
};

export default function JsonValidatorPage() {
  return (
    <article>
      <ColorBlock color="lime">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>JSON Formatter & Validator</h1>
        <TrustBadge />
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Paste your malformed JSON below. Format it instantly, or pinpoint exact syntax errors.
            </p>
          </header>
          <main>
            <JsonValidatorClient />
          
        <RelatedTools currentPath="/dev/json-formatter-validator" category="dev" />
        <SoftwareAppSchema name="DevDeck json-formatter-validator" description="A free, secure developer tool." url="https://devdeck.com/dev/json-formatter-validator" />
      </main>
        </div>
      </ColorBlock>
    </article>
  );
}
