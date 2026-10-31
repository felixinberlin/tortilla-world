## 2026-08-06 - Adding ARIA labels to icon-only buttons
**Learning:** Found several icon-only buttons in modals (like RecipeDatabaseModal) that were completely inaccessible to screen readers because they lacked descriptive text or ARIA attributes.
**Action:** Always verify icon-only buttons (like ✕, ▶, ◀) have descriptive aria-labels for accessibility.
## 2024-05-14 - Modal Icon Button Accessibility
**Learning:** Icon-only control buttons (like "✕" for clear/close or "🗑️" for delete) across various modals in this app often lack explicit `aria-label`s and `type="button"` attributes. Relying solely on `title` is insufficient for robust screen reader support, and omitting `type="button"` can risk accidental form submissions if modals ever get wrapped in a `<form>`.
**Action:** When adding or auditing icon-only utility buttons within modals, always explicitly specify `type="button"` and provide a descriptive `aria-label` (e.g., `aria-label="Close preview"` or `aria-label="Delete recipe"`), even if a `title` attribute is present for sighted users.
