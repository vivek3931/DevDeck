import { Metadata } from 'next';
import ImageCompressorClient from './ImageCompressorClient';

export const metadata: Metadata = {
  title: 'Client-Side Image Compressor | DevDeck',
  description: 'Compress JPEGs, scale aspect ratios, and crop files entirely client-side without uploading them anywhere. Complete privacy.',
  openGraph: {
    title: 'Client-Side Image Compressor | DevDeck',
    description: 'Compress JPEGs, scale aspect ratios, and crop files entirely client-side without uploading them anywhere. Complete privacy.',
  }
};

export default function ImageCompressorPage() {
  return <ImageCompressorClient />;
}
