'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { GlobalTray } from './GlobalTray';
import { Activity, Search, Zap, Menu, X, Code, Image as ImageIcon, FileText } from 'lucide-react';
import styles from './Header.module.css';

export function Header() {
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.left}>
            <Link href="/" className={styles.logo}>
              <img src="/logo.svg" alt="DevDeck Logo" className={styles.logoImg} />
            </Link>
            <nav className={styles.navLinks}>
              <Link href="/dev" className={styles.navLink}>
                <Code size={16} /> <span>Dev Tools</span>
              </Link>
              <Link href="/image" className={styles.navLink}>
                <ImageIcon size={16} /> <span>Image Tools</span>
              </Link>
              <Link href="/pdf" className={styles.navLink}>
                <FileText size={16} /> <span>PDF Tools</span>
              </Link>
            </nav>
          </div>
          <div className={styles.right}>
            <Button variant="secondary" className={styles.headerBtn} onClick={() => setIsTrayOpen(true)} aria-label="Open Activity">
              <Activity size={14} /> <span className={styles.hideMobile}>Activity</span>
            </Button>
            <Button variant="secondary" className={`${styles.headerBtn} ${styles.searchBtn}`} onClick={() => {
              window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
            }}>
              <Search size={14} className={styles.searchFaded} /> <span className={`${styles.hideMobile} ${styles.searchFaded}`}>Ctrl+K</span>
            </Button>
            <Link href="/dev/quick-dump" className={styles.hideMobile}>
              <Button variant="primary" className={styles.headerBtn}>
                <Zap size={14} /> <span>Quick Dump</span>
              </Button>
            </Link>
            <button className={styles.mobileMenuBtn} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/dev" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Developer Tools</Link>
          <Link href="/image" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Image Tools</Link>
          <Link href="/pdf" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>PDF Tools</Link>
          <Link href="/dev/quick-dump" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Quick Dump</Link>
        </div>
      )}

      <div className={styles.marquee}>
        <span>Your Privacy-Focused Local Developer Toolkit</span>
      </div>
      <GlobalTray isOpen={isTrayOpen} onClose={() => setIsTrayOpen(false)} />
    </>
  );
}
