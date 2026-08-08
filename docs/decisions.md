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

# Decision: Extract Action Knowledge into a Shared Action Catalog

## Context
Previously, `ingredientCapabilities.ts` mixed two separate concerns:
1. What actions an ingredient supports and its specific state prerequisites.
2. Execution metadata (workstations, tools, timing) for generic actions.

This caused significant duplication across ingredient capability schemas (e.g., repeatedly defining that slicing uses a knife/mandoline at the cutting station).

## Decision
1. **Central Action Catalog (`src/data/catalog/actions.ts`)**: Extracted all generic action execution metadata into `ACTION_CATALOG` (`workstation`, `tools`, `duration`, `requiresHeat`).
2. **Normalized Ingredients (`src/data/catalog/ingredientCapabilities.ts`)**: Updated ingredient definitions so they only define supported actions and ingredient-specific prerequisites (`requires`). Removed all workstation/tool properties from ingredient entries.
3. **Dynamic Engine Resolution (`src/systems/ingredientCapabilities.ts` & `src/engine/workstations.ts`)**: `getIngredientCapability` and `generateCapabilityPromptContext` now merge ingredient capabilities with execution metadata from `ACTION_CATALOG`. `findWorkstationForStep` and `findToolsForStep` query `ACTION_CATALOG` directly via `getActionDefinition`.

## Consequences
- Clean separation of concerns: ingredients describe capability support; actions define execution details.
- Zero metadata duplication when adding new ingredients.
- System engine dynamically resolves workstations and tools without breaking existing recipes or LLM prompt grounding.

---

# Decision: Add Tortilla de Yema as a Core Base Catalog Recipe

## Context
The user requested a new base catalog recipe (`yema`) at the same level as `concebolla`, `clasica`, and `francesa`, utilizing the egg yolk concept (like Tortilla Francesa but with 1 extra egg yolk for richness).

## Decision
1. **JSON Recipe Asset (`src/data/catalog/recipes/yema.json`)**: Defined `yema.json` declaring requirements (6 eggs, 1 extra yolk, 100ml oil, 1 tsp salt), Cooklang recipe string, and step sequence (`prepare` eggs -> `mix` eggs with yolk & salt -> `cook` oil -> `cook` mixture in small pan as "Tortilla de Yema" -> `flip` -> `serve` on plate -> `celebrate`).
2. **Catalog & Loader Registration**: Re-exported `yemaRecipe` in `src/data/catalog/recipes/index.ts` and registered `yema` in `src/systems/recipeLoader.ts` (`recipeRegistry`, `getAvailableRecipeIds`, `loadAllRecipes`).
3. **i18n & Grammar Localizations**: Updated `en.json`, `es.json`, `de.json`, and German grammar dictionary (`de.json`) with localized names, descriptions, hints, and noun forms.
4. **UI Integration**: Added tab & selector icons (`🟡`) in `CookbookView.tsx` and `RecipePlayer.tsx`.
5. **Testing & Completion Verification**: Added integration test `src/systems/yemaCompletion.test.ts` to verify full recipe state execution and container cleanups. Updated `recipeLoader.test.ts` and `recipes.test.ts`.
6. **Documentation**: Updated `player-guide.md`, `systems.md`, and `decisions.md`.

## Consequences
- Tortilla de Yema is fully available across the world store, UI recipe selector, player, cookbook view, and automated recipe runner.
- All 4 base recipes (`concebolla`, `clasica`, `francesa`, `yema`) exist at equal catalog tier.

---

# Decision: Workstation Kits (Base, Profi, Compact) & Session Recording Integration

## Context
Recipes in Tortilla World describe culinary actions without hardcoding physical workstation layouts. To support diverse kitchen physical setups (minimalist kitchens, high-capacity profi setups, standard fallback), Workstation Kits provide reusable container preset configurations. Recorded action logs must capture the active workstation kit to ensure accurate replay.

## Decision
1. **Workstation Kit Catalog (`src/data/catalog/workstations.ts`)**: Defined `WORKSTATION_KITS` containing 3 layout presets:
   - `compact`: Minimalist setup (`board`, `burner1`, `sink`, `trash`, `despensa`).
   - `base`: Standard setup (`board`, `bowl`, `burner1`, `burner2`, `plate`, `sink`, `trash`, `despensa`).
   - `profi`: High-capacity setup (`board`, `board2`, `bowl`, `bowl2`, `burner1`, `burner2`, `burner3`, `plate`, `sink`, `trash`, `despensa`).
