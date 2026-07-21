# AGENTS.md

## Tortilla World — AI Coding Agent Guide

Welcome to Tortilla World.

This file explains the project context, architecture rules, development environment, and expectations for AI coding agents.

Before changing code:

1. Read this file completely.
2. Understand the entity/container architecture.
3. Check related documentation.
4. Make the smallest correct change.
5. Keep the simulation model consistent.

---

# Project Overview

Tortilla World is an interactive cooking simulation built with:

* React
* TypeScript
* Vite
* Zustand
* dnd-kit
* Framer Motion

It is not a traditional CRUD application.

The application models a small living world.

Objects exist as entities.

Entities are placed inside containers.

Systems modify the world.

---

# Core Mental Model

The most important concept:

```
Entities exist in Containers.

Systems create Actions.

Actions modify the World State.
```

Example:

```
Kitchen

 ├── Potato
 ├── Egg
 ├── Knife
 └── Pan


User action:

Move Potato to Pan


Result:

Kitchen

 ├── Egg
 ├── Knife
 └── Pan


Pan

 └── Potato
```

The potato is not recreated.

Ownership changes.

---

# Important Terminology

## Entity

Anything that exists in the world.

Examples:

* ingredient
* tool
* container
* character
* machine

---

## Container

A world object that owns entities.

Examples:

* kitchen
* pantry
* recipe
* pan
* plate

Containers define:

* what they accept
* ordering
* uniqueness rules
* transfer behaviour

Do not call these "lists".

They are not simple arrays.

---

## System

A piece of logic that changes the world.

Examples:

* Movement System
* Interaction System
* Cooking System
* AI System

React components are not systems.

---

# Architectural Rules

## Rule 1 — Do Not Put Business Logic Into Components

Bad:

```tsx
onDrop={() => {
   moveIngredient()
   validateRecipe()
   updateCooking()
}}
```

Good:

```tsx
onDrop={() => {
   dispatchAction()
}}
```

Components display.

Systems decide.

---

# Rule 2 — Zustand Is the World State

Zustand stores:

* entities
* containers
* relationships
* world state

Zustand should not know:

* mouse events
* DOM elements
* animations
* React components

---

# Rule 3 — Entities Keep Identity

Never solve movement by deleting and recreating objects.

Bad:

```
delete potato

create new potato
```

Good:

```
Kitchen owns potato

changes to:

Pan owns potato
```

---

# Rule 4 — Containers Enforce Rules

Entities do not decide where they can go.

The container decides.

Example:

Potato:

```
Allowed:

Kitchen
Recipe
Pan
Plate
```

The rule belongs to the container.

---

# Rule 5 — Container Contents Are Ordered

Do not replace container contents with Set.

Order matters.

Reasons:

* rendering
* animations
* drag and drop
* visual arrangement

Uniqueness is handled by validation.

---

# Rule 6 — Ingredient Uniqueness

A container cannot contain two identical ingredients.

Valid:

```
Recipe

Potato
Egg
Onion
```

Invalid:

```
Recipe

Potato
Potato
```

Tools are different.

Valid:

```
Kitchen

Pan
Pan
Knife
Knife
```

---

# Repository Structure

```
src/

├── components/
│   React rendering components

├── store/
│   Zustand world state

├── systems/
│   World behaviour

├── types/
│   TypeScript contracts

├── data/
│   Static definitions

└── assets/
    Images and visual resources


docs/

├── entities.md
├── architecture.md
├── systems.md
├── decisions.md
└── roadmap.md
```

---

# Development Environment

## Requirements

Node.js

npm

---

## Install

```bash
npm install
```

---

## Development Server

```bash
npm run dev
```

---

## Build

```bash
npm run build
```

---

## Tests

Run:

```bash
npm run test
```

---

## Lint

Run:

```bash
npm run lint
```

---

# Current Technology Choices

## Frontend

React 19

TypeScript

Vite

---

## State

Zustand

The store represents the simulation state.

---

## Drag and Drop

dnd-kit

Drag and drop is only input.

It does not contain world rules.

---

## Animation

Framer Motion

Animations react to world changes.

---

# Coding Style

## Prefer

Small functions.

Explicit types.

Clear names.

Domain terminology.

Example:

Good:

```ts
moveEntity()
validateContainer()
transferOwnership()
```

Avoid:

```ts
handleStuff()
processData()
updateThing()
```

---

# Before Adding New Features

Ask:

## Is this a new entity?

Example:

```
Knife
Plate
Customer
```

Add entity definition.

---

## Is this a new container?

Example:

```
Fridge
Oven
Table
```

Add container rules.

---

## Is this behaviour?

Example:

```
Cooking
Cutting
Heating
```

Add a system.

---

## Is this only visual?

Example:

```
animation
sprite
layout
```

Keep it inside components.

---

# Common Mistakes To Avoid

## Do not create local copies of world state

Bad:

```ts
const [items,setItems]=useState([])
```

for world objects.

Use the world store.

---

## Do not bypass systems

Bad:

```ts
world.entities[id].container="pan"
```

Good:

```ts
dispatch({
 type:"MOVE_ENTITY"
})
```

---

## Do not create generic abstractions too early

Prefer:

```
one clear system
```

over:

```
many configurable frameworks
```

---

# When Changing Architecture

Update documentation.

Required files:

Architecture change:

```
docs/architecture.md
docs/decisions.md
```

Entity change:

```
docs/entities.md
```

System change:

```
docs/systems.md
```

Future direction:

```
docs/roadmap.md
```

---

# Current Development Priority

The priority order is:

1. Stable entity/container model
2. Reliable movement system
3. Correct drag and drop behaviour
4. Animation layer
5. Cooking mechanics
6. AI actions

Do not skip the foundation.

---

# Final Instruction For Agents

Treat Tortilla World as a simulation engine.

Do not optimize for the shortest React implementation.

Optimize for:

* predictable world behaviour
* clear ownership
* extensibility
* understandable systems

The goal is not a page.

The goal is a living world.

The actual whole code of this repo is in: [repomix-output.xml](https://github.com/felixinberlin/tortilla-world/blob/main/repomix-output.xml)
