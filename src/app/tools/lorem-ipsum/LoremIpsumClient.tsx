'use client';

import React, { useState, useEffect } from 'react';
import { ColorBlock } from '@/components/ui/ColorBlock';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Copy, RefreshCw } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { toast } from 'sonner';
import styles from './LoremIpsum.module.css';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
  'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat'
];

export default function LoremIpsumClient() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [output, setOutput] = useState('');
  const { addAuditLog, addToClipboardHistory } = useAppStore();

  const generateWord = () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
  
  const generateSentence = () => {
    const wordCount = Math.floor(Math.random() * 8) + 5;
    const words = Array.from({ length: wordCount }, generateWord);
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  };

  const generateParagraph = () => {
    const sentenceCount = Math.floor(Math.random() * 5) + 3;
    return Array.from({ length: sentenceCount }, generateSentence).join(' ');
  };

  const generateText = () => {
    let result = '';
    const safeCount = Math.max(1, Math.min(count, 100)); // cap at 100
    
    if (type === 'words') {
      result = Array.from({ length: safeCount }, generateWord).join(' ');
    } else if (type === 'sentences') {
      result = Array.from({ length: safeCount }, generateSentence).join(' ');
    } else {
      result = Array.from({ length: safeCount }, generateParagraph).join('\n\n');
    }
    setOutput(result);
    addAuditLog('Generated Lorem Ipsum', `Generated ${safeCount} ${type}`);
  };

  useEffect(() => {
    generateText();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, type]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      addToClipboardHistory(output);
      addAuditLog('Copied Lorem Ipsum', 'Copied generated text to clipboard');
      toast.success('Text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy', err);
      toast.error('Failed to copy');
    }
  };

  return (
    <article style={{ marginTop: 'var(--spacing-section)' }}>
      <ColorBlock color="coral">
        <h1 className="display-lg">Lorem Ipsum Generator</h1>
        <p className="subhead" style={{ marginTop: 'var(--spacing-sm)' }}>
          Quickly generate mock text for your UI designs and tests.
        </p>

        <div className={styles.toolCard}>
          <div className={styles.controls}>
            <div className={styles.inputGroup}>
              <label className="eyebrow">Count</label>
              <Input 
                type="number"
                min="1" max="100"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className="eyebrow">Type</label>
              <select 
                className={styles.select}
                value={type}
                onChange={(e) => setType(e.target.value as any)}
              >
                <option value="paragraphs">Paragraphs</option>
                <option value="sentences">Sentences</option>
                <option value="words">Words</option>
              </select>
            </div>
            
            <div className={styles.actionsBox}>
              <Button variant="secondary" size="icon" onClick={copyToClipboard} aria-label="Copy text">
                <Copy size={20} />
              </Button>
              <Button variant="primary" size="icon" onClick={generateText} aria-label="Regenerate text">
                <RefreshCw size={20} />
              </Button>
            </div>
          </div>

          <div className={styles.outputBox}>
            {output.split('\n\n').map((paragraph, i) => (
              <p key={i} className="body-lg" style={{ marginBottom: '1em' }}>{paragraph}</p>
            ))}
          </div>
        </div>
      </ColorBlock>
    </article>
  );
}
