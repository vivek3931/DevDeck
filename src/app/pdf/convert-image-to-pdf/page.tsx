import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import ImageToPdfClient from './ImageToPdfClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

const seo = toolSeoData['convert-image-to-pdf'];

export const metadata: Metadata = {
  title: 'Free Image to PDF Converter | Convert JPG, PNG to PDF Online | DevDeck',
  description: 'Convert images (JPG, PNG, WebP) to PDF online for free. Combine multiple images into a single PDF document. 100% client-side — your files never leave your browser.',
  alternates: { canonical: '/pdf/convert-image-to-pdf' },
  openGraph: {
    title: 'Free Image to PDF Converter | DevDeck',
    description: 'Convert JPG, PNG, WebP images to PDF. Secure, client-side processing.',
  }
};

export default function ImageToPdfPage() {
  return (
    <article>
      <ColorBlock color="cream">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'PDF Tools', href: '/pdf' },
            { label: 'Image to PDF' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Image to PDF Converter</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Convert JPG, PNG, and WebP images into a single PDF document. 100% client-side.
            </p>
          </header>
          <main>
            <ImageToPdfClient />
            <ToolSeoContent whatIs={seo.whatIs} howTo={seo.howTo} faq={seo.faq} whyDevDeck={seo.whyDevDeck} />
            <RelatedTools currentPath="/pdf/convert-image-to-pdf" category="pdf" />
            <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'PDF Tools', path: '/pdf' }, { name: 'Image to PDF', path: '/pdf/convert-image-to-pdf' }]} />
            <SoftwareAppSchema name="Free Image to PDF Converter" description="Convert JPG, PNG, WebP images to PDF. Client-side processing." url="/pdf/convert-image-to-pdf" category="BusinessApplication" />
            <HowToSchema name="How to Convert Images to PDF Online" description="Convert images to PDF using DevDeck" steps={seo.howTo.steps} />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
