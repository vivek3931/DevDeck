import { 
  Key, FileJson, Hash, Braces, Terminal, Regex, 
  Database, Network, Camera, FileText, Image as ImageIcon,
  Minimize2, QrCode, Maximize, Palette, Lock, Scissors, Copy, AlignLeft
} from 'lucide-react';

export const TOOLS = {
  dev: [
    { title: 'JSON Validator', path: '/dev/json-formatter-validator', icon: FileJson, desc: 'Format and validate JSON' },
    { title: 'JWT Decoder', path: '/dev/secure-jwt-decoder', icon: Key, desc: 'Decode JWT tokens instantly' },
    { title: 'Quick Dump', path: '/dev/secure-code-snippet-bin', icon: Terminal, desc: 'Paste and share snippets' },
    { title: 'Hash Generator', path: '/dev/md5-sha256-hash-generator', icon: Hash, desc: 'MD5, SHA-1, SHA-256 hashes' },
    { title: 'JSON to TS', path: '/dev/json-to-typescript-interface-converter', icon: Braces, desc: 'Convert JSON to TypeScript' },
    { title: 'cURL Converter', path: '/dev/curl-to-code-converter', icon: Network, desc: 'Translate cURL commands' },
    { title: 'SQLite Explorer', path: '/dev/client-side-sqlite-viewer', icon: Database, desc: 'View SQLite databases' },
    { title: 'JSON Path', path: '/dev/jsonpath-expression-tester', icon: FileJson, desc: 'Test JSONPath expressions' },
    { title: 'Regex Tester', path: '/dev/regular-expression-tester', icon: Regex, desc: 'Test regular expressions' },
    { title: 'Log Analyzer', path: '/dev/local-log-file-analyzer', icon: Terminal, desc: 'Parse and filter logs' },
    { title: 'API Tester', path: '/dev/rest-api-client-tester', icon: Network, desc: 'Send HTTP requests' },
    { title: 'Code Snap', path: '/dev/beautiful-code-snippet-image-generator', icon: Camera, desc: 'Create beautiful code images' },
    { title: 'Lorem Ipsum', path: '/dev/lorem-ipsum-placeholder-generator', icon: AlignLeft, desc: 'Generate placeholder text' },
  ],
  image: [
    { title: 'Image Compressor', path: '/image/free-online-image-compressor', icon: Minimize2, desc: 'Reduce image file size' },
    { title: 'QR Generator', path: '/image/vector-qr-code-generator', icon: QrCode, desc: 'Create custom QR codes' },
    { title: 'SVG to React', path: '/image/svg-to-react-jsx-converter', icon: Palette, desc: 'Convert SVG to JSX/TSX' },
    { title: 'Image Converter', path: '/image/png-jpg-webp-image-converter', icon: ImageIcon, desc: 'Convert between PNG, JPG, WEBP' },
    { title: 'Image Resizer', path: '/image/free-image-resizer-tool', icon: Maximize, desc: 'Resize dimensions instantly' },
    { title: 'Base64 Encode', path: '/image/base64-image-encoder', icon: Copy, desc: 'Convert image to Base64' },
  ],
  pdf: [
    { title: 'Merge PDF', path: '/pdf/merge-pdf-files-free', icon: FileText, desc: 'Combine multiple PDFs' },
    { title: 'Split PDF', path: '/pdf/split-extract-pdf-pages', icon: Scissors, desc: 'Extract pages from PDF' },
    { title: 'Image to PDF', path: '/pdf/convert-image-to-pdf', icon: ImageIcon, desc: 'Convert images to PDF' },
    { title: 'Protect PDF', path: '/pdf/password-protect-pdf-file', icon: Lock, desc: 'Add password to PDF' },
  ]
};
