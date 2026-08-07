# Tortilla World — Developer Guide

This guide provides practical step-by-step instructions for human developers and AI coding agents extending Tortilla World.

---

## Table of Contents

1. [Core Architectural Rules](#core-architectural-rules)
2. [How to Add a New Ingredient](#how-to-add-a-new-ingredient)
3. [How to Add a New Tool](#how-to-add-a-new-tool)
4. [How to Add a New Recipe](#how-to-add-a-new-recipe)
5. [How to Make Tortilla (Mascot) Say Something](#how-to-make-tortilla-mascot-say-something)
6. [How to Trigger Mascot Actions (Move, Grab, Drop, Flip)](#how-to-trigger-mascot-actions)
7. [How Ingredient Capabilities & State Transitions Work](#how-ingredient-capabilities--state-transitions-work)
8. [How Containers & Rules Work](#how-containers--rules-work)
9. [Testing & Quality Assurance](#testing--quality-assurance)

---

## Core Architectural Rules

Before making changes, remember these primary simulation laws:

1. **Entities exist in Containers**: Never create local React component copies of world items. Everything lives in `worldStore` (`entities` and `containers`).
2. **Entities Keep Identity**: Do not delete and recreate objects to move them. Change ownership/container assignment.
3. **Container Decides Rules**: Containers enforce capacity, allowed item types, and ingredient uniqueness.
4. **Action Dispatch**: Components display UI; systems dispatch actions to `worldStore`.

---

## How to Add a New Ingredient

Adding an ingredient requires 3 main steps to register it in the catalog, define its capabilities, and set up state transitions.

### Step 1: Register in `src/data/catalog/ingredients.ts`

Add the catalog definition object:

```typescript
export const catalogIngredients: IngredientCatalogItem[] = [
  // ... existing ingredients
  {
    id: 'zucchini',
    name: 'Zucchini',
    icon: '🥒',
    category: 'vegetable',
  },
];
```

### Step 2: Define Capabilities in `src/data/catalog/ingredientCapabilities.ts`

Define allowed actions, tools, workstations, and prerequisites:

```typescript
export const INGREDIENT_CAPABILITIES_CATALOG: IngredientCapabilityCatalog = {
  // ... existing ingredients
  zucchini: {
    wash: {
      workstation: 'sink',
    },
    peel: {
      tools: ['peeler', 'knife'],
      workstation: 'cutting_station',
    },
    slice: {
      tools: ['knife', 'mandoline'],
      workstation: 'cutting_station',
      requires: {
        preparation: ['washed', 'peeled'],
      },
    },
    fry: {
      workstation: 'pan',
      requires: {
        preparation: ['sliced'],
      },
    },
  },
};
```

### Step 3: Define State Transitions in `src/data/catalog/ingredientStateTransitions.json`

Define valid states and state transition flows (`from` -> `to`):

```json
{
  "id": "zucchini",
  "states": [
    "raw",
    "washed",
    "peeled",
    "sliced",
    "fried"
  ],
  "allowedActions": [
    { "action": "wash", "from": "raw", "to": "washed" },
    { "action": "peel", "from": "washed", "to": "peeled" },
    { "action": "slice", "from": "peeled", "to": "sliced" },
    { "action": "fry", "from": "sliced", "to": "fried" }
  ]
}
```

---

## How to Add a New Tool

Tools are first-class entities used in cooking actions (e.g. cutting, mixing, cooking).

### Step 1: Register in `src/data/catalog/tools.ts`

Add your tool to `catalogTools`:

```typescript
export const catalogTools: ToolCatalogItem[] = [
  // ... existing tools
  {
    id: 'grater',
    name: 'Cheese Grater',
    icon: '🧀',
    category: 'cutting',
  },
];
```

### Step 2: Associate with Ingredient Capabilities

In `src/data/catalog/ingredientCapabilities.ts`, list your new tool in compatible actions:

```typescript
cheese: {
  grate: {
    tools: ['grater'],
    workstation: 'cutting_station',
  },
}
```

---

## How to Add a New Recipe

Recipes are declarative sequences of steps processed by `RecipeRunner`.

### Step 1: Define Recipe in `src/data/catalog/recipes/`

Create a new file or add to existing catalog files:

```typescript
import type { Recipe } from '../../../types/Recipe';

export const zucchiniOmeletteRecipe: Recipe = {
  id: 'zucchini_omelette',
  name: 'Tortilla de Calabacín',
  description: 'Delicious zucchini omelette with egg and onion.',
  difficulty: 'easy',
  prepTime: '15 min',
  ingredients: [
    { entityId: 'egg', requiredState: { preparation: 'beaten' } },
    { entityId: 'zucchini', requiredState: { preparation: 'sliced', cooking: 'fried' } },
    { entityId: 'salt', requiredState: { preparation: 'seasoned' } },
  ],
  steps: [
    { id: '1', action: 'grab', entityId: 'zucchini', sourceContainerId: 'despensa' },
    { id: '2', action: 'move', targetContainerId: 'board' },
    // Step with tool override ('knife') and custom recommendation advice
    { id: '3', action: 'prepare', entityId: 'zucchini', preparation: 'sliced', tool: 'knife', recommendation: 'Cut into thin, even slices!' },
    // Step with specific cooking container/tool ('big_pan') and instruction recommendation
    { id: '4', action: 'cook', containerId: 'big_pan', cooking: 'fried', tool: 'big_pan', instruction: 'Cook in the big pan until golden brown!' },
    { id: '5', action: 'mix', containerId: 'bowl', tool: 'whisk', customName: 'Mezcla de Calabacín' },
    { id: '6', action: 'cook', containerId: 'small_pan', cooking: 'fried', tool: 'spatula', instruction: 'In the small pan cook until browned!' },
    { id: '7', action: 'serve', targetContainerId: 'plate' },
    { id: '8', action: 'speak', message: '¡Tortilla de calabacín lista!' },
    { id: '9', action: 'celebrate' },
  ],
};
```

### Tools and Recommendations in Recipe Steps

Each recipe step can optionally specify:
- `tool` or `toolId`: The tool worn/equipped by Chef Tortilla while performing the action (e.g. `knife`, `machine`, `spatula`, `whisk`, `big_pan`, `small_pan`, `wok`).
- `instruction` or `recommendation`: Custom speech recommendation spoken by Tortilla during the step.

**Default Behavior:**
If `tool` or `instruction` is omitted, the `RecipeRunner` automatically selects the default tool for the workstation and generates dynamic recommendations via `getActionRecommendation()`.

### Step 2: Register in `src/data/catalog/recipes/index.ts`

Export your new recipe in the `recipes` array.

---

## How to Make Tortilla (Mascot) Say Something

To trigger a speech bubble on Chef Tortilla:

### Method A: Using `speakTortilla()` System Helper

Import `speakTortilla` from `src/systems/mascotActions.ts`:

```typescript
import { speakTortilla } from '../systems/mascotActions';

// Make Tortilla speak for 3 seconds (default)
speakTortilla('¡Hola, Chef! 🍳');

// Custom duration (e.g., 5 seconds)
speakTortilla('Remember to peel the potatoes first!', 5000);

// Keep message visible indefinitely (durationMs = 0)
speakTortilla('Cooking in progress...', 0);
```

### Method B: React Component Button Click Example

```tsx
import React from 'react';
import { speakTortilla } from '../systems/mascotActions';

export function GreetingButton() {
  return (
    <button
      onClick={() => speakTortilla('¡Vamos a cocinar! 🥔')}
      className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
    >
      Talk to Tortilla
    </button>
  );
}
```

### Method C: Direct Store Action Dispatch

```typescript
import { worldStore } from '../store/worldStore';

worldStore.getState().dispatch({
  type: 'UPDATE_ENTITY_STATE',
  payload: {
    entityId: 'chef',
    changes: { speechMessage: '¡Sabor excelente!' },
  },
});
```

---

## How to Trigger Mascot Actions

All mascot actions are exported from `src/systems/mascotActions.ts`:

```typescript
import {
  moveTortillaTo,
  grabIngredient,
  dropIngredient,
  flipTortilla,
  clearTortillaGaze,
  speakTortilla,
} from '../systems/mascotActions';

// 1. Move focus gaze to a workstation container
moveTortillaTo('board');

// 2. Pick up an ingredient
grabIngredient('potato', 'despensa');

// 3. Drop held ingredient into a workstation
dropIngredient('board');

// 4. Trigger mascot flip animation
flipTortilla();

// 5. Clear gaze back to idle
clearTortillaGaze();
```

---

## How Ingredient Capabilities & State Transitions Work

Tortilla World enforces hard capability schemas to avoid action hallucinations (e.g. peeling salt or dicing raw eggs).

### Capability Validation

Use `validateIngredientAction` to verify single actions:

```typescript
import { validateIngredientAction } from '../systems/ingredientCapabilities';

const check = validateIngredientAction(
  'potato',
  'slice',
  { preparation: 'peeled' }, // current state
  'knife'                   // tool used
);

console.log(check.valid); // true
```

### Multi-Step Sequence Validation

Use `validateActionSequence` to validate AI or user plans:

```typescript
import { validateActionSequence } from '../systems/ingredientCapabilities';

const planResult = validateActionSequence([
  { ingredientId: 'potato', action: 'peel' },
  { ingredientId: 'potato', action: 'slice' },
  { ingredientId: 'potato', action: 'fry' },
]);

console.log(planResult.valid); // true
```

---

## How Containers & Rules Work

Containers own entities and enforce rules via `src/engine/containerRules.ts`.

### Container Rules Example

```typescript
const boardContainer = {
  id: 'board',
  name: 'Cutting Board',
  type: 'board',
  entityIds: [],
  rules: {
    maxCapacity: 3,            // Maximum items allowed
    acceptsTypes: ['ingredient'], // Types allowed
    uniqueIngredients: true,    // Disallows 2 identical raw ingredients
    isImmutable: false,        // If true, items aren't removed when grabbed
  },
};
```

---

## Testing & Quality Assurance

Always run linting and unit tests before completing tasks.

```bash
# Run all unit tests
npm run test

# Run a specific test file
npx vitest run src/systems/geminiCapabilityPlanner.test.ts

# Run ESLint validation
npm run lint

# Compile and verify Vite build
npm run build
```
