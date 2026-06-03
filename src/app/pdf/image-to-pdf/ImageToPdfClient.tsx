'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { UploadCloud, Image as ImageIcon, Trash2, ArrowUp, ArrowDown, Download, Loader2 } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import styles from './ImageToPdf.module.css';

export default function ImageToPdfClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFiles = (newFiles: FileList | File[]) => {
    const imageFiles = Array.from(newFiles).filter(file => file.type.startsWith('image/'));
    if (imageFiles.length > 0) {
      setFiles(prev => [...prev, ...imageFiles]);
    } else {
      alert("Please upload valid image files (JPG, PNG, WebP).");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setFiles(prev => {
      const newFiles = [...prev];
      const temp = newFiles[index];
      newFiles[index] = newFiles[index - 1];
      newFiles[index - 1] = temp;
      return newFiles;
    });
  };

  const moveDown = (index: number) => {
    if (index === files.length - 1) return;
    setFiles(prev => {
      const newFiles = [...prev];
      const temp = newFiles[index];
      newFiles[index] = newFiles[index + 1];
      newFiles[index + 1] = temp;
      return newFiles;
    });
  };

  const generatePdf = async () => {
    if (files.length === 0) return;

    try {
      setIsProcessing(true);
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        let image;
        
        // pdf-lib supports embedding JPEG and PNG directly.
        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(arrayBuffer);
        } else if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else {
          // For WebP or other formats, we must convert it to PNG using a canvas first.
          image = await new Promise<any>((resolve, reject) => {
            const img = new Image();
            img.onload = async () => {
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.drawImage(img, 0, 0);
                const dataUrl = canvas.toDataURL('image/png');
                const res = await fetch(dataUrl);
                const blob = await res.blob();
                const buffer = await blob.arrayBuffer();
                resolve(await pdfDoc.embedPng(buffer));
              } else {
                reject(new Error('Canvas context failed'));
              }
            };
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
          });
        }

        const { width, height } = image.scale(1);
        const page = pdfDoc.addPage([width, height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width,
          height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `images-to-pdf-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (err) {
      console.error(err);
      alert("An error occurred while generating the PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={styles.container}>
      <div 
        className={`${styles.dropzone} ${isDragging ? styles.dropzoneActive : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          multiple 
          accept="image/*"
          className="visually-hidden" 
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <UploadCloud size={48} opacity={0.5} />
        <div>
          <h3 className="body-lg" style={{ fontWeight: 600 }}>Click or drag images here</h3>
          <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>JPG, PNG, and WebP supported.</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className={styles.fileList}>
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className={styles.fileItem}>
              <div className={styles.fileInfo}>
                <ImageIcon size={20} opacity={0.7} />
                <div>
                  <div className={styles.fileName}>{file.name}</div>
                  <div className={styles.fileSize}>{formatSize(file.size)}</div>
                </div>
              </div>
              <div className={styles.controls}>
                <button 
                  className={styles.controlBtn} 
                  onClick={() => moveUp(index)}
                  disabled={index === 0 || isProcessing}
                  title="Move Up"
                >
                  <ArrowUp size={16} />
                </button>
                <button 
                  className={styles.controlBtn} 
                  onClick={() => moveDown(index)}
                  disabled={index === files.length - 1 || isProcessing}
                  title="Move Down"
                >
                  <ArrowDown size={16} />
                </button>
                <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />
                <button 
                  className={styles.controlBtn} 
                  onClick={() => removeFile(index)}
                  disabled={isProcessing}
                  title="Remove"
                  style={{ color: 'rgba(255, 100, 100, 0.8)' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          
          <div className={styles.actionArea}>
            <Button 
              variant="primary" 
              onClick={generatePdf}
              disabled={isProcessing}
              style={{ padding: '0 var(--spacing-xl)' }}
            >
              {isProcessing ? (
                <><Loader2 className="spinner" size={18} style={{ marginRight: '8px' }} /> Generating PDF...</>
              ) : (
                <><Download size={18} style={{ marginRight: '8px' }} /> Create PDF</>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
