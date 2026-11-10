## 2026-08-06 - Adding ARIA labels to icon-only buttons
**Learning:** Found several icon-only buttons in modals (like RecipeDatabaseModal) that were completely inaccessible to screen readers because they lacked descriptive text or ARIA attributes.
**Action:** Always verify icon-only buttons (like ✕, ▶, ◀) have descriptive aria-labels for accessibility.

## 2024-05-24 - Icon-only buttons need aria-labels
**Learning:** Icon-only buttons (like "✕") in modals lack accessible names, making them difficult for screen reader users to understand their purpose.
**Action:** Always verify icon-only buttons have an `aria-label` attribute describing their action (e.g. `aria-label="Clear search"` or `aria-label="Close preview"`).
