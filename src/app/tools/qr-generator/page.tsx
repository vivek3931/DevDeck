import { Metadata } from 'next';
import QrGeneratorClient from './QrGeneratorClient';

export const metadata: Metadata = {
  title: 'Vector QR Code Generator | DevDeck',
  description: 'Convert URLs or localized text into downloadable vector QR codes directly in your browser. Fast, local, and privacy-focused.',
  openGraph: {
    title: 'Vector QR Code Generator | DevDeck',
    description: 'Convert URLs or localized text into downloadable vector QR codes directly in your browser. Fast, local, and privacy-focused.',
  }
};

export default function QrGeneratorPage() {
  return <QrGeneratorClient />;
}
