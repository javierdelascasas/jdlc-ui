import React from 'react';
import { useAvatar } from '../context/AvatarContext.jsx';
import { Avatar } from './Avatar.jsx';
import { Dropdown } from './Dropdown.jsx';
import { cn } from '../lib/utils.js';

export function AvatarSelector({ className, align = 'right', seed = 'jdlc-user' }) {
  const { suit, setSuit, availableSuits, currentSuitConfig } = useAvatar();

  const items = availableSuits.map((s) => ({
    label: s.name,
    active: s.id === suit,
    onClick: () => setSuit(s.id),
    icon: () => (
      <Avatar
        seed={seed}
        suit={s.id}
        size="xs"
        className="w-4 h-4 text-[8px] shrink-0"
      />
    ),
  }));

  const trigger = (
    <button
      type="button"
      className={cn(
        'flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer',
        className
      )}
      title={`Active Avatar Set: ${currentSuitConfig.name}`}
    >
      <Avatar
        seed={seed}
        suit={currentSuitConfig.id}
        size="xs"
        className="w-4 h-4 text-[8px] shrink-0"
      />
      <span className="font-semibold whitespace-nowrap">{currentSuitConfig.name}</span>
      <svg className="w-3.5 h-3.5 text-[var(--text-dim)] ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );

  return <Dropdown trigger={trigger} items={items} align={align} />;
}
