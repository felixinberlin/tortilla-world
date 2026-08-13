## 2026-08-06 - Adding ARIA labels to icon-only buttons
**Learning:** Found several icon-only buttons in modals (like RecipeDatabaseModal) that were completely inaccessible to screen readers because they lacked descriptive text or ARIA attributes.
**Action:** Always verify icon-only buttons (like ✕, ▶, ◀) have descriptive aria-labels for accessibility.
## 2024-08-13 - Actionable Insights from Linter Errors in React Components
**Learning:** Found situations where \`useEffect\` triggers state changes synchronously resulting in cascading render errors from ESLint in React 19. Also discovered missing dependencies in the build output requiring extra installations (jszip, file-saver).
**Action:** When adjusting components, pay close attention to \`useEffect\` hook dependencies and synchronous \`setState\` calls. Use \`useCallback\` to stabilize function dependencies and \`setTimeout\` to defer state updates out of the render cycle. Remember to run \`pnpm build\` and \`pnpm test\` to identify and resolve missing dependencies early in the workflow.
