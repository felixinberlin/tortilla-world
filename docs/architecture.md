# Architecture

## Overview

Tortilla World is a simulation-driven React application.

The application is not designed as a collection of UI components with local state.
Instead, it models a small interactive world where entities exist, move, interact, and change state through controlled systems.

The architecture is based on four main concepts:

```text
              User / AI
                  |
                  v
          Interaction System
                  |
                  v
          Action Validation
                  |
                  v
             World Store
                  |
                  v
       Entities and Containers
```

---

# Core Concepts

## Entities

Entities are all objects that exist in the world.

Examples:

* ingredients
* tools
* containers
* characters
* machines

An entity has:

* identity
* type
* properties
* optional state

Example:

```ts
{
  id: "potato",
  type: "ingredient"
}
```

Entities do not control their own behaviour.

They are controlled by systems.

---

# Workstations

Workstations represent *where actions can be performed* in the kitchen simulation:

* **Pantry (`pantry`)**: Store ingredients (`despensa`).
* **Washing Station (`washing_station`)**: Clean ingredients (`sink`).
* **Cutting Station (`cutting_station`)**: Preparation (`board`, `knife`, `peeler`).
* **Preparation Station (`preparation_station`)**: Mix & combine (`bowl`, `whisk`, `fork`).
* **Cooking Station (`cooking_station`)**: Apply heat (`pan`, `spatula`).
* **Serving Station (`serving_station`)**: Plate and serve (`plate`).

---

# Containers

Containers are entities that own other entities.

Examples:

* Kitchen
* Pantry
* Recipe
* Pan
* Plate

A container defines:

* what it can contain
* ordering
* uniqueness rules
* transfer behaviour

Example:

```text
Kitchen
 ├── Potato
 ├── Onion
 ├── Knife
 └── Pan
```

A container is not a simple array.

It is a world object with rules.

---

# Ownership Model

Every movable entity has an owner.

Example:

Initial:

```text
Kitchen
 ├── Potato
 ├── Egg


Pan
 └── Oil
```

After moving potato:

```text
Kitchen
 └── Egg


Pan
 ├── Oil
 └── Potato
```

The potato entity remains the same.

Only the relationship changes:

```text
Before:

Kitchen owns Potato


After:

Pan owns Potato
```

---

# State Management

The world state is stored centrally.

Current technology:

* React
* Zustand

The store represents the complete world.

Example:

```ts
interface WorldState {

 entities:
   Record<string, Entity>

 containers:
   Record<string, Container>

 actions:
   WorldActions

}
```

---

# Data Flow

## User interaction

Example:

User drags potato into pan.

Flow:

```text
Drag Event
    |
    v
D&D Layer
    |
    v
Interaction System
    |
    v
Move Action
    |
    v
Container Validation
    |
    v
World Store Update
    |
    v
React Render
```

---

# Drag and Drop Architecture

Drag and drop is only an input method.

It does not contain business rules.

The DnD system provides:

```ts
{
 entityId:"potato",
 targetContainer:"pan"
}
```

The Interaction System decides:

* is the move allowed?
* what transfer rule applies?
* what state changes happen?

---

# Systems

Systems contain world behaviour.

Examples:

## Movement System

Responsible for:

* moving entities
* validating ownership
* applying transfer rules

---

## Interaction System

Responsible for:

* converting user input into actions
* handling clicks
* handling drag operations

---

## Cooking System

Future system.

Responsible for:

* combining ingredients
* changing states
* producing results

Example:

```text
Potato + Egg + Onion

       |
       v

Tortilla
```

---

## AI System

Future system.

Responsible for:

* generating actions
* planning
* interacting with the world

AI does not modify state directly.

Example:

```ts
{
 type:"MOVE_ENTITY",
 entity:"egg",
 destination:"recipe"
}
```

---

# Actions

All world changes happen through actions.

Example:

```ts
{
 type:"MOVE_ENTITY",

 entityId:"potato",

 source:"kitchen",

 target:"pan"
}
```

Actions provide:

* traceability
* debugging
* replay
* AI compatibility

---

# Containers and Transfer Rules

Moving an entity is not a simple remove/add operation.

The process is:

```text
Move Request

      |
      v

Check source container

      |
      v

Check destination container

      |
      v

Apply transfer rules

      |
      v

Update ownership

      |
      v

Update world state
```

---

# Rendering Architecture

React components display world state.

They do not own world logic.

Example:

```text
World Store

    |
    v

Scene Component

    |
    +---- Container Component
    |
    +---- Entity Component
```

---

# Component Responsibilities

## Entity Component

Responsible for:

* rendering an entity
* animations
* visual state

Does not:

* move itself
* validate actions

---

## Container Component

Responsible for:

* rendering contents
* layout
* accepting interactions

Does not:

* decide business rules

---

# Future Architecture

The architecture is designed to support:

## More containers

Examples:

* fridge
* cupboard
* oven
* table
* customer tray

---

## More entities

Examples:

* characters
* animals
* machines
* recipes

---

## More systems

Examples:

* physics
* time
* cooking
* economy
* AI planning

---

# Design Principles

## 1. Data before UI

The world model exists independently of React.

---

## 2. Rules before actions

Every action must be validated.

---

## 3. Entities keep identity

Movement changes ownership, not objects.

---

## 4. Containers own behaviour

Rules belong to locations, not items.

---

## 5. Systems change the world

Components only represent the world.

---

# Final Architecture Diagram

```text

                 User
                  |
                  |
                  v

          React Interaction Layer
                  |
                  |
                  v

          Interaction System
                  |
                  |
                  v

             Action Queue
                  |
                  |
                  v

          World Simulation
                  |
        +---------+---------+
        |                   |
        v                   v

    Containers          Entities

        |
        |
        v

     Zustand Store

        |
        |
        v

      React UI

```

Tortilla World is therefore structured as a small simulation engine with a React interface, rather than a traditional CRUD application.
