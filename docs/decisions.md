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

# Summary

The core architecture decisions are:

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
