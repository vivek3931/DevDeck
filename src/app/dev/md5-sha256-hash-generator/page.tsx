import { SoftwareAppSchema, FaqSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import HashGeneratorClient from './HashGeneratorClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata: Metadata = {
  title: 'Free Online Hash & Checksum Generator | SHA-256, MD5 | DevDeck',
  description: 'Generate cryptographic hashes instantly. Supports MD5, SHA-1, SHA-256, and SHA-512 hashes for strings and text locally.',
  openGraph: {
    title: 'Free Online Hash & Checksum Generator | DevDeck',
    description: 'Generate cryptographic hashes instantly. Supports MD5, SHA-1, SHA-256, and SHA-512 hashes for strings and text locally.',
  }
};

export default function HashGeneratorPage() {
  return (
    <article>
      <ColorBlock color="coral">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Hash & Checksum Generator</h1>
        <TrustBadge />
            <p className="body-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Instantly generate secure cryptographic hashes from your text. Fully locally and secure.
            </p>
          </header>
          <main>
            <HashGeneratorClient />
          
        <RelatedTools currentPath="/dev/md5-sha256-hash-generator" category="dev" />
        <SoftwareAppSchema name="DevDeck md5-sha256-hash-generator" description="A free, secure developer tool." url="https://devdeck.com/dev/md5-sha256-hash-generator" />
      </main>
        </div>
      </ColorBlock>
    </article>
  );
}
