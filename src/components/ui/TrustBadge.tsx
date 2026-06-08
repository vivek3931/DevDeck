'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Users, Zap } from 'lucide-react';
import styles from './TrustBadge.module.css';

export function TrustBadge() {
  return (
    <div className={styles.trustBadgeContainer}>
      <div className={styles.trustItem}>
        <ShieldCheck size={16} className={styles.trustIcon} />
        <span><strong>100% Client-Side</strong> — Your data never leaves your browser</span>
      </div>
      <div className={styles.trustItem}>
        <Zap size={16} className={styles.trustIcon} />
        <span><strong>Zero Server Logging</strong> — No tracking, no cookies</span>
      </div>
      <div className={styles.trustItem}>
        <Users size={16} className={styles.trustIcon} />
        <span><strong>Trusted by 10,000+ developers</strong></span>
      </div>
    </div>
  );
}
