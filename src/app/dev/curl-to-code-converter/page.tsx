import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import CurlConverterClient from './CurlConverterClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

const seo = toolSeoData['curl-to-code-converter'];

export const metadata: Metadata = {
  title: 'Free cURL to Code Converter | cURL to JavaScript Fetch, Python | DevDeck',
  description: 'Convert cURL commands to JavaScript fetch(), Python requests, and more. Free online cURL converter. Paste from Chrome DevTools and get clean code instantly.',
  alternates: { canonical: '/dev/curl-to-code-converter' },
  openGraph: {
    title: 'Free cURL to Code Converter | DevDeck',
    description: 'Convert cURL commands to JavaScript fetch, Python requests and more. Free and private.',
  }
};

export default function CurlConverterPage() {
  return (
    <article>
      <ColorBlock color="lime">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Dev Tools', href: '/dev' },
            { label: 'cURL to Code Converter' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>cURL to Code Converter</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Paste a cURL command to instantly generate JavaScript fetch() or other language code.
            </p>
          </header>
          <main>
            <CurlConverterClient />
            <ToolSeoContent whatIs={seo.whatIs} howTo={seo.howTo} faq={seo.faq} whyDevDeck={seo.whyDevDeck} />
            <RelatedTools currentPath="/dev/curl-to-code-converter" category="dev" />
            <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Dev Tools', path: '/dev' }, { name: 'cURL to Code Converter', path: '/dev/curl-to-code-converter' }]} />
            <SoftwareAppSchema name="Free cURL to Code Converter" description="Convert cURL commands to JavaScript fetch, Python requests and more." url="/dev/curl-to-code-converter" />
            <HowToSchema name="How to Convert cURL to JavaScript Fetch" description="Convert cURL commands using DevDeck" steps={seo.howTo.steps} />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