2. **World Store Engine Integration**: Added `activeKitId` state (`WorkstationKitId`) and `setWorkstationKit` / `resetWorld(kitId)` methods to `worldStore.ts`. Container authority rules (`containerRules.ts`) dynamically accept and resolve multi-zone kit containers (`burner3`, `board2`, `bowl2`).
3. **Session Recording Metadata**: `stopRecording` saves `workspace: { kitId }` into `SerializedRecipeExport`.
4. **Action Replayer Restoration**: `ActionReplayer.tsx` reads `workspace.kitId` from loaded JSON files or database recipes and sets the corresponding workstation kit during `resetWorld(targetKitId)` prior to playback.
5. **UI Kit Selectors**: Integrated Workstation Kit dropdown selectors into `ActionRecorder.tsx` (Creator View) and `RecipePlayer.tsx` (Player View).

## Consequences
- Recipes remain fully decoupled from physical workstation layouts while enabling users to customize and replay custom workstation environments seamlessly.

---

# Decision: Dynamic Workstation Addition and Removal in Creator Mode

## Context
Creators building custom recipes need the ability to dynamically customize their kitchen layout in Creator Mode by adding new workstations (e.g. additional cutting boards, burners, prep bowls) or removing unneeded workstations. These custom workstations must be serialized into recorded recipe exports and accurately reconstructed during replay.

## Decision
1. **Container Management Actions**:
   - Added `ADD_CONTAINER` and `REMOVE_CONTAINER` actions to `types/actions.ts` and `worldStore.ts`.
   - `addWorkstationContainer(type)` dynamically instantiates containers (`board`, `burner`, `bowl`, `sink`, `plate`, `trash`) with auto-incremented IDs and names.
   - `removeWorkstationContainer(containerId)` removes specified workstation containers while safely evacuating any internal entities to `despensa` (pantry).
2. **Recipe Serialization**:
   - `recordSlice.ts` (`stopRecording`) saves `workspace: { kitId, containers }` containing the complete active `containers` snapshot.
3. **Replay & Reconstruction**:
   - `resetWorld(targetKitId, customContainers)` in `worldStore.ts` accepts custom container definitions.
   - `ActionReplayer.tsx` extracts `workspace.containers` when loading recipe JSON files or database recipes, automatically reconstructing the creator's exact workstation layout.
4. **Creator UI**:
   - `ActionRecorder.tsx` provides an "➕ Add Workstation" selector allowing creators to instantly add cutting boards, burners, bowls, sinks, plates, and trash containers.
   - `ContainerView.tsx` renders a 🗑️ remove button on non-pantry workstation headers.

## Consequences
- Creators have full freedom to build custom kitchen layouts in Creator Mode.
- Recorded recipes preserve custom workstation arrangements for exact replay across sessions.

---

# Decision: Ingredient-Workstation Capability Validation & Mascot Refusal Speech

## Context
Ingredients have allowable verbs/transformations (e.g., salt can be seasoned, dissolved, or mixed; potatoes can be washed, peeled, cut, fried, or boiled). Workstations hold supported action transformations (e.g., sink supports washing/rinsing; cutting board supports cutting/peeling; bowl supports mixing/whisking; burner supports cooking/frying). Placing an ingredient on an incompatible workstation (e.g., dropping salt in the sink) violates culinary domain logic and should be prevented with friendly mascot feedback.

## Decision
1. **Workstation Capability Validation (`validateContainerRules`)**:
   - `getWorkstationSupportedActions(container)` maps workstation containers (`sink`, `board`, `bowl`, `burner`) to supported culinary action verbs. Open storage (`despensa`), trash (`trash`), and serving plates (`plate`) remain unrestricted.
   - `getIngredientVerbs(entity)` retrieves allowed transformation verbs from the ingredient capability catalog (`INGREDIENT_CAPABILITIES_CATALOG`).
   - `validateContainerRules` verifies that at least one allowed ingredient verb overlaps with the target workstation's supported actions. If there is no overlap, the move is rejected with `allowed: false` and a descriptive refusal reason.
2. **Mascot Speech Refusal Feedback**:
   - When `validateContainerRules` rejects a move, `moveEntity` (`containerSlice.ts`) and `mascotDrop` (`mascotSlice.ts`) catch `result.reason` and update Chef Tortilla's `speechMessage` state (e.g., *"¡Oye! Salt has no allowed transformations at Sink!"*).
   - The mascot focuses/gazes at the target workstation and displays a speech bubble for 3.5 seconds before auto-clearing.

## Consequences
- Prevents invalid drag-and-drop placement of ingredients into workstations where they cannot undergo culinary transformations.
- Provides immediate, friendly feedback from Chef Tortilla explaining why the action was rejected.

---

# Decision: Cozy & Mobile-First Workstation Selector Component

## Context
Previous workstation selection and kit preset switching relied on standard, plain HTML `<select>` dropdown menus. On mobile devices, these controls suffered from small tap targets, poor visual context, and clunky touch interaction.

