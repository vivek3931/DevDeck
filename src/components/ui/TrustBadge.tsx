import React from 'react';
import { ShieldCheck } from 'lucide-react';
import styles from './TrustBadge.module.css';

export function TrustBadge() {
  return (
    <div className={styles.trustBadgeContainer}>
      <ShieldCheck size={18} className={styles.trustIcon} />
      <div className={styles.trustText}>
        <strong>Secure & Client-Side:</strong> Your data never leaves your browser. Zero server logging.
      </div>
    </div>
  );
}
