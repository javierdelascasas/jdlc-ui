import React from 'react';
import { cn } from '../lib/utils.js';

export function Card({ children, className, hover = true, ...props }) {
  return (
    <div
      className={cn(
        'bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-4 shadow-sm transition-all duration-200',
        hover && 'hover:border-[var(--border-medium)] hover:shadow-md hover:bg-[var(--bg-elevated)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn('flex items-center justify-between gap-2 mb-3', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }) {
  return (
    <h3 className={cn('font-semibold text-[var(--text-main)] text-sm tracking-tight', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, ...props }) {
  return (
    <p className={cn('text-xs text-[var(--text-dim)] mt-0.5', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={cn('text-sm text-[var(--text-muted)]', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }) {
  return (
    <div className={cn('flex items-center justify-end gap-2 mt-4 pt-3 border-t border-[var(--border-subtle)]', className)} {...props}>
      {children}
    </div>
  );
}
