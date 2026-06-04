import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import JwtDecoderClient from './JwtDecoderClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata: Metadata = {
  title: 'Free Online JWT Decoder | Secure in your Browser JSON Web Token Viewer | DevDeck',
  description: 'Decode, view, and inspect JSON Web Tokens (JWT) entirely locally. Your sensitive tokens are never sent to a server.',
};

export default function JwtDecoderPage() {
  return (
    <article>
      <ColorBlock color="mint">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>JWT Decoder</h1>
            <p className="body-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Decode JSON Web Tokens instantly and completely locally. Your sensitive tokens are never sent to a server.
            </p>
          </header>
          <main>
            <JwtDecoderClient />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
