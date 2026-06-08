import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import QuickDumpClient from './QuickDumpClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

const seo = toolSeoData['secure-code-snippet-bin'];

export const metadata: Metadata = {
  title: 'Quick Dump | Secure Encrypted Code & Text Sharing | DevDeck',
  description: 'Securely share code snippets and text with end-to-end encryption. Zero-knowledge pastebin alternative. Your content is encrypted before it leaves your browser.',
  alternates: { canonical: '/dev/secure-code-snippet-bin' },
  openGraph: {
    title: 'Quick Dump | Secure Encrypted Pastebin | DevDeck',
    description: 'Share code and text with end-to-end encryption. Zero-knowledge pastebin alternative.',
  }
};

export default function QuickDumpPage() {
  return (
    <article>
      <ColorBlock color="lime">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Dev Tools', href: '/dev' },
            { label: 'Quick Dump' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Quick Dump</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Securely dump raw code or API payloads. Share with end-to-end encryption.
            </p>
          </header>
          <main>
            <QuickDumpClient />
            <ToolSeoContent whatIs={seo.whatIs} howTo={seo.howTo} faq={seo.faq} whyDevDeck={seo.whyDevDeck} />
            <RelatedTools currentPath="/dev/secure-code-snippet-bin" category="dev" />
            <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Dev Tools', path: '/dev' }, { name: 'Quick Dump', path: '/dev/secure-code-snippet-bin' }]} />
            <SoftwareAppSchema name="Quick Dump — Secure Code Sharing" description="Share code and text with end-to-end encryption. Zero-knowledge pastebin." url="/dev/secure-code-snippet-bin" />
            <HowToSchema name="How to Use Quick Dump" description="Share code securely using DevDeck's Quick Dump" steps={seo.howTo.steps} />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
