'use client';

import React, { useState, useEffect } from 'react';
import { ColorBlock } from '@/components/ui/ColorBlock';
import { Button } from '@/components/ui/Button';
import { Trash2 } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css';
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
    <article>
      <ColorBlock color="mint">
        <h1 className="display-lg">JWT Decoder</h1>
        <p className="subhead" style={{ marginTop: 'var(--spacing-sm)' }}>
          Decode JSON Web Tokens instantly and completely locally. Your sensitive tokens are never sent to a server.
        </p>

        <div className={styles.toolCard}>
          <div className={styles.paneHeader}>
            <span className="eyebrow">Encoded JWT Token</span>
            <Button variant="secondary" size="icon" onClick={() => setToken('')}>
              <Trash2 size={16} />
            </Button>
          </div>
          
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            style={{
              width: '100%',
              minHeight: '150px',
              padding: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid var(--color-hairline)',
              resize: 'vertical',
              wordBreak: 'break-all'
            }}
          />
          {error && <p className={styles.error}>{error}</p>}

          {(header || payload) && (
            <div className={styles.grid}>
              <div>
                <div className={styles.paneHeader}>
                  <span className="eyebrow">Header (Algorithm)</span>
                </div>
                <div style={{ border: '1px solid var(--color-hairline)', borderRadius: '8px', backgroundColor: '#1d1f21', overflow: 'hidden' }}>
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
              </div>

              <div>
                <div className={styles.paneHeader}>
                  <span className="eyebrow">Payload (Data)</span>
                </div>
                <div style={{ border: '1px solid var(--color-hairline)', borderRadius: '8px', backgroundColor: '#1d1f21', overflow: 'hidden' }}>
                  <Editor
                    value={payload}
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
              </div>
            </div>
          )}
        </div>
      </ColorBlock>
    </article>
  );
}
