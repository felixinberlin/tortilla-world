## 2026-08-06 - Adding ARIA labels to icon-only buttons
**Learning:** Found several icon-only buttons in modals (like RecipeDatabaseModal) that were completely inaccessible to screen readers because they lacked descriptive text or ARIA attributes.
**Action:** Always verify icon-only buttons (like ✕, ▶, ◀) have descriptive aria-labels for accessibility.
## 2026-10-18 - Explicit Form Label Binding
**Learning:** Found several forms (like in SaveCustomRecipeModal) that had labels without explicit htmlFor/id bindings, limiting click-to-focus and screen reader accessibility.
**Action:** Ensure all form labels are explicitly bound to their respective interactive elements using matching htmlFor and id attributes.
