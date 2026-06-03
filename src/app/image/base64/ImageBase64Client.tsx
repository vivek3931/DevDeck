'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { UploadCloud, Copy, Check, RefreshCw } from 'lucide-react';
import styles from './ImageBase64.module.css';

export default function ImageBase64Client() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [base64String, setBase64String] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setPreviewUrl(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onload = (e) => {
      setBase64String(e.target?.result as string);
    };
    reader.readAsDataURL(file);
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

  const copyToClipboard = () => {
    if (!base64String) return;
    navigator.clipboard.writeText(base64String);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyForCss = () => {
    if (!base64String) return;
    const cssCode = `background-image: url('${base64String}');`;
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyForHtml = () => {
    if (!base64String) return;
    const htmlCode = `<img src="${base64String}" alt="${file?.name || 'base64 image'}" />`;
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setFile(null);
    setBase64String('');
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
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>Get the Base64 data URI instantly.</p>
          </div>
        </div>
      ) : (
        <div className={styles.previewContainer}>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <img src={previewUrl!} alt="Preview" className={styles.imagePreview} style={{ maxHeight: '200px' }} />
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
                <Button variant="primary" onClick={copyToClipboard} style={{ flex: 1 }}>
                  {copied ? <Check size={18} style={{ marginRight: '8px' }} /> : <Copy size={18} style={{ marginRight: '8px' }} />}
                  Copy Raw String
                </Button>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                <Button variant="secondary" onClick={copyForHtml} style={{ flex: 1, fontSize: '13px' }}>
                  Copy &lt;img&gt; Tag
                </Button>
                <Button variant="secondary" onClick={copyForCss} style={{ flex: 1, fontSize: '13px' }}>
                  Copy CSS url()
                </Button>
              </div>

              <div style={{ marginTop: '16px' }}>
                 <Button variant="ghost" onClick={reset} style={{ width: '100%' }}>
                  <RefreshCw size={18} style={{ marginRight: '8px' }} /> Encode Another Image
                </Button>
              </div>
            </div>

            <div style={{ flex: '2', minWidth: '300px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="body-sm" style={{ fontWeight: 500, color: 'var(--color-ink-muted)' }}>Base64 Output ({formatSize(base64String.length)})</label>
              </div>
              <textarea 
                value={base64String}
                readOnly
                style={{
                  width: '100%',
                  height: '320px',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(0,0,0,0.3)',
                  color: 'var(--color-primary)',
                  fontSize: '13px',
                  fontFamily: 'var(--font-mono)',
                  resize: 'none',
                  outline: 'none',
                  wordBreak: 'break-all'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function formatSize(bytes: number) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
