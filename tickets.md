# Tortilla World: Development Tasks & Tickets

Based on recent user feedback and persona reviews, the following tickets have been generated for future development.

## Epic 1: Advanced Cooking Simulation & Mechanics
**Source:** Chef Julian (Professional Chef), Maria (65-year-old Grandmother)

*   **Task 1.1: Implement Temperature System for Containers**
    *   **Description:** Introduce a `temperature` property to entities (like the pan) and a system that modifies it based on heat source state.
    *   **Acceptance Criteria:** Pans can heat up and cool down. Ingredients placed in hot pans experience state changes (e.g., `raw` -> `cooked`).

*   **Task 1.2: Add "Flip" (Dar la Vuelta) Mechanic**
    *   **Description:** Create a specific interaction/action for flipping the contents of a pan, which is crucial for making a tortilla.
    *   **Acceptance Criteria:** A user can trigger a `FLIP_CONTAINER` action. The system handles reversing the stack of entities or updating their 'cooked side' state.

*   **Task 1.3: Simulate Basic Chemistry/Moisture Loss**
    *   **Description:** Introduce properties for moisture and starch to ingredients.
    *   **Acceptance Criteria:** Potatoes lose moisture and shrink slightly when cooked; eggs coagulate based on time-at-temperature.

## Epic 2: Gamification & Progression
**Source:** Jake (Casual Gamer)

*   **Task 2.1: Implement Scoring System**
    *   **Description:** Add a scoring mechanic based on the accuracy of the recipe execution, timing, and ingredient state (e.g., perfect caramelization vs. burnt).
    *   **Acceptance Criteria:** Upon completing a recipe, the user receives a score and a star rating (1-3 stars).

*   **Task 2.2: Add "Time Attack" Game Mode**
    *   **Description:** Create a mode where users must fulfill incoming orders within a time limit.
    *   **Acceptance Criteria:** A UI component displays active orders. A timer counts down. Fulfilling orders grants points and extra time.

## Epic 3: Accessibility & Practical Utility
**Source:** Sarah (Busy Parent)

*   **Task 3.1: "Recipe Only" / Quick View Mode**
    *   **Description:** Provide a toggle to bypass the simulation and simply view the required ingredients and steps for a recipe in a clean, standard list format.
    *   **Acceptance Criteria:** A toggle button switches between "Simulation Mode" and "Recipe List Mode".

## Epic 4: Technical Debt & Engine Improvements
**Source:** Alex (Informatics Student), Dr. Lin (AI Researcher)

*   **Task 4.1: Profile and Optimize React Rendering for ECS**
    *   **Description:** Investigate performance bottlenecks when rendering many entities in the DOM using the current Zustand/React setup.
    *   **Acceptance Criteria:** Profiling report generated. Memoization and batching improvements implemented where necessary to maintain 60fps during complex interactions.

*   **Task 4.2: Formalize AI Agent API/Hooks**
    *   **Description:** Create a dedicated, documented API surface for external scripts or LLMs to read world state and dispatch typed actions (e.g., `MOVE_ENTITY`) directly, bypassing the UI.
    *   **Acceptance Criteria:** Documentation provided for headless state interaction. Example script provided demonstrating an agent moving an object.