# Tortilla World 🌮

An interactive cooking world built with React, TypeScript, and Zustand.

Tortilla World is not just a recipe application. It is a small simulation engine where ingredients, tools, and objects exist as entities inside a living kitchen environment.

Objects can be moved, combined, transformed, and controlled through world rules.

The long-term goal is a kitchen where users and AI agents can interact naturally with the environment.

---

# Vision

Traditional applications are based around screens and forms.

Tortilla World explores a different approach:

> Build a world first. Let applications emerge from the world.

The kitchen is modeled as a collection of entities and containers.

Examples:

```text
Kitchen

 ├── Potato
 ├── Onion
 ├── Egg
 ├── Knife
 └── Pan
```

Actions modify relationships inside the world:

```text
Move potato

Kitchen
   |
   v

Pan
```

The object does not disappear and reappear.

Ownership changes.

---

# Features

## Current

✅ Entity-based world model
✅ Container architecture
✅ Zustand world state
✅ Drag and drop interactions
✅ Ingredient system
✅ Tool system foundation
✅ Animated world objects

---

## Planned

🚧 Cooking simulation
🚧 Recipe engine
🚧 Entity transformations
🚧 Character interactions
🚧 AI kitchen assistant
🚧 Autonomous actions
🚧 Living kitchen environment

See the full roadmap:

[`docs/roadmap.md`](docs/roadmap.md)

---

# Architecture

The project follows a simulation-oriented architecture.

The main concepts are:

```text
Entities
    |
    v
Containers
    |
    v
Systems
    |
    v
Actions
    |
    v
World State
```

---

## Entities

Everything in the world is an entity.

Examples:

* ingredients
* tools
* containers
* characters
* machines

Entities have identity.

Moving an entity changes ownership, not the entity itself.

---

## Containers

Containers are world objects that own entities.

Examples:

* Kitchen
* Pantry
* Recipe
* Pan
* Plate

Containers define rules:

* what they accept
* ordering
* uniqueness
* transfer behaviour

---

## Systems

Systems contain world behaviour.

Examples:

### Movement System

Handles:

* moving objects
* validating transfers
* changing ownership

### Interaction System

Handles:

* user input
* drag and drop
* actions

### Cooking System

Future:

* combining ingredients
* changing states
* producing results

---

More details:

* [`docs/entities.md`](docs/entities.md)
* [`docs/architecture.md`](docs/architecture.md)
* [`docs/systems.md`](docs/systems.md)
* [`docs/decisions.md`](docs/decisions.md)

---

# Technology Stack

## Frontend

* React
* TypeScript
* Vite

## State Management

* Zustand

## Interaction

* dnd-kit

## Animation

* Framer Motion

---

# Project Structure

```text
src/

├── components/
│   UI and world rendering

├── entities/
│   Entity definitions

├── systems/
│   World behaviour

├── store/
│   Zustand world state

├── data/
│   Static world data

└── types/
    TypeScript models
```

---

# Development

## Requirements

* Node.js
* npm

---

## Install

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

---

## Build

```bash
npm run build
```

---

# Design Principles

## World First

The simulation model is independent from the UI.

---

## Systems Control Behaviour

Components display the world.

Systems change the world.

---

## Actions Describe Intent

Actions represent what should happen.

Example:

```ts
{
 type:"MOVE_ENTITY",
 entity:"potato",
 target:"pan"
}
```

The world decides if it is possible.

---

## AI Compatible

Future AI agents will not directly manipulate state.

They will create actions:

```text
AI
 |
 v
Action
 |
 v
World Validation
 |
 v
World Update
```

---

# Why Tortilla?

A tortilla de patatas is a simple dish with interesting complexity:

* few ingredients
* many preparation steps
* tools matter
* timing matters
* small changes affect the result

It is a perfect example for exploring interactive worlds.

---

# Contributing

This project is currently under active development.

The most valuable contributions are:

* architecture discussions
* gameplay ideas
* UI improvements
* simulation ideas
* technical experiments

---

# License

Add license information here.

````

---

## Documentation Map

```text
README.md
    |
    |-- What is Tortilla World?
    |-- How to run it?
    |-- High-level architecture


docs/

├── entities.md
│     What exists?

├── decisions.md
│     Why is it designed this way?

├── architecture.md
│     How does everything connect?

├── systems.md
│     How does behaviour work?

└── roadmap.md
      Where is it going?
````

