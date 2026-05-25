const fs = require('fs');
const path = require('path');

const seoData = {
  'epoch-converter': {
    title: "Free Online Epoch Converter | Timestamp to Date | DevDeck",
    desc: "Instantly convert UNIX timestamps to human-readable dates. A free, online, and privacy-focused epoch converter for developers."
  },
  'image-compressor': {
    title: "Free Online Image Compressor | Compress JPEG & PNG Offline | DevDeck",
    desc: "Compress images online for free without uploading them to a server. Secure, offline-first image compression in your browser."
  },
  'jwt-decoder': {
    title: "Free Online JWT Decoder | Secure Offline JSON Web Token Viewer | DevDeck",
    desc: "Decode, view, and inspect JSON Web Tokens (JWT) entirely offline. Your sensitive tokens are never sent to a server."
  },
  'lorem-ipsum': {
    title: "Free Online Lorem Ipsum Generator | Dummy Text Maker | DevDeck",
    desc: "Generate random Lorem Ipsum dummy text for your UI designs and websites instantly. Free online placeholder text generator."
  },
  'password-generator': {
    title: "Secure Online Password Generator | Random Password Maker | DevDeck",
    desc: "Create strong, cryptographically secure passwords locally in your browser. Free online random password generator."
  },
  'pomodoro': {
    title: "Free Online Pomodoro Timer | Focus & Productivity Clock | DevDeck",
    desc: "Boost your productivity with our free online Pomodoro timer. A minimalist focus clock for developers and students."
  },
  'qr-generator': {
    title: "Free Online QR Code Generator | Download SVG & PNG | DevDeck",
    desc: "Create and download QR codes for URLs, text, and Wi-Fi instantly. Free online QR code generator running locally in your browser."
  },
  'quick-dump': {
    title: "Secure Online Text Sharing & Pastebin | Quick Dump | DevDeck",
    desc: "Free online text sharing. Paste text, JSON, or links securely. Get a 4-letter code and fetch it on any device instantly."
  },
  'scratchpad': {
    title: "Free Online Notepad & Scratchpad | Browser Sticky Notes | DevDeck",
    desc: "A free online scratchpad for developers. Take quick notes, format JSON, and save snippets locally in your browser."
  },
  'text-toolkit': {
    title: "Online Text Toolkit | Base64, JSON Formatter & String Converter | DevDeck",
    desc: "Free online developer tools for string manipulation. Encode/decode Base64, minify JSON, and convert text cases instantly."
  },
  'tip-calculator': {
    title: "Free Online Tip Calculator | Split Bill Calculator | DevDeck",
    desc: "Easily calculate tips and split restaurant bills among friends. A fast, free online tip calculator."
  },
  'unit-converter': {
    title: "Free Online Unit Converter | Distance, Weight & Data Size | DevDeck",
    desc: "Convert between metric units, distances, and data sizes (KB, MB, GB). Free online unit converter tool."
  }
};

const toolsDir = path.join(__dirname, 'src', 'app', 'tools');
const dirs = fs.readdirSync(toolsDir);

for (const dir of dirs) {
  const pagePath = path.join(toolsDir, dir, 'page.tsx');
  if (fs.existsSync(pagePath) && seoData[dir]) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Regex to replace title and description inside metadata and openGraph
    content = content.replace(/title:\s*'[^']+'/g, `title: '${seoData[dir].title}'`);
    content = content.replace(/description:\s*'[^']+'/g, `description: '${seoData[dir].desc}'`);
    
    fs.writeFileSync(pagePath, content);
    console.log(`Updated SEO for ${dir}`);
  }
}
