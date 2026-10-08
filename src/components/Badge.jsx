import React from 'react';
import { cn } from '../lib/utils.js';

export function Badge({ children, className, variant = 'default', size = 'md', dot = false, ...props }) {
  const baseStyles = 'inline-flex items-center font-medium rounded-md tracking-wide select-none';

  const variants = {
    default: 'bg-[var(--bg-elevated)] text-[var(--text-main)] border border-[var(--border-subtle)]',
    primary: 'bg-[var(--color-primary)]/15 text-[var(--color-primary)] border border-[var(--color-primary)]/30 font-semibold',
    accent: 'bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/30 font-semibold',
    success: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-semibold',
    warning: 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-semibold',
    danger: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 font-semibold',
    error: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 font-semibold',
    info: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30 font-semibold',
    neutral: 'bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)] font-medium',
    subtle: 'bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)] font-semibold',
  };

  const sizes = {
    xs: 'text-[9px] px-1.5 py-0.25 gap-0.5',
    sm: 'text-[10px] px-1.5 py-0.5 gap-1',
    md: 'text-xs px-2 py-0.5 gap-1.5',
    lg: 'text-sm px-2.5 py-1 gap-2',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0 animate-pulse" />}
      {children}
    </span>
  );
}
