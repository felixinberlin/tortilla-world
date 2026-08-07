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

# Decision: Workstation Navigation Controls (◀ ▶) & Mobile Touch Drag-and-Drop Fix

## Context
1. **Mobile Drag-and-Drop Issue**: On touch/mobile screens, dragging ingredients failed because default `PointerSensor` captured touch gestures without distance/delay constraints or `touch-action: none` rules, causing browser touch scrolling to cancel drag events (`pointercancel`).
2. **Workstation Step Navigation Request**: Users requested quick `◀` (previous) and `▶` (next) navigation buttons on each ingredient inside a workstation to shift items sequentially along the kitchen workflow.

## Decision
1. **Multi-Sensor dnd-kit Configuration**: Configured `TouchSensor` (delay: 100ms, tolerance: 5px) alongside `PointerSensor` (distance: 5px) and `MouseSensor` (distance: 5px) in `useSceneDragAndDrop.ts`. Added `touch-action: none` to `.entity-view` elements to prevent mobile touch-scroll conflicts.
2. **Workstation Navigation Controls (`entity-nav-buttons`)**: Added `◀` and `▶` buttons to `DefaultEntityRenderer` for any ingredient residing inside a workstation container. Clicking `◀` dispatches `MOVE_ENTITY` to the preceding workstation, while `▶` shifts it to the next workstation in sequence. Buttons are styled cleanly with `touch-action: manipulation` for instant mobile response.

---

# Decision: Cooking Workstation Heat Requirement & Enhanced Inputs UI

## Context
1. **Workstation Heat Requirement**: Executing the cook action requires the cooking workstation (e.g. pan/burner) to be ON (heat active).
2. **Dish Name Input Empty State**: When cooking/naming a dish, the custom name input was previously blank, causing confusion when the mascot or player cooked a dish without a pre-filled name.
3. **Cooking Target Input Clarity & Size**: The target input (`Objetivo`) was squeezed, small, and lacked clear group labels.

## Decision
1. **Workstation Heat Enforcement**: Updated `COOK_CONTAINER_CONTENTS` and `COOK_INGREDIENT` in `worldStore.ts` to automatically turn heat ON (`isOn = true`) if the target cooking workstation is off. Updated the `ContainerView` Cook button to also activate burner heat when clicked.
2. **Auto-Prefilled Dish Name**: `cookedCustomName` in `ContainerView` now dynamically falls back to `activeRecipeName` (e.g., "Tortilla Española Clásica"), ensuring the name input is never empty.
3. **Spacious & Labeled Input UI**: Added explicit section labels (`🎯 Objetivo / Tiempo de cocción:` and `🍳 Nombre del plato:`) and enlarged input padding, font sizing, and row spacing (`container-view__input--lg`) in `World.scss`.

---

# Decision: ContainerRules Simplification & RecipeRunner Test Stabilization

## Context
1. **ContainerRules Simplification**: `ContainerRules` contained unused/future properties (`uniqueTypesOnly` and `customValidator`) that added complexity without active enforcement in gameplay or engine logic.
2. **Declarative Recipe Test Reliability**: RecipeRunner unit and mascot integration tests previously contained hardcoded ingredient count expectations and static assumptions about container items.

## Decision
1. **Pruned ContainerRules**: Removed `uniqueTypesOnly` and `customValidator` from `ContainerRules` in `src/types/world.ts` and pruned corresponding checks in `validateContainerRules` in `src/engine/containerRules.ts`.
2. **Dynamic Declarative Test Assertions**: Refactored `recipeRunner.test.ts` and `mascotActions.test.ts` to dynamically inspect active recipe steps (e.g., target containers in `serve` steps) and requirements (`getRecipeRequirementsArray`), ensuring tests adapt reliably when recipes or ingredients evolve without relying on hardcoded lengths.

---

# Decision: Direct Drag-to-Mascot Carrying & Dual-Arm Capacity

## Context
1. **Direct Dragging onto Mascot**: Users requested the ability to drag ingredients directly onto Chef Tortilla to have her catch and carry them in her free arms.
2. **Dual-Arm Carrying & Limit**: Tortilla has two physical arms in her SVG/component representation and can hold up to 2 items simultaneously. Attempts to give her a 3rd item should be gracefully blocked with visual/speech feedback.

## Decision
1. **`useDroppable` on Mascot**: Attached `useDroppable({ id: mascotId })` to `Mascot.tsx` so dnd-kit registers Tortilla (`chef`) as a droppable target across the viewport.
2. **`MOVE_ENTITY` & `MASCOT_GRAB` Integration**: Updated `useSceneDragAndDrop.ts` and `containerSlice.ts` so dropping/moving an entity to target `chef`/`tortilla`/`mascot` dispatches `MASCOT_GRAB`.
3. **Dual-Arm Carrying State**: `mascotSlice.ts` maintains `holdingEntityIds` (array of up to 2 items). When `holdingEntityIds.length < 2`, Tortilla catches the ingredient. When `holdingEntityIds.length >= 2`, her hands are full, triggering a speech bubble alert ("¡Mis manos están llenas! 🤲 / My hands are full!").
5. **"Take me" (Llévame) Button on Workstation Ingredients**: Added a dedicated `🤲 Llévame / Take me` button to `DefaultEntityRenderer` in `EntityView.tsx` for ingredients located inside workstations. Clicking this button dispatches `MASCOT_GRAB` with `sourceContainerId`, allowing Tortilla to carry the ingredient directly without dragging.

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
