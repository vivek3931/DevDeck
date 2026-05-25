import { Metadata } from 'next';
import UnitConverterClient from './UnitConverterClient';

export const metadata: Metadata = {
  title: 'Free Online Unit Converter | Distance, Weight & Data Size | DevDeck',
  description: 'Convert between metric units, distances, and data sizes (KB, MB, GB). Free online unit converter tool.',
  openGraph: {
    title: 'Free Online Unit Converter | Distance, Weight & Data Size | DevDeck',
    description: 'Convert between metric units, distances, and data sizes (KB, MB, GB). Free online unit converter tool.',
  }
};

export default function UnitConverterPage() {
  return <UnitConverterClient />;
}
