import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'promo' | 'icon' | 'icon-inverse';
  size?: 'default' | 'icon' | 'sm';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', size = 'default', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        styles.base,
        styles[variant],
        size === 'icon' && styles.iconSize,
        size === 'sm' && styles.smSize,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
