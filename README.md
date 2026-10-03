# @jdlc/ui

Unified frontend component library and design system for JDLC applications.

## 🚀 Features

- **Theme Engine**: Built-in dark mode themes (`linear`, `azure`, `emerald`, `amber`) powered by CSS variables.
- **Tailwind CSS v4**: Ultra-fast styling with standard utility compatibility.
- **Accessible UI Primitives**: `Button`, `Card`, `Badge`, `Input`, `Textarea`, `Select`, `Dialog`, `Dropdown`, `Tabs`, `ThemeSelector`.
- **Zero Friction**: Dual ESM/CJS exports with pre-compiled CSS bundle.

## 📦 Installation

In your application:

```bash
# Sibling link for local monorepo / workspace development
npm install ../jdlc-ui
```

## 🛠️ Usage

### 1. Import Styles

In your application's entry point (`main.jsx` or `index.css`):

```javascript
import '@jdlc/ui/style.css';
```

### 2. Wrap with ThemeProvider

```jsx
import { ThemeProvider } from '@jdlc/ui';

export function App() {
  return (
    <ThemeProvider defaultTheme="azure">
      <YourAppContent />
    </ThemeProvider>
  );
}
```

### 3. Use Components

```jsx
import { Button, Card, Badge, Input, ThemeSelector } from '@jdlc/ui';

export function Dashboard() {
  return (
    <Card hover>
      <div className="flex justify-between items-center">
        <Badge variant="primary" dot>Live</Badge>
        <ThemeSelector />
      </div>
      <Button variant="default">Click Me</Button>
    </Card>
  );
}
```

## 🧪 Development & Playground

To preview and interact with all components locally:

```bash
npm install
npm run dev
```

To build the library for distribution:

```bash
npm run build
```
