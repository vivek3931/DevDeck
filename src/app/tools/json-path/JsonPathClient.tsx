'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styles from './JsonPath.module.css';
import { Search, AlertCircle, FileJson } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import { JSONPath } from 'jsonpath-plus';

// Simple debounce function
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function JsonPathClient() {
  const [sourceJson, setSourceJson] = useState('{\n  "store": {\n    "book": [\n      { "category": "reference",\n        "author": "Nigel Rees",\n        "title": "Sayings of the Century",\n        "price": 8.95\n      },\n      { "category": "fiction",\n        "author": "Evelyn Waugh",\n        "title": "Sword of Honour",\n        "price": 12.99\n      }\n    ],\n    "bicycle": {\n      "color": "red",\n      "price": 19.95\n    }\n  }\n}');
  const [query, setQuery] = useState('$.store.book[*].author');
  const [resultStr, setResultStr] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [resultCount, setResultCount] = useState<number>(0);

  // Debounce inputs to prevent lagging the main thread on massive JSON files
  const debouncedSource = useDebounce(sourceJson, 300);
  const debouncedQuery = useDebounce(query, 300);

  const highlight = useCallback((code: string) => {
    return Prism.highlight(code, Prism.languages.json, 'json');
  }, []);

  useEffect(() => {
    let parsedJson;
    
    // 1. Parse JSON
    try {
      if (!debouncedSource.trim()) {
        setResultStr('');
        setResultCount(0);
        setError(null);
        return;
      }
      parsedJson = JSON.parse(debouncedSource);
      setError(null);
    } catch (e: any) {
      setError(`JSON Parse Error: ${e.message}`);
      return;
    }

    // 2. Evaluate JSONPath
    try {
      if (!debouncedQuery.trim()) {
        setResultStr('');
        setResultCount(0);
        return;
      }
      const res = JSONPath({ path: debouncedQuery, json: parsedJson });
      setResultCount(res.length);
      setResultStr(JSON.stringify(res, null, 2));
    } catch (e: any) {
      setError(`JSONPath Error: ${e.message}`);
    }
  }, [debouncedSource, debouncedQuery]);

  return (
    <div className={styles.container}>
      <div className={styles.pane}>
        
        <div className={styles.queryBox}>
          <Search size={20} className={styles.queryIcon} />
          <input 
            type="text" 
            className={styles.queryInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter JSONPath (e.g. $.store.book[*].author)"
            spellCheck={false}
          />
        </div>

        {error && (
          <div className={styles.errorBox}>
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className={styles.splitView}>
          {/* Left Panel: Source JSON */}
          <div className={styles.editorPanel}>
            <div className={styles.editorHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileJson size={16} />
                <span>Source JSON</span>
              </div>
            </div>
            <div className={styles.editorWrapper}>
              <Editor
                value={sourceJson}
                onValueChange={setSourceJson}
                highlight={highlight}
                padding={16}
                className={styles.codeEditor}
                style={{ backgroundColor: 'transparent' }}
                textareaClassName="focus-visible-none"
              />
            </div>
          </div>

          {/* Right Panel: Results */}
          <div className={styles.editorPanel}>
            <div className={styles.editorHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileJson size={16} />
                <span>Evaluation Result</span>
              </div>
              <span className={styles.resultsCount}>{resultCount} matches</span>
            </div>
            <div className={styles.editorWrapper}>
              <Editor
                value={resultStr}
                onValueChange={() => {}} // Read-only
                highlight={highlight}
                padding={16}
                className={styles.codeEditor}
                style={{ backgroundColor: 'transparent' }}
                textareaClassName="focus-visible-none"
                readOnly
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
