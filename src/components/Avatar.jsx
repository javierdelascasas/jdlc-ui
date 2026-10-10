import React, { useState } from 'react';
import { cn } from '../lib/utils.js';

/**
 * Supported DiceBear avatar suits.
 */
export const DICEBEAR_SUITS = {
  notionists: 'notionists',
  bottts: 'bottts',
  lorelei: 'lorelei',
  critters: 'critters',
  moods: 'moods',
  'fun-emoji': 'fun-emoji',
  'pixel-art': 'pixel-art',
  adventurer: 'adventurer',
};

/**
 * Returns a high-resolution SVG avatar URL from the DiceBear 10.x API.
 *
 * @param {Object} options
 * @param {string} [options.seed='jdlc-user'] - Seed string (email, username, or uuid)
 * @param {'notionists'|'moods'|'critters'|'bottts'|'fun-emoji'} [options.suit='notionists'] - DiceBear suit
 * @param {number} [options.size=64] - Pixel size
 * @param {number} [options.radius=50] - Border radius percentage (50 = round, 0 = square)
 * @param {string} [options.backgroundColor] - Optional background hex (without #)
 * @returns {string} URL to SVG avatar
 */
export function getDiceBearAvatarUrl({
  seed = 'jdlc-user',
  suit = 'notionists',
  size = 64,
  radius = 50,
  backgroundColor = null,
} = {}) {
  const selectedSuit = DICEBEAR_SUITS[suit] || 'notionists';
  const cleanSeed = encodeURIComponent(seed || 'jdlc-user');
  const params = new URLSearchParams({
    seed: cleanSeed,
    size: size.toString(),
  });

  if (radius !== undefined && radius !== null) {
    params.set('radius', radius.toString());
  }

  if (backgroundColor) {
    params.set('backgroundColor', backgroundColor.replace('#', ''));
  }

  return `https://api.dicebear.com/10.x/${selectedSuit}/svg?${params.toString()}`;
}

const SIZE_MAP = {
  xs: {
    container: 'w-5 h-5 text-[9px]',
    status: 'w-1.5 h-1.5 ring-1',
    px: 20,
  },
  sm: {
    container: 'w-7 h-7 text-xs',
    status: 'w-2 h-2 ring-1.5',
    px: 28,
  },
  md: {
    container: 'w-9 h-9 text-sm',
    status: 'w-2.5 h-2.5 ring-2',
    px: 36,
  },
  lg: {
    container: 'w-11 h-11 text-base',
    status: 'w-3 h-3 ring-2',
    px: 44,
  },
  xl: {
    container: 'w-14 h-14 text-lg',
    status: 'w-3.5 h-3.5 ring-2',
    px: 56,
  },
};

const SHAPE_MAP = {
  circle: 'rounded-full',
  rounded: 'rounded-xl',
  square: 'rounded-none',
};

const STATUS_MAP = {
  online: 'bg-emerald-500',
  busy: 'bg-rose-500',
  away: 'bg-amber-500',
  offline: 'bg-slate-500',
};

/**
 * Accessible Avatar component rendering DiceBear 10.x vector avatars with fallback monogram.
 */
export function Avatar({
  seed,
  name,
  src,
  suit = 'notionists',
  size = 'md',
  shape = 'circle',
  status,
  className,
  alt,
  ...props
}) {
  const [hasError, setHasError] = useState(false);

  const sizeConfig = SIZE_MAP[size] || SIZE_MAP.md;
  const shapeClass = SHAPE_MAP[shape] || SHAPE_MAP.circle;

  const fallbackInitial = (name || seed || 'U')
    .toString()
    .trim()
    .charAt(0)
    .toUpperCase();

  const avatarUrl =
    src ||
    getDiceBearAvatarUrl({
      seed: seed || name || 'jdlc-user',
      suit,
      size: sizeConfig.px * 2, // 2x density for crisp retina
      radius: shape === 'circle' ? 50 : shape === 'rounded' ? 20 : 0,
    });

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center shrink-0 select-none bg-[var(--bg-elevated)] border border-[var(--border-subtle)] overflow-hidden shadow-xs',
        sizeConfig.container,
        shapeClass,
        className
      )}
      {...props}
    >
      {!hasError ? (
        <img
          src={avatarUrl}
          alt={alt || name || seed || 'User Avatar'}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <span className="font-bold text-slate-200 uppercase font-[var(--font-heading)] leading-none">
          {fallbackInitial}
        </span>
      )}

      {/* Presence Status Dot */}
      {status && STATUS_MAP[status] && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-[var(--bg-surface)]',
            sizeConfig.status,
            STATUS_MAP[status]
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}

/**
 * AvatarGroup component for overlapping multiple avatars.
 */
export function AvatarGroup({
  children,
  max = 4,
  size = 'sm',
  className,
}) {
  const childrenArray = React.Children.toArray(children);
  const visibleAvatars = childrenArray.slice(0, max);
  const remainingCount = childrenArray.length - max;
  const sizeConfig = SIZE_MAP[size] || SIZE_MAP.sm;

  return (
    <div className={cn('flex items-center -space-x-2', className)}>
      {visibleAvatars.map((child, index) => (
        <div key={index} className="relative ring-2 ring-[var(--bg-root)] rounded-full">
          {React.isValidElement(child) ? React.cloneElement(child, { size }) : child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            'relative inline-flex items-center justify-center rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] ring-2 ring-[var(--bg-root)] font-bold text-slate-300 font-mono text-[10px]',
            sizeConfig.container
          )}
          title={`${remainingCount} more`}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
