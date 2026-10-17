import React from 'react';
import { cn } from '../lib/utils.js';

export function Switch({
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  label,
  id,
  name,
  className,
  ...props
}) {
  const switchId =
    id ||
    (name
      ? `switch-${name}`
      : label
        ? `switch-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
        : undefined);

  const trackSizes = {
    sm: 'w-8 h-4.5',
    md: 'w-10 h-5.5',
    lg: 'w-12 h-6.5',
  };

  const thumbSizes = {
    sm: 'w-3.5 h-3.5 peer-checked:translate-x-3.5',
    md: 'w-4 h-4 peer-checked:translate-x-4.5',
    lg: 'w-5 h-5 peer-checked:translate-x-5.5',
  };

  return (
    <label
      htmlFor={switchId}
      className={cn(
        'inline-flex items-center gap-2.5 select-none',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className
      )}
    >
      <span className="relative inline-flex items-center shrink-0">
        <input
          id={switchId}
          name={name}
          type="checkbox"
          role="switch"
          aria-checked={Boolean(checked)}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only peer"
          {...props}
        />
        <span
          className={cn(
            'rounded-full border transition-colors duration-150',
            'bg-[var(--bg-subtle)] border-[var(--border-medium)]',
            'peer-checked:bg-[var(--color-primary)] peer-checked:border-[var(--color-primary)]',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--ring-focus)]',
            trackSizes[size] || trackSizes.md
          )}
        />
        <span
          className={cn(
            'pointer-events-none absolute left-0.5 top-1/2 -translate-y-1/2 rounded-full bg-white shadow-xs transition-transform duration-150',
            thumbSizes[size] || thumbSizes.md
          )}
        />
      </span>
      {label && <span className="text-sm font-medium text-[var(--text-main)]">{label}</span>}
    </label>
  );
}
