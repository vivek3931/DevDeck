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
  Database,
  Camera,
  Layers,
  FileText
} from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <HeroOrb />
        <div className="container">
          <div className={styles.hero}>
            <div className={styles.heroContent}>
              <h1 className="display-xl" style={{ color: '#000000' }}>The Ultimate Toolkit for Creators.</h1>
              <p className="body-lg" style={{ color: 'rgba(0, 0, 0, 0.75)' }}>
                DevDeck is your blazing fast utility belt. 
                Developer tools, image processors, and formatters directly in your browser. 
                Built for speed. Optimized for you.
              </p>
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                <Link href="#dev-tools">
                  <Button variant="primary">Explore Dev Tools</Button>
                </Link>
                <Link href="#image-tools">
                  <Button variant="secondary">Image Tools</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Tools */}
      <div id="dev-tools">
        <ColorBlock color="lime">
          <h2 className="display-lg">Developer Tools</h2>
          <p className="subhead" style={{ marginTop: 'var(--spacing-md)', maxWidth: '800px' }}>
            Stop opening 5 tabs for everyday transformations. 
            Everything you need is instantly accessible.
          </p>

          <div className={styles.grid}>
            <ToolCard 
              href="/dev/json-validator" 
              icon={<Braces />} 
              title="JSON Formatter & Validator" 
              desc="Instantly format, minify, and validate JSON payloads with precise syntax error locating."
            />
            <ToolCard 
              href="/dev/api-tester" 
              icon={<Code />} 
              title="API Request Tester" 
              desc="Lightweight Postman alternative. Test REST APIs with custom headers and JSON payloads locally."
            />
            <ToolCard 
              href="/dev/jwt-decoder" 
              icon={<Unlock />} 
              title="JWT Decoder" 
              desc="Decode JSON Web Tokens securely. Your tokens are never sent to a server."
            />
            <ToolCard 
              href="/dev/curl-converter" 
              icon={<Terminal />} 
              title="cURL to Fetch" 
              desc="Paste a cURL command to instantly generate JavaScript fetch() syntax."
            />
            <ToolCard 
              href="/dev/json-path" 
              icon={<Braces />} 
              title="JSONPath Playground" 
              desc="Evaluate JSONPath queries against massive API payloads. Pure client-side processing."
            />
            <ToolCard 
              href="/dev/regex-tester" 
              icon={<Braces />} 
              title="Regex Visualizer" 
              desc="Test Regular Expressions in real-time. Highlights matches and explains capture groups."
            />
            <ToolCard 
              href="/dev/hash-generator" 
              icon={<Hash />} 
              title="Hash & Checksum Generator" 
              desc="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly for strings and files."
            />
            <ToolCard 
              href="/dev/json-to-ts" 
              icon={<FileType />} 
              title="JSON to TypeScript" 
              desc="Instantly convert JSON payloads into perfectly formatted TypeScript interfaces."
            />
            <ToolCard 
              href="/dev/code-snap" 
              icon={<Camera />} 
              title="Code Snippet Exporter" 
              desc="Generate beautiful, high-res PNG images of your code snippets for Twitter and presentations."
            />
            <ToolCard 
              href="/dev/sqlite-explorer" 
              icon={<Database />} 
              title="Local SQLite Explorer" 
              desc="Run SQL queries on your SQLite databases entirely in the browser using WebAssembly."
            />
            <ToolCard 
              href="/dev/quick-dump" 
              icon={<Code />} 
              title="Quick Dump" 
              desc="Securely dump raw code or API payloads to format and hold momentarily."
            />
            <ToolCard 
              href="/dev/log-analyzer" 
              icon={<FileText />} 
              title="Massive Log Analyzer" 
              desc="Stream, search, and filter massive .log files securely in your browser."
            />
          </div>
        </ColorBlock>
      </div>

      {/* Image & SVG Tools */}
      <div id="image-tools">
        <ColorBlock color="navy">
          <h2 className="display-lg">Image & Vector Tools</h2>
          <p className="subhead" style={{ marginTop: 'var(--spacing-md)', maxWidth: '800px' }}>
            Process images and SVGs blazingly fast in your browser.
          </p>

          <div className={styles.grid}>
            <ToolCard 
              href="/image/converter" 
              icon={<ImageIcon />} 
              title="Image Format Converter" 
              desc="Instantly convert images between WebP, PNG, and JPEG formats in your browser."
              dark
            />
            <ToolCard 
              href="/image/resizer" 
              icon={<ImageIcon />} 
              title="Image Resizer" 
              desc="Resize any image by dimensions or percentage offline."
              dark
            />
            <ToolCard 
              href="/image/base64" 
              icon={<ImageIcon />} 
              title="Image to Base64" 
              desc="Encode images into Base64 strings for direct CSS/HTML embedding."
              dark
            />
            <ToolCard 
              href="/image/image-compressor" 
              icon={<ImageIcon />} 
              title="Image Compressor" 
              desc="Client-side canvas tool to compress JPEGs, scale aspects, and reduce file sizes."
              dark
            />
            <ToolCard 
              href="/image/svg-to-react" 
              icon={<FileCode />} 
              title="SVG to React JSX" 
              desc="Convert raw SVG HTML into clean React functional components perfectly formatted."
              dark
            />
            <ToolCard 
              href="/image/qr-generator" 
              icon={<QrCode />} 
              title="QR Code Generator" 
              desc="Convert URLs or text into downloadable, highly-customizable vector QR codes."
              dark
            />
          </div>
        </ColorBlock>
      </div>

      {/* Text & PDF Tools */}
      <div id="text-tools">
        <ColorBlock color="lime">
          <h2 className="display-lg">Text & Document Tools</h2>
          <p className="subhead" style={{ marginTop: 'var(--spacing-md)', maxWidth: '800px' }}>
            Transform text and manage documents effortlessly.
          </p>

          <div className={styles.grid}>
            <ToolCard 
              href="/text/text-toolkit" 
              icon={<Type />} 
              title="Text Toolkit" 
              desc="String manipulation, base64 encoding, JSON minification, and case conversions."
            />
            <ToolCard 
              href="/pdf" 
              icon={<Layers />} 
              title="PDF Toolkit (Coming Soon)" 
              desc="Merge, split, and manipulate PDF documents entirely offline."
            />
          </div>
        </ColorBlock>
      </div>

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
