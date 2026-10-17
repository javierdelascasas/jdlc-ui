import React, { useState, useId } from 'react';
import { cn } from '../lib/utils.js';

export function Tooltip({
  content,
  position = 'top',
  children,
  className,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipId = useId();

  if (!content) return children;

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <span
      className={cn('relative inline-flex items-center align-middle', className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setIsOpen(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
      }}
      tabIndex={0}
      aria-describedby={isOpen ? tooltipId : undefined}
      {...props}
    >
      {children}
      {isOpen && (
        <span
          id={tooltipId}
          role="tooltip"
          className={cn(
            'pointer-events-none absolute z-50 w-max max-w-xs rounded-lg border border-[var(--border-medium)] bg-[var(--bg-elevated)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-main)] shadow-lg leading-snug whitespace-normal text-center',
            positions[position] || positions.top
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}
