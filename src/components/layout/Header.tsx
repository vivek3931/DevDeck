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
          </div>
          <div className={styles.right}>
            <Button variant="secondary" className={`body-sm ${styles.headerBtn}`} onClick={() => setIsTrayOpen(true)} aria-label="Open Audit & Clipboard">
              <Activity size={16} /> <span className={styles.hideMobile}>Activity</span>
            </Button>
            <Button variant="secondary" className={`body-sm ${styles.headerBtn}`} onClick={() => {
              window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
            }}>
              <Search size={16} /> <span className={styles.hideMobile}>Search (Ctrl+K)</span>
            </Button>
            <Link href="/tools/quick-dump" className={styles.headerBtn}>
              <Button variant="primary" className={`body-sm ${styles.quickDumpBtn}`}>
                <Zap size={16} /> <span>Quick Dump</span>
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
