import React from 'react';
import { cn } from '../lib/utils.js';

export function Button({
  children,
  className,
  variant = 'default',
  size = 'md',
  disabled = false,
  isLoading = false,
  onClick,
  type = 'button',
  icon: Icon,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

  const variants = {
    default:
      'bg-[var(--color-primary)] text-[var(--color-primary-content)] hover:bg-[var(--color-primary-hover)] shadow-sm hover:shadow-[0_0_15px_rgba(124,58,237,0.35)]',
    primary:
      'bg-[var(--color-primary)] text-[var(--color-primary-content)] hover:bg-[var(--color-primary-hover)] shadow-sm hover:shadow-[0_0_15px_rgba(124,58,237,0.35)]',
    secondary:
      'bg-[var(--bg-elevated)] text-[var(--text-main)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)]',
    outline:
      'bg-transparent text-[var(--text-main)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)]',
    ghost:
      'bg-transparent text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]',
    danger:
      'bg-rose-600/20 text-rose-300 border border-rose-500/30 hover:bg-rose-600 hover:text-white',
    error:
      'bg-rose-600/20 text-rose-300 border border-rose-500/30 hover:bg-rose-600 hover:text-white',
    warning:
      'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500 hover:text-slate-950',
    success:
      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white',
    info:
      'bg-sky-500/20 text-sky-300 border border-sky-500/30 hover:bg-sky-500 hover:text-white',
    accent:
      'bg-[var(--color-accent)] text-[var(--color-accent-content)] font-semibold hover:opacity-90',
  };

  const sizes = {
    xs: 'text-[11px] px-2 py-1 gap-1',
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-3.5 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
    icon: 'p-2 aspect-square',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-0.5 mr-1.5 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        Icon && <Icon className="w-4 h-4 shrink-0" />
      )}
      {children}
    </button>
  );
}
