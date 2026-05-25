import { Metadata } from 'next';
import JwtDecoderClient from './JwtDecoderClient';

export const metadata: Metadata = {
  title: 'Free Online JWT Decoder | Secure Offline JSON Web Token Viewer | DevDeck',
  description: 'Decode, view, and inspect JSON Web Tokens (JWT) entirely offline. Your sensitive tokens are never sent to a server.',
};

export default function JwtDecoderPage() {
  return <JwtDecoderClient />;
}
