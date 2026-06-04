import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TOOLS } from '@/constants/tools';
import styles from './RelatedTools.module.css';

export function RelatedTools({ currentPath, category }: { currentPath: string, category: 'dev' | 'image' | 'pdf' }) {
  // Get tools in the same category, excluding the current one
  const related = TOOLS[category].filter(t => t.path !== currentPath).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className={styles.container}>
      <h3 className={styles.heading}>You May Also Like</h3>
      <div className={styles.grid}>
        {related.map(tool => (
          <Link key={tool.path} href={tool.path} className={styles.card}>
            <div className={styles.iconWrapper}>
              <tool.icon size={18} />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.title}>{tool.title}</div>
              <div className={styles.desc}>{tool.desc}</div>
            </div>
            <ArrowRight size={16} className={styles.arrow} />
          </Link>
        ))}
      </div>
    </section>
  );
}
