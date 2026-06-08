'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clock, ArrowRight } from 'lucide-react';
import { TOOLS } from '@/constants/tools';
import styles from './RecentTools.module.css';

const STORAGE_KEY = 'devdeck-recent-tools';
const MAX_RECENT = 5;

interface RecentTool {
  path: string;
  title: string;
  timestamp: number;
}

// Flat list of all tools for lookup
const allTools = [
  ...TOOLS.dev.map(t => ({ ...t, category: 'dev' as const })),
  ...TOOLS.image.map(t => ({ ...t, category: 'image' as const })),
  ...TOOLS.pdf.map(t => ({ ...t, category: 'pdf' as const })),
];

function getRecentTools(): RecentTool[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveToolVisit(path: string, title: string) {
  try {
    const recent = getRecentTools().filter(t => t.path !== path);
    recent.unshift({ path, title, timestamp: Date.now() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
  } catch {
    // localStorage might be full or unavailable
  }
}

/** Hook that tracks tool visits — place in tool pages or use globally */
export function useTrackToolVisit() {
  const pathname = usePathname();

  useEffect(() => {
    const tool = allTools.find(t => t.path === pathname);
    if (tool) {
      saveToolVisit(tool.path, tool.title);
    }
  }, [pathname]);
}

/** Component that displays recent tools on the homepage */
export function RecentTools() {
  const [recent, setRecent] = useState<RecentTool[]>([]);

  useEffect(() => {
    setRecent(getRecentTools());
  }, []);

  if (recent.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <Clock size={16} className={styles.icon} />
        <h2 className={styles.title}>Recently Used</h2>
      </div>
      <div className={styles.grid}>
        {recent.map(tool => {
          const toolInfo = allTools.find(t => t.path === tool.path);
          return (
            <Link key={tool.path} href={tool.path} className={styles.card}>
              {toolInfo && (
                <div className={styles.cardIcon}>
                  <toolInfo.icon size={18} />
                </div>
              )}
              <div className={styles.cardContent}>
                <span className={styles.cardTitle}>{tool.title}</span>
                {toolInfo && <span className={styles.cardDesc}>{toolInfo.desc}</span>}
              </div>
              <ArrowRight size={14} className={styles.arrow} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
