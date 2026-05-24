'use client';

import React, { useState, useRef } from 'react';
import { ColorBlock } from '@/components/ui/ColorBlock';
import { Button } from '@/components/ui/Button';
import { Upload, Download, ImageIcon } from 'lucide-react';
import imageCompression from 'browser-image-compression';
import styles from './ImageCompressor.module.css';

export default function ImageCompressorClient() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [maxSizeMB, setMaxSizeMB] = useState(1);
  const [maxWidthOrHeight, setMaxWidthOrHeight] = useState(1920);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalFile(file);
      setCompressedFile(null); // Reset compressed
    }
  };

  const compressImage = async () => {
    if (!originalFile) return;

    setIsCompressing(true);
    try {
      const options = {
        maxSizeMB: maxSizeMB,
        maxWidthOrHeight: maxWidthOrHeight,
        useWebWorker: true,
      };
      const compressedBlob = await imageCompression(originalFile, options);
      // Create a new File from the blob
      const compressed = new File([compressedBlob], originalFile.name, {
        type: compressedBlob.type,
        lastModified: Date.now(),
      });
      setCompressedFile(compressed);
    } catch (error) {
      console.error(error);
      alert('Error compressing image');
    } finally {
      setIsCompressing(false);
    }
  };

  const downloadCompressed = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compressed_${compressedFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };

  return (
    <article style={{ marginTop: 'var(--spacing-section)' }}>
      <ColorBlock color="navy">
        <h1 className="display-lg">Image Compressor</h1>
        <p className="subhead" style={{ marginTop: 'var(--spacing-sm)' }}>
          Compress and scale images entirely client-side. Complete privacy.
        </p>

        <div className={styles.toolCard}>
          <div className={styles.controls}>
            <div className={styles.uploadBox} onClick={() => fileInputRef.current?.click()}>
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
              <ImageIcon size={48} style={{ opacity: 0.5, marginBottom: 'var(--spacing-sm)' }} />
              <p className="body-lg">{originalFile ? originalFile.name : 'Click to upload an image'}</p>
            </div>

            <div className={styles.settings}>
              <div className={styles.settingGroup}>
                <label className="eyebrow">Max Size (MB)</label>
                <input 
                  type="range" 
                  min="0.1" max="5" step="0.1"
                  value={maxSizeMB}
                  onChange={(e) => setMaxSizeMB(parseFloat(e.target.value))}
                  className={styles.slider}
                />
                <span>{maxSizeMB} MB</span>
              </div>
              <div className={styles.settingGroup}>
                <label className="eyebrow">Max Dimensions</label>
                <input 
                  type="range" 
                  min="800" max="3840" step="100"
                  value={maxWidthOrHeight}
                  onChange={(e) => setMaxWidthOrHeight(parseInt(e.target.value))}
                  className={styles.slider}
                />
                <span>{maxWidthOrHeight} px</span>
              </div>
              <Button variant="primary" onClick={compressImage} disabled={!originalFile || isCompressing} className={styles.compressBtn}>
                {isCompressing ? 'Compressing...' : 'Compress Image'}
              </Button>
            </div>
          </div>

          {(originalFile || compressedFile) && (
            <div className={styles.comparison}>
              <div className={styles.previewBox}>
                <span className="eyebrow" style={{ color: 'var(--color-block-pink)' }}>Original</span>
                <p className="body-sm">Size: {originalFile ? formatSize(originalFile.size) : '--'}</p>
              </div>
              <div className={styles.previewBox}>
                <span className="eyebrow" style={{ color: 'var(--color-block-lime)' }}>Compressed</span>
                <p className="body-sm">Size: {compressedFile ? formatSize(compressedFile.size) : '--'}</p>
                {compressedFile && originalFile && (
                  <p className="caption" style={{ color: 'var(--color-semantic-success)' }}>
                    Saved {(((originalFile.size - compressedFile.size) / originalFile.size) * 100).toFixed(1)}%
                  </p>
                )}
                {compressedFile && (
                  <Button variant="secondary" size="icon" onClick={downloadCompressed} style={{ marginTop: 'var(--spacing-sm)' }}>
                    <Download size={16} />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </ColorBlock>
    </article>
  );
}
