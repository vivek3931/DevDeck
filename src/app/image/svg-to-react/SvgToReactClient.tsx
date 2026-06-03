'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import styles from './SvgToReact.module.css';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/themes/prism-tomorrow.css';

export default function SvgToReactClient() {
  const [svgInput, setSvgInput] = useState('');
  const [reactOutput, setReactOutput] = useState('');

  useEffect(() => {
    if (!svgInput.trim()) {
      setReactOutput('');
      return;
    }
    const output = convertSvg(svgInput);
    setReactOutput(output);
  }, [svgInput]);

  const copyToClipboard = () => {
    if (!reactOutput || !reactOutput.trim()) {
      toast.error('Nothing to copy!');
      return;
    }
    navigator.clipboard.writeText(reactOutput);
    toast.success('React component copied to clipboard!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.pane}>
        <div className={styles.paneHeader}>
          <span style={{ fontWeight: 600 }}>Raw SVG (HTML)</span>
          <Button onClick={() => setSvgInput('')} variant="secondary" size="sm">Clear</Button>
        </div>
        <div className={styles.textarea} style={{ padding: 0, overflow: 'hidden', minHeight: '400px' }}>
          <Editor
            value={svgInput}
            onValueChange={setSvgInput}
            highlight={code => Prism.highlight(code, Prism.languages.markup, 'markup')}
            padding={16}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              minHeight: '400px',
              backgroundColor: 'transparent',
              outline: 'none',
            }}
            textareaClassName="editor-textarea"
            placeholder={'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" ...>'}
          />
        </div>
      </div>

      <div className={styles.pane}>
        <div className={styles.paneHeader}>
          <span style={{ fontWeight: 600 }}>React Component (TSX)</span>
          <Button onClick={copyToClipboard} variant="primary" size="sm">
            <Copy size={16} style={{ marginRight: '6px' }} /> Copy Code
          </Button>
        </div>
        <div className={styles.textarea} style={{ padding: 0, overflow: 'hidden', minHeight: '400px' }}>
          <Editor
            value={reactOutput}
            onValueChange={() => {}}
            highlight={code => Prism.highlight(code, Prism.languages.tsx, 'tsx')}
            padding={16}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              minHeight: '400px',
              backgroundColor: 'transparent',
              outline: 'none',
            }}
            disabled
            placeholder="React functional component will appear here..."
          />
        </div>
      </div>
    </div>
  );
}

// --- Converter Logic ---
function convertSvg(svg: string): string {
  // Remove XML declaration or DOCTYPE if present
  let cleanSvg = svg.replace(/<\?xml.*?\?>/, '').replace(/<!DOCTYPE.*?>/, '').trim();
  
  if (!cleanSvg.startsWith('<svg')) return '// Invalid SVG. Please paste a valid <svg> tag.';

  // 1. Convert kebab-case attributes to camelCase
  // Matches all properties like fill-rule="evenodd" or stroke-dasharray="2"
  const kebabRegex = /([a-z0-9]+(?:-[a-z0-9]+)+)=/gi;
  cleanSvg = cleanSvg.replace(kebabRegex, (match, p1) => {
    if (p1.startsWith('data-') || p1.startsWith('aria-')) return match;
    const parts = p1.split('-');
    const camel = parts[0] + parts.slice(1).map((p: string) => p.charAt(0).toUpperCase() + p.slice(1)).join('');
    return `${camel}=`;
  });

  // 2. Class to className
  cleanSvg = cleanSvg.replace(/\bclass=/g, 'className=');

  // 3. xmlns:xlink to xmlnsXlink and other colon separated tags
  cleanSvg = cleanSvg.replace(/xmlns:xlink=/g, 'xmlnsXlink=');
  cleanSvg = cleanSvg.replace(/xml:space=/g, 'xmlSpace=');
  cleanSvg = cleanSvg.replace(/xlink:href=/g, 'xlinkHref=');

  // 4. Inject props spread into the <svg> tag
  cleanSvg = cleanSvg.replace(/<svg/, '<svg {...props}');

  const componentCode = 
`import React from 'react';

export function Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    ${cleanSvg.split('\\n').join('\\n    ')}
  );
}
`;

  return componentCode;
}
