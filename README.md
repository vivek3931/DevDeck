# DevDeck

![DevDeck Preview](https://devdeck.online/logo.svg)

> **[devdeck.online](https://devdeck.online)** — A Privacy-First, Zero-Knowledge Developer Utilities Toolkit.

DevDeck is an elegant, highly-optimized suite of micro-tools designed for developers who care about data privacy. Unlike typical web-based formatters or tools that send your API keys, unreleased code, and JSON payloads to third-party servers, DevDeck executes almost entirely in your browser using modern Web APIs and local device memory.

## 🛡️ The Local-First Promise

* **Zero-Knowledge Architecture:** For features that require network transfers (like Quick Dump), data is encrypted locally using `AES-GCM` before transmission. The server never receives the decryption key.
* **Client-Side Execution:** Tools like the Image Compressor use Web Workers to process data entirely in your local RAM.
* **No Tracking:** No external analytics trackers or hidden server payloads.

## 🛠️ Features

* **Quick Dump:** Securely share text, code, or files using an ephemeral, End-to-End Encrypted (E2EE) link. Includes "Burn After Read" functionality with real-time sender polling.
* **Text Toolkit:** Format JSON, minify payloads, and encode/decode Base64 and URLs. Includes rapid string case transformations.
* **Secure Password Generator:** Generates cryptographically secure keys and passwords offline using `window.crypto.getRandomValues()`.
* **Image Compressor:** Compresses high-resolution images rapidly using local Web Workers.
* **Vector QR Code Generator:** Creates infinitely scalable SVG-based QR codes that can be downloaded instantly.
* **Epoch Time Converter:** Converts UNIX timestamps using your system's native local time zone.
* **Lorem Ipsum Generator:** Quickly generates mock text for UI designs.

## 🎨 Architecture & UI

Built for performance and aesthetics:
- **Framework:** Next.js (App Router)
- **State Management:** Zustand (for Global Clipboard Memory & Audit Logging)
- **Database/Storage:** Supabase (Used strictly as a "blind mailbox" for encrypted blobs)
- **Styling:** Custom CSS Modules with a distinct Neobrutalist, dark-mode-first aesthetic. No bloated component libraries.

## 🚀 Development Setup

To run this project locally:

1. Clone the repository:
```bash
git clone https://github.com/vivek3931/DevDeck.git
```

2. Install dependencies:
```bash
npm install
```

3. Setup Environment Variables:
Copy the example environment file and fill in your Supabase credentials:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
