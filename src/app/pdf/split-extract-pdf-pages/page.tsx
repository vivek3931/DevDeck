import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import PdfSplitClient from './PdfSplitClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

const seo = toolSeoData['split-extract-pdf-pages'];

export const metadata: Metadata = {
  title: 'Free Online PDF Splitter | Extract Pages from PDF | DevDeck',
  description: 'Split PDF files and extract specific pages or page ranges. Free online PDF splitter — 100% secure, processes in your browser. No upload needed.',
  alternates: { canonical: '/pdf/split-extract-pdf-pages' },
  openGraph: {
    title: 'Free Online PDF Splitter | DevDeck',
    description: 'Extract pages from PDF files securely in your browser.',
  }
};

export default function PdfSplitPage() {
  return (
    <article>
      <ColorBlock color="cream">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'PDF Tools', href: '/pdf' },
            { label: 'Split PDF' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Split & Extract PDF Pages</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Extract specific pages or page ranges from a PDF document. 100% secure and client-side.
            </p>
          </header>
          <main>
            <PdfSplitClient />
            <ToolSeoContent whatIs={seo.whatIs} howTo={seo.howTo} faq={seo.faq} whyDevDeck={seo.whyDevDeck} />
            <RelatedTools currentPath="/pdf/split-extract-pdf-pages" category="pdf" />
            <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'PDF Tools', path: '/pdf' }, { name: 'Split PDF', path: '/pdf/split-extract-pdf-pages' }]} />
            <SoftwareAppSchema name="Free Online PDF Splitter" description="Extract pages from PDF files securely in your browser." url="/pdf/split-extract-pdf-pages" category="BusinessApplication" />
            <HowToSchema name="How to Split and Extract PDF Pages Online" description="Split PDFs using DevDeck" steps={seo.howTo.steps} />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
