# Architectural Decisions

This document records the important architectural decisions made during the development of Tortilla World.

The goal is to keep the world model predictable, extensible, and suitable for future systems such as AI-controlled actions, cooking processes, animations, and simulations.

---

# Decision: Use Entities and Containers as the World Model

## Context

The initial concept used "lists" to represent groups of objects:

* pantry list
* recipe list
* fire list

This worked for simple drag and drop, but became insufficient when objects started having different behaviours.

Requirements:

* objects need ownership
* objects need movement between locations
* some collections allow changes
* some collections represent predefined world content
* some objects can exist multiple times
* some objects must be unique

A simple list cannot express these rules.

---

## Decision

Replace the concept of **Lists** with **Containers**.

A Container is a first-class world entity that:

* owns other entities
* defines what it can contain
* validates actions
* preserves ordering
* controls movement rules

The world is modelled as:

```
Entities
   |
   v
Containers
```

---

## Consequences

Positive:

* clear ownership model
* easier drag and drop logic
* easier AI action validation
* supports future gameplay systems
* containers can have different behaviours

Negative:

* more complex than arrays
* requires validation before actions
* requires explicit ownership handling

---

# Decision: Entities Are Never Duplicated During Movement

## Context

A drag and drop action can visually look like moving an object.

The implementation must decide whether the object itself changes or whether a copy is created.

---

## Decision

Entities keep their identity.

A move changes ownership.

Example:

Before:

```
Kitchen
 └── potato


Pan
```

After:

```
Kitchen


Pan
 └── potato
```

The potato entity is the same entity.

---

## Consequences

Benefits:

* animations can track objects
* AI can reference objects by ID
* history and debugging become easier
* no duplicated world state

---

# Decision: Containers Own Rules, Not Entities

## Context

An ingredient does not know where it can exist.

A potato can exist in:

* kitchen
* recipe
* pan
* plate
* trash

Each location has different rules.

---

## Decision

Rules belong to containers.

Example:

```
Potato
 |
 +-- Kitchen: allowed
 |
 +-- Recipe: allowed
 |
 +-- Trash: allowed
 |
 +-- Knife: forbidden
```

The container decides.

---

## Consequences

New containers can be added without modifying every entity.

Example:

Adding:

```
Fridge
```

only requires defining fridge rules.

Ingredients do not change.

---

# Decision: Container Contents Are Ordered

## Context

A programming Set solves uniqueness, but loses order.

The world requires:

* visual ordering
* animations
* predictable rendering
* drag and drop positions

---

## Decision

Containers use ordered collections.

Example:

```ts
[
 "potato",
 "egg",
 "onion"
]
```

Ordering is part of the world state.

---

## Consequences

Uniqueness is handled separately from ordering.

The system validates whether an item can be inserted.

---

# Decision: Ingredient Uniqueness Is Enforced Per Container

## Context

Cooking containers should not contain duplicate ingredients.

Example:

Invalid:

```
Recipe
 ├ potato
 └ potato
```

However, duplicate tools are valid.

Example:

Valid:

```
Kitchen
 ├ pan-001
 └ pan-002
```

---

## Decision

Uniqueness rules depend on entity type.

Default rules:

Ingredients:

```
unique inside container
```

Tools:

```
duplicates allowed
```

---

## Consequences

The model supports realistic kitchens.

A kitchen can have:

* many pans
* many knives
* one potato entry

---

# Decision: Moving Between Containers Uses Transfer Rules

## Context

Not every move behaves the same.

Examples:

Kitchen → Recipe:

* ingredient remains in kitchen inventory conceptually
* recipe receives a reference/copy

Recipe → Pan:

* recipe loses ingredient
* pan receives ingredient

---

## Decision

Movement is not a simple array operation.

Every move goes through a transfer system:

```
Request Move
      |
      v
Validate source
      |
      v
Validate destination
      |
      v
Apply transfer rule
      |
      v
Update ownership
```

---

# Decision: Immutable and Mutable Containers

## Context

Some containers represent world definitions.

Example:

Kitchen starting ingredients.

Others represent changing gameplay state.

Example:

Recipe.

---

## Decision

Containers have ownership behaviour.

## Static Containers

Represent predefined world resources.

Examples:

* kitchen inventory
* starting objects

They can provide items without necessarily losing the original definition.

---

## Dynamic Containers

Represent changing state.

Examples:

* recipe
* pan
* plate

They gain and lose ownership.

---

# Decision: Systems Modify State, Components Display State

## Context

React components should not contain world logic.

A drag component should not decide:

* if a move is valid
* if duplicates are allowed
* if an item disappears

---

## Decision

Components display the world.

Systems modify the world.

Example:

