import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import ImageBase64Client from './ImageBase64Client';
import { ColorBlock } from '@/components/ui/ColorBlock';

const seo = toolSeoData['base64-image-encoder'];

export const metadata: Metadata = {
  title: 'Free Image to Base64 Encoder | Convert Images to Data URI | DevDeck',
  description: 'Convert images to Base64 data URI strings for CSS and HTML embedding. Free online encoder for PNG, JPG, WebP, SVG. 100% client-side — no upload needed.',
  alternates: { canonical: '/image/base64-image-encoder' },
  openGraph: {
    title: 'Free Image to Base64 Encoder | DevDeck',
    description: 'Convert images to Base64 for embedding in CSS/HTML. No upload needed.',
  }
};

export default function ImageBase64Page() {
  return (
    <article>
      <ColorBlock color="navy">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Image Tools', href: '/image' },
            { label: 'Image to Base64' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Image to Base64 Encoder</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Encode images into Base64 strings for direct CSS/HTML embedding. 100% client-side.
            </p>
          </header>
          <main>
            <ImageBase64Client />
            <ToolSeoContent whatIs={seo.whatIs} howTo={seo.howTo} faq={seo.faq} whyDevDeck={seo.whyDevDeck} />
            <RelatedTools currentPath="/image/base64-image-encoder" category="image" />
            <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Image Tools', path: '/image' }, { name: 'Image to Base64', path: '/image/base64-image-encoder' }]} />
            <SoftwareAppSchema name="Free Image to Base64 Encoder" description="Convert images to Base64 data URIs for embedding in HTML and CSS." url="/image/base64-image-encoder" category="MultimediaApplication" />
            <HowToSchema name="How to Convert Images to Base64" description="Encode images to Base64 using DevDeck" steps={seo.howTo.steps} />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
