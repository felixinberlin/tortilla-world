## 2026-08-06 - Adding ARIA labels to icon-only buttons
**Learning:** Found several icon-only buttons in modals (like RecipeDatabaseModal) that were completely inaccessible to screen readers because they lacked descriptive text or ARIA attributes.
**Action:** Always verify icon-only buttons (like ✕, ▶, ◀) have descriptive aria-labels for accessibility.
## 2024-10-01 - Form Accessibility Pattern
**Learning:** Found that multiple forms in Tortilla World modals (like `SaveCustomRecipeModal`) have `<label>` tags correctly styled but disconnected from their input elements. This is an accessibility antipattern that breaks screen reader context and click-to-focus behavior.
**Action:** When adding new form controls to modals in this application, always ensure labels are explicitly bound using `htmlFor` and `id` attributes.
