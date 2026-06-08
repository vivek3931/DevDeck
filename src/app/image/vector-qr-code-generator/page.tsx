import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import { Metadata } from 'next';
import QrGeneratorClient from './QrGeneratorClient';
import { ColorBlock } from '@/components/ui/ColorBlock';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const seo = toolSeoData['vector-qr-code-generator'];

export const metadata: Metadata = {
  title: 'Free QR Code Generator | Create Custom Vector QR Codes Online | DevDeck',
  description: 'Generate customizable QR codes online for free. Download as SVG (vector) or PNG. Create QR codes for URLs, text, Wi-Fi, and more. 100% client-side.',
  alternates: { canonical: '/image/vector-qr-code-generator' },
  openGraph: {
    title: 'Free QR Code Generator | DevDeck',
    description: 'Generate custom QR codes online. Download as SVG or PNG. Free and private.',
  }
};

export default function QrGeneratorPage() {
  return (
    <article>
      <ColorBlock color="navy">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Image Tools', href: '/image' },
            { label: 'QR Code Generator' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>QR Code Generator</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Convert URLs or text into downloadable, highly-customizable vector QR codes.
            </p>
          </header>
          <main>
            <QrGeneratorClient />
            <ToolSeoContent whatIs={seo.whatIs} howTo={seo.howTo} faq={seo.faq} whyDevDeck={seo.whyDevDeck} />
            <RelatedTools currentPath="/image/vector-qr-code-generator" category="image" />
            <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Image Tools', path: '/image' }, { name: 'QR Code Generator', path: '/image/vector-qr-code-generator' }]} />
            <SoftwareAppSchema name="Free QR Code Generator" description="Generate custom vector QR codes for URLs, text, and more." url="/image/vector-qr-code-generator" category="MultimediaApplication" />
            <HowToSchema name="How to Generate QR Codes Online" description="Generate QR codes using DevDeck" steps={seo.howTo.steps} />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
