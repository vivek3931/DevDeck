import { Metadata } from 'next';
import PasswordGeneratorClient from './PasswordGeneratorClient';

export const metadata: Metadata = {
  title: 'Secure Password Generator | DevDeck',
  description: 'Generate cryptographically secure passwords locally on your machine. Customizable length and character sets. No data is sent to servers.',
  openGraph: {
    title: 'Secure Password Generator | DevDeck',
    description: 'Generate cryptographically secure passwords locally on your machine. Customizable length and character sets. No data is sent to servers.',
  }
};

export default function PasswordGeneratorPage() {
  return <PasswordGeneratorClient />;
}
