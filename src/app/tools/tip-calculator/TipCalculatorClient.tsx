'use client';

import React, { useState } from 'react';
import { ColorBlock } from '@/components/ui/ColorBlock';
import { Input } from '@/components/ui/Input';
import styles from './TipCalculator.module.css';

export default function TipCalculatorClient() {
  const [bill, setBill] = useState<string>('0');
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [split, setSplit] = useState<number>(1);

  const billAmount = parseFloat(bill) || 0;
  const tipAmount = billAmount * (tipPercentage / 100);
  const total = billAmount + tipAmount;
  const perPerson = split > 0 ? total / split : 0;

  return (
    <article>
      <ColorBlock color="coral">
        <h1 className="display-lg">Tip Calculator</h1>
        <p className="subhead" style={{ marginTop: 'var(--spacing-sm)' }}>
          Quick math for splitting bills.
        </p>

        <div className={styles.toolCard}>
          <div className={styles.controls}>
            <div className={styles.inputGroup}>
              <label className="eyebrow">Bill Amount ($)</label>
              <Input 
                type="number" 
                min="0" 
                step="0.01" 
                value={bill} 
                onChange={(e) => setBill(e.target.value)} 
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label className="eyebrow">Tip % ({tipPercentage}%)</label>
              <input 
                type="range" 
                min="0" max="50" step="1"
                value={tipPercentage}
                onChange={(e) => setTipPercentage(parseInt(e.target.value))}
                className={styles.slider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className="eyebrow">Split (Persons)</label>
              <Input 
                type="number" 
                min="1" max="50" step="1" 
                value={split} 
                onChange={(e) => setSplit(parseInt(e.target.value) || 1)} 
              />
            </div>
          </div>

          <div className={styles.results}>
            <div className={styles.resultItem}>
              <span className="eyebrow">Tip Amount</span>
              <span className="headline">${tipAmount.toFixed(2)}</span>
            </div>
            <div className={styles.resultItem}>
              <span className="eyebrow">Total Bill</span>
              <span className="headline">${total.toFixed(2)}</span>
            </div>
            <div className={styles.resultItem}>
              <span className="eyebrow">Per Person</span>
              <span className="display-lg" style={{ color: 'var(--color-primary)' }}>${perPerson.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </ColorBlock>
    </article>
  );
}
