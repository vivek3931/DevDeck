import { Metadata } from 'next';
import TextToolkitClient from './TextToolkitClient';

export const metadata: Metadata = {
  title: 'Online Text Toolkit | Base64, JSON Formatter & String Converter | DevDeck',
  description: 'Free online developer tools for string manipulation. Encode/decode Base64, minify JSON, and convert text cases instantly.',
  openGraph: {
    title: 'Online Text Toolkit | Base64, JSON Formatter & String Converter | DevDeck',
    description: 'Free online developer tools for string manipulation. Encode/decode Base64, minify JSON, and convert text cases instantly.',
  }
};

export default function TextToolkitPage() {
  return <TextToolkitClient />;
}
