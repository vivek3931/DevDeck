'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { UploadCloud, File as FileIcon, Scissors, RefreshCw, Loader2 } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import styles from './PdfSplit.module.css';

export default function PdfSplitClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocument | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageRange, setPageRange] = useState<string>('');
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

  const processFile = async (f: File) => {
    if (f.type !== 'application/pdf') {
      alert("Please upload a PDF file.");
      return;
    }
    
    try {
      setIsProcessing(true);
      const arrayBuffer = await f.arrayBuffer();
      const loadedPdf = await PDFDocument.load(arrayBuffer);
      setTotalPages(loadedPdf.getPageCount());
      setPdfDoc(loadedPdf);
      setFile(f);
      setPageRange(`1-${loadedPdf.getPageCount()}`);
    } catch (err) {
      console.error(err);
      alert("Failed to read PDF file. It might be encrypted or corrupted.");
    } finally {
      setIsProcessing(false);
    }
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

  // Parses ranges like "1-3, 5, 7-9" into an array of 0-indexed page numbers
  const parseRanges = (rangeStr: string, maxPages: number): number[] => {
    const pages = new Set<number>();
    const parts = rangeStr.split(',').map(s => s.trim()).filter(Boolean);
    
    for (const part of parts) {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-');
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end) && start > 0 && end >= start) {
          for (let i = start; i <= Math.min(end, maxPages); i++) {
            pages.add(i - 1);
          }
        }
      } else {
        const num = parseInt(part, 10);
        if (!isNaN(num) && num > 0 && num <= maxPages) {
          pages.add(num - 1);
        }
      }
    }
    
    return Array.from(pages).sort((a, b) => a - b);
  };

  const splitPdf = async () => {
    if (!pdfDoc || !file) return;

    const pageIndices = parseRanges(pageRange, totalPages);
    if (pageIndices.length === 0) {
      alert("Please enter a valid page range.");
      return;
    }

    try {
      setIsProcessing(true);
      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
      
      copiedPages.forEach((page) => {
        newPdf.addPage(page);
      });

      const newPdfFile = await newPdf.save();
      const blob = new Blob([newPdfFile as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `split-${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (err) {
      console.error(err);
      alert("An error occurred while splitting the PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPdfDoc(null);
    setTotalPages(0);
    setPageRange('');
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
            accept="application/pdf"
            className="visually-hidden" 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          {isProcessing ? (
            <Loader2 size={48} opacity={0.5} className="spinner" />
          ) : (
            <UploadCloud size={48} opacity={0.5} />
          )}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', pointerEvents: 'none' }}>
            <div>
              <h3 className="body-lg" style={{ fontWeight: 600 }}>Drag & drop a PDF here</h3>
              <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>We'll load it entirely on your device.</p>
            </div>
            <Button variant="secondary" style={{ pointerEvents: 'auto' }} onClick={(e: React.MouseEvent) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
              Choose File
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className={styles.fileItem} style={{ padding: '24px', background: 'rgba(0,0,0,0.02)' }}>
            <div className={styles.fileInfo}>
              <FileIcon size={32} color="var(--color-primary)" />
              <div>
                <div className={styles.fileName} style={{ fontSize: '18px', fontWeight: 500 }}>{file.name}</div>
                <div className={styles.fileSize} style={{ marginTop: '4px' }}>Total Pages: {totalPages}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="body-sm" style={{ fontWeight: 500 }}>Pages to Extract</label>
            <input 
              type="text" 
              value={pageRange}
              onChange={(e) => setPageRange(e.target.value)}
              placeholder="e.g. 1-3, 5, 7-9"
              style={{
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid rgba(0,0,0,0.1)',
                background: 'var(--color-surface-soft)',
                color: 'var(--color-ink)',
                fontSize: '16px',
                fontFamily: 'var(--font-mono)'
              }}
            />
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Enter page numbers and/or ranges separated by commas (e.g. 1-3, 5, 7-9)
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <Button variant="secondary" onClick={reset}>
              <RefreshCw size={18} style={{ marginRight: '8px' }} /> Pick Different PDF
            </Button>
            <Button 
              variant="primary" 
              onClick={splitPdf}
              disabled={isProcessing || !pageRange.trim()}
              style={{ flex: 1 }}
            >
              {isProcessing ? (
                <><Loader2 className="spinner" size={18} style={{ marginRight: '8px' }} /> Extracting...</>
              ) : (
                <><Scissors size={18} style={{ marginRight: '8px' }} /> Extract Selected Pages</>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
