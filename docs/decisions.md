# Architecture Decisions


## Layered drag-and-drop pipeline

Decision:
Split drag-and-drop into four read/write layers:

```
World Store
    │
    ▼
queries.ts        (read-only views of store data)
    │
    ▼
dropRules.ts      (can this drop happen?)
    │
    ▼
interaction.ts    (how to reorder / commit to store)
    │
    ▼
React
```

Reason:
Each layer has one job. UI reads through queries, asks dropRules for permission,
then interaction applies the approved change. Rules stay testable without
touching reorder mechanics or React.


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


## Lists

There are 2 types of lists:
Inmutable and mutable.

Inmutable: 
are defined at creation.
Elements canot be added or deleted.
A "move" to a mutable list creates a copy of the list element.

Mutable:
Elements can be added, moved and deleted.
Can be empty.
A "move" action removes the element of the list and creates a copy in another list.


Ingredients are unique for list. same ingredient cannot appear 2 times in any list.