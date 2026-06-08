import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import RegexTesterClient from './RegexTesterClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

const seo = toolSeoData['regular-expression-tester'];

export const metadata: Metadata = {
  title: 'Free Online Regex Tester | Regular Expression Visualizer & Debugger | DevDeck',
  description: 'Test and debug regular expressions in real-time with instant match highlighting and capture group visualization. Free online regex tester running 100% in your browser.',
  alternates: {
    canonical: '/dev/regular-expression-tester',
  },
  openGraph: {
    title: 'Free Online Regex Tester & Visualizer | DevDeck',
    description: 'Test regular expressions in real-time with instant match highlighting. Free and private.',
  }
};

export default function RegexTesterPage() {
  return (
    <article>
      <ColorBlock color="lime">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Dev Tools', href: '/dev' },
            { label: 'Regex Tester' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Regex Tester & Visualizer</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Test Regular Expressions in real-time. Highlights matches and explains capture groups.
            </p>
          </header>
          <main>
            <RegexTesterClient />

            <ToolSeoContent whatIs={seo.whatIs} howTo={seo.howTo} faq={seo.faq} whyDevDeck={seo.whyDevDeck} />

            <RelatedTools currentPath="/dev/regular-expression-tester" category="dev" />

            <BreadcrumbSchema items={[
              { name: 'Home', path: '/' },
              { name: 'Dev Tools', path: '/dev' },
              { name: 'Regex Tester', path: '/dev/regular-expression-tester' }
            ]} />
            <SoftwareAppSchema name="Free Online Regex Tester & Visualizer" description="Test and debug regular expressions in real-time with match highlighting and capture groups." url="/dev/regular-expression-tester" />
            <HowToSchema name="How to Test Regular Expressions Online" description="Test regex patterns using DevDeck's free online tool" steps={seo.howTo.steps} />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
