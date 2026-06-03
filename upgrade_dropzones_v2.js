const fs = require('fs');

const files = [
  "d:/devdeck/src/app/pdf/split/PdfSplitClient.tsx",
  "d:/devdeck/src/app/pdf/protect/PdfProtectClient.tsx",
  "d:/devdeck/src/app/pdf/merge/PdfMergeClient.tsx",
  "d:/devdeck/src/app/pdf/image-to-pdf/ImageToPdfClient.tsx",
  "d:/devdeck/src/app/image/resizer/ImageResizerClient.tsx",
  "d:/devdeck/src/app/image/converter/ImageConverterClient.tsx"
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Match:
  // <div>
  //   <h3 className="body-lg" style={{ fontWeight: 600 }}>Click or drag a PDF here</h3>
  //   <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>We'll load it entirely on your device.</p>
  // </div>
  const regex = /<div>\s*<h3[^>]*>(.*?)<\/h3>\s*<p[^>]*>(.*?)<\/p>\s*<\/div>/;
  const match = content.match(regex);

  if (match) {
    let h3Text = match[1];
    let pText = match[2];

    h3Text = h3Text.replace(/Click or drag/i, 'Drag & drop');

    const replacement = `<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', pointerEvents: 'none' }}>
            <div>
              <h3 className="body-lg" style={{ fontWeight: 600 }}>${h3Text}</h3>
              <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>${pText}</p>
            </div>
            <Button variant="secondary" style={{ pointerEvents: 'auto' }} onClick={(e: React.MouseEvent) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
              Choose File
            </Button>
          </div>`;

    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  } else {
    console.log(`No match found in ${file}`);
  }
}
