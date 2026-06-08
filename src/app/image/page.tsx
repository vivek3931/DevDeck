import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ColorBlock } from '@/components/ui/ColorBlock';
import { 
  ArrowLeft, ArrowRight,
  Image as ImageIcon, Maximize, Binary, FileCode, QrCode
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import styles from '../page.module.css';

export const metadata: Metadata = {
  title: 'Free Online Image Tools | Converter, Resizer, Compressor | DevDeck',
  description: 'Convert, resize, compress, and encode images securely in your browser. WebP, PNG, JPEG format conversion, Base64 encoding, SVG to React, QR codes and more.',
  alternates: { canonical: '/image' },
  openGraph: {
    title: 'Free Online Image Tools | Converter, Resizer, Compressor | DevDeck',
    description: 'Convert, resize, compress, and encode images securely in your browser.',
  }
};

const tools = [
  { href: '/image/png-jpg-webp-image-converter', icon: <ImageIcon />, title: 'Image Format Converter', desc: 'Instantly convert images between WebP, PNG, and JPEG formats.' },
  { href: '/image/free-image-resizer-tool', icon: <Maximize />, title: 'Image Resizer', desc: 'Resize any image by dimensions or percentage locally.' },
  { href: '/image/free-online-image-compressor', icon: <ImageIcon />, title: 'Image Compressor', desc: 'Client-side tool to compress JPEGs, scale aspects, and reduce file sizes.' },
  { href: '/image/base64-image-encoder', icon: <Binary />, title: 'Image to Base64', desc: 'Encode images into Base64 strings for direct CSS/HTML embedding.' },
  { href: '/image/svg-to-react-jsx-converter', icon: <FileCode />, title: 'SVG to React JSX', desc: 'Convert raw SVG HTML into clean React functional components.' },
  { href: '/image/vector-qr-code-generator', icon: <QrCode />, title: 'QR Code Generator', desc: 'Convert URLs or text into downloadable, customizable vector QR codes.' },
];

export default function ImageToolsPage() {
  return (
    <main>
      <ColorBlock color="navy">
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500, opacity: 0.6, marginBottom: '24px', textDecoration: 'none', color: 'inherit' }}>
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <h1 className="display-lg">All Image & Vector Tools</h1>
        <p className="subhead" style={{ marginTop: 'var(--spacing-md)', maxWidth: '800px' }}>
          Process images and SVGs blazingly fast — all running locally in your browser.
        </p>

        <div className={styles.grid}>
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className={`${styles.card} ${styles.cardDark}`}>
              <div className={styles.cardIcon}>{tool.icon}</div>
              <h3 className={styles.cardTitle}>{tool.title}</h3>
              <p className={styles.cardDesc}>{tool.desc}</p>
              <div className={styles.cardArrow}>
                <Button variant="icon" size="icon" className="body-sm" tabIndex={-1}>
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
