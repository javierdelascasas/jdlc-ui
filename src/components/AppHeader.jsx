import React from 'react';
import { cn } from '../lib/utils.js';
import { AppSwitcher } from './AppSwitcher.jsx';
import { Badge } from './Badge.jsx';
import { Tabs } from './Tabs.jsx';
import { ThemeSelector } from './ThemeSelector.jsx';

/**
 * Standardized JDLC Application Header.
 * Implements the JDLC Applications Design Manifesto Section 2 Architecture Contract.
 */
export function AppHeader({
  currentApp = 'taskflow',
  appName = 'Task',
  appAccent = 'Flow',
  subtitle,
  icon,
  badge = 'JDLC',
  statusBadge,
  onBrandClick,
  tabs,
  activeTab,
  onTabChange,
  centerContent,
  utilities,
  primaryAction,
  onOpenPalette,
  userMenu,
  showThemeSelector = true,
  className,
  mobileBottomTabs = false,
}) {
  return (
    <header
      className={cn(
        'sticky top-0 z-30 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-root)]/90 backdrop-blur-md transition-colors duration-200',
        className
      )}
    >
      <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-4">
        {/* Zone 1: Suite & Brand (Left) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <AppSwitcher currentApp={currentApp} />

          {onBrandClick ? (
            <button
              type="button"
              onClick={onBrandClick}
              className="flex items-center gap-2.5 sm:gap-3 hover:opacity-85 active:scale-[0.98] transition-all focus:outline-none rounded-xl cursor-pointer text-left"
              title="Application Details"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white shadow-md shadow-[var(--color-primary)]/20 shrink-0">
                {icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight font-[var(--font-heading)] text-white">
                    {appName}
                    <span className="text-[var(--color-primary-glow)]">{appAccent}</span>
                  </span>
                  {badge && (
                    <Badge variant="subtle" size="xs" className="font-mono uppercase font-bold text-[9px] tracking-wider">
                      {badge}
                    </Badge>
                  )}
                  {statusBadge}
                </div>
                {subtitle && (
                  <p className="text-[11px] text-slate-400 hidden lg:block leading-tight mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>
            </button>
          ) : (
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white shadow-md shadow-[var(--color-primary)]/20 shrink-0">
                {icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight font-[var(--font-heading)] text-white">
                    {appName}
                    <span className="text-[var(--color-primary-glow)]">{appAccent}</span>
                  </span>
                  {badge && (
                    <Badge variant="subtle" size="xs" className="font-mono uppercase font-bold text-[9px] tracking-wider">
                      {badge}
                    </Badge>
                  )}
                  {statusBadge}
                </div>
                {subtitle && (
                  <p className="text-[11px] text-slate-400 hidden lg:block leading-tight mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Zone 2: Navigation & Context (Center) */}
        <div className="flex items-center justify-center flex-1 max-w-xl mx-2">
          {tabs && tabs.length > 0 && (
            <div className="hidden md:flex items-center">
              <Tabs tabs={tabs} activeTab={activeTab} onChange={onTabChange} />
            </div>
          )}
          {centerContent}
        </div>

        {/* Zone 3: Utilities, Primary Action & Account (Right) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Secondary Utilities Slot */}
          {utilities}

          {/* Quick Command Trigger (⌘K) */}
          {onOpenPalette && (
            <button
              type="button"
              onClick={onOpenPalette}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-colors cursor-pointer"
              title="Open Command Palette (⌘K)"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM19 19l-4.35-4.35" />
              </svg>
              <kbd className="text-[10px] font-mono opacity-80">⌘K</kbd>
            </button>
          )}

          {/* Primary Action Button CTA */}
          {primaryAction}

          {/* Theme Selector */}
          {showThemeSelector && (
            <div className="hidden sm:block">
              <ThemeSelector align="right" />
            </div>
          )}

          {/* Standardized User Menu */}
          {userMenu}
        </div>
      </div>

      {/* Optional Mobile Sub-Bar for Tabs (md:hidden) */}
      {mobileBottomTabs && tabs && tabs.length > 0 && (
        <div className="md:hidden border-t border-[var(--border-subtle)] px-3 py-1.5 bg-[var(--bg-root)]/95 flex justify-center">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={onTabChange} className="w-full justify-center" />
        </div>
      )}
    </header>
  );
}
