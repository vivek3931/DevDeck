const fs = require('fs');
const path = require('path');

const toolsDirs = [
  { path: 'd:/devdeck/src/app/dev', category: 'dev' },
  { path: 'd:/devdeck/src/app/image', category: 'image' },
  { path: 'd:/devdeck/src/app/pdf', category: 'pdf' }
];

function injectSEO(pagePath, category, routeName) {
  if (!fs.existsSync(pagePath)) return;
  
  let content = fs.readFileSync(pagePath, 'utf8');
  let modified = false;
  
  // 3. Inject RelatedTools and Schema before closing the root element
  if (!content.includes('<RelatedTools')) {
    const injectStr = `\n        <RelatedTools currentPath="/${category}/${routeName}" category="${category}" />\n        <SoftwareAppSchema name="DevDeck ${routeName}" description="A free, secure developer tool." url="https://devdeck.com/${category}/${routeName}" />\n`;
    
    // Find the last closing tag before the end of the function
    const match = content.match(/(\s*<\/[a-zA-Z0-9_]+>\s*\)\s*;\s*}\s*)$/);
    if (match) {
      content = content.replace(/(\s*<\/[a-zA-Z0-9_]+>\s*\)\s*;\s*}\s*)$/, `${injectStr}$1`);
      modified = true;
    } else {
      // fallback
      content = content.replace(/(<\/div>\s*\)\s*;\s*}\s*)$/, `${injectStr}$1`);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(pagePath, content, 'utf8');
    console.log(`Injected bottom SEO into ${pagePath}`);
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
