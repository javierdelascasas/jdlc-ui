import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils.js';
import { AppSwitcher } from './AppSwitcher.jsx';
import { Badge } from './Badge.jsx';
import { Tabs } from './Tabs.jsx';
import { ThemeSelector } from './ThemeSelector.jsx';

/**
 * Standardized JDLC Application Header with Native Mobile Drawer.
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
  showMobileDrawer = false,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-30 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-root)]/90 backdrop-blur-md transition-colors duration-200',
        className
      )}
    >
      <div className="w-full px-3 sm:px-4 md:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-3">
        {/* Zone 1: Suite & Brand (Left) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <AppSwitcher currentApp={currentApp} />

          {onBrandClick ? (
            <button
              type="button"
              onClick={onBrandClick}
              className="flex items-center gap-2 sm:gap-2.5 hover:opacity-85 active:scale-[0.98] transition-all focus:outline-none rounded-xl cursor-pointer text-left"
              title="Application Details"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white shadow-md shadow-[var(--color-primary)]/20 shrink-0">
                {icon}
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-extrabold text-sm sm:text-base md:text-lg tracking-tight font-[var(--font-heading)] text-[var(--text-main)]">
                    {appName}
                    <span className="text-[var(--color-primary-glow)]">{appAccent}</span>
                  </span>
                  {badge && (
                    <Badge variant="subtle" size="xs" className="hidden sm:inline-flex font-mono uppercase font-bold text-[9px] tracking-wider">
                      {badge}
                    </Badge>
                  )}
                  {statusBadge}
                </div>
                {subtitle && (
                  <p className="text-[11px] text-[var(--text-muted)] hidden lg:block leading-tight mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>
            </button>
          ) : (
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white shadow-md shadow-[var(--color-primary)]/20 shrink-0">
                {icon}
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-extrabold text-sm sm:text-base md:text-lg tracking-tight font-[var(--font-heading)] text-[var(--text-main)]">
                    {appName}
                    <span className="text-[var(--color-primary-glow)]">{appAccent}</span>
                  </span>
                  {badge && (
                    <Badge variant="subtle" size="xs" className="hidden sm:inline-flex font-mono uppercase font-bold text-[9px] tracking-wider">
                      {badge}
                    </Badge>
                  )}
                  {statusBadge}
                </div>
                {subtitle && (
                  <p className="text-[11px] text-[var(--text-muted)] hidden lg:block leading-tight mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Zone 2: Navigation & Context (Center - visible inline on Tablet and Desktop >= sm) */}
        <div className="hidden sm:flex items-center justify-center flex-1 max-w-xl mx-2">
          {tabs && tabs.length > 0 && (
            <Tabs tabs={tabs} activeTab={activeTab} onChange={onTabChange} />
          )}
          {centerContent}
        </div>

        {/* Zone 3: Utilities, Primary Action & Account (Right) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Secondary Utilities Slot (Tablet and Desktop) */}
          <div className="hidden sm:flex items-center gap-2">
            {utilities}
          </div>

          {/* Quick Command Trigger (⌘K) */}
          {onOpenPalette && (
            <button
              type="button"
              onClick={onOpenPalette}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-colors cursor-pointer"
              title="Open Command Palette (⌘K)"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM19 19l-4.35-4.35" />
              </svg>
              <kbd className="text-[10px] font-mono opacity-80">⌘K</kbd>
            </button>
          )}

          {/* Primary Action Button CTA (always visible) */}
          {primaryAction}

          {/* Theme Selector (Desktop) */}
          {showThemeSelector && (
            <div className="hidden md:block">
              <ThemeSelector align="right" />
            </div>
          )}

          {/* Standardized User Menu */}
          <div>
            {userMenu}
          </div>
        </div>
      </div>

      {/* Optional Mobile Slide-Over Drawer (if explicitly requested) */}
      {showMobileDrawer && isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Slide-Over Drawer Sheet */}
          <div className="relative w-4/5 max-w-sm h-full bg-[var(--bg-surface)] border-l border-[var(--border-medium)] shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/70">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white shadow-md shadow-[var(--color-primary)]/20">
                  {icon}
                </div>
                <span className="font-extrabold text-base font-[var(--font-heading)] text-[var(--text-main)]">
                  {appName}
                  <span className="text-[var(--color-primary-glow)]">{appAccent}</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {/* Navigation Tabs */}
              {tabs && tabs.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] font-semibold block mb-2 px-1">
                    Navigation
                  </span>
                  <div className="space-y-1">
                    {tabs.map((tab) => {
                      const isActive = activeTab === tab.id;
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => {
                            onTabChange?.(tab.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={cn(
                            'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer text-left',
                            isActive
                              ? 'bg-[var(--color-primary)]/15 text-[var(--color-primary-glow)] font-semibold border border-[var(--color-primary)]/30'
                              : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-elevated)]'
                          )}
                        >
                          <div className="flex items-center gap-3">
                            {Icon && <Icon className="w-4 h-4 shrink-0" />}
                            <span>{tab.label}</span>
                          </div>
                          {tab.count !== undefined && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-elevated)] text-[var(--text-dim)] border border-[var(--border-subtle)]">
                              {tab.count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Mobile Utilities */}
              {utilities && (
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] font-semibold block mb-2 px-1">
                    Controls &amp; Tools
                  </span>
                  <div className="p-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
                    {utilities}
                  </div>
                </div>
              )}

              {/* Command Palette Trigger */}
              {onOpenPalette && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenPalette();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-main)] hover:border-[var(--border-medium)] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM19 19l-4.35-4.35" />
                    </svg>
                    <span>Command Palette</span>
                  </div>
                  <kbd className="text-[10px] font-mono opacity-70">⌘K</kbd>
                </button>
              )}

              {/* Theme Settings */}
              {showThemeSelector && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
                  <span className="text-xs font-medium text-[var(--text-muted)]">Theme</span>
                  <ThemeSelector align="right" />
                </div>
              )}
            </div>

            {/* Drawer Footer (User Profile) */}
            {userMenu && (
              <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50">
                {userMenu}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
