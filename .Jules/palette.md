## 2026-08-06 - Adding ARIA labels to icon-only buttons
**Learning:** Found several icon-only buttons in modals (like RecipeDatabaseModal) that were completely inaccessible to screen readers because they lacked descriptive text or ARIA attributes.
**Action:** Always verify icon-only buttons (like ✕, ▶, ◀) have descriptive aria-labels for accessibility.

## 2026-10-05 - Ensure Accessible Form Fields in Modals
**Learning:** When building complex forms inside modals (like SaveCustomRecipeModal.tsx), it is essential to explicitly bind `<label>` elements to their interactive elements (e.g., `<input>`, `<textarea>`, `<select>`) using `htmlFor` and `id`. Doing so not only enhances screen reader accessibility but also vastly improves UX by enabling click-to-focus on the label itself, which is particularly beneficial in tighter, modal-based layouts.
**Action:** Always verify that every form label explicitly references the ID of the corresponding input when adding or modifying form fields in modal components.
