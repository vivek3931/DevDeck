// SEO content data for all DevDeck tools
// Each tool has: whatIs, howTo steps, FAQ items, and whyDevDeck text

export const toolSeoData: Record<string, {
  whatIs: { title: string; content: string };
  howTo: { title: string; steps: { name: string; text: string }[] };
  faq: { question: string; answer: string }[];
  whyDevDeck: string;
}> = {

  // ═══════════════════════════════════════════════
  // DEV TOOLS
  // ═══════════════════════════════════════════════

  'json-formatter-validator': {
    whatIs: {
      title: 'What is a JSON Formatter & Validator?',
      content: 'A JSON formatter (also called a JSON beautifier or JSON pretty-printer) takes raw, minified, or malformed JSON data and reformats it with proper indentation, making it human-readable. A JSON validator checks whether your JSON data conforms to the JSON specification (RFC 8259) and identifies syntax errors like missing commas, unclosed brackets, or invalid data types. Our free online JSON formatter and validator combines both features — it instantly beautifies your JSON while catching syntax errors with precise line-and-column error reporting.'
    },
    howTo: {
      title: 'How to Format & Validate JSON Online',
      steps: [
        { name: 'Paste your JSON', text: 'Copy your raw or minified JSON data and paste it into the editor above.' },
        { name: 'Click Format', text: 'Hit the "Format" button to beautify your JSON with proper 2-space indentation.' },
        { name: 'Fix errors if any', text: 'If your JSON has syntax errors, the validator highlights the exact line and column where the error occurs.' },
        { name: 'Minify or Copy', text: 'Use "Minify" to compress JSON for production, or "Copy" to copy the formatted output to your clipboard.' }
      ]
    },
    faq: [
      { question: 'Is my JSON data safe when using this formatter?', answer: 'Yes, absolutely. DevDeck processes everything 100% in your browser using JavaScript. Your JSON data never leaves your device — no server uploads, no logging, no tracking.' },
      { question: 'Can I format large JSON files?', answer: 'Yes. Since processing happens locally in your browser, there are no file size limits imposed by a server. Performance depends on your device, but most modern browsers handle JSON files up to 50MB+ easily.' },
      { question: 'What JSON errors does the validator detect?', answer: 'The validator detects all JSON syntax errors including: missing or extra commas, unclosed brackets or braces, unquoted keys, single-quoted strings (JSON requires double quotes), trailing commas, and invalid escape sequences.' },
      { question: 'What is the difference between JSON formatter and JSON validator?', answer: 'A JSON formatter reformats (beautifies) valid JSON to make it readable. A JSON validator checks whether JSON data is syntactically correct. DevDeck combines both — it formats valid JSON and reports specific errors for invalid JSON.' }
    ],
    whyDevDeck: 'Unlike other JSON formatters that upload your data to a server, DevDeck runs entirely in your browser. This means your sensitive API responses, configuration files, and database exports stay completely private. No data is ever transmitted, stored, or logged. Plus, it works offline once loaded.'
  },

  'rest-api-client-tester': {
    whatIs: {
      title: 'What is an API Request Tester?',
      content: 'An API request tester (also called a REST client or HTTP client) lets you send HTTP requests (GET, POST, PUT, DELETE, PATCH) to any API endpoint and inspect the response. Think of it as a lightweight alternative to Postman or Insomnia that runs directly in your browser. Our free online API tester supports custom headers, JSON request bodies, query parameters, and displays formatted response data with status codes and timing information.'
    },
    howTo: {
      title: 'How to Test a REST API Online',
      steps: [
        { name: 'Enter the API URL', text: 'Type or paste the full API endpoint URL into the URL field.' },
        { name: 'Select HTTP method', text: 'Choose GET, POST, PUT, DELETE, or PATCH from the method dropdown.' },
        { name: 'Add headers and body', text: 'Add custom headers (like Authorization or Content-Type) and a JSON request body if needed.' },
        { name: 'Send and inspect', text: 'Click "Send" to execute the request. View the response status, headers, body, and response time.' }
      ]
    },
    faq: [
      { question: 'Is this a Postman alternative?', answer: 'Yes! DevDeck API Tester is a lightweight browser-based alternative to Postman. It supports all common HTTP methods, custom headers, and JSON payloads without requiring any download or account.' },
      { question: 'Can I test APIs that require authentication?', answer: 'Yes. You can add Authorization headers (Bearer tokens, API keys, Basic auth) in the headers section. Since everything runs in your browser, your credentials are never stored on any server.' },
      { question: 'Does it support CORS?', answer: 'Browser-based API testing is subject to CORS restrictions. If the target API does not allow cross-origin requests, you may need to use a CORS proxy or test from the API\'s own domain.' },
      { question: 'Can I save and reuse requests?', answer: 'Currently, requests are stored in your browser session. You can use the Activity tray to view recent requests.' }
    ],
    whyDevDeck: 'Most API testing tools require installing desktop apps or creating accounts. DevDeck API Tester runs instantly in your browser with zero setup. Your API keys and tokens never leave your device.'
  },

  'secure-jwt-decoder': {
    whatIs: {
      title: 'What is a JWT Decoder?',
      content: 'A JWT (JSON Web Token) decoder is a tool that parses and displays the contents of a JWT without needing the secret key. JWTs consist of three Base64URL-encoded parts: the Header (algorithm and token type), the Payload (claims like user ID, expiration, and permissions), and the Signature. Our secure JWT decoder breaks down each part, showing you the decoded header and payload in formatted JSON. Unlike other JWT decoders, this tool runs 100% in your browser — your tokens are never sent to any server.'
    },
    howTo: {
      title: 'How to Decode a JWT Token Online',
      steps: [
        { name: 'Paste your JWT', text: 'Copy the full JWT string (starts with "eyJ...") and paste it into the input field above.' },
        { name: 'View decoded sections', text: 'The decoder instantly shows the Header (algorithm info) and Payload (claims data) in formatted JSON.' },
        { name: 'Check expiration', text: 'The "exp" claim shows when the token expires. The decoder highlights if the token is expired.' },
        { name: 'Copy decoded data', text: 'Copy the decoded header or payload JSON for debugging or documentation purposes.' }
      ]
    },
    faq: [
      { question: 'Is it safe to paste my JWT token here?', answer: 'Yes. DevDeck decodes JWTs entirely in your browser using JavaScript. The token is never transmitted to any server, never logged, and never stored. It exists only in your browser\'s memory and is discarded when you leave the page.' },
      { question: 'Can this tool verify JWT signatures?', answer: 'This tool decodes and displays JWT contents. Signature verification requires the secret key or public key, which we intentionally do not ask for to maximize your security.' },
      { question: 'What is a JWT used for?', answer: 'JSON Web Tokens are widely used for authentication and authorization in web applications. After a user logs in, the server issues a JWT containing user claims. The client sends this token with subsequent requests to prove identity.' },
      { question: 'What does each part of a JWT mean?', answer: 'A JWT has three parts separated by dots: the Header (specifies the signing algorithm like HS256 or RS256), the Payload (contains claims like user ID, roles, and expiration time), and the Signature (used to verify the token hasn\'t been tampered with).' }
    ],
    whyDevDeck: 'JWT tokens often contain sensitive user data and permissions. Other online decoders send your tokens to their servers for processing. DevDeck decodes everything in-browser using pure JavaScript — your authentication tokens never leave your machine.'
  },

  'regular-expression-tester': {
    whatIs: {
      title: 'What is a Regex Tester?',
      content: 'A regex tester (regular expression tester) is a tool that lets you write, test, and debug regular expressions in real-time against sample text. It highlights all matches, shows capture groups, and helps you understand complex patterns. Regular expressions are powerful pattern-matching strings used in programming, text processing, data validation, and search operations. Our free online regex tester supports JavaScript regex syntax with flags like global (g), case-insensitive (i), and multiline (m).'
    },
    howTo: {
      title: 'How to Test Regular Expressions Online',
      steps: [
        { name: 'Enter your regex pattern', text: 'Type your regular expression pattern in the regex input field.' },
        { name: 'Set flags', text: 'Toggle regex flags: g (global — find all matches), i (case-insensitive), m (multiline).' },
        { name: 'Add test text', text: 'Paste or type the text you want to test your regex against.' },
        { name: 'View matches', text: 'Matches are highlighted in real-time. Capture groups are color-coded and listed separately.' }
      ]
    },
    faq: [
      { question: 'Which regex flavor does this tool support?', answer: 'This tool uses JavaScript\'s built-in RegExp engine, which supports ECMAScript regex syntax. This includes lookaheads, lookbehinds (in modern browsers), named capture groups, Unicode properties, and all standard character classes.' },
      { question: 'Can I test regex for other languages like Python or Java?', answer: 'Most basic regex syntax is shared across languages. However, some advanced features (like possessive quantifiers in Java or verbose mode in Python) are language-specific. For standard patterns, JavaScript regex works as a reliable cross-language tester.' },
      { question: 'What are capture groups?', answer: 'Capture groups are portions of a regex pattern enclosed in parentheses (). They "capture" the matched text so you can extract or reference it. For example, (\\d{4})-(\\d{2})-(\\d{2}) captures year, month, and day separately from a date string.' }
    ],
    whyDevDeck: 'DevDeck\'s regex tester runs instantly in your browser with zero latency. There\'s no server round-trip — every keystroke updates matches in real-time. Your test data stays completely private.'
  },

  'md5-sha256-hash-generator': {
    whatIs: {
      title: 'What is a Hash Generator?',
      content: 'A hash generator converts input data (text or files) into a fixed-length string of characters called a hash or checksum. Hash functions like MD5, SHA-1, SHA-256, and SHA-512 are one-way functions — you can generate a hash from data, but you cannot reverse it to get the original data. Hashes are used for data integrity verification, password storage, digital signatures, and file deduplication. Our free online hash generator supports MD5, SHA-1, SHA-256, and SHA-512 algorithms and processes everything locally in your browser.'
    },
    howTo: {
      title: 'How to Generate MD5/SHA-256 Hashes Online',
      steps: [
        { name: 'Enter your text or select a file', text: 'Type or paste the text you want to hash, or select a file for checksum generation.' },
        { name: 'Choose the algorithm', text: 'Select from MD5, SHA-1, SHA-256, or SHA-512 depending on your security requirements.' },
        { name: 'Generate the hash', text: 'The hash is computed instantly in your browser using the Web Crypto API.' },
        { name: 'Copy the hash', text: 'Click "Copy" to copy the hexadecimal hash string to your clipboard.' }
      ]
    },
    faq: [
      { question: 'Which hash algorithm should I use?', answer: 'For security purposes, use SHA-256 or SHA-512. MD5 and SHA-1 are considered cryptographically broken for security applications but are still useful for non-security checksums like file integrity verification.' },
      { question: 'Is MD5 still safe to use?', answer: 'MD5 should not be used for security-critical applications like password hashing or digital signatures because collision attacks have been demonstrated. However, it is still commonly used for file integrity checks and non-security checksums.' },
      { question: 'Can I hash a file?', answer: 'Yes! You can select a file and generate its MD5, SHA-1, SHA-256, or SHA-512 checksum. The file is processed entirely in your browser and never uploaded to any server.' },
      { question: 'What is the difference between hashing and encryption?', answer: 'Hashing is a one-way function — you cannot get the original data from a hash. Encryption is a two-way function — you can decrypt encrypted data with the correct key. Hashing is used for integrity verification; encryption is used for data confidentiality.' }
    ],
    whyDevDeck: 'DevDeck generates hashes using the browser\'s native Web Crypto API — the same cryptographic engine used by banking websites. Your data never leaves your browser, making it safe to hash sensitive strings and files.'
  },

  'json-to-typescript-interface-converter': {
    whatIs: {
      title: 'What is a JSON to TypeScript Converter?',
      content: 'A JSON to TypeScript converter automatically generates TypeScript type definitions (interfaces or types) from JSON data. Instead of manually writing TypeScript interfaces for API responses, database records, or configuration files, you can paste raw JSON and instantly get properly typed TypeScript interfaces. This saves time, reduces errors, and ensures your TypeScript code accurately reflects your data structures. Our converter handles nested objects, arrays, optional fields, and union types.'
    },
    howTo: {
      title: 'How to Convert JSON to TypeScript Interfaces',
      steps: [
        { name: 'Paste your JSON data', text: 'Copy a JSON object (e.g., an API response) and paste it into the input editor.' },
        { name: 'Configure options', text: 'Choose the root interface name and whether to use interfaces or type aliases.' },
        { name: 'Generate TypeScript', text: 'Click "Convert" to instantly generate properly formatted TypeScript interfaces.' },
        { name: 'Copy and use', text: 'Copy the generated TypeScript code directly into your project.' }
      ]
    },
    faq: [
      { question: 'Does it handle nested JSON objects?', answer: 'Yes. The converter recursively processes nested objects and creates separate named interfaces for each nested structure, properly referencing them in the parent interface.' },
      { question: 'How does it handle arrays?', answer: 'Arrays are typed based on their contents. If an array contains objects, a separate interface is generated. If it contains primitives, the appropriate TypeScript type (string[], number[], etc.) is used.' },
      { question: 'Can I use this for API response typing?', answer: 'Absolutely. This is the most common use case. Paste an API response, generate the interfaces, and use them in your fetch calls or API client for full type safety.' }
    ],
    whyDevDeck: 'Writing TypeScript interfaces manually from JSON is tedious and error-prone. DevDeck generates accurate interfaces instantly, and since it runs in your browser, your API responses and data structures remain completely private.'
  },

  'curl-to-code-converter': {
    whatIs: {
      title: 'What is a cURL to Code Converter?',
      content: 'A cURL to code converter transforms cURL commands into equivalent code in programming languages like JavaScript (fetch), Python (requests), and more. When you copy a network request as cURL from browser DevTools, this tool converts it into ready-to-use code. It parses all cURL flags including -X (method), -H (headers), -d (data), --data-raw, -u (authentication), and query parameters.'
    },
    howTo: {
      title: 'How to Convert cURL to JavaScript Fetch',
      steps: [
        { name: 'Copy a cURL command', text: 'Right-click a network request in Chrome DevTools → Copy → Copy as cURL.' },
        { name: 'Paste the cURL command', text: 'Paste the full cURL command into the input field.' },
        { name: 'Select output language', text: 'Choose JavaScript fetch, Python requests, or other target language.' },
        { name: 'Copy the generated code', text: 'The equivalent code is generated instantly. Copy it into your project.' }
      ]
    },
    faq: [
      { question: 'What cURL flags are supported?', answer: 'The converter supports all common cURL flags including -X/--request (method), -H/--header (headers), -d/--data (body), --data-raw, -u/--user (auth), -b/--cookie, -L/--location (follow redirects), and query parameters.' },
      { question: 'Can I convert cURL to Python?', answer: 'Yes. The converter supports multiple output formats including JavaScript fetch(), Python requests, and more.' },
      { question: 'How do I get a cURL command from Chrome?', answer: 'Open Chrome DevTools (F12) → Network tab → right-click any request → Copy → Copy as cURL. This copies the full request including headers, cookies, and body.' }
    ],
    whyDevDeck: 'Converting cURL commands manually is error-prone, especially with complex headers and authentication. DevDeck parses everything instantly and generates clean, ready-to-use code — all in your browser.'
  },

  'client-side-sqlite-viewer': {
    whatIs: {
      title: 'What is a Browser-Based SQLite Viewer?',
      content: 'A browser-based SQLite viewer lets you open, browse, and query SQLite database files (.sqlite, .db, .sqlite3) directly in your web browser without installing any software. Using WebAssembly-compiled SQLite (sql.js), our viewer runs the full SQLite engine in your browser. You can browse tables, view schemas, run custom SQL queries, and export results. Your database files are never uploaded to any server — everything runs locally.'
    },
    howTo: {
      title: 'How to View SQLite Databases Online',
      steps: [
        { name: 'Open your database file', text: 'Click "Open Database" and select a .sqlite, .db, or .sqlite3 file from your device.' },
        { name: 'Browse tables', text: 'View all tables in the sidebar. Click a table to see its data and schema.' },
        { name: 'Run SQL queries', text: 'Write custom SQL queries in the query editor and execute them against your database.' },
        { name: 'Export results', text: 'Export query results as CSV or JSON for further analysis.' }
      ]
    },
    faq: [
      { question: 'How does it work without uploading my database?', answer: 'We use sql.js, which is SQLite compiled to WebAssembly. The SQLite engine runs entirely in your browser. When you select a file, it is read into browser memory using the File API — no network request is made.' },
      { question: 'What is the maximum file size supported?', answer: 'File size is limited by your browser\'s available memory. Most modern browsers handle databases up to 100-200MB comfortably. For very large databases, a native SQLite client is recommended.' },
      { question: 'Can I modify the database?', answer: 'You can run INSERT, UPDATE, and DELETE queries. However, changes exist only in browser memory and are not saved back to the original file unless you explicitly export the modified database.' }
    ],
    whyDevDeck: 'Traditional SQLite viewers require installing desktop software. DevDeck runs SQLite in your browser via WebAssembly — zero installation, zero uploads, complete privacy for your database files.'
  },

  'jsonpath-expression-tester': {
    whatIs: {
      title: 'What is a JSONPath Tester?',
      content: 'A JSONPath tester lets you write and evaluate JSONPath expressions against JSON data in real-time. JSONPath is a query language for JSON, similar to XPath for XML. It allows you to extract specific values, filter arrays, and navigate complex nested JSON structures using expressions like $.store.book[*].author or $..price. Our free online JSONPath playground processes everything client-side and supports the full JSONPath specification.'
    },
    howTo: {
      title: 'How to Test JSONPath Expressions Online',
      steps: [
        { name: 'Paste your JSON data', text: 'Enter the JSON document you want to query in the JSON input panel.' },
        { name: 'Write a JSONPath expression', text: 'Enter a JSONPath expression like $.users[*].name in the expression field.' },
        { name: 'View results', text: 'Matching values are highlighted in the JSON and shown in the results panel in real-time.' },
        { name: 'Refine your query', text: 'Adjust your expression and see results update instantly. Use filters like [?(@.age > 21)] for complex queries.' }
      ]
    },
    faq: [
      { question: 'What is the difference between JSONPath and jq?', answer: 'JSONPath and jq are both query languages for JSON. JSONPath uses dot notation ($.store.book) and is commonly used in JavaScript/Java ecosystems. jq is a command-line tool with its own syntax. DevDeck uses JSONPath syntax.' },
      { question: 'Can I filter arrays with JSONPath?', answer: 'Yes. Use filter expressions like $..book[?(@.price < 10)] to find books cheaper than $10, or $..book[?(@.author == "Tolkien")] to filter by author.' },
      { question: 'What JSONPath implementation does this use?', answer: 'DevDeck uses the jsonpath-plus library, which supports the full JSONPath specification including recursive descent (..), wildcards (*), array slicing, and filter expressions.' }
    ],
    whyDevDeck: 'Testing JSONPath expressions against large API payloads is common in API development. DevDeck processes everything locally, so your sensitive API data stays on your device.'
  },

  'local-log-file-analyzer': {
    whatIs: {
      title: 'What is a Log File Analyzer?',
      content: 'A log file analyzer lets you open, search, filter, and parse large log files (.log, .txt) directly in your browser. Instead of scrolling through thousands of lines in a text editor, you can filter by log level (ERROR, WARN, INFO, DEBUG), search for specific patterns, and quickly locate issues. Our analyzer streams files efficiently so you can handle massive log files without your browser freezing. All processing happens locally — your logs are never uploaded.'
    },
    howTo: {
      title: 'How to Analyze Log Files Online',
      steps: [
        { name: 'Open your log file', text: 'Select a .log or .txt file from your device. The analyzer streams it efficiently.' },
        { name: 'Filter by log level', text: 'Toggle ERROR, WARN, INFO, DEBUG filters to focus on specific log levels.' },
        { name: 'Search for patterns', text: 'Use the search field to find specific text, error codes, or request IDs across the entire log.' },
        { name: 'Navigate results', text: 'Jump between matches and view surrounding context for each result.' }
      ]
    },
    faq: [
      { question: 'How large of a log file can I analyze?', answer: 'Since processing happens in your browser, performance depends on your device. Modern browsers handle log files of 50-100MB comfortably. The analyzer uses streaming to avoid loading the entire file into memory at once.' },
      { question: 'What log formats are supported?', answer: 'The analyzer works with any plain text log format. It automatically detects common log levels (ERROR, WARN, INFO, DEBUG) and timestamps in standard formats.' },
      { question: 'Is my log data private?', answer: 'Yes. Your log files are processed entirely in your browser using the File API. No data is uploaded, transmitted, or stored on any server.' }
    ],
    whyDevDeck: 'Server logs often contain sensitive data like IP addresses, user IDs, and error details. DevDeck processes everything in your browser — your production logs never leave your device.'
  },

  'beautiful-code-snippet-image-generator': {
    whatIs: {
      title: 'What is a Code Snippet Image Generator?',
      content: 'A code snippet image generator (also called code screenshot tool or code-to-image converter) creates beautiful, high-resolution PNG images of your source code. These images are perfect for social media posts, presentations, documentation, and tutorials. Our tool supports syntax highlighting for 100+ programming languages, customizable themes, backgrounds, padding, and font sizes. Think of it as a free alternative to Carbon or Ray.so that runs entirely in your browser.'
    },
    howTo: {
      title: 'How to Create Beautiful Code Screenshots',
      steps: [
        { name: 'Paste your code', text: 'Enter or paste the code snippet you want to convert into an image.' },
        { name: 'Select language', text: 'Choose the programming language for proper syntax highlighting.' },
        { name: 'Customize appearance', text: 'Adjust the theme, background color, padding, and font size to your preference.' },
        { name: 'Export as PNG', text: 'Click "Export" to generate and download a high-resolution PNG image of your code.' }
      ]
    },
    faq: [
      { question: 'What programming languages are supported?', answer: 'The tool supports syntax highlighting for 100+ languages including JavaScript, TypeScript, Python, Java, C++, Go, Rust, Ruby, PHP, Swift, Kotlin, SQL, HTML, CSS, and more via Prism.js.' },
      { question: 'Is this a Carbon alternative?', answer: 'Yes! DevDeck Code Snap is a free, privacy-focused alternative to Carbon (carbon.now.sh) and Ray.so. It runs entirely in your browser without requiring any account or sending your code to a server.' },
      { question: 'What resolution are the exported images?', answer: 'Images are exported at 2x resolution (Retina quality) by default, ensuring they look sharp on all displays including presentations and social media.' }
    ],
    whyDevDeck: 'Unlike Carbon or Ray.so which send your code to their servers, DevDeck generates code images entirely in your browser using html-to-image. Your proprietary code stays completely private.'
  },

  'secure-code-snippet-bin': {
    whatIs: {
      title: 'What is Quick Dump?',
      content: 'Quick Dump is a secure, ephemeral code and text sharing tool. It lets you paste raw code, API responses, or any text and optionally share it with end-to-end encryption. Unlike traditional pastebins (Pastebin, GitHub Gists), Quick Dump encrypts your content client-side before it ever reaches a server. The encryption key is stored in the URL fragment (#) which is never sent to the server. This means even we cannot read your shared content.'
    },
    howTo: {
      title: 'How to Use Quick Dump',
      steps: [
        { name: 'Paste your content', text: 'Enter or paste any code, text, JSON, logs, or data into the editor.' },
        { name: 'Format if needed', text: 'Use the formatting tools to beautify JSON or adjust the display.' },
        { name: 'Share securely', text: 'Click "Share" to encrypt and generate a shareable URL. The decryption key is in the URL fragment.' },
        { name: 'Set expiry', text: 'Links expire automatically for maximum security.' }
      ]
    },
    faq: [
      { question: 'How is Quick Dump different from Pastebin?', answer: 'Quick Dump uses client-side encryption. Your content is encrypted in your browser before being stored. The decryption key is in the URL fragment (#), which browsers never send to servers. This means no one — not even DevDeck — can read your shared content.' },
      { question: 'Do shared links expire?', answer: 'Yes. Shared content is ephemeral and expires automatically. This ensures your sensitive data doesn\'t persist indefinitely on the internet.' },
      { question: 'Can I use this without sharing?', answer: 'Yes! Quick Dump works as a local scratch pad too. You can paste and format content without ever sharing it. Nothing is stored unless you explicitly click "Share".' }
    ],
    whyDevDeck: 'Traditional pastebins store your data in plain text on their servers. DevDeck\'s Quick Dump uses zero-knowledge encryption — your content is encrypted before it leaves your browser, and only the person with the link can decrypt it.'
  },

  'lorem-ipsum-placeholder-generator': {
    whatIs: {
      title: 'What is a Lorem Ipsum Generator?',
      content: 'A Lorem Ipsum generator creates placeholder text for use in design mockups, website prototypes, and document templates. Lorem Ipsum is a pseudo-Latin text derived from Cicero\'s "De Finibus Bonorum et Malorum" (45 BC) that has been the industry\'s standard dummy text since the 1500s. Our generator lets you create paragraphs, sentences, or words of Lorem Ipsum text instantly, with customizable amounts and formatting options.'
    },
    howTo: {
      title: 'How to Generate Lorem Ipsum Text',
      steps: [
        { name: 'Choose the type', text: 'Select whether you want paragraphs, sentences, or words of Lorem Ipsum text.' },
        { name: 'Set the amount', text: 'Choose how many paragraphs, sentences, or words you need.' },
        { name: 'Generate', text: 'Click "Generate" to create your placeholder text instantly.' },
        { name: 'Copy to clipboard', text: 'Click "Copy" to copy the generated text for use in your designs or documents.' }
      ]
    },
    faq: [
      { question: 'Why use Lorem Ipsum instead of real text?', answer: 'Lorem Ipsum provides a natural-looking text distribution without distracting readers with actual content. It helps designers and developers focus on visual layout and typography rather than the meaning of the text.' },
      { question: 'Is Lorem Ipsum real Latin?', answer: 'Lorem Ipsum is derived from sections of "De Finibus Bonorum et Malorum" by Cicero (45 BC), but it has been altered and scrambled over the centuries. It is not grammatically correct Latin.' },
      { question: 'Can I generate specific amounts?', answer: 'Yes. You can specify the exact number of paragraphs, sentences, or words you need. Each generation produces slightly different text.' }
    ],
    whyDevDeck: 'DevDeck\'s Lorem Ipsum generator runs instantly in your browser with no ads, no popups, and no unnecessary features. Just clean, fast placeholder text generation.'
  },

  // ═══════════════════════════════════════════════
  // IMAGE TOOLS
  // ═══════════════════════════════════════════════

  'png-jpg-webp-image-converter': {
    whatIs: {
      title: 'What is an Image Format Converter?',
      content: 'An image format converter changes images from one file format to another — for example, converting PNG to JPG, JPG to WebP, or WebP to PNG. Different formats have different strengths: JPEG is best for photographs (small file size with lossy compression), PNG supports transparency and lossless compression, and WebP offers superior compression for both lossy and lossless images. Our free online image converter processes everything in your browser using the Canvas API, so your images are never uploaded to any server.'
    },
    howTo: {
      title: 'How to Convert Images Between PNG, JPG, and WebP',
      steps: [
        { name: 'Upload your image', text: 'Drag and drop or select an image file in any supported format (PNG, JPG, WebP, BMP, GIF).' },
        { name: 'Select output format', text: 'Choose the target format: PNG, JPEG, or WebP.' },
        { name: 'Adjust quality', text: 'For JPEG and WebP, adjust the quality slider to balance file size and image quality.' },
        { name: 'Download converted image', text: 'Click "Download" to save the converted image to your device.' }
      ]
    },
    faq: [
      { question: 'Which format should I choose?', answer: 'Use JPEG for photographs and images where small file size matters. Use PNG when you need transparency or lossless quality. Use WebP for the best compression — it produces 25-34% smaller files than JPEG at equivalent quality.' },
      { question: 'Is quality lost during conversion?', answer: 'Converting to PNG is always lossless. Converting to JPEG or WebP involves lossy compression, so some quality reduction occurs. You can control this with the quality slider.' },
      { question: 'Are my images uploaded to a server?', answer: 'No. All image processing happens entirely in your browser using the HTML5 Canvas API. Your images never leave your device.' },
      { question: 'What is WebP?', answer: 'WebP is a modern image format developed by Google that provides superior lossless and lossy compression for images on the web. It supports transparency (like PNG) and animation (like GIF) while producing significantly smaller files than JPEG or PNG.' }
    ],
    whyDevDeck: 'Most online image converters upload your photos to their servers for processing. DevDeck converts everything locally in your browser — your personal photos, screenshots, and design assets stay completely private.'
  },

  'free-image-resizer-tool': {
    whatIs: {
      title: 'What is an Image Resizer?',
      content: 'An image resizer changes the dimensions (width and height) of an image. Whether you need to resize images for social media posts, website thumbnails, email attachments, or print materials, our free online image resizer lets you specify exact pixel dimensions or scale by percentage. Processing happens 100% in your browser using the Canvas API — your images are never uploaded to any server.'
    },
    howTo: {
      title: 'How to Resize Images Online for Free',
      steps: [
        { name: 'Upload your image', text: 'Select or drag and drop the image you want to resize.' },
        { name: 'Set dimensions', text: 'Enter the desired width and height in pixels, or scale by percentage.' },
        { name: 'Lock aspect ratio', text: 'Toggle "Lock Aspect Ratio" to prevent distortion when resizing.' },
        { name: 'Download resized image', text: 'Click "Download" to save the resized image in your preferred format.' }
      ]
    },
    faq: [
      { question: 'Will resizing reduce image quality?', answer: 'Downsizing (making smaller) generally preserves quality well. Upsizing (making larger) can reduce quality because the browser must interpolate new pixels. For best results when upsizing, use small increments.' },
      { question: 'Can I resize multiple images at once?', answer: 'Currently, the tool processes one image at a time. Each image is processed instantly in your browser.' },
      { question: 'What is aspect ratio locking?', answer: 'When aspect ratio is locked, changing the width automatically adjusts the height (and vice versa) to maintain the image\'s original proportions, preventing distortion.' }
    ],
    whyDevDeck: 'Unlike cloud-based resizers that upload your images, DevDeck resizes everything locally in your browser. Your photos and screenshots stay on your device — completely private.'
  },

  'free-online-image-compressor': {
    whatIs: {
      title: 'What is an Image Compressor?',
      content: 'An image compressor reduces the file size of images while maintaining acceptable visual quality. This is essential for web performance — smaller images mean faster page load times, lower bandwidth usage, and better SEO rankings. Our free online image compressor uses client-side canvas processing to reduce JPEG, PNG, and WebP file sizes by 50-80% without noticeable quality loss. Everything runs in your browser — your images are never uploaded to any server.'
    },
    howTo: {
      title: 'How to Compress Images Online for Free',
      steps: [
        { name: 'Upload your image', text: 'Select or drag and drop the image you want to compress (JPEG, PNG, or WebP).' },
        { name: 'Adjust quality', text: 'Use the quality slider to control the compression level. Lower values = smaller file size.' },
        { name: 'Preview the result', text: 'Compare the original and compressed versions side by side.' },
        { name: 'Download compressed image', text: 'Click "Download" to save the compressed image with the reduced file size.' }
      ]
    },
    faq: [
      { question: 'How much can images be compressed?', answer: 'Typical compression reduces file size by 50-80%. A 5MB photo can often be compressed to under 1MB with minimal visible quality loss. The exact reduction depends on the image content and chosen quality level.' },
      { question: 'Is this like TinyPNG?', answer: 'Yes! DevDeck Image Compressor works similarly to TinyPNG and Squoosh, but with one crucial difference: your images are never uploaded to a server. All compression happens locally in your browser.' },
      { question: 'Does compression affect image dimensions?', answer: 'No. Compression reduces file size without changing the image\'s width or height. If you also need to resize, use our Image Resizer tool.' },
      { question: 'Which format compresses best?', answer: 'WebP generally achieves the best compression ratios, followed by JPEG. PNG files tend to be larger because PNG uses lossless compression. For photos, converting to WebP or JPEG usually produces the smallest files.' }
    ],
    whyDevDeck: 'TinyPNG, Squoosh, and other compressors upload your images to their servers. DevDeck compresses everything in your browser using the Canvas API — your photos, screenshots, and design files never leave your device.'
  },

  'base64-image-encoder': {
    whatIs: {
      title: 'What is Base64 Image Encoding?',
      content: 'Base64 image encoding converts binary image data into an ASCII text string. This allows you to embed images directly in HTML, CSS, or JavaScript without separate image files. Base64-encoded images are useful for small icons, email templates, single-page applications, and reducing HTTP requests. Our free online Base64 encoder converts any image (PNG, JPEG, WebP, GIF, SVG) to a Base64 data URI string that you can embed directly in your code.'
    },
    howTo: {
      title: 'How to Convert Images to Base64',
      steps: [
        { name: 'Upload your image', text: 'Select or drag and drop the image you want to encode (PNG, JPEG, WebP, GIF, SVG).' },
        { name: 'Get the Base64 string', text: 'The Base64-encoded data URI is generated instantly.' },
        { name: 'Choose the format', text: 'Copy as a full data URI (data:image/png;base64,...), raw Base64 string, or CSS background-image snippet.' },
        { name: 'Embed in your code', text: 'Paste the Base64 string into your HTML img src, CSS background-image, or JavaScript code.' }
      ]
    },
    faq: [
      { question: 'When should I use Base64 encoding?', answer: 'Base64 is ideal for small images (icons, logos under 10KB) where reducing HTTP requests improves performance. For large images, Base64 encoding increases file size by ~33%, so regular image files are more efficient.' },
      { question: 'Does Base64 increase file size?', answer: 'Yes. Base64 encoding increases data size by approximately 33%. A 10KB image becomes ~13.3KB in Base64. This trade-off is worthwhile for small images where eliminating an HTTP request is beneficial.' },
      { question: 'Can I use Base64 images in emails?', answer: 'Yes. Base64-embedded images are commonly used in HTML emails because they don\'t require external image hosting. However, some email clients have size limits for embedded images.' }
    ],
    whyDevDeck: 'DevDeck converts images to Base64 entirely in your browser. Your images — including logos, screenshots, and private assets — are never uploaded to any server.'
  },

  'svg-to-react-jsx-converter': {
    whatIs: {
      title: 'What is an SVG to React JSX Converter?',
      content: 'An SVG to React JSX converter transforms raw SVG (Scalable Vector Graphics) code into React-compatible JSX components. SVG attributes like class, xmlns, stroke-width, and fill-opacity need to be converted to their JSX equivalents (className, strokeWidth, fillOpacity) for use in React applications. Our converter handles all attribute transformations, self-closing tags, and generates a clean React functional component that you can drop directly into your project.'
    },
    howTo: {
      title: 'How to Convert SVG to React Components',
      steps: [
        { name: 'Paste your SVG code', text: 'Copy the raw SVG HTML and paste it into the input editor.' },
        { name: 'Convert to JSX', text: 'The converter instantly transforms SVG attributes to JSX equivalents (class→className, stroke-width→strokeWidth, etc.).' },
        { name: 'Copy the component', text: 'Copy the generated React functional component code.' },
        { name: 'Use in your project', text: 'Import and use the component in your React application like any other component.' }
      ]
    },
    faq: [
      { question: 'What SVG attributes are converted?', answer: 'All hyphenated attributes are converted to camelCase (stroke-width → strokeWidth, fill-opacity → fillOpacity). class becomes className, xmlns is preserved, and self-closing tags are properly formatted.' },
      { question: 'Does it support TypeScript (TSX)?', answer: 'Yes. The generated component is valid TypeScript JSX (TSX) with proper React.FC typing. You can use it directly in .tsx files.' },
      { question: 'Can I use this for icon libraries?', answer: 'Yes! This is a common use case. Convert individual SVG icons into React components for use in your component library or design system.' }
    ],
    whyDevDeck: 'Converting SVG to JSX manually is tedious — dozens of attributes need renaming. DevDeck automates this instantly in your browser, keeping your SVG assets and design system private.'
  },

  'vector-qr-code-generator': {
    whatIs: {
      title: 'What is a QR Code Generator?',
      content: 'A QR code generator converts text, URLs, or data into a scannable QR (Quick Response) code image. QR codes are 2D barcodes that can be scanned by smartphone cameras to quickly open websites, share contact information, join Wi-Fi networks, or display text. Our free online QR code generator creates high-quality, customizable vector QR codes that you can download as SVG (scalable) or PNG. All generation happens locally in your browser.'
    },
    howTo: {
      title: 'How to Generate QR Codes Online',
      steps: [
        { name: 'Enter your content', text: 'Type or paste the URL, text, or data you want to encode into a QR code.' },
        { name: 'Customize appearance', text: 'Adjust colors, size, error correction level, and other visual options.' },
        { name: 'Preview the QR code', text: 'See a live preview of your QR code as you make changes.' },
        { name: 'Download', text: 'Download the QR code as SVG (vector — scalable to any size) or PNG (raster).' }
      ]
    },
    faq: [
      { question: 'What can I encode in a QR code?', answer: 'You can encode URLs, plain text, email addresses, phone numbers, Wi-Fi credentials, vCard contact information, and any other text data. URLs are the most common use case.' },
      { question: 'What is error correction level?', answer: 'QR codes have built-in error correction that allows them to be read even if partially damaged. Levels range from L (7% recovery) to H (30% recovery). Higher levels make the QR code more robust but slightly more complex.' },
      { question: 'Should I download SVG or PNG?', answer: 'Choose SVG if you need to resize the QR code (for print or large displays) — SVGs scale infinitely without losing quality. Choose PNG for web use or social media where a raster image is needed.' },
      { question: 'Are the QR codes free to use commercially?', answer: 'Yes. QR codes generated by DevDeck are completely free for personal and commercial use. There are no watermarks, no attribution required, and no usage limits.' }
    ],
    whyDevDeck: 'DevDeck generates QR codes entirely in your browser using qrcode.react. Your URLs, Wi-Fi passwords, and other encoded data are never sent to any server.'
  },

  // ═══════════════════════════════════════════════
  // PDF TOOLS
  // ═══════════════════════════════════════════════

  'merge-pdf-files-free': {
    whatIs: {
      title: 'What is a PDF Merger?',
      content: 'A PDF merger combines multiple PDF files into a single document. This is useful for combining invoices, reports, scanned pages, or any documents that need to be consolidated. Our free online PDF merger lets you drag and drop multiple PDFs, reorder them visually, and merge them into one file — all processed 100% in your browser using pdf-lib. Your documents are never uploaded to any server, making it safe for confidential files.'
    },
    howTo: {
      title: 'How to Merge PDF Files Online for Free',
      steps: [
        { name: 'Add PDF files', text: 'Click "Add Files" or drag and drop multiple PDF files into the upload area.' },
        { name: 'Reorder if needed', text: 'Drag and drop files to arrange them in your desired order.' },
        { name: 'Click Merge', text: 'Click the "Merge" button to combine all PDFs into a single document.' },
        { name: 'Download merged PDF', text: 'The merged PDF is generated instantly. Click "Download" to save it.' }
      ]
    },
    faq: [
      { question: 'Is there a limit on the number of files?', answer: 'There is no hard limit on the number of PDFs you can merge. Since processing happens in your browser, the practical limit depends on your device\'s available memory. Most devices handle 20-50 PDFs easily.' },
      { question: 'Are my PDFs uploaded to a server?', answer: 'No. DevDeck uses pdf-lib (a JavaScript library) to merge PDFs entirely in your browser. Your files never leave your device — this is safe for confidential legal documents, financial records, and personal files.' },
      { question: 'Does merging preserve formatting?', answer: 'Yes. PDF merging preserves all original formatting including text, images, links, bookmarks, and page layouts. It simply combines the pages into a single file.' },
      { question: 'Can I merge password-protected PDFs?', answer: 'Currently, password-protected PDFs must be unlocked before merging. You can use our Protect PDF tool to add password protection after merging.' }
    ],
    whyDevDeck: 'Most PDF merging websites upload your files to their servers — a major privacy concern for sensitive documents. DevDeck merges PDFs 100% in your browser using pdf-lib. Your contracts, invoices, and personal documents never leave your device.'
  },

  'split-extract-pdf-pages': {
    whatIs: {
      title: 'What is a PDF Splitter?',
      content: 'A PDF splitter extracts specific pages or page ranges from a PDF document, creating a new, smaller PDF. This is useful for extracting a single chapter from a book, specific pages from a report, or splitting a large document into smaller sections. Our free online PDF splitter processes everything in your browser — your documents are never uploaded to any server.'
    },
    howTo: {
      title: 'How to Split and Extract PDF Pages Online',
      steps: [
        { name: 'Upload your PDF', text: 'Select or drag and drop the PDF file you want to split.' },
        { name: 'Select pages', text: 'Enter the page numbers or ranges you want to extract (e.g., 1-5, 8, 12-15).' },
        { name: 'Extract pages', text: 'Click "Split" to create a new PDF with only the selected pages.' },
        { name: 'Download the result', text: 'Download the new PDF containing only your selected pages.' }
      ]
    },
    faq: [
      { question: 'Can I extract non-consecutive pages?', answer: 'Yes. You can specify individual pages and ranges in any order, e.g., "1, 3, 5-10, 15". The pages will be extracted in the order you specify.' },
      { question: 'Does splitting preserve the original PDF?', answer: 'Yes. The original PDF is never modified. Splitting creates a new PDF file containing only the extracted pages.' },
      { question: 'Is there a page limit?', answer: 'No. You can split PDFs of any size. Performance depends on your browser and device capabilities.' }
    ],
    whyDevDeck: 'DevDeck splits PDFs using pdf-lib, running entirely in your browser. Your legal documents, medical records, and confidential reports never leave your device.'
  },

  'convert-image-to-pdf': {
    whatIs: {
      title: 'What is an Image to PDF Converter?',
      content: 'An image to PDF converter combines one or more images (JPG, PNG, WebP) into a PDF document. This is useful for creating PDF documents from scanned pages, photo collections, or design assets. Our free online image to PDF converter lets you add multiple images, reorder them, and generate a PDF — all processed locally in your browser. Your images are never uploaded to any server.'
    },
    howTo: {
      title: 'How to Convert Images to PDF Online',
      steps: [
        { name: 'Add images', text: 'Select or drag and drop JPG, PNG, or WebP images you want to convert.' },
        { name: 'Reorder pages', text: 'Drag and drop to arrange images in your desired page order.' },
        { name: 'Adjust settings', text: 'Configure page size, orientation, and margins if needed.' },
        { name: 'Generate PDF', text: 'Click "Convert" to create a PDF with each image as a separate page. Download the result.' }
      ]
    },
    faq: [
      { question: 'What image formats are supported?', answer: 'The converter supports JPG/JPEG, PNG, and WebP image formats. Each image becomes one page in the resulting PDF.' },
      { question: 'Can I control the page size?', answer: 'Yes. You can set the PDF page size (A4, Letter, etc.) and choose between portrait and landscape orientation.' },
      { question: 'Is there a limit on the number of images?', answer: 'There is no hard limit. The practical limit depends on your browser\'s available memory. Most devices handle 50-100 images easily.' }
    ],
    whyDevDeck: 'DevDeck converts images to PDF entirely in your browser. Your personal photos, scanned documents, and design assets never leave your device.'
  },

  'password-protect-pdf-file': {
    whatIs: {
      title: 'What is PDF Password Protection?',
      content: 'PDF password protection encrypts a PDF document so that it can only be opened with the correct password. This is essential for securing confidential documents like financial reports, legal contracts, medical records, and personal documents before sharing via email or cloud storage. Our free online PDF protector encrypts your document entirely in your browser — the PDF and password never leave your device.'
    },
    howTo: {
      title: 'How to Password Protect a PDF Online',
      steps: [
        { name: 'Upload your PDF', text: 'Select or drag and drop the PDF file you want to protect.' },
        { name: 'Set a password', text: 'Enter a strong password that will be required to open the document.' },
        { name: 'Encrypt the PDF', text: 'Click "Protect" to encrypt the PDF with your chosen password.' },
        { name: 'Download protected PDF', text: 'Download the encrypted PDF. It will require the password to open.' }
      ]
    },
    faq: [
      { question: 'What encryption is used?', answer: 'DevDeck uses pdf-lib to apply PDF encryption. The document is encrypted so that it requires the password to open and view the contents.' },
      { question: 'Can I remove password protection?', answer: 'This tool adds password protection. To remove protection, you would need the original password and a PDF decryption tool.' },
      { question: 'Is my password stored anywhere?', answer: 'No. Your password is used only in your browser to encrypt the PDF. It is never transmitted, logged, or stored on any server.' },
      { question: 'Will recipients need special software?', answer: 'No. Password-protected PDFs can be opened with any standard PDF reader (Adobe Acrobat, Chrome, Preview, etc.) by entering the correct password.' }
    ],
    whyDevDeck: 'Most online PDF encryption tools upload your sensitive documents to their servers — a massive security risk. DevDeck encrypts PDFs entirely in your browser. Your documents and passwords never leave your device.'
  }
};
