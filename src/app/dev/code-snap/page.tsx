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
          <p className="body-sm" style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: 'var(--spacing-sm)', maxWidth: '800px' }}>
            A lightning-fast Carbon alternative. Paste your code, choose a beautiful background, and instantly export a high-res PNG for Twitter, LinkedIn, or presentations. Everything stays entirely local.
          </p>
        </div>
        
        <CodeSnapClient />
      </ColorBlock>
    </div>
  );
}
