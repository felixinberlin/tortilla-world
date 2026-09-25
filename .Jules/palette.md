## 2026-08-06 - Adding ARIA labels to icon-only buttons
**Learning:** Found several icon-only buttons in modals (like RecipeDatabaseModal) that were completely inaccessible to screen readers because they lacked descriptive text or ARIA attributes.
**Action:** Always verify icon-only buttons (like ✕, ▶, ◀) have descriptive aria-labels for accessibility.

## 2024-05-19 - Missing Label Bindings in Forms
**Learning:** Found a recurring accessibility issue where form labels and inputs/selects are created as siblings without explicit `htmlFor` and `id` bindings. This prevents screen readers from correctly associating labels with their controls and breaks the standard behavior where clicking a label focuses its corresponding input.
**Action:** When working on forms, always ensure every `<label>` has an `htmlFor` attribute that matches the unique `id` of its corresponding interactive element (e.g., `<input>`, `<select>`, `<textarea>`).
