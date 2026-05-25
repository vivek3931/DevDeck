'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import styles from './JsonValidator.module.css';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism.css'; // Light theme for lime background

export default function JsonValidatorClient() {
  const [input, setInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const extractLineNumber = (msg: string, json: string) => {
    const match = msg.match(/position (\d+)/) || msg.match(/at line (\d+) column (\d+)/);
    if (match && msg.includes('position')) {
      const pos = parseInt(match[1], 10);
      const lines = json.substring(0, pos).split('\n');
      return ` (Line ${lines.length}, Column ${lines[lines.length - 1].length + 1})`;
    }
    return '';
  };

  const formatJson = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
      setErrorMsg(null);
    } catch (e: any) {
      setErrorMsg(e.message + extractLineNumber(e.message, input));
    }
  };

  const minifyJson = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setErrorMsg(null);
    } catch (e: any) {
      setErrorMsg(e.message + extractLineNumber(e.message, input));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <Button onClick={formatJson} variant="primary">Format / Prettify</Button>
        <Button onClick={minifyJson} variant="secondary">Minify</Button>
        <Button onClick={() => { setInput(''); setErrorMsg(null); }} variant="secondary">Clear</Button>
      </div>

      {errorMsg ? (
        <div className={styles.errorAlert}>
          <AlertTriangle size={20} />
          <span><strong>Invalid JSON:</strong> {errorMsg}</span>
        </div>
      ) : (
        input.trim().length > 0 && (
          <div className={styles.successAlert}>
            <CheckCircle size={20} />
            <span>Valid JSON</span>
          </div>
        )
      )}

      <div className={styles.textarea} style={{ padding: 0, overflow: 'hidden' }}>
        <Editor
          value={input}
          onValueChange={(val) => {
            setInput(val);
            if (errorMsg) setErrorMsg(null);
          }}
          highlight={code => Prism.highlight(code, Prism.languages.json, 'json')}
          padding={16}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 14,
            minHeight: '400px',
            backgroundColor: 'transparent',
            outline: 'none',
          }}
          textareaClassName="editor-textarea"
          placeholder="Paste your JSON here..."
        />
      </div>
    </div>
  );
}
