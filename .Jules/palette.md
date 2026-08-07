## 2026-08-06 - Adding ARIA labels to icon-only buttons
**Learning:** Found several icon-only buttons in modals (like RecipeDatabaseModal) that were completely inaccessible to screen readers because they lacked descriptive text or ARIA attributes.
**Action:** Always verify icon-only buttons (like ✕, ▶, ◀) have descriptive aria-labels for accessibility.
## 2026-08-06 - Found Missing ARIA Label in Format Inspector
**Learning:** The format inspector modal close button ("✕") lacked an aria-label, rendering it completely inaccessible to screen reader users trying to dismiss the modal. This is a common pattern in our app where custom close buttons lack basic accessibility.
**Action:** Added `aria-label="Close format inspector"` to ensure users understand the purpose of the button before clicking.
