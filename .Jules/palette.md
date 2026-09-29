## 2026-08-06 - Adding ARIA labels to icon-only buttons
**Learning:** Found several icon-only buttons in modals (like RecipeDatabaseModal) that were completely inaccessible to screen readers because they lacked descriptive text or ARIA attributes.
**Action:** Always verify icon-only buttons (like ✕, ▶, ◀) have descriptive aria-labels for accessibility.
## 2024-10-18 - Missing aria-labels in Modals
**Learning:** Icon-only buttons (like ✕ or 🗑️) inside highly interactive modals (`RecipeDatabaseModal.tsx`) lacked semantic context for screen readers.
**Action:** Always verify that interactive overlays and modals with icon buttons explicitly declare `type="button"` and provide clear `aria-label` attributes to maintain accessibility parity with standard layout elements.
