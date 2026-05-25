'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ColorBlock } from '@/components/ui/ColorBlock';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { QRCodeSVG } from 'qrcode.react';
import { Download, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import styles from './QrGenerator.module.css';

export default function QrGeneratorClient() {
  const [value, setValue] = useState('https://devdeck.online');
  const svgRef = useRef<SVGSVGElement>(null);

  const downloadSVG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qrcode.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('SVG Downloaded!');
  };

  return (
    <article>
      <ColorBlock color="mint">
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
          <ArrowLeft size={16} /> Back to Tools
        </Link>
        <h1 className="display-lg">QR Code Generator</h1>
        <p className="subhead" style={{ marginTop: 'var(--spacing-sm)' }}>
          Create vector (SVG) QR codes instantly.
        </p>

        <div className={styles.toolCard}>
          <div className={styles.inputSection}>
            <label htmlFor="qr-input" className="eyebrow">Data to encode</label>
            <Input 
              id="qr-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter text or URL..."
            />
          </div>

          <div className={styles.previewSection}>
            <div className={styles.qrWrapper}>
              <QRCodeSVG 
                value={value || ' '} 
                size={256} 
                level="Q"
                includeMargin={true}
                ref={svgRef}
              />
            </div>
            
            <Button variant="primary" onClick={downloadSVG} className={styles.downloadBtn}>
              <Download size={18} style={{ marginRight: '8px' }} />
              Download Vector (SVG)
            </Button>
          </div>
        </div>
      </ColorBlock>
    </article>
  );
}
