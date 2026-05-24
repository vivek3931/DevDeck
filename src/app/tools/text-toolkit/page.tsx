import { Metadata } from 'next';
import TextToolkitClient from './TextToolkitClient';

export const metadata: Metadata = {
  title: 'Text & String Manipulation Toolkit | DevDeck',
  description: 'A suite of string manipulation options: convert case types (camelCase, snake_case), URL encode/decode, Base64, and minify JSON.',
  openGraph: {
    title: 'Text & String Manipulation Toolkit | DevDeck',
    description: 'A suite of string manipulation options: convert case types (camelCase, snake_case), URL encode/decode, Base64, and minify JSON.',
  }
};

export default function TextToolkitPage() {
  return <TextToolkitClient />;
}
