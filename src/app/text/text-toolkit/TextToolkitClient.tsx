'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Copy, Trash2 } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { toast } from 'sonner';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism.css'; // Light theme for pink background
import styles from './TextToolkit.module.css';

export default function TextToolkitClient() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedAction, setSelectedAction] = useState('uppercase');
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
    if (!outputText || !outputText.trim()) {
      toast.error('Nothing to copy!');
      return;
    }
    try {
      await navigator.clipboard.writeText(outputText);
      addToClipboardHistory(outputText);
      addAuditLog('Copied Transformed Text', 'Copied text toolkit output to clipboard');
      toast.success('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy', err);
      toast.error('Failed to copy');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.pane}>
        <div className={styles.paneHeader}>
          <span style={{ fontWeight: 600 }}>Input</span>
          <Button variant="secondary" size="sm" onClick={() => { setInputText(''); setOutputText(''); }}>
            <Trash2 size={16} style={{ marginRight: '6px' }} /> Clear
          </Button>
        </div>
        
        <div className={styles.textarea} style={{ padding: 0, overflow: 'hidden', minHeight: '300px' }}>
          <Editor 
            value={inputText}
            onValueChange={setInputText}
            highlight={code => Prism.highlight(code, Prism.languages.json, 'json')}
            padding={16}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              minHeight: '300px',
              backgroundColor: 'transparent',
              outline: 'none',
              wordBreak: 'break-word'
            }}
            textareaClassName="editor-textarea"
            placeholder="Paste your text or JSON here..."
          />
        </div>
      </div>

      <div className={styles.toolbar}>
        <select 
          className={styles.select}
          value={selectedAction}
          onChange={(e) => setSelectedAction(e.target.value)}
        >
          <option value="uppercase">UPPERCASE</option>
          <option value="lowercase">lowercase</option>
          <option value="camelcase">camelCase</option>
          <option value="snakecase">snake_case</option>
          <option value="base64-encode">Base64 Encode</option>
          <option value="base64-decode">Base64 Decode</option>
          <option value="url-encode">URL Encode</option>
          <option value="url-decode">URL Decode</option>
          <option value="json-minify">Minify JSON</option>
          <option value="json-format">Format JSON</option>
        </select>
        <Button variant="primary" onClick={() => handleAction(selectedAction)}>Transform</Button>
      </div>

      <div className={styles.pane}>
        <div className={styles.paneHeader}>
          <span style={{ fontWeight: 600 }}>Output</span>
          <Button variant="secondary" size="sm" onClick={copyToClipboard}>
            <Copy size={16} style={{ marginRight: '6px' }} /> Copy Output
          </Button>
        </div>
        
        <div className={styles.textarea} style={{ padding: 0, overflow: 'hidden', minHeight: '300px' }}>
          <Editor 
            value={outputText}
            onValueChange={() => {}}
            highlight={code => Prism.highlight(code, Prism.languages.json, 'json')}
            padding={16}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              minHeight: '300px',
              backgroundColor: 'transparent',
              outline: 'none',
              wordBreak: 'break-word'
            }}
            textareaClassName="editor-textarea"
            placeholder="Output will appear here..."
            disabled
          />
        </div>
      </div>
    </div>
  );
}
