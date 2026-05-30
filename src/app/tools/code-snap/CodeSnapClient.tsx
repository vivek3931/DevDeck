'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './CodeSnap.module.css';
import { Button } from '@/components/ui/Button';
import { Download, Loader2 } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/themes/prism-tomorrow.css';
import { toast } from 'sonner';

// Optional: you can dynamically import html-to-image so it only loads on the client
import * as htmlToImage from 'html-to-image';

const BACKGROUNDS = [
  { id: 'grad1', value: 'linear-gradient(135deg, #FF6B6B 0%, #556270 100%)' },
  { id: 'grad2', value: 'linear-gradient(135deg, #12c2e9 0%, #c471ed 50%, #f64f59 100%)' },
  { id: 'grad3', value: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)' },
  { id: 'grad4', value: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)' },
  { id: 'solid1', value: '#1e1e1e' },
  { id: 'solid2', value: '#0d1252' },
  { id: 'solid3', value: '#115e59' },
  { id: 'solid4', value: '#7e22ce' },
];

const LANGUAGES = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'jsx', label: 'React (JSX)' },
  { id: 'tsx', label: 'React (TSX)' },
  { id: 'css', label: 'CSS' },
  { id: 'python', label: 'Python' },
  { id: 'go', label: 'Go' },
  { id: 'rust', label: 'Rust' },
];

export default function CodeSnapClient() {
  const [code, setCode] = useState(`function calculateFibonacci(n) {
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}

// Generate a beautiful snippet!
console.log(calculateFibonacci(10));`);
  
  const [language, setLanguage] = useState('javascript');
  const [background, setBackground] = useState(BACKGROUNDS[1].value);
  const [glassEffect, setGlassEffect] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  const exportRef = useRef<HTMLDivElement>(null);
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const handleDownload = async () => {
    if (!exportRef.current) return;
    
    setIsExporting(true);
    try {
      const dataUrl = await htmlToImage.toPng(exportRef.current, {
        quality: 1.0,
        pixelRatio: 3, // High-res export
      });
      
      const link = document.createElement('a');
      link.download = `codesnap-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success('Successfully exported beautiful snippet!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to export snippet. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className={styles.container}>
      {/* Controls Pane */}
      <div className={styles.controlsPane}>
        <h3 className="body-lg" style={{ fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
          Snippet Settings
        </h3>

        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>Language</span>
          <select 
            className={styles.select}
            value={language}
            onChange={e => setLanguage(e.target.value)}
          >
            {LANGUAGES.map(l => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>
        </div>

        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>Background</span>
          <div className={styles.colorGrid}>
            {BACKGROUNDS.map(bg => (
              <div 
                key={bg.id}
                className={`${styles.colorSwatch} ${background === bg.value ? styles.colorSwatchActive : ''}`}
                style={{ background: bg.value }}
                onClick={() => setBackground(bg.value)}
              />
            ))}
          </div>
        </div>

        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>Window Style</span>
          <select 
            className={styles.select}
            value={glassEffect ? 'glass' : 'solid'}
            onChange={e => setGlassEffect(e.target.value === 'glass')}
          >
            <option value="solid">Dark Solid (Mac OS)</option>
            <option value="glass">Frosted Glass</option>
          </select>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 'var(--spacing-xl)' }}>
          <Button 
            variant="inverse" 
            onClick={handleDownload} 
            disabled={isExporting}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {isExporting ? <><Loader2 size={18} className="spinner" style={{ marginRight: '8px' }}/> Generating...</> : <><Download size={16} style={{ marginRight: '8px' }} /> Export High-Res PNG</>}
          </Button>
        </div>
      </div>

      {/* Editor & Preview Pane */}
      <div className={styles.editorPane}>
        {/* The Capture Area */}
        <div 
          ref={exportRef}
          className={styles.captureArea}
          style={{ background }}
        >
          <div className={glassEffect ? styles.macWindowGlass : styles.macWindow}>
            <div className={styles.titleBar}>
              <div className={`${styles.dot} ${styles.dotRed}`} />
              <div className={`${styles.dot} ${styles.dotYellow}`} />
              <div className={`${styles.dot} ${styles.dotGreen}`} />
            </div>
            <div className={styles.codeArea}>
              <Editor
                value={code}
                onValueChange={setCode}
                highlight={code => Prism.highlight(code, Prism.languages[language] || Prism.languages.javascript, language)}
                padding={0}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 16,
                  backgroundColor: 'transparent',
                  outline: 'none',
                }}
                textareaClassName="editor-textarea"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
