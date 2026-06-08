'use client';

import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import styles from './OfflineIndicator.module.css';

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false);
  const [showOnlineToast, setShowOnlineToast] = useState(false);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => {
      setIsOffline(false);
      setShowOnlineToast(true);
      setTimeout(() => setShowOnlineToast(false), 3000);
    };

    // Check initial state
    setIsOffline(!navigator.onLine);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isOffline && !showOnlineToast) return null;

  return (
    <div className={`${styles.indicator} ${isOffline ? styles.offline : styles.online}`}>
      {isOffline ? (
        <>
          <WifiOff size={16} />
          <span>You&apos;re offline — DevDeck works fully offline!</span>
        </>
      ) : (
        <>
          <Wifi size={16} />
          <span>Back online</span>
        </>
      )}
    </div>
  );
}
