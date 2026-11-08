## 2026-08-06 - Adding ARIA labels to icon-only buttons
**Learning:** Found several icon-only buttons in modals (like RecipeDatabaseModal) that were completely inaccessible to screen readers because they lacked descriptive text or ARIA attributes.
**Action:** Always verify icon-only buttons (like ✕, ▶, ◀) have descriptive aria-labels for accessibility.

## 2026-08-07 - Dynamic Aria Labels on Action Buttons
**Learning:** Added static aria-labels to buttons that toggle content (like '▶️ Play Mascot' becoming '▶️ Playing...'). While the static label adds basic accessibility, dynamic ARIA labels (e.g. ) are better for ensuring screen readers accurately announce the current state.
**Action:** When adding aria-labels to buttons with dynamic or conditional text, ensure the aria-label updates conditionally to match the state.

## 2026-08-07 - Dynamic Aria Labels on Action Buttons
**Learning:** Added static aria-labels to buttons that toggle content (like '▶️ Play Mascot' becoming '▶️ Playing...'). While the static label adds basic accessibility, dynamic ARIA labels (e.g., `aria-label={isPlaying ? 'Playing recipe' : 'Play recipe with mascot'}`) are better for ensuring screen readers accurately announce the current state.
**Action:** When adding aria-labels to buttons with dynamic or conditional text, ensure the aria-label updates conditionally to match the state.
