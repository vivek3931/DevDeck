import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import TextToolkitClient from './TextToolkitClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata: Metadata = {
  title: 'Online Text Toolkit | Base64, JSON Formatter & String Converter | DevDeck',
  description: 'Free online developer tools for string manipulation. Encode/decode Base64, minify JSON, and convert text cases instantly.',
  openGraph: {
    title: 'Online Text Toolkit | Base64, JSON Formatter & String Converter | DevDeck',
    description: 'Free online developer tools for string manipulation. Encode/decode Base64, minify JSON, and convert text cases instantly.',
  }
};

export default function TextToolkitPage() {
  return (
    <article>
      <ColorBlock color="pink">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Text Toolkit</h1>
            <p className="body-lg" style={{ color: 'var(--color-ink-muted)' }}>
              String manipulation, encoding, and minification. Done locally.
            </p>
          </header>
          <main>
            <TextToolkitClient />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
