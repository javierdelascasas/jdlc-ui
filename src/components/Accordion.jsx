import React from 'react';
import { cn } from '../lib/utils.js';

export function Accordion({ children, className, ...props }) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      {children}
    </div>
  );
}

export function AccordionItem({
  title,
  badge,
  defaultOpen = false,
  children,
  footer,
  className,
  ...props
}) {
  return (
    <details
      open={defaultOpen || undefined}
      className={cn(
        'group bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl overflow-hidden shadow-xs hover:border-[var(--color-primary)]/40 transition-colors',
        className
      )}
      {...props}
    >
      <summary className="flex items-center justify-between gap-3 p-4 cursor-pointer font-medium text-[var(--text-main)] select-none list-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)]">
        <div className="flex items-center gap-2.5 min-w-0">
          {badge}
          <span className="font-semibold text-sm sm:text-base">{title}</span>
        </div>
        <span
          aria-hidden="true"
          className="text-[var(--text-muted)] group-open:rotate-180 transition-transform duration-200 shrink-0"
        >
          ▾
        </span>
      </summary>
      <div className="px-4 pb-4 pt-2 text-sm text-[var(--text-muted)] border-t border-[var(--border-subtle)] leading-relaxed bg-[var(--bg-elevated)]/30">
        {children}
        {footer && (
          <div className="mt-3 pt-2 border-t border-[var(--border-subtle)] text-xs flex items-center justify-between">
            {footer}
          </div>
        )}
      </div>
    </details>
  );
}
