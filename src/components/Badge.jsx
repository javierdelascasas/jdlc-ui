import React from 'react';
import { cn } from '../lib/utils.js';

export function Badge({ children, className, variant = 'default', size = 'md', dot = false, ...props }) {
  const baseStyles = 'inline-flex items-center font-medium rounded-md tracking-wide select-none';

  const variants = {
    default: 'bg-slate-800 text-slate-200 border border-slate-700/60',
    primary: 'bg-[var(--color-primary)]/15 text-[var(--color-primary-glow)] border border-[var(--color-primary)]/30',
    accent: 'bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/30',
    success: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    danger: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
    subtle: 'bg-white/5 text-slate-400 border border-white/5',
  };

  const sizes = {
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
