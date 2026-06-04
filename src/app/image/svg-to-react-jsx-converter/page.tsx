import { SoftwareAppSchema, FaqSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import SvgToReactClient from './SvgToReactClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata: Metadata = {
  title: 'Free Online SVG to React JSX Converter | DevDeck',
  description: 'Convert raw SVG HTML into clean React functional components instantly. Fixes camelCase attributes and outputs ready-to-use JSX.',
  openGraph: {
    title: 'Free Online SVG to React JSX Converter | DevDeck',
    description: 'Convert raw SVG HTML into clean React functional components instantly.',
  }
};

export default function SvgToReactPage() {
  return (
    <article>
      <ColorBlock color="coral">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>SVG to React Converter</h1>
        <TrustBadge />
            <p className="body-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Paste a raw SVG to instantly generate a clean React (JSX/TSX) functional component.
            </p>
          </header>
          <main>
            <SvgToReactClient />
          
        <RelatedTools currentPath="/image/svg-to-react-jsx-converter" category="image" />
        <SoftwareAppSchema name="DevDeck svg-to-react-jsx-converter" description="A free, secure developer tool." url="https://devdeck.com/image/svg-to-react-jsx-converter" />
      </main>
        </div>
      </ColorBlock>
    </article>
  );
}