```
Drag Component
       |
       v
Interaction System
       |
       v
Container Rules
       |
       v
World Store
```

---

# Decision: AI Uses Actions, Not Direct State Modification

## Context

Future AI behaviour requires predictable actions.

The AI should not directly modify Zustand state.

---

## Decision

AI produces actions.

Example:

```ts
{
 type:"MOVE_ENTITY",
 entity:"potato",
 from:"kitchen",
 to:"pan"
}
```

The world validates and executes the action.

---

## Consequences

Benefits:

* AI cannot break world rules
* actions can be logged
* actions can be replayed
* debugging becomes easier

---

# Decision: Step-Based Recipe State Machine via RecipeRunner

## Context

Hardcoded recipe scripts (e.g. `runFollowRecipeScript`) directly encoded container move logic in code.
As recipes expand to include cutting, peeling, beating eggs, mixing, frying, and animations, hardcoding each recipe script leads to duplication and tight coupling.

---

## Decision

1. Recipes are declarative data structures containing a `steps: RecipeStep[]` array.
2. A generic `RecipeRunner` system (`src/systems/recipeRunner.ts`) executes recipe step arrays sequentially by dispatching world and mascot actions.
3. Ingredient identity is strictly preserved during state transformations (e.g. preparation: `whole` ➔ `diced`, cooking: `raw` ➔ `fried`). Entity state is updated via `PREPARE_INGREDIENT` or `COOK_INGREDIENT` without creating or destroying entities.

---

## Consequences

Benefits:

* Adding new recipes requires adding data definitions only, with zero imperative logic code.
* `RecipeRunner` handles generic kitchen actions (`move`, `grab`, `drop`, `cut`, `cook`, `mix`, `wait`, `flip`, `speak`, `celebrate`) and can easily be extended with new action handlers.
* World state remains predictable and fully loggable in the Action Log and Redux DevTools.

1. The world contains entities.
2. Containers own entities.
3. Containers enforce rules.
4. Movement changes ownership, not identity.
5. Contents are ordered.
6. Ingredients are unique per container.
7. Tools may have duplicates.
8. Systems modify state.
9. AI produces validated actions.

This creates a foundation for a simulation-style cooking world rather than a simple drag-and-drop application.

---

# Decision: Container Rules Are Enforced Inside the Store, Not the Caller

## Context

`engine/containerRules.ts` implemented `validateContainerRules`, but nothing
called it. `worldStore`'s `MOVE_ENTITY` and `ADD_ENTITY` handlers mutated
containers directly, so capacity, allowed-type, and uniqueness rules existed
on paper only.

---

## Decision

Validation happens inside `worldStore`'s `dispatch`, immediately before a
container's contents are mutated — not in `systems/movement.ts` or any other
caller.

```
dispatch(MOVE_ENTITY)
      |
      v
worldStore reducer
      |
      v
validateContainerRules(targetContainer, entity, currentEntities)
      |
  not allowed -> no-op, state unchanged
      |
  allowed -> ownership updated
```

Reordering within the same container skips validation — an entity already
inside a container isn't a new arrival, so capacity/uniqueness checks don't
apply, and (for `uniqueTypesOnly`) would otherwise trip on the entity
comparing against itself.

---

## Consequences

Benefits:

* `dispatch` is the single gate every caller goes through — systems, tests,
  and the future AI system all get the same rules, with no way to bypass
  them by calling a system function instead of another.
* Rules live where the docs say they should: on the container, not the
  caller.

Trade-off:

* An invalid move currently fails silently (state just doesn't change).
  Surfacing *why* a move was rejected — for UI feedback, not just debug
  logs — is not yet implemented.

---

# Decision: An In-Memory Action Log Implements the Action Queue

## Context

`docs/systems.md` and the roadmap describe an Action Queue for traceability,
debugging, replay, and future AI compatibility, but no such log existed.

---

## Decision

`worldStore` is wrapped with two Zustand middlewares:

* `devtools` — every `dispatch` call is visible, named, and diffable in
  Redux DevTools.
* `actionLog` (`src/store/middleware/actionLog.ts`) — a small custom
  middleware that appends `{ action, timestamp }` to an in-memory,
  size-capped array whenever a `set` call is labelled with an action name
  (the same convention `devtools` uses: `set(next, false, 'MOVE_ENTITY')`).
  Read via `getActionLog()`.

---

## Consequences

Benefits:

* Fulfils the "traceability, debugging, replay" requirement without a new
  dependency or a change to the `WorldAction` shape.
* The same labelling convention is what the future AI system
  (`docs/roadmap.md` Phase 5) will read from to reason about what happened.

Trade-off:

* The log is in-memory only — it resets on reload. Persistence (if ever
  needed for real replay) is a separate, not-yet-made decision.
