# Entities

## Overview

Tortilla World is built around a world model composed of **entities** and **containers**.

Everything that exists in the world is an entity:

* ingredients
* tools
* containers
* future objects such as plates, machines, characters, or decorations

Entities do not decide where they can exist.
Containers own entities and enforce the rules of what they can contain.

The world state is therefore based on:

```
Entity
   |
   | owned by
   v
Container
```

---

# Entity

An entity is a unique object inside the world.

Example:

```ts
{
  id: "potato",
  type: "ingredient"
}
```

or:

```ts
{
  id: "pan-small",
  type: "tool"
}
```

Entities have identity.

Moving an entity does not create a new entity.
A move changes the ownership relationship between containers.

---

# Entity Types

## Ingredient

Ingredients are cooking resources.

Examples:

* potato
* egg
* onion
* oil

Ingredients have special rules:

* an ingredient can only appear once inside the same container
* ingredients can move between containers
* ingredients can be consumed by actions
* ingredients can be transformed by cooking systems

Example:

```ts
{
  id: "potato",
  type: "ingredient",
  name: "Potato",
  icon: "🥔"
}
```

---

## Tool

Tools are reusable objects used by actions.

Examples:

* pan
* knife
* spoon
* bowl

Tools have different rules from ingredients:

* duplicate tools are allowed
* tools can exist multiple times inside a container
* tools are normally not consumed

Example:

```ts
{
  id: "pan-001",
  type: "tool",
  name: "Pan",
  icon: "🍳"
}
```

A kitchen can contain:

```
Kitchen
 ├── pan-001
 └── pan-002
```

Both are valid.

---

# Container

A container is an entity that can own other entities.

Examples:

* kitchen
* pantry
* recipe
* pan
* plate
* fridge

A container is not a simple programming list.

It is a world object with:

* ordered contents
* ownership
* validation rules
* capabilities

Example:

```ts
{
  id: "kitchen",
  type: "container",
  children:[
    "potato",
    "egg",
    "pan-001"
  ]
}
```

---

# Container Rules

Containers define what they allow.

Rules are not stored in the entity itself.

The same entity type can behave differently depending on the container.

Example:

A potato can exist in:

```
Kitchen
Recipe
Pan
Plate
```

but each container decides what happens.

---

## Content ordering

Container contents are ordered.

The order matters for:

* visual rendering
* drag and drop
* animations
* UI positioning

Therefore container contents use an ordered collection.

Example:

```ts
children:[
  "potato",
  "egg",
  "onion"
]
```

---

# Ingredient uniqueness

A container cannot contain two identical ingredients.

Valid:

```
Recipe
 ├── potato
 ├── onion
 └── egg
```

Invalid:

```
Recipe
 ├── potato
 ├── potato
```

This rule applies only to ingredients.

---

# Duplicate entities

Duplicate rules depend on entity type.

Example:

Kitchen:

Valid:

```
Kitchen
 ├── potato
 ├── onion
 ├── pan-001
 └── pan-002
```

Invalid:

```
Kitchen
 ├── potato
 └── potato
```

---

# Ownership

Every movable entity has an owner.

Example:

Initial state:

```
Kitchen
 ├── potato
 ├── egg


Pan
 └── oil
```

After moving potato:

```
Kitchen
 └── egg


Pan
 ├── oil
 └── potato
```

The potato entity did not change.

Only the ownership relation changed.

---

# Static and Dynamic Containers

Containers can have different ownership behaviour.

## Static Container

A static container represents predefined world content.

Examples:

* kitchen ingredients
* initial inventory
* environment objects

Characteristics:

* content is defined by the world
* removing an item does not necessarily delete it
* moving an item out can create a new reference/copy depending on rules

Example:

```
Kitchen
 ├── potato
 ├── onion
 └── egg
```

---

## Dynamic Container

A dynamic container represents changing ownership.

Examples:

* recipe
* pan
* plate
* trash

Characteristics:

* items can be added
* items can be removed
* items can be transferred

Example:

```
Recipe
 ├── potato
 └── egg
```

---

# Container Capabilities

Containers expose capabilities that systems can check.

Example:

```ts
{
  canAdd: true,
  canRemove: true,
  allowsDuplicateIngredients: false,
  acceptedTypes:[
    "ingredient",
    "tool"
  ]
}
```

Before performing an action, systems validate these capabilities.

---

# Relationships

The world is composed of relationships:

```
Kitchen
   owns
      Potato


Pan
   owns
      Oil
```

The Entity itself does not know:

* where it is
* what contains it
* what actions are possible

The world systems decide this.

---

# Future Extensions

This model allows adding:

## Characters

```
Tortilla
  owns
    Knife
```

## Machines

```
Oven
  owns
    Tray
```

## Recipes

```
Recipe
  owns
    Potato
    Egg
```

## Cooking states

```
Pan
  owns
    Raw Potato
```

becomes:

```
Pan
  owns
    Fried Potato
```

without changing the fundamental entity/container model.
