import { Metadata } from 'next';
import EpochConverterClient from './EpochConverterClient';

export const metadata: Metadata = {
  title: 'Free Online Epoch Converter | Timestamp to Date | DevDeck',
  description: 'Instantly convert UNIX timestamps to human-readable dates. A free, online, and privacy-focused epoch converter for developers.',
  openGraph: {
    title: 'Free Online Epoch Converter | Timestamp to Date | DevDeck',
    description: 'Instantly convert UNIX timestamps to human-readable dates. A free, online, and privacy-focused epoch converter for developers.',
  }
};

export default function EpochConverterPage() {
  return <EpochConverterClient />;
}
