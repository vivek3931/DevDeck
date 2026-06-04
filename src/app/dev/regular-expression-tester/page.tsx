import { SoftwareAppSchema, FaqSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Metadata } from 'next';
import { ColorBlock } from '@/components/ui/ColorBlock';
import RegexTesterClient from './RegexTesterClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Regex Visualizer & Tester | DevDeck',
  description: 'Test and debug Regular Expressions safely in your browser. Visualize matches and capture groups instantly without server logging.',
};

export default function RegexTesterPage() {
  return (
    <article>
      <ColorBlock color="mint">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Regex Visualizer</h1>
        <TrustBadge />
            <p className="body-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Write, test, and debug Regular Expressions securely. Everything runs locally.
            </p>
          </header>
          <main>
            <RegexTesterClient />
          
        <RelatedTools currentPath="/dev/regular-expression-tester" category="dev" />
        <SoftwareAppSchema name="DevDeck regular-expression-tester" description="A free, secure developer tool." url="https://devdeck.com/dev/regular-expression-tester" />
      </main>
        </div>
      </ColorBlock>
    </article>
  );
}
