## 2026-08-06 - Adding ARIA labels to icon-only buttons
**Learning:** Found several icon-only buttons in modals (like RecipeDatabaseModal) that were completely inaccessible to screen readers because they lacked descriptive text or ARIA attributes.
**Action:** Always verify icon-only buttons (like ✕, ▶, ◀) have descriptive aria-labels for accessibility.

## 2023-10-27 - Missing aria-labels on symbolic buttons
**Learning:** Icon-only buttons using symbols like -, +, 🔄, and ✕ in modals and sidebars (e.g., `IngredientsSidebar`, `RecipeDatabaseModal`) are not accessible to screen readers because they lack semantic meaning and proper descriptive text.
**Action:** Always verify that interactive elements lacking explicit textual descriptions include meaningful `aria-label` attributes to ensure keyboard and screen reader accessibility.
