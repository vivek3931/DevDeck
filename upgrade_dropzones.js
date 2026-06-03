const fs = require('fs');
const path = require('path');

const files = [
  "d:/devdeck/src/app/pdf/split/PdfSplitClient.tsx",
  "d:/devdeck/src/app/pdf/protect/PdfProtectClient.tsx",
  "d:/devdeck/src/app/pdf/merge/PdfMergeClient.tsx",
  "d:/devdeck/src/app/pdf/image-to-pdf/ImageToPdfClient.tsx",
  "d:/devdeck/src/app/image/resizer/ImageResizerClient.tsx",
  "d:/devdeck/src/app/image/converter/ImageConverterClient.tsx",
  // "d:/devdeck/src/app/image/base64/ImageBase64Client.tsx" // Already done manually
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // We are looking for:
  // <UploadCloud ... />
  // <div>
  //   <h3 ...>...</h3>
  //   <p ...>...</p>
  // </div>

  const regex = /<UploadCloud[\s\S]*?<\/div>\s*(?=<)/;
  const match = content.match(regex);

  if (match) {
    const h3Match = match[0].match(/<h3[^>]*>(.*?)<\/h3>/);
    const pMatch = match[0].match(/<p[^>]*>(.*?)<\/p>/);

    let h3Text = h3Match ? h3Match[1] : 'Drag & drop a file here';
    let pText = pMatch ? pMatch[1] : 'or click the button below to browse';

    // Ensure it says "Drag & drop" instead of "Click or drag"
    h3Text = h3Text.replace(/Click or drag/i, 'Drag & drop');

    const replacement = `<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', pointerEvents: 'none' }}>
            <UploadCloud size={48} opacity={0.5} />
            <div>
              <h3 className="body-lg" style={{ fontWeight: 600 }}>${h3Text}</h3>
              <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>${pText}</p>
            </div>
            <Button variant="secondary" style={{ pointerEvents: 'auto' }} onClick={(e: React.MouseEvent) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
              Choose File
            </Button>
          </div>
`;

    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  } else {
    console.log(`No match found in ${file}`);
  }
}
