'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import styles from './SuccessAnimation.module.css';

interface SuccessAnimationProps {
  show: boolean;
  message?: string;
}

export function SuccessAnimation({ show, message = 'Copied!' }: SuccessAnimationProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.container}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <motion.div
            className={styles.circle}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.05, duration: 0.25, type: 'spring', stiffness: 300, damping: 15 }}
          >
            <Check size={16} strokeWidth={3} />
          </motion.div>
          <span className={styles.text}>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
