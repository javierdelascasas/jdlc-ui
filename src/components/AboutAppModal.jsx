import React from 'react';
import { Dialog } from './Dialog.jsx';
import { Button } from './Button.jsx';
import { Badge } from './Badge.jsx';

/**
 * Standardized JDLC Suite "About App" Dialog.
 * Displays application identity, version, invitation-only status,
 * privacy manifesto, and ecosystem links.
 */
export function AboutAppModal({
  isOpen,
  onClose,
  appName,
  appVersion = '1.0.0',
  appSubtitle,
  icon: Icon,
  accentColor = 'text-[var(--color-primary-glow)]',
}) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-lg"
    >
      <div className="space-y-5">
        {/* Header Branding */}
        <div className="flex items-start gap-3.5 pb-4 border-b border-[var(--border-subtle)]">
          {Icon ? (
            <div className={`p-2.5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-medium)] ${accentColor} shrink-0`}>
              <Icon className="w-7 h-7" />
            </div>
          ) : (
            <div className="p-2.5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-medium)] text-[var(--color-primary-glow)] shrink-0">
              <span className="text-xl">✨</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-[var(--text-main)] font-[var(--font-heading)]">
                {appName}
              </h3>
              <Badge variant="subtle" size="xs" className="font-mono">
                v{appVersion}
              </Badge>
            </div>
            {appSubtitle && (
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                {appSubtitle}
              </p>
            )}
            <p className="text-[11px] text-[var(--text-dim)] mt-1 font-mono">
              Built on React 19 • @jdlc/ui Design System
            </p>
          </div>
        </div>

        {/* Section 1: Invitation Only Platform */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
            <span>🔐</span>
            <span>Invitation-Only Ecosystem</span>
          </div>
          <p className="text-[11px] text-amber-200/90 leading-relaxed">
            JDLC applications are private and strictly invitation-only. Public registrations are permanently disabled. If you need account credentials or additional service permissions, please contact your network administrator.
          </p>
        </div>

        {/* Section 2: Sovereign Tech & Privacy */}
        <div className="space-y-2 text-xs text-[var(--text-muted)] leading-relaxed">
          <h4 className="font-semibold text-[var(--text-main)] flex items-center gap-1.5">
            <span>🛡️</span>
            <span>Zero Tracking &amp; Sovereign Data</span>
          </h4>
          <p>
            Your activity is never tracked, monetized, or shared with third parties. All network traffic is isolated within private infrastructure or encrypted in-browser before syncing.
          </p>
        </div>

        {/* Section 3: Ecosystem Manifesto */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] p-3 space-y-1 text-xs">
          <div className="font-semibold text-[var(--text-main)]">JDLC Philosophy</div>
          <p className="text-[11px] text-[var(--text-dim)] italic">
            &ldquo;Stop paying without owning.&rdquo; Self-hosted digital sovereignty and tools designed for high-performance productivity and privacy.
          </p>
          <div className="pt-2 flex items-center gap-3 text-[11px]">
            <a
              href="https://jdlc.se/how-tos"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--color-primary-glow)] hover:underline font-medium inline-flex items-center gap-1"
            >
              <span>Knowledge Hub &amp; FAQs</span>
              <span>↗</span>
            </a>
            <span className="text-[var(--text-dim)]">•</span>
            <a
              href="https://jdlc.se/about"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--color-primary-glow)] hover:underline font-medium inline-flex items-center gap-1"
            >
              <span>About JDLC</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
          <span className="text-[10px] text-[var(--text-dim)]">© 2026 JDLC Suite</span>
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
