import { Metadata } from 'next';
import ScratchpadClient from './ScratchpadClient';

export const metadata: Metadata = {
  title: 'Free Online Notepad & Scratchpad | Browser Sticky Notes | DevDeck',
  description: 'A free online scratchpad for developers. Take quick notes, format JSON, and save snippets locally in your browser.',
  openGraph: {
    title: 'Free Online Notepad & Scratchpad | Browser Sticky Notes | DevDeck',
    description: 'A free online scratchpad for developers. Take quick notes, format JSON, and save snippets locally in your browser.',
  }
};

export default function ScratchpadPage() {
  return <ScratchpadClient />;
}
