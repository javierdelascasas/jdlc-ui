import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils.js';
import { Avatar } from './Avatar.jsx';
import { Badge } from './Badge.jsx';
import { ThemeSelector } from './ThemeSelector.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

/**
 * Standardized JDLC Suite User Profile & Account Menu.
 * Adheres to the JDLC Design Manifesto Section 3.
 */
export function UserMenu({
  user,
  displayName,
  avatarSeed,
  avatarSuit = 'notionists',
  status = 'online',
  onSignIn,
  onSignOut,
  onOpenProfile,
  onOpenGuide,
  extraMenuItems = [],
  className,
  align = 'right',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const { currentThemeConfig } = useTheme();

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const name = displayName || user?.user_metadata?.displayName || user?.email?.split('@')[0] || 'Guest User';
  const email = user?.email || 'Local Offline Session';
  const seed = avatarSeed || user?.email || name || 'guest';
  const isAuthenticated = Boolean(user);

  return (
    <div className={cn('relative inline-block text-left', className)} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-main)] hover:border-[var(--border-medium)] hover:bg-[var(--bg-hover)] transition-all cursor-pointer',
          isOpen && 'border-[var(--border-medium)] bg-[var(--bg-elevated)]'
        )}
        title={isAuthenticated ? `Signed in as ${name}` : 'Account & Preferences'}
        aria-expanded={isOpen}
      >
        <Avatar
          seed={seed}
          name={name}
          suit={avatarSuit}
          size="xs"
          status={isAuthenticated ? status : undefined}
        />
        <span className="text-xs font-semibold max-w-[110px] truncate hidden sm:inline-block">
          {name}
        </span>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className={cn('w-3.5 h-3.5 text-slate-400 transition-transform duration-150', isOpen && 'rotate-180')}
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Profile Popover Card */}
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 mt-2 w-72 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-medium)] p-3 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {/* Header Identity Card */}
          <div className="flex items-center gap-3 p-2 bg-[var(--bg-elevated)]/80 rounded-xl border border-[var(--border-subtle)] mb-2">
            <Avatar
              seed={seed}
              name={name}
              suit={avatarSuit}
              size="md"
              status={isAuthenticated ? status : undefined}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="font-bold text-xs text-white truncate font-[var(--font-heading)]">
                  {name}
                </span>
                <Badge variant={isAuthenticated ? 'success' : 'subtle'} size="xs" className="font-mono text-[9px] py-0 px-1">
                  {isAuthenticated ? 'Connected' : 'Guest'}
                </Badge>
              </div>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">{email}</p>
            </div>
          </div>

          {/* Quick Preferences: Theme */}
          <div className="px-2 py-1.5 flex items-center justify-between text-xs border-b border-[var(--border-subtle)]">
            <span className="text-slate-400 font-medium">Theme</span>
            <ThemeSelector align="right" />
          </div>

          {/* Application Navigation / Custom Actions */}
          <div className="py-1 space-y-0.5 border-b border-[var(--border-subtle)]">
            {onOpenProfile && (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenProfile();
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-[var(--bg-hover)] transition-colors cursor-pointer text-left"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400">
                  <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                </svg>
                <span>Profile &amp; Settings</span>
              </button>
            )}

            {onOpenGuide && (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenGuide();
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-[var(--bg-hover)] transition-colors cursor-pointer text-left"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                </svg>
                <span>Handbook &amp; Guide</span>
              </button>
            )}

            {extraMenuItems.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  item.onClick?.();
                }}
                className={cn(
                  'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer text-left',
                  item.danger
                    ? 'text-rose-400 hover:bg-rose-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-[var(--bg-hover)]'
                )}
              >
                {item.icon && <span className="w-4 h-4 text-slate-400">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Auth Action: Sign In vs Sign Out */}
          <div className="pt-1.5">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onSignOut?.();
                }}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors cursor-pointer"
              >
                <span>Sign Out</span>
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M19 10a.75.75 0 00-.75-.75H8.704l2.523-2.523a.75.75 0 10-1.06-1.06l-3.81 3.81a.75.75 0 000 1.06l3.81 3.81a.75.75 0 101.06-1.06L8.704 10.75H18.25A.75.75 0 0019 10z" clipRule="evenodd" />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onSignIn?.();
                }}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[var(--color-primary-glow)] hover:bg-[var(--color-primary)]/10 transition-colors cursor-pointer"
              >
                <span>Sign In / Connect Cloud</span>
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h9.544l-2.523-2.523a.75.75 0 111.06-1.06l3.81 3.81a.75.75 0 010 1.06l-3.81 3.81a.75.75 0 11-1.06-1.06l2.523-2.523H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
