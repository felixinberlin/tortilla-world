# Architecture

## Philosophy

The application separates:

- State
- Logic
- Rendering


## Layers


World State
    |
    v
Systems
    |
    v
Components
    |
    v
UI


## Store

Zustand stores contain application state.

Example:

worldStore

Contains:
- entities
- positions
- states
- relationships


## Components

Components are responsible only for rendering.

They should not contain:
- business logic
- calculations
- world rules


## Systems

Systems contain behavior.

Examples:

movement.ts
collision.ts
interaction.ts


## Animation

Framer Motion renders state changes.

The animation is not the source of truth.
The world state is.