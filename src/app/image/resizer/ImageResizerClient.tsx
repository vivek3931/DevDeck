'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { UploadCloud, Download, RefreshCw, Lock, Unlock } from 'lucide-react';
import styles from './ImageResizer.module.css';

export default function ImageResizerClient() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [targetWidth, setTargetWidth] = useState<number | ''>('');
  const [targetHeight, setTargetHeight] = useState<number | ''>('');
  const [maintainRatio, setMaintainRatio] = useState(true);

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
    const url = URL.createObjectURL(file);
    
    const img = new Image();
    img.onload = () => {
      setOriginalDimensions({ width: img.width, height: img.height });
      setTargetWidth(img.width);
      setTargetHeight(img.height);
      setPreviewUrl(url);
    };
    img.src = url;
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

  const handleWidthChange = (val: string) => {
    const w = parseInt(val, 10);
    setTargetWidth(isNaN(w) ? '' : w);
    
    if (maintainRatio && !isNaN(w) && originalDimensions.width > 0) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setTargetHeight(Math.round(w * ratio));
    }
  };

  const handleHeightChange = (val: string) => {
    const h = parseInt(val, 10);
    setTargetHeight(isNaN(h) ? '' : h);
    
    if (maintainRatio && !isNaN(h) && originalDimensions.height > 0) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setTargetWidth(Math.round(h * ratio));
    }
  };

  const handleDownload = () => {
    if (!previewUrl || !file || !targetWidth || !targetHeight) return;

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = Number(targetWidth);
      canvas.height = Number(targetHeight);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Preserve transparency for PNG
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const ext = file.type === 'image/png' ? 'png' : 'jpeg';
      const newName = file.name.replace(/\.[^/.]+$/, "") + `_${targetWidth}x${targetHeight}.${ext}`;

      const dataUrl = canvas.toDataURL(file.type, 0.95);
      
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', pointerEvents: 'none' }}>
            <div>
              <h3 className="body-lg" style={{ fontWeight: 600 }}>Drag & drop an image here</h3>
              <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>Supports PNG, JPEG, WebP, GIF, and more.</p>
            </div>
            <Button variant="secondary" style={{ pointerEvents: 'auto' }} onClick={(e: React.MouseEvent) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
              Choose File
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.previewContainer}>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <img src={previewUrl!} alt="Preview" className={styles.imagePreview} style={{ maxHeight: '300px' }} />
              <div style={{ textAlign: 'center', marginTop: '8px', color: 'var(--color-ink-muted)', fontSize: '12px' }}>
                Original: {originalDimensions.width} x {originalDimensions.height}px
              </div>
            </div>

            <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className={styles.selectGroup}>
                  <label>Width (px)</label>
                  <input 
                    type="number"
                    className={styles.select}
                    value={targetWidth}
                    onChange={(e) => handleWidthChange(e.target.value)}
                  />
                </div>
                
                <button 
                  onClick={() => setMaintainRatio(!maintainRatio)}
                  style={{ 
                    marginTop: '20px', 
                    background: 'transparent', 
                    border: 'none', 
                    color: maintainRatio ? 'var(--color-primary)' : 'var(--color-ink-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title={maintainRatio ? "Unlock Aspect Ratio" : "Lock Aspect Ratio"}
                >
                  {maintainRatio ? <Lock size={20} /> : <Unlock size={20} />}
                </button>

                <div className={styles.selectGroup}>
                  <label>Height (px)</label>
                  <input 
                    type="number"
                    className={styles.select}
                    value={targetHeight}
                    onChange={(e) => handleHeightChange(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[25, 50, 75].map(pct => (
                  <Button 
                    key={pct}
                    variant="secondary" 
                    size="sm"
                    onClick={() => {
                      setMaintainRatio(true);
                      handleWidthChange(Math.round(originalDimensions.width * (pct/100)).toString());
                    }}
                  >
                    {pct}%
                  </Button>
                ))}
              </div>

              <div className={styles.actions} style={{ marginTop: 'auto' }}>
                <Button variant="secondary" onClick={reset}>
                  <RefreshCw size={18} style={{ marginRight: '8px' }} /> New Image
                </Button>
                <Button variant="primary" onClick={handleDownload} disabled={!targetWidth || !targetHeight}>
                  <Download size={18} style={{ marginRight: '8px' }} /> Download Resized
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
