import { Suspense } from 'react';
import { Metadata } from 'next';
import QuickDumpClient from './QuickDumpClient';

export const metadata: Metadata = {
  title: 'Secure Online Text Sharing & Pastebin | Quick Dump | DevDeck',
  description: 'Free online text sharing. Paste text, JSON, or links securely. Get a 4-letter code and fetch it on any device instantly.',
  openGraph: {
    title: 'Secure Online Text Sharing & Pastebin | Quick Dump | DevDeck',
    description: 'Free online text sharing. Paste text, JSON, or links securely. Get a 4-letter code and fetch it on any device instantly.',
  }
};

export default function QuickDumpPage() {
  return (
    <Suspense fallback={<div style={{ padding: 'var(--spacing-xxl)', textAlign: 'center' }}>Loading Secure Sandbox...</div>}>
      <QuickDumpClient />
    </Suspense>
  );
}
