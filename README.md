# @jdlc/ui

Unified design system, accessible UI primitives, and cross-application shell components for the JDLC ecosystem (`taskflow`, `budgetcast`, `tripplanner`, `bandido`, `main`).

---

## 🚀 Features

- **Theme Engine (Dark & Light Modes)**: 6 curated themes powered by dynamic CSS variables (`--bg-root`, `--bg-surface`, `--color-primary`, `--color-text`, `--border-subtle`):
  - 🌙 **Dark Themes**: `linear` (Linear Kinetic), `azure` (Azure JDLC), `emerald` (Pulse Emerald), `amber` (Solar Amber).
  - ☀️ **Light Themes**: `frost` (Nordic Frost: crisp ice & cobalt), `sandstone` (Editorial Sandstone: warm alabaster & terracotta).
- **Tailwind CSS v4 Ready**: Clean utility integration with bundled design tokens.
- **3-Tier Responsive Support**:
  - 📱 **Mobile Phone (< 640px)**: Compact top bars, bottom `MobileTabBar` navigation, and thumb-friendly tap targets.
  - 📱 **Tablet (640px – 1024px)**: Inline header tabs, 2-column grids, balanced modal sizing.
  - 🖥️ **Desktop (> 1024px)**: Multi-column workspaces, persistent sidebars, and keyboard command palettes.
- **Ecosystem Shell & Navigation**: Shared `AppHeader`, `AppSwitcher`, `UserMenu`, and `SUITE_APPS` registry.
- **No Native Browser Popups**: Accessible modal (`Dialog`) and toast notification (`ToastProvider`) ecosystem replacing unstyled `window.alert()` / `window.confirm()`.
- **Identity & Avatars**: Unified DiceBear pixel avatar provider (`AvatarProvider`, `AvatarSelector`, `AvatarGroup`).

---

## 📦 Installation

In your application's `package.json` (within the monorepo):

```json
{
  "dependencies": {
    "@jdlc/ui": "file:../../../jdlc-ui"
  }
}
```

### Vite React Deduplication Requirement
To avoid multi-instance React hook collisions across linked local packages, add to `vite.config.js`:

```javascript
export default defineConfig({
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  server: {
    fs: {
      allow: ['../..'],
    },
  },
});
```

---

## 🛠️ Quick Start

### 1. Import Styles
In your application's entry point (`src/main.jsx` or root CSS):

```javascript
import '@jdlc/ui/style.css';
```

### 2. Wrap Application with Providers
Wrap your root application with the theme, avatar, and toast providers:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, AvatarProvider, ToastProvider } from '@jdlc/ui';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="linear" storageKey="app_theme">
      <AvatarProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </AvatarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
```

---

## 🎨 Theme Matrix

| ID | Name | Mode | Primary Hex | Background Hex | Accent Hex |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `linear` | **Linear Kinetic** | Dark 🌙 | `#7C3AED` | `#090A0F` | `#06B6D4` |
| `azure` | **Azure JDLC** | Dark 🌙 | `#0078D4` | `#080C14` | `#60A5FA` |
| `emerald` | **Pulse Emerald** | Dark 🌙 | `#10B981` | `#0B0E11` | `#14B8A6` |
| `amber` | **Solar Amber** | Dark 🌙 | `#F59E0B` | `#0C0C0E` | `#FBBF24` |
| `frost` | **Nordic Frost** | Light ☀️ | `#2563EB` | `#F8FAFC` | `#0284C7` |
| `sandstone` | **Editorial Sandstone** | Light ☀️ | `#C2410C` | `#FBF9F5` | `#0F766E` |

---

## 🧩 Component Catalog

### Ecosystem Shell & Navigation
| Component | Description |
| :--- | :--- |
| **`AppHeader`** | Top application header featuring brand logo, title, inline navigation, and user actions. |
| **`AppSwitcher`** | Dropdown/modal menu allowing instant 1-click switching across all JDLC applications. |
| **`MobileTabBar`** | Fixed bottom navigation bar (`fixed bottom-0 sm:hidden`) for primary view switching on mobile phones. |
| **`UserMenu`** | Profile trigger displaying user avatar, email, theme toggle, and sign-out actions. |
| **`CommandPalette`** | `⌘K` / `Ctrl+K` searchable command palette for quick navigation and actions. |

### UI Primitives
| Component | Description |
| :--- | :--- |
| **`Button`** | Variants: `default`, `primary`, `secondary`, `danger`, `ghost`, `outline`. Sizes: `sm`, `md`, `lg`. |
| **`Card`** | Container with `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter`. |
| **`Badge`** | Status tags with `dot` indicator. Variants: `default`, `primary`, `success`, `warning`, `danger`. |
| **`Input`, `Textarea`, `Select`** | Accessible form fields with integrated labels, error messages, and helper text. |
| **`Tabs`** | Tab list with animated indicators and URL sync capability. |
| **`Dropdown`** | Click/hover flyout menu for contextual item actions. |

### Overlays & Feedback (Zero Native Popups)
| Component | Description |
| :--- | :--- |
| **`Dialog`** | Accessible modal dialog with backdrop blur, focus trap, and escape key listener. |
| **`ToastProvider` / `useToast`** | In-app feedback notifications (`toast.success()`, `toast.error()`, `toast.info()`). |

### Identity & Avatars
| Component | Description |
| :--- | :--- |
| **`Avatar`** | User avatar supporting DiceBear suits, images, or initials. |
| **`AvatarGroup`** | Overlapping stack of collaborator avatars with overflow count (`+3`). |
| **`AvatarSelector`** | Modal/picker enabling users to select their profile suit style. |

---

## 🌐 Ecosystem Suite Ports

When developing locally, applications use fixed ports to maintain auth sessions and inter-app navigation:

| App | Port | URL |
| :--- | :--- | :--- |
| **`jdlc-ui`** (Playground) | `5180` | `http://localhost:5180` |
| **`apps/main`** (Hub) | `5170` | `http://localhost:5170` |
| **`apps/taskflow`** | `5173` | `http://localhost:5173` |
| **`apps/budgetcast`** | `5174` | `http://localhost:5174` |
| **`apps/tripplanner`** | `5175` | `http://localhost:5175` |
| **`apps/bandido`** | `5176` | `http://localhost:5176` |

---

## 🧪 Playground & Development

To preview and interact with the component library playground:

```bash
cd D:/Git/jdlc-ui
npm install
npm run dev
```

To build distribution packages (`dist/index.js`, `dist/index.cjs`, `dist/ui.css`):

```bash
npm run build
```
