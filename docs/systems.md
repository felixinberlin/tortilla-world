# Systems

## Overview

Systems contain the behaviour of Tortilla World.

Components display the world.
Systems modify the world.

A system receives actions, validates them, and updates the world state.

The general flow is:

```text
Input
  |
  v
Action
  |
  v
System
  |
  v
Validation
  |
  v
World State Update
  |
  v
UI Update
```

---

# System Architecture

Tortilla World is based on independent systems.

Current and planned systems:

```text
Systems

├── Interaction System
├── Movement System
├── Container System
├── Mascot System
├── Animation System
├── Cooking System
└── AI System
```

Each system has a clear responsibility.

---

# Interaction System

## Responsibility

The Interaction System converts external events into world actions.

External events:

* mouse drag and drop
* touch drag and drop (configured via `TouchSensor` with delay/tolerance & `touch-action: none`)
* workstation navigation buttons (`◀` / `▶` step movement)
* AI requests
* future keyboard/gamepad input

The Interaction System does not modify the world directly.

---

## Example

User drags potato into pan.

The Interaction System creates:

```ts
{
  type:"MOVE_ENTITY",
  entityId:"potato",
  targetContainer:"pan"
}
```

The action is passed to the Movement System.

---

# Movement System

## Responsibility

The Movement System controls ownership changes.

It handles:

* moving entities
* validating source ownership
* validating destination rules
* applying transfer behaviour

---

## Move Flow

```text
Move Request

      |
      v

Find Entity

      |
      v

Find Current Container

      |
      v

Find Target Container

      |
      v

Validate Move

      |
      v

Apply Transfer Rule

      |
      v

Update Ownership

```

---

# Move Validation

Before moving an entity, the system checks:

## Entity existence

Does the entity exist?

Example:

```text
potato
```

must exist in the world.

---

## Source ownership

Does the source container own the entity?

Example:

Valid:

```text
Kitchen owns potato
```

Invalid:

```text
Pan owns potato
```

when moving from Kitchen.

---

## Destination capability

Can the target container accept this entity?

Example:

A pan may accept:

```text
ingredient
```

but reject:

```text
container
```

---

## Duplicate rules

The container checks uniqueness using state-aware ingredient matching (`getIngredientCatalogId`).

Uniqueness incorporates ingredient preparation and cooking states (`baseId:preparation:cooking`):

Valid (different ingredients OR different states):

```text
Trash
  - raw lemon (lemon)
  - peeled lemon (lemon:peeled)
```

Invalid (two identical raw ingredients):

```text
Trash
  - raw lemon (lemon)
  - raw lemon (lemon)
```

---

# Transfer Rules

A move is not always the same operation.

Containers define transfer behaviour.

---

# Static Container To Dynamic Container

Example:

```text
Kitchen
 |
 potato


Recipe
```

Move potato:

Result:

```text
Kitchen
 |
 potato


Recipe
 |
 potato
```

The destination receives the ingredient.

The source remains unchanged.

This represents a world resource.

---

# Dynamic Container To Dynamic Container

Example:

```text
Recipe
 |
 potato


Pan
```

Move potato:

Result:

```text
Recipe


Pan
 |
 potato
```

Ownership transfers.

---

# Dynamic Container To Static Container

Example:

```text
Recipe
 |
 potato


Kitchen
```

Move potato back.

Result:

```text
Recipe


Kitchen
 |
 potato
```

The dynamic container loses ownership.

The static container provides the original world resource.

---

# Container System

## Responsibility

The Container System manages container rules.

It answers questions:

* Can this entity be added?
* Can this entity be removed?
* Are duplicates allowed?
* Is the container full?
* Does ordering matter?

---

## Example API

```ts
canAccept(
  container,
  entity
)
```

returns:

```ts
true
```

or:

```ts
false
```

---

## Trash Container & EMPTY_TRASH Action

The `trash` container stores discarded entities.

When the user empties the trash bin:
1. `EMPTY_TRASH` action is dispatched to `worldStore`.
2. The system empties `containers.trash.entityIds = []`.
3. The trashed entities are deleted from `worldStore.entities`.

