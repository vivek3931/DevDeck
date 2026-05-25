import { Metadata } from 'next';
import LoremIpsumClient from './LoremIpsumClient';

export const metadata: Metadata = {
  title: 'Free Online Lorem Ipsum Generator | Dummy Text Maker | DevDeck',
  description: 'Generate random Lorem Ipsum dummy text for your UI designs and websites instantly. Free online placeholder text generator.',
  openGraph: {
    title: 'Free Online Lorem Ipsum Generator | Dummy Text Maker | DevDeck',
    description: 'Generate random Lorem Ipsum dummy text for your UI designs and websites instantly. Free online placeholder text generator.',
  }
};

export default function LoremIpsumPage() {
  return <LoremIpsumClient />;
}
