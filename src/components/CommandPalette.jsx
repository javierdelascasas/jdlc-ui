import React, { useState, useEffect, useMemo, useRef } from 'react';
import { cn } from '../lib/utils.js';
import { Badge } from './Badge.jsx';
import { SUITE_APPS, getSuiteAppUrl } from '../lib/suiteUtils.js';

/**
 * Reusable, accessible Universal Command Palette with keyboard navigation (⌘K / Ctrl+K),
 * fuzzy section search, and integrated JDLC Cross-Suite Jump links.
 */
export function CommandPalette({
  isOpen,
  onClose,
  placeholder = 'Type a command or search...',
  sections = [],
  currentApp = 'taskflow',
  enableSuiteShortcuts = true,
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const itemRefs = useRef([]);

  // Reset and auto-focus when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Build Suite Switcher Section
  const suiteSection = useMemo(() => {
    if (!enableSuiteShortcuts) return null;

    const items = SUITE_APPS.filter((app) => app.id !== currentApp).map((app) => ({
      id: `suite-${app.id}`,
      title: `Switch to ${app.name}`,
      subtitle: app.description,
      badge: 'JDLC App',
      icon: (
        <span
          className="w-4 h-4 rounded flex items-center justify-center text-[10px] text-white shrink-0 font-bold"
          style={{ backgroundColor: app.color }}
        >
          {app.name[0]}
        </span>
      ),
      action: () => {
        const url = getSuiteAppUrl(app.id);
        window.location.href = url;
      },
    }));

    return {
      id: 'suite-apps',
      heading: 'JDLC Cloud Suite',
      items,
    };
  }, [enableSuiteShortcuts, currentApp]);

  // Combined flattened sections with search filtering
  const filteredSections = useMemo(() => {
    const allSections = [...sections];
    if (suiteSection && suiteSection.items.length > 0) {
      allSections.push(suiteSection);
    }

    const q = query.trim().toLowerCase();
    if (!q) return allSections;

    return allSections
      .map((sec) => ({
        ...sec,
        items: (sec.items || []).filter((item) => {
          const titleMatch = item.title?.toLowerCase().includes(q);
          const subMatch = item.subtitle?.toLowerCase().includes(q);
          const keywordsMatch = item.keywords?.some((k) => k.toLowerCase().includes(q));
          return titleMatch || subMatch || keywordsMatch;
        }),
      }))
      .filter((sec) => sec.items.length > 0);
  }, [sections, suiteSection, query]);

  // Flat list of selectable items
  const flattenedItems = useMemo(() => {
    const list = [];
    filteredSections.forEach((sec) => {
      (sec.items || []).forEach((item) => {
        list.push(item);
      });
    });
    return list;
  }, [filteredSections]);

  // Clamp selected index
  useEffect(() => {
    if (selectedIndex >= flattenedItems.length) {
      setSelectedIndex(Math.max(0, flattenedItems.length - 1));
    }
  }, [flattenedItems.length, selectedIndex]);

  // Scroll active item into view
  useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  // Keyboard Navigation inside Palette
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, flattenedItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev <= 0 ? flattenedItems.length - 1 : prev - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = flattenedItems[selectedIndex];
      if (current && typeof current.action === 'function') {
        current.action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  let globalIndexCounter = 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity" />

      {/* Palette Container */}
      <div
        className="relative w-full max-w-xl bg-[var(--bg-surface)] border border-[var(--border-medium)] rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/60">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400 shrink-0">
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm font-medium text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-md shadow-xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="p-2 overflow-y-auto space-y-4 max-h-[60vh]">
          {flattenedItems.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No matching commands or destinations found.
            </div>
          ) : (
            filteredSections.map((sec) => (
              <div key={sec.id || sec.heading} className="space-y-1">
                {sec.heading && (
                  <div className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase font-[var(--font-heading)]">
                    {sec.heading}
                  </div>
                )}
                {sec.items.map((item) => {
                  const itemIdx = globalIndexCounter++;
                  const isSelected = itemIdx === selectedIndex;

                  return (
                    <button
                      key={item.id || item.title}
                      ref={(el) => (itemRefs.current[itemIdx] = el)}
                      type="button"
                      onClick={() => {
                        if (typeof item.action === 'function') {
                          item.action();
                        }
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(itemIdx)}
                      className={cn(
                        'w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer',
                        isSelected
                          ? 'bg-[var(--bg-hover)] text-white border border-[var(--border-subtle)]'
                          : 'text-slate-300 hover:text-white border border-transparent'
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {item.icon && <div className="shrink-0">{item.icon}</div>}
                        <div className="truncate">
                          <span className="font-semibold text-slate-100">{item.title}</span>
                          {item.subtitle && (
                            <span className="text-slate-400 text-[11px] block truncate">
                              {item.subtitle}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.badge && (
                          <Badge variant="subtle" size="xs" className="text-[9px] py-0 px-1 font-mono">
                            {item.badge}
                          </Badge>
                        )}
                        {item.shortcut && (
                          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded shadow-xs">
                            {item.shortcut}
                          </kbd>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--border-subtle)] bg-[var(--bg-subtle)]/40 text-[10px] text-slate-400">
          <div className="flex items-center gap-3">
            <span><kbd className="font-mono bg-[var(--bg-elevated)] px-1 rounded">↑↓</kbd> navigate</span>
            <span><kbd className="font-mono bg-[var(--bg-elevated)] px-1 rounded">↵</kbd> select</span>
          </div>
          <span className="font-medium text-slate-400">JDLC Suite Command</span>
        </div>
      </div>
    </div>
  );
}