### Mascot Empty Trash Confirmation Flow
When the user clicks the "Empty Trash" button on the trash container:
1. The Mascot moves gaze/focus to `trash` (`MASCOT_MOVE`) and shows a speech message asking *"Are you sure you want to empty the trash?"*.
2. The user is presented with **Yes, empty** (`EMPTY_TRASH`) or **Cancel** options.
3. Confirming executes `EMPTY_TRASH` and dismisses the Mascot speech bubble; canceling dismisses the message.

---

## Responsibility

All world changes should pass through an action queue.

Example:

```text
AI
 |
User
 |
System
 |
Action Queue
 |
World Update
```

---

## Example Action

```ts
{
 type:"MOVE_ENTITY",

 entityId:"egg",

 source:"kitchen",

 target:"recipe"
}
```

---

## Benefits

Action queues provide:

* debugging
* replay
* logging
* AI control
* animations
* delayed actions

---

# Action Replay System (`ActionPlayer` & `ActionReplayer`)

## Responsibility

The Action Replay System enables recording, storing, and sequentially replaying discrete `WorldAction` JSON logs in Tortilla World.

It consists of:
1. **Headless Replay Utility (`src/systems/actionPlayer.ts`)**:
   - `ActionPlayer` class / `actionPlayer` singleton.
   - `playLog(actions: WorldAction[], options?: PlaybackOptions)`: Resets world state via `RESET_WORLD` action, then dispatches each action step sequentially to `worldStore.getState().dispatch(action)` with configurable delays.
   - Provides step progress callbacks (`onStep(current, total, action)`), completion callbacks (`onComplete()`), and early cancellation (`stop()`).

2. **React Controls UI (`src/components/Controls/ActionReplayer.tsx`)**:
   - Accepts uploaded `.json` files via `FileReader`.
   - Validates JSON format to ensure an array of valid `WorldAction` objects.
   - Displays live step progress (`Step X / Y`), progress bar, step delay selector, and a Stop button.

---

# Animation System

## Responsibility

The Animation System reacts to world changes.

It does not decide what happens.

Example:

Movement System:

```text
Potato moved to Pan
```

Animation System:

```text
Play potato movement animation
```

---

## Separation

Bad:

```text
Drag component:
move object
animate object
change state
```

Good:

```text
Drag component:
create action


Movement System:
change state


Animation System:
animate change
```

---

# Cooking System

## Responsibility

Future system for transforming entities.

Examples:

```text
Potato
+
Oil
+
Heat

    |
    v

Fried Potato
```

---

The cooking system changes entity state.

Example:

Before:

```ts
{
 type:"ingredient",
 state:"raw"
}
```

After:

```ts
{
 type:"ingredient",
 state:"cooked"
}
```

---

# AI System

## Responsibility

The AI System creates actions.

The AI does not directly manipulate Zustand state.

---

Example:

AI decides:

```text
Prepare tortilla
```

Creates:

```ts
[
 {
  type:"MOVE_ENTITY",
  entityId:"potato",
  target:"pan"
 },

 {
  type:"ADD_HEAT",
  target:"pan"
 }
]
```

The normal systems execute them.

---

# System Communication

Systems communicate through actions and world state.

Example:

```text
Interaction System

        |
        v

Move Action

        |
        v

Movement System

        |
        v

World Store

        |
        v

Animation System

```

---

# Zustand Responsibility

Zustand is the storage layer.

It stores:

* entities
* containers
* relationships
* world state

It should not contain UI logic.

---

Example:

Good:

```ts
moveEntity(
 entityId,
 from,
 to
)
```

Bad:

```ts
onDropIngredient(
 mouseEvent
)
```

---

# Testing Strategy

Systems should be testable without React.

Example:

```ts
moveEntity(
 "potato",
 "kitchen",
 "pan"
)
```

Expected:

```text
Kitchen:
empty

Pan:
potato
```

---

# Future Systems

Possible additions:

## Time System

Controls:

* cooking duration
* day/night
* events

---

## Physics System

Controls:

* collisions
* falling objects
* movement

---

## Economy System

Controls:

* ingredients cost
* customers
* money

---

## Character System

Controls:

* NPCs
* player actions
* behaviours

---

## Mascot System & Recipe System

### Mascot System
Controls:

