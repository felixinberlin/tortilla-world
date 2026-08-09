## 2026-08-06 - Adding ARIA labels to icon-only buttons
**Learning:** Found several icon-only buttons in modals (like RecipeDatabaseModal) that were completely inaccessible to screen readers because they lacked descriptive text or ARIA attributes.
**Action:** Always verify icon-only buttons (like ✕, ▶, ◀) have descriptive aria-labels for accessibility.

## 2023-10-27 - Icon-only buttons often miss ARIA labels
**Learning:** Found multiple icon-only "close" (✕) buttons missing `aria-label` attributes. This is a common pattern in quick-close buttons (like modals or search clears).
**Action:** Always check for `aria-label` on any button containing only an icon or symbol, especially generic ones like "✕".
