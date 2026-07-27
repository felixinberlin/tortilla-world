# Tortilla World Roadmap

## Vision

Tortilla World is an interactive cooking simulation built around a living world model.

The goal is not only to create a recipe application, but to create a small simulated environment where:

* objects exist as entities
* containers define relationships
* actions modify the world
* event sourcing tracks all world state changes deterministically
* characters and AI can interact with the environment

The long-term vision is a "living kitchen" where the user can interact with objects naturally and where autonomous agents can understand, replay, and manipulate the world.

---

# Current Status

## Phase: World Foundation & Interaction Core

Status:

🟢 Core Simulation & Event Sourcing Established

Current focus:

* stable world & workstation model
* entity & container ownership rules
* drag and drop interactions
* event sourcing & append-only audit trail
* multi-format action & session exports (.json)
* comprehensive vitest test coverage (20 test suites, 115 passing tests)

Completed foundations:

✅ React 19 + TypeScript application
✅ Zustand world store with Immer
✅ Entity & container architecture
✅ Workstation engine (`pantry`, `washing`, `cutting`, `prep`, `cooking`, `serving`)
✅ Drag and drop foundation (`dnd-kit`)
✅ Headless EventStore & append-only audit trail
✅ Deterministic Replay Engine (`replayEngine.ts`)
✅ Action Recorder with 3 Export Formats (Mascot Sequence, Recipe JSON, Full Session Log with `zustandInit` / `actions` / `events` / `zustandEnd`)
✅ Comprehensive documentation structure

---

# Roadmap Overview

```text
Foundation & Event Sourcing
    |
    v
World Interaction & Workstations
    |
    v
Cooking Simulation & Recipe Engine
    |
    v
Living Kitchen & NPC AI
    |
    v
AI Kitchen Assistant & Autonomous Agents
    |
    v
Multiplayer / Synced World Simulation
```

---

# Phase 1 — World Foundation & Event Store

## Goal

Create a reliable simulation core with deterministic state tracking and event sourcing.

## Features

### Entity System

Implemented:

* ingredients (potato, egg, onion, oil, salt, etc.)
* tools (knife, peeler, whisk, fork, spatula, etc.)
* containers (pantry, cutting board, bowl, pan, plate, sink)
* entity identity preservation during transformations

---

### Container System

Implemented:

* ownership models
* ordered contents
* container acceptance & transfer rules
* duplicate & uniqueness validation

---

### Event Store & Audit Trail

Implemented:

* `EventStore` interceptor listening to all `dispatch` calls
* Immutable `BaseWorldEvent` wrappers (`id`, `timestamp`, `sequenceNumber`, `version`, `actor`, `action`)
* Headless export/import (`exportJSON`, `importJSON`)
* Deterministic Replay Engine (`replayEngine.ts`)

---

# Phase 2 — Interaction & Workstation Layer

## Goal

Make the world feel alive and enable multi-format session recording.

## Features

### Workstation Engine

Supported:

* Pantry (`pantry`)
* Washing Station (`washing_station`)
* Cutting Station (`cutting_station`)
* Preparation Station (`preparation_station`)
* Cooking Station (`cooking_station`)
* Serving Station (`serving_station`)

---

### Action Recorder & Multi-Format Exporter

Supported:

* Real-time action recording & EventStore capture
* Format 1: 🤖 **Mascot Action Sequence** (explicit focus/grab/move/drop/flip steps)
* Format 2: 📜 **Declarative Recipe File** (.json step definitions)
* Format 3: 💾 **Full Session Log** (`zustandInit` initial state + actions/events + `zustandEnd` final state)
* Direct download buttons for all 3 formats in UI

---

# Phase 3 — Cooking Simulation & Recipe Engine

## Goal

Execute declarative cooking recipes state machines with mascot automation.

## Features

### Declarative Recipe Engine (`RecipeRunner`)

Supported:

* Declarative recipe definitions (`clasicaRecipe`, `tortillaPatatasRecipe`, etc.)
* Automated mascot helper actions via `mascotActions.ts`
* Preparation mutations (`raw` ➔ `cut` ➔ `beaten` ➔ `mixed`)
* Cooking transformations (`cooked`, `fried`, `flipped`)

---

# Phase 4 — Living Kitchen & Multi-Character Dynamics

## Goal

Create an autonomous living kitchen environment.

## Features (In Progress / Next Focus)

* **Multi-Character Interactions**: Customer order queue, waiter NPCs, and helper mascots.
* **Ambient Physics & Particle Effects**: Steam on cooking burners, sizzle audio synthesis, chopping sound triggers.
* **Time & Temperature Engine**: Dynamic cooking timer loops, heat dissipation, and overcooking/burning states.

---

# Phase 5 — AI Kitchen Assistant & Autonomous Agents

## Goal

Allow LLM and autonomous agents to perceive, plan, and execute kitchen workflows.

## Features (Planned)

* **Agent Perception Interface**: Serialized world state JSON feeds for LLMs.
* **Autonomous Task Planner**: Translates natural language requests ("Make a Spanish Tortilla for 4 people") into validated `WorldAction` sequences.
* **Live Action Validation**: Real-time pre-execution validation ensuring agents obey physical container constraints.

---

# Phase 6 — Shared & Multiplayer World (Future)

## Goal

Synchronized multi-user kitchen simulation.

## Features (Future)

* Real-time WebSocket event store synchronization
* Multi-player collaborative cooking sessions
* Shared event history log and replay comparison tools

---

# Development Principles

## Keep the World Model Independent

The simulation engine exists independently of React.

---

## Prefer Systems Over Component Logic

Components display. Systems decide.

---

## Preserve Entity Identity

Objects are moved and mutated, not deleted and recreated.

---

## Document Decisions

All architecture changes are recorded in:

```text
docs/decisions.md
docs/systems.md
docs/architecture.md
```

---

# Current Priority

The immediate goal is:

> Expand living kitchen dynamics (customers, cooking timers, heat dissipation) on top of our solid event sourcing foundation.
