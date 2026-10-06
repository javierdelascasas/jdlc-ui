import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { cn } from '../lib/utils.js';

const ToastContext = createContext(null);

export function ToastProvider({ children, position = 'bottom-right' }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ message, title, variant = 'info', duration = 3500 }) => {
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 7);
      const newToast = { id, message, title, variant, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [removeToast]
  );

  const toast = useMemo(
    () => ({
      show: (message, options) => addToast({ message, ...options }),
      success: (message, options) => addToast({ message, variant: 'success', ...options }),
      error: (message, options) => addToast({ message, variant: 'error', ...options }),
      warning: (message, options) => addToast({ message, variant: 'warning', ...options }),
      info: (message, options) => addToast({ message, variant: 'info', ...options }),
      dismiss: removeToast,
    }),
    [addToast, removeToast]
  );

  const positionClasses = {
    'top-right': 'top-4 right-4 items-end',
    'top-left': 'top-4 left-4 items-start',
    'bottom-right': 'bottom-4 right-4 items-end',
    'bottom-left': 'bottom-4 left-4 items-start',
    'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        className={cn(
          'fixed z-50 pointer-events-none flex flex-col gap-2 p-4 max-w-sm w-full',
          positionClasses[position] || positionClasses['bottom-right']
        )}
      >
        {toasts.map((item) => (
          <ToastItem key={item.id} item={item} onDismiss={() => removeToast(item.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    // Graceful fallback if ToastProvider is not mounted
    return {
      show: (msg) => console.log('[Toast]', msg),
      success: (msg) => console.log('[Toast Success]', msg),
      error: (msg) => console.error('[Toast Error]', msg),
      warning: (msg) => console.warn('[Toast Warning]', msg),
      info: (msg) => console.info('[Toast Info]', msg),
      dismiss: () => {},
    };
  }
  return context;
}

function ToastItem({ item, onDismiss }) {
  const variantStyles = {
    success: {
      border: 'border-emerald-500/40',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-emerald-400">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
        </svg>
      ),
    },
    error: {
      border: 'border-rose-500/40',
      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-rose-400">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
        </svg>
      ),
    },
    warning: {
      border: 'border-amber-500/40',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-400">
          <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      ),
    },
    info: {
      border: 'border-[var(--color-primary-glow)]/40',
      badge: 'bg-[var(--color-primary)]/10 text-[var(--color-primary-glow)] border-[var(--color-primary)]/30',
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[var(--color-primary-glow)]">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
        </svg>
      ),
    },
  };

  const style = variantStyles[item.variant] || variantStyles.info;

  return (
    <div
      role="alert"
      className={cn(
        'pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl bg-[var(--bg-surface)]/95 border backdrop-blur-md shadow-xl text-slate-200 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2',
        style.border
      )}
    >
      <div className={cn('p-1 rounded-lg border shrink-0 mt-0.5', style.badge)}>
        {style.icon}
      </div>
      <div className="flex-1 min-w-0 pr-2">
        {item.title && (
          <h4 className="text-xs font-bold text-slate-100 font-[var(--font-heading)] leading-tight mb-0.5">
            {item.title}
          </h4>
        )}
        <p className="text-xs text-slate-300 leading-snug break-words">
          {item.message}
        </p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-[var(--bg-hover)] transition-colors cursor-pointer shrink-0"
        aria-label="Close notification"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>
    </div>
  );
}
