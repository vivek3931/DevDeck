'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { GlobalTray } from './GlobalTray';
import { Activity, Search, Zap, Menu, X, Code, Image as ImageIcon, FileText } from 'lucide-react';
import styles from './Header.module.css';

import { TOOLS } from '@/constants/tools';

export function Header() {
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'dev' | 'image' | 'pdf' | null>(null);

  let hoverTimeout: NodeJS.Timeout;

  const handleMouseEnter = (menu: 'dev' | 'image' | 'pdf') => {
    clearTimeout(hoverTimeout);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  return (
    <>
      <header className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.left}>
            <Link href="/" className={styles.logo}>
              <img src="/logo.svg" alt="DevDeck Logo" className={styles.logoImg} />
            </Link>
            <nav className={styles.navLinks} onMouseLeave={handleMouseLeave}>
              <div onMouseEnter={() => handleMouseEnter('dev')}>
                <Link href="/dev" className={`${styles.navLink} ${activeMenu === 'dev' ? styles.navLinkActive : ''}`}>
                  <Code size={16} /> <span>Dev Tools</span>
                </Link>
              </div>
              <div onMouseEnter={() => handleMouseEnter('image')}>
                <Link href="/image" className={`${styles.navLink} ${activeMenu === 'image' ? styles.navLinkActive : ''}`}>
                  <ImageIcon size={16} /> <span>Image Tools</span>
                </Link>
              </div>
              <div onMouseEnter={() => handleMouseEnter('pdf')}>
                <Link href="/pdf" className={`${styles.navLink} ${activeMenu === 'pdf' ? styles.navLinkActive : ''}`}>
                  <FileText size={16} /> <span>PDF Tools</span>
                </Link>
              </div>
            </nav>
          </div>
          <div className={styles.right}>
            <Button variant="secondary" className={styles.headerBtn} onClick={() => setIsTrayOpen(true)} aria-label="Open Activity">
              <Activity size={14} /> <span className={styles.hideMobile}>Activity</span>
            </Button>

            <Link href="/dev/quick-dump">
              <Button variant="primary" className={styles.headerBtn}>
                <Zap size={14} /> <span className={styles.hideMobile}>Quick Dump</span>
              </Button>
            </Link>
            <button className={styles.mobileMenuBtn} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {/* Mega Menu Dropdown */}
        {activeMenu && (
          <div 
            className={styles.megaMenuWrapper} 
            onMouseEnter={() => handleMouseEnter(activeMenu)} 
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.megaMenuContainer}>
              <div className={styles.megaMenuGrid}>
                {TOOLS[activeMenu].map((tool, idx) => (
                  <Link href={tool.path} key={idx} className={styles.megaMenuItem} onClick={() => setActiveMenu(null)}>
                    <div className={styles.megaMenuIconWrapper}>
                      <tool.icon size={18} />
                    </div>
                    <div>
                      <div className={styles.megaMenuTitle}>{tool.title}</div>
                      <div className={styles.megaMenuDesc}>{tool.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
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
