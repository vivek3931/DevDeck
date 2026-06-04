const fs = require('fs');
const path = require('path');

const toolsDirs = [
  { path: 'd:/devdeck/src/app/dev', category: 'dev' },
  { path: 'd:/devdeck/src/app/image', category: 'image' },
  { path: 'd:/devdeck/src/app/pdf', category: 'pdf' }
];

const IGNORE_DIRS = ['page.tsx', 'layout.tsx', 'globals.css'];

function injectSEO(pagePath, category, routeName) {
  if (!fs.existsSync(pagePath)) return;
  
  let content = fs.readFileSync(pagePath, 'utf8');
  let modified = false;
  
  // 1. Add Imports if they don't exist
  if (!content.includes('TrustBadge')) {
    content = `import { TrustBadge } from '@/components/ui/TrustBadge';\n` + content;
    modified = true;
  }
  if (!content.includes('RelatedTools')) {
    content = `import { RelatedTools } from '@/components/ui/RelatedTools';\n` + content;
    modified = true;
  }
  if (!content.includes('SoftwareAppSchema') && !content.includes('FaqSchema')) {
    content = `import { SoftwareAppSchema, FaqSchema } from '@/components/seo/Schema';\n` + content;
    modified = true;
  }
  
  // 2. Inject TrustBadge after h1
  if (!content.includes('<TrustBadge />') && content.match(/<h1[^>]*>.*?<\/h1>/)) {
    content = content.replace(/(<h1[^>]*>.*?<\/h1>)/, '$1\n        <TrustBadge />');
    modified = true;
  }
  
  // 3. Inject RelatedTools and Schema before closing </main>
  if (!content.includes('<RelatedTools') && content.includes('</main>')) {
    const injectStr = `\n        <RelatedTools currentPath="/${category}/${routeName}" category="${category}" />\n        <SoftwareAppSchema name="DevDeck ${routeName}" description="A free, secure developer tool." url="https://devdeck.com/${category}/${routeName}" />\n`;
    content = content.replace(/(<\/main>)/, `${injectStr}      $1`);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(pagePath, content, 'utf8');
    console.log(`Injected SEO into ${pagePath}`);
  }
}

toolsDirs.forEach(dirObj => {
  if (fs.existsSync(dirObj.path)) {
    const items = fs.readdirSync(dirObj.path);
    items.forEach(item => {
      const fullPath = path.join(dirObj.path, item);
      if (fs.statSync(fullPath).isDirectory()) {
        const pagePath = path.join(fullPath, 'page.tsx');
        injectSEO(pagePath, dirObj.category, item);
      }
    });
  }
});
