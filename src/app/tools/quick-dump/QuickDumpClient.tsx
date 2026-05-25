'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ColorBlock } from '@/components/ui/ColorBlock';
import { Button } from '@/components/ui/Button';
import { Copy, Upload, Download, File as FileIcon, Loader2, ShieldCheck, Flame } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/useAppStore';
import { toast } from 'sonner';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css';
import styles from './QuickDump.module.css';

// --- Crypto Helpers ---
const generateKey = async () => {
  return await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
};

const exportKey = async (key: CryptoKey) => {
  const exported = await window.crypto.subtle.exportKey('raw', key);
  const bytes = new Uint8Array(exported);
  return btoa(String.fromCharCode(...Array.from(bytes)));
};

const importKey = async (base64Key: string) => {
  const binaryString = atob(base64Key);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return await window.crypto.subtle.importKey(
    'raw',
    bytes,
    'AES-GCM',
    true,
    ['encrypt', 'decrypt']
  );
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

function QuickDumpLogic() {
  const [mode, setMode] = useState<'send' | 'receive'>('send');
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [burnAfterRead, setBurnAfterRead] = useState(false);
  
  const [code, setCode] = useState('');
  const [secretKey, setSecretKey] = useState(''); // The decryption key
  
  const [receivedText, setReceivedText] = useState('');
  const [receivedFileUrl, setReceivedFileUrl] = useState('');
  const [receivedFileName, setReceivedFileName] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Timer state
  const [createdAt, setCreatedAt] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(300);

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
    const hashKey = typeof window !== 'undefined' ? window.location.hash.replace('#key=', '') : '';
    
    if (urlCode && hashKey) {
      setCode(urlCode.toUpperCase());
      setSecretKey(hashKey);
      setMode('receive');
      handleReceive(urlCode.toUpperCase(), hashKey);
    } else {
      // If no URL code, try to restore sender session from reload
      const saved = sessionStorage.getItem('qd-sender-state');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const age = Date.now() - parsed.createdAt;
          if (age < 5 * 60 * 1000) {
            setCode(parsed.code);
            setSecretKey(parsed.secretKey);
            setCreatedAt(parsed.createdAt);
            setBurnAfterRead(parsed.burnAfterRead);
            setMode('receive');
          } else {
            sessionStorage.removeItem('qd-sender-state');
          }
        } catch(e) {}
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let pollInterval: NodeJS.Timeout;
    
    if (mode === 'receive' && code && secretKey && !receivedText && !receivedFileUrl && createdAt) {
      interval = setInterval(() => {
        const elapsed = Date.now() - createdAt;
        const remaining = Math.max(0, 300 - Math.floor(elapsed / 1000));
        setTimeLeft(remaining);
        if (remaining <= 0) {
          clearInterval(interval);
          setMode('send');
          setError('Code expired.');
        }
      }, 1000);

      // Poll every 3 seconds to see if it was burned
      pollInterval = setInterval(async () => {
        const { error: dbError } = await supabase.from('dumps').select('id').eq('id', code).single();
        if (dbError && dbError.code === 'PGRST116') {
          // Record doesn't exist anymore - it was burned or expired
          clearInterval(pollInterval);
          clearInterval(interval);
          toast.info('This payload has been read and permanently burned by the recipient!', { duration: 6000 });
          sessionStorage.removeItem('qd-sender-state');
          setCode('');
          setSecretKey('');
          setMode('send');
        }
      }, 3000);
    }
    
    return () => {
      clearInterval(interval);
      clearInterval(pollInterval);
    };
  }, [mode, code, secretKey, receivedText, receivedFileUrl, createdAt]);

  const handleSend = async () => {
    if (!text.trim() && !file) return;
    setIsLoading(true);
    setError('');
    const newCode = generateCode();
    
    const toastId = toast.loading('Encrypting and uploading securely...');
    
    try {
      // 1. Prepare Payload
      let fileB64 = '';
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          throw new Error("File too large. Please keep it under 2MB for browser encryption.");
        }
        fileB64 = await fileToBase64(file);
      }
      
      const payloadObj = {
        text,
        fileName: file?.name || '',
        fileData: fileB64,
      };
      const payloadStr = JSON.stringify(payloadObj);

      // 2. Encrypt locally
      const key = await generateKey();
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const encBuffer = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        new TextEncoder().encode(payloadStr)
      );

      // Combine IV and Ciphertext for storage
      const combined = new Uint8Array(iv.length + encBuffer.byteLength);
      combined.set(iv, 0);
      combined.set(new Uint8Array(encBuffer), iv.length);
      const blobToUpload = new Blob([combined], { type: 'application/octet-stream' });

      // 3. Upload encrypted blob
      const { error: uploadError } = await supabase.storage.from('dumps').upload(newCode, blobToUpload);
      if (uploadError) throw uploadError;

      // 4. Save metadata (No plain text or filenames!)
      const { error: dbError } = await supabase.from('dumps').insert({
        id: newCode,
        timestamp: Date.now(),
        burnAfterRead: burnAfterRead
      });
      if (dbError) throw dbError;

      // 5. Generate share URL with exported key
      const exportedKey = await exportKey(key);
      const now = Date.now();
      
      setCode(newCode);
      setSecretKey(exportedKey);
      setCreatedAt(now);
      setTimeLeft(300);
      
      sessionStorage.setItem('qd-sender-state', JSON.stringify({
        code: newCode,
        secretKey: exportedKey,
        createdAt: now,
        burnAfterRead: burnAfterRead
      }));

      addAuditLog('Sent Quick Dump', `Code: ${newCode} (Encrypted)`);
      toast.dismiss(toastId);
      toast.success('Encrypted link generated successfully!');
      setMode('receive');
    } catch (err: any) {
      console.error(err);
      const msg = err.message || 'Failed to securely upload data.';
      setError(msg);
      toast.dismiss(toastId);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReceive = async (codeToFetch = code, keyToUse = secretKey) => {
    if (!codeToFetch) {
      const msg = 'Please enter a sync code or paste the full link.';
      setError(msg);
      toast.error(msg);
      return;
    }
    if (!keyToUse) {
      const msg = 'Decryption key is missing! You need the full link (including the #key part) or the secret key to decrypt this data.';
      setError(msg);
      toast.error(msg);
      return;
    }

    setIsLoading(true);
    setError('');
    setReceivedText('');
    setReceivedFileUrl('');
    setReceivedFileName('');
    
    const toastId = toast.loading('Fetching and decrypting data...');

    try {
      // 1. Fetch metadata
      const { data: dbData, error: dbError } = await supabase.from('dumps').select('*').eq('id', codeToFetch).single();

      if (dbError || !dbData) {
        throw new Error('Code not found or has already been burned/expired.');
      }

      const ageInMs = Date.now() - dbData.timestamp;
      if (ageInMs > 5 * 60 * 1000) {
        await cleanupDump(codeToFetch);
        throw new Error('Code expired (older than 5 minutes).');
      }

      // 2. Fetch encrypted blob
      const { data: blobData, error: downloadError } = await supabase.storage.from('dumps').download(codeToFetch);
      if (downloadError || !blobData) throw new Error('Failed to download encrypted blob.');

      // 3. Burn after read if enabled (Delete before decrypting)
      if (dbData.burnAfterRead) {
        await cleanupDump(codeToFetch);
      }

      // 4. Decrypt locally
      const buffer = await blobData.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const iv = bytes.slice(0, 12);
      const ciphertext = bytes.slice(12);

      const cryptoKey = await importKey(keyToUse);
      let decryptedBuffer;
      try {
        decryptedBuffer = await window.crypto.subtle.decrypt(
          { name: 'AES-GCM', iv },
          cryptoKey,
          ciphertext
        );
      } catch (decErr) {
        throw new Error("Decryption failed. The secret key is invalid or corrupted.");
      }

      const decryptedStr = new TextDecoder().decode(decryptedBuffer);
      const payloadObj = JSON.parse(decryptedStr);

      setReceivedText(payloadObj.text);
      setReceivedFileName(payloadObj.fileName);
      
      // If there's file data, we don't use Supabase URL, we create a local Object URL
      if (payloadObj.fileData) {
        setReceivedFileUrl(payloadObj.fileData);
      }

      addAuditLog('Received Quick Dump', `Code: ${codeToFetch}`);
      toast.dismiss(toastId);
      toast.success('Decrypted locally!');
      
    } catch (err: any) {
      console.error(err);
      const msg = err.message || 'Failed to fetch or decrypt data.';
      setError(msg);
      toast.dismiss(toastId);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const cleanupDump = async (dumpCode: string) => {
    try {
      await supabase.from('dumps').delete().eq('id', dumpCode);
      await supabase.storage.from('dumps').remove([dumpCode]);
    } catch (e) {
      console.error('Cleanup failed', e);
    }
  };

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      addToClipboardHistory(content);
      addAuditLog('Copied Quick Dump', 'Copied dump content to clipboard');
      toast.success('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy', err);
      toast.error('Failed to copy');
    }
  };

  const handleLinkInput = (input: string) => {
    try {
      const url = new URL(input);
      const c = url.searchParams.get('code');
      const k = url.hash.replace('#key=', '');
      if (c && k) {
        setCode(c);
        setSecretKey(k);
        return;
      }
    } catch(e) {}
    setCode(input);
  };

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/tools/quick-dump?code=${code}#key=${secretKey}` : '';

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <article>
      <ColorBlock color="navy">
        <h1 className="display-lg">Quick Dump</h1>
        <p className="subhead" style={{ marginTop: 'var(--spacing-sm)' }}>
          Secure, temporary text & file syncing. <ShieldCheck size={16} style={{display:'inline', verticalAlign:'text-bottom', color:'var(--color-block-lime)'}}/> End-to-End Encrypted.
        </p>

        <div className={styles.toolCard}>
          <div className={styles.tabs}>
            <button 
              className={mode === 'send' ? styles.tabActive : styles.tab} 
              onClick={() => { 
                setMode('send'); 
                setCode(''); 
                setSecretKey(''); 
                setReceivedText(''); 
                setReceivedFileUrl(''); 
                sessionStorage.removeItem('qd-sender-state');
              }}
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
              <Editor 
                className={styles.textarea}
                value={text}
                onValueChange={setText}
                highlight={code => Prism.highlight(code, Prism.languages.json, 'json')}
                padding={16}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 16,
                  backgroundColor: 'transparent',
                  outline: 'none',
                }}
                textareaClassName="editor-textarea"
                placeholder="Paste code, API payload, or links here..."
              />
              
              <div className={styles.fileUploadArea} onClick={() => fileInputRef.current?.click()}>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <FileIcon size={24} style={{ opacity: 0.7 }} />
                <span className="body-sm">{file ? file.name : 'Optional: Attach a file (Max 2MB for Local Encryption)'}</span>
              </div>

              <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox" 
                  id="burn" 
                  checked={burnAfterRead} 
                  onChange={(e) => setBurnAfterRead(e.target.checked)} 
                  style={{ accentColor: 'var(--color-block-red)', width: '16px', height: '16px' }}
                />
                <label htmlFor="burn" className="body-sm" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Flame size={16} color="var(--color-block-red)" />
                  Burn after read (destroy instantly upon viewing)
                </label>
              </div>

              {error && <p className="body-sm" style={{ color: '#ff6b6b', marginTop: 'var(--spacing-sm)' }}>{error}</p>}
              
              <Button 
                variant="primary" 
                onClick={handleSend} 
                disabled={isLoading || (!text.trim() && !file)} 
                style={{ alignSelf: 'flex-start', marginTop: 'var(--spacing-md)' }}
              >
                {isLoading ? <Loader2 size={20} className="spinner" /> : 'Encrypt & Generate Link'}
              </Button>
            </div>
          )}

          {(mode === 'receive' || code) && (
            <div className={styles.pane}>
              {code && secretKey && !receivedText && !receivedFileUrl ? (
                <div className={styles.successScreen}>
                  <div className={styles.codeDisplay}>
                    <span className="eyebrow" style={{ color: 'var(--color-block-lime)' }}><ShieldCheck size={14} style={{display:'inline', verticalAlign:'text-bottom'}}/> Encrypted Success</span>
                    <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', gap: 'var(--spacing-sm)' }}>
                       <input 
                         type="text" 
                         readOnly 
                         value={shareUrl} 
                         className={styles.shareUrlInput}
                       />
                       <Button variant="primary" onClick={() => copyToClipboard(shareUrl)} className={styles.copyShareBtn}>Copy</Button>
                    </div>
                    <p className={styles.helpText}>
                      This link contains the <strong>secret decryption key</strong> in the URL hash. Do not lose it!
                    </p>
                    
                    {createdAt && (
                      <div style={{ marginTop: 'var(--spacing-lg)', background: 'rgba(0,0,0,0.2)', padding: 'var(--spacing-md)', borderRadius: 'var(--rounded-md)'}}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                          <span className="eyebrow" style={{ color: 'var(--color-block-orange)' }}>Self Destruct Timer</span>
                          <span className={styles.timerText}>{minutes}:{seconds}</span>
                        </div>
                        {burnAfterRead ? (
                          <div className={styles.burnText}>
                            <Flame size={16} /> Burn After Read Enabled (1 view only)
                          </div>
                        ) : (
                          <div className={styles.helpText} style={{ marginTop: 0 }}>
                            Link expires and deletes permanently in 5 minutes.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className={styles.qrDisplay}>
                    <span className="eyebrow" style={{ marginBottom: '8px', display: 'block' }}>Scan to Open</span>
                    <div className={styles.qrWrapper}>
                      <QRCodeSVG value={shareUrl} size={140} level="L" includeMargin={true} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.receiveForm}>
                  <label className="eyebrow">Enter Share Link</label>
                  <div style={{ display: 'flex', gap: 'var(--spacing-sm)', maxWidth: '500px' }}>
                    <input 
                      type="text" 
                      className={styles.codeInput} 
                      value={code} 
                      onChange={(e) => handleLinkInput(e.target.value)}
                      placeholder="https://... or Code"
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  {(!secretKey && code.length > 0 && !code.startsWith('http')) && (
                     <div style={{ marginTop: 'var(--spacing-sm)', display: 'flex', gap: 'var(--spacing-sm)', maxWidth: '500px' }}>
                       <input 
                        type="text" 
                        className={styles.codeInput} 
                        value={secretKey} 
                        onChange={(e) => setSecretKey(e.target.value)}
                        placeholder="Secret Key (from URL hash)"
                        style={{ width: '100%' }}
                      />
                     </div>
                  )}

                  <Button 
                    variant="primary" 
                    onClick={() => handleReceive(code, secretKey)} 
                    disabled={isLoading}
                    style={{ marginTop: 'var(--spacing-md)', alignSelf: 'flex-start' }}
                  >
                    {isLoading ? <Loader2 size={16} className="spinner" /> : 'Decrypt & Fetch'}
                  </Button>
                  
                  {error && <p className="body-sm" style={{ color: '#ff6b6b', marginTop: 'var(--spacing-sm)' }}>{error}</p>}
                </div>
              )}

              {(receivedText || receivedFileUrl) && (
                <div className={styles.resultBox} style={{ marginTop: 'var(--spacing-xl)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--spacing-md)', color: 'var(--color-block-lime)' }}>
                    <ShieldCheck size={18} /> <span className="eyebrow" style={{color:'inherit', margin:0}}>Decrypted Locally</span>
                  </div>

                  {receivedText && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-sm)' }}>
                        <span className="eyebrow">Dump Content</span>
                        <Button variant="secondary" size="icon" onClick={() => copyToClipboard(receivedText)}>
                          <Copy size={16} />
                        </Button>
                      </div>
                      <Editor
                        className={styles.pre}
                        value={receivedText}
                        onValueChange={() => {}}
                        highlight={code => Prism.highlight(code, Prism.languages.json, 'json')}
                        padding={16}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 14,
                          backgroundColor: 'transparent',
                          outline: 'none',
                        }}
                        disabled
                      />
                    </>
                  )}
                  
                  {receivedFileUrl && (
                    <div className={styles.fileAttachment}>
                      <FileIcon size={24} />
                      <span className="body-sm" style={{ flexGrow: 1 }}>{receivedFileName}</span>
                      <a href={receivedFileUrl} download={receivedFileName} onClick={() => toast.success('Download started')}>
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
