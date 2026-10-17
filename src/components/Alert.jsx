import React from 'react';
import { cn } from '../lib/utils.js';

export function Alert({
  variant = 'info',
  title,
  icon: Icon,
  children,
  className,
  role = 'alert',
  ...props
}) {
  const variants = {
    info: 'bg-sky-500/15 border-sky-500/30 text-sky-800 dark:text-sky-200',
    success: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-800 dark:text-emerald-200',
    warning: 'bg-amber-500/15 border-amber-500/30 text-amber-800 dark:text-amber-200',
    danger: 'bg-rose-500/15 border-rose-500/30 text-rose-800 dark:text-rose-200',
    error: 'bg-rose-500/15 border-rose-500/30 text-rose-800 dark:text-rose-200',
  };

  return (
    <div
      role={role}
      className={cn(
        'flex items-start gap-3 rounded-xl border p-3.5 text-xs sm:text-sm leading-relaxed',
        variants[variant] || variants.info,
        className
      )}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5 shrink-0 mt-0.5" />}
      <div className="flex-1 min-w-0">
        {title && <div className="font-semibold mb-0.5">{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
}