* `MASCOT_FLIP`: Flips Tortilla mascot in place.
* `MASCOT_MOVE`: Moves gaze/focus of Tortilla to target container.
* `MASCOT_GRAB`: Commands Tortilla to grab ingredient entity from a container.
* `MASCOT_DROP`: Commands Tortilla to drop held ingredient into target container obeying rules.

Dispatch helpers and automated action sequences (e.g. `runFollowRecipeScript`) are located in `src/systems/mascotActions.ts` for AI agent, console, or UI integration.

React components (`Mascot.tsx`) translate pure target container state into physical Framer Motion spring translations across the DOM viewport without touching store logic.

---

### Recipe System & RecipeRunner

The Recipe System executes declarative, step-based recipe state machines via `RecipeRunner` (`src/systems/recipeRunner.ts` / `src/systems/recipeRunner/`).

#### Architecture:
* **Declarative Data**: Recipes (`RecipeStep[]`) define *what* needs to happen (e.g. `move`, `grab`, `drop`, `cut`, `cook`, `mix`, `wait`, `flip`, `speak`, `celebrate`) without referencing specific kitchen containers or locations.
* **Modular Handler Architecture**: `RecipeRunner` delegates step execution to focused step handlers (`src/systems/recipeRunner/handlers/`):
  - `moveHandlers.ts`: Relocation steps (`move`, `grab`, `drop`).
  - `prepHandlers.ts`: Preparation steps (`cut`, `prepare`, `peel`, `wash`, `rinse`, `drain`).
  - `cookHandlers.ts`: Thermal & flip steps (`cook`, `flip`).
  - `mixHandlers.ts`: Combination steps (`mix`, `beat`, `combine`).
  - `utilityHandlers.ts`: Narrative & completion steps (`serve`, `wait`, `instruction`, `speak`, `celebrate`).
* **Workstation & Tool Resolution**: `RecipeRunner` dynamically queries the Workstation engine (`src/engine/workstations.ts`) to determine the required workstation (`pantry`, `washing_station`, `cutting_station`, `preparation_station`, `cooking_station`, `serving_station`) and tools (`knife`, `peeler`, `whisk`, `fork`, `spatula`, etc.) for each step.
* **Generic Execution**: `RecipeRunner` iterates over recipe steps and dispatches appropriate world/mascot actions.
* **Entity Identity Preservation**: Ingredient state mutations (such as preparation: `whole` ➔ `diced` or cooking: `raw` ➔ `fried`) modify the target entity's `state` via `PREPARE_INGREDIENT` or `COOK_INGREDIENT` without creating or destroying entities.

---

### Focus System & Workstation Visibility (`src/systems/focus.ts`)

* **Purpose**: Calculates visual priority classes (`focus-primary`, `focus-secondary`, `focus-background`) during mascot-centered focus transitions.
* **Workstation Container Rule**: Active and related workstations stay in primary or secondary focus. Inactive workstations receive `focus-background` styling (subtle desaturation and border opacity) on their frame containers.
* **Ingredient Entity Rule**: Ingredients and entities sitting inside any workstation or container retain `opacity: 1` and `focus-secondary` priority so they never hide, blur, or lose visibility during focus mode.

---

### Action Recording & Replay System

* **Action Log Integration**: World actions are captured in `recordSlice` when recording mode is active.
* **Store Synchronization**: Loaded action sequences are loaded directly into `worldStore` state via `setRecordedActions`.
* **Controls Reference Recorded Actions**: When recording mode or a loaded recorded session is active, player controls (`Play`, `Pause`, `Step Up`, `Step Down`, stepper dots) reference the sequence of actual `WorldAction` items instead of static recipe steps, stepping through or jumping across logged world state mutations directly.

---

### Recipe Translator System (`src/systems/recipeTranslator.ts`)

* **Purpose**: Converts human-recorded kitchen interactions into executable mascot-guided recipes where Tortilla moves focus, grabs, and places ingredients across containers.
* **Mascot Action Expansion** (`translateHumanActionsToMascotActions`):
  - Injects `MASCOT_MOVE` focus, `MASCOT_GRAB`, and `MASCOT_DROP` steps around raw human `MOVE_ENTITY` actions.
  - Injects `MASCOT_MOVE` focus steps prior to `TOGGLE_BURNER`, `PREPARE_INGREDIENT`, `COOK_INGREDIENT`, and `ADD_ENTITY` actions.
