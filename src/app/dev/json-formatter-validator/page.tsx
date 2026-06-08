import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import JsonValidatorClient from './JsonValidatorClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

const seo = toolSeoData['json-formatter-validator'];

export const metadata: Metadata = {
  title: 'Free Online JSON Formatter & Validator | Format, Beautify & Minify JSON | DevDeck',
  description: 'Instantly format, beautify, minify, and validate JSON data online for free. Catch syntax errors with exact line numbers. 100% client-side — your data never leaves your browser.',
  alternates: {
    canonical: '/dev/json-formatter-validator',
  },
  openGraph: {
    title: 'Free Online JSON Formatter & Validator | DevDeck',
    description: 'Instantly format, beautify, minify, and validate JSON data online for free. Catch syntax errors with exact line numbers. 100% private and client-side.',
  }
};

export default function JsonValidatorPage() {
  return (
    <article>
      <ColorBlock color="lime">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Dev Tools', href: '/dev' },
            { label: 'JSON Formatter & Validator' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>JSON Formatter & Validator</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Paste your malformed JSON below. Format it instantly, or pinpoint exact syntax errors.
            </p>
          </header>
          <main>
            <JsonValidatorClient />

            <ToolSeoContent
              whatIs={seo.whatIs}
              howTo={seo.howTo}
              faq={seo.faq}
              whyDevDeck={seo.whyDevDeck}
            />

            <RelatedTools currentPath="/dev/json-formatter-validator" category="dev" />

            <BreadcrumbSchema items={[
              { name: 'Home', path: '/' },
              { name: 'Dev Tools', path: '/dev' },
              { name: 'JSON Formatter & Validator', path: '/dev/json-formatter-validator' }
            ]} />
            <SoftwareAppSchema
              name="Free Online JSON Formatter & Validator"
              description="Instantly format, beautify, minify, and validate JSON data online. Catch syntax errors with exact line numbers. 100% client-side processing."
              url="/dev/json-formatter-validator"
            />
            <HowToSchema
              name="How to Format & Validate JSON Online"
              description="Format and validate JSON data using DevDeck's free online tool"
              steps={seo.howTo.steps}
            />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
