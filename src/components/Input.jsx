import React from 'react';
import { cn } from '../lib/utils.js';

export function Input({ className, type = 'text', label, id, error, helperText, icon: Icon, ...props }) {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}` : undefined);
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3 pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            'w-full bg-[var(--bg-subtle)] text-slate-100 text-sm rounded-lg border border-[var(--border-subtle)] px-3 py-2 transition-all duration-150',
            'focus:outline-none focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[var(--ring-focus)]',
            'placeholder:text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed',
            Icon && 'pl-9',
            error && 'border-rose-500 focus:ring-rose-500/30',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-400 mt-1">{helperText}</p>}
    </div>
  );
}

export function Textarea({ className, label, id, error, helperText, rows = 3, ...props }) {
  const textareaId = id || (label ? `textarea-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}` : undefined);
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={textareaId} className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={cn(
          'w-full bg-[var(--bg-subtle)] text-slate-100 text-sm rounded-lg border border-[var(--border-subtle)] p-3 transition-all duration-150',
          'focus:outline-none focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[var(--ring-focus)]',
          'placeholder:text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed resize-none',
          error && 'border-rose-500 focus:ring-rose-500/30',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-400 mt-1">{helperText}</p>}
    </div>
  );
}

export function Select({ className, label, id, error, helperText, children, icon: Icon, ...props }) {
  const selectId = id || (label ? `select-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}` : undefined);
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3 pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <select
          id={selectId}
          className={cn(
            'w-full bg-[var(--bg-subtle)] text-slate-100 text-sm rounded-lg border border-[var(--border-subtle)] px-3 py-2 transition-all duration-150 cursor-pointer',
            'focus:outline-none focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[var(--ring-focus)]',
            Icon && 'pl-9',
            error && 'border-rose-500 focus:ring-rose-500/30',
            className
          )}
          {...props}
        >
          {children}
        </select>
      </div>
      {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-400 mt-1">{helperText}</p>}
    </div>
  );
}
