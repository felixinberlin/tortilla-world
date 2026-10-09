## 2026-08-06 - Adding ARIA labels to icon-only buttons
**Learning:** Found several icon-only buttons in modals (like RecipeDatabaseModal) that were completely inaccessible to screen readers because they lacked descriptive text or ARIA attributes.
**Action:** Always verify icon-only buttons (like ✕, ▶, ◀) have descriptive aria-labels for accessibility.

## 2026-10-09 - Explicit Label Bindings in Custom Modals
**Learning:** Relying solely on nested inputs within labels or omitting explicit bindings altogether causes poor click-to-focus behavior and reduced screen reader compatibility in complex React modals.
**Action:** Always bind `<label>` elements explicitly to their corresponding `<input>`, `<select>`, or `<textarea>` using matching `htmlFor` and `id` attributes, especially in dynamic or custom form components.
