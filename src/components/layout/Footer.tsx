'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

export function Footer() {
  const pathname = usePathname();
  const showFooter = pathname === '/' || pathname === '/privacy' || pathname === '/terms' || pathname === '/promise';

  if (!showFooter) return null;

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
          <p className="body-sm" style={{ marginTop: 'var(--spacing-md)', opacity: 0.6 }}>
            Privacy-Focused Local Developer Toolkit
          </p>
        </div>
        <div className={styles.links}>
          <div className={styles.column}>
            <span className="caption">Dev Tools</span>
            <Link href="/dev/json-formatter-validator">JSON Validator</Link>
            <Link href="/dev/rest-api-client-tester">API Tester</Link>
            <Link href="/dev/secure-jwt-decoder">JWT Decoder</Link>
            <Link href="/dev/regular-expression-tester">Regex Tester</Link>
            <Link href="/dev/md5-sha256-hash-generator">Hash Generator</Link>
            <Link href="/dev/json-to-typescript-interface-converter">JSON to TS</Link>
            <Link href="/dev/curl-to-code-converter">cURL to Fetch</Link>
            <Link href="/dev/beautiful-code-snippet-image-generator">Code Snap</Link>
            <Link href="/dev/client-side-sqlite-viewer">SQLite Explorer</Link>
          </div>
          <div className={styles.column}>
            <span className="caption">Image Tools</span>
            <Link href="/image/png-jpg-webp-image-converter">Format Converter</Link>
            <Link href="/image/free-image-resizer-tool">Image Resizer</Link>
            <Link href="/image/free-online-image-compressor">Image Compressor</Link>
            <Link href="/image/base64-image-encoder">Image to Base64</Link>
            <Link href="/image/svg-to-react-jsx-converter">SVG to React</Link>
            <Link href="/image/vector-qr-code-generator">QR Generator</Link>
          </div>
          <div className={styles.column}>
            <span className="caption">PDF Tools</span>
            <Link href="/pdf/merge-pdf-files-free">Merge PDFs</Link>
            <Link href="/pdf/split-extract-pdf-pages">Split PDF</Link>
            <Link href="/pdf/convert-image-to-pdf">Image to PDF</Link>
            <Link href="/pdf/password-protect-pdf-file">Protect PDF</Link>
          </div>
          <div className={styles.column}>
            <span className="caption">Other</span>
            <Link href="/text/text-toolkit">Text Toolkit</Link>
            <Link href="/dev/secure-code-snippet-bin">Quick Dump</Link>
            <Link href="/dev/local-log-file-analyzer">Log Analyzer</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/promise">Local First Promise</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
