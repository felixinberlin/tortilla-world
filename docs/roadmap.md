# Tortilla World Roadmap

## Vision

Tortilla World is an interactive cooking simulation built around a living world model.

The goal is not only to create a recipe application, but to create a small simulated environment where:

* objects exist as entities
* containers define relationships
* actions modify the world
* characters and AI can interact with the environment

The long-term vision is a "living kitchen" where the user can interact with objects naturally and where autonomous agents can understand and manipulate the world.

---

# Current Status

## Phase: World Foundation

Status:

🟡 In development

Current focus:

* stable world model
* entity system
* container system
* drag and drop interactions
* predictable state management

Completed foundations:

✅ React + TypeScript application
✅ Zustand world store
✅ Entity-based architecture
✅ Container concept
✅ Drag and drop foundation
✅ Ingredient data model
✅ Documentation structure

---

# Roadmap Overview

```text
Foundation
    |
    v
World Interaction
    |
    v
Cooking Simulation
    |
    v
Living Kitchen
    |
    v
AI Assisted World
```

---

# Phase 1 — World Foundation

## Goal

Create a reliable simulation core.

## Features

### Entity System

Implement:

* ingredients
* tools
* containers
* entity identity

Example:

```text
Potato
Knife
Pan
Kitchen
```

---

### Container System

Implement:

* ownership
* ordered contents
* container rules
* validation

Examples:

```text
Kitchen
Recipe
Pan
Plate
```

---

### Movement System

Implement:

* moving entities
* validating moves
* transfer rules
* ownership changes

Example:

```text
Kitchen

 potato

    |
    v

Pan

 potato
```

---

# Phase 2 — Interaction Layer

## Goal

Make the world feel alive.

## Features

### Improved Drag and Drop

Support:

* visual feedback
* invalid drop states
* animations
* multi-container interactions

---

### Entity Animations

Entities should:

* move naturally
* react to interactions
* have visual states

Examples:

* potato jumps into pan
* knife moves to cutting board
* ingredients combine

---

### Action System

Introduce:

```ts
Action
{
 type
 payload
 timestamp
}
```

Benefits:

* replay
* debugging
* AI compatibility

---

# Phase 3 — Cooking Simulation

## Goal

Create actual cooking behaviour.

## Features

## Recipe System

Support:

* recipes
* ingredient requirements
* preparation steps

Example:

```text
Potato
Egg
Onion

    +
    
Cooking

    =

Tortilla
```

---

## Cooking States

Entities gain states:

Example:

```text
Potato

raw
 |
 v
cut
 |
 v
fried
```

---

## Tools Become Functional

Examples:

Knife:

```text
ingredient
      |
      v
cut ingredient
```

Pan:

```text
ingredient
      |
      v
cook ingredient
```

---

# Phase 4 — Living Kitchen

## Goal

Create a world that behaves independently.

## Features

### Characters

Introduce:

* player character
* helpers
* customers
* NPCs

---

### Time System

Add:

* cooking duration
* events
* schedules

Example:

```text
Egg on pan

0s
 |
30s
 |
Cooked
```

---

### Environment

Add:

* fridge
* cupboards
* tables
* oven
* restaurant area

---

# Phase 5 — AI Kitchen Assistant

## Goal

Allow AI agents to understand and interact with the world.

The AI does not directly change state.

The AI creates actions.

Example:

```json
{
"type":"MOVE_ENTITY",
"entity":"egg",
"target":"pan"
}
```

The world validates and executes the action.

---

## AI Features

Possible future capabilities:

* recipe planning
* cooking assistance
* autonomous helpers
* explanations
* suggestions
* learning user preferences

---

# Phase 6 — Multiplayer / Shared World (Future)

Possible future direction:

* shared kitchens
* collaborative cooking
* synchronized worlds
* multiple AI agents

---

# Development Principles

## Keep the World Model Independent

The simulation should not depend on React.

---

## Prefer Systems Over Component Logic

Components display.

Systems decide.

---

## Preserve Entity Identity

Objects are moved, not recreated.

---

## Document Decisions

Important architecture changes should be recorded in:

```text
docs/decisions.md
```

---

# Current Priority

The immediate goal is:

> Build a stable interactive kitchen world where every object follows predictable rules.

Everything else depends on this foundation.
