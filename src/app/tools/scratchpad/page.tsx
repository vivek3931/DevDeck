import { Metadata } from 'next';
import ScratchpadClient from './ScratchpadClient';

export const metadata: Metadata = {
  title: 'Daily Dev Scratchpad | DevDeck',
  description: 'Persistent, color-coded sticky notes tailored for writing down daily stand-up notes, temporary commands, or quick tasks without breaking focus.',
  openGraph: {
    title: 'Daily Dev Scratchpad | DevDeck',
    description: 'Persistent, color-coded sticky notes tailored for writing down daily stand-up notes, temporary commands, or quick tasks without breaking focus.',
  }
};

export default function ScratchpadPage() {
  return <ScratchpadClient />;
}
