import { Metadata } from 'next';
import QrGeneratorClient from './QrGeneratorClient';

export const metadata: Metadata = {
  title: 'Free Online QR Code Generator | Download SVG & PNG | DevDeck',
  description: 'Create and download QR codes for URLs, text, and Wi-Fi instantly. Free online QR code generator running locally in your browser.',
  openGraph: {
    title: 'Free Online QR Code Generator | Download SVG & PNG | DevDeck',
    description: 'Create and download QR codes for URLs, text, and Wi-Fi instantly. Free online QR code generator running locally in your browser.',
  }
};

export default function QrGeneratorPage() {
  return <QrGeneratorClient />;
}
