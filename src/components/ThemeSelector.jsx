import React from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import { Dropdown } from './Dropdown.jsx';
import { cn } from '../lib/utils.js';

export function ThemeSelector({ className, align = 'right' }) {
  const { theme, setTheme, availableThemes, currentThemeConfig } = useTheme();

  const items = availableThemes.map((t) => ({
    label: t.name,
    active: t.id === theme,
    onClick: () => setTheme(t.id),
    icon: () => (
      <span
        className="w-3 h-3 rounded-full shrink-0 border border-white/20"
        style={{ backgroundColor: t.primaryHex }}
      />
    ),
  }));

  const trigger = (
    <button
      type="button"
      className={cn(
        'flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] text-xs font-medium text-slate-300 transition-colors',
        className
      )}
    >
      <span
        className="w-2.5 h-2.5 rounded-full shadow-sm"
        style={{ backgroundColor: currentThemeConfig.primaryHex }}
      />
      <span className="hidden sm:inline">{currentThemeConfig.name}</span>
      <svg className="w-3.5 h-3.5 text-slate-400 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );

  return <Dropdown trigger={trigger} items={items} align={align} />;
}
