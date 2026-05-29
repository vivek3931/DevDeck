'use client';

import React, { useState, useRef, useMemo, useCallback } from 'react';
import styles from './LogAnalyzer.module.css';
import { Upload, Search, FileText, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Configuration
const CHUNK_SIZE = 500; // Render 500 lines at a time to prevent DOM freezing

type Severity = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG' | 'OTHER';

interface LogLine {
  id: number;
  originalIndex: number;
  content: string;
  severity: Severity;
}

export default function LogAnalyzerClient() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Entire log loaded into memory
  const [allLines, setAllLines] = useState<LogLine[]>([]);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSeverities, setActiveSeverities] = useState<Record<Severity, boolean>>({
    ERROR: true,
    WARN: true,
    INFO: true,
    DEBUG: true,
    OTHER: true
  });
  
  // Pagination
  const [renderLimit, setRenderLimit] = useState(CHUNK_SIZE);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parse a single line to determine severity
  const parseSeverity = (line: string): Severity => {
    const upperLine = line.toUpperCase();
    if (upperLine.includes('ERROR') || upperLine.includes('FATAL') || upperLine.includes('EXCEPTION')) return 'ERROR';
    if (upperLine.includes('WARN')) return 'WARN';
    if (upperLine.includes('INFO')) return 'INFO';
    if (upperLine.includes('DEBUG') || upperLine.includes('TRACE')) return 'DEBUG';
    return 'OTHER';
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;
    
    setIsLoading(true);
    setFileName(file.name);
    setFileSize(file.size);
    setRenderLimit(CHUNK_SIZE);
    
    // We use FileReader to read the file into memory. 
    // Browsers can easily hold a 50MB string in memory.
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        // Split by newline and parse
        const lines = text.split(/\r?\n/);
        const parsedLines: LogLine[] = lines.map((content, index) => ({
          id: index,
          originalIndex: index + 1,
          content,
          severity: parseSeverity(content)
        }));
        
        // Filter out empty trailing line if exists
        if (parsedLines.length > 0 && parsedLines[parsedLines.length - 1].content === '') {
          parsedLines.pop();
        }
        
        setAllLines(parsedLines);
      }
      setIsLoading(false);
    };
    
    reader.onerror = () => {
      alert("Failed to read file.");
      setIsLoading(false);
    };
    
    reader.readAsText(file);
  };

  const toggleSeverity = (sev: Severity) => {
    setActiveSeverities(prev => ({ ...prev, [sev]: !prev[sev] }));
    setRenderLimit(CHUNK_SIZE); // Reset pagination on filter change
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setRenderLimit(CHUNK_SIZE); // Reset pagination
  };

  const clearFile = () => {
    setAllLines([]);
    setFileName(null);
    setFileSize(0);
    setSearchTerm('');
    setRenderLimit(CHUNK_SIZE);
  };

  // Derive the filtered list
  const filteredLines = useMemo(() => {
    if (allLines.length === 0) return [];
    
    const lowerSearch = searchTerm.toLowerCase();
    
    return allLines.filter(line => {
      // 1. Check severity toggle
      if (!activeSeverities[line.severity]) return false;
      
      // 2. Check search term
      if (lowerSearch && !line.content.toLowerCase().includes(lowerSearch)) return false;
      
      return true;
    });
  }, [allLines, activeSeverities, searchTerm]);

  // Derive the sliced list to render
  const linesToRender = useMemo(() => {
    return filteredLines.slice(0, renderLimit);
  }, [filteredLines, renderLimit]);

  // Derive Stats
  const stats = useMemo(() => {
    const s = { ERROR: 0, WARN: 0, INFO: 0, DEBUG: 0, OTHER: 0, TOTAL: allLines.length };
    for (let i = 0; i < allLines.length; i++) {
      s[allLines[i].severity]++;
    }
    return s;
  }, [allLines]);

  return (
    <div className={styles.container}>
      <div className={styles.pane}>
        
        {allLines.length === 0 ? (
          // Upload View
          <div 
            className={`${styles.uploadArea} ${isDragging ? styles.dragging : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileUpload(e.dataTransfer.files[0]);
              }
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept=".log,.txt,text/plain"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) handleFileUpload(e.target.files[0]);
              }}
            />
            {isLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div className="spinner"></div>
                <p>Loading massive file into memory...</p>
              </div>
            ) : (
              <>
                <Upload size={48} color="rgba(255,255,255,0.5)" />
                <h3 className="body-lg">Drop your massive .log file here</h3>
                <p className="body-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Processed entirely in your browser memory. No server limits.</p>
                <Button variant="inverse" style={{ marginTop: '16px' }}>Select File</Button>
              </>
            )}
          </div>
        ) : (
          // Analyzer View
          <>
            <div className={styles.toolbar}>
              <div className={styles.searchBox}>
                <Search size={18} style={{ opacity: 0.5 }} />
                <input 
                  type="text" 
                  className={styles.searchInput}
                  placeholder="Filter log output..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              
              <div className={styles.filterGroup}>
                <button className={`${styles.filterBtn} ${activeSeverities.ERROR ? styles.active : ''}`} onClick={() => toggleSeverity('ERROR')}>
                  ERROR ({stats.ERROR})
                </button>
                <button className={`${styles.filterBtn} ${activeSeverities.WARN ? styles.active : ''}`} onClick={() => toggleSeverity('WARN')}>
                  WARN ({stats.WARN})
                </button>
                <button className={`${styles.filterBtn} ${activeSeverities.INFO ? styles.active : ''}`} onClick={() => toggleSeverity('INFO')}>
                  INFO ({stats.INFO})
                </button>
                <button className={`${styles.filterBtn} ${activeSeverities.DEBUG ? styles.active : ''}`} onClick={() => toggleSeverity('DEBUG')}>
                  DEBUG ({stats.DEBUG})
                </button>
              </div>
              
              <div style={{ flex: 1 }} />
              
              <Button variant="secondary" onClick={clearFile} size="sm">
                <X size={16} style={{ marginRight: '4px' }} /> Clear File
              </Button>
            </div>

            <div className={styles.statsRow}>
              <span>{fileName} ({(fileSize / 1024 / 1024).toFixed(2)} MB)</span>
              <span>Showing {linesToRender.length} of {filteredLines.length} filtered lines</span>
            </div>

            <div className={styles.logViewer}>
              <div className={styles.logLines}>
                {linesToRender.length === 0 ? (
                  <div style={{ padding: '32px', textAlign: 'center', opacity: 0.5 }}>
                    No lines match your current filters.
                  </div>
                ) : (
                  linesToRender.map((line) => (
                    <div key={line.id} className={styles.logLine}>
                      <div className={styles.lineNumber}>{line.originalIndex}</div>
                      <div className={`${styles.logContent} ${styles[`severity-${line.severity}`]}`}>
                        {line.content}
                      </div>
                    </div>
                  ))
                )}
                
                {renderLimit < filteredLines.length && (
                  <button 
                    className={styles.loadMoreBtn} 
                    onClick={() => setRenderLimit(prev => prev + CHUNK_SIZE)}
                  >
                    Load next {Math.min(CHUNK_SIZE, filteredLines.length - renderLimit)} lines...
                  </button>
                )}
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
              <AlertTriangle size={14} />
              <span>DOM Protection Active: Rendering is restricted to {CHUNK_SIZE} lines at a time to prevent browser crashes.</span>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
