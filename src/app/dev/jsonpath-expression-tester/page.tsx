import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import JsonPathClient from './JsonPathClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

const seo = toolSeoData['jsonpath-expression-tester'];

export const metadata: Metadata = {
  title: 'Free Online JSONPath Tester | Query & Filter JSON Data | DevDeck',
  description: 'Test and evaluate JSONPath expressions against JSON data in real-time. Free online JSONPath playground with filter support. 100% client-side processing.',
  alternates: { canonical: '/dev/jsonpath-expression-tester' },
  openGraph: {
    title: 'Free Online JSONPath Tester | DevDeck',
    description: 'Test JSONPath expressions against JSON data in real-time. Free and private.',
  }
};

export default function JsonPathPage() {
  return (
    <article>
      <ColorBlock color="lime">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Dev Tools', href: '/dev' },
            { label: 'JSONPath Tester' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>JSONPath Playground</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Evaluate JSONPath queries against API payloads. Pure client-side processing.
            </p>
          </header>
          <main>
            <JsonPathClient />
            <ToolSeoContent whatIs={seo.whatIs} howTo={seo.howTo} faq={seo.faq} whyDevDeck={seo.whyDevDeck} />
            <RelatedTools currentPath="/dev/jsonpath-expression-tester" category="dev" />
            <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Dev Tools', path: '/dev' }, { name: 'JSONPath Tester', path: '/dev/jsonpath-expression-tester' }]} />
            <SoftwareAppSchema name="Free Online JSONPath Tester" description="Test JSONPath expressions against JSON data in real-time." url="/dev/jsonpath-expression-tester" />
            <HowToSchema name="How to Test JSONPath Expressions Online" description="Test JSONPath expressions using DevDeck" steps={seo.howTo.steps} />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
