'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { GlobalTray } from './GlobalTray';
import { Activity, Search, Code, Zap } from 'lucide-react';
import styles from './Header.module.css';

export function Header() {
  const [isTrayOpen, setIsTrayOpen] = useState(false);

  return (
    <>
      <header className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.left}>
            <Link href="/" className={styles.logo}>
              <img src="/logo.svg" alt="DevDeck Logo" className={styles.logoImg} />
            </Link>
            <nav className={styles.navLinks}>
              <Link href="/#dev-tools" className={styles.navLink}>Dev Tools</Link>
              <Link href="/#image-tools" className={styles.navLink}>Image Tools</Link>
              <Link href="/pdf" className={styles.navLink}>PDF Tools</Link>
            </nav>
          </div>
          <div className={styles.right}>
            <Button variant="secondary" className={`body-sm ${styles.headerBtn}`} onClick={() => setIsTrayOpen(true)} aria-label="Open Audit & Clipboard">
              <Activity size={14} /> <span className={styles.hideMobile}>Activity</span>
            </Button>
            <Button variant="secondary" className={`body-sm ${styles.headerBtn} ${styles.searchBtn}`} onClick={() => {
              window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
            }}>
              <Search size={14} className={styles.searchFaded} /> <span className={`${styles.hideMobile} ${styles.searchFaded}`}>Search (Ctrl+K)</span>
            </Button>
            <Link href="/dev/quick-dump" className={styles.headerBtn}>
              <Button variant="primary" className={`body-sm ${styles.quickDumpBtn}`}>
                <Zap size={14} /> <span>Quick Dump</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <div className={styles.marquee}>
        <span>Your Privacy-Focused Local Developer Toolkit</span>
      </div>
      <GlobalTray isOpen={isTrayOpen} onClose={() => setIsTrayOpen(false)} />
    </>
  );
}
