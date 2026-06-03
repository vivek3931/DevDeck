import { 
  Key, FileJson, Hash, Braces, Terminal, Regex, 
  Database, Network, Camera, FileText, Image as ImageIcon,
  Minimize2, QrCode, Maximize, Palette, Lock, Scissors, Copy
} from 'lucide-react';

export const TOOLS = {
  dev: [
    { title: 'JSON Validator', path: '/dev/json-validator', icon: FileJson, desc: 'Format and validate JSON' },
    { title: 'JWT Decoder', path: '/dev/jwt-decoder', icon: Key, desc: 'Decode JWT tokens instantly' },
    { title: 'Quick Dump', path: '/dev/quick-dump', icon: Terminal, desc: 'Paste and share snippets' },
    { title: 'Hash Generator', path: '/dev/hash-generator', icon: Hash, desc: 'MD5, SHA-1, SHA-256 hashes' },
    { title: 'JSON to TS', path: '/dev/json-to-ts', icon: Braces, desc: 'Convert JSON to TypeScript' },
    { title: 'cURL Converter', path: '/dev/curl-converter', icon: Network, desc: 'Translate cURL commands' },
    { title: 'SQLite Explorer', path: '/dev/sqlite-explorer', icon: Database, desc: 'View SQLite databases' },
    { title: 'JSON Path', path: '/dev/json-path', icon: FileJson, desc: 'Test JSONPath expressions' },
    { title: 'Regex Tester', path: '/dev/regex-tester', icon: Regex, desc: 'Test regular expressions' },
    { title: 'Log Analyzer', path: '/dev/log-analyzer', icon: Terminal, desc: 'Parse and filter logs' },
    { title: 'API Tester', path: '/dev/api-tester', icon: Network, desc: 'Send HTTP requests' },
    { title: 'Code Snap', path: '/dev/code-snap', icon: Camera, desc: 'Create beautiful code images' },
  ],
  image: [
    { title: 'Image Compressor', path: '/image/image-compressor', icon: Minimize2, desc: 'Reduce image file size' },
    { title: 'QR Generator', path: '/image/qr-generator', icon: QrCode, desc: 'Create custom QR codes' },
    { title: 'SVG to React', path: '/image/svg-to-react', icon: Palette, desc: 'Convert SVG to JSX/TSX' },
    { title: 'Image Converter', path: '/image/converter', icon: ImageIcon, desc: 'Convert between PNG, JPG, WEBP' },
    { title: 'Image Resizer', path: '/image/resizer', icon: Maximize, desc: 'Resize dimensions instantly' },
    { title: 'Base64 Encode', path: '/image/base64', icon: Copy, desc: 'Convert image to Base64' },
  ],
  pdf: [
    { title: 'Merge PDF', path: '/pdf/merge', icon: FileText, desc: 'Combine multiple PDFs' },
    { title: 'Split PDF', path: '/pdf/split', icon: Scissors, desc: 'Extract pages from PDF' },
    { title: 'Image to PDF', path: '/pdf/image-to-pdf', icon: ImageIcon, desc: 'Convert images to PDF' },
    { title: 'Protect PDF', path: '/pdf/protect', icon: Lock, desc: 'Add password to PDF' },
  ]
};
