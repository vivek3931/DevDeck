import { Metadata } from 'next';
import PomodoroClient from './PomodoroClient';

export const metadata: Metadata = {
  title: 'Pomodoro Focus Clock | DevDeck',
  description: 'Built-in interval concentration timer to structure your coding or rest cycles without distractions.',
  openGraph: {
    title: 'Pomodoro Focus Clock | DevDeck',
    description: 'Built-in interval concentration timer to structure your coding or rest cycles without distractions.',
  }
};

export default function PomodoroPage() {
  return <PomodoroClient />;
}
