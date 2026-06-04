import { SoftwareAppSchema, FaqSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Metadata } from 'next';
import { ColorBlock } from '@/components/ui/ColorBlock';
import CodeSnapClient from './CodeSnapClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Code Snippet Exporter | DevDeck',
  description: 'Generate beautiful, high-resolution PNG images of your code snippets for Twitter and presentations.',
};

export default function CodeSnapPage() {
  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <ColorBlock color="navy" style={{ flexGrow: 1 }}>
        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', marginBottom: 'var(--spacing-md)' }}>
            <ArrowLeft size={16} /> Back to Tools
          </Link>
          <h1 className="display-lg" style={{ color: 'var(--color-inverse-ink)' }}>Code Snippet Exporter</h1>
        <TrustBadge />
          <p className="body-sm" style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: 'var(--spacing-sm)', maxWidth: '800px' }}>
            A lightning-fast Carbon alternative. Paste your code, choose a beautiful background, and instantly export a high-res PNG for Twitter, LinkedIn, or presentations. Everything stays entirely local.
          </p>
        </div>
        
        <CodeSnapClient />
      </ColorBlock>
        <RelatedTools currentPath="/dev/beautiful-code-snippet-image-generator" category="dev" />
        <SoftwareAppSchema name="DevDeck beautiful-code-snippet-image-generator" description="A free, secure developer tool." url="https://devdeck.com/dev/beautiful-code-snippet-image-generator" />

    </div>
  );
}
