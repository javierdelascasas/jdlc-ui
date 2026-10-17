import React from 'react';
import { cn } from '../lib/utils.js';

export function Checkbox({
  checked,
  onChange,
  disabled = false,
  size = 'md',
  variant = 'primary',
  label,
  id,
  name,
  className,
  ...props
}) {
  const checkboxId =
    id ||
    (name
      ? `checkbox-${name}`
      : label
        ? `checkbox-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
        : undefined);

  const sizes = {
    xs: 'w-3.5 h-3.5 rounded',
    sm: 'w-4 h-4 rounded',
    md: 'w-4.5 h-4.5 rounded-md',
    lg: 'w-5 h-5 rounded-md',
  };

  const variants = {
    primary: 'accent-[var(--color-primary)]',
    secondary: 'accent-[var(--color-accent)]',
    warning: 'accent-amber-500',
    success: 'accent-emerald-500',
    danger: 'accent-rose-500',
  };

  const inputEl = (
    <input
      id={checkboxId}
      name={name}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className={cn(
        'border border-[var(--border-medium)] bg-[var(--bg-subtle)] transition-all cursor-pointer shrink-0',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizes[size] || sizes.md,
        variants[variant] || variants.primary,
        !label && className
      )}
      {...props}
    />
  );

  if (!label) return inputEl;

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        'inline-flex items-center gap-2 select-none',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className
      )}
    >
      {inputEl}
      <span className="text-sm text-[var(--text-main)]">{label}</span>
    </label>
  );
}
