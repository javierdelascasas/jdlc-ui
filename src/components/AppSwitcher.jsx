import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils.js';
import { Badge } from './Badge.jsx';
import { SUITE_APPS, getSuiteAppUrl } from '../lib/suiteUtils.js';

export function AppSwitcher({ currentApp = 'taskflow', className, align = 'left' }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

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

  const isLocal =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.endsWith('.local'));

  const renderAppIcon = (id) => {
    switch (id) {
      case 'taskflow':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        );
      case 'budgetcast':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        );
      case 'tripplanner':
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.53 3.72a.75.75 0 01-.82.08L9 18l-5.71 2.855A.75.75 0 012.25 20.19V6.44a.75.75 0 01.42-.67l6-3a.75.75 0 01.66 0l5.71 2.855a.75.75 0 01.42.67v13.75a.75.75 0 01-.93.72z" />
          </svg>
        );
    }
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* 9-Dot Waffle Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-elevated)] border border-transparent hover:border-[var(--border-subtle)] transition-colors cursor-pointer flex items-center justify-center shrink-0',
          isOpen && 'bg-[var(--bg-elevated)] text-[var(--text-main)] border-[var(--border-subtle)]',
          className
        )}
        title="JDLC Cloud Suite Apps"
        aria-label="JDLC Cloud Suite Apps"
        aria-expanded={isOpen}
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5">
          <circle cx="4" cy="4" r="1.8" />
          <circle cx="10" cy="4" r="1.8" />
          <circle cx="16" cy="4" r="1.8" />
          <circle cx="4" cy="10" r="1.8" />
          <circle cx="10" cy="10" r="1.8" />
          <circle cx="16" cy="10" r="1.8" />
          <circle cx="4" cy="16" r="1.8" />
          <circle cx="10" cy="16" r="1.8" />
          <circle cx="16" cy="16" r="1.8" />
        </svg>
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 mt-2 w-72 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-medium)] p-2.5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-2.5 py-1.5 mb-1.5 border-b border-[var(--border-subtle)]">
            <span className="text-xs font-bold tracking-tight text-[var(--text-main)] font-[var(--font-heading)]">
              JDLC Suite
            </span>
            <Badge variant={isLocal ? 'subtle' : 'primary'} size="xs" className="font-mono text-[9px]">
              {isLocal ? 'Localhost' : 'Cloud'}
            </Badge>
          </div>

          {/* App Cards List */}
          <div className="space-y-1">
            {SUITE_APPS.map((app) => {
              const isCurrent = app.id === currentApp;
              const targetUrl = getSuiteAppUrl(app.id);

              return (
                <a
                  key={app.id}
                  href={isCurrent ? undefined : targetUrl}
                  onClick={(e) => {
                    if (isCurrent) {
                      e.preventDefault();
                      setIsOpen(false);
                    }
                  }}
                  className={cn(
                    'flex items-center gap-3 p-2 rounded-xl transition-all',
                    isCurrent
                      ? 'bg-[var(--bg-elevated)] border border-[var(--border-medium)] cursor-default'
                      : 'hover:bg-[var(--bg-hover)] border border-transparent hover:border-[var(--border-subtle)] cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  )}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm"
                    style={{ backgroundColor: app.color }}
                  >
                    {renderAppIcon(app.id)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-xs font-bold tracking-tight text-[var(--text-main)] font-[var(--font-heading)] truncate">
                        {app.name}
                      </span>
                      {isCurrent ? (
                        <Badge variant="subtle" size="xs" className="text-[9px] py-0 px-1 font-mono">
                          Current
                        </Badge>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-mono">
                          {isLocal ? `:${getSuiteAppUrl(app.id).split(':').pop()}` : 'open ↗'}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{app.description}</p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Footer Portal Link */}
          <div className="mt-2 pt-1.5 border-t border-[var(--border-subtle)] px-2.5 flex items-center justify-between text-[10px] text-slate-400">
            <span>JDLC Ecosystem</span>
            <a
              href={getSuiteAppUrl('main')}
              className="text-[var(--color-primary-glow)] hover:underline flex items-center gap-0.5"
            >
              Portal Home ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
