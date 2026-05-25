'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import styles from './HashGenerator.module.css';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import md5 from 'md5'; // Now installed

export default function HashGeneratorClient() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({
    md5: '',
    sha1: '',
    sha256: '',
    sha512: '',
  });

  useEffect(() => {
    if (!input) {
      setHashes({ md5: '', sha1: '', sha256: '', sha512: '' });
      return;
    }

    generateHashes(input);
  }, [input]);

  const generateHashes = async (text: string) => {
    try {
      // MD5 (sync)
      const md5Hash = md5(text);
      
      const encoder = new TextEncoder();
      const data = encoder.encode(text);

      const [sha1Buf, sha256Buf, sha512Buf] = await Promise.all([
        crypto.subtle.digest('SHA-1', data),
        crypto.subtle.digest('SHA-256', data),
        crypto.subtle.digest('SHA-512', data),
      ]);

      setHashes({
        md5: md5Hash,
        sha1: bufferToHex(sha1Buf),
        sha256: bufferToHex(sha256Buf),
        sha512: bufferToHex(sha512Buf),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const bufferToHex = (buffer: ArrayBuffer) => {
    const hashArray = Array.from(new Uint8Array(buffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  };

  const copyHash = (hash: string, name: string) => {
    if (!hash) return;
    navigator.clipboard.writeText(hash);
    toast.success(`${name} hash copied to clipboard!`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputSection}>
        <textarea
          className={styles.textarea}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste string here to generate hashes..."
          spellCheck={false}
        />
        <Button 
          variant="secondary" 
          onClick={() => setInput('')} 
          style={{ marginTop: 'var(--spacing-sm)' }}
        >
          Clear
        </Button>
      </div>

      <div className={styles.outputSection}>
        {Object.entries(hashes).map(([key, value]) => (
          <div key={key} className={styles.hashRow}>
            <div className={styles.hashLabel}>{key.toUpperCase()}</div>
            <div className={styles.hashValue}>
              {value || <span style={{ opacity: 0.5 }}>Waiting for input...</span>}
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => copyHash(value, key.toUpperCase())}
              disabled={!value}
            >
              <Copy size={16} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
