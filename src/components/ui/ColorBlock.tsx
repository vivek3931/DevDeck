import React from 'react';
import clsx from 'clsx';
import styles from './ColorBlock.module.css';

export interface ColorBlockProps extends React.HTMLAttributes<HTMLElement> {
  color?: 'lime' | 'lilac' | 'cream' | 'mint' | 'pink' | 'coral' | 'navy';
  children: React.ReactNode;
}

export function ColorBlock({ color = 'lime', className, children, ...props }: ColorBlockProps) {
  return (
    <section className={clsx(styles.container, className)}>
      <div className={clsx(styles.block, styles[color])} {...props}>
        {children}
      </div>
    </section>
  );
}
