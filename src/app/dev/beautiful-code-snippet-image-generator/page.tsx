import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import CodeSnapClient from './CodeSnapClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

const seo = toolSeoData['beautiful-code-snippet-image-generator'];

export const metadata: Metadata = {
  title: 'Free Code Screenshot Tool | Beautiful Code Snippet Images | DevDeck',
  description: 'Create beautiful, high-resolution code snippet images for social media, presentations, and docs. Free Carbon alternative running 100% in your browser.',
  alternates: { canonical: '/dev/beautiful-code-snippet-image-generator' },
  openGraph: {
    title: 'Free Code Screenshot Tool | Code to Image | DevDeck',
    description: 'Create beautiful code snippet images. Free Carbon/Ray.so alternative.',
  }
};

export default function CodeSnapPage() {
  return (
    <article>
      <ColorBlock color="lime">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Dev Tools', href: '/dev' },
            { label: 'Code Snap' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Code Snippet Image Generator</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Generate beautiful, high-res PNG images of your code snippets for presentations and social media.
            </p>
          </header>
          <main>
            <CodeSnapClient />
            <ToolSeoContent whatIs={seo.whatIs} howTo={seo.howTo} faq={seo.faq} whyDevDeck={seo.whyDevDeck} />
            <RelatedTools currentPath="/dev/beautiful-code-snippet-image-generator" category="dev" />
            <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Dev Tools', path: '/dev' }, { name: 'Code Snap', path: '/dev/beautiful-code-snippet-image-generator' }]} />
            <SoftwareAppSchema name="Free Code Snippet Image Generator" description="Create beautiful code screenshots for presentations and social media." url="/dev/beautiful-code-snippet-image-generator" />
            <HowToSchema name="How to Create Beautiful Code Screenshots" description="Generate code images using DevDeck" steps={seo.howTo.steps} />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
