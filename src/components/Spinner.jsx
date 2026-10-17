import React from 'react';
import { cn } from '../lib/utils.js';

export function Spinner({ size = 'md', className, label = 'Loading...', ...props }) {
  const sizes = {
    xs: 'w-3.5 h-3.5 border-2',
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-[3px]',
  };

  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        'inline-block rounded-full border-current border-r-transparent animate-spin text-[var(--color-primary)] shrink-0',
        sizes[size] || sizes.md,
        className
      )}
      {...props}
    />
  );
}
