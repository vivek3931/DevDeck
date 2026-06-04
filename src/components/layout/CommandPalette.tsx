'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import styles from './CommandPalette.module.css';

const TOOLS = [
  { name: 'Text Toolkit', path: '/text/text-toolkit' },
  { name: 'QR Code Generator', path: '/image/vector-qr-code-generator' },
  { name: 'JWT Decoder', path: '/dev/secure-jwt-decoder' },
  { name: 'Quick Dump', path: '/dev/secure-code-snippet-bin' },
  { name: 'Image Compressor', path: '/image/free-online-image-compressor' },
  { name: 'JSON Formatter & Validator', path: '/dev/json-formatter-validator' },
  { name: 'Hash Generator', path: '/dev/md5-sha256-hash-generator' },
  { name: 'JSON to TS Converter', path: '/dev/json-to-typescript-interface-converter' },
  { name: 'cURL to Fetch Converter', path: '/dev/curl-to-code-converter' },
  { name: 'SVG to React Converter', path: '/image/svg-to-react-jsx-converter' },
  { name: 'API Request Tester', path: '/dev/rest-api-client-tester' },
  { name: 'Local SQLite Explorer', path: '/dev/client-side-sqlite-viewer' },
  { name: 'JSONPath Playground', path: '/dev/jsonpath-expression-tester' },
  { name: 'Regex Visualizer', path: '/dev/regular-expression-tester' },
  { name: 'Massive Log Analyzer', path: '/dev/local-log-file-analyzer' },
  { name: 'Code Snippet Exporter', path: '/dev/beautiful-code-snippet-image-generator' },
  { name: 'Merge PDFs', path: '/pdf/merge-pdf-files-free' },
  { name: 'Split PDF', path: '/pdf/split-extract-pdf-pages' },
  { name: 'Image to PDF', path: '/pdf/convert-image-to-pdf' },
  { name: 'Protect PDF', path: '/pdf/password-protect-pdf-file' },
  { name: 'Image Format Converter', path: '/image/png-jpg-webp-image-converter' },
  { name: 'Image Resizer', path: '/image/free-image-resizer-tool' },
  { name: 'Image to Base64', path: '/image/base64-image-encoder' },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filteredTools = TOOLS.filter((tool) =>
    tool.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredTools.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredTools.length) % filteredTools.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredTools[selectedIndex]) {
        router.push(filteredTools[selectedIndex].path);
        setIsOpen(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.searchBox}>
          <Search size={20} className={styles.searchIcon} />
          <input
            ref={inputRef}
            className={styles.input}
            placeholder="Search tools..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        <ul className={styles.list}>
          {filteredTools.length === 0 ? (
            <li className={styles.empty}>No tools found.</li>
          ) : (
            filteredTools.map((tool, index) => (
              <li
                key={tool.path}
                className={`${styles.item} ${index === selectedIndex ? styles.selected : ''}`}
                onClick={() => {
                  router.push(tool.path);
                  setIsOpen(false);
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {tool.name}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
