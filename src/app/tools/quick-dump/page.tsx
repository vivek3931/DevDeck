import { Metadata } from 'next';
import QuickDumpClient from './QuickDumpClient';

export const metadata: Metadata = {
  title: 'Quick Text Sync & Code Dump | DevDeck',
  description: 'Paste text or links, get a secure 4-letter code, and fetch it on any device instantly. Data self-destructs in 5 minutes.',
  openGraph: {
    title: 'Quick Text Sync & Code Dump | DevDeck',
    description: 'Paste text or links, get a secure 4-letter code, and fetch it on any device instantly. Data self-destructs in 5 minutes.',
  }
};

export default function QuickDumpPage() {
  return <QuickDumpClient />;
}
