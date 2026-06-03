'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { UploadCloud, File as FileIcon, Trash2, ArrowUp, ArrowDown, Download, Loader2 } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import styles from './PdfMerge.module.css';

export default function PdfMergeClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
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
    const pdfFiles = Array.from(newFiles).filter(file => file.type === 'application/pdf');
    if (pdfFiles.length > 0) {
      setFiles(prev => [...prev, ...pdfFiles]);
    } else {
      alert("Please upload only PDF files.");
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

  const mergePdfs = async () => {
    if (files.length < 2) {
      alert("Please select at least 2 PDF files to merge.");
      return;
    }

    try {
      setIsMerging(true);
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const mergedPdfFile = await mergedPdf.save();
      const blob = new Blob([mergedPdfFile as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `merged-document-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (err) {
      console.error(err);
      alert("An error occurred while merging PDFs. Check console for details.");
    } finally {
      setIsMerging(false);
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
          accept="application/pdf"
          className="visually-hidden" 
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <UploadCloud size={48} opacity={0.5} />
        <div>
          <h3 className="body-lg" style={{ fontWeight: 600 }}>Click or drag PDFs here</h3>
          <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>Files remain entirely on your device.</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className={styles.fileList}>
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className={styles.fileItem}>
              <div className={styles.fileInfo}>
                <FileIcon size={20} opacity={0.7} />
                <div>
                  <div className={styles.fileName}>{file.name}</div>
                  <div className={styles.fileSize}>{formatSize(file.size)}</div>
                </div>
              </div>
              <div className={styles.controls}>
                <button 
                  className={styles.controlBtn} 
                  onClick={() => moveUp(index)}
                  disabled={index === 0 || isMerging}
                  title="Move Up"
                >
                  <ArrowUp size={16} />
                </button>
                <button 
                  className={styles.controlBtn} 
                  onClick={() => moveDown(index)}
                  disabled={index === files.length - 1 || isMerging}
                  title="Move Down"
                >
                  <ArrowDown size={16} />
                </button>
                <div style={{ width: '1px', height: '16px', background: 'rgba(0,0,0,0.1)', margin: '0 4px' }} />
                <button 
                  className={styles.controlBtn} 
                  onClick={() => removeFile(index)}
                  disabled={isMerging}
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
              onClick={mergePdfs}
              disabled={files.length < 2 || isMerging}
              style={{ padding: '0 var(--spacing-xl)' }}
            >
              {isMerging ? (
                <><Loader2 className="spinner" size={18} style={{ marginRight: '8px' }} /> Merging...</>
              ) : (
                <><Download size={18} style={{ marginRight: '8px' }} /> Merge {files.length} PDFs</>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
