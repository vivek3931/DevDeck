'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './CodeSnap.module.css';
import { Button } from '@/components/ui/Button';
import { Download, Loader2, Layout, SlidersHorizontal, Image as ImageIcon } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';

// Import Languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-graphql';

import { toast } from 'sonner';
import * as htmlToImage from 'html-to-image';

const THEMES = [
  { id: 'tomorrow', label: 'Tomorrow Night', file: 'prism-tomorrow.min.css' },
  { id: 'dracula', label: 'Dracula', file: 'prism-dracula.min.css' },
  { id: 'nord', label: 'Nord', file: 'prism-nord.min.css' },
  { id: 'one-dark', label: 'One Dark', file: 'prism-one-dark.min.css' },
  { id: 'synthwave84', label: 'Synthwave 84', file: 'prism-synthwave84.min.css' },
  { id: 'material-oceanic', label: 'Material Oceanic', file: 'prism-material-oceanic.min.css' },
  { id: 'night-owl', label: 'Night Owl', file: 'prism-night-owl.min.css' },
  { id: 'gruvbox-dark', label: 'Gruvbox Dark', file: 'prism-gruvbox-dark.min.css' },
  { id: 'okaidia', label: 'Okaidia', file: 'prism-okaidia.min.css' },
  { id: 'vsc-dark-plus', label: 'VS Code Dark', file: 'prism-vsc-dark-plus.min.css' },
  { id: 'vs', label: 'VS Light', file: 'prism-vs.min.css' },
  { id: 'ghcolors', label: 'GitHub Colors', file: 'prism-ghcolors.min.css' },
  { id: 'atom-dark', label: 'Atom Dark', file: 'prism-atom-dark.min.css' },
];

const BACKGROUNDS = [
  { id: 'grad1', value: 'linear-gradient(135deg, #FF6B6B 0%, #556270 100%)' },
  { id: 'grad2', value: 'linear-gradient(135deg, #12c2e9 0%, #c471ed 50%, #f64f59 100%)' },
  { id: 'grad3', value: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)' },
  { id: 'grad4', value: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)' },
  { id: 'solid1', value: '#1e1e1e' },
  { id: 'solid2', value: '#0d1252' },
  { id: 'solid3', value: '#115e59' },
  { id: 'solid4', value: '#7e22ce' },
  { id: 'transparent', value: 'transparent' },
];

const LANGUAGES = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'jsx', label: 'React (JSX)' },
  { id: 'tsx', label: 'React (TSX)' },
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'python', label: 'Python' },
  { id: 'go', label: 'Go' },
  { id: 'rust', label: 'Rust' },
  { id: 'c', label: 'C' },
  { id: 'cpp', label: 'C++' },
  { id: 'csharp', label: 'C#' },
  { id: 'java', label: 'Java' },
  { id: 'php', label: 'PHP' },
  { id: 'ruby', label: 'Ruby' },
  { id: 'swift', label: 'Swift' },
  { id: 'sql', label: 'SQL' },
  { id: 'bash', label: 'Bash' },
  { id: 'json', label: 'JSON' },
  { id: 'yaml', label: 'YAML' },
  { id: 'graphql', label: 'GraphQL' },
  { id: 'markdown', label: 'Markdown' },
];

