## 2026-08-12 - Adding ARIA labels to icon-only buttons
**Learning:** Found several icon-only buttons in modals (like RecipeDatabaseModal) that were completely inaccessible to screen readers because they lacked descriptive text or ARIA attributes. Often these buttons also lack `type="button"` which can cause unintended form submissions.
**Action:** Always verify icon-only buttons (like ✕, ▶, ◀) have descriptive aria-labels for accessibility and ensure they have `type="button"` if they are not meant to submit a form.
