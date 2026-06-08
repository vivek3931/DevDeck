import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import ImageConverterClient from './ImageConverterClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

const seo = toolSeoData['png-jpg-webp-image-converter'];

export const metadata: Metadata = {
  title: 'Free Image Format Converter | Convert PNG to JPG, WebP Online | DevDeck',
  description: 'Convert images between PNG, JPG, and WebP formats instantly. Free online image converter — 100% client-side, no upload needed. Supports batch conversion.',
  alternates: { canonical: '/image/png-jpg-webp-image-converter' },
  openGraph: {
    title: 'Free Image Format Converter | PNG, JPG, WebP | DevDeck',
    description: 'Convert images between PNG, JPG, and WebP instantly. No upload required.',
  }
};

export default function ImageConverterPage() {
  return (
    <article>
      <ColorBlock color="navy">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Image Tools', href: '/image' },
            { label: 'Image Converter' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Image Format Converter</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Convert instantly between WebP, PNG, and JPEG. Fast, lossless (for PNG/WebP), and completely client-side.
            </p>
          </header>
          <main>
            <ImageConverterClient />
            <ToolSeoContent whatIs={seo.whatIs} howTo={seo.howTo} faq={seo.faq} whyDevDeck={seo.whyDevDeck} />
            <RelatedTools currentPath="/image/png-jpg-webp-image-converter" category="image" />
            <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Image Tools', path: '/image' }, { name: 'Image Converter', path: '/image/png-jpg-webp-image-converter' }]} />
            <SoftwareAppSchema name="Free Image Format Converter" description="Convert between PNG, JPG, and WebP formats. 100% client-side." url="/image/png-jpg-webp-image-converter" category="MultimediaApplication" />
            <HowToSchema name="How to Convert Images Between PNG, JPG, and WebP" description="Convert image formats using DevDeck" steps={seo.howTo.steps} />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
