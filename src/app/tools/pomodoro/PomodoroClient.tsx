'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ColorBlock } from '@/components/ui/ColorBlock';
import { Button } from '@/components/ui/Button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import styles from './Pomodoro.module.css';

const WORK_TIME = 25 * 60;
const REST_TIME = 5 * 60;

export default function PomodoroClient() {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'work' | 'rest'>('work');

  const switchMode = useCallback((newMode: 'work' | 'rest') => {
    setMode(newMode);
    setTimeLeft(newMode === 'work' ? WORK_TIME : REST_TIME);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Auto switch
      switchMode(mode === 'work' ? 'rest' : 'work');
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, switchMode]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const reset = () => {
    switchMode(mode);
  };

  return (
    <article>
      <ColorBlock color={mode === 'work' ? 'coral' : 'mint'}>
        <h1 className="display-lg">Focus Clock</h1>
        <p className="subhead" style={{ marginTop: 'var(--spacing-sm)' }}>
          {mode === 'work' ? 'Time to write some code.' : 'Take a breather.'}
        </p>

        <div className={styles.toolCard}>
          <div className={styles.tabs}>
            <button 
              className={mode === 'work' ? styles.tabActive : styles.tab} 
              onClick={() => switchMode('work')}
            >
              Work (25m)
            </button>
            <button 
              className={mode === 'rest' ? styles.tabActive : styles.tab} 
              onClick={() => switchMode('rest')}
            >
              Rest (5m)
            </button>
          </div>

          <div className={styles.timerDisplay}>
            {formatTime(timeLeft)}
          </div>

          <div className={styles.controls}>
            <Button variant="primary" size="icon" onClick={() => setIsRunning(!isRunning)} aria-label={isRunning ? "Pause" : "Play"}>
              {isRunning ? <Pause size={24} /> : <Play size={24} />}
            </Button>
            <Button variant="secondary" size="icon" onClick={reset} aria-label="Reset">
              <RotateCcw size={24} />
            </Button>
          </div>
        </div>
      </ColorBlock>
    </article>
  );
}
