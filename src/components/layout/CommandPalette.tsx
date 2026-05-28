'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import styles from './CommandPalette.module.css';

const TOOLS = [
  { name: 'Text Toolkit', path: '/tools/text-toolkit' },
  { name: 'QR Code Generator', path: '/tools/qr-generator' },
  { name: 'JWT Decoder', path: '/tools/jwt-decoder' },
  { name: 'Quick Dump', path: '/tools/quick-dump' },
  { name: 'Image Compressor', path: '/tools/image-compressor' },
  { name: 'JSON Formatter & Validator', path: '/tools/json-validator' },
  { name: 'Hash Generator', path: '/tools/hash-generator' },
  { name: 'JSON to TS Converter', path: '/tools/json-to-ts' },
  { name: 'cURL to Fetch Converter', path: '/tools/curl-converter' },
  { name: 'SVG to React Converter', path: '/tools/svg-to-react' },
  { name: 'Local SQLite Explorer', path: '/tools/sqlite-explorer' },
  { name: 'JSONPath Playground', path: '/tools/json-path' },
  { name: 'Regex Visualizer', path: '/tools/regex-tester' },
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
