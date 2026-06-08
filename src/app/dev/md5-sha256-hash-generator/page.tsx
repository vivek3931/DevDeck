import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import HashGeneratorClient from './HashGeneratorClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

const seo = toolSeoData['md5-sha256-hash-generator'];

export const metadata: Metadata = {
  title: 'Free Online MD5 & SHA-256 Hash Generator | Checksum Calculator | DevDeck',
  description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly for strings and files. Free online hash generator running 100% in your browser. No data uploaded.',
  alternates: {
    canonical: '/dev/md5-sha256-hash-generator',
  },
  openGraph: {
    title: 'Free Online Hash Generator | MD5, SHA-256 | DevDeck',
    description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly. 100% client-side.',
  }
};

export default function HashGeneratorPage() {
  return (
    <article>
      <ColorBlock color="lime">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Dev Tools', href: '/dev' },
            { label: 'Hash Generator' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Hash & Checksum Generator</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly for strings and files.
            </p>
          </header>
          <main>
            <HashGeneratorClient />

            <ToolSeoContent whatIs={seo.whatIs} howTo={seo.howTo} faq={seo.faq} whyDevDeck={seo.whyDevDeck} />

            <RelatedTools currentPath="/dev/md5-sha256-hash-generator" category="dev" />

            <BreadcrumbSchema items={[
              { name: 'Home', path: '/' },
              { name: 'Dev Tools', path: '/dev' },
              { name: 'Hash Generator', path: '/dev/md5-sha256-hash-generator' }
            ]} />
            <SoftwareAppSchema name="Free Online MD5 & SHA-256 Hash Generator" description="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes for strings and files. 100% client-side." url="/dev/md5-sha256-hash-generator" />
            <HowToSchema name="How to Generate MD5/SHA-256 Hashes Online" description="Generate hashes using DevDeck's free online tool" steps={seo.howTo.steps} />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
