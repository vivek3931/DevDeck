import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import JsonToTsClient from './JsonToTsClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

const seo = toolSeoData['json-to-typescript-interface-converter'];

export const metadata: Metadata = {
  title: 'Free JSON to TypeScript Converter | Generate TS Interfaces Online | DevDeck',
  description: 'Instantly convert JSON data into TypeScript interfaces and types. Free online JSON to TypeScript converter with support for nested objects and arrays. 100% client-side.',
  alternates: {
    canonical: '/dev/json-to-typescript-interface-converter',
  },
  openGraph: {
    title: 'Free JSON to TypeScript Converter | DevDeck',
    description: 'Convert JSON payloads into TypeScript interfaces instantly. Free and private.',
  }
};

export default function JsonToTsPage() {
  return (
    <article>
      <ColorBlock color="lime">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Dev Tools', href: '/dev' },
            { label: 'JSON to TypeScript' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>JSON to TypeScript Converter</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Instantly convert JSON payloads into perfectly formatted TypeScript interfaces.
            </p>
          </header>
          <main>
            <JsonToTsClient />

            <ToolSeoContent whatIs={seo.whatIs} howTo={seo.howTo} faq={seo.faq} whyDevDeck={seo.whyDevDeck} />

            <RelatedTools currentPath="/dev/json-to-typescript-interface-converter" category="dev" />

            <BreadcrumbSchema items={[
              { name: 'Home', path: '/' },
              { name: 'Dev Tools', path: '/dev' },
              { name: 'JSON to TypeScript', path: '/dev/json-to-typescript-interface-converter' }
            ]} />
            <SoftwareAppSchema name="Free JSON to TypeScript Converter" description="Convert JSON data into TypeScript interfaces and types instantly." url="/dev/json-to-typescript-interface-converter" />
            <HowToSchema name="How to Convert JSON to TypeScript Interfaces" description="Generate TypeScript interfaces from JSON using DevDeck" steps={seo.howTo.steps} />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
