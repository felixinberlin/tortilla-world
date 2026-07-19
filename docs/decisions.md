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


Decision:
On a cross-list move: if the target list already contains that item's id, and this item type is "unique per list," reject the whole move (return null, same as any other invalid drag).
On a same-list reorder: never blocked — you're not creating a duplicate, you're repositioning the one copy that's already there.

Reason:
A list can contain potato, onion and a pan, but not 2 times potatos.