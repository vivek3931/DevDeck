'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '../ui/Button';
import { X, ClipboardList, Activity, Trash2, Copy } from 'lucide-react';
import { toast } from 'sonner';
import styles from './GlobalTray.module.css';

export function GlobalTray({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'clipboard' | 'audit'>('clipboard');
  const { 
    auditLog, 
    clipboardHistory, 
    clearAuditLog, 
    clearClipboardHistory, 
    removeFromClipboardHistory 
  } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied from history!');
    } catch (e) {
      console.error(e);
      toast.error('Failed to copy');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <aside className={styles.tray}>
        <div className={styles.header}>
          <div className={styles.tabs}>
            <button 
              className={activeTab === 'clipboard' ? styles.tabActive : styles.tab}
              onClick={() => setActiveTab('clipboard')}
            >
              <ClipboardList size={16} /> Clipboard
            </button>
            <button 
              className={activeTab === 'audit' ? styles.tabActive : styles.tab}
              onClick={() => setActiveTab('audit')}
            >
              <Activity size={16} /> Audit Log
            </button>
          </div>
          <Button variant="icon" size="icon" onClick={onClose}>
            <X size={20} color="var(--color-ink)" />
          </Button>
        </div>

        <div className={styles.content}>
          {!mounted ? null : activeTab === 'clipboard' ? (
            <div className={styles.list}>
              <div className={styles.listHeader}>
                <span className="eyebrow">History</span>
                {clipboardHistory.length > 0 && (
                  <button className={styles.textBtn} onClick={clearClipboardHistory}>Clear All</button>
                )}
              </div>
              {clipboardHistory.length === 0 ? (
                <p className={styles.empty}>No items in clipboard history.</p>
              ) : (
                clipboardHistory.map(item => (
                  <div key={item.id} className={styles.card}>
                    <div className={styles.cardContent}>{item.content}</div>
                    <div className={styles.cardActions}>
                      <span className="caption">{new Date(item.timestamp).toLocaleTimeString()}</span>
                      <div>
                        <button className={styles.iconBtn} onClick={() => copyToClipboard(item.content)}>
                          <Copy size={14} />
                        </button>
                        <button className={styles.iconBtn} onClick={() => removeFromClipboardHistory(item.id)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className={styles.list}>
               <div className={styles.listHeader}>
                <span className="eyebrow">Session Activity</span>
                {auditLog.length > 0 && (
                  <button className={styles.textBtn} onClick={clearAuditLog}>Clear All</button>
                )}
              </div>
              {auditLog.length === 0 ? (
                <p className={styles.empty}>No activity recorded yet.</p>
              ) : (
                auditLog.map(item => (
                  <div key={item.id} className={styles.card}>
                    <div>
                      <strong className="body-sm">{item.action}</strong>
                      <p className="caption" style={{ marginTop: '4px' }}>{item.details}</p>
                    </div>
                    <span className="caption" style={{ whiteSpace: 'nowrap', marginLeft: '8px' }}>
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
