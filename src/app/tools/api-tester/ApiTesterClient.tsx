'use client';

import React, { useState } from 'react';
import styles from './ApiTester.module.css';
import { Button } from '@/components/ui/Button';
import { Play, Plus, Trash2, Loader2, Code, ShieldCheck } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css';
import { toast } from 'sonner';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

interface KeyValue {
  id: number;
  key: string;
  value: string;
}

export default function ApiTesterClient() {
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
  
  const [activeTab, setActiveTab] = useState<'headers' | 'body'>('headers');
  
  const [headers, setHeaders] = useState<KeyValue[]>([
    { id: 1, key: 'Accept', value: 'application/json' },
    { id: 2, key: 'Content-Type', value: 'application/json' }
  ]);
  
  const [body, setBody] = useState('{\n  \n}');
  
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const addHeader = () => {
    setHeaders([...headers, { id: Date.now(), key: '', value: '' }]);
  };

  const removeHeader = (id: number) => {
    setHeaders(headers.filter(h => h.id !== id));
  };

  const updateHeader = (id: number, field: 'key' | 'value', val: string) => {
    setHeaders(headers.map(h => h.id === id ? { ...h, [field]: val } : h));
  };

  const handleSend = async () => {
    if (!url.trim()) {
      toast.error('URL is required');
      return;
    }

    setIsLoading(true);
    setResponse(null);

    // Build headers object safely, ignoring empty keys
    const headersObj: Record<string, string> = {};
    headers.forEach(h => {
      if (h.key.trim()) {
        headersObj[h.key.trim()] = h.value.trim();
      }
    });

    let parsedBody = undefined;
    if (method !== 'GET' && method !== 'HEAD' && body.trim()) {
      try {
        parsedBody = JSON.parse(body);
      } catch (e) {
        // If it's not valid JSON, send as string
        parsedBody = body;
      }
    }

    try {
      // Proxy the request through our Next.js backend to bypass CORS
      const res = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: url.trim(),
          method,
          headers: headersObj,
          payload: parsedBody
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to proxy request');
      }

      setResponse(data);
      toast.success(`Received ${data.status} ${data.statusText}`);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'An error occurred');
      setResponse({
        error: error.message,
        status: 0,
        statusText: 'Network Error',
        time: 0
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.pane}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-block-lime)', marginBottom: '8px' }}>
          <ShieldCheck size={16} />
          <span className="caption">CORS Bypass Proxy Active</span>
        </div>

        {/* Request Bar */}
        <div className={styles.requestBar}>
          <select 
            className={styles.methodSelect} 
            value={method} 
            onChange={(e) => setMethod(e.target.value as HttpMethod)}
          >
            {['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <input 
            type="text" 
            className={styles.urlInput} 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com/v1/users"
          />
          <Button variant="inverse" onClick={handleSend} disabled={isLoading} style={{ minWidth: '100px' }}>
            {isLoading ? <Loader2 size={18} className="spinner" /> : <><Play size={16} style={{ marginRight: '6px' }}/> Send</>}
          </Button>
        </div>

        {/* Configuration Tabs */}
        <div className={styles.tabs}>
          <button 
            className={activeTab === 'headers' ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab('headers')}
          >
            Headers ({headers.filter(h => h.key).length})
          </button>
          <button 
            className={activeTab === 'body' ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab('body')}
          >
            Body
          </button>
        </div>

        {/* Headers Editor */}
        {activeTab === 'headers' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {headers.map(h => (
              <div key={h.id} className={styles.kvRow}>
                <input 
                  type="text" 
                  className={styles.kvInput} 
                  placeholder="Key" 
                  value={h.key}
                  onChange={(e) => updateHeader(h.id, 'key', e.target.value)}
                />
                <input 
                  type="text" 
                  className={styles.kvInput} 
                  placeholder="Value" 
                  value={h.value}
                  onChange={(e) => updateHeader(h.id, 'value', e.target.value)}
                />
                <Button variant="icon-inverse" size="icon" onClick={() => removeHeader(h.id)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            <Button variant="secondary" onClick={addHeader} size="sm" style={{ alignSelf: 'flex-start' }}>
              <Plus size={16} style={{ marginRight: '4px' }} /> Add Header
            </Button>
          </div>
        )}

        {/* Body Editor */}
        {activeTab === 'body' && (
          <div className={styles.editorContainer}>
            <Editor
              value={body}
              onValueChange={setBody}
              highlight={code => Prism.highlight(code, Prism.languages.json, 'json')}
              padding={16}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                backgroundColor: 'transparent',
                outline: 'none',
                minHeight: '200px'
              }}
              textareaClassName="editor-textarea"
              placeholder="{\n  // JSON body here\n}"
            />
          </div>
        )}

        {/* Response Panel */}
        {response && (
          <div className={styles.responsePanel}>
            <div className={styles.responseMeta}>
              <span className={response.status >= 200 && response.status < 300 ? styles.statusGreen : styles.statusRed}>
                Status: {response.status} {response.statusText}
              </span>
              <span>Time: {response.time} ms</span>
            </div>
            <div className={styles.responseBody}>
              {response.error ? (
                <div style={{ color: '#f14c4c', fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
                  {response.error}
                </div>
              ) : (
                <pre className={styles.pre}>
                  <code dangerouslySetInnerHTML={{ __html: Prism.highlight(
                    typeof response.data === 'string' ? response.data : JSON.stringify(response.data, null, 2),
                    Prism.languages.json,
                    'json'
                  )}}></code>
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
