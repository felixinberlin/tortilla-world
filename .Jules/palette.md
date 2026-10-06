## 2026-08-06 - Adding ARIA labels to icon-only buttons
**Learning:** Found several icon-only buttons in modals (like RecipeDatabaseModal) that were completely inaccessible to screen readers because they lacked descriptive text or ARIA attributes.
**Action:** Always verify icon-only buttons (like ✕, ▶, ◀) have descriptive aria-labels for accessibility.
## 2026-10-06 - [Missing form control bindings]
**Learning:** Found an application-specific pattern where form components (e.g., Modals, sidebars) were frequently lacking explicit `htmlFor` (label) to `id` (input/textarea/select) bindings, leading to poor keyboard accessibility and preventing click-to-focus on labels.
**Action:** When implementing or updating forms across the codebase, rigorously ensure every `<label>` utilizes `htmlFor` matched with a corresponding unique `id` attribute on the target input element.
