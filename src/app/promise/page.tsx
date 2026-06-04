import { Metadata } from 'next';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata: Metadata = {
  title: 'Local First Promise | DevDeck',
  description: 'Our commitment to local-first development.',
};

export default function PromisePage() {
  return (
    <article>
      <ColorBlock color="lilac">
        <h1 className="display-lg">The Local-First Promise</h1>
        <p className="subhead" style={{ marginTop: 'var(--spacing-sm)' }}>
          Why we built DevDeck.
        </p>

        <div style={{ 
          backgroundColor: 'var(--color-canvas)', 
          padding: 'var(--spacing-xxl)', 
          borderRadius: 'var(--rounded-lg)', 
          marginTop: 'var(--spacing-xl)',
          border: '1px solid var(--color-hairline)',
          color: 'var(--color-ink)'
        }}>
          <h2>The Problem</h2>
          <p style={{ marginTop: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
            Developers often need to format JSON, generate hashes, or convert timestamps. Searching Google for &quot;JSON formatter&quot; leads to dozens of ad-filled sites that send your potentially sensitive API payloads to unknown servers.
          </p>

          <h2>Our Solution</h2>
          <p style={{ marginTop: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
            DevDeck is a suite of micro-tools designed to execute entirely in your browser using Client Components and Web APIs. We promise:
          </p>

          <ul style={{ paddingLeft: 'var(--spacing-lg)' }}>
            <li style={{ marginBottom: 'var(--spacing-xs)' }}>Your passwords are generated locally using Cryptography APIs.</li>
            <li style={{ marginBottom: 'var(--spacing-xs)' }}>Your images are compressed using Web Workers, never uploaded.</li>
            <li style={{ marginBottom: 'var(--spacing-xs)' }}>Your sensitive JSON Web Tokens (JWTs) are decoded purely in-RAM.</li>
            <li style={{ marginBottom: 'var(--spacing-xs)' }}><strong>Client-Side First:</strong> Core utilities are cached via Service Worker, meaning you can cut your internet connection entirely and keep working.</li>
            <li style={{ marginBottom: 'var(--spacing-xs)' }}><strong>End-to-End Encrypted Cloud:</strong> Any tool that requires sharing (like Quick Dump) uses Client-Side Encryption. We only touch encrypted ciphertext.</li>
          </ul>

          <p style={{ marginTop: 'var(--spacing-lg)' }}>
            Code with confidence, knowing your data is secure.
          </p>
        </div>
      </ColorBlock>
    </article>
  );
}
