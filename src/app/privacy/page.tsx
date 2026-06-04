import { Metadata } from 'next';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata: Metadata = {
  title: 'Privacy Policy | DevDeck',
  description: 'Our privacy policy detailing our local-first approach.',
};

export default function PrivacyPolicyPage() {
  return (
    <article>
      <ColorBlock color="pink">
        <h1 className="display-lg">Privacy Policy</h1>
        <p className="subhead" style={{ marginTop: 'var(--spacing-sm)' }}>
          We believe what happens on your machine, stays on your machine.
        </p>

        <div style={{ 
          backgroundColor: 'var(--color-canvas)', 
          padding: 'var(--spacing-xxl)', 
          borderRadius: 'var(--rounded-lg)', 
          marginTop: 'var(--spacing-xl)',
          border: '1px solid var(--color-hairline)',
          color: 'var(--color-ink)'
        }}>
          <h2>1. Local First Approach</h2>
          <p style={{ marginTop: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
            All tools provided by DevDeck are designed to run locally within your browser using modern Web APIs. We do not transmit your data to any external servers unless explicitly required for a specific feature you opt into (like Quick Dump).
          </p>

          <h2>2. Data Collection</h2>
          <p style={{ marginTop: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
            We do not collect analytics, telemetry, or tracking data. Your Scratchpad notes, Clipboard history, and Audit Logs are stored entirely within your browser&apos;s <code>localStorage</code>.
          </p>

          <h2>3. Zero-Knowledge Quick Dump</h2>
          <p style={{ marginTop: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
            The Quick Dump feature allows you to sync data across devices. To protect your privacy, this feature uses <strong>Zero-Knowledge End-to-End Encryption</strong>. Your text and files are encrypted locally in your browser using AES-GCM before being uploaded. The encryption key is included in the URL fragment (<code>#hash</code>) which is never sent to our servers. We store only the ciphertext. Even if our servers are compromised, your data cannot be read without your specific share link. <strong>All ciphertext is permanently deleted when it expires or after its first read if Burn After Read is enabled.</strong>
          </p>

          <h2>4. Client-Side Processing</h2>
          <p style={{ marginTop: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
            Tools such as the <strong>JSONPath Playground</strong>, <strong>Local SQLite Explorer</strong>, <strong>Image Compressor</strong>, <strong>QR Code Generator</strong>, and <strong>SVG to React Converter</strong> perform all processing entirely on your local CPU. Your databases, image files, JSON payloads, and SVG code are never uploaded to any external server.
          </p>

          <h2>5. client-side Capability (PWA)</h2>
          <p style={{ marginTop: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
            DevDeck is built as a Progressive Web App (PWA). Once loaded, the core application logic is cached on your device. This ensures that your sensitive data (like in the JWT Decoder) physically cannot be transmitted when you disconnect from the internet.
          </p>
        </div>
      </ColorBlock>
    </article>
  );
}
