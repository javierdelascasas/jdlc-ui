import React, { createContext, useContext, useState, useEffect } from 'react';
import { AvatarProvider } from './AvatarContext.jsx';

export const THEMES = [
  {
    id: 'linear',
    name: 'Linear Kinetic',
    description: 'Electric Violet & Obsidian Void',
    primaryHex: '#7C3AED',
    bgHex: '#090A0F',
    accentHex: '#06B6D4',
  },
  {
    id: 'azure',
    name: 'Azure JDLC',
    description: 'Azure Blue & Midnight Navy',
    primaryHex: '#0078D4',
    bgHex: '#080C14',
    accentHex: '#60A5FA',
  },
  {
    id: 'emerald',
    name: 'Pulse Emerald',
    description: 'Luminous Mint & Deep Slate',
    primaryHex: '#10B981',
    bgHex: '#0B0E11',
    accentHex: '#14B8A6',
  },
  {
    id: 'amber',
    name: 'Solar Amber',
    description: 'Solar Ember & Volcanic Graphite',
    primaryHex: '#F59E0B',
    bgHex: '#0C0C0E',
    accentHex: '#FBBF24',
  },
  {
    id: 'frost',
    name: 'Nordic Frost',
    description: 'Crisp Ice Canvas & Precision Electric Cobalt',
    primaryHex: '#2563EB',
    bgHex: '#F8FAFC',
    accentHex: '#0284C7',
    isLight: true,
  },
  {
    id: 'sandstone',
    name: 'Editorial Sandstone',
    description: 'Warm Alabaster Canvas & Burnt Terracotta',
    primaryHex: '#C2410C',
    bgHex: '#FBF9F5',
    accentHex: '#0F766E',
    isLight: true,
  },
];

const ThemeContext = createContext({
  theme: 'linear',
  setTheme: () => {},
  currentThemeConfig: THEMES[0],
  availableThemes: THEMES,
});

export function ThemeProvider({ children, defaultTheme = 'linear', storageKey = 'jdlc_theme' }) {
  const [theme, setTheme] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(storageKey);
        return saved || defaultTheme;
      }
      return defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  useEffect(() => {
    try {
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(storageKey, theme);
      }
    } catch {
      // ignore
    }
  }, [theme, storageKey]);

  const currentThemeConfig = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentThemeConfig, availableThemes: THEMES }}>
      <AvatarProvider>
        {children}
      </AvatarProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return {
      theme: 'linear',
      setTheme: () => {},
      currentThemeConfig: THEMES[0],
      availableThemes: THEMES,
    };
  }
  return ctx;
}
