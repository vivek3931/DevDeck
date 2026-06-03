import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import PdfProtectClient from './PdfProtectClient';
import { ColorBlock } from '@/components/ui/ColorBlock';

export const metadata: Metadata = {
  title: 'Password Protect PDF Offline | Encrypt PDF | DevDeck',
  description: 'Add a password to your PDF document instantly. 100% offline, pure client-side processing means your sensitive documents never leave your device.',
  openGraph: {
    title: 'Password Protect PDF Offline | Encrypt PDF | DevDeck',
    description: 'Add a password to your PDF document instantly. 100% offline, pure client-side processing.',
  }
};

export default function PdfProtectPage() {
  return (
    <article>
      <ColorBlock color="cream">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginBottom: 'var(--spacing-md)', fontWeight: 500, opacity: 0.8 }}>
              <ArrowLeft size={16} /> Back to Tools
            </Link>
            <h1 className="display-md" style={{ marginBottom: 'var(--spacing-sm)' }}>Password Protect PDF</h1>
            <p className="body-lg" style={{ color: 'var(--color-ink-muted)' }}>
              Encrypt and secure your PDF document with a password. 100% offline.
            </p>
          </header>
          <main>
            <PdfProtectClient />
          </main>
        </div>
      </ColorBlock>
    </article>
  );
}
