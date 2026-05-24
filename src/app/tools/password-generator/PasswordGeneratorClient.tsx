'use client';

import React, { useState, useEffect } from 'react';
import { ColorBlock } from '@/components/ui/ColorBlock';
import { Button } from '@/components/ui/Button';
import { Copy, RefreshCw } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import styles from './PasswordGenerator.module.css';

export default function PasswordGeneratorClient() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const { addAuditLog, addToClipboardHistory } = useAppStore();

  const generatePassword = () => {
    let charset = 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let newPassword = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      newPassword += charset[array[i] % charset.length];
    }
    setPassword(newPassword);
    addAuditLog('Generated Password', `Length: ${length}`);
  };

  useEffect(() => {
    generatePassword();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, includeUppercase, includeNumbers, includeSymbols]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      addToClipboardHistory(password);
      addAuditLog('Copied Password', 'Copied generated password to clipboard');
      // In a real app we'd trigger a toast here
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <article style={{ marginTop: 'var(--spacing-section)' }}>
      <ColorBlock color="cream">
        <h1 className="display-lg">Secure Password Generator</h1>
        <p className="subhead" style={{ marginTop: 'var(--spacing-sm)' }}>
          Cryptographically secure dev keys generated purely locally. No servers.
        </p>

        <div className={styles.toolCard}>
          <div className={styles.outputBox}>
            <span className="headline">{password}</span>
            <div className={styles.actions}>
              <Button variant="secondary" size="icon" onClick={copyToClipboard} aria-label="Copy password">
                <Copy size={20} />
              </Button>
              <Button variant="primary" size="icon" onClick={generatePassword} aria-label="Regenerate password">
                <RefreshCw size={20} />
              </Button>
            </div>
          </div>

          <div className={styles.controls}>
            <div className={styles.sliderGroup}>
              <label htmlFor="length-slider" className="body-sm">Length: <strong>{length}</strong></label>
              <input 
                id="length-slider"
                type="range" 
                min="8" max="64" 
                value={length} 
                onChange={(e) => setLength(parseInt(e.target.value))} 
                className={styles.slider}
              />
            </div>

            <div className={styles.optionsGrid}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />
                <span className="body-sm">Uppercase</span>
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
                <span className="body-sm">Numbers</span>
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
                <span className="body-sm">Symbols</span>
              </label>
            </div>
          </div>
        </div>
      </ColorBlock>
    </article>
  );
}
