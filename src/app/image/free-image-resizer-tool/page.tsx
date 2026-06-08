import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import ImageResizerClient from './ImageResizerClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

const seo = toolSeoData['free-image-resizer-tool'];

export const metadata: Metadata = {
  title: 'Free Online Image Resizer | Resize Photos & Pictures | DevDeck',
  description: 'Resize images online for free. Change dimensions by pixels or percentage. Maintains aspect ratio. 100% client-side — your images never leave your browser.',
  alternates: { canonical: '/image/free-image-resizer-tool' },
  openGraph: {
    title: 'Free Online Image Resizer | DevDeck',
    description: 'Resize images by pixels or percentage. No upload needed.',
  }
};

export default function ImageResizerPage() {
  return (
    <article>
      <ColorBlock color="navy">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Image Tools', href: '/image' },
            { label: 'Image Resizer' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Image Resizer</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Resize any image by dimensions or percentage. Everything happens locally in your browser.
            </p>
          </header>
          <main>
            <ImageResizerClient />
            <ToolSeoContent whatIs={seo.whatIs} howTo={seo.howTo} faq={seo.faq} whyDevDeck={seo.whyDevDeck} />
            <RelatedTools currentPath="/image/free-image-resizer-tool" category="image" />
            <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Image Tools', path: '/image' }, { name: 'Image Resizer', path: '/image/free-image-resizer-tool' }]} />
            <SoftwareAppSchema name="Free Online Image Resizer" description="Resize images by pixels or percentage in your browser." url="/image/free-image-resizer-tool" category="MultimediaApplication" />
            <HowToSchema name="How to Resize Images Online for Free" description="Resize images using DevDeck" steps={seo.howTo.steps} />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
