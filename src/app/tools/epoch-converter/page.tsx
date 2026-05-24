import { Metadata } from 'next';
import EpochConverterClient from './EpochConverterClient';

export const metadata: Metadata = {
  title: 'Live Epoch & UNIX Timestamp Converter | DevDeck',
  description: 'Quickly convert UNIX timestamps to human-readable UTC and local dates. A privacy-focused, zero-tracking developer utility.',
  openGraph: {
    title: 'Live Epoch & UNIX Timestamp Converter | DevDeck',
    description: 'Quickly convert UNIX timestamps to human-readable UTC and local dates. A privacy-focused, zero-tracking developer utility.',
  }
};

export default function EpochConverterPage() {
  return <EpochConverterClient />;
}
