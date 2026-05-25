import { Metadata } from 'next';
import JwtDecoderClient from './JwtDecoderClient';

export const metadata: Metadata = {
  title: 'Local JWT Decoder | DevDeck',
  description: 'Instantly decode JSON Web Tokens locally. A privacy-focused developer utility.',
};

export default function JwtDecoderPage() {
  return <JwtDecoderClient />;
}
