import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import PdfProtectClient from './PdfProtectClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

const seo = toolSeoData['password-protect-pdf-file'];

export const metadata: Metadata = {
  title: 'Free PDF Password Protection | Encrypt PDF Online | DevDeck',
  description: 'Password protect and encrypt PDF files online for free. Your documents and passwords never leave your browser. 100% secure, client-side PDF encryption.',
  alternates: { canonical: '/pdf/password-protect-pdf-file' },
  openGraph: {
    title: 'Free PDF Password Protection | DevDeck',
    description: 'Encrypt and password protect PDF files securely in your browser.',
  }
};

export default function PdfProtectPage() {
  return (
    <article>
      <ColorBlock color="cream">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'PDF Tools', href: '/pdf' },
            { label: 'Protect PDF' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Password Protect PDF</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Encrypt and secure your PDF document with a password. 100% client-side encryption.
            </p>
          </header>
          <main>
            <PdfProtectClient />
            <ToolSeoContent whatIs={seo.whatIs} howTo={seo.howTo} faq={seo.faq} whyDevDeck={seo.whyDevDeck} />
            <RelatedTools currentPath="/pdf/password-protect-pdf-file" category="pdf" />
            <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'PDF Tools', path: '/pdf' }, { name: 'Protect PDF', path: '/pdf/password-protect-pdf-file' }]} />
            <SoftwareAppSchema name="Free PDF Password Protection" description="Encrypt and password protect PDF files in your browser." url="/pdf/password-protect-pdf-file" category="BusinessApplication" />
            <HowToSchema name="How to Password Protect a PDF Online" description="Encrypt PDFs using DevDeck" steps={seo.howTo.steps} />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