## Decision
1. **Dedicated Workstation Selector Component (`WorkstationSelector.tsx`)**:
   - Replaced plain `<select>` dropdowns with tactile visual cards and rounded pill controls.
   - **Kit Presets**: Large, 44px+ touch-friendly pills with warm ceramic styling for `Standard Kitchen` (🏠) and `Profi Kitchen` (👨‍🍳).
   - **Dynamic Workstation Cards**: Touch-friendly cards for `Tabla` (🪵), `Fuego` (🍳), `Bol` (🥣), `Fregadero` (🚰), `Plato` (🍽️), and `Basura` (🗑️).
   - **Live Count Badges**: Real-time counter badges (e.g. `×2`) showing how many of each workstation container exist in the active world store.
2. **Mobile-First Responsive Layout (`WorkstationSelector.scss`)**:
   - Mobile viewports (< 640px) render a smooth horizontal scroll track with snap alignment and 44px+ touch targets for effortless one-tap workstation additions.

## Consequences
- Provides an intuitive, tactile, cozy user interface for configuring kitchen layouts.
- Delivers an accessible, mobile-first touch experience across all mobile devices, tablets, and desktop displays.

---

# Decision: Interactive Developer Architecture Visualizer & Comprehensive Test Suite

## Context
As Tortilla World evolved with dynamic workstation containers, kit presets, verb/capability validation rules, and mascot refusal speech, visualizing the entity-container mental model in dev mode and maintaining regression coverage became critical.

## Decision
1. **Developer Architecture Visualizer Component (`ArchitectureVisualizer.tsx`)**:
   - Added a dedicated `📐 Architecture` tab in Dev Mode (`Scene.tsx`).
   - **Container & Entity Topology**: Renders real-time node cards for every active workstation container in the Zustand store, displaying current entity items, capacity limits, and supported culinary verbs.
   - **Action Execution Pipeline**: Provides an interactive 5-step flowchart illustrating how user inputs (dnd-kit/RecipeRunner) flow through the Validation Engine (`containerRules.ts`), Store Dispatchers, Zustand/Immer state storage, and Framer Motion reactive views.
   - **AGENTS.md Core Rules Checklist**: Live inspection checklist verifying compliance with the 6 foundational simulation rules (business logic outside components, Zustand as world state, entity identity preservation, container rule enforcement, ordered container lists, and ingredient uniqueness).
2. **Expanded Vitest Test Coverage**:
   - Added `src/engine/containerRules.test.ts` covering workstation supported actions, catalog capability extraction, mixture verbs, and duplicate ingredient/capacity validation.
   - Added `src/components/Controls/WorkstationSelector.test.tsx` covering kit preset switching (`base` / `profi`), dynamic workstation addition (`ADD_CONTAINER`), and evacuation of container entities to pantry on removal (`REMOVE_CONTAINER`).

## Consequences
- Developers can inspect live simulation topology, store state, and execution pipelines directly inside dev mode.
- Ensured 100% test pass rate across 37 test files and 230+ unit/integration tests.

---

# Decision: Workstation Preset Layouts Update (Empty Kit) & Record Mode Ingredient Controls

## Context
User requested replacing the "Profi" kitchen preset kit with an "Empty" kit layout, making workstation menus visible in Record mode, ensuring active workstations change dynamically when changing recipes, allowing choosing and removing ingredients in Record mode as before, and adding a confirmation dialog before resetting the world.

## Decision
1. **Empty Kitchen Preset Kit (`empty`)**:
   - Updated `WorkstationKitId` type in `src/types/workstations.ts` to replace `'profi'` with `'empty'`.
   - Replaced `profi` in `src/data/catalog/workstations.ts` with `empty`, providing a minimal starting canvas (`despensa`, `plate`, `trash`).
   - Updated `WorkstationSelector.tsx` and unit tests (`WorkstationSelector.test.tsx`) to support `empty` preset selection.
2. **Record Mode Ingredient Management**:
   - Enhanced `IngredientsSidebar.tsx` to explicitly indicate whether each ingredient exists in the kitchen store (`entitiesInStore`).
   - Added explicit `➕ Add` (to add ingredient to despensa via `ADD_ENTITY`), `🖐️ Take` (to take into mascot hand via `MASCOT_GRAB`), and `❌ Remove` (to remove ingredient via `REMOVE_ENTITY`) actions.
   - In Record mode, adding and removing ingredients emits standard store dispatches, seamlessly logging changes to the recorded recipe timeline.
3. **Reset World Confirmation Modal**:
   - Added an interactive confirmation modal in `RecipePlayer.tsx` before triggering `resetWorld()`.
   - Asks the player "Are you sure you want to reset the kitchen world?" to prevent accidental data loss.

## Consequences
- Players have full control to build custom workstation layouts starting from an empty slate (`empty`).
- Ingredient selection and removal during recipe recording is intuitive and fully recorded.
- World resets require explicit user confirmation.

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
