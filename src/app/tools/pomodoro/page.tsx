import { Metadata } from 'next';
import PomodoroClient from './PomodoroClient';

export const metadata: Metadata = {
  title: 'Free Online Pomodoro Timer | Focus & Productivity Clock | DevDeck',
  description: 'Boost your productivity with our free online Pomodoro timer. A minimalist focus clock for developers and students.',
  openGraph: {
    title: 'Free Online Pomodoro Timer | Focus & Productivity Clock | DevDeck',
    description: 'Boost your productivity with our free online Pomodoro timer. A minimalist focus clock for developers and students.',
  }
};

export default function PomodoroPage() {
  return <PomodoroClient />;
}
