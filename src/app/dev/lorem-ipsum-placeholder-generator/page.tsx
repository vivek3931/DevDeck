import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import LoremIpsumClient from './LoremIpsumClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

const seo = toolSeoData['lorem-ipsum-placeholder-generator'];

export const metadata: Metadata = {
  title: 'Free Lorem Ipsum Generator | Placeholder Text Generator Online | DevDeck',
  description: 'Generate Lorem Ipsum placeholder text instantly. Choose paragraphs, sentences, or words. Free online dummy text generator for designers and developers.',
  alternates: { canonical: '/dev/lorem-ipsum-placeholder-generator' },
  openGraph: {
    title: 'Free Lorem Ipsum Generator | DevDeck',
    description: 'Generate placeholder text instantly. Paragraphs, sentences, or words.',
  }
};

export default function LoremIpsumPage() {
  return (
    <article>
      <ColorBlock color="lime">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Dev Tools', href: '/dev' },
            { label: 'Lorem Ipsum Generator' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Lorem Ipsum Generator</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Generate reliable placeholder text (paragraphs, sentences, words) instantly.
            </p>
          </header>
          <main>
            <LoremIpsumClient />
            <ToolSeoContent whatIs={seo.whatIs} howTo={seo.howTo} faq={seo.faq} whyDevDeck={seo.whyDevDeck} />
            <RelatedTools currentPath="/dev/lorem-ipsum-placeholder-generator" category="dev" />
            <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Dev Tools', path: '/dev' }, { name: 'Lorem Ipsum Generator', path: '/dev/lorem-ipsum-placeholder-generator' }]} />
            <SoftwareAppSchema name="Free Lorem Ipsum Generator" description="Generate placeholder text for designs and prototypes." url="/dev/lorem-ipsum-placeholder-generator" />
            <HowToSchema name="How to Generate Lorem Ipsum Text" description="Generate placeholder text using DevDeck" steps={seo.howTo.steps} />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
