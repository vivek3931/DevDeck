import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div style={{ height: '40px' }}>
            <svg viewBox="35 35 320 65" height="100%" fill="none">
              <g id="logo-mark">
                <path d="M 45 50 L 80 50 L 73 60 L 38 60 Z" fill="currentColor" />
                <path d="M 51 65 L 86 65 L 79 75 L 44 75 Z" fill="currentColor" opacity="0.90" />
                <path d="M 57 80 L 92 80 L 85 90 L 50 90 Z" fill="currentColor" opacity="0.80" />
              </g>
              <text x="120" y="88" fill="currentColor" style={{ fontFamily: 'var(--font-sans)', fontSize: '52px', fontWeight: 800, letterSpacing: '-2px', userSelect: 'none' }}>
                dev<tspan style={{ fontWeight: 300, letterSpacing: '-1px' }}>deck</tspan>
              </text>
            </svg>
          </div>
          <p className="body-sm" style={{ marginTop: 'var(--spacing-md)' }}>
            Privacy-Focused Local Developer Toolkit
          </p>
        </div>
        <div className={styles.links}>
          <div className={styles.column}>
            <span className="caption">Dev Tools</span>
            <Link href="/tools/log-analyzer" className="body-sm">Massive Log Analyzer</Link>
            <Link href="/tools/regex-tester" className="body-sm">Regex Visualizer</Link>
            <Link href="/tools/json-path" className="body-sm">JSONPath Playground</Link>
            <Link href="/tools/json-to-ts" className="body-sm">JSON to TS</Link>
            <Link href="/tools/json-validator" className="body-sm">JSON Validator</Link>
            <Link href="/tools/jwt-decoder" className="body-sm">JWT Decoder</Link>
            <Link href="/tools/hash-generator" className="body-sm">Hash Generator</Link>
            <Link href="/tools/curl-converter" className="body-sm">cURL to Fetch</Link>
            <Link href="/tools/svg-to-react" className="body-sm">SVG to React</Link>
            <Link href="/tools/sqlite-explorer" className="body-sm">SQLite Explorer</Link>
          </div>
          <div className={styles.column}>
            <span className="caption">Media & Sandbox</span>
            <Link href="/tools/api-tester" className="body-sm">API Request Tester</Link>
            <Link href="/tools/quick-dump" className="body-sm">Quick Dump</Link>
            <Link href="/tools/image-compressor" className="body-sm">Image Compressor</Link>
            <Link href="/tools/code-snap" className="body-sm">Code Snippet Exporter</Link>
          </div>
          <div className={styles.column}>
            <span className="caption">Utilities</span>
            <Link href="/tools/text-toolkit" className="body-sm">Text Toolkit</Link>
            <Link href="/tools/qr-generator" className="body-sm">QR Code Generator</Link>
          </div>
          <div className={styles.column}>
            <span className="caption">Legal</span>
            <Link href="/privacy" className="body-sm">Privacy Policy</Link>
            <Link href="/terms" className="body-sm">Terms of Service</Link>
            <Link href="/promise" className="body-sm">Local First Promise</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
