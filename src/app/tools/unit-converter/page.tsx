import { Metadata } from 'next';
import UnitConverterClient from './UnitConverterClient';

export const metadata: Metadata = {
  title: 'Metric & Data Unit Converter | DevDeck',
  description: 'Instantly convert between metric dimensions, distances, and data sizes (Bytes, Kilobytes, Megabytes, etc.) directly in your browser.',
  openGraph: {
    title: 'Metric & Data Unit Converter | DevDeck',
    description: 'Instantly convert between metric dimensions, distances, and data sizes (Bytes, Kilobytes, Megabytes, etc.) directly in your browser.',
  }
};

export default function UnitConverterPage() {
  return <UnitConverterClient />;
}
