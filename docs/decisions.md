# Architecture Decisions


## Zustand instead of Redux

Decision:
Use Zustand.

Reason:
The world state is small and interactive.
Redux would add unnecessary complexity.


## Framer Motion instead of game engine

Decision:
Use Framer Motion initially.

Reason:
The first version is UI-based.
A full game engine is unnecessary.