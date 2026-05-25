import { Metadata } from 'next';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata: Metadata = {
  title: 'Terms of Service | DevDeck',
  description: 'Terms of service for using DevDeck.',
};

export default function TermsOfServicePage() {
  return (
    <article style={{ marginTop: 'var(--spacing-section)' }}>
      <ColorBlock color="mint">
        <h1 className="display-lg">Terms of Service</h1>
        <p className="subhead" style={{ marginTop: 'var(--spacing-sm)' }}>
          Simple rules for using our tools.
        </p>

        <div style={{ 
          backgroundColor: 'var(--color-canvas)', 
          padding: 'var(--spacing-xxl)', 
          borderRadius: 'var(--rounded-lg)', 
          marginTop: 'var(--spacing-xl)',
          border: '1px solid var(--color-hairline)',
          color: 'var(--color-ink)'
        }}>
          <h2>1. Acceptance of Terms</h2>
          <p style={{ marginTop: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
            By using DevDeck, you agree to these terms. If you disagree, simply close the browser tab.
          </p>

          <h2>2. Use at Your Own Risk</h2>
          <p style={{ marginTop: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
            DevDeck provides tools &quot;as-is&quot;. We make no guarantees regarding the accuracy or reliability of conversions, calculations, or generators provided. Please double-check critical values.
          </p>

          <h2>3. Temporary & Encrypted Storage</h2>
          <p style={{ marginTop: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
            Do not use the Quick Dump feature for illegal or harmful content, although we mathematically cannot read your encrypted data. Because Quick Dump relies on Zero-Knowledge architecture, we cannot recover your data if you lose your share link, and we cannot recover your encryption key under any circumstances. We reserve the right to wipe any synced ciphertext at any time.
          </p>
        </div>
      </ColorBlock>
    </article>
  );
}
