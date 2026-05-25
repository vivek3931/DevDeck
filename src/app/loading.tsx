import React from 'react';
import { Loader2 } from 'lucide-react';

export default function GlobalLoading() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: 'calc(100vh - 200px)',
      gap: 'var(--spacing-md)',
      color: 'var(--color-ink)',
      opacity: 0.6
    }}>
      <Loader2 size={48} style={{ animation: 'spin 1s linear infinite' }} />
      <p className="eyebrow">Loading Workspace...</p>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
