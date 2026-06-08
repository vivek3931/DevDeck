import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import SvgToReactClient from './SvgToReactClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

const seo = toolSeoData['svg-to-react-jsx-converter'];

export const metadata: Metadata = {
  title: 'Free SVG to React JSX Converter | SVG to Component | DevDeck',
  description: 'Convert raw SVG code into clean React JSX/TSX components. Handles attribute conversion, self-closing tags, and generates ready-to-use functional components.',
  alternates: { canonical: '/image/svg-to-react-jsx-converter' },
  openGraph: {
    title: 'Free SVG to React JSX Converter | DevDeck',
    description: 'Convert SVG to React components instantly. Free and private.',
  }
};

export default function SvgToReactPage() {
  return (
    <article>
      <ColorBlock color="navy">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Image Tools', href: '/image' },
            { label: 'SVG to React' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>SVG to React JSX Converter</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Convert raw SVG HTML into clean React functional components perfectly formatted.
            </p>
          </header>
          <main>
            <SvgToReactClient />
            <ToolSeoContent whatIs={seo.whatIs} howTo={seo.howTo} faq={seo.faq} whyDevDeck={seo.whyDevDeck} />
            <RelatedTools currentPath="/image/svg-to-react-jsx-converter" category="image" />
            <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Image Tools', path: '/image' }, { name: 'SVG to React', path: '/image/svg-to-react-jsx-converter' }]} />
            <SoftwareAppSchema name="Free SVG to React JSX Converter" description="Convert SVG code to React JSX components." url="/image/svg-to-react-jsx-converter" category="DeveloperApplication" />
            <HowToSchema name="How to Convert SVG to React Components" description="Convert SVG to JSX using DevDeck" steps={seo.howTo.steps} />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
