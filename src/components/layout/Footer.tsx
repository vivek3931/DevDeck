import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className="display-lg">DevDeck</span>
          <p className="body-sm" style={{ marginTop: 'var(--spacing-md)' }}>
            Privacy-Focused Local Developer Toolkit
          </p>
        </div>
        <div className={styles.links}>
          <div className={styles.column}>
            <span className="caption">Tools</span>
            <Link href="/tools/text-toolkit" className="body-sm">Text Toolkit</Link>
            <Link href="/tools/epoch-converter" className="body-sm">Epoch Converter</Link>
            <Link href="/tools/password-generator" className="body-sm">Password Generator</Link>
            <Link href="/tools/qr-generator" className="body-sm">QR Code Generator</Link>
          </div>
          <div className={styles.column}>
            <span className="caption">Sandbox</span>
            <Link href="/tools/quick-dump" className="body-sm">Quick Dump</Link>
            <Link href="/tools/scratchpad" className="body-sm">Scratchpad</Link>
            <Link href="/tools/image-compressor" className="body-sm">Image Compressor</Link>
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
