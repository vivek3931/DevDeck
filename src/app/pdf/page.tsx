import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ColorBlock } from '@/components/ui/ColorBlock';
import { 
  ArrowLeft, ArrowRight,
  Combine, Scissors, ImagePlus, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import styles from '../page.module.css';

export const metadata: Metadata = {
  title: 'Free in your Browser PDF Tools | Merge, Split, Protect | DevDeck',
  description: 'completely secure PDF tools. Merge, split, convert images to PDF, and encrypt documents directly in your browser without uploading to a server.',
  openGraph: {
    title: 'Free in your Browser PDF Tools | Merge, Split, Protect | DevDeck',
    description: 'completely secure PDF tools running directly in your browser.',
  }
};

const tools = [
  { href: '/pdf/merge', icon: <Combine />, title: 'Merge PDFs', desc: 'Combine multiple PDF files into one instantly. Drag and drop to reorder.' },
  { href: '/pdf/split', icon: <Scissors />, title: 'Split PDF', desc: 'Extract specific pages or page ranges from a PDF document.' },
  { href: '/pdf/image-to-pdf', icon: <ImagePlus />, title: 'Image to PDF', desc: 'Convert JPG, PNG, and WebP images into a single PDF document.' },
  { href: '/pdf/protect', icon: <Lock />, title: 'Protect PDF', desc: 'Encrypt and secure your PDF document with a password.' },
];

export default function PdfToolsPage() {
  return (
    <main>
      <ColorBlock color="cream">
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500, opacity: 0.6, marginBottom: '24px', textDecoration: 'none', color: 'inherit' }}>
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <h1 className="display-lg">Secure PDF Toolkit</h1>
        <p className="subhead" style={{ marginTop: 'var(--spacing-md)', maxWidth: '800px' }}>
          Manipulate your sensitive PDFs securely. All processing happens locally on your device.
        </p>

        <div className={styles.grid}>
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className={styles.card}>
              <div className={styles.cardIcon}>{tool.icon}</div>
              <h3 className={styles.cardTitle}>{tool.title}</h3>
              <p className={styles.cardDesc}>{tool.desc}</p>
              <div className={styles.cardArrow}>
                <Button variant="icon-primary" size="icon" className="body-sm" tabIndex={-1}>
                  <ArrowRight size={16} />
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </ColorBlock>
    </main>
  );
}
