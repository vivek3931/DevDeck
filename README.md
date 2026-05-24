<div align="center">
  <img src="public/logo.svg" alt="DevDeck Logo" width="300" />

  <h3 align="center">Your Private, Local-First Developer Utility Belt</h3>

  <p align="center">
    Convert, generate, format, and sketch directly in your browser. No tracking. No server logs. Total focus.
    <br />
    <br />
    <a href="#features"><strong>Explore Features »</strong></a>
    <br />
    <br />
    <a href="https://github.com/vivek3931/devdeck/issues">Report Bug</a>
    ·
    <a href="https://github.com/vivek3931/devdeck/issues">Request Feature</a>
  </p>
</div>

---

## ⚡ Why DevDeck?

Developers often need to format JSON, generate hashes, or convert timestamps. Searching Google for "JSON formatter" leads to dozens of ad-filled sites that send your potentially sensitive API payloads to unknown servers. 

**DevDeck solves this.** It is a comprehensive suite of micro-tools designed to execute entirely in your browser using Client Components and modern Web APIs. 

What happens on your machine, stays on your machine.

---

## 🛠 Features & Tools

DevDeck groups everything you need into a single, cohesive, distraction-free dashboard.

### Text & String Utilities
* **Text Toolkit**: String manipulation, Case conversions (camelCase, snake_case), URL encode/decode, Base64 encode/decode, and JSON minification/formatting.
* **Lorem Ipsum Generator**: Quickly generate mock paragraphs, sentences, or words for UI testing.

### Security & Data
* **Secure Password Generator**: Generate cryptographically secure passwords locally using Web Crypto APIs. Customize length and character types.
* **Epoch Converter**: Instantly convert UNIX timestamps to human-readable UTC dates, and vice versa.

### Media & Design
* **Vector QR Code Generator**: Render high-quality QR codes instantly using React, with 1-click SVG downloads.
* **Image Compressor**: Uses a web-worker to resize and compress JPEGs/PNGs entirely offline within the browser canvas.

### Calculations
* **Unit Converter**: Fast conversion for Data Sizes (Bytes to TB) and Metric Distances.
* **Tip Calculator**: Quick math for splitting bills during your lunch break.

### Sandbox & Workflow
* **Quick Dump**: A Firebase-powered cross-device syncing tool. Generates an expiring 4-letter code and a QR code. Supports text payloads and file attachments. Data self-destructs after 5 minutes.
* **Daily Scratchpad**: A masonry-style grid of color-coded sticky notes that persist automatically in your browser's local storage.
* **Pomodoro Focus Clock**: Built-in interval concentration timer (25m / 5m) to structure your coding cycles.

### Global Features
* **Command Palette (Ctrl+K)**: Never reach for the mouse. Instantly search and jump to any tool.
* **Audit Log & Clipboard Manager**: DevDeck tracks everything you generate or copy locally, so you can easily recover a lost timestamp or password generated earlier in your session.

---

## 🏗 Tech Stack

DevDeck is built for speed, relying on a modern, robust architecture:

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS Modules (Strict local scoping, high-performance)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with `localStorage` persistence)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend (For Quick Dump)**: Firebase (Firestore & Storage)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need Node.js and NPM installed on your machine.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/yourusername/devdeck.git
   ```
2. Install NPM packages
   ```sh
   cd devdeck
   npm install
   ```
3. Set up your Firebase Environment Variables for the Quick Dump feature. Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```
4. Start the development server
   ```sh
   npm run dev
   ```

---

## 🔒 The Local-First Promise

We promise:
- Your passwords are generated locally using Cryptography APIs.
- Your images are compressed using Web Workers, never uploaded.
- Your text manipulations never leave your RAM.
- Your QR codes are rendered as SVG elements directly in the DOM.

Code with confidence, knowing your data is secure. 

For full details, read our [Privacy Policy](/privacy) and [Local First Promise](/promise).

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
