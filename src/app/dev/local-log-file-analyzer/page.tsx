import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/Schema';
import { RelatedTools } from '@/components/ui/RelatedTools';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { toolSeoData } from '@/constants/seoData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import LogAnalyzerClient from './LogAnalyzerClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

const seo = toolSeoData['local-log-file-analyzer'];

export const metadata: Metadata = {
  title: 'Free Online Log File Analyzer | Search, Filter & Parse Logs | DevDeck',
  description: 'Analyze large log files in your browser. Search, filter by level (ERROR, WARN, INFO), and parse logs securely. Free online log analyzer — no upload needed.',
  alternates: { canonical: '/dev/local-log-file-analyzer' },
  openGraph: {
    title: 'Free Online Log File Analyzer | DevDeck',
    description: 'Search, filter, and parse large log files securely in your browser.',
  }
};

export default function LogAnalyzerPage() {
  return (
    <article>
      <ColorBlock color="lime">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Dev Tools', href: '/dev' },
            { label: 'Log Analyzer' }
          ]} />
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Log File Analyzer</h1>
            <TrustBadge />
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Stream, search, and filter massive .log files securely in your browser.
            </p>
          </header>
          <main>
            <LogAnalyzerClient />
            <ToolSeoContent whatIs={seo.whatIs} howTo={seo.howTo} faq={seo.faq} whyDevDeck={seo.whyDevDeck} />
            <RelatedTools currentPath="/dev/local-log-file-analyzer" category="dev" />
            <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Dev Tools', path: '/dev' }, { name: 'Log Analyzer', path: '/dev/local-log-file-analyzer' }]} />
            <SoftwareAppSchema name="Free Online Log File Analyzer" description="Search, filter, and parse large log files in your browser." url="/dev/local-log-file-analyzer" />
            <HowToSchema name="How to Analyze Log Files Online" description="Analyze log files using DevDeck" steps={seo.howTo.steps} />
            <FaqSchema items={seo.faq} />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
