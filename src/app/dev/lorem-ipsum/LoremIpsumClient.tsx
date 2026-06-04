'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Copy, RefreshCw, Check } from 'lucide-react';
import { loremIpsum } from 'lorem-ipsum';
import styles from './LoremIpsum.module.css';

type LoremType = 'paragraphs' | 'sentences' | 'words';

export default function LoremIpsumClient() {
  const [amount, setAmount] = useState<number>(3);
  const [type, setType] = useState<LoremType>('paragraphs');
  const [text, setText] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let result = '';
    try {
      result = loremIpsum({
        count: amount,
        format: 'plain',
        units: type,
        sentenceLowerBound: 5,
        sentenceUpperBound: 15,
        paragraphLowerBound: 3,
        paragraphUpperBound: 7,
      });
    } catch (e) {
      console.error(e);
      result = 'Error generating text.';
    }
    setText(result);
  }, [amount, type]);

  useEffect(() => {
    generate();
  }, [generate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.formGroup}>
          <label className="eyebrow">Amount</label>
          <input 
            type="number" 
            min={1} 
            max={1000}
            value={amount}
            onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
            className={styles.input}
            style={{ width: '100px' }}
          />
        </div>
        <div className={styles.formGroup}>
          <label className="eyebrow">Type</label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value as LoremType)}
            className={styles.select}
          >
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
        <div style={{ flex: 1 }} />
        <Button variant="primary" onClick={generate} style={{ height: '42px' }}>
          <RefreshCw size={16} style={{ marginRight: '8px' }} />
          Regenerate
        </Button>
      </div>

      <div className={styles.outputArea}>
        <textarea
          value={text}
          readOnly
          className={styles.textarea}
        />
        <div className={styles.actions}>
          <Button variant="secondary" onClick={handleCopy}>
            {copied ? <Check size={16} style={{ marginRight: '8px' }} /> : <Copy size={16} style={{ marginRight: '8px' }} />}
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </Button>
        </div>
      </div>
    </div>
  );
}
