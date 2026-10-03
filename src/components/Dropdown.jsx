import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils.js';

export function Dropdown({ trigger, items = [], align = 'right', className }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef} onClick={(e) => e.stopPropagation()}>
      <div onClick={handleToggle} className="cursor-pointer inline-flex">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            'absolute z-50 mt-1.5 w-48 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-medium)] p-1.5 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150',
            align === 'right' ? 'right-0' : 'left-0',
            className
          )}
        >
          {items.map((item, idx) => {
            if (item.divider) {
              return <div key={idx} className="my-1 border-t border-[var(--border-subtle)]" />;
            }
            const Icon = item.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOpen(false);
                  item.onClick && item.onClick();
                }}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-[var(--bg-hover)] hover:text-white cursor-pointer',
                  item.danger && 'text-rose-400 hover:bg-rose-500/15 hover:text-rose-300',
                  item.active && 'bg-[var(--bg-elevated)] text-[var(--color-primary-glow)] font-semibold'
                )}
              >
                {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
                <span className="flex-1 text-left">{item.label}</span>
                {item.shortcut && <span className="text-[10px] text-slate-500 font-mono">{item.shortcut}</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
