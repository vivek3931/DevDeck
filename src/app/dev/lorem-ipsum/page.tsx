import React from 'react';
import type { Metadata } from 'next';
import { ColorBlock } from '@/components/ui/ColorBlock';
import LoremIpsumClient from './LoremIpsumClient';

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator | DevDeck',
  description: 'Generate reliable placeholder text (paragraphs, sentences, words) instantly in your browser.',
};

export default function LoremIpsumPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      <ColorBlock color="lilac">
        <div style={{ maxWidth: '800px', marginBottom: 'var(--spacing-xl)' }}>
          <h1 className="display-lg">Lorem Ipsum Generator</h1>
          <p className="body-lg" style={{ marginTop: 'var(--spacing-md)', opacity: 0.8 }}>
            Generate placeholder text instantly. Perfect for mocking up designs and prototyping layouts.
          </p>
        </div>
        <LoremIpsumClient />
      </ColorBlock>
    </div>
  );
}
