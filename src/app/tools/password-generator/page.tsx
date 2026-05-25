import { Metadata } from 'next';
import PasswordGeneratorClient from './PasswordGeneratorClient';

export const metadata: Metadata = {
  title: 'Secure Online Password Generator | Random Password Maker | DevDeck',
  description: 'Create strong, cryptographically secure passwords locally in your browser. Free online random password generator.',
  openGraph: {
    title: 'Secure Online Password Generator | Random Password Maker | DevDeck',
    description: 'Create strong, cryptographically secure passwords locally in your browser. Free online random password generator.',
  }
};

export default function PasswordGeneratorPage() {
  return <PasswordGeneratorClient />;
}
