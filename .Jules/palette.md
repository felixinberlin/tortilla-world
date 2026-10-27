## 2026-08-06 - Adding ARIA labels to icon-only buttons
**Learning:** Found several icon-only buttons in modals (like RecipeDatabaseModal) that were completely inaccessible to screen readers because they lacked descriptive text or ARIA attributes.
**Action:** Always verify icon-only buttons (like ✕, ▶, ◀) have descriptive aria-labels for accessibility.
## 2026-08-07 - Missing htmlFor attributes on forms
**Learning:** Found several input labels in forms (like SaveCustomRecipeModal, ActionRecorder, ContainerView, etc) that do not use the `htmlFor` attribute to associate them with the `<input>`, `<textarea>`, or `<select>`.
**Action:** Ensure that all labels explicitly bind to the `id` of their form inputs via `htmlFor` for proper screen reader compatibility and click-to-focus behavior. (Accessibility standard).
