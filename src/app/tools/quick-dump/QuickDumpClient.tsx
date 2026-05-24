'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ColorBlock } from '@/components/ui/ColorBlock';
import { Button } from '@/components/ui/Button';
import { Copy, Upload, Download, File as FileIcon, Loader2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { db, storage } from '@/lib/firebase';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { useAppStore } from '@/store/useAppStore';
import styles from './QuickDump.module.css';

function QuickDumpLogic() {
  const [mode, setMode] = useState<'send' | 'receive'>('send');
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  
  const [code, setCode] = useState('');
  const [receivedText, setReceivedText] = useState('');
  const [receivedFileUrl, setReceivedFileUrl] = useState('');
  const [receivedFileName, setReceivedFileName] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addAuditLog, addToClipboardHistory } = useAppStore();
  const searchParams = useSearchParams();

  const generateCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  useEffect(() => {
    const urlCode = searchParams.get('code');
    if (urlCode && urlCode.length === 4) {
      setCode(urlCode.toUpperCase());
      setMode('receive');
      handleReceive(urlCode.toUpperCase());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSend = async () => {
    if (!text.trim() && !file) return;
    setIsLoading(true);
    setError('');
    const newCode = generateCode();
    
    try {
      let fileUrl = '';
      let fileName = '';
      
      if (file) {
        // Upload to Firebase Storage
        const storageRef = ref(storage, `dumps/${newCode}_${file.name}`);
        await uploadBytes(storageRef, file);
        fileUrl = await getDownloadURL(storageRef);
        fileName = file.name;
      }

      // Save metadata to Firestore
      await setDoc(doc(db, 'dumps', newCode), {
        text: text,
        fileUrl: fileUrl,
        fileName: fileName,
        timestamp: Date.now()
      });

      setCode(newCode);
      addAuditLog('Sent Quick Dump', `Code: ${newCode}${file ? ' (with file)' : ''}`);
      setMode('receive');
    } catch (err: any) {
      console.error(err);
      setError('Failed to upload data. Have you configured Firebase credentials in .env.local?');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReceive = async (codeToFetch = code) => {
    if (codeToFetch.length !== 4) return;
    setIsLoading(true);
    setError('');
    setReceivedText('');
    setReceivedFileUrl('');
    setReceivedFileName('');

    try {
      const docRef = doc(db, 'dumps', codeToFetch);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const ageInMs = Date.now() - data.timestamp;
        
        // 5 minute expiration
        if (ageInMs > 5 * 60 * 1000) {
          setError('Code expired (older than 5 minutes).');
          await cleanupDump(codeToFetch, data.fileName);
        } else {
          setReceivedText(data.text);
          setReceivedFileUrl(data.fileUrl);
          setReceivedFileName(data.fileName);
          addAuditLog('Received Quick Dump', `Code: ${codeToFetch}`);
        }
      } else {
        setError('Code not found.');
      }
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch data. Is Firebase configured correctly?');
    } finally {
      setIsLoading(false);
    }
  };

  const cleanupDump = async (dumpCode: string, fileName: string) => {
    try {
      await deleteDoc(doc(db, 'dumps', dumpCode));
      if (fileName) {
        await deleteObject(ref(storage, `dumps/${dumpCode}_${fileName}`));
      }
    } catch (e) {
      console.error('Cleanup failed', e);
    }
  };

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      addToClipboardHistory(content);
      addAuditLog('Copied Quick Dump', 'Copied dump content to clipboard');
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/tools/quick-dump?code=${code}` : '';

  return (
    <article style={{ marginTop: 'var(--spacing-section)' }}>
      <ColorBlock color="navy">
        <h1 className="display-lg">Quick Dump</h1>
        <p className="subhead" style={{ marginTop: 'var(--spacing-sm)' }}>
          Secure, temporary text & file syncing. Data self-destructs in 5 minutes.
        </p>

        <div className={styles.toolCard}>
          <div className={styles.tabs}>
            <button 
              className={mode === 'send' ? styles.tabActive : styles.tab} 
              onClick={() => { setMode('send'); setCode(''); setReceivedText(''); setReceivedFileUrl(''); }}
            >
              <Upload size={16} /> Send Data
            </button>
            <button 
              className={mode === 'receive' ? styles.tabActive : styles.tab} 
              onClick={() => { setMode('receive'); setText(''); setFile(null); }}
            >
              <Download size={16} /> Receive Data
            </button>
          </div>

          {mode === 'send' && !code && (
            <div className={styles.pane}>
              <textarea 
                className={styles.textarea}
                placeholder="Paste code, API payload, or links here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              
              <div className={styles.fileUploadArea} onClick={() => fileInputRef.current?.click()}>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <FileIcon size={24} style={{ opacity: 0.7 }} />
                <span className="body-sm">{file ? file.name : 'Optional: Attach a file (Max 10MB)'}</span>
              </div>

              {error && <p className="body-sm" style={{ color: '#ff6b6b', marginTop: 'var(--spacing-sm)' }}>{error}</p>}
              
              <Button 
                variant="primary" 
                onClick={handleSend} 
                disabled={isLoading || (!text.trim() && !file)} 
                style={{ alignSelf: 'flex-start', marginTop: 'var(--spacing-md)' }}
              >
                {isLoading ? <Loader2 size={20} className="spinner" /> : 'Generate 4-Letter Code'}
              </Button>
            </div>
          )}

          {(mode === 'receive' || code) && (
            <div className={styles.pane}>
              {code && !receivedText && !receivedFileUrl ? (
                <div className={styles.successScreen}>
                  <div className={styles.codeDisplay}>
                    <span className="eyebrow">Your Sync Code</span>
                    <div className={styles.bigCode}>{code}</div>
                    <p className="body-sm" style={{ opacity: 0.8 }}>Use this code on another device within 5 minutes.</p>
                  </div>
                  
                  <div className={styles.qrDisplay}>
                    <span className="eyebrow" style={{ marginBottom: '8px', display: 'block' }}>Scan to Open Directly</span>
                    <div className={styles.qrWrapper}>
                      <QRCodeSVG value={shareUrl} size={160} level="Q" includeMargin={true} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.receiveForm}>
                  <label className="eyebrow">Enter 4-Letter Code</label>
                  <div style={{ display: 'flex', gap: 'var(--spacing-sm)', maxWidth: '300px' }}>
                    <input 
                      type="text" 
                      maxLength={4} 
                      className={styles.codeInput} 
                      value={code} 
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      placeholder="e.g. A9B4"
                    />
                    <Button variant="primary" onClick={() => handleReceive(code)} disabled={isLoading}>
                      {isLoading ? <Loader2 size={16} className="spinner" /> : 'Fetch'}
                    </Button>
                  </div>
                  {error && <p className="body-sm" style={{ color: '#ff6b6b', marginTop: 'var(--spacing-sm)' }}>{error}</p>}
                </div>
              )}

              {(receivedText || receivedFileUrl) && (
                <div className={styles.resultBox} style={{ marginTop: 'var(--spacing-xl)' }}>
                  {receivedText && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-sm)' }}>
                        <span className="eyebrow">Dump Content</span>
                        <Button variant="secondary" size="icon" onClick={() => copyToClipboard(receivedText)}>
                          <Copy size={16} />
                        </Button>
                      </div>
                      <pre className={styles.pre}>{receivedText}</pre>
                    </>
                  )}
                  
                  {receivedFileUrl && (
                    <div className={styles.fileAttachment}>
                      <FileIcon size={24} />
                      <span className="body-sm" style={{ flexGrow: 1 }}>{receivedFileName}</span>
                      <a href={receivedFileUrl} download target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary" size="icon"><Download size={16} /></Button>
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </ColorBlock>
    </article>
  );
}

export default function QuickDumpClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuickDumpLogic />
    </Suspense>
  );
}
