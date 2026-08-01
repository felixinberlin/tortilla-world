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

* mouse clicks
* drag and drop
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

The container checks uniqueness.

Example:

Valid:

```text
Recipe

potato
egg
```

Invalid:

```text
Recipe

potato
potato
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

# Action Queue

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

The Recipe System executes declarative, step-based recipe state machines via `RecipeRunner` (`src/systems/recipeRunner.ts`).

#### Architecture:
* **Declarative Data**: Recipes (`RecipeStep[]`) define *what* needs to happen (e.g. `move`, `grab`, `drop`, `cut`, `cook`, `mix`, `wait`, `flip`, `speak`, `celebrate`) without referencing specific kitchen containers or locations.
* **Workstation & Tool Resolution**: `RecipeRunner` dynamically queries the Workstation engine (`src/engine/workstations.ts`) to determine the required workstation (`pantry`, `washing_station`, `cutting_station`, `preparation_station`, `cooking_station`, `serving_station`) and tools (`knife`, `peeler`, `whisk`, `fork`, `spatula`, etc.) for each step.
* **Generic Execution**: `RecipeRunner` iterates over recipe steps and dispatches appropriate world/mascot actions.
* **Entity Identity Preservation**: Ingredient state mutations (such as preparation: `whole` ➔ `diced` or cooking: `raw` ➔ `fried`) modify the target entity's `state` via `PREPARE_INGREDIENT` or `COOK_INGREDIENT` without creating or destroying entities.

---

# Decision: Refactor Ingredient Usage Actions into Domain Events

## Context
Previously, `CONSUME_INGREDIENT` was dispatched directly as a user action. This mixed user intent, recipe execution logic, and entity lifecycle mutation.

## Decision
Separated player intentions from world state consequences:
1. **User Intent Action (`USE_INGREDIENT`)**: High-level action dispatched when an ingredient is used (`{ entityId, usedIn }`).
2. **Domain Event (`INGREDIENT_CONSUMED`)**: Reactive domain event emitted when an ingredient is consumed (`{ entityId, consumedBy }`).

## Flow
```text
User Interaction / RecipeRunner
           |
           v
    USE_INGREDIENT (Action)
           |
           v
    Ingredient System / World Store
    +--> Transfer entity to container / recipe
    +--> Set consumed state (consumed: true, consumedBy)
    +--> Emit INGREDIENT_CONSUMED (Domain Event)
```

## Consequences
- Clean separation between user intent and domain event consequences.
- Allows ingredient undo/reversion (`revertIngredientUsage`).
- Decouples UI / RecipeRunner from direct lifecycle state mutation.

---

# Decision: Headless Action Log Replay System

## Context
In Tortilla World, all world modifications are driven by pure `WorldAction` dispatches through `worldStore`. Actions are logged in real-time during user interaction, mascot execution, or recipe playback. Replaying recorded JSON action logs allows deterministic state reconstruction, automated testing, and session playback.

## Decision
Created a headless replay engine (`ActionPlayer` in `src/systems/actionPlayer.ts`) and a React upload control (`ActionReplayer` in `src/components/Controls/ActionReplayer.tsx`).

Key rules:
1. **World State Reset**: Replay resets the simulation to initial default state (`RESET_WORLD`) before executing actions.
2. **Sequential Execution**: Actions are dispatched sequentially via `worldStore.getState().dispatch(action)` with a configurable delay.
3. **No Direct DOM Manipulation**: Animations and component positioning react naturally to Zustand store state updates.
4. **Progress and Control**: Callbacks allow monitoring progress (`onStep`) and stopping playback early (`stop()`).

---

# Decision: Headless EventStore & Append-Only Audit Trail

## Context
While `worldStore` manages real-time mutable simulation state, debugging, analytics, and deterministic replays require an immutable, sequential audit trail of all world events.

## Decision
Created a central, singleton `EventStore` (`src/systems/EventStore.ts`) wired directly into `worldStore.ts`'s `dispatch` function:
1. **Automatic Event Wrapping**: Every dispatched `WorldAction` is automatically wrapped in an immutable `BaseWorldEvent` (`id`, `timestamp`, `sequenceNumber`, `version`, `actor`, `action`).
2. **Actor Resolution**: Automatically infers actor context (`player`, `mascot`, or `system`).
3. **Headless Serialization**: Provides `exportJSON()`, `importJSON()`, and `clear()` for event stream persistence and hydration.
4. **Deterministic Replay Engine (`replayEngine.ts`)**: Resets world state and re-dispatches exported event streams sequentially.
5. **Analytics Reporting (`analytics.ts`)**: Provides pure helper functions (`getRecipeMetrics`, `getAuditTrail`, `exportToCSV`).

---

# Decision: Action Recorder Multi-Format Exporter & Event Integration

## Context
Users and developers need to inspect, translate, and download captured session actions in multiple structured formats (Mascot movement script, declarative recipe definition, or full state/event session log).

## Decision
Updated `ActionRecorder.tsx` to automatically source actions from `EventStore` when present and expose 3 distinct export formats:
1. **🤖 Format 1: Mascot Action Sequence**: Explicit interleaved mascot focus, grab, move, and drop actions generated by `translateHumanActionsToMascotActions`.
2. **📜 Format 2: Declarative Recipe File**: Abstract step definitions (`move`, `prep`, `cook`, `mix`) produced by `translateHumanActionsToRecipe`.
3. **💾 Format 3: Full Session Log**: Complete snapshot containing `zustandInit` (initial store state before recording), `actions`, `events` (EventStore audit trail), and `zustandEnd` (final store state).

All 3 formats are previewable in UI tabs and downloadable as formatted `.json` files.

---

# Decision: State-Aware Ingredient Uniqueness & Mascot Empty Trash Confirmation

## Context
1. **Container Duplicate Checking**: Previously, container uniqueness checked `ingredientId` or base entity ID. This caused containers (including `trash`) to reject valid non-identical items (e.g. a raw lemon and a peeled lemon) because they shared the same base ingredient ID (`lemon`).
2. **Trash Disposal**: A way to clear discarded entities from the world was required (`EMPTY_TRASH` action).
3. **Mascot Interaction**: Accidental trash clearing should be prevented by asking the Mascot "Are you sure you want to empty the trash?" before executing the deletion.

## Decision
1. **State-Aware Catalog ID Matching (`getIngredientCatalogId`)**: `getIngredientCatalogId` now appends preparation and cooking state metadata (`baseId:preparation:cooking`). Thus, `lemon` (raw) and `lemon:peeled` are recognized as distinct catalog items. Two raw lemons are rejected as duplicates, whereas a raw lemon AND a peeled lemon are allowed.
2. **`EMPTY_TRASH` Action**: Dispatches an `EMPTY_TRASH` action that clears `containers.trash.entityIds` and purges the associated trashed entities from `worldStore.entities`.
3. **Mascot Confirmation Dialog**: Clicking "Empty Trash" moves the Mascot focus (`MASCOT_MOVE`) to the trash container and displays a prompt bubble asking *"Are you sure you want to empty the trash?"*. Selecting **Yes, empty** triggers `EMPTY_TRASH`, while **Cancel** dismisses the prompt.

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
