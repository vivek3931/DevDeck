'use client';

import React from 'react';
import { Search } from 'lucide-react';
import styles from '@/app/page.module.css';

export function HeroSearch() {
  return (
    <button 
      onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
      className={styles.heroSearchBtn}
    >
      <Search size={20} style={{ opacity: 0.5 }} />
      <span style={{ flex: 1, textAlign: 'left', opacity: 0.8 }}>Search for tools...</span>
      <div className={styles.heroSearchShortcut}>Ctrl+K</div>
    </button>
  );
}
