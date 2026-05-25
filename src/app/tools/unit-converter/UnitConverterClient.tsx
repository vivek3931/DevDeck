'use client';

import React, { useState } from 'react';
import { ColorBlock } from '@/components/ui/ColorBlock';
import { Input } from '@/components/ui/Input';
import styles from './UnitConverter.module.css';

const DATA_UNITS = [
  { label: 'Bytes (B)', multiplier: 1 },
  { label: 'Kilobytes (KB)', multiplier: 1024 },
  { label: 'Megabytes (MB)', multiplier: 1024 ** 2 },
  { label: 'Gigabytes (GB)', multiplier: 1024 ** 3 },
  { label: 'Terabytes (TB)', multiplier: 1024 ** 4 },
];

const DISTANCE_UNITS = [
  { label: 'Millimeters (mm)', multiplier: 0.001 },
  { label: 'Centimeters (cm)', multiplier: 0.01 },
  { label: 'Meters (m)', multiplier: 1 },
  { label: 'Kilometers (km)', multiplier: 1000 },
  { label: 'Inches (in)', multiplier: 0.0254 },
  { label: 'Feet (ft)', multiplier: 0.3048 },
  { label: 'Miles (mi)', multiplier: 1609.34 },
];

export default function UnitConverterClient() {
  const [activeTab, setActiveTab] = useState<'data' | 'distance'>('data');
  const [inputValue, setInputValue] = useState<string>('1');
  const [fromUnitIndex, setFromUnitIndex] = useState(0);
  const [toUnitIndex, setToUnitIndex] = useState(1);

  const units = activeTab === 'data' ? DATA_UNITS : DISTANCE_UNITS;

  const getResult = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return '-';
    const baseValue = val * units[fromUnitIndex].multiplier;
    const result = baseValue / units[toUnitIndex].multiplier;
    // Format to avoid long decimals
    return Number.isInteger(result) ? result.toString() : result.toFixed(6).replace(/\.?0+$/, '');
  };

  const handleTabChange = (tab: 'data' | 'distance') => {
    setActiveTab(tab);
    setFromUnitIndex(0);
    setToUnitIndex(1);
  };

  return (
    <article>
      <ColorBlock color="cream">
        <h1 className="display-lg">Unit Converter</h1>
        <p className="subhead" style={{ marginTop: 'var(--spacing-sm)' }}>
          Instantly convert data sizes and distances.
        </p>

        <div className={styles.toolCard}>
          <div className={styles.tabs}>
            <button 
              className={activeTab === 'data' ? styles.tabActive : styles.tab} 
              onClick={() => handleTabChange('data')}
            >
              Data Size
            </button>
            <button 
              className={activeTab === 'distance' ? styles.tabActive : styles.tab} 
              onClick={() => handleTabChange('distance')}
            >
              Distance
            </button>
          </div>

          <div className={styles.converterGrid}>
            <div className={styles.inputGroup}>
              <label className="eyebrow">From</label>
              <Input 
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <select 
                className={styles.select}
                value={fromUnitIndex}
                onChange={(e) => setFromUnitIndex(Number(e.target.value))}
              >
                {units.map((u, i) => <option key={i} value={i}>{u.label}</option>)}
              </select>
            </div>

            <div className={styles.equalSign}>=</div>

            <div className={styles.inputGroup}>
              <label className="eyebrow">To</label>
              <Input 
                value={getResult()}
                readOnly
                className={styles.resultInput}
              />
              <select 
                className={styles.select}
                value={toUnitIndex}
                onChange={(e) => setToUnitIndex(Number(e.target.value))}
              >
                {units.map((u, i) => <option key={i} value={i}>{u.label}</option>)}
              </select>
            </div>
          </div>
        </div>
      </ColorBlock>
    </article>
  );
}
