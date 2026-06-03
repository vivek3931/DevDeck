'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Trash2 } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism.css'; // Light theme for mint background
import styles from './JwtDecoder.module.css';

export default function JwtDecoderClient() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token.trim()) {
      setHeader('');
      setPayload('');
      setError('');
      return;
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format (must have 3 parts separated by dots)');
      }

      const decodeBase64Url = (str: string) => {
        let b64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (b64.length % 4) {
          b64 += '=';
        }
        return decodeURIComponent(escape(window.atob(b64)));
      };

      const decodedHeader = JSON.parse(decodeBase64Url(parts[0]));
      const decodedPayload = JSON.parse(decodeBase64Url(parts[1]));

      setHeader(JSON.stringify(decodedHeader, null, 2));
      setPayload(JSON.stringify(decodedPayload, null, 2));
      setError('');
    } catch (err: any) {
      setHeader('');
      setPayload('');
      setError(err.message || 'Failed to decode token');
    }
  }, [token]);

  return (
    <div className={styles.container}>
      <div className={styles.pane}>
        <div className={styles.paneHeader}>
          <span style={{ fontWeight: 600 }}>Encoded JWT Token</span>
          <Button variant="secondary" size="sm" onClick={() => setToken('')}>
            <Trash2 size={16} style={{ marginRight: '6px' }} /> Clear
          </Button>
        </div>
        
        <div className={styles.textarea} style={{ padding: 0, overflow: 'hidden', minHeight: '150px' }}>
          <Editor
            value={token}
            onValueChange={setToken}
            highlight={code => Prism.highlight(code, Prism.languages.json, 'json')}
            padding={16}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              minHeight: '150px',
              backgroundColor: 'transparent',
              outline: 'none',
              wordBreak: 'break-all'
            }}
            textareaClassName="editor-textarea"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          />
        </div>

        {error && <p style={{ color: '#ef4444', marginTop: 'var(--spacing-sm)', fontSize: '14px' }}>{error}</p>}
      </div>

      {(header || payload) && (
        <div className={styles.pane} style={{ flex: 1.5 }}>
          <div className={styles.paneHeader}>
            <span style={{ fontWeight: 600 }}>Header (Algorithm & Token Type)</span>
          </div>
          <div className={styles.textarea} style={{ padding: 0, overflow: 'hidden' }}>
            <Editor
              value={header}
              onValueChange={() => {}}
              highlight={code => Prism.highlight(code, Prism.languages.json, 'json')}
              padding={16}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                backgroundColor: 'transparent',
                outline: 'none',
              }}
              disabled
            />
          </div>

          <div className={styles.paneHeader} style={{ marginTop: 'var(--spacing-md)' }}>
            <span style={{ fontWeight: 600 }}>Payload (Data)</span>
          </div>
          <div className={styles.textarea} style={{ padding: 0, overflow: 'hidden', minHeight: '250px' }}>
            <Editor
              value={payload}
              onValueChange={() => {}}
              highlight={code => Prism.highlight(code, Prism.languages.json, 'json')}
              padding={16}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                minHeight: '250px',
                backgroundColor: 'transparent',
                outline: 'none',
              }}
              disabled
            />
          </div>
        </div>
      )}
    </div>
  );
}
