import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers, Combine } from 'lucide-react';
import { ColorBlock } from '@/components/ui/ColorBlock';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'Offline PDF Tools | Merge & Split | DevDeck',
  description: '100% offline, local PDF tools. Merge, split, and manipulate PDFs directly in your browser without uploading to a server.',
};

export default function PdfToolsPage() {
  return (
    <article>
      <ColorBlock color="navy">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <Layers size={48} />
              <h1 className="display-xl">Offline PDF Toolkit</h1>
            </div>
            <p className="body-lg" style={{ color: 'var(--color-ink-muted)', maxWidth: '600px' }}>
              Manipulate your sensitive PDFs securely. All processing happens locally on your device.
            </p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            <ToolCard 
              href="/pdf/merge" 
              icon={<Combine size={32} />} 
              title="Merge PDFs" 
              desc="Combine multiple PDF files into one instantly. Drag and drop to reorder."
            />
            <ToolCard 
              href="/pdf/split" 
              icon={<Layers size={32} />} 
              title="Split PDF" 
              desc="Extract specific pages or page ranges from a PDF document."
            />
            <ToolCard 
              href="/pdf/image-to-pdf" 
              icon={<Layers size={32} />} 
              title="Image to PDF" 
              desc="Convert JPG, PNG, and WebP images into a single PDF document."
            />
            <ToolCard 
              href="/pdf/protect" 
              icon={<Layers size={32} />} 
              title="Protect PDF" 
              desc="Encrypt and secure your PDF document with a password."
            />
          </div>
        </div>
      </ColorBlock>
    </article>
  );
}

function ToolCard({ href, icon, title, desc }: { href: string, icon: React.ReactNode, title: string, desc: string }) {
  return (
    <Link href={href} style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '24px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'all 0.2s ease',
      height: '100%'
    }}>
      <div style={{ marginBottom: '16px', color: 'var(--color-primary)' }}>
        {icon}
      </div>
      <h3 className="body-lg" style={{ fontWeight: 600, marginBottom: '8px' }}>{title}</h3>
      <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>{desc}</p>
      <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
        <Button variant="secondary" size="sm">Open Tool →</Button>
      </div>
    </Link>
  );
}
