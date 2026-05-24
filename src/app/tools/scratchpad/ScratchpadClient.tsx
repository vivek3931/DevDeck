'use client';

import React, { useState, useEffect } from 'react';
import { ColorBlock } from '@/components/ui/ColorBlock';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2 } from 'lucide-react';
import styles from './Scratchpad.module.css';

interface Note {
  id: string;
  content: string;
  color: 'lime' | 'lilac' | 'cream' | 'mint' | 'pink';
  timestamp: number;
}

const COLORS: Note['color'][] = ['lime', 'lilac', 'cream', 'mint', 'pink'];

export default function ScratchpadClient() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('devdeck_scratchpad');
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse notes', e);
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('devdeck_scratchpad', JSON.stringify(notes));
    }
  }, [notes, loaded]);

  const addNote = () => {
    const newNote: Note = {
      id: Math.random().toString(36).substring(2, 9),
      content: '',
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      timestamp: Date.now()
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (id: string, content: string) => {
    setNotes(notes.map(n => n.id === id ? { ...n, content } : n));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  if (!loaded) return null;

  return (
    <article style={{ marginTop: 'var(--spacing-section)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--spacing-xl)' }}>
        <div>
          <h1 className="display-lg">Daily Scratchpad</h1>
          <p className="subhead" style={{ marginTop: 'var(--spacing-sm)' }}>
            Persistent, color-coded sticky notes.
          </p>
        </div>
        <Button variant="primary" onClick={addNote}>
          <Plus size={20} style={{ marginRight: '8px' }} />
          New Note
        </Button>
      </div>

      <div className={styles.grid}>
        {notes.map(note => (
          <div key={note.id} className={`${styles.note} ${styles[note.color]}`}>
            <div className={styles.noteHeader}>
              <span className="caption">{new Date(note.timestamp).toLocaleDateString()}</span>
              <button className={styles.deleteBtn} onClick={() => deleteNote(note.id)}>
                <Trash2 size={16} />
              </button>
            </div>
            <textarea 
              className={styles.textarea}
              value={note.content}
              onChange={(e) => updateNote(note.id, e.target.value)}
              placeholder="Jot something down..."
            />
          </div>
        ))}
        {notes.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 'var(--spacing-section) 0', color: 'var(--color-ink)', opacity: 0.5 }}>
            <p className="body-lg">No notes yet. Create one to get started.</p>
          </div>
        )}
      </div>
    </article>
  );
}
