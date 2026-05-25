'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import styles from './CurlConverter.module.css';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

export default function CurlConverterClient() {
  const [curlInput, setCurlInput] = useState('');
  const [fetchOutput, setFetchOutput] = useState('');

  useEffect(() => {
    if (!curlInput.trim()) {
      setFetchOutput('');
      return;
    }
    const output = convertCurlToFetch(curlInput);
    setFetchOutput(output);
  }, [curlInput]);

  const copyToClipboard = () => {
    if (!fetchOutput || !fetchOutput.trim()) {
      toast.error('Nothing to copy!');
      return;
    }
    navigator.clipboard.writeText(fetchOutput);
    toast.success('fetch() code copied to clipboard!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.pane}>
        <div className={styles.paneHeader}>
          <span style={{ fontWeight: 600 }}>cURL Command</span>
          <Button onClick={() => setCurlInput('')} variant="secondary" size="sm">Clear</Button>
        </div>
        <div className={styles.textarea} style={{ padding: 0, overflow: 'hidden', minHeight: '400px' }}>
          <Editor
            value={curlInput}
            onValueChange={setCurlInput}
            highlight={code => Prism.highlight(code, Prism.languages.bash, 'bash')}
            padding={16}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              minHeight: '400px',
              backgroundColor: 'transparent',
              outline: 'none',
            }}
            textareaClassName="editor-textarea"
            placeholder={"curl 'https://api.example.com/v1/users' \\\n  -H 'Authorization: Bearer token' \\\n  -d '{\"name\": \"John\"}'"}
          />
        </div>
      </div>

      <div className={styles.pane}>
        <div className={styles.paneHeader}>
          <span style={{ fontWeight: 600 }}>JavaScript fetch()</span>
          <Button onClick={copyToClipboard} variant="primary" size="sm">
            <Copy size={16} style={{ marginRight: '6px' }} /> Copy Code
          </Button>
        </div>
        <div className={styles.textarea} style={{ padding: 0, overflow: 'hidden', minHeight: '400px' }}>
          <Editor
            value={fetchOutput}
            onValueChange={() => {}}
            highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
            padding={16}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              minHeight: '400px',
              backgroundColor: 'transparent',
              outline: 'none',
            }}
            disabled
            placeholder="fetch() syntax will appear here..."
          />
        </div>
      </div>
    </div>
  );
}

// --- Robust Converter Logic ---
function convertCurlToFetch(curlCommand: string): string {
  // Strip trailing backslashes used for multiline in bash
  const cleanCmd = curlCommand.replace(/\\\s*\n/g, ' ');

  let method = 'GET';
  let url = '';
  const headers: Record<string, string> = {};
  let body = '';

  // Extract URL (handles quotes or unquoted)
  const urlMatch = cleanCmd.match(/curl\s+(?:-X\s+[A-Z]+\s+)?(?:-i\s+)?['"]?(https?:\/\/[^\s'"]+)['"]?/);
  if (urlMatch) {
    url = urlMatch[1];
  } else {
    // Fallback if the URL isn't right after curl
    const looseUrlMatch = cleanCmd.match(/['"]?(https?:\/\/[^\s'"]+)['"]?/);
    if (looseUrlMatch) url = looseUrlMatch[1];
  }

  // Extract Method
  const methodMatch = cleanCmd.match(/(?:-X|--request)\s+['"]?([A-Z]+)['"]?/i);
  if (methodMatch) {
    method = methodMatch[1].toUpperCase();
  }

  // Extract Headers
  // Matches -H '...' or -H "..."
  const headerRegex = /(?:-H|--header)\s*(?:'([^']*)'|"((?:\\"|[^"])*)")/g;
  let hMatch;
  while ((hMatch = headerRegex.exec(cleanCmd)) !== null) {
    const headerStr = hMatch[1] || hMatch[2]; // match[1] is single quotes, match[2] is double
    if (headerStr) {
      const split = headerStr.split(/:\s*(.*)/);
      if (split.length >= 2) {
        headers[split[0].trim()] = split[1].trim();
      }
    }
  }

  // Extract Data
  const dataRegex = /(?:-d|--data|--data-raw|--data-binary)\s*(?:'([^']*)'|"((?:\\"|[^"])*)")/;
  const dMatch = cleanCmd.match(dataRegex);
  if (dMatch) {
    body = dMatch[1] || dMatch[2] || '';
    // Unescape escaped quotes if double quoted
    if (dMatch[2]) {
      body = body.replace(/\\"/g, '"');
    }
    
    if (method === 'GET') method = 'POST'; // Implicit POST if data is sent
  }

  if (!url) return '// Invalid or incomplete cURL command.\\n// Make sure it starts with "curl" and has a valid URL.';

  // Build Output
  let output = `fetch('${url}', {\n`;
  output += `  method: '${method}',\n`;
  
  if (Object.keys(headers).length > 0) {
    output += `  headers: {\n`;
    for (const [k, v] of Object.entries(headers)) {
      output += `    '${k}': '${v.replace(/'/g, "\\'")}',\n`;
    }
    output += `  },\n`;
  }
  
  if (body) {
    // Check if body is valid JSON to format it
    try {
      const parsedBody = JSON.parse(body);
      output += `  body: JSON.stringify(${JSON.stringify(parsedBody, null, 4).replace(/\n/g, '\n  ')})\n`;
    } catch {
      // If it's not JSON, just stringify the raw payload safely
      output += `  body: ${JSON.stringify(body)}\n`;
    }
  }
  
  output += `})\n.then(response => response.json())\n.then(data => console.log(data))\n.catch(error => console.error('Error:', error));`;
  
  return output;
}
