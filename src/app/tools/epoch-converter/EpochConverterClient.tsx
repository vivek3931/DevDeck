'use client';

import React, { useState, useEffect } from 'react';
import { ColorBlock } from '@/components/ui/ColorBlock';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Copy } from 'lucide-react';
import { format } from 'date-fns';
import { useAppStore } from '@/store/useAppStore';
import { toast } from 'sonner';
import styles from './EpochConverter.module.css';

export default function EpochConverterClient() {
  const [currentEpoch, setCurrentEpoch] = useState<number>(Math.floor(Date.now() / 1000));
  const [inputEpoch, setInputEpoch] = useState<string>('');
  const [convertedDate, setConvertedDate] = useState<string | null>(null);
  const { addAuditLog, addToClipboardHistory } = useAppStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleConvert = () => {
    if (!inputEpoch) return;
    const epochNum = parseInt(inputEpoch, 10);
    if (isNaN(epochNum)) {
      setConvertedDate('Invalid Epoch');
      return;
    }
    // Assume seconds, if too large assume ms
    const isMs = inputEpoch.length > 10;
    const date = new Date(isMs ? epochNum : epochNum * 1000);
    setConvertedDate(format(date, 'yyyy-MM-dd HH:mm:ss OOOO'));
    addAuditLog('Converted Epoch', `Timestamp: ${inputEpoch}`);
  };

  const copyToClipboard = async () => {
    if (!convertedDate || convertedDate === 'Invalid Epoch') return;
    try {
      await navigator.clipboard.writeText(convertedDate);
      addToClipboardHistory(convertedDate);
      addAuditLog('Copied Epoch Date', 'Copied converted date to clipboard');
      toast.success('Date copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy', err);
      toast.error('Failed to copy');
    }
  };

  return (
    <article>
      <ColorBlock color="lilac">
        <h1 className="display-lg">Epoch Converter</h1>
        <p className="subhead" style={{ marginTop: 'var(--spacing-sm)' }}>
          Convert UNIX timestamps instantly. The current epoch time is <strong>{currentEpoch}</strong>.
        </p>

        <div className={styles.toolCard}>
          <div className={styles.inputGroup}>
            <label htmlFor="epoch-input" className="eyebrow">Enter Epoch Timestamp</label>
            <Input 
              id="epoch-input"
              value={inputEpoch} 
              onChange={(e) => setInputEpoch(e.target.value)} 
              placeholder={currentEpoch.toString()}
            />
            <Button variant="primary" onClick={handleConvert}>Convert</Button>
          </div>

          {convertedDate && (
            <div className={styles.resultBox} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="caption">Result (Local Time)</span>
                <p className="headline" style={{ marginTop: 'var(--spacing-xs)' }}>{convertedDate}</p>
              </div>
              {convertedDate !== 'Invalid Epoch' && (
                <Button variant="secondary" size="icon" onClick={copyToClipboard} aria-label="Copy result">
                  <Copy size={16} />
                </Button>
              )}
            </div>
          )}
        </div>
      </ColorBlock>
    </article>
  );
}
