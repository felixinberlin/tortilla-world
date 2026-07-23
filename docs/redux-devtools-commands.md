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

