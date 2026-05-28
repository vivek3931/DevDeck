'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styles from './RegexTester.module.css';
import { Search, AlertCircle, FileText, List, BookOpen, Copy } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import { toast } from 'sonner';

const CHEAT_SHEET = [
  {
    name: 'Email Address',
    regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    flags: 'gm',
  },
  {
    name: 'URL (HTTP/HTTPS)',
    regex: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
    flags: 'g',
  },
  {
    name: 'IPv4 Address',
    regex: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
    flags: 'gm',
  },
  {
    name: 'Strong Password',
    regex: '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$',
    flags: 'g',
  },
  {
    name: 'HTML Tags',
    regex: '<\\/?(?:[a-z][a-z0-9]*)\\b[^>]*>',
    flags: 'gi',
  }
];

export default function RegexTesterClient() {
  const [pattern, setPattern] = useState('https?:\\\\/\\\\/(www\\\\.)?[-a-zA-Z0-9@:%._\\\\+~#=]{1,256}\\\\.[a-zA-Z0-9()]{1,6}\\\\b([-a-zA-Z0-9()@:%_\\\\+.~#?&//=]*)');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('Visit our site at https://devdeck.online or search on http://google.com for more info. Incorrect urls like htt://bad.com should not match.');
  
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);

  // Safely evaluate regex and generate matches
  useEffect(() => {
    try {
      setError(null);
      if (!pattern) {
        setMatches([]);
        return;
      }

      // Test compilation
      const regex = new RegExp(pattern, flags);
      
      const foundMatches: RegExpMatchArray[] = [];
      
      // If global flag is present, we can use matchAll
      if (flags.includes('g')) {
        const matchesIter = testString.matchAll(regex);
        for (const match of matchesIter) {
          foundMatches.push(match);
        }
      } else {
        const singleMatch = testString.match(regex);
        if (singleMatch) {
          foundMatches.push(singleMatch as RegExpMatchArray);
        }
      }
      
      setMatches(foundMatches);
    } catch (e: any) {
      setError(e.message);
      setMatches([]);
    }
  }, [pattern, flags, testString]);

  // Custom highlighter function that injects HTML spans for regex matches
  const highlightRegex = useCallback((code: string) => {
    if (!pattern || error) {
      // Escape HTML to prevent XSS when no regex is active
      return code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    try {
      const regex = new RegExp(pattern, flags);
      
      // If it's a global regex, we can replace all instances with a highlighted span
      if (flags.includes('g')) {
        // We use a complex replace loop because standard string.replace with HTML will mess up subsequent escapes
        let highlighted = '';
        let lastIndex = 0;
        
        const iter = code.matchAll(regex);
        for (const match of iter) {
          if (match.index === undefined) continue;
          
          // Add text before match (escaped)
          const before = code.substring(lastIndex, match.index);
          highlighted += before.replace(/</g, '&lt;').replace(/>/g, '&gt;');
          
          // Add highlighted match (escaped)
          const matchStr = match[0].replace(/</g, '&lt;').replace(/>/g, '&gt;');
          highlighted += `<mark class="regex-match">${matchStr}</mark>`;
          
          lastIndex = match.index + match[0].length;
          
          // Prevent infinite loops on zero-length matches (like ^ or $)
          if (match[0].length === 0) {
            lastIndex++; 
          }
        }
        
        // Add remaining text
        const after = code.substring(lastIndex);
        highlighted += after.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
        return highlighted;
      } else {
        // Non-global regex only matches once
        const match = code.match(regex);
        if (!match || match.index === undefined) {
          return code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        
        const before = code.substring(0, match.index);
        const matchStr = match[0];
        const after = code.substring(match.index + match[0].length);
        
        return `${before.replace(/</g, '&lt;').replace(/>/g, '&gt;')}<mark class="regex-match">${matchStr.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</mark>${after.replace(/</g, '&lt;').replace(/>/g, '&gt;')}`;
      }
    } catch (e) {
      return code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
  }, [pattern, flags, error]);

  const loadCheat = (cheat: { regex: string, flags: string }) => {
    setPattern(cheat.regex);
    setFlags(cheat.flags);
  };

  return (
    <div className={styles.container}>
      <div className={styles.pane}>
        
        <div className={styles.headerRow}>
          <div className={styles.inputGroup}>
            <span className={styles.prefix}>/</span>
            <input 
              type="text" 
              className={styles.regexInput}
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="^([a-z]+)$"
              spellCheck={false}
            />
            <span className={styles.prefix}>/</span>
            <input 
              type="text" 
              className={styles.flagsInput}
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="gmi"
              spellCheck={false}
            />
          </div>
        </div>

        {error && (
          <div className={styles.errorBox}>
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className={styles.mainArea}>
          {/* Center Column: Editor & Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            
            <div className={styles.editorPanel}>
              <div className={styles.editorHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={16} />
                  <span>Test String</span>
                </div>
                <span>{matches.length} matches</span>
              </div>
              <div className={styles.editorWrapper}>
                <Editor
                  value={testString}
                  onValueChange={setTestString}
                  highlight={highlightRegex}
                  padding={16}
                  className={styles.codeEditor}
                  style={{ backgroundColor: 'transparent' }}
                  textareaClassName="focus-visible-none"
                />
              </div>
            </div>

            <div className={styles.editorPanel}>
              <div className={styles.editorHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <List size={16} />
                  <span>Match Breakdown</span>
                </div>
              </div>
              <div className={styles.matchList}>
                {matches.length === 0 ? (
                  <p className="body-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>No matches found.</p>
                ) : (
                  matches.map((m, idx) => (
                    <div key={idx} className={styles.matchCard}>
                      <div className={styles.matchHeader}>
                        <span>Match {idx + 1}</span>
                        <span>Index: {m.index}</span>
                      </div>
                      <div className={styles.matchValue}>{m[0]}</div>
                      
                      {/* Capture Groups */}
                      {m.length > 1 && (
                        <div style={{ marginTop: '8px' }}>
                          {Array.from(m).slice(1).map((group, groupIdx) => (
                            <div key={groupIdx} className={styles.groupRow}>
                              <span className={styles.groupLabel}>Group {groupIdx + 1}</span>
                              <span className={styles.groupValue}>{group !== undefined ? group : <span style={{opacity: 0.5}}>null</span>}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Cheat Sheet */}
          <div className={styles.editorPanel}>
            <div className={styles.editorHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={16} />
                <span>Cheat Sheet</span>
              </div>
            </div>
            <div className={styles.cheatSheet}>
              {CHEAT_SHEET.map((cheat, idx) => (
                <div key={idx} className={styles.cheatCard} onClick={() => loadCheat(cheat)}>
                  <div className={styles.cheatTitle}>
                    {cheat.name}
                    <Copy size={12} style={{ opacity: 0.5 }} />
                  </div>
                  <code className={styles.cheatRegex}>/{cheat.regex}/{cheat.flags}</code>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
