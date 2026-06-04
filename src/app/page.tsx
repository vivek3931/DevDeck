import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ColorBlock } from '@/components/ui/ColorBlock';
import { HeroOrb } from '@/components/ui/HeroOrb';
import { HeroSearch } from '@/components/ui/HeroSearch';
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
  FileText,
  Combine,
  Scissors,
  Lock,
  Maximize,
  Binary,
  ArrowRight,
  ImagePlus,
  AlignLeft,
  Search,
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
              <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
                <HeroSearch />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Tools */}
      <div id="dev-tools">
        <ColorBlock color="lime">
          <div className={styles.sectionHeader}>
            <h2 className="display-lg">Developer Tools</h2>
          </div>
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
              href="/dev/lorem-ipsum" 
              icon={<AlignLeft />} 
              title="Lorem Ipsum Generator" 
              desc="Generate reliable placeholder text (paragraphs, sentences, words) instantly."
            />
          </div>

          <div className={styles.viewAllBottom}>
            <Link href="/dev">
              <Button variant="primary">View All 13 Dev Tools →</Button>
            </Link>
          </div>
        </ColorBlock>
      </div>

      {/* Image & SVG Tools */}
      <div id="image-tools">
        <ColorBlock color="navy">
          <div className={styles.sectionHeader}>
            <h2 className="display-lg">Image & Vector Tools</h2>
          </div>
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
              icon={<Maximize />} 
              title="Image Resizer" 
              desc="Resize any image by dimensions or percentage locally."
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
              href="/image/base64" 
              icon={<Binary />} 
              title="Image to Base64" 
              desc="Encode images into Base64 strings for direct CSS/HTML embedding."
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

          <div className={styles.viewAllBottom}>
            <Link href="/image">
              <Button variant="inverse">View All 6 Image Tools →</Button>
            </Link>
          </div>
        </ColorBlock>
      </div>

      {/* PDF Tools */}
      <div id="pdf-tools">
        <ColorBlock color="cream">
          <div className={styles.sectionHeader}>
            <h2 className="display-lg">PDF Tools</h2>
          </div>
          <p className="subhead" style={{ marginTop: 'var(--spacing-md)', maxWidth: '800px' }}>
            Merge, split, and manipulate PDF documents 100% secure.
          </p>

          <div className={styles.grid}>
            <ToolCard 
              href="/pdf/merge" 
              icon={<Combine />} 
              title="Merge PDFs" 
              desc="Combine multiple PDF files into one instantly. Drag and drop to reorder."
            />
            <ToolCard 
              href="/pdf/split" 
              icon={<Scissors />} 
              title="Split PDF" 
              desc="Extract specific pages or page ranges from a PDF document."
            />
            <ToolCard 
              href="/pdf/image-to-pdf" 
              icon={<ImagePlus />} 
              title="Image to PDF" 
              desc="Convert JPG, PNG, and WebP images into a single PDF document."
            />
            <ToolCard 
              href="/pdf/protect" 
              icon={<Lock />} 
              title="Protect PDF" 
              desc="Encrypt and secure your PDF document with a password."
            />
          </div>

          <div className={styles.viewAllBottom}>
            <Link href="/pdf">
              <Button variant="primary">View All PDF Tools →</Button>
            </Link>
          </div>
        </ColorBlock>
      </div>

      {/* Text & Document Tools */}
      <div id="text-tools">
        <ColorBlock color="mint">
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
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{desc}</p>
      <div className={styles.cardArrow}>
        <Button variant={dark ? "icon" : "icon-primary"} size="icon" className="body-sm" tabIndex={-1}>
          <ArrowRight size={16} />
        </Button>
      </div>
    </Link>
  );
}
