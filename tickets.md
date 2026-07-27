# Tortilla World: Development Tasks & Tickets

Based on recent user feedback and persona reviews, the following tickets have been generated for future development.

## Epic 1: Advanced Cooking Simulation & Mechanics
**Source:** Chef Julian (Professional Chef), Maria (65-year-old Grandmother), Klaus (Mechanical Engineer), Petra (Hobby Cook), Anna (Environmentalist)

*   **Task 1.1: Implement Temperature System for Containers**
    *   **Description:** Introduce a `temperature` property to entities (like the pan) and a system that modifies it based on heat source state.
    *   **Acceptance Criteria:** Pans can heat up and cool down. Ingredients placed in hot pans experience state changes (e.g., `raw` -> `cooked`).

*   **Task 1.2: Add "Flip" (Dar la Vuelta) Mechanic**
    *   **Description:** Create a specific interaction/action for flipping the contents of a pan, which is crucial for making a tortilla.
    *   **Acceptance Criteria:** A user can trigger a `FLIP_CONTAINER` action. The system handles reversing the stack of entities or updating their 'cooked side' state.

*   **Task 1.3: Simulate Basic Chemistry/Moisture Loss**
    *   **Description:** Introduce properties for moisture and starch to ingredients.
    *   **Acceptance Criteria:** Potatoes lose moisture and shrink slightly when cooked; eggs coagulate based on time-at-temperature.

*   **Task 1.4: Implement Exact Metric Measurements (DIN Standard)**
    *   **Description:** Replace abstract entities (e.g., "a potato") with measurable units (e.g., grams, liters). Add a "Scale" entity to measure ingredient weights.
    *   **Acceptance Criteria:** Recipes require specific weights. The simulation calculates mass accurately.

*   **Task 1.5: Add Sensory and Waste Systems**
    *   **Description:** Introduce visual cues for aromas (e.g., steam, color changes for smell). Implement a waste management system where actions (like peeling) create byproduct entities that must be disposed of in a "Compost" container.
    *   **Acceptance Criteria:** Visual aroma effects implemented. Waste entities generate correctly and interact with the compost container.

## Epic 2: Gamification & Progression
**Source:** Jake (Casual Gamer), Maximilian (Gamer), Martina (Teacher)

*   **Task 2.1: Implement Scoring System**
    *   **Description:** Add a scoring mechanic based on the accuracy of the recipe execution, timing, and ingredient state (e.g., perfect caramelization vs. burnt).
    *   **Acceptance Criteria:** Upon completing a recipe, the user receives a score and a star rating (1-3 stars).

*   **Task 2.2: Add "Time Attack" Game Mode**
    *   **Description:** Create a mode where users must fulfill incoming orders within a time limit.
    *   **Acceptance Criteria:** A UI component displays active orders. A timer counts down. Fulfilling orders grants points and extra time.

*   **Task 2.3: Introduce Multiplayer and Teacher Dashboards**
    *   **Description:** Create a rudimentary multiplayer mode (co-op or sabotage) and a teacher view to assign recipes and track user/student progress.
    *   **Acceptance Criteria:** Basic web socket integration for state sharing between two clients. Dashboard UI for tracking assigned tasks.

## Epic 3: Accessibility, UI, & Practical Utility
**Source:** Sarah (Busy Parent), Lukas (University Student), Sabine (Logistics Manager), Helga (Retiree)

*   **Task 3.1: "Recipe Only" / Quick View Mode**
    *   **Description:** Provide a toggle to bypass the simulation and simply view the required ingredients and steps for a recipe in a clean, standard list format.
    *   **Acceptance Criteria:** A toggle button switches between "Simulation Mode" and "Recipe List Mode".

*   **Task 3.2: Dark Mode Theme**
    *   **Description:** Implement a global dark mode toggle for the UI.
    *   **Acceptance Criteria:** All UI components and world background adapt to a dark color palette.

*   **Task 3.3: Bulk Actions and Undo System**
    *   **Description:** Allow users to select and move multiple entities at once. Implement a state history stack to allow "Undo" actions for accidental moves or deletions.
    *   **Acceptance Criteria:** Shift-click or bounding box selection implemented. A history stack allows reverting to the previous state.

## Epic 4: Content, Diet & Economics
**Source:** Dieter (Master Butcher), Julia (Nutritionist), Sophie (Vegan Chef), Jörg (Tax Consultant)

*   **Task 4.1: Nutritional and Cost Calculation**
    *   **Description:** Assign macro-nutritional values and price attributes to all ingredients.
    *   **Acceptance Criteria:** The UI displays total calories, macros, and cost for the current contents of a container or a finished recipe.

*   **Task 4.2: Alternative Ingredients and Dietary Substitutions**
    *   **Description:** Expand the pantry to include alternative ingredients (e.g., chickpea flour, silken tofu, chorizo) and allow recipes to accept these substitutions.
    *   **Acceptance Criteria:** New entities created. Recipe matcher updated to validate alternative valid combinations.

## Epic 5: Technical Debt & Engine Improvements
**Source:** Alex (Informatics Student), Dr. Lin (AI Researcher), Felix (Data Scientist), Christian (QA Tester), Stefan (Process Engineer)

*   **Task 5.1: Profile and Optimize React Rendering for ECS**
    *   **Description:** Investigate performance bottlenecks when rendering many entities in the DOM using the current Zustand/React setup. Fix edge cases with rapid asynchronous drag events.
    *   **Acceptance Criteria:** Profiling report generated. Memoization and batching improvements implemented. Drag-and-drop state locking fixed.

*   **Task 5.2: Formalize AI Agent API/Hooks**
    *   **Description:** Create a dedicated, documented API surface for external scripts or LLMs to read world state and dispatch typed actions (e.g., `MOVE_ENTITY`) directly, bypassing the UI.
    *   **Acceptance Criteria:** Documentation provided for headless state interaction. Example script provided demonstrating an agent moving an object.

*   **Task 5.3: Visualizing State and Dependencies**
    *   **Description:** Create a debug view that visualizes the Zustand state tree and a Gantt chart overlay showing critical path dependencies for the current recipe.
    *   **Acceptance Criteria:** A togglable debug panel displays the raw JSON state and task timeline.