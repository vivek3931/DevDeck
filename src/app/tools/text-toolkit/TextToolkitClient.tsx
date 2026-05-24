'use client';

import React, { useState } from 'react';
import { ColorBlock } from '@/components/ui/ColorBlock';
import { Button } from '@/components/ui/Button';
import { Copy, Trash2 } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import styles from './TextToolkit.module.css';

export default function TextToolkitClient() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const { addAuditLog, addToClipboardHistory } = useAppStore();

  const handleAction = (action: string) => {
    try {
      let result = inputText;
      switch (action) {
        case 'uppercase':
          result = inputText.toUpperCase();
          break;
        case 'lowercase':
          result = inputText.toLowerCase();
          break;
        case 'camelcase':
          result = inputText.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
          }).replace(/\s+/g, '');
          break;
        case 'snakecase':
          result = inputText.replace(/\W+/g, ' ')
            .split(/ |\B(?=[A-Z])/)
            .map(word => word.toLowerCase())
            .join('_');
          break;
        case 'base64-encode':
          result = btoa(inputText);
          break;
        case 'base64-decode':
          result = atob(inputText);
          break;
        case 'url-encode':
          result = encodeURIComponent(inputText);
          break;
        case 'url-decode':
          result = decodeURIComponent(inputText);
          break;
        case 'json-minify':
          result = JSON.stringify(JSON.parse(inputText));
          break;
        case 'json-format':
          result = JSON.stringify(JSON.parse(inputText), null, 2);
          break;
      }
      setOutputText(result);
      addAuditLog(`Text Toolkit: ${action}`, `Processed ${inputText.length} chars`);
    } catch (err) {
      setOutputText(`Error: ${(err as Error).message}`);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      addToClipboardHistory(outputText);
      addAuditLog('Copied Transformed Text', 'Copied text toolkit output to clipboard');
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <article style={{ marginTop: 'var(--spacing-section)' }}>
      <ColorBlock color="pink">
        <h1 className="display-lg">Text Toolkit</h1>
        <p className="subhead" style={{ marginTop: 'var(--spacing-sm)' }}>
          String manipulation, encoding, and minification. Done locally.
        </p>

        <div className={styles.toolContainer}>
          <div className={styles.editorPane}>
            <div className={styles.paneHeader}>
              <span className="eyebrow">Input</span>
              <Button variant="secondary" size="icon" onClick={() => { setInputText(''); setOutputText(''); }} aria-label="Clear">
                <Trash2 size={16} />
              </Button>
            </div>
            <textarea 
              className={styles.textarea}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text or JSON here..."
            />
          </div>

          <div className={styles.actionsPane}>
            <span className="eyebrow">Transform</span>
            <div className={styles.buttonGrid}>
              <Button variant="primary" className="body-sm" onClick={() => handleAction('uppercase')}>UPPERCASE</Button>
              <Button variant="primary" className="body-sm" onClick={() => handleAction('lowercase')}>lowercase</Button>
              <Button variant="primary" className="body-sm" onClick={() => handleAction('camelcase')}>camelCase</Button>
              <Button variant="primary" className="body-sm" onClick={() => handleAction('snakecase')}>snake_case</Button>
              <Button variant="primary" className="body-sm" onClick={() => handleAction('base64-encode')}>Base64 Encode</Button>
              <Button variant="primary" className="body-sm" onClick={() => handleAction('base64-decode')}>Base64 Decode</Button>
              <Button variant="primary" className="body-sm" onClick={() => handleAction('url-encode')}>URL Encode</Button>
              <Button variant="primary" className="body-sm" onClick={() => handleAction('url-decode')}>URL Decode</Button>
              <Button variant="primary" className="body-sm" onClick={() => handleAction('json-minify')}>Minify JSON</Button>
              <Button variant="primary" className="body-sm" onClick={() => handleAction('json-format')}>Format JSON</Button>
            </div>
          </div>

          <div className={styles.editorPane}>
            <div className={styles.paneHeader}>
              <span className="eyebrow">Output</span>
              <Button variant="secondary" size="icon" onClick={copyToClipboard} aria-label="Copy output">
                <Copy size={16} />
              </Button>
            </div>
            <textarea 
              className={styles.textarea}
              value={outputText}
              readOnly
              placeholder="Output will appear here..."
            />
          </div>
        </div>
      </ColorBlock>
    </article>
  );
}
