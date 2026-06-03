'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { UploadCloud, Image as ImageIcon, Download, RefreshCw } from 'lucide-react';
import styles from './ImageConverter.module.css';

type Format = 'image/png' | 'image/jpeg' | 'image/webp';

export default function ImageConverterClient() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<Format>('image/webp');
  const [quality, setQuality] = useState<number>(0.9);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }
    setFile(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleDownload = () => {
    if (!previewUrl || !file) return;

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // If converting to JPEG, fill with white background first (since JPEG doesn't support transparency)
      if (targetFormat === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      const ext = targetFormat.split('/')[1];
      const newName = file.name.replace(/\.[^/.]+$/, "") + `_converted.${ext}`;

      const dataUrl = canvas.toDataURL(targetFormat, quality);
      
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = newName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    img.src = previewUrl;
  };

  const reset = () => {
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  return (
    <div className={styles.container}>
      {!file ? (
        <div 
          className={`${styles.dropzone} ${isDragging ? styles.dropzoneActive : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            accept="image/*"
            className="visually-hidden" 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <UploadCloud size={48} opacity={0.5} />
          <div>
            <h3 className="body-lg" style={{ fontWeight: 600 }}>Click or drag an image here</h3>
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>Supports PNG, JPEG, WebP, GIF, and more.</p>
          </div>
        </div>
      ) : (
        <div className={styles.previewContainer}>
          <img src={previewUrl!} alt="Preview" className={styles.imagePreview} />
          
          <div className={styles.controls}>
            <div className={styles.selectGroup}>
              <label>Convert To</label>
              <select 
                className={styles.select}
                value={targetFormat} 
                onChange={(e) => setTargetFormat(e.target.value as Format)}
              >
                <option value="image/webp">WebP (Recommended)</option>
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPEG</option>
              </select>
            </div>
            
            {(targetFormat === 'image/jpeg' || targetFormat === 'image/webp') && (
              <div className={styles.selectGroup}>
                <label>Quality ({Math.round(quality * 100)}%)</label>
                <input 
                  type="range" 
                  min="0.1" 
                  max="1.0" 
                  step="0.1" 
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  style={{ width: '100%', marginTop: '8px' }}
                />
              </div>
            )}
            
            <div className={styles.actions}>
              <Button variant="secondary" onClick={reset}>
                <RefreshCw size={18} style={{ marginRight: '8px' }} /> New Image
              </Button>
              <Button variant="primary" onClick={handleDownload}>
                <Download size={18} style={{ marginRight: '8px' }} /> Download Converted
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Hidden canvas used for processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
