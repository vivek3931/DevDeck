import { Metadata } from 'next';
import LoremIpsumClient from './LoremIpsumClient';

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator | DevDeck',
  description: 'Generate mock placeholder paragraphs, sentences, or words for UI testing. Clean, fast, and local.',
  openGraph: {
    title: 'Lorem Ipsum Generator | DevDeck',
    description: 'Generate mock placeholder paragraphs, sentences, or words for UI testing. Clean, fast, and local.',
  }
};

export default function LoremIpsumPage() {
  return <LoremIpsumClient />;
}
