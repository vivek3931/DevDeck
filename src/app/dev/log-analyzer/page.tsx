import { Metadata } from 'next';
import { ColorBlock } from '@/components/ui/ColorBlock';
import LogAnalyzerClient from './LogAnalyzerClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Massive Log Analyzer | DevDeck',
  description: 'Process and filter massive .log files securely in your browser without crashing or uploading data to a server.',
};

export default function LogAnalyzerPage() {
  return (
    <article>
      <ColorBlock color="lilac">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <h1 className="display-xl" style={{ marginBottom: 'var(--spacing-sm)' }}>Massive Log Analyzer</h1>
            <p className="body-lg" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Stream, parse, and filter massive log files locally. The browser memory takes the hit, the DOM stays fast.
            </p>
          </header>
          <main>
            <LogAnalyzerClient />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
