import { Metadata } from 'next';
import TipCalculatorClient from './TipCalculatorClient';

export const metadata: Metadata = {
  title: 'Utility Tip Calculator | DevDeck',
  description: 'Quick math for splitting bills or calculating tips instantly.',
  openGraph: {
    title: 'Utility Tip Calculator | DevDeck',
    description: 'Quick math for splitting bills or calculating tips instantly.',
  }
};

export default function TipCalculatorPage() {
  return <TipCalculatorClient />;
}
