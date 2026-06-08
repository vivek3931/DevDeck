import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import PdfMergeClient from './PdfMergeClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

const seo = toolSeoData['merge-pdf-files-free'];

export const metadata: Metadata = {
  title: 'Free Online PDF Merger | Combine PDF Files Securely | DevDeck',
  description: 'Merge multiple PDF files into one instantly. Drag and drop to reorder. 100% secure — your documents never leave your browser. Free online PDF combiner.',
  alternates: { canonical: '/pdf/merge-pdf-files-free' },
  openGraph: {
    title: 'Free Online PDF Merger | DevDeck',
    description: 'Combine multiple PDF files into one. Secure, client-side processing.',
  }
};

export default function PdfMergePage() {
  return (
    <article>
      <ColorBlock color="cream">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'PDF Tools', href: '/pdf' },
            { label: 'Merge PDFs' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Merge PDF Files</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Select multiple PDFs, drag to reorder them, and click merge. 100% secure and client-side.
            </p>
          </header>
          <main>
            <PdfMergeClient />
            <ToolSeoContent whatIs={seo.whatIs} howTo={seo.howTo} faq={seo.faq} whyDevDeck={seo.whyDevDeck} />
            <RelatedTools currentPath="/pdf/merge-pdf-files-free" category="pdf" />
            <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'PDF Tools', path: '/pdf' }, { name: 'Merge PDFs', path: '/pdf/merge-pdf-files-free' }]} />
            <SoftwareAppSchema name="Free Online PDF Merger" description="Combine multiple PDF files into one. 100% client-side processing." url="/pdf/merge-pdf-files-free" category="BusinessApplication" />
            <HowToSchema name="How to Merge PDF Files Online for Free" description="Merge PDFs using DevDeck" steps={seo.howTo.steps} />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
