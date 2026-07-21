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

# Final Principle

The rule of Tortilla World:

```text
Components show the world.

Systems change the world.

Containers define the rules.

Actions describe intentions.

The Store remembers the result.
```
