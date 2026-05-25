import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ColorBlock } from '@/components/ui/ColorBlock';
import { HeroOrb } from '@/components/ui/HeroOrb';
import { 
  Terminal, 
  Key, 
  Type, 
  QrCode, 
  Ruler, 
  FileText, 
  Code, 
  StickyNote, 
  Image as ImageIcon, 
  Clock, 
  Calculator,
  Unlock
} from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section (White Canvas) */}
      <section className={styles.heroSection}>
        <HeroOrb />
        <div className="container">
          <div className={styles.hero}>
            <div className={styles.heroContent}>
              <h1 className="display-xl" style={{ color: '#000000' }}>Build faster, without leaving local.</h1>
              <p className="body-lg" style={{ color: 'rgba(0, 0, 0, 0.75)' }}>
                DevDeck is your private, all-in-one developer utility belt. 
                Convert, generate, and format directly in your browser. 
                No tracking. No server logs. Total focus.
              </p>
              <Link href="/tools/text-toolkit">
                <Button variant="primary">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Micro-Tools (Lime Block) */}
      <ColorBlock color="lime">
        <h2 className="display-lg">Developer Micro-Tools</h2>
        <p className="subhead" style={{ marginTop: 'var(--spacing-md)', maxWidth: '800px' }}>
          Stop opening 5 tabs for everyday transformations. 
          Everything you need is instantly accessible.
        </p>

        <div className={styles.grid}>
          <ToolCard 
            href="/tools/epoch-converter" 
            icon={<Clock />} 
            title="Epoch Converter" 
            desc="Instantly convert UNIX timestamps to human-readable UTC dates."
          />
          <ToolCard 
            href="/tools/password-generator" 
            icon={<Key />} 
            title="Password Generator" 
            desc="Generate cryptographically secure passwords locally on your machine."
          />
          <ToolCard 
            href="/tools/text-toolkit" 
            icon={<Type />} 
            title="Text Toolkit" 
            desc="String manipulation, base64 encoding, JSON minification, and case conversions."
          />
          <ToolCard 
            href="/tools/qr-generator" 
            icon={<QrCode />} 
            title="QR Code Generator" 
            desc="Convert URLs or local text into downloadable vector QR codes."
          />
          <ToolCard 
            href="/tools/unit-converter" 
            icon={<Ruler />} 
            title="Unit Converter" 
            desc="Instantly switch between metric units, distances, and data sizes (KB, GB)."
          />
          <ToolCard 
            href="/tools/lorem-ipsum" 
            icon={<FileText />} 
            title="Lorem Ipsum Generator" 
            desc="Generate mock placeholder text for rapid UI testing."
          />
          <ToolCard 
            href="/tools/jwt-decoder" 
            icon={<Unlock />} 
            title="JWT Decoder" 
            desc="Decode JSON Web Tokens locally. Your tokens are never sent to a server."
          />
        </div>
      </ColorBlock>

      {/* Sandbox & Media Tools (Navy Block) */}
      <ColorBlock color="navy">
        <h2 className="display-lg">Sandbox & Media</h2>
        <p className="subhead" style={{ marginTop: 'var(--spacing-md)', maxWidth: '800px' }}>
          Quickly dump payloads or compress assets locally.
        </p>

        <div className={styles.grid}>
          <ToolCard 
            href="/tools/quick-dump" 
            icon={<Code />} 
            title="Quick Dump" 
            desc="Securely dump raw code or API payloads to format and hold momentarily."
            dark
          />
          <ToolCard 
            href="/tools/scratchpad" 
            icon={<StickyNote />} 
            title="Daily Scratchpad" 
            desc="Persistent, color-coded sticky notes for your daily stand-up or quick commands."
            dark
          />
          <ToolCard 
            href="/tools/image-compressor" 
            icon={<ImageIcon />} 
            title="Image Compressor" 
            desc="Client-side canvas tool to compress JPEGs and scale aspects entirely offline."
            dark
          />
        </div>
      </ColorBlock>

      {/* Utilities (Coral Block) */}
      <ColorBlock color="coral">
        <h2 className="display-lg">Everyday Utilities</h2>
        
        <div className={styles.grid}>
          <ToolCard 
            href="/tools/pomodoro" 
            icon={<Clock />} 
            title="Focus Clock" 
            desc="Built-in interval concentration timer to structure your coding cycles."
          />
          <ToolCard 
            href="/tools/tip-calculator" 
            icon={<Calculator />} 
            title="Tip Calculator" 
            desc="Quick math for splitting bills during your lunch break."
          />
        </div>
      </ColorBlock>
    </main>
  );
}

function ToolCard({ href, icon, title, desc, dark = false }: { href: string, icon: React.ReactNode, title: string, desc: string, dark?: boolean }) {
  return (
    <Link href={href} className={`${styles.card} ${dark ? styles.cardDark : ''}`}>
      <div className={styles.cardIcon}>
        {icon}
      </div>
      <h3 className="card-title" style={{ marginBottom: 'var(--spacing-xs)' }}>{title}</h3>
      <p className="body-sm cardDesc">{desc}</p>
      <div style={{ marginTop: 'auto' }}>
        <Button variant="secondary" size="icon" className="body-sm" tabIndex={-1}>
          →
        </Button>
      </div>
    </Link>
  );
}
