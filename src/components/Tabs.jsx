import React from 'react';
import { cn } from '../lib/utils.js';

export function Tabs({ tabs = [], activeTab, onChange, className }) {
  return (
    <div className={cn('inline-flex items-center p-1 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-lg', className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium rounded-md transition-all duration-150 cursor-pointer select-none',
              isActive
                ? 'bg-[var(--bg-elevated)] text-[var(--text-main)] shadow-sm border border-[var(--border-medium)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]/60 font-medium'
            )}
          >
            {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
            <span className={cn(tab.hideLabelOnMobile && 'hidden sm:inline')}>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  'px-1.5 py-0.5 rounded text-[10px] font-mono',
                  isActive
                    ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary-glow)] font-bold'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-dim)] border border-[var(--border-subtle)]'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
