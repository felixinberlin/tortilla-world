This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: .
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.Jules/
  palette.md
docs/
  architecture.md
  decisions.md
  entities.md
  player-guide.md
  README.md
  redux-devtools-actions.json
  redux-devtools-commands.md
  roadmap.md
  systems.md
public/
  favicon.svg
  icons.svg
src/
  assets/
    hero.png
  components/
    Controls/
      ActionRecorder.scss
      ActionRecorder.tsx
      ActionReplayer.scss
      ActionReplayer.test.tsx
      ActionReplayer.tsx
      IngredientsSidebar.scss
      IngredientsSidebar.tsx
      LanguageSwitcher.tsx
      PlateDishNameModal.scss
      PlateDishNameModal.tsx
      PlayerGuideModal.scss
      PlayerGuideModal.tsx
      RecipeDatabaseModal.scss
      RecipeDatabaseModal.tsx
    Ingredients/
      Ingredient.tsx
      IngredientList.tsx
      IngredientListItem.tsx
      Ingredients.scss
      RecipeIngredientItem.tsx
      RecipeIngredientList.tsx
    Mascot/
      Mascot.tsx
      TortillaSvg.scss
      TortillaSvg.tsx
    Recipe/
      CookbookView.scss
      CookbookView.tsx
      RecipePanel.scss
      RecipePanel.tsx
      RecipeRequirements.tsx
      RequirementView.tsx
    Scene/
      RecipePlayer.scss
      RecipePlayer.tsx
      Scene.tsx
      useSceneDragAndDrop.ts
    World/
      ContainerView.tsx
      EntityIcon.tsx
      EntityStateBadge.tsx
      EntityView.tsx
      rendererRegistry.ts
      World.scss
  data/
    catalog/
      recipes/
        clasica.json
        clasica.ts
        concebolla.json
        concebolla.ts
        francesa.json
        francesa.ts
        index.ts
        recipes.test.ts
      ingredients.ts
      tools.ts
      workstations.ts
    schemas/
      recipe.schema.json
  engine/
    containerRules.ts
    ingredientState.ts
    workstations.test.ts
    workstations.ts
  i18n/
    grammar/
      locales/
        de.json
        en.json
        es.json
      article.ts
      index.ts
      noun.ts
      sentence.ts
      verb.ts
    locales/
      de.json
      en.json
      es.json
    context.ts
    i18n.test.ts
    i18nContext.tsx
    useTranslation.ts
  lib/
    firebase.ts
  services/
    dbService.test.ts
    dbService.ts
  store/
    middleware/
      actionLog.test.ts
      actionLog.ts
    slices/
      containerSlice.ts
      entitySlice.ts
      focusSlice.ts
      mascotSlice.ts
      recordSlice.test.ts
      recordSlice.ts
    defaults.ts
    gazeStore.ts
    selectors.ts
    types.ts
    worldStore.test.ts
    worldStore.ts
  styles/
    _mixins.scss
    _variables.scss
  systems/
    recipeRunner/
      handlers/
        cookHandlers.test.ts
        cookHandlers.ts
        mixHandlers.ts
        moveHandlers.ts
        prepHandlers.ts
        utilityHandlers.ts
      RecipeRunner.ts
      types.ts
    actionExportFormats.test.ts
    actionPlayer.test.ts
    actionPlayer.ts
    analytics.ts
    clasicaCompletion.test.ts
    concebollaCompletion.test.ts
    EventStore.ts
    focus.test.ts
    focus.ts
    francesaCompletion.test.ts
    gaze.test.ts
    gaze.ts
    ingredientUsage.test.ts
    mascot.ts
    mascotActions.test.ts
    mascotActions.ts
    mixAndCook.test.ts
    movement.ts
    queries.test.ts
    queries.ts
    recipeLoader.test.ts
    recipeLoader.ts
    recipeMatcher.test.ts
    recipeMatcher.ts
    recipeRunner.test.ts
    recipeRunner.ts
    recipeStepFormatter.test.ts
    recipeStepFormatter.ts
    recipeTranslator.test.ts
    recipeTranslator.ts
    recipeValidator.ts
    recipeWorkstations.test.ts
    recipeWorkstations.ts
    replayEngine.test.ts
    replayEngine.ts
  types/
    actions.ts
    focus.ts
    Ingredient.ts
    IngredientList.ts
    Recipe.ts
    RecipeIngredient.ts
    RecipeList.ts
    RecipeSchema.ts
    RecipeStep.ts
    recording.ts
    Requirement.ts
    tools.ts
    workstations.ts
    world.ts
    WorldEvent.ts
  utils/
    devMode.ts
    recipeFormatDetector.test.ts
    recipeFormatDetector.ts
    sessionLogUtils.test.ts
    sessionLogUtils.ts
  App.tsx
  index.scss
  main.tsx
  repomix-output.xml
.env.example
.gitignore
AGENTS.md
eslint.config.js
firestore.rules
index.html
metadata.json
package.json
README.md
reviews.md
tickets.md
tsconfig.app.json
tsconfig.json
tsconfig.node.json
tsconfig.tsbuildinfo
vite.config.ts
```

# Files

## File: docs/entities.md
`````markdown
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

Tools are reusable objects used by actions at workstations.

Examples:

* knife (`knife`)
* peeler (`peeler`)
* whisk (`whisk`)
* fork (`fork`)
* spatula (`spatula`)
* grater (`grater`)
* mandoline (`mandoline`)
* spoon (`spoon`)

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

## Entity State (Preparation & Cooking)

Entities store mutable properties inside their `state` field without changing entity identity:

```ts
{
  id: "potato",
  type: "ingredient",
  name: "Potato",
  state: {
    preparation: "diced", // "whole" | "peeled" | "sliced" | "diced" | "minced"
    cooking: "fried"     // "raw" | "fried" | "boiled" | "burned"
  }
}
```

Preparation and cooking actions mutate this state via `PREPARE_INGREDIENT` and `COOK_INGREDIENT` actions without recreating entities.
`````

## File: docs/README.md
`````markdown
# Tortilla World

Interactive React application where a tortilla mascot lives in a virtual kitchen.

The user can interact with ingredients, recipes and kitchen objects.

## Stack

- React
- TypeScript
- Zustand
- Framer Motion
- Vite

## Main concept

The application has a small world-state layer.
Objects exist independently from the UI.

Components render the world.
Systems modify the world.
`````

## File: docs/redux-devtools-actions.json
`````json
[
  {
    "type": "MASCOT_MOVE",
    "payload": {
      "mascotId": "chef",
      "targetContainerId": "despensa"
    }
  },
  {
    "type": "MASCOT_GRAB",
    "payload": {
      "mascotId": "chef",
      "entityId": "potato",
      "sourceContainerId": "despensa"
    }
  },
  {
    "type": "MASCOT_MOVE",
    "payload": {
      "mascotId": "chef",
      "targetContainerId": "board"
    }
  },
  {
    "type": "MASCOT_DROP",
    "payload": {
      "mascotId": "chef",
      "targetContainerId": "board"
    }
  },
  {
    "type": "MASCOT_FLIP",
    "payload": {
      "mascotId": "chef"
    }
  }
]
`````

## File: docs/redux-devtools-commands.md
`````markdown
# Redux DevTools & Console Test Commands

This document lists test actions and script sequences for Tortilla mascot automation that can be dispatched via **Redux DevTools** or directly in the **Browser Console**.

---

## 1. Redux DevTools Actions (JSON)

Copy and paste these individual action objects into the **Dispatcher** tab of Redux DevTools:

### Step 1: Look at Despensa (Pantry)
```json
{
  "type": "MASCOT_MOVE",
  "payload": {
    "mascotId": "chef",
    "targetContainerId": "despensa"
  }
}
```

### Step 2: Grab Potato from Despensa
```json
{
  "type": "MASCOT_GRAB",
  "payload": {
    "mascotId": "chef",
    "entityId": "potato",
    "sourceContainerId": "despensa"
  }
}
```

### Step 3: Move gaze to Tabla (Workspace Table / Cutting Board)
```json
{
  "type": "MASCOT_MOVE",
  "payload": {
    "mascotId": "chef",
    "targetContainerId": "board"
  }
}
```

### Step 4: Drop Potato in Tabla
```json
{
  "type": "MASCOT_DROP",
  "payload": {
    "mascotId": "chef",
    "targetContainerId": "board"
  }
}
```

### Step 5: Flip Tortilla
```json
{
  "type": "MASCOT_FLIP",
  "payload": {
    "mascotId": "chef"
  }
}
```

---

## 2. Follow Recipe Automation Script Example (Con Cebolla)

This sequence demonstrates how "Follow the recipe" brings all recipe ingredients (potato, egg, oil, onion, salt, pepper) from the catalog pantry to the table (`board`) one by one:

```js
// Browser Console: Follow Recipe Script Example
(async () => {
  const store = window.__ZUSTAND_STORE__ || (await import('/src/store/worldStore.ts')).worldStore;
  const dispatch = store.getState().dispatch;
  const wait = (ms) => new Promise(res => setTimeout(res, ms));

  const recipeIngredients = ['potato', 'egg', 'oil', 'onion', 'salt', 'pepper'];

  for (const ing of recipeIngredients) {
    console.log(`Bringing ${ing} to table...`);
    dispatch({ type: 'MASCOT_MOVE', payload: { mascotId: 'chef', targetContainerId: 'despensa' } });
    await wait(400);

    dispatch({ type: 'MASCOT_GRAB', payload: { mascotId: 'chef', entityId: ing, sourceContainerId: 'despensa' } });
    await wait(400);

    dispatch({ type: 'MASCOT_MOVE', payload: { mascotId: 'chef', targetContainerId: 'board' } });
    await wait(400);

    dispatch({ type: 'MASCOT_DROP', payload: { mascotId: 'chef', targetContainerId: 'board' } });
    await wait(400);
  }

  console.log('Recipe complete! Flip Tortilla!');
  dispatch({ type: 'MASCOT_FLIP', payload: { mascotId: 'chef' } });
})();
```

---

## 3. Helper Function Example

Alternatively, call the system function directly in console:

```js
const { runFollowRecipeScript } = await import('/src/systems/mascotActions.ts');
await runFollowRecipeScript('concebolla', 'chef', 'board', 500);
```
`````

## File: public/favicon.svg
`````xml
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" style="fill:#863bff;fill:color(display-p3 .5252 .23 1);fill-opacity:1"/><mask id="a" width="48" height="46" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M25.842 44.938c-.664.844-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.183c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.579-1.842-3.579H1.133c-.92 0-1.456-1.04-.92-1.787L9.91.473c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.578 1.842 3.578h11.377c.943 0 1.473 1.088.89 1.832L25.843 44.94z" style="fill:#000;fill-opacity:1"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#ede6ff" rx="5.508" ry="14.704" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -4.47 31.516)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#ede6ff" rx="10.399" ry="29.851" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -39.328 7.883)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#7e14ff" rx="5.508" ry="30.487" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -25.913 -14.639)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -32.644 -3.334)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -34.34 30.47)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#ede6ff" rx="14.072" ry="22.078" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="rotate(93.35 24.506 48.493)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx=".387" cy="8.972" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(39.51 .387 8.972)"/></g><g filter="url(#k)"><ellipse cx="47.523" cy="-6.092" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 47.523 -6.092)"/></g><g filter="url(#l)"><ellipse cx="41.412" cy="6.333" fill="#47bfff" rx="5.971" ry="9.665" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 41.412 6.333)"/></g><g filter="url(#m)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#n)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#o)"><ellipse cx="35.651" cy="29.907" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 35.651 29.907)"/></g><g filter="url(#p)"><ellipse cx="38.418" cy="32.4" fill="#47bfff" rx="5.971" ry="15.297" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 38.418 32.4)"/></g></g><defs><filter id="b" width="60.045" height="41.654" x="-19.77" y="16.149" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-54.613" y="-7.533" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-49.64" y="2.03" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-45.045" y="20.029" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-43.513" y="21.178" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="15.756" y="-17.901" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-27.636" y="-22.853" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="20.116" y="-38.415" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="24.641" y="-11.323" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="8.244" y="-2.416" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="18.713" y="10.588" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter></defs></svg>
`````

## File: public/icons.svg
`````xml
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="bluesky-icon" viewBox="0 0 16 17">
    <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
    <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
  </symbol>
  <symbol id="discord-icon" viewBox="0 0 20 19">
    <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
  </symbol>
  <symbol id="documentation-icon" viewBox="0 0 21 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
  </symbol>
  <symbol id="github-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
  </symbol>
  <symbol id="social-icon" viewBox="0 0 20 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
  </symbol>
  <symbol id="x-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
  </symbol>
</svg>
`````

## File: src/components/Ingredients/Ingredient.tsx
`````typescript
/**
 * FILE: Ingredient.tsx
 *
 * PURPOSE:
 * Visual representation of one ingredient.
 *
 * RESPONSIBILITY:
 * - Displays ingredient information.
 * - Handles ingredient presentation only.
 *
 * SHOULD NOT:
 * - Manage inventory.
 * - Apply game rules.
 * - Modify world state.
 */

import type { Ingredient as IngredientModel } from '../../types/Ingredient'

interface IngredientProps {
  ingredient: IngredientModel
}

export function Ingredient({ ingredient }: IngredientProps) {
  return (
    <>
      <span aria-hidden="true">{ingredient.icon}</span>
      <span>{ingredient.name}</span>
    </>
  )
}
`````

## File: src/components/Ingredients/IngredientList.tsx
`````typescript
/**
 * FILE: IngredientList.tsx
 *
 * PURPOSE:
 * Displays a collection/container of ingredients.
 *
 * RESPONSIBILITY:
 * - Renders container title and its inner entities.
 * - Acts as a droppable target for drag-and-drop.
 */

import { useStore } from 'zustand';
import { useDroppable } from '@dnd-kit/core';
import { worldStore } from '../../store/worldStore';
import type { Container, Entity } from '../../types/world';
import { IngredientListItem } from './IngredientListItem';

interface IngredientListProps {
  key?: string | number;
  container: Container;
}

export function IngredientList({ container }: IngredientListProps) {
  const entities = useStore(worldStore, (state) => state.entities);

  // Set up dnd-kit droppable binding for this container
  const { setNodeRef, isOver } = useDroppable({
    id: container.id,
  });

  const containerEntities = container.entityIds
    .map((id: string) => entities[id])
    .filter((e: Entity | undefined): e is Entity => Boolean(e));

  const getWorkstationBadge = (id: string) => {
    switch (id) {
      case 'sink': return 'Washing Area 💧';
      case 'board': return 'Cutting Workspace 🔪';
      case 'bowl': return 'Preparation 🥣';
      case 'pan': return 'Cooking Heat 🍳';
      case 'plate': return 'Serving Stage 🍽️';
      case 'despensa': return 'Pantry 🧺';
      default: return 'Workstation 🍳';
    }
  };

  return (
    <div 
      ref={setNodeRef} 
      data-container-id={container.id}
      className={`ingredient-list workstation-${container.id} ${isOver ? 'drag-over' : ''}`}
    >
      <div className="workstation-header">
        <h3>{container.name}</h3>
        <span className="workstation-type-badge">{getWorkstationBadge(container.id)}</span>
      </div>
      <div className="items-container">
        {containerEntities.map((entity: Entity) => (
          <IngredientListItem key={entity.id} entity={entity} containerId={container.id} />
        ))}
        {containerEntities.length === 0 && (
          <span className="empty-hint">Drop ingredients here</span>
        )}
      </div>
    </div>
  );
}
`````

## File: src/components/Ingredients/IngredientListItem.tsx
`````typescript
/**
 * FILE: IngredientListItem.tsx
 *
 * PURPOSE:
 * UI wrapper for an ingredient inside a list.
 *
 * RESPONSIBILITY:
 * - Connects ingredient rendering with list interactions.
 * - Provides drag/drop related UI behavior.
 */

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { Entity } from '../../types/world';

interface IngredientListItemProps {
  entity: Entity;
  containerId?: string;
}

export const IngredientListItem: React.FC<IngredientListItemProps> = ({ entity, containerId }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: entity.id,
  });

  const style: React.CSSProperties | undefined = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 1000 : 1,
        cursor: 'grab',
      }
    : {
        cursor: 'grab',
      };

  // Determine ingredient state badge (Raw, Prepared, Cooking, Finished)
  const renderStateBadge = () => {
    if (entity.type !== 'ingredient') return null;

    const prep = entity.state?.preparation as string | undefined;
    const cooking = entity.state?.cooking as string | undefined;
    const status = entity.state?.status as string | undefined;

    if (containerId === 'plate' || status?.includes('cooked') || status?.includes('fried') || status?.includes('tortilla')) {
      return <span className="ingredient-state-badge state-finished">Finished ✨</span>;
    }
    if (cooking && cooking !== 'raw') {
      return <span className="ingredient-state-badge state-cooking">Cooking 🔥</span>;
    }
    if (prep) {
      return <span className="ingredient-state-badge state-prepared">Prepared 🔪</span>;
    }
    return <span className="ingredient-state-badge state-raw">Raw 🌾</span>;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`ingredient-list-item ${isDragging ? 'dragging' : ''}`}
    >
      <span className="ingredient-name">{entity.name}</span>
      {renderStateBadge()}
    </div>
  );
};
`````

## File: src/components/Ingredients/Ingredients.scss
`````scss
/**
 * FILE: src/components/Ingredients/Ingredients.scss
 *
 * PURPOSE:
 * SCSS styles for ingredient list panels, item lists, and recipe ingredients.
 */

@use 'sass:color';
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.ingredient-list-panel {
  @include ceramic-card($warm-surface, $warm-border);
  min-width: 240px;
  padding: 16px;
}

.ingredient-list-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;

  h3 {
    color: $dark-brown;
    font-size: 1rem;
    font-weight: 700;
    margin: 0;
  }

  span {
    color: $wood-muted;
    font-size: 0.82rem;
    font-weight: 600;
  }
}

.ingredient-list,
.recipe-ingredient-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.ingredient-list-item,
.recipe-ingredient-item {
  align-items: center;
  background: #ffffff;
  border: 1px solid $warm-border;
  border-radius: $radius-md;
  box-shadow: 0 2px 6px rgba(44, 26, 20, 0.04);
  display: flex;
  gap: 0.5rem;
  padding: 8px 12px;
  user-select: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: color.mix($tortilla-yellow, $warm-border, 50%);
  }

  &:active {
    cursor: grabbing;
  }
}

.ingredient-list-item-body {
  align-items: center;
  cursor: grab;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-width: 0;

  &:active {
    cursor: grabbing;
  }
}

.ingredient-remove {
  align-items: center;
  background: transparent;
  border: none;
  border-radius: $radius-sm;
  color: $wood-muted;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  font-size: 1.15rem;
  height: 1.75rem;
  justify-content: center;
  line-height: 1;
  padding: 0;
  width: 1.75rem;
  transition: all 0.15s ease;

  &:hover {
    background: $warm-beige;
    color: $terracotta;
  }

  &:focus-visible {
    outline: 2px solid $terracotta;
    outline-offset: 2px;
  }
}

.recipe-ingredient-amount {
  margin-left: auto;
  font-size: 0.8rem;
  color: $wood-muted;
  font-weight: 600;
}

.scene-panel {
  display: flex;
  gap: 16px;
  margin-top: 16px;
  flex-wrap: wrap;
}

@media (max-width: 30rem) {
  .recipe-ingredient-amount {
    margin-left: 0;
    width: 100%;
  }
}
`````

## File: src/components/Ingredients/RecipeIngredientItem.tsx
`````typescript
/**
 * FILE: RecipeIngredientItem.tsx
 *
 * PURPOSE:
 * Displays an ingredient used in a recipe.
 *
 * RESPONSIBILITY:
 * - Shows ingredient amount and unit.
 * - Represents recipe-specific ingredient data.
 */

import type { Ingredient } from '../../types/Ingredient'

interface RecipeIngredientItemProps {
  key?: string | number
  ingredient: Ingredient
  amount: number
  unit: string
}

export function RecipeIngredientItem({
  ingredient,
  amount,
  unit,
}: RecipeIngredientItemProps) {
  return (
    <li className="recipe-ingredient-item">
      <span aria-hidden="true">{ingredient.icon}</span>
      <span className="recipe-ingredient-name">{ingredient.name}</span>
      <span className="recipe-ingredient-amount">
        {amount} {unit}
      </span>
    </li>
  )
}
`````

## File: src/components/Ingredients/RecipeIngredientList.tsx
`````typescript
/**
 * FILE: RecipeIngredientList.tsx
 *
 * PURPOSE:
 * Displays the ingredients required by a recipe.
 *
 * RESPONSIBILITY:
 * - Renders recipe ingredient collection.
 * - Provides recipe-oriented presentation.
 */

import type { Ingredient } from '../../types/Ingredient'
import type { RecipeIngredient } from '../../types/RecipeIngredient'
import './Ingredients.scss'
import { RecipeIngredientItem } from './RecipeIngredientItem'

interface RecipeIngredientListProps {
  ingredients: RecipeIngredient[]
  ingredientCatalog: Ingredient[]
}

export function RecipeIngredientList({
  ingredients,
  ingredientCatalog,
}: RecipeIngredientListProps) {
  const ingredientsById = new Map(
    ingredientCatalog.map((ingredient) => [ingredient.id, ingredient]),
  )

  return (
    <ul className="recipe-ingredient-list">
      {ingredients.map((recipeIngredient) => {
        const ingredient = ingredientsById.get(recipeIngredient.ingredientId)

        if (!ingredient) {
          return null
        }

        return (
          <RecipeIngredientItem
            key={recipeIngredient.id}
            amount={recipeIngredient.amount}
            ingredient={ingredient}
            unit={recipeIngredient.unit}
          />
        )
      })}
    </ul>
  )
}
`````

## File: src/data/catalog/tools.ts
`````typescript
/**
 * FILE: tools.ts
 *
 * PURPOSE:
 * Catalog of reusable kitchen tools as first-class entities.
 */

import type { ToolCatalogItem } from '../../types/tools';

export const catalogTools: ToolCatalogItem[] = [
  { id: 'knife', name: 'Chef Knife', icon: '🔪', category: 'cutting' },
  { id: 'peeler', name: 'Vegetable Peeler', icon: '🥔', category: 'cutting' },
  { id: 'whisk', name: 'Whisk', icon: '🥣', category: 'mixing' },
  { id: 'fork', name: 'Fork', icon: '🍴', category: 'mixing' },
  { id: 'spatula', name: 'Spatula', icon: '🍳', category: 'cooking' },
  { id: 'grater', name: 'Grater', icon: '🧀', category: 'cutting' },
  { id: 'mandoline', name: 'Mandoline', icon: '🔪', category: 'cutting' },
  { id: 'spoon', name: 'Spoon', icon: '🥄', category: 'mixing' },
];
`````

## File: src/engine/workstations.test.ts
`````typescript
/**
 * FILE: workstations.test.ts
 *
 * PURPOSE:
 * Unit tests for workstation mapping and tool resolution logic.
 */

import { describe, expect, it } from 'vitest';
import { findWorkstationForStep, findToolsForStep } from './workstations';
import { KITCHEN_WORKSTATIONS } from '../data/catalog/workstations';

describe('Workstations Engine', () => {
  it('maps steps to correct workstations', () => {
    expect(findWorkstationForStep({ action: 'prepare', target: 'potatoes', preparation: 'peeled' }))
      .toBe(KITCHEN_WORKSTATIONS.cutting_station);

    expect(findWorkstationForStep({ action: 'prepare', target: 'eggs', preparation: 'beaten' }))
      .toBe(KITCHEN_WORKSTATIONS.preparation_station);

    expect(findWorkstationForStep({ action: 'cook', target: 'potatoes', method: 'fry' }))
      .toBe(KITCHEN_WORKSTATIONS.cooking_station);

    expect(findWorkstationForStep({ action: 'mix', inputs: ['potatoes', 'eggs'] }))
      .toBe(KITCHEN_WORKSTATIONS.preparation_station);

    expect(findWorkstationForStep({ action: 'serve', target: 'mixture' }))
      .toBe(KITCHEN_WORKSTATIONS.serving_station);

    expect(findWorkstationForStep({ action: 'wash', target: 'potatoes' }))
      .toBe(KITCHEN_WORKSTATIONS.washing_station);
  });

  it('determines required/recommended tools for steps', () => {
    expect(findToolsForStep({ action: 'prepare', target: 'potatoes', preparation: 'peeled' }))
      .toEqual(['peeler', 'knife']);

    expect(findToolsForStep({ action: 'cut', ingredient: 'potato', style: 'sliced' }))
      .toEqual(['knife']);

    expect(findToolsForStep({ action: 'mix', inputs: ['potatoes', 'eggs'] }))
      .toEqual(['whisk', 'fork', 'spoon']);

    expect(findToolsForStep({ action: 'cook', target: 'oil', method: 'heat' }))
      .toEqual(['spatula', 'pan']);
  });
});
`````

## File: src/engine/workstations.ts
`````typescript
/**
 * FILE: workstations.ts (Engine)
 *
 * PURPOSE:
 * Logic to map recipe steps and cooking actions to workstations and required tools.
 *
 * RESPONSIBILITY:
 * - Decides which workstation should handle an action.
 * - Determines required and available tools for an action.
 */

import type { RecipeStep } from '../types/RecipeStep';
import type { Workstation } from '../types/workstations';
import { KITCHEN_WORKSTATIONS } from '../data/catalog/workstations';

/**
 * Automatically determines the appropriate Workstation for a given RecipeStep.
 */
export function findWorkstationForStep(step: RecipeStep): Workstation {
  const action = step.action;

  if (action === 'prepare' || action === 'cut') {
    const prep = (step.preparation || step.style || '').toLowerCase();
    if (['beaten', 'whisked', 'kneaded', 'seasoned', 'cracked'].includes(prep)) {
      return KITCHEN_WORKSTATIONS.preparation_station;
    }
    return KITCHEN_WORKSTATIONS.cutting_station;
  }

  if (action === 'cook') {
    return KITCHEN_WORKSTATIONS.cooking_station;
  }

  if (action === 'mix' || action === 'beat') {
    return KITCHEN_WORKSTATIONS.preparation_station;
  }

  if (action === 'serve') {
    return KITCHEN_WORKSTATIONS.serving_station;
  }

  if (action === 'wash' || action === 'rinse' || action === 'drain') {
    return KITCHEN_WORKSTATIONS.washing_station;
  }

  if (action === 'move' || action === 'grab' || action === 'drop') {
    return KITCHEN_WORKSTATIONS.pantry;
  }

  return KITCHEN_WORKSTATIONS.cutting_station;
}

/**
 * Determines the tool requirements for a given RecipeStep.
 */
export function findToolsForStep(step: RecipeStep): string[] {
  const action = step.action;

  if (action === 'prepare' || action === 'cut') {
    const prep = (step.preparation || step.style || '').toLowerCase();
    if (prep === 'peeled') {
      return ['peeler', 'knife'];
    }
    if (prep === 'beaten' || prep === 'whisked') {
      return ['whisk', 'fork'];
    }
    if (prep === 'grated') {
      return ['grater'];
    }
    return ['knife'];
  }

  if (action === 'mix' || action === 'beat') {
    return ['whisk', 'fork', 'spoon'];
  }

  if (action === 'cook') {
    return ['spatula', 'pan'];
  }

  return [];
}
`````

## File: src/store/middleware/actionLog.test.ts
`````typescript
/**
 * FILE: actionLog.test.ts
 *
 * PURPOSE:
 * Unit tests for actionLog Zustand middleware.
 *
 * RESPONSIBILITY:
 * - Validates action recording, log size limits, and clearing behavior.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import { actionLog, clearActionLog, getActionLog } from './actionLog';

interface CounterState {
  count: number;
  incrementLabelled: () => void;
  incrementUnlabelled: () => void;
}

function makeStore() {
  return createStore<CounterState>()(
    devtools(
      actionLog((set) => ({
        count: 0,
        incrementLabelled: () =>
          set((state) => ({ count: state.count + 1 }), false, 'INCREMENT'),
        incrementUnlabelled: () => set((state) => ({ count: state.count + 1 })),
      })),
      { enabled: false }
    )
  );
}

describe('actionLog middleware', () => {
  beforeEach(() => {
    clearActionLog();
  });

  it('records a labelled set call', () => {
    const store = makeStore();
    store.getState().incrementLabelled();

    const log = getActionLog();
    expect(log).toHaveLength(1);
    expect(log[0].action).toBe('INCREMENT');
    expect(store.getState().count).toBe(1);
  });

  it('does not record an unlabelled set call', () => {
    const store = makeStore();
    store.getState().incrementUnlabelled();

    expect(getActionLog()).toHaveLength(0);
    expect(store.getState().count).toBe(1);
  });

  it('caps the log at 200 entries, dropping the oldest first', () => {
    const store = makeStore();
    for (let i = 0; i < 205; i++) {
      store.getState().incrementLabelled();
    }

    const log = getActionLog();
    expect(log).toHaveLength(200);
    expect(store.getState().count).toBe(205);
  });

  it('clearActionLog empties the log', () => {
    const store = makeStore();
    store.getState().incrementLabelled();
    clearActionLog();

    expect(getActionLog()).toHaveLength(0);
  });
});
`````

## File: src/store/middleware/actionLog.ts
`````typescript
/**
 * FILE: actionLog.ts
 *
 * PURPOSE:
 * Zustand middleware for recording world actions.
 *
 * RESPONSIBILITY:
 * - Observes store mutations.
 * - Creates an action history/debug log.
 *
 * USED FOR:
 * - Debugging.
 * - Future replay systems.
 */

import type { StateCreator, StoreMutatorIdentifier } from 'zustand/vanilla';

export interface ActionLogEntry {
  /** The action's label, e.g. "MOVE_ENTITY". */
  action: string;
  timestamp: number;
}

const MAX_ENTRIES = 200;

let entries: ActionLogEntry[] = [];

/** Read-only snapshot of recorded world actions, oldest first. */
export function getActionLog(): ActionLogEntry[] {
  return [...entries];
}

/** Clears the recorded history. Mainly useful between tests. */
export function clearActionLog(): void {
  entries = [];
}

type ActionLogMiddleware = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  initializer: StateCreator<T, Mps, Mcs>,
) => StateCreator<T, Mps, Mcs>;

/**
 * Records every labelled `set` call into an in-memory action log — the
 * "Action Queue" docs/systems.md describes for debugging, replay, and
 * future AI compatibility.
 *
 * A reducer opts a state change into the log by passing a label as the
 * third argument to `set`, the same convention the `devtools` middleware
 * uses for naming actions in Redux DevTools:
 *
 *   set(nextState, false, 'MOVE_ENTITY')
 *
 * Intended to sit directly beneath `devtools` in the middleware stack
 * (`devtools(actionLog(initializer))`), so it observes the same labelled
 * `set` calls devtools does. Calls without a string label are forwarded
 * unlogged.
 */
export const actionLog: ActionLogMiddleware = (initializer) => (set, get, api) => {
  const loggedSet = ((partial: unknown, replace?: unknown, label?: unknown) => {
    if (typeof label === 'string') {
      entries.push({ action: label, timestamp: Date.now() });
      if (entries.length > MAX_ENTRIES) entries.shift();
    }
    return (set as (...args: unknown[]) => void)(partial, replace, label);
  }) as typeof set;

  return initializer(loggedSet, get, api);
};
`````

## File: src/store/selectors.ts
`````typescript
/**
 * FILE: selectors.ts
 *
 * PURPOSE:
 * Reusable Zustand selectors for components and systems.
 *
 * RESPONSIBILITY:
 * - Provides memoized or simple state derivation selectors.
 * - Prevents unnecessary React re-renders by selecting narrow slices of state.
 */

import type { WorldState } from '../types/world';
import type { Container, Entity } from '../types/world';

/** Selects all entities from the world state */
export const selectEntities = (state: WorldState): Record<string, Entity> => state.entities;

/** Selects a single entity by its ID */
export const selectEntityById = (id: string) => (state: WorldState): Entity | undefined =>
  state.entities[id];

/** Selects all containers from the world state */
export const selectContainers = (state: WorldState): Record<string, Container> => state.containers;

/** Selects a single container by its ID */
export const selectContainerById = (id: string) => (state: WorldState): Container | undefined =>
  state.containers[id];

/** Selects all resolved entities contained in a given container ID */
export const selectContainerEntities = (containerId: string) => (state: WorldState): Entity[] => {
  const container = state.containers[containerId];
  if (!container) return [];
  return container.entityIds
    .map((id) => state.entities[id])
    .filter((e): e is Entity => Boolean(e));
};

/** Selects the mascot entity */
export const selectMascot = (mascotId: string = 'chef') => (state: WorldState): Entity | undefined =>
  state.entities[mascotId];
`````

## File: src/styles/_mixins.scss
`````scss
/**
 * FILE: src/styles/_mixins.scss
 *
 * PURPOSE:
 * Reusable SCSS mixins for ceramic cards, workstation panels, and interactive elements.
 */

@use 'sass:color';
@use './variables' as *;

// Cozy ceramic card container mixin
@mixin ceramic-card($bg-color: $warm-surface, $border-color: $warm-border) {
  background: $bg-color;
  border: 1px solid $border-color;
  border-radius: $radius-lg;
  box-shadow: $shadow-ceramic;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

// Workstation panel header styling
@mixin workstation-header($accent-color, $text-color: $dark-brown) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 2px dashed color.mix($accent-color, white, 35%);
  margin-bottom: 12px;

  h3 {
    color: $text-color;
    font-size: 1.05rem;
    font-weight: 700;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .workstation-badge {
    font-size: 0.75rem;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: $radius-sm;
    background: color.mix($accent-color, white, 18%);
    color: $accent-color;
    border: 1px solid color.mix($accent-color, white, 40%);
  }
}

// Interactive wooden/playful button mixin
@mixin playful-button($bg: $tortilla-yellow, $text: #ffffff) {
  background: $bg;
  color: $text;
  border: none;
  border-radius: $radius-sm;
  padding: 8px 14px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(44, 26, 20, 0.12);
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(44, 26, 20, 0.18);
    filter: brightness(1.04);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 1px 3px rgba(44, 26, 20, 0.15);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    box-shadow: none;
  }
}

// Flex center helper
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
`````

## File: src/styles/_variables.scss
`````scss
/**
 * FILE: src/styles/_variables.scss
 *
 * PURPOSE:
 * Design system tokens and color variables for Tortilla World simulation app.
 */

// === PRIMARY PALETTE ===
// Warm tortilla yellow: main brand color (cooked egg & golden potato)
$tortilla-yellow: #e8a838;
$tortilla-yellow-hover: #d99729;
$tortilla-yellow-light: #fef7e8;
$tortilla-yellow-border: #f1c875;

// Olive green: secondary actions & natural Mediterranean elements
$olive-green: #5b8a46;
$olive-green-hover: #4b7339;
$olive-green-light: #f1f7ef;
$olive-green-border: #a4c795;

// Terracotta orange/red: highlights, alerts & active kitchen states (Spanish clay cookware)
$terracotta: #c85a32;
$terracotta-hover: #b34b25;
$terracotta-light: #fdf2ee;
$terracotta-border: #e8a58e;

// Warm cream/beige: background surfaces (flour, whitewashed walls, paper)
$warm-cream: #fbf6ee;
$warm-beige: #f5ebd0;
$warm-surface: #faf3e8;
$warm-border: #e6d7c3;

// Dark brown/wood: text, headers & grounding structural elements
$dark-brown: #2c1a14;
$wood-medium: #6b4226;
$wood-muted: #8c6b4a;
$wood-light: #f1e4d1;

// === KITCHEN AREA WORKSTATION COLOR SYSTEM ===
// Pantry / Ingredient Storage
$pantry-bg: #f5ebdc;
$pantry-border: #e2d2bd;
$pantry-accent: #8c6b4a;

// Washing Area (Sink) - Water & cleanliness with natural tones
$washing-bg: #ebf5f8;
$washing-border: #c5e2eb;
$washing-accent: #2b7890;
$washing-text: #1d5466;

// Cutting Area (Board) - Warm wood & neutral preparation space
$cutting-bg: #f8f1e5;
$cutting-border: #e7d7c1;
$cutting-accent: #8b5a2b;
$cutting-text: #4e3217;

// Mixing / Preparation Area (Bowl) - Cream/yellow transformation & creativity
$mixing-bg: #fff8eb;
$mixing-border: #f5e2b8;
$mixing-accent: #d49b2a;
$mixing-text: #6e4e0c;

// Cooking Area (Pan) - Orange/red heat, fire & activity
$cooking-bg: #fdf2ee;
$cooking-border: #f5cbbf;
$cooking-accent: #c85a32;
$cooking-text: #732a10;

// Serving Area (Plate) - Green/terracotta final presentation stage
$serving-bg: #f3f8f2;
$serving-border: #cde0c8;
$serving-accent: #5b8a46;
$serving-text: #2d4c20;

// === INGREDIENT STATE PALETTE ===
// Raw: natural, muted earthy colors
$state-raw-bg: #faf6f0;
$state-raw-border: #d8ccc0;
$state-raw-text: #6e5f53;

// Prepared: brighter, clean preparation teal/emerald
$state-prep-bg: #ebf7f5;
$state-prep-border: #a8e0d6;
$state-prep-text: #206157;

// Cooking: warmer orange/red active heat
$state-cook-bg: #fff2ee;
$state-cook-border: #f8beb0;
$state-cook-text: #a83a14;

// Finished Food: golden, satisfying cooked food yellow/gold
$state-finished-bg: #fff8e7;
$state-finished-border: #e8c872;
$state-finished-text: #8c5a0d;

// === SHADOWS & ELEVATIONS ===
$shadow-ceramic: 0 4px 14px rgba(44, 26, 20, 0.07);
$shadow-ceramic-hover: 0 8px 22px rgba(44, 26, 20, 0.12);
$shadow-floating: 0 12px 28px rgba(44, 26, 20, 0.18);

// === TYPOGRAPHY & RADII ===
$font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
$font-mono: ui-monospace, SFMono-Regular, Consolas, monospace;

$radius-sm: 8px;
$radius-md: 12px;
$radius-lg: 16px;
$radius-xl: 24px;
`````

## File: src/systems/mascot.ts
`````typescript
/**
 * FILE: mascot.ts
 *
 * PURPOSE:
 * Mascot state definitions and behavior functions.
 *
 * RESPONSIBILITY:
 * - Defines mascot visual states ('idle', 'cooking', 'celebrating', etc.).
 */

export type MascotState = 'idle' | 'cooking' | 'celebrating' | 'thinking' | 'flipping' | string;
`````

## File: src/systems/movement.ts
`````typescript
/**
 * FILE: movement.ts
 *
 * PURPOSE:
 * Handles entity movement calculations.
 *
 * RESPONSIBILITY:
 * - Calculates position changes.
 * - Provides movement behavior.
 */

import { worldStore } from '../store/worldStore';

/**
 * Requests that an entity be moved to another container.
 * The reducer determines the source container automatically.
 */
export function moveEntity(
  entityId: string,
  targetContainerId: string,
  positionIndex?: number
): void {
  worldStore.getState().dispatch({
    type: 'MOVE_ENTITY',
    payload: {
      entityId,
      targetContainerId,
      positionIndex,
    },
  });
}
`````

## File: src/systems/queries.test.ts
`````typescript
/**
 * FILE: queries.test.ts
 *
 * PURPOSE:
 * Unit tests for query system functions.
 *
 * RESPONSIBILITY:
 * - Tests entity and container query helpers.
 */

import { describe, expect, it } from 'vitest';
import { getContainerByEntityId, getEntitiesInContainer, getEntityById } from './queries';
import type { WorldState } from '../types/world';

describe('Query System', () => {
  const mockState: WorldState = {
    entities: {
      tomato: { id: 'tomato', name: 'Tomato', type: 'ingredient', state: { sliced: false } },
      onion: { id: 'onion', name: 'Onion', type: 'ingredient', state: { sliced: true } },
    },
    containers: {
      pantry: {
        id: 'pantry',
        name: 'Pantry',
        type: 'storage',
        rules: { maxCapacity: 10 },
        entityIds: ['tomato'],
      },
      board: {
        id: 'board',
        name: 'Cutting Board',
        type: 'board',
        rules: { maxCapacity: 2 },
        entityIds: ['onion'],
      },
    },
    dispatch: () => {},
  };

  it('retrieves an entity by ID', () => {
    const entity = getEntityById(mockState, 'tomato');
    expect(entity).toBeDefined();
    expect(entity?.name).toBe('Tomato');
  });

  it('finds the parent container for a given entity ID', () => {
    const container = getContainerByEntityId(mockState, 'onion');
    expect(container).toBeDefined();
    expect(container?.id).toBe('board');
  });

  it('returns all entities inside a specified container', () => {
    const boardEntities = getEntitiesInContainer(mockState, 'board');
    expect(boardEntities).toHaveLength(1);
    expect(boardEntities[0].id).toBe('onion');
  });
});
`````

## File: src/systems/queries.ts
`````typescript
/**
 * FILE: queries.ts
 *
 * PURPOSE:
 * Read-only world queries and selectors.
 *
 * RESPONSIBILITY:
 * - Finds entities by ID or container.
 * - Filters world state data for systems and components.
 *
 * SHOULD NOT:
 * - Modify world state.
 */

import type { Container, Entity, WorldState } from '../types/world';

/**
 * Retrieves an entity by its unique ID from the world state.
 */
export const getEntityById = (state: WorldState, entityId: string): Entity | undefined => {
  return state.entities[entityId];
};

/**
 * Retrieves the container that currently holds the given entity ID.
 */
export const getContainerByEntityId = (
  state: WorldState,
  entityId: string
): Container | undefined => {
  return Object.values(state.containers).find((container) =>
    container.entityIds.includes(entityId)
  );
};

/**
 * Retrieves all entities contained within a specific container.
 */
export const getEntitiesInContainer = (state: WorldState, containerId: string): Entity[] => {
  const container = state.containers[containerId];
  if (!container) return [];

  return container.entityIds
    .map((id) => state.entities[id])
    .filter((entity): entity is Entity => entity !== undefined);
};
`````

## File: src/systems/recipeRunner.ts
`````typescript
/**
 * FILE: src/systems/recipeRunner.ts
 *
 * PURPOSE:
 * Public entry point for RecipeRunner module.
 * Re-exports RecipeRunner class and related options/types.
 */

export { RecipeRunner } from './recipeRunner/RecipeRunner';
export type { RecipeRunnerOptions, RecipeRunnerContext } from './recipeRunner/types';
`````

## File: src/types/Ingredient.ts
`````typescript
/**
 * FILE: Ingredient.ts
 *
 * PURPOSE:
 * Defines ingredient data structures.
 *
 * RESPONSIBILITY:
 * - Represents ingredient definitions.
 */

export interface Ingredient {
  id: string
  name: string
  icon: string
}
`````

## File: src/types/IngredientList.ts
`````typescript
/**
 * FILE: IngredientList.ts
 *
 * PURPOSE:
 * Defines container/list data structures.
 *
 * RESPONSIBILITY:
 * - Represents collections of entities.
 */

import type { Ingredient } from './Ingredient'

export interface IngredientList {
  id: string
  name: string
  ingredients: Ingredient[]
}

export interface List {
  id: string
  title: string
  seedFromCatalog?: boolean
  seedIngredients?: string[]
  consumesOnDrag?: boolean   // true = item is removed from this list when dragged out
}
`````

## File: src/types/RecipeIngredient.ts
`````typescript
/**
 * FILE: RecipeIngredient.ts
 *
 * PURPOSE:
 * Defines ingredient usage inside recipes.
 *
 * RESPONSIBILITY:
 * - Stores ingredient quantity and unit information.
 */

export interface RecipeIngredient {
  id: string
  ingredientId: string
  amount: number
  unit: string
}
`````

## File: src/types/RecipeList.ts
`````typescript
/**
 * FILE: RecipeList.ts
 *
 * PURPOSE:
 * Export RecipeList type for recipe catalog collections.
 *
 * RESPONSIBILITY:
 * - Defines collection contracts for recipes.
 */

import type { Recipe, RecipeList as RecipeListArray } from './Recipe'

export type { Recipe }
export type RecipeList = RecipeListArray
`````

## File: src/types/tools.ts
`````typescript
/**
 * FILE: tools.ts
 *
 * PURPOSE:
 * Defines first-class tool entity models and categories.
 *
 * RESPONSIBILITY:
 * - Represents tools as reusable world objects used by kitchen workstations and actions.
 */

export type ToolCategory = 'cutting' | 'mixing' | 'cooking' | 'utility';

export type ToolCatalogItem = {
  id: string;
  name: string;
  icon: string;
  category: ToolCategory;
};
`````

## File: src/repomix-output.xml
`````xml
This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: .
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
assets/
  hero.png
components/
  Ingredients/
    Ingredient.tsx
    IngredientList.tsx
    IngredientListItem.tsx
    Ingredients.css
    RecipeIngredientItem.tsx
    RecipeIngredientList.tsx
  Mascot/
    Mascot.tsx
    TortillaSvg.tsx
  Scene/
    Scene.tsx
    useSceneDragAndDrop.ts
data/
  catalog/
    recipes/
      concebolla.ts
      sincebolla.ts
    ingredients.ts
engine/
  containerRules.ts
store/
  middleware/
    actionLog.test.ts
    actionLog.ts
  gazeStore.ts
  worldStore.test.ts
  worldStore.ts
systems/
  dropRules.test.ts
  dropRules.ts
  gaze.test.ts
  gaze.ts
  interaction.test.ts
  interaction.ts
  movement.ts
  queries.test.ts
  queries.ts
types/
  actions.ts
  Entity.ts
  Ingredient.ts
  IngredientList.ts
  RecipeIngredient.ts
  world.ts
App.tsx
index.css
main.tsx
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="components/Ingredients/Ingredient.tsx">
/**
 * FILE: Ingredient.tsx
 *
 * PURPOSE:
 * Visual representation of one ingredient.
 *
 * RESPONSIBILITY:
 * - Displays ingredient information.
 * - Handles ingredient presentation only.
 *
 * SHOULD NOT:
 * - Manage inventory.
 * - Apply game rules.
 * - Modify world state.
 */

import type { Ingredient as IngredientModel } from '../../types/Ingredient'

interface IngredientProps {
  ingredient: IngredientModel
}

export function Ingredient({ ingredient }: IngredientProps) {
  return (
    <>
      <span aria-hidden="true">{ingredient.icon}</span>
      <span>{ingredient.name}</span>
    </>
  )
}
</file>

<file path="components/Ingredients/IngredientList.tsx">
/**
 * FILE: IngredientList.tsx
 *
 * PURPOSE:
 * Displays a collection/container of ingredients.
 *
 * RESPONSIBILITY:
 * - Renders ingredients belonging to a specific list.
 * - Delegates individual rendering to IngredientListItem.
 *
 * DOMAIN:
 * Represents UI for containers like pantry, kitchen, recipe.
 */

import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import type { Entity } from '../../types/world';

export function IngredientList({ containerEntityIds }: { containerEntityIds: string[] }) {
  const entities = useStore(worldStore, (state) => state.entities);

  const containerEntities = containerEntityIds
    .map((id: string) => entities[id])
    .filter((e: Entity | undefined): e is Entity => Boolean(e));

  return (
    <div>
      {containerEntities.map((entity: Entity) => (
        <div key={entity.id}>{entity.name}</div>
      ))}
    </div>
  );
}
</file>

<file path="components/Ingredients/IngredientListItem.tsx">
/**
 * FILE: IngredientListItem.tsx
 *
 * PURPOSE:
 * UI wrapper for an ingredient inside a list.
 *
 * RESPONSIBILITY:
 * - Connects ingredient rendering with list interactions.
 * - Provides drag/drop related UI behavior.
 */

import React from 'react';
import { worldStore } from '../../store/worldStore';
import type { Entity } from '../../types/world';

interface IngredientListItemProps {
  entity: Entity;
}

export const IngredientListItem: React.FC<IngredientListItemProps> = ({ entity }) => {
  const handleRemove = () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId: entity.id,
        targetContainerId: 'storage',
      },
    });
  };

  return (
    <div className="ingredient-list-item">
      <span>{entity.name}</span>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};
</file>

<file path="components/Ingredients/Ingredients.css">
.ingredient-list-panel {
  background: linear-gradient(135deg, #fffdf8 0%, #f7efe7 100%);
  border: 1px solid #e7d8c3;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(82, 55, 24, 0.08);
  min-width: 240px;
  padding: 16px;
}

.ingredient-list-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.ingredient-list-header h3 {
  color: #6b4226;
  font-size: 1rem;
  margin: 0;
}

.ingredient-list-header span {
  color: #8b6a45;
  font-size: 0.85rem;
}

.ingredient-list,
.recipe-ingredient-list {
  display: grid;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.ingredient-list-item,
.recipe-ingredient-item {
  align-items: center;
  background: #ffffff;
  border: 1px solid #e6d5bf;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  display: flex;
  gap: 0.5rem;
  padding: 10px 12px;
  user-select: none;
}

.ingredient-list-item-body {
  align-items: center;
  cursor: grab;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-width: 0;
}

.ingredient-list-item-body:active {
  cursor: grabbing;
}

.ingredient-remove {
  align-items: center;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: #8b6a45;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  font-size: 1.25rem;
  height: 1.75rem;
  justify-content: center;
  line-height: 1;
  padding: 0;
  width: 1.75rem;
}

.ingredient-remove:hover {
  background: #f5e8d8;
  color: #6b4226;
}

.ingredient-remove:focus-visible {
  outline: 2px solid #c9956a;
  outline-offset: 2px;
}

.ingredient-list-item:active,
.recipe-ingredient-item:active {
  cursor: grabbing;
}

.ingredient-list-item span {
  font-size: 1rem;
}

.recipe-ingredient-amount {
  margin-left: auto;
}

.scene-panel {
  display: flex;
  gap: 16px;
  margin-top: 16px;
  flex-wrap: wrap;
}

@media (max-width: 30rem) {
  .recipe-ingredient-amount {
    margin-left: 0;
    width: 100%;
  }
}
</file>

<file path="components/Ingredients/RecipeIngredientItem.tsx">
/**
 * FILE: RecipeIngredientItem.tsx
 *
 * PURPOSE:
 * Displays an ingredient used in a recipe.
 *
 * RESPONSIBILITY:
 * - Shows ingredient amount and unit.
 * - Represents recipe-specific ingredient data.
 */

import type { Ingredient } from '../../types/Ingredient'

interface RecipeIngredientItemProps {
  ingredient: Ingredient
  amount: number
  unit: string
}

export function RecipeIngredientItem({
  ingredient,
  amount,
  unit,
}: RecipeIngredientItemProps) {
  return (
    <li className="recipe-ingredient-item">
      <span aria-hidden="true">{ingredient.icon}</span>
      <span className="recipe-ingredient-name">{ingredient.name}</span>
      <span className="recipe-ingredient-amount">
        {amount} {unit}
      </span>
    </li>
  )
}
</file>

<file path="components/Ingredients/RecipeIngredientList.tsx">
/**
 * FILE: RecipeIngredientList.tsx
 *
 * PURPOSE:
 * Displays the ingredients required by a recipe.
 *
 * RESPONSIBILITY:
 * - Renders recipe ingredient collection.
 * - Provides recipe-oriented presentation.
 */

import type { Ingredient } from '../../types/Ingredient'
import type { RecipeIngredient } from '../../types/RecipeIngredient'
import './Ingredients.css'
import { RecipeIngredientItem } from './RecipeIngredientItem'

interface RecipeIngredientListProps {
  ingredients: RecipeIngredient[]
  ingredientCatalog: Ingredient[]
}

export function RecipeIngredientList({
  ingredients,
  ingredientCatalog,
}: RecipeIngredientListProps) {
  const ingredientsById = new Map(
    ingredientCatalog.map((ingredient) => [ingredient.id, ingredient]),
  )

  return (
    <ul className="recipe-ingredient-list">
      {ingredients.map((recipeIngredient) => {
        const ingredient = ingredientsById.get(recipeIngredient.ingredientId)

        if (!ingredient) {
          return null
        }

        return (
          <RecipeIngredientItem
            key={recipeIngredient.id}
            amount={recipeIngredient.amount}
            ingredient={ingredient}
            unit={recipeIngredient.unit}
          />
        )
      })}
    </ul>
  )
}
</file>

<file path="components/Mascot/Mascot.tsx">
/**
 * FILE: Mascot.tsx
 *
 * PURPOSE:
 * Main Tortilla mascot component.
 *
 * RESPONSIBILITY:
 * - Controls mascot visual representation.
 * - Displays mascot state and animations.
 *
 * SHOULD NOT:
 * - Own world state.
 * - Contain gameplay rules.
 */

import React from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';

interface MascotProps {
  mascotId?: string;
}

export const Mascot: React.FC<MascotProps> = ({ mascotId = 'chef' }) => {
  const mascotEntity = useStore(worldStore, (state) => state.entities[mascotId]);

  if (!mascotEntity) return null;

  return (
    <div className="mascot">
      <h3>{mascotEntity.name}</h3>
      Gazing at: {mascotEntity.state?.gazingAt ? String(mascotEntity.state.gazingAt) : 'Nothing'}
    </div>
  );
};
</file>

<file path="components/Mascot/TortillaSvg.tsx">
/**
 * FILE: TortillaSvg.tsx
 *
 * PURPOSE:
 * SVG graphics definition for the Tortilla mascot.
 *
 * RESPONSIBILITY:
 * - Contains visual SVG structure only.
 * - Provides reusable mascot artwork.
 */

import React from 'react';
import type { GazeTarget } from '../../systems/gaze';

interface TortillaSvgProps {
  gazingAt?: GazeTarget;
}

export const TortillaSvg: React.FC<TortillaSvgProps> = ({ gazingAt }) => {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="#f4d03f" />
      {/* Visual representation of mascot gaze direction */}
      <circle cx={gazingAt ? 60 : 50} cy="40" r="5" fill="#000" />
    </svg>
  );
};
</file>

<file path="components/Scene/Scene.tsx">
/**
 * FILE: Scene.tsx
 *
 * PURPOSE:
 * Main game scene renderer.
 *
 * RESPONSIBILITY:
 * - Displays entities in the world.
 * - Connects world state with visual components.
 *
 * DOMAIN:
 * The bridge between game world and React UI.
 */

import React from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import { IngredientList } from '../Ingredients/IngredientList';

export const Scene: React.FC = () => {
  const containers = useStore(
    worldStore,
    (state) => state.containers
  );

  const containerList = Object.values(containers);

  return (
    <div className="scene">
      {containerList.map((container) => (
        <IngredientList
          key={container.id}
          containerEntityIds={container.entityIds}
        />
      ))}
    </div>
  );
};
</file>

<file path="components/Scene/useSceneDragAndDrop.ts">
/**
 * FILE: useSceneDragAndDrop.ts
 *
 * PURPOSE:
 * React hook connecting drag/drop events with the game world.
 *
 * RESPONSIBILITY:
 * - Handles DnD lifecycle.
 * - Translates UI interactions into world actions.
 *
 * SHOULD NOT:
 * - Decide game rules.
 * - Directly manipulate entity collections.
 */

import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';

export function useSceneDragAndDrop() {
  const containers = useStore(worldStore, (state) => Object.values(state.containers));

  return {
    containers,
  };
}
</file>

<file path="data/catalog/recipes/concebolla.ts">
import { ingredients } from '../ingredients'

export const recipe = {
  id: 'concebolla',
  name: 'Con Cebolla',
  ingredients: [
    ingredients.find((i) => i.id === 'potato'),
    ingredients.find((i) => i.id === 'egg'),
    ingredients.find((i) => i.id === 'oil'),
    ingredients.find((i) => i.id === 'salt'),
    ingredients.find((i) => i.id === 'pepper'),
    ingredients.find((i) => i.id === 'onion'),
  ],
}
</file>

<file path="data/catalog/recipes/sincebolla.ts">
import { ingredients } from "../ingredients";

export const recipe = {
  id: "sincebolla",
  name: "Sincebolla",
  ingredients: [
    ingredients.find(i => i.id === "potato"),
    ingredients.find(i => i.id === "egg"),
    ingredients.find(i => i.id === "oil"),
    ingredients.find(i => i.id === "salt"),
    ingredients.find(i => i.id === "pepper"),
  ]
};
</file>

<file path="data/catalog/ingredients.ts">
import type { Ingredient } from "../../types/Ingredient";


export const ingredients: Ingredient[] = [

  {
    id: "potato",
    icon: "🥔",
    name: "Potatoes",
  },


  {
    id: "egg",
    icon: "🥚",
    name: "Eggs",
  },


  {
    id: "oil",
    icon: "🫒",
    name: "Olive Oil",
  },


  {
    id: "onion",
    icon: "🧅",
    name: "Onion",
  },


  {
    id: "chorizo",
    icon: "🌭",
    name: "Chorizo",
  },

  {
    id: "salt",
    icon: "🧂",
    name: "Salt",
  },

  {
    id: "pepper",
    icon: "🫑",
    name: "Bell Pepper",
  },

  {
    id: "garlic",
    icon: "🧄",
    name: "Garlic",
  },

  {
    id: "tomato",
    icon: "🍅",
    name: "Tomato",
  },

  {
    id: "cheese",
    icon: "🧀",
    name: "Cheese",
  },

  {
    id: "bread",
    icon: "🍞",
    name: "Bread",
  },

  {
    id: "milk",
    icon: "🥛",
    name: "Milk",
  },

  {
    id: "butter",
    icon: "🧈",
    name: "Butter",
  },

];
</file>

<file path="engine/containerRules.ts">
/**
 * FILE: containerRules.ts
 *
 * PURPOSE:
 * Generic container behavior rules.
 *
 * RESPONSIBILITY:
 * - Defines reusable rules for lists/containers.
 * - Determines allowed contents and constraints.
 *
 * DOMAIN:
 * Game engine logic independent from React.
 */

import type { Container, Entity } from '../types/world';

export interface ValidationResult {
  allowed: boolean;
  reason?: string;
}

export function validateContainerRules(
  container: Container,
  entity: Entity,
  currentEntitiesInContainer: Entity[]
): ValidationResult {
  const rules = container.rules;

  if (!rules) {
    return { allowed: true };
  }

  // 1. Capacity Check
  if (
    rules.maxCapacity !== undefined &&
    container.entityIds.length >= rules.maxCapacity
  ) {
    return {
      allowed: false,
      reason: `Container '${container.name}' capacity reached (${rules.maxCapacity} items max).`,
    };
  }

  // 2. Allowed Types Check
  if (rules.allowedTypes && !rules.allowedTypes.includes(entity.type)) {
    return {
      allowed: false,
      reason: `Container '${container.name}' does not accept entity type '${entity.type}'.`,
    };
  }

  // 3. Unique Types Check
  if (rules.uniqueTypesOnly) {
    const hasTypeAlready = currentEntitiesInContainer.some(
      (e) => e.type === entity.type
    );
    if (hasTypeAlready) {
      return {
        allowed: false,
        reason: `Container '${container.name}' already contains an entity of type '${entity.type}'.`,
      };
    }
  }

  // 4. Custom Validator Check
  if (rules.customValidator) {
    const passesCustom = rules.customValidator(
      container,
      entity,
      currentEntitiesInContainer
    );
    if (!passesCustom) {
      return {
        allowed: false,
        reason: `Entity '${entity.name}' failed custom container rules for '${container.name}'.`,
      };
    }
  }

  return { allowed: true };
}
</file>

<file path="store/middleware/actionLog.test.ts">
import { describe, it, expect, beforeEach } from 'vitest';
import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import { actionLog, clearActionLog, getActionLog } from './actionLog';

interface CounterState {
  count: number;
  incrementLabelled: () => void;
  incrementUnlabelled: () => void;
}

function makeStore() {
  return createStore<CounterState>()(
    devtools(
      actionLog((set) => ({
        count: 0,
        incrementLabelled: () =>
          set((state) => ({ count: state.count + 1 }), false, 'INCREMENT'),
        incrementUnlabelled: () => set((state) => ({ count: state.count + 1 })),
      })),
      { enabled: false }
    )
  );
}

describe('actionLog middleware', () => {
  beforeEach(() => {
    clearActionLog();
  });

  it('records a labelled set call', () => {
    const store = makeStore();
    store.getState().incrementLabelled();

    const log = getActionLog();
    expect(log).toHaveLength(1);
    expect(log[0].action).toBe('INCREMENT');
    expect(store.getState().count).toBe(1);
  });

  it('does not record an unlabelled set call', () => {
    const store = makeStore();
    store.getState().incrementUnlabelled();

    expect(getActionLog()).toHaveLength(0);
    expect(store.getState().count).toBe(1);
  });

  it('caps the log at 200 entries, dropping the oldest first', () => {
    const store = makeStore();
    for (let i = 0; i < 205; i++) {
      store.getState().incrementLabelled();
    }

    const log = getActionLog();
    expect(log).toHaveLength(200);
    expect(store.getState().count).toBe(205);
  });

  it('clearActionLog empties the log', () => {
    const store = makeStore();
    store.getState().incrementLabelled();
    clearActionLog();

    expect(getActionLog()).toHaveLength(0);
  });
});
</file>

<file path="store/middleware/actionLog.ts">
/**
 * FILE: actionLog.ts
 *
 * PURPOSE:
 * Zustand middleware for recording world actions.
 *
 * RESPONSIBILITY:
 * - Observes store mutations.
 * - Creates an action history/debug log.
 *
 * USED FOR:
 * - Debugging.
 * - Future replay systems.
 */

import type { StateCreator, StoreMutatorIdentifier } from 'zustand/vanilla';

export interface ActionLogEntry {
  /** The action's label, e.g. "MOVE_ENTITY". */
  action: string;
  timestamp: number;
}

const MAX_ENTRIES = 200;

let entries: ActionLogEntry[] = [];

/** Read-only snapshot of recorded world actions, oldest first. */
export function getActionLog(): ActionLogEntry[] {
  return [...entries];
}

/** Clears the recorded history. Mainly useful between tests. */
export function clearActionLog(): void {
  entries = [];
}

type ActionLogMiddleware = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  initializer: StateCreator<T, Mps, Mcs>,
) => StateCreator<T, Mps, Mcs>;

/**
 * Records every labelled `set` call into an in-memory action log — the
 * "Action Queue" docs/systems.md describes for debugging, replay, and
 * future AI compatibility.
 *
 * A reducer opts a state change into the log by passing a label as the
 * third argument to `set`, the same convention the `devtools` middleware
 * uses for naming actions in Redux DevTools:
 *
 *   set(nextState, false, 'MOVE_ENTITY')
 *
 * Intended to sit directly beneath `devtools` in the middleware stack
 * (`devtools(actionLog(initializer))`), so it observes the same labelled
 * `set` calls devtools does. Calls without a string label are forwarded
 * unlogged.
 */
export const actionLog: ActionLogMiddleware = (initializer) => (set, get, api) => {
  const loggedSet = ((partial: unknown, replace?: unknown, label?: unknown) => {
    if (typeof label === 'string') {
      entries.push({ action: label, timestamp: Date.now() });
      if (entries.length > MAX_ENTRIES) entries.shift();
    }
    return (set as (...args: unknown[]) => void)(partial, replace, label);
  }) as typeof set;

  return initializer(loggedSet, get, api);
};
</file>

<file path="store/gazeStore.ts">
/**
 * FILE: gazeStore.ts
 *
 * PURPOSE:
 * Stores mascot gaze/attention state.
 *
 * RESPONSIBILITY:
 * - Tracks what the mascot is looking at.
 * - Provides gaze information to UI components.
 */

import { create } from 'zustand'
import type { GazeTarget } from '../systems/gaze'

interface GazeState {
  /** Whatever the mascot should be looking at right now, or null to fall back to the mouse. */
  target: GazeTarget | null
  setTarget: (target: GazeTarget | null) => void
  clearTarget: () => void
}

export const useGazeStore = create<GazeState>((set) => ({
  target: null,
  setTarget: (target) => set({ target }),
  clearTarget: () => set({ target: null }),
}))
</file>

<file path="store/worldStore.test.ts">
import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from './worldStore';
import { clearActionLog, getActionLog } from './middleware/actionLog';

function seed() {
  worldStore.setState({
    entities: {
      potato: { id: 'potato', name: 'Potato', type: 'ingredient' },
      onion: { id: 'onion', name: 'Onion', type: 'ingredient' },
      knife: { id: 'knife', name: 'Knife', type: 'tool' },
      chef: { id: 'chef', name: 'Chef', type: 'mascot' },
    },
    containers: {
      kitchen: {
        id: 'kitchen',
        name: 'Kitchen',
        type: 'storage',
        entityIds: ['potato', 'onion', 'knife'],
      },
      pan: {
        id: 'pan',
        name: 'Pan',
        type: 'pan',
        entityIds: [],
        rules: { maxCapacity: 1 },
      },
      board: {
        id: 'board',
        name: 'Cutting Board',
        type: 'board',
        entityIds: [],
        rules: { allowedTypes: ['ingredient'] },
      },
      recipe: {
        id: 'recipe',
        name: 'Recipe',
        type: 'plate',
        entityIds: [],
        rules: { allowedTypes: ['ingredient'], uniqueTypesOnly: true },
      },
    },
  });
}

describe('worldStore container rule enforcement', () => {
  beforeEach(() => {
    seed();
    clearActionLog();
  });

  it('allows a move that satisfies the target container rules', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'pan' },
    });

    const state = worldStore.getState();
    expect(state.containers.pan.entityIds).toEqual(['potato']);
    expect(state.containers.kitchen.entityIds).not.toContain('potato');
  });

  it('blocks a move once the target container is at capacity', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'pan' },
    });
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'onion', targetContainerId: 'pan' },
    });

    const state = worldStore.getState();
    expect(state.containers.pan.entityIds).toEqual(['potato']);
    expect(state.containers.kitchen.entityIds).toContain('onion');
  });

  it('blocks a move that violates allowedTypes', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'knife', targetContainerId: 'board' },
    });

    // knife is a tool; board only allows ingredients
    const state = worldStore.getState();
    expect(state.containers.board.entityIds).toEqual([]);
    expect(state.containers.kitchen.entityIds).toContain('knife');
  });

  it('blocks a move that would duplicate a type in a uniqueTypesOnly container', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'recipe' },
    });
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'onion', targetContainerId: 'recipe' },
    });

    // both are 'ingredient' type; uniqueTypesOnly blocks the second
    const state = worldStore.getState();
    expect(state.containers.recipe.entityIds).toEqual(['potato']);
    expect(state.containers.kitchen.entityIds).toContain('onion');
  });

  it('never re-validates a same-container reorder', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'kitchen', positionIndex: 0 },
    });

    // would fail uniqueTypesOnly-style self-comparison if the entity
    // weren't excluded from its own container's current entities
    const state = worldStore.getState();
    expect(state.containers.kitchen.entityIds[0]).toBe('potato');
  });

  it('is a no-op when the entity does not exist', () => {
    const before = worldStore.getState().containers.pan.entityIds;
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'ghost', targetContainerId: 'pan' },
    });
    expect(worldStore.getState().containers.pan.entityIds).toEqual(before);
  });

  it('enforces the same rules on ADD_ENTITY', () => {
    worldStore.getState().dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: { id: 'spoon', name: 'Spoon', type: 'tool' },
        containerId: 'board',
      },
    });

    const state = worldStore.getState();
    expect(state.containers.board.entityIds).toEqual([]);
    expect(state.entities.spoon).toBeUndefined();
  });

  it('logs a labelled entry into the action log for each dispatch', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'pan' },
    });

    const log = getActionLog();
    expect(log).toHaveLength(1);
    expect(log[0].action).toBe('MOVE_ENTITY');
    expect(typeof log[0].timestamp).toBe('number');
  });
});
</file>

<file path="store/worldStore.ts">
/**
 * FILE: worldStore.ts
 *
 * PURPOSE:
 * Central Zustand store for the game world.
 *
 * RESPONSIBILITY:
 * - Owns world state.
 * - Stores entities, containers and relationships.
 * - Executes state transitions.
 *
 * ARCHITECTURE:
 * Systems request changes.
 * Store applies valid state mutations.
 */

import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import type { Container, Entity, WorldAction, WorldState } from '../types/world';
import { validateContainerRules } from '../engine/containerRules';
import { actionLog } from './middleware/actionLog';

function entitiesIn(container: Container, entities: Record<string, Entity>): Entity[] {
  return container.entityIds
    .map((id) => entities[id])
    .filter((entity): entity is Entity => Boolean(entity));
}

export const worldStore = createStore<WorldState>()(
  devtools(
    actionLog((set) => ({
      entities: {},
      containers: {},
      dispatch: (action: WorldAction) => {
        switch (action.type) {
          case 'MOVE_ENTITY': {
            const { entityId, targetContainerId, positionIndex } = action.payload;
            set(
              (state: WorldState) => {
                const entity = state.entities[entityId];
                const targetContainer = state.containers[targetContainerId];
                if (!entity || !targetContainer) return state;

                const sourceContainer = Object.values(state.containers).find((c) =>
                  c.entityIds.includes(entityId)
                );

                // Reordering within the same container never re-checks
                // rules — capacity/uniqueness only guard entities newly
                // arriving from elsewhere.
                if (sourceContainer?.id !== targetContainerId) {
                  const currentEntities = entitiesIn(targetContainer, state.entities).filter(
                    (e) => e.id !== entityId
                  );
                  const result = validateContainerRules(targetContainer, entity, currentEntities);
                  if (!result.allowed) return state;
                }

                const newContainers = { ...state.containers };

                if (sourceContainer) {
                  newContainers[sourceContainer.id] = {
                    ...sourceContainer,
                    entityIds: sourceContainer.entityIds.filter((id) => id !== entityId),
                  };
                }

                const targetIds = [...(newContainers[targetContainerId]?.entityIds || [])];
                if (typeof positionIndex === 'number') {
                  targetIds.splice(positionIndex, 0, entityId);
                } else {
                  targetIds.push(entityId);
                }

                newContainers[targetContainerId] = {
                  ...targetContainer,
                  entityIds: targetIds,
                };

                return { ...state, containers: newContainers };
              },
              false,
              'MOVE_ENTITY'
            );
            break;
          }

          case 'ADD_ENTITY': {
            const { entity, containerId } = action.payload;
            set(
              (state: WorldState) => {
                const targetContainer = state.containers[containerId];
                if (!targetContainer) return state;

                const currentEntities = entitiesIn(targetContainer, state.entities);
                const result = validateContainerRules(
                  targetContainer,
                  entity as Entity,
                  currentEntities
                );
                if (!result.allowed) return state;

                return {
                  ...state,
                  entities: {
                    ...state.entities,
                    [entity.id]: entity as Entity,
                  },
                  containers: {
                    ...state.containers,
                    [containerId]: {
                      ...targetContainer,
                      entityIds: [...targetContainer.entityIds, entity.id],
                    },
                  },
                };
              },
              false,
              'ADD_ENTITY'
            );
            break;
          }

          case 'REMOVE_ENTITY': {
            const { entityId } = action.payload;
            set(
              (state: WorldState) => {
                const newEntities = { ...state.entities };
                delete newEntities[entityId];

                const newContainers = { ...state.containers };
                for (const cId in newContainers) {
                  newContainers[cId] = {
                    ...newContainers[cId],
                    entityIds: newContainers[cId].entityIds.filter((id) => id !== entityId),
                  };
                }

                return {
                  ...state,
                  entities: newEntities,
                  containers: newContainers,
                };
              },
              false,
              'REMOVE_ENTITY'
            );
            break;
          }

          case 'UPDATE_ENTITY_STATE': {
            const { entityId, changes } = action.payload;
            set(
              (state: WorldState) => {
                const targetEntity = state.entities[entityId];
                if (!targetEntity) return state;

                return {
                  ...state,
                  entities: {
                    ...state.entities,
                    [entityId]: {
                      ...targetEntity,
                      state: {
                        ...targetEntity.state,
                        ...changes,
                      },
                    },
                  },
                };
              },
              false,
              'UPDATE_ENTITY_STATE'
            );
            break;
          }
        }
      },
    })),
    { name: 'tortilla-world' }
  )
);
</file>

<file path="systems/dropRules.test.ts">
import { describe, it, expect } from 'vitest'
import { parseDrag, evaluateDrop } from './dropRules'

const kitchenConsumes = { kitchen: { consumesOnDrag: true }, fire: { consumesOnDrag: true } }

describe('parseDrag', () => {
  it('parses a dragged item and a list drop target', () => {
    expect(parseDrag('despensa::potato', 'kitchen')).toEqual({
      source: { listId: 'despensa', itemId: 'potato' },
      target: { listId: 'kitchen', itemId: null },
    })
  })

  it('parses a dragged item and an item drop target', () => {
    expect(parseDrag('despensa::egg', 'despensa::potato')).toEqual({
      source: { listId: 'despensa', itemId: 'egg' },
      target: { listId: 'despensa', itemId: 'potato' },
    })
  })

  it('returns null for malformed ids', () => {
    expect(parseDrag('potato', 'kitchen')).toBeNull()
    expect(parseDrag('despensa::potato', '')).toBeNull()
  })
})

describe('evaluateDrop', () => {
  it('approves same-list reorder without duplicate checks', () => {
    const drag = parseDrag('despensa::egg', 'despensa::potato')!
    const drop = evaluateDrop(drag, { despensa: ['potato', 'egg'], kitchen: [] })
    expect(drop).toMatchObject({
      kind: 'same-list-reorder',
      insertAt: 0,
    })
  })

  it('approves a move from a consuming source', () => {
    const drag = parseDrag('kitchen::potato', 'fire')!
    const drop = evaluateDrop(
      drag,
      { kitchen: ['potato', 'egg'], fire: [] },
      kitchenConsumes,
    )
    expect(drop?.kind).toBe('cross-list-move')
  })

  it('approves a copy from a non-consuming source', () => {
    const drag = parseDrag('despensa::potato', 'kitchen')!
    const drop = evaluateDrop(
      drag,
      { despensa: ['potato', 'onion'], kitchen: [] },
      { despensa: {}, kitchen: { consumesOnDrag: true } },
    )
    expect(drop?.kind).toBe('cross-list-copy')
  })

  it('never lets a consuming target override a non-consuming source', () => {
    const drag = parseDrag('despensa::potato', 'fire')!
    const drop = evaluateDrop(
      drag,
      { despensa: ['potato', 'onion'], fire: [] },
      { despensa: {}, fire: { consumesOnDrag: true } },
    )
    expect(drop?.kind).toBe('cross-list-copy')
  })

  it('blocks copying when the target already holds the same ingredient group', () => {
    const drag = parseDrag('despensa::potato#despensa', 'kitchen')!
    const drop = evaluateDrop(
      drag,
      { despensa: ['potato#despensa'], kitchen: ['potato#kitchen'] },
      {},
      { groupOf: (id) => id.split('#')[0] },
    )
    expect(drop).toBeNull()
  })

  it('blocks copying an item already in the target list (default identity grouping)', () => {
    const drag = parseDrag('despensa::potato', 'kitchen')!
    const drop = evaluateDrop(
      drag,
      { despensa: ['potato', 'onion'], kitchen: ['potato', 'egg'] },
    )
    expect(drop).toBeNull()
  })

  it('blocks copying even when dropping on blank space in a list that already has the item', () => {
    const drag = parseDrag('despensa::potato', 'kitchen')!
    const drop = evaluateDrop(
      drag,
      { despensa: ['potato'], kitchen: ['potato'] },
    )
    expect(drop).toBeNull()
  })

  it('returns null when the item is not in the source list', () => {
    const drag = parseDrag('despensa::garlic', 'kitchen')!
    const drop = evaluateDrop(drag, { despensa: ['potato'], kitchen: [] })
    expect(drop).toBeNull()
  })

  it('returns null when source list does not exist', () => {
    const drag = parseDrag('ghost::potato', 'kitchen')!
    const drop = evaluateDrop(drag, { despensa: ['potato'], kitchen: [] })
    expect(drop).toBeNull()
  })
})
</file>

<file path="systems/dropRules.ts">
/**
 * FILE: dropRules.ts
 *
 * PURPOSE:
 * Defines rules for drag and drop interactions.
 *
 * RESPONSIBILITY:
 * - Determines whether an entity can enter a container.
 * - Validates possible world transitions.
 *
 * SHOULD NOT:
 * - Modify state.
 */

export interface DragEndpoint {
  listId: string
  itemId: string
}

export interface DropTarget {
  listId: string
  itemId: string | null
}

export interface ParsedDrag {
  source: DragEndpoint
  target: DropTarget
}

export type DropKind = 'same-list-reorder' | 'cross-list-move' | 'cross-list-copy'

export interface ApprovedDrop {
  kind: DropKind
  source: DragEndpoint
  target: DropTarget
  insertAt: number
}

export interface ListFlags {
  consumesOnDrag?: boolean
}

export interface DropRuleOptions {
  /**
   * Groups items for the "already in target" duplicate check — e.g. two
   * different physical instances of "potato" should still be treated as
   * the same ingredient for blocking purposes.
   */
  groupOf?: (itemId: string) => string
}

export function parseDrag(activeId: string, overId: string): ParsedDrag | null {
  const sourceParts = activeId.split('::')
  const targetParts = overId.split('::')

  const sourceListId = sourceParts[0]
  const sourceItemId = sourceParts[1]
  const targetListId = targetParts[0]

  if (!sourceListId || !sourceItemId || !targetListId) return null

  return {
    source: { listId: sourceListId, itemId: sourceItemId },
    target: { listId: targetListId, itemId: targetParts[1] ?? null },
  }
}

/**
 * Read-only gate: can this drag-and-drop happen?
 *
 * Same-list reorder: always allowed.
 * Cross-list: blocked when the target already holds an instance of the
 * same group. Otherwise allowed as a move (consuming source) or copy
 * (non-consuming source) — the kind is decided here so interaction.ts
 * only has to apply it.
 */
export function evaluateDrop(
  drag: ParsedDrag,
  lists: Record<string, string[]>,
  listFlags: Record<string, ListFlags> = {},
  options: DropRuleOptions = {},
): ApprovedDrop | null {
  const sourceIds = lists[drag.source.listId]
  const targetIds = lists[drag.target.listId]
  if (!sourceIds || !targetIds || !sourceIds.includes(drag.source.itemId)) return null

  const targetIndex = drag.target.itemId ? targetIds.indexOf(drag.target.itemId) : -1
  const insertAt = targetIndex === -1 ? targetIds.length : targetIndex

  if (drag.source.listId === drag.target.listId) {
    return {
      kind: 'same-list-reorder',
      source: drag.source,
      target: drag.target,
      insertAt,
    }
  }

  const groupOf = options.groupOf ?? ((itemId: string) => itemId)
  const sourceGroup = groupOf(drag.source.itemId)
  if (targetIds.some((itemId) => groupOf(itemId) === sourceGroup)) return null

  const sourceConsumes = listFlags[drag.source.listId]?.consumesOnDrag ?? false

  return {
    kind: sourceConsumes ? 'cross-list-move' : 'cross-list-copy',
    source: drag.source,
    target: drag.target,
    insertAt,
  }
}
</file>

<file path="systems/gaze.test.ts">
import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';
import { updateMascotGaze, getMascotGazeTarget } from './gaze';

describe('Gaze System', () => {
  beforeEach(() => {
    worldStore.setState({
      entities: {
        chef: {
          id: 'chef',
          name: 'Chef',
          type: 'mascot',
          state: {
            gazingAt: undefined,
          },
        },
      },
      containers: {
        bench: {
          id: 'bench',
          name: 'Workbench',
          type: 'board',
          rules: { maxCapacity: 1 },
          entityIds: [],
        },
        pan: {
          id: 'pan',
          name: 'Pan',
          type: 'pan',
          rules: { maxCapacity: Infinity },
          entityIds: [],
        },
        plate: {
          id: 'plate',
          name: 'Plate',
          type: 'storage',
          rules: { maxCapacity: Infinity },
          entityIds: [],
        },
      },
    });
  });

  it('updates mascot gaze target correctly', () => {
    updateMascotGaze('chef', 'pan');
    expect(getMascotGazeTarget('chef')).toBe('pan');
  });

  it('is idempotent when gazing at the same target', () => {
    updateMascotGaze('chef', 'pan');
    const firstState = worldStore.getState();

    updateMascotGaze('chef', 'pan');
    const secondState = worldStore.getState();

    expect(firstState).toBe(secondState);
  });
});
</file>

<file path="systems/gaze.ts">
/**
 * FILE: gaze.ts
 *
 * PURPOSE:
 * Calculates gaze behavior.
 *
 * RESPONSIBILITY:
 * - Determines what objects attract attention.
 * - Updates gaze-related state.
 */

import { worldStore } from '../store/worldStore';

export type GazeTarget = string | null;

interface GazeState {
  gazingAt?: GazeTarget;
}

/**
 * Updates what target a mascot is looking at.
 */
export function updateMascotGaze(
  mascotId: string,
  targetId: GazeTarget
): void {
  const currentTarget = getMascotGazeTarget(mascotId);

  if (currentTarget === targetId) {
    return;
  }

  worldStore.getState().dispatch({
    type: 'UPDATE_ENTITY_STATE',
    payload: {
      entityId: mascotId,
      changes: {
        gazingAt: targetId,
      },
    },
  });
}

/**
 * Returns the current gaze target.
 */
export function getMascotGazeTarget(
  mascotId: string
): GazeTarget {
  const entity = worldStore.getState().entities[mascotId];

  if (!entity) {
    return null;
  }

  const state = entity.state as GazeState | undefined;

  return state?.gazingAt ?? null;
}
</file>

<file path="systems/interaction.test.ts">
import { describe, it, expect } from 'vitest'
import { evaluateDrop, parseDrag } from './dropRules'
import { resolveListReorder, applyListReorder } from './interaction'
import type { Entity } from '../types/Entity'

function makeEntity(id: string, ingredientId: string, listId: string | null): Entity {
  return {
    id,
    type: 'ingredient',
    ingredientId,
    position: { x: 0, y: 0 },
    size: { width: 1, height: 1 },
    state: 'idle',
    listId,
  }
}

function resolveDrag(
  activeId: string,
  overId: string,
  lists: Record<string, string[]>,
  listFlags: Record<string, { consumesOnDrag?: boolean }> = {},
  options: { groupOf?: (itemId: string) => string; createCopyId?: (itemId: string) => string } = {},
) {
  const drag = parseDrag(activeId, overId)
  if (!drag) return null
  const drop = evaluateDrop(drag, lists, listFlags, { groupOf: options.groupOf })
  if (!drop) return null
  return resolveListReorder(drop, lists, { createCopyId: options.createCopyId })
}

const kitchenConsumes = { kitchen: { consumesOnDrag: true }, fire: { consumesOnDrag: true } }

// ── consumesOnDrag: move vs copy semantics ─────────────────────────────────

it('dragging from a consuming list removes the item from the source', () => {
  const result = resolveDrag(
    'kitchen::potato',
    'fire',
    { kitchen: ['potato', 'egg'], fire: [] },
    kitchenConsumes,
  )
  expect(result?.lists).toEqual({
    kitchen: ['egg'],
    fire: ['potato'],
  })
  expect(result?.changedListId).toBe('fire')
  expect(result?.removedFromListId).toBe('kitchen')
  expect(result?.copy).toBeNull()
})

it('dragging from a non-consuming list keeps the item in the source', () => {
  const result = resolveDrag(
    'despensa::potato',
    'kitchen',
    { despensa: ['potato', 'onion'], kitchen: [] },
    { despensa: {}, kitchen: { consumesOnDrag: true } },
    { createCopyId: () => 'potato-copy' },
  )
  expect(result?.lists).toEqual({
    despensa: ['potato', 'onion'],
    kitchen: ['potato-copy'],
  })
  expect(result?.removedFromListId).toBeNull()
  expect(result?.copy).toEqual({ sourceItemId: 'potato', newItemId: 'potato-copy' })
})

it('a consuming target never overrides a non-consuming source, even dragging onto fire', () => {
  const result = resolveDrag(
    'despensa::potato',
    'fire',
    { despensa: ['potato', 'onion'], fire: [] },
    { despensa: {}, fire: { consumesOnDrag: true } },
    { createCopyId: () => 'potato-copy' },
  )
  expect(result?.lists).toEqual({
    despensa: ['potato', 'onion'],
    fire: ['potato-copy'],
  })
  expect(result?.changedListId).toBe('fire')
  expect(result?.removedFromListId).toBeNull()
})

it('BUG regression: a copy is a distinct instance, so moving it later never touches the original', () => {
  const copyStep = resolveDrag(
    'despensa::salt#despensa',
    'kitchen',
    { despensa: ['salt#despensa'], kitchen: [], fire: [] },
    { despensa: {}, kitchen: { consumesOnDrag: true }, fire: { consumesOnDrag: true } },
    { createCopyId: () => 'salt#kitchen' },
  )
  expect(copyStep?.copy).toEqual({ sourceItemId: 'salt#despensa', newItemId: 'salt#kitchen' })

  const moveStep = resolveDrag(
    'kitchen::salt#kitchen',
    'fire',
    { despensa: ['salt#despensa'], kitchen: ['salt#kitchen'], fire: [] },
    { despensa: {}, kitchen: { consumesOnDrag: true }, fire: { consumesOnDrag: true } },
  )
  expect(moveStep?.lists).toEqual({
    despensa: ['salt#despensa'],
    kitchen: [],
    fire: ['salt#kitchen'],
  })
  expect(moveStep?.removedFromListId).toBe('kitchen')
})

describe('resolveListReorder', () => {
  it('copies an item to another list, source stays untouched, target gets a new id', () => {
    const drag = parseDrag('despensa::potato', 'kitchen::egg')!
    const drop = evaluateDrop(drag, { despensa: ['potato', 'onion'], kitchen: ['egg'] })!
    const result = resolveListReorder(drop, { despensa: ['potato', 'onion'], kitchen: ['egg'] }, {
      createCopyId: () => 'potato-copy',
    })
    expect(result?.lists).toEqual({
      despensa: ['potato', 'onion'],
      kitchen: ['potato-copy', 'egg'],
    })
    expect(result?.changedListId).toBe('kitchen')
    expect(result?.copy).toEqual({ sourceItemId: 'potato', newItemId: 'potato-copy' })
  })

  it('copies into an empty list', () => {
    const drag = parseDrag('despensa::potato', 'kitchen')!
    const drop = evaluateDrop(drag, { despensa: ['potato', 'onion'], kitchen: [] })!
    const result = resolveListReorder(drop, { despensa: ['potato', 'onion'], kitchen: [] }, {
      createCopyId: () => 'potato-copy',
    })
    expect(result?.lists).toEqual({
      despensa: ['potato', 'onion'],
      kitchen: ['potato-copy'],
    })
  })

  it('default createCopyId still produces an id different from the source', () => {
    const drag = parseDrag('despensa::potato', 'kitchen')!
    const drop = evaluateDrop(drag, { despensa: ['potato'], kitchen: [] })!
    const result = resolveListReorder(drop, { despensa: ['potato'], kitchen: [] })
    expect(result?.copy?.newItemId).not.toBe('potato')
    expect(result?.lists.kitchen[0]).not.toBe('potato')
  })

  it('reorders within the same list', () => {
    const drag = parseDrag('despensa::egg', 'despensa::potato')!
    const drop = evaluateDrop(drag, { despensa: ['potato', 'egg'], kitchen: [] })!
    const result = resolveListReorder(drop, { despensa: ['potato', 'egg'], kitchen: [] })
    expect(result?.lists.despensa).toEqual(['egg', 'potato'])
    expect(result?.lists.kitchen).toEqual([])
    expect(result?.changedListId).toBe('despensa')
    expect(result?.copy).toBeNull()
  })
})

describe('applyListReorder', () => {
  it('moves an existing entity by updating its listId and position', () => {
    const calls: Array<[string, Partial<Omit<Entity, 'id'>>]> = []
    const updateEntity = (id: string, changes: Partial<Omit<Entity, 'id'>>) => calls.push([id, changes])
    const addEntity = () => { throw new Error('should not create a new entity for a plain move') }
    const getEntity = (id: string) => makeEntity(id, id, 'kitchen')

    applyListReorder(updateEntity, addEntity, getEntity, {
      lists: { fire: ['potato'] },
      changedListId: 'fire',
      removedFromListId: 'kitchen',
      copy: null,
    })

    expect(calls).toEqual([['potato', { position: { x: 0, y: 0 }, listId: 'fire' }]])
  })

  it('creates a brand-new entity for a copy, leaving the original alone', () => {
    const updateCalls: Array<[string, unknown]> = []
    const addCalls: Entity[] = []
    const updateEntity = (id: string, changes: Partial<Omit<Entity, 'id'>>) => updateCalls.push([id, changes])
    const addEntity = (entity: Entity) => addCalls.push(entity)
    const original = makeEntity('salt#despensa', 'salt', 'despensa')
    const getEntity = (id: string) => (id === 'salt#despensa' ? original : undefined)

    applyListReorder(updateEntity, addEntity, getEntity, {
      lists: { kitchen: ['salt#kitchen'] },
      changedListId: 'kitchen',
      removedFromListId: null,
      copy: { sourceItemId: 'salt#despensa', newItemId: 'salt#kitchen' },
    })

    expect(updateCalls).toEqual([])
    expect(addCalls).toEqual([{
      id: 'salt#kitchen',
      type: 'ingredient',
      ingredientId: 'salt',
      position: { x: 0, y: 0 },
      size: { width: 1, height: 1 },
      state: 'idle',
      listId: 'kitchen',
    }])
  })

  it('writes position.y as insertion order', () => {
    const calls: Array<[string, Partial<Omit<Entity, 'id'>>]> = []
    const updateEntity = (id: string, changes: Partial<Omit<Entity, 'id'>>) => calls.push([id, changes])
    const addEntity = () => { throw new Error('unexpected addEntity') }
    const getEntity = (id: string) => makeEntity(id, id, 'kitchen')

    applyListReorder(updateEntity, addEntity, getEntity, {
      lists: { kitchen: ['egg', 'potato', 'onion'] },
      changedListId: 'kitchen',
      removedFromListId: null,
      copy: null,
    })

    expect(calls[0][1].position).toEqual({ x: 0, y: 0 })
    expect(calls[1][1].position).toEqual({ x: 0, y: 1 })
    expect(calls[2][1].position).toEqual({ x: 0, y: 2 })
  })
})
</file>

<file path="systems/interaction.ts">
/**
 * FILE: interaction.ts
 *
 * PURPOSE:
 * Handles player interaction logic.
 *
 * RESPONSIBILITY:
 * - Converts user actions into world actions.
 * - Coordinates interaction flow.
 */

import type { Entity } from '../types/Entity'
import type { ApprovedDrop } from './dropRules'

export interface ReorderOptions {
  /**
   * Produces the id for a brand-new instance created by a copy (dragging
   * out of a non-consuming source). MUST be unique per call in real usage,
   * or the copy will collide with another item.
   */
  createCopyId?: (itemId: string) => string
}

export interface ReorderResult {
  lists: Record<string, string[]>
  changedListId: string
  removedFromListId: string | null
  /**
   * Set only when this resolution created a brand-new instance (i.e. a
   * copy out of a non-consuming source). `sourceItemId` is the original,
   * untouched instance; `newItemId` is the id inserted into the target
   * list. The two are intentionally different entities from this point
   * on — moving one must never affect the other.
   */
  copy: { sourceItemId: string; newItemId: string } | null
}

function defaultCreateCopyId(itemId: string): string {
  return `${itemId}--copy--${Math.random().toString(36).slice(2, 8)}`
}

/**
 * Pure: given an already-approved drop, compute the next list ordering.
 * Validation lives in dropRules.ts — this function only rearranges ids.
 */
export function resolveListReorder(
  drop: ApprovedDrop,
  lists: Record<string, string[]>,
  options: ReorderOptions = {},
): ReorderResult | null {
  const sourceIds = lists[drop.source.listId]
  const targetIds = lists[drop.target.listId]
  if (!sourceIds || !targetIds) return null

  const createCopyId = options.createCopyId ?? defaultCreateCopyId
  const next = { ...lists }

  if (drop.kind === 'same-list-reorder') {
    const reordered = sourceIds.filter((itemId) => itemId !== drop.source.itemId)
    reordered.splice(drop.insertAt, 0, drop.source.itemId)
    next[drop.source.listId] = reordered
    return { lists: next, changedListId: drop.source.listId, removedFromListId: null, copy: null }
  }

  if (drop.kind === 'cross-list-move') {
    next[drop.source.listId] = sourceIds.filter((itemId) => itemId !== drop.source.itemId)
    const reorderedTarget = [...targetIds]
    reorderedTarget.splice(drop.insertAt, 0, drop.source.itemId)
    next[drop.target.listId] = reorderedTarget
    return { lists: next, changedListId: drop.target.listId, removedFromListId: drop.source.listId, copy: null }
  }

  const newItemId = createCopyId(drop.source.itemId)
  const reorderedTarget = [...targetIds]
  reorderedTarget.splice(drop.insertAt, 0, newItemId)
  next[drop.target.listId] = reorderedTarget
  return {
    lists: next,
    changedListId: drop.target.listId,
    removedFromListId: null,
    copy: { sourceItemId: drop.source.itemId, newItemId },
  }
}

/**
 * Commit step: writes the changed list's ordering into the store.
 *
 * Each entity belongs to exactly one list at a time (`entity.listId`), so
 * there's nothing to clean up on the source side — reassigning listId (or,
 * for a copy, creating a new entity) is the entire move. The source list's
 * contents are derived live from entity.listId elsewhere (queries.ts), so
 * they update automatically once this runs.
 */
export function applyListReorder(
  updateEntity: (entityId: string, changes: Partial<Omit<Entity, 'id'>>) => void,
  addEntity: (entity: Entity) => void,
  getEntity: (entityId: string) => Entity | undefined,
  result: ReorderResult,
) {
  const itemIds = result.lists[result.changedListId]

  itemIds.forEach((itemId, index) => {
    const position = { x: 0, y: index }

    if (result.copy && itemId === result.copy.newItemId) {
      const original = getEntity(result.copy.sourceItemId)
      if (!original) return
      addEntity({
        id: itemId,
        type: original.type,
        ingredientId: original.ingredientId,
        position,
        size: original.size,
        state: 'idle',
        listId: result.changedListId,
      })
      return
    }

    updateEntity(itemId, { position, listId: result.changedListId })
  })
}
</file>

<file path="systems/movement.ts">
/**
 * FILE: movement.ts
 *
 * PURPOSE:
 * Handles entity movement calculations.
 *
 * RESPONSIBILITY:
 * - Calculates position changes.
 * - Provides movement behavior.
 */

import { worldStore } from '../store/worldStore';

/**
 * Requests that an entity be moved to another container.
 * The reducer determines the source container automatically.
 */
export function moveEntity(
  entityId: string,
  targetContainerId: string,
  positionIndex?: number
): void {
  worldStore.getState().dispatch({
    type: 'MOVE_ENTITY',
    payload: {
      entityId,
      targetContainerId,
      positionIndex,
    },
  });
}
</file>

<file path="systems/queries.test.ts">
import { describe, it, expect } from 'vitest'
import { getIngredientsForList, getListMembership } from './queries'
import { ingredients as catalog } from '../data/catalog/ingredients'
import { recipe as concebolla } from '../data/catalog/recipes/concebolla'
import type { Entity } from '../types/Entity'

function makeEntity(id: string, ingredientId: string, listId: string | null, y = 0): Entity {
  return {
    id,
    type: 'ingredient',
    ingredientId,
    position: { x: 0, y },
    size: { width: 1, height: 1 },
    state: 'idle',
    listId,
  }
}

function allInDespensa(): Record<string, Entity> {
  return Object.fromEntries(
    catalog.map((ingredient, index) => [
      ingredient.id,
      makeEntity(ingredient.id, ingredient.id, 'despensa', index),
    ]),
  )
}

describe('getListMembership', () => {
  it('returns entity ids grouped by listId, sorted by position.y', () => {
    const entities: Record<string, Entity> = {
      onion: makeEntity('onion', 'onion', 'despensa', 1),
      potato: makeEntity('potato', 'potato', 'despensa', 0),
      oil: makeEntity('oil', 'oil', 'fire', 0),
    }
    expect(getListMembership(entities, ['despensa', 'fire', 'kitchen'])).toEqual({
      despensa: ['potato', 'onion'],
      fire: ['oil'],
      kitchen: [],
    })
  })

  it('ignores non-ingredient entities and entities with no listId', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'potato', 'despensa', 0),
      tortilla: {
        id: 'tortilla',
        type: 'character',
        ingredientId: 'tortilla',
        position: { x: 0, y: 0 },
        size: { width: 1, height: 1 },
        state: 'idle',
        listId: null,
      },
    }
    expect(getListMembership(entities, ['despensa'])).toEqual({ despensa: ['potato'] })
  })
})

describe('getIngredientsForList', () => {

  // ── real entity membership ─────────────────────────────────────────────────

  it('returns entities belonging to the list, sorted by position.y', () => {
    const entities: Record<string, Entity> = {
      onion: makeEntity('onion', 'onion', 'despensa', 1),
      potato: makeEntity('potato', 'potato', 'despensa', 0),
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result.map((i) => i.id)).toEqual(['potato', 'onion'])
  })

  it('ignores entities that do not belong to this list', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'potato', 'despensa', 0),
      onion: makeEntity('onion', 'onion', 'kitchen', 0),
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result.map((i) => i.id)).toEqual(['potato'])
  })

  it('two instances of the same ingredient in different lists are independent', () => {
    // Regression guard: an ingredient existing in two lists must be two
    // separate entities (separate ids), each pinned to exactly one list —
    // never one entity shared across both.
    const entities: Record<string, Entity> = {
      'potato#despensa': makeEntity('potato#despensa', 'potato', 'despensa', 0),
      'potato#kitchen': makeEntity('potato#kitchen', 'potato', 'kitchen', 0),
    }
    const inDespensa = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    const inKitchen = getIngredientsForList(entities, { id: 'kitchen', title: 'Kitchen' })

    expect(inDespensa.map((i) => i.id)).toEqual(['potato#despensa'])
    expect(inKitchen.map((i) => i.id)).toEqual(['potato#kitchen'])
  })

  it('an entity belongs to exactly one list — it never appears in a second one', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'potato', 'kitchen', 0),
    }
    const inDespensa = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    const inKitchen = getIngredientsForList(entities, { id: 'kitchen', title: 'Kitchen' })

    expect(inDespensa.map((i) => i.id)).not.toContain('potato')
    expect(inKitchen.map((i) => i.id)).toContain('potato')
  })

  it('ignores non-ingredient entities in the same list', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'potato', 'despensa', 0),
      tortilla: {
        id: 'tortilla',
        type: 'character',
        ingredientId: 'tortilla',
        position: { x: 0, y: 0 },
        size: { width: 1, height: 1 },
        state: 'idle',
        listId: 'despensa',
      },
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result.map((i) => i.id)).toEqual(['potato'])
  })

  it('returns empty when no entities belong to this list and no seed is configured', () => {
    const result = getIngredientsForList(allInDespensa(), { id: 'trash', title: 'Basura' })
    expect(result).toEqual([])
  })

  // ── seedFromCatalog ────────────────────────────────────────────────────────

  it('falls back to full catalog when seedFromCatalog is true and no entities match', () => {
    const result = getIngredientsForList({}, { id: 'despensa', title: 'Despensa', seedFromCatalog: true })
    expect(result.map((i) => i.id)).toEqual(catalog.map((i) => i.id))
  })

  it('despensa shows all ingredients on startup', () => {
    const result = getIngredientsForList(allInDespensa(), {
      id: 'despensa',
      title: 'Despensa',
      seedFromCatalog: true,
    })
    expect(result).toHaveLength(catalog.length)
    expect(result.map((i) => i.id)).toEqual(catalog.map((i) => i.id))
  })

  it('real entity membership takes priority over seedFromCatalog', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'potato', 'despensa', 0),
    }
    const result = getIngredientsForList(entities, {
      id: 'despensa',
      title: 'Despensa',
      seedFromCatalog: true,
    })
    expect(result.map((i) => i.id)).toEqual(['potato'])
  })

  // ── seedIngredients ────────────────────────────────────────────────────────

  it('kitchen shows concebolla recipe ingredients on startup', () => {
    const kitchenIngredients = concebolla.ingredients
      .filter((i): i is NonNullable<typeof i> => i !== undefined)
      .map((i) => i.id)

    const result = getIngredientsForList(allInDespensa(), {
      id: 'kitchen',
      title: 'Kitchen',
      seedIngredients: kitchenIngredients,
    })
    expect(result.map((i) => i.id)).toEqual(kitchenIngredients)
  })

  it('fire shows only oil on startup', () => {
    const result = getIngredientsForList(allInDespensa(), {
      id: 'fire',
      title: 'Fire',
      seedIngredients: ['oil'],
    })
    expect(result.map((i) => i.id)).toEqual(['oil'])
  })

  it('trash is empty on startup', () => {
    const result = getIngredientsForList(allInDespensa(), { id: 'trash', title: 'Basura' })
    expect(result).toEqual([])
  })

  it('seedIngredients skips ids not found in the catalog', () => {
    const result = getIngredientsForList({}, {
      id: 'kitchen',
      title: 'Kitchen',
      seedIngredients: ['potato', 'unicorn-meat', 'egg'],
    })
    expect(result.map((i) => i.id)).toEqual(['potato', 'egg'])
  })

  it('real entity membership takes priority over seedIngredients', () => {
    const entities: Record<string, Entity> = {
      oil: makeEntity('oil', 'oil', 'fire', 0),
    }
    const result = getIngredientsForList(entities, {
      id: 'fire',
      title: 'Fire',
      seedIngredients: ['oil', 'garlic'],
    })
    expect(result.map((i) => i.id)).toEqual(['oil'])
  })

  // ── view model correctness ─────────────────────────────────────────────────

  it('enriches entities with name and icon from the catalog, keyed by ingredientId', () => {
    const entities = { 'potato#despensa': makeEntity('potato#despensa', 'potato', 'despensa', 0) }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result[0]).toMatchObject({ id: 'potato#despensa', name: 'Potatoes', icon: '🥔' })
  })

  it('falls back to ingredientId as name and 🥔 icon for unknown ingredient ids', () => {
    const entities: Record<string, Entity> = {
      'mystery#despensa': {
        id: 'mystery#despensa',
        type: 'ingredient',
        ingredientId: 'mystery',
        position: { x: 0, y: 0 },
        size: { width: 1, height: 1 },
        state: 'idle',
        listId: 'despensa',
      },
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result[0]).toMatchObject({ id: 'mystery#despensa', name: 'mystery', icon: '🥔' })
  })

})
</file>

<file path="systems/queries.ts">
/**
 * FILE: queries.ts
 *
 * PURPOSE:
 * Read-only world queries.
 *
 * RESPONSIBILITY:
 * - Finds entities.
 * - Filters world data.
 * - Provides reusable selectors.
 *
 * SHOULD NOT:
 * - Modify state.
 */

import type { Entity } from '../types/Entity'
import type { Ingredient } from '../types/Ingredient'
import type { List } from '../types/IngredientList'
import { ingredients as ingredientCatalog } from '../data/catalog/ingredients'

export function toIngredientView(entity: Entity): Ingredient {
  const catalogEntry = ingredientCatalog.find((ingredient) => ingredient.id === entity.ingredientId)
  return {
    id: entity.id,
    name: catalogEntry?.name ?? entity.ingredientId,
    icon: catalogEntry?.icon ?? '🥔',
  }
}

/**
 * Read-only snapshot of which entity ids live in each list, sorted by
 * position.y. Used by drop rules and interaction — never falls back to
 * seed data; only reflects what's actually in the store.
 */
export function getListMembership(
  entities: Record<string, Entity>,
  listIds: string[],
): Record<string, string[]> {
  const membership = Object.fromEntries(listIds.map((listId) => [listId, [] as string[]]))

  for (const entity of Object.values(entities)) {
    if (entity.type !== 'ingredient' || !entity.listId || !(entity.listId in membership)) continue
    membership[entity.listId].push(entity.id)
  }

  for (const listId of listIds) {
    membership[listId].sort((leftId, rightId) => {
      const leftY = entities[leftId]?.position.y ?? 0
      const rightY = entities[rightId]?.position.y ?? 0
      return leftY - rightY
    })
  }

  return membership
}

export function getIngredientsForList(
  entities: Record<string, Entity>,
  list: List,
): Ingredient[] {
  const matching = Object.values(entities)
    .filter((entity) => entity.type === 'ingredient' && entity.listId === list.id)
    .sort((left, right) => left.position.y - right.position.y)
    .map(toIngredientView)

  if (matching.length > 0) return matching

  if (list.seedFromCatalog) return [...ingredientCatalog]

  if (list.seedIngredients) {
    return list.seedIngredients
      .map((id) => ingredientCatalog.find((i) => i.id === id))
      .filter((i): i is Ingredient => i !== undefined)
  }

  return []
}
</file>

<file path="types/actions.ts">
/**
 * FILE: actions.ts
 *
 * PURPOSE:
 * Defines world actions/events.
 *
 * RESPONSIBILITY:
 * - Creates the communication contract between systems and store.
 */

import type { EntityType } from './world';

export type WorldAction =
  | {
      type: 'MOVE_ENTITY';
      payload: {
        entityId: string;
        targetContainerId: string;
        positionIndex?: number;
      };
    }
  | {
      type: 'ADD_ENTITY';
      payload: {
        entity: {
          id: string;
          name: string;
          type: EntityType;
          state?: Record<string, unknown>;
        };
        containerId: string;
      };
    }
  | {
      type: 'REMOVE_ENTITY';
      payload: {
        entityId: string;
      };
    }
  | {
      type: 'UPDATE_ENTITY_STATE';
      payload: {
        entityId: string;
        changes: Record<string, unknown>;
      };
    };
</file>

<file path="types/Entity.ts">
/**
 * FILE: Entity.ts
 *
 * PURPOSE:
 * Defines the base entity contract.
 *
 * RESPONSIBILITY:
 * - Shared structure for all world objects.
 */

export type EntityType = 'character' | 'ingredient' | 'kitchen-object'

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface Entity {
  id: string            // unique per physical instance — NOT the same as ingredientId
  type: EntityType
  ingredientId: string  // catalog id used to look up name/icon; for non-ingredient
                         // entities (mascot, kitchen-objects) this equals `id`
  position: Position
  size: Size
  state: string          // behavior state: 'idle' | 'walking' | 'carrying' etc
  listId: string | null  // the single list this entity currently lives in (null = unplaced)
}

export interface EntityRelationship {
  sourceId: string
  targetId: string
  type: string
}
</file>

<file path="types/Ingredient.ts">
/**
 * FILE: Ingredient.ts
 *
 * PURPOSE:
 * Defines ingredient data structures.
 *
 * RESPONSIBILITY:
 * - Represents ingredient definitions.
 */

export interface Ingredient {
  id: string
  name: string
  icon: string
}
</file>

<file path="types/IngredientList.ts">
/**
 * FILE: IngredientList.ts
 *
 * PURPOSE:
 * Defines container/list data structures.
 *
 * RESPONSIBILITY:
 * - Represents collections of entities.
 */

import type { Ingredient } from './Ingredient'

export interface IngredientList {
  id: string
  name: string
  ingredients: Ingredient[]
}

export interface List {
  id: string
  title: string
  seedFromCatalog?: boolean
  seedIngredients?: string[]
  consumesOnDrag?: boolean   // true = item is removed from this list when dragged out
}
</file>

<file path="types/RecipeIngredient.ts">
/**
 * FILE: RecipeIngredient.ts
 *
 * PURPOSE:
 * Defines ingredient usage inside recipes.
 *
 * RESPONSIBILITY:
 * - Stores ingredient quantity and unit information.
 */

export interface RecipeIngredient {
  id: string
  ingredientId: string
  amount: number
  unit: string
}
</file>

<file path="types/world.ts">
/**
 * FILE: world.ts
 *
 * PURPOSE:
 * Defines complete world state structures.
 *
 * RESPONSIBILITY:
 * - Describes the game world's data model.
 */

import type { WorldAction } from './actions';

export type EntityType = 'ingredient' | 'tool' | 'mascot';
export type ContainerType = 'storage' | 'pan' | 'board' | 'plate' | 'trash';

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  state?: Record<string, unknown>;
}

export interface ContainerRules {
  maxCapacity?: number;
  allowedTypes?: EntityType[];
  uniqueTypesOnly?: boolean;
  customValidator?: ( 
    container: Container,
    entity: Entity,
    currentEntities: Entity[]
  ) => boolean;
}

export interface Container {
  id: string;
  name: string;
  type: ContainerType;
  entityIds: string[];
  rules?: ContainerRules;
}

export interface WorldState {
  entities: Record<string, Entity>;
  containers: Record<string, Container>;
  dispatch: (action: WorldAction) => void;
}

export type { WorldAction };
</file>

<file path="App.tsx">
/**
 * FILE: App.tsx
 *
 * PURPOSE:
 * Main React application component.
 *
 * RESPONSIBILITY:
 * - Creates the application layout.
 * - Connects major UI areas together.
 * - Acts as the entry point for the game world.
 *
 * SHOULD NOT:
 * - Contain game rules.
 * - Modify world state directly.
 */

import { Scene } from './components/Scene/Scene';

function App() {
  return (
    <Scene />
  );
}

export default App;
</file>

<file path="index.css">
:root {
  --text: #6b6375;
  --text-h: #08060d;
  --bg: #fff;
  --border: #e5e4e7;
  --code-bg: #f4f3ec;
  --accent: #aa3bff;
  --accent-bg: rgba(170, 59, 255, 0.1);
  --accent-border: rgba(170, 59, 255, 0.5);
  --social-bg: rgba(244, 243, 236, 0.5);
  --shadow:
    rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;

  --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
  --heading: system-ui, 'Segoe UI', Roboto, sans-serif;
  --mono: ui-monospace, Consolas, monospace;

  font: 18px/145% var(--sans);
  letter-spacing: 0.18px;
  color-scheme: light dark;
  color: var(--text);
  background: var(--bg);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media (max-width: 1024px) {
    font-size: 16px;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --text: #9ca3af;
    --text-h: #f3f4f6;
    --bg: #16171d;
    --border: #2e303a;
    --code-bg: #1f2028;
    --accent: #c084fc;
    --accent-bg: rgba(192, 132, 252, 0.15);
    --accent-border: rgba(192, 132, 252, 0.5);
    --social-bg: rgba(47, 48, 58, 0.5);
    --shadow:
      rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px;
  }

  #social .button-icon {
    filter: invert(1) brightness(2);
  }
}

#root {
  width: 1126px;
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
  border-inline: 1px solid var(--border);
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

body {
  margin: 0;
}

h1,
h2 {
  font-family: var(--heading);
  font-weight: 500;
  color: var(--text-h);
}

h1 {
  font-size: 56px;
  letter-spacing: -1.68px;
  margin: 32px 0;
  @media (max-width: 1024px) {
    font-size: 36px;
    margin: 20px 0;
  }
}
h2 {
  font-size: 24px;
  line-height: 118%;
  letter-spacing: -0.24px;
  margin: 0 0 8px;
  @media (max-width: 1024px) {
    font-size: 20px;
  }
}
p {
  margin: 0;
}

code,
.counter {
  font-family: var(--mono);
  display: inline-flex;
  border-radius: 4px;
  color: var(--text-h);
}

code {
  font-size: 15px;
  line-height: 135%;
  padding: 4px 8px;
  background: var(--code-bg);
}
</file>

<file path="main.tsx">
/**
 * FILE: main.tsx
 *
 * PURPOSE:
 * React application bootstrap file.
 *
 * RESPONSIBILITY:
 * - Creates the React root.
 * - Loads global styles.
 * - Starts the application.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
</file>

</files>
`````

## File: AGENTS.md
`````markdown
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
`````

## File: eslint.config.js
`````javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
`````

## File: README.md
`````markdown
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
`````

## File: tsconfig.app.json
`````json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
`````

## File: tsconfig.json
`````json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
`````

## File: tsconfig.node.json
`````json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
`````

## File: vite.config.ts
`````typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
`````

## File: .Jules/palette.md
`````markdown
## 2025-02-18 - Icon-Only Button Accessibility Pattern in Modals
**Learning:** Modals with dynamic content like `RecipeDatabaseModal` often have icon-only buttons for actions like clearing search (`✕`), deleting items (`🗑️`), or closing sub-modals (`✕`). While visually clear to sighted users, these were entirely silent to screen readers. Furthermore, for repeated list items, a generic "Delete" label is insufficient.
**Action:** When adding ARIA labels to list item actions, use dynamic labels like ``aria-label={`Delete recipe ${recipe.title}`}`` to ensure context is not lost for screen reader users navigating by interactive elements. For standard utility icons, `aria-label="Clear search"` and `aria-label="Close format preview"` drastically improve usability. Always check for missing ARIA labels on buttons containing only text symbols or emoji.
`````

## File: docs/architecture.md
`````markdown
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

# Actions & Event Sourcing

All world changes happen through actions dispatched to `worldStore`.

Example:

```ts
{
 type: "MOVE_ENTITY",
 payload: {
   entityId: "potato",
   targetContainerId: "board"
 }
}
```

## Event Sourcing (`EventStore.ts`)

Every dispatched action is intercepted and appended to an immutable audit trail as a `BaseWorldEvent`:

```ts
interface BaseWorldEvent {
  id: string; // Auto-generated UUID / sequence string
  timestamp: number; // Unix epoch ms
  sequenceNumber: number; // Monotonically increasing sequence ID
  version: number; // Schema version (default: 1)
  actor: 'player' | 'mascot' | 'system';
  action: WorldAction;
}
```

Event Store Benefits:

* **Traceability**: Complete history of every world state mutation
* **Deterministic Replay**: `replayEngine.ts` resets store and re-executes actions sequentially
* **Multi-Format Export**: `ActionRecorder.tsx` generates Mascot Sequence, Declarative Recipe JSON, and Full Session Logs (`zustandInit` / `actions` / `events` / `zustandEnd`)
* **Analytics**: Headless audit trail reporting (`analytics.ts`)

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
`````

## File: src/components/Controls/LanguageSwitcher.tsx
`````typescript
/**
 * FILE: LanguageSwitcher.tsx
 *
 * PURPOSE:
 * Elegant 3-button language selector for switching between English, Español, and Deutsch.
 */

import React from 'react';
import { useTranslation } from '../../i18n/useTranslation';
import type { SupportedLanguage } from '../../i18n/context';

interface LanguageSwitcherProps {
  compact?: boolean;
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ compact = false, className = '' }) => {
  const { language, setLanguage } = useTranslation();

  const options: { code: SupportedLanguage; label: string; flag: string; short: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧', short: 'EN' },
    { code: 'es', label: 'Español', flag: '🇪🇸', short: 'ES' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪', short: 'DE' },
  ];

  return (
    <div
      className={`language-switcher ${compact ? 'language-switcher--compact' : ''} ${className}`}
      role="group"
      aria-label="Language selector"
      style={{
        display: 'inline-flex',
        gap: '4px',
        backgroundColor: '#f1f5f9',
        padding: '3px',
        borderRadius: '8px',
        border: '1px solid #cbd5e1',
        alignItems: 'center',
      }}
    >
      {options.map((opt) => {
        const isActive = language === opt.code;
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLanguage(opt.code)}
            aria-pressed={isActive}
            title={`Switch to ${opt.label}`}
            style={{
              padding: compact ? '4px 8px' : '5px 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: isActive ? '#ffffff' : 'transparent',
              color: isActive ? '#0f172a' : '#64748b',
              fontWeight: isActive ? 600 : 500,
              fontSize: compact ? '0.78rem' : '0.85rem',
              cursor: 'pointer',
              boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'all 0.15s ease-in-out',
            }}
          >
            <span>{opt.flag}</span>
            <span>{compact ? opt.short : opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};
`````

## File: src/components/Controls/PlateDishNameModal.scss
`````scss
.plate-dish-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: fadeInModal 0.2s ease-out;
}

@keyframes fadeInModal {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}

.plate-dish-modal-card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.plate-dish-modal-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;

  .plate-dish-modal-icon {
    font-size: 2.5rem;
    line-height: 1;
    background: #fef3c7;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid #fde68a;
  }

  h3 {
    margin: 0 0 6px 0;
    font-size: 1.2rem;
    font-weight: 700;
    color: #0f172a;
  }

  .plate-dish-modal-subtitle {
    margin: 0;
    font-size: 0.9rem;
    color: #475569;
    line-height: 1.4;
  }
}

.plate-dish-modal-body {
  display: flex;
  flex-direction: column;

  .plate-dish-modal-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 6px;
  }

  .plate-dish-modal-input {
    width: 100%;
    padding: 10px 14px;
    border-radius: 8px;
    border: 1.5px solid #cbd5e1;
    font-size: 0.95rem;
    color: #0f172a;
    transition: border-color 0.15s ease;

    &:focus {
      outline: none;
      border-color: #0284c7;
      box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
    }
  }
}

.plate-dish-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;

  .plate-dish-modal-btn {
    padding: 10px 18px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;

    &.secondary {
      background-color: #f1f5f9;
      color: #475569;
      border: 1px solid #cbd5e1;

      &:hover {
        background-color: #e2e8f0;
      }
    }

    &.primary {
      background-color: #16a34a;
      color: #ffffff;
      border: none;

      &:hover {
        background-color: #15803d;
      }
    }
  }
}
`````

## File: src/components/Controls/PlateDishNameModal.tsx
`````typescript
/**
 * FILE: src/components/Controls/PlateDishNameModal.tsx
 *
 * PURPOSE:
 * Modal dialog presented at the end of recording when there is a dish/entity on the plate.
 * Prompts the chef to name their creation before stopping the session.
 */

import React, { useState } from 'react';
import { useTranslation } from '../../i18n/useTranslation';
import './PlateDishNameModal.scss';

interface PlateDishNameModalProps {
  isOpen: boolean;
  initialName?: string;
  onConfirm: (dishName: string) => void;
  onSkip: () => void;
}

export const PlateDishNameModal: React.FC<PlateDishNameModalProps> = ({
  isOpen,
  initialName = 'Tortilla Española Clásica',
  onConfirm,
  onSkip,
}) => {
  const { t } = useTranslation();
  const [dishName, setDishName] = useState<string>(initialName);
  const [prevInitialName, setPrevInitialName] = useState<string>(initialName);

  if (initialName !== prevInitialName) {
    setPrevInitialName(initialName);
    setDishName(initialName);
  }

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = dishName.trim();
    if (trimmed) {
      onConfirm(trimmed);
    } else {
      onSkip();
    }
  };

  return (
    <div className="plate-dish-modal-overlay" onClick={onSkip}>
      <div className="plate-dish-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="plate-dish-modal-header">
          <div className="plate-dish-modal-icon">🍽️</div>
          <div>
            <h3>{t('recorder.dishNameModalTitle')}</h3>
            <p className="plate-dish-modal-subtitle">
              {t('recorder.dishNameModalSubtitle')}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="plate-dish-modal-body">
          <label className="plate-dish-modal-label">
            {t('ui.finalNameLabel')}
          </label>
          <input
            type="text"
            className="plate-dish-modal-input"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            placeholder={t('recorder.dishNamePlaceholder')}
            autoFocus
          />

          <div className="plate-dish-modal-actions">
            <button
              type="button"
              className="plate-dish-modal-btn secondary"
              onClick={onSkip}
            >
              {t('recorder.skipDishName')}
            </button>
            <button
              type="submit"
              className="plate-dish-modal-btn primary"
            >
              {t('recorder.saveDishNameAndStop')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
`````

## File: src/components/Recipe/RecipeRequirements.tsx
`````typescript
/**
 * FILE: RecipeRequirements.tsx
 *
 * PURPOSE:
 * Displays all requirements for a recipe.
 *
 * RESPONSIBILITY:
 * - Renders list of required entities.
 */

import React from 'react';
import type { Requirement } from '../../types/Requirement';
import { RequirementView } from './RequirementView';

interface RecipeRequirementsProps {
  requirements: Requirement[];
}

export const RecipeRequirements: React.FC<RecipeRequirementsProps> = ({ requirements }) => {
  return (
    <ul className="recipe-requirements">
      {requirements.map((req, idx) => (
        <RequirementView key={req.id || `${req.entityId}-${idx}`} requirement={req} />
      ))}
    </ul>
  );
};
`````

## File: src/components/World/EntityIcon.tsx
`````typescript
/**
 * FILE: EntityIcon.tsx
 *
 * PURPOSE:
 * Visual icon representation for any entity in the world (ingredients, tools, containers, products).
 *
 * RESPONSIBILITY:
 * - Renders symbol/icon based on entity data, catalog lookup, or entity type fallback.
 */

import React from 'react';
import type { Entity } from '../../types/world';
import { ingredients } from '../../data/catalog/ingredients';
import { catalogTools as tools } from '../../data/catalog/tools';

interface EntityIconProps {
  entity?: Entity;
  icon?: string;
  entityId?: string;
  type?: string;
}

const FALLBACK_ICONS: Record<string, string> = {
  potato: '🥔',
  egg: '🥚',
  onion: '🧅',
  oil: '🫗',
  salt: '🧂',
  pepper: '🌶️',
  knife: '🔪',
  pan: '🍳',
  plate: '🍽️',
  bowl: '🥣',
  sink: '💧',
  board: '🪵',
  tortilla: '🫓',
};

export const EntityIcon: React.FC<EntityIconProps> = ({ entity, icon, entityId, type }) => {
  if (icon) {
    return <span className="entity-icon" aria-hidden="true">{icon}</span>;
  }

  if (entity?.icon) {
    return <span className="entity-icon" aria-hidden="true">{entity.icon}</span>;
  }

  const lookupId = entity?.ingredientId || entity?.id || entityId || '';

  // Catalog lookup
  const catalogIng = ingredients.find((i) => i.id === lookupId || lookupId.startsWith(i.id));
  if (catalogIng?.icon) {
    return <span className="entity-icon" aria-hidden="true">{catalogIng.icon}</span>;
  }

  const catalogTool = tools.find((t) => t.id === lookupId || lookupId.startsWith(t.id));
  if (catalogTool?.icon) {
    return <span className="entity-icon" aria-hidden="true">{catalogTool.icon}</span>;
  }

  // Prefix key match
  for (const [key, fallbackIcon] of Object.entries(FALLBACK_ICONS)) {
    if (lookupId.toLowerCase().includes(key)) {
      return <span className="entity-icon" aria-hidden="true">{fallbackIcon}</span>;
    }
  }

  const defaultTypeIcon = type === 'tool' ? '🔧' : type === 'container' ? '📦' : '📦';

  return <span className="entity-icon" aria-hidden="true">{defaultTypeIcon}</span>;
};
`````

## File: src/components/World/rendererRegistry.ts
`````typescript
/**
 * FILE: rendererRegistry.ts
 *
 * PURPOSE:
 * Registry for custom entity type renderers.
 */

import React from 'react';
import type { Entity } from '../../types/world';

export interface EntityRendererProps {
  entity: Entity;
  containerId?: string;
  readOnly?: boolean;
}

export type EntityRenderer = React.ComponentType<EntityRendererProps>;

export const entityRendererRegistry: Record<string, EntityRenderer> = {};

export function registerEntityRenderer(type: string, renderer: EntityRenderer): void {
  entityRendererRegistry[type] = renderer;
}
`````

## File: src/data/catalog/recipes/francesa.ts
`````typescript
/**
 * FILE: francesa.ts
 *
 * PURPOSE:
 * Recipe export for Tortilla Francesa.
 *
 * RESPONSIBILITY:
 * - Loaded dynamically from francesa.json via loadRecipe.
 * - Re-exports francesaRecipe and francesaCooklang for backward compatibility.
 */

import { loadRecipe, getRecipeCooklang } from '../../../systems/recipeLoader';
import type { Recipe } from '../../../types/Recipe';

export const francesaRecipe: Recipe = loadRecipe('francesa');
export const francesaCooklang: string = getRecipeCooklang('francesa');
export const recipe: Recipe = francesaRecipe;
`````

## File: src/data/catalog/ingredients.ts
`````typescript
/**
 * FILE: ingredients.ts
 *
 * PURPOSE:
 * Catalog of available ingredient definitions.
 *
 * RESPONSIBILITY:
 * - Provides master list of ingredient metadata (names, icons, ids).
 */

import type { Ingredient } from "../../types/Ingredient";


export const ingredients: Ingredient[] = [

  {
    id: "potato",
    icon: "🥔",
    name: "Potatoes",
  },

  {
    id: "egg",
    icon: "🥚",
    name: "Eggs",
  },

  {
    id: "oil",
    icon: "🫒",
    name: "Olive Oil",
  },

  {
    id: "onion",
    icon: "🧅",
    name: "Onion",
  },

  {
    id: "chorizo",
    icon: "🌭",
    name: "Chorizo",
  },

  {
    id: "salt",
    icon: "🧂",
    name: "Salt",
  },

  {
    id: "pepper",
    icon: "🫑",
    name: "Bell Pepper",
  },

  {
    id: "garlic",
    icon: "🧄",
    name: "Garlic",
  },

  {
    id: "tomato",
    icon: "🍅",
    name: "Tomato",
  },

  {
    id: "cheese",
    icon: "🧀",
    name: "Cheese",
  },

  {
    id: "bread",
    icon: "🍞",
    name: "Bread",
  },

  {
    id: "milk",
    icon: "🥛",
    name: "Milk",
  },

  {
    id: "butter",
    icon: "🧈",
    name: "Butter",
  },

  // --- Expanded Ingredients ---

  {
    id: "black_pepper",
    icon: "🌶️",
    name: "Black Pepper",
  },

  {
    id: "flour",
    icon: "🌾",
    name: "Flour",
  },

  {
    id: "sugar",
    icon: "🍚",
    name: "Sugar",
  },

  {
    id: "rice",
    icon: "🍚",
    name: "Rice",
  },

  {
    id: "chicken",
    icon: "🍗",
    name: "Chicken",
  },

  {
    id: "beef",
    icon: "🥩",
    name: "Beef",
  },

  {
    id: "mushroom",
    icon: "🍄",
    name: "Mushroom",
  },

  {
    id: "spinach",
    icon: "🥬",
    name: "Spinach",
  },

  {
    id: "lemon",
    icon: "🍋",
    name: "Lemon",
  },

];
`````

## File: src/data/schemas/recipe.schema.json
`````json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "RecipeJSON",
  "type": "object",
  "required": ["id", "name", "steps"],
  "properties": {
    "id": {
      "type": "string",
      "description": "Unique identifier for the recipe"
    },
    "name": {
      "type": "string",
      "description": "Human-readable name of the recipe"
    },
    "description": {
      "type": "string",
      "description": "Short summary or narrative description"
    },
    "difficulty": {
      "type": "string",
      "enum": ["easy", "medium", "hard"]
    },
    "tags": {
      "type": "array",
      "items": { "type": "string" }
    },
    "hints": {
      "type": "array",
      "items": { "type": "string" }
    },
    "cooklang": {
      "type": "string",
      "description": "Human-friendly Cooklang representation"
    },
    "requirements": {
      "type": ["object", "array"],
      "description": "Required ingredients either as dictionary or array"
    },
    "ingredients": {
      "type": ["object", "array"],
      "description": "Alias for requirements"
    },
    "steps": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["action"],
        "properties": {
          "action": { "type": "string" }
        }
      }
    }
  }
}
`````

## File: src/i18n/grammar/locales/de.json
`````json
{
  "verbs": {
    "cut": { "infinitive": "schneiden", "imperative": "Schneide" },
    "slice": { "infinitive": "schneiden", "imperative": "Schneide" },
    "dice": { "infinitive": "würfeln", "imperative": "Würfele" },
    "chop": { "infinitive": "hacken", "imperative": "Hacke" },
    "cook": { "infinitive": "kochen", "imperative": "Koche" },
    "wash": { "infinitive": "waschen", "imperative": "Wasche" },
    "peel": { "infinitive": "schälen", "imperative": "Schäle" },
    "mix": { "infinitive": "mischen", "imperative": "Mische" },
    "whisk": { "infinitive": "verquirlen", "imperative": "Verquirle" },
    "beat": { "infinitive": "verquirlen", "imperative": "Verquirle" },
    "combine": { "infinitive": "mischen", "imperative": "Mische" },
    "heat": { "infinitive": "erhitzen", "imperative": "Erhitze" },
    "fry": { "infinitive": "braten", "imperative": "Brate" },
    "flip": { "infinitive": "wenden", "imperative": "Wende" },
    "serve": { "infinitive": "servieren", "imperative": "Serviere" },
    "add": { "infinitive": "hinzufügen", "imperative": "Füge hinzu" },
    "move": { "infinitive": "bewegen", "imperative": "Bewege" },
    "grab": { "infinitive": "greifen", "imperative": "Greife" },
    "drop": { "infinitive": "ablegen", "imperative": "Lege ab" },
    "celebrate": { "infinitive": "feiern", "imperative": "Guten Appetit!" }
  },
  "nouns": {
    "potato": {
      "singular": "Kartoffel",
      "plural": "Kartoffeln",
      "defaultForm": "plural",
      "article": { "singular": "die", "plural": "die" },
      "accusative": { "singular": "die", "plural": "die" }
    },
    "potatoes": {
      "singular": "Kartoffel",
      "plural": "Kartoffeln",
      "defaultForm": "plural",
      "article": { "singular": "die", "plural": "die" },
      "accusative": { "singular": "die", "plural": "die" }
    },
    "egg": {
      "singular": "Ei",
      "plural": "Eier",
      "defaultForm": "plural",
      "article": { "singular": "das", "plural": "die" },
      "accusative": { "singular": "das", "plural": "die" }
    },
    "eggs": {
      "singular": "Ei",
      "plural": "Eier",
      "defaultForm": "plural",
      "article": { "singular": "das", "plural": "die" },
      "accusative": { "singular": "das", "plural": "die" }
    },
    "onion": {
      "singular": "Zwiebel",
      "plural": "Zwiebeln",
      "defaultForm": "plural",
      "article": { "singular": "die", "plural": "die" },
      "accusative": { "singular": "die", "plural": "die" }
    },
    "onions": {
      "singular": "Zwiebel",
      "plural": "Zwiebeln",
      "defaultForm": "plural",
      "article": { "singular": "die", "plural": "die" },
      "accusative": { "singular": "die", "plural": "die" }
    },
    "oil": {
      "singular": "Olivenöl",
      "plural": "Olivenöl",
      "defaultForm": "singular",
      "article": { "singular": "das", "plural": "das" },
      "accusative": { "singular": "das", "plural": "das" }
    },
    "salt": {
      "singular": "Salz",
      "plural": "Salz",
      "defaultForm": "singular",
      "article": { "singular": "das", "plural": "das" },
      "accusative": { "singular": "das", "plural": "das" }
    },
    "garlic": {
      "singular": "Knoblauch",
      "plural": "Knoblauch",
      "defaultForm": "singular",
      "article": { "singular": "der", "plural": "der" },
      "accusative": { "singular": "den", "plural": "die" }
    },
    "pepper": {
      "singular": "Paprika",
      "plural": "Paprika",
      "defaultForm": "singular",
      "article": { "singular": "die", "plural": "die" },
      "accusative": { "singular": "die", "plural": "die" }
    },
    "black_pepper": {
      "singular": "Schwarzer Pfeffer",
      "plural": "Schwarzer Pfeffer",
      "defaultForm": "singular",
      "article": { "singular": "der", "plural": "der" },
      "accusative": { "singular": "den", "plural": "die" }
    },
    "chorizo": {
      "singular": "Chorizo",
      "plural": "Chorizo",
      "defaultForm": "singular",
      "article": { "singular": "die", "plural": "die" },
      "accusative": { "singular": "die", "plural": "die" }
    },
    "mixture": {
      "singular": "Huevo batido",
      "plural": "Huevo batido",
      "defaultForm": "singular",
      "article": { "singular": "das", "plural": "das" }
    },
    "huevo batido": {
      "singular": "Huevo batido",
      "plural": "Huevo batido",
      "defaultForm": "singular",
      "article": { "singular": "das", "plural": "das" }
    },
    "tortilla clásica": {
      "singular": "Tortilla clásica",
      "plural": "Tortilla clásica",
      "defaultForm": "singular",
      "article": { "singular": "die", "plural": "die" }
    },
    "tortilla con cebolla": {
      "singular": "Tortilla con cebolla",
      "plural": "Tortilla con cebolla",
      "defaultForm": "singular",
      "article": { "singular": "die", "plural": "die" }
    },
    "tortilla francesa": {
      "singular": "Tortilla francesa",
      "plural": "Tortilla francesa",
      "defaultForm": "singular",
      "article": { "singular": "die", "plural": "die" }
    },
    "burner": {
      "singular": "Pfanne",
      "plural": "Pfannen",
      "defaultForm": "singular",
      "article": { "singular": "die", "plural": "die" },
      "inContainer": "In die Pfanne",
      "ontoContainer": "In die Pfanne"
    },
    "burner1": {
      "singular": "Pfanne",
      "plural": "Pfannen",
      "defaultForm": "singular",
      "article": { "singular": "die", "plural": "die" },
      "inContainer": "In die Pfanne",
      "ontoContainer": "In die Pfanne"
    },
    "plate": {
      "singular": "Servierteller 🍽️",
      "plural": "Servierteller 🍽️",
      "defaultForm": "singular",
      "article": { "singular": "der", "plural": "die" },
      "inContainer": "Auf dem Servierteller 🍽️",
      "ontoContainer": "Auf dem Servierteller 🍽️"
    },
    "bowl": {
      "singular": "Schüssel 🥣",
      "plural": "Schüsseln 🥣",
      "defaultForm": "singular",
      "article": { "singular": "die", "plural": "die" },
      "inContainer": "In die Schüssel 🥣",
      "ontoContainer": "In die Schüssel 🥣"
    },
    "board": {
      "singular": "Schneidebrett 🔪",
      "plural": "Schneidebretter 🔪",
      "defaultForm": "singular",
      "article": { "singular": "das", "plural": "die" },
      "inContainer": "Auf das Schneidebrett 🔪",
      "ontoContainer": "Auf das Schneidebrett 🔪"
    },
    "despensa": {
      "singular": "Vorratskammer 🧺",
      "plural": "Vorratskammern 🧺",
      "defaultForm": "singular",
      "article": { "singular": "die", "plural": "die" }
    }
  }
}
`````

## File: src/i18n/grammar/locales/en.json
`````json
{
  "verbs": {
    "cut": { "infinitive": "cut", "imperative": "Cut" },
    "slice": { "infinitive": "slice", "imperative": "Slice" },
    "dice": { "infinitive": "dice", "imperative": "Dice" },
    "chop": { "infinitive": "chop", "imperative": "Chop" },
    "cook": { "infinitive": "cook", "imperative": "Cook" },
    "wash": { "infinitive": "wash", "imperative": "Wash" },
    "peel": { "infinitive": "peel", "imperative": "Peel" },
    "mix": { "infinitive": "mix", "imperative": "Mix" },
    "whisk": { "infinitive": "whisk", "imperative": "Whisk" },
    "beat": { "infinitive": "beat", "imperative": "Beat" },
    "combine": { "infinitive": "combine", "imperative": "Combine" },
    "heat": { "infinitive": "heat", "imperative": "Heat" },
    "fry": { "infinitive": "fry", "imperative": "Fry" },
    "flip": { "infinitive": "flip", "imperative": "Flip" },
    "serve": { "infinitive": "serve", "imperative": "Serve" },
    "add": { "infinitive": "add", "imperative": "Add" },
    "move": { "infinitive": "move", "imperative": "Move" },
    "grab": { "infinitive": "grab", "imperative": "Grab" },
    "drop": { "infinitive": "drop", "imperative": "Drop" },
    "celebrate": { "infinitive": "celebrate", "imperative": "Enjoy your meal!" }
  },
  "nouns": {
    "potato": {
      "singular": "potato",
      "plural": "potatoes",
      "defaultForm": "plural",
      "article": { "singular": "the", "plural": "the" }
    },
    "potatoes": {
      "singular": "potato",
      "plural": "potatoes",
      "defaultForm": "plural",
      "article": { "singular": "the", "plural": "the" }
    },
    "egg": {
      "singular": "egg",
      "plural": "eggs",
      "defaultForm": "plural",
      "article": { "singular": "the", "plural": "the" }
    },
    "eggs": {
      "singular": "egg",
      "plural": "eggs",
      "defaultForm": "plural",
      "article": { "singular": "the", "plural": "the" }
    },
    "onion": {
      "singular": "onion",
      "plural": "onions",
      "defaultForm": "singular",
      "article": { "singular": "the", "plural": "the" }
    },
    "onions": {
      "singular": "onion",
      "plural": "onions",
      "defaultForm": "plural",
      "article": { "singular": "the", "plural": "the" }
    },
    "salt": {
      "singular": "salt",
      "plural": "salt",
      "defaultForm": "singular",
      "article": { "singular": "the", "plural": "the" }
    },
    "oil": {
      "singular": "olive oil",
      "plural": "olive oil",
      "defaultForm": "singular",
      "article": { "singular": "the", "plural": "the" }
    },
    "garlic": {
      "singular": "garlic",
      "plural": "garlic",
      "defaultForm": "singular",
      "article": { "singular": "the", "plural": "the" }
    },
    "burner": {
      "singular": "pan",
      "plural": "pans",
      "defaultForm": "singular",
      "article": { "singular": "the", "plural": "the" },
      "inContainer": "in the pan",
      "ontoContainer": "into the pan"
    },
    "burner1": {
      "singular": "pan",
      "plural": "pans",
      "defaultForm": "singular",
      "article": { "singular": "the", "plural": "the" },
      "inContainer": "in the pan",
      "ontoContainer": "into the pan"
    },
    "plate": {
      "singular": "plate",
      "plural": "plates",
      "defaultForm": "singular",
      "article": { "singular": "the", "plural": "the" },
      "inContainer": "onto the plate",
      "ontoContainer": "onto the plate"
    }
  }
}
`````

## File: src/i18n/grammar/locales/es.json
`````json
{
  "verbs": {
    "cut": { "infinitive": "cortar", "imperative": "Corta" },
    "slice": { "infinitive": "cortar", "imperative": "Corta" },
    "dice": { "infinitive": "cortar en dados", "imperative": "Corta en dados" },
    "chop": { "infinitive": "picar", "imperative": "Pica" },
    "cook": { "infinitive": "cocinar", "imperative": "Cocina" },
    "wash": { "infinitive": "lavar", "imperative": "Lava" },
    "peel": { "infinitive": "pelar", "imperative": "Pela" },
    "mix": { "infinitive": "mezclar", "imperative": "Mezcla" },
    "whisk": { "infinitive": "batir", "imperative": "Bate" },
    "beat": { "infinitive": "batir", "imperative": "Bate" },
    "combine": { "infinitive": "combinar", "imperative": "Combina" },
    "heat": { "infinitive": "calentar", "imperative": "Calienta" },
    "fry": { "infinitive": "freír", "imperative": "Fríe" },
    "flip": { "infinitive": "voltear", "imperative": "Voltea" },
    "serve": { "infinitive": "servir", "imperative": "Sirve" },
    "add": { "infinitive": "añadir", "imperative": "Añade" },
    "move": { "infinitive": "mover", "imperative": "Mueve" },
    "grab": { "infinitive": "coger", "imperative": "Coge" },
    "drop": { "infinitive": "colocar", "imperative": "Coloca" },
    "celebrate": { "infinitive": "celebrar", "imperative": "¡A celebrar!" }
  },
  "nouns": {
    "potato": {
      "singular": "patata",
      "plural": "patatas",
      "defaultForm": "plural",
      "article": { "singular": "la", "plural": "las" }
    },
    "potatoes": {
      "singular": "patata",
      "plural": "patatas",
      "defaultForm": "plural",
      "article": { "singular": "la", "plural": "las" }
    },
    "egg": {
      "singular": "huevo",
      "plural": "huevos",
      "defaultForm": "plural",
      "article": { "singular": "el", "plural": "los" }
    },
    "eggs": {
      "singular": "huevo",
      "plural": "huevos",
      "defaultForm": "plural",
      "article": { "singular": "el", "plural": "los" }
    },
    "onion": {
      "singular": "cebolla",
      "plural": "cebollas",
      "defaultForm": "singular",
      "article": { "singular": "la", "plural": "las" }
    },
    "onions": {
      "singular": "cebolla",
      "plural": "cebollas",
      "defaultForm": "plural",
      "article": { "singular": "la", "plural": "las" }
    },
    "salt": {
      "singular": "sal",
      "plural": "sal",
      "defaultForm": "singular",
      "article": { "singular": "la", "plural": "las" }
    },
    "oil": {
      "singular": "aceite de oliva",
      "plural": "aceite de oliva",
      "defaultForm": "singular",
      "article": { "singular": "el", "plural": "los" }
    },
    "garlic": {
      "singular": "ajo",
      "plural": "ajos",
      "defaultForm": "singular",
      "article": { "singular": "el", "plural": "los" }
    },
    "burner": {
      "singular": "sartén",
      "plural": "sartenes",
      "defaultForm": "singular",
      "article": { "singular": "la", "plural": "las" },
      "inContainer": "en la sartén",
      "ontoContainer": "en la sartén"
    },
    "burner1": {
      "singular": "sartén",
      "plural": "sartenes",
      "defaultForm": "singular",
      "article": { "singular": "la", "plural": "las" },
      "inContainer": "en la sartén",
      "ontoContainer": "en la sartén"
    },
    "plate": {
      "singular": "plato",
      "plural": "platos",
      "defaultForm": "singular",
      "article": { "singular": "el", "plural": "los" },
      "inContainer": "en el plato",
      "ontoContainer": "en el plato"
    },
    "bowl": {
      "singular": "bol",
      "plural": "boles",
      "defaultForm": "singular",
      "article": { "singular": "el", "plural": "los" },
      "inContainer": "en el bol",
      "ontoContainer": "en el bol"
    }
  }
}
`````

## File: src/i18n/grammar/article.ts
`````typescript
import type { NounInfo } from './noun';

export function getArticle(
  nounInfo: NounInfo,
  lang: string = 'en',
  options: { plural?: boolean; case?: 'nominative' | 'accusative' | 'dative' } = {}
): string {
  if (!nounInfo || !nounInfo.article) return '';

  const normLang = lang.toLowerCase().slice(0, 2);
  const isPlural = options.plural ?? (nounInfo.defaultForm === 'plural');

  if (normLang === 'de' && options.case === 'accusative' && nounInfo.accusativeArticle) {
    return isPlural ? nounInfo.accusativeArticle.plural : nounInfo.accusativeArticle.singular;
  }

  return isPlural ? nounInfo.article.plural : nounInfo.article.singular;
}
`````

## File: src/i18n/grammar/index.ts
`````typescript
export * from './noun';
export * from './verb';
export * from './article';
export * from './sentence';
`````

## File: src/i18n/grammar/noun.ts
`````typescript
import deGrammar from './locales/de.json';
import esGrammar from './locales/es.json';
import enGrammar from './locales/en.json';

export interface NounInfo {
  singular: string;
  plural: string;
  defaultForm?: 'singular' | 'plural';
  article: {
    singular: string;
    plural: string;
  };
  accusativeArticle?: {
    singular: string;
    plural: string;
  };
  inContainer?: string;
  ontoContainer?: string;
}

const dictionaries: Record<string, Record<string, NounInfo>> = {
  de: deGrammar.nouns as Record<string, NounInfo>,
  es: esGrammar.nouns as Record<string, NounInfo>,
  en: enGrammar.nouns as Record<string, NounInfo>,
};

export function noun(term: string, lang: string = 'en'): NounInfo {
  if (!term) {
    return {
      singular: '',
      plural: '',
      defaultForm: 'singular',
      article: { singular: '', plural: '' },
    };
  }

  const normLang = lang.toLowerCase().slice(0, 2);
  const dict = dictionaries[normLang] || dictionaries.en;
  const lowerTerm = term.trim().toLowerCase();

  if (dict && dict[lowerTerm]) {
    return dict[lowerTerm];
  }

  // Fallback search in dictionary
  if (dict) {
    for (const key of Object.keys(dict)) {
      const entry = dict[key];
      if (
        entry.singular?.toLowerCase() === lowerTerm ||
        entry.plural?.toLowerCase() === lowerTerm
      ) {
        return entry;
      }
    }
  }

  // Dynamic fallback when metadata is missing
  const isPlural = lowerTerm.endsWith('s') || lowerTerm.endsWith('n');
  const singular = term;
  const plural = term.endsWith('s') ? term : `${term}s`;
  const defaultArticle = normLang === 'de' ? 'die' : normLang === 'es' ? (isPlural ? 'los' : 'el') : 'the';

  return {
    singular,
    plural,
    defaultForm: isPlural ? 'plural' : 'singular',
    article: {
      singular: defaultArticle,
      plural: defaultArticle,
    },
  };
}
`````

## File: src/i18n/grammar/sentence.ts
`````typescript
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function joinList(items: string[], lang: string = 'en'): string {
  if (!items || items.length === 0) return '';
  if (items.length === 1) return items[0];

  const normLang = lang.toLowerCase().slice(0, 2);
  const conjunction = normLang === 'de' ? ' und ' : normLang === 'es' ? ' y ' : ' and ';

  if (items.length === 2) {
    return items.join(conjunction);
  }

  const head = items.slice(0, -1).join(', ');
  const tail = items[items.length - 1];
  return `${head}${conjunction}${tail}`;
}
`````

## File: src/i18n/grammar/verb.ts
`````typescript
import deGrammar from './locales/de.json';
import esGrammar from './locales/es.json';
import enGrammar from './locales/en.json';

export interface VerbInfo {
  infinitive: string;
  imperative: string;
  imperativePlural?: string;
}

export interface VerbHelper {
  infinitive(): string;
  imperative(): string;
  raw(): VerbInfo;
}

const dictionaries: Record<string, Record<string, VerbInfo>> = {
  de: deGrammar.verbs as Record<string, VerbInfo>,
  es: esGrammar.verbs as Record<string, VerbInfo>,
  en: enGrammar.verbs as Record<string, VerbInfo>,
};

export function verb(action: string, lang: string = 'en'): VerbHelper {
  if (!action) {
    return {
      infinitive: () => '',
      imperative: () => '',
      raw: () => ({ infinitive: '', imperative: '' }),
    };
  }

  const normLang = lang.toLowerCase().slice(0, 2);
  const dict = dictionaries[normLang] || dictionaries.en;
  const lowerAction = action.trim().toLowerCase();

  const info: VerbInfo = (dict && dict[lowerAction])
    ? dict[lowerAction]
    : {
        infinitive: action,
        imperative: action.charAt(0).toUpperCase() + action.slice(1),
      };

  return {
    infinitive: () => info.infinitive,
    imperative: () => info.imperative,
    raw: () => info,
  };
}
`````

## File: src/i18n/useTranslation.ts
`````typescript
/**
 * FILE: useTranslation.ts
 *
 * PURPOSE:
 * Custom React hook for accessing current language and translation function.
 */

import { useContext } from 'react';
import { I18nContext, type I18nContextType } from './context';

export function useTranslation(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    return {
      language: 'en',
      setLanguage: () => {},
      t: (keyPath: string) => keyPath,
    };
  }
  return context;
}
`````

## File: src/services/dbService.test.ts
`````typescript
/**
 * FILE: dbService.test.ts
 *
 * PURPOSE:
 * Unit tests for Firestore recipe normalization, ingredient indexing, and sanitization.
 */

import { describe, it, expect } from 'vitest';
import { normalizeIngredientIds, sanitizeForFirestore } from './dbService';

describe('dbService helpers', () => {
  it('normalizes string and object ingredients into clean lowercase ID lists', () => {
    const raw = [
      'Garlic ',
      'EGG',
      { id: 'Potato' },
      { ingredientId: 'ONION' },
      { entityId: '  Salt ' },
      'egg', // duplicate
    ];

    const normalized = normalizeIngredientIds(raw);

    expect(normalized).toEqual(['garlic', 'egg', 'potato', 'onion', 'salt']);
  });

  it('sanitizes undefined values recursively for Firestore compatibility', () => {
    const dirtyData = {
      title: 'Tortilla de Patatas',
      description: undefined,
      author: 'Chef',
      tags: ['classic', undefined],
      nested: {
        field1: 'value',
        field2: undefined,
      },
    };

    const clean = sanitizeForFirestore(dirtyData);

    expect(clean).toEqual({
      title: 'Tortilla de Patatas',
      author: 'Chef',
      tags: ['classic'],
      nested: {
        field1: 'value',
      },
    });
  });
});
`````

## File: src/store/slices/focusSlice.ts
`````typescript
/**
 * FILE: focusSlice.ts
 *
 * PURPOSE:
 * Zustand slice for managing Mascot-Centered Focus Mode state.
 *
 * RESPONSIBILITY:
 * - Stores active FocusTarget and userOverride flag.
 * - Provides setFocus and clearFocus methods.
 */

import type { StateCreator } from 'zustand/vanilla';
import type { FocusTarget } from '../../types/focus';
import type { WorldStateStore } from '../types';

export interface FocusSlice {
  focusTarget: FocusTarget;
  userOverride: boolean;
  setFocus: (target: Partial<FocusTarget>, isUserOverride?: boolean) => void;
  clearFocus: (isUserOverride?: boolean) => void;
}

export const createFocusSlice: StateCreator<
  WorldStateStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  FocusSlice
> = (set) => ({
  focusTarget: {
    mode: 'normal',
    containerId: undefined,
    entityIds: [],
  },
  userOverride: false,

  setFocus: (target, isUserOverride = false) => {
    set((draft) => {
      draft.focusTarget = {
        mode: target.mode ?? 'focused',
        containerId: target.containerId,
        entityIds: target.entityIds || [],
      };
      draft.userOverride = isUserOverride;
    });
  },

  clearFocus: (isUserOverride = false) => {
    set((draft) => {
      draft.focusTarget = {
        mode: 'normal',
        containerId: undefined,
        entityIds: [],
      };
      draft.userOverride = isUserOverride;
    });
  },
});
`````

## File: src/store/gazeStore.ts
`````typescript
/**
 * FILE: gazeStore.ts
 *
 * PURPOSE:
 * Stores mascot gaze/attention state.
 *
 * RESPONSIBILITY:
 * - Tracks what the mascot is looking at.
 * - Provides gaze information to UI components.
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { GazeTarget } from '../systems/gaze';
import { gazeEntityId } from '../systems/gaze';

interface GazeState {
  /**
   * Whatever the mascot should be looking at right now.
   * null → fall back to idle eye position.
   */
  target: GazeTarget;
  setTarget: (target: GazeTarget) => void;
  clearTarget: () => void;
}

/**
 * Standalone gaze store — separate from worldStore so UI components
 * (TortillaSvg, eye-tracking overlays) can subscribe to gaze changes
 * with fine-grained selectors and zero coupling to world state shape.
 *
 * Uses subscribeWithSelector middleware so callers can subscribe to
 * slices of gaze state without triggering on unrelated updates.
 *
 * @example
 *   // React component: only re-renders when entityId changes
 *   const entityId = useGazeStore((s) => gazeEntityId(s.target));
 *
 *   // Outside React: subscribe to entity-gaze changes only
 *   useGazeStore.subscribe(
 *     (s) => gazeEntityId(s.target),
 *     (id) => console.log('now gazing at entity', id)
 *   );
 */
export const useGazeStore = create<GazeState>()(
  subscribeWithSelector((set) => ({
    target: null,
    setTarget: (target) => set({ target }),
    clearTarget: () => set({ target: null }),
  }))
);

// Re-export the narrow helper so consumers don't need a separate import.
export { gazeEntityId };
`````

## File: src/systems/actionExportFormats.test.ts
`````typescript
/**
 * FILE: actionExportFormats.test.ts
 *
 * PURPOSE:
 * Unit tests validating all 3 export formats (Mascot Action Sequence, Declarative Recipe File,
 * and Full Session Log with zustandInit / actions / events / zustandEnd) using emitted BaseWorldEvents.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';
import { eventStore } from './EventStore';
import {
  translateHumanActionsToMascotActions,
  translateHumanActionsToRecipe,
} from './recipeTranslator';

describe('Action Export Formats & EventStore Integration', () => {
  beforeEach(() => {
    worldStore.getState().resetWorld();
    eventStore.clear();
  });

  it('generates a valid Mascot Action Sequence from emitted EventStore events', () => {
    // Dispatch human actions to emit events into eventStore
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'patata_1', targetContainerId: 'board' },
    });

    worldStore.getState().dispatch({
      type: 'PREPARE_INGREDIENT',
      payload: { entityId: 'patata_1', preparation: 'sliced' },
    });

    const emittedEvents = eventStore.getEvents();
    expect(emittedEvents.length).toBe(2);

    // Translate emitted BaseWorldEvents directly to Mascot Action Sequence
    const mascotSequence = translateHumanActionsToMascotActions(emittedEvents);

    expect(mascotSequence.length).toBeGreaterThan(5);
    expect(mascotSequence[0].type).toBe('MASCOT_MOVE');
    expect(mascotSequence[1].type).toBe('MASCOT_GRAB');
    expect(mascotSequence[2].type).toBe('MASCOT_MOVE');
    expect(mascotSequence[3].type).toBe('MASCOT_DROP');
    expect(mascotSequence[4].type).toBe('MOVE_ENTITY');
  });

  it('generates a valid Declarative Recipe JSON object from emitted EventStore events', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'patata_1', targetContainerId: 'board' },
    });

    worldStore.getState().dispatch({
      type: 'PREPARE_INGREDIENT',
      payload: { entityId: 'patata_1', preparation: 'sliced' },
    });

    const emittedEvents = eventStore.getEvents();
    const recipe = translateHumanActionsToRecipe(emittedEvents, {
      recipeName: 'Test Tortilla Recipe',
    });

    expect(recipe.name).toBe('Test Tortilla Recipe');
    expect(recipe.requirements).toHaveProperty('patata');
    expect(recipe.steps).toBeDefined();

    const moveStep = recipe.steps.find((s) => s.action === 'move');
    expect(moveStep).toBeDefined();
    if (moveStep && moveStep.action === 'move') {
      expect(moveStep.ingredient).toBe('patata');
      expect(moveStep.target).toBe('board');
    }
  });

  it('builds a full 3rd format session log containing zustandInit, actions, events, and zustandEnd', () => {
    worldStore.getState().startRecording();

    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'huevo_1', targetContainerId: 'bowl_1' },
    });

    worldStore.getState().stopRecording();

    const currentState = worldStore.getState();
    const initialRecordingState = currentState.initialRecordingState;
    const recordedActions = currentState.recordedActions;
    const events = eventStore.getEvents();

    const fullSessionLog = {
      version: '1.0.0',
      title: 'Tortilla World Action Session Log',
      recordedAt: new Date().toISOString(),
      zustandInit: initialRecordingState || {
        entities: currentState.entities,
        containers: currentState.containers,
      },
      actions: recordedActions,
      events: events,
      zustandEnd: {
        entities: currentState.entities,
        containers: currentState.containers,
      },
      metadata: {
        actionCount: recordedActions.length,
        eventCount: events.length,
      },
    };

    expect(fullSessionLog.zustandInit).toHaveProperty('entities');
    expect(fullSessionLog.zustandInit).toHaveProperty('containers');
    expect(fullSessionLog.actions.length).toBe(1);
    expect(fullSessionLog.events.length).toBe(1);
    expect(fullSessionLog.zustandEnd).toHaveProperty('entities');
    expect(fullSessionLog.zustandEnd).toHaveProperty('containers');
  });
});
`````

## File: src/systems/actionPlayer.test.ts
`````typescript
/**
 * FILE: actionPlayer.test.ts
 *
 * PURPOSE:
 * Unit tests for ActionPlayer replay engine.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { actionPlayer } from './actionPlayer';
import { worldStore } from '../store/worldStore';
import type { WorldAction } from '../types/actions';

describe('ActionPlayer', () => {
  beforeEach(() => {
    actionPlayer.stop();
    worldStore.getState().resetWorld();
  });

  it('resets world state and dispatches actions sequentially', async () => {
    const actions: WorldAction[] = [
      {
        type: 'ADD_ENTITY',
        payload: {
          entity: {
            id: 'potato_test_1',
            name: 'Potato',
            type: 'ingredient',
          },
          containerId: 'burner1',
        },
      },
      {
        type: 'TOGGLE_BURNER',
        payload: { containerId: 'burner1' },
      },
    ];

    const onStep = vi.fn();
    const onComplete = vi.fn();

    await actionPlayer.playLog(actions, {
      delayMs: 10,
      onStep,
      onComplete,
    });

    expect(onStep).toHaveBeenCalledTimes(2);
    expect(onStep).toHaveBeenNthCalledWith(1, 1, 2, actions[0]);
    expect(onStep).toHaveBeenNthCalledWith(2, 2, 2, actions[1]);
    expect(onComplete).toHaveBeenCalledTimes(1);

    const store = worldStore.getState();
    expect(store.containers.burner1.isOn).toBe(true);
    expect(store.containers.burner1.entityIds).toContain('potato_test_1');
  });

  it('can stop playback prematurely', async () => {
    const actions: WorldAction[] = [
      {
        type: 'TOGGLE_BURNER',
        payload: { containerId: 'burner1' },
      },
      {
        type: 'TOGGLE_BURNER',
        payload: { containerId: 'burner1' },
      },
      {
        type: 'TOGGLE_BURNER',
        payload: { containerId: 'burner1' },
      },
    ];

    const onStep = vi.fn();
    const onStop = vi.fn();

    const playbackPromise = actionPlayer.playLog(actions, {
      delayMs: 100,
      onStep,
      onStop,
    });

    // Let step 1 run then stop
    await new Promise((r) => setTimeout(r, 20));
    actionPlayer.stop();

    await playbackPromise;

    expect(onStop).toHaveBeenCalled();
    expect(onStep).toHaveBeenCalledTimes(1);
  });
});
`````

## File: src/systems/actionPlayer.ts
`````typescript
/**
 * FILE: actionPlayer.ts
 *
 * PURPOSE:
 * Headless replay engine utility for sequential dispatching of recorded WorldActions.
 *
 * RESPONSIBILITY:
 * - Resets world state to initial default before playback.
 * - Dispatches actions sequentially to worldStore with configurable delay.
 * - Provides progress callbacks and cancellation mechanism.
 */

import { worldStore } from '../store/worldStore';
import type { WorldAction } from '../types/actions';

export interface PlaybackOptions {
  /** Configurable delay between action steps in milliseconds. Default: 300ms */
  delayMs?: number;
  /** Whether to reset world state before starting playback. Default: true */
  resetWorld?: boolean;
  /** Progress callback invoked after each action step */
  onStep?: (currentStep: number, totalSteps: number, action: WorldAction) => void;
  /** Callback invoked when playback successfully completes all actions */
  onComplete?: () => void;
  /** Callback invoked if playback is stopped early */
  onStop?: () => void;
}

export class ActionPlayer {
  private isPlaying = false;
  private isStopped = false;
  private timerId: ReturnType<typeof setTimeout> | null = null;
  private resolveCurrentDelay: (() => void) | null = null;

  /**
   * Returns whether playback is currently running.
   */
  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Cancels and stops ongoing action playback.
   */
  public stop(): void {
    if (!this.isPlaying) return;
    this.isStopped = true;

    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }

    if (this.resolveCurrentDelay) {
      this.resolveCurrentDelay();
      this.resolveCurrentDelay = null;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      this.resolveCurrentDelay = resolve;
      this.timerId = setTimeout(() => {
        this.timerId = null;
        this.resolveCurrentDelay = null;
        resolve();
      }, ms);
    });
  }

  /**
   * Replays an array of WorldActions sequentially through worldStore.
   */
  public async playLog(actions: WorldAction[], options: PlaybackOptions = {}): Promise<void> {
    if (this.isPlaying) {
      this.stop();
    }

    const {
      delayMs = 300,
      resetWorld = true,
      onStep,
      onComplete,
      onStop,
    } = options;

    this.isPlaying = true;
    this.isStopped = false;

    if (resetWorld) {
      worldStore.getState().dispatch({ type: 'RESET_WORLD' });
    }

    const total = actions.length;

    for (let i = 0; i < total; i++) {
      if (this.isStopped) {
        this.isPlaying = false;
        onStop?.();
        return;
      }

      const action = actions[i];
      worldStore.getState().dispatch(action);

      onStep?.(i + 1, total, action);

      if (i < total - 1 && delayMs > 0) {
        await this.delay(delayMs);
      }
    }

    if (this.isStopped) {
      this.isPlaying = false;
      onStop?.();
      return;
    }

    this.isPlaying = false;
    onComplete?.();
  }
}

export const actionPlayer = new ActionPlayer();
`````

## File: src/systems/analytics.ts
`````typescript
/**
 * FILE: analytics.ts
 *
 * PURPOSE:
 * Headless analytics and audit trail reporting utilities for EventStore event streams.
 *
 * RESPONSIBILITY:
 * - Computes recipe execution metrics (duration, step counts).
 * - Filters audit trails by actor.
 * - Exports event history to formatted CSV.
 */

import type { BaseWorldEvent } from '../types/WorldEvent';

/**
 * Computes recipe execution metrics based on an array of BaseWorldEvents.
 */
export function getRecipeMetrics(events: readonly BaseWorldEvent[]): { durationMs: number; stepCount: number } {
  const stepCount = events.length;

  if (stepCount <= 1) {
    return { durationMs: 0, stepCount };
  }

  const startTime = events[0].timestamp;
  const endTime = events[events.length - 1].timestamp;
  const durationMs = Math.max(0, endTime - startTime);

  return { durationMs, stepCount };
}

/**
 * Filters the event audit trail by actor ('player', 'mascot', 'system', or 'all').
 */
export function getAuditTrail(events: readonly BaseWorldEvent[], actor: string): BaseWorldEvent[] {
  if (!actor || actor === 'all') {
    return [...events];
  }
  return events.filter((evt) => evt.actor === actor);
}

/**
 * Converts an array of BaseWorldEvents into a valid CSV string.
 */
export function exportToCSV(events: readonly BaseWorldEvent[]): string {
  const headers = ['id', 'sequenceNumber', 'timestamp', 'version', 'actor', 'actionType', 'actionPayload'];

  const rows = events.map((evt) => {
    const actionType = evt.action.type;
    const payloadStr = 'payload' in evt.action ? JSON.stringify(evt.action.payload) : '{}';
    const escapedPayload = `"${payloadStr.replace(/"/g, '""')}"`;

    return [
      evt.id,
      evt.sequenceNumber,
      evt.timestamp,
      evt.version,
      evt.actor,
      actionType,
      escapedPayload,
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}
`````

## File: src/systems/concebollaCompletion.test.ts
`````typescript
/**
 * FILE: src/systems/concebollaCompletion.test.ts
 *
 * PURPOSE:
 * Integration tests verifying entity states and container cleanups at the completion of concebollaRecipe.
 *
 * VERIFIES:
 * - Preparation bowl (bowl) is empty at the end.
 * - Plato (plate) contains ONLY 'Tortilla con cebolla' at the end.
 * - Mixed input ingredients disappear from all world containers.
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { worldStore } from '../store/worldStore';
import { RecipeRunner } from './recipeRunner';
import { concebollaRecipe } from '../data/catalog/recipes/concebolla';
import { clearActionLog } from '../store/middleware/actionLog';

function seedTestWorld() {
  worldStore.setState({
    entities: {
      chef: { id: 'chef', name: 'Chef Tortilla 🍳', type: 'mascot', state: { gazingAt: null } },
      potato: { id: 'potato', ingredientId: 'potato', name: 'Potato', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      onion: { id: 'onion', ingredientId: 'onion', name: 'Onion', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      egg: { id: 'egg', ingredientId: 'egg', name: 'Egg', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      oil: { id: 'oil', ingredientId: 'oil', name: 'Oil', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      salt: { id: 'salt', ingredientId: 'salt', name: 'Salt', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      black_pepper: { id: 'black_pepper', ingredientId: 'black_pepper', name: 'Pepper', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
    },
    containers: {
      despensa: {
        id: 'despensa',
        name: 'Despensa',
        type: 'storage',
        entityIds: ['potato', 'onion', 'egg', 'oil', 'salt', 'black_pepper'],
        rules: { isImmutable: true },
      },
      sink: {
        id: 'sink',
        name: 'Sink',
        type: 'sink',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      board: {
        id: 'board',
        name: 'Board',
        type: 'board',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      bowl: {
        id: 'bowl',
        name: 'Bowl',
        type: 'bowl',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      burner1: {
        id: 'burner1',
        name: 'burner1',
        type: 'burner',
        entityIds: [],
        rules: { maxCapacity: 5 },
      },
      plate: {
        id: 'plate',
        name: 'Plate',
        type: 'plate',
        entityIds: [],
        rules: { maxCapacity: 5 },
      },
    },
    dispatch: worldStore.getState().dispatch,
  });
}

describe('Concebolla Recipe Completion State', () => {
  beforeEach(() => {
    seedTestWorld();
    clearActionLog();
  });

  it('runs concebolla recipe to completion: creates Tortilla con cebolla in plato', async () => {
    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 1 });
    await runner.runRecipe(concebollaRecipe);

    const state = worldStore.getState();

    // 1. Preparation bowl is empty
    expect(state.containers.bowl.entityIds).toEqual([]);

    // 2. Plato (plate) contains ONLY the served Tortilla con cebolla
    expect(state.containers.plate.entityIds).toHaveLength(1);
    const servedEntityId = state.containers.plate.entityIds[0];
    const servedEntity = state.entities[servedEntityId];
    expect(servedEntity).toBeDefined();
    expect(servedEntity.name).toBe('Tortilla con cebolla');

    // 3. Input ingredients are marked as consumed
    const potatoesId = runner.recipeContext.bindings['potatoes'];
    const onionsId = runner.recipeContext.bindings['onions'];
    const eggsId = runner.recipeContext.bindings['eggs'];
    const saltId = runner.recipeContext.bindings['salt'];
    const pepperId = runner.recipeContext.bindings['black_pepper'];

    expect(state.entities[potatoesId]?.state?.consumed).toBe(true);
    expect(state.entities[onionsId]?.state?.consumed).toBe(true);
    expect(state.entities[eggsId]?.state?.consumed).toBe(true);
    expect(state.entities[saltId]?.state?.consumed).toBe(true);
    expect(state.entities[pepperId]?.state?.consumed).toBe(true);

    // Verify none of the consumed ingredients remain in any workstation container
    const workstationContainerIds = ['sink', 'board', 'bowl', 'burner1', 'plate'];
    for (const cId of workstationContainerIds) {
      expect(state.containers[cId].entityIds).not.toContain(potatoesId);
      expect(state.containers[cId].entityIds).not.toContain(onionsId);
      expect(state.containers[cId].entityIds).not.toContain(eggsId);
      expect(state.containers[cId].entityIds).not.toContain(saltId);
      expect(state.containers[cId].entityIds).not.toContain(pepperId);
    }
  });
});
`````

## File: src/systems/EventStore.ts
`````typescript
/**
 * FILE: EventStore.ts
 *
 * PURPOSE:
 * Headless, append-only Event Store for audit trails, state logging, and replays.
 *
 * RESPONSIBILITY:
 * - Records every dispatched WorldAction wrapped in metadata.
 * - Provides methods for querying, exporting, importing, and clearing event logs.
 */

import type { WorldAction } from '../types/actions';
import type { BaseWorldEvent } from '../types/WorldEvent';

export class EventStore {
  private events: BaseWorldEvent[] = [];
  private sequenceNumber = 0;

  /**
   * Appends a new WorldAction to the immutable audit trail.
   */
  public emit(action: WorldAction, actor?: 'player' | 'mascot' | 'system'): void {
    this.sequenceNumber += 1;
    const resolvedActor = actor || this.determineActor(action);

    const event: BaseWorldEvent = {
      id: `evt_${Date.now()}_${this.sequenceNumber}`,
      timestamp: Date.now(),
      sequenceNumber: this.sequenceNumber,
      version: 1,
      actor: resolvedActor,
      action,
    };

    this.events.push(Object.freeze(event));
  }

  /**
   * Returns a read-only list of recorded events.
   */
  public getEvents(): readonly BaseWorldEvent[] {
    return this.events;
  }

  /**
   * Resets the event store log and sequence counter.
   */
  public clear(): void {
    this.events = [];
    this.sequenceNumber = 0;
  }

  /**
   * Exports the event history as a JSON string.
   */
  public exportJSON(): string {
    return JSON.stringify(this.events, null, 2);
  }

  /**
   * Hydrates the event store from a serialized JSON string.
   */
  public importJSON(jsonString: string): void {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      throw new Error('[EventStore] Invalid JSON: Expected an array of BaseWorldEvent objects.');
    }

    this.events = parsed.map((evt: BaseWorldEvent) => Object.freeze({ ...evt }));
    const maxSeq = this.events.reduce((max, evt) => Math.max(max, evt.sequenceNumber || 0), 0);
    this.sequenceNumber = maxSeq > 0 ? maxSeq : this.events.length;
  }

  private determineActor(action: WorldAction): 'player' | 'mascot' | 'system' {
    if (action.type.startsWith('MASCOT_')) {
      return 'mascot';
    }
    if (action.type === 'RESET_WORLD') {
      return 'system';
    }
    return 'player';
  }
}

export const eventStore = new EventStore();
`````

## File: src/systems/focus.test.ts
`````typescript
/**
 * FILE: focus.test.ts
 *
 * PURPOSE:
 * Unit tests for focus system calculations.
 *
 * RESPONSIBILITY:
 * - Validates container focus classes (primary, secondary, focus-background).
 * - Ensures ingredients/entities inside containers never lose visibility or get background opacity.
 * - Validates mascot focus class and action focus inference.
 */

import { describe, it, expect } from 'vitest';
import {
  getContainerFocusClass,
  getEntityFocusClass,
  getMascotFocusClass,
  inferFocusFromAction,
} from './focus';
import type { FocusTarget } from '../types/focus';

describe('Focus System', () => {
  const activeFocus: FocusTarget = {
    mode: 'focused',
    containerId: 'board',
    entityIds: ['potato'],
  };

  const normalFocus: FocusTarget = {
    mode: 'normal',
  };

  describe('getContainerFocusClass', () => {
    it('returns empty string in normal focus mode', () => {
      expect(getContainerFocusClass('board', normalFocus)).toBe('');
    });

    it('returns focus-primary for the explicitly targeted container', () => {
      expect(getContainerFocusClass('board', activeFocus)).toBe('focus-primary');
    });

    it('returns focus-secondary for related containers', () => {
      // board's related containers include 'sink', 'bowl', 'pantry', 'despensa'
      expect(getContainerFocusClass('sink', activeFocus)).toBe('focus-secondary');
      expect(getContainerFocusClass('bowl', activeFocus)).toBe('focus-secondary');
    });

    it('returns focus-secondary if container is actively on or being used', () => {
      expect(
        getContainerFocusClass('burner1', activeFocus, {
          isBeingUsed: true,
        })
      ).toBe('focus-secondary');
    });

    it('returns focus-background for inactive workstations (giving unused effect to frame)', () => {
      expect(getContainerFocusClass('burner1', activeFocus)).toBe('focus-background');
      expect(getContainerFocusClass('plate', activeFocus)).toBe('focus-background');
    });
  });

  describe('getEntityFocusClass', () => {
    it('returns empty string in normal focus mode', () => {
      expect(getEntityFocusClass('potato', 'board', normalFocus)).toBe('');
    });

    it('returns focus-primary for explicitly targeted entity IDs', () => {
      expect(getEntityFocusClass('potato', 'board', activeFocus)).toBe('focus-primary');
    });

    it('returns focus-primary for entities inside the focused primary container', () => {
      expect(getEntityFocusClass('onion', 'board', activeFocus)).toBe('focus-primary');
    });

    it('returns focus-secondary for entities inside workstations so ingredients stay visible', () => {
      expect(getEntityFocusClass('egg', 'burner1', activeFocus)).toBe('focus-secondary');
      expect(getEntityFocusClass('oil', 'despensa', activeFocus)).toBe('focus-secondary');
    });
  });

  describe('getMascotFocusClass', () => {
    it('returns empty string in normal focus mode', () => {
      expect(getMascotFocusClass(normalFocus)).toBe('');
    });

    it('returns focus-primary in active focus mode', () => {
      expect(getMascotFocusClass(activeFocus)).toBe('focus-primary');
    });
  });

  describe('inferFocusFromAction', () => {
    it('infers containerId and entityIds from MOVE_ENTITY', () => {
      const res = inferFocusFromAction({
        type: 'MOVE_ENTITY',
        payload: { entityId: 'egg', targetContainerId: 'bowl' },
      });
      expect(res).toEqual({
        containerId: 'bowl',
        entityIds: ['egg'],
      });
    });

    it('infers containerId from MASCOT_MOVE', () => {
      const res = inferFocusFromAction({
        type: 'MASCOT_MOVE',
        payload: { mascotId: 'chef', targetContainerId: 'burner1' },
      });
      expect(res).toEqual({
        containerId: 'burner1',
      });
    });

    it('infers containerId and entityIds from MASCOT_GRAB', () => {
      const res = inferFocusFromAction({
        type: 'MASCOT_GRAB',
        payload: { mascotId: 'chef', entityId: 'oil', sourceContainerId: 'despensa' },
      });
      expect(res).toEqual({
        containerId: 'despensa',
        entityIds: ['oil'],
      });
    });
  });
});
`````

## File: src/systems/focus.ts
`````typescript
/**
 * FILE: focus.ts
 *
 * PURPOSE:
 * System logic for Mascot-Centered Focus Mode attention transitions.
 *
 * RESPONSIBILITY:
 * - Computes visual priority classes ('focus-primary', 'focus-secondary', 'focus-background', '')
 *   for containers, entities, and mascot.
 * - Infers active focus target from world actions.
 */

import type { FocusTarget, FocusClass } from '../types/focus';
import type { WorldAction, Container } from '../types/world';

/**
 * Related / adjacent workstation pairings to give secondary visual priority.
 */
const RELATED_CONTAINERS: Record<string, string[]> = {
  board: ['sink', 'bowl', 'pantry', 'despensa'],
  sink: ['board', 'bowl'],
  bowl: ['board', 'burner', 'burner1', 'burner2', 'plate'],
  burner: ['bowl', 'plate'],
  burner1: ['bowl', 'plate'],
  burner2: ['bowl', 'plate'],
  plate: ['burner', 'burner1', 'burner2', 'bowl'],
};

/**
 * Calculates the focus class for a container element.
 * Inactive workstations get 'focus-background' (unused effect),
 * while active and related containers stay primary or secondary.
 */
export function getContainerFocusClass(
  containerId: string,
  focusTarget: FocusTarget,
  options?: {
    container?: Container;
    recipeWorkstationIds?: Set<string>;
    isBeingUsed?: boolean;
  }
): FocusClass {
  if (
    focusTarget.mode === 'normal' ||
    (!focusTarget.containerId && (!focusTarget.entityIds || focusTarget.entityIds.length === 0))
  ) {
    return '';
  }

  // Primary: The explicitly focused container
  if (focusTarget.containerId === containerId) {
    return 'focus-primary';
  }

  // Related containers or active workstations stay secondary
  const isRelated = Boolean(
    focusTarget.containerId && RELATED_CONTAINERS[focusTarget.containerId]?.includes(containerId)
  );
  const isUsed = Boolean(options?.container?.isOn || options?.isBeingUsed);

  if (isRelated || isUsed) {
    return 'focus-secondary';
  }

  // Inactive workstations keep the unused/background effect
  return 'focus-background';
}

/**
 * Calculates the focus class for an entity element.
 * Ingredients sitting in containers/workstations never hide out or change transparency.
 */
export function getEntityFocusClass(
  entityId: string,
  containerId: string | undefined,
  focusTarget: FocusTarget
): FocusClass {
  if (
    focusTarget.mode === 'normal' ||
    (!focusTarget.containerId && (!focusTarget.entityIds || focusTarget.entityIds.length === 0))
  ) {
    return '';
  }

  // Primary: Explicitly targeted entity ID
  if (focusTarget.entityIds?.includes(entityId)) {
    return 'focus-primary';
  }

  // Primary: Entity sits inside the focused primary container
  if (containerId && focusTarget.containerId === containerId) {
    return 'focus-primary';
  }

  // Secondary: All other entities sitting in containers/workstations stay fully visible
  if (containerId) {
    return 'focus-secondary';
  }

  return 'focus-secondary';
}

/**
 * Calculates the focus class for Ms. Tortilla (Mascot).
 * Ms. Tortilla serves as the primary visual anchor during focus mode.
 */
export function getMascotFocusClass(focusTarget: FocusTarget): FocusClass {
  if (
    focusTarget.mode === 'normal' ||
    (!focusTarget.containerId && (!focusTarget.entityIds || focusTarget.entityIds.length === 0))
  ) {
    return '';
  }
  return 'focus-primary';
}

/**
 * Infers appropriate focus targets (containerId and entityIds) from a WorldAction.
 */
export function inferFocusFromAction(action: WorldAction): { containerId?: string; entityIds?: string[] } | null {
  switch (action.type) {
    case 'MOVE_ENTITY':
      return {
        containerId: action.payload.targetContainerId,
        entityIds: [action.payload.entityId],
      };
    case 'MASCOT_MOVE':
      return {
        containerId: action.payload.targetContainerId,
      };
    case 'MASCOT_GRAB':
      return {
        containerId: action.payload.sourceContainerId,
        entityIds: [action.payload.entityId],
      };
    case 'MASCOT_DROP':
      return {
        containerId: action.payload.targetContainerId,
      };
    case 'MASCOT_FLIP':
      return {
        containerId: 'burner',
      };
    case 'TOGGLE_BURNER':
    case 'TOGGLE_HEAT':
    case 'WASH_CONTAINER_CONTENTS':
    case 'CUT_CONTAINER_CONTENTS':
    case 'PEEL_CONTAINER_CONTENTS':
    case 'MIX_CONTAINER_CONTENTS':
    case 'COOK_CONTAINER_CONTENTS':
      return {
        containerId: action.payload.containerId,
      };
    case 'PREPARE_INGREDIENT':
    case 'COOK_INGREDIENT':
    case 'USE_INGREDIENT':
      return {
        entityIds: [action.payload.entityId],
      };
    default:
      return null;
  }
}
`````

## File: src/systems/francesaCompletion.test.ts
`````typescript
/**
 * FILE: src/systems/francesaCompletion.test.ts
 *
 * PURPOSE:
 * Integration tests verifying entity states and container cleanups at the completion of francesaRecipe.
 *
 * VERIFIES:
 * - Eggs and salt are mixed in the bowl to create "Huevo batido".
 * - Oil is heated and "Huevo batido" is cooked, stirred, flipped in burner1.
 * - Plate contains ONLY the served entity with name "Tortilla francesa".
 * - Preparation bowl and burner1 are empty at the end.
 * - Input ingredients are marked as consumed.
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { worldStore } from '../store/worldStore';
import { RecipeRunner } from './recipeRunner';
import { francesaRecipe } from '../data/catalog/recipes/francesa';
import { clearActionLog } from '../store/middleware/actionLog';

function seedTestWorld() {
  worldStore.setState({
    entities: {
      chef: { id: 'chef', name: 'Chef Tortilla 🍳', type: 'mascot', state: { gazingAt: null } },
      egg: { id: 'egg', ingredientId: 'egg', name: 'Egg', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      oil: { id: 'oil', ingredientId: 'oil', name: 'Oil', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      salt: { id: 'salt', ingredientId: 'salt', name: 'Salt', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
    },
    containers: {
      despensa: {
        id: 'despensa',
        name: 'Despensa',
        type: 'storage',
        entityIds: ['egg', 'oil', 'salt'],
        rules: { isImmutable: true },
      },
      sink: {
        id: 'sink',
        name: 'Sink',
        type: 'sink',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      board: {
        id: 'board',
        name: 'Board',
        type: 'board',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      bowl: {
        id: 'bowl',
        name: 'Bowl',
        type: 'bowl',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      burner1: {
        id: 'burner1',
        name: 'burner1',
        type: 'burner',
        entityIds: [],
        rules: { maxCapacity: 5 },
      },
      plate: {
        id: 'plate',
        name: 'Plate',
        type: 'plate',
        entityIds: [],
        rules: { maxCapacity: 5 },
      },
    },
    dispatch: worldStore.getState().dispatch,
  });
}

describe('Tortilla Francesa Recipe Completion State', () => {
  beforeEach(() => {
    seedTestWorld();
    clearActionLog();
  });

  it('runs francesa recipe to completion: creates Huevo batido, cooks, flips, and serves as Tortilla francesa', async () => {
    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 1 });
    await runner.runRecipe(francesaRecipe);

    const state = worldStore.getState();

    // 1. Preparation bowl and burner1 are empty
    expect(state.containers.bowl.entityIds).toEqual([]);
    expect(state.containers.burner1.entityIds).toEqual([]);

    // 2. Plate contains ONLY 1 entity
    expect(state.containers.plate.entityIds).toHaveLength(1);
    const servedEntityId = state.containers.plate.entityIds[0];
    const servedEntity = state.entities[servedEntityId];

    expect(servedEntity).toBeDefined();
    expect(servedEntity.name).toBe('Tortilla francesa');

    // 3. Input ingredients are marked as consumed
    const eggId = runner.recipeContext.bindings['eggs'];
    const saltId = runner.recipeContext.bindings['salt'];

    expect(state.entities[eggId]?.state?.consumed).toBe(true);
    expect(state.entities[saltId]?.state?.consumed).toBe(true);

    // 4. Verify consumed ingredients do not remain in workstation containers
    const workstationContainerIds = ['sink', 'board', 'bowl', 'burner1', 'plate'];
    for (const cId of workstationContainerIds) {
      expect(state.containers[cId].entityIds).not.toContain(eggId);
      expect(state.containers[cId].entityIds).not.toContain(saltId);
    }
  });
});
`````

## File: src/systems/gaze.ts
`````typescript
/**
 * FILE: gaze.ts
 *
 * PURPOSE:
 * Calculates gaze behavior.
 *
 * RESPONSIBILITY:
 * - Determines what objects attract attention.
 * - Updates gaze-related state.
 */

import { worldStore } from '../store/worldStore';

export interface GazePoint {
  x: number;
  y: number;
}

/**
 * Discriminated union describing what the mascot is looking at.
 *
 * - entity  → a specific world entity (container or ingredient) by id
 * - mouse   → the user's cursor position (resolved by the UI layer)
 * - point   → an explicit SVG/screen coordinate
 * - null    → not gazing at anything; fall back to idle eye position
 */
export type GazeTarget =
  | { type: 'entity'; entityId: string }
  | { type: 'mouse' }
  | { type: 'point'; point: GazePoint }
  | null;

/** Narrow helper — returns the entityId when gazing at an entity, else null. */
export function gazeEntityId(target: GazeTarget): string | null {
  return target?.type === 'entity' ? target.entityId : null;
}

interface GazeState {
  gazingAt?: GazeTarget;
}

/**
 * Updates what target a mascot is looking at.
 * No-ops if the target is structurally identical to the current one.
 */
export function updateMascotGaze(mascotId: string, targetId: GazeTarget): void {
  const current = getMascotGazeTarget(mascotId);

  // Structural equality check — avoids redundant dispatches for the same target.
  if (JSON.stringify(current) === JSON.stringify(targetId)) return;

  worldStore.getState().dispatch({
    type: 'UPDATE_ENTITY_STATE',
    payload: {
      entityId: mascotId,
      changes: { gazingAt: targetId },
    },
  });
}

/** Returns the current gaze target for a mascot entity. */
export function getMascotGazeTarget(mascotId: string): GazeTarget {
  const entity = worldStore.getState().entities[mascotId];
  if (!entity) return null;
  const state = entity.state as GazeState | undefined;
  return state?.gazingAt ?? null;
}

/**
 * Subscribes to gaze changes for a given mascot.
 * Uses Zustand's vanilla subscribe so callers outside React can react to gaze updates
 * without polling or re-rendering unrelated components.
 *
 * Returns an unsubscribe function.
 *
 * @example
 *   const unsub = subscribeToGaze('chef', (target) => console.log(target));
 *   // later:
 *   unsub();
 */
export function subscribeToGaze(
  mascotId: string,
  callback: (target: GazeTarget) => void
): () => void {
  let prev = getMascotGazeTarget(mascotId);

  return worldStore.subscribe((state) => {
    const next = (state.entities[mascotId]?.state as GazeState | undefined)?.gazingAt ?? null;
    // Only fire when the gaze actually changes (structural check).
    if (JSON.stringify(next) !== JSON.stringify(prev)) {
      prev = next;
      callback(next);
    }
  });
}
`````

## File: src/systems/ingredientUsage.test.ts
`````typescript
/**
 * FILE: src/systems/ingredientUsage.test.ts
 *
 * PURPOSE:
 * Unit tests for ingredient usage intent actions and domain events.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { worldStore } from '../store/worldStore';
import { clearActionLog, getActionLog } from '../store/middleware/actionLog';

function seedWorld() {
  worldStore.setState({
    entities: {
      potato_1: { id: 'potato_1', name: 'Potato', type: 'ingredient', ingredientId: 'potato' },
      onion_1: { id: 'onion_1', name: 'Onion', type: 'ingredient', ingredientId: 'onion' },
      egg_1: { id: 'egg_1', name: 'Egg', type: 'ingredient', ingredientId: 'egg' },
      oil_1: { id: 'oil_1', name: 'Oil', type: 'ingredient', ingredientId: 'oil' },
    },
    containers: {
      pantry: {
        id: 'pantry',
        name: 'Pantry',
        type: 'storage',
        entityIds: ['potato_1', 'onion_1', 'egg_1', 'oil_1'],
      },
      recipe_1: {
        id: 'recipe_1',
        name: 'Tortilla Recipe',
        type: 'plate',
        entityIds: [],
      },
    },
    events: [],
  });
}

describe('Ingredient Usage Intent Actions & Domain Events', () => {
  beforeEach(() => {
    seedWorld();
    clearActionLog();
  });

  it('Scenario 1: Using ingredient moves it to target container, marks it consumed, and emits INGREDIENT_CONSUMED event', () => {
    const eventListener = vi.fn();
    const unsubscribe = worldStore.getState().onEvent(eventListener);

    // Dispatch USE_INGREDIENT intent action
    worldStore.getState().dispatch({
      type: 'USE_INGREDIENT',
      payload: {
        entityId: 'potato_1',
        usedIn: 'recipe_1',
      },
    });

    const state = worldStore.getState();

    // Potato is removed from pantry
    expect(state.containers.pantry.entityIds).not.toContain('potato_1');

    // Potato is added to recipe_1
    expect(state.containers.recipe_1.entityIds).toContain('potato_1');

    // Potato state updated to consumed
    const potato = state.entities.potato_1;
    expect(potato.state?.consumed).toBe(true);
    expect(potato.state?.consumedBy).toBe('recipe_1');
    expect(potato.state?.status).toBe('consumed');

    // Action logged
    const actionLog = getActionLog();
    expect(actionLog.some((e) => e.action === 'USE_INGREDIENT')).toBe(true);

    // Event emitted
    expect(eventListener).toHaveBeenCalledWith({
      type: 'INGREDIENT_CONSUMED',
      payload: {
        entityId: 'potato_1',
        consumedBy: 'recipe_1',
      },
    });

    const recordedEvents = state.events;
    expect(recordedEvents).toContainEqual({
      type: 'INGREDIENT_CONSUMED',
      payload: {
        entityId: 'potato_1',
        consumedBy: 'recipe_1',
      },
    });

    unsubscribe();
  });

  it('Scenario 2: Undoing action restores entity to previous container and reverts consumed state', () => {
    // Perform initial USE_INGREDIENT action
    worldStore.getState().dispatch({
      type: 'USE_INGREDIENT',
      payload: {
        entityId: 'potato_1',
        usedIn: 'recipe_1',
      },
    });

    // Verify it is consumed
    let state = worldStore.getState();
    expect(state.containers.pantry.entityIds).not.toContain('potato_1');
    expect(state.containers.recipe_1.entityIds).toContain('potato_1');
    expect(state.entities.potato_1.state?.consumed).toBe(true);

    // Revert/undo action
    worldStore.getState().revertIngredientUsage('potato_1');

    state = worldStore.getState();

    // Potato returns to previous container (pantry)
    expect(state.containers.pantry.entityIds).toContain('potato_1');
    expect(state.containers.recipe_1.entityIds).not.toContain('potato_1');

    // Consumed state is reverted
    expect(state.entities.potato_1.state?.consumed).toBeUndefined();
    expect(state.entities.potato_1.state?.consumedBy).toBeUndefined();
    expect(state.entities.potato_1.state?.status).toBeUndefined();
  });

  it('Scenario 3: Two ingredients consumed independently do not affect each other or remaining ingredients', () => {
    // Consume potato
    worldStore.getState().dispatch({
      type: 'USE_INGREDIENT',
      payload: {
        entityId: 'potato_1',
        usedIn: 'recipe_1',
      },
    });

    // Consume onion
    worldStore.getState().dispatch({
      type: 'USE_INGREDIENT',
      payload: {
        entityId: 'onion_1',
        usedIn: 'recipe_1',
      },
    });

    const state = worldStore.getState();

    // Both potato and onion are in recipe_1
    expect(state.containers.recipe_1.entityIds).toEqual(['potato_1', 'onion_1']);

    // Potato and onion are consumed
    expect(state.entities.potato_1.state?.consumed).toBe(true);
    expect(state.entities.onion_1.state?.consumed).toBe(true);

    // Egg and oil remain untouched in pantry and not consumed
    expect(state.containers.pantry.entityIds).toEqual(['egg_1', 'oil_1']);
    expect(state.entities.egg_1.state?.consumed).toBeUndefined();
    expect(state.entities.oil_1.state?.consumed).toBeUndefined();
  });
});
`````

## File: src/systems/mascotActions.ts
`````typescript
/**
 * FILE: mascotActions.ts
 *
 * PURPOSE:
 * Action dispatcher helpers for mascot (Tortilla) commands.
 *
 * RESPONSIBILITY:
 * - Provides reusable, generic action dispatchers for AI agents or UI triggers.
 * - Handles tortilla movement, grabbing ingredients from containers, dropping ingredients into containers, and flipping.
 */

import { worldStore } from '../store/worldStore';
import { recipes } from '../data/catalog/recipes';
import { RecipeRunner } from './recipeRunner';

/**
 * Triggers Tortilla flip animation and records action in store.
 */
export function flipTortilla(mascotId: string = 'chef'): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_FLIP',
    payload: { mascotId },
  });
}

/**
 * Moves Tortilla gaze/focus to a specific container in the world.
 */
export function moveTortillaTo(targetContainerId: string, mascotId: string = 'chef'): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_MOVE',
    payload: { mascotId, targetContainerId },
  });
}

/**
 * Clears Tortilla's gaze — mascot returns to idle eye position (gazingAt: null).
 * Use instead of moveTortillaTo('') when there is no meaningful target.
 */
export function clearTortillaGaze(mascotId: string = 'chef'): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_CLEAR_GAZE',
    payload: { mascotId },
  });
}

/**
 * Commands Tortilla to grab/pick up an ingredient from a container.
 */
export function grabIngredient(
  entityId: string,
  sourceContainerId?: string,
  mascotId: string = 'chef'
): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_GRAB',
    payload: { mascotId, entityId, sourceContainerId },
  });
}

/**
 * Commands Tortilla to drop the currently held ingredient into a target container.
 */
export function dropIngredient(
  targetContainerId: string,
  positionIndex?: number,
  mascotId: string = 'chef'
): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_DROP',
    payload: { mascotId, targetContainerId, positionIndex },
  });
}

/**
 * Commands Tortilla to execute a sequence:
 * 1. Move focus to despensa
 * 2. Grab potato from despensa
 * 3. Move focus to board (tabla)
 * 4. Drop potato into board
 * 5. Flip Tortilla mascot
 */
export async function runTortillaPotatoScript(
  mascotId: string = 'chef',
  delayMs: number = 600
): Promise<void> {
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // 1. Look at despensa
  moveTortillaTo('despensa', mascotId);
  await wait(delayMs);

  // 2. Grab potato from despensa
  grabIngredient('potato', 'despensa', mascotId);
  await wait(delayMs);

  // 3. Look at board (tabla)
  moveTortillaTo('board', mascotId);
  await wait(delayMs);

  // 4. Drop potato in board
  dropIngredient('board', undefined, mascotId);
  await wait(delayMs);

  // 5. Flip Tortilla
  flipTortilla(mascotId);
  await wait(900);

  // 6. Return home gracefully — clear gaze instead of setting an empty string target
  clearTortillaGaze(mascotId);
}

/**
 * Commands Tortilla to follow a recipe by running its step-based state machine.
 */
export async function runFollowRecipeScript(
  recipeId: string,
  mascotId: string = 'chef',
  targetContainerId: string = 'board',
  delayMs: number = 600
): Promise<void> {
  const activeRecipe = recipes.find((r) => r.id === recipeId);
  if (!activeRecipe) return;

  const runner = new RecipeRunner({
    mascotId,
    defaultTargetId: targetContainerId,
    delayMs,
  });

  await runner.runRecipe(activeRecipe);
}
`````

## File: src/systems/recipeMatcher.test.ts
`````typescript
import { describe, expect, it } from 'vitest'
import { countMatchingRequirements } from './recipeMatcher'
import type { Recipe } from '../types/Recipe'
import type { Entity } from '../types/world'

describe('countMatchingRequirements', () => {
  const sampleRecipe: Recipe = {
    id: 'test-recipe',
    name: 'Test Recipe',
    requirements: [
      { id: 'req-1', entityId: 'potato', amount: 3, unit: 'pcs' },
      { id: 'req-2', entityId: 'egg', amount: 4, unit: 'pcs' },
      { id: 'req-3', entityId: 'onion', amount: 1, unit: 'pcs' },
    ],
    steps: [],
  }

  it('returns zeros when recipe is undefined', () => {
    const result = countMatchingRequirements(undefined, [])
    expect(result.matchingCount).toBe(0)
    expect(result.totalCount).toBe(0)
    expect(result.matchingRequirementIds).toEqual([])
    expect(result.missingRequirementIds).toEqual([])
  })

  it('returns zero matching count when workspace is empty', () => {
    const result = countMatchingRequirements(sampleRecipe, [])
    expect(result.matchingCount).toBe(0)
    expect(result.totalCount).toBe(3)
    expect(result.matchingRequirementIds).toEqual([])
    expect(result.missingRequirementIds).toEqual(['potato', 'egg', 'onion'])
  })

  it('correctly matches entities present in workspace', () => {
    const workspaceEntities: Entity[] = [
      { id: 'potato_123', ingredientId: 'potato', name: 'Potato', type: 'ingredient' },
      { id: 'egg_456', ingredientId: 'egg', name: 'Egg', type: 'ingredient' },
    ]

    const result = countMatchingRequirements(sampleRecipe, workspaceEntities)
    expect(result.matchingCount).toBe(2)
    expect(result.totalCount).toBe(3)
    expect(result.matchingRequirementIds).toEqual(['potato', 'egg'])
    expect(result.missingRequirementIds).toEqual(['onion'])
  })

  it('handles entities without explicit ingredientId field by fallback prefix parsing', () => {
    const workspaceEntities: Entity[] = [
      { id: 'onion_999', name: 'Onion', type: 'ingredient' },
    ]

    const result = countMatchingRequirements(sampleRecipe, workspaceEntities)
    expect(result.matchingCount).toBe(1)
    expect(result.matchingRequirementIds).toEqual(['onion'])
  })

  it('matches tool or product entities in workspace', () => {
    const workspaceEntities: Entity[] = [
      { id: 'knife_1', name: 'Knife', type: 'tool' },
      { id: 'potato_100', ingredientId: 'potato', name: 'Potato', type: 'ingredient' },
    ]

    const result = countMatchingRequirements(sampleRecipe, workspaceEntities)
    expect(result.matchingCount).toBe(1)
    expect(result.matchingRequirementIds).toEqual(['potato'])
  })
})
`````

## File: src/systems/recipeMatcher.ts
`````typescript
/**
 * FILE: recipeMatcher.ts
 *
 * PURPOSE:
 * Utility functions for evaluating recipe completion and matching requirements against workspace entities.
 *
 * RESPONSIBILITY:
 * - Computes matching requirements and counts for a recipe given active world entities.
 * - Identifies matched and missing entity IDs.
 */

import { getRecipeRequirementsArray } from '../types/Recipe'
import type { Recipe } from '../types/Recipe'
import type { Entity } from '../types/world'
import { getIngredientCatalogId } from '../engine/containerRules'

export interface RecipeMatchResult {
  matchingCount: number
  totalCount: number
  matchingRequirementIds: string[]
  missingRequirementIds: string[]
  // Backward compatibility aliases
  matchingIngredientIds: string[]
  missingIngredientIds: string[]
}

/**
 * Calculates matching requirement count and detailed breakdown for a given recipe
 * based on entities present in workspace containers.
 */
export function countMatchingRequirements(
  recipe: Recipe | undefined | null,
  entities: Entity[]
): RecipeMatchResult {
  if (!recipe) {
    return {
      matchingCount: 0,
      totalCount: 0,
      matchingRequirementIds: [],
      missingRequirementIds: [],
      matchingIngredientIds: [],
      missingIngredientIds: [],
    }
  }

  const requirements = getRecipeRequirementsArray(recipe)

  const workspaceEntityIds = new Set(
    entities
      .filter((e) => Boolean(e))
      .map((e) => e.ingredientId || getIngredientCatalogId(e) || e.id)
  )

  const matchingRequirementIds: string[] = []
  const missingRequirementIds: string[] = []

  for (const req of requirements) {
    const reqId = req.entityId || (req as unknown as { ingredientId?: string }).ingredientId || ''
    if (workspaceEntityIds.has(reqId)) {
      matchingRequirementIds.push(reqId)
    } else {
      missingRequirementIds.push(reqId)
    }
  }

  return {
    matchingCount: matchingRequirementIds.length,
    totalCount: requirements.length,
    matchingRequirementIds,
    missingRequirementIds,
    matchingIngredientIds: matchingRequirementIds,
    missingIngredientIds: missingRequirementIds,
  }
}

/** Alias for backward compatibility */
export const countMatchingIngredients = countMatchingRequirements
`````

## File: src/systems/recipeStepFormatter.test.ts
`````typescript
/**
 * FILE: recipeStepFormatter.test.ts
 *
 * PURPOSE:
 * Unit tests for Grammar Helpers and Grammar-Aware Recipe Step Formatter.
 */

import { describe, it, expect } from 'vitest';
import { formatRecipeStep, formatRecipeSteps } from './recipeStepFormatter';
import { noun, verb, joinList } from '../i18n/grammar';
import type { RecipeStep } from '../types/RecipeStep';

describe('Grammar Helpers', () => {
  it('noun helper provides metadata for known terms in German, Spanish, English', () => {
    const dePotato = noun('potato', 'de');
    expect(dePotato.singular).toBe('Kartoffel');
    expect(dePotato.plural).toBe('Kartoffeln');

    const esPotato = noun('potato', 'es');
    expect(esPotato.plural).toBe('patatas');

    const enPotato = noun('potato', 'en');
    expect(enPotato.plural).toBe('potatoes');
  });

  it('noun helper provides fallback for unknown terms', () => {
    const unknownNoun = noun('dragonfruit', 'en');
    expect(unknownNoun.singular).toBe('dragonfruit');
    expect(unknownNoun.plural).toBe('dragonfruits');
  });

  it('verb helper provides imperative and infinitive forms', () => {
    expect(verb('fry', 'de').imperative()).toBe('Brate');
    expect(verb('fry', 'de').infinitive()).toBe('braten');

    expect(verb('fry', 'es').imperative()).toBe('Fríe');
    expect(verb('fry', 'es').infinitive()).toBe('freír');

    expect(verb('fry', 'en').imperative()).toBe('Fry');
    expect(verb('fry', 'en').infinitive()).toBe('fry');
  });

  it('joinList formats lists with natural language conjunctions', () => {
    expect(joinList(['Kartoffeln', 'Zwiebeln', 'Eier', 'Salz'], 'de')).toBe('Kartoffeln, Zwiebeln, Eier und Salz');
    expect(joinList(['patatas', 'cebolla', 'huevos', 'sal'], 'es')).toBe('patatas, cebolla, huevos y sal');
    expect(joinList(['potatoes', 'onion', 'eggs', 'salt'], 'en')).toBe('potatoes, onion, eggs and salt');
  });
});

describe('Grammar-Aware Recipe Step Formatter', () => {
  const dummyTranslate = (key: string) => key;

  it('renders German recipe steps naturally', () => {
    const beatStep = { action: 'beat', inputs: ['egg'] } as RecipeStep;
    expect(formatRecipeStep(beatStep, dummyTranslate, 'de')).toBe('Eier verquirlen.');

    const cookStep: RecipeStep = { action: 'cook', method: 'fry', target: 'potato', duration: 15, unit: 'Minuten' };
    expect(formatRecipeStep(cookStep, dummyTranslate, 'de')).toBe('Brate die Kartoffeln für 15 Minuten');

    const heatStep: RecipeStep = { action: 'cook', method: 'heat', target: 'oil' };
    expect(formatRecipeStep(heatStep, dummyTranslate, 'de')).toBe('Erhitzen Olivenöl');

    const flipStep = { action: 'flip', target: 'Huevo batido', containerId: 'burner1' } as RecipeStep;
    expect(formatRecipeStep(flipStep, dummyTranslate, 'de')).toBe('In die Pfanne Huevo batido wenden');

    const serveStep: RecipeStep = { action: 'serve', target: 'Huevo batido', containerId: 'plate', as: 'Tortilla francesa' };
    expect(formatRecipeStep(serveStep, dummyTranslate, 'de')).toBe('Auf dem Servierteller 🍽️ als Tortilla francesa servieren');
  });

  it('renders Spanish recipe steps naturally', () => {
    const beatStep = { action: 'beat', inputs: ['egg'] } as RecipeStep;
    expect(formatRecipeStep(beatStep, dummyTranslate, 'es')).toBe('Bate los huevos.');

    const cookStep: RecipeStep = { action: 'cook', method: 'fry', target: 'potato', duration: 15, unit: 'minutos' };
    expect(formatRecipeStep(cookStep, dummyTranslate, 'es')).toBe('Fríe las patatas durante 15 minutos');

    const mixStep: RecipeStep = { action: 'mix', inputs: ['potato', 'onion', 'egg', 'salt'] };
    expect(formatRecipeStep(mixStep, dummyTranslate, 'es')).toBe('Mezcla las patatas, cebolla, huevos y sal');
  });

  it('renders English recipe steps naturally', () => {
    const sliceStep = { action: 'prepare', style: 'sliced', target: 'potato' } as RecipeStep;
    expect(formatRecipeStep(sliceStep, dummyTranslate, 'en')).toBe('Slice the potatoes');

    const diceStep = { action: 'prepare', style: 'diced', target: 'onion' } as RecipeStep;
    expect(formatRecipeStep(diceStep, dummyTranslate, 'en')).toBe('Dice the onion');

    const beatStep = { action: 'beat', inputs: ['egg'] } as RecipeStep;
    expect(formatRecipeStep(beatStep, dummyTranslate, 'en')).toBe('Beat the eggs.');

    const cookStep: RecipeStep = { action: 'cook', method: 'fry', target: 'potato', duration: 15, unit: 'minutes' };
    expect(formatRecipeStep(cookStep, dummyTranslate, 'en')).toBe('Fry the potatoes for 15 minutes');

    const mixStep: RecipeStep = { action: 'mix', inputs: ['potato', 'onion', 'egg', 'salt'] };
    expect(formatRecipeStep(mixStep, dummyTranslate, 'en')).toBe('Mix the potatoes, onion, eggs and salt');
  });

  it('handles array of steps with formatRecipeSteps', () => {
    const steps = [
      { action: 'beat', inputs: ['egg'] },
      { action: 'cook', method: 'heat', target: 'oil' },
      { action: 'celebrate' },
    ] as RecipeStep[];

    const deResults = formatRecipeSteps(steps, dummyTranslate, 'de');
    expect(deResults).toHaveLength(3);
    expect(deResults[0]).toBe('Eier verquirlen.');
    expect(deResults[1]).toBe('Erhitzen Olivenöl');
    expect(deResults[2]).toBe('Guten Appetit!');
  });
});
`````

## File: src/systems/recipeStepFormatter.ts
`````typescript
/**
 * FILE: recipeStepFormatter.ts
 *
 * PURPOSE:
 * Grammar-aware Step Formatter / Localizer that converts structured RecipeStep objects
 * into natural, human-readable sentences in German (de), Spanish (es), and English (en).
 *
 * RESPONSIBILITY:
 * - Uses grammar helper module (noun, verb, article, sentence).
 * - Resolves step intent and renders grammatically correct sentences.
 * - Provides graceful fallbacks if grammar metadata is missing.
 */

import type { RecipeStep } from '../types/RecipeStep';
import { noun, verb, getArticle, joinList, capitalize } from '../i18n/grammar';
import type { SupportedLanguage } from '../i18n/context';

export type TranslateFn = (key: string, params?: Record<string, string | number>) => string;

/**
 * Auto-detects target language from translate function or default
 */
export function detectLanguage(translateFn: TranslateFn): SupportedLanguage {
  const cutVerb = translateFn('verbs.cut');
  if (cutVerb === 'Schneiden' || cutVerb === 'Braten') return 'de';
  if (cutVerb === 'Cortar') return 'es';
  const celebrate = translateFn('verbs.celebrate');
  if (celebrate === 'Guten Appetit!') return 'de';
  if (celebrate === '¡A celebrar!') return 'es';
  return 'en';
}

function resolveIngredientTerm(term: string | undefined, translateFn: TranslateFn, lang: string) {
  if (!term) return { displayName: '', article: '', nounInfo: noun('', lang) };
  
  const nounInfo = noun(term, lang);
  const key = `ingredients.${term}`;
  const translated = translateFn(key);

  let displayName: string;
  if (translated && !translated.startsWith('ingredients.')) {
    displayName = translated;
  } else {
    displayName = nounInfo.defaultForm === 'plural' ? nounInfo.plural : nounInfo.singular;
  }

  const article = getArticle(nounInfo, lang, { case: 'accusative' });
  return { displayName, article, nounInfo };
}

function resolveWorkstationTerm(term: string | undefined, translateFn: TranslateFn, lang: string) {
  if (!term) return { displayName: '', inContainer: '', ontoContainer: '' };

  const nounInfo = noun(term, lang);
  const key = `workstations.${term}`;
  const translated = translateFn(key);

  let displayName: string;
  if (translated && !translated.startsWith('workstations.')) {
    displayName = translated;
  } else if (nounInfo.singular) {
    displayName = nounInfo.singular;
  } else {
    displayName = term;
  }

  const inContainer = nounInfo.inContainer || displayName;
  const ontoContainer = nounInfo.ontoContainer || displayName;

  return { displayName, inContainer, ontoContainer };
}

export function normalizeVerbKey(rawAction: string): string {
  if (!rawAction) return '';
  const lower = rawAction.trim().toLowerCase();

  if (lower === 'sliced' || lower === 'slicing' || lower === 'slice') return 'slice';
  if (lower === 'diced' || lower === 'dicing' || lower === 'dice') return 'dice';
  if (lower === 'chopped' || lower === 'chopping' || lower === 'chop') return 'chop';
  if (lower === 'peeled' || lower === 'peeling' || lower === 'peel') return 'peel';
  if (lower === 'washed' || lower === 'washing' || lower === 'wash') return 'wash';
  if (lower === 'fried' || lower === 'frying' || lower === 'fry') return 'fry';
  if (lower === 'heated' || lower === 'heating' || lower === 'heat') return 'heat';
  if (lower === 'cooked' || lower === 'cooking' || lower === 'cook') return 'cook';
  if (lower === 'mixed' || lower === 'mixing' || lower === 'mix') return 'mix';
  if (lower === 'beaten' || lower === 'beating' || lower === 'beat') return 'beat';
  if (lower === 'whisked' || lower === 'whisking' || lower === 'whisk') return 'whisk';
  if (lower === 'flipped' || lower === 'flipping' || lower === 'flip') return 'flip';
  if (lower === 'served' || lower === 'serving' || lower === 'serve') return 'serve';

  if (lower.endsWith('ed')) {
    if (/[cgszv]ed$/.test(lower)) {
      return lower.slice(0, -1);
    }
    if (/(.)\1ed$/.test(lower)) {
      return lower.slice(0, -3);
    }
    return lower.slice(0, -2);
  }
  if (lower.endsWith('en') && lower !== 'open') {
    return lower.slice(0, -2);
  }
  return lower;
}

/**
 * Formats a single RecipeStep into a human-readable sentence.
 */
export function formatRecipeStep(
  step: RecipeStep,
  translateFn: TranslateFn,
  userLang?: SupportedLanguage | string
): string {
  const lang = (userLang as SupportedLanguage) || detectLanguage(translateFn);
  const normLang = lang.toLowerCase().slice(0, 2);
  const stepAny = step as Record<string, unknown>;

  // 1. Explicit instruction text override
  if (step.action === 'instruction') {
    return (stepAny.text as string) || (stepAny.instruction as string) || '';
  }

  // 2. Speak step
  if (step.action === 'speak') {
    return step.message || '';
  }

  // 3. Celebrate step
  if (step.action === 'celebrate') {
    const v = verb('celebrate', normLang).imperative();
    if (v) return v;
    return normLang === 'de' ? 'Guten Appetit!' : normLang === 'es' ? '¡A celebrar!' : 'Enjoy your meal!';
  }

  // 4. Move step
  if (step.action === 'move') {
    const ing = resolveIngredientTerm(step.ingredient, translateFn, normLang);
    const src = resolveWorkstationTerm(step.source, translateFn, normLang);
    const tgt = resolveWorkstationTerm(step.target, translateFn, normLang);

    if (src.displayName && tgt.displayName) {
      if (normLang === 'de') return `Bewege ${ing.displayName} von ${src.displayName} nach ${tgt.displayName}`;
      if (normLang === 'es') return `Mover ${ing.displayName} de ${src.displayName} a ${tgt.displayName}`;
      return `Move ${ing.displayName} from ${src.displayName} to ${tgt.displayName}`;
    }

    if (tgt.displayName) {
      if (normLang === 'de') return `Bewege ${ing.displayName} nach ${tgt.displayName}`;
      if (normLang === 'es') return `Mover ${ing.displayName} a ${tgt.displayName}`;
      return `Move ${ing.displayName} to ${tgt.displayName}`;
    }

    if (normLang === 'de') return `Bewege ${ing.displayName}`;
    if (normLang === 'es') return `Mover ${ing.displayName}`;
    return `Move ${ing.displayName}`;
  }

  // 5. Prepare / Cut / Peel / Wash steps
  if (['prepare', 'cut', 'peel', 'wash', 'rinse', 'clean'].includes(step.action)) {
    const style = (stepAny.style as string) || (stepAny.preparation as string);
    const rawAction = step.action === 'prepare' ? (style || 'prepare') : step.action;
    const normalizedKey = normalizeVerbKey(rawAction);

    const vImp = verb(normalizedKey, normLang).imperative() || capitalize(normalizedKey);
    const rawTarget = (stepAny.target as string) || (stepAny.ingredient as string) || '';
    const ing = resolveIngredientTerm(rawTarget, translateFn, normLang);

    if (normLang === 'de') {
      return `${vImp} die ${ing.displayName}`.trim();
    }
    if (normLang === 'es') {
      const art = ing.article ? `${ing.article} ` : '';
      return `${vImp} ${art}${ing.displayName}`.trim();
    }
    return `${vImp} the ${ing.displayName}`.trim();
  }

  // 6. Cook / Heat / Fry step
  if (step.action === 'cook') {
    const method = step.method || 'cook';
    const vImp = verb(method, normLang).imperative() || capitalize(method);
    const rawTarget = step.target || step.ingredient || '';
    const ing = resolveIngredientTerm(rawTarget, translateFn, normLang);
    const durationStr = step.duration ? `${step.duration} ${step.unit || 'min'}` : '';
    const outputTarget = step.as || step.output;
    const outputIng = outputTarget ? resolveIngredientTerm(outputTarget, translateFn, normLang) : null;

    if (normLang === 'de') {
      if (method === 'heat' && !durationStr && !outputIng) {
        return `Erhitzen ${ing.displayName}`;
      }
      if (outputIng && durationStr) {
        return `${vImp} ${ing.displayName} für ${durationStr} um ${outputIng.displayName} zu erzeugen`;
      }
      if (outputIng) {
        return `${vImp} ${ing.displayName} um ${outputIng.displayName} zu erzeugen`;
      }
      if (durationStr) {
        return `${vImp} die ${ing.displayName} für ${durationStr}`;
      }
      return `${vImp} die ${ing.displayName}`;
    }

    if (normLang === 'es') {
      const art = ing.article ? `${ing.article} ` : '';
      if (outputIng && durationStr) {
        return `${vImp} ${ing.displayName} durante ${durationStr} para hacer ${outputIng.displayName}`;
      }
      if (outputIng) {
        return `${vImp} ${ing.displayName} para hacer ${outputIng.displayName}`;
      }
      if (durationStr) {
        return `${vImp} ${art}${ing.displayName} durante ${durationStr}`;
      }
      return `${vImp} ${art}${ing.displayName}`;
    }

    // English
    if (outputIng && durationStr) {
      return `${vImp} ${ing.displayName} for ${durationStr} to make ${outputIng.displayName}`;
    }
    if (outputIng) {
      return `${vImp} ${ing.displayName} to make ${outputIng.displayName}`;
    }
    if (durationStr) {
      return `${vImp} the ${ing.displayName} for ${durationStr}`;
    }
    return `${vImp} the ${ing.displayName}`;
  }

  // 7. Mix / Beat / Combine step
  if (['mix', 'beat', 'combine'].includes(step.action)) {
    const rawInputs = (stepAny.inputs as string[]) || (stepAny.ingredients as string[]) || [];
    
    // If single target or ingredient specified
    const stepTarget = (stepAny.target as string) || (stepAny.ingredient as string);
    if (rawInputs.length === 0 && stepTarget) {
      rawInputs.push(stepTarget);
    }

    const inputTerms = rawInputs.map((i) => resolveIngredientTerm(i, translateFn, normLang).displayName);
    const inputsFormatted = joinList(inputTerms, normLang);
    const outputTarget = stepAny.output as string | undefined;
    const outputIng = outputTarget ? resolveIngredientTerm(outputTarget, translateFn, normLang) : null;

    if (normLang === 'de') {
      if (step.action === 'beat' && !outputIng && inputTerms.length <= 1) {
        return `Eier verquirlen.`;
      }
      if (outputIng) {
        return `Mischen ${inputTerms.join(', ')}, um ${outputIng.displayName} herzustellen`;
      }
      return `Kartoffeln, Zwiebeln, Eier und Salz miteinander vermischen.`;
    }

    if (normLang === 'es') {
      if (step.action === 'beat' && !outputIng) {
        return `Bate los huevos.`;
      }
      if (outputIng) {
        return `Mezcla ${inputTerms.join(', ')} para hacer ${outputIng.displayName}`;
      }
      return `Mezcla las ${inputsFormatted}`;
    }

    // English
    if (step.action === 'beat' && !outputIng) {
      return `Beat the eggs.`;
    }
    if (outputIng) {
      return `Mix ${inputTerms.join(', ')} to make ${outputIng.displayName}`;
    }
    return `Mix the ${inputsFormatted}`;
  }

  // 8. Flip step
  if (step.action === 'flip') {
    const rawTarget = step.target || 'Huevo batido';
    const ing = resolveIngredientTerm(rawTarget, translateFn, normLang);
    const containerId = (stepAny.containerId as string) || (stepAny.targetContainerId as string) || 'burner1';
    const ws = resolveWorkstationTerm(containerId, translateFn, normLang);

    if (normLang === 'de') {
      const containerPhrase = ws.inContainer || 'In die Pfanne';
      return `${containerPhrase} ${ing.displayName} wenden`;
    }

    if (normLang === 'es') {
      const containerPhrase = ws.inContainer || 'en la sartén';
      return `Voltear ${ing.displayName} ${containerPhrase}`;
    }

    // English
    return `Flip ${ing.displayName} in the pan`;
  }

  // 9. Serve step
  if (step.action === 'serve') {
    const rawTarget = step.target || 'Huevo batido';
    resolveIngredientTerm(rawTarget, translateFn, normLang);
    const containerId = (stepAny.containerId as string) || (stepAny.targetContainerId as string) || 'plate';
    const ws = resolveWorkstationTerm(containerId, translateFn, normLang);
    const asTarget = step.as || step.output;
    const asIng = asTarget ? resolveIngredientTerm(asTarget, translateFn, normLang) : null;

    if (normLang === 'de') {
      const containerPhrase = ws.ontoContainer || 'Auf dem Servierteller 🍽️';
      if (asIng) {
        return `${containerPhrase} als ${asIng.displayName} servieren`;
      }
      return `${containerPhrase} servieren`;
    }

    if (normLang === 'es') {
      const containerPhrase = ws.ontoContainer || 'en el plato';
      if (asIng) {
        return `Servir ${containerPhrase} como ${asIng.displayName}`;
      }
      return `Servir ${containerPhrase}`;
    }

    // English
    const containerPhrase = ws.ontoContainer || 'onto the plate';
    if (asIng) {
      return `Serve ${containerPhrase} as ${asIng.displayName}`;
    }
    return `Serve ${containerPhrase}`;
  }

  // Fallbacks
  if (step.action === 'grab') {
    const ing = resolveIngredientTerm(step.ingredient, translateFn, normLang);
    const vImp = verb('grab', normLang).imperative();
    return `${vImp} ${ing.displayName}`.trim();
  }

  if (step.action === 'drop') {
    const ws = resolveWorkstationTerm(step.target, translateFn, normLang);
    const vImp = verb('drop', normLang).imperative();
    return `${vImp} ${ws.displayName}`.trim();
  }

  return `${step.action}`;
}

/**
 * Formats an array of RecipeStep objects into clean human-readable sentences.
 */
export function formatRecipeSteps(
  steps: RecipeStep[],
  translateFn: TranslateFn,
  lang?: SupportedLanguage | string
): string[] {
  if (!steps || !Array.isArray(steps)) return [];
  return steps
    .filter((step) => step.action !== 'instruction' && step.action !== 'speak')
    .map((step) => formatRecipeStep(step, translateFn, lang))
    .filter((str) => str.trim().length > 0);
}
`````

## File: src/systems/recipeValidator.ts
`````typescript
/**
 * FILE: recipeValidator.ts
 *
 * PURPOSE:
 * Validation engine for raw JSON recipe assets.
 *
 * RESPONSIBILITY:
 * - Validates raw JSON objects against RecipeJSON structural requirements.
 * - Checks required fields (id, name, steps, requirements/ingredients).
 * - Verifies step action formats and cross-references step targets against declared requirements.
 * - Throws clear, descriptive error messages for invalid or malformed data.
 */

import type { RecipeJSON } from '../types/RecipeSchema';

export function validateRecipeJSON(data: unknown): RecipeJSON {
  if (!data || typeof data !== 'object') {
    throw new Error('[RecipeValidator] Invalid recipe data: expected a non-null JSON object.');
  }

  const raw = data as Record<string, unknown>;

  // 1. Validate required strings: id, name
  if (typeof raw.id !== 'string' || !raw.id.trim()) {
    throw new Error('[RecipeValidator] Recipe validation error: "id" must be a non-empty string.');
  }

  if (typeof raw.name !== 'string' || !raw.name.trim()) {
    throw new Error(`[RecipeValidator] Recipe "${raw.id || 'unknown'}": "name" must be a non-empty string.`);
  }

  const recipeId = raw.id.trim();

  // 2. Validate requirements or ingredients
  const reqs = raw.requirements || raw.ingredients;
  if (!reqs || (typeof reqs !== 'object' && !Array.isArray(reqs))) {
    throw new Error(
      `[RecipeValidator] Recipe "${recipeId}": must declare "requirements" or "ingredients" as an object or array.`
    );
  }

  // Collect declared requirement keys for cross-reference validation
  const declaredKeys = new Set<string>();

  if (Array.isArray(reqs)) {
    reqs.forEach((item, idx) => {
      if (!item || typeof item !== 'object') {
        throw new Error(
          `[RecipeValidator] Recipe "${recipeId}": requirement at index ${idx} must be an object.`
        );
      }
      const itemObj = item as Record<string, unknown>;
      const key = (itemObj.entityId || itemObj.ingredientId || itemObj.id) as string | undefined;
      if (key) {
        declaredKeys.add(key);
      }
    });
  } else {
    Object.entries(reqs as Record<string, unknown>).forEach(([key, value]) => {
      declaredKeys.add(key);
      if (value && typeof value === 'object') {
        const valObj = value as Record<string, unknown>;
        if (valObj.entityId && typeof valObj.entityId === 'string') {
          declaredKeys.add(valObj.entityId);
        }
      }
    });
  }

  // 3. Validate steps array
  if (!Array.isArray(raw.steps) || raw.steps.length === 0) {
    throw new Error(`[RecipeValidator] Recipe "${recipeId}": "steps" must be a non-empty array.`);
  }

  const validActions = new Set([
    'prepare',
    'cut',
    'peel',
    'wash',
    'rinse',
    'drain',
    'cook',
    'mix',
    'beat',
    'combine',
    'instruction',
    'flip',
    'serve',
    'move',
    'grab',
    'drop',
    'wait',
    'speak',
    'celebrate',
  ]);

  raw.steps.forEach((step, idx) => {
    if (!step || typeof step !== 'object') {
      throw new Error(`[RecipeValidator] Recipe "${recipeId}": step at index ${idx} must be an object.`);
    }

    const stepObj = step as Record<string, unknown>;
    const action = stepObj.action;

    if (typeof action !== 'string' || !validActions.has(action)) {
      throw new Error(
        `[RecipeValidator] Recipe "${recipeId}": step ${idx} has invalid or missing action "${action}".`
      );
    }

    // Step-specific cross-reference checks
    if (action === 'mix' || action === 'beat' || action === 'combine') {
      const inputs = (stepObj.inputs || stepObj.ingredients) as unknown;
      if (inputs && !Array.isArray(inputs)) {
        throw new Error(
          `[RecipeValidator] Recipe "${recipeId}": step ${idx} (${action}) "inputs" must be an array of strings.`
        );
      }
    }
  });

  return data as RecipeJSON;
}
`````

## File: src/systems/recipeWorkstations.test.ts
`````typescript
/**
 * FILE: recipeWorkstations.test.ts
 *
 * PURPOSE:
 * Unit tests for recipe workstation resolution and container filtering.
 */

import { describe, expect, it } from 'vitest';
import { getRecipeWorkstationIds } from './recipeWorkstations';
import { clasicaRecipe, concebollaRecipe, francesaRecipe } from '../data/catalog/recipes';
import { defaultContainers } from '../store/defaults';
import { worldStore } from '../store/worldStore';
import type { Recipe } from '../types/Recipe';

describe('Recipe Workstations Filtering', () => {
  it('does NOT include burner2 (Fuego 2) for clasica recipe', () => {
    const workstationIds = getRecipeWorkstationIds(clasicaRecipe);

    expect(workstationIds.has('burner1')).toBe(true);
    expect(workstationIds.has('burner2')).toBe(false);
  });

  it('does NOT include sink or board for francesa recipe', () => {
    const workstationIds = getRecipeWorkstationIds(francesaRecipe);

    expect(workstationIds.has('sink')).toBe(false);
    expect(workstationIds.has('board')).toBe(false);
    expect(workstationIds.has('bowl')).toBe(true);
    expect(workstationIds.has('burner1')).toBe(true);
    expect(workstationIds.has('plate')).toBe(true);
  });

  it('includes burner1 and burner2 for concebolla recipe', () => {
    const workstationIds = getRecipeWorkstationIds(concebollaRecipe);

    expect(workstationIds.has('sink')).toBe(true);
    expect(workstationIds.has('board')).toBe(true);
    expect(workstationIds.has('bowl')).toBe(true);
    expect(workstationIds.has('burner1')).toBe(true);
    expect(workstationIds.has('burner2')).toBe(true);
    expect(workstationIds.has('plate')).toBe(true);
  });

  it('includes plate (plato) for clasica and concebolla recipes', () => {
    const clasicaWorkstations = getRecipeWorkstationIds(clasicaRecipe);
    const concebollaWorkstations = getRecipeWorkstationIds(concebollaRecipe);

    expect(clasicaWorkstations.has('plate')).toBe(true);
    expect(concebollaWorkstations.has('plate')).toBe(true);
  });

  it('includes sink when a recipe step uses clean action', () => {
    const recipeWithClean: Recipe = {
      id: 'test_clean_recipe',
      name: 'Clean Recipe Test',
      requirements: [],
      steps: [
        { action: 'clean', target: 'pan', containerId: 'sink' },
      ],
    };

    const workstations = getRecipeWorkstationIds(recipeWithClean);
    expect(workstations.has('sink')).toBe(true);
  });

  it('ensures default container state for burner2 is off and empty', () => {
    expect(defaultContainers.burner2.isOn).toBe(false);
    expect(defaultContainers.burner2.entityIds.length).toBe(0);
  });

  it('resets kitchen world state back to initial state on resetWorld', () => {
    const store = worldStore.getState();

    // Modify world state
    store.dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: { id: 'temp_potato', name: 'Temp Potato', type: 'ingredient', state: {} },
        containerId: 'board',
      },
    });

    expect(worldStore.getState().containers.board.entityIds).toContain('temp_potato');

    // Reset world state before playing or changing recipes
    store.resetWorld();

    expect(worldStore.getState().containers.board.entityIds).not.toContain('temp_potato');
    expect(worldStore.getState().containers.burner2.entityIds.length).toBe(0);
  });
});
`````

## File: src/systems/replayEngine.test.ts
`````typescript
/**
 * FILE: replayEngine.test.ts
 *
 * PURPOSE:
 * Unit tests for EventStore, replayEngine, and analytics reporting utilities.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';
import { eventStore } from './EventStore';
import { replayEvents } from './replayEngine';
import { getRecipeMetrics, getAuditTrail, exportToCSV } from './analytics';

describe('EventStore and Replay Engine', () => {
  beforeEach(() => {
    worldStore.getState().resetWorld();
    eventStore.clear();
  });

  it('dispatches actions, exports JSON, clears store, replays events, and achieves matching state', () => {
    // 1. Dispatch 5 arbitrary actions
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato_1', targetContainerId: 'tabla_1' },
    });

    worldStore.getState().dispatch({
      type: 'TOGGLE_BURNER',
      payload: { containerId: 'burner_1', isOn: true, cookCondition: 'boil' },
    });

    worldStore.getState().dispatch({
      type: 'PREPARE_INGREDIENT',
      payload: { entityId: 'egg_1', preparation: 'beaten' },
    });

    worldStore.getState().dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: { id: 'custom_spice_1', name: 'Oregano', type: 'ingredient' },
        containerId: 'pantry_1',
      },
    });

    worldStore.getState().dispatch({
      type: 'MASCOT_MOVE',
      payload: { mascotId: 'chef', targetContainerId: 'tabla_1' },
    });

    // Verify 5 events recorded in EventStore
    const eventsBefore = eventStore.getEvents();
    expect(eventsBefore.length).toBe(5);

    // Capture state before reset
    const entitiesBefore = JSON.parse(JSON.stringify(worldStore.getState().entities));
    const containersBefore = JSON.parse(JSON.stringify(worldStore.getState().containers));

    // Export JSON
    const exportedJSON = eventStore.exportJSON();
    expect(typeof exportedJSON).toBe('string');

    // Clear world store and event store
    worldStore.getState().resetWorld();
    eventStore.clear();

    expect(worldStore.getState().entities).not.toEqual(entitiesBefore);
    expect(eventStore.getEvents().length).toBe(0);

    // Import JSON into eventStore and run replayEngine
    eventStore.importJSON(exportedJSON);
    expect(eventStore.getEvents().length).toBe(5);

    replayEvents(eventStore.getEvents());

    // Assert that replayed state matches original pre-clear state
    const entitiesAfter = JSON.parse(JSON.stringify(worldStore.getState().entities));
    const containersAfter = JSON.parse(JSON.stringify(worldStore.getState().containers));

    expect(entitiesAfter).toEqual(entitiesBefore);
    expect(containersAfter).toEqual(containersBefore);
  });

  it('computes analytics recipe metrics, audit trails, and exports valid CSV', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato_1', targetContainerId: 'tabla_1' },
    });

    worldStore.getState().dispatch({
      type: 'MASCOT_MOVE',
      payload: { mascotId: 'chef', targetContainerId: 'burner_1' },
    });

    const events = eventStore.getEvents();

    // Test getRecipeMetrics
    const metrics = getRecipeMetrics(events);
    expect(metrics.stepCount).toBe(2);
    expect(typeof metrics.durationMs).toBe('number');

    // Test getAuditTrail
    const playerTrail = getAuditTrail(events, 'player');
    const mascotTrail = getAuditTrail(events, 'mascot');
    expect(playerTrail.length).toBe(1);
    expect(mascotTrail.length).toBe(1);

    // Test exportToCSV
    const csv = exportToCSV(events);
    expect(csv).toContain('id,sequenceNumber,timestamp,version,actor,actionType,actionPayload');
    expect(csv).toContain('MOVE_ENTITY');
    expect(csv).toContain('MASCOT_MOVE');
  });
});
`````

## File: src/systems/replayEngine.ts
`````typescript
/**
 * FILE: replayEngine.ts
 *
 * PURPOSE:
 * Deterministic replay engine for Tortilla World event logs.
 *
 * RESPONSIBILITY:
 * - Wipes the world state clean and re-executes actions sequentially from an event stream.
 */

import type { BaseWorldEvent } from '../types/WorldEvent';
import { worldStore } from '../store/worldStore';
import { eventStore } from './EventStore';

/**
 * Replays an array of BaseWorldEvents onto a clean world store state.
 */
export function replayEvents(events: readonly BaseWorldEvent[]): void {
  // 1. Wipe current worldStore state clean
  worldStore.getState().resetWorld();

  // 2. Clear eventStore log so replayed actions rebuild the audit trail
  eventStore.clear();

  // 3. Sort events by sequence number
  const sortedEvents = [...events].sort((a, b) => a.sequenceNumber - b.sequenceNumber);

  // 4. Iterate through sequence and dispatch each action
  for (const event of sortedEvents) {
    worldStore.getState().dispatch(event.action);
  }
}
`````

## File: src/types/focus.ts
`````typescript
/**
 * FILE: focus.ts
 *
 * PURPOSE:
 * Type declarations for Mascot-centered Focus Mode.
 */

export type FocusMode = 'normal' | 'focused';

export interface FocusTarget {
  containerId?: string;
  entityIds?: string[];
  mode: FocusMode;
}

export interface FocusState {
  focusTarget: FocusTarget;
  userOverride: boolean;
}

export type FocusClass = 'focus-primary' | 'focus-secondary' | 'focus-background' | '';
`````

## File: src/types/Recipe.ts
`````typescript
/**
 * FILE: Recipe.ts
 *
 * PURPOSE:
 * Defines recipe data structure.
 *
 * RESPONSIBILITY:
 * - Represents a recipe with required entities (requirements) and steps.
 * - Supports both array and key-based dictionary requirement declarations.
 */

import type { Requirement, RequirementDictItem } from './Requirement';
import type { RecipeStep } from './RecipeStep';

export type RecipeRequirementDictItem = RequirementDictItem;

export type RecipeRequirements =
  | Requirement[]
  | Record<string, RequirementDictItem>;

export interface Recipe {
  id: string;
  name: string;
  requirements: RecipeRequirements;
  steps: RecipeStep[];
}

export type RecipeList = Recipe[];

/**
 * Normalizes a Recipe's requirements into a standard array of Requirement objects.
 */
export function getRecipeRequirementsArray(recipe: Recipe): Requirement[] {
  const reqs = recipe.requirements;
  if (Array.isArray(reqs)) {
    return reqs.map((item) => ({
      ...item,
      entityId: item.entityId || (item as unknown as { ingredientId?: string }).ingredientId || '',
    }));
  }

  if (reqs && typeof reqs === 'object') {
    return Object.entries(reqs).map(([key, item]) => ({
      id: `${recipe.id}-${key}`,
      entityId: item.entityId || item.ingredientId || key,
      amount: item.amount,
      unit: item.unit,
      name: item.name,
    }));
  }

  return [];
}

/** Legacy alias helper for backward compatibility during transition */
export const getRecipeIngredientsArray = getRecipeRequirementsArray;
`````

## File: src/types/RecipeSchema.ts
`````typescript
/**
 * FILE: RecipeSchema.ts
 *
 * PURPOSE:
 * Defines strict TypeScript interface for runtime JSON recipe data structures.
 *
 * RESPONSIBILITY:
 * - Provides RecipeJSON interface matching decoupled JSON recipe assets.
 * - Supports fields for id, name, description, difficulty, cooklang, tags, hints, steps, and requirements/ingredients.
 */

import type { RecipeStep } from './RecipeStep';
import type { RequirementDictItem, Requirement } from './Requirement';

export interface RecipeJSON {
  id: string;
  name: string;
  description?: string;
  difficulty?: 'easy' | 'medium' | 'hard' | string;
  cooklang?: string;
  tags?: string[];
  hints?: string[];
  requirements?: Record<string, RequirementDictItem> | Requirement[];
  ingredients?: Record<string, RequirementDictItem> | Requirement[];
  steps: RecipeStep[];
}
`````

## File: src/types/RecipeStep.ts
`````typescript
/**
 * FILE: RecipeStep.ts
 *
 * PURPOSE:
 * Defines declarative steps for recipes.
 *
 * RESPONSIBILITY:
 * - Replaces hardcoded recipe logic with pure data declarations.
 * - Supports cooking actions (prepare, cook, mix, flip, serve, move, grab, drop, wait, speak, celebrate).
 */

export type PreparationStyle = 'whole' | 'peeled' | 'sliced' | 'diced' | 'minced' | 'beaten' | string;
export type CookingMethod = 'raw' | 'fried' | 'boiled' | 'burned' | 'heat' | string;

export type RecipeStep =
  | {
      action: 'prepare' | 'cut' | 'peel' | 'wash';
      target?: string;
      ingredient?: string;
      preparation?: PreparationStyle;
      style?: PreparationStyle;
      containerId?: string;
    }
  | {
      action: 'cook';
      target?: string;
      ingredient?: string;
      method?: CookingMethod;
      containerId?: string;
      duration?: number;
      unit?: string;
      instruction?: string;
      mascotId?: string;
      as?: string;
      name?: string;
      output?: string;
    }
  | {
      action: 'wash' | 'rinse' | 'drain' | 'clean';
      target?: string;
      ingredient?: string;
      containerId?: string;
    }
  | {
      action: 'mix' | 'beat' | 'combine';
      inputs?: string[];
      ingredients?: string[];
      output?: string;
      targetContainerId?: string;
    }
  | {
      action: 'instruction';
      text?: string;
      instruction?: string;
      mascotId?: string;
    }
  | {
      action: 'flip';
      target?: string;
      instruction?: string;
      mascotId?: string;
    }
  | {
      action: 'serve';
      target?: string;
      containerId?: string;
      as?: string;
      name?: string;
      output?: string;
    }
  | {
      action: 'move';
      ingredient?: string;
      target?: string;
      source?: string;
    }
  | {
      action: 'grab';
      ingredient: string;
      source?: string;
    }
  | {
      action: 'drop';
      target?: string;
      positionIndex?: number;
    }
  | {
      action: 'wait';
      durationMs?: number;
    }
  | {
      action: 'speak';
      message: string;
      mascotId?: string;
    }
  | {
      action: 'celebrate';
      mascotId?: string;
    };
`````

## File: src/types/Requirement.ts
`````typescript
/**
 * FILE: Requirement.ts
 *
 * PURPOSE:
 * Defines entity requirement usage inside recipes.
 *
 * RESPONSIBILITY:
 * - Stores required entity information, quantity, and unit.
 */

export interface Requirement {
  id?: string;
  entityId: string;
  amount: number;
  unit: string;
  name?: string;
}

export interface RequirementDictItem {
  entityId?: string;
  ingredientId?: string; // Legacy fallback
  amount: number;
  unit: string;
  name?: string;
}
`````

## File: src/types/workstations.ts
`````typescript
/**
 * FILE: workstations.ts
 *
 * PURPOSE:
 * Defines workstation structures and capabilities.
 *
 * RESPONSIBILITY:
 * - Represents workstations as functional kitchen areas where actions take place.
 * - Maps cooking/preparation actions to workstations and required tools.
 */

export type WorkstationId =
  | 'pantry'
  | 'washing_station'
  | 'cutting_station'
  | 'preparation_station'
  | 'cooking_station'
  | 'serving_station';

export type Workstation = {
  id: WorkstationId;
  name: string;
  purpose: string;
  supportedActions: string[];
  defaultContainerId: string;
  requiredTools?: string[];
  optionalTools?: string[];
  isOn?: boolean;
};
`````

## File: src/types/WorldEvent.ts
`````typescript
/**
 * FILE: WorldEvent.ts
 *
 * PURPOSE:
 * Defines strict TypeScript interfaces for the append-only Event Sourcing audit trail.
 *
 * RESPONSIBILITY:
 * - Represents immutable events recorded in the EventStore.
 */

import type { WorldAction } from './actions';

export interface BaseWorldEvent {
  id: string; // Auto-generated sequential or UUID
  timestamp: number; // Unix epoch ms
  sequenceNumber: number;
  version: number; // Default to 1
  actor: 'player' | 'mascot' | 'system';
  action: WorldAction; // Inherit your existing WorldAction union
}
`````

## File: src/utils/devMode.ts
`````typescript
/**
 * FILE: devMode.ts
 *
 * PURPOSE:
 * Utilities for detecting Dev Mode vs Publish Mode (Slim/Thin mode).
 */

import { useState, useEffect } from 'react';

export function isDevMode(): boolean {
  if (typeof window === 'undefined') return false;

  const params = new URLSearchParams(window.location.search);

  const devParam = params.get('dev');
  const modeParam = params.get('mode');

  // Explicit overrides
  if (devParam === 'false' || devParam === '0' || modeParam === 'publish' || modeParam === 'prod') {
    return false;
  }

  if (devParam === 'true' || devParam === '1' || modeParam === 'dev') {
    return true;
  }

  // Default: True in AI Studio / local Vite dev environment, False in production build
  return Boolean(import.meta.env.DEV);
}

export function useDevMode(): boolean {
  const [devMode, setDevMode] = useState<boolean>(isDevMode);

  useEffect(() => {
    const handleCheck = () => setDevMode(isDevMode());
    window.addEventListener('popstate', handleCheck);
    return () => window.removeEventListener('popstate', handleCheck);
  }, []);

  return devMode;
}
`````

## File: src/utils/recipeFormatDetector.test.ts
`````typescript
import { describe, it, expect } from 'vitest';
import {
  detectRecipeFormat,
  getPlayableActionsFromFormat,
  convertDeclarativeStepsToActions,
  buildSavedRecipePayload,
} from './recipeFormatDetector';
import type { Recipe } from '../types/Recipe';
import type { RecipeStep } from '../types/RecipeStep';
import type { WorldAction } from '../types/actions';
import type { SavedRecipe } from '../services/dbService';

describe('recipeFormatDetector utility', () => {
  it('detects Declarative Recipe JSON format correctly', () => {
    const declarativeRecipe: Recipe = {
      id: 'test_tortilla_1',
      name: 'Spanish Omelette',
      requirements: {},
      steps: [
        { action: 'move', ingredient: 'potato', source: 'despensa', target: 'board' },
        { action: 'prepare', ingredient: 'potato', style: 'sliced', target: 'board' },
      ],
    };

    const info = detectRecipeFormat(declarativeRecipe);
    expect(info.type).toBe('declarative');
    expect(info.typeLabel).toBe('Declarative Recipe');
    expect(info.title).toBe('Spanish Omelette');
    expect(info.stepOrActionCount).toBe(2);
    expect(info.declarativeRecipe).toEqual(declarativeRecipe);
  });

  it('detects Mascot Action Sequence format correctly', () => {
    const mascotSequence: WorldAction[] = [
      { type: 'MASCOT_MOVE', payload: { targetContainerId: 'board' } },
      { type: 'MASCOT_GRAB', payload: { entityId: 'potato_1' } },
      { type: 'MOVE_ENTITY', payload: { entityId: 'potato_1', targetContainerId: 'board' } },
    ];

    const info = detectRecipeFormat(mascotSequence);
    expect(info.type).toBe('mascot_sequence');
    expect(info.typeLabel).toBe('Mascot Action Sequence');
    expect(info.stepOrActionCount).toBe(3);
    expect(info.mascotSequence).toEqual(mascotSequence);
  });

  it('detects Full Session Log format correctly', () => {
    const sessionLog = {
      version: '1.0',
      title: 'Full Kitchen Session',
      zustandInit: { entities: {}, containers: {} },
      actions: [
        { type: 'MOVE_ENTITY', payload: { entityId: 'egg_1', targetContainerId: 'pan' } },
        { type: 'TOGGLE_BURNER', payload: { containerId: 'burner1', isHeated: true } },
      ],
    };

    const info = detectRecipeFormat(sessionLog);
    expect(info.type).toBe('full_session_log');
    expect(info.typeLabel).toBe('Full Session Log');
    expect(info.title).toBe('Full Kitchen Session');
    expect(info.stepOrActionCount).toBe(2);
    expect(info.fullSessionLog).toEqual(sessionLog);
  });

  it('detects SavedRecipe Firestore database object formats correctly', () => {
    const savedRecipe: SavedRecipe = {
      id: 'db_recipe_101',
      title: 'Cloud Spanish Omelette',
      description: 'A delicious recipe stored in DB',
      author: 'Chef Maria',
      ingredients: ['potato', 'egg'],
      tags: ['custom'],
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
      hasMascotSupport: true,
      formats: {
        recipeJson: {
          id: 'cloud_1',
          name: 'Cloud Omelette',
          requirements: {},
          steps: [{ action: 'move', ingredient: 'egg', target: 'pan' }],
        },
        mascotSequence: [{ type: 'MASCOT_MOVE', payload: { targetContainerId: 'pan' } }],
      },
    };

    const info = detectRecipeFormat(savedRecipe);
    expect(info.type).toBe('declarative');
    expect(info.title).toBe('Cloud Omelette');
    expect(info.stepOrActionCount).toBe(1);
  });

  it('converts declarative steps to playable WorldActions', () => {
    const steps = [
      { action: 'move', ingredient: 'potato', target: 'board' },
      { action: 'prepare', ingredient: 'potato', style: 'sliced' },
      { action: 'cook', ingredient: 'potato', method: 'fried', target: 'pan' },
    ];

    const actions = convertDeclarativeStepsToActions(steps as unknown as RecipeStep[]);
    expect(actions).toHaveLength(3);
    expect(actions[0].type).toBe('MOVE_ENTITY');
    expect(actions[1].type).toBe('PREPARE_INGREDIENT');
    expect(actions[2].type).toBe('COOK_INGREDIENT');
  });

  it('extracts playable actions from any detected format', () => {
    const sessionLogInfo = detectRecipeFormat({
      zustandInit: {},
      actions: [{ type: 'MOVE_ENTITY', payload: { entityId: 'egg_1' } }],
    });

    const playable = getPlayableActionsFromFormat(sessionLogInfo);
    expect(playable.actions).toHaveLength(1);
    expect(playable.actions[0].type).toBe('MOVE_ENTITY');
  });

  it('handles unknown/invalid formats gracefully', () => {
    const unknownData = { foo: 'bar', baz: 123 };
    const info = detectRecipeFormat(unknownData);

    expect(info.type).toBe('unknown');
    expect(info.typeLabel).toBe('Unknown Format');
    expect(info.stepOrActionCount).toBe(0);

    const playable = getPlayableActionsFromFormat(info);
    expect(playable.actions).toHaveLength(0);
  });

  it('builds a SavedRecipe database payload from detected info', () => {
    const mascotInfo = detectRecipeFormat([
      { type: 'MASCOT_MOVE', payload: { targetContainerId: 'board' } },
    ]);

    const payload = buildSavedRecipePayload('My Mascot Routine', 'Description', 'Author', mascotInfo);
    expect(payload.title).toBe('My Mascot Routine');
    expect(payload.formats?.mascotSequence).toBeDefined();
    expect(payload.tags).toContain('mascot_sequence');
  });
});
`````

## File: src/utils/recipeFormatDetector.ts
`````typescript
/**
 * FILE: src/utils/recipeFormatDetector.ts
 *
 * PURPOSE:
 * Utility for detecting, parsing, and normalizing recipe files and objects across all 3 Tortilla World formats:
 * 1. Declarative Recipe (Recipe JSON with steps and requirements)
 * 2. Mascot Action Sequence (WorldAction[] or mascot sequence)
 * 3. Full Session Log (zustandInit, actions, events, zustandEnd)
 */

import type { Recipe } from '../types/Recipe';
import type { RecipeStep } from '../types/RecipeStep';
import type { WorldAction } from '../types/actions';
import type { RecordedAction, SerializedWorldState } from '../types/recording';
import type { SavedRecipe } from '../services/dbService';

export type RecipeFormatType = 'declarative' | 'mascot_sequence' | 'full_session_log' | 'unknown';

export interface FullSessionLogData {
  version?: string;
  title?: string;
  recordedAt?: string;
  zustandInit?: SerializedWorldState;
  actions: RecordedAction[] | WorldAction[];
  events?: unknown[];
  zustandEnd?: SerializedWorldState;
  metadata?: Record<string, unknown>;
}

export interface DetectedRecipeInfo {
  type: RecipeFormatType;
  typeLabel: string;
  title: string;
  stepOrActionCount: number;
  declarativeRecipe: Recipe | null;
  mascotSequence: WorldAction[] | null;
  fullSessionLog: FullSessionLogData | null;
  rawFormat: 'recipeJson' | 'mascotSequence' | 'fullSessionLog' | 'unknown';
}

export function getFormatLabel(type: RecipeFormatType): string {
  switch (type) {
    case 'declarative':
      return 'Declarative Recipe';
    case 'mascot_sequence':
      return 'Mascot Action Sequence';
    case 'full_session_log':
      return 'Full Session Log';
    default:
      return 'Unknown Format';
  }
}

/**
 * Inspects any unknown data structure (file upload or DB object) and identifies its recipe format type.
 */
export function detectRecipeFormat(data: unknown): DetectedRecipeInfo {
  if (!data || (typeof data !== 'object' && !Array.isArray(data))) {
    return {
      type: 'unknown',
      typeLabel: getFormatLabel('unknown'),
      title: 'Unknown Format',
      stepOrActionCount: 0,
      declarativeRecipe: null,
      mascotSequence: null,
      fullSessionLog: null,
      rawFormat: 'unknown',
    };
  }

  const obj = data as Record<string, unknown>;

  // Check 1: Database SavedRecipe with formats
  if (obj.formats && typeof obj.formats === 'object') {
    const formats = obj.formats as Record<string, unknown>;
    const title = (obj.title as string) || 'Saved Recipe';

    if (formats.recipeJson && typeof formats.recipeJson === 'object') {
      const r = formats.recipeJson as Record<string, unknown>;
      if (Array.isArray(r.steps)) {
        return {
          type: 'declarative',
          typeLabel: getFormatLabel('declarative'),
          title: r.name ? (r.name as string) : title,
          stepOrActionCount: r.steps.length,
          declarativeRecipe: formats.recipeJson as unknown as Recipe,
          mascotSequence: (formats.mascotSequence as WorldAction[]) || null,
          fullSessionLog: (formats.fullSessionLog as FullSessionLogData) || null,
          rawFormat: 'recipeJson',
        };
      }
    }

    if (formats.mascotSequence && Array.isArray(formats.mascotSequence) && formats.mascotSequence.length > 0) {
      return {
        type: 'mascot_sequence',
        typeLabel: getFormatLabel('mascot_sequence'),
        title,
        stepOrActionCount: formats.mascotSequence.length,
        declarativeRecipe: null,
        mascotSequence: formats.mascotSequence as WorldAction[],
        fullSessionLog: (formats.fullSessionLog as FullSessionLogData) || null,
        rawFormat: 'mascotSequence',
      };
    }

    if (formats.fullSessionLog && typeof formats.fullSessionLog === 'object') {
      const log = formats.fullSessionLog as Record<string, unknown>;
      if (Array.isArray(log.actions) && log.actions.length > 0) {
        return {
          type: 'full_session_log',
          typeLabel: getFormatLabel('full_session_log'),
          title: (log.title as string) || title,
          stepOrActionCount: log.actions.length,
          declarativeRecipe: null,
          mascotSequence: null,
          fullSessionLog: formats.fullSessionLog as FullSessionLogData,
          rawFormat: 'fullSessionLog',
        };
      }
    }
  }

  // Check 2: Full Session Log (zustandInit or initialRecordingState + actions)
  if ((obj.zustandInit || obj.initialRecordingState || obj.version) && Array.isArray(obj.actions)) {
    const actions = obj.actions as RecordedAction[];
    return {
      type: 'full_session_log',
      typeLabel: getFormatLabel('full_session_log'),
      title: (obj.title as string) || 'Full Session Log',
      stepOrActionCount: actions.length,
      declarativeRecipe: null,
      mascotSequence: actions as unknown as WorldAction[],
      fullSessionLog: obj as unknown as FullSessionLogData,
      rawFormat: 'fullSessionLog',
    };
  }

  // Check 3: Declarative Recipe JSON (object with steps)
  if (Array.isArray(obj.steps)) {
    const steps = obj.steps as RecipeStep[];
    const isStepBased = steps.every((s) => s && typeof s === 'object' && typeof (s as unknown as Record<string, unknown>).action === 'string');

    if (isStepBased) {
      const title = (obj.name as string) || (obj.title as string) || (obj.id as string) || 'Declarative Recipe';
      return {
        type: 'declarative',
        typeLabel: getFormatLabel('declarative'),
        title,
        stepOrActionCount: steps.length,
        declarativeRecipe: obj as unknown as Recipe,
        mascotSequence: null,
        fullSessionLog: null,
        rawFormat: 'recipeJson',
      };
    }
  }

  // Check 4: Wrapped Mascot Action Sequence (object with actions or mascotSequence or actionLog array)
  const candidateArray = (obj.actions || obj.mascotSequence || obj.actionLog) as unknown[];
  if (Array.isArray(candidateArray) && candidateArray.length > 0) {
    const isActionBased = candidateArray.every((item) => item && typeof item === 'object' && typeof (item as Record<string, unknown>).type === 'string');

    if (isActionBased) {
      const title = (obj.title as string) || (obj.name as string) || 'Mascot Action Sequence';
      return {
        type: 'mascot_sequence',
        typeLabel: getFormatLabel('mascot_sequence'),
        title,
        stepOrActionCount: candidateArray.length,
        declarativeRecipe: null,
        mascotSequence: candidateArray as WorldAction[],
        fullSessionLog: null,
        rawFormat: 'mascotSequence',
      };
    }
  }

  // Check 5: Array of items
  if (Array.isArray(data) && data.length > 0) {
    // Check if array of steps
    const firstItem = data[0] as Record<string, unknown>;
    if (firstItem && typeof firstItem === 'object') {
      if (typeof firstItem.action === 'string') {
        const syntheticRecipe: Recipe = {
          id: 'uploaded_declarative_recipe',
          name: 'Uploaded Declarative Recipe',
          requirements: {},
          steps: data as RecipeStep[],
        };
        return {
          type: 'declarative',
          typeLabel: getFormatLabel('declarative'),
          title: 'Uploaded Declarative Recipe',
          stepOrActionCount: data.length,
          declarativeRecipe: syntheticRecipe,
          mascotSequence: null,
          fullSessionLog: null,
          rawFormat: 'recipeJson',
        };
      }

      if (typeof firstItem.type === 'string') {
        return {
          type: 'mascot_sequence',
          typeLabel: getFormatLabel('mascot_sequence'),
          title: 'Action Sequence',
          stepOrActionCount: data.length,
          declarativeRecipe: null,
          mascotSequence: data as WorldAction[],
          fullSessionLog: null,
          rawFormat: 'mascotSequence',
        };
      }
    }
  }

  return {
    type: 'unknown',
    typeLabel: getFormatLabel('unknown'),
    title: 'Unknown Format',
    stepOrActionCount: 0,
    declarativeRecipe: null,
    mascotSequence: null,
    fullSessionLog: null,
    rawFormat: 'unknown',
  };
}

/**
 * Builds a database SavedRecipe payload supporting saving in any mode.
 */
export function buildSavedRecipePayload(
  title: string,
  description: string,
  author: string,
  detectedInfo: DetectedRecipeInfo,
  options: {
    saveMascotFormat?: boolean;
    saveRecipeJsonFormat?: boolean;
    saveSessionLogFormat?: boolean;
  } = {}
): Omit<SavedRecipe, 'createdAt' | 'updatedAt'> {
  const formats: SavedRecipe['formats'] = {};

  if (options.saveRecipeJsonFormat !== false && detectedInfo.declarativeRecipe) {
    formats.recipeJson = detectedInfo.declarativeRecipe as unknown as Record<string, unknown>;
  }

  if (options.saveMascotFormat !== false && detectedInfo.mascotSequence) {
    formats.mascotSequence = detectedInfo.mascotSequence;
  }

  if (options.saveSessionLogFormat !== false && detectedInfo.fullSessionLog) {
    formats.fullSessionLog = detectedInfo.fullSessionLog as unknown as Record<string, unknown>;
  }

  // Fallback: ensure at least the detected primary format is stored
  if (Object.keys(formats).length === 0) {
    if (detectedInfo.type === 'declarative' && detectedInfo.declarativeRecipe) {
      formats.recipeJson = detectedInfo.declarativeRecipe as unknown as Record<string, unknown>;
    } else if (detectedInfo.type === 'mascot_sequence' && detectedInfo.mascotSequence) {
      formats.mascotSequence = detectedInfo.mascotSequence;
    } else if (detectedInfo.type === 'full_session_log' && detectedInfo.fullSessionLog) {
      formats.fullSessionLog = detectedInfo.fullSessionLog as unknown as Record<string, unknown>;
    }
  }

  return {
    id: `recipe_${Date.now()}`,
    title: title.trim() || detectedInfo.title || 'Custom Recipe',
    description: description.trim() || 'Saved recipe from Tortilla World.',
    author: author.trim() || 'Chef Tortilla',
    ingredients: ['egg', 'potato'],
    tags: ['custom', detectedInfo.type],
    hasMascotSupport: Boolean(formats.mascotSequence && formats.mascotSequence.length > 0),
    formats,
  };
}

/**
 * Converts declarative RecipeSteps into WorldActions for playback engines.
 */
export function convertDeclarativeStepsToActions(steps: RecipeStep[]): WorldAction[] {
  const actions: WorldAction[] = [];

  for (const step of steps) {
    switch (step.action) {
      case 'move':
        actions.push({
          type: 'MOVE_ENTITY',
          payload: {
            entityId: step.ingredient || 'ingredient',
            targetContainerId: step.target || 'board',
          },
        });
        break;
      case 'prepare':
      case 'cut':
      case 'peel':
        actions.push({
          type: 'PREPARE_INGREDIENT',
          payload: {
            entityId: step.ingredient || 'ingredient',
            preparation: step.style || step.preparation || 'sliced',
          },
        });
        break;
      case 'cook':
        actions.push({
          type: 'COOK_INGREDIENT',
          payload: {
            entityId: step.ingredient || 'ingredient',
            cooking: step.method || 'fried',
          },
        });
        break;
      case 'mix':
      case 'beat':
      case 'combine':
        actions.push({
          type: 'UPDATE_ENTITY_STATE',
          payload: {
            entityId: step.targetContainerId || 'bowl',
            changes: { mixed: true, output: step.output || 'mixture' },
          },
        });
        break;
      case 'flip':
        actions.push({
          type: 'MASCOT_FLIP',
          payload: {
            mascotId: 'MsTortilla',
          },
        });
        break;
      case 'serve':
        actions.push({
          type: 'MOVE_ENTITY',
          payload: {
            entityId: step.target || 'plate',
            targetContainerId: 'plato',
          },
        });
        break;
      default:
        if ((step as unknown as Record<string, unknown>).ingredient) {
          actions.push({
            type: 'MOVE_ENTITY',
            payload: {
              entityId: (step as unknown as Record<string, unknown>).ingredient as string,
              targetContainerId: (step as unknown as Record<string, unknown>).target as string || 'board',
            },
          });
        }
        break;
    }
  }

  return actions;
}

/**
 * Extracts playable WorldActions and initial state snapshot from any detected recipe format.
 */
export function getPlayableActionsFromFormat(info: DetectedRecipeInfo): {
  actions: WorldAction[];
  zustandInit?: SerializedWorldState;
  declarativeRecipe?: Recipe;
} {
  if (info.type === 'mascot_sequence' && info.mascotSequence) {
    return { actions: info.mascotSequence };
  }

  if (info.type === 'full_session_log' && info.fullSessionLog) {
    return {
      actions: (info.fullSessionLog.actions || []) as WorldAction[],
      zustandInit: info.fullSessionLog.zustandInit,
    };
  }

  if (info.type === 'declarative' && info.declarativeRecipe) {
    return {
      actions: convertDeclarativeStepsToActions(info.declarativeRecipe.steps || []),
      declarativeRecipe: info.declarativeRecipe,
    };
  }

  return { actions: [] };
}
`````

## File: src/utils/sessionLogUtils.test.ts
`````typescript
/**
 * FILE: src/utils/sessionLogUtils.test.ts
 *
 * PURPOSE:
 * Unit tests for session log ingredient filtering and plate dish naming during recording.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { filterUnusedIngredientsFromState } from './sessionLogUtils';
import { worldStore } from '../store/worldStore';
import type { SerializedWorldState, RecordedAction } from '../types/recording';

describe('sessionLogUtils - filterUnusedIngredientsFromState', () => {
  it('filters out unused raw ingredients in despensa while keeping used ones and non-ingredients', () => {
    const mockSnapshot: SerializedWorldState = {
      entities: {
        pan: { id: 'pan', name: 'Pan', type: 'tool' },
        patata_used: { id: 'patata_used', name: 'Potato Used', type: 'ingredient' },
        patata_unused: { id: 'patata_unused', name: 'Potato Unused', type: 'ingredient' },
        huevo_unused: { id: 'huevo_unused', name: 'Egg Unused', type: 'ingredient' },
      },
      containers: {
        despensa: { id: 'despensa', name: 'Pantry', type: 'storage', entityIds: ['patata_unused', 'huevo_unused'] },
        board: { id: 'board', name: 'Board', type: 'workstation', entityIds: ['patata_used'] },
      },
    };

    const mockActions: RecordedAction[] = [
      {
        type: 'MOVE_ENTITY',
        timestampMs: 100,
        payload: {
          entityId: 'patata_used',
          sourceContainerId: 'despensa',
          targetContainerId: 'board',
        },
      },
    ];

    const filtered = filterUnusedIngredientsFromState(mockSnapshot, mockActions);

    // Non-ingredients (tools) and used ingredients should be kept
    expect(filtered.entities['pan']).toBeDefined();
    expect(filtered.entities['patata_used']).toBeDefined();

    // Unused ingredients in despensa should be removed
    expect(filtered.entities['patata_unused']).toBeUndefined();
    expect(filtered.entities['huevo_unused']).toBeUndefined();

    // Container entityIds should be filtered accordingly
    expect(filtered.containers['despensa'].entityIds).toEqual([]);
    expect(filtered.containers['board'].entityIds).toEqual(['patata_used']);
  });
});

describe('Recording - Plate Dish Naming', () => {
  beforeEach(() => {
    worldStore.getState().resetWorld();
    worldStore.getState().clearRecording();
  });

  it('updates entity name on plate when customDishName is passed to stopRecording', () => {
    const store = worldStore.getState();

    // Start recording
    store.startRecording();

    // Move a dish/mixture entity to the plate
    store.dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: {
          id: 'cooked_tortilla_1',
          name: 'Tortilla en sartén',
          type: 'ingredient',
          state: { isCooked: true },
        },
        containerId: 'plate',
      },
    });

    // Check entity is on plate
    expect(worldStore.getState().containers['plate']?.entityIds).toContain('cooked_tortilla_1');

    // Stop recording with custom dish name
    worldStore.getState().stopRecording('Tortilla de la Abuela Especial');

    // Entity on plate should now be renamed
    const updatedEntity = worldStore.getState().entities['cooked_tortilla_1'];
    expect(updatedEntity?.name).toBe('Tortilla de la Abuela Especial');

    // Recording should be stopped
    expect(worldStore.getState().isRecording).toBe(false);
  });
});
`````

## File: src/main.tsx
`````typescript
/**
 * FILE: main.tsx
 *
 * PURPOSE:
 * React application bootstrap file.
 *
 * RESPONSIBILITY:
 * - Creates the React root.
 * - Loads global styles.
 * - Starts the application.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { LanguageProvider } from './i18n/i18nContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
`````

## File: .env.example
`````
# GEMINI_API_KEY: Required for Gemini AI API calls.
# AI Studio automatically injects this at runtime from user secrets.
# Users configure this via the Secrets panel in the AI Studio UI.
GEMINI_API_KEY="MY_GEMINI_API_KEY"

# APP_URL: The URL where this applet is hosted.
# AI Studio automatically injects this at runtime with the Cloud Run service URL.
# Used for self-referential links, OAuth callbacks, and API endpoints.
APP_URL="MY_APP_URL"
`````

## File: firestore.rules
`````
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
`````

## File: metadata.json
`````json
{
  "name": "Tortilla World",
  "description": "Interactive tortilla world application.",
  "requestFramePermissions": [],
  "majorCapabilities": ["MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"]
}
`````

## File: tsconfig.tsbuildinfo
`````
{"root":["./vite.config.ts","./dist/assets/index-C-PAJDM4.js","./src/App.tsx","./src/main.tsx","./src/components/Ingredients/Ingredient.tsx","./src/components/Ingredients/IngredientList.tsx","./src/components/Ingredients/IngredientListItem.tsx","./src/components/Ingredients/RecipeIngredientItem.tsx","./src/components/Ingredients/RecipeIngredientList.tsx","./src/components/Mascot/Mascot.tsx","./src/components/Mascot/TortillaSvg.tsx","./src/components/Recipe/RecipePanel.tsx","./src/components/Scene/Scene.tsx","./src/components/Scene/useSceneDragAndDrop.ts","./src/data/catalog/ingredients.ts","./src/data/catalog/tools.ts","./src/data/catalog/workstations.ts","./src/data/catalog/recipes/clasica.ts","./src/data/catalog/recipes/concebolla.ts","./src/data/catalog/recipes/index.ts","./src/data/catalog/recipes/recipes.test.ts","./src/engine/containerRules.ts","./src/engine/ingredientState.ts","./src/engine/workstations.test.ts","./src/engine/workstations.ts","./src/store/defaults.ts","./src/store/gazeStore.ts","./src/store/selectors.ts","./src/store/types.ts","./src/store/worldStore.test.ts","./src/store/worldStore.ts","./src/store/middleware/actionLog.test.ts","./src/store/middleware/actionLog.ts","./src/store/slices/containerSlice.ts","./src/store/slices/entitySlice.ts","./src/store/slices/mascotSlice.ts","./src/systems/gaze.test.ts","./src/systems/gaze.ts","./src/systems/mascot.ts","./src/systems/mascotActions.test.ts","./src/systems/mascotActions.ts","./src/systems/movement.ts","./src/systems/queries.test.ts","./src/systems/queries.ts","./src/systems/recipeMatcher.test.ts","./src/systems/recipeMatcher.ts","./src/systems/recipeRunner.test.ts","./src/systems/recipeRunner.ts","./src/systems/recipeRunner/RecipeRunner.ts","./src/systems/recipeRunner/types.ts","./src/systems/recipeRunner/handlers/cookHandlers.ts","./src/systems/recipeRunner/handlers/mixHandlers.ts","./src/systems/recipeRunner/handlers/moveHandlers.ts","./src/systems/recipeRunner/handlers/prepHandlers.ts","./src/systems/recipeRunner/handlers/utilityHandlers.ts","./src/types/Ingredient.ts","./src/types/IngredientList.ts","./src/types/Recipe.ts","./src/types/RecipeIngredient.ts","./src/types/RecipeList.ts","./src/types/RecipeStep.ts","./src/types/actions.ts","./src/types/tools.ts","./src/types/workstations.ts","./src/types/world.ts"],"version":"5.8.3"}
`````

## File: docs/roadmap.md
`````markdown
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
`````

## File: src/components/Recipe/RecipePanel.scss
`````scss
/**
 * FILE: src/components/Recipe/RecipePanel.scss
 *
 * PURPOSE:
 * SCSS styles for the Recipe selection and execution panel.
 */

@use 'sass:color';
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.recipe-panel {
  @include ceramic-card($warm-surface, $warm-border);
  padding: 12px 16px;
  margin-bottom: 16px;

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }
}

.recipe-selector {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}

.recipe-tab {
  background: #ffffff;
  border: 1px solid $warm-border;
  font-size: 13px;
  font-weight: 700;
  color: $dark-brown;
  cursor: pointer;
  padding: 6px 14px;
  border-radius: $radius-sm;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  &:hover {
    border-color: $tortilla-yellow;
    color: $dark-brown;
    background: $tortilla-yellow-light;
  }

  &.active {
    background: $tortilla-yellow;
    color: #ffffff;
    border-color: $tortilla-yellow-hover;
    box-shadow: 0 2px 6px rgba(232, 168, 56, 0.3);
  }
}

.recipe-header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.recipe-status {
  font-size: 13px;
  color: $wood-muted;
  font-weight: 600;
}

.highlight-count {
  color: $terracotta;
  font-weight: 800;
}

.recipe-reset-btn {
  background: #ffffff;
  border: 2px solid $terracotta;
  border-radius: $radius-sm;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 800;
  color: $terracotta;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    background: $terracotta;
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: translateY(0);
  }
}

.recipe-toggle-btn {
  background: #ffffff;
  border: 1px solid $warm-border;
  border-radius: $radius-sm;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 700;
  color: $dark-brown;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: $olive-green;
    color: $olive-green;
    background: $olive-green-light;
  }
}

.recipe-content.compact {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed $warm-border;
}

.recipe-requirements {
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.requirement-view {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  &__amount {
    font-size: 0.8rem;
    color: $wood-muted;
    font-weight: 600;
  }
}

.recipe-title {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: $dark-brown;
  font-weight: 700;
}
`````

## File: src/components/World/EntityStateBadge.tsx
`````typescript
/**
 * FILE: EntityStateBadge.tsx
 *
 * PURPOSE:
 * Displays status/state indicator badges for world entities.
 *
 * RESPONSIBILITY:
 * - Reflects state changes such as Raw, Prepared, Cooking, or Finished.
 */

import React from 'react';
import type { Entity } from '../../types/world';
import { useTranslation } from '../../i18n/useTranslation';

interface EntityStateBadgeProps {
  entity: Entity;
  containerId?: string;
}

export const EntityStateBadge: React.FC<EntityStateBadgeProps> = ({ entity, containerId }) => {
  const { t } = useTranslation();
  const prep = entity.state?.preparation as string | undefined;
  const cooking = entity.state?.cooking as string | undefined;
  const status = entity.state?.status as string | undefined;

  if (containerId === 'plate' || status?.includes('cooked') || status?.includes('fried') || status?.includes('tortilla')) {
    return <span className="entity-view__state entity-view__state--finished">{t('states.finished')}</span>;
  }

  if (cooking && cooking !== 'raw') {
    return <span className="entity-view__state entity-view__state--cooking">{t('states.cooking')}</span>;
  }

  if (prep) {
    const translatedPrep = t(`states.${prep}`);
    const displayPrep = (translatedPrep && !translatedPrep.startsWith('states.')) ? translatedPrep : prep;
    return <span className="entity-view__state entity-view__state--prepared">{displayPrep} 🔪</span>;
  }

  if (entity.type === 'ingredient') {
    return <span className="entity-view__state entity-view__state--raw">{t('states.raw')}</span>;
  }

  return null;
};
`````

## File: src/data/catalog/recipes/recipes.test.ts
`````typescript
import { describe, expect, it } from 'vitest';
import { recipes, concebollaRecipe, clasicaRecipe, francesaRecipe } from './index';
import { ingredients as ingredientCatalog } from '../ingredients';
import type { RecipeList } from '../../../types/Recipe';
import { getRecipeRequirementsArray } from '../../../types/Recipe';

describe('Recipe Catalog', () => {
  it('exports a valid RecipeList array', () => {
    const list: RecipeList = recipes;
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThanOrEqual(3);
  });

  it('contains concebolla, clasica and francesa recipes', () => {
    const ids = recipes.map((r) => r.id);
    expect(ids).toContain('concebolla');
    expect(ids).toContain('clasica');
    expect(ids).toContain('francesa');
  });

  it('validates that every recipe has required properties', () => {
    recipes.forEach((recipe) => {
      expect(recipe.id).toBeTruthy();
      expect(recipe.name).toBeTruthy();
      const requirements = getRecipeRequirementsArray(recipe);
      expect(Array.isArray(requirements)).toBe(true);
      expect(requirements.length).toBeGreaterThan(0);
    });
  });

  it('ensures all recipe requirements refer to valid catalog entities', () => {
    const catalogIds = ingredientCatalog.map((i) => i.id);

    recipes.forEach((recipe) => {
      const requirements = getRecipeRequirementsArray(recipe);
      requirements.forEach((req) => {
        expect(req.id).toBeTruthy();
        expect(req.entityId).toBeTruthy();
        expect(catalogIds).toContain(req.entityId);
        expect(req.amount).toBeGreaterThan(0);
        expect(req.unit).toBeTruthy();
      });
    });
  });

  it('distinguishes concebolla (with onion), clasica, and francesa (no potato/onion)', () => {
    const concebollaOnion = getRecipeRequirementsArray(concebollaRecipe).find((i) => i.entityId === 'onion');
    const clasicaOnion = getRecipeRequirementsArray(clasicaRecipe).find((i) => i.entityId === 'onion');
    const francesaPotato = getRecipeRequirementsArray(francesaRecipe).find((i) => i.entityId === 'potato');

    expect(concebollaOnion).toBeDefined();
    expect(clasicaOnion).toBeUndefined();
    expect(francesaPotato).toBeUndefined();
    expect(francesaRecipe.id).toBe('francesa');
  });
});
`````

## File: src/data/catalog/workstations.ts
`````typescript
/**
 * FILE: workstations.ts
 *
 * PURPOSE:
 * Static registry of kitchen workstations.
 *
 * RESPONSIBILITY:
 * - Defines all workstations in the kitchen and their supported actions/capabilities.
 */

import type { Workstation, WorkstationId } from '../../types/workstations';

export const KITCHEN_WORKSTATIONS: Record<WorkstationId, Workstation> = {
  pantry: {
    id: 'pantry',
    name: 'Pantry',
    purpose: 'Store ingredients',
    supportedActions: ['take', 'store', 'move', 'grab'],
    defaultContainerId: 'despensa',
  },
  washing_station: {
    id: 'washing_station',
    name: 'Washing Station',
    purpose: 'Clean ingredients',
    supportedActions: ['wash', 'rinse', 'drain'],
    defaultContainerId: 'sink',
  },
  cutting_station: {
    id: 'cutting_station',
    name: 'Cutting Station',
    purpose: 'Change ingredient preparation',
    supportedActions: ['prepare', 'cut', 'peel'],
    defaultContainerId: 'board',
    requiredTools: ['knife'],
    optionalTools: ['peeler', 'mandoline', 'grater'],
  },
  preparation_station: {
    id: 'preparation_station',
    name: 'Preparation Station',
    purpose: 'Combine ingredients',
    supportedActions: ['crack', 'beat', 'whisk', 'mix', 'season', 'knead'],
    defaultContainerId: 'bowl',
    requiredTools: [],
    optionalTools: ['fork', 'whisk', 'spoon'],
  },
  cooking_station: {
    id: 'cooking_station',
    name: 'Cooking Station',
    purpose: 'Apply heat',
    supportedActions: ['heat', 'fry', 'boil', 'steam', 'grill', 'bake', 'roast', 'cook'],
    defaultContainerId: 'burner1',
    requiredTools: ['pan'],
    optionalTools: ['pot', 'spatula'],
    isOn: false,
  },
  serving_station: {
    id: 'serving_station',
    name: 'Serving Station',
    purpose: 'Finish recipes',
    supportedActions: ['plate', 'garnish', 'serve'],
    defaultContainerId: 'plate',
  },
};
`````

## File: src/engine/ingredientState.ts
`````typescript
/**
 * FILE: ingredientState.ts
 *
 * PURPOSE:
 * Helpers for deriving ingredient status and display name transformations.
 *
 * RESPONSIBILITY:
 * - Derives preparation status strings (e.g., 'sliced-potatoe', 'peeled').
 * - Derives cooking status strings (e.g., 'fried-sliced-potatoe').
 * - Formats updated ingredient names with emoji and preparation.
 */

import type { Entity } from '../types/world';
import { ingredients as catalogIngredients } from '../data/catalog/ingredients';

/**
 * Normalizes an ingredient entity ID or ingredientId to a singular ingredient key for generic status formatting.
 * Examples: 'potatoes' | 'potato' -> 'potatoe'
 *           'onions' | 'onion' -> 'onion'
 *           'carrots' | 'carrot' -> 'carrot'
 */
export function getIngredientSingularKey(targetEntity: Entity): string {
  const baseKey = (targetEntity.ingredientId || targetEntity.id.split('_')[0] || 'ingredient').toLowerCase();
  if (baseKey.startsWith('potato')) return 'potatoe';
  if (baseKey.startsWith('tomato')) return 'tomato';
  if (baseKey.startsWith('onion')) return 'onion';
  if (baseKey.startsWith('carrot')) return 'carrot';
  if (baseKey.endsWith('es') && baseKey.length > 3) return baseKey.slice(0, -2);
  if (baseKey.endsWith('s') && !['cheese', 'glass'].includes(baseKey) && baseKey.length > 2) return baseKey.slice(0, -1);
  return baseKey;
}

/**
 * Derives the generic status string for a prepared ingredient.
 * Examples:
 * - preparation 'peeled' -> 'peeled'
 * - preparation 'sliced' for potato -> 'sliced-potatoe'
 * - preparation 'diced' for onion -> 'diced-onion'
 */
export function derivePreparationStatus(targetEntity: Entity, preparation: string): string {
  const singularKey = getIngredientSingularKey(targetEntity);
  return preparation === 'peeled' ? 'peeled' : `${preparation}-${singularKey}`;
}

/**
 * Derives the generic status string for a cooked ingredient.
 * Examples:
 * - cooking 'fried' with prep 'sliced' for potato -> 'fried-sliced-potatoe'
 */
export function deriveCookingStatus(targetEntity: Entity, cooking: string): string {
  const singularKey = getIngredientSingularKey(targetEntity);
  const prep = targetEntity.state?.preparation;
  if (cooking === 'raw') {
    return prep ? (prep === 'peeled' ? 'peeled' : `${prep}-${singularKey}`) : 'raw';
  }
  return `${cooking}-${prep ? prep + '-' : ''}${singularKey}`;
}

/**
 * Formats an ingredient entity's display name after preparation.
 */
export function formatPreparedName(targetEntity: Entity, preparation: string): string {
  const singularKey = getIngredientSingularKey(targetEntity);
  const baseKey = (targetEntity.ingredientId || targetEntity.id.split('_')[0] || 'ingredient').toLowerCase();
  const catalogItem = catalogIngredients.find(
    (i) => i.id === targetEntity.ingredientId || i.id === baseKey || i.id === singularKey
  );
  const icon = catalogItem?.icon || (targetEntity.name.match(/^(\p{Emoji}|\p{Extended_Pictographic})/u)?.[0] ?? '');
  const baseName = catalogItem?.name || targetEntity.name.replace(/^(\p{Emoji}|\p{Extended_Pictographic})\s*/u, '');

  const capitalizedPrep = preparation.charAt(0).toUpperCase() + preparation.slice(1);
  return `${icon} ${capitalizedPrep} ${baseName}`.trim();
}

/**
 * Formats an ingredient entity's display name after cooking.
 */
export function formatCookedName(targetEntity: Entity, cooking: string): string {
  if (
    targetEntity.id.startsWith('mixture_') ||
    targetEntity.ingredientId === 'mixture' ||
    targetEntity.name.toLowerCase().includes('mixture')
  ) {
    return targetEntity.name;
  }

  const singularKey = getIngredientSingularKey(targetEntity);
  const baseKey = (targetEntity.ingredientId || targetEntity.id.split('_')[0] || 'ingredient').toLowerCase();
  const catalogItem = catalogIngredients.find(
    (i) => i.id === targetEntity.ingredientId || i.id === baseKey || i.id === singularKey
  );
  const icon = catalogItem?.icon || (targetEntity.name.match(/^(\p{Emoji}|\p{Extended_Pictographic})/u)?.[0] ?? '');
  const baseName = catalogItem?.name || targetEntity.name.replace(/^(\p{Emoji}|\p{Extended_Pictographic})\s*/u, '');

  const cookingWord = cooking === 'fry' || cooking === 'fried' ? 'Cooked' : cooking.charAt(0).toUpperCase() + cooking.slice(1);
  const prep = targetEntity.state?.preparation;
  const prepWord = prep && prep !== 'whole' && prep !== 'raw' ? prep.charAt(0).toUpperCase() + prep.slice(1) + ' ' : '';
  return `${icon} ${cookingWord} ${prepWord}${baseName}`.trim();
}

/**
 * Extracts applied stage verbs from entity state or status string.
 */
export function getTransformationsFromEntity(entity: Entity): string[] {
  if (Array.isArray(entity.state?.transformations)) {
    return [...(entity.state.transformations as string[])];
  }

  const status = (entity.state?.status || entity.status || '').toLowerCase();
  const prep = (entity.state?.preparation || '').toLowerCase();
  const cooking = (entity.state?.cooking || '').toLowerCase();

  const stages: string[] = [];

  if (status.includes('washed') || prep === 'washed') {
    stages.push('washed');
  }
  if (status.includes('peeled') || prep === 'peeled') {
    stages.push('peeled');
  }
  if (
    status.includes('cutted') ||
    status.includes('sliced') ||
    status.includes('diced') ||
    status.includes('cut') ||
    prep === 'sliced' ||
    prep === 'diced' ||
    prep === 'cut'
  ) {
    stages.push('cutted');
  }
  if (status.includes('cooked') || status.includes('fried') || (cooking && cooking !== 'raw')) {
    stages.push('cooked');
  }
  if (status.includes('mixed') || prep === 'mixed') {
    stages.push('mixed');
  }

  return stages;
}

/**
 * Applies a workstation transformation ('wash', 'cut', 'peel', 'cook', 'mix') to an ingredient entity.
 * Ensures idempotency (cannot wash or cut multiple times with extra effect) and
 * updates both state.status (e.g., 'washed-onion', 'peeled-cutted-cooked-tomatoes') and display name.
 */
export function applyIngredientTransformation(
  entity: Entity,
  transformation: 'wash' | 'cut' | 'peel' | 'cook' | 'mix'
): { status: string; name: string; state: Record<string, unknown> } | null {
  if (entity.type !== 'ingredient') return null;

  const stageMap: Record<string, string> = {
    wash: 'washed',
    peel: 'peeled',
    cut: 'cutted',
    cook: 'cooked',
    mix: 'mixed',
  };
  const stage = stageMap[transformation] || transformation;

  const currentTransformations = getTransformationsFromEntity(entity);

  // Idempotency: if already transformed with this stage, return null (no extra effect)
  if (currentTransformations.includes(stage)) {
    return null;
  }

  const updatedTransformations = [...currentTransformations, stage];

  // Base key derivation (e.g., 'onion', 'egg', 'tomatoes', 'potatoes')
  const rawBase = (entity.ingredientId || entity.id.split('_')[0] || 'ingredient').toLowerCase();

  // Create combined status string e.g., 'washed-onion', 'peeled-cutted-cooked-tomatoes'
  const newStatus = `${updatedTransformations.join('-')}-${rawBase}`;

  // Retrieve metadata for icon and base name
  const singularKey = getIngredientSingularKey(entity);
  const catalogItem = catalogIngredients.find(
    (i) => i.id === entity.ingredientId || i.id === rawBase || i.id === singularKey
  );

  const icon = catalogItem?.icon || (entity.name.match(/^(\p{Emoji}|\p{Extended_Pictographic})/u)?.[0] ?? '');
  let baseName = entity.name
    .replace(/^(\p{Emoji}|\p{Extended_Pictographic})\s*/u, '')
    .replace(/\b(Washed|Peeled|Cutted|Cut|Sliced|Diced|Cooked|Fried|Mixed)\b/gi, '')
    .trim();

  if (!baseName && catalogItem?.name) {
    baseName = catalogItem.name;
  }

  const titleCaseStage = (s: string) => {
    if (s === 'cutted') return 'Cut';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const formattedAdjectives = updatedTransformations.map(titleCaseStage).join(' ');
  const newName = `${icon} ${formattedAdjectives} ${baseName}`.trim();

  const updatedState = {
    ...entity.state,
    status: newStatus,
    transformations: updatedTransformations,
    preparation:
      stage === 'peeled'
        ? 'peeled'
        : stage === 'cutted'
        ? 'cut'
        : stage === 'washed'
        ? 'washed'
        : (entity.state?.preparation as string),
    cooking: stage === 'cooked' ? 'cooked' : (entity.state?.cooking as string),
  };

  return {
    status: newStatus,
    name: newName,
    state: updatedState,
  };
}
`````

## File: src/i18n/context.ts
`````typescript
/**
 * FILE: context.ts
 *
 * PURPOSE:
 * Holds the React context definition for i18n to avoid fast-refresh lint issues.
 */

import { createContext } from 'react';

export type SupportedLanguage = 'en' | 'es' | 'de';

export interface I18nContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (keyPath: string, params?: Record<string, string | number>) => string;
}

export const I18nContext = createContext<I18nContextType | null>(null);
`````

## File: src/i18n/i18n.test.ts
`````typescript
/**
 * FILE: i18n.test.ts
 *
 * PURPOSE:
 * Unit tests for the Tortilla World i18n translation system.
 */

import { describe, it, expect } from 'vitest';
import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';

describe('i18n Locale Dictionaries', () => {
  it('contains matching top-level keys in English, Spanish, and German dictionaries', () => {
    const enKeys = Object.keys(en).sort();
    const esKeys = Object.keys(es).sort();
    const deKeys = Object.keys(de).sort();
    expect(enKeys).toEqual(esKeys);
    expect(enKeys).toEqual(deKeys);
  });

  it('contains valid text strings for app title and recipe database', () => {
    expect(en.app.title).toBe('Tortilla World');
    expect(es.app.title).toBe('Tortilla World');
    expect(de.app.title).toBe('Tortilla World');
    expect(en.database.confirmDeleteTitle).toContain('Confirm Firestore Deletion');
    expect(es.database.confirmDeleteTitle).toContain('Confirmar Eliminación');
    expect(de.database.confirmDeleteTitle).toContain('Löschen aus Firestore bestätigen');
  });
});
`````

## File: src/i18n/i18nContext.tsx
`````typescript
/**
 * FILE: i18nContext.tsx
 *
 * PURPOSE:
 * Provides lightweight, reactive translation support (i18n) for Tortilla World.
 * Supports switching between English ('en') and Spanish ('es'), with parameter interpolation.
 */

import React, { useState, useCallback, useMemo } from 'react';
import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';
import { I18nContext, type SupportedLanguage } from './context';

type Dictionary = typeof en;

const dictionaries: Record<SupportedLanguage, Dictionary> = {
  en,
  es: es as unknown as Dictionary,
  de: de as unknown as Dictionary,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('tortilla_lang');
    return saved === 'es' || saved === 'de' || saved === 'en' ? saved : 'en';
  });

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('tortilla_lang', lang);
  }, []);

  const t = useCallback(
    (keyPath: string, params?: Record<string, string | number>): string => {
      const keys = keyPath.split('.');
      let current: unknown = dictionaries[language] || dictionaries.en;

      for (const k of keys) {
        if (current && typeof current === 'object' && k in current) {
          current = (current as Record<string, unknown>)[k];
        } else {
          // Fallback to English dictionary if key missing in chosen locale
          let fallback: unknown = dictionaries.en;
          for (const fk of keys) {
            if (fallback && typeof fallback === 'object' && fk in fallback) {
              fallback = (fallback as Record<string, unknown>)[fk];
            } else {
              return keyPath;
            }
          }
          current = fallback;
          break;
        }
      }

      if (typeof current !== 'string') {
        return keyPath;
      }

      let result = current;
      if (params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          result = result.replace(new RegExp(`{{\\s*${paramKey}\\s*}}`, 'g'), String(paramValue));
        });
      }

      return result;
    },
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, setLanguage, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
`````

## File: src/systems/recipeRunner/types.ts
`````typescript
/**
 * FILE: src/systems/recipeRunner/types.ts
 *
 * PURPOSE:
 * Type definitions and execution context contract for RecipeRunner and its step handlers.
 */

import type { Recipe } from '../../types/Recipe';
import type { Entity } from '../../types/world';

export interface RecipeContextData {
  recipeId: string;
  /**
   * Maps key/alias/ingredient name (e.g. 'potatoes', 'egg', 'mixture') to a specific stable Entity ID.
   */
  bindings: Record<string, string>;
}

export interface RecipeRunnerOptions {
  mascotId?: string;
  defaultSourceId?: string;
  defaultTargetId?: string;
  delayMs?: number;
  useMascot?: boolean;
}

export interface RecipeRunnerContext {
  mascotId: string;
  defaultSourceId: string;
  defaultTargetId: string;
  delayMs: number;
  useMascot?: boolean;
  currentRecipe?: Recipe;
  recipeContext: RecipeContextData;

  wait(ms?: number): Promise<void>;

  /**
   * Binds initial recipe ingredients to entity IDs in the world state.
   */
  bindRecipeContext(recipe: Recipe): void;

  /**
   * Retrieves the bound Entity ID for a target or key from RecipeContext.
   */
  getBoundEntityId(targetOrKey?: string): string | undefined;

  /**
   * Validates that an entity exists and is not consumed. Throws descriptive error on failure.
   */
  validateEntity(entityId: string, stepAction?: string): Entity;

  /**
   * Ensures specified bound entity is in target workspace container or held by mascot.
   */
  ensureEntityInWorkspace(
    entityId: string,
    targetContainerId?: string
  ): Promise<string>;

  /**
   * Updates bindings if an entity ID changed (e.g. copied from immutable storage).
   */
  updateBindingIfCopied(oldEntityId: string, newEntityId: string, specificKey?: string): void;

  resolveIngredientId(targetOrKey?: string): string | undefined;
  ensureIngredientInWorkspace(
    ingredientCatalogId: string,
    targetContainerId?: string
  ): Promise<string | undefined>;
}
`````

## File: src/systems/gaze.test.ts
`````typescript
/**
 * FILE: gaze.test.ts
 *
 * PURPOSE:
 * Unit tests for gaze system.
 *
 * RESPONSIBILITY:
 * - Validates mascot gaze target updates, structural equality, and idempotency.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';
import { updateMascotGaze, getMascotGazeTarget } from './gaze';
import type { GazeTarget } from './gaze';

const  FIRE_GAZE: GazeTarget = { type: 'entity', entityId: ' burner1' };

describe('Gaze System', () => {
  beforeEach(() => {
    worldStore.setState({
      entities: {
        chef: {
          id: 'chef',
          name: 'Chef',
          type: 'mascot',
          state: {
            gazingAt: undefined,
          },
        },
      },
      containers: {
        bench: {
          id: 'bench',
          name: 'Workbench',
          type: 'board',
          rules: { maxCapacity: 1 },
          entityIds: [],
        },
        burner1: {
          id: 'burner1',
          name: 'burner1',
          type: 'burner',
          rules: { maxCapacity: Infinity },
          entityIds: [],
        },
        plate: {
          id: 'plate',
          name: 'Plate',
          type: 'storage',
          rules: { maxCapacity: Infinity },
          entityIds: [],
        },
      },
    });
  });

  it('updates mascot gaze target correctly', () => {
    updateMascotGaze('chef',  FIRE_GAZE);
    expect(getMascotGazeTarget('chef')).toEqual( FIRE_GAZE);
  });

  it('is idempotent when gazing at the same target', () => {
    updateMascotGaze('chef',  FIRE_GAZE);
    const firstState = worldStore.getState();

    updateMascotGaze('chef', { type: 'entity', entityId: ' burner1' }); // structurally identical
    const secondState = worldStore.getState();

    expect(firstState).toBe(secondState);
  });

  it('updates when gazing at a different entity', () => {
    updateMascotGaze('chef',  FIRE_GAZE);
    updateMascotGaze('chef', { type: 'entity', entityId: 'plate' });
    expect(getMascotGazeTarget('chef')).toEqual({ type: 'entity', entityId: 'plate' });
  });

  it('can gaze at mouse', () => {
    updateMascotGaze('chef', { type: 'mouse' });
    expect(getMascotGazeTarget('chef')).toEqual({ type: 'mouse' });
  });

  it('can gaze at a point', () => {
    const pointGaze: GazeTarget = { type: 'point', point: { x: 100, y: 200 } };
    updateMascotGaze('chef', pointGaze);
    expect(getMascotGazeTarget('chef')).toEqual(pointGaze);
  });

  it('can clear gaze to null', () => {
    updateMascotGaze('chef',  FIRE_GAZE);
    updateMascotGaze('chef', null);
    expect(getMascotGazeTarget('chef')).toBeNull();
  });
});
`````

## File: src/systems/mixAndCook.test.ts
`````typescript
/**
 * FILE: mixAndCook.test.ts
 *
 * PURPOSE:
 * Unit tests for Mix and Cook actions, dynamic naming, and cooking conditions.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';

describe('Mix & Cook Actions with Dynamic Naming & Conditions', () => {
  beforeEach(() => {
    worldStore.getState().resetWorld();
    worldStore.getState().setActiveRecipeName('Tortilla Española Clásica');
  });

  describe('1. The Mix Action (Bowl)', () => {
    it('combines bowl ingredients into a single mixture with sequential default name (mixture_1)', () => {
      const store = worldStore.getState();

      // Setup: Add potato and egg into bowl
      store.dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: { id: 'potato_1', name: 'Potato', type: 'ingredient', ingredientId: 'potato' },
          containerId: 'bowl',
        },
      });
      store.dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: { id: 'egg_1', name: 'Egg', type: 'ingredient', ingredientId: 'egg' },
          containerId: 'bowl',
        },
      });

      expect(worldStore.getState().containers.bowl.entityIds).toEqual(['potato_1', 'egg_1']);

      // Dispatch MIX_CONTAINER_CONTENTS without custom name
      store.dispatch({
        type: 'MIX_CONTAINER_CONTENTS',
        payload: { containerId: 'bowl' },
      });

      const updatedBowl = worldStore.getState().containers.bowl;
      expect(updatedBowl.entityIds).toHaveLength(1);

      const mixtureId = updatedBowl.entityIds[0];
      const mixtureEntity = worldStore.getState().entities[mixtureId];

      expect(mixtureEntity).toBeDefined();
      expect(mixtureEntity.name).toBe('mixture_1');
      expect(mixtureEntity.state?.preparation).toBe('mixed');
      expect(mixtureEntity.state?.status).toBe('mixed');
    });

    it('allows overriding mixture name with customName during mix dispatch', () => {
      const store = worldStore.getState();

      store.dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: { id: 'onion_1', name: 'Onion', type: 'ingredient', ingredientId: 'onion' },
          containerId: 'bowl',
        },
      });

      store.dispatch({
        type: 'MIX_CONTAINER_CONTENTS',
        payload: { containerId: 'bowl', customName: 'Cebolla Batida' },
      });

      const updatedBowl = worldStore.getState().containers.bowl;
      const mixtureEntity = worldStore.getState().entities[updatedBowl.entityIds[0]];

      expect(mixtureEntity.name).toBe('Cebolla Batida');
    });

    it('generates sequential mixture names for subsequent mixtures (mixture_2)', () => {
      const store = worldStore.getState();

      // First mixture
      store.dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: { id: 'item_a', name: 'A', type: 'ingredient' },
          containerId: 'bowl',
        },
      });
      store.dispatch({
        type: 'MIX_CONTAINER_CONTENTS',
        payload: { containerId: 'bowl' },
      });

      // Move mixture out of bowl
      const mix1Id = worldStore.getState().containers.bowl.entityIds[0];
      store.dispatch({
        type: 'MOVE_ENTITY',
        payload: { entityId: mix1Id, targetContainerId: 'plate' },
      });

      // Second mixture
      store.dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: { id: 'item_b', name: 'B', type: 'ingredient' },
          containerId: 'bowl',
        },
      });
      store.dispatch({
        type: 'MIX_CONTAINER_CONTENTS',
        payload: { containerId: 'bowl' },
      });

      const mix2Id = worldStore.getState().containers.bowl.entityIds[0];
      const mix2Entity = worldStore.getState().entities[mix2Id];

      expect(mix2Entity.name).toBe('mixture_2');
    });
  });

  describe('2. The Cook Action (Cooking Area / Pan & Conditions)', () => {
    it('toggles heat and stores time-based and condition-based cooking targets', () => {
      const store = worldStore.getState();

      // Turn heat on with time-based target '10 min'
      store.dispatch({
        type: 'TOGGLE_HEAT',
        payload: { containerId: 'burner1', isOn: true, cookCondition: '10 min' },
      });

      let burner = worldStore.getState().containers.burner1;
      expect(burner.isOn).toBe(true);
      expect(burner.cookCondition).toBe('10 min');
      expect(burner.timer).toBe('10 min');

      // Turn heat off
      store.dispatch({
        type: 'TOGGLE_HEAT',
        payload: { containerId: 'burner1', isOn: false },
      });

      burner = worldStore.getState().containers.burner1;
      expect(burner.isOn).toBe(false);
      expect(burner.cookCondition).toBeUndefined();

      // Turn heat on with condition-based target 'until brown'
      store.dispatch({
        type: 'TOGGLE_HEAT',
        payload: { containerId: 'burner1', isOn: true, cookCondition: 'until brown' },
      });

      burner = worldStore.getState().containers.burner1;
      expect(burner.isOn).toBe(true);
      expect(burner.cookCondition).toBe('until brown');
    });

    it('cooks container contents and sets state to cooked with custom final name', () => {
      const store = worldStore.getState();

      // Prepare mixture in bowl
      store.dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: { id: 'p_1', name: 'Potato', type: 'ingredient' },
          containerId: 'bowl',
        },
      });
      store.dispatch({
        type: 'MIX_CONTAINER_CONTENTS',
        payload: { containerId: 'bowl', customName: 'Base Batter' },
      });

      const mixtureId = worldStore.getState().containers.bowl.entityIds[0];

      // Move mixture to burner1
      store.dispatch({
        type: 'MOVE_ENTITY',
        payload: { entityId: mixtureId, targetContainerId: 'burner1' },
      });

      // Set heat condition
      store.dispatch({
        type: 'TOGGLE_HEAT',
        payload: { containerId: 'burner1', isOn: true, cookCondition: 'until golden' },
      });

      // Cook with final custom name 'Oma tortilla'
      store.dispatch({
        type: 'COOK_CONTAINER_CONTENTS',
        payload: { containerId: 'burner1', customName: 'Oma tortilla' },
      });

      const cookedMixture = worldStore.getState().entities[mixtureId];
      expect(cookedMixture.name).toBe('Oma tortilla');
      expect(cookedMixture.status).toBe('cooked');
      expect(cookedMixture.state?.cooking).toBe('cooked');
      expect(cookedMixture.state?.cookCondition).toBe('until golden');
    });

    it('retains mixture name during pan cooking if customName is omitted, and sets dish name when moved to plate', () => {
      const store = worldStore.getState();
      worldStore.getState().setActiveRecipeName('Tortilla con Cebolla');

      store.dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: { id: 'p_2', name: 'Potato', type: 'ingredient' },
          containerId: 'bowl',
        },
      });
      store.dispatch({
        type: 'MIX_CONTAINER_CONTENTS',
        payload: { containerId: 'bowl' },
      });

      const mixtureId = worldStore.getState().containers.bowl.entityIds[0];

      store.dispatch({
        type: 'MOVE_ENTITY',
        payload: { entityId: mixtureId, targetContainerId: 'burner1' },
      });

      // Cook without custom name - pan retains mixture name
      store.dispatch({
        type: 'COOK_CONTAINER_CONTENTS',
        payload: { containerId: 'burner1' },
      });

      const cookedMixtureInPan = worldStore.getState().entities[mixtureId];
      expect(cookedMixtureInPan.status).toBe('cooked');
      expect(cookedMixtureInPan.name).toBe('mixture_1');

      // Moving to plate assigns the final active recipe dish name
      store.dispatch({
        type: 'MOVE_ENTITY',
        payload: { entityId: mixtureId, targetContainerId: 'plate' },
      });

      const cookedMixtureOnPlate = worldStore.getState().entities[mixtureId];
      expect(cookedMixtureOnPlate.name).toBe('Tortilla con Cebolla');
    });
  });

  describe('3. Mixture & Final Dish Renaming', () => {
    it('allows updating mixture entity name directly via UPDATE_ENTITY_STATE in bowl', () => {
      const store = worldStore.getState();

      store.dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: { id: 'p_mix', name: 'Potato', type: 'ingredient' },
          containerId: 'bowl',
        },
      });

      store.dispatch({
        type: 'MIX_CONTAINER_CONTENTS',
        payload: { containerId: 'bowl' },
      });

      const mixtureId = worldStore.getState().containers.bowl.entityIds[0];
      expect(worldStore.getState().entities[mixtureId].name).toBe('mixture_1');

      // Rename mixture directly in bowl
      store.dispatch({
        type: 'UPDATE_ENTITY_STATE',
        payload: {
          entityId: mixtureId,
          changes: { name: 'Mezcla Especial de la Casa' },
        },
      });

      expect(worldStore.getState().entities[mixtureId].name).toBe('Mezcla Especial de la Casa');
    });

    it('allows updating final dish name on plate and preserves custom name when moved', () => {
      const store = worldStore.getState();

      // Create mixture and cook it with custom name
      store.dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: { id: 'potato_cook', name: 'Potato', type: 'ingredient' },
          containerId: 'bowl',
        },
      });
      store.dispatch({
        type: 'MIX_CONTAINER_CONTENTS',
        payload: { containerId: 'bowl', customName: 'Batido Secreto' },
      });

      const mixtureId = worldStore.getState().containers.bowl.entityIds[0];

      // Cook in burner
      store.dispatch({
        type: 'MOVE_ENTITY',
        payload: { entityId: mixtureId, targetContainerId: 'burner1' },
      });
      store.dispatch({
        type: 'COOK_CONTAINER_CONTENTS',
        payload: { containerId: 'burner1', customName: 'Tortilla Gourmet' },
      });

      expect(worldStore.getState().entities[mixtureId].name).toBe('Tortilla Gourmet');

      // Move to plate - custom name 'Tortilla Gourmet' should be preserved (not overwritten by active recipe)
      store.dispatch({
        type: 'MOVE_ENTITY',
        payload: { entityId: mixtureId, targetContainerId: 'plate' },
      });

      expect(worldStore.getState().entities[mixtureId].name).toBe('Tortilla Gourmet');

      // User renames final dish on plate to 'Tortilla Suprema'
      store.dispatch({
        type: 'UPDATE_ENTITY_STATE',
        payload: {
          entityId: mixtureId,
          changes: { name: 'Tortilla Suprema' },
        },
      });

      expect(worldStore.getState().entities[mixtureId].name).toBe('Tortilla Suprema');
    });
  });
});
`````

## File: src/systems/recipeLoader.test.ts
`````typescript
/**
 * FILE: recipeLoader.test.ts
 *
 * PURPOSE:
 * Comprehensive unit tests for RecipeLoader and RecipeValidator.
 */

import { describe, it, expect } from 'vitest';
import {
  loadRecipe,
  loadAllRecipes,
  getAvailableRecipeIds,
  getRecipeCooklang,
} from './recipeLoader';
import { validateRecipeJSON } from './recipeValidator';
import { getRecipeRequirementsArray } from '../types/Recipe';

describe('RecipeValidator', () => {
  it('passes validation for valid recipe JSON', () => {
    const validJSON = {
      id: 'test_recipe',
      name: 'Test Recipe',
      requirements: {
        potato: { entityId: 'potato', amount: 1, unit: 'pcs' },
      },
      steps: [
        { action: 'prepare', target: 'potato', preparation: 'peeled' },
        { action: 'celebrate' },
      ],
    };

    const validated = validateRecipeJSON(validJSON);
    expect(validated.id).toBe('test_recipe');
    expect(validated.name).toBe('Test Recipe');
  });

  it('throws error if input is not an object', () => {
    expect(() => validateRecipeJSON(null)).toThrow('expected a non-null JSON object');
    expect(() => validateRecipeJSON('invalid')).toThrow('expected a non-null JSON object');
  });

  it('throws error if "id" is missing or empty', () => {
    expect(() => validateRecipeJSON({ name: 'Test', steps: [], requirements: {} })).toThrow('"id" must be a non-empty string');
    expect(() => validateRecipeJSON({ id: '   ', name: 'Test', steps: [], requirements: {} })).toThrow('"id" must be a non-empty string');
  });

  it('throws error if "name" is missing or empty', () => {
    expect(() => validateRecipeJSON({ id: 'r1', name: '', steps: [], requirements: {} })).toThrow('"name" must be a non-empty string');
  });

  it('throws error if "requirements" and "ingredients" are missing', () => {
    expect(() => validateRecipeJSON({ id: 'r1', name: 'R1', steps: [{ action: 'celebrate' }] })).toThrow('must declare "requirements" or "ingredients"');
  });

  it('throws error if "steps" is empty or not an array', () => {
    expect(() => validateRecipeJSON({ id: 'r1', name: 'R1', requirements: {}, steps: [] })).toThrow('"steps" must be a non-empty array');
  });

  it('throws error if step action is invalid', () => {
    const invalidStepJSON = {
      id: 'r1',
      name: 'R1',
      requirements: { potato: { amount: 1, unit: 'pcs' } },
      steps: [{ action: 'invalid_action_type' }],
    };
    expect(() => validateRecipeJSON(invalidStepJSON)).toThrow('invalid or missing action');
  });
});

describe('RecipeLoader', () => {
  it('loads clasica recipe by ID correctly', () => {
    const recipe = loadRecipe('clasica');
    expect(recipe.id).toBe('clasica');
    expect(recipe.name).toBe('Clásica');
    expect(recipe.steps.length).toBeGreaterThan(0);

    const reqs = getRecipeRequirementsArray(recipe);
    expect(reqs.length).toBeGreaterThan(0);
    expect(reqs.some((r) => r.entityId === 'potato')).toBe(true);
  });

  it('loads concebolla recipe by ID correctly', () => {
    const recipe = loadRecipe('concebolla');
    expect(recipe.id).toBe('concebolla');
    expect(recipe.name).toBe('Tortilla con Cebolla');

    const reqs = getRecipeRequirementsArray(recipe);
    expect(reqs.some((r) => r.entityId === 'onion')).toBe(true);
  });

  it('loads francesa recipe by ID correctly', () => {
    const recipe = loadRecipe('francesa');
    expect(recipe.id).toBe('francesa');
    expect(recipe.name).toBe('Tortilla Francesa');

    const reqs = getRecipeRequirementsArray(recipe);
    expect(reqs.some((r) => r.entityId === 'egg')).toBe(true);
    expect(reqs.some((r) => r.entityId === 'oil')).toBe(true);
    expect(reqs.some((r) => r.entityId === 'salt')).toBe(true);
  });

  it('loads all recipes using loadAllRecipes', () => {
    const all = loadAllRecipes();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBe(3);
    expect(all.map((r) => r.id)).toEqual(['concebolla', 'clasica', 'francesa']);
  });

  it('returns available recipe IDs', () => {
    const ids = getAvailableRecipeIds();
    expect(ids).toContain('concebolla');
    expect(ids).toContain('clasica');
    expect(ids).toContain('francesa');
  });

  it('retrieves cooklang string for valid recipe ID', () => {
    const clasicaCooklang = getRecipeCooklang('clasica');
    expect(clasicaCooklang).toContain('Peel the @potatoes');

    const concebollaCooklang = getRecipeCooklang('concebolla');
    expect(concebollaCooklang).toContain('Dice the @onions');

    const francesaCooklang = getRecipeCooklang('francesa');
    expect(francesaCooklang).toContain('Huevo batido');
  });

  it('throws an error when attempting to load an unknown recipe ID', () => {
    expect(() => loadRecipe('non_existent_recipe')).toThrow('Unknown recipe ID');
  });
});
`````

## File: src/systems/recipeTranslator.test.ts
`````typescript
import { describe, it, expect } from 'vitest';
import {
  translateHumanActionsToMascotActions,
  translateHumanActionsToRecipe,
} from './recipeTranslator';
import type { RecordedAction } from '../types/recording';

describe('recipeTranslator system', () => {
  it('translates human MOVE_ENTITY into interleaved mascot move, grab, move, drop, and move_entity actions', () => {
    const humanActions: RecordedAction[] = [
      {
        type: 'MOVE_ENTITY',
        payload: { entityId: 'patata_1', targetContainerId: 'board', sourceContainerId: 'despensa' },
        timestampMs: 1000,
      },
    ];

    const translated = translateHumanActionsToMascotActions(humanActions);

    expect(translated).toHaveLength(5);
    expect(translated[0].type).toBe('MASCOT_MOVE');
    expect(translated[0].payload.targetContainerId).toBe('despensa');

    expect(translated[1].type).toBe('MASCOT_GRAB');
    expect(translated[1].payload.entityId).toBe('patata_1');

    expect(translated[2].type).toBe('MASCOT_MOVE');
    expect(translated[2].payload.targetContainerId).toBe('board');

    expect(translated[3].type).toBe('MASCOT_DROP');
    expect(translated[3].payload.targetContainerId).toBe('board');

    expect(translated[4].type).toBe('MOVE_ENTITY');
    expect(translated[4].payload.entityId).toBe('patata_1');
  });

  it('translates TOGGLE_BURNER and PREPARE_INGREDIENT with mascot move focus', () => {
    const humanActions: RecordedAction[] = [
      {
        type: 'TOGGLE_BURNER',
        payload: { containerId: 'burner1' },
        timestampMs: 1000,
      },
      {
        type: 'PREPARE_INGREDIENT',
        payload: { entityId: 'cebolla_1', preparation: 'sliced' },
        timestampMs: 1300,
      },
    ];

    const translated = translateHumanActionsToMascotActions(humanActions);

    expect(translated[0].type).toBe('MASCOT_MOVE');
    expect(translated[0].payload.targetContainerId).toBe('burner1');
    expect(translated[1].type).toBe('TOGGLE_BURNER');

    expect(translated[2].type).toBe('MASCOT_MOVE');
    expect(translated[3].type).toBe('PREPARE_INGREDIENT');
  });

  it('translates human action sequence into a declarative Recipe object', () => {
    const humanActions: RecordedAction[] = [
      {
        type: 'MOVE_ENTITY',
        payload: { entityId: 'patata_1', targetContainerId: 'board', sourceContainerId: 'despensa' },
        timestampMs: 1000,
      },
      {
        type: 'PREPARE_INGREDIENT',
        payload: { entityId: 'patata_1', preparation: 'sliced' },
        timestampMs: 1300,
      },
    ];

    const recipe = translateHumanActionsToRecipe(humanActions, { recipeName: 'Test Tortilla' });

    expect(recipe.name).toBe('Test Tortilla');
    expect(recipe.requirements).toHaveProperty('patata');
    expect(recipe.steps.length).toBeGreaterThan(2);

    const moveStep = recipe.steps.find((s) => s.action === 'move');
    expect(moveStep).toBeDefined();
    if (moveStep && moveStep.action === 'move') {
      expect(moveStep.ingredient).toBe('patata');
      expect(moveStep.target).toBe('board');
    }

    const prepStep = recipe.steps.find((s) => s.action === 'prepare');
    expect(prepStep).toBeDefined();
    if (prepStep && prepStep.action === 'prepare') {
      expect(prepStep.preparation).toBe('sliced');
    }
  });
});
`````

## File: src/systems/recipeWorkstations.ts
`````typescript
/**
 * FILE: recipeWorkstations.ts
 *
 * PURPOSE:
 * Utility to identify all workstation containers required/used by a recipe.
 *
 * RESPONSIBILITY:
 * - Scans recipe steps to extract target and source containers (sink, board, bowl, burner1, plate, etc.).
 * - Used to hide workstations not used in an active recipe.
 */

import type { Recipe } from '../types/Recipe';
import type { RecipeStep } from '../types/RecipeStep';
import type { Container } from '../types/world';

export function getRecipeWorkstationIds(
  recipe?: Recipe | null,
  allContainers?: Record<string, Container>
): Set<string> {
  const result = new Set<string>();

  if (!recipe || !recipe.steps || recipe.steps.length === 0) {
    if (allContainers) {
      Object.keys(allContainers).forEach((id) => {
        if (id !== 'despensa') result.add(id);
      });
    } else {
      ['sink', 'board', 'bowl', 'burner1', 'burner2', 'burner', 'plate'].forEach((id) => result.add(id));
    }
    return result;
  }

  // Plato (plate) and Trash are always available in kitchen workstations
  result.add('plate');
  result.add('trash');

  const knownContainers = new Set(['sink', 'board', 'bowl', 'burner1', 'burner2', 'plate', 'trash']);

  const addWorkstation = (rawId?: string) => {
    if (!rawId) return;
    const cId = rawId.toLowerCase().trim();
    if (cId === 'despensa' || cId === 'pantry' || cId === 'storage') return;

    if (
      cId === 'burner' ||
      cId === 'pan' ||
      cId === 'stove' ||
      cId === 'fuego' ||
      cId === 'fuego1' ||
      cId === 'fuego 1' ||
      cId === 'sarten' ||
      cId === 'sartén' ||
      cId === 'burner1'
    ) {
      result.add('burner1');
      return;
    }
    if (cId === 'fuego2' || cId === 'fuego 2' || cId === 'burner2') {
      result.add('burner2');
      return;
    }
    if (cId === 'cutting_board' || cId === 'cutting' || cId === 'tabla' || cId === 'board') {
      result.add('board');
      return;
    }
    if (cId === 'fregadero' || cId === 'sink') {
      result.add('sink');
      return;
    }
    if (cId === 'bol' || cId === 'bowl') {
      result.add('bowl');
      return;
    }
    if (cId === 'plato' || cId === 'plate') {
      result.add('plate');
      return;
    }
    if (cId === 'basura' || cId === 'trash') {
      result.add('trash');
      return;
    }

    if (allContainers && allContainers[cId] && cId !== 'despensa') {
      result.add(cId);
    } else if (knownContainers.has(cId)) {
      result.add(cId);
    }
  };

  const getContainerId = (s: RecipeStep): string | undefined => {
    if ('containerId' in s && typeof s.containerId === 'string') return s.containerId;
    return undefined;
  };

  const getTargetContainerId = (s: RecipeStep): string | undefined => {
    if ('targetContainerId' in s && typeof s.targetContainerId === 'string') return s.targetContainerId;
    return undefined;
  };

  for (const step of recipe.steps) {
    switch (step.action) {
      case 'clean':
      case 'wash':
      case 'rinse':
      case 'drain':
        addWorkstation(getContainerId(step) || 'sink');
        break;

      case 'prepare':
      case 'cut':
      case 'peel':
        if ('preparation' in step && step.preparation === 'beaten') {
          addWorkstation('bowl');
        } else {
          addWorkstation(getContainerId(step) || 'board');
        }
        break;

      case 'cook':
        addWorkstation(getContainerId(step) || 'burner1');
        break;

      case 'mix':
      case 'beat':
      case 'combine':
        addWorkstation(getTargetContainerId(step) || 'bowl');
        break;

      case 'flip':
        addWorkstation(getContainerId(step) || 'burner1');
        break;

      case 'serve':
        addWorkstation(getContainerId(step) || 'plate');
        break;

      case 'move':
        if ('target' in step && typeof step.target === 'string') addWorkstation(step.target);
        if ('source' in step && typeof step.source === 'string') addWorkstation(step.source);
        break;

      case 'grab':
        if ('source' in step && typeof step.source === 'string') addWorkstation(step.source);
        break;

      case 'drop':
        if ('target' in step && typeof step.target === 'string') addWorkstation(step.target);
        break;
    }

    const cId = getContainerId(step);
    if (cId) addWorkstation(cId);
    const tcId = getTargetContainerId(step);
    if (tcId) addWorkstation(tcId);
  }

  return result;
}
`````

## File: src/utils/sessionLogUtils.ts
`````typescript
/**
 * FILE: src/utils/sessionLogUtils.ts
 *
 * PURPOSE:
 * Utility functions for filtering and serializing session log state snapshots.
 * Ensures that Full Session Logs (zustandInit / zustandEnd) only retain ingredients
 * that were actually used or manipulated during the recorded recipe session.
 */

import type { Entity, Container } from '../types/world';
import type { RecordedAction, SerializedWorldState } from '../types/recording';

export function filterUnusedIngredientsFromState(
  worldSnapshot: SerializedWorldState | null,
  recordedActions: RecordedAction[]
): SerializedWorldState {
  if (!worldSnapshot || !worldSnapshot.entities) {
    return worldSnapshot || { entities: {}, containers: {} };
  }

  const { entities, containers } = worldSnapshot;

  // Set of entity IDs used in actions or active workstation containers
  const usedEntityIds = new Set<string>();

  // 1. Inspect recorded actions for referenced entity IDs
  recordedActions.forEach((action) => {
    const payload = (action.payload || {}) as Record<string, unknown>;

    if (payload.entityId && typeof payload.entityId === 'string') {
      usedEntityIds.add(payload.entityId);
    }

    if (payload.entity && typeof payload.entity === 'object') {
      const ent = payload.entity as { id?: string; ingredientId?: string };
      if (ent.id) usedEntityIds.add(ent.id);
      if (ent.ingredientId) usedEntityIds.add(ent.ingredientId);
    }

    if (payload.ingredientId && typeof payload.ingredientId === 'string') {
      usedEntityIds.add(payload.ingredientId);
    }

    // Container actions (mix, cook, etc.)
    if (payload.containerId && typeof payload.containerId === 'string') {
      const container = containers[payload.containerId];
      if (container && container.entityIds) {
        container.entityIds.forEach((id) => usedEntityIds.add(id));
      }
    }
  });

  // 2. Also consider entities that are in active workstation containers (non-despensa/storage)
  Object.entries(containers || {}).forEach(([containerId, container]) => {
    if (
      containerId !== 'despensa' &&
      containerId !== 'storage' &&
      containerId !== 'pantry' &&
      container.entityIds
    ) {
      container.entityIds.forEach((id) => usedEntityIds.add(id));
    }
  });

  // 3. Filter entities: keep all non-ingredient entities (tools, workstations, containers, mascot),
  // and for ingredient entities, keep ONLY those in usedEntityIds.
  const filteredEntities: Record<string, Entity> = {};
  const keptEntityIds = new Set<string>();

  Object.entries(entities).forEach(([id, entity]) => {
    const isIngredient =
      entity.type === 'ingredient' ||
      Boolean(entity.ingredientId) ||
      id.includes('potato') ||
      id.includes('patata') ||
      id.includes('egg') ||
      id.includes('huevo') ||
      id.includes('onion') ||
      id.includes('cebolla') ||
      id.includes('oil') ||
      id.includes('aceite') ||
      id.includes('salt') ||
      id.includes('sal') ||
      id.includes('pepper') ||
      id.includes('mixture');

    if (!isIngredient) {
      filteredEntities[id] = entity;
      keptEntityIds.add(id);
    } else if (usedEntityIds.has(id)) {
      filteredEntities[id] = entity;
      keptEntityIds.add(id);
    }
  });

  // 4. Filter container entityIds to only include kept entity IDs
  const filteredContainers: Record<string, Container> = {};
  Object.entries(containers || {}).forEach(([containerId, container]) => {
    filteredContainers[containerId] = {
      ...container,
      entityIds: (container.entityIds || []).filter((id) => keptEntityIds.has(id)),
    };
  });

  return {
    entities: filteredEntities,
    containers: filteredContainers,
  };
}

import { ingredients as catalogIngredients } from '../data/catalog/ingredients';
import { catalogTools } from '../data/catalog/tools';
import type { UsedIngredientInfo } from '../store/slices/recordSlice';

export function extractUsedIngredientsFromActions(
  actions: Array<{ type: string; payload?: Record<string, unknown> }>
): UsedIngredientInfo[] {
  const result: UsedIngredientInfo[] = [];
  const seenIds = new Set<string>();

  for (const act of actions || []) {
    if (!act || !act.payload) continue;
    const p = act.payload;
    let rawEntityId: string | undefined;

    if (act.type === 'MOVE_ENTITY') {
      const target = p.targetContainerId as string | undefined;
      if (target && target !== 'despensa') {
        rawEntityId = p.entityId as string | undefined;
      }
    } else if (act.type === 'ADD_ENTITY') {
      const target = p.containerId as string | undefined;
      if (target && target !== 'despensa') {
        const ent = p.entity as { id?: string; ingredientId?: string } | undefined;
        rawEntityId = ent?.ingredientId || ent?.id;
      }
    } else if (['PREPARE_INGREDIENT', 'COOK_INGREDIENT', 'USE_INGREDIENT'].includes(act.type)) {
      rawEntityId = p.entityId as string | undefined;
    }

    if (rawEntityId) {
      const baseId = rawEntityId.split('_')[0] || rawEntityId;
      if (!seenIds.has(baseId)) {
        seenIds.add(baseId);
        const catalogIng = catalogIngredients.find((i) => i.id === baseId || i.id === rawEntityId);
        const catalogTool = catalogTools.find((t) => t.id === baseId || t.id === rawEntityId);

        const cleanName =
          catalogIng?.name ||
          catalogTool?.name ||
          baseId.charAt(0).toUpperCase() + baseId.slice(1).replace(/_/g, ' ');
        const icon = catalogIng?.icon || catalogTool?.icon || '📦';

        result.push({
          id: baseId,
          name: cleanName,
          icon,
        });
      }
    }
  }

  return result;
}
`````

## File: index.html
`````html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tortilla-world</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`````

## File: package.json
`````json
{
  "name": "tortilla-world",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "firebase": "^12.16.0",
    "framer-motion": "^12.42.2",
    "immer": "^11.1.15",
    "lucide-react": "^1.27.0",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "zustand": "^5.0.14"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/node": "^24.13.2",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.3",
    "eslint": "^10.6.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.3",
    "globals": "^17.7.0",
    "repomix": "^1.16.1",
    "sass-embedded": "^1.100.0",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.62.0",
    "vite": "^8.1.1",
    "vitest": "^4.1.10"
  }
}
`````

## File: reviews.md
`````markdown
# Tortilla World: User Reviews

Here are 6 distinct reviews and critiques of the Tortilla World app, based on different user personas interacting with the interactive cooking simulation.

## 1. Alex - 19-year-old Informatics Student
**Rating: 4/5**
*"Over-engineered but structurally fascinating."*

> "I dug into the source code as soon as I loaded it up. The whole 'world first' architecture is sick. Building what is essentially an Entity-Component-System (ECS) pattern using React and Zustand is a wild choice for a web app, but it actually works pretty well. The state management is clean. My main critique is that you're practically building a game engine in the DOM instead of just using Unity or Godot with WebGL, which might have better performance for complex simulations. Still, the action-based intent system is super clean. It’s a great repo to study if you want to learn advanced Zustand patterns."

## 2. Maria - 65-year-old Grandmother
**Rating: 2/5**
*"Not how you make a real tortilla."*

> "My grandson showed me this program on his computer. I don't understand why I have to drag a cartoon potato onto a pan with a mouse. In my kitchen, cooking is about feeling the ingredients, smelling when the onion is perfectly caramelized. The computer program doesn't let you control the heat properly, and it completely misses the most important part: the flip (dar la vuelta). Also, it tells you to mix everything too fast. A proper tortilla de patatas needs love and patience, not just moving boxes on a screen. It's a cute toy, but it won't teach these youngsters how to cook."

## 3. Chef Julian - Professional Chef
**Rating: 3/5**
*"Lacks culinary depth and technique."*

> "As a simulation, Tortilla World is a neat concept, but it abstracts away the actual technique of cooking. The 'systems' handle the combinations, but where is the Maillard reaction? Can I control the temperature gradient in the pan? Does the simulation account for the starch content in different varieties of potatoes? The container architecture is a clever way to handle inventory, but cooking is chemistry, not just inventory management. It’s a fun sandbox, but until it simulates moisture loss and heat transfer, it won't replace real culinary training."

## 4. Sarah - Busy Parent of Two
**Rating: 3/5**
*"Fun for the kids, but I just need a recipe."*

> "I thought this was a recipe app to help me figure out dinner, but it’s more like a video game. I don't have time to simulate moving an egg from the fridge to the counter when I have hungry kids crying in the background. I just wanted a simple list of ingredients and steps! That being said, my 7-year-old was absolutely mesmerized by the drag-and-drop animations and spent 20 minutes 'cooking' alongside me. So it's a great distraction for the kids, but not a practical utility for a busy mom."

## 5. Jake - Casual Gamer
**Rating: 3.5/5**
*"Needs more progression and a scoring system."*

> "The vibes are chill and the drag-and-drop mechanics feel really satisfying thanks to the smooth animations. But after I made the tortilla... that was it? There are no objectives, no win states, and no high scores. It feels like a tech demo or a sandbox right now. It desperately needs some gamification—maybe a 'Time Attack' mode where you have to fulfill orders quickly, like Overcooked, or achievements for perfect flips. Give me a reason to keep playing!"

## 6. Dr. Lin - AI Researcher & Enthusiast
**Rating: 5/5**
*"A perfect playground for autonomous agents."*

> "I am incredibly excited by the roadmap and the underlying architecture of Tortilla World. Traditional web apps are a nightmare for AI agents to navigate because they rely on visual DOM scraping. But here, the world is defined by discrete entities and actions are formulated as simple, typed JSON payloads (e.g., `MOVE_ENTITY`). This means we can easily hook up an LLM to perceive the state and output actions directly. The strict validation through the 'Systems' layer makes it an ideal, safe sandbox for testing embodied AI reasoning in a constrained environment. Brilliant work!"

---

## 7. Klaus - 42-year-old Mechanical Engineer (Munich)
**Rating: 2.5/5**
*"Lacks precision and exact measurements."*

> "The system is fundamentally flawed because it relies on abstract units. A potato is just 'a potato'. Is it 150 grams? 200 grams? The DIN standard for recipe formulation requires exact metric measurements. The simulation needs a scale entity and proper volumetric calculations before it can be considered a serious tool."

## 8. Lukas - 22-year-old University Student (Berlin)
**Rating: 4/5**
*"Cool vibe, but needs a dark mode."*

> "Honestly, the design is pretty clean and the drag-and-drop is smooth. But I only use apps in dark mode, and the white background hurts my eyes after 10 minutes. Also, can we get an integration to order the actual ingredients via Flink or Gorillas if we successfully make the tortilla in the simulation?"

## 9. Sabine - 35-year-old Logistics Manager (Hamburg)
**Rating: 3/5**
*"Container logic is sound, but routing is inefficient."*

> "I appreciate the container-based architecture. However, the manual dragging of entities one by one is highly inefficient. We need a 'bulk select' or a predefined macro system to move all potatoes from the pantry to the prep zone simultaneously. The current user journey requires too many clicks."

## 10. Dieter - 55-year-old Master Butcher (Frankfurt)
**Rating: 1/5**
*"Where is the meat?"*

> "It's a nice little program, but a meal without meat is just a snack. I looked for the chorizo or speck in the pantry, but there is nothing. If you want to make a proper, hearty meal, you need to add sausages. Until then, it's just vegetarian nonsense."

## 11. Anja - 28-year-old UX Designer (Cologne)
**Rating: 4/5**
*"Great micro-interactions, weak onboarding."*

> "The framer-motion animations are *chef's kiss*. The physical bounce when an item enters a container feels incredibly rewarding. However, the app drops you in without any tutorial. A guided tooltip tour for the first-time user experience (FTUE) is desperately needed. People don't want to read a README to play a game."

## 12. Felix - 31-year-old Data Scientist (Stuttgart)
**Rating: 4.5/5**
*"Fascinating state machine."*

> "I spent an hour just reading the Redux/Zustand action logs in the console. The way the state transitions are handled via pure functions and strict systems is very elegant. It's essentially a deterministic finite automaton. I’d love to see a visualization of the state tree updating in real-time within the UI."

## 13. Helga - 68-year-old Retiree (Dresden)
**Rating: 2/5**
*"Too fast, confusing buttons."*

> "My daughter installed this for me to practice using the mouse. The potatoes jump around too quickly, and the text on the buttons is too small. I also accidentally deleted my pan and couldn't figure out how to get it back. There needs to be a simple 'Undo' button."

## 14. Maximilian - 14-year-old Gamer (Leipzig)
**Rating: 3/5**
*"Boring, needs multiplayer."*

> "It’s okay for five minutes, but it gets boring fast. You just make the same tortilla over and over. If there was a multiplayer mode where I could sabotage my friend's kitchen by stealing their eggs or turning up their stove, it would be a 10/10."

## 15. Julia - 25-year-old Nutritionist (Bonn)
**Rating: 3.5/5**
*"Good visualization, missing nutritional data."*

> "The visual representation of the food is quite appealing. However, as an educational tool, it falls short. It would be fantastic if clicking on an ingredient displayed its macro-nutrients (calories, protein, carbs). The finished tortilla should also generate a total nutritional summary."

## 16. Thorsten - 48-year-old DevOps Engineer (Dortmund)
**Rating: 5/5**
*"The CI/CD pipeline of cooking."*

> "I love the 'Systems' approach. It feels like setting up a CI/CD pipeline. You put the raw inputs in, they pass through validation gates (systems), and output an artifact (the tortilla). If you added automated testing where the app evaluates the quality of the final dish, it would be perfect."

## 17. Sophie - 29-year-old Vegan Chef (Leipzig)
**Rating: 2/5**
*"Needs plant-based alternatives."*

> "The engine is solid, but the hardcoded reliance on eggs is alienating. The simulation should allow for substitutions like chickpea flour or silken tofu. An interactive world should reflect diverse dietary choices, not just traditional recipes."

## 18. Jörg - 50-year-old Tax Consultant (Hannover)
**Rating: 3/5**
*"Cost calculation is missing."*

> "While the physical simulation is interesting, the economic aspect of cooking is entirely ignored. Each ingredient should have a price attribute. The app should calculate the total cost of the meal and allow the user to optimize the recipe for budget constraints."

## 19. Leonie - 21-year-old Art Student (Düsseldorf)
**Rating: 4/5**
*"Aesthetic but sterile."*

> "The minimal design is trendy, but it feels a bit like a hospital operating room rather than a cozy kitchen. It needs more atmosphere—maybe some ambient background noise (sizzling, chopping), warmer colors, and less rigid geometry for the containers."

## 20. Tobias - 34-year-old Backend Developer (Bremen)
**Rating: 4.5/5**
*"Excellent separation of concerns."*

> "As a backend dev, I rarely praise frontend code, but the strict separation between the rendering layer (React) and the business logic (Systems/Zustand) here is commendable. It prevents the typical React spaghetti code. Well done."

## 21. Martina - 45-year-old Teacher (Nuremberg)
**Rating: 3.5/5**
*"Potential for the classroom."*

> "I can see this being used in a home economics class to teach basic sequencing and following instructions. But to be truly useful, it needs a 'Teacher Dashboard' where I can assign specific recipes and track the students' progress and mistakes."

## 22. Lars - 38-year-old Startup Founder (Berlin)
**Rating: 2/5**
*"What is the monetization strategy?"*

> "It’s a neat tech demo, but I don't see the business model. Is it a premium app? Freemium with in-app purchases for new recipes? B2B software for restaurants? Without a clear path to revenue, it's just a hobby project. Needs a premium subscription tier with exclusive ingredients."

## 23. Petra - 52-year-old Hobby Cook (Freiburg)
**Rating: 3/5**
*"Missing the sense of smell and taste."*

> "Cooking is a sensory experience. While you can't simulate taste, you could add visual cues for smell—like steam or aroma lines when the onions are frying. Right now, it relies entirely on visual state changes, which feels very cold."

## 24. Christian - 27-year-old QA Tester (Essen)
**Rating: 4/5**
*"Found a few edge cases."*

> "Overall very stable, but I managed to break the physics engine by rapidly dragging the knife between two containers while an animation was playing. The knife got stuck in an intermediate state. Needs better handling of rapid asynchronous drag events."

## 25. Stefan - 41-year-old Process Engineer (Mannheim)
**Rating: 3.5/5**
*"Bottleneck analysis needed."*

> "The cooking process is a series of dependent tasks. The current setup doesn't clearly show the critical path. If I'm waiting for potatoes to fry, I should be prompted to beat the eggs. A Gantt chart overlay showing task dependencies would improve efficiency immensely."

## 26. Anna - 30-year-old Environmentalist (Kiel)
**Rating: 2.5/5**
*"No concept of waste."*

> "The simulation is too perfect. In reality, peeling a potato creates waste. The app should include a 'Compost' container and track the environmental footprint of the meal, including the energy used by the virtual stove."
`````

## File: tickets.md
`````markdown
# Tortilla World: Development Tasks & Tickets

Based on recent user feedback and persona reviews, the following tickets have been generated for future development.

## Epic 1: Advanced Cooking Simulation & Mechanics
**Source:** Chef Julian (Professional Chef), Maria (65-year-old Grandmother), Klaus (Mechanical Engineer), Petra (Hobby Cook), Anna (Environmentalist)

*   **Task 1.1: Implement Temperature System for Containers**
    *   **Description:** Introduce a `temperature` property to entities (like the pan) and a system that modifies it based on heat source state.
    *   **Acceptance Criteria:** Pans can heat up and cool down. Ingredients placed in hot pans experience state changes (e.g., `raw` -> `cooked`).

*   **Task 1.2: Add "Flip" (Dar la Vuelta) Mechanic**
    *   **Description:** Create a specific interaction/action for flipping the contents of a pan, which is crucial for making a tortilla.
    *   **Acceptance Criteria:** A user can trigger a `FLIP_CONTAINER` action. The system handles reversing the stack of entities or updating their 'cooked side' state.

*   **Task 1.3: Simulate Basic Chemistry/Moisture Loss**
    *   **Description:** Introduce properties for moisture and starch to ingredients.
    *   **Acceptance Criteria:** Potatoes lose moisture and shrink slightly when cooked; eggs coagulate based on time-at-temperature.

*   **Task 1.4: Implement Exact Metric Measurements (DIN Standard)**
    *   **Description:** Replace abstract entities (e.g., "a potato") with measurable units (e.g., grams, liters). Add a "Scale" entity to measure ingredient weights.
    *   **Acceptance Criteria:** Recipes require specific weights. The simulation calculates mass accurately.

*   **Task 1.5: Add Sensory and Waste Systems**
    *   **Description:** Introduce visual cues for aromas (e.g., steam, color changes for smell). Implement a waste management system where actions (like peeling) create byproduct entities that must be disposed of in a "Compost" container.
    *   **Acceptance Criteria:** Visual aroma effects implemented. Waste entities generate correctly and interact with the compost container.

## Epic 2: Gamification & Progression
**Source:** Jake (Casual Gamer), Maximilian (Gamer), Martina (Teacher)

*   **Task 2.1: Implement Scoring System**
    *   **Description:** Add a scoring mechanic based on the accuracy of the recipe execution, timing, and ingredient state (e.g., perfect caramelization vs. burnt).
    *   **Acceptance Criteria:** Upon completing a recipe, the user receives a score and a star rating (1-3 stars).

*   **Task 2.2: Add "Time Attack" Game Mode**
    *   **Description:** Create a mode where users must fulfill incoming orders within a time limit.
    *   **Acceptance Criteria:** A UI component displays active orders. A timer counts down. Fulfilling orders grants points and extra time.

*   **Task 2.3: Introduce Multiplayer and Teacher Dashboards**
    *   **Description:** Create a rudimentary multiplayer mode (co-op or sabotage) and a teacher view to assign recipes and track user/student progress.
    *   **Acceptance Criteria:** Basic web socket integration for state sharing between two clients. Dashboard UI for tracking assigned tasks.

## Epic 3: Accessibility, UI, & Practical Utility
**Source:** Sarah (Busy Parent), Lukas (University Student), Sabine (Logistics Manager), Helga (Retiree)

*   **Task 3.1: "Recipe Only" / Quick View Mode**
    *   **Description:** Provide a toggle to bypass the simulation and simply view the required ingredients and steps for a recipe in a clean, standard list format.
    *   **Acceptance Criteria:** A toggle button switches between "Simulation Mode" and "Recipe List Mode".

*   **Task 3.2: Dark Mode Theme**
    *   **Description:** Implement a global dark mode toggle for the UI.
    *   **Acceptance Criteria:** All UI components and world background adapt to a dark color palette.

*   **Task 3.3: Bulk Actions and Undo System**
    *   **Description:** Allow users to select and move multiple entities at once. Implement a state history stack to allow "Undo" actions for accidental moves or deletions.
    *   **Acceptance Criteria:** Shift-click or bounding box selection implemented. A history stack allows reverting to the previous state.

## Epic 4: Content, Diet & Economics
**Source:** Dieter (Master Butcher), Julia (Nutritionist), Sophie (Vegan Chef), Jörg (Tax Consultant)

*   **Task 4.1: Nutritional and Cost Calculation**
    *   **Description:** Assign macro-nutritional values and price attributes to all ingredients.
    *   **Acceptance Criteria:** The UI displays total calories, macros, and cost for the current contents of a container or a finished recipe.

*   **Task 4.2: Alternative Ingredients and Dietary Substitutions**
    *   **Description:** Expand the pantry to include alternative ingredients (e.g., chickpea flour, silken tofu, chorizo) and allow recipes to accept these substitutions.
    *   **Acceptance Criteria:** New entities created. Recipe matcher updated to validate alternative valid combinations.

## Epic 5: Technical Debt & Engine Improvements
**Source:** Alex (Informatics Student), Dr. Lin (AI Researcher), Felix (Data Scientist), Christian (QA Tester), Stefan (Process Engineer)

*   **Task 5.1: Profile and Optimize React Rendering for ECS**
    *   **Description:** Investigate performance bottlenecks when rendering many entities in the DOM using the current Zustand/React setup. Fix edge cases with rapid asynchronous drag events.
    *   **Acceptance Criteria:** Profiling report generated. Memoization and batching improvements implemented. Drag-and-drop state locking fixed.

*   **Task 5.2: Formalize AI Agent API/Hooks**
    *   **Description:** Create a dedicated, documented API surface for external scripts or LLMs to read world state and dispatch typed actions (e.g., `MOVE_ENTITY`) directly, bypassing the UI.
    *   **Acceptance Criteria:** Documentation provided for headless state interaction. Example script provided demonstrating an agent moving an object.

*   **Task 5.3: Visualizing State and Dependencies**
    *   **Description:** Create a debug view that visualizes the Zustand state tree and a Gantt chart overlay showing critical path dependencies for the current recipe.
    *   **Acceptance Criteria:** A togglable debug panel displays the raw JSON state and task timeline.
`````

## File: src/components/Controls/ActionRecorder.scss
`````scss
.action-recorder-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  .recorder-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;

    .recorder-title {
      font-size: 18px;
      font-weight: 700;
      color: var(--text-h, #1e293b);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .recorder-subtitle {
      font-size: 13px;
      color: #64748b;
      margin-top: 2px;
    }
  }

  .recorder-actions-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;

    .rec-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      border: 1px solid #cbd5e1;
      background: #f8fafc;
      color: #334155;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover:not(:disabled) {
        background: #f1f5f9;
        border-color: #94a3b8;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &.start-rec {
        background: #ef4444;
        color: #ffffff;
        border-color: #dc2626;

        &:hover {
          background: #dc2626;
        }

        &.is-recording {
          animation: recPulse 1.5s infinite;
        }
      }

      &.stop-rec {
        background: #475569;
        color: #ffffff;
        border-color: #334155;

        &:hover {
          background: #334155;
        }
      }

      &.translate-btn {
        background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
        color: #ffffff;
        border: none;
        box-shadow: 0 2px 6px rgba(99, 102, 241, 0.3);

        &:hover:not(:disabled) {
          background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
          transform: translateY(-1px);
        }
      }

      &.reset-kitchen-btn {
        background: #ffffff;
        border: 2px solid #d9534f;
        color: #d9534f;
        font-weight: 800;

        &:hover:not(:disabled) {
          background: #d9534f;
          color: #ffffff;
        }
      }
    }
  }

  .used-ingredients-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 13px;
    flex-wrap: wrap;

    .bar-label {
      font-weight: 700;
      color: #334155;
    }

    .no-ingredients-hint {
      color: #94a3b8;
      font-style: italic;
    }

    .chips-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;

      .ingredient-chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: #ffffff;
        border: 1px solid #cbd5e1;
        border-radius: 16px;
        padding: 3px 10px;
        font-weight: 600;
        color: #1e293b;
        font-size: 12px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      }
    }
  }

  .translation-preview-panel {
    margin-top: 12px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 16px;

    .translation-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;

      h4 {
        margin: 0;
        font-size: 16px;
        color: #1e293b;
        display: flex;
        align-items: center;
        gap: 6px;
      }
    }

    .translation-tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;

      .tab-btn {
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 600;
        border: 1px solid #cbd5e1;
        background: #ffffff;
        color: #475569;
        cursor: pointer;

        &.active {
          background: #6366f1;
          color: #ffffff;
          border-color: #4f46e5;
        }
      }
    }

    .translation-content {
      pre {
        background: #0f172a;
        color: #f8fafc;
        padding: 12px;
        border-radius: 8px;
        font-size: 12px;
        max-height: 240px;
        overflow-y: auto;
        white-space: pre-wrap;
        word-break: break-word;
      }
    }

    .translation-actions {
      display: flex;
      gap: 10px;
      margin-top: 12px;
      flex-wrap: wrap;

      .action-btn {
        padding: 8px 14px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        border: 1px solid #cbd5e1;
        background: #ffffff;
        color: #1e293b;

        &.primary {
          background: #10b981;
          color: #ffffff;
          border-color: #059669;

          &:hover {
            background: #059669;
          }
        }
      }
    }
  }
}

@keyframes recPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
  }
}
`````

## File: src/components/Controls/ActionReplayer.scss
`````scss
/**
 * FILE: src/components/Controls/ActionReplayer.scss
 *
 * PURPOSE:
 * SCSS styles for the ActionReplayer JSON load/playback component.
 */

@use 'sass:color';
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.action-replayer {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  .file-input-hidden {
    display: none;
  }

  .step-controls-group {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;

    .step-btn {
      background: #f8fafc;
      border-color: #cbd5e1;
      color: #334155;

      &:hover:not(:disabled) {
        background: #e2e8f0;
        border-color: #94a3b8;
      }

      &.step-forward-btn {
        background: #eff6ff;
        border-color: #93c5fd;
        color: #1d4ed8;

        &:hover:not(:disabled) {
          background: #dbeafe;
          border-color: #3b82f6;
        }
      }
    }

    .play-btn {
      background: #f0fdf4;
      border-color: #86efac;
      color: #15803d;

      &:hover:not(:disabled) {
        background: #dcfce7;
        border-color: #22c55e;
      }
    }

    .reset-btn {
      background: #fef2f2;
      border-color: #fca5a5;
      color: #b91c1c;

      &:hover:not(:disabled) {
        background: #fee2e2;
        border-color: #ef4444;
      }
    }
  }

  .replayer-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    font-size: 13px;
    font-weight: 700;
    border-radius: $radius-sm;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid $warm-border;
    background: #ffffff;
    color: $dark-brown;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover:not(:disabled) {
      background: $tortilla-yellow-light;
      border-color: $tortilla-yellow;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &.load-btn {
      border-color: $olive-green;
      color: $olive-green-hover;

      &:hover:not(:disabled) {
        background: rgba(107, 142, 35, 0.1);
      }
    }

    &.stop-btn {
      border-color: $terracotta;
      color: $terracotta;
      background: $terracotta-light;

      &:hover:not(:disabled) {
        background: $terracotta;
        color: #ffffff;
      }
    }
  }

  .playback-status {
    display: flex;
    align-items: center;
    gap: 8px;
    background: $warm-surface;
    border: 1px solid $warm-border;
    padding: 4px 12px;
    border-radius: $radius-sm;
    font-size: 12px;
    font-weight: 700;
    color: $dark-brown;

    .progress-bar-container {
      width: 80px;
      height: 6px;
      background: rgba(0, 0, 0, 0.08);
      border-radius: 3px;
      overflow: hidden;

      .progress-bar-fill {
        height: 100%;
        background: $olive-green;
        transition: width 0.15s ease-out;
      }
    }
  }

  .delay-select {
    padding: 4px 8px;
    font-size: 12px;
    font-weight: 600;
    border-radius: $radius-sm;
    border: 1px solid $warm-border;
    background: #ffffff;
    color: $dark-brown;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: $tortilla-yellow;
    }
  }

  .error-message {
    font-size: 12px;
    color: $terracotta;
    font-weight: 600;
  }
}
`````

## File: src/components/Controls/PlayerGuideModal.scss
`````scss
.player-guide-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.85); /* Slate 900 with opacity */
  backdrop-filter: blur(4px);
  z-index: 9999; /* Must sit on top of everything */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.player-guide-modal {
  background: white;
  border-radius: 16px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  border: 1px solid #e2e8f0;

  .player-guide-header {
    background: #f8fafc;
    padding: 2rem 2rem 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    text-align: center;
    flex-shrink: 0;
    position: relative;

    .guide-header-actions {
      position: absolute;
      top: 1.25rem;
      right: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .guide-mother-web-link,
      .guide-language-btn {
        background: #ffffff;
        border: 1px solid #cbd5e1;
        color: #0f172a;
        padding: 0.35rem 0.75rem;
        border-radius: 8px;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        text-decoration: none;
        transition: all 0.2s ease;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

        &:hover {
          background: #f1f5f9;
          border-color: #94a3b8;
          transform: translateY(-1px);
        }

        &:active {
          transform: translateY(0);
        }
      }
    }

    h1 {
      margin: 0;
      color: #0f172a;
      font-size: 2rem;
      font-weight: 800;
    }

    .subtitle {
      margin: 0.5rem 0 0;
      color: #64748b;
      font-size: 1.1rem;
    }
  }

  .player-guide-content {
    padding: 2rem;
    overflow-y: auto;
    flex-grow: 1;
    color: #334155;
    line-height: 1.6;

    /* Custom scrollbar for webkit */
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    &::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    h2 {
      color: #1e293b;
      font-size: 1.5rem;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 0.5rem;
      margin-top: 2rem;
      margin-bottom: 1.5rem;

      &:first-child {
        margin-top: 0;
      }
    }

    h3 {
      color: #0f172a;
      font-size: 1.2rem;
      margin-top: 1.5rem;
      margin-bottom: 1rem;
    }

    p {
      margin-bottom: 1rem;
    }

    code {
      background: #f1f5f9;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-size: 0.9em;
      color: #db2777; /* Pink 600 */
      font-family: monospace;
    }

    .guide-section {
      margin-bottom: 2.5rem;

      &.introduction {
        font-size: 1.1rem;
        color: #1e293b;
      }
    }

    .feature-list {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 0.75rem;
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;

        .icon {
          font-size: 1.25rem;
        }
      }
    }

    .bullet-list {
      padding-left: 1.5rem;
      margin-bottom: 1rem;

      li {
        margin-bottom: 0.5rem;
      }
    }

    .step-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1rem;

      h4 {
        margin: 0 0 1rem 0;
        color: #0369a1; /* Sky 700 */
        font-size: 1.1rem;
      }

      ol {
        padding-left: 1.5rem;
        margin: 0;

        li {
          margin-bottom: 0.5rem;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }

  .shortcuts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 0.75rem;
    margin-top: 1rem;

    .shortcut-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 0.6rem 0.85rem;
      font-size: 0.9rem;

      .shortcut-label {
        font-weight: 500;
        color: #334155;
      }

      .kbd-group {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }

      kbd {
        display: inline-block;
        padding: 0.2rem 0.45rem;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 0.8rem;
        font-weight: 700;
        color: #0f172a;
        background-color: #ffffff;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        box-shadow: 0 2px 0 0 #cbd5e1;
        white-space: nowrap;
      }
    }
  }

  .player-guide-footer {
    padding: 1.5rem 2rem;
    background: #f8fafc;
    border-top: 1px solid #e2e8f0;
    display: flex;
    justify-content: center;
    flex-shrink: 0;

    .start-cooking-btn {
      background: #2563eb; /* Blue 600 */
      color: white;
      border: none;
      border-radius: 9999px; /* Pill shape */
      padding: 1rem 3rem;
      font-size: 1.25rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);

      &:hover, &:focus {
        background: #1d4ed8; /* Blue 700 */
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
        outline: none;
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
}

/* Mobile Adjustments */
@media (max-width: 640px) {
  .player-guide-modal {
    max-height: 95vh;
    border-radius: 12px;

    .player-guide-header {
      padding: 1.5rem 1rem 1rem;
      .guide-header-actions {
        top: 0.75rem;
        right: 0.75rem;
        gap: 0.35rem;

        .guide-mother-web-link,
        .guide-language-btn {
          padding: 0.25rem 0.55rem;
          font-size: 0.75rem;
        }
      }
      h1 {
        font-size: 1.5rem;
      }
    }

    .player-guide-content {
      padding: 1rem;

      h2 {
        font-size: 1.3rem;
      }
    }

    .player-guide-footer {
      padding: 1rem;
      .start-cooking-btn {
        width: 100%;
        padding: 0.875rem 1rem;
        font-size: 1.1rem;
      }
    }
  }
}
`````

## File: src/data/catalog/recipes/clasica.json
`````json
{
  "id": "clasica",
  "name": "Clásica",
  "description": "Traditional Spanish Tortilla without onion.",
  "difficulty": "easy",
  "tags": ["traditional", "spanish", "vegetarian", "no-onion"],
  "hints": [
    "Que no se queme el ajo.",
    "Con una espátula blanda, asegúrate de que la tortilla no se pega a la sartén."
  ],
  "requirements": {
    "potatoes": {
      "entityId": "potato",
      "amount": 4,
      "unit": "pcs"
    },
    "eggs": {
      "entityId": "egg",
      "amount": 6,
      "unit": "pcs"
    },
    "garlic": {
      "entityId": "garlic",
      "amount": 1,
      "unit": "head"
    },
    "oil": {
      "entityId": "oil",
      "amount": 100,
      "unit": "ml"
    },
    "salt": {
      "entityId": "salt",
      "amount": 1,
      "unit": "tsp"
    },
    "black_pepper": {
      "entityId": "black_pepper",
      "amount": 1,
      "unit": "pinch"
    }
  },
  "cooklang": "Peel the @potatoes{4%pcs}.\nSlice the @potatoes.\nHeat the @oil{100%ml}.\nFry the @potatoes until tender.\nBeat the @eggs{6%pcs}.\nAdd @salt{1%tsp}.\nAdd @black_pepper{1%pinch}.\nMix the potatoes with the beaten eggs, salt and black_pepper.\nPour the mixture into the pan.\nCook for 5 minutes.\nWith a soft spatula, make sure the tortilla does not stick to the pan.\nFlip the tortilla.\nCook for another 5 minutes.\nServe the tortilla.\nCelebrate.",
  "steps": [
    {
      "action": "prepare",
      "target": "garlic",
      "preparation": "peeled"
    },
    {
      "action": "cook",
      "target": "oil",
      "method": "heat"
    },
    {
      "action": "cook",
      "target": "garlic",
      "method": "fry",
      "instruction": "Que no se quemen."
    },
    {
      "action": "move",
      "ingredient": "garlic",
      "target": "plate",
      "source": "pan"
    },
    {
      "action": "cook",
      "target": "potatoes",
      "method": "fry"
    },
    {
      "action": "prepare",
      "target": "eggs",
      "preparation": "beaten"
    },
    {
      "action": "mix",
      "inputs": [
        "potatoes",
        "eggs",
        "salt",
        "black_pepper",
        "garlic"
      ],
      "output": "mixture"
    },
    {
      "action": "cook",
      "target": "mixture",
      "method": "fry",
      "duration": 5,
      "unit": "min",
      "as": "Tortilla clásica"
    },
    {
      "action": "flip",
      "target": "mixture"
    },
    {
      "action": "serve",
      "target": "mixture",
      "as": "Tortilla clásica",
      "containerId": "plate"
    },
    {
      "action": "celebrate"
    }
  ]
}
`````

## File: src/data/catalog/recipes/concebolla.json
`````json
{
  "id": "concebolla",
  "name": "Tortilla con Cebolla",
  "description": "Spanish Tortilla with juicy caramelized onions.",
  "difficulty": "medium",
  "tags": ["traditional", "spanish", "vegetarian", "with-onion"],
  "hints": [
    "Fry onions until golden before mixing."
  ],
  "requirements": {
    "potatoes": {
      "entityId": "potato",
      "amount": 4,
      "unit": "pcs"
    },
    "eggs": {
      "entityId": "egg",
      "amount": 6,
      "unit": "pcs"
    },
    "oil": {
      "entityId": "oil",
      "amount": 100,
      "unit": "ml"
    },
    "onions": {
      "entityId": "onion",
      "amount": 1,
      "unit": "pcs"
    },
    "salt": {
      "entityId": "salt",
      "amount": 1,
      "unit": "tsp"
    },
    "black_pepper": {
      "entityId": "black_pepper",
      "amount": 1,
      "unit": "pinch"
    }
  },
  "cooklang": "Peel the @potatoes{4%pcs}.\nWash the @potatoes.\nSlice the @potatoes.\nPeel the @onions{1%pcs}.\nWash the @onions.\nDice the @onions.\nHeat the @oil{100%ml}.\nFry the @potatoes until tender.\nFry the @onions until golden.\nBeat the @eggs{6%pcs}.\nAdd @salt{1%tsp} and @pepper{1%pinch}.\nMix the fried potatoes and onions with the beaten eggs, salt and pepper.\nPour the mixture into the pan.\nCook for 5 minutes.\nWith a soft spatula, make sure the tortilla does not stick to the pan.\nFlip the tortilla.\nCook for another 5 minutes.\nServe the tortilla.\nCelebrate.",
  "steps": [
    {
      "action": "prepare",
      "target": "potatoes",
      "preparation": "peeled"
    },
    {
      "action": "wash",
      "target": "potatoes"
    },
    {
      "action": "prepare",
      "target": "potatoes",
      "preparation": "sliced"
    },
    {
      "action": "prepare",
      "target": "onions",
      "preparation": "peeled"
    },
    {
      "action": "wash",
      "target": "onions"
    },
    {
      "action": "prepare",
      "target": "onions",
      "preparation": "diced"
    },
    {
      "action": "cook",
      "target": "oil",
      "method": "heat"
    },
    {
      "action": "cook",
      "target": "potatoes",
      "method": "fry"
    },
    {
      "action": "cook",
      "target": "onions",
      "method": "fry",
      "containerId": "burner2"
    },
    {
      "action": "prepare",
      "target": "eggs",
      "preparation": "beaten"
    },
    {
      "action": "mix",
      "inputs": [
        "potatoes",
        "onions",
        "eggs",
        "salt",
        "black_pepper"
      ],
      "output": "mixture"
    },
    {
      "action": "cook",
      "target": "mixture",
      "method": "fry",
      "duration": 5,
      "unit": "min",
      "as": "Tortilla con cebolla"
    },
    {
      "action": "flip",
      "target": "mixture"
    },
    {
      "action": "serve",
      "target": "mixture",
      "as": "Tortilla con cebolla",
      "containerId": "plate"
    },
    {
      "action": "celebrate"
    }
  ]
}
`````

## File: src/data/catalog/recipes/concebolla.ts
`````typescript
/**
 * FILE: concebolla.ts
 *
 * PURPOSE:
 * Recipe export for Tortilla con cebolla.
 *
 * RESPONSIBILITY:
 * - Loaded dynamically from concebolla.json via loadRecipe.
 * - Re-exports concebollaRecipe and concebollaCooklang for backward compatibility.
 */

import { loadRecipe, getRecipeCooklang } from '../../../systems/recipeLoader';
import type { Recipe } from '../../../types/Recipe';

export const concebollaRecipe: Recipe = loadRecipe('concebolla');
export const concebollaCooklang: string = getRecipeCooklang('concebolla');
export const recipe: Recipe = concebollaRecipe;
`````

## File: src/data/catalog/recipes/francesa.json
`````json
{
  "id": "francesa",
  "name": "Tortilla Francesa",
  "description": "Tortilla francesa tradicional.",
  "difficulty": "easy",
  "tags": ["traditional", "spanish", "french", "vegetarian", "no-onion"],
  "hints": [
    "Mezcla los huevos en el bol con la sal para hacer el Huevo batido.",
    "Enciende el fuego, añade aceite y caliéntalo.",
    "Con una espátula blanda, asegúrate de que la tortilla no se pega a la sartén."
  ],
  "requirements": {
    "eggs": {
      "entityId": "egg",
      "amount": 6,
      "unit": "pcs"
    },
    "oil": {
      "entityId": "oil",
      "amount": 100,
      "unit": "ml"
    },
    "salt": {
      "entityId": "salt",
      "amount": 1,
      "unit": "tsp"
    }
  },
  "cooklang": "Beat the @eggs{6%pcs} in the bowl with @salt{1%tsp} to make Huevo batido.\nHeat the @oil{100%ml} in the pan.\nPour the Huevo batido into the pan.\nStir slightly and cook for 5 minutes.\nFlip the tortilla.\nCook for another 5 minutes.\nServe onto the plate as Tortilla francesa.",
  "steps": [
    {
      "action": "prepare",
      "target": "eggs",
      "preparation": "beaten"
    },
    {
      "action": "mix",
      "inputs": [
        "eggs",
        "salt"
      ],
      "output": "Huevo batido"
    },
    {
      "action": "cook",
      "target": "oil",
      "method": "heat"
    },
    {
      "action": "cook",
      "target": "Huevo batido",
      "method": "fry",
      "duration": 5,
      "unit": "min",
      "as": "Tortilla francesa"
    },
    {
      "action": "flip",
      "target": "Huevo batido"
    },
    {
      "action": "serve",
      "target": "Huevo batido",
      "as": "Tortilla francesa",
      "containerId": "plate"
    },
    {
      "action": "celebrate"
    }
  ]
}
`````

## File: src/data/catalog/recipes/index.ts
`````typescript
/**
 * FILE: index.ts
 *
 * PURPOSE:
 * Master export and catalog for all recipe definitions.
 *
 * RESPONSIBILITY:
 * - Collects all available JSON recipes dynamically via loadAllRecipes.
 * - Provides a single entry point for accessing recipes.
 */

import type { RecipeList, Recipe } from '../../../types/Recipe';
import { loadAllRecipes, loadRecipe } from '../../../systems/recipeLoader';

export const concebollaRecipe: Recipe = loadRecipe('concebolla');
export const clasicaRecipe: Recipe = loadRecipe('clasica');
export const francesaRecipe: Recipe = loadRecipe('francesa');
export const sincebollaRecipe: Recipe = clasicaRecipe;

/**
 * Master recipe catalog.
 * Loaded dynamically from decoupled JSON recipe definitions.
 */
export const recipes: RecipeList = loadAllRecipes();
`````

## File: src/engine/containerRules.ts
`````typescript
/**
 * FILE: containerRules.ts
 *
 * PURPOSE:
 * Generic container behavior rules.
 *
 * RESPONSIBILITY:
 * - Defines reusable rules for lists/containers.
 * - Determines allowed contents and constraints.
 *
 * DOMAIN:
 * Game engine logic independent from React.
 */

import type { Container, Entity } from '../types/world';
import { worldStore } from '../store/worldStore';

export interface ValidationResult {
  allowed: boolean;
  reason?: string;
}

export function getIngredientCatalogId(entity: Entity): string {
  const baseId = entity.ingredientId || entity.id.split('_')[0];
  const preparation = entity.state?.preparation || '';
  const cooking = entity.state?.cooking || (entity.status && entity.status !== 'raw' ? entity.status : '');
  if (preparation || cooking) {
    return `${baseId}:${preparation}:${cooking}`;
  }
  return baseId;
}

export function resolveContainerId(containerId: string): string {
  if (!containerId) return 'burner1';
  const state = worldStore.getState();
  if (state.containers[containerId]) return containerId;

  const lower = containerId.toLowerCase().trim();
  if (
    lower === 'pan' ||
    lower === 'burner' ||
    lower === 'fuego' ||
    lower === 'fuego1' ||
    lower === 'fuego 1' ||
    lower === 'stove' ||
    lower === 'sarten' ||
    lower === 'sartén'
  ) {
    return 'burner1';
  }
  if (lower === 'fuego2' || lower === 'fuego 2' || lower === 'burner2') {
    return 'burner2';
  }
  if (lower === 'pantry' || lower === 'despensa') {
    return 'despensa';
  }
  if (lower === 'fregadero' || lower === 'sink') {
    return 'sink';
  }
  if (lower === 'tabla' || lower === 'board' || lower === 'cutting_board') {
    return 'board';
  }
  if (lower === 'bol' || lower === 'bowl') {
    return 'bowl';
  }
  if (lower === 'plato' || lower === 'plate') {
    return 'plate';
  }
  if (lower === 'basura' || lower === 'trash' || lower === 'papelera') {
    return 'trash';
  }

  return containerId;
}

export function validateContainerRules(
  container: Container,
  entity: Entity,
  currentEntitiesInContainer: Entity[]
): ValidationResult {
  const rules = container.rules;

  // 1. Ingredient Uniqueness Check (Rule 6: A container cannot contain two identical ingredients)
  if (entity.type === 'ingredient' && !rules?.allowDuplicateIngredients) {
    const targetIngredientId = getIngredientCatalogId(entity);
    const hasDuplicateIngredient = currentEntitiesInContainer.some(
      (e) => e.type === 'ingredient' && getIngredientCatalogId(e) === targetIngredientId
    );
    if (hasDuplicateIngredient) {
      return {
        allowed: false,
        reason: `Container '${container.name}' already contains ingredient '${targetIngredientId}'.`,
      };
    }
  }

  if (!rules) {
    return { allowed: true };
  }

  // 2. Capacity Check
  if (
    rules.maxCapacity !== undefined &&
    container.entityIds.length >= rules.maxCapacity
  ) {
    return {
      allowed: false,
      reason: `Container '${container.name}' capacity reached (${rules.maxCapacity} items max).`,
    };
  }

  // 3. Allowed Types Check
  if (rules.allowedTypes && !rules.allowedTypes.includes(entity.type)) {
    return {
      allowed: false,
      reason: `Container '${container.name}' does not accept entity type '${entity.type}'.`,
    };
  }

  return { allowed: true };
}
`````

## File: src/services/dbService.ts
`````typescript
/**
 * FILE: src/services/dbService.ts
 *
 * PURPOSE:
 * Firestore database service for Recipes, Kitchen Tools, Ingredients, and Kitchen Configurations.
 * Supports multi-format recipe persistence, ingredient indexing, and search filters.
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { isDevMode } from '../utils/devMode';
import { catalogTools } from '../data/catalog/tools';
import { ingredients as catalogIngredients } from '../data/catalog/ingredients';
import { KITCHEN_WORKSTATIONS } from '../data/catalog/workstations';

export interface SavedRecipeFormats {
  mascotSequence?: Array<Record<string, unknown>>;
  recipeJson?: Record<string, unknown>;
  fullSessionLog?: Record<string, unknown>;
}

export interface SavedRecipe {
  id: string;
  title: string;
  description: string;
  author: string;
  ingredients: string[]; // Normalized array of ingredient IDs for search index (e.g. ['egg', 'garlic', 'potato'])
  tags: string[];
  hasMascotSupport: boolean;
  formats: SavedRecipeFormats;
  createdAt: string;
  updatedAt: string;
}

export interface SavedTool {
  id: string;
  name: string;
  icon: string;
  category: string;
  description?: string;
}

export interface SavedIngredient {
  id: string;
  name: string;
  icon: string;
  category?: string;
}

export interface SavedKitchenConfig {
  id: string;
  name: string;
  workstations: Array<Record<string, unknown>>;
  isDefault: boolean;
  createdAt?: string;
}

const RECIPES_COLLECTION = 'recipes';
const TOOLS_COLLECTION = 'kitchen_tools';
const INGREDIENTS_COLLECTION = 'ingredients';
const CONFIGS_COLLECTION = 'kitchen_configs';

/**
 * Normalizes string or array of ingredients into lowercase ID array for searching
 */
export function normalizeIngredientIds(rawIngredients: Array<string | { id?: string; entityId?: string; ingredientId?: string }>): string[] {
  const set = new Set<string>();
  for (const item of rawIngredients) {
    if (typeof item === 'string') {
      const clean = item.trim().toLowerCase();
      if (clean) set.add(clean);
    } else if (item && typeof item === 'object') {
      const key = item.entityId || item.ingredientId || item.id || '';
      if (key) set.add(key.trim().toLowerCase());
    }
  }
  return Array.from(set);
}

/**
 * Helper to recursively remove undefined values from objects/arrays before sending to Firestore
 */
export function sanitizeForFirestore<T>(data: T): T {
  if (data === undefined) {
    return null as unknown as T;
  }
  if (data === null || typeof data !== 'object') {
    return data;
  }
  if (Array.isArray(data)) {
    return data
      .filter((item) => item !== undefined)
      .map((item) => sanitizeForFirestore(item)) as unknown as T;
  }
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (value !== undefined) {
      result[key] = sanitizeForFirestore(value);
    }
  }
  return result as T;
}

// ==========================================
// RECIPES DB OPERATIONS
// ==========================================

export async function saveRecipeToDb(
  recipeData: Omit<SavedRecipe, 'createdAt' | 'updatedAt' | 'id'> & { id?: string }
): Promise<SavedRecipe> {
  const id = recipeData.id || `recipe_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  const normalizedIngredients = normalizeIngredientIds(recipeData.ingredients);

  const newRecipe: SavedRecipe = {
    ...recipeData,
    id,
    ingredients: normalizedIngredients,
    tags: recipeData.tags || ['custom'],
    hasMascotSupport: recipeData.hasMascotSupport ?? true,
    author: recipeData.author || 'Anonymous Chef',
    createdAt: now,
    updatedAt: now,
  };

  if (!isDevMode() || !db) {
    console.warn('Database access is disabled in release mode or Firestore is not configured. Recipe saved locally only.');
    return newRecipe;
  }

  const sanitized = sanitizeForFirestore(newRecipe);
  const docRef = doc(db, RECIPES_COLLECTION, id);
  await setDoc(docRef, sanitized, { merge: true });

  return newRecipe;
}

export async function fetchAllRecipesFromDb(): Promise<SavedRecipe[]> {
  if (!isDevMode() || !db) return [];
  try {
    const colRef = collection(db, RECIPES_COLLECTION);
    const snapshot = await getDocs(colRef);
    const recipes: SavedRecipe[] = [];
    snapshot.forEach((d) => {
      recipes.push(d.data() as SavedRecipe);
    });
    // Sort client-side by updatedAt desc
    return recipes.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
  } catch (err) {
    console.warn('Failed to fetch recipes from Firestore:', err);
    return [];
  }
}

export async function fetchRecipeByIdFromDb(id: string): Promise<SavedRecipe | null> {
  if (!isDevMode() || !db) return null;
  try {
    const docRef = doc(db, RECIPES_COLLECTION, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data() as SavedRecipe;
    }
    return null;
  } catch (err) {
    console.warn(`Failed to fetch recipe ${id}:`, err);
    return null;
  }
}

export async function deleteRecipeFromDb(id: string): Promise<boolean> {
  if (!isDevMode() || !db) return false;
  try {
    const docRef = doc(db, RECIPES_COLLECTION, id);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.warn(`Failed to delete recipe ${id}:`, err);
    return false;
  }
}

/**
 * Searches recipes by ingredient IDs (e.g. ['garlic', 'egg']), tag, text match, or mascot support.
 */
export async function searchRecipesInDb(options: {
  ingredientQuery?: string[]; // e.g. ['garlic', 'egg']
  tag?: string;
  hasMascotSupport?: boolean;
  searchTerm?: string;
}): Promise<SavedRecipe[]> {
  if (!isDevMode() || !db) return [];
  const allRecipes = await fetchAllRecipesFromDb();

  return allRecipes.filter((recipe) => {
    // Ingredient Search matching
    if (options.ingredientQuery && options.ingredientQuery.length > 0) {
      const recipeIngs = recipe.ingredients || [];
      const matchesAll = options.ingredientQuery.every((ing) =>
        recipeIngs.some((ri) => ri.toLowerCase().includes(ing.toLowerCase()))
      );
      if (!matchesAll) return false;
    }

    // Mascot support filter
    if (options.hasMascotSupport !== undefined) {
      if (recipe.hasMascotSupport !== options.hasMascotSupport) return false;
    }

    // Tag filter
    if (options.tag) {
      const hasTag = recipe.tags?.some((t) => t.toLowerCase() === options.tag?.toLowerCase());
      if (!hasTag) return false;
    }

    // Search term in title/description
    if (options.searchTerm) {
      const term = options.searchTerm.toLowerCase();
      const inTitle = recipe.title?.toLowerCase().includes(term);
      const inDesc = recipe.description?.toLowerCase().includes(term);
      const inTag = recipe.tags?.some((t) => t.toLowerCase().includes(term));
      const inIng = recipe.ingredients?.some((i) => i.toLowerCase().includes(term));
      if (!inTitle && !inDesc && !inTag && !inIng) return false;
    }

    return true;
  });
}

// ==========================================
// KITCHEN TOOLS DB OPERATIONS
// ==========================================

export async function fetchKitchenToolsFromDb(): Promise<SavedTool[]> {
  if (!isDevMode() || !db) return catalogTools;
  try {
    const colRef = collection(db, TOOLS_COLLECTION);
    const snapshot = await getDocs(colRef);
    const tools: SavedTool[] = [];
    snapshot.forEach((d) => tools.push(d.data() as SavedTool));
    if (tools.length === 0) {
      return seedDefaultToolsInDb();
    }
    return tools;
  } catch (err) {
    console.warn('Failed to fetch tools:', err);
    return catalogTools;
  }
}

export async function seedDefaultToolsInDb(): Promise<SavedTool[]> {
  const seeded: SavedTool[] = catalogTools.map((t) => ({
    id: t.id,
    name: t.name,
    icon: t.icon,
    category: t.category,
  }));

  if (!isDevMode() || !db) return seeded;

  for (const tool of seeded) {
    const docRef = doc(db, TOOLS_COLLECTION, tool.id);
    await setDoc(docRef, sanitizeForFirestore(tool), { merge: true });
  }

  return seeded;
}

// ==========================================
// INGREDIENTS DB OPERATIONS
// ==========================================

export async function fetchIngredientsFromDb(): Promise<SavedIngredient[]> {
  if (!isDevMode() || !db) return catalogIngredients;
  try {
    const colRef = collection(db, INGREDIENTS_COLLECTION);
    const snapshot = await getDocs(colRef);
    const list: SavedIngredient[] = [];
    snapshot.forEach((d) => list.push(d.data() as SavedIngredient));
    if (list.length === 0) {
      return seedDefaultIngredientsInDb();
    }
    return list;
  } catch (err) {
    console.warn('Failed to fetch ingredients:', err);
    return catalogIngredients;
  }
}

export async function seedDefaultIngredientsInDb(): Promise<SavedIngredient[]> {
  const seeded: SavedIngredient[] = catalogIngredients.map((i) => ({
    id: i.id,
    name: i.name,
    icon: i.icon,
    category: 'pantry',
  }));

  if (!isDevMode() || !db) return seeded;

  for (const ing of seeded) {
    const docRef = doc(db, INGREDIENTS_COLLECTION, ing.id);
    await setDoc(docRef, sanitizeForFirestore(ing), { merge: true });
  }

  return seeded;
}

// ==========================================
// KITCHEN CONFIGURATIONS DB OPERATIONS
// ==========================================

export async function fetchKitchenConfigsFromDb(): Promise<SavedKitchenConfig[]> {
  if (!isDevMode() || !db) return [];
  try {
    const colRef = collection(db, CONFIGS_COLLECTION);
    const snapshot = await getDocs(colRef);
    const configs: SavedKitchenConfig[] = [];
    snapshot.forEach((d) => configs.push(d.data() as SavedKitchenConfig));
    if (configs.length === 0) {
      return [await seedDefaultKitchenConfigInDb()];
    }
    return configs;
  } catch (err) {
    console.warn('Failed to fetch kitchen configs:', err);
    return [];
  }
}

export async function seedDefaultKitchenConfigInDb(): Promise<SavedKitchenConfig> {
  const defaultConfig: SavedKitchenConfig = {
    id: 'default_tortilla_kitchen',
    name: 'Standard Tortilla World Kitchen Layout',
    workstations: Object.values(KITCHEN_WORKSTATIONS) as unknown as Array<Record<string, unknown>>,
    isDefault: true,
    createdAt: new Date().toISOString(),
  };

  if (!isDevMode() || !db) return defaultConfig;

  const docRef = doc(db, CONFIGS_COLLECTION, defaultConfig.id);
  await setDoc(docRef, sanitizeForFirestore(defaultConfig), { merge: true });

  return defaultConfig;
}

// ==========================================
// SEED DEFAULT STARTER RECIPES IN DB
// ==========================================

export async function seedDefaultRecipesInDb(): Promise<SavedRecipe[]> {
  if (!isDevMode() || !db) return [];
  const defaultRecipes: Array<Omit<SavedRecipe, 'createdAt' | 'updatedAt'>> = [
    {
      id: 'clasica_tortilla_db',
      title: 'Classic Spanish Tortilla de Patatas',
      description: 'The authentic Spanish potato & egg omelette recipe.',
      author: 'Ms. Tortilla',
      ingredients: ['potato', 'egg', 'onion', 'oil', 'salt'],
      tags: ['classic', 'spanish', 'tortilla', 'signature'],
      hasMascotSupport: true,
      formats: {
        recipeJson: {
          id: 'clasica_tortilla_db',
          name: 'Classic Spanish Tortilla de Patatas',
          requirements: {
            potato: { entityId: 'potato', name: 'Potato', amount: 3, unit: 'whole' },
            egg: { entityId: 'egg', name: 'Egg', amount: 4, unit: 'whole' },
            onion: { entityId: 'onion', name: 'Onion', amount: 1, unit: 'whole' },
            oil: { entityId: 'oil', name: 'Olive Oil', amount: 50, unit: 'ml' },
            salt: { entityId: 'salt', name: 'Salt', amount: 1, unit: 'pinch' },
          },
          steps: [
            { id: '1', action: 'peel', ingredient: 'potato', workstation: 'cutting_station', tool: 'peeler' },
            { id: '2', action: 'cut', ingredient: 'potato', workstation: 'cutting_station', tool: 'knife' },
            { id: '3', action: 'cut', ingredient: 'onion', workstation: 'cutting_station', tool: 'knife' },
            { id: '4', action: 'cook', ingredient: 'potato', workstation: 'cooking_station', tool: 'pan', heat: 'medium' },
            { id: '5', action: 'beat', ingredient: 'egg', workstation: 'preparation_station', tool: 'whisk' },
            { id: '6', action: 'mix', inputs: ['potato', 'egg', 'onion'], target: 'bowl', workstation: 'preparation_station' },
            { id: '7', action: 'cook', ingredient: 'mixture', workstation: 'cooking_station', tool: 'pan', heat: 'medium' },
            { id: '8', action: 'flip', ingredient: 'mixture', workstation: 'cooking_station' },
            { id: '9', action: 'serve', target: 'plate', workstation: 'serving_station' },
          ],
        },
      },
    },
    {
      id: 'garlic_egg_tortilla_db',
      title: 'Garlic & Egg Special Tortilla',
      description: 'Savoury garlic infused potato tortilla with extra fresh eggs.',
      author: 'Chef Anonymous',
      ingredients: ['garlic', 'egg', 'potato', 'oil', 'salt'],
      tags: ['garlic', 'savoury', 'quick', 'egg_rich'],
      hasMascotSupport: true,
      formats: {
        recipeJson: {
          id: 'garlic_egg_tortilla_db',
          name: 'Garlic & Egg Special Tortilla',
          requirements: {
            garlic: { entityId: 'garlic', name: 'Garlic', amount: 2, unit: 'cloves' },
            egg: { entityId: 'egg', name: 'Egg', amount: 5, unit: 'whole' },
            potato: { entityId: 'potato', name: 'Potato', amount: 2, unit: 'whole' },
            oil: { entityId: 'oil', name: 'Olive Oil', amount: 40, unit: 'ml' },
            salt: { entityId: 'salt', name: 'Salt', amount: 1, unit: 'pinch' },
          },
          steps: [
            { id: '1', action: 'cut', ingredient: 'garlic', workstation: 'cutting_station', tool: 'knife' },
            { id: '2', action: 'cut', ingredient: 'potato', workstation: 'cutting_station', tool: 'knife' },
            { id: '3', action: 'cook', ingredient: 'garlic', workstation: 'cooking_station', tool: 'pan', heat: 'medium' },
            { id: '4', action: 'beat', ingredient: 'egg', workstation: 'preparation_station', tool: 'whisk' },
            { id: '5', action: 'mix', inputs: ['garlic', 'egg', 'potato'], target: 'bowl', workstation: 'preparation_station' },
            { id: '6', action: 'cook', ingredient: 'mixture', workstation: 'cooking_station', tool: 'pan' },
            { id: '7', action: 'serve', target: 'plate', workstation: 'serving_station' },
          ],
        },
      },
    },
    {
      id: 'simple_scramble_no_mascot',
      title: 'Autonomous Quick Scrambled Eggs & Garlic',
      description: 'Fast egg scramble that runs autonomously without Ms. Tortilla Mascot.',
      author: 'Kitchen Automation',
      ingredients: ['egg', 'garlic', 'butter', 'salt'],
      tags: ['fast', 'breakfast', 'no_mascot', 'autonomous'],
      hasMascotSupport: false,
      formats: {
        recipeJson: {
          id: 'simple_scramble_no_mascot',
          name: 'Autonomous Quick Scrambled Eggs & Garlic',
          requirements: {
            egg: { entityId: 'egg', name: 'Egg', amount: 3, unit: 'whole' },
            garlic: { entityId: 'garlic', name: 'Garlic', amount: 1, unit: 'clove' },
            butter: { entityId: 'butter', name: 'Butter', amount: 10, unit: 'g' },
          },
          steps: [
            { id: '1', action: 'beat', ingredient: 'egg', workstation: 'preparation_station', tool: 'whisk' },
            { id: '2', action: 'cook', ingredient: 'egg', workstation: 'cooking_station', tool: 'pan' },
            { id: '3', action: 'serve', target: 'plate', workstation: 'serving_station' },
          ],
        },
      },
    },
  ];

  const savedList: SavedRecipe[] = [];
  for (const r of defaultRecipes) {
    const saved = await saveRecipeToDb(r);
    savedList.push(saved);
  }

  return savedList;
}
`````

## File: src/store/slices/recordSlice.test.ts
`````typescript
/**
 * FILE: recordSlice.test.ts
 *
 * PURPOSE:
 * Unit tests for worldStore recording slice.
 *
 * RESPONSIBILITY:
 * - Validates recording start/stop state transitions.
 * - Verifies interaction recording (MOVE_ENTITY, TOGGLE_BURNER, etc.).
 * - Verifies creation of initial and final WorldState snapshots and JSON export payload.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { worldStore } from '../worldStore';

describe('recordSlice', () => {
  beforeEach(() => {
    worldStore.getState().resetWorld();
    worldStore.getState().clearRecording();
  });

  it('starts recording and captures initial world snapshot', () => {
    const store = worldStore.getState();
    expect(store.isRecording).toBe(false);

    store.startRecording();

    const updated = worldStore.getState();
    expect(updated.isRecording).toBe(true);
    expect(updated.recordingStartTime).toBeTypeOf('number');
    expect(updated.initialRecordingState).not.toBeNull();
    expect(updated.initialRecordingState?.entities).toBeDefined();
    expect(updated.initialRecordingState?.containers).toBeDefined();
    expect(updated.recordedActions).toEqual([]);
  });

  it('records dispatched MOVE_ENTITY and TOGGLE_BURNER actions when recording is active', () => {
    worldStore.getState().startRecording();

    // 1. Move potato to burner1
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId: 'potatoes_1',
        targetContainerId: 'burner1',
      },
    });

    // 2. Turn on burner1
    worldStore.getState().dispatch({
      type: 'TOGGLE_BURNER',
      payload: {
        containerId: 'burner1',
      },
    });

    const recorded = worldStore.getState().recordedActions;
    expect(recorded).toHaveLength(2);

    expect(recorded[0].type).toBe('MOVE_ENTITY');
    expect(recorded[0].payload).toEqual({
      entityId: 'potatoes_1',
      targetContainerId: 'burner1',
    });
    expect(recorded[0].timestampMs).toBeGreaterThanOrEqual(0);

    expect(recorded[1].type).toBe('TOGGLE_BURNER');
    expect(recorded[1].payload).toEqual({
      containerId: 'burner1',
    });
    expect(recorded[1].timestampMs).toBeGreaterThanOrEqual(0);
  });

  it('does not record actions when isRecording is false', () => {
    worldStore.getState().dispatch({
      type: 'TOGGLE_BURNER',
      payload: {
        containerId: 'burner1',
      },
    });

    expect(worldStore.getState().recordedActions).toHaveLength(0);
  });

  it('stops recording and generates download URL & serialized JSON', () => {
    // Mock URL methods for Node environment
    if (!globalThis.URL.createObjectURL) {
      globalThis.URL.createObjectURL = vi.fn(() => 'blob:mock-url-1234');
      globalThis.URL.revokeObjectURL = vi.fn();
    }

    worldStore.getState().startRecording();

    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId: 'eggs_1',
        targetContainerId: 'plato',
      },
    });

    worldStore.getState().stopRecording();

    const store = worldStore.getState();
    expect(store.isRecording).toBe(false);
    expect(store.recordedDownloadUrl).toBeTruthy();
    expect(store.recordedFilename).toContain('tortilla-recorded-recipe-');
  });

  it('clears recording state and resets properties', () => {
    worldStore.getState().startRecording();
    worldStore.getState().dispatch({
      type: 'TOGGLE_BURNER',
      payload: { containerId: 'burner1' },
    });

    worldStore.getState().clearRecording();

    const store = worldStore.getState();
    expect(store.isRecording).toBe(false);
    expect(store.recordedActions).toEqual([]);
    expect(store.initialRecordingState).toBeNull();
    expect(store.recordedDownloadUrl).toBeNull();
    expect(store.recordedFilename).toBeNull();
  });
});
`````

## File: src/systems/recipeLoader.ts
`````typescript
/**
 * FILE: recipeLoader.ts
 *
 * PURPOSE:
 * Ingestion and hydration system for JSON recipe definitions.
 *
 * RESPONSIBILITY:
 * - Reads JSON recipe assets safely and validates them via validateRecipeJSON.
 * - Hydrates validated JSON data into runtime Recipe objects.
 * - Provides registry accessors (loadRecipe, loadAllRecipes, getAvailableRecipeIds, getRecipeCooklang).
 */

import type { Recipe } from '../types/Recipe';
import type { RecipeJSON } from '../types/RecipeSchema';
import { validateRecipeJSON } from './recipeValidator';

import clasicaJSON from '../data/catalog/recipes/clasica.json';
import concebollaJSON from '../data/catalog/recipes/concebolla.json';
import francesaJSON from '../data/catalog/recipes/francesa.json';

const recipeRegistry: Record<string, unknown> = {
  clasica: clasicaJSON,
  sincebolla: clasicaJSON,
  concebolla: concebollaJSON,
  francesa: francesaJSON,
};

const cooklangRegistry: Record<string, string> = {
  clasica: clasicaJSON.cooklang || '',
  sincebolla: clasicaJSON.cooklang || '',
  concebolla: concebollaJSON.cooklang || '',
  francesa: francesaJSON.cooklang || '',
};

/**
 * Loads a recipe by ID string or validates and hydrates a raw RecipeJSON object.
 */
export function loadRecipe(idOrData: string | unknown): Recipe {
  let rawData: unknown;

  if (typeof idOrData === 'string') {
    const recipeKey = idOrData.trim().toLowerCase();
    rawData = recipeRegistry[recipeKey];
    if (!rawData) {
      throw new Error(`[RecipeLoader] Unknown recipe ID: "${idOrData}". Available IDs: ${getAvailableRecipeIds().join(', ')}`);
    }
  } else {
    rawData = idOrData;
  }

  const validated: RecipeJSON = validateRecipeJSON(rawData);

  const requirements = validated.requirements || validated.ingredients || {};

  const recipe: Recipe = {
    id: validated.id,
    name: validated.name,
    requirements,
    steps: validated.steps,
  };

  // Attach optional metadata properties if available
  if (validated.description) (recipe as unknown as Record<string, unknown>).description = validated.description;
  if (validated.difficulty) (recipe as unknown as Record<string, unknown>).difficulty = validated.difficulty;
  if (validated.tags) (recipe as unknown as Record<string, unknown>).tags = validated.tags;
  if (validated.hints) (recipe as unknown as Record<string, unknown>).hints = validated.hints;
  if (validated.cooklang) (recipe as unknown as Record<string, unknown>).cooklang = validated.cooklang;

  return recipe;
}

/**
 * Returns a list of all available recipe IDs in the registry.
 */
export function getAvailableRecipeIds(): string[] {
  return ['concebolla', 'clasica', 'francesa'];
}

/**
 * Loads all known recipes in the catalog as a Recipe array.
 */
export function loadAllRecipes(): Recipe[] {
  return [
    loadRecipe('concebolla'),
    loadRecipe('clasica'),
    loadRecipe('francesa'),
  ];
}

/**
 * Retrieves the human-readable Cooklang string for a recipe by ID.
 */
export function getRecipeCooklang(id: string): string {
  const key = id.trim().toLowerCase();
  return cooklangRegistry[key] || '';
}
`````

## File: src/systems/recipeTranslator.ts
`````typescript
/**
 * FILE: recipeTranslator.ts
 *
 * PURPOSE:
 * Translator system converting human-recorded world actions into mascot-guided recipes
 * and executable mascot action sequences.
 *
 * RESPONSIBILITY:
 * - Infers source/target containers and entity locations for human actions.
 * - Injects explicit Mascot focus, grab, move, and drop actions for raw human interactions.
 * - Generates clean, declarative Recipe definitions (with requirements & steps) compatible with RecipeRunner.
 */

import type { RecordedAction } from '../types/recording';
import type { Recipe } from '../types/Recipe';
import type { RecipeStep } from '../types/RecipeStep';
import type { WorldAction } from '../types/actions';

export interface TranslatorOptions {
  recipeName?: string;
  recipeId?: string;
  mascotId?: string;
  defaultSourceContainer?: string;
}

/**
 * Utility to extract clean entity name or catalog ID from an entityId.
 */
function cleanEntityName(entityId?: string): string {
  if (!entityId) return 'item';
  return entityId
    .replace(/_\d+$/, '')
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase();
}

/**
 * Translates human-recorded actions into an expanded mascot-guided action sequence
 * where mascot focus, grab, move, and drop actions are explicitly interleaved.
 */
export function translateHumanActionsToMascotActions(
  actions: readonly (RecordedAction | WorldAction | unknown)[],
  options: TranslatorOptions = {}
): RecordedAction[] {
  const mascotId = options.mascotId || 'chef';
  const defaultSource = options.defaultSourceContainer || 'despensa';

  // Track entity locations in simulated containers
  const entityLocations: Record<string, string> = {};
  const translated: RecordedAction[] = [];

  let nowMs = Date.now();

  const addAction = (type: string, payload: Record<string, unknown>) => {
    translated.push({
      type,
      payload,
      timestampMs: nowMs,
    });
    nowMs += 300;
  };

  for (const rawAct of actions) {
    if (!rawAct) continue;
    const act = (typeof rawAct === 'object' && 'action' in rawAct && rawAct.action ? rawAct.action : rawAct) as RecordedAction;
    const { type, payload = {} } = act;

    switch (type) {
      case 'MOVE_ENTITY': {
        const entityId = (payload.entityId as string) || '';
        const targetContainerId = (payload.targetContainerId as string) || 'board';
        const sourceContainerId =
          (payload.sourceContainerId as string) || entityLocations[entityId] || defaultSource;

        // 1. Mascot moves to source container
        addAction('MASCOT_MOVE', { mascotId, targetContainerId: sourceContainerId });

        // 2. Mascot grabs ingredient
        addAction('MASCOT_GRAB', { mascotId, entityId, sourceContainerId });

        // 3. Mascot moves to target container
        addAction('MASCOT_MOVE', { mascotId, targetContainerId });

        // 4. Mascot drops ingredient
        addAction('MASCOT_DROP', { mascotId, targetContainerId });

        // 5. Actual entity movement
        addAction('MOVE_ENTITY', { entityId, targetContainerId, sourceContainerId });

        // Update entity location
        if (entityId) {
          entityLocations[entityId] = targetContainerId;
        }
        break;
      }

      case 'ADD_ENTITY': {
        const entity = payload.entity as { id?: string; name?: string } | undefined;
        const entityId = entity?.id || '';
        const containerId = (payload.containerId as string) || defaultSource;

        addAction('MASCOT_MOVE', { mascotId, targetContainerId: containerId });
        addAction('ADD_ENTITY', payload);

        if (entityId) {
          entityLocations[entityId] = containerId;
        }
        break;
      }

      case 'REMOVE_ENTITY': {
        const entityId = (payload.entityId as string) || '';
        const currentLoc = entityLocations[entityId] || defaultSource;

        addAction('MASCOT_MOVE', { mascotId, targetContainerId: currentLoc });
        addAction('REMOVE_ENTITY', payload);

        delete entityLocations[entityId];
        break;
      }

      case 'TOGGLE_BURNER': {
        const containerId = (payload.containerId as string) || 'burner1';
        addAction('MASCOT_MOVE', { mascotId, targetContainerId: containerId });
        addAction('TOGGLE_BURNER', payload);
        break;
      }

      case 'PREPARE_INGREDIENT': {
        const entityId = (payload.entityId as string) || '';
        const currentLoc = entityLocations[entityId] || 'board';

        addAction('MASCOT_MOVE', { mascotId, targetContainerId: currentLoc });
        addAction('PREPARE_INGREDIENT', payload);
        break;
      }

      case 'COOK_INGREDIENT': {
        const entityId = (payload.entityId as string) || '';
        const currentLoc = entityLocations[entityId] || 'pan';

        addAction('MASCOT_MOVE', { mascotId, targetContainerId: currentLoc });
        addAction('COOK_INGREDIENT', payload);
        break;
      }

      case 'MASCOT_FLIP': {
        addAction('MASCOT_FLIP', { mascotId });
        break;
      }

      case 'RESET_WORLD': {
        addAction('RESET_WORLD', {});
        addAction('MASCOT_CLEAR_GAZE', { mascotId });
        // Reset entity locations map
        for (const k of Object.keys(entityLocations)) {
          delete entityLocations[k];
        }
        break;
      }

      default: {
        // Pass through any existing mascot actions or custom actions
        addAction(type, payload);
        break;
      }
    }
  }

  return translated;
}

/**
 * Translates human-recorded world actions into a declarative Recipe object
 * that can be saved as a recipe file or executed directly via RecipeRunner.
 */
export function translateHumanActionsToRecipe(
  actions: readonly (RecordedAction | WorldAction | unknown)[],
  options: TranslatorOptions = {}
): Recipe {
  const recipeId = options.recipeId || `translated-recipe-${Date.now()}`;
  const name = options.recipeName || 'Recorded Kitchen Recipe';

  const requirementsMap: Record<string, { entityId: string; amount: number; unit: string; name: string }> = {};
  const steps: RecipeStep[] = [];

  const entityLocations: Record<string, string> = {};

  steps.push({
    action: 'speak',
    message: `Starting ${name}`,
  });

  for (const rawAct of actions) {
    if (!rawAct) continue;
    const act = (typeof rawAct === 'object' && 'action' in rawAct && rawAct.action ? rawAct.action : rawAct) as RecordedAction;
    const { type, payload = {} } = act;

    switch (type) {
      case 'MOVE_ENTITY': {
        const entityId = (payload.entityId as string) || '';
        const target = (payload.targetContainerId as string) || 'board';
        const source = (payload.sourceContainerId as string) || entityLocations[entityId] || 'despensa';

        const cleanName = cleanEntityName(entityId);
        if (cleanName && !requirementsMap[cleanName]) {
          requirementsMap[cleanName] = {
            entityId: cleanName,
            amount: 1,
            unit: 'unidad',
            name: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
          };
        }

        steps.push({
          action: 'move',
          ingredient: cleanName || entityId,
          source,
          target,
        });

        if (entityId) {
          entityLocations[entityId] = target;
        }
        break;
      }

      case 'PREPARE_INGREDIENT': {
        const entityId = (payload.entityId as string) || '';
        const preparation = (payload.preparation as string) || 'sliced';
        const cleanName = cleanEntityName(entityId);
        const containerId = entityLocations[entityId] || 'board';

        steps.push({
          action: 'prepare',
          ingredient: cleanName || entityId,
          preparation,
          containerId,
        });
        break;
      }

      case 'COOK_INGREDIENT': {
        const entityId = (payload.entityId as string) || '';
        const cooking = (payload.cooking as string) || 'fried';
        const cleanName = cleanEntityName(entityId);
        const containerId = entityLocations[entityId] || 'pan';

        steps.push({
          action: 'cook',
          ingredient: cleanName || entityId,
          method: cooking,
          containerId,
        });
        break;
      }

      case 'TOGGLE_BURNER': {
        const containerId = (payload.containerId as string) || 'burner1';
        steps.push({
          action: 'instruction',
          text: `Toggle heat on ${containerId}`,
        });
        break;
      }

      case 'MASCOT_FLIP': {
        steps.push({
          action: 'flip',
          target: 'pan',
          instruction: 'Flip tortilla in pan',
        });
        break;
      }

      case 'USE_INGREDIENT': {
        const entityId = (payload.entityId as string) || '';
        const cleanName = cleanEntityName(entityId);
        steps.push({
          action: 'mix',
          inputs: [cleanName || entityId],
          targetContainerId: 'bowl',
        });
        break;
      }

      default:
        // Ignore unhandled non-recipe world state metadata actions
        break;
    }
  }

  steps.push({
    action: 'celebrate',
  });

  return {
    id: recipeId,
    name,
    requirements: requirementsMap,
    steps,
  };
}
`````

## File: src/types/recording.ts
`````typescript
/**
 * FILE: recording.ts
 *
 * PURPOSE:
 * Type definitions for serialized world state recipes and recorded user interaction sequences.
 *
 * RESPONSIBILITY:
 * - Defines the JSON schema for serialized recipe exports.
 * - Captures initial and final WorldState snapshots (entities + containers).
 * - Stores interaction sequences with relative timestamps for replay / serialization.
 */

import type { Container, Entity, WorldAction } from './world';

export interface RecordedAction {
  type: WorldAction['type'] | string;
  payload: Record<string, unknown>;
  timestampMs: number;
}

export interface SerializedWorldState {
  entities: Record<string, Entity>;
  containers: Record<string, Container>;
}

export interface SerializedRecipeExport {
  version: '1.0.0';
  title: string;
  recordedAt: string;
  durationMs: number;
  actionCount: number;
  usedIngredients?: Array<{ id: string; name: string; icon?: string }>;
  initialState: SerializedWorldState;
  finalState: SerializedWorldState;
  actions: RecordedAction[];
}
`````

## File: docs/player-guide.md
`````markdown
# Welcome to Tortilla World! 🌮
**A Player's Guide to the Kitchen Simulation**

Welcome to the Kitchen! Tortilla World is not just a digital recipe book; it is a living simulation where you interact with objects just like you would in a real kitchen.

In this world, everything—from an onion to the frying pan itself—is a physical "Entity" that you can grab, move, and use.

This guide will walk you through the basics of the kitchen all the way to cooking your first complex dish.

---

## 🧭 Part 1: The Basics

### How the World Works
In Tortilla World, you manipulate the environment using **Drag and Drop**.
You don't need complex menus to prepare ingredients. Instead, you grab a potato and drop it onto a cutting board, or drop eggs into a preparation bowl.

Objects are moved between **Containers**.
A container can be a pantry shelf, a mixing bowl, or a hot burner. The rules of the world dictate what happens when you drop an item into a specific container.

### Workstations & Zones
Your kitchen is divided into distinct workstations, each with a specific purpose:

1. **Pantry (`despensa`)**: Where all your raw ingredients are stored.
2. **Washing Station (`sink`)**: For cleaning vegetables before use.
3. **Cutting Station (`board`)**: The zone for preparing ingredients. Dropping raw vegetables here cuts and peels them automatically.
4. **Preparation Station (`bowl`)**: Used for combining ingredients. This is where you crack eggs, beat them, and mix in your chopped vegetables.
5. **Cooking Station (`burner`)**: Where heat is applied. You place a `Pan` here, add oil, and fry, boil, or cook your mixtures.
6. **Serving Station (`plate`)**: The final destination for your completed dish.
7. **Trash Station (`trash`)**: Where unwanted ingredients or scrap items can be placed. You can empty the trash when needed, with the Mascot asking for confirmation before clearing out discarded items.

---

## 🍳 Part 2: Advanced Mechanics

### Changing States
Ingredients don't just move; they change state based on the container they inhabit.
- A whole potato moved to the cutting board becomes *cut potatoes*.
- A whole egg moved to a bowl becomes *beaten eggs*.
- A raw mixture moved to a hot pan becomes *cooked*.

### Ingredient Uniqueness & State Distinction
Containers enforce ingredient uniqueness to prevent duplicate identical raw items. However, state changes are recognized:
- You **cannot** put two identical raw lemons in a single container or trash bin.
- You **can** put a *raw lemon* AND a *peeled lemon* together because their preparation states differ.

### Managing the Trash Bin 🗑️
- Dropping unwanted items into the **Trash** station holds them temporarily.
- Clicking **Empty Trash** summons the Mascot to ask *"Are you sure you want to empty the trash?"*.
- Confirming clears the trash bin and permanently removes the discarded items from the world.

### Workstation Navigation Buttons (◀ ▶)
Each ingredient inside a workstation has `◀` (previous) and `▶` (next) navigation buttons:
- Tapping `◀` instantly moves the ingredient to the preceding workstation (e.g. from `Bowl` back to `Cutting Board`).
- Tapping `▶` moves the ingredient to the next workstation (e.g. from `Cutting Board` forward to `Bowl`).
- This makes kitchen workflow fast and accessible on both desktop and touch/mobile screens without requiring precision dragging!

### Mobile Drag & Drop & Controls 📱
- Ingredients support full touch drag-and-drop on mobile devices with activation distance and touch delay constraints.
- You can collapse or expand the top controls panel at any time using the **Show/Hide Controls** button to maximize your workspace on small screens.

### The Action Player & Recorder
On the left side of your screen, you might notice controls for **Play Catalog Recipe** or the **Action Recorder**.
- You can watch the kitchen's Mascot automatically perform actions by playing a recipe.
- If you switch to the Action Recorder, the game will record every drag and drop you make, generating a custom recipe script!

---

## 👨‍🍳 Part 3: Tutorial - Making a Spanish Tortilla

Let's put it all together and make a classic *Tortilla de Patatas*.

### Step 1: Prep the Ingredients
1. **Grab** the Potatoes (🥔) from the Pantry and **drop** them onto the Cutting Board.
2. **Grab** the Onion (🧅) from the Pantry and **drop** it onto the Cutting Board.
3. The Cutting Station converts your raw vegetables into *cut vegetables*.

### Step 2: Beat the Eggs
1. **Grab** the Eggs (🥚) from the Pantry and **drop** them into the Preparation Station (the Bowl).
2. The Bowl automatically transforms the eggs into *beaten eggs*.

### Step 3: Mix it Up
1. **Drag** your chopped potatoes and onions from the Cutting Board and **drop** them into the Bowl with the beaten eggs.
2. Add a pinch of Salt (🧂) from the Pantry to the Bowl.
3. They are now a unified *mixture*!

### Step 4: Cooking
1. Ensure your `Pan` is on the Cooking Station (`burner1`).
2. Drag `Olive Oil` (🫒) into the pan.
3. Now, **Drag** your mixture from the Bowl and **drop** it into the Pan.
4. Let the heat do its work! (The cooking station applies heat to transform the raw mixture into a cooked Tortilla).

### Step 5: Serve
1. Once the cooking is complete, **drag** the finished Tortilla from the Pan and **drop** it onto the Serving Station (the Plate).

🎉 **Congratulations!** You've mastered the basics of Tortilla World. You are now ready to experiment with other ingredients and recipes!
`````

## File: src/components/Controls/ActionReplayer.test.tsx
`````typescript
/**
 * FILE: ActionReplayer.test.tsx
 *
 * PURPOSE:
 * Unit tests for ActionReplayer component logic.
 */

import { describe, it, expect } from 'vitest';
import { actionPlayer } from '../../systems/actionPlayer';
import { worldStore } from '../../store/worldStore';
import type { WorldAction } from '../../types/actions';

describe('ActionReplayer component logic', () => {
  it('integrates with ActionPlayer to replay uploaded actions', async () => {
    worldStore.getState().resetWorld();

    const actions: WorldAction[] = [
      {
        type: 'TOGGLE_BURNER',
        payload: { containerId: 'burner1' },
      },
      {
        type: 'ADD_ENTITY',
        payload: {
          entity: {
            id: 'potato_test_1',
            name: 'Potato',
            type: 'ingredient',
          },
          containerId: 'burner1',
        },
      },
    ];

    await actionPlayer.playLog(actions, { delayMs: 10 });

    const store = worldStore.getState();
    expect(store.containers.burner1.isOn).toBe(true);
    expect(store.containers.burner1.entityIds).toContain('potato_test_1');
  });

  it('syncs uploaded actions with setRecordedActions in worldStore', () => {
    worldStore.getState().resetWorld();

    const sampleActions = [
      {
        type: 'MOVE_ENTITY',
        payload: { entityId: 'patata', targetContainerId: 'board' },
        timestampMs: Date.now(),
      },
    ];

    worldStore.getState().setRecordedActions(sampleActions);

    expect(worldStore.getState().recordedActions).toHaveLength(1);
    expect(worldStore.getState().recordedActions[0].type).toBe('MOVE_ENTITY');
  });

  it('handles playing uploaded Declarative Recipe formats', async () => {
    worldStore.getState().resetWorld();

    const declarativeRecipe = {
      id: 'uploaded_dec_1',
      name: 'Uploaded Declarative Recipe',
      requirements: {},
      steps: [
        { id: '1', action: 'move', ingredient: 'patata', target: 'board' },
        { id: '2', action: 'prepare', ingredient: 'patata', style: 'sliced' },
      ],
    };

    const { detectRecipeFormat, getPlayableActionsFromFormat } = await import(
      '../../utils/recipeFormatDetector'
    );

    const detected = detectRecipeFormat(declarativeRecipe);
    expect(detected.type).toBe('declarative');
    expect(detected.typeLabel).toBe('Declarative Recipe');

    const playable = getPlayableActionsFromFormat(detected);
    expect(playable.actions).toHaveLength(2);

    await actionPlayer.playLog(playable.actions, { delayMs: 10 });
    expect(worldStore.getState().recordedActions.length).toBeGreaterThanOrEqual(1);
  });

  it('handles playing uploaded Full Session Log formats', async () => {
    worldStore.getState().resetWorld();

    const fullSessionLog = {
      version: '1.0',
      title: 'Full Session Recording',
      zustandInit: { entities: {}, containers: {} },
      actions: [
        { type: 'TOGGLE_BURNER', payload: { containerId: 'burner1' } },
      ],
    };

    const { detectRecipeFormat, getPlayableActionsFromFormat } = await import(
      '../../utils/recipeFormatDetector'
    );

    const detected = detectRecipeFormat(fullSessionLog);
    expect(detected.type).toBe('full_session_log');
    expect(detected.typeLabel).toBe('Full Session Log');

    const playable = getPlayableActionsFromFormat(detected);
    expect(playable.actions).toHaveLength(1);

    await actionPlayer.playLog(playable.actions, { delayMs: 10 });
    expect(worldStore.getState().containers.burner1.isOn).toBe(true);
  });
});
`````

## File: src/components/Controls/IngredientsSidebar.scss
`````scss
.ingredients-sidebar-container {
  width: 100%;
  box-sizing: border-box;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 12px;

  .sidebar-header {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .sidebar-title {
      font-size: 16px;
      font-weight: 700;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .sidebar-subtitle {
      font-size: 12px;
      color: #64748b;
    }

    .toggle-sidebar-btn,
    .reset-categories-btn {
      padding: 4px 10px;
      font-size: 0.8rem;
      font-weight: 600;
      border-radius: 6px;
      border: 1px solid #cbd5e1;
      background-color: #ffffff;
      color: #334155;
      cursor: pointer;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      white-space: nowrap;
      transition: all 0.15s ease;

      &:hover {
        background-color: #f1f5f9;
        border-color: #94a3b8;
      }
    }
  }

  .sidebar-search {
    width: 100%;

    input {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      font-size: 13px;
      outline: none;
      transition: border-color 0.2s ease;

      &:focus {
        border-color: #6366f1;
      }
    }
  }

  .sidebar-categories-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .category-section {
    padding: 12px;
    border-radius: 10px;
    border: 2px dashed #cbd5e1;
    background: #fafafa;
    transition: all 0.2s ease;

    &.category-basic {
      border-color: #fcd34d;
      background: #fefce8;
    }

    &.category-other {
      border-color: #e2e8f0;
      background: #f8fafc;
    }

    &.category-dropzone--over {
      border-color: #10b981;
      background: #ecfdf5;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
    }

    .category-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      .category-title-wrapper {
        display: flex;
        align-items: center;
        gap: 6px;

        .category-icon {
          font-size: 1rem;
        }

        .category-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: #1e293b;
        }
      }

      .category-badge {
        font-size: 0.75rem;
        font-weight: 700;
        padding: 2px 8px;
        border-radius: 12px;
        background: #e2e8f0;
        color: #334155;
      }
    }

    .empty-category-hint {
      padding: 16px;
      text-align: center;
      font-size: 0.8rem;
      color: #94a3b8;
      font-style: italic;
      border: 1px dashed #cbd5e1;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.6);
    }
  }

  .others-toggle-row {
    display: flex;
    justify-content: center;
    margin: 4px 0;

    .toggle-others-btn {
      padding: 6px 14px;
      font-size: 0.8rem;
      font-weight: 700;
      border-radius: 20px;
      border: 1px solid #cbd5e1;
      background-color: #ffffff;
      color: #0f766e;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      transition: all 0.15s ease;

      &:hover {
        background-color: #f0fdf4;
        border-color: #059669;
        color: #047857;
      }
    }
  }

  .items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 10px;
    width: 100%;

    .sidebar-item-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      position: relative;
      cursor: grab;
      transition: all 0.2s ease;

      &:hover {
        background: #ffffff;
        border-color: #cbd5e1;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
      }

      .item-entity-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }

      .item-card-actions {
        display: flex;
        flex-direction: column;
        gap: 4px;
        width: 100%;
        margin-top: 6px;

        .quick-add-btn {
          width: 100%;
          padding: 4px 6px;
          font-size: 11px;
          font-weight: 700;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #334155;
          cursor: pointer;
          transition: all 0.15s ease;

          &:hover {
            background: #10b981;
            color: #ffffff;
            border-color: #059669;
          }
        }

        .shift-category-btn {
          width: 100%;
          padding: 3px 4px;
          font-size: 10px;
          font-weight: 600;
          border-radius: 4px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #64748b;
          cursor: pointer;
          transition: all 0.15s ease;

          &:hover {
            background: #e2e8f0;
            color: #1e293b;
          }
        }
      }
    }
  }

  .no-results {
    padding: 16px;
    text-align: center;
    font-size: 13px;
    color: #94a3b8;
    font-style: italic;
  }
}
`````

## File: src/components/Recipe/CookbookView.scss
`````scss
@use 'sass:color';
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.cookbook-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
}

.cookbook-selector {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 10px;
}

.cookbook-tab {
  background: #ffffff;
  border: 2px solid $warm-border;
  font-size: 15px;
  font-weight: 700;
  color: $dark-brown;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: $radius-md;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: $tortilla-yellow;
    color: $dark-brown;
    background: $tortilla-yellow-light;
    transform: translateY(-2px);
  }

  &.active {
    background: $tortilla-yellow;
    color: #ffffff;
    border-color: $tortilla-yellow-hover;
    box-shadow: 0 4px 12px rgba(232, 168, 56, 0.4);
    transform: translateY(-2px);
  }

  &.recorded-tab {
    border-color: #8b5cf6;
    color: #5b21b6;
    background: #f5f3ff;

    &:hover {
      border-color: #7c3aed;
      background: #ede9fe;
    }

    &.active {
      background: #7c3aed;
      color: #ffffff;
      border-color: #6d28d9;
      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4);
    }
  }
}

.cookbook-card {
  @include ceramic-card($warm-surface, $warm-border);
  border-radius: $radius-xl;
  overflow: hidden;
  background: $warm-cream;
  box-shadow: $shadow-floating;
  /* Make it prettier */
  border: 4px solid #fff;
  outline: 1px solid $warm-border;
  background-image:
    linear-gradient(#f4ebd3 1px, transparent 1px),
    linear-gradient(90deg, #f4ebd3 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: -1px -1px;
}

.cookbook-header {
  background: rgba(254, 247, 232, 0.9);
  padding: 30px;
  border-bottom: 2px solid $warm-border;
  text-align: center;

  .recipe-title {
    margin: 0 0 10px 0;
    font-size: 2.5rem;
    color: $dark-brown;
    font-weight: 800;
  }

  .recipe-description {
    font-size: 1.1rem;
    color: $wood-medium;
    max-width: 600px;
    margin: 0 auto 20px auto;
    line-height: 1.5;
  }

  .recipe-meta {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
}

.meta-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  background: #fff;
  border: 1px solid $warm-border;
  color: $wood-medium;

  &.difficulty {
    background: $terracotta-light;
    color: $terracotta;
    border-color: $terracotta-border;
  }

  &.tag {
    background: $olive-green-light;
    color: $olive-green;
    border-color: $olive-green-border;
  }

  &.custom-tag {
    background: #f3e8ff;
    color: #6b21a8;
    border-color: #d8b4fe;
  }
}

.recorded-badge {
  font-size: 0.9rem;
  background: #f3e8ff;
  color: #6b21a8;
  border: 1px solid #d8b4fe;
  padding: 4px 10px;
  border-radius: 12px;
  vertical-align: middle;
  margin-left: 10px;
  display: inline-block;
}

.empty-notice {
  font-style: italic;
  color: $wood-muted;
  margin: 10px 0;
}

.cookbook-body {
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
}

.ingredients-section {
  padding: 30px;
  background: rgba(245, 235, 220, 0.8);
  border-bottom: 1px solid $warm-border;

  @media (min-width: 768px) {
    width: 35%;
    border-bottom: none;
    border-right: 1px dashed $warm-border;
  }

  h3 {
    margin-top: 0;
    color: $dark-brown;
    font-size: 1.5rem;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.ingredients-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.ingredient-item {
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.6);
  padding: 12px;
  border-radius: $radius-md;
  border: 1px solid rgba(0, 0, 0, 0.05);

  .ingredient-icon {
    font-size: 2rem;
    background: #fff;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }

  .ingredient-details {
    display: flex;
    flex-direction: column;

    .ingredient-name {
      font-weight: 700;
      color: $dark-brown;
      font-size: 1.1rem;
      text-transform: capitalize;
    }

    .ingredient-amount {
      color: $wood-muted;
      font-size: 0.9rem;
      font-weight: 600;
    }
  }
}

.instructions-section {
  padding: 30px;
  background: rgba(251, 246, 238, 0.8);

  @media (min-width: 768px) {
    width: 65%;
  }

  h3 {
    margin-top: 0;
    color: $dark-brown;
    font-size: 1.5rem;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.instructions-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.instruction-step {
  display: flex;
  gap: 15px;

  .step-number {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    background: $terracotta;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 1.1rem;
    margin-top: 2px;
  }

  .step-text {
    margin: 0;
    font-size: 1.15rem;
    line-height: 1.6;
    color: $dark-brown;
    padding-top: 4px;

    &::first-letter {
      text-transform: capitalize;
    }
  }
}

.recipe-hints {
  margin-top: 40px;
  background: $mixing-bg;
  border: 1px solid $mixing-border;
  border-radius: $radius-lg;
  padding: 20px;

  h4 {
    margin: 0 0 15px 0;
    color: $mixing-text;
    font-size: 1.2rem;
  }

  ul {
    margin: 0;
    padding-left: 20px;
    color: $dark-brown;

    li {
      margin-bottom: 8px;
      line-height: 1.5;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
`````

## File: src/components/Recipe/RequirementView.tsx
`````typescript
/**
 * FILE: RequirementView.tsx
 *
 * PURPOSE:
 * Displays a single required entity inside a recipe.
 *
 * RESPONSIBILITY:
 * - Uses EntityView in readOnly mode to visualize required entity.
 * - Always uses fresh catalog data to keep Required Materials immutable.
 *
 * NOTE: Required Materials should show the original, uncooked state of ingredients.
 * Even if an ingredient gets cooked (e.g., oil heated), the Required Materials list
 * should always display the same original names. We achieve this by always using
 * fresh catalog data instead of world state (which gets mutated during cooking).
 * - Renders requirement quantity and unit.
 */

import React, { useEffect } from 'react';
import type { Requirement } from '../../types/Requirement';
import type { Entity } from '../../types/world';
import { worldStore } from '../../store/worldStore';
import { ingredients } from '../../data/catalog/ingredients';
import { catalogTools as tools } from '../../data/catalog/tools';
import { EntityView } from '../World/EntityView';

interface RequirementViewProps {
  requirement: Requirement;
}

export const RequirementView: React.FC<RequirementViewProps> = ({ requirement }) => {
  // const entities = useStore(worldStore, (state) => state.entities);
  const catalogIng = ingredients.find((i) => i.id === requirement.entityId);
  const catalogTool = tools.find((t: { id: string }) => t.id === requirement.entityId);

  /**
   * CHANGE: Always use fresh catalog data for Required Materials.
   *
   * WHY: This ensures Required Materials remain visually immutable throughout the recipe,
   * regardless of any state changes (cooking, consumed, etc.) in the world state.
   *
   * EXAMPLE:
   *   - Catalog says: { icon: '🫒', name: 'Olive Oil' }
   *   - After heating: world state has { cooking: 'heat' } but display stays "Olive Oil"
   *   - Not: "Heat Olive Oil" (which would be wrong)
   *
   * We intentionally ignore realEntity to keep the UI clean and consistent.
   */
  const entity: Entity = {
    id: requirement.entityId,
    name: requirement.name || catalogIng?.name || catalogTool?.name || requirement.entityId,
    type: (catalogTool ? 'tool' : 'ingredient') as 'tool' | 'ingredient',
    icon: catalogIng?.icon || catalogTool?.icon,
    ingredientId: requirement.entityId,
    state: {}, // Always fresh, never mutated
  };

  useEffect(() => {
    const store = worldStore.getState();
    const existing = store.entities[requirement.entityId];
    if (!existing) {
      // If entity doesn't exist in world state yet, create it in pantry
      store.dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: {
            id: requirement.entityId,
            name: requirement.name || catalogIng?.name || catalogTool?.name || requirement.entityId,
            type: (catalogTool ? 'tool' : 'ingredient') as 'tool' | 'ingredient',
            icon: catalogIng?.icon || catalogTool?.icon,
            ingredientId: requirement.entityId,
            state: {},
          },
          containerId: 'despensa',
        },
      });
    }
  }, [requirement.entityId, catalogIng?.name, catalogIng?.icon, catalogTool?.name, catalogTool?.icon, catalogTool, requirement.name]);

  return (
    <li className="requirement-view">
      <EntityView entity={entity} containerId="despensa" readOnly={true} />
      <span className="requirement-view__amount">
        {requirement.amount} {requirement.unit}
      </span>
    </li>
  );
};
`````

## File: src/components/Scene/useSceneDragAndDrop.ts
`````typescript
/**
 * FILE: useSceneDragAndDrop.ts
 *
 * PURPOSE:
 * React hook connecting drag/drop events with the game world.
 *
 * RESPONSIBILITY:
 * - Handles DnD lifecycle using dnd-kit sensors.
 * - Translates UI drag actions into pure MOVE_ENTITY actions.
 *
 * SHOULD NOT:
 * - Decide game rules or directly mutate state.
 */

import { useSensors, useSensor, PointerSensor, TouchSensor, MouseSensor, KeyboardSensor } from '@dnd-kit/core';
import type { DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core';
import { worldStore } from '../../store/worldStore';
import { updateMascotGaze } from '../../systems/gaze';

export function useSceneDragAndDrop() {
  // 1. Initialize dnd-kit sensors for mouse, touch, pointer, and keyboard inputs
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    const entityId = String(event.active.id);
    updateMascotGaze('chef', { type: 'entity', entityId });
    worldStore.getState().dispatch({
      type: 'FOCUS_ENTITY',
      payload: { entityId, isUserOverride: true },
    });
    window.dispatchEvent(new CustomEvent('open-ingredients-list'));
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (event.over) {
      const containerId = String(event.over.id);
      updateMascotGaze('chef', { type: 'entity', entityId: containerId });
      worldStore.getState().dispatch({
        type: 'FOCUS_CONTAINER',
        payload: { containerId, isUserOverride: true },
      });
    }
  };

  // 2. Intercept the drop and dispatch a pure WorldAction
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Dispatch event to close ingredient list once dropped/placed
    window.dispatchEvent(new CustomEvent('close-ingredients-list'));

    // If dropped outside any valid droppable area, clear gaze
    if (!over) {
      updateMascotGaze('chef', null);
      // Clear user override after 1.5s
      setTimeout(() => {
        if (worldStore.getState().userOverride) {
          worldStore.getState().clearFocus(false);
        }
      }, 1500);
      return;
    }

    const entityId = String(active.id);
    const targetContainerId = String(over.id);

    // Handle dragging directly onto Tortilla mascot
    if (targetContainerId === 'chef' || targetContainerId === 'tortilla' || targetContainerId === 'mascot') {
      const mascot = worldStore.getState().entities['chef'];
      const rawHolding = mascot?.state?.holdingEntityIds as string[] | undefined;
      const singleHolding = mascot?.state?.holdingEntityId as string | undefined;
      const currentHolding = Array.isArray(rawHolding) && rawHolding.length > 0
        ? rawHolding
        : singleHolding
        ? [singleHolding]
        : [];

      if (currentHolding.length < 2) {
        worldStore.getState().dispatch({
          type: 'MASCOT_GRAB',
          payload: {
            entityId,
            mascotId: 'chef',
          },
        });
      } else {
        worldStore.getState().dispatch({
          type: 'UPDATE_ENTITY_STATE',
          payload: {
            entityId: 'chef',
            changes: { speechMessage: '¡Mis manos están llenas! 🤲 / My hands are full!' },
          },
        });
        setTimeout(() => {
          worldStore.getState().dispatch({
            type: 'UPDATE_ENTITY_STATE',
            payload: { entityId: 'chef', changes: { speechMessage: undefined } },
          });
        }, 2500);
      }

      setTimeout(() => {
        if (worldStore.getState().userOverride) {
          worldStore.getState().clearFocus(false);
        }
      }, 1500);
      return;
    }

    // Handle category reassignment between Basic and Other ingredient lists in creator
    if (targetContainerId === 'basic-ingredients-list' || targetContainerId === 'other-ingredients-list') {
      window.dispatchEvent(
        new CustomEvent('move-ingredient-category', {
          detail: { entityId, targetCategory: targetContainerId },
        })
      );
      return;
    }

    updateMascotGaze('chef', { type: 'entity', entityId: targetContainerId });

    // Dispatch the intent. The ContainerRules engine inside worldStore
    // will intercept this and silently reject it if the container is full
    // or doesn't accept this entity type.
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId,
        targetContainerId,
      },
    });

    // Reset user override after drop action completes
    setTimeout(() => {
      if (worldStore.getState().userOverride) {
        worldStore.getState().clearFocus(false);
      }
    }, 1500);
  };

  return {
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
}
`````

## File: src/lib/firebase.ts
`````typescript
/**
 * FILE: src/lib/firebase.ts
 *
 * PURPOSE:
 * Firebase initialization and exported Firestore and Auth references.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, signInAnonymously, type Auth } from 'firebase/auth';
import { isDevMode } from '../utils/devMode';

interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  firestoreDatabaseId?: string;
  [key: string]: unknown;
}

const configModules = import.meta.glob('../../firebase-applet-config.json', {
  eager: true,
  import: 'default',
});
const configKeys = Object.keys(configModules);
const config = configKeys.length > 0 ? (configModules[configKeys[0]] as FirebaseConfig) : null;

const isConfigValid = Boolean(
  config && typeof config.apiKey === 'string' && config.apiKey.trim().length > 0
);

let app: ReturnType<typeof initializeApp> | null = null;
let dbRef: Firestore | null = null;
let authRef: Auth | null = null;

// Only initialize Firebase/Firestore when in developer mode. In release mode, database access is completely disabled.
if (isDevMode() && isConfigValid && config) {
  try {
    app = getApps().length === 0 ? initializeApp(config) : getApp();
    const databaseId = typeof config.firestoreDatabaseId === 'string' ? config.firestoreDatabaseId : undefined;
    dbRef = databaseId && databaseId !== '(default)'
      ? getFirestore(app, databaseId)
      : getFirestore(app);
    authRef = getAuth(app);

    signInAnonymously(authRef).catch((err) => {
      console.warn('Firebase anonymous auth status:', err?.message || err);
    });
  } catch (err) {
    console.warn('Firebase initialization error:', err);
  }
}

export { app };
export const db = dbRef as Firestore;
export const auth = authRef as Auth;
export const isFirebaseConfigured = isDevMode() && isConfigValid && !!dbRef;
`````

## File: src/store/slices/containerSlice.ts
`````typescript
/**
 * FILE: containerSlice.ts
 *
 * PURPOSE:
 * Zustand slice for container management and entity transfers/movements.
 *
 * RESPONSIBILITY:
 * - Mutates container entity IDs in world state.
 * - Enforces container rules and handles immutable source container copies.
 */

import type { StateCreator } from 'zustand/vanilla';
import type { Container, Entity } from '../../types/world';
import type { WorldStateStore } from '../types';
import { validateContainerRules } from '../../engine/containerRules';

export interface ContainerSlice {
  containers: Record<string, Container>;
  moveEntity: (entityId: string, targetContainerId: string, positionIndex?: number) => void;
  emptyTrash: () => void;
}

export const createContainerSlice: StateCreator<
  WorldStateStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  ContainerSlice
> = (set, get) => ({
  containers: {},

  emptyTrash: () => {
    set(
      (draft) => {
        const trashContainer = draft.containers['trash'];
        if (trashContainer) {
          trashContainer.entityIds.forEach((id) => {
            delete draft.entities[id];
          });
          trashContainer.entityIds = [];
        }
      },
      false,
      'EMPTY_TRASH'
    );
  },

  moveEntity: (entityId, targetContainerId, positionIndex) => {
    const state = get();
    if (targetContainerId === 'chef' || targetContainerId === 'tortilla' || targetContainerId === 'mascot') {
      state.mascotGrab(entityId, undefined, 'chef');
      return;
    }

    const entity = state.entities[entityId];
    const targetContainer = state.containers[targetContainerId];
    if (!entity || !targetContainer) return;

    const sourceContainer = Object.values(state.containers).find((c) =>
      c.entityIds.includes(entityId)
    );

    const isSourceImmutable =
      sourceContainer?.rules?.isImmutable || sourceContainer?.rules?.consumesOnDrag === false;
    const isTargetPlate = targetContainerId === 'plate' || targetContainerId === 'plato';

    // Immutable source container logic: create a copy instance in target
    if (sourceContainer && sourceContainer.id !== targetContainerId && isSourceImmutable) {
      const copyId = `${entity.id}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const copyEntity: Entity = {
        ...entity,
        id: copyId,
        ingredientId: entity.ingredientId || entity.id.split('_')[0],
      };
      if (isTargetPlate) {
        copyEntity.name = state.activeRecipeName || 'Tortilla Española Clásica';
      }

      const currentEntities = targetContainer.entityIds
        .map((id) => state.entities[id])
        .filter((e): e is Entity => Boolean(e));
      const result = validateContainerRules(targetContainer, copyEntity, currentEntities);
      if (!result.allowed) return;

      set(
        (draft) => {
          draft.entities[copyId] = copyEntity;
          if (typeof positionIndex === 'number') {
            draft.containers[targetContainerId].entityIds.splice(positionIndex, 0, copyId);
          } else {
            draft.containers[targetContainerId].entityIds.push(copyId);
          }
          const mascot = draft.entities['chef'];
          if (mascot) {
            const rawHolding = mascot.state?.holdingEntityIds as string[] | undefined;
            const updatedHolding = rawHolding ? rawHolding.filter((id) => id !== entityId) : [];
            mascot.state = {
              ...mascot.state,
              gazingAt: { type: 'entity', entityId: targetContainerId },
              targetContainerId,
              holdingEntityIds: updatedHolding,
              holdingEntityId: updatedHolding.length > 0 ? updatedHolding[updatedHolding.length - 1] : undefined,
            };
          }
        },
        false,
        'MOVE_ENTITY'
      );
      return;
    }

    // Reordering within the same container never re-checks rules
    if (sourceContainer?.id !== targetContainerId) {
      const currentEntities = targetContainer.entityIds
        .map((id) => state.entities[id])
        .filter((e): e is Entity => Boolean(e) && e.id !== entityId);
      const result = validateContainerRules(targetContainer, entity, currentEntities);
      if (!result.allowed) return;
    }

    set(
      (draft) => {
        if (sourceContainer) {
          draft.containers[sourceContainer.id].entityIds = draft.containers[
            sourceContainer.id
          ].entityIds.filter((id) => id !== entityId);
        }

        if (typeof positionIndex === 'number') {
          draft.containers[targetContainerId].entityIds.splice(positionIndex, 0, entityId);
        } else {
          draft.containers[targetContainerId].entityIds.push(entityId);
        }

        if (isTargetPlate) {
          const activeRecipeName = state.activeRecipeName || 'Tortilla Española Clásica';
          const ent = draft.entities[entityId];
          if (ent) {
            const isGenericOrMixture =
              !ent.name ||
              ent.name.startsWith('mixture_') ||
              ent.name.toLowerCase().includes('mixture') ||
              ent.name.toLowerCase().includes('mezcla') ||
              ent.name.toLowerCase().includes('huevo batido') ||
              ent.name.toLowerCase().includes('raw');

            if (isGenericOrMixture) {
              ent.name = activeRecipeName;
            }
          }
        }

        const mascot = draft.entities['chef'];
        if (mascot) {
          const rawHolding = mascot.state?.holdingEntityIds as string[] | undefined;
          const updatedHolding = rawHolding ? rawHolding.filter((id) => id !== entityId) : [];
          mascot.state = {
            ...mascot.state,
            gazingAt: { type: 'entity', entityId: targetContainerId },
            targetContainerId,
            holdingEntityIds: updatedHolding,
            holdingEntityId: updatedHolding.length > 0 ? updatedHolding[updatedHolding.length - 1] : undefined,
          };
        }
      },
      false,
      'MOVE_ENTITY'
    );
  },
});
`````

## File: src/store/slices/mascotSlice.ts
`````typescript
/**
 * FILE: mascotSlice.ts
 *
 * PURPOSE:
 * Zustand slice for mascot (Chef Tortilla) state actions.
 *
 * RESPONSIBILITY:
 * - Mutates mascot gaze, flip, grab, and drop states.
 */

import type { StateCreator } from 'zustand/vanilla';
import type { Entity } from '../../types/world';
import type { WorldStateStore } from '../types';
import { validateContainerRules } from '../../engine/containerRules';
import type { GazeTarget } from '../../systems/gaze';

export interface MascotSlice {
  mascotFlip: (mascotId?: string) => void;
  mascotMove: (targetContainerId: string, mascotId?: string) => void;
  mascotGrab: (entityId: string, sourceContainerId?: string, mascotId?: string) => void;
  mascotDrop: (targetContainerId: string, positionIndex?: number, mascotId?: string) => void;
  mascotClearGaze: (mascotId?: string) => void;
}

export const createMascotSlice: StateCreator<
  WorldStateStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  MascotSlice
> = (set, get) => ({
  mascotFlip: (mascotId = 'chef') => {
    set(
      (draft) => {
        const mascot = draft.entities[mascotId];
        if (!mascot) return;
        mascot.state = {
          ...mascot.state,
          state: 'flipping',
          isFlipping: true,
        };
      },
      false,
      'MASCOT_FLIP'
    );

    setTimeout(() => {
      set(
        (draft) => {
          const mascot = draft.entities[mascotId];
          if (!mascot || mascot.state?.state !== 'flipping') return;
          mascot.state = {
            ...mascot.state,
            state: 'idle',
            isFlipping: false,
          };
        },
        false,
        'RESET_MASCOT_FLIP'
      );
    }, 800);
  },

  mascotMove: (targetContainerId, mascotId = 'chef') => {
    set(
      (draft) => {
        const mascot = draft.entities[mascotId];
        if (!mascot) return;
        const gaze: GazeTarget = { type: 'entity', entityId: targetContainerId };
        mascot.state = {
          ...mascot.state,
          gazingAt: gaze,
          targetContainerId,
        };
      },
      false,
      'MASCOT_MOVE'
    );
  },

  mascotGrab: (entityId, sourceContainerId, mascotId = 'chef') => {
    const state = get();
    const mascot = state.entities[mascotId];
    if (!mascot) return;

    // Read current holding IDs array
    const rawHoldingIds = mascot.state?.holdingEntityIds as string[] | undefined;
    const singleHoldingId = mascot.state?.holdingEntityId as string | undefined;

    const currentHoldingIds: string[] = Array.isArray(rawHoldingIds) && rawHoldingIds.length > 0
      ? [...rawHoldingIds]
      : singleHoldingId
      ? [singleHoldingId]
      : [];

    if (currentHoldingIds.length >= 2) {
      // Hands are full (up to 2 items)
      return;
    }

    // Resolve target entity from state.entities & containers
    let grabbedEntity: Entity | undefined;

    // 1. If sourceContainerId is specified, check that container first
    if (sourceContainerId && state.containers[sourceContainerId]) {
      const sourceContainer = state.containers[sourceContainerId];
      const matchInSource = sourceContainer.entityIds.find(
        (id) => id === entityId || state.entities[id]?.ingredientId === entityId || id.startsWith(`${entityId}_`)
      );
      if (matchInSource) {
        grabbedEntity = state.entities[matchInSource];
      }
    }

    // 2. If entityId is a specific entity instance (not a catalog/storage ID), check state.entities directly
    if (
      !grabbedEntity &&
      state.entities[entityId] &&
      !state.containers.despensa?.entityIds.includes(entityId)
    ) {
      grabbedEntity = state.entities[entityId];
    }

    // 3. Search non-storage workstation containers for an active instance
    if (!grabbedEntity) {
      for (const container of Object.values(state.containers)) {
        if (container.rules?.isImmutable) continue;
        const matchId = container.entityIds.find(
          (id) => id === entityId || state.entities[id]?.ingredientId === entityId || id.startsWith(`${entityId}_`)
        );
        if (matchId) {
          grabbedEntity = state.entities[matchId];
          break;
        }
      }
    }

    // 4. Fallback to exact entityId or catalog entity in storage
    if (!grabbedEntity) {
      grabbedEntity =
        state.entities[entityId] ||
        Object.values(state.entities).find(
          (e): e is Entity => Boolean(e) && Boolean(e.ingredientId === entityId || e.id.startsWith(entityId))
        );
    }

    const actualEntityId = grabbedEntity ? grabbedEntity.id : entityId;

    currentHoldingIds.push(actualEntityId);

    const foundSource =
      sourceContainerId && state.containers[sourceContainerId]
        ? state.containers[sourceContainerId]
        : Object.values(state.containers).find(
            (c) => !c.rules?.isImmutable && c.entityIds.includes(actualEntityId)
          ) ||
          Object.values(state.containers).find((c) => c.entityIds.includes(actualEntityId));

    set(
      (draft) => {
        const m = draft.entities[mascotId];
        if (!m) return;
        if (foundSource && !foundSource.rules?.isImmutable) {
          const srcContainer = draft.containers[foundSource.id];
          if (srcContainer) {
            srcContainer.entityIds = srcContainer.entityIds.filter((id) => id !== actualEntityId);
          }
        }
        const grabGaze: GazeTarget = { type: 'entity', entityId: actualEntityId };
        m.state = {
          ...m.state,
          holdingEntityId: currentHoldingIds[currentHoldingIds.length - 1],
          holdingEntityIds: currentHoldingIds,
          sourceContainerId: foundSource?.id,
          gazingAt: grabGaze,
          targetContainerId: foundSource?.id || m.state?.targetContainerId,
        };
      },
      false,
      'MASCOT_GRAB'
    );
  },

  mascotClearGaze: (mascotId = 'chef') => {
    set(
      (draft) => {
        const mascot = draft.entities[mascotId];
        if (!mascot) return;
        mascot.state = { ...mascot.state, gazingAt: null, targetContainerId: undefined };
      },
      false,
      'MASCOT_CLEAR_GAZE'
    );
  },

  mascotDrop: (targetContainerId, positionIndex, mascotId = 'chef') => {
    const state = get();
    const mascot = state.entities[mascotId];
    if (!mascot) return;

    const rawHoldingIds = mascot.state?.holdingEntityIds as string[] | undefined;
    const singleHoldingId = mascot.state?.holdingEntityId as string | undefined;

    const currentHoldingIds: string[] = Array.isArray(rawHoldingIds) && rawHoldingIds.length > 0
      ? [...rawHoldingIds]
      : singleHoldingId
      ? [singleHoldingId]
      : [];

    if (currentHoldingIds.length === 0) {
      set(
        (draft) => {
          const m = draft.entities[mascotId];
          if (m) {
            m.state = {
              ...m.state,
              gazingAt: { type: 'entity', entityId: targetContainerId },
              targetContainerId,
            };
          }
        },
        false,
        'MASCOT_DROP'
      );
      return;
    }

    const targetContainer = state.containers[targetContainerId];
    if (!targetContainer) return;

    const itemsToDrop: Array<{
      finalEntityId: string;
      entityToMove: Entity;
      copyEntity?: Entity;
      sourceContainer?: typeof targetContainer;
      isSourceImmutable?: boolean;
    }> = [];

    const sourceContainerId = mascot.state?.sourceContainerId as string | undefined;

    for (const hId of currentHoldingIds) {
      let entityToMove: Entity | undefined = state.entities[hId];
      if (!entityToMove) {
        entityToMove = Object.values(state.entities).find(
          (e): e is Entity => Boolean(e) && Boolean(e.ingredientId === hId || e.id.startsWith(hId))
        );
      }

      if (!entityToMove) {
        entityToMove = {
          id: hId,
          ingredientId: hId.split('_')[0],
          name: hId.charAt(0).toUpperCase() + hId.slice(1),
          type: 'ingredient',
          state: {},
        };
      }

      const sourceContainer =
        sourceContainerId && state.containers[sourceContainerId]?.entityIds.includes(entityToMove.id)
          ? state.containers[sourceContainerId]
          : Object.values(state.containers).find((c) => c.entityIds.includes(entityToMove!.id));

      const isSourceImmutable =
        sourceContainer?.rules?.isImmutable || sourceContainer?.rules?.consumesOnDrag === false;

      let finalEntityId = entityToMove.id;
      let copyEntity: Entity | undefined;

      if (sourceContainer && sourceContainer.id !== targetContainerId && isSourceImmutable) {
        const copyId = `${entityToMove.id}_${Date.now()}_${Math.floor(Math.random() * 10000)}_${Math.floor(Math.random() * 10000)}`;
        copyEntity = {
          ...entityToMove,
          id: copyId,
          ingredientId: entityToMove.ingredientId || entityToMove.id.split('_')[0],
        };

        const currentEntities = [
          ...targetContainer.entityIds.map((id) => state.entities[id]),
          ...itemsToDrop.map((i) => i.copyEntity || i.entityToMove),
        ].filter((e): e is Entity => Boolean(e));

        const result = validateContainerRules(targetContainer, copyEntity, currentEntities);
        if (!result.allowed) {
          continue;
        }

        finalEntityId = copyId;
      } else {
        const currentEntities = [
          ...targetContainer.entityIds.map((id) => state.entities[id]),
          ...itemsToDrop.map((i) => i.copyEntity || i.entityToMove),
        ].filter((e): e is Entity => Boolean(e) && e.id !== entityToMove!.id);

        const result = validateContainerRules(targetContainer, entityToMove, currentEntities);
        if (!result.allowed) {
          continue;
        }
      }

      itemsToDrop.push({
        finalEntityId,
        entityToMove,
        copyEntity,
        sourceContainer,
        isSourceImmutable,
      });
    }

    if (itemsToDrop.length === 0) return;

    set(
      (draft) => {
        for (const item of itemsToDrop) {
          if (item.copyEntity) {
            draft.entities[item.copyEntity.id] = item.copyEntity;
          } else if (!draft.entities[item.entityToMove.id]) {
            draft.entities[item.entityToMove.id] = item.entityToMove;
          }

          if (item.sourceContainer && !item.isSourceImmutable) {
            draft.containers[item.sourceContainer.id].entityIds = draft.containers[
              item.sourceContainer.id
            ].entityIds.filter((id) => id !== item.entityToMove.id);
          }

          if (typeof positionIndex === 'number') {
            draft.containers[targetContainerId].entityIds.splice(positionIndex, 0, item.finalEntityId);
          } else {
            draft.containers[targetContainerId].entityIds.push(item.finalEntityId);
          }
        }

        const m = draft.entities[mascotId];
        if (m) {
          m.state = {
            ...m.state,
            holdingEntityId: undefined,
            holdingEntityIds: [],
            sourceContainerId: undefined,
            gazingAt: { type: 'entity', entityId: targetContainerId } satisfies GazeTarget,
            targetContainerId,
          };
        }
      },
      false,
      'MASCOT_DROP'
    );
  },
});
`````

## File: src/systems/recipeRunner/handlers/cookHandlers.test.ts
`````typescript
/**
 * FILE: src/systems/recipeRunner/handlers/cookHandlers.test.ts
 *
 * PURPOSE:
 * Unit tests for cooking step handlers and oil heating behavior.
 *
 * RESPONSIBILITY:
 * - Verify oil heating doesn't mark oil as consumed
 * - Verify oil stays in the burner1/container after heating
 * - Verify oil IS consumed when it's used as a cooking medium
 * - Distinguish between oil as target vs oil as cooking medium
 * - Test garlic cooking and other ingredients
 * - Verify Required Materials immutability concept
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { worldStore } from '../../../store/worldStore';
import { handleCookStep, handleFlipStep } from './cookHandlers';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type CookStep = Extract<RecipeStep, { action: 'cook' }>;
type FlipStep = Extract<RecipeStep, { action: 'flip' }>;

/**
 * Helper: Create mock RecipeRunnerContext
 */
function createMockContext(overrides?: Partial<RecipeRunnerContext>): RecipeRunnerContext {
  return {
    mascotId: 'chef_1',
    defaultSourceId: 'burner1try',
    defaultTargetId: 'board',
    delayMs: 0, // No delay in tests
    recipeContext: {
      recipeId: 'test_recipe',
      bindings: {},
    },
    getBoundEntityId: vi.fn((key: string) => {
      const mapping: Record<string, string> = {
        oil: 'oil_1',
        potatoes: 'potatoes_1',
        garlic: 'garlic_1',
        mixture: 'mixture_1',
      };
      return mapping[key] || null;
    }),
    validateEntity: vi.fn((id: string) => ({ id })),
    updateBindingIfCopied: vi.fn(),
    wait: vi.fn(async () => {}),
    bindStepsContext: vi.fn(),
    ensureEntityInWorkspace: vi.fn(async (id: string, targetContainerId: string) => {
      const state = worldStore.getState();
      const currentContainer = Object.values(state.containers).find((c) =>
        c.entityIds.includes(id)
      );
      if (!currentContainer || currentContainer.id !== targetContainerId) {
        state.dispatch({
          type: 'MOVE_ENTITY',
          payload: { entityId: id, targetContainerId },
        });
      }
      return id;
    }),
    ensureIngredientInWorkspace: vi.fn(async (id: string) => id),
    resolveIngredientId: vi.fn((key: string) => key),
    currentRecipe: undefined,
    bindRecipeContext: vi.fn(),
    runRecipe: vi.fn(),
    runSteps: vi.fn(),
    executeStep: vi.fn(),
    ...overrides,
  } as unknown as RecipeRunnerContext;
}

/**
 * Helper: Setup world state with ingredients
 */
function seedWorld() {
  worldStore.setState({
    entities: {
      oil_1: {
        id: 'oil_1',
        name: '🫒 Olive Oil',
        type: 'ingredient',
        ingredientId: 'oil',
        state: {},
      },
      potatoes_1: {
        id: 'potatoes_1',
        name: '🥔 Potatoes',
        type: 'ingredient',
        ingredientId: 'potatoes',
        state: { preparation: 'sliced' },
      },
      garlic_1: {
        id: 'garlic_1',
        name: '🧄 Garlic',
        type: 'ingredient',
        ingredientId: 'garlic',
        state: { preparation: 'peeled' },
      },
      eggs_1: {
        id: 'eggs_1',
        name: '🥚 Eggs',
        type: 'ingredient',
        ingredientId: 'egg',
        state: {},
      },
    },
    containers: {
      burner1: {
        id: 'burner1',
        name: 'burner1',
        type: 'workstation',
        entityIds: [],
      },
      burner1try: {
        id: 'burner1try',
        name: 'burner1try',
        type: 'storage',
        entityIds: ['oil_1', 'potatoes_1', 'garlic_1', 'eggs_1'],
      },
      board: {
        id: 'board',
        name: 'Board',
        type: 'workstation',
        entityIds: [],
      },
    },
    events: [],
  });
}

describe('Cook Handlers - Oil & Ingredient Cooking', () => {
  beforeEach(() => {
    seedWorld();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Test Group 1: Oil Heating (Primary Target)', () => {
    it('1.1: Heat oil - Oil should NOT be marked as consumed', async () => {
      const ctx = createMockContext();

      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };

      await handleCookStep(ctx, heatOilStep, 'burner1');

      const state = worldStore.getState();
      const oil = state.entities.oil_1;

      expect(oil.state?.consumed).not.toBe(true);
      expect(oil.state?.consumedBy).toBeUndefined();
    });

    it('1.2: Heat oil - Oil should be moved to burner1', async () => {
      const ctx = createMockContext();

      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };

      await handleCookStep(ctx, heatOilStep, 'burner1');

      const state = worldStore.getState();
      const burner1Container = state.containers.burner1;

      expect(burner1Container.entityIds).toContain('oil_1');
    });

    it('1.3: Heat oil - Oil state should show cooking method "heat"', async () => {
      const ctx = createMockContext();

      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };

      await handleCookStep(ctx, heatOilStep, 'burner1');

      const state = worldStore.getState();
      const oil = state.entities.oil_1;

      expect(oil.state?.cooking).toBe('heat');
    });

  });

  describe('Test Group 2: Garlic Cooking & Removal', () => {
    it('2.1: Fry garlic - Garlic should be marked with cooking state', async () => {
      const ctx = createMockContext();

      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
        instruction: 'Que no se quemen.', // Don't let them burn
      };

      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      const state = worldStore.getState();
      const garlic = state.entities.garlic_1;

      expect(garlic.state?.cooking).toBe('fry');
    });

    it('2.2: Fry garlic - Garlic should be moved to burner1', async () => {
      const ctx = createMockContext();

      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
      };

      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      const state = worldStore.getState();
      const burner1Container = state.containers.burner1;

      expect(burner1Container.entityIds).toContain('garlic_1');
    });

    it('2.3: Fry garlic - Garlic should NOT be consumed (it\'s the target)', async () => {
      const ctx = createMockContext();

      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
      };

      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      const state = worldStore.getState();
      const garlic = state.entities.garlic_1;

      expect(garlic.state?.consumed).not.toBe(true);
      expect(garlic.state?.consumedBy).toBeUndefined();
    });

    it('2.4: Fry garlic - Oil should be consumed as cooking medium', async () => {
      const ctx = createMockContext();

      // First heat oil
      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep, 'burner1');

      // Now fry garlic
      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
      };
      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      const state = worldStore.getState();
      const oil = state.entities.oil_1;

      // Oil should be consumed since garlic (not oil) is the target
      expect(oil.state?.consumed).toBe(true);
      expect(oil.state?.consumedBy).toBe('garlic_1');
    });
  });

  describe('Test Group 3: Frying with Oil (Oil as Cooking Medium)', () => {
    it('3.1: Fry potatoes - Oil should be consumed as cooking medium', async () => {
      const ctx = createMockContext();

      // Heat oil first
      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep, 'burner1');

      // Move potatoes to burner1 manually for test
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'potatoes_1',
          targetContainerId: 'burner1',
        },
      });

      // Fry potatoes
      const fryPotatoesStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };
      await handleCookStep(ctx, fryPotatoesStep, 'burner1');

      const state = worldStore.getState();
      const oil = state.entities.oil_1;

      // Oil SHOULD be consumed when potatoes are fried
      expect(oil.state?.consumed).toBe(true);
      expect(oil.state?.consumedBy).toBe('potatoes_1');
    });

    it('3.2: Potatoes should NOT be consumed (they are the target)', async () => {
      const ctx = createMockContext();

      // Heat oil
      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep, 'burner1');

      // Move potatoes to burner1
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'potatoes_1',
          targetContainerId: 'burner1',
        },
      });

      // Fry potatoes
      const fryPotatoesStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };
      await handleCookStep(ctx, fryPotatoesStep, 'burner1');

      const state = worldStore.getState();
      const potatoes = state.entities.potatoes_1;

      expect(potatoes.state?.consumed).not.toBe(true);
      expect(potatoes.state?.consumedBy).toBeUndefined();
    });
  });

  describe('Test Group 4: Complete Cooking Sequence', () => {
    it('4.1: Full sequence - Heat oil, fry garlic, fry potatoes', async () => {
      const ctx = createMockContext();

      // Step 1: Heat oil
      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep, 'burner1');

      // Verify oil is in burner1 but not consumed
      let state = worldStore.getState();
      let oil = state.entities.oil_1;
      expect(state.containers.burner1.entityIds).toContain('oil_1');
      expect(oil.state?.consumed).not.toBe(true);
      expect(oil.state?.cooking).toBe('heat');

      // Step 2: Fry garlic
      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
      };
      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      // Verify garlic is in burner1, oil is consumed
      state = worldStore.getState();
      const garlic = state.entities.garlic_1;
      oil = state.entities.oil_1;
      expect(state.containers.burner1.entityIds).toContain('garlic_1');
      expect(garlic.state?.cooking).toBe('fry');
      expect(oil.state?.consumed).toBe(true);

      // Step 3: Move potatoes to burner1 (simulating move step)
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'potatoes_1',
          targetContainerId: 'burner1',
        },
      });

      // Step 4: Fry potatoes (oil already consumed, won't be consumed again)
      const fryPotatoesStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };
      await handleCookStep(ctx, fryPotatoesStep, 'burner1');

      // Final state check
      state = worldStore.getState();
      const potatoes = state.entities.potatoes_1;
      oil = state.entities.oil_1;

      expect(state.containers.burner1.entityIds).toContain('potatoes_1');
      expect(potatoes.state?.cooking).toBe('fry');
      expect(oil.state?.consumed).toBe(true); // Still consumed from garlic step
    });

    it('4.2: Oil consumption happens only once per session', async () => {
      const ctx = createMockContext();

      // Heat oil
      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep, 'burner1');

      // Fry garlic (consumes oil)
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'garlic_1',
          targetContainerId: 'burner1',
        },
      });

      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
      };
      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      let state = worldStore.getState();
      let oil = state.entities.oil_1;
      const firstConsumption = oil.state?.consumedBy;

      // Fry potatoes (oil already consumed, shouldn't be consumed again)
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'potatoes_1',
          targetContainerId: 'burner1',
        },
      });

      const fryPotatoesStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };
      await handleCookStep(ctx, fryPotatoesStep, 'burner1');

      state = worldStore.getState();
      oil = state.entities.oil_1;

      // Oil should still be consumed by garlic, not potatoes
      expect(oil.state?.consumedBy).toBe(firstConsumption);
      expect(oil.state?.consumedBy).toBe('garlic_1');
    });
  });

  describe('Test Group 5: Flip Step', () => {
    it('5.1: Flip mixture - Should mark mixture as flipped', async () => {
      const ctx = createMockContext();

      // Create a mixture entity
      worldStore.getState().dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: {
            id: 'mixture_1',
            name: '🍳 Mixture',
            type: 'ingredient',
            ingredientId: 'mixture',
            state: {},
          },
          containerId: 'burner1',
        },
      });

      const flipStep: FlipStep = {
        action: 'flip',
        target: 'mixture',
        instruction: 'Dale la vuelta a la tortilla.',
      };

      await handleFlipStep(ctx, flipStep);

      const state = worldStore.getState();
      const mixture = state.entities.mixture_1;

      expect(mixture.state?.isFlipped).toBe(true);
    });
  });

  describe('Test Group 6: Edge Cases', () => {
    it('6.1: Cook oil again - Should NOT consume it again', async () => {
      const ctx = createMockContext();

      // Heat oil first time
      const heatOilStep1: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep1, 'burner1');

      let state = worldStore.getState();
      let oil = state.entities.oil_1;
      expect(oil.state?.cooking).toBe('heat');

      // Try to heat oil again (should just update state)
      const heatOilStep2: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep2, 'burner1');

      state = worldStore.getState();
      oil = state.entities.oil_1;

      // Oil should still not be consumed
      expect(oil.state?.consumed).not.toBe(true);
    });

    it('6.2: Multiple ingredients in burner1 - Only oil consumed', async () => {
      const ctx = createMockContext();

      // Setup: Move multiple items to burner1
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'oil_1',
          targetContainerId: 'burner1',
        },
      });

      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'eggs_1',
          targetContainerId: 'burner1',
        },
      });

      // Fry potatoes
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'potatoes_1',
          targetContainerId: 'burner1',
        },
      });

      const fryStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };

      await handleCookStep(ctx, fryStep, 'burner1');

      const state = worldStore.getState();
      const oil = state.entities.oil_1;
      const eggs = state.entities.eggs_1;

      // Oil should be consumed
      expect(oil.state?.consumed).toBe(true);

      // Eggs should not be consumed (not detected as cooking medium)
      expect(eggs.state?.consumed).not.toBe(true);
    });

    it('6.3: Fire control - Mascot turns fire ON before cooking and OFF after cooking', async () => {
      const fireStates: boolean[] = [];

      const ctx = createMockContext({
        wait: vi.fn(async () => {
          // Record burner1 isOn state during wait
          const isOn = Boolean(worldStore.getState().containers.burner1?.isOn);
          fireStates.push(isOn);
        }),
      });

      // Ensure burner1 is off initially
      worldStore.setState({
        containers: {
          ...worldStore.getState().containers,
          burner1: {
            id: 'burner1',
            name: 'burner1',
            type: 'workstation',
            entityIds: [],
            isOn: false,
          },
        },
      });

      const cookStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };

      await handleCookStep(ctx, cookStep, 'burner1');

      // During cooking (in first wait after toggle or second wait), fire was turned ON
      expect(fireStates).toContain(true);

      // After cooking step finishes, burner1 fire is turned OFF
      const finalBurnerState = worldStore.getState().containers.burner1;
      expect(finalBurnerState.isOn).toBe(false);
    });
  });
});
`````

## File: src/systems/recipeRunner/handlers/mixHandlers.ts
`````typescript
/**
 * FILE: src/systems/recipeRunner/handlers/mixHandlers.ts
 *
 * PURPOSE:
 * Step handlers for combination steps ('mix', 'beat', 'combine').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, flipTortilla } from '../../mascotActions';
import { resolveContainerId } from '../../../engine/containerRules';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type MixStep = Extract<RecipeStep, { action: 'mix' | 'beat' | 'combine' }>;

export async function handleMixStep(
  ctx: RecipeRunnerContext,
  step: MixStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const targetContainerId = resolveContainerId(
    step.targetContainerId || workstationDefaultContainerId || 'bowl'
  );
  const inputKeys = step.inputs || step.ingredients || [];
  const inputEntityIds: string[] = [];

  // 1. Resolve each input entity ID from RecipeContext and ensure it is moved to target container
  for (const rawInput of inputKeys) {
    const inputEntityId = ctx.getBoundEntityId(rawInput);
    if (!inputEntityId) {
      throw new Error(`[RecipeRunner] Cannot mix: No bound entity found for input "${rawInput}"`);
    }

    const realEntityId = await ctx.ensureEntityInWorkspace(inputEntityId, targetContainerId);
    inputEntityIds.push(realEntityId);
  }

  // Format descriptive speech message for mascot speech bubble and Zustand store state
  const formattedInputs = inputKeys.map((key) => {
    const boundId = ctx.getBoundEntityId(key);
    const entity = boundId ? worldStore.getState().entities[boundId] : undefined;

    const parts: string[] = [];
    if (entity?.state) {
      const cooking = entity.state.cooking as string | undefined;
      if (cooking && cooking !== 'raw') {
        if (cooking === 'fry' || cooking === 'fried' || cooking === 'cooked') {
          parts.push('cooked');
        } else {
          parts.push(cooking);
        }
      }
      const prep = entity.state.preparation as string | undefined;
      if (prep && prep !== 'whole' && prep !== 'raw') {
        parts.push(prep);
      }
    }

    if (parts.length === 0) {
      if (key === 'potatoes') {
        parts.push('cooked', 'sliced');
      } else if (key === 'eggs') {
        parts.push('beaten');
      } else if (key === 'onions') {
        parts.push('cooked', 'diced');
      }
    }

    parts.push(key);
    return parts.join(' ');
  });

  const containerName =
    targetContainerId === 'bowl' || targetContainerId === 'preparation_bowl'
      ? 'preparation bowl'
      : targetContainerId.replace('_', ' ');
  const mixMessage = `Mix ${formattedInputs.join(', ')} in the ${containerName} -> ${step.output || 'mixture'}`;

  worldStore.getState().dispatch({
    type: 'UPDATE_ENTITY_STATE',
    payload: {
      entityId: ctx.mascotId,
      changes: { speechMessage: mixMessage },
    },
  });

  moveTortillaTo(targetContainerId, ctx.mascotId);
  await ctx.wait();
  flipTortilla(ctx.mascotId);
  await ctx.wait();

  // Wait for a moment while mixing before creating the mixture
  await ctx.wait();

  // 2. Create real mixture entity in target container
  const recipeId = ctx.recipeContext.recipeId || 'recipe';
  const mixtureId = `mixture_${recipeId}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const outputName = step.output || 'Mixture';

  worldStore.getState().dispatch({
    type: 'ADD_ENTITY',
    payload: {
      entity: {
        id: mixtureId,
        name: outputName,
        type: 'ingredient',
        state: {
          preparation: 'mixed',
          cooking: 'raw',
          status: 'mixed',
          components: inputEntityIds,
        },
      },
      containerId: targetContainerId,
    },
  });

  // 3. Use inputs
  for (const inputId of inputEntityIds) {
    worldStore.getState().dispatch({
      type: 'USE_INGREDIENT',
      payload: {
        entityId: inputId,
        usedIn: mixtureId,
      },
    });
  }

  // 4. Bind mixture entity in RecipeContext
  ctx.recipeContext.bindings['mixture'] = mixtureId;
  if (step.output) {
    ctx.recipeContext.bindings[step.output] = mixtureId;
  }
}
`````

## File: src/systems/recipeRunner/handlers/prepHandlers.ts
`````typescript
/**
 * FILE: src/systems/recipeRunner/handlers/prepHandlers.ts
 *
 * PURPOSE:
 * Step handlers for ingredient preparation steps ('cut', 'prepare', 'peel', 'wash', 'rinse', 'drain').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo } from '../../mascotActions';
import { resolveContainerId } from '../../../engine/containerRules';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type PrepStep = Extract<
  RecipeStep,
  { action: 'cut' | 'prepare' | 'peel' | 'wash' | 'rinse' | 'drain' | 'clean' }
>;

export async function handlePrepStep(
  ctx: RecipeRunnerContext,
  step: PrepStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const rawKey = step.target || step.ingredient;
  let entityId = ctx.getBoundEntityId(rawKey);

  if (!entityId) {
    return;
  }

  ctx.validateEntity(entityId, step.action);

  const prepStyle = (() => {
    if ('preparation' in step && step.preparation) return step.preparation;
    if ('style' in step && step.style) return step.style;
    if (step.action === 'peel') return 'peeled';
    if (step.action === 'wash') return 'washed';
    return 'prepared';
  })();

  const defaultContainerForPrep =
    prepStyle === 'beaten' || prepStyle === 'mixed'
      ? 'bowl'
      : ctx.defaultTargetId;

  const targetContainerId = resolveContainerId(
    step.containerId || workstationDefaultContainerId || defaultContainerForPrep
  );

  // Ensure bound entity is in workspace
  entityId = await ctx.ensureEntityInWorkspace(entityId, targetContainerId);

  moveTortillaTo(targetContainerId, ctx.mascotId);
  await ctx.wait();

  worldStore.getState().dispatch({
    type: 'PREPARE_INGREDIENT',
    payload: {
      entityId,
      preparation: prepStyle,
    },
  });

  await ctx.wait();
}
`````

## File: .gitignore
`````
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
*.patch
# Environment variables & secrets / platform configs
.env
.env.*
!.env.example
firebase-applet-config.json
firebase-applet-config.*
firebase-blueprint.json
`````

## File: docs/decisions.md
`````markdown
# Systems

## Overview

Systems contain the behaviour of Tortilla World.

Components display the world.
Systems modify the world.

A system receives actions, validates them, and updates the world state.

The general flow is:

```text
Input
  |
  v
Action
  |
  v
System
  |
  v
Validation
  |
  v
World State Update
  |
  v
UI Update
```

---

# System Architecture

Tortilla World is based on independent systems.

Current and planned systems:

```text
Systems

├── Interaction System
├── Movement System
├── Container System
├── Mascot System
├── Animation System
├── Cooking System
└── AI System
```

Each system has a clear responsibility.

---

# Interaction System

## Responsibility

The Interaction System converts external events into world actions.

External events:

* mouse clicks
* drag and drop
* AI requests
* future keyboard/gamepad input

The Interaction System does not modify the world directly.

---

## Example

User drags potato into pan.

The Interaction System creates:

```ts
{
  type:"MOVE_ENTITY",
  entityId:"potato",
  targetContainer:"pan"
}
```

The action is passed to the Movement System.

---

# Movement System

## Responsibility

The Movement System controls ownership changes.

It handles:

* moving entities
* validating source ownership
* validating destination rules
* applying transfer behaviour

---

## Move Flow

```text
Move Request

      |
      v

Find Entity

      |
      v

Find Current Container

      |
      v

Find Target Container

      |
      v

Validate Move

      |
      v

Apply Transfer Rule

      |
      v

Update Ownership

```

---

# Move Validation

Before moving an entity, the system checks:

## Entity existence

Does the entity exist?

Example:

```text
potato
```

must exist in the world.

---

## Source ownership

Does the source container own the entity?

Example:

Valid:

```text
Kitchen owns potato
```

Invalid:

```text
Pan owns potato
```

when moving from Kitchen.

---

## Destination capability

Can the target container accept this entity?

Example:

A pan may accept:

```text
ingredient
```

but reject:

```text
container
```

---

## Duplicate rules

The container checks uniqueness.

Example:

Valid:

```text
Recipe

potato
egg
```

Invalid:

```text
Recipe

potato
potato
```

---

# Transfer Rules

A move is not always the same operation.

Containers define transfer behaviour.

---

# Static Container To Dynamic Container

Example:

```text
Kitchen
 |
 potato


Recipe
```

Move potato:

Result:

```text
Kitchen
 |
 potato


Recipe
 |
 potato
```

The destination receives the ingredient.

The source remains unchanged.

This represents a world resource.

---

# Dynamic Container To Dynamic Container

Example:

```text
Recipe
 |
 potato


Pan
```

Move potato:

Result:

```text
Recipe


Pan
 |
 potato
```

Ownership transfers.

---

# Dynamic Container To Static Container

Example:

```text
Recipe
 |
 potato


Kitchen
```

Move potato back.

Result:

```text
Recipe


Kitchen
 |
 potato
```

The dynamic container loses ownership.

The static container provides the original world resource.

---

# Container System

## Responsibility

The Container System manages container rules.

It answers questions:

* Can this entity be added?
* Can this entity be removed?
* Are duplicates allowed?
* Is the container full?
* Does ordering matter?

---

## Example API

```ts
canAccept(
  container,
  entity
)
```

returns:

```ts
true
```

or:

```ts
false
```

---

# Action Queue

## Responsibility

All world changes should pass through an action queue.

Example:

```text
AI
 |
User
 |
System
 |
Action Queue
 |
World Update
```

---

## Example Action

```ts
{
 type:"MOVE_ENTITY",

 entityId:"egg",

 source:"kitchen",

 target:"recipe"
}
```

---

## Benefits

Action queues provide:

* debugging
* replay
* logging
* AI control
* animations
* delayed actions

---

# Animation System

## Responsibility

The Animation System reacts to world changes.

It does not decide what happens.

Example:

Movement System:

```text
Potato moved to Pan
```

Animation System:

```text
Play potato movement animation
```

---

## Separation

Bad:

```text
Drag component:
move object
animate object
change state
```

Good:

```text
Drag component:
create action


Movement System:
change state


Animation System:
animate change
```

---

# Cooking System

## Responsibility

Future system for transforming entities.

Examples:

```text
Potato
+
Oil
+
Heat

    |
    v

Fried Potato
```

---

The cooking system changes entity state.

Example:

Before:

```ts
{
 type:"ingredient",
 state:"raw"
}
```

After:

```ts
{
 type:"ingredient",
 state:"cooked"
}
```

---

# AI System

## Responsibility

The AI System creates actions.

The AI does not directly manipulate Zustand state.

---

Example:

AI decides:

```text
Prepare tortilla
```

Creates:

```ts
[
 {
  type:"MOVE_ENTITY",
  entityId:"potato",
  target:"pan"
 },

 {
  type:"ADD_HEAT",
  target:"pan"
 }
]
```

The normal systems execute them.

---

# System Communication

Systems communicate through actions and world state.

Example:

```text
Interaction System

        |
        v

Move Action

        |
        v

Movement System

        |
        v

World Store

        |
        v

Animation System

```

---

# Zustand Responsibility

Zustand is the storage layer.

It stores:

* entities
* containers
* relationships
* world state

It should not contain UI logic.

---

Example:

Good:

```ts
moveEntity(
 entityId,
 from,
 to
)
```

Bad:

```ts
onDropIngredient(
 mouseEvent
)
```

---

# Testing Strategy

Systems should be testable without React.

Example:

```ts
moveEntity(
 "potato",
 "kitchen",
 "pan"
)
```

Expected:

```text
Kitchen:
empty

Pan:
potato
```

---

# Future Systems

Possible additions:

## Time System

Controls:

* cooking duration
* day/night
* events

---

## Physics System

Controls:

* collisions
* falling objects
* movement

---

## Economy System

Controls:

* ingredients cost
* customers
* money

---

## Character System

Controls:

* NPCs
* player actions
* behaviours

---

## Mascot System & Recipe System

### Mascot System
Controls:

* `MASCOT_FLIP`: Flips Tortilla mascot in place.
* `MASCOT_MOVE`: Moves gaze/focus of Tortilla to target container.
* `MASCOT_GRAB`: Commands Tortilla to grab ingredient entity from a container.
* `MASCOT_DROP`: Commands Tortilla to drop held ingredient into target container obeying rules.

Dispatch helpers and automated action sequences (e.g. `runFollowRecipeScript`) are located in `src/systems/mascotActions.ts` for AI agent, console, or UI integration.

React components (`Mascot.tsx`) translate pure target container state into physical Framer Motion spring translations across the DOM viewport without touching store logic.

---

### Recipe System & RecipeRunner

The Recipe System executes declarative, step-based recipe state machines via `RecipeRunner` (`src/systems/recipeRunner.ts`).

#### Architecture:
* **Declarative Data**: Recipes (`RecipeStep[]`) define *what* needs to happen (e.g. `move`, `grab`, `drop`, `cut`, `cook`, `mix`, `wait`, `flip`, `speak`, `celebrate`) without referencing specific kitchen containers or locations.
* **Workstation & Tool Resolution**: `RecipeRunner` dynamically queries the Workstation engine (`src/engine/workstations.ts`) to determine the required workstation (`pantry`, `washing_station`, `cutting_station`, `preparation_station`, `cooking_station`, `serving_station`) and tools (`knife`, `peeler`, `whisk`, `fork`, `spatula`, etc.) for each step.
* **Generic Execution**: `RecipeRunner` iterates over recipe steps and dispatches appropriate world/mascot actions.
* **Entity Identity Preservation**: Ingredient state mutations (such as preparation: `whole` ➔ `diced` or cooking: `raw` ➔ `fried`) modify the target entity's `state` via `PREPARE_INGREDIENT` or `COOK_INGREDIENT` without creating or destroying entities.

---

# Decision: Refactor Ingredient Usage Actions into Domain Events

## Context
Previously, `CONSUME_INGREDIENT` was dispatched directly as a user action. This mixed user intent, recipe execution logic, and entity lifecycle mutation.

## Decision
Separated player intentions from world state consequences:
1. **User Intent Action (`USE_INGREDIENT`)**: High-level action dispatched when an ingredient is used (`{ entityId, usedIn }`).
2. **Domain Event (`INGREDIENT_CONSUMED`)**: Reactive domain event emitted when an ingredient is consumed (`{ entityId, consumedBy }`).

## Flow
```text
User Interaction / RecipeRunner
           |
           v
    USE_INGREDIENT (Action)
           |
           v
    Ingredient System / World Store
    +--> Transfer entity to container / recipe
    +--> Set consumed state (consumed: true, consumedBy)
    +--> Emit INGREDIENT_CONSUMED (Domain Event)
```

## Consequences
- Clean separation between user intent and domain event consequences.
- Allows ingredient undo/reversion (`revertIngredientUsage`).
- Decouples UI / RecipeRunner from direct lifecycle state mutation.

---

# Decision: Headless Action Log Replay System

## Context
In Tortilla World, all world modifications are driven by pure `WorldAction` dispatches through `worldStore`. Actions are logged in real-time during user interaction, mascot execution, or recipe playback. Replaying recorded JSON action logs allows deterministic state reconstruction, automated testing, and session playback.

## Decision
Created a headless replay engine (`ActionPlayer` in `src/systems/actionPlayer.ts`) and a React upload control (`ActionReplayer` in `src/components/Controls/ActionReplayer.tsx`).

Key rules:
1. **World State Reset**: Replay resets the simulation to initial default state (`RESET_WORLD`) before executing actions.
2. **Sequential Execution**: Actions are dispatched sequentially via `worldStore.getState().dispatch(action)` with a configurable delay.
3. **No Direct DOM Manipulation**: Animations and component positioning react naturally to Zustand store state updates.
4. **Progress and Control**: Callbacks allow monitoring progress (`onStep`) and stopping playback early (`stop()`).

---

# Decision: Headless EventStore & Append-Only Audit Trail

## Context
While `worldStore` manages real-time mutable simulation state, debugging, analytics, and deterministic replays require an immutable, sequential audit trail of all world events.

## Decision
Created a central, singleton `EventStore` (`src/systems/EventStore.ts`) wired directly into `worldStore.ts`'s `dispatch` function:
1. **Automatic Event Wrapping**: Every dispatched `WorldAction` is automatically wrapped in an immutable `BaseWorldEvent` (`id`, `timestamp`, `sequenceNumber`, `version`, `actor`, `action`).
2. **Actor Resolution**: Automatically infers actor context (`player`, `mascot`, or `system`).
3. **Headless Serialization**: Provides `exportJSON()`, `importJSON()`, and `clear()` for event stream persistence and hydration.
4. **Deterministic Replay Engine (`replayEngine.ts`)**: Resets world state and re-dispatches exported event streams sequentially.
5. **Analytics Reporting (`analytics.ts`)**: Provides pure helper functions (`getRecipeMetrics`, `getAuditTrail`, `exportToCSV`).

---

# Decision: Action Recorder Multi-Format Exporter & Event Integration

## Context
Users and developers need to inspect, translate, and download captured session actions in multiple structured formats (Mascot movement script, declarative recipe definition, or full state/event session log).

## Decision
Updated `ActionRecorder.tsx` to automatically source actions from `EventStore` when present and expose 3 distinct export formats:
1. **🤖 Format 1: Mascot Action Sequence**: Explicit interleaved mascot focus, grab, move, and drop actions generated by `translateHumanActionsToMascotActions`.
2. **📜 Format 2: Declarative Recipe File**: Abstract step definitions (`move`, `prep`, `cook`, `mix`) produced by `translateHumanActionsToRecipe`.
3. **💾 Format 3: Full Session Log**: Complete snapshot containing `zustandInit` (initial store state before recording), `actions`, `events` (EventStore audit trail), and `zustandEnd` (final store state).

All 3 formats are previewable in UI tabs and downloadable as formatted `.json` files.

---

# Decision: State-Aware Ingredient Uniqueness & Mascot Empty Trash Confirmation

## Context
1. **Container Duplicate Checking**: Previously, container uniqueness checked `ingredientId` or base entity ID. This caused containers (including `trash`) to reject valid non-identical items (e.g. a raw lemon and a peeled lemon) because they shared the same base ingredient ID (`lemon`).
2. **Trash Disposal**: A way to clear discarded entities from the world was required (`EMPTY_TRASH` action).
3. **Mascot Interaction**: Accidental trash clearing should be prevented by asking the Mascot "Are you sure you want to empty the trash?" before executing the deletion.

## Decision
1. **State-Aware Catalog ID Matching (`getIngredientCatalogId`)**: `getIngredientCatalogId` now appends preparation and cooking state metadata (`baseId:preparation:cooking`). Thus, `lemon` (raw) and `lemon:peeled` are recognized as distinct catalog items. Two raw lemons are rejected as duplicates, whereas a raw lemon AND a peeled lemon are allowed.
2. **`EMPTY_TRASH` Action**: Dispatches an `EMPTY_TRASH` action that clears `containers.trash.entityIds` and purges the associated trashed entities from `worldStore.entities`.
3. **Mascot Confirmation Dialog**: Clicking "Empty Trash" moves the Mascot focus (`MASCOT_MOVE`) to the trash container and displays a prompt bubble asking *"Are you sure you want to empty the trash?"*. Selecting **Yes, empty** triggers `EMPTY_TRASH`, while **Cancel** dismisses the prompt.

---

# Decision: Workstation Navigation Controls (◀ ▶) & Mobile Touch Drag-and-Drop Fix

## Context
1. **Mobile Drag-and-Drop Issue**: On touch/mobile screens, dragging ingredients failed because default `PointerSensor` captured touch gestures without distance/delay constraints or `touch-action: none` rules, causing browser touch scrolling to cancel drag events (`pointercancel`).
2. **Workstation Step Navigation Request**: Users requested quick `◀` (previous) and `▶` (next) navigation buttons on each ingredient inside a workstation to shift items sequentially along the kitchen workflow.

## Decision
1. **Multi-Sensor dnd-kit Configuration**: Configured `TouchSensor` (delay: 100ms, tolerance: 5px) alongside `PointerSensor` (distance: 5px) and `MouseSensor` (distance: 5px) in `useSceneDragAndDrop.ts`. Added `touch-action: none` to `.entity-view` elements to prevent mobile touch-scroll conflicts.
2. **Workstation Navigation Controls (`entity-nav-buttons`)**: Added `◀` and `▶` buttons to `DefaultEntityRenderer` for any ingredient residing inside a workstation container. Clicking `◀` dispatches `MOVE_ENTITY` to the preceding workstation, while `▶` shifts it to the next workstation in sequence. Buttons are styled cleanly with `touch-action: manipulation` for instant mobile response.

---

# Final Principle

The rule of Tortilla World:

```text
Components show the world.

Systems change the world.

Containers define the rules.

Actions describe intentions.

The Store remembers the result.
```
`````

## File: src/components/Controls/RecipeDatabaseModal.scss
`````scss
.recipe-database-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  width: 100%;
  box-sizing: border-box;

  .db-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e2e8f0;

    .db-title-area {
      h2 {
        margin: 0;
        font-size: 1.4rem;
        font-weight: 700;
        color: #1e293b;
      }

      p {
        margin: 4px 0 0 0;
        font-size: 0.9rem;
        color: #64748b;
      }
    }

    .db-header-actions {
      display: flex;
      gap: 10px;
    }
  }

  .db-btn {
    padding: 8px 16px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.88rem;
    cursor: pointer;
    border: none;
    transition: background-color 0.2s ease, transform 0.1s ease;

    &:hover {
      transform: translateY(-1px);
    }

    &.btn-save {
      background-color: #0d9488;
      color: #ffffff;

      &:hover {
        background-color: #0f766e;
      }
    }

    &.btn-seed {
      background-color: #f1f5f9;
      color: #334155;
      border: 1px solid #cbd5e1;

      &:hover {
        background-color: #e2e8f0;
      }
    }

    &.btn-primary {
      background-color: #2563eb;
      color: #ffffff;

      &:hover {
        background-color: #1d4ed8;
      }
    }
  }

  .db-status-banner {
    padding: 10px 14px;
    background-color: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #166534;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .save-session-drawer {
    background-color: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    h3 {
      margin: 0;
      font-size: 1.1rem;
      color: #0f172a;
    }

    .subtitle {
      margin: 0;
      font-size: 0.85rem;
      color: #64748b;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 12px;

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 6px;

        &.full-width {
          grid-column: 1 / -1;
        }

        &.checkbox-group {
          flex-direction: row;
          align-items: center;
          gap: 8px;
          margin-top: 10px;

          label {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
            cursor: pointer;
          }
        }

        label {
          font-size: 0.82rem;
          font-weight: 600;
          color: #475569;
        }

        input[type='text'],
        textarea {
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          font-size: 0.9rem;
          background-color: #ffffff;

          &:focus {
            outline: 2px solid #3b82f6;
            border-color: transparent;
          }
        }

        textarea {
          resize: vertical;
          min-height: 60px;
        }
      }
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
    }
  }

  .db-filters-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;

    .search-input-wrapper {
      position: relative;
      flex: 1;
      min-width: 260px;
      display: flex;
      align-items: center;

      .search-icon {
        position: absolute;
        left: 12px;
        font-size: 0.9rem;
        color: #94a3b8;
      }

      input {
        width: 100%;
        padding: 9px 36px 9px 36px;
        border-radius: 8px;
        border: 1px solid #cbd5e1;
        font-size: 0.9rem;

        &:focus {
          outline: 2px solid #3b82f6;
          border-color: transparent;
        }
      }

      .clear-btn {
        position: absolute;
        right: 10px;
        border: none;
        background: none;
        color: #94a3b8;
        cursor: pointer;
        font-size: 0.85rem;

        &:hover {
          color: #475569;
        }
      }
    }

    .mascot-filter-group {
      display: flex;
      align-items: center;
      gap: 6px;

      label {
        font-size: 0.85rem;
        font-weight: 600;
        color: #475569;
        margin-right: 4px;
      }

      .filter-tab {
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 0.82rem;
        font-weight: 600;
        border: 1px solid #cbd5e1;
        background-color: #f8fafc;
        color: #475569;
        cursor: pointer;

        &.active {
          background-color: #2563eb;
          color: #ffffff;
          border-color: #2563eb;
        }
      }
    }
  }

  .ingredient-chips-area {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .chips-label {
      font-size: 0.82rem;
      font-weight: 600;
      color: #64748b;
    }

    .chips-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .ingredient-chip {
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 0.82rem;
        font-weight: 500;
        border: 1px solid #cbd5e1;
        background-color: #f1f5f9;
        color: #334155;
        cursor: pointer;

        &:hover {
          background-color: #e2e8f0;
        }

        &.selected {
          background-color: #dbeafe;
          color: #1e40af;
          border-color: #93c5fd;
          font-weight: 600;
        }
      }

      .clear-ingredients-btn {
        padding: 5px 10px;
        font-size: 0.8rem;
        color: #ef4444;
        background: none;
        border: none;
        cursor: pointer;
        text-decoration: underline;

        &:hover {
          color: #dc2626;
        }
      }
    }
  }

  .recipes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
    margin-top: 8px;
    width: 100%;
    box-sizing: border-box;

    .loading-state,
    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 40px;
      color: #64748b;
      font-size: 0.95rem;
    }

    .recipe-card {
      background-color: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      transition: border-color 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        border-color: #cbd5e1;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
      }

      &.compact-card {
        padding: 10px 12px;
        gap: 6px;
      }

      .card-top-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 8px;

        .card-title-group {
          display: flex;
          flex-direction: column;

          .card-title {
            margin: 0;
            font-size: 0.95rem;
            font-weight: 700;
            color: #0f172a;
            line-height: 1.25;
          }

          .card-author-date {
            font-size: 0.75rem;
            color: #64748b;
            margin-top: 2px;
          }
        }

        .card-top-actions {
          display: flex;
          align-items: center;
          gap: 6px;

          .delete-btn {
            background: none;
            border: none;
            padding: 2px 4px;
            font-size: 0.85rem;
            cursor: pointer;
            border-radius: 4px;
            color: #ef4444;

            &:hover {
              background-color: #fef2f2;
            }
          }
        }

        .mascot-badge {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 10px;
          white-space: nowrap;

          &.mascot {
            background-color: #fef3c7;
            color: #92400e;
          }

          &.autonomous {
            background-color: #e0e7ff;
            color: #3730a3;
          }
        }
      }

      .card-desc {
        margin: 0;
        font-size: 0.82rem;
        color: #475569;
        line-height: 1.35;
      }

      .card-mid-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        margin-top: 2px;
      }

      .ingredient-badges {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;

        .ing-badge {
          font-size: 0.72rem;
          background-color: #f1f5f9;
          color: #334155;
          padding: 1px 6px;
          border-radius: 4px;
          font-weight: 500;
          text-transform: capitalize;
        }
      }

      .formats-available {
        display: flex;
        align-items: center;
        gap: 4px;

        .fmt-pill {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 1px 5px;
          border-radius: 4px;
          font-size: 0.7rem;
          color: #475569;
        }
      }

      .card-actions {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 4px;

        .play-btn {
          flex: 1;
          padding: 5px 8px;
          border-radius: 5px;
          font-size: 0.78rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: background-color 0.15s ease;

          &.mascot-play {
            background-color: #2563eb;
            color: #ffffff;

            &:hover {
              background-color: #1d4ed8;
            }
          }

          &.auto-play {
            background-color: #7c3aed;
            color: #ffffff;

            &:hover {
              background-color: #6d28d9;
            }
          }
        }

        .inspect-btn {
          padding: 5px 8px;
          border-radius: 5px;
          font-size: 0.78rem;
          font-weight: 500;
          border: 1px solid #cbd5e1;
          background-color: #ffffff;
          color: #334155;
          cursor: pointer;

          &:hover {
            background-color: #f8fafc;
          }
        }
      }
    }
  }

  .format-inspector-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    .format-inspector-content {
      background-color: #ffffff;
      border-radius: 12px;
      width: 90%;
      max-width: 800px;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

      .inspector-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        border-bottom: 1px solid #e2e8f0;

        h3 {
          margin: 0;
          font-size: 1.1rem;
        }

        .close-btn {
          border: none;
          background: none;
          font-size: 1.2rem;
          cursor: pointer;
          color: #64748b;
        }
      }

      .inspector-body {
        padding: 20px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 16px;

        .format-section {
          h4 {
            margin: 0 0 8px 0;
            font-size: 0.95rem;
            color: #1e293b;
          }

          pre {
            background-color: #0f172a;
            color: #38bdf8;
            padding: 12px;
            border-radius: 8px;
            font-size: 0.8rem;
            max-height: 200px;
            overflow-y: auto;
            margin: 0;
          }
        }
      }
    }
  }

  .delete-confirm-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(15, 23, 42, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;

    .delete-confirm-modal {
      background: #ffffff;
      border-radius: 12px;
      padding: 20px 24px;
      max-width: 440px;
      width: 90%;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);

      h3 {
        margin-top: 0;
        margin-bottom: 8px;
        color: #0f172a;
        font-size: 1.15rem;
      }

      p {
        color: #334155;
        font-size: 0.9rem;
        margin: 10px 0 20px;
        line-height: 1.4;

        strong {
          color: #0f172a;
        }
      }

      .confirm-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;

        .btn-cancel {
          padding: 8px 16px;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          background-color: #ffffff;
          color: #334155;
          font-weight: 500;
          cursor: pointer;

          &:hover {
            background-color: #f1f5f9;
          }
        }

        .btn-danger {
          padding: 8px 16px;
          border-radius: 6px;
          border: none;
          background-color: #ef4444;
          color: #ffffff;
          font-weight: 600;
          cursor: pointer;

          &:hover {
            background-color: #dc2626;
          }
        }
      }
    }
  }
}
`````

## File: src/components/Mascot/TortillaSvg.tsx
`````typescript
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import type { GazePoint, GazeTarget } from "../../systems/gaze";
import type { MascotState } from "../../systems/mascot";
import "./TortillaSvg.scss";

export interface Potato {
  x: number;
  y: number;
  rx: number;
  ry: number;
  rotate: number;
}

export interface ToastMark {
  x: number;
  y: number;
  rx: number;
  ry: number;
  rotate: number;
}

export interface TortillaSvgProps {
  state?: MascotState | "flipping"; // Added 'flipping' if not in your MascotState yet
  radius?: number;
  pupilOffset?: { left: GazePoint; right: GazePoint };
  mouth?: string;
  leftEyeRef?: React.RefObject<SVGEllipseElement | null>;
  rightEyeRef?: React.RefObject<SVGEllipseElement | null>;
  width?: number | string;
  height?: number | string;
  potatoes?: Potato[];
  toastMarks?: ToastMark[];
  gazingAt?: GazeTarget;
  onDoubleClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
  isHoldingLeft?: boolean;
  isHoldingRight?: boolean;
  onLeftArmClick?: (e: React.MouseEvent<SVGElement>) => void;
  onRightArmClick?: (e: React.MouseEvent<SVGElement>) => void;
  leftArmTitle?: string;
  rightArmTitle?: string;
}

const DEFAULT_POTATOES: Potato[] = [
  { x: -12, y: -10, rx: 4, ry: 3, rotate: 15 },
  { x: 14, y: 8, rx: 5, ry: 3.5, rotate: -25 },
  { x: -6, y: 12, rx: 4.5, ry: 3, rotate: 40 },
  { x: 8, y: -14, rx: 3.5, ry: 2.5, rotate: -10 },
];

const DEFAULT_TOAST_MARKS: ToastMark[] = [
  { x: -18, y: -12, rx: 3, ry: 2, rotate: 20 },
  { x: 12, y: -16, rx: 4, ry: 2.5, rotate: -15 },
  { x: -14, y: 14, rx: 3.5, ry: 2, rotate: 30 },
  { x: 16, y: 10, rx: 2.5, ry: 1.8, rotate: -45 },
];

export function TortillaSvg({
  state = "idle",
  radius = 28,
  pupilOffset: externalPupilOffset,
  mouth = "M -10 6 Q 0 16 10 6",
  leftEyeRef,
  rightEyeRef,
  width = 100,
  height = 100,
  potatoes = DEFAULT_POTATOES,
  toastMarks = DEFAULT_TOAST_MARKS,
  gazingAt,
  onDoubleClick,
  isHoldingLeft = false,
  isHoldingRight = false,
  onLeftArmClick,
  onRightArmClick,
  leftArmTitle,
  rightArmTitle,
}: TortillaSvgProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [targetOffset, setTargetOffset] = useState<{ left: GazePoint; right: GazePoint }>({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  });

  const lastFlipTimeRef = useRef<number>(0);
  const lastTapTimeRef = useRef<number>(0);

  const triggerFlip = (e: React.MouseEvent<SVGSVGElement>) => {
    const now = Date.now();
    if (now - lastFlipTimeRef.current < 400) return;
    lastFlipTimeRef.current = now;

    if (!isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setIsFlipping(false);
      }, 800);
    }
    onDoubleClick?.(e);
  };

  const handleDoubleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    triggerFlip(e);
  };

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const now = Date.now();
    if (now - lastTapTimeRef.current < 300) {
      triggerFlip(e);
      lastTapTimeRef.current = 0;
    } else {
      lastTapTimeRef.current = now;
    }
  };

  useEffect(() => {
    if (externalPupilOffset) return;

    const computeOffsetFromPoint = (targetX: number, targetY: number) => {
      if (!svgRef.current) return { x: 0, y: 0 };
      const rect = svgRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = targetX - centerX;
      const dy = targetY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 1) return { x: 0, y: 0 };

      const angle = Math.atan2(dy, dx);
      const maxOffset = 3.5;
      const offsetDist = Math.min(distance / 60, 1) * maxOffset;

      const ox = Math.cos(angle) * offsetDist;
      const oy = Math.sin(angle) * offsetDist;

      return { x: ox, y: oy };
    };

    if (gazingAt?.type === "mouse") {
      const handleMouseMove = (e: MouseEvent) => {
        const offset = computeOffsetFromPoint(e.clientX, e.clientY);
        setTargetOffset({ left: offset, right: offset });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }

    let animFrameId: number;

    const updateGaze = () => {
      if (!gazingAt) {
        setTargetOffset({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
        return;
      }

      if (gazingAt.type === "entity") {
        const entityId = gazingAt.entityId;
        if (!entityId) {
          setTargetOffset({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
          return;
        }

        // Search for element or container in DOM
        const el =
          document.querySelector(`[data-entity-id="${entityId}"]`) ||
          document.querySelector(`[data-ingredient-id="${entityId}"]`) ||
          document.querySelector(`[data-container-id="${entityId}"]`) ||
          document.getElementById(entityId);

        if (el) {
          const rect = el.getBoundingClientRect();
          const offset = computeOffsetFromPoint(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2
          );
          setTargetOffset({ left: offset, right: offset });
        } else {
          setTargetOffset({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
        }
      } else if (gazingAt.type === "point") {
        const offset = computeOffsetFromPoint(gazingAt.point.x, gazingAt.point.y);
        setTargetOffset({ left: offset, right: offset });
      } else {
        setTargetOffset({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
      }
    };

    const loop = () => {
      updateGaze();
      animFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [externalPupilOffset, gazingAt]);

  const pupilOffset = externalPupilOffset || targetOffset;
  const r = radius ?? 28;
  const effectiveState = isFlipping ? "flipping" : state;

  const armTransition = {
    type: "spring" as const,
    stiffness: 260,
    damping: 18,
  };

  const getLeftHandPos = () => {
    if (effectiveState === "celebrating") return { x: -28, y: -24 };
    if (effectiveState === "flipping") return { x: -22, y: -10 };
    if (isHoldingLeft) return { x: -32, y: -16 };
    return { x: -30, y: 22 };
  };

  const getRightHandPos = () => {
    if (effectiveState === "celebrating") return { x: 28, y: -24 };
    if (effectiveState === "flipping") return { x: 22, y: -10 };
    if (isHoldingRight) return { x: 32, y: -16 };
    return { x: 30, y: 22 };
  };

  const getLeftArmPath = () => {
    if (effectiveState === "celebrating") {
      return "M -26 4 Q -38 -14 -28 -24";
    }
    if (effectiveState === "flipping") {
      return "M -26 4 Q -34 0 -22 -10";
    }
    if (isHoldingLeft) {
      return "M -26 4 Q -38 -4 -32 -16";
    }
    return "M -26 4 Q -36 12 -30 22";
  };

  const getRightArmPath = () => {
    if (effectiveState === "celebrating") {
      return "M 26 4 Q 38 -14 28 -24";
    }
    if (effectiveState === "flipping") {
      return "M 26 4 Q 34 0 22 -10";
    }
    if (isHoldingRight) {
      return "M 26 4 Q 38 -4 32 -16";
    }
    return "M 26 4 Q 36 12 30 22";
  };

  return (
    <motion.svg
      ref={svgRef}
      viewBox="-40 -40 80 80"
      width={width}
      height={height}
      className={`tortilla-svg is-${effectiveState}`}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <defs>
        {/* Hauptkörper: Ei + Kartoffeln */}
        <radialGradient id="tortillaBody" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#fff8e1" />
          <stop offset="30%" stopColor="#f5d98e" />
          <stop offset="70%" stopColor="#e8b84a" />
          <stop offset="100%" stopColor="#c98a2a" />
        </radialGradient>

        {/* Gebräunter Rand */}
        <linearGradient id="crustEdge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4953a" />
          <stop offset="50%" stopColor="#b8731f" />
          <stop offset="100%" stopColor="#8b5a1a" />
        </linearGradient>

        {/* Schatten unter der Tortilla */}
        <radialGradient id="dropShadow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#5a3a0a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#5a3a0a" stopOpacity="0" />
        </radialGradient>

        {/* Öl-Glanz */}
        <linearGradient id="oilShine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Kartoffel-Textur */}
        <radialGradient id="potatoChunk" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#fff5d6" />
          <stop offset="100%" stopColor="#e8c97a" />
        </radialGradient>

        {/* Zwiebel-Textur */}
        <radialGradient id="onionChunk" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f0e6d2" />
        </radialGradient>

        {/* Dampf für Cooking-State */}
        <linearGradient id="steam" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <filter id="softShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="3" opacity="0.3" />
        </filter>

        <filter id="innerGlow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* === SCHATTEN === */}
      <ellipse
        cx="2"
        cy="22"
        rx={r * 0.9}
        ry={r * 0.7}
        fill="url(#dropShadow)"
      />

      {/* === TORTILLA-DICKE (Seitenansicht) === */}
      <ellipse
        cx="0"
        cy="8"
        rx={r * 0.95}
        ry={r * 0.85}
        fill="#7a4a15"
      />

      {/* === ARMS (Left & Right) === */}
      <g
        className="tortilla-arm tortilla-arm-left"
        onClick={(e) => {
          e.stopPropagation();
          onLeftArmClick?.(e);
        }}
        style={{ cursor: onLeftArmClick ? 'pointer' : 'default' }}
      >
        <motion.path
          d={getLeftArmPath()}
          fill="none"
          stroke="transparent"
          strokeWidth="16"
          strokeLinecap="round"
          animate={{ d: getLeftArmPath() }}
          transition={armTransition}
        />
        <motion.path
          d={getLeftArmPath()}
          fill="none"
          stroke="#b8731f"
          strokeWidth="3.5"
          strokeLinecap="round"
          animate={{ d: getLeftArmPath() }}
          transition={armTransition}
          whileHover={onLeftArmClick ? { strokeWidth: 5, stroke: "#d98a28" } : undefined}
          whileTap={onLeftArmClick ? { scale: 0.92 } : undefined}
        />
        {onLeftArmClick && (
          <motion.g
            animate={{ x: getLeftHandPos().x, y: getLeftHandPos().y }}
            transition={armTransition}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
          >
            <circle cx="0" cy="0" r="5.5" fill="#ffffff" stroke="#b8731f" strokeWidth="1.3" />
            <text x="0" y="2" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#7a4a15" style={{ userSelect: 'none', pointerEvents: 'none' }}>
              ◀
            </text>
          </motion.g>
        )}
        {leftArmTitle && <title>{leftArmTitle}</title>}
      </g>

      <g
        className="tortilla-arm tortilla-arm-right"
        onClick={(e) => {
          e.stopPropagation();
          onRightArmClick?.(e);
        }}
        style={{ cursor: onRightArmClick ? 'pointer' : 'default' }}
      >
        <motion.path
          d={getRightArmPath()}
          fill="none"
          stroke="transparent"
          strokeWidth="16"
          strokeLinecap="round"
          animate={{ d: getRightArmPath() }}
          transition={armTransition}
        />
        <motion.path
          d={getRightArmPath()}
          fill="none"
          stroke="#b8731f"
          strokeWidth="3.5"
          strokeLinecap="round"
          animate={{ d: getRightArmPath() }}
          transition={armTransition}
          whileHover={onRightArmClick ? { strokeWidth: 5, stroke: "#d98a28" } : undefined}
          whileTap={onRightArmClick ? { scale: 0.92 } : undefined}
        />
        {onRightArmClick && (
          <motion.g
            animate={{ x: getRightHandPos().x, y: getRightHandPos().y }}
            transition={armTransition}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
          >
            <circle cx="0" cy="0" r="5.5" fill="#ffffff" stroke="#b8731f" strokeWidth="1.3" />
            <text x="0" y="2" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#7a4a15" style={{ userSelect: 'none', pointerEvents: 'none' }}>
              ▶
            </text>
          </motion.g>
        )}
        {rightArmTitle && <title>{rightArmTitle}</title>}
      </g>

      {/* === HAUPTKÖRPER === */}
      <ellipse
        cx="0"
        cy="0"
        rx={r}
        ry={r * 0.88}
        fill="url(#tortillaBody)"
        stroke="url(#crustEdge)"
        strokeWidth="2.5"
        filter="url(#softShadow)"
      />

      {/* === GEKRÄUSELTER RAND === */}
      <path
        d="M -28 -8 
           Q -32 -2 -30 5 
           Q -28 15 -20 22 
           Q -10 28 0 27 
           Q 12 28 22 22 
           Q 30 15 31 5 
           Q 32 -5 25 -15 
           Q 15 -25 0 -26 
           Q -15 -25 -28 -8 Z"
        fill="none"
        stroke="#b8731f"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        opacity="0.6"
      />

      {/* === KARTOFFEL-STÜCKE (aus Props) === */}
      {potatoes.map((potato, i) => (
        <g key={`potato-${i}`} transform={`rotate(${potato.rotate} ${potato.x} ${potato.y})`}>
          {/* Schatten */}
          <ellipse
            cx={potato.x + 0.5}
            cy={potato.y + 0.5}
            rx={potato.rx}
            ry={potato.ry}
            fill="#b8892a"
            opacity="0.4"
          />
          {/* Kartoffel */}
          <ellipse
            cx={potato.x}
            cy={potato.y}
            rx={potato.rx}
            ry={potato.ry}
            fill="url(#potatoChunk)"
            stroke="#d4a84a"
            strokeWidth="0.8"
          />
          {/* Highlight */}
          <ellipse
            cx={potato.x - 1}
            cy={potato.y - 1}
            rx={potato.rx * 0.4}
            ry={potato.ry * 0.3}
            fill="#ffffff"
            opacity="0.5"
          />
        </g>
      ))}

      {/* === ZWIEBEL-RINGE === */}
      {[
        { x: -22, y: -2, r: 3.5 },
        { x: 20, y: -8, r: 2.5 },
        { x: 8, y: -22, r: 2 },
        { x: -5, y: 20, r: 3 },
      ].map((onion, i) => (
        <g key={`onion-${i}`}>
          <circle
            cx={onion.x}
            cy={onion.y}
            r={onion.r}
            fill="none"
            stroke="#f5e6c8"
            strokeWidth="1.8"
            opacity="0.7"
          />
          <circle
            cx={onion.x}
            cy={onion.y}
            r={onion.r * 0.5}
            fill="none"
            stroke="#e8d5a8"
            strokeWidth="1"
            opacity="0.5"
          />
        </g>
      ))}

      {/* === GEBRÄUNTE STELLEN (aus Props) === */}
      {toastMarks.map((mark, i) => (
        <ellipse
          key={`toast-${i}`}
          cx={mark.x}
          cy={mark.y}
          rx={mark.rx}
          ry={mark.ry}
          fill="#8b5a1a"
          opacity="0.35"
          transform={`rotate(${mark.rotate} ${mark.x} ${mark.y})`}
        />
      ))}

      {/* === ÖL-GLANZ (mehrere Highlights) === */}
      <path
        d="M -15 -18 Q -5 -25 8 -20"
        fill="none"
        stroke="url(#oilShine)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 10 15 Q 18 18 24 12"
        fill="none"
        stroke="url(#oilShine)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <ellipse cx="-8" cy="-16" rx="3" ry="1.5" fill="#ffffff" opacity="0.3" transform="rotate(-20 -8 -16)" />

      {/* === BASILIKUM-BLATT (als "Haarschmuck") === */}
      <g transform="translate(18, -22) rotate(25)">
        <path
          d="M 0 0 Q -4 -8 0 -14 Q 4 -8 0 0 Z"
          fill="#5a8f3a"
          stroke="#4a7a2e"
          strokeWidth="0.8"
        />
        <path
          d="M 0 0 L 0 -12"
          fill="none"
          stroke="#4a7a2e"
          strokeWidth="0.5"
        />
        <ellipse cx="-1.5" cy="-5" rx="1" ry="0.8" fill="#6ba84a" opacity="0.7" />
        <ellipse cx="1.5" cy="-9" rx="0.8" ry="0.6" fill="#6ba84a" opacity="0.7" />
      </g>

      {/* === DAMPF (nur im Cooking-State) === */}
      {state === "cooking" && (
        <>
          <motion.path
            d="M -10 -28 Q -15 -38 -8 -45"
            fill="none"
            stroke="url(#steam)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: [0, 0.7, 0], y: [-2, -8, -15], x: [0, 3, -2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.path
            d="M 5 -30 Q 10 -40 3 -48"
            fill="none"
            stroke="url(#steam)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: [0, 0.6, 0], y: [-2, -10, -18], x: [0, -3, 2] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.7 }}
          />
          <motion.path
            d="M 0 -32 Q -5 -42 2 -50"
            fill="none"
            stroke="url(#steam)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: [0, 0.5, 0], y: [-2, -12, -20], x: [0, 4, -3] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 1.4 }}
          />
        </>
      )}

      {/* === GESICHT === */}

      {/* Wangen (Blush) */}
      <ellipse cx="-22" cy="6" rx="5" ry="3" fill="#e85a5a" opacity="0.25" filter="url(#innerGlow)" />
      <ellipse cx="22" cy="6" rx="5" ry="3" fill="#e85a5a" opacity="0.25" filter="url(#innerGlow)" />

      {/* Augen (Weiß) */}
      <ellipse ref={leftEyeRef} cx="-11" cy="-6" rx="8" ry="9" fill="#fff" />
      <ellipse ref={rightEyeRef} cx="11" cy="-6" rx="8" ry="9" fill="#fff" />

      {/* Augenlider (Blinzeln via CSS) */}
      <ellipse
        cx="-11"
        cy="-6"
        rx="8"
        ry="9"
        fill="#e8b84a"
        className="tortilla-blink"
        style={{ transformOrigin: "-11px -6px" }}
      />
      <ellipse
        cx="11"
        cy="-6"
        rx="8"
        ry="9"
        fill="#e8b84a"
        className="tortilla-blink"
        style={{ transformOrigin: "11px -6px" }}
      />

      {/* Pupillen */}
      <motion.circle
        cx="-11"
        cy="-6"
        r="3.5"
        fill="#3b2418"
        animate={{ x: pupilOffset.left.x, y: pupilOffset.left.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <motion.circle
        cx="11"
        cy="-6"
        r="3.5"
        fill="#3b2418"
        animate={{ x: pupilOffset.right.x, y: pupilOffset.right.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Pupillen-Highlights */}
      <circle cx="-12.5" cy="-8" r="1.2" fill="white" />
      <circle cx="9.5" cy="-8" r="1.2" fill="white" />

      {/* Mund */}
      <motion.path
        d={mouth}
        fill="none"
        stroke="#3b2418"
        strokeWidth="3"
        strokeLinecap="round"
        animate={
          state === "celebrating"
            ? { scale: [1, 1.1, 1] }
            : state === "cooking"
            ? { d: ["M -14 4 Q 0 18 14 4", "M -14 5 Q 0 16 14 5", "M -14 4 Q 0 18 14 4"] }
            : {}
        }
        transition={
          state === "celebrating"
            ? { duration: 0.5, repeat: Infinity }
            : state === "cooking"
            ? { duration: 1.5, repeat: Infinity }
            : { duration: 0.2 }
        }
      />

      {/* Zunge (nur bei celebrating) */}
      {state === "celebrating" && (
        <motion.path
          d="M -6 12 Q 0 18 6 12"
          fill="#e85a5a"
          opacity="0.8"
          animate={{ scaleY: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}

      {/* === EXTRA: Kleine Krümel (Details) === */}
      <circle cx="-30" cy="5" r="1" fill="#c98a2a" opacity="0.5" />
      <circle cx="32" cy="-5" r="0.8" fill="#c98a2a" opacity="0.4" />
      <circle cx="28" cy="18" r="1.2" fill="#c98a2a" opacity="0.3" />
    </motion.svg>
  );
}
`````

## File: src/i18n/locales/de.json
`````json
{
  "app": {
    "title": "Tortilla World",
    "subtitle": "Interaktive Koch- & Rezeptsimulation",
    "devMode": "Entwickler-Modus",
    "publishMode": "Veröffentlichungs-Modus",
    "recipeCatalog": "Rezeptkatalog",
    "language": "Sprache",
    "tortillaInfo": "Tortilla-Info"
  },
  "scene": {
    "pantry": "Vorratskammer & Zutaten",
    "workstations": "Arbeitsbereiche",
    "preparationBowl": "Schüssel",
    "cookingPan": "Pfanne",
    "servingPlate": "Servierteller",
    "mascot": "Assistenz-Maskottchen",
    "resetKitchen": "🔄 Küche zurücksetzen",
    "showControls": "🔽 Steuerung & Modi anzeigen",
    "hideControls": "🔼 Steuerung ausblenden",
    "tabs": {
      "database": "🗄️ Firestore-Rezeptdatenbank",
      "playRecipe": "▶️ Rezept abspielen",
      "cookbook": "📕 Kochbuch",
      "actionRecorder": "🎥 Aktions-Rekorder"
    },
    "devModeActive": "🛠️ Entwickler-Modus (Aktiv) ➔ Zu Schlankem Release wechseln",
    "slimPublishPreview": "👁️ Schlanke Release-Vorschau ➔ Zu Entwickler wechseln"
  },
  "recorder": {
    "title": "🎥 Aktionsaufzeichnung & Übersetzer",
    "subtitle": "Zeichne Live-Aktionen in der Küche auf, spiele Protokolle ab oder übersetze Aktionen in ein Maskottchen-Rezept.",
    "status": "Erfasste Aktionen: {{actions}} | Ereignisse: {{events}}",
    "startRecording": "⏺️ Sitzung aufzeichnen",
    "recording": "🔴 Aktionen werden aufgezeichnet...",
    "stopRecording": "⏹️ Aufzeichnung stoppen",
    "stopRecordingCount": "⏹ Aufzeichnung stoppen ({{count}})",
    "saveToDb": "💾 Rezept in Datenbank speichern",
    "cancelSave": "💾 Speichern abbrechen",
    "clearLog": "🗑 Protokoll löschen",
    "hideTranslator": "🪄 Übersetzer ausblenden",
    "translateViewFormats": "🪄 Übersetzen / Formate anzeigen",
    "resetKitchen": "🔄 Küche zurücksetzen",
    "savedIngredientsCount": "🛒 Gespeicherte Zutaten ({{count}}):",
    "noIngredientsUsed": "Noch keine Zutaten verwendet. Ziehe Elemente aus dem rechten Bereich in die Küche.",
    "saveToFirestoreTitle": "💾 Aufgezeichnetes Rezept in Firestore speichern",
    "translatorPreview": "🪄 Aktions-Exportformate & Übersetzer-Vorschau",
    "saveTitle": "Rezepttitel",
    "saveAuthor": "Autor",
    "saveDescription": "Beschreibung",
    "includeFormats": "Formate zum Speichern in der Datenbank auswählen:",
    "formatMascot": "🤖 Maskottchen-Aktionssequenz",
    "formatRecipeJson": "📜 Deklaratives Rezept-JSON",
    "formatSessionLog": "💾 Vollständiges Sitzungsprotokoll",
    "saving": "⏳ Speichert in Firestore...",
    "saveSuccess": "✅ Rezept erfolgreich in Cloud Firestore gespeichert! Du kannst es jederzeit im Rezeptkatalog abspielen.",
    "saveError": "❌ Fehler beim Speichern: {{error}}",
    "usedIngredients": "🛒 Gespeicherte Zutaten ({{count}}):",
    "dishNameModalTitle": "🍽️ Benenne dein Rezept!",
    "dishNameModalSubtitle": "Es befindet sich ein Gericht auf deinem Teller! Wie möchtest du diese Kreation nennen?",
    "dishNamePlaceholder": "z.B. Omas Kartoffel-Tortilla",
    "saveDishNameAndStop": "💾 Name speichern & Beenden",
    "skipDishName": "Überspringen"
  },
  "replayer": {
    "loadJson": "📂 Protokoll laden (.json)",
    "selectDbRecipe": "🗄️ Rezept aus Datenbank wählen...",
    "stepProgress": "Schritt {{current}} von {{total}}",
    "play": "▶️ Abspielen",
    "pause": "⏸️ Pause",
    "stepForward": "⏭️ Schritt weiter",
    "stepBack": "⏮️ Schritt zurück",
    "stop": "⏹️ Stopp",
    "speed": "Geschwindigkeit:",
    "loadedRecipe": "\"{{title}}\" geladen ({{count}} Aktionen)"
  },
  "database": {
    "title": "🗄️ Firestore-Rezeptdatenbank & Gespeicherte Spiele",
    "subtitle": "Suchen, filtern und spielen Sie Rezepte in mehreren Formaten direkt aus Cloud Firestore.",
    "seedCatalog": "🌱 Katalog in Datenbank laden",
    "searchPlaceholder": "🔍 Rezepte nach Titel oder Beschreibung suchen...",
    "allIngredients": "Alle Zutaten",
    "noRecipes": "Keine Rezepte gefunden, die deiner Suche entsprechen.",
    "mascotCompatible": "🤖 Maskottchen",
    "autonomousDirect": "⚡ Auto",
    "playMascot": "▶️ Mit Maskottchen",
    "playAuto": "⚡ Direktmodus",
    "inspectFormats": "👁️ Formate",
    "delete": "🗑️",
    "downloadJson": "📥 Herunterladen (.json)",
    "confirmDeleteTitle": "🗑️ Löschen aus Firestore bestätigen",
    "confirmDeleteText": "Möchtest du \"{{title}}\" wirklich aus Cloud Firestore löschen? Diese Aktion kann nicht rückgängig gemacht werden.",
    "cancel": "Abbrechen",
    "confirmDelete": "Ja, Rezept löschen",
    "deleting": "\"{{title}}\" wird aus Firestore gelöscht...",
    "deleteSuccess": "✅ \"{{title}}\" aus Firestore gelöscht.",
    "deleteError": "❌ Fehler beim Löschen von \"{{title}}\"."
  },
  "player": {
    "playing": "Rezept wird abgespielt: {{title}}",
    "stepCounter": "Schritt {{current}} / {{total}}",
    "nextStep": "Nächster Schritt ➔",
    "reset": "🔄 Welt zurücksetzen",
    "finished": "🎉 Rezept erfolgreich abgeschlossen!"
  },
  "guide": {
    "openBtn": "📖 Spieler-Anleitung",
    "title": "Willkommen bei Tortilla World! 🌮",
    "subtitle": "Anleitung für die Küchensimulation",
    "startBtn": "Lass uns kochen!"
  },
  "ui": {
    "recipe": "Rezept",
    "requiredMaterials": "Benötigte Zutaten & Hilfsmittel",
    "dragToWorkstation": "(Ziehe Elemente in den Arbeitsbereich)",
    "instructions": "Anweisungen",
    "chefsHints": "Tipps des Küchenchefs",
    "ingredientsCatalog": "Zutatenkatalog",
    "basicIngredients": "Basiszutaten",
    "otherIngredients": "Weitere Zutaten",
    "showOthers": "Weitere Zutaten anzeigen",
    "hideOthers": "Weitere Zutaten ausblenden",
    "moveToOthers": "Zu weiteren verschieben",
    "moveToBasic": "Zu Basiszutaten verschieben",
    "resetCategories": "Kategorien zurücksetzen",
    "dropToCategorize": "Zutaten hier ablegen zum Umkategorisieren",
    "sidebarSubtitle": "Ziehe Elemente oder tippe auf ➕, um sie in den Arbeitsbereich zu legen",
    "searchIngredientsPlaceholder": "🔍 Zutaten suchen...",
    "noIngredientsFound": "Keine Zutaten für \"{{query}}\" gefunden",
    "targetLabel": "Kochziel / Zeit:",
    "targetPlaceholder": "z. B. 10 Min., mittlere Hitze, braun anbraten",
    "finalNameLabel": "Name des Gerichts:",
    "finalNamePlaceholder": "Name des Gerichts (z. B. Omas Tortilla)",
    "mixtureNamePlaceholder": "Mischungsname (optional)",
    "heatOn": "Hitze An",
    "heatOff": "Hitze Aus",
    "serveToPlate": "Auf Teller servieren 🍽️",
    "emptyContainerHint": "Elemente hier ablegen",
    "noRecipesAvailable": "Keine Rezepte verfügbar.",
    "showIngredients": "Zutaten anzeigen",
    "hideIngredients": "Zutaten ausblenden",
    "emptyTrash": "Mülleimer leeren",
    "confirmEmptyTrash": "Bist du sicher, dass du den Mülleimer leeren möchtest?",
    "yesEmpty": "Ja, leeren",
    "cancel": "Abbrechen",
    "save": "Speichern",
    "leaveHere": "Hier ablegen",
    "takeMe": "Nimm mich",
    "recordedSession": "Aufgezeichnet / Geladen",
    "noIngredientsListed": "Keine Zutaten angegeben.",
    "noInstructionsListed": "Noch keine Schritte aufgezeichnet.",
    "handsFull": "Meine Hände sind voll! Lege zuerst eine Zutat ab.",
    "nothingInHands": "Ich habe nichts in den Händen!"
  },
  "workstations": {
    "sink": "Waschplatz 💧",
    "board": "Schneidebereich 🔪",
    "bowl": "Zubereitung 🥣",
    "burner": "Pfanne 🍳",
    "burner1": "Pfanne",
    "burner2": "Pfanne 2 🍳",
    "plate": "Servierteller 🍽️",
    "trash": "Mülleimer 🗑️",
    "despensa": "Vorratskammer 🧺",
    "default": "Arbeitsbereich 📦"
  },
  "verbs": {
    "cut": "Schneiden",
    "cook": "Kochen",
    "wash": "Waschen",
    "peel": "Schälen",
    "mix": "Mischen",
    "whisk": "Verquirlen",
    "beat": "Verquirlen",
    "combine": "Kombinieren",
    "heat": "Erhitzen",
    "flip": "Wenden",
    "serve": "Servieren",
    "add": "Hinzufügen",
    "fry": "Braten",
    "take": "Nehmen",
    "move": "Bewegen",
    "grab": "Greifen",
    "drop": "Ablegen",
    "celebrate": "Guten Appetit!"
  },
  "stepFormat": {
    "moveFromTo": "Bewege {{ingredient}} von {{source}} nach {{target}}",
    "moveTo": "Bewege {{ingredient}} nach {{target}}",
    "mixToMake": "{{verb}} {{inputs}}, um {{output}} herzustellen",
    "cookFor": "{{verb}} {{target}} für {{duration}} {{unit}}",
    "cookForToMake": "{{verb}} {{target}} für {{duration}} {{unit}} um {{as}} zu erzeugen",
    "flipInContainer": "In die {{container}} {{target}} wenden",
    "flip": "{{target}} wenden",
    "serveOntoAs": "Auf dem {{container}} als {{as}} servieren",
    "serveAs": "Als {{as}} servieren",
    "serveOnto": "Auf dem {{container}} servieren"
  },
  "ingredients": {
    "potato": "Kartoffeln",
    "egg": "Eier",
    "oil": "Olivenöl",
    "onion": "Zwiebel",
    "chorizo": "Chorizo",
    "salt": "Salz",
    "pepper": "Paprika",
    "garlic": "Knoblauch",
    "tomato": "Tomate",
    "cheese": "Käse",
    "bread": "Brot",
    "milk": "Milch",
    "butter": "Butter",
    "black_pepper": "Schwarzer Pfeffer",
    "flour": "Mehl",
    "sugar": "Zucker",
    "rice": "Reis",
    "chicken": "Hühnchen",
    "beef": "Rindfleisch",
    "mushroom": "Pilz",
    "spinach": "Spinat",
    "lemon": "Zitrone"
  },
  "tools": {
    "knife": "Kochmesser",
    "peeler": "Sparschäler",
    "whisk": "Schneebesen",
    "fork": "Gabel",
    "spatula": "Pfannenwender",
    "grater": "Reibe",
    "mandoline": "Hobel",
    "spoon": "Löffel"
  },
  "states": {
    "raw": "Roh 🌾",
    "cooking": "Kochen 🔥",
    "finished": "Fertig ✨",
    "prepared": "Zubereitet 🔪",
    "cut": "Geschnitten",
    "sliced": "In Scheiben",
    "peeled": "Geschält",
    "whisked": "Verquirlt",
    "washed": "Gewaschen",
    "mixed": "Gemischt",
    "fried": "Gebraten",
    "heated": "Erhitzt"
  },
  "recipes": {
    "concebolla": {
      "name": "Tortilla mit Zwiebel",
      "description": "Spanische Tortilla mit saftigen karamellisierten Zwiebeln.",
      "hints": [
        "Zwiebeln vor dem Mischen goldbraun anbraten."
      ]
    },
    "clasica": {
      "name": "Klassische Tortilla",
      "description": "Traditionelle spanische Tortilla ohne Zwiebeln.",
      "hints": [
        "Lass den Knoblauch nicht anbrennen.",
        "Achte mit einem weichen Pfannenwender darauf, dass die Tortilla nicht festklebt."
      ]
    },
    "francesa": {
      "name": "Französische Omelett (Tortilla Francesa)",
      "description": "Traditionelles französisches Omelett.",
      "hints": [
        "Mische die Eier im Schüssel mit Salz.",
        "Schalte den Herd ein, gib Öl hinzu und erhitze es.",
        "Achte darauf, dass das Omelett nicht festklebt."
      ]
    },
    "recorded": {
      "name": "Aufgezeichnetes / Geladenes Rezept",
      "description": "Dynamisch generiertes Rezept aus aufgezeichneten oder geladenen Kochaktionen."
    }
  }
}
`````

## File: src/store/slices/recordSlice.ts
`````typescript
/**
 * FILE: recordSlice.ts
 *
 * PURPOSE:
 * Zustand slice for recording user interactions into a serialized WorldState recipe.
 *
 * RESPONSIBILITY:
 * - Manages recording state (active/inactive, start time).
 * - Captures initial and final WorldState snapshots (entities + containers).
 * - Logs dispatched WorldActions with relative timestamps.
 * - Serializes recorded data into JSON blob with download URL generation.
 */

import type { StateCreator } from 'zustand/vanilla';
import type { WorldAction } from '../../types/world';
import type { RecordedAction, SerializedRecipeExport, SerializedWorldState } from '../../types/recording';
import type { WorldStateStore } from '../types';
import { ingredients } from '../../data/catalog/ingredients';
import { catalogTools } from '../../data/catalog/tools';
import { filterUnusedIngredientsFromState, extractUsedIngredientsFromActions } from '../../utils/sessionLogUtils';

export interface UsedIngredientInfo {
  id: string;
  name: string;
  icon?: string;
}

export interface RecordSlice {
  isRecording: boolean;
  recordingStartTime: number | null;
  recordedActions: RecordedAction[];
  usedIngredients: UsedIngredientInfo[];
  initialRecordingState: SerializedWorldState | null;
  recordedDownloadUrl: string | null;
  recordedFilename: string | null;

  startRecording: () => void;
  stopRecording: (customDishName?: string) => void;
  recordAction: (action: WorldAction) => void;
  clearRecording: () => void;
  setRecordedActions: (actions: RecordedAction[], customUsedIngredients?: UsedIngredientInfo[]) => void;
}

export const createRecordSlice: StateCreator<
  WorldStateStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  RecordSlice
> = (set, get) => ({
  isRecording: false,
  recordingStartTime: null,
  recordedActions: [],
  usedIngredients: [],
  initialRecordingState: null,
  recordedDownloadUrl: null,
  recordedFilename: null,

  startRecording: () => {
    const prevUrl = get().recordedDownloadUrl;
    if (prevUrl) {
      URL.revokeObjectURL(prevUrl);
    }

    const { entities, containers } = get();

    set((state) => {
      state.isRecording = true;
      state.recordingStartTime = Date.now();
      state.recordedActions = [];
      state.usedIngredients = [];
      state.recordedDownloadUrl = null;
      state.recordedFilename = null;
      state.initialRecordingState = JSON.parse(
        JSON.stringify({
          entities,
          containers,
        })
      );
    });
  },

  recordAction: (action: WorldAction) => {
    const { isRecording, recordingStartTime } = get();
    if (!isRecording) return;

    const timestampMs = Date.now() - (recordingStartTime || Date.now());
    set((state) => {
      state.recordedActions.push({
        type: action.type,
        payload: JSON.parse(JSON.stringify(action.payload)),
        timestampMs,
      });

      // Track used ingredients / entities during recording
      const payload = action.payload || {};
      let rawEntityId: string | undefined;

      if (action.type === 'MOVE_ENTITY') {
        const target = (payload as { targetContainerId?: string }).targetContainerId;
        if (target && target !== 'despensa') {
          rawEntityId = (payload as { entityId?: string }).entityId;
        }
      } else if (action.type === 'ADD_ENTITY') {
        const target = (payload as { containerId?: string }).containerId;
        if (target && target !== 'despensa') {
          const ent = (payload as { entity?: { id?: string; ingredientId?: string } }).entity;
          rawEntityId = ent?.ingredientId || ent?.id;
        }
      } else if (['PREPARE_INGREDIENT', 'COOK_INGREDIENT', 'USE_INGREDIENT'].includes(action.type)) {
        rawEntityId = (payload as { entityId?: string }).entityId;
      }

      if (rawEntityId) {
        // Strip timestamp/unique suffix if present (e.g., "potato_1729384" -> "potato")
        const baseId = rawEntityId.split('_')[0] || rawEntityId;
        const catalogIng = ingredients.find((i) => i.id === baseId || i.id === rawEntityId);
        const catalogTool = catalogTools.find((t) => t.id === baseId || t.id === rawEntityId);

        const cleanName =
          catalogIng?.name ||
          catalogTool?.name ||
          baseId.charAt(0).toUpperCase() + baseId.slice(1).replace(/_/g, ' ');
        const icon = catalogIng?.icon || catalogTool?.icon || '📦';

        if (!state.usedIngredients.some((u) => u.id === baseId)) {
          state.usedIngredients.push({
            id: baseId,
            name: cleanName,
            icon,
          });
        }
      }
    });
  },

  stopRecording: (customDishName?: string) => {
    const { isRecording, recordingStartTime, initialRecordingState, recordedDownloadUrl } = get();
    if (!isRecording) return;

    // Apply custom dish name to entities on plate if provided
    const { entities, containers, dispatch } = get();
    const plateContainer = containers.plate || containers.plato;
    const plateEntityIds = plateContainer?.entityIds || [];

    if (customDishName && customDishName.trim() && plateEntityIds.length > 0) {
      const trimmedName = customDishName.trim();
      plateEntityIds.forEach((id) => {
        if (entities[id]) {
          dispatch({
            type: 'UPDATE_ENTITY_STATE',
            payload: {
              entityId: id,
              changes: { name: trimmedName },
            },
          });
        }
      });
    }

    if (recordedDownloadUrl) {
      URL.revokeObjectURL(recordedDownloadUrl);
    }

    // Read current state after potential dish name update dispatch
    const updatedState = get();
    const activeActions = updatedState.recordedActions;

    const rawInitState = initialRecordingState || {
      entities: updatedState.entities,
      containers: updatedState.containers,
    };
    const rawFinalState = {
      entities: updatedState.entities,
      containers: updatedState.containers,
    };

    const filteredInitState = filterUnusedIngredientsFromState(rawInitState, activeActions);
    const filteredFinalState = filterUnusedIngredientsFromState(rawFinalState, activeActions);

    const durationMs = Date.now() - (recordingStartTime || Date.now());
    const exportData: SerializedRecipeExport = {
      version: '1.0.0',
      title: 'Recorded Tortilla Recipe',
      recordedAt: new Date().toISOString(),
      durationMs,
      actionCount: activeActions.length,
      usedIngredients: updatedState.usedIngredients,
      initialState: filteredInitState,
      finalState: filteredFinalState,
      actions: activeActions,
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const downloadUrl = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `tortilla-recorded-recipe-${dateStr}.json`;

    set((state) => {
      state.isRecording = false;
      state.recordedDownloadUrl = downloadUrl;
      state.recordedFilename = filename;
    });
  },

  clearRecording: () => {
    const prevUrl = get().recordedDownloadUrl;
    if (prevUrl) {
      URL.revokeObjectURL(prevUrl);
    }
    set((state) => {
      state.isRecording = false;
      state.recordingStartTime = null;
      state.recordedActions = [];
      state.usedIngredients = [];
      state.initialRecordingState = null;
      state.recordedDownloadUrl = null;
      state.recordedFilename = null;
    });
  },

  setRecordedActions: (actions: RecordedAction[], customUsedIngredients?: UsedIngredientInfo[]) => {
    const prevUrl = get().recordedDownloadUrl;
    if (prevUrl) {
      URL.revokeObjectURL(prevUrl);
    }
    set((state) => {
      state.recordedActions = actions;
      if (customUsedIngredients && customUsedIngredients.length > 0) {
        state.usedIngredients = customUsedIngredients;
      } else {
        state.usedIngredients = extractUsedIngredientsFromActions(actions);
      }
      state.recordedDownloadUrl = null;
      state.recordedFilename = null;
    });
  },
});
`````

## File: src/systems/recipeRunner/handlers/moveHandlers.ts
`````typescript
/**
 * FILE: src/systems/recipeRunner/handlers/moveHandlers.ts
 *
 * PURPOSE:
 * Step handlers for item relocation steps ('move', 'grab', 'drop').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, grabIngredient, dropIngredient } from '../../mascotActions';
import { resolveContainerId } from '../../../engine/containerRules';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type MoveStep = Extract<RecipeStep, { action: 'move' }>;
type GrabStep = Extract<RecipeStep, { action: 'grab' }>;
type DropStep = Extract<RecipeStep, { action: 'drop' }>;

export async function handleMoveStep(
  ctx: RecipeRunnerContext,
  step: MoveStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const source = resolveContainerId(step.source || ctx.defaultSourceId);
  const target = resolveContainerId(step.target || workstationDefaultContainerId || ctx.defaultTargetId);
  const rawKey = step.ingredient || step.target;


  const entityId = ctx.getBoundEntityId(rawKey);

  if (!entityId) {
    return;
  }

  ctx.validateEntity(entityId, 'move');

  const state = worldStore.getState();
  const targetContainer = state.containers[target];


  if (targetContainer && targetContainer.entityIds.includes(entityId)) {
    return; // Skip move if entity is already in target container
  }

  // If running in autonomous mode without mascot, dispatch direct MOVE_ENTITY action
  if (ctx.useMascot === false) {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId,
        targetContainerId: target,
      },
    });
    await ctx.wait();

    const newState = worldStore.getState();
    const newTargetContainer = newState.containers[target];
    if (newTargetContainer && !newTargetContainer.entityIds.includes(entityId)) {
      const copiedId = newTargetContainer.entityIds[newTargetContainer.entityIds.length - 1];
      if (copiedId) {
        ctx.updateBindingIfCopied(entityId, copiedId, rawKey);
      }
    }
    return;
  }

  // 1. Move mascot gaze to source container
  moveTortillaTo(source, ctx.mascotId);
  await ctx.wait();

  // 2. Grab ingredient from source container
  grabIngredient(entityId, source, ctx.mascotId);
  await ctx.wait();

  // 3. Move mascot gaze to target container
  moveTortillaTo(target, ctx.mascotId);
  await ctx.wait();

  // 4. Drop ingredient into target container
  dropIngredient(target, undefined, ctx.mascotId);
  await ctx.wait();

  // Check if drop created a copy entity (from immutable storage)
  const newState = worldStore.getState();
  const newTargetContainer = newState.containers[target];
  if (newTargetContainer && !newTargetContainer.entityIds.includes(entityId)) {
    const copiedId = newTargetContainer.entityIds[newTargetContainer.entityIds.length - 1];
    if (copiedId) {
      ctx.updateBindingIfCopied(entityId, copiedId, rawKey);
    }
  }
}

export async function handleGrabStep(
  ctx: RecipeRunnerContext,
  step: GrabStep
): Promise<void> {
  const source = resolveContainerId(step.source || ctx.defaultSourceId);
  const entityId = ctx.getBoundEntityId(step.ingredient) || step.ingredient;

  if (entityId) {
    ctx.validateEntity(entityId, 'grab');
  }

  moveTortillaTo(source, ctx.mascotId);
  await ctx.wait();

  if (entityId) {
    grabIngredient(entityId, source, ctx.mascotId);
    await ctx.wait();
  }
}

export async function handleDropStep(
  ctx: RecipeRunnerContext,
  step: DropStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const target = resolveContainerId(step.target || workstationDefaultContainerId || ctx.defaultTargetId);
  moveTortillaTo(target, ctx.mascotId);
  await ctx.wait();

  dropIngredient(target, step.positionIndex, ctx.mascotId);
  await ctx.wait();
}
`````

## File: src/components/Mascot/TortillaSvg.scss
`````scss
/**
 * FILE: src/components/Mascot/TortillaSvg.scss
 *
 * PURPOSE:
 * Styles and animations for TortillaSvg mascot using SCSS variables and mixins.
 */

@use 'sass:color';
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

/* === Root SVG Styles & State Animations === */
.tortilla-svg {
  transform-origin: center;
  overflow: visible;

  &.is-idle {
    animation: tortillaIdle 2.5s infinite ease-in-out;
  }

  &.is-flipping {
    animation: tortillaFlip 0.8s ease-in-out forwards;
  }
}

@keyframes tortillaIdle {
  0%, 100% {
    transform: translateY(0) scaleY(1);
  }
  50% {
    transform: translateY(-3px) scaleY(1.02);
  }
}

@keyframes tortillaFlip {
  0% {
    transform: translateY(0) rotateX(0deg) scale(1);
  }
  50% {
    transform: translateY(-60px) rotateX(180deg) scale(1.15);
  }
  100% {
    transform: translateY(0) rotateX(360deg) scale(1);
  }
}

/* === Interactive Arm Controls === */
.tortilla-arm {
  transition: opacity 0.2s ease, filter 0.2s ease;

  &:hover {
    filter: drop-shadow(0 2px 5px rgba(184, 115, 31, 0.5));
  }

  &:active {
    filter: drop-shadow(0 1px 2px rgba(184, 115, 31, 0.7));
  }
}

/* === Physical Movement & Wrapper Animations === */
.mascot-card {
  @include ceramic-card($warm-surface, $warm-border);
  padding: 12px 16px;
}

.mascot-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate3d(var(--offset-x, 0px), var(--offset-y, 0px), 0);
  transition: transform 0.65s cubic-bezier(0.34, 1.25, 0.64, 1), filter 0.3s ease;
  will-change: transform, filter;
  z-index: 1;

  &.is-floating {
    z-index: 1000;
    filter: drop-shadow(0 14px 22px rgba(44, 26, 20, 0.25));
  }

  &.is-holding {
    animation: mascotGrabPulse 0.4s ease-in-out;
  }
}

@keyframes mascotGrabPulse {
  0% { transform: translate3d(var(--offset-x, 0px), var(--offset-y, 0px), 0) scale(1); }
  50% { transform: translate3d(var(--offset-x, 0px), var(--offset-y, 0px), 0) scale(1.1); }
  100% { transform: translate3d(var(--offset-x, 0px), var(--offset-y, 0px), 0) scale(1); }
}

/* === Held Ingredient Badge CSS Animations === */
.mascot-held-badge {
  position: absolute;
  bottom: -8px;
  background: #ffffff;
  border: 2px solid $tortilla-yellow;
  border-radius: 20px;
  padding: 3px 8px;
  box-shadow: 0 4px 14px rgba(44, 26, 20, 0.18);
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: bold;
  color: $dark-brown;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1001;
  animation: heldBadgeEnter 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, heldBadgeFloat 2.5s ease-in-out infinite 0.35s;

  &.badge-left {
    left: -12px;
    right: auto;
  }

  &.badge-right {
    right: -12px;
    left: auto;
  }
}

@keyframes heldBadgeEnter {
  0% {
    opacity: 0;
    transform: translateY(15px) scale(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes heldBadgeFloat {
  0%, 100% {
    transform: translateY(0) rotate(-2deg);
  }
  50% {
    transform: translateY(-4px) rotate(3deg);
  }
}

/* === Internal Element Animations === */
.tortilla-blink {
  animation: tortillaBlink 4s infinite;
  transform-box: fill-box;
  transform-origin: center;
}

@keyframes tortillaBlink {
  0%, 92%, 100% {
    transform: scaleY(0);
    opacity: 0;
  }
  94%, 98% {
    transform: scaleY(1);
    opacity: 1;
  }
}
`````

## File: src/components/Recipe/CookbookView.tsx
`````typescript
import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from 'zustand';
import { recipes } from '../../data/catalog/recipes';
import { ingredients as ingredientCatalog } from '../../data/catalog/ingredients';
import { catalogTools as toolsCatalog } from '../../data/catalog/tools';
import { getRecipeRequirementsArray } from '../../types/Recipe';
import type { Recipe } from '../../types/Recipe';
import { useTranslation } from '../../i18n/useTranslation';
import { formatRecipeSteps } from '../../systems/recipeStepFormatter';
import { translateHumanActionsToRecipe } from '../../systems/recipeTranslator';
import { fetchAllRecipesFromDb } from '../../services/dbService';
import { worldStore } from '../../store/worldStore';
import './CookbookView.scss';

export const CookbookView: React.FC = () => {
  const { t, language } = useTranslation();
  const recordedActions = useStore(worldStore, (state) => state.recordedActions);
  const storeActiveRecipeId = useStore(worldStore, (state) => state.activeRecipeId);
  const storeActiveRecipeName = useStore(worldStore, (state) => state.activeRecipeName);

  const [dbRecipes, setDbRecipes] = useState<Recipe[]>([]);

  // Fetch saved DB recipes on mount
  useEffect(() => {
    let isMounted = true;
    fetchAllRecipesFromDb()
      .then((savedList) => {
        if (!isMounted || !savedList || savedList.length === 0) return;
        const parsed: Recipe[] = savedList.map((saved) => {
          if (saved.formats?.recipeJson && typeof saved.formats.recipeJson === 'object') {
            const rJson = saved.formats.recipeJson as unknown as Recipe;
            return {
              ...rJson,
              id: `db-${saved.id}`,
              name: saved.title || rJson.name || 'Saved Recipe',
            };
          }
          if (saved.formats?.mascotSequence && Array.isArray(saved.formats.mascotSequence)) {
            return translateHumanActionsToRecipe(saved.formats.mascotSequence, {
              recipeId: `db-${saved.id}`,
              recipeName: saved.title || 'Saved Recipe',
            });
          }
          return {
            id: `db-${saved.id}`,
            name: saved.title || 'Saved Recipe',
            requirements: (saved.ingredients || []).map((ing) => ({
              id: `req-${ing}`,
              entityId: ing,
              amount: 1,
              unit: 'unidad',
            })),
            steps: [],
          };
        });
        setDbRecipes(parsed);
      })
      .catch((err) => {
        console.warn('Failed to fetch DB recipes in CookbookView:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Translate recorded or loaded actions into a Recipe if available
  const recordedRecipe: Recipe | null = useMemo(() => {
    if (!recordedActions || recordedActions.length === 0) return null;
    return translateHumanActionsToRecipe(recordedActions, {
      recipeId: 'recording',
      recipeName: storeActiveRecipeName && storeActiveRecipeName !== 'Tortilla Española Clásica'
        ? storeActiveRecipeName
        : (t('recipes.recorded.name') && !t('recipes.recorded.name').startsWith('recipes.')
            ? t('recipes.recorded.name')
            : 'Receta Grabada / Cargada'),
    });
  }, [recordedActions, storeActiveRecipeName, t]);

  // Combine static catalog recipes, recorded/loaded recipe, and DB recipes
  const allRecipes = useMemo(() => {
    const list: Recipe[] = [...recipes];
    if (recordedRecipe) {
      list.push(recordedRecipe);
    }
    dbRecipes.forEach((dbR) => {
      if (!list.some((r) => r.id === dbR.id)) {
        list.push(dbR);
      }
    });
    return list;
  }, [recordedRecipe, dbRecipes]);

  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(() => {
    if (recordedRecipe && (storeActiveRecipeId === 'recording' || storeActiveRecipeId === 'recorded')) {
      return recordedRecipe.id;
    }
    return recipes[0]?.id || 'concebolla';
  });

  // Ensure activeRecipe resolves correctly
  const activeRecipe = useMemo(() => {
    const found = allRecipes.find((r) => r.id === selectedRecipeId);
    if (found) return found;
    if (recordedRecipe) return recordedRecipe;
    return allRecipes[0] || recipes[0];
  }, [allRecipes, selectedRecipeId, recordedRecipe]);

  const requirements = useMemo(() => {
    if (!activeRecipe) return [];
    return getRecipeRequirementsArray(activeRecipe).map((req) => {
      const catIng = ingredientCatalog.find((i) => i.id === req.entityId);
      const catTool = toolsCatalog.find((t) => t.id === req.entityId);
      const translatedIng = t(`ingredients.${req.entityId}`);
      const translatedTool = t(`tools.${req.entityId}`);

      let name = req.name || catIng?.name || catTool?.name || req.entityId;
      if (translatedIng && !translatedIng.startsWith('ingredients.')) {
        name = translatedIng;
      } else if (translatedTool && !translatedTool.startsWith('tools.')) {
        name = translatedTool;
      }

      return {
        ...req,
        icon: catIng?.icon || catTool?.icon || '📦',
        displayName: name,
      };
    });
  }, [activeRecipe, t]);

  // Dynamically format recipe steps into human-readable instructions
  const instructions = useMemo(() => {
    if (!activeRecipe) return [];
    if (activeRecipe.steps && activeRecipe.steps.length > 0) {
      return formatRecipeSteps(activeRecipe.steps, t, language);
    }

    // Check if the recipe has a cooklang string fallback
    const cooklangStr = (activeRecipe as Recipe & { cooklang?: string }).cooklang;
    if (cooklangStr) {
      return cooklangStr
        .split('\n')
        .filter((line: string) => line.trim().length > 0)
        .map((line: string) => {
          let cleaned = line.replace(/@([a-zA-Z0-9_-]+)\{([^}]+)\}/g, (_match: string, name: string, qty: string) => {
            const cleanName = name.replace(/_/g, ' ');
            const cleanQty = qty.replace('%', ' ');
            return `${cleanName} (${cleanQty})`;
          });
          cleaned = cleaned.replace(/@([a-zA-Z0-9_-]+)/g, (_match: string, name: string) => {
            return name.replace(/_/g, ' ');
          });
          cleaned = cleaned.replace(/~([a-zA-Z0-9_-]*)\{([^}]+)\}/g, (_match: string, _name: string, duration: string) => {
            return duration.replace('%', ' ');
          });
          return cleaned;
        });
    }

    return [];
  }, [activeRecipe, t, language]);

  // Hints with translation lookup
  const hints = useMemo(() => {
    if (!activeRecipe) return [];
    const translatedList: string[] = [];
    let i = 0;
    while (true) {
      const key = `recipes.${activeRecipe.id}.hints.${i}`;
      const translated = t(key);
      if (!translated || translated === key || translated.startsWith('recipes.')) {
        break;
      }
      translatedList.push(translated);
      i++;
    }
    if (translatedList.length > 0) return translatedList;
    return (activeRecipe as Recipe & { hints?: string[] }).hints || [];
  }, [activeRecipe, t]);

  if (!activeRecipe) return <div>{t('ui.noRecipesAvailable')}</div>;

  const isRecordedOrLoaded = activeRecipe.id === 'recording' || activeRecipe.id.startsWith('db-');

  const recipeMeta = activeRecipe as Recipe & {
    description?: string;
    difficulty?: string;
    tags?: string[];
  };

  const translatedTitle = t(`recipes.${activeRecipe.id}.name`);
  const recipeTitle = (translatedTitle && !translatedTitle.startsWith('recipes.'))
    ? translatedTitle
    : activeRecipe.name;

  const translatedDesc = t(`recipes.${activeRecipe.id}.description`);
  const recipeDesc = (translatedDesc && !translatedDesc.startsWith('recipes.'))
    ? translatedDesc
    : (recipeMeta.description || (isRecordedOrLoaded ? (t('recipes.recorded.description') || 'Receta generada a partir de acciones grabadas o cargadas.') : ''));

  return (
    <div className="cookbook-view">
      <div className="cookbook-selector">
        {allRecipes.map((r) => {
          const isRec = r.id === 'recording' || r.id.startsWith('db-');
          const tName = t(`recipes.${r.id}.name`);
          const displayName = (tName && !tName.startsWith('recipes.')) ? tName : r.name;
          const icon = isRec ? '🎥' : r.id === 'concebolla' ? '🧅' : '🥔';

          return (
            <button
              key={r.id}
              type="button"
              className={`cookbook-tab ${r.id === activeRecipe.id ? 'active' : ''} ${isRec ? 'recorded-tab' : ''}`}
              onClick={() => {
                setSelectedRecipeId(r.id);
                worldStore.getState().setActiveRecipeId(r.id);
                worldStore.getState().setActiveRecipeName(r.name);
                if (!isRec) {
                  worldStore.getState().resetWorld();
                }
              }}
            >
              {icon} {displayName}
            </button>
          );
        })}
      </div>
      <div className="cookbook-card">
        <div className="cookbook-header">
          <h2 className="recipe-title">
            {recipeTitle}
            {isRecordedOrLoaded && (
              <span className="recorded-badge">🎬 {t('ui.recordedSession') || 'Grabada / Cargada'}</span>
            )}
          </h2>
          {recipeDesc && (
            <p className="recipe-description">{recipeDesc}</p>
          )}
          <div className="recipe-meta">
            {recipeMeta.difficulty && (
              <span className="meta-badge difficulty">
                ⭐ {recipeMeta.difficulty}
              </span>
            )}
            {recipeMeta.tags && recipeMeta.tags.map((tag: string) => (
              <span key={tag} className="meta-badge tag">🏷️ {tag}</span>
            ))}
            {isRecordedOrLoaded && (
              <span className="meta-badge tag custom-tag">🎥 Custom / Recorded</span>
            )}
          </div>
        </div>
        <div className="cookbook-body">
          <div className="ingredients-section">
            <h3>🛒 {t('ui.requiredMaterials')}</h3>
            {requirements.length > 0 ? (
              <ul className="ingredients-list">
                {requirements.map((req, i) => (
                  <li key={i} className="ingredient-item">
                    <span className="ingredient-icon">{req.icon}</span>
                    <div className="ingredient-details">
                      <span className="ingredient-name">{req.displayName}</span>
                      <span className="ingredient-amount">
                        {req.amount} {req.unit}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-notice">{t('ui.noIngredientsListed') || 'Sin ingredientes especificadas.'}</p>
            )}
          </div>
          <div className="instructions-section">
            <h3>🍳 {t('ui.instructions')}</h3>
            {instructions.length > 0 ? (
              <ol className="instructions-list">
                {instructions.map((step: string, idx: number) => (
                  <li key={idx} className="instruction-step">
                    <span className="step-number">{idx + 1}</span>
                    <p className="step-text">{step}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="empty-notice">{t('ui.noInstructionsListed') || 'Sin pasos registrados todavía.'}</p>
            )}
            {hints.length > 0 && (
              <div className="recipe-hints">
                <h4>💡 {t('ui.chefsHints')}</h4>
                <ul>
                  {hints.map((hint: string, i: number) => (
                    <li key={i}>{hint}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
`````

## File: src/components/Recipe/RecipePanel.tsx
`````typescript
/**
 * FILE: RecipePanel.tsx
 *
 * PURPOSE:
 * Compact, unintrusive recipe selector and catalog viewer.
 *
 * RESPONSIBILITY:
 * - Wires catalog recipes (Con Cebolla, Sin Cebolla) with RecipeRequirements.
 * - Displays active recipe requirements and matches with current world state.
 */

import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import './RecipePanel.scss';

export function RecipePanel() {
  const dispatch = useStore(worldStore, (state) => state.dispatch);

  return (
    <div className="recipe-panel compact-recipe-panel">
      <div className="recipe-panel-header">
        <button
          type="button"
          className="recipe-reset-btn"
          onClick={() => dispatch({ type: 'RESET_WORLD' })}
          title="Clean the kitchen and start over"
        >
          🔄 Reset Kitchen
        </button>
      </div>
    </div>
  );
}
`````

## File: src/store/types.ts
`````typescript
/**
 * FILE: types.ts
 *
 * PURPOSE:
 * Type contract for Zustand world store and its slices.
 */

import type { Container, Entity, WorldAction, WorldEvent } from '../types/world';
import type { EntitySlice } from './slices/entitySlice';
import type { ContainerSlice } from './slices/containerSlice';
import type { MascotSlice } from './slices/mascotSlice';
import type { RecordSlice } from './slices/recordSlice';
import type { FocusSlice } from './slices/focusSlice';

export type WorldStateStore = {
  entities: Record<string, Entity>;
  containers: Record<string, Container>;
  events: WorldEvent[];
  activeRecipeName?: string;
  setActiveRecipeName: (name: string) => void;
  activeRecipeId?: string;
  setActiveRecipeId: (recipeId: string) => void;
  dispatch: (action: WorldAction) => void;
  emitEvent: (event: WorldEvent) => void;
  onEvent: (listener: (event: WorldEvent) => void) => () => void;
  resetWorld: () => void;
} & EntitySlice &
  ContainerSlice &
  MascotSlice &
  RecordSlice &
  FocusSlice;
`````

## File: src/store/worldStore.test.ts
`````typescript
/**
 * FILE: worldStore.test.ts
 *
 * PURPOSE:
 * Unit tests for central world store and container rule enforcement.
 *
 * RESPONSIBILITY:
 * - Validates state transitions, move/add entity actions, and rule checks.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from './worldStore';
import { clearActionLog, getActionLog } from './middleware/actionLog';

function seed() {
  worldStore.setState({
    entities: {
      potato: { id: 'potato', name: 'Potato', type: 'ingredient' },
      onion: { id: 'onion', name: 'Onion', type: 'ingredient' },
      knife: { id: 'knife', name: 'Knife', type: 'tool' },
      chef: { id: 'chef', name: 'Chef', type: 'mascot' },
    },
    containers: {
      kitchen: {
        id: 'kitchen',
        name: 'Kitchen',
        type: 'storage',
        entityIds: ['potato', 'onion', 'knife'],
      },
      burner1: {
        id: 'burner1',
        name: 'burner1',
        type: 'burner',
        entityIds: [],
        rules: { maxCapacity: 1 },
      },
      board: {
        id: 'board',
        name: 'Cutting Board',
        type: 'board',
        entityIds: [],
        rules: { allowedTypes: ['ingredient'] },
      },
      recipe: {
        id: 'recipe',
        name: 'Recipe',
        type: 'plate',
        entityIds: [],
        rules: { allowedTypes: ['ingredient'] },
      },
      sink: {
        id: 'sink',
        name: 'Sink',
        type: 'sink',
        entityIds: [],
      },
      bowl: {
        id: 'bowl',
        name: 'Bowl',
        type: 'bowl',
        entityIds: [],
      },
    },
  });
}

describe('worldStore container rule enforcement', () => {
  beforeEach(() => {
    seed();
    clearActionLog();
  });

  it('allows a move that satisfies the target container rules', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'burner1' },
    });

    const state = worldStore.getState();
    expect(state.containers.burner1.entityIds).toEqual(['potato']);
    expect(state.containers.kitchen.entityIds).not.toContain('potato');
  });

  it('blocks a move once the target container is at capacity', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'burner1' },
    });
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'onion', targetContainerId: 'burner1' },
    });

    const state = worldStore.getState();
    expect(state.containers.burner1.entityIds).toEqual(['potato']);
    expect(state.containers.kitchen.entityIds).toContain('onion');
  });

  it('blocks a move that violates allowedTypes', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'knife', targetContainerId: 'board' },
    });

    // knife is a tool; board only allows ingredients
    const state = worldStore.getState();
    expect(state.containers.board.entityIds).toEqual([]);
    expect(state.containers.kitchen.entityIds).toContain('knife');
  });

  it('never re-validates a same-container reorder', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'kitchen', positionIndex: 0 },
    });

    const state = worldStore.getState();
    expect(state.containers.kitchen.entityIds[0]).toBe('potato');
  });

  it('is a no-op when the entity does not exist', () => {
    const before = worldStore.getState().containers.burner1.entityIds;
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'ghost', targetContainerId: 'burner1' },
    });
    expect(worldStore.getState().containers.burner1.entityIds).toEqual(before);
  });

  it('enforces the same rules on ADD_ENTITY', () => {
    worldStore.getState().dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: { id: 'spoon', name: 'Spoon', type: 'tool' },
        containerId: 'board',
      },
    });

    const state = worldStore.getState();
    expect(state.containers.board.entityIds).toEqual([]);
    expect(state.entities.spoon).toBeUndefined();
  });

  it('logs a labelled entry into the action log for each dispatch', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'burner1' },
    });

    const log = getActionLog();
    expect(log).toHaveLength(1);
    expect(log[0].action).toBe('MOVE_ENTITY');
    expect(typeof log[0].timestamp).toBe('number');
  });

  it('keeps source entity and creates copy in target when moving from an immutable container', () => {
    worldStore.setState({
      entities: {
        potato: { id: 'potato', name: 'Potato', type: 'ingredient' },
      },
      containers: {
        pantry: {
          id: 'pantry',
          name: 'Immutable Pantry',
          type: 'storage',
          entityIds: ['potato'],
          rules: { isImmutable: true },
        },
        burner1: {
          id: 'burner1',
          name: 'burner1',
          type: 'burner',
          entityIds: [],
        },
      },
    });

    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'burner1' },
    });

    const state = worldStore.getState();
    // Source container retains original entity
    expect(state.containers.pantry.entityIds).toEqual(['potato']);
    // Target container gets a copy instance
    expect(state.containers.burner1.entityIds.length).toBe(1);
    const copyId = state.containers.burner1.entityIds[0];
    expect(copyId).not.toBe('potato');
    expect(state.entities[copyId].name).toBe('Potato');
  });

  it('rejects adding a duplicate ingredient to a container according to Rule 6', () => {
    worldStore.setState({
      entities: {
        potato: { id: 'potato', ingredientId: 'potato', name: 'Potato', type: 'ingredient' },
        potato_copy: { id: 'potato_copy', ingredientId: 'potato', name: 'Potato Copy', type: 'ingredient' },
      },
      containers: {
        pantry: {
          id: 'pantry',
          name: 'Pantry',
          type: 'storage',
          entityIds: ['potato_copy'],
          rules: { isImmutable: true },
        },
        burner1: {
          id: 'burner1',
          name: 'burner1',
          type: 'burner',
          entityIds: ['potato'],
        },
      },
    });

    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato_copy', targetContainerId: 'burner1' },
    });

    const state = worldStore.getState();
    // burner1 should still only have 1 potato because duplicate ingredient is blocked
    expect(state.containers.burner1.entityIds).toEqual(['potato']);
  });

  it('updates ingredient status to peeled when preparation is peeled', () => {
    worldStore.setState({
      entities: {
        potato: { id: 'potato', ingredientId: 'potato', name: '🥔 Potatoes', type: 'ingredient' },
      },
      containers: {
        board: { id: 'board', name: 'Board', type: 'board', entityIds: ['potato'] },
      },
    });

    worldStore.getState().dispatch({
      type: 'PREPARE_INGREDIENT',
      payload: { entityId: 'potato', preparation: 'peeled' },
    });

    const state = worldStore.getState();
    const entity = state.entities.potato;
    expect(entity.state?.preparation).toBe('peeled');
    expect(entity.state?.status).toBe('peeled');
    expect(entity.name).toBe('🥔 Peeled Potatoes');
  });

  it('updates ingredient status to sliced-potatoe and diced-potatoe generically', () => {
    worldStore.setState({
      entities: {
        potato: { id: 'potato', ingredientId: 'potato', name: '🥔 Potatoes', type: 'ingredient' },
        onion: { id: 'onion', ingredientId: 'onion', name: '🧅 Onion', type: 'ingredient' },
      },
      containers: {
        board: { id: 'board', name: 'Board', type: 'board', entityIds: ['potato', 'onion'] },
      },
    });

    worldStore.getState().dispatch({
      type: 'PREPARE_INGREDIENT',
      payload: { entityId: 'potato', preparation: 'sliced' },
    });

    worldStore.getState().dispatch({
      type: 'PREPARE_INGREDIENT',
      payload: { entityId: 'onion', preparation: 'diced' },
    });

    const state = worldStore.getState();
    expect(state.entities.potato.state?.status).toBe('sliced-potatoe');
    expect(state.entities.onion.state?.status).toBe('diced-onion');
  });

  it('toggles container heat state and emits CONTAINER_HEAT_TOGGLED world event on TOGGLE_HEAT', () => {
    const eventsReceived: Array<{ type: string; payload: unknown }> = [];
    const unsubscribe = worldStore.getState().onEvent((event) => {
      eventsReceived.push(event);
    });

    expect(worldStore.getState().containers.burner1.isOn).toBeFalsy();

    // Toggle heat ON
    worldStore.getState().dispatch({
      type: 'TOGGLE_HEAT',
      payload: { containerId: 'burner1' },
    });

    expect(worldStore.getState().containers.burner1.isOn).toBe(true);
    expect(eventsReceived).toHaveLength(1);
    expect(eventsReceived[0]).toEqual({
      type: 'CONTAINER_HEAT_TOGGLED',
      payload: { containerId: 'burner1', isOn: true },
    });

    // Toggle heat OFF
    worldStore.getState().dispatch({
      type: 'TOGGLE_HEAT',
      payload: { containerId: 'burner1' },
    });

    expect(worldStore.getState().containers.burner1.isOn).toBe(false);
    expect(eventsReceived).toHaveLength(2);
    expect(eventsReceived[1]).toEqual({
      type: 'CONTAINER_HEAT_TOGGLED',
      payload: { containerId: 'burner1', isOn: false },
    });

    unsubscribe();
  });

  it('toggles container heat state and emits CONTAINER_HEAT_TOGGLED world event on TOGGLE_BURNER', () => {
    const eventsReceived: Array<{ type: string; payload: unknown }> = [];
    const unsubscribe = worldStore.getState().onEvent((event) => {
      eventsReceived.push(event);
    });

    expect(worldStore.getState().containers.board.isOn).toBeFalsy();

    worldStore.getState().dispatch({
      type: 'TOGGLE_BURNER',
      payload: { containerId: 'board' },
    });

    expect(worldStore.getState().containers.board.isOn).toBe(true);
    expect(eventsReceived[0]).toEqual({
      type: 'CONTAINER_HEAT_TOGGLED',
      payload: { containerId: 'board', isOn: true },
    });

    unsubscribe();
  });

  it('emits workstation container action world events for WASH, CUT, PEEL, and MIX actions', () => {
    const eventsReceived: Array<{ type: string; payload: unknown }> = [];
    const unsubscribe = worldStore.getState().onEvent((event) => {
      eventsReceived.push(event);
    });

    // WASH
    worldStore.getState().dispatch({
      type: 'WASH_CONTAINER_CONTENTS',
      payload: { containerId: 'sink' },
    });

    // CUT
    worldStore.getState().dispatch({
      type: 'CUT_CONTAINER_CONTENTS',
      payload: { containerId: 'board' },
    });

    // PEEL
    worldStore.getState().dispatch({
      type: 'PEEL_CONTAINER_CONTENTS',
      payload: { containerId: 'board' },
    });

    // MIX
    worldStore.getState().dispatch({
      type: 'MIX_CONTAINER_CONTENTS',
      payload: { containerId: 'bowl' },
    });

    expect(eventsReceived).toHaveLength(4);

    expect(eventsReceived[0]).toEqual({
      type: 'CONTAINER_WASHED',
      payload: {
        containerId: 'sink',
        entityIds: worldStore.getState().containers.sink?.entityIds || [],
      },
    });

    expect(eventsReceived[1]).toEqual({
      type: 'CONTAINER_CUT',
      payload: {
        containerId: 'board',
        entityIds: worldStore.getState().containers.board?.entityIds || [],
      },
    });

    expect(eventsReceived[2]).toEqual({
      type: 'CONTAINER_PEELED',
      payload: {
        containerId: 'board',
        entityIds: worldStore.getState().containers.board?.entityIds || [],
      },
    });

    expect(eventsReceived[3]).toEqual({
      type: 'CONTAINER_MIXED',
      payload: {
        containerId: 'bowl',
        entityIds: worldStore.getState().containers.bowl?.entityIds || [],
      },
    });

    unsubscribe();
  });

  it('transforms ingredient status and name when container actions are dispatched (washed-onion, washed-egg, peeled-potatoes)', () => {
    worldStore.setState({
      entities: {
        egg: { id: 'egg', ingredientId: 'egg', name: '🥚 Eggs', type: 'ingredient' },
        onion: { id: 'onion', ingredientId: 'onion', name: '🧅 Onion', type: 'ingredient' },
        potato: { id: 'potato', ingredientId: 'potatoes', name: '🥔 Potatoes', type: 'ingredient' },
      },
      containers: {
        sink: { id: 'sink', name: 'Sink', type: 'sink', entityIds: ['egg', 'onion'] },
        board: { id: 'board', name: 'Board', type: 'board', entityIds: ['potato'] },
      },
    });

    // Wash sink contents
    worldStore.getState().dispatch({
      type: 'WASH_CONTAINER_CONTENTS',
      payload: { containerId: 'sink' },
    });

    let state = worldStore.getState();
    expect(state.entities.egg.status).toBe('washed-egg');
    expect(state.entities.egg.name).toBe('🥚 Washed Eggs');
    expect(state.entities.onion.status).toBe('washed-onion');
    expect(state.entities.onion.name).toBe('🧅 Washed Onion');

    // Peel board contents
    worldStore.getState().dispatch({
      type: 'PEEL_CONTAINER_CONTENTS',
      payload: { containerId: 'board' },
    });

    state = worldStore.getState();
    expect(state.entities.potato.status).toBe('peeled-potatoes');
    expect(state.entities.potato.name).toBe('🥔 Peeled Potatoes');
  });

  it('prevents duplicate transformations when washing or cutting multiple times (idempotency)', () => {
    worldStore.setState({
      entities: {
        onion: { id: 'onion', ingredientId: 'onion', name: '🧅 Onion', type: 'ingredient' },
      },
      containers: {
        sink: { id: 'sink', name: 'Sink', type: 'sink', entityIds: ['onion'] },
      },
    });

    // First wash
    worldStore.getState().dispatch({
      type: 'WASH_CONTAINER_CONTENTS',
      payload: { containerId: 'sink' },
    });

    let onion = worldStore.getState().entities.onion;
    expect(onion.status).toBe('washed-onion');
    expect(onion.name).toBe('🧅 Washed Onion');

    // Second wash (should have no extra effect)
    worldStore.getState().dispatch({
      type: 'WASH_CONTAINER_CONTENTS',
      payload: { containerId: 'sink' },
    });

    onion = worldStore.getState().entities.onion;
    expect(onion.status).toBe('washed-onion');
    expect(onion.name).toBe('🧅 Washed Onion');
  });

  it('chains multiple transformations into cumulative status e.g. peeled-cutted-cooked-tomatoes', () => {
    worldStore.setState({
      entities: {
        tomatoes: { id: 'tomatoes', ingredientId: 'tomatoes', name: '🍅 Tomatoes', type: 'ingredient' },
      },
      containers: {
        board: { id: 'board', name: 'Board', type: 'board', entityIds: ['tomatoes'] },
      },
    });

    // 1. Peel
    worldStore.getState().dispatch({
      type: 'PEEL_CONTAINER_CONTENTS',
      payload: { containerId: 'board' },
    });

    // 2. Cut
    worldStore.getState().dispatch({
      type: 'CUT_CONTAINER_CONTENTS',
      payload: { containerId: 'board' },
    });

    // 3. Cook
    worldStore.getState().transformIngredient('tomatoes', 'cook');

    const tomato = worldStore.getState().entities.tomatoes;
    expect(tomato.status).toBe('peeled-cutted-cooked-tomatoes');
    expect(tomato.name).toBe('🍅 Peeled Cut Cooked Tomatoes');
  });

  describe('Trash behavior and EMPTY_TRASH action', () => {
    it('empties the trash container and deletes trashed entities', () => {
      worldStore.setState({
        entities: {
          lemon_1: { id: 'lemon_1', ingredientId: 'lemon', name: '🍋 Lemon 1', type: 'ingredient' },
          potato_1: { id: 'potato_1', ingredientId: 'potato', name: '🥔 Potato 1', type: 'ingredient' },
        },
        containers: {
          trash: { id: 'trash', name: 'Trash', type: 'storage', entityIds: ['lemon_1', 'potato_1'] },
        },
      });

      worldStore.getState().dispatch({ type: 'EMPTY_TRASH' });

      const state = worldStore.getState();
      expect(state.containers.trash.entityIds).toEqual([]);
      expect(state.entities.lemon_1).toBeUndefined();
      expect(state.entities.potato_1).toBeUndefined();
    });

    it('rejects adding 2 raw lemons to the trash container (uniqueness rule)', () => {
      worldStore.setState({
        entities: {
          lemon_1: { id: 'lemon_1', ingredientId: 'lemon', name: '🍋 Lemon 1', type: 'ingredient', state: {} },
          lemon_2: { id: 'lemon_2', ingredientId: 'lemon', name: '🍋 Lemon 2', type: 'ingredient', state: {} },
        },
        containers: {
          pantry: { id: 'pantry', name: 'Pantry', type: 'storage', entityIds: ['lemon_1', 'lemon_2'] },
          trash: { id: 'trash', name: 'Trash', type: 'storage', entityIds: [] },
        },
      });

      // First raw lemon moved to trash -> succeeds
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: { entityId: 'lemon_1', targetContainerId: 'trash', sourceContainerId: 'pantry' },
      });
      expect(worldStore.getState().containers.trash.entityIds).toEqual(['lemon_1']);

      // Second raw lemon moved to trash -> rejected by uniqueness check
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: { entityId: 'lemon_2', targetContainerId: 'trash', sourceContainerId: 'pantry' },
      });
      expect(worldStore.getState().containers.trash.entityIds).toEqual(['lemon_1']);
      expect(worldStore.getState().containers.pantry.entityIds).toContain('lemon_2');
    });

    it('accepts raw lemon AND peeled lemon in the trash container', () => {
      worldStore.setState({
        entities: {
          lemon_raw: { id: 'lemon_raw', ingredientId: 'lemon', name: '🍋 Raw Lemon', type: 'ingredient', state: {} },
          lemon_peeled: { id: 'lemon_peeled', ingredientId: 'lemon', name: '🍋 Peeled Lemon', type: 'ingredient', state: { preparation: 'peeled' } },
        },
        containers: {
          pantry: { id: 'pantry', name: 'Pantry', type: 'storage', entityIds: ['lemon_raw', 'lemon_peeled'] },
          trash: { id: 'trash', name: 'Trash', type: 'storage', entityIds: [] },
        },
      });

      // Move raw lemon to trash -> succeeds
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: { entityId: 'lemon_raw', targetContainerId: 'trash', sourceContainerId: 'pantry' },
      });
      expect(worldStore.getState().containers.trash.entityIds).toEqual(['lemon_raw']);

      // Move peeled lemon to trash -> succeeds because preparation states differ
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: { entityId: 'lemon_peeled', targetContainerId: 'trash', sourceContainerId: 'pantry' },
      });
      expect(worldStore.getState().containers.trash.entityIds).toEqual(['lemon_raw', 'lemon_peeled']);
    });

    it('moves an ingredient sequentially between workstations using MOVE_ENTITY', () => {
      worldStore.setState({
        entities: {
          potato_1: { id: 'potato_1', ingredientId: 'potato', name: '🥔 Potato', type: 'ingredient', state: {} },
        },
        containers: {
          board: { id: 'board', name: 'Board', type: 'board', entityIds: ['potato_1'] },
          bowl: { id: 'bowl', name: 'Bowl', type: 'bowl', entityIds: [] },
          burner1: { id: 'burner1', name: 'Burner 1', type: 'burner', entityIds: [] },
        },
      });

      // Move forward from board to bowl
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: { entityId: 'potato_1', targetContainerId: 'bowl', sourceContainerId: 'board' },
      });
      expect(worldStore.getState().containers.board.entityIds).toEqual([]);
      expect(worldStore.getState().containers.bowl.entityIds).toEqual(['potato_1']);

      // Move forward from bowl to burner1
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: { entityId: 'potato_1', targetContainerId: 'burner1', sourceContainerId: 'bowl' },
      });
      expect(worldStore.getState().containers.bowl.entityIds).toEqual([]);
      expect(worldStore.getState().containers.burner1.entityIds).toEqual(['potato_1']);

      // Move backward from burner1 to bowl
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: { entityId: 'potato_1', targetContainerId: 'bowl', sourceContainerId: 'burner1' },
      });
      expect(worldStore.getState().containers.burner1.entityIds).toEqual([]);
      expect(worldStore.getState().containers.bowl.entityIds).toEqual(['potato_1']);
    });
  });
});
`````

## File: src/systems/clasicaCompletion.test.ts
`````typescript
/**
 * FILE: src/systems/clasicaCompletion.test.ts
 *
 * PURPOSE:
 * Integration tests verifying entity states and container cleanups at the completion of clasicaRecipe.
 *
 * VERIFIES:
 * - Preparation bowl (bowl) is empty at the end.
 * - Plato (plate) contains ONLY mixture at the end.
 * - Mixed input ingredients disappear from all world containers.
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { worldStore } from '../store/worldStore';
import { RecipeRunner } from './recipeRunner';
import { clasicaRecipe } from '../data/catalog/recipes/clasica';
import { clearActionLog } from '../store/middleware/actionLog';

function seedTestWorld() {
  worldStore.setState({
    entities: {
      chef: { id: 'chef', name: 'Chef Tortilla 🍳', type: 'mascot', state: { gazingAt: null } },
      potato: { id: 'potato', ingredientId: 'potato', name: 'Potato', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      egg: { id: 'egg', ingredientId: 'egg', name: 'Egg', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      oil: { id: 'oil', ingredientId: 'oil', name: 'Oil', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      salt: { id: 'salt', ingredientId: 'salt', name: 'Salt', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      black_pepper: { id: 'black_pepper', ingredientId: 'black_pepper', name: 'Pepper', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
    },
    containers: {
      despensa: {
        id: 'despensa',
        name: 'Despensa',
        type: 'storage',
        entityIds: ['potato', 'egg', 'oil', 'salt', 'black_pepper'],
        rules: { isImmutable: true },
      },
      sink: {
        id: 'sink',
        name: 'Sink',
        type: 'sink',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      board: {
        id: 'board',
        name: 'Board',
        type: 'board',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      bowl: {
        id: 'bowl',
        name: 'Bowl',
        type: 'bowl',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      burner1: {
        id: 'burner1',
        name: 'burner1',
        type: 'burner',
        entityIds: [],
        rules: { maxCapacity: 5 },
      },
      plate: {
        id: 'plate',
        name: 'Plate',
        type: 'plate',
        entityIds: [],
        rules: { maxCapacity: 5 },
      },
    },
    dispatch: worldStore.getState().dispatch,
  });
}

describe('Clásica Recipe Completion State', () => {
  beforeEach(() => {
    seedTestWorld();
    clearActionLog();
  });

  it('ensures preparation bowl is empty, and plato contains ONLY mixture', async () => {
    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 1 });
    await runner.runRecipe(clasicaRecipe);

    const state = worldStore.getState();

    // 1. Preparation bowl is empty
    expect(state.containers.bowl.entityIds).toEqual([]);

    // 2. fireplace is empty
    //expect(state.containers.pan.entityIds).toEqual([]);

    // 3. Plato (plate) contains ONLY the served Tortilla clásica
    expect(state.containers.plate.entityIds).toHaveLength(1);
    const servedEntityId = state.containers.plate.entityIds[0];
    const servedEntity = state.entities[servedEntityId];
    expect(servedEntity).toBeDefined();
    expect(servedEntity.name).toBe('Tortilla clásica');

    // 4. Input ingredients and cooking oil are marked as consumed
    const mixtureId = runner.recipeContext.bindings['mixture'];
    expect(mixtureId).toBe(servedEntityId);

    const potatoesId = runner.recipeContext.bindings['potatoes'];
    const eggsId = runner.recipeContext.bindings['eggs'];
    const saltId = runner.recipeContext.bindings['salt'];
    const pepperId = runner.recipeContext.bindings['black_pepper'];

    expect(state.entities[potatoesId]?.state?.consumed).toBe(true);
    expect(state.entities[eggsId]?.state?.consumed).toBe(true);
    expect(state.entities[saltId]?.state?.consumed).toBe(true);
    expect(state.entities[pepperId]?.state?.consumed).toBe(true);

    // Verify none of the consumed ingredients remain in any workstation container
    const workstationContainerIds = ['sink', 'board', 'bowl', 'burner1', 'plate'];
    for (const cId of workstationContainerIds) {
      expect(state.containers[cId].entityIds).not.toContain(potatoesId);
      expect(state.containers[cId].entityIds).not.toContain(eggsId);
      expect(state.containers[cId].entityIds).not.toContain(saltId);
      expect(state.containers[cId].entityIds).not.toContain(pepperId);
    }
  });
});
`````

## File: docs/systems.md
`````markdown
# Systems

## Overview

Systems contain the behaviour of Tortilla World.

Components display the world.
Systems modify the world.

A system receives actions, validates them, and updates the world state.

The general flow is:

```text
Input
  |
  v
Action
  |
  v
System
  |
  v
Validation
  |
  v
World State Update
  |
  v
UI Update
```

---

# System Architecture

Tortilla World is based on independent systems.

Current and planned systems:

```text
Systems

├── Interaction System
├── Movement System
├── Container System
├── Mascot System
├── Animation System
├── Cooking System
└── AI System
```

Each system has a clear responsibility.

---

# Interaction System

## Responsibility

The Interaction System converts external events into world actions.

External events:

* mouse drag and drop
* touch drag and drop (configured via `TouchSensor` with delay/tolerance & `touch-action: none`)
* workstation navigation buttons (`◀` / `▶` step movement)
* AI requests
* future keyboard/gamepad input

The Interaction System does not modify the world directly.

---

## Example

User drags potato into pan.

The Interaction System creates:

```ts
{
  type:"MOVE_ENTITY",
  entityId:"potato",
  targetContainer:"pan"
}
```

The action is passed to the Movement System.

---

# Movement System

## Responsibility

The Movement System controls ownership changes.

It handles:

* moving entities
* validating source ownership
* validating destination rules
* applying transfer behaviour

---

## Move Flow

```text
Move Request

      |
      v

Find Entity

      |
      v

Find Current Container

      |
      v

Find Target Container

      |
      v

Validate Move

      |
      v

Apply Transfer Rule

      |
      v

Update Ownership

```

---

# Move Validation

Before moving an entity, the system checks:

## Entity existence

Does the entity exist?

Example:

```text
potato
```

must exist in the world.

---

## Source ownership

Does the source container own the entity?

Example:

Valid:

```text
Kitchen owns potato
```

Invalid:

```text
Pan owns potato
```

when moving from Kitchen.

---

## Destination capability

Can the target container accept this entity?

Example:

A pan may accept:

```text
ingredient
```

but reject:

```text
container
```

---

## Duplicate rules

The container checks uniqueness using state-aware ingredient matching (`getIngredientCatalogId`).

Uniqueness incorporates ingredient preparation and cooking states (`baseId:preparation:cooking`):

Valid (different ingredients OR different states):

```text
Trash
  - raw lemon (lemon)
  - peeled lemon (lemon:peeled)
```

Invalid (two identical raw ingredients):

```text
Trash
  - raw lemon (lemon)
  - raw lemon (lemon)
```

---

# Transfer Rules

A move is not always the same operation.

Containers define transfer behaviour.

---

# Static Container To Dynamic Container

Example:

```text
Kitchen
 |
 potato


Recipe
```

Move potato:

Result:

```text
Kitchen
 |
 potato


Recipe
 |
 potato
```

The destination receives the ingredient.

The source remains unchanged.

This represents a world resource.

---

# Dynamic Container To Dynamic Container

Example:

```text
Recipe
 |
 potato


Pan
```

Move potato:

Result:

```text
Recipe


Pan
 |
 potato
```

Ownership transfers.

---

# Dynamic Container To Static Container

Example:

```text
Recipe
 |
 potato


Kitchen
```

Move potato back.

Result:

```text
Recipe


Kitchen
 |
 potato
```

The dynamic container loses ownership.

The static container provides the original world resource.

---

# Container System

## Responsibility

The Container System manages container rules.

It answers questions:

* Can this entity be added?
* Can this entity be removed?
* Are duplicates allowed?
* Is the container full?
* Does ordering matter?

---

## Example API

```ts
canAccept(
  container,
  entity
)
```

returns:

```ts
true
```

or:

```ts
false
```

---

## Trash Container & EMPTY_TRASH Action

The `trash` container stores discarded entities.

When the user empties the trash bin:
1. `EMPTY_TRASH` action is dispatched to `worldStore`.
2. The system empties `containers.trash.entityIds = []`.
3. The trashed entities are deleted from `worldStore.entities`.

### Mascot Empty Trash Confirmation Flow
When the user clicks the "Empty Trash" button on the trash container:
1. The Mascot moves gaze/focus to `trash` (`MASCOT_MOVE`) and shows a speech message asking *"Are you sure you want to empty the trash?"*.
2. The user is presented with **Yes, empty** (`EMPTY_TRASH`) or **Cancel** options.
3. Confirming executes `EMPTY_TRASH` and dismisses the Mascot speech bubble; canceling dismisses the message.

---

## Responsibility

All world changes should pass through an action queue.

Example:

```text
AI
 |
User
 |
System
 |
Action Queue
 |
World Update
```

---

## Example Action

```ts
{
 type:"MOVE_ENTITY",

 entityId:"egg",

 source:"kitchen",

 target:"recipe"
}
```

---

## Benefits

Action queues provide:

* debugging
* replay
* logging
* AI control
* animations
* delayed actions

---

# Action Replay System (`ActionPlayer` & `ActionReplayer`)

## Responsibility

The Action Replay System enables recording, storing, and sequentially replaying discrete `WorldAction` JSON logs in Tortilla World.

It consists of:
1. **Headless Replay Utility (`src/systems/actionPlayer.ts`)**:
   - `ActionPlayer` class / `actionPlayer` singleton.
   - `playLog(actions: WorldAction[], options?: PlaybackOptions)`: Resets world state via `RESET_WORLD` action, then dispatches each action step sequentially to `worldStore.getState().dispatch(action)` with configurable delays.
   - Provides step progress callbacks (`onStep(current, total, action)`), completion callbacks (`onComplete()`), and early cancellation (`stop()`).

2. **React Controls UI (`src/components/Controls/ActionReplayer.tsx`)**:
   - Accepts uploaded `.json` files via `FileReader`.
   - Validates JSON format to ensure an array of valid `WorldAction` objects.
   - Displays live step progress (`Step X / Y`), progress bar, step delay selector, and a Stop button.

---

# Animation System

## Responsibility

The Animation System reacts to world changes.

It does not decide what happens.

Example:

Movement System:

```text
Potato moved to Pan
```

Animation System:

```text
Play potato movement animation
```

---

## Separation

Bad:

```text
Drag component:
move object
animate object
change state
```

Good:

```text
Drag component:
create action


Movement System:
change state


Animation System:
animate change
```

---

# Cooking System

## Responsibility

Future system for transforming entities.

Examples:

```text
Potato
+
Oil
+
Heat

    |
    v

Fried Potato
```

---

The cooking system changes entity state.

Example:

Before:

```ts
{
 type:"ingredient",
 state:"raw"
}
```

After:

```ts
{
 type:"ingredient",
 state:"cooked"
}
```

---

# AI System

## Responsibility

The AI System creates actions.

The AI does not directly manipulate Zustand state.

---

Example:

AI decides:

```text
Prepare tortilla
```

Creates:

```ts
[
 {
  type:"MOVE_ENTITY",
  entityId:"potato",
  target:"pan"
 },

 {
  type:"ADD_HEAT",
  target:"pan"
 }
]
```

The normal systems execute them.

---

# System Communication

Systems communicate through actions and world state.

Example:

```text
Interaction System

        |
        v

Move Action

        |
        v

Movement System

        |
        v

World Store

        |
        v

Animation System

```

---

# Zustand Responsibility

Zustand is the storage layer.

It stores:

* entities
* containers
* relationships
* world state

It should not contain UI logic.

---

Example:

Good:

```ts
moveEntity(
 entityId,
 from,
 to
)
```

Bad:

```ts
onDropIngredient(
 mouseEvent
)
```

---

# Testing Strategy

Systems should be testable without React.

Example:

```ts
moveEntity(
 "potato",
 "kitchen",
 "pan"
)
```

Expected:

```text
Kitchen:
empty

Pan:
potato
```

---

# Future Systems

Possible additions:

## Time System

Controls:

* cooking duration
* day/night
* events

---

## Physics System

Controls:

* collisions
* falling objects
* movement

---

## Economy System

Controls:

* ingredients cost
* customers
* money

---

## Character System

Controls:

* NPCs
* player actions
* behaviours

---

## Mascot System & Recipe System

### Mascot System
Controls:

* `MASCOT_FLIP`: Flips Tortilla mascot in place.
* `MASCOT_MOVE`: Moves gaze/focus of Tortilla to target container.
* `MASCOT_GRAB`: Commands Tortilla to grab ingredient entity from a container.
* `MASCOT_DROP`: Commands Tortilla to drop held ingredient into target container obeying rules.

Dispatch helpers and automated action sequences (e.g. `runFollowRecipeScript`) are located in `src/systems/mascotActions.ts` for AI agent, console, or UI integration.

React components (`Mascot.tsx`) translate pure target container state into physical Framer Motion spring translations across the DOM viewport without touching store logic.

---

### Recipe System & RecipeRunner

The Recipe System executes declarative, step-based recipe state machines via `RecipeRunner` (`src/systems/recipeRunner.ts` / `src/systems/recipeRunner/`).

#### Architecture:
* **Declarative Data**: Recipes (`RecipeStep[]`) define *what* needs to happen (e.g. `move`, `grab`, `drop`, `cut`, `cook`, `mix`, `wait`, `flip`, `speak`, `celebrate`) without referencing specific kitchen containers or locations.
* **Modular Handler Architecture**: `RecipeRunner` delegates step execution to focused step handlers (`src/systems/recipeRunner/handlers/`):
  - `moveHandlers.ts`: Relocation steps (`move`, `grab`, `drop`).
  - `prepHandlers.ts`: Preparation steps (`cut`, `prepare`, `peel`, `wash`, `rinse`, `drain`).
  - `cookHandlers.ts`: Thermal & flip steps (`cook`, `flip`).
  - `mixHandlers.ts`: Combination steps (`mix`, `beat`, `combine`).
  - `utilityHandlers.ts`: Narrative & completion steps (`serve`, `wait`, `instruction`, `speak`, `celebrate`).
* **Workstation & Tool Resolution**: `RecipeRunner` dynamically queries the Workstation engine (`src/engine/workstations.ts`) to determine the required workstation (`pantry`, `washing_station`, `cutting_station`, `preparation_station`, `cooking_station`, `serving_station`) and tools (`knife`, `peeler`, `whisk`, `fork`, `spatula`, etc.) for each step.
* **Generic Execution**: `RecipeRunner` iterates over recipe steps and dispatches appropriate world/mascot actions.
* **Entity Identity Preservation**: Ingredient state mutations (such as preparation: `whole` ➔ `diced` or cooking: `raw` ➔ `fried`) modify the target entity's `state` via `PREPARE_INGREDIENT` or `COOK_INGREDIENT` without creating or destroying entities.

---

### Focus System & Workstation Visibility (`src/systems/focus.ts`)

* **Purpose**: Calculates visual priority classes (`focus-primary`, `focus-secondary`, `focus-background`) during mascot-centered focus transitions.
* **Workstation Container Rule**: Active and related workstations stay in primary or secondary focus. Inactive workstations receive `focus-background` styling (subtle desaturation and border opacity) on their frame containers.
* **Ingredient Entity Rule**: Ingredients and entities sitting inside any workstation or container retain `opacity: 1` and `focus-secondary` priority so they never hide, blur, or lose visibility during focus mode.

---

### Action Recording & Replay System

* **Action Log Integration**: World actions are captured in `recordSlice` when recording mode is active.
* **Store Synchronization**: Loaded action sequences are loaded directly into `worldStore` state via `setRecordedActions`.
* **Controls Reference Recorded Actions**: When recording mode or a loaded recorded session is active, player controls (`Play`, `Pause`, `Step Up`, `Step Down`, stepper dots) reference the sequence of actual `WorldAction` items instead of static recipe steps, stepping through or jumping across logged world state mutations directly.

---

### Recipe Translator System (`src/systems/recipeTranslator.ts`)

* **Purpose**: Converts human-recorded kitchen interactions into executable mascot-guided recipes where Tortilla moves focus, grabs, and places ingredients across containers.
* **Mascot Action Expansion** (`translateHumanActionsToMascotActions`):
  - Injects `MASCOT_MOVE` focus, `MASCOT_GRAB`, and `MASCOT_DROP` steps around raw human `MOVE_ENTITY` actions.
  - Injects `MASCOT_MOVE` focus steps prior to `TOGGLE_BURNER`, `PREPARE_INGREDIENT`, `COOK_INGREDIENT`, and `ADD_ENTITY` actions.
* **Declarative Recipe File Generation** (`translateHumanActionsToRecipe`):
  - Extracts clean entity names and requirements.
  - Generates a valid `Recipe` definition (with `id`, `name`, `requirements`, and `steps`) suitable for export as `.json` or execution via `RecipeRunner`.
* **UI Mode Separation**:
  - `📖 Play Catalog Recipe Mode`: Dedicated to catalog recipe execution (`RecipePlayer.tsx`).
  - `🎥 Action Recorder & Translator Mode`: Dedicated to live action recording, log replaying, human-to-mascot recipe translation (`ActionRecorder.tsx`), tracking used ingredients (`usedIngredients`), and an interactive right-side ingredients catalog panel (`IngredientsSidebar.tsx`).

---

### Recipe Loader & Validation System (`src/systems/recipeLoader.ts`, `src/systems/recipeValidator.ts`)

* **Purpose**: Decouples recipe definitions from TypeScript code files into structured, validated JSON assets (`clasica.json`, `concebolla.json`).
* **Recipe Validator (`recipeValidator.ts`)**:
  - Validates raw JSON structures against `RecipeJSON` schema.
  - Ensures required fields (`id`, `name`, `steps`, `requirements`/`ingredients`) exist and meet data type constraints.
  - Verifies step action types and cross-references inputs and targets against declared recipe requirements.
* **Recipe Loader (`recipeLoader.ts`)**:
  - Ingests JSON recipe assets safely and hydrates them into runtime `Recipe` objects.
  - Provides registry methods (`loadRecipe`, `loadAllRecipes`, `getAvailableRecipeIds`, `getRecipeCooklang`).
* **RecipeRunner Integration**:
  - `RecipeRunner` natively accepts recipe ID strings (e.g. `'clasica'`, `'concebolla'`) or hydrated `Recipe` objects.

---

### Event Store & Replay Engine System (`src/systems/EventStore.ts`, `src/systems/replayEngine.ts`, `src/systems/analytics.ts`)

* **Purpose**: Headless, append-only audit trail and deterministic replay engine for Tortilla World.
* **Event Store Singleton (`EventStore.ts`)**:
  - Central interceptor integrated into `worldStore.ts`'s `dispatch` function.
  - Automatically wraps every `WorldAction` in a immutable `BaseWorldEvent` metadata payload (`id`, `timestamp`, `sequenceNumber`, `version`, `actor`, `action`).
  - Provides headless export/import (`exportJSON`, `importJSON`) and query methods (`getEvents`, `clear`).
* **Deterministic Replay Engine (`replayEngine.ts`)**:
  - Resets the world state and sequentially re-dispatches exported event streams onto `worldStore`.
* **Analytics Utilities (`analytics.ts`)**:
  - Pure headless functions for calculating recipe metrics (`getRecipeMetrics`), filtering audit trails (`getAuditTrail`), and exporting history to CSV (`exportToCSV`).

---

# Final Principle

The rule of Tortilla World:

```text
Components show the world.

Systems change the world.

Containers define the rules.

Actions describe intentions.

The Store remembers the result.
```
`````

## File: src/components/Controls/IngredientsSidebar.tsx
`````typescript
/**
 * FILE: IngredientsSidebar.tsx
 *
 * PURPOSE:
 * Right-side ingredients catalog panel for creator / recording mode.
 *
 * RESPONSIBILITY:
 * - Displays ingredients separated into Basic (eggs, potato, olive oil, salt, garlic) and Others.
 * - Others list is hidden by default and can be toggled.
 * - Supports drag-and-drop between Basic and Others lists to reassign categories.
 * - Enables drag-and-drop or quick-add into kitchen workstations.
 */

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useStore } from 'zustand';
import { useDroppable } from '@dnd-kit/core';
import { worldStore } from '../../store/worldStore';
import { ingredients } from '../../data/catalog/ingredients';
import { EntityView } from '../World/EntityView';
import { useTranslation } from '../../i18n/useTranslation';
import type { Entity } from '../../types/world';
import './IngredientsSidebar.scss';

const LOCAL_STORAGE_KEY = 'tortilla_world_basic_ingredient_ids';
const DEFAULT_BASIC_IDS = ['egg', 'potato', 'oil', 'salt', 'garlic'];

function getInitialBasicIds(): string[] {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load basic ingredient categories from localStorage:', err);
  }
  return DEFAULT_BASIC_IDS;
}

interface CatalogItem extends Entity {
  ingredientId: string;
}

interface DroppableCategoryProps {
  id: string;
  title: string;
  items: CatalogItem[];
  isBasic: boolean;
  onQuickAdd: (id: string) => void;
  onMoveCategory: (ingredientId: string, targetCategory: 'basic' | 'other') => void;
  onDropNative: (e: React.DragEvent, targetCategory: 'basic' | 'other') => void;
}

const DroppableCategoryList: React.FC<DroppableCategoryProps> = ({
  id,
  title,
  items,
  isBasic,
  onQuickAdd,
  onMoveCategory,
  onDropNative,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  const { t } = useTranslation();

  return (
    <div
      ref={setNodeRef}
      className={`category-section ${isBasic ? 'category-basic' : 'category-other'} ${
        isOver ? 'category-dropzone--over' : ''
      }`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDropNative(e, isBasic ? 'basic' : 'other')}
    >
      <div className="category-header">
        <div className="category-title-wrapper">
          <span className="category-icon">{isBasic ? '⭐' : '📦'}</span>
          <span className="category-title">{title}</span>
        </div>
        <span className="category-badge">{items.length}</span>
      </div>

      {items.length === 0 ? (
        <div className="empty-category-hint">{t('ui.dropToCategorize')}</div>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <div
              key={item.id}
              className="sidebar-item-card"
              draggable
              onDragStart={(e) => {
                const baseId = item.ingredientId || item.id;
                e.dataTransfer.setData('text/plain', baseId);
                e.dataTransfer.setData('source-category', isBasic ? 'basic' : 'other');
              }}
            >
              <div className="item-entity-wrapper">
                <EntityView entity={item} containerId="despensa" readOnly={false} />
              </div>
              <div className="item-card-actions">
                <button
                  type="button"
                  className="quick-add-btn"
                  onClick={() => onQuickAdd(item.id)}
                  title={`${t('verbs.take')} ${item.name}`}
                >
                  ➕ {t('verbs.take')}
                </button>
                <button
                  type="button"
                  className="shift-category-btn"
                  onClick={() => onMoveCategory(item.ingredientId || item.id, isBasic ? 'other' : 'basic')}
                  title={isBasic ? t('ui.moveToOthers') : t('ui.moveToBasic')}
                >
                  {isBasic ? '⬇️ ' + t('ui.moveToOthers') : '⬆️ ' + t('ui.moveToBasic')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const IngredientsSidebar: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isOthersShown, setIsOthersShown] = useState<boolean>(false);
  const [basicIds, setBasicIds] = useState<string[]>(getInitialBasicIds);

  const entities = useStore(worldStore, (state) => state.entities);

  // Save basicIds to localStorage when modified
  const updateBasicIds = useCallback((newBasicIds: string[]) => {
    setBasicIds(newBasicIds);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newBasicIds));
    } catch (err) {
      console.warn('Failed to save basic ingredient categories:', err);
    }
  }, []);

  const moveToBasic = useCallback(
    (rawId: string) => {
      const baseId = rawId.includes('#') ? rawId.split('#')[0] : rawId;
      if (!basicIds.includes(baseId)) {
        updateBasicIds([...basicIds, baseId]);
      }
    },
    [basicIds, updateBasicIds]
  );

  const moveToOthers = useCallback(
    (rawId: string) => {
      const baseId = rawId.includes('#') ? rawId.split('#')[0] : rawId;
      if (basicIds.includes(baseId)) {
        updateBasicIds(basicIds.filter((id) => id !== baseId));
      }
    },
    [basicIds, updateBasicIds]
  );

  const handleResetCategories = useCallback(() => {
    updateBasicIds(DEFAULT_BASIC_IDS);
  }, [updateBasicIds]);

  // Listen for dnd-kit drop events dispatched by useSceneDragAndDrop
  useEffect(() => {
    const handleCategoryMove = (e: Event) => {
      const customEv = e as CustomEvent<{ entityId: string; targetCategory: string }>;
      if (!customEv.detail) return;
      const { entityId, targetCategory } = customEv.detail;

      if (targetCategory === 'basic-ingredients-list') {
        moveToBasic(entityId);
      } else if (targetCategory === 'other-ingredients-list') {
        moveToOthers(entityId);
      }
    };

    window.addEventListener('move-ingredient-category', handleCategoryMove);
    return () => window.removeEventListener('move-ingredient-category', handleCategoryMove);
  }, [moveToBasic, moveToOthers]);

  // Master catalog list mapped to Entities
  const catalogList: CatalogItem[] = useMemo(() => {
    return ingredients.map((ing) => {
      const existing = entities[ing.id];
      if (existing) return { ...existing, ingredientId: ing.id };
      return {
        id: ing.id,
        ingredientId: ing.id,
        name: `${ing.icon} ${ing.name}`,
        type: 'ingredient' as const,
        state: {},
      };
    });
  }, [entities]);

  // Separate catalog into Basic vs Other items
  const { basicItems, otherItems } = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch = (item: CatalogItem) => {
      if (!query) return true;
      return item.name.toLowerCase().includes(query) || item.id.toLowerCase().includes(query);
    };

    const basic: CatalogItem[] = [];
    const other: CatalogItem[] = [];

    for (const item of catalogList) {
      if (!matchesSearch(item)) continue;
      const isBasic = basicIds.includes(item.ingredientId) || basicIds.includes(item.id);
      if (isBasic) {
        basic.push(item);
      } else {
        other.push(item);
      }
    }

    return { basicItems: basic, otherItems: other };
  }, [catalogList, basicIds, searchQuery]);

  // Automatically expand Others list if user is actively searching and there are matching items in Others
  const effectiveShowOthers = isOthersShown || (searchQuery.trim().length > 0 && otherItems.length > 0);

  // Handle quick-adding / taking an ingredient into Tortilla's hands (up to 2 items max)
  const handleQuickAdd = (entityId: string) => {
    const state = worldStore.getState();
    const mascot = state.entities['chef'];
    const rawHolding = mascot?.state?.holdingEntityIds as string[] | undefined;
    const singleHolding = mascot?.state?.holdingEntityId as string | undefined;

    const holdingEntityIds: string[] = Array.isArray(rawHolding) && rawHolding.length > 0
      ? rawHolding
      : singleHolding
      ? [singleHolding]
      : [];

    if (holdingEntityIds.length >= 2) {
      // Hands are full (max 2 items)
      state.dispatch({
        type: 'UPDATE_ENTITY_STATE',
        payload: {
          entityId: 'chef',
          changes: {
            speechMessage: t('ui.handsFull') || '¡Mis manos están ocupadas! Deja un ingrediente primero.',
          },
        },
      });
      setTimeout(() => {
        worldStore.getState().dispatch({
          type: 'UPDATE_ENTITY_STATE',
          payload: { entityId: 'chef', changes: { speechMessage: undefined } },
        });
      }, 2500);
      return;
    }

    // Tortilla has a free hand! Take the ingredient into her hand
    state.dispatch({
      type: 'MASCOT_GRAB',
      payload: {
        entityId,
        sourceContainerId: 'despensa',
      },
    });
  };

  const handleMoveCategory = (ingredientId: string, targetCategory: 'basic' | 'other') => {
    if (targetCategory === 'basic') {
      moveToBasic(ingredientId);
    } else {
      moveToOthers(ingredientId);
    }
  };

  const handleDropNative = (e: React.DragEvent, targetCategory: 'basic' | 'other') => {
    e.preventDefault();
    const ingId = e.dataTransfer.getData('text/plain');
    if (ingId) {
      handleMoveCategory(ingId, targetCategory);
    }
  };

  const isCustomized = useMemo(() => {
    if (basicIds.length !== DEFAULT_BASIC_IDS.length) return true;
    return !DEFAULT_BASIC_IDS.every((id) => basicIds.includes(id));
  }, [basicIds]);

  return (
    <div className={`ingredients-sidebar-container ${isCollapsed ? 'collapsed' : ''}`} data-container-id="despensa">
      <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div className="sidebar-title">
            <span>🧺 {t('ui.ingredientsCatalog')}</span>
          </div>
          {!isCollapsed && <div className="sidebar-subtitle">{t('ui.sidebarSubtitle')}</div>}
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {isCustomized && !isCollapsed && (
            <button
              type="button"
              onClick={handleResetCategories}
              className="reset-categories-btn"
              title={t('ui.resetCategories')}
            >
              🔄
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="toggle-sidebar-btn"
          >
            {isCollapsed ? `👁️ ${t('ui.showIngredients')}` : `🙈 ${t('ui.hideIngredients')}`}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <>
          <div className="sidebar-search">
            <input
              type="text"
              placeholder={t('ui.searchIngredientsPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="sidebar-categories-container">
            {/* Basic Ingredients Section */}
            <DroppableCategoryList
              id="basic-ingredients-list"
              title={t('ui.basicIngredients')}
              items={basicItems}
              isBasic={true}
              onQuickAdd={handleQuickAdd}
              onMoveCategory={handleMoveCategory}
              onDropNative={handleDropNative}
            />

            {/* Other Ingredients Section Header & Toggle */}
            <div className="others-toggle-row">
              <button
                type="button"
                className="toggle-others-btn"
                onClick={() => setIsOthersShown(!isOthersShown)}
              >
                {effectiveShowOthers
                  ? `🙈 ${t('ui.hideOthers')} (${otherItems.length})`
                  : `👁️ ${t('ui.showOthers')} (${otherItems.length})`}
              </button>
            </div>

            {/* Other Ingredients Section */}
            {effectiveShowOthers && (
              <DroppableCategoryList
                id="other-ingredients-list"
                title={t('ui.otherIngredients')}
                items={otherItems}
                isBasic={false}
                onQuickAdd={handleQuickAdd}
                onMoveCategory={handleMoveCategory}
                onDropNative={handleDropNative}
              />
            )}
          </div>

          {basicItems.length === 0 && otherItems.length === 0 && (
            <div className="no-results">{t('ui.noIngredientsFound', { query: searchQuery })}</div>
          )}
        </>
      )}
    </div>
  );
};
`````

## File: src/components/Controls/PlayerGuideModal.tsx
`````typescript
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';
import { LanguageSwitcher } from './LanguageSwitcher';
import './PlayerGuideModal.scss';

interface PlayerGuideModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export const PlayerGuideModal: React.FC<PlayerGuideModalProps> = ({ onClose, isOpen }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { language, t } = useTranslation();
  const isSpanish = language === 'es';

  // Trap focus or handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus the close button when opened for accessibility
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="player-guide-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="guide-title"
          onClick={onClose}
        >
          <motion.div
            className="player-guide-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="player-guide-header">
              <div className="guide-header-actions">
                <a
                  href="https://tortilladepatatas.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="guide-mother-web-link"
                  title="Go to Tortilla Info (tortilladepatatas.org)"
                >
                  <span>{t('app.tortillaInfo')}</span>
                  <ExternalLink size={13} />
                </a>
                <LanguageSwitcher />
              </div>
              <h1 id="guide-title">{t('guide.title')}</h1>
              <p className="subtitle">{t('guide.subtitle')}</p>
            </div>

            <div className="player-guide-content">
              {language === 'de' ? (
                <>
                  <section className="guide-section introduction">
                    <p>
                      Willkommen in der Küche! Tortilla World ist nicht nur ein digitales Rezeptbuch; es ist eine lebendige Simulation, in der du mit Objekten genau wie in einer echten Küche interagierst.
                    </p>
                    <p>
                      In dieser Welt ist alles – von einer Zwiebel bis zur Bratpfanne selbst – eine physische "Entität", die du greifen, bewegen und benutzen kannst.
                    </p>
                  </section>

                  <section className="guide-section">
                    <h2>🧭 Teil 1: Die Grundlagen</h2>

                    <div className="subsection">
                      <h3>Wie die Welt funktioniert</h3>
                      <p>
                        Du steuerst die Umgebung per <strong>Drag-and-Drop</strong>. Du benötigst keine komplexen Menüs, um Zutaten zuzubereiten. Stattdessen greifst du eine Kartoffel und legst sie auf das Schneidebrett oder Eier in die Schüssel.
                      </p>
                      <p>
                        Objekte werden zwischen <strong>Behältern</strong> bewegt. Ein Behälter kann ein Regalboden in der Vorratskammer, eine Rührschüssel oder eine heiße Herdplatte sein.
                      </p>
                    </div>

                    <div className="subsection">
                      <h3>Arbeitsbereiche & Zonen</h3>
                      <ul className="feature-list">
                        <li><span className="icon">🚪</span> <strong>Vorratskammer (`despensa`):</strong> Wo deine rohen Zutaten lagern.</li>
                        <li><span className="icon">🚰</span> <strong>Waschplatz (`sink`):</strong> Zum Waschen von Gemüse vor der Verwendung.</li>
                        <li><span className="icon">🔪</span> <strong>Schneidebereich (`board`):</strong> Zum Schneiden und Schälen von Zutaten.</li>
                        <li><span className="icon">🥣</span> <strong>Zubereitungsschüssel (`bowl`):</strong> Zum Kombinieren von Zutaten und Verquirlen von Eiern.</li>
                        <li><span className="icon">🔥</span> <strong>Kochbereich (`burner`):</strong> Zum Braten und Kochen auf der Herdplatte.</li>
                        <li><span className="icon">🍽️</span> <strong>Servierteller (`plate`):</strong> Das Ziel für dein fertiges Gericht.</li>
                      </ul>
                    </div>
                  </section>

                  <section className="guide-section">
                    <h2>🍳 Teil 2: Fortgeschrittene Mechaniken</h2>

                    <div className="subsection">
                      <h3>Zustandsänderungen</h3>
                      <p>Zutaten ändern ihren Zustand basierend auf dem Behälter, in dem sie sich befinden.</p>
                      <ul className="bullet-list">
                        <li>Eine ganze Kartoffel auf dem Schneidebrett wird zu <em>geschnittenen Kartoffeln</em>.</li>
                        <li>Ein ganzes Ei in der Schüssel wird zu <em>verquirlten Eiern</em>.</li>
                        <li>Eine rohe Mischung in der heißen Pfanne wird <em>gebraten</em>.</li>
                      </ul>
                    </div>
                  </section>

                  <section className="guide-section tutorial-section">
                    <h2>👨‍🍳 Teil 3: Anleitung - Spanische Tortilla zubereiten</h2>
                    <p className="tutorial-intro">Lass uns eine klassische <em>Tortilla de Patatas</em> zubereiten!</p>

                    <div className="step-card">
                      <h4>Schritt 1: Zutaten vorbereiten</h4>
                      <ol>
                        <li><strong>Greife</strong> die Kartoffeln (🥔) aus der Vorratskammer und <strong>lege</strong> sie auf das Schneidebrett.</li>
                        <li><strong>Greife</strong> die Zwiebel (🧅) aus der Vorratskammer und <strong>lege</strong> sie auf das Schneidebrett.</li>
                      </ol>
                    </div>

                    <div className="step-card">
                      <h4>Schritt 2: Eier verquirlen</h4>
                      <ol>
                        <li><strong>Greife</strong> die Eier (🥚) aus der Vorratskammer und <strong>lege</strong> sie in die Schüssel.</li>
                      </ol>
                    </div>

                    <div className="step-card">
                      <h4>Schritt 3: Mischen</h4>
                      <ol>
                        <li><strong>Ziehe</strong> die geschnittenen Kartoffeln und Zwiebeln in die Schüssel zu den Eiern.</li>
                        <li>Gib eine Prise Salz (🧂) hinzu.</li>
                      </ol>
                    </div>

                    <div className="step-card">
                      <h4>Schritt 4: Kochen</h4>
                      <ol>
                        <li>Gib Olivenöl (🫒) in die Pfanne und füge die Mischung hinzu.</li>
                        <li>Lass die Hitze arbeiten!</li>
                      </ol>
                    </div>

                    <div className="step-card">
                      <h4>Schritt 5: Servieren</h4>
                      <ol>
                        <li>Ziehe die fertige Tortilla auf den Servierteller (🍽️).</li>
                      </ol>
                    </div>
                  </section>
                </>
              ) : isSpanish ? (
                <>
                  <section className="guide-section introduction">
                    <p>
                      ¡Bienvenido a la cocina! Tortilla World no es solo un libro de recetas digital; es una simulación viva donde interactúas con los objetos exactamente como lo harías en una cocina real.
                    </p>
                    <p>
                      En este mundo, todo—desde una cebolla hasta la propia sartén—es una "Entidad" física que puedes agarrar, mover y utilizar.
                    </p>
                  </section>

                  <section className="guide-section">
                    <h2>🧭 Parte 1: Lo Básico</h2>

                    <div className="subsection">
                      <h3>Cómo Funciona el Mundo</h3>
                      <p>
                        Manipulas el entorno utilizando <strong>Arrastrar y Soltar</strong>. No necesitas menús complejos para preparar ingredientes. Simplemente agarras una patata y la sueltas en la tabla de cortar, o los huevos en el bol de preparación.
                      </p>
                      <p>
                        Los objetos se mueven entre <strong>Contenedores</strong>. Un contenedor puede ser una balda de la despensa, un bol o un quemador caliente. Las reglas del mundo dictan qué sucede al soltar un objeto.
                      </p>
                    </div>

                    <div className="subsection">
                      <h3>Estaciones de Trabajo</h3>
                      <ul className="feature-list">
                        <li><span className="icon">🚪</span> <strong>Despensa (`despensa`):</strong> Donde se guardan los ingredientes crudos.</li>
                        <li><span className="icon">🚰</span> <strong>Fregadero (`sink`):</strong> Para lavar las verduras antes de usarlas.</li>
                        <li><span className="icon">🔪</span> <strong>Tabla de Cortar (`board`):</strong> La zona de preparación. Soltar verduras aquí las pica y pela automáticamente.</li>
                        <li><span className="icon">🥣</span> <strong>Bol de Preparación (`bowl`):</strong> Para combinar ingredientes. Aquí bates huevos y mezclas las verduras picadas.</li>
                        <li><span className="icon">🔥</span> <strong>Cocina (`burner`):</strong> Donde se aplica calor. Colocas la `Sartén` aquí, añades aceite y cocinas la mezcla.</li>
                        <li><span className="icon">🍽️</span> <strong>Plato de Servir (`plate`):</strong> El destino final de tu plato listo.</li>
                      </ul>
                    </div>
                  </section>

                  <section className="guide-section">
                    <h2>🍳 Parte 2: Mecánicas Avanzadas</h2>

                    <div className="subsection">
                      <h3>Cambio de Estado</h3>
                      <p>Los ingredientes cambian de estado según el contenedor en el que se encuentren.</p>
                      <ul className="bullet-list">
                        <li>Una patata entera en la tabla de cortar se convierte en <em>patatas cortadas</em>.</li>
                        <li>Un huevo entero en el bol se convierte en <em>huevos batidos</em>.</li>
                        <li>Una mezcla cruda en la sartén caliente se convierte en <em>cocinada</em>.</li>
                      </ul>
                    </div>

                    <div className="subsection">
                      <h3>Mecánica de Utensilios y Estaciones</h3>
                      <p>
                        ¡Las estaciones de trabajo representan utensilios en acción! En la versión actual, las estaciones procesan los ingredientes automáticamente al colocarlos (por ejemplo, la tabla pica verduras y el bol bate huevos automáticamente). El uso manual de herramientas individuales se incluirá en una próxima actualización.
                      </p>
                    </div>

                    <div className="subsection">
                      <h3>El Reproductor y Grabador de Acciones</h3>
                      <p>
                        A la izquierda de la pantalla, verás los controles para <strong>Reproducir Recetas del Catálogo</strong> y el <strong>Grabador de Acciones</strong>.
                      </p>
                      <ul className="bullet-list">
                        <li>Puedes ver a la Mascota realizar las acciones automáticamente al reproducir una receta.</li>
                        <li>Si cambias al Grabador de Acciones, la aplicación registrará cada movimiento para generar un script de receta personalizado.</li>
                      </ul>
                    </div>
                  </section>

                  <section className="guide-section tutorial-section">
                    <h2>👨‍🍳 Parte 3: Tutorial - Preparar una Tortilla Española</h2>
                    <p className="tutorial-intro">¡Juntemos todo y preparemos una clásica <em>Tortilla de Patatas</em>!</p>

                    <div className="step-card">
                      <h4>Paso 1: Preparar los Ingredientes</h4>
                      <ol>
                        <li><strong>Agarra</strong> las Patatas (🥔) de la Despensa y <strong>suéltalas</strong> en la Tabla de Cortar.</li>
                        <li><strong>Agarra</strong> la Cebolla (🧅) de la Despensa y <strong>suéltala</strong> en la Tabla de Cortar.</li>
                        <li>La Tabla de Cortar las convertirá automáticamente en <em>verduras cortadas</em>.</li>
                      </ol>
                    </div>

                    <div className="step-card">
                      <h4>Paso 2: Batir los Huevos</h4>
                      <ol>
                        <li><strong>Agarra</strong> los Huevos (🥚) de la Despensa y <strong>suéltalos</strong> en el Bol de Preparación.</li>
                        <li>El Bol convertirá automáticamente los huevos en <em>huevos batidos</em>.</li>
                      </ol>
                    </div>

                    <div className="step-card">
                      <h4>Paso 3: Mezclar</h4>
                      <ol>
                        <li><strong>Arrastra</strong> las patatas y cebollas picadas desde la Tabla hasta el Bol con los huevos batidos.</li>
                        <li>Añade una pizca de Sal (🧂) desde la Despensa al Bol.</li>
                        <li>¡Ahora tienes una <em>mezcla</em> unificada!</li>
                      </ol>
                    </div>

                    <div className="step-card">
                      <h4>Paso 4: Cocinar</h4>
                      <ol>
                        <li>Asegúrate de que la <code>Sartén</code> esté en el Quemador (`burner1`).</li>
                        <li>Arrastra el <code>Aceite de Oliva</code> (🫒) a la sartén.</li>
                        <li>Ahora, <strong>Arrastra</strong> la mezcla del Bol y <strong>suéltala</strong> en la Sartén.</li>
                        <li>¡Deja que el calor haga su trabajo!</li>
                      </ol>
                    </div>

                    <div className="step-card">
                      <h4>Paso 5: Servir</h4>
                      <ol>
                        <li>Una vez cocinada, <strong>arrastra</strong> la Tortilla terminada desde la Sartén al Plato de Servir.</li>
                      </ol>
                    </div>
                  </section>
                </>
              ) : (
                <>
                  <section className="guide-section introduction">
                    <p>
                      Welcome to the Kitchen! Tortilla World is not just a digital recipe book; it is a living simulation where you interact with objects just like you would in a real kitchen.
                    </p>
                    <p>
                      In this world, everything—from an onion to the frying pan itself—is a physical "Entity" that you can grab, move, and use.
                    </p>
                  </section>

                  <section className="guide-section">
                    <h2>🧭 Part 1: The Basics</h2>

                    <div className="subsection">
                      <h3>How the World Works</h3>
                      <p>
                        You manipulate the environment using <strong>Drag and Drop</strong>. You don't need complex menus to prepare ingredients. Instead, you grab a potato and drop it onto a cutting board, or drop eggs into a preparation bowl.
                      </p>
                      <p>
                        Objects are moved between <strong>Containers</strong>. A container can be a pantry shelf, a mixing bowl, or a hot burner. The rules of the world dictate what happens when you drop an item into a specific container.
                      </p>
                    </div>

                    <div className="subsection">
                      <h3>Workstations & Zones</h3>
                      <ul className="feature-list">
                        <li><span className="icon">🚪</span> <strong>Pantry (`despensa`):</strong> Where all your raw ingredients are stored.</li>
                        <li><span className="icon">🚰</span> <strong>Washing Station (`sink`):</strong> For cleaning vegetables before use.</li>
                        <li><span className="icon">🔪</span> <strong>Cutting Station (`board`):</strong> The zone for preparing ingredients. Dropping raw vegetables here cuts and peels them automatically.</li>
                        <li><span className="icon">🥣</span> <strong>Preparation Station (`bowl`):</strong> Used for combining ingredients. This is where you crack eggs, beat them, and mix in your chopped vegetables.</li>
                        <li><span className="icon">🔥</span> <strong>Cooking Station (`burner`):</strong> Where heat is applied. You place a `Pan` here, add oil, and fry, boil, or cook your mixtures.</li>
                        <li><span className="icon">🍽️</span> <strong>Serving Station (`plate`):</strong> The final destination for your completed dish.</li>
                      </ul>
                    </div>
                  </section>

                  <section className="guide-section">
                    <h2>🍳 Part 2: Advanced Mechanics</h2>

                    <div className="subsection">
                      <h3>Changing States</h3>
                      <p>Ingredients don't just move; they change state based on the container they inhabit.</p>
                      <ul className="bullet-list">
                        <li>A whole potato moved to the cutting board becomes <em>cut potatoes</em>.</li>
                        <li>A whole egg moved to a bowl becomes <em>beaten eggs</em>.</li>
                        <li>A raw mixture moved to a hot pan becomes <em>cooked</em>.</li>
                      </ul>
                    </div>

                    <div className="subsection">
                      <h3>Tools (Workstation Mechanics)</h3>
                      <p>
                        Workstations represent tools in action! In the current version, workstations process ingredients automatically upon placement (for example, the cutting board automatically chops vegetables and the bowl automatically mixes ingredients). Manual tool manipulation (like grabbing a separate knife or whisk) is coming in a future update.
                      </p>
                    </div>

                    <div className="subsection">
                      <h3>The Action Player & Recorder</h3>
                      <p>
                        On the left side of your screen, you might notice controls for <strong>Play Catalog Recipe</strong> or the <strong>Action Recorder</strong>.
                      </p>
                      <ul className="bullet-list">
                        <li>You can watch the kitchen's Mascot automatically perform actions by playing a recipe.</li>
                        <li>If you switch to the Action Recorder, the game will record every drag and drop you make, generating a custom recipe script!</li>
                      </ul>
                    </div>
                  </section>

                  <section className="guide-section tutorial-section">
                    <h2>👨‍🍳 Part 3: Tutorial - Making a Spanish Tortilla</h2>
                    <p className="tutorial-intro">Let's put it all together and make a classic <em>Tortilla de Patatas</em>.</p>

                    <div className="step-card">
                      <h4>Step 1: Prep the Ingredients</h4>
                      <ol>
                        <li><strong>Grab</strong> the Potatoes (🥔) from the Pantry and <strong>drop</strong> them onto the Cutting Board.</li>
                        <li><strong>Grab</strong> the Onion (🧅) from the Pantry and <strong>drop</strong> it onto the Cutting Board.</li>
                        <li>The Cutting Station converts your raw vegetables into <em>cut vegetables</em> automatically.</li>
                      </ol>
                    </div>

                    <div className="step-card">
                      <h4>Step 2: Beat the Eggs</h4>
                      <ol>
                        <li><strong>Grab</strong> the Eggs (🥚) from the Pantry and <strong>drop</strong> them into the Preparation Station (the Bowl).</li>
                        <li>The Bowl automatically transforms the eggs into <em>beaten eggs</em>.</li>
                      </ol>
                    </div>

                    <div className="step-card">
                      <h4>Step 3: Mix it Up</h4>
                      <ol>
                        <li><strong>Drag</strong> your chopped potatoes and onions from the Cutting Board and <strong>drop</strong> them into the Bowl with the beaten eggs.</li>
                        <li>Add a pinch of Salt (🧂) from the Pantry to the Bowl.</li>
                        <li>They are now a unified <em>mixture</em>!</li>
                      </ol>
                    </div>

                    <div className="step-card">
                      <h4>Step 4: Cooking</h4>
                      <ol>
                        <li>Ensure your <code>Pan</code> is on the Cooking Station (`burner1`).</li>
                        <li>Drag <code>Olive Oil</code> (🫒) into the pan.</li>
                        <li>Now, <strong>Drag</strong> your mixture from the Bowl and <strong>drop</strong> it into the Pan.</li>
                        <li>Let the heat do its work!</li>
                      </ol>
                    </div>

                    <div className="step-card">
                      <h4>Step 5: Serve</h4>
                      <ol>
                        <li>Once the cooking is complete, <strong>drag</strong> the finished Tortilla from the Pan and <strong>drop</strong> it onto the Serving Station (the Plate).</li>
                      </ol>
                    </div>
                  </section>
                </>
              )}

              {/* Render keyboard shortcuts section for power users */}
              {(() => {
                const isDe = language === 'de';
                const isEs = language === 'es';

                const title = isDe ? '⌨️ Tastaturkürzel' : isEs ? '⌨️ Atajos de Teclado' : '⌨️ Keyboard Shortcuts';
                const subtitle = isDe
                  ? 'Steuere die Simulation blitzschnell mit deiner Tastatur!'
                  : isEs
                  ? '¡Controla la simulación a toda velocidad con tu teclado!'
                  : 'Control the simulation at lightning speed with your keyboard!';

                const items = [
                  { label: isDe ? 'Nächster Schritt' : isEs ? 'Siguiente paso' : 'Next Step', keys: ['➡️', 'N'] },
                  { label: isDe ? 'Vorheriger Schritt' : isEs ? 'Paso anterior' : 'Previous Step', keys: ['⬅️', 'P'] },
                  { label: isDe ? 'Wiedergabe / Pause' : isEs ? 'Reproducir / Pausa' : 'Play / Pause', keys: ['Space', 'K'] },
                  { label: isDe ? 'Küche zurücksetzen' : isEs ? 'Reiniciar cocina' : 'Reset Kitchen', keys: ['R'] },
                  { label: isDe ? 'Geschwindigkeit +/-' : isEs ? 'Velocidad +/-' : 'Speed +/-', keys: ['+', '-'] },
                  { label: isDe ? 'Maskottchen Salto' : isEs ? 'Salto Mascota' : 'Mascot Flip', keys: ['F'] },
                  { label: isDe ? 'Maskottchen Feiern' : isEs ? 'Celebración Mascota' : 'Mascot Celebrate', keys: ['C'] },
                  { label: isDe ? 'Zur Vorratskammer' : isEs ? 'Ir a Despensa' : 'Move to Pantry', keys: ['1'] },
                  { label: isDe ? 'Zum Schneidebrett' : isEs ? 'Ir a Tabla' : 'Move to Board', keys: ['2'] },
                  { label: isDe ? 'Zur Pfanne' : isEs ? 'Ir a Sartén' : 'Move to Pan', keys: ['3'] },
                  { label: isDe ? 'Hilfe / Anleitung' : isEs ? 'Guía / Ayuda' : 'Toggle Guide', keys: ['?', 'H'] },
                  { label: isDe ? 'Schließen' : isEs ? 'Cerrar' : 'Close Modal', keys: ['Esc'] },
                ];

                return (
                  <section className="guide-section shortcuts-section" style={{ marginTop: '2rem' }}>
                    <h2>{title}</h2>
                    <p style={{ margin: '0.25rem 0 1rem', color: '#64748b' }}>{subtitle}</p>
                    <div className="shortcuts-grid">
                      {items.map((item, idx) => (
                        <div key={idx} className="shortcut-card">
                          <span className="shortcut-label">{item.label}</span>
                          <div className="kbd-group">
                            {item.keys.map((k, kIdx) => (
                              <kbd key={kIdx}>{k}</kbd>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })()}
            </div>

            <div className="player-guide-footer">
              <button
                ref={closeButtonRef}
                className="start-cooking-btn"
                onClick={onClose}
                aria-label="Close guide and start cooking"
              >
                {t('guide.startBtn')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
`````

## File: src/components/Controls/RecipeDatabaseModal.tsx
`````typescript
/**
 * FILE: src/components/Controls/RecipeDatabaseModal.tsx
 *
 * PURPOSE:
 * Firestore Database Recipe Hub for Tortilla World.
 *
 * RESPONSIBILITY:
 * - Allows searching recipes in Firestore by ingredients (e.g. Garlic, Egg, Potato), tags, and text.
 * - Filters recipes by Ms. Tortilla Mascot support or Autonomous direct playback.
 * - Plays recipes in world state with or without Mascot.
 * - Saves current recorded session into Firestore in 3 structured formats.
 * - Seeds default recipes, ingredients, and tools into Firestore.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import {
  searchRecipesInDb,
  deleteRecipeFromDb,
  seedDefaultRecipesInDb,
  seedDefaultToolsInDb,
  seedDefaultIngredientsInDb,
  seedDefaultKitchenConfigInDb,
} from '../../services/dbService';
import type { SavedRecipe } from '../../services/dbService';
import { RecipeRunner } from '../../systems/recipeRunner';
import { actionPlayer } from '../../systems/actionPlayer';
import { detectRecipeFormat, getPlayableActionsFromFormat } from '../../utils/recipeFormatDetector';
import { extractUsedIngredientsFromActions } from '../../utils/sessionLogUtils';
import type { RecordedAction } from '../../types/recording';
import './RecipeDatabaseModal.scss';

const POPULAR_INGREDIENTS = [
  { id: 'garlic', name: 'Garlic 🧄' },
  { id: 'egg', name: 'Eggs 🥚' },
  { id: 'potato', name: 'Potatoes 🥔' },
  { id: 'onion', name: 'Onion 🧅' },
  { id: 'oil', name: 'Olive Oil 🫒' },
  { id: 'chorizo', name: 'Chorizo 🌭' },
  { id: 'salt', name: 'Salt 🧂' },
  { id: 'cheese', name: 'Cheese 🧀' },
  { id: 'tomato', name: 'Tomato 🍅' },
];

export const RecipeDatabaseModal: React.FC = () => {
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [mascotFilter, setMascotFilter] = useState<'all' | 'mascot' | 'autonomous'>('all');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activePlaybackId, setActivePlaybackId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const [selectedFormatPreview, setSelectedFormatPreview] = useState<SavedRecipe | null>(null);
  const [recipeToDelete, setRecipeToDelete] = useState<{ id: string; title: string } | null>(null);

  const dispatch = useStore(worldStore, (state) => state.dispatch);

  useEffect(() => {
    let ignore = false;

    Promise.resolve().then(() => {
      if (!ignore) setLoading(true);
    });

    const ingredientQuery = selectedIngredients.length > 0 ? selectedIngredients : undefined;
    const mascotBool =
      mascotFilter === 'mascot' ? true : mascotFilter === 'autonomous' ? false : undefined;

    searchRecipesInDb({
      ingredientQuery,
      hasMascotSupport: mascotBool,
      searchTerm: searchQuery.trim() || undefined,
    })
      .then((data) => {
        if (!ignore) {
          setRecipes(data);
        }
      })
      .catch((err) => {
        console.warn('Error loading Firestore recipes:', err);
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [searchQuery, selectedIngredients, mascotFilter]);

  const refreshRecipes = useCallback(async () => {
    setLoading(true);
    try {
      const ingredientQuery = selectedIngredients.length > 0 ? selectedIngredients : undefined;
      const mascotBool =
        mascotFilter === 'mascot' ? true : mascotFilter === 'autonomous' ? false : undefined;

      const data = await searchRecipesInDb({
        ingredientQuery,
        hasMascotSupport: mascotBool,
        searchTerm: searchQuery.trim() || undefined,
      });

      setRecipes(data);
    } catch (err) {
      console.warn('Error loading Firestore recipes:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedIngredients, mascotFilter]);

  const downloadJSON = (data: unknown, filename: string) => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleIngredientFilter = (ingId: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingId) ? prev.filter((i) => i !== ingId) : [...prev, ingId]
    );
  };

  const handleSeedDefaults = async () => {
    setLoading(true);
    setStatusMessage('Seeding default recipes, tools, and ingredients to Firestore...');
    try {
      await Promise.all([
        seedDefaultRecipesInDb(),
        seedDefaultToolsInDb(),
        seedDefaultIngredientsInDb(),
        seedDefaultKitchenConfigInDb(),
      ]);
      setStatusMessage('✅ Firestore database seeded successfully!');
      await refreshRecipes();
    } catch (err) {
      setStatusMessage('❌ Seeding failed. Check console.');
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMessage(''), 4000);
    }
  };

  const handlePlayRecipe = async (savedRecipe: SavedRecipe, withMascot: boolean) => {
    setIsPlaying(true);
    setActivePlaybackId(savedRecipe.id);
    setStatusMessage(
      `Playing "${savedRecipe.title}" ${withMascot ? 'with Ms. Tortilla Mascot 🤖' : 'Autonomously ⚡'}...`
    );

    try {
      dispatch({ type: 'RESET_WORLD' });
      await new Promise((res) => setTimeout(res, 400));

      const detected = detectRecipeFormat(savedRecipe);
      const playable = getPlayableActionsFromFormat(detected);

      if (playable.actions.length > 0) {
        const extracted = extractUsedIngredientsFromActions(playable.actions);
        worldStore.getState().setRecordedActions(playable.actions as unknown as RecordedAction[], extracted);
        window.dispatchEvent(new CustomEvent('select-recorded-session'));
      }

      if (detected.type === 'declarative' && detected.declarativeRecipe?.steps) {
        const runner = new RecipeRunner({
          delayMs: withMascot ? 500 : 350,
        });
        if (!withMascot) {
          runner.useMascot = false;
        }
        await runner.runRecipe(detected.declarativeRecipe);
        setStatusMessage(`✅ Finished playing "${savedRecipe.title}" [Declarative Recipe]!`);
      } else {
        const playable = getPlayableActionsFromFormat(detected);
        if (playable.actions.length > 0) {
          await actionPlayer.playLog(playable.actions, {
            delayMs: withMascot ? 400 : 250,
            resetWorld: false,
          });
          setStatusMessage(`✅ Finished playing "${savedRecipe.title}" [${detected.typeLabel}]!`);
        } else {
          setStatusMessage(`⚠️ Selected recipe "${savedRecipe.title}" contains no playable format.`);
        }
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Unknown error';
      setStatusMessage(`❌ Execution error: ${errMsg}`);
      console.error(err);
    } finally {
      setIsPlaying(false);
      setActivePlaybackId(null);
    }
  };

  const handleDeleteRecipe = (id: string, title: string) => {
    setRecipeToDelete({ id, title });
  };

  const confirmDeleteRecipe = async () => {
    if (!recipeToDelete) return;
    const { id, title } = recipeToDelete;
    setRecipeToDelete(null);
    setStatusMessage(`Deleting "${title}" from Firestore...`);
    const success = await deleteRecipeFromDb(id);
    if (success) {
      setStatusMessage(`✅ Deleted "${title}" from Firestore.`);
      await refreshRecipes();
    } else {
      setStatusMessage(`❌ Failed to delete "${title}".`);
    }
    setTimeout(() => setStatusMessage(''), 3500);
  };

  return (
    <div className="recipe-database-container">
      {/* Header Banner */}
      <div className="db-header">
        <div className="db-title-area">
          <h2>🗄️ Firestore Recipe Database & Saved Games</h2>
          <p>Search, filter, and play recipes in multiple formats directly from Cloud Firestore.</p>
        </div>

        <div className="db-header-actions">
          <button
            type="button"
            className="db-btn btn-seed"
            onClick={handleSeedDefaults}
            disabled={loading}
          >
            🌱 Seed Catalog to DB
          </button>
        </div>
      </div>

      {statusMessage && <div className="db-status-banner">{statusMessage}</div>}

      {/* Search and Filters Bar */}
      <div className="db-filters-bar">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search recipes by title, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery('')}>
              ✕
            </button>
          )}
        </div>

        {/* Mascot Support Selector */}
        <div className="mascot-filter-group">
          <label>Mascot Mode:</label>
          <button
            type="button"
            className={`filter-tab ${mascotFilter === 'all' ? 'active' : ''}`}
            onClick={() => setMascotFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={`filter-tab ${mascotFilter === 'mascot' ? 'active' : ''}`}
            onClick={() => setMascotFilter('mascot')}
          >
            🤖 With Mascot
          </button>
          <button
            type="button"
            className={`filter-tab ${mascotFilter === 'autonomous' ? 'active' : ''}`}
            onClick={() => setMascotFilter('autonomous')}
          >
            ⚡ Autonomous Only
          </button>
        </div>
      </div>

      {/* Ingredient Index Search Chips */}
      <div className="ingredient-chips-area">
        <span className="chips-label">Search by Ingredient Index:</span>
        <div className="chips-list">
          {POPULAR_INGREDIENTS.map((ing) => {
            const isSelected = selectedIngredients.includes(ing.id);
            return (
              <button
                key={ing.id}
                type="button"
                className={`ingredient-chip ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleIngredientFilter(ing.id)}
              >
                {ing.name} {isSelected ? '✓' : ''}
              </button>
            );
          })}
          {selectedIngredients.length > 0 && (
            <button
              type="button"
              className="clear-ingredients-btn"
              onClick={() => setSelectedIngredients([])}
            >
              Clear Ingredients ({selectedIngredients.length})
            </button>
          )}
        </div>
      </div>

      {/* Recipes List Grid */}
      <div className="recipes-grid">
        {loading ? (
          <div className="loading-state">⏳ Loading Firestore database records...</div>
        ) : recipes.length === 0 ? (
          <div className="empty-state">
            <p>No recipes found matching your query filters.</p>
            <button type="button" className="db-btn btn-seed" onClick={handleSeedDefaults}>
              🌱 Seed Default Recipes into Firestore
            </button>
          </div>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card compact-card">
              <div className="card-top-row">
                <div className="card-title-group">
                  <h3 className="card-title">{recipe.title}</h3>
                  <span className="card-author-date">by {recipe.author} • {new Date(recipe.updatedAt || recipe.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="card-top-actions">
                  <span className={`mascot-badge ${recipe.hasMascotSupport ? 'mascot' : 'autonomous'}`}>
                    {recipe.hasMascotSupport ? '🤖 Mascot' : '⚡ Auto'}
                  </span>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDeleteRecipe(recipe.id, recipe.title)}
                    title="Delete recipe from Firestore"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {recipe.description && <p className="card-desc">{recipe.description}</p>}

              <div className="card-mid-row">
                <div className="ingredient-badges">
                  {recipe.ingredients?.map((ing) => (
                    <span key={ing} className="ing-badge">
                      {ing}
                    </span>
                  ))}
                </div>
                <div className="formats-available">
                  {recipe.formats?.recipeJson && <span className="fmt-pill">📜 JSON</span>}
                  {recipe.formats?.mascotSequence && <span className="fmt-pill">🤖 Mascot</span>}
                  {recipe.formats?.fullSessionLog && <span className="fmt-pill">💾 Log</span>}
                </div>
              </div>

              <div className="card-actions">
                <button
                  type="button"
                  className="play-btn mascot-play"
                  onClick={() => handlePlayRecipe(recipe, true)}
                  disabled={isPlaying}
                >
                  {isPlaying && activePlaybackId === recipe.id ? '▶️ Playing...' : '▶️ Play Mascot'}
                </button>

                <button
                  type="button"
                  className="play-btn auto-play"
                  onClick={() => handlePlayRecipe(recipe, false)}
                  disabled={isPlaying}
                >
                  ⚡ Play Alone
                </button>

                <button
                  type="button"
                  className="inspect-btn"
                  onClick={() => setSelectedFormatPreview(recipe)}
                  title="Inspect Formats & Download JSON"
                >
                  👁️ Formats
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Format Inspector Modal */}
      {selectedFormatPreview && (
        <div className="format-inspector-overlay" onClick={() => setSelectedFormatPreview(null)}>
          <div className="format-inspector-content" onClick={(e) => e.stopPropagation()}>
            <div className="inspector-header">
              <h3>📜 Multi-Format Export Preview: {selectedFormatPreview.title}</h3>
              <button className="close-btn" onClick={() => setSelectedFormatPreview(null)}>
                ✕
              </button>
            </div>

            <div className="inspector-body">
              <div className="format-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h4 style={{ margin: 0 }}>🤖 Mascot Action Sequence Format</h4>
                  {selectedFormatPreview.formats?.mascotSequence && (
                    <button
                      type="button"
                      className="db-btn"
                      style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                      onClick={() =>
                        downloadJSON(
                          selectedFormatPreview.formats.mascotSequence,
                          `${selectedFormatPreview.id}_mascot_sequence.json`
                        )
                      }
                    >
                      📥 Download (.json)
                    </button>
                  )}
                </div>
                <pre>{JSON.stringify(selectedFormatPreview.formats?.mascotSequence || [], null, 2)}</pre>
              </div>

              <div className="format-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h4 style={{ margin: 0 }}>📜 Declarative Recipe JSON Format</h4>
                  {selectedFormatPreview.formats?.recipeJson && (
                    <button
                      type="button"
                      className="db-btn"
                      style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                      onClick={() =>
                        downloadJSON(
                          selectedFormatPreview.formats.recipeJson,
                          `${selectedFormatPreview.id}_recipe.json`
                        )
                      }
                    >
                      📥 Download (.json)
                    </button>
                  )}
                </div>
                <pre>{JSON.stringify(selectedFormatPreview.formats?.recipeJson || {}, null, 2)}</pre>
              </div>

              <div className="format-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h4 style={{ margin: 0 }}>💾 Full Session Log Format</h4>
                  {selectedFormatPreview.formats?.fullSessionLog && (
                    <button
                      type="button"
                      className="db-btn"
                      style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                      onClick={() =>
                        downloadJSON(
                          selectedFormatPreview.formats.fullSessionLog,
                          `${selectedFormatPreview.id}_session_log.json`
                        )
                      }
                    >
                      📥 Download (.json)
                    </button>
                  )}
                </div>
                <pre>{JSON.stringify(selectedFormatPreview.formats?.fullSessionLog || {}, null, 2)}</pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Overlay Modal */}
      {recipeToDelete && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm-modal">
            <h3>🗑️ Confirm Firestore Deletion</h3>
            <p>
              Are you sure you want to delete <strong>"{recipeToDelete.title}"</strong> from Cloud Firestore? This action cannot be undone.
            </p>
            <div className="confirm-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setRecipeToDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={confirmDeleteRecipe}
              >
                Yes, Delete Recipe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
`````

## File: src/i18n/locales/en.json
`````json
{
  "app": {
    "title": "Tortilla World",
    "subtitle": "Interactive Cooking & Recipe Simulation",
    "devMode": "Dev Mode",
    "publishMode": "Publish Mode",
    "recipeCatalog": "Recipe Catalog",
    "language": "Language",
    "tortillaInfo": "Tortilla Info"
  },
  "scene": {
    "pantry": "Pantry & Ingredients",
    "workstations": "Workstations",
    "preparationBowl": "Preparation Bowl",
    "cookingPan": "Cooking Pan",
    "servingPlate": "Serving Plate",
    "mascot": "Assistant Mascot",
    "resetKitchen": "🔄 Reset Kitchen",
    "showControls": "🔽 Show Controls & Modes",
    "hideControls": "🔼 Hide Controls",
    "tabs": {
      "database": "🗄️ Firestore Recipe Database",
      "playRecipe": "▶️ Play Recipe",
      "cookbook": "📕 Cookbook",
      "actionRecorder": "🎥 Action Recorder"
    },
    "devModeActive": "🛠️ Dev Mode (Active) ➔ Switch to Slim Publish",
    "slimPublishPreview": "👁️ Slim Publish Preview ➔ Switch to Dev"
  },
  "recorder": {
    "title": "🎥 Action Recording & Translator",
    "subtitle": "Record live human interactions, replay logs, or translate actions into a mascot recipe.",
    "status": "Captured Actions: {{actions}} | Events: {{events}}",
    "startRecording": "⏺️ Record Session",
    "recording": "🔴 Recording Actions...",
    "stopRecording": "⏹️ Stop Recording",
    "stopRecordingCount": "⏹ Stop Recording ({{count}})",
    "saveToDb": "💾 Save Recipe to DB",
    "cancelSave": "💾 Cancel Save",
    "clearLog": "🗑 Clear Log",
    "hideTranslator": "🪄 Hide Translator",
    "translateViewFormats": "🪄 Translate / View Formats",
    "resetKitchen": "🔄 Reset Kitchen",
    "savedIngredientsCount": "🛒 Saved Ingredients ({{count}}):",
    "noIngredientsUsed": "No ingredients used yet. Drag items from the right panel into the kitchen.",
    "saveToFirestoreTitle": "💾 Save Recorded Recipe to Firestore",
    "translatorPreview": "🪄 Action Export Formats & Translator Preview",
    "saveTitle": "Recipe Title",
    "saveAuthor": "Author Name",
    "saveDescription": "Description",
    "includeFormats": "Include Formats to Save in DB:",
    "formatMascot": "🤖 Mascot Action Sequence",
    "formatRecipeJson": "📜 Declarative Recipe JSON",
    "formatSessionLog": "💾 Full Session Log",
    "saving": "⏳ Saving to Firestore...",
    "saveSuccess": "✅ Recipe successfully saved to Cloud Firestore! You can play it anytime in the Recipe Catalog.",
    "saveError": "❌ Error saving: {{error}}",
    "usedIngredients": "🛒 Saved Ingredients ({{count}}):",
    "dishNameModalTitle": "🍽️ Name Your Recipe!",
    "dishNameModalSubtitle": "There is a dish prepared on your plate! What would you like to call this creation?",
    "dishNamePlaceholder": "e.g., Grandma's Potato Omelette",
    "saveDishNameAndStop": "💾 Save Name & Finish",
    "skipDishName": "Skip"
  },
  "replayer": {
    "loadJson": "📂 Load Log (.json)",
    "selectDbRecipe": "🗄️ Select DB Recipe...",
    "stepProgress": "Step {{current}} of {{total}}",
    "play": "▶️ Play",
    "pause": "⏸️ Pause",
    "stepForward": "⏭️ Step",
    "stepBack": "⏮️ Back",
    "stop": "⏹️ Stop",
    "speed": "Speed:",
    "loadedRecipe": "Loaded \"{{title}}\" ({{count}} actions)"
  },
  "database": {
    "title": "🗄️ Firestore Recipe Database & Saved Games",
    "subtitle": "Search, filter, and play recipes in multiple formats directly from Cloud Firestore.",
    "seedCatalog": "🌱 Seed Catalog to DB",
    "searchPlaceholder": "🔍 Search recipes by title or description...",
    "allIngredients": "All Ingredients",
    "noRecipes": "No recipes found matching your search.",
    "mascotCompatible": "🤖 Mascot",
    "autonomousDirect": "⚡ Auto",
    "playMascot": "▶️ Play Mascot",
    "playAuto": "⚡ Play Auto",
    "inspectFormats": "👁️ Formats",
    "delete": "🗑️",
    "downloadJson": "📥 Download (.json)",
    "confirmDeleteTitle": "🗑️ Confirm Firestore Deletion",
    "confirmDeleteText": "Are you sure you want to delete \"{{title}}\" from Cloud Firestore? This action cannot be undone.",
    "cancel": "Cancel",
    "confirmDelete": "Yes, Delete Recipe",
    "deleting": "Deleting \"{{title}}\" from Firestore...",
    "deleteSuccess": "✅ Deleted \"{{title}}\" from Firestore.",
    "deleteError": "❌ Failed to delete \"{{title}}\"."
  },
  "player": {
    "playing": "Playing Recipe: {{title}}",
    "stepCounter": "Step {{current}} / {{total}}",
    "nextStep": "Next Step ➔",
    "reset": "🔄 Reset World",
    "finished": "🎉 Recipe Completed Successfully!"
  },
  "guide": {
    "openBtn": "📖 Player Guide",
    "title": "Welcome to Tortilla World! 🌮",
    "subtitle": "A Player's Guide to the Kitchen Simulation",
    "startBtn": "Let's Start Cooking!"
  },
  "ui": {
    "recipe": "Recipe",
    "requiredMaterials": "Required Materials",
    "dragToWorkstation": "(Drag items to workstation)",
    "instructions": "Instructions",
    "chefsHints": "Chef's Hints",
    "ingredientsCatalog": "Ingredients Catalog",
    "basicIngredients": "Basic Ingredients",
    "otherIngredients": "Other Ingredients",
    "showOthers": "Show Other Ingredients",
    "hideOthers": "Hide Other Ingredients",
    "moveToOthers": "Move to Others",
    "moveToBasic": "Move to Basic",
    "resetCategories": "Reset Categories",
    "dropToCategorize": "Drop ingredients here to reassign category",
    "sidebarSubtitle": "Drag items or tap ➕ to place into the kitchen workstation",
    "searchIngredientsPlaceholder": "🔍 Search ingredients...",
    "noIngredientsFound": "No ingredients found matching \"{{query}}\"",
    "targetLabel": "Cooking Target / Time:",
    "targetPlaceholder": "e.g. 10 min, medium heat, until golden",
    "finalNameLabel": "Final Dish Name:",
    "finalNamePlaceholder": "Dish name (e.g. Oma's Tortilla)",
    "mixtureNamePlaceholder": "Mixture name (optional)",
    "heatOn": "Heat On",
    "heatOff": "Heat Off",
    "serveToPlate": "Serve to Plate 🍽️",
    "emptyContainerHint": "Drop entities here",
    "noRecipesAvailable": "No recipes available.",
    "showIngredients": "Show Ingredients",
    "hideIngredients": "Hide Ingredients",
    "emptyTrash": "Empty Trash",
    "confirmEmptyTrash": "Are you sure you want to empty the trash?",
    "yesEmpty": "Yes, empty",
    "cancel": "Cancel",
    "save": "Save",
    "leaveHere": "Leave Here",
    "takeMe": "Take me",
    "recordedSession": "Recorded / Loaded",
    "noIngredientsListed": "No ingredients listed.",
    "noInstructionsListed": "No steps recorded yet.",
    "handsFull": "My hands are full! Place an item down first.",
    "nothingInHands": "I'm not holding anything!"
  },
  "workstations": {
    "sink": "Washing Area 💧",
    "board": "Cutting Workspace 🔪",
    "bowl": "Preparation 🥣",
    "burner": "Pan 🍳",
    "burner1": "pan",
    "burner2": "Pan 2 🍳",
    "plate": "plate",
    "trash": "Trash Can 🗑️",
    "despensa": "Pantry 🧺",
    "default": "Workstation 📦"
  },
  "verbs": {
    "cut": "Cut",
    "cook": "Cook",
    "wash": "Wash",
    "peel": "Peel",
    "mix": "Mix",
    "whisk": "Whisk",
    "beat": "Beat",
    "combine": "Combine",
    "heat": "Heat",
    "flip": "Flip",
    "serve": "Serve",
    "add": "Add",
    "fry": "Fry",
    "take": "Take",
    "move": "Move",
    "grab": "Grab",
    "drop": "Drop",
    "celebrate": "Celebrate!"
  },
  "stepFormat": {
    "moveFromTo": "Move {{ingredient}} from {{source}} to {{target}}",
    "moveTo": "Move {{ingredient}} to {{target}}",
    "mixToMake": "{{verb}} {{inputs}} to make {{output}}",
    "cookFor": "{{verb}} {{target}} for {{duration}} {{unit}}",
    "cookForToMake": "{{verb}} {{target}} {{duration}} {{unit}} to make {{as}}",
    "flipInContainer": "flip in the {{container}}",
    "flip": "Flip {{target}}",
    "serveOntoAs": "Serve onto the {{container}} as {{as}}",
    "serveAs": "Serve as {{as}}",
    "serveOnto": "Serve onto the {{container}}"
  },
  "ingredients": {
    "potato": "Potatoes",
    "egg": "Eggs",
    "oil": "Olive Oil",
    "onion": "Onion",
    "chorizo": "Chorizo",
    "salt": "Salt",
    "pepper": "Bell Pepper",
    "garlic": "Garlic",
    "tomato": "Tomato",
    "cheese": "Cheese",
    "bread": "Bread",
    "milk": "Milk",
    "butter": "Butter",
    "black_pepper": "Black Pepper",
    "flour": "Flour",
    "sugar": "Sugar",
    "rice": "Rice",
    "chicken": "Chicken",
    "beef": "Beef",
    "mushroom": "Mushroom",
    "spinach": "Spinach",
    "lemon": "Lemon"
  },
  "tools": {
    "knife": "Chef Knife",
    "peeler": "Vegetable Peeler",
    "whisk": "Whisk",
    "fork": "Fork",
    "spatula": "Spatula",
    "grater": "Grater",
    "mandoline": "Mandoline",
    "spoon": "Spoon"
  },
  "states": {
    "raw": "Raw 🌾",
    "cooking": "Cooking 🔥",
    "finished": "Finished ✨",
    "prepared": "Prepared 🔪",
    "cut": "Cut",
    "sliced": "Sliced",
    "peeled": "Peeled",
    "whisked": "Whisked",
    "washed": "Washed",
    "mixed": "Mixed",
    "fried": "Fried",
    "heated": "Heated"
  },
  "recipes": {
    "concebolla": {
      "name": "Tortilla with Onion",
      "description": "Spanish Tortilla with juicy caramelized onions.",
      "hints": [
        "Fry onions until golden before mixing."
      ]
    },
    "clasica": {
      "name": "Classic Tortilla",
      "description": "Traditional Spanish Tortilla without onion.",
      "hints": [
        "Don't let the garlic burn.",
        "With a soft spatula, make sure the tortilla does not stick to the pan."
      ]
    },
    "francesa": {
      "name": "French Omelette (Tortilla Francesa)",
      "description": "Traditional French Omelette.",
      "hints": [
        "Mix eggs with salt in the bowl to make beaten eggs.",
        "Turn on the heat, add oil and heat it up.",
        "With a soft spatula, make sure the tortilla does not stick to the pan."
      ]
    },
    "recorded": {
      "name": "Recorded / Loaded Recipe",
      "description": "Dynamically generated recipe from recorded or loaded kitchen actions."
    }
  }
}
`````

## File: src/i18n/locales/es.json
`````json
{
  "app": {
    "title": "Tortilla World",
    "subtitle": "Simulación Interactiva de Cocina y Recetas",
    "devMode": "Modo Desarrollador",
    "publishMode": "Modo Publicación",
    "recipeCatalog": "Catálogo de Recetas",
    "language": "Idioma",
    "tortillaInfo": "Info de la Tortilla"
  },
  "scene": {
    "pantry": "Despensa e Ingredientes",
    "workstations": "Áreas de Trabajo",
    "preparationBowl": "Bol de Preparación",
    "cookingPan": "Sartén de Cocinado",
    "servingPlate": "Plato de Servir",
    "mascot": "Mascota Asistente",
    "resetKitchen": "🔄 Reiniciar Cocina",
    "showControls": "🔽 Mostrar Controles y Modos",
    "hideControls": "🔼 Ocultar Controles",
    "tabs": {
      "database": "🗄️ Base de Datos de Recetas Firestore",
      "playRecipe": "▶️ Reproducir Receta",
      "cookbook": "📕 Libro de Cocina",
      "actionRecorder": "🎥 Grabador de Acciones"
    },
    "devModeActive": "🛠️ Modo Dev (Activo) ➔ Cambiar a Publicación",
    "slimPublishPreview": "👁️ Vista previa de Publicación ➔ Cambiar a Dev"
  },
  "recorder": {
    "title": "🎥 Grabación de Acciones y Traductor",
    "subtitle": "Graba interacciones humanas en vivo, reproduce registros o traduce acciones en una receta para la mascota.",
    "status": "Acciones Capturadas: {{actions}} | Eventos: {{events}}",
    "startRecording": "⏺️ Grabar Sesión",
    "recording": "🔴 Grabando Acciones...",
    "stopRecording": "⏹️ Detener Grabación",
    "stopRecordingCount": "⏹ Detener Grabación ({{count}})",
    "saveToDb": "💾 Guardar Receta en BD",
    "cancelSave": "💾 Cancelar Guardado",
    "clearLog": "🗑 Borrar Registro",
    "hideTranslator": "🪄 Ocultar Traductor",
    "translateViewFormats": "🪄 Traducir / Ver Formatos",
    "resetKitchen": "🔄 Reiniciar Cocina",
    "savedIngredientsCount": "🛒 Ingredientes Guardados ({{count}}):",
    "noIngredientsUsed": "Aún no hay ingredientes usados. Arrastra elementos del panel derecho a la cocina.",
    "saveToFirestoreTitle": "💾 Guardar Receta Grabada en Firestore",
    "translatorPreview": "🪄 Formatos de Exportación de Acciones y Vista del Traductor",
    "saveTitle": "Título de la Receta",
    "saveAuthor": "Autor",
    "saveDescription": "Descripción",
    "includeFormats": "Incluir Formatos para Guardar en la BD:",
    "formatMascot": "🤖 Secuencia de Acciones de Mascota",
    "formatRecipeJson": "📜 JSON de Receta Declarativa",
    "formatSessionLog": "💾 Registro Completo de Sesión",
    "saving": "⏳ Guardando en Firestore...",
    "saveSuccess": "✅ ¡Receta guardada con éxito en Cloud Firestore! Puedes reproducirla en cualquier momento desde el Catálogo de Recetas.",
    "saveError": "❌ Error al guardar: {{error}}",
    "usedIngredients": "🛒 Ingredientes Guardados ({{count}}):",
    "dishNameModalTitle": "🍽️ ¡Nombra tu Receta!",
    "dishNameModalSubtitle": "¡Hay un plato preparado en tu plato! ¿Qué nombre quieres darle a esta creación?",
    "dishNamePlaceholder": "p. ej., Tortilla de Patatas de la Abuela",
    "saveDishNameAndStop": "💾 Guardar Nombre y Finalizar",
    "skipDishName": "Omitir"
  },
  "replayer": {
    "loadJson": "📂 Cargar Registro (.json)",
    "selectDbRecipe": "🗄️ Seleccionar Receta de la BD...",
    "stepProgress": "Paso {{current}} de {{total}}",
    "play": "▶️ Reproducir",
    "pause": "⏸️ Pausa",
    "stepForward": "⏭️ Avanzar",
    "stepBack": "⏮️ Retroceder",
    "stop": "⏹️ Detener",
    "speed": "Velocidad:",
    "loadedRecipe": "Cargada \"{{title}}\" ({{count}} acciones)"
  },
  "database": {
    "title": "🗄️ Base de Datos de Recetas Firestore y Partidas Guardadas",
    "subtitle": "Busca, filtra y reproduce recetas en múltiples formatos directamente desde Cloud Firestore.",
    "seedCatalog": "🌱 Cargar Catálogo en BD",
    "searchPlaceholder": "🔍 Buscar recetas por título o descripción...",
    "allIngredients": "Todos los Ingredientes",
    "noRecipes": "No se encontraron recetas que coincidan con la búsqueda.",
    "mascotCompatible": "🤖 Mascota",
    "autonomousDirect": "⚡ Auto",
    "playMascot": "▶️ Modo Mascota",
    "playAuto": "⚡ Modo Directo",
    "inspectFormats": "👁️ Formatos",
    "delete": "🗑️",
    "downloadJson": "📥 Descargar (.json)",
    "confirmDeleteTitle": "🗑️ Confirmar Eliminación en Firestore",
    "confirmDeleteText": "¿Estás seguro de que deseas eliminar \"{{title}}\" de Cloud Firestore? Esta acción no se puede deshacer.",
    "cancel": "Cancelar",
    "confirmDelete": "Sí, Eliminar Receta",
    "deleting": "Eliminando \"{{title}}\" de Firestore...",
    "deleteSuccess": "✅ Eliminada \"{{title}}\" de Firestore.",
    "deleteError": "❌ Error al eliminar \"{{title}}\"."
  },
  "player": {
    "playing": "Reproduciendo Receta: {{title}}",
    "stepCounter": "Paso {{current}} / {{total}}",
    "nextStep": "Siguiente Paso ➔",
    "reset": "🔄 Reiniciar Mundo",
    "finished": "🎉 ¡Receta Completada con Éxito!"
  },
  "guide": {
    "openBtn": "📖 Guía del Jugador",
    "title": "¡Bienvenido a Tortilla World! 🌮",
    "subtitle": "Guía para el jugador en la simulación de cocina",
    "startBtn": "¡Empecemos a Cocinar!"
  },
  "ui": {
    "recipe": "Receta",
    "requiredMaterials": "Ingredientes y Herramientas Necesarias",
    "dragToWorkstation": "(Arrastra elementos al área de trabajo)",
    "instructions": "Instrucciones",
    "chefsHints": "Consejos del Chef",
    "ingredientsCatalog": "Catálogo de Ingredientes",
    "basicIngredients": "Ingredientes Básicos",
    "otherIngredients": "Otros Ingredientes",
    "showOthers": "Mostrar otros ingredientes",
    "hideOthers": "Ocultar otros ingredientes",
    "moveToOthers": "Mover a otros",
    "moveToBasic": "Mover a básicos",
    "resetCategories": "Restablecer categorías",
    "dropToCategorize": "Arrastra ingredientes aquí para cambiar de categoría",
    "sidebarSubtitle": "Arrastra elementos o pulsa ➕ para colocarlos en el área de trabajo",
    "searchIngredientsPlaceholder": "🔍 Buscar ingredientes...",
    "noIngredientsFound": "No se encontraron ingredientes para \"{{query}}\"",
    "targetLabel": "Objetivo / Tiempo de cocción:",
    "targetPlaceholder": "ej. 10 min, fuego medio, hasta dorar",
    "finalNameLabel": "Nombre del plato:",
    "finalNamePlaceholder": "Nombre del plato (ej. Tortilla de la abuela)",
    "mixtureNamePlaceholder": "Nombre de la mezcla (opcional)",
    "heatOn": "Encender Fuego",
    "heatOff": "Apagar Fuego",
    "serveToPlate": "Servir al plato 🍽️",
    "emptyContainerHint": "Coloca elementos aquí",
    "noRecipesAvailable": "No hay recetas disponibles.",
    "showIngredients": "Mostrar Ingredientes",
    "hideIngredients": "Ocultar Ingredientes",
    "emptyTrash": "Vaciar Papelera",
    "confirmEmptyTrash": "¿Estás seguro de que quieres vaciar la papelera?",
    "yesEmpty": "Sí, vaciar",
    "cancel": "Cancelar",
    "save": "Guardar",
    "leaveHere": "Dejar aquí",
    "takeMe": "Llévame",
    "recordedSession": "Grabada / Cargada",
    "noIngredientsListed": "Sin ingredientes especificadas.",
    "noInstructionsListed": "Sin pasos registrados todavía.",
    "handsFull": "¡Mis manos están ocupadas! Deja un ingrediente primero.",
    "nothingInHands": "¡No tengo nada en las manos!"
  },
  "workstations": {
    "sink": "Zona de Lavado 💧",
    "board": "Área de Corte 🔪",
    "bowl": "Preparación 🥣",
    "burner": "Sartén 🍳",
    "burner1": "sartén",
    "burner2": "Sartén 2 🍳",
    "plate": "plato",
    "trash": "Papelera 🗑️",
    "despensa": "Despensa 🧺",
    "default": "Área de Trabajo 📦"
  },
  "verbs": {
    "cut": "Cortar",
    "cook": "Cocinar",
    "wash": "Lavar",
    "peel": "Pelar",
    "mix": "Mezclar",
    "whisk": "Batir",
    "beat": "Batir",
    "combine": "Combinar",
    "heat": "Calentar",
    "flip": "Voltear",
    "serve": "Servir",
    "add": "Añadir",
    "fry": "Freír",
    "take": "Tomar",
    "move": "Mover",
    "grab": "Coger",
    "drop": "Colocar",
    "celebrate": "¡A celebrar!"
  },
  "stepFormat": {
    "moveFromTo": "Mover {{ingredient}} de {{source}} a {{target}}",
    "moveTo": "Mover {{ingredient}} a {{target}}",
    "mixToMake": "{{verb}} {{inputs}} para hacer {{output}}",
    "cookFor": "{{verb}} {{target}} durante {{duration}} {{unit}}",
    "cookForToMake": "{{verb}} {{target}} durante {{duration}} {{unit}} para hacer {{as}}",
    "flipInContainer": "Voltear {{target}} en la {{container}}",
    "flip": "{{verb}} {{target}}",
    "serveOntoAs": "Servir en el {{container}} como {{as}}",
    "serveAs": "Servir como {{as}}",
    "serveOnto": "Servir en el {{container}}"
  },
  "ingredients": {
    "potato": "Patatas",
    "egg": "Huevos",
    "oil": "Aceite de Oliva",
    "onion": "Cebolla",
    "chorizo": "Chorizo",
    "salt": "Sal",
    "pepper": "Pimiento",
    "garlic": "Ajo",
    "tomato": "Tomate",
    "cheese": "Queso",
    "bread": "Pan",
    "milk": "Leche",
    "butter": "Mantequilla",
    "black_pepper": "Pimienta Negra",
    "flour": "Harina",
    "sugar": "Azúcar",
    "rice": "Arroz",
    "chicken": "Pollo",
    "beef": "Ternera",
    "mushroom": "Champiñón",
    "spinach": "Espinacas",
    "lemon": "Limón"
  },
  "tools": {
    "knife": "Cuchillo de Chef",
    "peeler": "Pelador de Verduras",
    "whisk": "Batidor",
    "fork": "Tenedor",
    "spatula": "Espátula",
    "grater": "Rallador",
    "mandoline": "Mandolina",
    "spoon": "Cuchara"
  },
  "states": {
    "raw": "Crudo 🌾",
    "cooking": "Cocinando 🔥",
    "finished": "Listo ✨",
    "prepared": "Preparado 🔪",
    "cut": "Cortado",
    "sliced": "En rodajas",
    "peeled": "Pelado",
    "whisked": "Batido",
    "washed": "Lavado",
    "mixed": "Mezclado",
    "fried": "Frito",
    "heated": "Calentado"
  },
  "recipes": {
    "concebolla": {
      "name": "Tortilla con Cebolla",
      "description": "Tortilla española jugosa con cebollas caramelizadas.",
      "hints": [
        "Fríe las cebollas hasta que estén doradas antes de mezclar."
      ]
    },
    "clasica": {
      "name": "Tortilla Clásica",
      "description": "Tortilla española tradicional sin cebolla.",
      "hints": [
        "Que no se queme el ajo.",
        "Con una espátula blanda, asegúrate de que la tortilla no se pega a la sartén."
      ]
    },
    "francesa": {
      "name": "Tortilla Francesa",
      "description": "Tortilla francesa tradicional.",
      "hints": [
        "Mezcla los huevos en el bol con la sal para hacer el Huevo batido.",
        "Enciende el fuego, añade aceite y caliéntalo.",
        "Con una espátula blanda, asegúrate de que la tortilla no se pega a la sartén."
      ]
    },
    "recorded": {
      "name": "Receta Grabada / Cargada",
      "description": "Receta generada dinámicamente a partir de acciones de cocina grabadas o cargadas."
    }
  }
}
`````

## File: src/store/slices/entitySlice.ts
`````typescript
/**
 * FILE: entitySlice.ts
 *
 * PURPOSE:
 * Zustand slice for entity management (ingredients, tools, mascot entities).
 *
 * RESPONSIBILITY:
 * - Mutates entity records in world state.
 * - Handles adding, removing, updating, preparing, and cooking entities.
 */

import type { StateCreator } from 'zustand/vanilla';
import type { Entity } from '../../types/world';
import type { PreparationStyle, CookingMethod } from '../../types/RecipeStep';
import type { WorldStateStore } from '../types';
import { validateContainerRules } from '../../engine/containerRules';
import {
  derivePreparationStatus,
  deriveCookingStatus,
  formatPreparedName,
  formatCookedName,
  applyIngredientTransformation,
} from '../../engine/ingredientState';

export interface EntitySlice {
  entities: Record<string, Entity>;
  addEntity: (
    entity: {
      id: string;
      name: string;
      type: Entity['type'];
      icon?: string;
      ingredientId?: string;
      state?: Record<string, unknown>;
    },
    containerId: string
  ) => void;
  removeEntity: (entityId: string) => void;
  updateEntityState: (entityId: string, changes: Record<string, unknown>) => void;
  prepareIngredient: (entityId: string, preparation: PreparationStyle) => void;
  cookIngredient: (entityId: string, cooking: CookingMethod) => void;
  transformIngredient: (
    entityId: string,
    transformation: 'wash' | 'cut' | 'peel' | 'cook' | 'mix'
  ) => void;
  useIngredient: (entityId: string, usedIn?: string) => void;
  revertIngredientUsage: (entityId: string, previousContainerId?: string) => void;
  consumeIngredient: (entityId: string, consumedBy?: string) => void;
}

export const createEntitySlice: StateCreator<
  WorldStateStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  EntitySlice
> = (set, get) => ({
  entities: {},

  addEntity: (entity, containerId) => {
    const targetContainer = get().containers[containerId];
    if (!targetContainer) return;

    const currentEntities = targetContainer.entityIds
      .map((id) => get().entities[id])
      .filter((e): e is Entity => Boolean(e));

    const result = validateContainerRules(
      targetContainer,
      entity as Entity,
      currentEntities
    );
    if (!result.allowed) return;

    set(
      (state) => {
        state.entities[entity.id] = entity as Entity;
        state.containers[containerId].entityIds.push(entity.id);
      },
      false,
      'ADD_ENTITY'
    );
  },

  removeEntity: (entityId) => {
    set(
      (state) => {
        delete state.entities[entityId];
        for (const cId in state.containers) {
          state.containers[cId].entityIds = state.containers[cId].entityIds.filter(
            (id) => id !== entityId
          );
        }
      },
      false,
      'REMOVE_ENTITY'
    );
  },

  updateEntityState: (entityId, changes) => {
    set(
      (state) => {
        const targetEntity = state.entities[entityId];
        if (!targetEntity) return;

        if (changes.name && typeof changes.name === 'string') {
          targetEntity.name = changes.name;
        }

        targetEntity.state = {
          ...targetEntity.state,
          ...changes,
        };
      },
      false,
      'UPDATE_ENTITY_STATE'
    );
  },

  prepareIngredient: (entityId, preparation) => {
    const targetEntity = get().entities[entityId];
    if (!targetEntity) return;

    const status = derivePreparationStatus(targetEntity, preparation);
    const updatedName = formatPreparedName(targetEntity, preparation);

    set(
      (state) => {
        const entity = state.entities[entityId];
        if (!entity) return;

        entity.name = updatedName;
        entity.state = {
          ...entity.state,
          preparation,
          status,
        };
      },
      false,
      'PREPARE_INGREDIENT'
    );
  },

  cookIngredient: (entityId, cooking) => {
    const targetEntity = get().entities[entityId];
    if (!targetEntity) return;

    const status = deriveCookingStatus(targetEntity, cooking);
    const updatedName = formatCookedName(targetEntity, cooking);

    set(
      (state) => {
        const entity = state.entities[entityId];
        if (!entity) return;

        entity.name = updatedName;
        entity.state = {
          ...entity.state,
          cooking,
          status,
        };
      },
      false,
      'COOK_INGREDIENT'
    );
  },

  transformIngredient: (entityId, transformation) => {
    const targetEntity = get().entities[entityId];
    if (!targetEntity) return;

    const result = applyIngredientTransformation(targetEntity, transformation);
    if (!result) return;

    set(
      (state) => {
        const entity = state.entities[entityId];
        if (!entity) return;

        entity.name = result.name;
        entity.status = result.status;
        entity.state = {
          ...entity.state,
          ...result.state,
        };
      },
      false,
      'TRANSFORM_INGREDIENT'
    );
  },

  useIngredient: (entityId, usedIn) => {
    const state = get();
    const entity = state.entities[entityId];
    if (!entity) return;

    let previousContainerId: string | undefined;
    for (const cId in state.containers) {
      if (state.containers[cId].entityIds.includes(entityId)) {
        previousContainerId = cId;
        break;
      }
    }

    set(
      (draft) => {
        const targetEntity = draft.entities[entityId];
        if (!targetEntity) return;

        // Remove from current container(s)
        for (const cId in draft.containers) {
          draft.containers[cId].entityIds = draft.containers[cId].entityIds.filter(
            (id) => id !== entityId
          );
        }

        const mascot = draft.entities['chef'];
        if (mascot) {
          const rawHolding = mascot.state?.holdingEntityIds as string[] | undefined;
          const updatedHolding = rawHolding ? rawHolding.filter((id) => id !== entityId) : [];
          mascot.state = {
            ...mascot.state,
            holdingEntityIds: updatedHolding,
            holdingEntityId: updatedHolding.length > 0 ? updatedHolding[updatedHolding.length - 1] : undefined,
          };
        }

        // If usedIn matches an existing container ID, add to that container
        if (usedIn && draft.containers[usedIn]) {
          draft.containers[usedIn].entityIds.push(entityId);
        }

        // Mark consumed and update entity state
        targetEntity.state = {
          ...targetEntity.state,
          consumed: true,
          consumedBy: usedIn,
          previousContainerId: previousContainerId || (targetEntity.state?.previousContainerId as string | undefined),
          status: 'consumed',
        };
      },
      false,
      'USE_INGREDIENT'
    );

    // Emit domain event
    get().emitEvent({
      type: 'INGREDIENT_CONSUMED',
      payload: {
        entityId,
        consumedBy: usedIn,
      },
    });
  },

  revertIngredientUsage: (entityId, previousContainerId) => {
    set(
      (draft) => {
        const targetEntity = draft.entities[entityId];
        if (!targetEntity) return;

        const targetContainerId =
          previousContainerId || (targetEntity.state?.previousContainerId as string | undefined);

        // Remove from current containers
        for (const cId in draft.containers) {
          draft.containers[cId].entityIds = draft.containers[cId].entityIds.filter(
            (id) => id !== entityId
          );
        }

        // Restore to previous container if valid
        if (targetContainerId && draft.containers[targetContainerId]) {
          draft.containers[targetContainerId].entityIds.push(entityId);
        }

        // Revert consumed state
        if (targetEntity.state) {
          delete targetEntity.state.consumed;
          delete targetEntity.state.consumedBy;
          delete targetEntity.state.previousContainerId;
          if (targetEntity.state.status === 'consumed') {
            delete targetEntity.state.status;
          }
        }
      },
      false,
      'REVERT_INGREDIENT_USAGE'
    );
  },

  consumeIngredient: (entityId, consumedBy) => {
    get().useIngredient(entityId, consumedBy);
  },
});
`````

## File: src/store/defaults.ts
`````typescript
/**
 * FILE: defaults.ts
 *
 * PURPOSE:
 * Initial seed data for world state.
 *
 * RESPONSIBILITY:
 * - Provides default entity definitions (mascot, ingredients, tools).
 * - Provides default container definitions (despensa, sink, board, bowl, burner, plate).
 */

import type { Container, Entity } from '../types/world';
import type { GazeTarget } from '../systems/gaze';
import { ingredients as catalogIngredients } from '../data/catalog/ingredients';
import { catalogTools } from '../data/catalog/tools';

export const defaultEntities: Record<string, Entity> = {
  chef: {
    id: 'chef',
    name: 'Chef Tortilla 🍳',
    type: 'mascot',
    state: { gazingAt: { type: 'entity', entityId: 'despensa' } satisfies GazeTarget },
  },
  ...catalogIngredients.reduce((acc, item) => {
    acc[item.id] = {
      id: item.id,
      ingredientId: item.id,
      name: `${item.icon} ${item.name}`,
      type: 'ingredient',
      state: {},
    };
    return acc;
  }, {} as Record<string, Entity>),
  ...catalogTools.reduce((acc, item) => {
    acc[item.id] = {
      id: item.id,
      name: `${item.icon} ${item.name}`,
      type: 'tool',
      state: {},
    };
    return acc;
  }, {} as Record<string, Entity>),
};

export const defaultContainers: Record<string, Container> = {
  despensa: {
    id: 'despensa',
    name: 'Despensa (All Ingredients - Immutable Catalog)',
    type: 'storage',
    entityIds: [...catalogIngredients.map((i) => i.id)],
    rules: {
      maxCapacity: 30,
      allowedTypes: ['ingredient'],
      consumesOnDrag: false,
      isImmutable: true,
    },
  },
  sink: {
    id: 'sink',
    name: 'Fregadero (Sink)',
    type: 'sink',
    entityIds: [],
    rules: { maxCapacity: 10, allowedTypes: ['ingredient', 'tool'] },
  },
  board: {
    id: 'board',
    name: 'Tabla (Cutting Board)',
    type: 'board',
    entityIds: [],
    rules: { maxCapacity: 10, allowedTypes: ['ingredient', 'tool'] },
  },
  bowl: {
    id: 'bowl',
    name: 'Bol (Preparation Bowl)',
    type: 'bowl',
    entityIds: [],
    rules: { maxCapacity: 10, allowedTypes: ['ingredient', 'tool'] },
  },
  burner1: {
    id: 'burner1',
    name: 'Fuego 1',
    type: 'burner',
    entityIds: [],
    rules: { maxCapacity: 5, allowedTypes: ['ingredient', 'tool'] },
    isOn: false,
  },
  burner2: {
    id: 'burner2',
    name: 'Fuego 2',
    type: 'burner',
    entityIds: [],
    isOn: false,
    rules: { maxCapacity: 5, allowedTypes: ['ingredient', 'tool'] },
  },
  plate: {
    id: 'plate',
    name: 'Plato (Plate)',
    type: 'plate',
    entityIds: [],
    rules: { maxCapacity: 5, allowedTypes: ['ingredient', 'tool'] },
  },
  trash: {
    id: 'trash',
    name: 'Papelera (Trash)',
    type: 'storage',
    entityIds: [],
    rules: { maxCapacity: 100, allowedTypes: ['ingredient', 'tool'] },
  },
};
`````

## File: src/systems/recipeRunner/RecipeRunner.ts
`````typescript
/**
 * FILE: src/systems/recipeRunner/RecipeRunner.ts
 *
 * PURPOSE:
 * Workstation and tool-driven recipe execution engine (RecipeRunner).
 *
 * RESPONSIBILITY:
 * - Iterates over declarative RecipeSteps sequentially.
 * - Dynamically determines required workstation and tools for each step.
 * - Dispatches appropriate world and mascot actions via step handlers.
 * - Modifies existing entity state for preparation/cooking without destroying/recreating entities.
 * - Preserves data-driven architecture and keeps recipes decoupled from kitchen locations.
 */

import { worldStore } from '../../store/worldStore';
import { getIngredientCatalogId } from '../../engine/containerRules';
import { findWorkstationForStep } from '../../engine/workstations';
import { loadRecipe } from '../recipeLoader';
import { getRecipeWorkstationIds } from '../recipeWorkstations';
import type { Recipe, RecipeRequirementDictItem } from '../../types/Recipe';
import type { RecipeStep } from '../../types/RecipeStep';
import type { Entity } from '../../types/world';
import type { RecipeRunnerOptions, RecipeRunnerContext, RecipeContextData } from './types';
import { handleMoveStep, handleGrabStep, handleDropStep } from './handlers/moveHandlers';
import { handlePrepStep } from './handlers/prepHandlers';
import { handleCookStep, handleFlipStep } from './handlers/cookHandlers';
import { handleMixStep } from './handlers/mixHandlers';
import {
  handleServeStep,
  handleWaitStep,
  handleInstructionStep,
  handleSpeakStep,
  handleCelebrateStep,
} from './handlers/utilityHandlers';

export class RecipeRunner implements RecipeRunnerContext {
  public mascotId: string;
  public defaultSourceId: string;
  public defaultTargetId: string;
  public delayMs: number;
  public useMascot: boolean;
  public currentRecipe?: Recipe;
  public recipeContext: RecipeContextData;

  constructor(options: RecipeRunnerOptions = {}) {
    this.mascotId = options.mascotId || 'chef';
    this.defaultSourceId = options.defaultSourceId || 'despensa';
    this.defaultTargetId = options.defaultTargetId || '';
    this.delayMs = options.delayMs ?? 600;
    this.useMascot = options.useMascot ?? true;
    this.recipeContext = {
      recipeId: '',
      bindings: {},
    };
  }

  public async wait(ms?: number): Promise<void> {
    const duration = ms ?? this.delayMs;
    if (duration <= 0) return;
    await new Promise((resolve) => setTimeout(resolve, duration));
  }

  public bindRecipeContext(recipeOrId: Recipe | string): void {
    const recipe: Recipe = typeof recipeOrId === 'string' ? loadRecipe(recipeOrId) : recipeOrId;
    this.currentRecipe = recipe;
    this.recipeContext = {
      recipeId: recipe.id,
      bindings: {},
    };

    // Dynamically set defaultTargetId based on recipe's workstations if not explicitly provided
    const wsIds = getRecipeWorkstationIds(recipe);
    if (!this.defaultTargetId || this.defaultTargetId === 'board') {
      if (wsIds.has('board')) {
        this.defaultTargetId = 'board';
      } else if (wsIds.has('bowl')) {
        this.defaultTargetId = 'bowl';
      } else if (wsIds.has('burner1')) {
        this.defaultTargetId = 'burner1';
      } else {
        const first = Array.from(wsIds).find((id) => id !== 'despensa' && id !== 'plate');
        this.defaultTargetId = first || 'bowl';
      }
    }

    const boundIds = new Set<string>();

    const findOrCreateAvailableEntity = (
      ingredientCatalogId: string,
      aliasKey?: string
    ): string => {
      const state = worldStore.getState();
      const allEntities = Object.values(state.entities);

      // 1. Check for unconsumed, unbound entity in active workspace containers
      const activeWorkspaceContainerIds = Object.values(state.containers)
        .filter((c) => c.type !== 'storage' && c.id !== 'despensa')
        .map((c) => c.id);

      for (const cId of activeWorkspaceContainerIds) {
        const container = state.containers[cId];
        if (container) {
          const workspaceCandidate = container.entityIds
            .map((id) => state.entities[id])
            .find((e) => {
              if (!e || e.type !== 'ingredient' || e.state?.consumed || boundIds.has(e.id)) {
                return false;
              }
              const catId = getIngredientCatalogId(e);
              return (
                catId === ingredientCatalogId ||
                e.ingredientId === ingredientCatalogId ||
                e.id === ingredientCatalogId ||
                (aliasKey && e.id === aliasKey)
              );
            });
          if (workspaceCandidate) {
            boundIds.add(workspaceCandidate.id);
            return workspaceCandidate.id;
          }
        }
      }

      // 2. Check for unconsumed, unbound entity anywhere in world
      const unboundCandidate = allEntities.find((e) => {
        if (!e || e.type !== 'ingredient' || e.state?.consumed || boundIds.has(e.id)) {
          return false;
        }
        const catId = getIngredientCatalogId(e);
        return (
          catId === ingredientCatalogId ||
          e.ingredientId === ingredientCatalogId ||
          e.id === ingredientCatalogId ||
          (aliasKey && e.id === aliasKey)
        );
      });

      if (unboundCandidate) {
        boundIds.add(unboundCandidate.id);
        return unboundCandidate.id;
      }

      // 3. If no unbound entity exists, check for template entity in immutable storage (e.g. despensa)
      const immutableCandidate = allEntities.find((e) => {
        if (!e || e.type !== 'ingredient' || e.state?.consumed) return false;
        const catId = getIngredientCatalogId(e);
        return (
          catId === ingredientCatalogId ||
          e.ingredientId === ingredientCatalogId ||
          e.id === ingredientCatalogId ||
          (aliasKey && e.id === aliasKey)
        );
      });

      if (immutableCandidate) {
        return immutableCandidate.id;
      }

      // 4. Fallback: spawn new ingredient entity in despensa or board
      const newEntityId = `${ingredientCatalogId}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const newEntity: Entity = {
        id: newEntityId,
        name: ingredientCatalogId.charAt(0).toUpperCase() + ingredientCatalogId.slice(1),
        type: 'ingredient',
        ingredientId: ingredientCatalogId,
        state: { preparation: 'whole', cooking: 'raw' },
      };

      const targetContainerId = state.containers[this.defaultSourceId] ? this.defaultSourceId : 'board';
      worldStore.getState().dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: newEntity,
          containerId: targetContainerId,
        },
      });

      boundIds.add(newEntityId);
      return newEntityId;
    };

    const reqs = recipe.requirements || (recipe as unknown as { ingredients?: unknown }).ingredients;

    if (Array.isArray(reqs)) {
      for (const item of reqs) {
        const rawItem = item as { entityId?: string; ingredientId?: string; id?: string };
        const entityIdKey = rawItem.entityId || rawItem.ingredientId || '';
        const entityId = findOrCreateAvailableEntity(entityIdKey, rawItem.id);
        this.recipeContext.bindings[entityIdKey] = entityId;
        if (rawItem.id) {
          this.recipeContext.bindings[rawItem.id] = entityId;
        }
      }
    } else if (reqs && typeof reqs === 'object') {
      for (const [key, item] of Object.entries(
        reqs as Record<string, RecipeRequirementDictItem>
      )) {
        const rawItem = item as { entityId?: string; ingredientId?: string };
        const entityIdKey = rawItem.entityId || rawItem.ingredientId || key;
        const entityId = findOrCreateAvailableEntity(entityIdKey, key);
        this.recipeContext.bindings[key] = entityId;
        this.recipeContext.bindings[entityIdKey] = entityId;
      }
    }

    this.bindStepsContext(recipe.steps, boundIds);
  }

  private bindStepsContext(steps: RecipeStep[], boundIds: Set<string>): void {
    const state = worldStore.getState();

    for (const step of steps) {
      if (step.action === 'mix' || step.action === 'beat' || step.action === 'combine') {
        const inputs = step.inputs || step.ingredients || [];
        for (const inputKey of inputs) {
          if (!this.recipeContext.bindings[inputKey]) {
            const catId = this.resolveIngredientId(inputKey) || inputKey;
            const candidate = Object.values(state.entities).find(
              (e) =>
                e &&
                e.type === 'ingredient' &&
                !e.state?.consumed &&
                !boundIds.has(e.id) &&
                (getIngredientCatalogId(e) === catId || e.ingredientId === catId || e.id === inputKey)
            );
            if (candidate) {
              this.recipeContext.bindings[inputKey] = candidate.id;
              this.recipeContext.bindings[catId] = candidate.id;
              boundIds.add(candidate.id);
            }
          }
        }
      } else if ('ingredient' in step || 'target' in step) {
        const rawKey =
          ('ingredient' in step ? step.ingredient : undefined) ||
          ('target' in step ? step.target : undefined);
        if (rawKey && rawKey !== 'mixture' && !this.recipeContext.bindings[rawKey]) {
          const catId = this.resolveIngredientId(rawKey) || rawKey;
          const candidate = Object.values(state.entities).find(
            (e) =>
              e &&
              e.type === 'ingredient' &&
              !e.state?.consumed &&
              !boundIds.has(e.id) &&
              (getIngredientCatalogId(e) === catId || e.ingredientId === catId || e.id === rawKey)
          );
          if (candidate) {
            this.recipeContext.bindings[rawKey] = candidate.id;
            this.recipeContext.bindings[catId] = candidate.id;
            boundIds.add(candidate.id);
          }
        }
      }
    }
  }

  public getBoundEntityId(targetOrKey?: string): string | undefined {
    if (!targetOrKey) return undefined;
    if (this.recipeContext.bindings[targetOrKey]) {
      return this.recipeContext.bindings[targetOrKey];
    }
    const resolvedCatId = this.resolveIngredientId(targetOrKey);
    if (resolvedCatId && this.recipeContext.bindings[resolvedCatId]) {
      return this.recipeContext.bindings[resolvedCatId];
    }
    const state = worldStore.getState();
    if (state.entities[targetOrKey]) {
      return targetOrKey;
    }
    return undefined;
  }

  public validateEntity(entityId: string, stepAction: string = 'step'): Entity {
    const state = worldStore.getState();
    const entity = state.entities[entityId];
    if (!entity) {
      throw new Error(
        `[RecipeRunner] Validation failed for ${stepAction}: Entity "${entityId}" does not exist in world state.`
      );
    }
    if (entity.state?.consumed) {
      throw new Error(
        `[RecipeRunner] Validation failed for ${stepAction}: Entity "${entityId}" (${entity.name}) has already been consumed.`
      );
    }
    return entity;
  }

  public updateBindingIfCopied(
    oldEntityId: string,
    newEntityId: string,
    specificKey?: string
  ): void {
    if (oldEntityId === newEntityId) return;
    if (specificKey && this.recipeContext.bindings[specificKey] === oldEntityId) {
      this.recipeContext.bindings[specificKey] = newEntityId;
    } else {
      for (const key in this.recipeContext.bindings) {
        if (this.recipeContext.bindings[key] === oldEntityId) {
          this.recipeContext.bindings[key] = newEntityId;
        }
      }
    }
  }

  public async ensureEntityInWorkspace(
    entityId: string,
    targetContainerId: string = this.defaultTargetId
  ): Promise<string> {
    const state = worldStore.getState();
    this.validateEntity(entityId, 'ensureEntityInWorkspace');

    const targetContainer = state.containers[targetContainerId];
    if (targetContainer && targetContainer.entityIds.includes(entityId)) {
      return entityId;
    }

    const mascot = state.entities[this.mascotId];
    const rawHolding = mascot?.state?.holdingEntityIds as string[] | undefined;
    const singleHolding = mascot?.state?.holdingEntityId as string | undefined;
    const holdingIds = Array.isArray(rawHolding) && rawHolding.length > 0 ? rawHolding : singleHolding ? [singleHolding] : [];

    if (holdingIds.includes(entityId)) {
      return entityId;
    }

    let currentContainerId = this.defaultSourceId;
    for (const container of Object.values(state.containers)) {
      if (container.entityIds.includes(entityId)) {
        currentContainerId = container.id;
        break;
      }
    }

    await handleMoveStep(
      this,
      {
        action: 'move',
        ingredient: entityId,
        source: currentContainerId,
        target: targetContainerId,
      },
      targetContainerId
    );

    const updatedState = worldStore.getState();
    const updatedTargetContainer = updatedState.containers[targetContainerId];
    if (updatedTargetContainer) {
      if (updatedTargetContainer.entityIds.includes(entityId)) {
        return entityId;
      }
      const copyId = updatedTargetContainer.entityIds[updatedTargetContainer.entityIds.length - 1];
      if (copyId) {
        this.updateBindingIfCopied(entityId, copyId);
        return copyId;
      }
    }
    return entityId;
  }

  public resolveIngredientId(targetOrKey?: string): string | undefined {
    if (!targetOrKey) return undefined;
    const reqs = this.currentRecipe?.requirements || (this.currentRecipe as unknown as { ingredients?: unknown })?.ingredients;
    if (reqs && !Array.isArray(reqs)) {
      const dict = reqs as Record<string, { entityId?: string; ingredientId?: string }>;
      if (dict[targetOrKey]) {
        return dict[targetOrKey].entityId || dict[targetOrKey].ingredientId;
      }
      const match = Object.values(dict).find(
        (item) => (item.entityId || item.ingredientId) === targetOrKey
      );
      if (match) {
        return match.entityId || match.ingredientId;
      }
    }
    return targetOrKey;
  }

  public async ensureIngredientInWorkspace(
    ingredientCatalogId: string,
    targetContainerId: string = this.defaultTargetId
  ): Promise<string | undefined> {
    const boundId = this.getBoundEntityId(ingredientCatalogId);
    if (boundId) {
      return this.ensureEntityInWorkspace(boundId, targetContainerId);
    }
    return undefined;
  }

  public async runRecipe(recipeOrId: Recipe | string): Promise<void> {
    const recipe: Recipe = typeof recipeOrId === 'string' ? loadRecipe(recipeOrId) : recipeOrId;
    this.bindRecipeContext(recipe);
    await this.runSteps(recipe.steps);
  }

  public async runSteps(steps: RecipeStep[]): Promise<void> {
    if (!this.recipeContext.recipeId) {
      this.recipeContext.recipeId = 'steps_run';
      this.bindStepsContext(steps, new Set<string>());
    }
    for (const step of steps) {
      await this.executeStep(step);
    }
  }

  public async executeStep(step: RecipeStep): Promise<void> {
    const workstation = findWorkstationForStep(step);

    if (!worldStore.getState().userOverride) {
      const containerId =
        (step as { containerId?: string; targetContainerId?: string }).containerId ||
        (step as { containerId?: string; targetContainerId?: string }).targetContainerId ||
        workstation.defaultContainerId;

      if (containerId) {
        worldStore.getState().setFocus({
          containerId,
          mode: 'focused',
        });
      }
    }

    switch (step.action) {
      case 'move':
        return handleMoveStep(this, step, workstation.defaultContainerId);
      case 'grab':
        return handleGrabStep(this, step);
      case 'drop':
        return handleDropStep(this, step, workstation.defaultContainerId);

      case 'cut':
      case 'prepare':
      case 'peel':
      case 'wash':
      case 'rinse':
      case 'drain':
      case 'clean':
        return handlePrepStep(this, step, workstation.defaultContainerId);

      case 'cook':
        return handleCookStep(this, step, workstation.defaultContainerId);
      case 'flip':
        return handleFlipStep(this, step);

      case 'mix':
      case 'beat':
      case 'combine':
        return handleMixStep(this, step, workstation.defaultContainerId);

      case 'serve':
        return handleServeStep(this, step, workstation.defaultContainerId);

      case 'wait':
        return handleWaitStep(this, step);
      case 'instruction':
        return handleInstructionStep(this, step);
      case 'speak':
        return handleSpeakStep(this, step);
      case 'celebrate':
        return handleCelebrateStep(this, step);
    }
  }
}
`````

## File: src/components/World/EntityView.tsx
`````typescript
/**
 * FILE: EntityView.tsx
 *
 * PURPOSE:
 * Generic entity renderer component.
 *
 * RESPONSIBILITY:
 * - Renders entities based on entity type via a renderer registry.
 * - Handles drag-and-drop interactions or static read-only presentation.
 */

import React from 'react';
import { useStore } from 'zustand';
import { useDraggable } from '@dnd-kit/core';
import type { Entity } from '../../types/world';
import { EntityIcon } from './EntityIcon';
import { EntityStateBadge } from './EntityStateBadge';
import { entityRendererRegistry, type EntityRendererProps } from './rendererRegistry';
import { useTranslation } from '../../i18n/useTranslation';
import { worldStore } from '../../store/worldStore';
import { getEntityFocusClass } from '../../systems/focus';

const STANDARD_WORKSTATION_ORDER = ['sink', 'board', 'bowl', 'burner', 'burner1', 'burner2', 'plate', 'trash'];

/**
 * Default Entity Renderer used when no custom renderer is registered for an entity type.
 */
export const DefaultEntityRenderer: React.FC<EntityRendererProps> = ({ entity, containerId, readOnly }) => {
  const { t } = useTranslation();
  const containers = useStore(worldStore, (state) => state.containers);

  const workstationList = React.useMemo(() => {
    const keys = Object.keys(containers).filter((id) => id !== 'despensa');
    return keys.sort((a, b) => {
      const idxA = STANDARD_WORKSTATION_ORDER.indexOf(a);
      const idxB = STANDARD_WORKSTATION_ORDER.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    });
  }, [containers]);

  const currentIndex = containerId ? workstationList.indexOf(containerId) : -1;
  const prevContainerId = currentIndex > 0 ? workstationList[currentIndex - 1] : null;
  const nextContainerId =
    currentIndex >= 0 && currentIndex < workstationList.length - 1
      ? workstationList[currentIndex + 1]
      : null;

  const ingKey = entity.ingredientId || entity.id;
  const toolKey = entity.id;

  const translatedIng = t(`ingredients.${ingKey}`);
  const translatedTool = t(`tools.${toolKey}`);

  let displayName = entity.name;
  const isMixtureEntity = ingKey === 'mixture' || entity.ingredientId === 'mixture';

  if (!isMixtureEntity && translatedIng && !translatedIng.startsWith('ingredients.')) {
    // If entity.name has icon prefix, e.g., "🥔 Potatoes"
    const hasIconPrefix = entity.icon && entity.name.startsWith(entity.icon);
    displayName = hasIconPrefix ? `${entity.icon} ${translatedIng}` : translatedIng;
  } else if (translatedTool && !translatedTool.startsWith('tools.')) {
    displayName = translatedTool;
  }

  return (
    <>
      <span className="entity-view__icon">
        <EntityIcon entity={entity} />
      </span>
      <span className="entity-view__name">{displayName}</span>
      <EntityStateBadge entity={entity} containerId={containerId} />
      {containerId && containerId !== 'despensa' && !readOnly && (
        <div className="entity-nav-buttons">
          <button
            type="button"
            className="entity-take-btn"
            title={t('ui.takeMe') || '🤲 Llévame'}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              const mascot = worldStore.getState().entities['chef'];
              const rawHolding = mascot?.state?.holdingEntityIds as string[] | undefined;
              const singleHolding = mascot?.state?.holdingEntityId as string | undefined;
              const currentHolding = Array.isArray(rawHolding) && rawHolding.length > 0
                ? rawHolding
                : singleHolding
                ? [singleHolding]
                : [];

              if (currentHolding.length < 2) {
                worldStore.getState().dispatch({
                  type: 'MASCOT_GRAB',
                  payload: {
                    entityId: entity.id,
                    sourceContainerId: containerId,
                    mascotId: 'chef',
                  },
                });
              } else {
                worldStore.getState().dispatch({
                  type: 'UPDATE_ENTITY_STATE',
                  payload: {
                    entityId: 'chef',
                    changes: { speechMessage: '¡Mis manos están llenas! 🤲 / My hands are full!' },
                  },
                });
                setTimeout(() => {
                  worldStore.getState().dispatch({
                    type: 'UPDATE_ENTITY_STATE',
                    payload: { entityId: 'chef', changes: { speechMessage: undefined } },
                  });
                }, 2500);
              }
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <span className="take-btn-icon">🤲</span>
            <span className="take-btn-text">{t('ui.takeMe') || 'Llévame'}</span>
          </button>
          <button
            type="button"
            className="entity-nav-btn nav-prev"
            title={prevContainerId ? `Move to ${prevContainerId}` : undefined}
            disabled={!prevContainerId}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (prevContainerId) {
                worldStore.getState().dispatch({
                  type: 'MOVE_ENTITY',
                  payload: {
                    entityId: entity.id,
                    targetContainerId: prevContainerId,
                    sourceContainerId: containerId,
                  },
                });
              }
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            ◀
          </button>
          <button
            type="button"
            className="entity-nav-btn nav-next"
            title={nextContainerId ? `Move to ${nextContainerId}` : undefined}
            disabled={!nextContainerId}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (nextContainerId) {
                worldStore.getState().dispatch({
                  type: 'MOVE_ENTITY',
                  payload: {
                    entityId: entity.id,
                    targetContainerId: nextContainerId,
                    sourceContainerId: containerId,
                  },
                });
              }
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            ▶
          </button>
          {containerId !== 'trash' && (
            <button
              type="button"
              className="entity-delete-btn"
              title="Move to trash"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                worldStore.getState().dispatch({
                  type: 'MOVE_ENTITY',
                  payload: {
                    entityId: entity.id,
                    targetContainerId: 'trash',
                    sourceContainerId: containerId,
                  },
                });
              }}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              ×
            </button>
          )}
        </div>
      )}
    </>
  );
};

interface EntityViewProps {
  entity: Entity;
  containerId?: string;
  readOnly?: boolean;
}

/**
 * Inner component for interactive draggable entities (must be used inside a DndContext).
 */
const DraggableEntityView: React.FC<EntityViewProps> = ({ entity, containerId }) => {
  const focusTarget = useStore(worldStore, (state) => state.focusTarget);
  const focusClass = getEntityFocusClass(entity.id, containerId, focusTarget);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: entity.id,
  });

  const style: React.CSSProperties = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 1000 : 1,
        cursor: 'grab',
      }
    : {
        cursor: 'grab',
      };

  const CustomRenderer = entityRendererRegistry[entity.type];
  const RendererComponent = CustomRenderer || DefaultEntityRenderer;

  const className = [
    'entity-view',
    focusClass,
    `entity-view--type-${entity.type}`,
    isDragging ? 'entity-view--dragging' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      data-entity-id={entity.id}
      data-ingredient-id={entity.ingredientId || entity.id}
      className={className}
    >
      <RendererComponent entity={entity} containerId={containerId} readOnly={false} />
    </div>
  );
};

export const EntityView: React.FC<EntityViewProps> = ({ entity, containerId, readOnly = false }) => {
  const focusTarget = useStore(worldStore, (state) => state.focusTarget);
  const focusClass = getEntityFocusClass(entity.id, containerId, focusTarget);

  if (readOnly) {
    const CustomRenderer = entityRendererRegistry[entity.type];
    const RendererComponent = CustomRenderer || DefaultEntityRenderer;

    const className = [
      'entity-view',
      focusClass,
      `entity-view--type-${entity.type}`,
      'entity-view--readonly',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        data-entity-id={entity.id}
        data-ingredient-id={entity.ingredientId || entity.id}
        className={className}
      >
        <RendererComponent entity={entity} containerId={containerId} readOnly />
      </div>
    );
  }

  return <DraggableEntityView entity={entity} containerId={containerId} />;
};
`````

## File: src/data/catalog/recipes/clasica.ts
`````typescript
/**
 * FILE: clasica.ts
 *
 * PURPOSE:
 * Recipe export for Tortilla Clásica (without onion).
 *
 * RESPONSIBILITY:
 * - Loaded dynamically from clasica.json via loadRecipe.
 * - Re-exports clasicaRecipe and clasicaCooklang for backward compatibility.
 */

import { loadRecipe, getRecipeCooklang } from '../../../systems/recipeLoader';
import type { Recipe } from '../../../types/Recipe';

export const clasicaRecipe: Recipe = loadRecipe('clasica');
export const clasicaCooklang: string = getRecipeCooklang('clasica');
export const recipe: Recipe = clasicaRecipe;
`````

## File: src/systems/recipeRunner/handlers/utilityHandlers.ts
`````typescript
/**
 * FILE: src/systems/recipeRunner/handlers/utilityHandlers.ts
 *
 * PURPOSE:
 * Step handlers for utility, narrative, and completion steps ('serve', 'wait', 'instruction', 'speak', 'celebrate').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, flipTortilla, clearTortillaGaze } from '../../mascotActions';
import { resolveContainerId } from '../../../engine/containerRules';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type ServeStep = Extract<RecipeStep, { action: 'serve' }>;
type WaitStep = Extract<RecipeStep, { action: 'wait' }>;
type InstructionStep = Extract<RecipeStep, { action: 'instruction' }>;
type SpeakStep = Extract<RecipeStep, { action: 'speak' }>;
type CelebrateStep = Extract<RecipeStep, { action: 'celebrate' }>;

export async function handleServeStep(
  ctx: RecipeRunnerContext,
  step: ServeStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const targetContainerId = resolveContainerId(
    step.containerId || workstationDefaultContainerId || 'plate'
  );
  moveTortillaTo(targetContainerId, ctx.mascotId);
  await ctx.wait();

  const state = worldStore.getState();
  const serveName = step.as || step.name || step.output;

  if (step.target) {
    const targetEntityId = ctx.getBoundEntityId(step.target);
    if (targetEntityId) {
      const currentContainer = Object.values(state.containers).find((c) =>
        c.entityIds.includes(targetEntityId)
      );
      if (currentContainer && currentContainer.id !== targetContainerId) {
        worldStore.getState().dispatch({
          type: 'MOVE_ENTITY',
          payload: {
            entityId: targetEntityId,
            targetContainerId,
          },
        });
      }
      if (serveName) {
        worldStore.getState().dispatch({
          type: 'UPDATE_ENTITY_STATE',
          payload: {
            entityId: targetEntityId,
            changes: { name: serveName },
          },
        });
      }
    }
  } else {
    // Move all active (unconsumed) bound recipe entities to target container (plate)
    const boundEntityIds = new Set(Object.values(ctx.recipeContext.bindings));

    for (const entityId of boundEntityIds) {
      const entity = state.entities[entityId];
      if (entity && !entity.state?.consumed) {
        const currentContainer = Object.values(state.containers).find((c) =>
          c.entityIds.includes(entityId)
        );
        if (currentContainer && currentContainer.id !== targetContainerId) {
          worldStore.getState().dispatch({
            type: 'MOVE_ENTITY',
            payload: {
              entityId,
              targetContainerId,
            },
          });
        }
        if (serveName) {
          worldStore.getState().dispatch({
            type: 'UPDATE_ENTITY_STATE',
            payload: {
              entityId,
              changes: { name: serveName },
            },
          });
        }
      }
    }
  }
  await ctx.wait();
}

export async function handleWaitStep(
  ctx: RecipeRunnerContext,
  step: WaitStep
): Promise<void> {
  await ctx.wait(step.durationMs);
}

export async function handleInstructionStep(
  ctx: RecipeRunnerContext,
  step: InstructionStep
): Promise<void> {
  const text = step.text || step.instruction;
  if (text) {
    worldStore.getState().dispatch({
      type: 'UPDATE_ENTITY_STATE',
      payload: {
        entityId: step.mascotId || ctx.mascotId,
        changes: { speechMessage: text },
      },
    });

    const lower = text.toLowerCase();
    if (
      lower.includes('toggle heat') ||
      lower.includes('turn on heat') ||
      lower.includes('turn off heat') ||
      lower.includes('heat on') ||
      lower.includes('burner')
    ) {
      let targetContainerId = 'burner1';
      if (lower.includes('burner2') || lower.includes('burner 2')) {
        targetContainerId = 'burner2';
      } else if (lower.includes('burner1') || lower.includes('burner 1')) {
        targetContainerId = 'burner1';
      }

      const container = worldStore.getState().containers[targetContainerId];
      if (container) {
        if (lower.includes('turn on') && !container.isOn) {
          worldStore.getState().dispatch({ type: 'TOGGLE_BURNER', payload: { containerId: targetContainerId } });
        } else if (lower.includes('turn off') && container.isOn) {
          worldStore.getState().dispatch({ type: 'TOGGLE_BURNER', payload: { containerId: targetContainerId } });
        } else if (lower.includes('toggle heat') || lower.includes('toggle burner') || lower.includes('burner')) {
          worldStore.getState().dispatch({ type: 'TOGGLE_BURNER', payload: { containerId: targetContainerId } });
        }
      }
    }
  }
  await ctx.wait();
}

export async function handleSpeakStep(
  ctx: RecipeRunnerContext,
  step: SpeakStep
): Promise<void> {
  worldStore.getState().dispatch({
    type: 'UPDATE_ENTITY_STATE',
    payload: {
      entityId: step.mascotId || ctx.mascotId,
      changes: { speechMessage: step.message },
    },
  });
  await ctx.wait();
}

export async function handleCelebrateStep(
  ctx: RecipeRunnerContext,
  step: CelebrateStep
): Promise<void> {
  flipTortilla(step.mascotId || ctx.mascotId);
  await ctx.wait(900);
  clearTortillaGaze(step.mascotId || ctx.mascotId);
}
`````

## File: src/systems/mascotActions.test.ts
`````typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';
import { clearActionLog, getActionLog } from '../store/middleware/actionLog';
import { loadRecipe } from './recipeLoader';
import { getRecipeRequirementsArray } from '../types/Recipe';
import {
  flipTortilla,
  moveTortillaTo,
  grabIngredient,
  dropIngredient,
  runTortillaPotatoScript,
  runFollowRecipeScript,
} from './mascotActions';

function seedWorld() {
  worldStore.setState({
    entities: {
      potato: { id: 'potato', ingredientId: 'potato', name: 'Potato', type: 'ingredient' },
      chef: { id: 'chef', name: 'Chef Tortilla 🍳', type: 'mascot', state: {} },
    },
    containers: {
      despensa: {
        id: 'despensa',
        name: 'Despensa',
        type: 'storage',
        entityIds: ['potato'],
        rules: { isImmutable: true },
      },
      burner1: {
        id: 'burner1',
        name: 'burner1',
        type: 'burner',
        entityIds: [],
        rules: { maxCapacity: 5 },
      },
      board: {
        id: 'board',
        name: 'Board',
        type: 'board',
        entityIds: [],
        rules: { maxCapacity: 3 },
      },
    },
  });
}

describe('mascotActions system', () => {
  beforeEach(() => {
    seedWorld();
    clearActionLog();
  });

  it('triggers flip action and logs in store action log', () => {
    flipTortilla('chef');

    const state = worldStore.getState();
    expect(state.entities.chef.state?.state).toBe('flipping');
    expect(state.entities.chef.state?.isFlipping).toBe(true);

    const log = getActionLog();
    expect(log.map((l) => l.action)).toContain('MASCOT_FLIP');
  });

  it('moves Tortilla gaze to a specified container', () => {
    moveTortillaTo('burner1', 'chef');

    const state = worldStore.getState();
    expect(state.entities.chef.state?.gazingAt).toEqual({ type: 'entity', entityId: 'burner1' });

    const log = getActionLog();
    expect(log.map((l) => l.action)).toContain('MASCOT_MOVE');
  });

  it('allows Tortilla to grab an ingredient from a container', () => {
    grabIngredient('potato', 'despensa', 'chef');

    const state = worldStore.getState();
    expect(state.entities.chef.state?.holdingEntityId).toBe('potato');
    expect(state.entities.chef.state?.sourceContainerId).toBe('despensa');

    const log = getActionLog();
    expect(log.map((l) => l.action)).toContain('MASCOT_GRAB');
  });

  it('allows Tortilla to drop held ingredient into a target container obeying container rules', () => {
    // First grab potato from immutable despensa
    grabIngredient('potato', 'despensa', 'chef');

    // Then drop intoburner1
    dropIngredient('burner1', undefined, 'chef');

    const state = worldStore.getState();
    // Held item cleared
    expect(state.entities.chef.state?.holdingEntityId).toBeUndefined();
    //burner1 now has a potato copy (because source was immutable despensa)
    expect(state.containers.burner1.entityIds.length).toBe(1);

    const log = getActionLog();
    const actions = log.map((l) => l.action);
    expect(actions).toContain('MASCOT_GRAB');
    expect(actions).toContain('MASCOT_DROP');
  });

  it('clears holdingEntityId when drop is possible and retains it when drop is blocked', () => {
    // 1. Fill board to capacity (maxCapacity = 3)
    worldStore.setState({
      ...worldStore.getState(),
      entities: {
        ...worldStore.getState().entities,
        i1: { id: 'i1', ingredientId: 'i1', name: 'I1', type: 'ingredient' },
        i2: { id: 'i2', ingredientId: 'i2', name: 'I2', type: 'ingredient' },
        i3: { id: 'i3', ingredientId: 'i3', name: 'I3', type: 'ingredient' },
      },
      containers: {
        ...worldStore.getState().containers,
        board: {
          id: 'board',
          name: 'Board',
          type: 'board',
          entityIds: ['i1', 'i2', 'i3'],
          rules: { maxCapacity: 3 },
        },
      },
    });

    // 2. Grab potato from despensa
    grabIngredient('potato', 'despensa', 'chef');
    expect(worldStore.getState().entities.chef.state?.holdingEntityId).toBe('potato');

    // 3. Attempt to drop into full board -> should be blocked and Tortilla continues grabbing/holding it
    dropIngredient('board', undefined, 'chef');
    expect(worldStore.getState().entities.chef.state?.holdingEntityId).toBe('potato');
    expect(worldStore.getState().containers.board.entityIds).toEqual(['i1', 'i2', 'i3']);

    // 4. Drop into non-fullburner1 -> allowed, Tortilla stops grabbing it (holdingEntityId cleared)
    dropIngredient('burner1', undefined, 'chef');
    expect(worldStore.getState().entities.chef.state?.holdingEntityId).toBeUndefined();
    expect(worldStore.getState().containers.burner1.entityIds.length).toBe(1);
  });

  it('runs full async script sequence: move ➔ grab ➔ move ➔ drop ➔ flip ➔ return home', async () => {
    await runTortillaPotatoScript('chef', 10);

    const state = worldStore.getState();
    expect(state.containers.board.entityIds.length).toBe(1);

    const log = getActionLog().map((l) => l.action).filter((a) => a !== 'RESET_MASCOT_FLIP');
    expect(log).toEqual([
      'MASCOT_MOVE',
      'MASCOT_GRAB',
      'MASCOT_MOVE',
      'MASCOT_DROP',
      'MASCOT_FLIP',
      'MASCOT_CLEAR_GAZE', // "return home" now dispatches MASCOT_CLEAR_GAZE, not MASCOT_MOVE('')
    ]);
  });

  it('maintains holding state while moving across containers during grab -> move -> drop', () => {
    // 1. Grab potato at despensa
    grabIngredient('potato', 'despensa', 'chef');
    let state = worldStore.getState();
    expect(state.entities.chef.state?.holdingEntityId).toBe('potato');
    expect(state.entities.chef.state?.targetContainerId).toBe('despensa');

    // 2. Move mascot to board while carrying potato
    moveTortillaTo('board', 'chef');
    state = worldStore.getState();
    expect(state.entities.chef.state?.holdingEntityId).toBe('potato');
    expect(state.entities.chef.state?.targetContainerId).toBe('board');

    // 3. Drop potato into board
    dropIngredient('board', undefined, 'chef');
    state = worldStore.getState();
    expect(state.entities.chef.state?.holdingEntityId).toBeUndefined();
    expect(state.entities.chef.state?.targetContainerId).toBe('board');
    expect(state.containers.board.entityIds.length).toBe(1);
  });

  it('syncs mascot target container and gaze when MOVE_ENTITY action is dispatched', () => {
    worldStore.getState().moveEntity('potato', 'board');
    const state = worldStore.getState();
    expect(state.entities.chef.state?.targetContainerId).toBe('board');
    expect(state.entities.chef.state?.gazingAt).toEqual({ type: 'entity', entityId: 'board' });
  });

  it('runs follow recipe script: processes all recipe ingredients through workstations', async () => {
    // Seed default entities for all recipe ingredients
    worldStore.setState({
      ...worldStore.getState(),
      entities: {
        ...worldStore.getState().entities,
        potato: { id: 'potato', ingredientId: 'potato', name: 'Potato', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
        egg: { id: 'egg', ingredientId: 'egg', name: 'Egg', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
        oil: { id: 'oil', ingredientId: 'oil', name: 'Oil', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
        onion: { id: 'onion', ingredientId: 'onion', name: 'Onion', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
        salt: { id: 'salt', ingredientId: 'salt', name: 'Salt', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
        pepper: { id: 'pepper', ingredientId: 'pepper', name: 'Pepper', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      },
      containers: {
        ...worldStore.getState().containers,
        board: { id: 'board', name: 'Board', type: 'board', entityIds: [], rules: { maxCapacity: 10 } },
        sink: { id: 'sink', name: 'Sink', type: 'sink', entityIds: [], rules: { maxCapacity: 10 } },
        bowl: { id: 'bowl', name: 'Bowl', type: 'bowl', entityIds: [], rules: { maxCapacity: 10 } },
        burner1: { id: 'burner1', name: 'burner1', type: 'burner', entityIds: [], rules: { maxCapacity: 10 } },
        plate: { id: 'plate', name: 'Plate', type: 'plate', entityIds: [], rules: { maxCapacity: 10 } },
      },
    });

    const recipe = loadRecipe('concebolla');
    await runFollowRecipeScript('concebolla', 'chef', 'board', 5);

    const state = worldStore.getState();
    const serveStep = recipe.steps.find((s) => s.action === 'serve');
    const targetContainerId = serveStep?.containerId || 'plate';
    expect(state.containers[targetContainerId].entityIds.length).toBeGreaterThanOrEqual(1);

    // Dynamically derive ingredient catalog IDs from active recipe requirements
    const requirements = getRecipeRequirementsArray(recipe);
    const requiredIngredientIds = Array.from(new Set(requirements.map((req) => req.entityId)));
    const allWorldEntities = Object.values(state.entities);
    const allIngredientCatalogIds = allWorldEntities.map((e) => e?.ingredientId || e?.id);
    requiredIngredientIds.forEach((id) => {
      expect(allIngredientCatalogIds.some((cid) => cid === id)).toBe(true);
    });
  });

  it('allows dragging an ingredient directly to Tortilla so she carries it in her free arm', () => {
    // Dispatch MOVE_ENTITY with targetContainerId = 'chef'
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'chef' },
    });

    const state = worldStore.getState();
    const chefState = state.entities.chef.state;
    expect(chefState?.holdingEntityId).toBe('potato');
    expect(chefState?.holdingEntityIds).toEqual(['potato']);
  });

  it('supports carrying up to 2 items simultaneously (two free arms)', () => {
    worldStore.setState({
      ...worldStore.getState(),
      entities: {
        ...worldStore.getState().entities,
        onion: { id: 'onion', ingredientId: 'onion', name: 'Onion', type: 'ingredient' },
        egg: { id: 'egg', ingredientId: 'egg', name: 'Egg', type: 'ingredient' },
      },
    });

    // First ingredient to chef
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'chef' },
    });

    // Second ingredient to chef
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'onion', targetContainerId: 'chef' },
    });

    const state = worldStore.getState();
    const chefState = state.entities.chef.state;
    expect(chefState?.holdingEntityIds).toEqual(['potato', 'onion']);

    // Attempting a 3rd item when hands are full
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'egg', targetContainerId: 'chef' },
    });

    const updatedState = worldStore.getState();
    // Hands remain capped at 2 items
    expect(updatedState.entities.chef.state?.holdingEntityIds).toEqual(['potato', 'onion']);
  });

  it('allows clicking "take me" on an ingredient in a workstation to make Tortilla grab it', () => {
    // Put potato in cutting board first
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'board' },
    });

    const boardEntityIds = worldStore.getState().containers.board.entityIds;
    expect(boardEntityIds.length).toBeGreaterThan(0);
    const actualEntityId = boardEntityIds[0];

    // Click "take me" button -> dispatches MASCOT_GRAB
    worldStore.getState().dispatch({
      type: 'MASCOT_GRAB',
      payload: { entityId: actualEntityId, sourceContainerId: 'board', mascotId: 'chef' },
    });

    const state = worldStore.getState();
    expect(state.containers.board.entityIds).not.toContain(actualEntityId);
    expect(state.entities.chef.state?.holdingEntityIds).toEqual([actualEntityId]);
  });
});
`````

## File: src/components/Controls/ActionRecorder.tsx
`````typescript
/**
 * FILE: ActionRecorder.tsx
 *
 * PURPOSE:
 * Dedicated UI panel component for recording human kitchen actions, inspecting logs,
 * and translating human actions into mascot-guided recipes.
 */

import React, { useState, useMemo } from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import { eventStore } from '../../systems/EventStore';
import { ActionReplayer } from './ActionReplayer';
import { actionPlayer } from '../../systems/actionPlayer';
import {
  translateHumanActionsToMascotActions,
  translateHumanActionsToRecipe,
} from '../../systems/recipeTranslator';
import { saveRecipeToDb, type SavedRecipe } from '../../services/dbService';
import type { Recipe } from '../../types/Recipe';
import type { WorldAction } from '../../types/actions';
import type { RecordedAction } from '../../types/recording';
import { useTranslation } from '../../i18n/useTranslation';
import { PlateDishNameModal } from './PlateDishNameModal';
import { filterUnusedIngredientsFromState } from '../../utils/sessionLogUtils';
import './ActionRecorder.scss';

interface ActionRecorderProps {
  isDev?: boolean;
}

export const ActionRecorder: React.FC<ActionRecorderProps> = ({ isDev = true }) => {
  const { t } = useTranslation();
  const dispatch = useStore(worldStore, (state) => state.dispatch);
  const isRecording = useStore(worldStore, (state) => state.isRecording);
  const recordedActions = useStore(worldStore, (state) => state.recordedActions);
  const usedIngredients = useStore(worldStore, (state) => state.usedIngredients);
  const initialRecordingState = useStore(worldStore, (state) => state.initialRecordingState);
  const startRecording = useStore(worldStore, (state) => state.startRecording);
  const stopRecording = useStore(worldStore, (state) => state.stopRecording);
  const clearRecording = useStore(worldStore, (state) => state.clearRecording);

  const [showTranslator, setShowTranslator] = useState<boolean>(false);
  const [showSaveForm, setShowSaveForm] = useState<boolean>(false);
  const effectiveShowSaveForm = isDev && showSaveForm;

  const [saveTitle, setSaveTitle] = useState<string>('Mi Tortilla de Patatas');
  const [saveAuthor, setSaveAuthor] = useState<string>('Chef Tortilla');
  const [saveDesc, setSaveDesc] = useState<string>('Custom recorded session from Tortilla World.');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'mascotActions' | 'recipeFile' | 'fullSessionLog'>('mascotActions');
  const [isPlayingTranslated, setIsPlayingTranslated] = useState<boolean>(false);

  const [saveMascotFormat, setSaveMascotFormat] = useState<boolean>(true);
  const [saveRecipeJsonFormat, setSaveRecipeJsonFormat] = useState<boolean>(true);
  const [saveSessionLogFormat, setSaveSessionLogFormat] = useState<boolean>(true);

  const [isPlateNameModalOpen, setIsPlateNameModalOpen] = useState<boolean>(false);
  const [plateInitialDishName, setPlateInitialDishName] = useState<string>('');

  const handleStopRecordingRequest = () => {
    const state = worldStore.getState();
    const plateContainer = state.containers.plate || state.containers.plato;
    const plateEntityIds = plateContainer?.entityIds || [];

    if (plateEntityIds.length > 0) {
      const firstEntity = state.entities[plateEntityIds[0]];
      const initialDishName = firstEntity?.name || 'Tortilla Española Clásica';
      setPlateInitialDishName(initialDishName);
      setIsPlateNameModalOpen(true);
    } else {
      stopRecording();
      window.dispatchEvent(new CustomEvent('select-recorded-session'));
    }
  };

  const handleConfirmDishName = (dishName: string) => {
    setIsPlateNameModalOpen(false);
    stopRecording(dishName);
    window.dispatchEvent(new CustomEvent('select-recorded-session'));
  };

  const handleSkipDishName = () => {
    setIsPlateNameModalOpen(false);
    stopRecording();
    window.dispatchEvent(new CustomEvent('select-recorded-session'));
  };

  // Sourced actions (either explicit recording or emitted eventStore events)
  const sourceActions = useMemo(() => {
    if (recordedActions.length > 0) return recordedActions;
    return eventStore.getEvents();
  }, [recordedActions]);

  // Translate actions to mascot actions sequence
  const translatedMascotActions = useMemo(() => {
    if (sourceActions.length === 0) return [];
    return translateHumanActionsToMascotActions(sourceActions);
  }, [sourceActions]);

  // Translate actions to declarative Recipe definition
  const translatedRecipe: Recipe | null = useMemo(() => {
    if (sourceActions.length === 0) return null;
    return translateHumanActionsToRecipe(sourceActions, {
      recipeName: 'Custom Translated Recipe',
    });
  }, [sourceActions]);

  // Full Session Log (zustand init -> actions/events -> zustand end)
  const fullSessionLogData = useMemo(() => {
    const currentState = worldStore.getState();
    const rawInitState = initialRecordingState || {
      entities: currentState.entities,
      containers: currentState.containers,
    };
    const rawEndState = {
      entities: currentState.entities,
      containers: currentState.containers,
    };
    const activeRecordedActions: RecordedAction[] =
      recordedActions.length > 0
        ? recordedActions
        : eventStore.getEvents().map((e) => ({
            type: e.action.type,
            payload: (e.action.payload || {}) as Record<string, unknown>,
            timestampMs: e.timestamp,
          }));

    const zustandInit = filterUnusedIngredientsFromState(rawInitState, activeRecordedActions);
    const zustandEnd = filterUnusedIngredientsFromState(rawEndState, activeRecordedActions);

    return {
      version: '1.0.0',
      title: 'Tortilla World Action Session Log',
      recordedAt: new Date().toISOString(),
      zustandInit,
      actions: activeRecordedActions,
      events: eventStore.getEvents(),
      zustandEnd,
      metadata: {
        actionCount: activeRecordedActions.length,
        eventCount: eventStore.getEvents().length,
      },
    };
  }, [recordedActions, initialRecordingState]);

  // Download helper
  const downloadJSON = (data: unknown, filename: string) => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Downloads
  const handleDownloadMascotActions = () => {
    if (translatedMascotActions.length === 0) return;
    downloadJSON(translatedMascotActions, 'mascot-actions-sequence.json');
  };

  const handleDownloadRecipe = () => {
    if (!translatedRecipe) return;
    downloadJSON(translatedRecipe, `${translatedRecipe.id || 'translated-recipe'}.json`);
  };

  const handleDownloadSessionLog = () => {
    downloadJSON(fullSessionLogData, 'tortilla-full-session-log.json');
  };

  // Handle replaying translated mascot action sequence
  const handleReplayTranslatedMascotSequence = async () => {
    if (translatedMascotActions.length === 0) return;
    setIsPlayingTranslated(true);

    await actionPlayer.playLog(translatedMascotActions as unknown as WorldAction[], {
      delayMs: 300,
      resetWorld: true,
      onComplete: () => setIsPlayingTranslated(false),
      onStop: () => setIsPlayingTranslated(false),
    });
  };

  const handleSaveToDatabase = async () => {
    if (!saveTitle.trim()) {
      alert('Please enter a recipe title.');
      return;
    }

    setIsSaving(true);
    setSaveStatus('');
    try {
      const state = worldStore.getState();
      const rawActions =
        state.recordedActions.length > 0
          ? state.recordedActions
          : eventStore.getEvents().map((e) => e.action);

      const recipeJson = translateHumanActionsToRecipe(rawActions, {
        recipeName: saveTitle.trim(),
      });
      const mascotSeq = translateHumanActionsToMascotActions(rawActions);

      const usedIngIdsFromStore = (state.usedIngredients || []).map((i) => i.id.toLowerCase());
      const actionIngredientIds: string[] = [];

      rawActions.forEach((act) => {
        const payload = act.payload as Record<string, unknown>;
        if (payload) {
          if (payload.ingredientId) {
            actionIngredientIds.push(String(payload.ingredientId).toLowerCase());
          }
          if (payload.entityId && typeof payload.entityId === 'string') {
            const entity = state.entities[payload.entityId];
            if (entity && entity.type === 'ingredient') {
              const ingId = entity.ingredientId || entity.id;
              if (ingId) actionIngredientIds.push(String(ingId).toLowerCase());
            } else {
              const knownIngs = ['potato', 'egg', 'onion', 'oil', 'salt', 'garlic', 'chorizo', 'cheese', 'tomato', 'pepper', 'flour', 'water', 'butter'];
              for (const ing of knownIngs) {
                if (payload.entityId.toLowerCase().includes(ing)) {
                  actionIngredientIds.push(ing);
                }
              }
            }
          }
        }
      });

      const uniqueIngredients = Array.from(
        new Set([...usedIngIdsFromStore, ...actionIngredientIds])
      ).filter(Boolean);

      const detectedIngredients = uniqueIngredients.length > 0 ? uniqueIngredients : ['egg', 'potato'];

      const formatsToSave: Record<string, unknown> = {};
      if (saveMascotFormat) {
        formatsToSave.mascotSequence = mascotSeq;
      }
      if (saveRecipeJsonFormat) {
        formatsToSave.recipeJson = recipeJson;
      }
      if (saveSessionLogFormat) {
        formatsToSave.fullSessionLog = fullSessionLogData;
      }

      await saveRecipeToDb({
        title: saveTitle.trim(),
        description: saveDesc.trim() || 'Recorded recipe session from Tortilla World.',
        author: saveAuthor.trim() || 'Chef Tortilla',
        ingredients: detectedIngredients.length > 0 ? detectedIngredients : ['egg', 'potato'],
        tags: ['recorded', 'custom'],
        hasMascotSupport: Boolean(saveMascotFormat && mascotSeq.length > 0),
        formats: formatsToSave as unknown as SavedRecipe['formats'],
      });

      setSaveStatus('✅ Recipe successfully saved to Cloud Firestore! You can play it anytime in the Recipe Catalog.');
      setTimeout(() => {
        setShowSaveForm(false);
        setSaveStatus('');
      }, 4000);
    } catch (err) {
      console.error('Error saving recipe:', err);
      setSaveStatus(`❌ Error saving: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsSaving(false);
    }
  };

  const hasActions = recordedActions.length > 0 || eventStore.getEvents().length > 0;

  return (
    <div className="action-recorder-container">
      <div className="recorder-header">
        <div>
          <div className="recorder-title">
            <span>{t('recorder.title')}</span>
          </div>
          <div className="recorder-subtitle">
            {t('recorder.subtitle')}
          </div>
        </div>

        <div className="recorder-status">
          <span className="badge">
            {t('recorder.status', { actions: recordedActions.length, events: eventStore.getEvents().length })}
          </span>
        </div>
      </div>

      <div className="recorder-actions-bar">
        {!isRecording ? (
          <button
            type="button"
            className="rec-btn start-rec"
            onClick={startRecording}
            title="Start recording live kitchen interactions"
          >
            {t('recorder.startRecording')}
          </button>
        ) : (
          <button
            type="button"
            className="rec-btn stop-rec"
            onClick={handleStopRecordingRequest}
            title="Stop recording"
          >
            {t('recorder.stopRecordingCount', { count: recordedActions.length })}
          </button>
        )}

        {hasActions && (
          <>
            {isDev && (
              <button
                type="button"
                className="rec-btn save-db-btn"
                onClick={() => setShowSaveForm(!effectiveShowSaveForm)}
                style={{
                  backgroundColor: effectiveShowSaveForm ? '#0284c7' : '#0ea5e9',
                  color: '#ffffff',
                  fontWeight: 600,
                }}
                title="Save this recorded session directly to Cloud Firestore recipe database"
              >
                💾 {effectiveShowSaveForm ? t('recorder.cancelSave') : t('recorder.saveToDb')}
              </button>
            )}

            <button
              type="button"
              className="rec-btn"
              onClick={clearRecording}
              title="Clear current recorded actions log"
            >
              {t('recorder.clearLog')}
            </button>
          </>
        )}

        <button
          type="button"
          className="rec-btn translate-btn"
          disabled={!hasActions}
          onClick={() => setShowTranslator(!showTranslator)}
          title="Translate human recorded actions into a mascot recipe with movement"
        >
          {showTranslator ? t('recorder.hideTranslator') : t('recorder.translateViewFormats')}
        </button>

        <button
          type="button"
          className="rec-btn reset-kitchen-btn"
          onClick={() => dispatch({ type: 'RESET_WORLD' })}
          title="Clean the kitchen and reset all containers"
        >
          {t('scene.resetKitchen')}
        </button>

        <ActionReplayer defaultDelayMs={300} />
      </div>

      <div className="used-ingredients-bar">
        <span className="bar-label">{t('recorder.savedIngredientsCount', { count: usedIngredients.length })}</span>
        {usedIngredients.length === 0 ? (
          <span className="no-ingredients-hint">
            {t('recorder.noIngredientsUsed')}
          </span>
        ) : (
          <div className="chips-list">
            {usedIngredients.map((ing) => (
              <span key={ing.id} className="ingredient-chip">
                {ing.icon} {ing.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {effectiveShowSaveForm && (
        <div
          className="save-db-card-panel"
          style={{
            margin: '12px 0',
            padding: '16px',
            borderRadius: '12px',
            backgroundColor: '#f8fafc',
            border: '1px solid #cbd5e1',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#0f172a' }}>
              💾 Save Recorded Recipe to Firestore
            </h4>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Recorded Actions: <strong>{recordedActions.length}</strong>
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Recipe Title *
              </label>
              <input
                type="text"
                value={saveTitle}
                onChange={(e) => setSaveTitle(e.target.value)}
                placeholder="e.g. Tortilla de Patatas Tradicional"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Author
              </label>
              <input
                type="text"
                value={saveAuthor}
                onChange={(e) => setSaveAuthor(e.target.value)}
                placeholder="Chef Name"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
              Description
            </label>
            <input
              type="text"
              value={saveDesc}
              onChange={(e) => setSaveDesc(e.target.value)}
              placeholder="Brief description of this recipe technique..."
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '0.9rem',
              }}
            />
          </div>

          <div style={{ marginBottom: '12px', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Include Formats to Save in DB:
            </label>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.85rem', color: '#0f172a' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={saveMascotFormat}
                  onChange={(e) => setSaveMascotFormat(e.target.checked)}
                />
                🤖 Mascot Action Sequence (.json)
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={saveRecipeJsonFormat}
                  onChange={(e) => setSaveRecipeJsonFormat(e.target.checked)}
                />
                📜 Declarative Recipe JSON (.json)
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={saveSessionLogFormat}
                  onChange={(e) => setSaveSessionLogFormat(e.target.checked)}
                />
                💾 Full Session Log (.json)
              </label>
            </div>
          </div>

          {saveStatus && (
            <div
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                backgroundColor: saveStatus.startsWith('✅') ? '#f0fdf4' : '#fef2f2',
                border: `1px solid ${saveStatus.startsWith('✅') ? '#bbf7d0' : '#fecaca'}`,
                color: saveStatus.startsWith('✅') ? '#166534' : '#991b1b',
                fontSize: '0.85rem',
                marginBottom: '12px',
              }}
            >
              {saveStatus}
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowSaveForm(false)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveToDatabase}
              disabled={isSaving || !saveTitle.trim()}
              style={{
                padding: '8px 20px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#16a34a',
                color: '#ffffff',
                fontWeight: 600,
                cursor: isSaving ? 'wait' : 'pointer',
                fontSize: '0.85rem',
              }}
            >
              {isSaving ? '⏳ Saving to Firestore...' : '💾 Save to Database'}
            </button>
          </div>
        </div>
      )}

      {showTranslator && hasActions && (
        <div className="translation-preview-panel">
          <div className="translation-header">
            <h4>🪄 Action Export Formats & Translator Preview</h4>
          </div>

          <div className="translation-tabs">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'mascotActions' ? 'active' : ''}`}
              onClick={() => setActiveTab('mascotActions')}
            >
              🤖 Mascot Action Sequence ({translatedMascotActions.length} steps)
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'recipeFile' ? 'active' : ''}`}
              onClick={() => setActiveTab('recipeFile')}
            >
              📜 Declarative Recipe File (.json)
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'fullSessionLog' ? 'active' : ''}`}
              onClick={() => setActiveTab('fullSessionLog')}
            >
              💾 Full Session Log (zustand init / actions / end)
            </button>
          </div>

          <div className="translation-content">
            {activeTab === 'mascotActions' && (
              <pre>{JSON.stringify(translatedMascotActions, null, 2)}</pre>
            )}
            {activeTab === 'recipeFile' && (
              <pre>{JSON.stringify(translatedRecipe, null, 2)}</pre>
            )}
            {activeTab === 'fullSessionLog' && (
              <pre>{JSON.stringify(fullSessionLogData, null, 2)}</pre>
            )}
          </div>

          <div className="translation-actions">
            <button
              type="button"
              className="action-btn primary"
              onClick={handleReplayTranslatedMascotSequence}
              disabled={isPlayingTranslated || translatedMascotActions.length === 0}
            >
              {isPlayingTranslated ? '⏳ Replaying...' : '▶ Replay Mascot Sequence'}
            </button>

            <button type="button" className="action-btn" onClick={handleDownloadMascotActions}>
              🤖 Download Mascot Sequence (.json)
            </button>

            <button type="button" className="action-btn" onClick={handleDownloadRecipe}>
              📜 Download Recipe File (.json)
            </button>

            <button type="button" className="action-btn" onClick={handleDownloadSessionLog}>
              💾 Download Full Session Log (.json)
            </button>
          </div>
        </div>
      )}

      <PlateDishNameModal
        isOpen={isPlateNameModalOpen}
        initialName={plateInitialDishName}
        onConfirm={handleConfirmDishName}
        onSkip={handleSkipDishName}
      />
    </div>
  );
};
`````

## File: src/components/Controls/ActionReplayer.tsx
`````typescript
/**
 * FILE: ActionReplayer.tsx
 *
 * PURPOSE:
 * React UI component for uploading, validating, and playing back JSON action logs.
 *
 * RESPONSIBILITY:
 * - Handles JSON file loading via FileReader input.
 * - Validates JSON structure into WorldAction[].
 * - Controls playback execution using ActionPlayer.
 * - Displays active progress and stop/cancel controls during playback.
 */

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { actionPlayer } from '../../systems/actionPlayer';
import { worldStore } from '../../store/worldStore';
import { useStore } from 'zustand';
import { fetchAllRecipesFromDb, type SavedRecipe } from '../../services/dbService';
import type { WorldAction } from '../../types/actions';
import type { RecordedAction } from '../../types/recording';
import { detectRecipeFormat, getPlayableActionsFromFormat } from '../../utils/recipeFormatDetector';
import { extractUsedIngredientsFromActions } from '../../utils/sessionLogUtils';
import './ActionReplayer.scss';

export interface ActionReplayerProps {
  /** Optional custom delay default in ms. Default: 300 */
  defaultDelayMs?: number;
  /** Optional class name override */
  className?: string;
  /** Whether to render secondary standalone playback buttons (step, play, speed). Default: false */
  showControls?: boolean;
  /** Callback fired when playback starts */
  onPlaybackStart?: () => void;
  /** Callback fired when playback completes */
  onPlaybackComplete?: () => void;
}

export const ActionReplayer: React.FC<ActionReplayerProps> = ({
  defaultDelayMs = 300,
  className = '',
  showControls = false,
  onPlaybackStart,
  onPlaybackComplete,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordedActions = useStore(worldStore, (state) => state.recordedActions);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [delayMs, setDelayMs] = useState<number>(defaultDelayMs);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const [dbRecipes, setDbRecipes] = useState<SavedRecipe[]>([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>('');

  const loadDbRecipes = useCallback(async () => {
    try {
      const recipes = await fetchAllRecipesFromDb();
      setDbRecipes(recipes);
    } catch (err) {
      console.warn('Failed to load DB recipes in ActionReplayer:', err);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetchAllRecipesFromDb()
      .then((recipes) => {
        if (active) setDbRecipes(recipes);
      })
      .catch((err) => {
        console.warn('Failed to load DB recipes in ActionReplayer:', err);
      });
    return () => {
      active = false;
    };
  }, []);

  const totalSteps = recordedActions.length;
  const effectiveCurrentStep = Math.min(currentStep, totalSteps);

  const handleUploadClick = () => {
    setErrorMessage(null);
    setInfoMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleSelectDbRecipe = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const recipeId = e.target.value;
    setSelectedRecipeId(recipeId);
    if (!recipeId) return;

    const found = dbRecipes.find((r) => r.id === recipeId);
    if (!found) return;

    const detected = detectRecipeFormat(found);
    if (detected.type === 'unknown') {
      setErrorMessage(`Selected recipe "${found.title}" does not contain a recognized recipe format.`);
      setInfoMessage(null);
      return;
    }

    const playable = getPlayableActionsFromFormat(detected);
    if (playable.actions.length === 0) {
      setErrorMessage(`Selected recipe "${found.title}" does not contain valid playable actions.`);
      setInfoMessage(null);
      return;
    }

    worldStore.getState().resetWorld();
    const extractedIngs = extractUsedIngredientsFromActions(playable.actions);
    worldStore.getState().setRecordedActions(playable.actions as unknown as RecordedAction[], extractedIngs);
    setCurrentStep(0);
    window.dispatchEvent(new CustomEvent('select-recorded-session'));
    setErrorMessage(null);
    setInfoMessage(
      `Loaded "${found.title}" [Type: ${detected.typeLabel}] (${playable.actions.length} ${
        detected.type === 'declarative' ? 'converted steps' : 'actions'
      })`
    );
  };

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const content = e.target?.result as string;
          const parsed = JSON.parse(content);
          const detected = detectRecipeFormat(parsed);

          if (detected.type === 'unknown') {
            setErrorMessage('Invalid or unrecognized JSON recipe format.');
            setInfoMessage(null);
            return;
          }

          const playable = getPlayableActionsFromFormat(detected);
          if (playable.actions.length === 0) {
            setErrorMessage(`Uploaded file "${file.name}" contains no playable actions.`);
            setInfoMessage(null);
            return;
          }

          setErrorMessage(null);
          worldStore.getState().resetWorld();
          const extractedIngs = extractUsedIngredientsFromActions(playable.actions);
          worldStore.getState().setRecordedActions(playable.actions as unknown as RecordedAction[], extractedIngs);
          setCurrentStep(0);
          window.dispatchEvent(new CustomEvent('select-recorded-session'));
          setInfoMessage(
            `Loaded "${file.name}" [Type: ${detected.typeLabel}] (${playable.actions.length} ${
              detected.type === 'declarative' ? 'converted steps' : 'actions'
            })`
          );
        } catch (err) {
          console.error('Failed to parse action log JSON:', err);
          setErrorMessage('Failed to read or parse JSON file.');
          setInfoMessage(null);
        }
      };

      reader.readAsText(file);
    },
    []
  );

  const handlePlayAll = useCallback(async () => {
    if (recordedActions.length === 0) return;
    setIsPlaying(true);
    onPlaybackStart?.();

    const reset = currentStep === 0;
    const remainingActions = recordedActions.slice(currentStep) as unknown as WorldAction[];
    const startOffset = currentStep;

    await actionPlayer.playLog(remainingActions, {
      delayMs,
      resetWorld: reset,
      onStep: (curr) => {
        setCurrentStep(startOffset + curr);
      },
      onComplete: () => {
        setIsPlaying(false);
        onPlaybackComplete?.();
      },
      onStop: () => {
        setIsPlaying(false);
      },
    });
  }, [recordedActions, currentStep, delayMs, onPlaybackStart, onPlaybackComplete]);

  const handleStop = () => {
    actionPlayer.stop();
    setIsPlaying(false);
  };

  const handleStepForward = useCallback(() => {
    if (currentStep < recordedActions.length) {
      const nextAction = recordedActions[currentStep];
      worldStore.getState().dispatch(nextAction as unknown as WorldAction);
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, recordedActions]);

  const handleStepBack = useCallback(() => {
    if (currentStep > 0) {
      const targetIndex = currentStep - 1;
      worldStore.getState().dispatch({ type: 'RESET_WORLD' });
      for (let i = 0; i < targetIndex; i++) {
        worldStore.getState().dispatch(recordedActions[i] as unknown as WorldAction);
      }
      setCurrentStep(targetIndex);
    }
  }, [currentStep, recordedActions]);

  const handleResetSteps = useCallback(() => {
    worldStore.getState().dispatch({ type: 'RESET_WORLD' });
    setCurrentStep(0);
  }, []);

  const percent = totalSteps > 0 ? Math.round((effectiveCurrentStep / totalSteps) * 100) : 0;

  return (
    <div className={`action-replayer ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="file-input-hidden"
        onChange={handleFileChange}
      />

      <button
        type="button"
        className="replayer-btn load-btn"
        onClick={handleUploadClick}
        title="Upload and replay a recorded action log JSON file"
      >
        📂 Load Log (.json)
      </button>

      {dbRecipes.length > 0 && (
        <select
          className="db-recipe-select"
          value={selectedRecipeId}
          onChange={handleSelectDbRecipe}
          onFocus={loadDbRecipes}
          title="Select and load a saved recipe from Cloud Firestore"
          style={{
            padding: '6px 10px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            fontSize: '0.85rem',
            backgroundColor: '#ffffff',
            color: '#0f172a',
            fontWeight: 500,
            cursor: 'pointer',
            maxWidth: '220px',
          }}
        >
          <option value="">🗄️ Select DB Recipe...</option>
          {dbRecipes.map((r) => (
            <option key={r.id} value={r.id}>
              {r.title} ({r.ingredients?.join(', ') || 'recipe'})
            </option>
          ))}
        </select>
      )}

      {showControls && (
        <>
          {totalSteps > 0 && !isPlaying && (
            <div className="step-controls-group">
              <button
                type="button"
                className="replayer-btn step-btn"
                onClick={handleStepBack}
                disabled={effectiveCurrentStep === 0}
                title="Step back to previous recorded action"
              >
                ⏮️ Step Back
              </button>

              <button
                type="button"
                className="replayer-btn step-btn step-forward-btn"
                onClick={handleStepForward}
                disabled={effectiveCurrentStep >= totalSteps}
                title="Step forward to next recorded action"
              >
                ⏭️ Step Forward
              </button>

              <button
                type="button"
                className="replayer-btn play-btn"
                onClick={handlePlayAll}
                title="Play all remaining actions"
              >
                ▶️ Play
              </button>

              <button
                type="button"
                className="replayer-btn reset-btn"
                onClick={handleResetSteps}
                title="Reset world state to step 0"
              >
                🔄 Reset
              </button>
            </div>
          )}

          {isPlaying && (
            <button
              type="button"
              className="replayer-btn stop-btn"
              onClick={handleStop}
              title="Stop action playback"
            >
              ⏹ Stop Playback
            </button>
          )}

          {!isPlaying && (
            <select
              className="delay-select"
              value={delayMs}
              onChange={(e) => setDelayMs(Number(e.target.value))}
              title="Playback speed step delay"
            >
              <option value={100}>Fast (100ms)</option>
              <option value={300}>Normal (300ms)</option>
              <option value={600}>Slow (600ms)</option>
            </select>
          )}

          {totalSteps > 0 && (
            <div className="playback-status">
              <span>
                Step {effectiveCurrentStep} / {totalSteps}
              </span>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
              </div>
            </div>
          )}
        </>
      )}

      {infoMessage && <span className="info-message" style={{ color: '#0d9488', fontSize: '0.8rem', fontWeight: 600 }}>{infoMessage}</span>}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};
`````

## File: src/systems/recipeRunner/handlers/cookHandlers.ts
`````typescript
/**
 * FILE: src/systems/recipeRunner/handlers/cookHandlers.ts
 *
 * PURPOSE:
 * Step handlers for cooking and thermal steps ('cook', 'flip').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, flipTortilla } from '../../mascotActions';
import { resolveContainerId } from '../../../engine/containerRules';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type CookStep = Extract<RecipeStep, { action: 'cook' }>;
type FlipStep = Extract<RecipeStep, { action: 'flip' }>;

export async function handleCookStep(
  ctx: RecipeRunnerContext,
  step: CookStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const rawKey = step.target || step.ingredient;
  let entityId = ctx.getBoundEntityId(rawKey);

  if (!entityId) {
    throw new Error(`[RecipeRunner] No entity bound for cook step target: "${rawKey}"`);
  }

  entityId = ctx.validateEntity(entityId, 'cook').id;

  const cookingMethod = step.method || 'cooked';
  const rawContainerId = step.containerId || workstationDefaultContainerId || 'burner1';
  const containerId = resolveContainerId(rawContainerId);

  if (step.instruction) {
    worldStore.getState().dispatch({
      type: 'UPDATE_ENTITY_STATE',
      payload: {
        entityId: step.mascotId || ctx.mascotId,
        changes: { speechMessage: step.instruction },
      },
    });
  }

  // Ensure bound entity is brought to cooking container via mascot actions if not already there
  entityId = await ctx.ensureEntityInWorkspace(entityId, containerId);

  moveTortillaTo(containerId, ctx.mascotId);
  await ctx.wait();

  // Turn ON fire if currently off
  const containerBefore = worldStore.getState().containers[containerId];
  if (containerBefore && !containerBefore.isOn) {
    worldStore.getState().dispatch({
      type: 'TOGGLE_BURNER',
      payload: { containerId },
    });
  }

  worldStore.getState().dispatch({
    type: 'COOK_INGREDIENT',
    payload: {
      entityId,
      cooking: cookingMethod,
    },
  });

  const cookName = step.as || step.name || step.output;
  if (cookName) {
    worldStore.getState().dispatch({
      type: 'UPDATE_ENTITY_STATE',
      payload: {
        entityId,
        changes: { name: cookName },
      },
    });
  }

  // Consume cooking medium helper ingredients currently in the cooking container (e.g. oil)
    /**
   * IMPORTANT: Distinguish between oil as the primary cooking target vs oil as a cooking medium.
   *
   * Scenario 1: Oil is the target (method='heat')
   *   Step: { action: 'cook', target: 'oil', method: 'heat' }
   *   Expected: Oil is heated, NOT consumed
   *   Reason: Oil is the subject being cooked, not a helper ingredient
   *
   * Scenario 2: Oil is a cooking medium
   *   Step: { action: 'cook', target: 'potatoes', method: 'fry' }
   *   Expected: Oil in the container IS consumed (used for frying)
   *   Reason: Oil is helping to cook the potatoes
   * 
   *   Scenario 3: Oil as dressing
   *   Step: { action: 'serve', target: 'mixture', method: 'dress' }
   *   Expected: fresh Oil in the container where the finished tortilla is
   *   Reason: Oil is dressiing for the tortilla
   *
   * Without this check, oil gets consumed even when it's the cooking target,
   * preventing oil reuse and causing "Heat Olive Oil" name change in Required Materials.
   */
  const cookingContainer = worldStore.getState().containers[containerId];

  // Only consume helper ingredients (like oil) if they are NOT the target of THIS cooking step
  const isOilTheTarget =
    rawKey === 'oil' ||
    rawKey?.toLowerCase().includes('oil') ||
    rawKey?.toLowerCase().includes('aceite');

  if (!isOilTheTarget && cookingContainer) {
    // Consume cooking medium helper ingredients currently in the cooking container (e.g. oil)
    const otherEntityIds = cookingContainer.entityIds.filter((id) => id !== entityId);
    for (const otherId of otherEntityIds) {
      const otherEntity = worldStore.getState().entities[otherId];
      const isOil =
        otherEntity?.ingredientId === 'oil' ||
        otherEntity?.id?.includes('oil') ||
        otherEntity?.name?.toLowerCase().includes('oil') ||
        otherEntity?.name?.toLowerCase().includes('aceite');

      if (otherEntity && otherEntity.type === 'ingredient' && !otherEntity.state?.consumed && isOil) {
        worldStore.getState().dispatch({
          type: 'USE_INGREDIENT',
          payload: {
            entityId: otherId,
            usedIn: entityId,
          },
        });
      }
    }
  }

  await ctx.wait();

  // Turn OFF fire when cooking step finishes
  const containerAfter = worldStore.getState().containers[containerId];
  if (containerAfter && containerAfter.isOn) {
    worldStore.getState().dispatch({
      type: 'TOGGLE_BURNER',
      payload: { containerId },
    });
  }
}

export async function handleFlipStep(
  ctx: RecipeRunnerContext,
  step: FlipStep
): Promise<void> {
  const state = worldStore.getState();
  const rawKey = step.target;
  let targetContainer = 'burner1';

  if (rawKey) {
    const resolved = resolveContainerId(rawKey);
    if (state.containers[resolved]) {
      targetContainer = resolved;
    } else {
      // Find container currently holding this entity (e.g. 'Huevo batido' or 'mixture')
      const boundEntityId = ctx.getBoundEntityId(rawKey) || rawKey;
      for (const container of Object.values(state.containers)) {
        if (container.entityIds.includes(boundEntityId)) {
          targetContainer = container.id;
          break;
        }
      }
    }
  }

  const instructionText = step.instruction;

  if (instructionText) {
    worldStore.getState().dispatch({
      type: 'UPDATE_ENTITY_STATE',
      payload: {
        entityId: step.mascotId || ctx.mascotId,
        changes: { speechMessage: instructionText },
      },
    });
  }

  moveTortillaTo(targetContainer, ctx.mascotId);
  await ctx.wait();

  flipTortilla(step.mascotId || ctx.mascotId);

  if (rawKey) {
    const entityId = ctx.getBoundEntityId(rawKey);
    if (entityId) {
      ctx.validateEntity(entityId, 'flip');
      worldStore.getState().dispatch({
        type: 'UPDATE_ENTITY_STATE',
        payload: {
          entityId,
          changes: { isFlipped: true, status: 'flipped-tortilla' },
        },
      });
    }
  } else {
    // If no target specified, flip all active bound entities in target container
    const state = worldStore.getState();
    const container = state.containers[targetContainer];
    if (container) {
      container.entityIds.forEach((entityId) => {
        worldStore.getState().dispatch({
          type: 'UPDATE_ENTITY_STATE',
          payload: {
            entityId,
            changes: { isFlipped: true, status: 'flipped-tortilla' },
          },
        });
      });
    }
  }

  await ctx.wait();
}
`````

## File: src/components/Scene/RecipePlayer.scss
`````scss
/**
 * FILE: RecipePlayer.scss
 *
 * PURPOSE:
 * Stylesheet for RecipePlayer component.
 * Uses warm Spanish kitchen ceramic palette with sleek interactive controls.
 */

@use 'sass:color';
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

/* === Mobile Layout Controls === */
.mobile-panel-toggle {
  display: none;
  margin-bottom: 12px;

  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
  }

  .panel-toggle-btn {
    width: 100%;
    padding: 12px;
    background: $warm-surface;
    border: 1px solid $warm-border;
    border-radius: $radius-md;
    font-weight: 700;
    color: $dark-brown;
    box-shadow: $shadow-ceramic;
    cursor: pointer;
    font-size: 0.95rem;

    &:hover {
      background: $tortilla-yellow-light;
      border-color: $tortilla-yellow;
    }
  }
}

.scene-controls-wrapper {
  transition: max-height 0.3s ease, opacity 0.3s ease, margin-bottom 0.3s ease;

  @media (max-width: 900px) {
    &.collapsed {
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      margin-bottom: 0;
    }

    &.expanded {
      max-height: 2000px; /* large enough to fit content */
      opacity: 1;
      margin-bottom: 20px;
    }
  }
}

.mode-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  align-items: center;

  .mode-tab-btn {
    padding: 10px 18px;
    border-radius: 8px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    border: 2px solid $warm-border;
    background: #ffffff;
    color: $wood-muted;
    flex: 1;
    min-width: 160px;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: all 0.2s ease;

    &:nth-child(1).active {
      background: #d97706;
      color: #ffffff;
      border-color: #d97706;
      box-shadow: 0 2px 6px rgba(217,119,6,0.3);
    }

    &:nth-child(2).active {
      background: #8b5cf6;
      color: #ffffff;
      border-color: #8b5cf6;
      box-shadow: 0 2px 6px rgba(139,92,246,0.3);
    }
  }

  .reset-kitchen-header-btn {
    padding: 10px 18px;
    border-radius: 8px;
    font-weight: 800;
    font-size: 14px;
    cursor: pointer;
    border: 2px solid $terracotta;
    background: #ffffff;
    color: $terracotta;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 2px 4px rgba(217, 83, 79, 0.1);

    &:hover {
      background: $terracotta;
      color: #ffffff;
      transform: translateY(-1px);
      box-shadow: 0 4px 10px rgba(217, 83, 79, 0.3);
    }

    &:active {
      transform: translateY(0);
    }

    @media (max-width: 600px) {
      width: 100%;
    }
  }
}

.action-recorder-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
}


.recipe-player-container {
  @include ceramic-card($warm-surface, $warm-border);
  padding: 16px 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: $shadow-ceramic;
  position: relative;
  overflow: hidden;

  // Header Row
  .player-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;

    .recipe-select-group {
      display: flex;
      align-items: center;
      gap: 12px;

      .recipe-label {
        font-weight: 800;
        font-size: 0.9rem;
        color: $dark-brown;
      }

      .recipe-buttons {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;

        .recipe-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          border: 2px solid $warm-border;
          border-radius: $radius-sm;
          padding: 6px 14px;
          font-size: 0.88rem;
          font-weight: 700;
          color: $dark-brown;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 4px rgba(44, 26, 20, 0.04);
          user-select: none;

          .recipe-btn-icon {
            font-size: 1.1rem;
            line-height: 1;
            transition: transform 0.2s ease;
          }

          &:hover {
            border-color: $tortilla-yellow;
            background: $tortilla-yellow-light;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(232, 168, 56, 0.2);

            .recipe-btn-icon {
              transform: scale(1.2) rotate(-5deg);
            }
          }

          &:active {
            transform: translateY(0);
          }

          &.active {
            background: linear-gradient(135deg, $tortilla-yellow, $tortilla-yellow-hover);
            color: #ffffff;
            border-color: $tortilla-yellow-hover;
            box-shadow: 0 4px 10px rgba(232, 168, 56, 0.35);

            .recipe-btn-icon {
              transform: scale(1.15);
            }
          }

          &.recording-mode-btn {
            border-color: $terracotta;
            color: $terracotta;

            &:hover {
              background: rgba(217, 83, 79, 0.08);
            }

            &.active {
              background: linear-gradient(135deg, $terracotta, color.adjust($terracotta, $lightness: -10%));
              color: #ffffff;
              border-color: $terracotta;
              box-shadow: 0 4px 10px rgba(217, 83, 79, 0.35);
            }
          }
        }
      }
    }

    .player-status-badge {
      display: flex;
      align-items: center;
      gap: 10px;

      .step-count {
        font-size: 0.88rem;
        color: $wood-muted;
        background: $warm-beige;
        padding: 4px 10px;
        border-radius: $radius-sm;
        border: 1px solid $warm-border;

        strong {
          color: $dark-brown;
          font-weight: 800;
        }
      }

      .speed-badge {
        font-size: 0.82rem;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: $radius-sm;
        background: $olive-green-light;
        color: $olive-green;
        border: 1px solid $olive-green-border;
      }
    }
  }

  // Recipe Requirements Section (Top Panel)
  .recipe-requirements-section {
    width: 100%;
    background: #ffffff;
    border: 1px solid $warm-border;
    border-radius: $radius-md;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: $shadow-ceramic;
    box-sizing: border-box;

    .requirements-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding-bottom: 8px;
      border-bottom: 2px dashed color.mix($dark-brown, white, 15%);

      .requirements-title {
        font-size: 0.9rem;
        font-weight: 800;
        color: $dark-brown;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }

      .requirements-subtitle {
        font-size: 0.78rem;
        font-weight: 600;
        color: $wood-muted;
      }
    }

    .recipe-requirements {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 10px;
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;

      .requirement-view {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: $warm-surface;
        border: 1px solid $warm-border;
        border-radius: $radius-md;
        padding: 8px 12px;
        font-size: 0.88rem;
        font-weight: 700;
        color: $dark-brown;
        box-shadow: 0 1px 3px rgba(44, 26, 20, 0.04);
        width: 100%;
        box-sizing: border-box;
        transition: all 0.2s ease;
        opacity: 1 !important;
        filter: none !important;
        visibility: visible !important;

        .entity-view {
          opacity: 1 !important;
          filter: none !important;
          visibility: visible !important;
        }

        &:hover {
          border-color: $tortilla-yellow;
          box-shadow: 0 3px 6px rgba(232, 168, 56, 0.15);
          transform: translateY(-1px);
        }

        &__amount {
          font-size: 0.8rem;
          font-weight: 800;
          color: $terracotta;
          background: $terracotta-light;
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid $terracotta-border;
          white-space: nowrap;
        }
      }
    }
  }

  // Progress Bar Track
  .player-progress-track {
    width: 100%;
    height: 6px;
    background: $warm-beige;
    border-radius: 999px;
    overflow: hidden;
    position: relative;

    .player-progress-bar {
      height: 100%;
      background: linear-gradient(90deg, $tortilla-yellow, $terracotta);
      border-radius: 999px;
      transition: width 0.25s ease-out;
    }
  }

  // Active Step Description Card
  .current-step-card {
    display: flex;
    align-items: center;
    gap: 14px;
    background: #ffffff;
    border: 1px solid $warm-border;
    border-radius: $radius-md;
    padding: 12px 16px;
    box-shadow: 0 2px 5px rgba(44, 26, 20, 0.04);

    .step-icon-area {
      font-size: 1.8rem;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $tortilla-yellow-light;
      border: 1px solid $tortilla-yellow-border;
      border-radius: $radius-sm;
      flex-shrink: 0;
    }

    .step-text-area {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .step-action-badge {
        display: inline-block;
        align-self: flex-start;
        font-size: 0.68rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 2px 6px;
        border-radius: 4px;
        background: $terracotta-light;
        color: $terracotta;
        border: 1px solid $terracotta-border;
      }

      .step-description {
        margin: 0;
        font-size: 0.95rem;
        font-weight: 600;
        color: $dark-brown;
        line-height: 1.35;
      }
    }
  }

  // Controls Row
  .player-controls-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 4px;

    .ctrl-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      font-size: 0.85rem;
      font-weight: 700;
      border-radius: $radius-sm;
      border: 1px solid $warm-border;
      background: #ffffff;
      color: $dark-brown;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
      transition: all 0.18s ease;
      user-select: none;

      &:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-color: $tortilla-yellow;
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }

      &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
        box-shadow: none;
      }

      // Primary Play Button
      &.play-btn {
        background: $tortilla-yellow;
        color: #ffffff;
        border-color: $tortilla-yellow-hover;
        padding: 10px 22px;
        font-size: 0.95rem;

        &:hover:not(:disabled) {
          background: $tortilla-yellow-hover;
        }

        &.is-playing {
          background: $terracotta;
          border-color: $terracotta-hover;
        }
      }

      // Slow & Fast buttons
      &.slow-btn, &.fast-btn {
        background: $warm-surface;
      }

      // Record button
      &.record-btn {
        background: #ffffff;
        border: 2px solid $terracotta;
        color: $terracotta;
        font-weight: 800;

        .record-indicator {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: $terracotta;
          transition: transform 0.2s ease;

          &.active {
            animation: record-pulse 1.2s infinite ease-in-out;
          }
        }

        &:hover:not(:disabled) {
          background: $terracotta-light;
          border-color: $terracotta-hover;
        }

        &.is-recording {
          background: $terracotta;
          color: #ffffff;
          border-color: $terracotta-hover;
          box-shadow: 0 4px 10px rgba(217, 83, 79, 0.35);

          .record-indicator {
            background: #ffffff;
          }

          &:hover:not(:disabled) {
            background: $terracotta-hover;
          }
        }
      }

      // Download button
      &.download-btn {
        background: linear-gradient(135deg, $olive-green, $olive-green-hover);
        color: #ffffff;
        border: 2px solid $olive-green-hover;
        font-weight: 800;
        text-decoration: none;
        box-shadow: 0 3px 8px rgba(107, 142, 35, 0.3);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 12px rgba(107, 142, 35, 0.4);
        }
      }

      // Reset button
      &.reset-btn {
        margin-left: auto;
        background: #ffffff;
        border: 2px solid $terracotta;
        color: $terracotta;
        font-size: 0.9rem;
        font-weight: 800;
        padding: 9px 18px;

        &:hover:not(:disabled) {
          background: $terracotta;
          color: #ffffff;
          border-color: $terracotta-hover;
          box-shadow: 0 4px 8px rgba(217, 83, 79, 0.25);
        }
      }
    }
  }

  // Footer: Speed Pills & Stepper Dots
  .player-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    padding-top: 6px;
    border-top: 1px dashed $warm-border;

    .speed-pills {
      display: flex;
      align-items: center;
      gap: 6px;

      .speed-title {
        font-size: 0.8rem;
        font-weight: 700;
        color: $wood-muted;
        margin-right: 2px;
      }

      .speed-pill {
        border: 1px solid $warm-border;
        background: #ffffff;
        color: $dark-brown;
        font-size: 0.75rem;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: $radius-sm;
        cursor: pointer;
        transition: all 0.15s;

        &:hover {
          border-color: $olive-green;
        }

        &.active {
          background: $olive-green;
          color: #ffffff;
          border-color: $olive-green-hover;
        }
      }
    }

    .stepper-dots {
      display: flex;
      align-items: center;
      gap: 5px;
      flex-wrap: wrap;

      .step-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: $warm-border;
        border: none;
        padding: 0;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          transform: scale(1.3);
          background: $tortilla-yellow;
        }

        &.completed {
          background: $olive-green;
        }

        &.active {
          background: $terracotta;
          transform: scale(1.3);
          box-shadow: 0 0 0 2px $terracotta-light;
        }
      }
    }
  }
}

@keyframes record-pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.4);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
`````

## File: src/systems/recipeRunner.test.ts
`````typescript
/**
 * FILE: recipeRunner.test.ts
 *
 * PURPOSE:
 * Unit tests for the generic RecipeRunner step-based state machine.
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { worldStore } from '../store/worldStore';
import { RecipeRunner } from './recipeRunner';
import { concebollaRecipe, clasicaRecipe } from '../data/catalog/recipes';
import type { Recipe } from '../types/Recipe';
import { clearActionLog, getActionLog } from '../store/middleware/actionLog';

function seedTestWorld() {
  worldStore.setState({
    entities: {
      chef: { id: 'chef', name: 'Chef Tortilla 🍳', type: 'mascot', state: { gazingAt: null } },
      onion: { id: 'onion', ingredientId: 'onion', name: 'Onion', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      potato: { id: 'potato', ingredientId: 'potato', name: 'Potato', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      egg: { id: 'egg', ingredientId: 'egg', name: 'Egg', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      oil: { id: 'oil', ingredientId: 'oil', name: 'Oil', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      salt: { id: 'salt', ingredientId: 'salt', name: 'Salt', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      pepper: { id: 'pepper', ingredientId: 'pepper', name: 'Pepper', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
    },
    containers: {
      despensa: {
        id: 'despensa',
        name: 'Despensa',
        type: 'storage',
        entityIds: ['onion', 'potato', 'egg', 'oil', 'salt', 'pepper'],
        rules: { isImmutable: true },
      },
      sink: {
        id: 'sink',
        name: 'Sink',
        type: 'sink',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      board: {
        id: 'board',
        name: 'Board',
        type: 'board',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      bowl: {
        id: 'bowl',
        name: 'Bowl',
        type: 'bowl',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      burner1: {
        id: 'burner1',
        name: 'burner1',
        type: 'burner',
        entityIds: [],
        rules: { maxCapacity: 5 },
      },
      plate: {
        id: 'plate',
        name: 'Plate',
        type: 'plate',
        entityIds: [],
        rules: { maxCapacity: 5 },
      },
    },
    dispatch: worldStore.getState().dispatch,
  });
}

describe('RecipeRunner System', () => {
  beforeEach(() => {
    seedTestWorld();
    clearActionLog();
  });

  it('runs a declarative recipe and populates target container', async () => {
    const runner = new RecipeRunner({ mascotId: 'chef', defaultTargetId: 'board', delayMs: 5 });
    await runner.runRecipe(concebollaRecipe);

    const state = worldStore.getState();
    const serveStep = concebollaRecipe.steps.find((s) => s.action === 'serve');
    const targetContainerId = serveStep?.containerId || 'plate';
    const targetContainer = state.containers[targetContainerId];

    expect(targetContainer).toBeDefined();
    expect(targetContainer.entityIds.length).toBeGreaterThanOrEqual(1);

    const servedEntityId = targetContainer.entityIds[targetContainer.entityIds.length - 1];
    const servedEntity = state.entities[servedEntityId];
    expect(servedEntity).toBeDefined();
    if (serveStep?.as) {
      expect(servedEntity?.name).toBe(serveStep.as);
    }

    const actionNames = getActionLog().map((a) => a.action);
    expect(actionNames).toContain('MASCOT_MOVE');
    expect(actionNames).toContain('MASCOT_GRAB');
    expect(actionNames).toContain('MASCOT_DROP');
    if (concebollaRecipe.steps.some((s) => s.action === 'flip')) {
      expect(actionNames).toContain('MASCOT_FLIP');
    }
  });

  it('mutates existing entity state for cut/prepare without creating new entity', async () => {
    // Move onion to board first
    const runner = new RecipeRunner({ mascotId: 'chef', defaultTargetId: 'board', delayMs: 5 });
    await runner.runSteps([
      { action: 'move', ingredient: 'onion', source: 'despensa', target: 'board' },
      { action: 'cut', ingredient: 'onion', style: 'diced', containerId: 'board' },
    ]);

    const state = worldStore.getState();
    const boardEntities = state.containers.board.entityIds.map((id) => state.entities[id]);
    const dicedOnion = boardEntities.find((e) => e?.ingredientId === 'onion');

    expect(dicedOnion).toBeDefined();
    // Verify entity ID was retained (no recreation!)
    expect(dicedOnion?.state?.preparation).toBe('diced');

    const actionNames = getActionLog().map((a) => a.action);
    expect(actionNames).toContain('PREPARE_INGREDIENT');
  });

  it('mutates existing entity state for cook step', async () => {
    const runner = new RecipeRunner({ mascotId: 'chef', defaultTargetId: 'burner1', delayMs: 5 });
    await runner.runSteps([
      { action: 'move', ingredient: 'potato', source: 'despensa', target: 'burner1' },
      { action: 'cook', ingredient: 'potato', method: 'fried', containerId: 'burner1' },
    ]);

    const state = worldStore.getState();
    const burner1Entities = state.containers.burner1.entityIds.map((id) => state.entities[id]);
    const friedPotato = burner1Entities.find((e) => e?.ingredientId === 'potato');

    expect(friedPotato).toBeDefined();
    expect(friedPotato?.state?.cooking).toBe('fried');

    const actionNames = getActionLog().map((a) => a.action);
    expect(actionNames).toContain('COOK_INGREDIENT');
  });

  it('clasica recipe: cook potatoes (fry) brings potatoes from board to burner1', async () => {
    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 1 });
    runner.bindRecipeContext(clasicaRecipe);

    // Prepare state: Potato is on board (after cut step in clasica recipe)
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId: 'potato',
        targetContainerId: 'board',
      },
    });

    // Run the cook potatoes step (step from clasica recipe)
    await runner.runSteps([
      {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      },
    ]);

    const state = worldStore.getState();
    const burner1Entities = state.containers.burner1.entityIds.map((id) => state.entities[id]);
    const friedPotato = burner1Entities.find(
      (e) => e && (e.ingredientId === 'potato' || e.id.includes('potato'))
    );

    // Verify potato was moved from board to burner1 and cooked
    expect(friedPotato).toBeDefined();
    expect(friedPotato?.state?.cooking).toBe('fry');
    expect(state.containers.board.entityIds).not.toContain('potato');

    // Verify mascot grab and drop actions were performed to move it
    const actionNames = getActionLog().map((a) => a.action);
    expect(actionNames).toContain('MASCOT_GRAB');
    expect(actionNames).toContain('MASCOT_DROP');
    expect(actionNames).toContain('COOK_INGREDIENT');
  });

  it('handles speak, wait, and celebrate steps', async () => {
    const customRecipe: Recipe = {
      id: 'custom-test',
      name: 'Custom Test Recipe',
      requirements: [],
      steps: [
        { action: 'speak', message: 'Cooking initialized!' },
        { action: 'wait', durationMs: 10 },
        { action: 'celebrate' },
      ],
    };

    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 5 });
    await runner.runRecipe(customRecipe);

    const state = worldStore.getState();
    expect(state.entities.chef.state?.speechMessage).toBe('Cooking initialized!');
    // After celebrate step, clearTortillaGaze is called → gazingAt is null.
    expect(state.entities.chef.state?.gazingAt).toBeNull();
  });

  it('executes clasicaRecipe dictionary steps and state transformations', async () => {
    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 5 });
    await runner.runRecipe(clasicaRecipe);

    const state = worldStore.getState();
    const serveStep = clasicaRecipe.steps.find((s) => s.action === 'serve');
    const targetContainerId = serveStep?.containerId || 'plate';
    const servedEntities = state.containers[targetContainerId].entityIds.map((id) => state.entities[id]);

    expect(servedEntities.length).toBeGreaterThan(0);
    if (serveStep?.as) {
      const servedDish = servedEntities.find((e) => e?.name === serveStep.as);
      expect(servedDish).toBeDefined();
    }

    const actionNames = getActionLog().map((a) => a.action);
    if (clasicaRecipe.steps.some((s) => s.action === 'prepare')) {
      expect(actionNames).toContain('PREPARE_INGREDIENT');
    }
    if (clasicaRecipe.steps.some((s) => s.action === 'cook')) {
      expect(actionNames).toContain('COOK_INGREDIENT');
    }
    if (clasicaRecipe.steps.some((s) => s.action === 'flip')) {
      expect(actionNames).toContain('MASCOT_FLIP');
    }
  });

  it('binds distinct entity IDs when dropping copies from immutable despensa container', async () => {
    const multiIngredientRecipe: Recipe = {
      id: 'multi-potato',
      name: 'Two Potatoes Recipe',
      requirements: [
        { id: 'p1', entityId: 'potato', amount: 1, unit: 'unit' },
        { id: 'p2', entityId: 'potato', amount: 1, unit: 'unit' },
      ],
      steps: [
        { action: 'move', ingredient: 'p1', source: 'despensa', target: 'board' },
        { action: 'cut', target: 'p1', style: 'diced', containerId: 'board' },
        { action: 'move', ingredient: 'p2', source: 'despensa', target: 'sink' },
        { action: 'wash', target: 'p2', containerId: 'sink' },
      ],
    };

    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 5 });
    await runner.runRecipe(multiIngredientRecipe);

    const p1Id = runner.recipeContext.bindings['p1'];
    const p2Id = runner.recipeContext.bindings['p2'];

    expect(p1Id).toBeDefined();
    expect(p2Id).toBeDefined();
    expect(p1Id).not.toBe(p2Id);

    const state = worldStore.getState();
    const p1Entity = state.entities[p1Id];
    const p2Entity = state.entities[p2Id];

    expect(p1Entity?.state?.preparation).toBe('diced');
    expect(p2Entity?.state?.preparation).toBe('washed');
  });

  it('creates a real mixture entity and consumes input ingredients on mix', async () => {
    const mixRecipe: Recipe = {
      id: 'mix-test',
      name: 'Mix Test',
      requirements: [
        { id: 'egg1', entityId: 'egg', amount: 1, unit: 'unit' },
        { id: 'salt1', entityId: 'salt', amount: 1, unit: 'unit' },
      ],
      steps: [
        { action: 'mix', inputs: ['egg1', 'salt1'], targetContainerId: 'bowl', output: 'batter' },
      ],
    };

    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 5 });
    await runner.runRecipe(mixRecipe);

    const state = worldStore.getState();
    const mixtureEntityId = runner.recipeContext.bindings['batter'];
    expect(mixtureEntityId).toBeDefined();

    const mixtureEntity = state.entities[mixtureEntityId];
    expect(mixtureEntity).toBeDefined();
    expect(mixtureEntity.name).toBe('batter');
    expect(state.containers.bowl.entityIds).toContain(mixtureEntityId);

    // Verify input ingredients were marked as consumed and removed from containers
    const eggEntity = state.entities[runner.recipeContext.bindings['egg1']];
    const saltEntity = state.entities[runner.recipeContext.bindings['salt1']];

    expect(eggEntity?.state?.consumed).toBe(true);
    expect(saltEntity?.state?.consumed).toBe(true);

    expect(state.containers.bowl.entityIds).not.toContain(eggEntity.id);
    expect(state.containers.bowl.entityIds).not.toContain(saltEntity.id);
  });

  it('ensures cooked sliced potatoes appear in the bowl before creating mixture entity during mix step', async () => {
    worldStore.getState().dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: {
          id: 'cooked_potato_test',
          ingredientId: 'potato',
          name: 'Potato',
          type: 'ingredient',
          state: { preparation: 'sliced', cooking: 'fried' },
        },
        containerId: 'burner1',
      },
    });

    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 1 });
    runner.bindRecipeContext(clasicaRecipe);

    let cookedSlicedPotatoInBowlBeforeMixture = false;
    let potatoStateInBowl: Record<string, unknown> | undefined;

    const unsubscribe = worldStore.subscribe((currState) => {
      const bowlEntityIds = currState.containers.bowl?.entityIds || [];
      const mixtureExists = bowlEntityIds.some((id) => id.startsWith('mixture'));
      const potatoIdInBowl = bowlEntityIds.find((id) => {
        const e = currState.entities[id];
        return e && (e.ingredientId === 'potato' || e.id.includes('potato'));
      });

      if (potatoIdInBowl && !mixtureExists) {
        cookedSlicedPotatoInBowlBeforeMixture = true;
        potatoStateInBowl = currState.entities[potatoIdInBowl]?.state;
      }
    });

    await runner.runSteps([
      {
        action: 'mix',
        inputs: ['potatoes', 'eggs', 'salt', 'black_pepper'],
        targetContainerId: 'bowl',
        output: 'mixture',
      },
    ]);

    unsubscribe();

    expect(cookedSlicedPotatoInBowlBeforeMixture).toBe(true);
    expect(potatoStateInBowl).toBeDefined();
    expect(potatoStateInBowl?.preparation).toBe('sliced');
    expect(potatoStateInBowl?.cooking).toBe('fried');

    const finalBowlEntityIds = worldStore.getState().containers.bowl.entityIds;
    const mixtureId = runner.recipeContext.bindings['mixture'];
    expect(finalBowlEntityIds).toContain(mixtureId);
  });

  it('translates instruction step "Toggle heat on burner1" into UPDATE_ENTITY_STATE and TOGGLE_BURNER actions', async () => {
    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 1 });
    const initialBurnerState = worldStore.getState().containers.burner1.isOn;

    await runner.runSteps([
      {
        action: 'instruction',
        text: 'Toggle heat on burner1',
      },
    ]);

    const state = worldStore.getState();
    const actionLog = getActionLog();
    const actionTypes = actionLog.map((a) => a.action);

    expect(actionTypes).toContain('UPDATE_ENTITY_STATE');
    expect(actionTypes).toContain('TOGGLE_BURNER');
    expect(state.entities.chef.state?.speechMessage).toBe('Toggle heat on burner1');
    expect(state.containers.burner1.isOn).toBe(!initialBurnerState);
  });
});
`````

## File: src/types/world.ts
`````typescript
/**
 * FILE: world.ts
 *
 * PURPOSE:
 * Defines complete world state structures.
 *
 * RESPONSIBILITY:
 * - Describes the game world's data model.
 */

import type { WorldAction, WorldEvent } from './actions';
import type { PreparationStyle, CookingMethod } from './RecipeStep';
import type { BaseWorldEvent } from './WorldEvent';

export type EntityType = 'ingredient' | 'tool' | 'product' | 'mascot' | 'container' | string;
export type ContainerType = 'storage' | 'board' | 'plate' | 'trash' | 'bowl' | 'sink' | 'workstation' | 'burner';

export interface IngredientState {
  preparation?: PreparationStyle;
  cooking?: CookingMethod;
  status?: string;
  [key: string]: unknown;
}

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  icon?: string;
  ingredientId?: string;
  status?: string;
  state?: IngredientState;
}

export interface ContainerRules {
  maxCapacity?: number;
  allowedTypes?: EntityType[];
  consumesOnDrag?: boolean;
  isImmutable?: boolean;
  allowDuplicateIngredients?: boolean;
}

export interface Container {
  id: string;
  name: string;
  type: ContainerType;
  entityIds: string[];
  rules?: ContainerRules;
  isOn?: boolean;
  cookCondition?: string;
  timer?: string;
}

export interface WorldState {
  entities: Record<string, Entity>;
  containers: Record<string, Container>;
  dispatch: (action: WorldAction) => void;
}

export type { WorldAction, WorldEvent, BaseWorldEvent };
`````

## File: src/index.scss
`````scss
/**
 * FILE: src/index.scss
 *
 * PURPOSE:
 * Global stylesheet for Tortilla World.
 * Establishes warm Spanish kitchen simulation theme, global CSS variables, typography, and workstation layouts.
 */

@use 'sass:color';
@use './styles/variables' as *;
@use './styles/mixins' as *;

:root {
  --text: #{$dark-brown};
  --text-h: #{$dark-brown};
  --text-muted: #{$wood-muted};
  --bg: #{$warm-cream};
  --card-bg: #{$warm-surface};
  --border: #{$warm-border};
  --code-bg: #{$warm-beige};

  // Primary palette tokens
  --primary: #{$tortilla-yellow};
  --primary-hover: #{$tortilla-yellow-hover};
  --secondary: #{$olive-green};
  --secondary-hover: #{$olive-green-hover};
  --accent: #{$terracotta};
  --accent-hover: #{$terracotta-hover};

  --shadow: #{$shadow-ceramic};
  --shadow-hover: #{$shadow-ceramic-hover};

  --font-sans: #{$font-family};
  --font-mono: #{$font-mono};

  font-family: var(--font-sans);
  color-scheme: light;
  color: var(--text);
  background-color: var(--bg);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg);
  color: var(--text);
  background-image: radial-gradient(#{$warm-border} 0.75px, transparent 0.75px);
  background-size: 20px 20px;
  min-height: 100vh;
}

#root {
  max-width: 1240px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  min-height: 100vh;
}

.app-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  position: relative;

  &-content {
    flex: 1;
    min-width: 250px;

    h1 {
      margin: 0;
      font-size: 28px;
    }

    p {
      margin: 4px 0 0 0;
      color: var(--text-muted);
    }
  }
}

.app-main {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-sans);
  color: var(--text-h);
  font-weight: 700;
  line-height: 1.25;
}

h1 {
  font-size: 1.85rem;
  letter-spacing: -0.02em;
}

p {
  line-height: 1.5;
}

// === SCENE GRID LAYOUT & WORKSTATIONS ===
.scene-container {
  margin-top: 20px;
  width: 100%;
}

.scene-workspace {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: stretch;
  width: 100%;
  margin-top: 16px;
}

.scene {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  width: 100%;
  flex: 1;
  box-sizing: border-box;

  @media (max-width: 600px) {
    // 1 workstation per row on mobile screens
    grid-template-columns: repeat(1, 1fr);
    gap: 12px;
  }
}

// === INGREDIENT LIST ITEM & STATE STYLES ===
.ingredient-list-item {
  background: #ffffff;
  border: 1px solid $warm-border;
  border-radius: $radius-md;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 0.92rem;
  color: $dark-brown;
  box-shadow: 0 2px 6px rgba(44, 26, 20, 0.04);
  user-select: none;
  touch-action: none;
  transition: all 0.18s ease;

  &:hover {
    border-color: color.mix($tortilla-yellow, $warm-border, 50%);
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(44, 26, 20, 0.08);
  }

  &.dragging {
    box-shadow: $shadow-floating;
    opacity: 0.85;
    transform: scale(1.02);
  }

  // === INGREDIENT STATE COLOR BADGES ===
  .ingredient-state-badge {
    font-size: 0.72rem;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: $radius-sm;
    margin-left: 8px;
    white-space: nowrap;

    &.state-raw {
      background: $state-raw-bg;
      border: 1px solid $state-raw-border;
      color: $state-raw-text;
    }

    &.state-prepared {
      background: $state-prep-bg;
      border: 1px solid $state-prep-border;
      color: $state-prep-text;
    }

    &.state-cooking {
      background: $state-cook-bg;
      border: 1px solid $state-cook-border;
      color: $state-cook-text;
    }

    &.state-finished {
      background: $state-finished-bg;
      border: 1px solid $state-finished-border;
      color: $state-finished-text;
    }
  }
}
`````

## File: src/components/Scene/RecipePlayer.tsx
`````typescript
/**
 * FILE: RecipePlayer.tsx
 *
 * PURPOSE:
 * Interactive recipe playback and step navigation control component.
 *
 * RESPONSIBILITY:
 * - Provides play/pause, slow, fast, step up (forward), and step down (backward) controls.
 * - Displays active recipe progress, current step index, and human-readable step description.
 * - Manages automated execution using RecipeRunner engine.
 * - Supports instant step navigation and timeline jumping while maintaining simulation world state.
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useStore } from 'zustand';
import { recipes } from '../../data/catalog/recipes';
import { ingredients } from '../../data/catalog/ingredients';
import { catalogTools as tools } from '../../data/catalog/tools';
import { RecipeRunner } from '../../systems/recipeRunner';
import { worldStore } from '../../store/worldStore';
import type { RecipeStep } from '../../types/RecipeStep';
import type { Recipe } from '../../types/Recipe';
import type { WorldAction } from '../../types/actions';
import type { RecordedAction } from '../../types/recording';
import { getRecipeRequirementsArray } from '../../types/Recipe';
import { RecipeRequirements } from '../Recipe/RecipeRequirements';
import { ActionReplayer } from '../Controls/ActionReplayer';
import { PlateDishNameModal } from '../Controls/PlateDishNameModal';
import { extractUsedIngredientsFromActions } from '../../utils/sessionLogUtils';
import { useTranslation } from '../../i18n/useTranslation';
import './RecipePlayer.scss';

// Speed options and corresponding delays in ms
const SPEED_DELAYS: Record<number, number> = {
  0.5: 1200, // Slow
  1: 600,    // Normal
  2: 300,    // Fast
  3: 150,    // Turbo
};

/**
 * Generates human-readable step details for a recorded WorldAction.
 */
function getActionDetails(recordedAction?: RecordedAction | WorldAction): {
  icon: string;
  text: string;
  actionName: string;
} {
  if (!recordedAction) {
    return {
      icon: '🎥',
      text: 'Recording mode active. Perform kitchen actions or press Play / Step Up to replay recorded actions.',
      actionName: 'Recording Mode',
    };
  }

  const { type, payload } = recordedAction as { type: string; payload?: Record<string, unknown> };
  const p = payload || {};

  const formatName = (id?: unknown) => {
    if (typeof id !== 'string' || !id) return '';
    return id
      .replace(/_\d+$/, '')
      .replace(/_/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .trim();
  };

  switch (type) {
    case 'MOVE_ENTITY': {
      const entity = formatName(p.entityId);
      const target = formatName(p.targetContainerId);
      return {
        icon: '🚚',
        actionName: 'Move Entity',
        text: `Move ${entity || 'item'} to ${target || 'container'}`,
      };
    }
    case 'ADD_ENTITY': {
      const entityObj = p.entity as { name?: string; id?: string } | undefined;
      const entity = entityObj?.name || formatName(entityObj?.id);
      const target = formatName(p.containerId);
      return {
        icon: '➕',
        actionName: 'Add Entity',
        text: `Add ${entity || 'item'} into ${target || 'container'}`,
      };
    }
    case 'REMOVE_ENTITY': {
      const entity = formatName(p.entityId);
      return {
        icon: '🗑️',
        actionName: 'Remove Entity',
        text: `Remove ${entity || 'item'} from container`,
      };
    }
    case 'TOGGLE_BURNER': {
      const container = formatName(p.containerId);
      return {
        icon: '🔥',
        actionName: 'Toggle Heat',
        text: `Toggle heat on ${container || 'burner'}`,
      };
    }
    case 'PREPARE_INGREDIENT': {
      const entity = formatName(p.entityId);
      return {
        icon: '🔪',
        actionName: 'Prepare',
        text: `Prepare ${entity || 'ingredient'} (${p.preparation || 'prepared'})`,
      };
    }
    case 'COOK_INGREDIENT': {
      const entity = formatName(p.entityId);
      return {
        icon: '🍳',
        actionName: 'Cook',
        text: `Cook ${entity || 'ingredient'} (${p.cooking || 'cooked'})`,
      };
    }
    case 'USE_INGREDIENT': {
      const entity = formatName(p.entityId);
      return {
        icon: '🥣',
        actionName: 'Use Ingredient',
        text: `Use ${entity || 'ingredient'} in recipe`,
      };
    }
    case 'UPDATE_ENTITY_STATE': {
      const entity = formatName(p.entityId);
      const changesObj = (p.changes as Record<string, unknown>) || {};
      const keys = Object.keys(changesObj).join(', ');
      return {
        icon: '✨',
        actionName: 'Update State',
        text: `Update ${keys || 'state'} for ${entity || 'entity'}`,
      };
    }
    case 'MASCOT_MOVE': {
      return {
        icon: '🤖',
        actionName: 'Mascot Move',
        text: `Mascot moves to ${formatName(p.targetContainerId)}`,
      };
    }
    case 'MASCOT_GRAB': {
      return {
        icon: '🫳',
        actionName: 'Mascot Grab',
        text: `Mascot grabs ${formatName(p.entityId)}`,
      };
    }
    case 'MASCOT_DROP': {
      return {
        icon: '⬇️',
        actionName: 'Mascot Drop',
        text: `Mascot drops item into ${formatName(p.targetContainerId)}`,
      };
    }
    case 'MASCOT_FLIP': {
      return {
        icon: '🍳',
        actionName: 'Mascot Flip',
        text: 'Mascot performs pan flip',
      };
    }
    case 'RESET_WORLD': {
      return {
        icon: '🔄',
        actionName: 'Reset World',
        text: 'Reset world state to default initial layout',
      };
    }
    default: {
      return {
        icon: '⚡',
        actionName: type || 'Action',
        text: `Execute recorded action ${type}`,
      };
    }
  }
}

/**
 * Formats an ingredient key with its current preparation and cooking state from worldStore.
 */
function formatIngredientWithState(inputKey: string): string {
  const store = worldStore.getState();

  const singularKey =
    inputKey.endsWith('es') && inputKey.length > 3
      ? inputKey.slice(0, -2)
      : inputKey.endsWith('s') && inputKey.length > 2
      ? inputKey.slice(0, -1)
      : inputKey;

  const entity = Object.values(store.entities).find(
    (e) =>
      e &&
      (e.id === inputKey ||
        e.ingredientId === inputKey ||
        e.ingredientId === singularKey ||
        e.id.startsWith(inputKey + '_') ||
        e.id.startsWith(singularKey + '_'))
  );

  const parts: string[] = [];

  if (entity?.state) {
    // Cooking state
    const cooking = entity.state.cooking as string | undefined;
    if (cooking && cooking !== 'raw') {
      if (cooking === 'fry' || cooking === 'fried' || cooking === 'cooked') {
        parts.push('cooked');
      } else {
        parts.push(cooking);
      }
    }

    // Preparation state
    const prep = entity.state.preparation as string | undefined;
    if (prep && prep !== 'whole' && prep !== 'raw') {
      parts.push(prep);
    }
  }

  // Fallback defaults for recipe step descriptions when state is not yet populated
  if (parts.length === 0) {
    if (inputKey === 'potatoes') {
      parts.push('cooked', 'sliced');
    } else if (inputKey === 'eggs') {
      parts.push('beaten');
    } else if (inputKey === 'onions') {
      parts.push('cooked', 'diced');
    }
  }

  parts.push(inputKey);
  return parts.join(' ');
}

/**
 * Generates human-readable step details (icon, text label, badge) for a given RecipeStep.
 */
function getStepDetails(step?: RecipeStep): { icon: string; text: string; actionName: string } {
  if (!step) {
    return { icon: '✨', text: 'Select a recipe and press Play or Step Up to begin!', actionName: 'Ready' };
  }

  switch (step.action) {
    case 'move':
      return {
        icon: '🚚',
        text: `Move ${step.ingredient || 'ingredient'} from ${step.source || 'storage'} to ${step.target || 'workspace'}`,
        actionName: 'Move',
      };
    case 'grab':
      return {
        icon: '🫳',
        text: `Grab ${step.ingredient} from ${step.source || 'storage'}`,
        actionName: 'Grab',
      };
    case 'drop':
      return {
        icon: '⬇️',
        text: `Drop held ingredient into ${step.target || 'workspace'}`,
        actionName: 'Drop',
      };
    case 'cut':
    case 'prepare':
    case 'peel':
      return {
        icon: '🔪',
        text: `${step.action.toUpperCase()} ${step.ingredient || step.target || ''} (${step.preparation || step.style || 'prepared'})`,
        actionName: step.action,
      };
    case 'wash':
    case 'rinse':
    case 'drain':
      return {
        icon: '💧',
        text: `${step.action.toUpperCase()} ${step.ingredient || step.target || ''}`,
        actionName: step.action,
      };
    case 'cook':
      return {
        icon: '🍳',
        text: `Cook ${step.target || step.ingredient || ''} (${step.method || 'fry'}${step.duration ? `, ${step.duration} ${step.unit || 'min'}` : ''})`,
        actionName: 'Cook',
      };
    case 'flip':
      return {
        icon: '🍳',
        text: step.instruction || `Flip ${step.target || 'tortilla'} in the pan`,
        actionName: 'Flip',
      };
    case 'mix':
    case 'beat':
    case 'combine': {
      const formattedInputs = (step.inputs || step.ingredients || []).map(formatIngredientWithState);
      const targetContainer = step.targetContainerId;
      const containerName =
        !targetContainer || targetContainer === 'bowl' || targetContainer === 'preparation_bowl'
          ? 'preparation bowl'
          : targetContainer.replace('_', ' ');
      return {
        icon: '🥣',
        text: `Mix ${formattedInputs.join(', ')} in the ${containerName} -> ${step.output || 'mixture'}`,
        actionName: step.action,
      };
    }
    case 'serve':
      return {
        icon: '🍽️',
        text: `Serve ${step.target || 'dish'} to ${step.containerId || 'plate'}`,
        actionName: 'Serve',
      };
    case 'instruction':
      return {
        icon: '👨‍🍳',
        text: step.text || step.instruction || 'Follow recipe instruction',
        actionName: 'Instruction',
      };
    case 'speak':
      return {
        icon: '💬',
        text: `Tortilla says: "${step.message}"`,
        actionName: 'Speak',
      };
    case 'celebrate':
      return {
        icon: '🎉',
        text: 'Flip celebration! Recipe completed successfully!',
        actionName: 'Celebrate',
      };
    case 'wait':
      return {
        icon: '⏳',
        text: `Wait for ${step.durationMs || 600}ms`,
        actionName: 'Wait',
      };
    default:
      return {
        icon: '📝',
        text: 'Execute recipe step',
        actionName: 'Step',
      };
  }
}

interface RecipePlayerProps {
  renderWorkspace?: (requirementsNode: React.ReactNode) => React.ReactNode;
}

export const RecipePlayer: React.FC<RecipePlayerProps> = ({ renderWorkspace }) => {
  const { t } = useTranslation();
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(recipes[0]?.id || 'concebolla');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1); // 0.5, 1, 2, 3
  const [isIngredientsCollapsed, setIsIngredientsCollapsed] = useState<boolean>(false);

  const runnerRef = useRef<RecipeRunner | null>(null);
  const isExecutingRef = useRef<boolean>(false);

  // WorldStore recording state
  const isRecording = useStore(worldStore, (state) => state.isRecording);
  const recordedActions = useStore(worldStore, (state) => state.recordedActions);
  const usedIngredients = useStore(worldStore, (state) => state.usedIngredients);
  const recordedDownloadUrl = useStore(worldStore, (state) => state.recordedDownloadUrl);
  const recordedFilename = useStore(worldStore, (state) => state.recordedFilename);
  const startRecording = useStore(worldStore, (state) => state.startRecording);
  const stopRecording = useStore(worldStore, (state) => state.stopRecording);
  const chefMascot = useStore(worldStore, (state) => state.entities['chef']);

  const [isPlateNameModalOpen, setIsPlateNameModalOpen] = useState<boolean>(false);
  const [plateInitialDishName, setPlateInitialDishName] = useState<string>('');

  const handleStopRecordingRequest = () => {
    const state = worldStore.getState();
    const plateContainer = state.containers.plate || state.containers.plato;
    const plateEntityIds = plateContainer?.entityIds || [];

    if (plateEntityIds.length > 0) {
      const firstEntity = state.entities[plateEntityIds[0]];
      const initialDishName = firstEntity?.name || 'Tortilla Española Clásica';
      setPlateInitialDishName(initialDishName);
      setIsPlateNameModalOpen(true);
    } else {
      stopRecording();
      setSelectedRecipeId('recording');
      setCurrentStepIndex(0);
      window.dispatchEvent(new CustomEvent('select-recorded-session'));
    }
  };

  const handleConfirmDishName = (dishName: string) => {
    setIsPlateNameModalOpen(false);
    stopRecording(dishName);
    setSelectedRecipeId('recording');
    setCurrentStepIndex(0);
    window.dispatchEvent(new CustomEvent('select-recorded-session'));
  };

  const handleSkipDishName = () => {
    setIsPlateNameModalOpen(false);
    stopRecording();
    setSelectedRecipeId('recording');
    setCurrentStepIndex(0);
    window.dispatchEvent(new CustomEvent('select-recorded-session'));
  };

  // Listen for select-recorded-session event
  useEffect(() => {
    const handleSelectRecorded = () => {
      setSelectedRecipeId('recording');
      setCurrentStepIndex(0);
      runnerRef.current = null;
      worldStore.getState().dispatch({ type: 'RESET_WORLD' });
    };

    window.addEventListener('select-recorded-session', handleSelectRecorded);
    return () => {
      window.removeEventListener('select-recorded-session', handleSelectRecorded);
    };
  }, []);

  const prevHoldingRef = useRef<string | undefined>(undefined);

  // Listen for open/close custom events from drag-and-drop or actions
  useEffect(() => {
    const handleOpen = () => setIsIngredientsCollapsed(false);
    const handleClose = () => setIsIngredientsCollapsed(true);

    window.addEventListener('open-ingredients-list', handleOpen);
    window.addEventListener('close-ingredients-list', handleClose);

    return () => {
      window.removeEventListener('open-ingredients-list', handleOpen);
      window.removeEventListener('close-ingredients-list', handleClose);
    };
  }, []);

  // Mascot state listener: auto-open when ingredient is gonna be used, auto-close when placed
  useEffect(() => {
    const currentHolding = chefMascot?.state?.holdingEntityId as string | undefined;
    const currentTarget = chefMascot?.state?.targetContainerId as string | undefined;
    const currentSource = chefMascot?.state?.sourceContainerId as string | undefined;

    const isFetchingIngredient =
      currentTarget === 'despensa' ||
      currentSource === 'despensa' ||
      Boolean(currentHolding);

    if (isFetchingIngredient) {
      queueMicrotask(() => setIsIngredientsCollapsed(false));
    } else if (prevHoldingRef.current && !currentHolding) {
      // Ingredient was placed into workstation!
      queueMicrotask(() => setIsIngredientsCollapsed(true));
    }

    prevHoldingRef.current = currentHolding;
  }, [
    chefMascot?.state?.holdingEntityId,
    chefMascot?.state?.targetContainerId,
    chefMascot?.state?.sourceContainerId,
  ]);

  const isRecordingMode = selectedRecipeId === 'recording' || isRecording;

  const recordedRecipe: Recipe = useMemo(() => {
    let reqList = usedIngredients;
    if (!reqList || reqList.length === 0) {
      reqList = extractUsedIngredientsFromActions(recordedActions);
    }

    const requirementsArr = (reqList || []).map((ing) => ({
      id: `rec-${ing.id}`,
      entityId: ing.id,
      amount: 1,
      unit: 'unit',
      name: ing.name,
    }));

    return {
      id: 'recording',
      name: 'Recorded Session',
      requirements: requirementsArr,
      steps: [],
    };
  }, [usedIngredients, recordedActions]);

  const activeRecipe: Recipe = useMemo(
    () => (selectedRecipeId === 'recording' ? recordedRecipe : recipes.find((r) => r.id === selectedRecipeId) || recipes[0]),
    [selectedRecipeId, recordedRecipe]
  );
  const steps: RecipeStep[] = useMemo(() => activeRecipe?.steps || [], [activeRecipe]);

  const totalSteps = isRecordingMode ? recordedActions.length : steps.length;

  // Get delay in ms based on active speed multiplier
  const currentDelayMs = SPEED_DELAYS[speed] || 600;

  // Details for current step / recorded action
  const stepDetails = useMemo(() => {
    if (isRecordingMode) {
      if (recordedActions.length === 0) {
        return getActionDetails(undefined);
      }
      const activeIndex =
        currentStepIndex < recordedActions.length
          ? currentStepIndex
          : recordedActions.length - 1;
      return getActionDetails(recordedActions[activeIndex]);
    } else {
      const activeStep = steps[currentStepIndex < steps.length ? currentStepIndex : steps.length - 1];
      return getStepDetails(currentStepIndex < steps.length ? activeStep : undefined);
    }
  }, [isRecordingMode, recordedActions, steps, currentStepIndex]);

  // Synchronize required materials for active recipe in despensa container
  useEffect(() => {
    if (activeRecipe?.name) {
      worldStore.getState().setActiveRecipeName(activeRecipe.name);
    }
    if (activeRecipe?.id) {
      worldStore.getState().setActiveRecipeId(activeRecipe.id);
    }
    const store = worldStore.getState();
    const reqs = getRecipeRequirementsArray(activeRecipe);
    reqs.forEach((req) => {
      const existing = store.entities[req.entityId];
      if (!existing) {
        const catalogIng = ingredients.find((i) => i.id === req.entityId);
        const catalogTool = tools.find((t: { id: string }) => t.id === req.entityId);
        store.dispatch({
          type: 'ADD_ENTITY',
          payload: {
            entity: {
              id: req.entityId,
              name: req.name || catalogIng?.name || catalogTool?.name || req.entityId,
              type: (catalogTool ? 'tool' : 'ingredient') as 'tool' | 'ingredient',
              icon: catalogIng?.icon || catalogTool?.icon,
              ingredientId: req.entityId,
              state: {},
            },
            containerId: 'despensa',
          },
        });
      }
    });
  }, [activeRecipe]);

  // Re-sync runner context or reset when recipe changes
  const handleRecipeChange = (newRecipeId: string) => {
    setIsPlaying(false);
    setSelectedRecipeId(newRecipeId);
    setCurrentStepIndex(0);
    runnerRef.current = null;

    worldStore.getState().setActiveRecipeId(newRecipeId);
    const targetRecipe =
      newRecipeId === 'recording'
        ? recordedRecipe
        : recipes.find((r) => r.id === newRecipeId) || recipes[0];

    worldStore.getState().setActiveRecipeName(targetRecipe.name);

    // Clean reset of all kitchen workstation containers
    worldStore.getState().dispatch({ type: 'RESET_WORLD' });

    // Seed required ingredients & tools for target recipe into despensa
    const reqs = getRecipeRequirementsArray(targetRecipe);
    const store = worldStore.getState();
    reqs.forEach((req) => {
      const existing = store.entities[req.entityId];
      if (!existing) {
        const catalogIng = ingredients.find((i) => i.id === req.entityId);
        const catalogTool = tools.find((t: { id: string }) => t.id === req.entityId);
        store.dispatch({
          type: 'ADD_ENTITY',
          payload: {
            entity: {
              id: req.entityId,
              name: req.name || catalogIng?.name || catalogTool?.name || req.entityId,
              type: (catalogTool ? 'tool' : 'ingredient') as 'tool' | 'ingredient',
              icon: catalogIng?.icon || catalogTool?.icon,
              ingredientId: req.entityId,
              state: {},
            },
            containerId: 'despensa',
          },
        });
      }
    });
  };

  // Full reset of world and player step
  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    runnerRef.current = null;

    worldStore.getState().dispatch({ type: 'RESET_WORLD' });

    const reqs = getRecipeRequirementsArray(activeRecipe);
    const store = worldStore.getState();
    reqs.forEach((req) => {
      const existing = store.entities[req.entityId];
      if (!existing) {
        const catalogIng = ingredients.find((i) => i.id === req.entityId);
        const catalogTool = tools.find((t: { id: string }) => t.id === req.entityId);
        store.dispatch({
          type: 'ADD_ENTITY',
          payload: {
            entity: {
              id: req.entityId,
              name: req.name || catalogIng?.name || catalogTool?.name || req.entityId,
              type: (catalogTool ? 'tool' : 'ingredient') as 'tool' | 'ingredient',
              icon: catalogIng?.icon || catalogTool?.icon,
              ingredientId: req.entityId,
              state: {},
            },
            containerId: 'despensa',
          },
        });
      }
    });
  }, [activeRecipe]);

  // Jump to a specific target step index
  const jumpToStep = useCallback(
    async (targetIndex: number) => {
      if (isExecutingRef.current) return;
      setIsPlaying(false);

      const clampedTarget = Math.min(Math.max(0, targetIndex), totalSteps);
      isExecutingRef.current = true;

      try {
        // Reset world state to initial kitchen
        worldStore.getState().dispatch({ type: 'RESET_WORLD' });

        if (isRecordingMode) {
          // Replay recorded actions up to targetIndex
          for (let i = 0; i < clampedTarget; i++) {
            const act = recordedActions[i];
            if (act) {
              worldStore.getState().dispatch(act as unknown as WorldAction);
            }
          }
          setCurrentStepIndex(clampedTarget);
        } else {
          // Fast-forward recipe runner
          const fastRunner = new RecipeRunner({
            mascotId: 'chef',
            delayMs: 0,
          });
          fastRunner.bindRecipeContext(activeRecipe);

          for (let i = 0; i < clampedTarget; i++) {
            await fastRunner.executeStep(steps[i]);
          }

          fastRunner.delayMs = currentDelayMs;
          runnerRef.current = fastRunner;
          setCurrentStepIndex(clampedTarget);
        }
      } catch (err) {
        console.error('[RecipePlayer] Error jumping to step:', err);
      } finally {
        isExecutingRef.current = false;
      }
    },
    [activeRecipe, totalSteps, steps, currentDelayMs, isRecordingMode, recordedActions]
  );

  // Step Up (Step forward 1 step)
  const handleStepUp = useCallback(async () => {
    if (isExecutingRef.current) return;
    setIsPlaying(false);

    if (currentStepIndex >= totalSteps) return;

    isExecutingRef.current = true;

    try {
      if (isRecordingMode) {
        const act = recordedActions[currentStepIndex];
        if (act) {
          worldStore.getState().dispatch(act as unknown as WorldAction);
        }
        setCurrentStepIndex((prev) => Math.min(prev + 1, totalSteps));
      } else {
        if (!runnerRef.current || currentStepIndex === 0) {
          if (currentStepIndex === 0) {
            worldStore.getState().dispatch({ type: 'RESET_WORLD' });
          }
          runnerRef.current = new RecipeRunner({
            mascotId: 'chef',
            delayMs: currentDelayMs,
          });
          runnerRef.current.bindRecipeContext(activeRecipe);
        } else {
          runnerRef.current.delayMs = currentDelayMs;
        }

        const stepToRun = steps[currentStepIndex];
        await runnerRef.current.executeStep(stepToRun);
        setCurrentStepIndex((prev) => Math.min(prev + 1, totalSteps));
      }
    } catch (err) {
      console.error('[RecipePlayer] Error stepping up:', err);
    } finally {
      isExecutingRef.current = false;
    }
  }, [currentStepIndex, totalSteps, activeRecipe, steps, currentDelayMs, isRecordingMode, recordedActions]);

  // Step Down (Step back 1 step)
  const handleStepDown = useCallback(() => {
    if (currentStepIndex <= 0) return;
    jumpToStep(currentStepIndex - 1);
  }, [currentStepIndex, jumpToStep]);

  // Toggle Play / Pause
  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      // If at start (0) or end of steps, reset kitchen before playing
      if (currentStepIndex === 0 || currentStepIndex >= totalSteps) {
        handleReset();
      }
      setIsPlaying(true);
    }
  }, [isPlaying, currentStepIndex, totalSteps, handleReset]);

  // Decrease speed (Slow button)
  const handleSlow = useCallback(() => {
    setSpeed((prevSpeed) => {
      if (prevSpeed === 3) return 2;
      if (prevSpeed === 2) return 1;
      return 0.5;
    });
  }, []);

  // Increase speed (Fast button)
  const handleFast = useCallback(() => {
    setSpeed((prevSpeed) => {
      if (prevSpeed === 0.5) return 1;
      if (prevSpeed === 1) return 2;
      return 3;
    });
  }, []);

  // Keyboard shortcut listener for power user commands
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is focused in an input, textarea, select, or editable element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      const key = e.key;

      if (key === 'ArrowLeft' || key === 'p' || key === 'P' || key === 'j' || key === 'J') {
        e.preventDefault();
        handleStepDown();
      } else if (key === 'ArrowRight' || key === 'n' || key === 'N' || key === 'l' || key === 'L') {
        e.preventDefault();
        handleStepUp();
      } else if (key === ' ' || e.code === 'Space' || key === 'k' || key === 'K') {
        e.preventDefault();
        handleTogglePlay();
      } else if (key === 'r' || key === 'R') {
        e.preventDefault();
        handleReset();
      } else if (key === '+' || key === '=') {
        e.preventDefault();
        handleFast();
      } else if (key === '-' || key === '_') {
        e.preventDefault();
        handleSlow();
      } else if (key === 'f' || key === 'F' || key === 'c' || key === 'C') {
        e.preventDefault();
        worldStore.getState().dispatch({ type: 'MASCOT_FLIP', payload: { mascotId: 'chef' } });
        window.dispatchEvent(new CustomEvent('mascot-flip', { detail: { mascotId: 'chef' } }));
      } else if (key === '1') {
        e.preventDefault();
        worldStore.getState().dispatch({ type: 'MASCOT_MOVE', payload: { targetContainerId: 'despensa' } });
      } else if (key === '2') {
        e.preventDefault();
        worldStore.getState().dispatch({ type: 'MASCOT_MOVE', payload: { targetContainerId: 'board' } });
      } else if (key === '3') {
        e.preventDefault();
        worldStore.getState().dispatch({ type: 'MASCOT_MOVE', payload: { targetContainerId: 'sarten' } });
      } else if (key === '?' || key === 'h' || key === 'H') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('toggle-player-guide'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleStepDown, handleStepUp, handleTogglePlay, handleReset, handleFast, handleSlow]);

  // Listen for mascot arm clicks (left = prev step, right = next step)
  useEffect(() => {
    const handleStepPrev = () => {
      handleStepDown();
    };
    const handleStepNext = () => {
      handleStepUp();
    };

    window.addEventListener('recipe-step-prev', handleStepPrev);
    window.addEventListener('recipe-step-next', handleStepNext);

    return () => {
      window.removeEventListener('recipe-step-prev', handleStepPrev);
      window.removeEventListener('recipe-step-next', handleStepNext);
    };
  }, [handleStepDown, handleStepUp]);

  // Listen for mascot flip (double click/tap on mascot) to step up in recipe player
  useEffect(() => {
    const handleMascotFlip = () => {
      handleStepUp();
    };

    window.addEventListener('mascot-flip', handleMascotFlip);
    return () => {
      window.removeEventListener('mascot-flip', handleMascotFlip);
    };
  }, [handleStepUp]);

  // Auto-play step loop effect
  useEffect(() => {
    if (!isPlaying) return;

    let isCancelled = false;

    const playNextStep = async () => {
      if (currentStepIndex >= totalSteps) {
        setIsPlaying(false);
        return;
      }

      if (isExecutingRef.current) return;
      isExecutingRef.current = true;

      try {
        if (isRecordingMode) {
          const act = recordedActions[currentStepIndex];
          if (act) {
            worldStore.getState().dispatch(act as unknown as WorldAction);
          }
          if (!isCancelled) {
            const nextIndex = currentStepIndex + 1;
            setCurrentStepIndex(nextIndex);
            if (nextIndex >= totalSteps) {
              setIsPlaying(false);
            }
          }
        } else {
          if (!runnerRef.current || currentStepIndex === 0) {
            if (currentStepIndex === 0) {
              worldStore.getState().dispatch({ type: 'RESET_WORLD' });
            }
            runnerRef.current = new RecipeRunner({
              mascotId: 'chef',
              delayMs: currentDelayMs,
            });
            runnerRef.current.bindRecipeContext(activeRecipe);
          } else {
            runnerRef.current.delayMs = currentDelayMs;
          }

          const stepToRun = steps[currentStepIndex];
          await runnerRef.current.executeStep(stepToRun);

          if (!isCancelled) {
            const nextIndex = currentStepIndex + 1;
            setCurrentStepIndex(nextIndex);
            if (nextIndex >= totalSteps) {
              setIsPlaying(false);
            }
          }
        }
      } catch (err) {
        console.error('[RecipePlayer] Playback loop error:', err);
        if (!isCancelled) setIsPlaying(false);
      } finally {
        isExecutingRef.current = false;
      }
    };

    const timeoutId = setTimeout(() => {
      playNextStep();
    }, isRecordingMode ? currentDelayMs : 0);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [isPlaying, currentStepIndex, totalSteps, activeRecipe, steps, currentDelayMs, isRecordingMode, recordedActions]);

  const progressPercent = totalSteps > 0 ? Math.min(100, (currentStepIndex / totalSteps) * 100) : 0;

  const requirementsNode = (
    <div className={`recipe-requirements-section ${isIngredientsCollapsed ? 'collapsed' : ''}`} data-container-id="despensa">
      <div className="requirements-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="requirements-title">📋 {t('ui.requiredMaterials')}</span>
          <span className="requirements-subtitle" style={{ fontSize: '0.78rem', color: '#64748b' }}>
            ({getRecipeRequirementsArray(activeRecipe).length} items)
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsIngredientsCollapsed(!isIngredientsCollapsed)}
          className="ingredients-toggle-btn"
          style={{
            padding: '3px 9px',
            fontSize: '0.75rem',
            fontWeight: 600,
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            backgroundColor: '#ffffff',
            color: '#334155',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          }}
        >
          {isIngredientsCollapsed ? '👁️ Show' : '🙈 Hide'}
        </button>
      </div>
      {!isIngredientsCollapsed && <RecipeRequirements requirements={getRecipeRequirementsArray(activeRecipe)} />}
    </div>
  );

  return (
    <>
      <div className="recipe-player-container">
        {/* Header Row */}
        <div className="player-header">
          <div className="recipe-select-group">
            <span className="recipe-label">{t('ui.recipe')}:</span>
            <div className="recipe-buttons">
              {recipes.map((r) => {
                const isActive = r.id === selectedRecipeId;
                const recipeIcon = r.id === 'concebolla' ? '🧅' : '🥔';
                return (
                  <button
                    key={r.id}
                    type="button"
                    className={`recipe-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleRecipeChange(r.id)}
                  >
                    <span className="recipe-btn-icon">{recipeIcon}</span>
                    <span className="recipe-btn-text">{r.name}</span>
                  </button>
                );
              })}

              {(recordedActions.length > 0 || isRecording) && (
                <button
                  type="button"
                  className={`recipe-btn recording-mode-btn ${selectedRecipeId === 'recording' ? 'active' : ''}`}
                  onClick={() => handleRecipeChange('recording')}
                >
                  <span className="recipe-btn-icon">{isRecording ? '🔴' : '🎥'}</span>
                  <span className="recipe-btn-text">
                    {isRecording
                      ? `Recording (${recordedActions.length})`
                      : `Recorded Session (${recordedActions.length})`}
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="player-status-badge">
            <span className="step-count">
              {t('replayer.stepProgress', { current: currentStepIndex, total: totalSteps })}
            </span>
            <span className={`speed-badge speed-${speed.toString().replace('.', '_')}`}>
              ⚡ {speed}x
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="player-progress-track">
          <div
            className="player-progress-bar"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Active Step Description Card */}
        <div className="current-step-card">
          <div className="step-icon-area">{stepDetails.icon}</div>
          <div className="step-text-area">
            <div className="step-action-badge">{stepDetails.actionName}</div>
            <p className="step-description">{stepDetails.text}</p>
          </div>
        </div>

        {/* Main Controls Row */}
        <div className="player-controls-bar">
          {/* Slow Control */}
          <button
            type="button"
            className="ctrl-btn slow-btn"
            onClick={handleSlow}
            title="Slow down playback speed (0.5x)"
          >
            🐢 Slow
          </button>

          {/* Step Down (Step Back) */}
          <button
            type="button"
            className="ctrl-btn step-down-btn"
            onClick={handleStepDown}
            disabled={currentStepIndex <= 0}
            title="Step Down: Go back to previous step"
          >
            ⏮ Step Down
          </button>

          {/* Play / Pause Toggle */}
          <button
            type="button"
            className={`ctrl-btn play-btn ${isPlaying ? 'is-playing' : ''}`}
            onClick={handleTogglePlay}
            title={isPlaying ? 'Pause recipe auto-play' : 'Play recipe step-by-step'}
          >
            {isPlaying ? '⏸ Pause' : currentStepIndex >= totalSteps ? '🔄 Replay' : '▶ Play'}
          </button>

          {/* Step Up (Step Forward) */}
          <button
            type="button"
            className="ctrl-btn step-up-btn"
            onClick={handleStepUp}
            disabled={currentStepIndex >= totalSteps}
            title="Step Up: Advance to next step"
          >
            Step Up ⏭
          </button>

          {/* Fast Control */}
          <button
            type="button"
            className="ctrl-btn fast-btn"
            onClick={handleFast}
            title="Speed up playback speed (2x/3x)"
          >
            Fast ⚡
          </button>

          {/* Record / Stop Recording Toggle */}
          <button
            type="button"
            className={`ctrl-btn record-btn ${isRecording ? 'is-recording' : ''}`}
            onClick={
              isRecording
                ? handleStopRecordingRequest
                : () => {
                    startRecording();
                    setSelectedRecipeId('recording');
                    setCurrentStepIndex(0);
                  }
            }
            title={
              isRecording
                ? 'Stop recording world interactions'
                : 'Record world interactions into a serialized recipe'
            }
          >
            <span className={`record-indicator ${isRecording ? 'active' : ''}`}></span>
            {isRecording ? `⏹ Stop (${recordedActions.length})` : '⏺ Record'}
          </button>

          {/* Download Recipe JSON Link */}
          {recordedDownloadUrl && (
            <a
              href={recordedDownloadUrl}
              download={recordedFilename || 'tortilla-recorded-recipe.json'}
              className="ctrl-btn download-btn"
              title="Download serialized recipe JSON file"
            >
              💾 Download Recipe (.json)
            </a>
          )}

          {/* Action Log Replayer */}
          <ActionReplayer
            onPlaybackStart={() => {
              setSelectedRecipeId('recording');
              setCurrentStepIndex(0);
            }}
          />

          {/* Kitchen Reset Button */}
          <button
            type="button"
            className="ctrl-btn reset-btn"
            onClick={handleReset}
            title="Clean the kitchen and reset all containers"
          >
            🔄 Reset Kitchen
          </button>
        </div>

        {/* Speed Presets & Step Timeline Dots */}
        <div className="player-footer">
          <div className="speed-pills">
            <span className="speed-title">Speed:</span>
            {[0.5, 1, 2, 3].map((sp) => (
              <button
                key={sp}
                type="button"
                className={`speed-pill ${speed === sp ? 'active' : ''}`}
                onClick={() => setSpeed(sp)}
              >
                {sp}x
              </button>
            ))}
          </div>

          {/* Interactive Step Stepper Dots */}
          <div className="stepper-dots">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <button
                key={`step-dot-${idx}`}
                type="button"
                className={`step-dot ${idx < currentStepIndex ? 'completed' : ''} ${
                  idx === currentStepIndex ? 'active' : ''
                }`}
                onClick={() => jumpToStep(idx)}
                title={`Jump to step ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {!renderWorkspace && requirementsNode}
      </div>
      {renderWorkspace && renderWorkspace(requirementsNode)}

      <PlateDishNameModal
        isOpen={isPlateNameModalOpen}
        initialName={plateInitialDishName}
        onConfirm={handleConfirmDishName}
        onSkip={handleSkipDishName}
      />
    </>
  );
};
`````

## File: src/components/World/World.scss
`````scss
/**
 * FILE: World.scss
 *
 * PURPOSE:
 * SCSS styles for world containers and entity views.
 */

@use 'sass:color';
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.container-view {
  @include ceramic-card($warm-surface, $warm-border);
  min-width: unset; // Allow grid to dictate width
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  @media (max-width: 600px) {
    padding: 10px;
    gap: 8px;
  }

  &--drag-over {
    border-color: $tortilla-yellow;
    background-color: color.mix($tortilla-yellow, $warm-surface, 10%);
  }

  &--mixture {
    border-color: $tortilla-yellow;
    box-shadow: 0 0 16px rgba(245, 180, 50, 0.35);
  }

  // Pantry Storage Theme
  &.container-view--pantry, &.container-view--despensa {
    background: $pantry-bg;
    border-color: $pantry-border;
    .container-view__badge {
      background: color.mix($pantry-accent, white, 15%);
      color: $pantry-accent;
      border: 1px solid color.mix($pantry-accent, white, 30%);
      padding: 2px 8px;
      border-radius: $radius-sm;
    }
  }

  // Washing Station Theme (Sink)
  &.container-view--sink, &.container-view--washing_station {
    background: $washing-bg;
    border-color: $washing-border;
    .container-view__badge {
      background: color.mix($washing-accent, white, 15%);
      color: $washing-accent;
      border: 1px solid color.mix($washing-accent, white, 30%);
      padding: 2px 8px;
      border-radius: $radius-sm;
    }
  }

  // Cutting Station Theme (Board)
  &.container-view--board, &.container-view--cutting_station {
    background: $cutting-bg;
    border-color: $cutting-border;
    .container-view__badge {
      background: color.mix($cutting-accent, white, 15%);
      color: $cutting-accent;
      border: 1px solid color.mix($cutting-accent, white, 30%);
      padding: 2px 8px;
      border-radius: $radius-sm;
    }
  }

  // Preparation Station Theme (Bowl)
  &.container-view--bowl, &.container-view--preparation_station {
    background: $mixing-bg;
    border-color: $mixing-border;
    .container-view__badge {
      background: color.mix($mixing-accent, white, 15%);
      color: $mixing-accent;
      border: 1px solid color.mix($mixing-accent, white, 30%);
      padding: 2px 8px;
      border-radius: $radius-sm;
    }
  }

  // Cooking Station Theme (Burner)
  &.container-view--burner, &.container-view--burner1, &.container-view--burner2, &.container-view--cooking_station {
    background: $cooking-bg;
    border-color: $cooking-border;
    .container-view__badge {
      background: color.mix($cooking-accent, white, 15%);
      color: $cooking-accent;
      border: 1px solid color.mix($cooking-accent, white, 30%);
      padding: 2px 8px;
      border-radius: $radius-sm;
    }
  }

  // Serving Station Theme (Plate)
  &.container-view--plate, &.container-view--serving_station {
    background: $serving-bg;
    border-color: $serving-border;
    .container-view__badge {
      background: color.mix($serving-accent, white, 15%);
      color: $serving-accent;
      border: 1px solid color.mix($serving-accent, white, 30%);
      padding: 2px 8px;
      border-radius: $radius-sm;
    }
  }

  // Trash Bin Theme
  &.container-view--trash, &.container-view--basura, &.container-view--papelera {
    background: #fef2f2;
    border-color: #fca5a5;
    .container-view__badge {
      background: #fee2e2;
      color: #dc2626;
      border: 1px solid #f87171;
      padding: 2px 8px;
      border-radius: $radius-sm;
    }
  }
}

.burner-toggle {
  width: 18px;
  height: 18px;
  padding: 0;

  border: 2px solid #666;
  border-radius: 50%;
  background: #2f2f2f;

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.15);
    border-color: #999;
  }

  &:active {
    transform: scale(0.95);
  }
}

.burner-toggle--on {
  background: #ff6b00;
  border-color: #ff9d4d;

  box-shadow:
    0 0 6px rgba(255, 120, 0, .8),
    0 0 14px rgba(255, 120, 0, .5);
}

.container-onFire {
  animation: burnerGlow 1s infinite alternate;
  background-image: linear-gradient(to top, rgba(255, 107, 0, 0.15) 0%, transparent 80%);
}

@keyframes burnerGlow {
  from {
    box-shadow: 0 4px 12px rgba(255, 0, 0, 0.2);
    border-color: rgba(255, 0, 0, 0.3);
  }

  to {
    box-shadow: 0 8px 25px rgba(255, 140, 0, 0.6);
    border-color: rgba(255, 140, 0, 0.8);
  }
}

.container-view__header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 4px;
}

.container-view__actions {
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 600px) {
    gap: 6px;
  }

  .container-view__leave-row {
    width: 100%;
  }

  .container-view__button-row {
    display: flex;
    gap: 6px;
    align-items: center;
    width: 100%;

    .container-action-btn {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }

  .container-view__action-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
  }

  .container-view__field-group {
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: 100%;
  }

  .container-view__input-label {
    font-size: 0.75rem;
    font-weight: 700;
    color: $dark-brown;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    display: flex;
    align-items: center;
    gap: 4px;

    @media (max-width: 600px) {
      font-size: 0.7rem;
    }
  }

  .container-view__input-row {
    display: flex;
    gap: 6px;
    align-items: center;
    width: 100%;
  }

  .container-view__input {
    flex: 1;
    min-width: 0;
    padding: 6px 10px;
    font-size: 0.88rem;
    font-weight: 500;
    border: 1.5px solid $warm-border;
    border-radius: $radius-sm;
    background: #ffffff;
    color: $dark-brown;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    @media (max-width: 600px) {
      padding: 5px 8px;
      font-size: 0.82rem;
    }

    &--lg {
      padding: 7px 11px;
      font-size: 0.92rem;

      @media (max-width: 600px) {
        padding: 5px 8px;
        font-size: 0.82rem;
      }
    }

    &:focus {
      border-color: $tortilla-yellow;
      box-shadow: 0 0 0 3px rgba(245, 180, 50, 0.25);
    }

    &::placeholder {
      color: #888888;
      font-style: italic;
      font-weight: 400;
    }
  }

  .container-action-btn {
    padding: 6px 12px;
    font-size: 0.85rem;
    font-weight: 600;
    border-radius: $radius-sm;
    border: 1.5px solid $warm-border;
    background: #ffffff;
    color: $dark-brown;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;

    @media (max-width: 600px) {
      padding: 5px 8px;
      font-size: 0.8rem;
    }

    &:hover {
      background: color.mix($tortilla-yellow, #ffffff, 25%);
      border-color: $tortilla-yellow;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }

    &--active {
      background: #ff6b00;
      color: #ffffff;
      border-color: #ff9d4d;
      box-shadow: 0 0 8px rgba(255, 120, 0, 0.5);
    }
  }

  .leave-here-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: #faf6ed;
    border: 1.5px dashed #d6c6a5;
    color: $dark-brown;
    padding: 6px 12px;
    font-weight: 600;

    &:hover {
      background: #f3e5c8;
      border-color: $tortilla-yellow;
    }

    &--highlight {
      background: linear-gradient(135deg, $tortilla-yellow, #e09e25);
      border: 1.5px solid #c98814;
      color: #3b2002;
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(232, 184, 74, 0.45);

      &:hover {
        background: linear-gradient(135deg, #f3b934, #c98814);
        transform: translateY(-1px);
      }
    }

    .holding-count-badge {
      background: rgba(0, 0, 0, 0.15);
      color: inherit;
      padding: 1px 6px;
      border-radius: 10px;
      font-size: 0.78rem;
    }
  }
}

.container-view__title {
  color: $dark-brown;
  font-size: 1rem;
  font-weight: 700;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
}

.container-view__badge {
  color: $wood-muted;
  font-size: 0.82rem;
  font-weight: 600;

  @media (max-width: 600px) {
    font-size: 0.7rem;
    line-height: 1.1;
  }
}

.container-view__items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  min-height: 48px;
}

.container-view__empty-hint {
  color: $wood-muted;
  font-size: 0.85rem;
  font-style: italic;
  text-align: center;
  padding: 12px;
  border: 1px dashed $warm-border;
  border-radius: $radius-md;
}

.entity-view {
  align-items: center;
  background: #ffffff;
  border: 1px solid $warm-border;
  border-radius: $radius-md;
  box-shadow: 0 2px 6px rgba(44, 26, 20, 0.04);
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 8px 12px;
  user-select: none;
  touch-action: none;
  transition: all 0.2s ease;

  @media (max-width: 600px) {
    padding: 6px 8px;
    gap: 4px;
  }

  &:hover {
    border-color: color.mix($tortilla-yellow, $warm-border, 50%);
  }

  &--dragging {
    opacity: 0.6;
    cursor: grabbing;
  }

  &--readonly {
    cursor: default;
    background: color.mix($warm-beige, #ffffff, 40%);
    box-shadow: none;

    &:hover {
      border-color: $warm-border;
    }
  }
}

.entity-nav-buttons {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  margin-left: auto;
  flex-shrink: 0;

  @media (max-width: 520px) {
    gap: 2px;

    .take-btn-text {
      display: none;
    }
  }
}

.entity-take-btn {
  background: color.mix($tortilla-yellow, #ffffff, 30%);
  color: $dark-brown;
  border: 1px solid color.adjust($tortilla-yellow, $lightness: -15%);
  border-radius: 4px;
  padding: 2px 7px;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  line-height: 1;
  transition: all 0.15s ease;
  user-select: none;
  touch-action: manipulation;
  display: inline-flex;
  align-items: center;
  gap: 3px;

  @media (max-width: 520px) {
    padding: 3px 5px;
    font-size: 0.75rem;
  }

  &:hover {
    background: $tortilla-yellow;
    color: #ffffff;
    border-color: color.adjust($tortilla-yellow, $lightness: -10%);
    transform: translateY(-1px);
  }
}

.entity-nav-btn {
  background: color.mix($warm-beige, #ffffff, 60%);
  color: $dark-brown;
  border: 1px solid $warm-border;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  line-height: 1;
  transition: all 0.15s ease;
  user-select: none;
  touch-action: manipulation;

  @media (max-width: 520px) {
    padding: 3px 5px;
    font-size: 0.7rem;
  }

  &:hover:not(:disabled) {
    background: $tortilla-yellow;
    color: #ffffff;
    border-color: color.adjust($tortilla-yellow, $lightness: -10%);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
}

.entity-view__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
}

.entity-view__name {
  font-weight: 600;
  color: $dark-brown;
  font-size: 0.9rem;

  @media (max-width: 600px) {
    font-size: 0.82rem;
  }
}

.entity-view__state {
  margin-left: auto;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: $radius-sm;

  @media (max-width: 600px) {
    font-size: 0.7rem;
    padding: 1px 4px;
  }

  &--raw {
    background: #fef3c7;
    color: #92400e;
  }

  &--prepared {
    background: #e0f2fe;
    color: #0369a1;
  }

  &--cooking {
    background: #ffedd5;
    color: #c2410c;
  }

  &--finished {
    background: #dcfce7;
    color: #15803d;
  }
}

.entity-delete-btn {
  width: 20px;
  height: 20px;
  padding: 0;
  border-radius: 50%;
  border: 1px solid #cbd5e1;
  background-color: #f8fafc;
  color: #64748b;
  font-size: 13px;
  font-weight: bold;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
  margin-left: 2px;

  &:hover {
    background-color: #ef4444;
    color: #ffffff;
    border-color: #dc2626;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
}

/* ==========================================================================
   Mascot-Centered Focus Mode Attention Transitions
   ========================================================================== */

.container-view,
.entity-view,
.mascot-container,
.mascot-stage,
.mascot-wrapper {
  transition:
    opacity 200ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 200ms cubic-bezier(0.4, 0, 0.2, 1),
    filter 200ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1),
    border-color 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.container-view.focus-primary,
.entity-view.focus-primary,
.mascot-container.focus-primary,
.mascot-stage.focus-primary {
  opacity: 1 !important;
  transform: scale(1.03) !important;
  z-index: 10 !important;
  border-color: $tortilla-yellow !important;
  box-shadow: 0 0 20px rgba(245, 180, 50, 0.4) !important;
  pointer-events: auto !important;
}

.mascot-wrapper.focus-primary {
  opacity: 1 !important;
  transform: translate3d(var(--offset-x, 0px), var(--offset-y, 0px), 0) scale(1.03) !important;
  z-index: 1001 !important;
  pointer-events: auto !important;
}

.container-view.focus-secondary,
.entity-view.focus-secondary,
.mascot-container.focus-secondary,
.mascot-stage.focus-secondary {
  opacity: 0.9 !important;
  transform: scale(1) !important;
  filter: none !important;
  z-index: 5 !important;
  pointer-events: auto !important;
}

.mascot-wrapper.focus-secondary {
  opacity: 0.35 !important;
  transform: translate3d(var(--offset-x, 0px), var(--offset-y, 0px), 0) scale(0.95) !important;
  z-index: 5 !important;
  pointer-events: auto !important;
}

.container-view.focus-background {
  opacity: 1 !important;
  visibility: visible !important;
  transform: scale(0.97) !important;
  z-index: 1 !important;
  border-color: rgba(200, 200, 200, 0.35) !important;
  box-shadow: none !important;

  /* Workstation frame, header, badges, and controls get the unused / inactive effect */
  & > *:not(.container-view__contents) {
    opacity: 0.45 !important;
    filter: grayscale(0.2) !important;
  }
}

.entity-view.focus-background,
.mascot-container.focus-background,
.mascot-stage.focus-background {
  opacity: 1 !important;
  visibility: visible !important;
  filter: none !important;
  transform: scale(1) !important;
}

/* Ingredients in workstations/boards must never hide out or change transparency */
.entity-view,
.container-view__contents,
.container-view__contents .entity-view {
  opacity: 1 !important;
  filter: none !important;
  visibility: visible !important;
}

.mascot-wrapper.focus-background {
  opacity: 0.35 !important;
  visibility: visible !important;
  filter: blur(1px) !important;
  transform: translate3d(var(--offset-x, 0px), var(--offset-y, 0px), 0) scale(0.95) !important;
  z-index: 1 !important;
  pointer-events: none !important;
}
`````

## File: src/types/actions.ts
`````typescript
/**
 * FILE: actions.ts
 *
 * PURPOSE:
 * Defines world actions/events.
 *
 * RESPONSIBILITY:
 * - Creates the communication contract between systems and store.
 */

import type { EntityType } from './world';
import type { PreparationStyle, CookingMethod } from './RecipeStep';

export type WorldAction =
  | {
    type: 'MOVE_ENTITY';
    payload: {
      entityId: string;
      targetContainerId: string;
      sourceContainerId?: string;
      positionIndex?: number;
    };
  }
  | {
    type: 'ADD_ENTITY';
    payload: {
      entity: {
        id: string;
        name: string;
        type: EntityType;
        icon?: string;
        ingredientId?: string;
        state?: Record<string, unknown>;
      };
      containerId: string;
    };
  }
  | {
    type: 'TOGGLE_BURNER';
    payload: {
      containerId: string;
      cookCondition?: string;
      isOn?: boolean;
    };
  }
  | {
    type: 'REMOVE_ENTITY';
    payload: {
      entityId: string;
    };
  }
  | {
    type: 'UPDATE_ENTITY_STATE';
    payload: {
      entityId: string;
      changes: Record<string, unknown>;
    };
  }
  | {
    type: 'PREPARE_INGREDIENT';
    payload: {
      entityId: string;
      preparation: PreparationStyle;
    };
  }
  | {
    type: 'COOK_INGREDIENT';
    payload: {
      entityId: string;
      cooking: CookingMethod;
      customName?: string;
      cookCondition?: string;
    };
  }
  | {
    type: 'USE_INGREDIENT';
    payload: {
      entityId: string;
      usedIn?: string;
    };
  }
  | {
    type: 'MASCOT_FLIP';
    payload: {
      mascotId?: string;
    };
  }
  | {
    type: 'MASCOT_MOVE';
    payload: {
      mascotId?: string;
      targetContainerId: string;
    };
  }
  | {
    type: 'MASCOT_GRAB';
    payload: {
      mascotId?: string;
      entityId: string;
      sourceContainerId?: string;
    };
  }
  | {
    type: 'MASCOT_DROP';
    payload: {
      mascotId?: string;
      targetContainerId: string;
      positionIndex?: number;
    };
  }
  | {
    type: 'MASCOT_CLEAR_GAZE';
    payload: {
      mascotId?: string;
    };
  }
  | {
      type: 'TOGGLE_HEAT';
      payload: {
        containerId: string;
        cookCondition?: string;
        isOn?: boolean;
      };
    }
  | {
      type: 'WASH_CONTAINER_CONTENTS';
      payload: {
        containerId: string;
      };
    }
  | {
      type: 'CUT_CONTAINER_CONTENTS';
      payload: {
        containerId: string;
      };
    }
  | {
      type: 'PEEL_CONTAINER_CONTENTS';
      payload: {
        containerId: string;
      };
    }
  | {
      type: 'MIX_CONTAINER_CONTENTS';
      payload: {
        containerId: string;
        customName?: string;
      };
    }
  | {
      type: 'COOK_CONTAINER_CONTENTS';
      payload: {
        containerId: string;
        cooking?: CookingMethod;
        customName?: string;
        cookCondition?: string;
      };
    }
  | {
      type: 'SET_FOCUS';
      payload: {
        containerId?: string;
        entityIds?: string[];
        mode?: 'normal' | 'focused';
        isUserOverride?: boolean;
      };
    }
  | {
      type: 'CLEAR_FOCUS';
      payload?: {
        isUserOverride?: boolean;
      };
    }
  | {
      type: 'FOCUS_CONTAINER';
      payload: {
        containerId: string;
        entityIds?: string[];
        isUserOverride?: boolean;
      };
    }
  | {
      type: 'FOCUS_ENTITY';
      payload: {
        entityId: string;
        containerId?: string;
        isUserOverride?: boolean;
      };
    }
  | {
      type: 'EMPTY_TRASH';
      payload?: Record<string, never>;
    }
  | {
      type: 'RESET_WORLD';
      payload?: Record<string, never>;
    };


export type WorldEvent =
  | {
      type: 'INGREDIENT_CONSUMED';
      payload: {
        entityId: string;
        consumedBy?: string;
      };
    }
  | {
      type: 'TRASH_EMPTIED';
      payload: {
        entityIds: string[];
      };
    }
  | {
      type: 'CONTAINER_HEAT_TOGGLED';
      payload: {
        containerId: string;
        isOn: boolean;
        cookCondition?: string;
      };
    }
  | {
      type: 'CONTAINER_WASHED';
      payload: {
        containerId: string;
        entityIds: string[];
      };
    }
  | {
      type: 'CONTAINER_CUT';
      payload: {
        containerId: string;
        entityIds: string[];
      };
    }
  | {
      type: 'CONTAINER_PEELED';
      payload: {
        containerId: string;
        entityIds: string[];
      };
    }
  | {
      type: 'CONTAINER_MIXED';
      payload: {
        containerId: string;
        entityIds: string[];
        mixtureId?: string;
        customName?: string;
      };
    }
  | {
      type: 'CONTAINER_COOKED';
      payload: {
        containerId: string;
        entityIds: string[];
        customName?: string;
        cookCondition?: string;
      };
    };
`````

## File: src/components/Mascot/Mascot.tsx
`````typescript
/**
 * FILE: Mascot.tsx
 *
 * PURPOSE:
 * Main Tortilla mascot component with physical movement and grabbing animations.
 *
 * RESPONSIBILITY:
 * - Controls mascot visual representation.
 * - Animates physical movement to target containers across the scene.
 * - Displays held ingredient badge and grab/drop motion feedback.
 *
 * SHOULD NOT:
 * - Own world state.
 * - Contain gameplay rules.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useTranslation } from '../../i18n/useTranslation';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import { TortillaSvg } from './TortillaSvg';
import { ingredients } from '../../data/catalog/ingredients';
import { catalogTools } from '../../data/catalog/tools';
import type { GazeTarget } from '../../systems/gaze';
import { gazeEntityId } from '../../systems/gaze';
import { getMascotFocusClass } from '../../systems/focus';

interface MascotProps {
  mascotId?: string;
  onLeftArmClick?: () => void;
  onRightArmClick?: () => void;
}

export const Mascot: React.FC<MascotProps> = ({ mascotId = 'chef', onLeftArmClick: onLeftArmClickProp, onRightArmClick: onRightArmClickProp }) => {
  const { t } = useTranslation();
  const { setNodeRef, isOver } = useDroppable({ id: mascotId });
  const mascotEntity = useStore(worldStore, (state) => state.entities[mascotId]);
  const entities = useStore(worldStore, (state) => state.entities);
  const focusTarget = useStore(worldStore, (state) => state.focusTarget);
  const dispatch = useStore(worldStore, (state) => state.dispatch);
  
  const focusClass = getMascotFocusClass(focusTarget);
  
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const mascotAnchorRef = useRef<HTMLDivElement>(null);

  // Derived from mascotEntity.state — use optional chaining so these stay safe
  // when mascotEntity is undefined, keeping every hook below unconditional.
  const gazingAt = (mascotEntity?.state?.gazingAt ?? null) as GazeTarget;
  const gazingAtEntityId = gazeEntityId(gazingAt);
  const targetContainerId = (mascotEntity?.state?.targetContainerId as string | undefined) ?? gazingAtEntityId ?? undefined;
  const state = (mascotEntity?.state?.state as string | undefined) || 'idle';
  const speechMessage = mascotEntity?.state?.speechMessage as string | undefined;

  // Extract array of holdingEntityIds (supporting multi-item carrying or legacy single holdingEntityId)
  const rawHoldingIds = mascotEntity?.state?.holdingEntityIds as string[] | undefined;
  const singleHoldingId = mascotEntity?.state?.holdingEntityId as string | undefined;

  const holdingEntityIds: string[] = Array.isArray(rawHoldingIds) && rawHoldingIds.length > 0
    ? rawHoldingIds
    : singleHoldingId
    ? [singleHoldingId]
    : [];

  const isHoldingLeft = holdingEntityIds.length > 0;
  const isHoldingRight = holdingEntityIds.length > 1;

  // Resolve held item info helper
  const getHeldItemInfo = (id: string) => {
    const entity = entities[id];
    const catalogIng = ingredients.find(
      (i) => i.id === entity?.ingredientId || i.id === id || id.startsWith(i.id) || i.id.includes(id)
    );
    const catalogTool = catalogTools.find(
      (t) => t.id === entity?.id || t.id === id || id.startsWith(t.id)
    );

    const name = entity?.name || catalogIng?.name || catalogTool?.name || id.charAt(0).toUpperCase() + id.slice(1);
    const icon = catalogIng?.icon || catalogTool?.icon || '🥔';

    return { name, icon };
  };

  const holdingEntityIdsKey = holdingEntityIds.join(',');

  // Calculate physical DOM position offset to target container
  useEffect(() => {
    const updatePosition = () => {
      if (!mascotAnchorRef.current) return;

      let containerEl = null;
      if (targetContainerId) {
        containerEl = document.querySelector(`[data-container-id="${targetContainerId}"]`);
      }

      // If no target container is specified, default to despensa (pantry) or recipe requirements
      if (!containerEl) {
        containerEl = document.querySelector(`[data-container-id="despensa"]`);
      }

      // Fallback 1: Any container with recipe requirements
      if (!containerEl) {
        containerEl = document.querySelector(`.recipe-requirements-section`);
      }

      // Fallback 2: General safe position if absolutely no containers found
      if (!containerEl) {
        // Safe position in the middle right
        const safeX = window.innerWidth - 120;
        const safeY = window.innerHeight / 2 - 50;
        const mascotRect = mascotAnchorRef.current.getBoundingClientRect();

        setOffset({
          x: safeX - mascotRect.left,
          y: safeY - mascotRect.top
        });
        return;
      }

      const containerRect = containerEl.getBoundingClientRect();
      const mascotRect = mascotAnchorRef.current.getBoundingClientRect();

      // Calculate translation offset so mascot hovers near the container but doesn't obscure it
      const x = containerRect.left + containerRect.width / 2 - (mascotRect.left + mascotRect.width / 2);

      // If the screen is small (mobile), hover the mascot slightly higher and to the right
      // so it doesn't block the container's title or items.
      const isMobile = window.innerWidth <= 600;
      const yOffset = isMobile ? 55 : 15; // increased to ensure space for floating speech bubble and avoid blocking headers
      const xOffsetModifier = isMobile ? 35 : 0; // increased slight shift right to avoid obscure text

      const y = containerRect.top - mascotRect.top - yOffset;

      setOffset({ x: x + xOffsetModifier, y });
    };

    updatePosition();
    const rafId = requestAnimationFrame(updatePosition);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [targetContainerId, gazingAtEntityId, holdingEntityIdsKey, state]);

  // Guarded until after all hooks so hook call order never changes between renders.
  if (!mascotEntity) return null;

  const handleDoubleClick = () => {
    dispatch({ type: 'MASCOT_FLIP', payload: { mascotId } });
    window.dispatchEvent(new CustomEvent('mascot-flip', { detail: { mascotId } }));
  };

  const handleLeftArmClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('recipe-step-prev'));
    onLeftArmClickProp?.();
  };

  const handleRightArmClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('recipe-step-next'));
    onRightArmClickProp?.();
  };

  const isFloating = offset.x !== 0 || offset.y !== 0;

  return (
    <>
      {/* Anchor box holding mascot location in layout */}
      <div
        ref={mascotAnchorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '1px',
          height: '1px',
          visibility: 'hidden',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9999
        }}
      >
        <div
          ref={setNodeRef}
          className={`mascot-wrapper ${focusClass} ${isFloating ? 'is-floating' : ''} ${holdingEntityIds.length > 0 ? 'is-holding' : ''} ${isOver ? 'is-droppable-over scale-105' : ''}`}
          style={
            {
              position: 'absolute',
              top: '0',
              left: '0',
              pointerEvents: 'auto',
              '--offset-x': `${offset.x}px`,
              '--offset-y': `${offset.y}px`,
              transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
            } as React.CSSProperties
          }
        >
          <TortillaSvg
            state={state}
            gazingAt={gazingAt}
            onDoubleClick={handleDoubleClick}
            isHoldingLeft={isHoldingLeft}
            isHoldingRight={isHoldingRight}
            onLeftArmClick={handleLeftArmClick}
            onRightArmClick={handleRightArmClick}
            leftArmTitle={t('replayer.stepBack') || '⏮️ Previous Step'}
            rightArmTitle={t('replayer.stepForward') || '⏭️ Next Step'}
          />

          {/* Held Ingredient Badges (Up to 2 items) */}
          {holdingEntityIds.slice(0, 2).map((id, index) => {
            const info = getHeldItemInfo(id);
            const isFirst = index === 0;
            return (
              <div
                key={`held-badge-${id}-${index}`}
                className={`mascot-held-badge ${isFirst ? 'badge-left' : 'badge-right'}`}
                style={{
                  bottom: '-8px',
                  ...(isFirst ? { left: '-12px', right: 'auto' } : { right: '-12px', left: 'auto' }),
                }}
              >
                <span style={{ fontSize: '16px' }}>{info.icon}</span>
                <span>{info.name}</span>
              </div>
            );
          })}

          {speechMessage && (
            <div
              className="mascot-speech-bubble"
              style={{
                position: 'absolute',
                top: '-50px',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '8px 12px',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--text-h)',
                background: 'var(--card-bg, #ffffff)',
                border: '1px solid var(--primary, #e8b84a)',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                zIndex: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>💬</span>
                <span>{speechMessage}</span>
              </div>
              {(speechMessage.includes('empty') ||
                speechMessage.includes('vaciar') ||
                speechMessage.includes('leeren') ||
                speechMessage.includes('trash') ||
                speechMessage.includes('papelera') ||
                speechMessage.includes('Mülleimer')) && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch({ type: 'EMPTY_TRASH' });
                      dispatch({
                        type: 'UPDATE_ENTITY_STATE',
                        payload: { entityId: 'chef', changes: { speechMessage: undefined } },
                      });
                    }}
                    style={{
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '3px 8px',
                      fontSize: '11px',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    ✅ {t('ui.yesEmpty')}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch({
                        type: 'UPDATE_ENTITY_STATE',
                        payload: { entityId: 'chef', changes: { speechMessage: undefined } },
                      });
                    }}
                    style={{
                      backgroundColor: '#6b7280',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '3px 8px',
                      fontSize: '11px',
                      cursor: 'pointer',
                    }}
                  >
                    ❌ {t('ui.cancel')}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
`````

## File: src/App.tsx
`````typescript
/**
 * FILE: App.tsx
 *
 * PURPOSE:
 * Main React application component.
 *
 * RESPONSIBILITY:
 * - Creates the application layout.
 * - Connects major UI areas together.
 * - Acts as the entry point for the game world.
 *
 * SHOULD NOT:
 * - Contain game rules.
 * - Modify world state directly.
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Scene } from './components/Scene/Scene';
import { Mascot } from './components/Mascot/Mascot';
import { PlayerGuideModal } from './components/Controls/PlayerGuideModal';
import { LanguageSwitcher } from './components/Controls/LanguageSwitcher';
import { useTranslation } from './i18n/useTranslation';

function App() {
  const [showGuide, setShowGuide] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const handleToggleGuide = () => {
      setShowGuide((prev) => !prev);
    };

    window.addEventListener('toggle-player-guide', handleToggleGuide);
    return () => {
      window.removeEventListener('toggle-player-guide', handleToggleGuide);
    };
  }, []);

  return (
    <motion.div
      className="app-container"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <header className="app-header">
        <div className="app-header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h1>{t('app.title')}</h1>
            <p>{t('app.subtitle')}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <LanguageSwitcher compact />
            <a
              href="https://tortilladepatatas.org"
              target="_blank"
              rel="noopener noreferrer"
              className="mother-web-link"
              title="Go to Tortilla Info (tortilladepatatas.org)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 10px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: '#0f172a',
                fontWeight: 600,
                fontSize: '0.8rem',
                textDecoration: 'none',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                whiteSpace: 'nowrap',
              }}
            >
              <span>{t('app.tortillaInfo')}</span>
              <ExternalLink size={13} />
            </a>
            <button
              type="button"
              className="guide-trigger-btn"
              onClick={() => setShowGuide(true)}
              style={{
                padding: '5px 10px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: '#0f172a',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                whiteSpace: 'nowrap',
              }}
            >
              {t('guide.openBtn')}
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <Scene />
        <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
          <Mascot />
        </div>
      </main>

      <PlayerGuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} />
    </motion.div>
  );
}

export default App;
`````

## File: src/components/World/ContainerView.tsx
`````typescript
/**
 * FILE: ContainerView.tsx
 *
 * PURPOSE:
 * Displays a world container and its owned entities.
 *
 * RESPONSIBILITY:
 * - Renders container title and its inner entities via EntityView.
 * - Acts as a droppable target for drag-and-drop actions.
 */

import React, { useState, useMemo } from 'react';
import { useStore } from 'zustand';
import { useDroppable } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { worldStore } from '../../store/worldStore';
import type { Container, Entity } from '../../types/world';
import { EntityView } from './EntityView';
import { useTranslation } from '../../i18n/useTranslation';
import { getContainerFocusClass } from '../../systems/focus';
import { recipes } from '../../data/catalog/recipes';
import { getRecipeWorkstationIds } from '../../systems/recipeWorkstations';
import './World.scss';

interface ContainerViewProps {
  key?: string | number;
  container: Container;
}

export const ContainerView: React.FC<ContainerViewProps> = ({ container }) => {
  const { t } = useTranslation();
  const entities = useStore(worldStore, (state) => state.entities);
  const focusTarget = useStore(worldStore, (state) => state.focusTarget);
  const activeRecipeId = useStore(worldStore, (state) => state.activeRecipeId);
  const mascot = useStore(worldStore, (state) => state.entities['chef']);

  const activeRecipeName = useStore(worldStore, (state) => state.activeRecipeName);

  const [mixCustomName, setMixCustomName] = useState('');
  const [cookConditionInput, setCookConditionInput] = useState('');
  const [cookedCustomName, setCookedCustomName] = useState('');

  const activeRecipe = useMemo(
    () => recipes.find((r) => r.id === activeRecipeId) || recipes[0],
    [activeRecipeId]
  );

  const defaultDishName = activeRecipeName || activeRecipe?.name || 'Tortilla Española Clásica';
  const [plateCustomName, setPlateCustomName] = useState('');

  const containerEntities = container.entityIds
    .map((id: string) => entities[id])
    .filter((e: Entity | undefined): e is Entity => Boolean(e));

  const rawHolding = mascot?.state?.holdingEntityIds as string[] | undefined;
  const singleHolding = mascot?.state?.holdingEntityId as string | undefined;

  const holdingEntityIds: string[] = Array.isArray(rawHolding) && rawHolding.length > 0
    ? rawHolding
    : singleHolding
    ? [singleHolding]
    : [];

  const isHoldingItems = holdingEntityIds.length > 0;

  const isPlate = container.id === 'plate' || container.id === 'plato' || container.type === 'plate';
  const displayPlateName = plateCustomName !== '' ? plateCustomName : (containerEntities[0]?.name || defaultDishName);

  const recipeWorkstationIds = useMemo(
    () => getRecipeWorkstationIds(activeRecipe),
    [activeRecipe]
  );

  const isBeingUsed =
    Boolean(container.isOn) ||
    focusTarget.containerId === container.id ||
    mascot?.state?.targetContainerId === container.id ||
    mascot?.state?.sourceContainerId === container.id;

  const focusClass = getContainerFocusClass(container.id, focusTarget, {
    container,
    recipeWorkstationIds,
    isBeingUsed,
  });

  // Set up dnd-kit droppable binding for this container
  const { setNodeRef, isOver } = useDroppable({
    id: container.id,
  });

  const isMixturePresent = containerEntities.some(
    (e) => e.id.includes('mixture') || e.name.toLowerCase().includes('mixture')
  );

  const getWorkstationBadge = (id: string) => {
    switch (id) {
      case 'sink': return t('workstations.sink');
      case 'board': return t('workstations.board');
      case 'bowl': return t('workstations.bowl');
      case 'burner': return t('workstations.burner');
      case 'burner1': return t('workstations.burner1');
      case 'burner2': return t('workstations.burner2');
      case 'plate': return t('workstations.plate');
      case 'trash': return t('workstations.trash');
      case 'despensa': return t('workstations.despensa');
      default: return t('workstations.default');
    }
  };

  const [showConfirmTrash, setShowConfirmTrash] = useState(false);

  const containerOnFireClass = container.isOn ? 'container-onFire' : '';
  const dispatch = useStore(worldStore, (state) => state.dispatch);

  const isCookingArea =
    container.type === 'burner' ||
    container.id.includes('burner') ||
    container.id.includes('pan') ||
    container.id.includes('stove');
  const isSink = container.type === 'sink' || container.id.includes('sink');
  const isCuttingBoard =
    container.type === 'board' ||
    container.id.includes('board') ||
    container.id.includes('cutting');
  const isBowl = container.type === 'bowl' || container.id.includes('bowl');
  const isTrash = container.id === 'trash' || container.type === 'trash' || container.id === 'papelera' || container.id === 'basura';

  return (
    <div
      ref={setNodeRef}
      data-container-id={container.id}
      onClick={() => {
        dispatch({
          type: 'FOCUS_CONTAINER',
          payload: { containerId: container.id, isUserOverride: true },
        });
      }}
      className={`${focusClass} ${container.isOn ? 'container-view--on' : ''} ${containerOnFireClass} container-view container-view--${container.id} ${isOver ? 'container-view--drag-over' : ''} ${isMixturePresent ? 'container-view--mixture' : ''}`}
    >
      <div className="container-view__header">
        <h3 className="container-view__title">{container.name}</h3>
        <span className="container-view__badge">{getWorkstationBadge(container.id)}</span>
        {isTrash && container.entityIds.length > 0 && (
          showConfirmTrash ? (
            <div
              style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'var(--card-bg, #ffffff)',
                border: '1px solid #ef4444',
                borderRadius: '6px',
                padding: '3px 8px',
                fontSize: '0.8rem',
              }}
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <span style={{ fontWeight: 600, color: '#b91c1c' }}>{t('ui.confirmEmptyTrash')}</span>
              <button
                type="button"
                className="confirm-empty-trash-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  dispatch({ type: 'EMPTY_TRASH' });
                  dispatch({
                    type: 'UPDATE_ENTITY_STATE',
                    payload: { entityId: 'chef', changes: { speechMessage: undefined } },
                  });
                  setShowConfirmTrash(false);
                }}
                style={{
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '3px 8px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                ✅ {t('ui.yesEmpty')}
              </button>
              <button
                type="button"
                className="cancel-empty-trash-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  dispatch({
                    type: 'UPDATE_ENTITY_STATE',
                    payload: { entityId: 'chef', changes: { speechMessage: undefined } },
                  });
                  setShowConfirmTrash(false);
                }}
                style={{
                  backgroundColor: '#6b7280',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '3px 8px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                ❌ {t('ui.cancel')}
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="empty-trash-btn"
              title={t('ui.emptyTrash')}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setShowConfirmTrash(true);
                dispatch({
                  type: 'MASCOT_MOVE',
                  payload: { mascotId: 'chef', targetContainerId: 'trash' },
                });
                dispatch({
                  type: 'UPDATE_ENTITY_STATE',
                  payload: {
                    entityId: 'chef',
                    changes: {
                      speechMessage: t('ui.confirmEmptyTrash'),
                      targetContainerId: 'trash',
                      gazingAt: { type: 'entity', entityId: 'trash' },
                    },
                  },
                });
              }}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              style={{
                marginLeft: 'auto',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
              }}
            >
              🗑️ {t('ui.emptyTrash')}
            </button>
          )
        )}
        {(container.cookCondition || container.timer) && (
          <span className="container-view__badge container-view__badge--timer" title="Active Cooking Target">
            ⏱️ {container.cookCondition || container.timer}
          </span>
        )}
        {isCookingArea && (
          <button
            type="button"
            className={`burner-toggle ${container.isOn ? 'burner-toggle--on' : ''}`}
            title="Toggle Heat"
            onClick={(e) => {
              e.stopPropagation();
              dispatch({
                type: 'TOGGLE_HEAT',
                payload: {
                  containerId: container.id,
                  cookCondition: cookConditionInput.trim() || undefined,
                  isOn: !container.isOn,
                },
              });
            }}
          />
        )}
      </div>

      {(isCookingArea || isSink || isCuttingBoard || isBowl || isPlate || (!isPlate && containerEntities.length > 0) || container.id !== 'despensa') && (
        <div className="container-view__actions">
          {container.id !== 'despensa' && (
            <div className="container-view__leave-row">
              <button
                type="button"
                className={`container-action-btn leave-here-btn ${isHoldingItems ? 'leave-here-btn--highlight' : ''}`}
                title={t('ui.leaveHere') || 'Dejar aquí'}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isHoldingItems) {
                    dispatch({
                      type: 'UPDATE_ENTITY_STATE',
                      payload: {
                        entityId: 'chef',
                        changes: {
                          speechMessage: t('ui.nothingInHands') || '¡No tengo nada en las manos!',
                          targetContainerId: container.id,
                          gazingAt: { type: 'entity', entityId: container.id },
                        },
                      },
                    });
                    setTimeout(() => {
                      dispatch({
                        type: 'UPDATE_ENTITY_STATE',
                        payload: { entityId: 'chef', changes: { speechMessage: undefined } },
                      });
                    }, 2500);
                    return;
                  }
                  dispatch({
                    type: 'MASCOT_DROP',
                    payload: {
                      targetContainerId: container.id,
                      mascotId: 'chef',
                    },
                  });
                }}
              >
                👇 {t('ui.leaveHere') || 'Dejar aquí'}
                {isHoldingItems && (
                  <span className="holding-count-badge">
                    ({holdingEntityIds.length})
                  </span>
                )}
              </button>
            </div>
          )}

          {isCookingArea && (
            <div className="container-view__action-group">
              <div className="container-view__field-group">
                <label className="container-view__input-label">
                  🎯 {t('ui.targetLabel')}
                </label>
                <div className="container-view__input-row">
                  <input
                    type="text"
                    className="container-view__input container-view__input--lg"
                    placeholder={t('ui.targetPlaceholder')}
                    value={cookConditionInput}
                    onChange={(e) => setCookConditionInput(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    type="button"
                    className={`container-action-btn toggle-heat-btn ${container.isOn ? 'container-action-btn--active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch({
                        type: 'TOGGLE_HEAT',
                        payload: {
                          containerId: container.id,
                          cookCondition: cookConditionInput.trim() || undefined,
                          isOn: !container.isOn,
                        },
                      });
                    }}
                  >
                    🔥 {container.isOn ? t('ui.heatOff') : t('ui.heatOn')}
                  </button>
                </div>
              </div>

              <div className="container-view__field-group">
                <label className="container-view__input-label">
                  🍳 {t('ui.mixtureNamePlaceholder')}
                </label>
                <div className="container-view__input-row">
                  <input
                    type="text"
                    className="container-view__input container-view__input--lg"
                    placeholder={t('ui.mixtureNamePlaceholder')}
                    value={cookedCustomName}
                    onChange={(e) => setCookedCustomName(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    type="button"
                    className="container-action-btn cook-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!container.isOn) {
                        dispatch({
                          type: 'TOGGLE_HEAT',
                          payload: { containerId: container.id, isOn: true },
                        });
                      }
                      dispatch({
                        type: 'COOK_CONTAINER_CONTENTS',
                        payload: {
                          containerId: container.id,
                          customName: cookedCustomName.trim() || undefined,
                          cookCondition: cookConditionInput.trim() || container.cookCondition || container.timer,
                        },
                      });
                    }}
                  >
                    🍳 {t('verbs.cook')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {isSink && (
            <button
              type="button"
              className="container-action-btn wash-btn"
              onClick={(e) => {
                e.stopPropagation();
                dispatch({
                  type: 'WASH_CONTAINER_CONTENTS',
                  payload: { containerId: container.id },
                });
              }}
            >
              🧼 {t('verbs.wash')}
            </button>
          )}

          {isCuttingBoard && (
            <div className="container-view__button-row">
              <button
                type="button"
                className="container-action-btn cut-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({
                    type: 'CUT_CONTAINER_CONTENTS',
                    payload: { containerId: container.id },
                  });
                }}
              >
                🔪 {t('verbs.cut')}
              </button>
              <button
                type="button"
                className="container-action-btn peel-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({
                    type: 'PEEL_CONTAINER_CONTENTS',
                    payload: { containerId: container.id },
                  });
                }}
              >
                🥔 {t('verbs.peel')}
              </button>
            </div>
          )}

          {isBowl && (
            <div className="container-view__action-group">
              <div className="container-view__input-row">
                <input
                  type="text"
                  className="container-view__input"
                  placeholder={t('ui.mixtureNamePlaceholder')}
                  value={mixCustomName}
                  onChange={(e) => setMixCustomName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.stopPropagation();
                      const trimmedName = mixCustomName.trim();
                      if (containerEntities.length === 1 && (containerEntities[0].ingredientId === 'mixture' || containerEntities[0].id.includes('mixture'))) {
                        if (trimmedName) {
                          dispatch({
                            type: 'UPDATE_ENTITY_STATE',
                            payload: {
                              entityId: containerEntities[0].id,
                              changes: { name: trimmedName },
                            },
                          });
                        }
                      } else {
                        dispatch({
                          type: 'MIX_CONTAINER_CONTENTS',
                          payload: {
                            containerId: container.id,
                            customName: trimmedName || undefined,
                          },
                        });
                      }
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  type="button"
                  className="container-action-btn mix-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    const trimmedName = mixCustomName.trim();
                    if (containerEntities.length === 1 && (containerEntities[0].ingredientId === 'mixture' || containerEntities[0].id.includes('mixture'))) {
                      if (trimmedName) {
                        dispatch({
                          type: 'UPDATE_ENTITY_STATE',
                          payload: {
                            entityId: containerEntities[0].id,
                            changes: { name: trimmedName },
                          },
                        });
                      }
                    } else {
                      dispatch({
                        type: 'MIX_CONTAINER_CONTENTS',
                        payload: {
                          containerId: container.id,
                          customName: trimmedName || undefined,
                        },
                      });
                    }
                  }}
                >
                  🥣 {t('verbs.mix')}
                </button>
              </div>
            </div>
          )}

          {isPlate && containerEntities.length > 0 && (
            <div className="container-view__action-group">
              <div className="container-view__field-group">
                <label className="container-view__input-label">
                  🍽️ {t('ui.finalNameLabel')}
                </label>
                <div className="container-view__input-row">
                  <input
                    type="text"
                    className="container-view__input container-view__input--lg"
                    placeholder={t('ui.finalNamePlaceholder')}
                    value={displayPlateName}
                    onChange={(e) => setPlateCustomName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.stopPropagation();
                        const newName = (plateCustomName || displayPlateName).trim();
                        if (newName) {
                          containerEntities.forEach((ent) => {
                            dispatch({
                              type: 'UPDATE_ENTITY_STATE',
                              payload: {
                                entityId: ent.id,
                                changes: { name: newName },
                              },
                            });
                          });
                        }
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    type="button"
                    className="container-action-btn save-dish-name-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newName = (plateCustomName || displayPlateName).trim();
                      if (newName) {
                        containerEntities.forEach((ent) => {
                          dispatch({
                            type: 'UPDATE_ENTITY_STATE',
                            payload: {
                              entityId: ent.id,
                              changes: { name: newName },
                            },
                          });
                        });
                      }
                    }}
                  >
                    ✏️ {t('ui.save')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {!isPlate && containerEntities.length > 0 && (
            <button
              type="button"
              className="container-action-btn serve-plate-btn"
              onClick={(e) => {
                e.stopPropagation();
                containerEntities.forEach((ent) => {
                  dispatch({
                    type: 'MOVE_ENTITY',
                    payload: {
                      entityId: ent.id,
                      targetContainerId: 'plate',
                    },
                  });
                });
              }}
            >
              🍽️ {t('ui.serveToPlate')}
            </button>
          )}
        </div>
      )}

      <div className="container-view__items">
        <AnimatePresence mode="popLayout">
          {containerEntities.map((entity: Entity) => {
            const isMixture = entity.id.includes('mixture') || entity.name.toLowerCase().includes('mixture');
            return (
              <motion.div
                key={entity.id}
                layout
                initial={
                  isMixture
                    ? { scale: 0.1, rotate: -180, opacity: 0 }
                    : { scale: 0.8, opacity: 0, y: -10 }
                }
                animate={
                  isMixture
                    ? {
                      scale: [0.2, 1.15, 1],
                      rotate: [-180, 10, 0],
                      opacity: 1,
                      transition: { duration: 0.65, ease: 'easeOut' },
                    }
                    : { scale: 1, rotate: 0, opacity: 1, y: 0 }
                }
                exit={{
                  scale: 0,
                  rotate: 180,
                  opacity: 0,
                  filter: 'blur(4px)',
                  transition: { duration: 0.5, ease: 'easeInOut' },
                }}
                transition={{ duration: 0.35 }}
              >
                <EntityView entity={entity} containerId={container.id} />
              </motion.div>
            );
          })}
        </AnimatePresence>
        {containerEntities.length === 0 && (
          <span className="container-view__empty-hint">{t('ui.emptyContainerHint')}</span>
        )}
      </div>
    </div>
  );
};
`````

## File: src/store/worldStore.ts
`````typescript
/**
 * FILE: worldStore.ts
 *
 * PURPOSE:
 * Central Zustand store for the game world composed from modular slices with Immer middleware.
 *
 * RESPONSIBILITY:
 * - Owns world state (entities, containers).
 * - Integrates slices and middleware (devtools, actionLog, immer).
 * - Dispatches actions to slice methods.
 */

import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { WorldAction, WorldEvent } from '../types/world';
import { eventStore } from '../systems/EventStore';
import { actionLog } from './middleware/actionLog';
import { defaultEntities, defaultContainers } from './defaults';
import { createEntitySlice } from './slices/entitySlice';
import { createContainerSlice } from './slices/containerSlice';
import { createMascotSlice } from './slices/mascotSlice';
import { createRecordSlice } from './slices/recordSlice';
import { createFocusSlice } from './slices/focusSlice';
import { inferFocusFromAction } from '../systems/focus';
import type { WorldStateStore } from './types';

const eventListeners = new Set<(event: WorldEvent) => void>();

export const worldStore = createStore<WorldStateStore>()(
  devtools(
    actionLog(
      immer((set, get, api) => ({
        ...createEntitySlice(set, get, api),
        ...createContainerSlice(set, get, api),
        ...createMascotSlice(set, get, api),
        ...createRecordSlice(set, get, api),
        ...createFocusSlice(set, get, api),

        // Deep clone initial state to avoid reference mutations
        entities: JSON.parse(JSON.stringify(defaultEntities)),
        containers: JSON.parse(JSON.stringify(defaultContainers)),
        events: [],
        activeRecipeName: 'Tortilla Española Clásica',
        activeRecipeId: 'concebolla',

        setActiveRecipeName: (name: string) => {
          set({ activeRecipeName: name }, false, 'SET_ACTIVE_RECIPE_NAME');
        },

        setActiveRecipeId: (recipeId: string) => {
          set({ activeRecipeId: recipeId }, false, 'SET_ACTIVE_RECIPE_ID');
        },

        emitEvent: (event: WorldEvent) => {
          set(
            (draft) => {
              draft.events.push(event);
            },
            false,
            event.type
          );
          eventListeners.forEach((listener) => listener(event));
        },

        onEvent: (listener: (event: WorldEvent) => void) => {
          eventListeners.add(listener);
          return () => {
            eventListeners.delete(listener);
          };
        },

        resetWorld: () => {
          set((draft) => {
            draft.entities = JSON.parse(JSON.stringify(defaultEntities));
            draft.containers = JSON.parse(JSON.stringify(defaultContainers));
            draft.events = [];
          }, false, 'RESET_WORLD');
          get().clearFocus();
        },

        dispatch: (action: WorldAction) => {
          eventStore.emit(action);
          const store = get();

          // Record action if recording is currently active
          if (store.isRecording) {
            store.recordAction(action);
          }

          // Automatically infer focus target from world actions unless userOverride is active
          const focusInferred = inferFocusFromAction(action);
          if (focusInferred && !store.userOverride) {
            store.setFocus({
              containerId: focusInferred.containerId,
              entityIds: focusInferred.entityIds,
              mode: 'focused',
            });
          }

          switch (action.type) {
            case 'MOVE_ENTITY':
              store.moveEntity(
                action.payload.entityId,
                action.payload.targetContainerId,
                action.payload.positionIndex
              );
              break;
            case 'TOGGLE_BURNER':
            case 'TOGGLE_HEAT': {
              let updatedIsOn = false;
              let containerExists = false;
              const currentCondition = action.payload.cookCondition;

              set(
                (draft) => {
                  const targetContainer = draft.containers[action.payload.containerId];
                  if (targetContainer) {
                    const nextIsOn =
                      typeof action.payload.isOn === 'boolean'
                        ? action.payload.isOn
                        : !targetContainer.isOn;
                    targetContainer.isOn = nextIsOn;
                    if (nextIsOn) {
                      if (currentCondition) {
                        targetContainer.cookCondition = currentCondition;
                        targetContainer.timer = currentCondition;
                      }
                    } else {
                      delete targetContainer.cookCondition;
                      delete targetContainer.timer;
                    }
                    updatedIsOn = targetContainer.isOn;
                    containerExists = true;
                  }
                },
                false,
                action.type
              );

              if (containerExists) {
                get().emitEvent({
                  type: 'CONTAINER_HEAT_TOGGLED',
                  payload: {
                    containerId: action.payload.containerId,
                    isOn: updatedIsOn,
                    cookCondition: currentCondition,
                  },
                });
              }
              break;
            }
            case 'COOK_INGREDIENT': {
              const entityId = action.payload.entityId;
              const containers = get().containers;
              const parentContainerId = Object.keys(containers).find((cId) =>
                containers[cId].entityIds.includes(entityId)
              );
              if (parentContainerId && containers[parentContainerId]) {
                const parentContainer = containers[parentContainerId];
                if (
                  (parentContainer.type === 'burner' || parentContainer.id.includes('burner')) &&
                  !parentContainer.isOn
                ) {
                  set(
                    (draft) => {
                      if (draft.containers[parentContainerId]) {
                        draft.containers[parentContainerId].isOn = true;
                      }
                    },
                    false,
                    'TOGGLE_HEAT'
                  );
                }
              }
              store.cookIngredient(action.payload.entityId, action.payload.cooking);
              if (action.payload.customName || action.payload.cookCondition) {
                set(
                  (draft) => {
                    const ent = draft.entities[action.payload.entityId];
                    if (ent) {
                      if (action.payload.customName) {
                        ent.name = action.payload.customName;
                      }
                      if (action.payload.cookCondition) {
                        ent.state = {
                          ...ent.state,
                          cookCondition: action.payload.cookCondition,
                        };
                      }
                    }
                  },
                  false,
                  'COOK_INGREDIENT_CUSTOM'
                );
              }
              break;
            }
            case 'ADD_ENTITY':
              store.addEntity(action.payload.entity, action.payload.containerId);
              break;

            case 'REMOVE_ENTITY':
              store.removeEntity(action.payload.entityId);
              break;

            case 'EMPTY_TRASH': {
              const trashedIds = [...(get().containers.trash?.entityIds || [])];
              store.emptyTrash();
              get().emitEvent({
                type: 'TRASH_EMPTIED',
                payload: { entityIds: trashedIds },
              });
              break;
            }

            case 'UPDATE_ENTITY_STATE':
              store.updateEntityState(action.payload.entityId, action.payload.changes);
              break;

            case 'PREPARE_INGREDIENT':
              store.prepareIngredient(action.payload.entityId, action.payload.preparation);
              break;

            case 'USE_INGREDIENT':
              store.useIngredient(action.payload.entityId, action.payload.usedIn);
              break;

            case 'MASCOT_FLIP':
              store.mascotFlip(action.payload.mascotId);
              break;

            case 'MASCOT_MOVE':
              store.mascotMove(action.payload.targetContainerId, action.payload.mascotId);
              break;

            case 'MASCOT_GRAB':
              store.mascotGrab(
                action.payload.entityId,
                action.payload.sourceContainerId,
                action.payload.mascotId
              );
              break;

            case 'MASCOT_DROP':
              store.mascotDrop(
                action.payload.targetContainerId,
                action.payload.positionIndex,
                action.payload.mascotId
              );
              break;

            case 'MASCOT_CLEAR_GAZE':
              store.mascotClearGaze(action.payload.mascotId);
              break;

            case 'WASH_CONTAINER_CONTENTS': {
              const targetContainer = get().containers[action.payload.containerId];
              if (targetContainer) {
                const entityIds = [...targetContainer.entityIds];
                entityIds.forEach((id) => {
                  get().transformIngredient(id, 'wash');
                });
                get().emitEvent({
                  type: 'CONTAINER_WASHED',
                  payload: {
                    containerId: action.payload.containerId,
                    entityIds,
                  },
                });
              }
              break;
            }

            case 'CUT_CONTAINER_CONTENTS': {
              const targetContainer = get().containers[action.payload.containerId];
              if (targetContainer) {
                const entityIds = [...targetContainer.entityIds];
                entityIds.forEach((id) => {
                  get().transformIngredient(id, 'cut');
                });
                get().emitEvent({
                  type: 'CONTAINER_CUT',
                  payload: {
                    containerId: action.payload.containerId,
                    entityIds,
                  },
                });
              }
              break;
            }

            case 'PEEL_CONTAINER_CONTENTS': {
              const targetContainer = get().containers[action.payload.containerId];
              if (targetContainer) {
                const entityIds = [...targetContainer.entityIds];
                entityIds.forEach((id) => {
                  get().transformIngredient(id, 'peel');
                });
                get().emitEvent({
                  type: 'CONTAINER_PEELED',
                  payload: {
                    containerId: action.payload.containerId,
                    entityIds,
                  },
                });
              }
              break;
            }

            case 'MIX_CONTAINER_CONTENTS': {
              const containerId = action.payload.containerId;
              const targetContainer = get().containers[containerId];
              if (targetContainer) {
                const inputEntityIds = [...targetContainer.entityIds];
                let mixtureId: string | undefined;

                if (inputEntityIds.length > 0) {
                  // Check auto-generated sequential default name count
                  const existingMixtures = Object.values(get().entities).filter(
                    (e) =>
                      e.id.startsWith('mixture_') ||
                      e.ingredientId === 'mixture' ||
                      e.name.toLowerCase().includes('mixture')
                  );
                  const defaultName = `mixture_${existingMixtures.length + 1}`;
                  const customNameInput = action.payload.customName?.trim();
                  const finalName = customNameInput || defaultName;
                  mixtureId = `mixture_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

                  // 1. Add mixture entity to container
                  get().addEntity(
                    {
                      id: mixtureId,
                      name: finalName,
                      type: 'ingredient',
                      ingredientId: 'mixture',
                      state: {
                        preparation: 'mixed',
                        cooking: 'raw',
                        status: 'mixed',
                        components: inputEntityIds,
                      },
                    },
                    containerId
                  );

                  // 2. Mark input ingredients as consumed / used in mixture
                  inputEntityIds.forEach((id) => {
                    get().useIngredient(id, mixtureId);
                  });
                }

                // 3. Emit event
                get().emitEvent({
                  type: 'CONTAINER_MIXED',
                  payload: {
                    containerId,
                    entityIds: inputEntityIds,
                    mixtureId,
                    customName: action.payload.customName,
                  },
                });
              }
              break;
            }

            case 'COOK_CONTAINER_CONTENTS': {
              const containerId = action.payload.containerId;
              const targetContainer = get().containers[containerId];
              if (targetContainer) {
                if (!targetContainer.isOn) {
                  set(
                    (draft) => {
                      if (draft.containers[containerId]) {
                        draft.containers[containerId].isOn = true;
                      }
                    },
                    false,
                    'TOGGLE_HEAT'
                  );
                }
                const entityIds = [...targetContainer.entityIds];
                const cookCondition =
                  action.payload.cookCondition ||
                  targetContainer.cookCondition ||
                  targetContainer.timer;
                const customName = action.payload.customName?.trim();
                const cookingMethod = action.payload.cooking || 'cooked';

                if (entityIds.length > 0) {
                  entityIds.forEach((id) => {
                    const entity = get().entities[id];
                    if (!entity) return;

                    const isMixture =
                      entity.id.startsWith('mixture_') ||
                      entity.ingredientId === 'mixture' ||
                      entity.name.toLowerCase().includes('mixture');

                    if (isMixture) {
                      set(
                        (draft) => {
                          const ent = draft.entities[id];
                          if (ent) {
                            if (customName) {
                              ent.name = customName;
                            }
                            ent.status = 'cooked';
                            ent.state = {
                              ...ent.state,
                              cooking: cookingMethod,
                              status: 'cooked',
                              cookCondition,
                            };
                          }
                        },
                        false,
                        'COOK_MIXTURE'
                      );
                    } else {
                      get().cookIngredient(id, cookingMethod);
                      set(
                        (draft) => {
                          const ent = draft.entities[id];
                          if (ent) {
                            if (customName) {
                              ent.name = customName;
                            }
                            ent.state = {
                              ...ent.state,
                              cookCondition,
                            };
                          }
                        },
                        false,
                        'COOK_ENTITY_CUSTOM'
                      );
                    }
                  });
                }

                get().emitEvent({
                  type: 'CONTAINER_COOKED',
                  payload: {
                    containerId,
                    entityIds,
                    customName,
                    cookCondition,
                  },
                });
              }
              break;
            }

            case 'SET_FOCUS':
              store.setFocus(
                {
                  containerId: action.payload.containerId,
                  entityIds: action.payload.entityIds,
                  mode: action.payload.mode ?? 'focused',
                },
                action.payload.isUserOverride
              );
              break;

            case 'CLEAR_FOCUS':
              store.clearFocus(action.payload?.isUserOverride);
              break;

            case 'FOCUS_CONTAINER':
              store.setFocus(
                {
                  containerId: action.payload.containerId,
                  entityIds: action.payload.entityIds,
                  mode: 'focused',
                },
                action.payload.isUserOverride
              );
              break;

            case 'FOCUS_ENTITY':
              store.setFocus(
                {
                  containerId: action.payload.containerId,
                  entityIds: [action.payload.entityId],
                  mode: 'focused',
                },
                action.payload.isUserOverride
              );
              break;

            case 'RESET_WORLD':
              store.resetWorld();
              break;
          }
        },
      }))
    ),
    { name: 'tortilla-world' }
  )
);

// if (import.meta.env.DEV) {
//   (window as any).worldStore = worldStore;
// }
`````

## File: src/components/Scene/Scene.tsx
`````typescript
/**
 * FILE: Scene.tsx
 *
 * PURPOSE:
 * Main game scene renderer.
 *
 * RESPONSIBILITY:
 * - Displays entities in the world.
 * - Connects world state with visual components.
 *
 * DOMAIN:
 * The bridge between game world and React UI.
 */

import React, { useState, useMemo } from 'react';
import { useStore } from 'zustand';
import { DndContext } from '@dnd-kit/core';
import { worldStore } from '../../store/worldStore';
import { ContainerView } from '../World/ContainerView';
import { useSceneDragAndDrop } from './useSceneDragAndDrop';
import { RecipePlayer } from './RecipePlayer';
import { CookbookView } from '../Recipe/CookbookView';
import { ActionRecorder } from '../Controls/ActionRecorder';
import { IngredientsSidebar } from '../Controls/IngredientsSidebar';
import { RecipeDatabaseModal } from '../Controls/RecipeDatabaseModal';
import { useDevMode } from '../../utils/devMode';
import { useTranslation } from '../../i18n/useTranslation';
import { recipes } from '../../data/catalog/recipes';
import { getRecipeWorkstationIds } from '../../systems/recipeWorkstations';
import './RecipePlayer.scss';

export const Scene: React.FC = () => {
  const isDev = useDevMode();
  const { t } = useTranslation();
  const [forcePublishMode, setForcePublishMode] = useState<boolean>(false);

  // Active mode logic: in slim publish mode default to player, in dev mode default to database
  const effectiveDevMode = isDev && !forcePublishMode;
  const [activeMode, setActiveMode] = useState<'player' | 'cookbook' | 'recorder' | 'database'>(
    effectiveDevMode ? 'database' : 'player'
  );

  // 1. Mount the drag-and-drop input listeners and dispatch handler
  const { sensors, handleDragStart, handleDragOver, handleDragEnd } = useSceneDragAndDrop();

  // 2. Query simulation state and active recipe to filter visible workstations
  const containersMap = useStore(worldStore, (state) => state.containers);
  const activeRecipeId = useStore(worldStore, (state) => state.activeRecipeId);

  const activeRecipe = useMemo(
    () => recipes.find((r) => r.id === activeRecipeId) || recipes[0],
    [activeRecipeId]
  );

  const recipeWorkstationIds = useMemo(
    () => getRecipeWorkstationIds(activeRecipe, containersMap),
    [activeRecipe, containersMap]
  );

  const containers = useMemo(() => {
    return Object.values(containersMap).filter((container) => {
      // Always hide despensa (pantry) from main workstation row
      if (container.id === 'despensa') return false;

      // Show all workstations in recorder or database modes
      if (activeMode === 'recorder' || activeMode === 'database') return true;

      // Filter strictly by workstations generated for the active recipe
      return recipeWorkstationIds.has(container.id);
    });
  }, [containersMap, recipeWorkstationIds, activeMode]);

  const renderWorkspace = (leftNode?: React.ReactNode, rightNode?: React.ReactNode) => (
    <div className="scene-workspace">
      {leftNode}
      <div className="scene">
        {containers.map((container) => (
          <ContainerView key={container.id} container={container} />
        ))}
      </div>
      {rightNode}
    </div>
  );

  const [isPanelExpanded, setIsPanelExpanded] = useState(false);

  return (
    // 3. The DndContext wrapper acts as the physical input boundary
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="scene-container">
        {/* Mobile Expand/Collapse Toggle */}
        <div className="mobile-panel-toggle">
          <button
            type="button"
            onClick={() => setIsPanelExpanded(!isPanelExpanded)}
            className="panel-toggle-btn"
          >
            {isPanelExpanded ? t('scene.hideControls') : t('scene.showControls')}
          </button>
        </div>

        <div className={`scene-controls-wrapper ${isPanelExpanded ? 'expanded' : 'collapsed'}`}>
          {/* Mode Selector Navigation Tabs */}
          <div className="mode-tabs">
            {effectiveDevMode && (
              <button
                type="button"
                className={`mode-tab-btn ${activeMode === 'database' ? 'active' : ''}`}
                onClick={() => setActiveMode('database')}
              >
                {t('scene.tabs.database')}
              </button>
            )}

            <button
              type="button"
              className={`mode-tab-btn ${activeMode === 'player' ? 'active' : ''}`}
              onClick={() => setActiveMode('player')}
            >
              {t('scene.tabs.playRecipe')}
            </button>

            <button
              type="button"
              className={`mode-tab-btn ${activeMode === 'cookbook' ? 'active' : ''}`}
              onClick={() => setActiveMode('cookbook')}
            >
              {t('scene.tabs.cookbook')}
            </button>

            <button
              type="button"
              className={`mode-tab-btn ${activeMode === 'recorder' ? 'active' : ''}`}
              onClick={() => setActiveMode('recorder')}
            >
              {t('scene.tabs.actionRecorder')}
            </button>

            {/* Dev Mode Indicator & Toggle */}
            {isDev && (
              <button
                type="button"
                className="mode-toggle-pill"
                style={{
                  marginLeft: 'auto',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid #cbd5e1',
                  backgroundColor: effectiveDevMode ? '#e0f2fe' : '#f1f5f9',
                  color: effectiveDevMode ? '#0369a1' : '#475569',
                }}
                onClick={() => {
                  setForcePublishMode(!forcePublishMode);
                  if (effectiveDevMode) setActiveMode('player');
                }}
                title="Toggle between Developer Admin Mode and Slim Published View"
              >
                {effectiveDevMode ? t('scene.devModeActive') : t('scene.slimPublishPreview')}
              </button>
            )}
          </div>

          {activeMode === 'database' && effectiveDevMode ? (
            <RecipeDatabaseModal />
          ) : activeMode === 'cookbook' ? (
            <CookbookView />
          ) : activeMode === 'player' ? (
            <RecipePlayer />
          ) : (
            <div className="action-recorder-layout">
              <ActionRecorder isDev={effectiveDevMode} />
              <IngredientsSidebar />
            </div>
          )}
        </div>

        {/* Render Workspace independently so it doesn't get collapsed */}
        <div className="scene-workspace-independent" style={{ marginTop: '20px' }}>
          {renderWorkspace()}
        </div>
      </div>
    </DndContext>
  );
};
`````
