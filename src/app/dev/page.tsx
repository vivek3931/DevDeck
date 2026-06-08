import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ColorBlock } from '@/components/ui/ColorBlock';
import { 
  ArrowLeft, ArrowRight,
  Braces, Code, Unlock, Terminal, Hash, FileType, 
  Camera, Database, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import styles from '../page.module.css';

export const metadata: Metadata = {
  title: 'Free Online Developer Tools | JSON, API, Regex, JWT & More | DevDeck',
  description: 'A complete suite of 13 free, privacy-focused developer tools. JSON Formatter, API Tester, JWT Decoder, Regex Tester, Hash Generator, cURL Converter, and more — all running 100% in your browser.',
  alternates: { canonical: '/dev' },
  openGraph: {
    title: 'Free Online Developer Tools | JSON, API, Regex, JWT | DevDeck',
    description: 'A complete suite of free, privacy-focused developer tools running 100% in your browser.',
  }
};

const tools = [
  { href: '/dev/json-formatter-validator', icon: <Braces />, title: 'JSON Formatter & Validator', desc: 'Instantly format, minify, and validate JSON payloads with precise syntax error locating.' },
  { href: '/dev/rest-api-client-tester', icon: <Code />, title: 'API Request Tester', desc: 'Lightweight Postman alternative. Test REST APIs with custom headers and JSON payloads.' },
  { href: '/dev/secure-jwt-decoder', icon: <Unlock />, title: 'JWT Decoder', desc: 'Decode JSON Web Tokens securely. Your tokens are never sent to a server.' },
  { href: '/dev/curl-to-code-converter', icon: <Terminal />, title: 'cURL to Fetch', desc: 'Paste a cURL command to instantly generate JavaScript fetch() syntax.' },
  { href: '/dev/jsonpath-expression-tester', icon: <Braces />, title: 'JSONPath Playground', desc: 'Evaluate JSONPath queries against massive API payloads. Pure client-side processing.' },
  { href: '/dev/regular-expression-tester', icon: <Braces />, title: 'Regex Visualizer', desc: 'Test Regular Expressions in real-time. Highlights matches and explains capture groups.' },
  { href: '/dev/md5-sha256-hash-generator', icon: <Hash />, title: 'Hash & Checksum Generator', desc: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly for strings and files.' },
  { href: '/dev/json-to-typescript-interface-converter', icon: <FileType />, title: 'JSON to TypeScript', desc: 'Instantly convert JSON payloads into perfectly formatted TypeScript interfaces.' },
  { href: '/dev/beautiful-code-snippet-image-generator', icon: <Camera />, title: 'Code Snippet Exporter', desc: 'Generate beautiful, high-res PNG images of your code snippets for presentations.' },
  { href: '/dev/client-side-sqlite-viewer', icon: <Database />, title: 'Local SQLite Explorer', desc: 'Run SQL queries on your SQLite databases entirely in the browser using WebAssembly.' },
  { href: '/dev/secure-code-snippet-bin', icon: <Code />, title: 'Quick Dump', desc: 'Securely dump raw code or API payloads to format and hold momentarily.' },
  { href: '/dev/local-log-file-analyzer', icon: <FileText />, title: 'Massive Log Analyzer', desc: 'Stream, search, and filter massive .log files securely in your browser.' },
];

export default function DevToolsPage() {
  return (
    <main>
      <ColorBlock color="lime">
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500, opacity: 0.6, marginBottom: '24px', textDecoration: 'none', color: 'inherit' }}>
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <h1 className="display-lg">All Developer Tools</h1>
        <p className="subhead" style={{ marginTop: 'var(--spacing-md)', maxWidth: '800px' }}>
          Every tool you need for everyday developer transformations. 100% secure, 100% private.
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
