## 2026-08-06 - Adding ARIA labels to icon-only buttons
**Learning:** Found several icon-only buttons in modals (like RecipeDatabaseModal) that were completely inaccessible to screen readers because they lacked descriptive text or ARIA attributes.
**Action:** Always verify icon-only buttons (like ✕, ▶, ◀) have descriptive aria-labels for accessibility.
## 2024-10-17 - Icon-only buttons lacking context
**Learning:** Found several icon-only buttons (containing just an "✕" character) in the `RecipeDatabaseModal` component that lacked `aria-label` attributes, making them inaccessible to screen readers.
**Action:** Always ensure that any button that only contains an icon or a symbol (like "✕") has an explicitly defined `aria-label` attribute describing its function (e.g., "Clear search", "Close format preview").
