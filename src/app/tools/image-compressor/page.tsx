import { Metadata } from 'next';
import ImageCompressorClient from './ImageCompressorClient';

export const metadata: Metadata = {
  title: 'Free Online Image Compressor | Compress JPEG & PNG Offline | DevDeck',
  description: 'Compress images online for free without uploading them to a server. Secure, offline-first image compression in your browser.',
  openGraph: {
    title: 'Free Online Image Compressor | Compress JPEG & PNG Offline | DevDeck',
    description: 'Compress images online for free without uploading them to a server. Secure, offline-first image compression in your browser.',
  }
};

export default function ImageCompressorPage() {
  return <ImageCompressorClient />;
}
