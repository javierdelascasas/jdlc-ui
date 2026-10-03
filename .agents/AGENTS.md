# @jdlc/ui Repository Agent Rules

### 1. Component Authoring Standards
- **Zero Hardcoded Colors:** Never write hardcoded color classes (like `bg-zinc-900`, `text-[#0078d4]`). Always use CSS variable tokens defined in `src/styles/tokens.css` (e.g. `bg-[var(--bg-surface)]`, `text-[var(--text-main)]`, `focus:ring-[var(--ring-focus)]`).
- **Composition & cn:** Every component must use `cn()` from `src/lib/utils.js` and allow overriding/extending via `className`.
- **Compound Components:** Use compound exports (e.g., `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`) for container elements.

### 2. Responsive Design Scale (3 Screen Sizes)
- **Mobile Phone (< 640px):** Ensure touch-friendly tap targets (>= 44px), text wrapping/truncation resilience, full-width responsive dialogs (`w-full max-h-[92vh]`), and horizontal scroll protection for toolbars.
- **Tablet (640px - 1024px):** Ensure clean 2-column grid adaptation, collapsible action menus, and balanced modal widths (`max-w-lg`).
- **Desktop (> 1024px):** Support multi-column layouts, rich data displays, keyboard shortcut badges, and subtle hover lighting.

### 3. Playground Maintenance
- When adding or modifying a component, update `playground/App.jsx` with an interactive demo demonstrating all variants and sizes under all 4 themes (`linear`, `azure`, `emerald`, `amber`) tested across mobile, tablet, and desktop viewports.

### 4. Build & Parity Verification
- Always execute `npm run build` after modifying components to ensure `dist/index.js`, `dist/index.cjs`, and `dist/ui.css` are updated cleanly with zero build errors.
