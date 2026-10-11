import React from 'react';
import { cn } from '../lib/utils.js';

/**
 * MobileTabBar: Ergonomic native-like bottom navigation bar for mobile viewports.
 * Placed in the mobile thumb zone (fixed bottom-0), automatically hidden on tablet/desktop (sm:hidden).
 */
export function MobileTabBar({
  tabs = [],
  activeTab,
  onChange,
  className,
}) {
  if (!tabs || tabs.length === 0) return null;

  return (
    <nav
      aria-label="Primary Mobile Navigation"
      className={cn(
        'sm:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--bg-root)]/95 backdrop-blur-md border-t border-[var(--border-subtle)] px-2 pt-1 pb-[max(env(safe-area-inset-bottom,0px),0.35rem)] shadow-lg transition-colors transform-gpu',
        className
      )}
    >
      <div className="flex items-center justify-around w-full max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange?.(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer select-none text-center min-w-0 relative',
                isActive
                  ? 'text-[var(--color-primary-glow)] font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)] active:scale-95'
              )}
            >
              {/* Active glow background pill */}
              {isActive && (
                <span className="absolute inset-x-2 inset-y-0.5 rounded-lg bg-[var(--color-primary)]/15 -z-10 animate-in fade-in duration-150" />
              )}

              {/* Tab Icon */}
              <div className="relative">
                {Icon && <Icon className="w-5 h-5 shrink-0" />}
                {tab.count !== undefined && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-[var(--color-primary)] text-white text-[9px] font-mono rounded-full font-bold shadow-sm">
                    {tab.count}
                  </span>
                )}
              </div>

              {/* Tab Label */}
              <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-full">
                {tab.shortLabel || tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
