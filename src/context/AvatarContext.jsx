import React, { createContext, useContext, useState, useEffect } from 'react';

export const AVATAR_SUITS = [
  {
    id: 'notionists',
    name: 'Notionists',
    description: 'Minimalist editorial sketches',
  },
  {
    id: 'bottts',
    name: 'Bottts',
    description: 'Playful futuristic robots',
  },
  {
    id: 'lorelei',
    name: 'Lorelei',
    description: 'Modern clean line portraits',
  },
  {
    id: 'critters',
    name: 'Critters',
    description: 'Expressive cute animals',
  },
  {
    id: 'moods',
    name: 'Moods',
    description: 'Geometric gradient emotion faces',
  },
  {
    id: 'fun-emoji',
    name: 'Fun Emoji',
    description: 'Vibrant pop emoticon faces',
  },
  {
    id: 'pixel-art',
    name: 'Pixel Art',
    description: 'Retro 8-bit gaming characters',
  },
  {
    id: 'adventurer',
    name: 'Adventurer',
    description: 'Fantasy RPG portraits',
  },
];

const AvatarContext = createContext({
  suit: 'notionists',
  setSuit: () => {},
  currentSuitConfig: AVATAR_SUITS[0],
  availableSuits: AVATAR_SUITS,
});

export function AvatarProvider({ children, defaultSuit = 'notionists', storageKey = 'jdlc_avatar_suit' }) {
  const [suit, setSuit] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(storageKey);
        if (saved && AVATAR_SUITS.some((s) => s.id === saved)) {
          return saved;
        }
        return defaultSuit;
      }
      return defaultSuit;
    } catch {
      return defaultSuit;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, suit);
      }
    } catch {
      // ignore
    }
  }, [suit, storageKey]);

  const currentSuitConfig = AVATAR_SUITS.find((s) => s.id === suit) || AVATAR_SUITS[0];

  return (
    <AvatarContext.Provider value={{ suit, setSuit, currentSuitConfig, availableSuits: AVATAR_SUITS }}>
      {children}
    </AvatarContext.Provider>
  );
}

export function useAvatar() {
  const ctx = useContext(AvatarContext);
  if (!ctx) {
    let initialSuit = 'notionists';
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('jdlc_avatar_suit');
        if (saved && AVATAR_SUITS.some((s) => s.id === saved)) {
          initialSuit = saved;
        }
      }
    } catch {
      // ignore
    }
    const currentSuitConfig = AVATAR_SUITS.find((s) => s.id === initialSuit) || AVATAR_SUITS[0];
    return {
      suit: initialSuit,
      setSuit: () => {},
      currentSuitConfig,
      availableSuits: AVATAR_SUITS,
    };
  }
  return ctx;
}
