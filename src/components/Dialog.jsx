import React, { useEffect } from 'react';
import { cn } from '../lib/utils.js';

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'max-w-lg',
  className,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div
        className={cn(
          'relative w-full bg-[var(--bg-surface)] border border-[var(--border-medium)] rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]',
          maxWidth,
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || description || onClose) && (
          <div className="flex items-start justify-between p-5 border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/60">
            <div>
              {title && <h2 className="text-lg font-bold text-slate-100 tracking-tight">{title}</h2>}
              {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
            </div>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}
