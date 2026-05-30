import { Metadata } from 'next';
import { ColorBlock } from '@/components/ui/ColorBlock';
import ApiTesterClient from './ApiTesterClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'API Request Tester | DevDeck',
  description: 'Test REST API endpoints with a lightweight, private client-side UI.',
};

export default function ApiTesterPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ColorBlock color="navy" style={{ flexGrow: 1 }}>
        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', marginBottom: 'var(--spacing-md)' }}>
            <ArrowLeft size={16} /> Back to Tools
          </Link>
          <h1 className="display-lg" style={{ color: 'var(--color-inverse-ink)' }}>API Request Tester</h1>
          <p className="body-lg" style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: 'var(--spacing-sm)', maxWidth: '800px' }}>
            A lightweight Postman alternative. Test REST APIs with custom headers and JSON payloads directly from your browser. 
            Powered by a local proxy to seamlessly bypass CORS restrictions.
          </p>
        </div>
        
        <ApiTesterClient />
      </ColorBlock>
    </main>
  );
}
