import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuditLogEntry {
  id: string;
  action: string;
  details: string;
  timestamp: number;
}

export interface ClipboardEntry {
  id: string;
  content: string;
  timestamp: number;
}

interface AppState {
  auditLog: AuditLogEntry[];
  clipboardHistory: ClipboardEntry[];
  
  addAuditLog: (action: string, details: string) => void;
  clearAuditLog: () => void;
  
  addToClipboardHistory: (content: string) => void;
  clearClipboardHistory: () => void;
  removeFromClipboardHistory: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      auditLog: [],
      clipboardHistory: [],

      addAuditLog: (action, details) => set((state) => ({
        auditLog: [
          {
            id: Math.random().toString(36).substring(2, 9),
            action,
            details,
            timestamp: Date.now(),
          },
          ...state.auditLog,
        ].slice(0, 100), // keep last 100
      })),

      clearAuditLog: () => set({ auditLog: [] }),

      addToClipboardHistory: (content) => set((state) => {
        // avoid duplicates at the top
        if (state.clipboardHistory.length > 0 && state.clipboardHistory[0].content === content) {
          return state;
        }
        return {
          clipboardHistory: [
            {
              id: Math.random().toString(36).substring(2, 9),
              content,
              timestamp: Date.now(),
            },
            ...state.clipboardHistory,
          ].slice(0, 50), // keep last 50
        };
      }),

      clearClipboardHistory: () => set({ clipboardHistory: [] }),

      removeFromClipboardHistory: (id) => set((state) => ({
        clipboardHistory: state.clipboardHistory.filter(item => item.id !== id)
      })),
    }),
    {
      name: 'devdeck-storage',
    }
  )
);
