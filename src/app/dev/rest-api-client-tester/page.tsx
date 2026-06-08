import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import ApiTesterClient from './ApiTesterClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

const seo = toolSeoData['rest-api-client-tester'];

export const metadata: Metadata = {
  title: 'Free Online API Tester | REST Client & HTTP Request Tool | DevDeck',
  description: 'Test REST APIs online for free. Send GET, POST, PUT, DELETE requests with custom headers and JSON bodies. Lightweight Postman alternative running 100% in your browser.',
  alternates: {
    canonical: '/dev/rest-api-client-tester',
  },
  openGraph: {
    title: 'Free Online API Tester | REST Client | DevDeck',
    description: 'Test REST APIs online for free. Lightweight Postman alternative running 100% in your browser.',
  }
};

export default function ApiTesterPage() {
  return (
    <article>
      <ColorBlock color="lime">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Dev Tools', href: '/dev' },
            { label: 'API Request Tester' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>API Request Tester</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Lightweight Postman alternative. Test REST APIs with custom headers and JSON payloads locally.
            </p>
          </header>
          <main>
            <ApiTesterClient />

            <ToolSeoContent
              whatIs={seo.whatIs}
              howTo={seo.howTo}
              faq={seo.faq}
              whyDevDeck={seo.whyDevDeck}
            />

            <RelatedTools currentPath="/dev/rest-api-client-tester" category="dev" />

            <BreadcrumbSchema items={[
              { name: 'Home', path: '/' },
              { name: 'Dev Tools', path: '/dev' },
              { name: 'API Request Tester', path: '/dev/rest-api-client-tester' }
            ]} />
            <SoftwareAppSchema
              name="Free Online REST API Tester"
              description="Test REST APIs with custom headers, JSON bodies, and all HTTP methods. Lightweight Postman alternative."
              url="/dev/rest-api-client-tester"
            />
            <HowToSchema
              name="How to Test a REST API Online"
              description="Test REST APIs using DevDeck's free online API tester"
              steps={seo.howTo.steps}
            />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
