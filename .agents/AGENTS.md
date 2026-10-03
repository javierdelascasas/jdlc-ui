# @jdlc/ui Repository Agent Rules

### 1. Component Authoring Standards
- **Zero Hardcoded Colors:** Never write hardcoded color classes (like `bg-zinc-900`, `text-[#0078d4]`). Always use CSS variable tokens defined in `src/styles/tokens.css` (e.g. `bg-[var(--bg-surface)]`, `text-[var(--text-main)]`, `focus:ring-[var(--ring-focus)]`).
- **Composition & cn:** Every component must use `cn()` from `src/lib/utils.js` and allow overriding/extending via `className`.
- **Compound Components:** Use compound exports (e.g., `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`) for container elements.

### 2. Playground Maintenance
- When adding or modifying a component, update `playground/App.jsx` with an interactive demo demonstrating all variants and sizes under all 4 themes (`linear`, `azure`, `emerald`, `amber`).

### 3. Build & Parity Verification
- Always execute `npm run build` after modifying components to ensure `dist/index.js`, `dist/index.cjs`, and `dist/ui.css` are updated cleanly with zero build errors.
