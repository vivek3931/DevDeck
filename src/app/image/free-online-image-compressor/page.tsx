import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import { Metadata } from 'next';
import ImageCompressorClient from './ImageCompressorClient';
import { ColorBlock } from '@/components/ui/ColorBlock';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const seo = toolSeoData['free-online-image-compressor'];

export const metadata: Metadata = {
  title: 'Free Online Image Compressor | Compress JPEG, PNG & WebP | DevDeck',
  description: 'Compress images online for free without uploading them to a server. Reduce file size by up to 80% with minimal quality loss. 100% client-side image compression.',
  alternates: { canonical: '/image/free-online-image-compressor' },
  openGraph: {
    title: 'Free Online Image Compressor | DevDeck',
    description: 'Compress JPEG, PNG & WebP images in your browser. No upload needed.',
  }
};

export default function ImageCompressorPage() {
  return (
    <article>
      <ColorBlock color="navy">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Image Tools', href: '/image' },
            { label: 'Image Compressor' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Image Compressor</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Compress and scale images entirely client-side. Reduce file size by up to 80%. Complete privacy.
            </p>
          </header>
          <main>
            <ImageCompressorClient />
            <ToolSeoContent whatIs={seo.whatIs} howTo={seo.howTo} faq={seo.faq} whyDevDeck={seo.whyDevDeck} />
            <RelatedTools currentPath="/image/free-online-image-compressor" category="image" />
            <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Image Tools', path: '/image' }, { name: 'Image Compressor', path: '/image/free-online-image-compressor' }]} />
            <SoftwareAppSchema name="Free Online Image Compressor" description="Compress JPEG, PNG and WebP images in your browser. No upload needed." url="/image/free-online-image-compressor" category="MultimediaApplication" />
            <HowToSchema name="How to Compress Images Online for Free" description="Compress images using DevDeck" steps={seo.howTo.steps} />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