* **Declarative Recipe File Generation** (`translateHumanActionsToRecipe`):
  - Extracts clean entity names and requirements.
  - Generates a valid `Recipe` definition (with `id`, `name`, `requirements`, and `steps`) suitable for export as `.json` or execution via `RecipeRunner`.
* **UI Mode Separation**:
  - `📖 Play Catalog Recipe Mode`: Dedicated to catalog recipe execution (`RecipePlayer.tsx`).
  - `🎥 Action Recorder & Translator Mode`: Dedicated to live action recording, log replaying, human-to-mascot recipe translation (`ActionRecorder.tsx`), tracking used ingredients (`usedIngredients`), and an interactive right-side ingredients catalog panel (`IngredientsSidebar.tsx`).

---

### Recipe Loader & Validation System (`src/systems/recipeLoader.ts`, `src/systems/recipeValidator.ts`)

* **Purpose**: Decouples recipe definitions from TypeScript code files into structured, validated JSON assets (`clasica.json`, `concebolla.json`).
* **Recipe Validator (`recipeValidator.ts`)**:
  - Validates raw JSON structures against `RecipeJSON` schema.
  - Ensures required fields (`id`, `name`, `steps`, `requirements`/`ingredients`) exist and meet data type constraints.
  - Verifies step action types and cross-references inputs and targets against declared recipe requirements.
* **Recipe Loader (`recipeLoader.ts`)**:
  - Ingests JSON recipe assets safely and hydrates them into runtime `Recipe` objects.
  - Provides registry methods (`loadRecipe`, `loadAllRecipes`, `getAvailableRecipeIds`, `getRecipeCooklang`).
* **RecipeRunner Integration**:
  - `RecipeRunner` natively accepts recipe ID strings (e.g. `'clasica'`, `'concebolla'`) or hydrated `Recipe` objects.

---

### Event Store & Replay Engine System (`src/systems/EventStore.ts`, `src/systems/replayEngine.ts`, `src/systems/analytics.ts`)

* **Purpose**: Headless, append-only audit trail and deterministic replay engine for Tortilla World.
* **Event Store Singleton (`EventStore.ts`)**:
  - Central interceptor integrated into `worldStore.ts`'s `dispatch` function.
  - Automatically wraps every `WorldAction` in a immutable `BaseWorldEvent` metadata payload (`id`, `timestamp`, `sequenceNumber`, `version`, `actor`, `action`).
  - Provides headless export/import (`exportJSON`, `importJSON`) and query methods (`getEvents`, `clear`).
* **Deterministic Replay Engine (`replayEngine.ts`)**:
  - Resets the world state and sequentially re-dispatches exported event streams onto `worldStore`.
* **Analytics Utilities (`analytics.ts`)**:
  - Pure headless functions for calculating recipe metrics (`getRecipeMetrics`), filtering audit trails (`getAuditTrail`), and exporting history to CSV (`exportToCSV`).

---

### Ingredient Capability System & AI Grounding Planner (`src/systems/ingredientCapabilities.ts`, `src/systems/geminiCapabilityPlanner.ts`)

* **Purpose**: Grounds AI cooking logic in a structured ingredient capability catalog, preventing action hallucinations (e.g., "peeling salt" or "dicing raw egg") and verifying state prerequisites before actions execute.
* **Architecture & Principles**:
  - **Strict Capability Schema**: Each ingredient (e.g., potato, egg, salt, onion, oil) defines allowed actions, compatible tools, workstations, and required preparation or cooking states (`requires`).
  - **Omission Implies False**: Any action not explicitly defined in an ingredient's capability schema is treated as strictly disallowed.
  - **Validation Engine (`validateIngredientAction`, `validateActionSequence`)**: Checks if an action is allowed for an ingredient in its current state (e.g. requires `peeled` before `slice`, or `boiled` before `peel`) and simulates state evolution across multi-step action sequences.
  - **Gemini AI Planner (`buildCookingAgentSystemInstructions`, `validateAIPlan`)**: Generates grounded system instructions containing the capability catalog JSON for LLMs, and validates AI-generated plans or user intents before execution.

---

# Final Principle

The rule of Tortilla World:

```text
Components show the world.

Systems change the world.

Containers define the rules.

Actions describe intentions.

The Store remembers the result.
```
