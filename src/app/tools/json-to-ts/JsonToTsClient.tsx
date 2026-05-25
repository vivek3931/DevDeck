'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import styles from './JsonToTs.module.css';
import { Copy, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-tomorrow.css';

export default function JsonToTsClient() {
  const [jsonInput, setJsonInput] = useState('');
  const [tsOutput, setTsOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jsonInput.trim()) {
      setTsOutput('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      const output = generateTsInterfaces(parsed, 'Root');
      setTsOutput(output);
      setError(null);
    } catch (e: any) {
      setError('Invalid JSON: ' + e.message);
    }
  }, [jsonInput]);

  const copyToClipboard = () => {
    if (!tsOutput || !tsOutput.trim()) {
      toast.error('Nothing to copy!');
      return;
    }
    navigator.clipboard.writeText(tsOutput);
    toast.success('TypeScript code copied to clipboard!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.pane}>
        <div className={styles.paneHeader}>
          <span style={{ fontWeight: 600 }}>JSON Input</span>
          <Button onClick={() => setJsonInput('')} variant="secondary" size="sm">Clear</Button>
        </div>
        <div className={styles.textarea} style={{ padding: 0, overflow: 'hidden', minHeight: '400px' }}>
          <Editor
            value={jsonInput}
            onValueChange={setJsonInput}
            highlight={code => Prism.highlight(code, Prism.languages.json, 'json')}
            padding={16}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              minHeight: '400px',
              backgroundColor: 'transparent',
              outline: 'none',
            }}
            textareaClassName="editor-textarea"
            placeholder="Paste your JSON payload here..."
          />
        </div>
        {error && (
          <div style={{ color: '#ff6b6b', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={16} /> {error}
          </div>
        )}
      </div>

      <div className={styles.pane}>
        <div className={styles.paneHeader}>
          <span style={{ fontWeight: 600 }}>TypeScript Interfaces</span>
          <Button onClick={copyToClipboard} variant="primary" size="sm">
            <Copy size={16} style={{ marginRight: '6px' }} /> Copy Code
          </Button>
        </div>
        <div className={styles.textarea} style={{ padding: 0, overflow: 'hidden', minHeight: '400px' }}>
          <Editor
            value={tsOutput}
            onValueChange={() => {}}
            highlight={code => Prism.highlight(code, Prism.languages.typescript, 'typescript')}
            padding={16}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              minHeight: '400px',
              backgroundColor: 'transparent',
              outline: 'none',
            }}
            disabled
            placeholder="TypeScript interfaces will appear here..."
          />
        </div>
      </div>
    </div>
  );
}

// --- Generator Logic ---

function generateTsInterfaces(obj: any, rootName: string = 'Root'): string {
  const interfaces: Map<string, string> = new Map();
  
  function singularize(word: string): string {
    if (word.endsWith('ies')) return word.slice(0, -3) + 'y';
    if (word.endsWith('s') && word.length > 1) return word.slice(0, -1);
    return word + 'Item';
  }

  function parseType(value: any, key: string): string {
    if (value === null) return 'null';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'any[]';
      
      // Merge all types in the array
      const types = new Set<string>();
      let hasObject = false;
      let mergedObject = {};

      for (const item of value) {
        if (item === null) types.add('null');
        else if (Array.isArray(item)) types.add('any[]');
        else if (typeof item === 'object') {
          hasObject = true;
          mergedObject = { ...mergedObject, ...item };
        }
        else types.add(typeof item);
      }

      if (hasObject) {
        const interfaceName = capitalize(singularize(key));
        if (!interfaces.has(interfaceName) || Object.keys(mergedObject).length > 0) {
           interfaces.set(interfaceName, generateInterface(mergedObject, interfaceName));
        }
        types.add(interfaceName);
      }

      const typeArray = Array.from(types);
      if (typeArray.length === 1) return `${typeArray[0]}[]`;
      return `(${typeArray.join(' | ')})[]`;
    }
    
    if (typeof value === 'object') {
      const interfaceName = capitalize(key);
      // We can have multiple interfaces with same name if nested? Just overwrite for now to be simple
      interfaces.set(interfaceName, generateInterface(value, interfaceName));
      return interfaceName;
    }
    return typeof value;
  }

  function generateInterface(o: any, name: string): string {
    if (o === null || typeof o !== 'object') return '';
    let str = `export interface ${name} {\n`;
    for (const [k, v] of Object.entries(o)) {
      // Validate key for invalid characters
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : `'${k}'`;
      const type = parseType(v, k);
      str += `  ${safeKey}: ${type};\n`;
    }
    str += `}\n`;
    return str;
  }

  if (Array.isArray(obj)) {
    const itemType = parseType(obj, rootName);
    interfaces.set('RootType', `export type ${rootName} = ${itemType};\n`);
  } else {
    const rootInterface = generateInterface(obj, rootName);
    if (rootInterface) {
       interfaces.set(rootName, rootInterface);
    }
  }

  // Reverse so Root is at the bottom
  return Array.from(interfaces.values()).reverse().join('\n');
}

function capitalize(s: string) {
  if (!s) return 'AnyObject';
  return s.charAt(0).toUpperCase() + s.slice(1);
}
