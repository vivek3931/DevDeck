import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import JwtDecoderClient from './JwtDecoderClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

const seo = toolSeoData['secure-jwt-decoder'];

export const metadata: Metadata = {
  title: 'Free Online JWT Decoder | Decode JSON Web Tokens Securely | DevDeck',
  description: 'Decode, inspect, and view JSON Web Tokens (JWT) entirely in your browser. Your tokens are never sent to a server. Free, secure, and private JWT decoder.',
  alternates: {
    canonical: '/dev/secure-jwt-decoder',
  },
  openGraph: {
    title: 'Free Online JWT Decoder | Secure Browser-Based | DevDeck',
    description: 'Decode JSON Web Tokens securely in your browser. Your tokens never leave your device.',
  }
};

export default function JwtDecoderPage() {
  return (
    <article>
      <ColorBlock color="mint">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Dev Tools', href: '/dev' },
            { label: 'JWT Decoder' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>JWT Decoder</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Decode JSON Web Tokens instantly and completely locally. Your sensitive tokens are never sent to a server.
            </p>
          </header>
          <main>
            <JwtDecoderClient />

            <ToolSeoContent whatIs={seo.whatIs} howTo={seo.howTo} faq={seo.faq} whyDevDeck={seo.whyDevDeck} />

            <RelatedTools currentPath="/dev/secure-jwt-decoder" category="dev" />

            <BreadcrumbSchema items={[
              { name: 'Home', path: '/' },
              { name: 'Dev Tools', path: '/dev' },
              { name: 'JWT Decoder', path: '/dev/secure-jwt-decoder' }
            ]} />
            <SoftwareAppSchema name="Free Online JWT Decoder" description="Decode, inspect, and view JSON Web Tokens entirely in your browser. Secure and private." url="/dev/secure-jwt-decoder" />
            <HowToSchema name="How to Decode a JWT Token Online" description="Decode JWT tokens using DevDeck's free online tool" steps={seo.howTo.steps} />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
