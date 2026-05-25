import { Metadata } from 'next';
import TipCalculatorClient from './TipCalculatorClient';

export const metadata: Metadata = {
  title: 'Free Online Tip Calculator | Split Bill Calculator | DevDeck',
  description: 'Easily calculate tips and split restaurant bills among friends. A fast, free online tip calculator.',
  openGraph: {
    title: 'Free Online Tip Calculator | Split Bill Calculator | DevDeck',
    description: 'Easily calculate tips and split restaurant bills among friends. A fast, free online tip calculator.',
  }
};

export default function TipCalculatorPage() {
  return <TipCalculatorClient />;
}
