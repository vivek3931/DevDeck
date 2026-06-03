import { Metadata } from 'next';
import { ColorBlock } from '@/components/ui/ColorBlock';
import JsonPathClient from './JsonPathClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'JSONPath Evaluator & Playground | DevDeck',
  description: 'Test, evaluate, and learn JSONPath queries locally in your browser. Perfect for backend developers analyzing massive JSON payloads.',
};

export default function JsonPathPage() {
  return (
    <article>
      <ColorBlock color="coral">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>JSONPath Playground</h1>
            <p className="body-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Evaluate JSONPath expressions instantly. Your data never leaves your browser.
            </p>
          </header>
          <main>
            <JsonPathClient />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