export default function CodeSnapClient() {
  const [code, setCode] = useState(`function calculateFibonacci(n) {
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}

// Generate a beautiful snippet!
console.log(calculateFibonacci(10));`);
  
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState(THEMES[0].file);
  const [themeCss, setThemeCss] = useState('');
  
  const [background, setBackground] = useState(BACKGROUNDS[1].value);
  const [windowStyle, setWindowStyle] = useState<'mac'|'mac-glass'|'windows'|'none'>('mac');
  
  const [paddingX, setPaddingX] = useState(64);
  const [paddingY, setPaddingY] = useState(64);
  const [dropShadow, setDropShadow] = useState(true);
  const [autoWidth, setAutoWidth] = useState(true);
  
  const [activeTab, setActiveTab] = useState<'style'|'window'>('style');
  const [isExporting, setIsExporting] = useState(false);
  
  const exportRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => { setMounted(true); }, []);

  // Fetch Theme CSS locally
  useEffect(() => {
    fetch(`/prism-themes/${theme}`)
      .then(res => res.text())
      .then(css => {
        // Simple regex to ensure global styles like body{} don't bleed out of the editor if any exist
        // But prism themes are generally safe and scoped to .token and pre/code.
        setThemeCss(css);
      })
      .catch(err => console.error("Failed to load theme", err));
  }, [theme]);

  const handleDownload = async () => {
    if (!exportRef.current) return;
    
    setIsExporting(true);
    try {
      const dataUrl = await htmlToImage.toPng(exportRef.current, {
        quality: 1.0,
        pixelRatio: 3, 
        skipFonts: true, // Speeds up export significantly and prevents hanging
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
      {/* Dynamic Theme Injection */}
      <style dangerouslySetInnerHTML={{ __html: themeCss }} />

      {/* Controls Pane */}
      <div className={styles.controlsPane}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'style' ? styles.tabBtnActive : ''}`} 
            onClick={() => setActiveTab('style')}
          >
            <ImageIcon size={14} /> Style
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'window' ? styles.tabBtnActive : ''}`} 
            onClick={() => setActiveTab('window')}
          >
            <Layout size={14} /> Window
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'style' && (
            <>
              <div className={styles.controlGroup}>
                <span className={styles.controlLabel}>Theme</span>
                <select className={styles.select} value={theme} onChange={e => setTheme(e.target.value)}>
                  {THEMES.map(t => (
                    <option key={t.id} value={t.file}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div className={styles.controlGroup}>
                <span className={styles.controlLabel}>Language</span>
                <select className={styles.select} value={language} onChange={e => setLanguage(e.target.value)}>
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
                      style={{ background: bg.id === 'transparent' ? 'repeating-conic-gradient(#333 0% 25%, #222 0% 50%) 50% / 20px 20px' : bg.value }}
                      title={bg.id === 'transparent' ? 'Transparent' : 'Background Color'}
                      onClick={() => setBackground(bg.value)}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'window' && (
            <>
              <div className={styles.controlGroup}>
                <span className={styles.controlLabel}>Window Style</span>
                <select className={styles.select} value={windowStyle} onChange={e => setWindowStyle(e.target.value as any)}>
                  <option value="mac">Mac OS</option>
                  <option value="mac-glass">Mac OS (Glass)</option>
                  <option value="windows">Windows</option>
                  <option value="none">None</option>
                </select>
              </div>

              <div className={styles.controlGroup}>
                <span className={styles.controlLabel}>Padding (Vertical: {paddingY}px)</span>
                <input type="range" min="0" max="128" step="16" value={paddingY} onChange={e => setPaddingY(Number(e.target.value))} />
              </div>

              <div className={styles.controlGroup}>
                <span className={styles.controlLabel}>Padding (Horizontal: {paddingX}px)</span>
                <input type="range" min="0" max="128" step="16" value={paddingX} onChange={e => setPaddingX(Number(e.target.value))} />
              </div>

              <div className={styles.controlGroupRow}>
                <span className={styles.controlLabel}>Drop Shadow</span>
                <input type="checkbox" checked={dropShadow} onChange={e => setDropShadow(e.target.checked)} />
              </div>

              <div className={styles.controlGroupRow}>
                <span className={styles.controlLabel}>Auto-adjust Width</span>
                <input type="checkbox" checked={autoWidth} onChange={e => setAutoWidth(e.target.checked)} />
              </div>
            </>
          )}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 'var(--spacing-xl)' }}>
          <Button 
            variant="inverse" 
            onClick={handleDownload} 
            disabled={isExporting}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {isExporting ? <><Loader2 size={18} className="spinner" style={{ marginRight: '8px' }}/> Generating...</> : <><Download size={16} style={{ marginRight: '8px' }} /> Export PNG</>}
          </Button>
        </div>
      </div>

      {/* Editor & Preview Pane */}
      <div className={styles.editorPane}>
        <div 
          ref={exportRef}
          className={styles.captureArea}
          style={{ 
            background: background,
            padding: `${paddingY}px ${paddingX}px`,
            display: autoWidth ? 'inline-flex' : 'flex',
            width: autoWidth ? 'auto' : '100%',
            minWidth: autoWidth ? 'auto' : '100%'
          }}
        >
          <div 
            className={styles.windowFrame}
            style={{
              backgroundColor: windowStyle === 'mac-glass' ? 'rgba(255,255,255,0.05)' : (windowStyle === 'none' ? 'transparent' : 'rgba(13,17,23,0.95)'),
              backdropFilter: windowStyle === 'mac-glass' ? 'blur(20px)' : 'none',
              boxShadow: dropShadow ? (windowStyle === 'none' ? 'none' : '0 24px 64px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1) inset') : 'none',
              borderRadius: windowStyle === 'none' ? '0' : '12px',
              width: '100%'
            }}
          >
            {windowStyle === 'mac' || windowStyle === 'mac-glass' ? (
              <div className={styles.titleBar}>
                <div className={`${styles.dot} ${styles.dotRed}`} />
                <div className={`${styles.dot} ${styles.dotYellow}`} />
                <div className={`${styles.dot} ${styles.dotGreen}`} />
              </div>
            ) : windowStyle === 'windows' ? (
              <div className={styles.titleBarWin}>
                <span className={styles.winTitle}>Code Snippet</span>
                <div className={styles.winControls}>
                  <span>─</span>
                  <span>□</span>
                  <span>×</span>
                </div>
              </div>
            ) : (
              <div style={{ height: '16px' }} /> // spacer for none
            )}
            
            <div className={styles.codeArea}>
              <Editor
                value={code}
                onValueChange={setCode}
                highlight={c => Prism.highlight(c, Prism.languages[language] || Prism.languages.javascript, language)}
                padding={16}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 16,
                  backgroundColor: 'transparent',
                  outline: 'none',
                  minWidth: autoWidth ? 'min-content' : '100%',
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
