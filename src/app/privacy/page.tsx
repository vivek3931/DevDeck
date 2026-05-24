import { Metadata } from 'next';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata: Metadata = {
  title: 'Privacy Policy | DevDeck',
  description: 'Our privacy policy detailing our local-first approach.',
};

export default function PrivacyPolicyPage() {
  return (
    <article style={{ marginTop: 'var(--spacing-section)' }}>
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

          <h2>3. Quick Dump Feature</h2>
          <p style={{ marginTop: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
            The Quick Dump feature allows you to sync data across devices. By using this feature, you consent to temporarily storing text or files on our Firebase backend. <strong>All data is automatically and permanently deleted after 5 minutes.</strong>
          </p>
        </div>
      </ColorBlock>
    </article>
  );
}
