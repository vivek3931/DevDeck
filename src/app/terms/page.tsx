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

          <h2>3. Temporary Storage</h2>
          <p style={{ marginTop: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
            Do not use the Quick Dump feature for illegal or harmful content. We reserve the right to wipe any synced data at any time without notice. 
          </p>
        </div>
      </ColorBlock>
    </article>
  );
}
