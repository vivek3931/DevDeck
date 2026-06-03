import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers, Wrench } from 'lucide-react';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata = {
  title: 'Offline PDF Tools | Merge & Split | DevDeck',
  description: '100% offline, local PDF tools. Merge, split, and manipulate PDFs directly in your browser without uploading to a server.',
};

export default function PdfToolsComingSoonPage() {
  return (
    <article>
      <ColorBlock color="navy">
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', padding: '100px 20px' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px', opacity: 0.8 }}>
              <Layers size={64} />
            </div>
            <h1 className="display-xl" style={{ marginBottom: 'var(--spacing-sm)' }}>PDF Tools are Coming Soon!</h1>
            <p className="body-lg" style={{ color: 'var(--color-ink-muted)', maxWidth: '600px', margin: '0 auto' }}>
              We are currently building a blazing-fast, 100% offline suite of PDF tools. 
              Soon you will be able to merge, split, and edit PDFs directly in your browser without uploading your sensitive documents to any third-party server.
            </p>
          </header>
          <div style={{ display: 'flex', justifyContent: 'center', opacity: 0.5 }}>
             <Wrench size={48} className="spinner" />
          </div>
        </div>
      </ColorBlock>
    </article>
  );
}
