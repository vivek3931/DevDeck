import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ColorBlock } from '@/components/ui/ColorBlock';
import { HeroOrb } from '@/components/ui/HeroOrb';
import { 
  Type, 
  QrCode, 
  Code, 
  Image as ImageIcon, 
  Unlock,
  Braces,
  Hash,
  Terminal,
  FileCode,
  FileType,
  Database
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
            href="/tools/json-path" 
            icon={<Braces />} 
            title="JSONPath Playground" 
            desc="Instantly evaluate JSONPath queries against massive API payloads. Pure client-side processing."
          />
          <ToolCard 
            href="/tools/regex-tester" 
            icon={<Braces />} 
            title="Regex Visualizer" 
            desc="Test Regular Expressions in real-time. Highlights matches and explains capture groups."
          />
          <ToolCard 
            href="/tools/log-analyzer" 
            icon={<Braces />} 
            title="Massive Log Analyzer" 
            desc="Stream, search, and filter massive .log files securely in your browser without freezing the tab."
          />
          <ToolCard 
            href="/tools/json-validator" 
            icon={<Braces />} 
            title="JSON Formatter & Validator" 
            desc="Instantly format, minify, and validate JSON payloads with precise syntax error locating."
          />
          <ToolCard 
            href="/tools/hash-generator" 
            icon={<Hash />} 
            title="Hash & Checksum Generator" 
            desc="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly for strings and files."
          />
          <ToolCard 
            href="/tools/json-to-ts" 
            icon={<FileType />} 
            title="JSON to TypeScript" 
            desc="Instantly convert JSON payloads into perfectly formatted TypeScript interfaces."
          />
          <ToolCard 
            href="/tools/curl-converter" 
            icon={<Terminal />} 
            title="cURL to Fetch" 
            desc="Paste a cURL command to generate JavaScript fetch() syntax."
          />
          <ToolCard 
            href="/tools/svg-to-react" 
            icon={<FileCode />} 
            title="SVG to React JSX" 
            desc="Convert raw SVG HTML into clean React functional components."
          />
          <ToolCard 
            href="/tools/text-toolkit" 
            icon={<Type />} 
            title="Text Toolkit" 
            desc="String manipulation, base64 encoding, JSON minification, and case conversions."
          />
          <ToolCard 
            href="/tools/jwt-decoder" 
            icon={<Unlock />} 
            title="JWT Decoder" 
            desc="Decode JSON Web Tokens locally. Your tokens are never sent to a server."
          />
          <ToolCard 
            href="/tools/qr-generator" 
            icon={<QrCode />} 
            title="QR Code Generator" 
            desc="Convert URLs or local text into downloadable vector QR codes."
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
            href="/tools/api-tester" 
            icon={<Code />} 
            title="API Request Tester" 
            desc="Lightweight Postman alternative. Test REST APIs with custom headers and JSON payloads locally."
            dark
          />
          <ToolCard 
            href="/tools/image-compressor" 
            icon={<ImageIcon />} 
            title="Image Compressor" 
            desc="Client-side canvas tool to compress JPEGs and scale aspects entirely offline."
            dark
          />
          <ToolCard 
            href="/tools/sqlite-explorer" 
            icon={<Database />} 
            title="Local SQLite Explorer" 
            desc="Run SQL queries on your SQLite databases entirely in the browser using WebAssembly. No server uploads."
            dark
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
      <div style={{ marginTop: 'auto', paddingTop: 'var(--spacing-md)' }}>
        <Button variant={dark ? "icon" : "icon-primary"} size="icon" className="body-sm" tabIndex={-1}>
          →
        </Button>
      </div>
    </Link>
  );
}
