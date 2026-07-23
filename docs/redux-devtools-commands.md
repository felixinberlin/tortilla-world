# Redux DevTools & Console Test Commands

This document lists test actions for Tortilla mascot automation that can be dispatched via **Redux DevTools** or directly in the **Browser Console**.

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

### Step 3: Move gaze to Tabla (Cutting Board)
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

## 2. Browser Console One-Liner Test Script

You can also test the full sequence directly in your Browser Developer Console (`F12` -> `Console`):

```js
// Run full sequence with 600ms delays in browser console
(async () => {
  const store = window.__ZUSTAND_STORE__ || (await import('/src/store/worldStore.ts')).worldStore;
  const dispatch = store.getState().dispatch;
  const wait = (ms) => new Promise(res => setTimeout(res, ms));

  console.log('1. Look at despensa');
  dispatch({ type: 'MASCOT_MOVE', payload: { mascotId: 'chef', targetContainerId: 'despensa' } });
  await wait(600);

  console.log('2. Grab potato');
  dispatch({ type: 'MASCOT_GRAB', payload: { mascotId: 'chef', entityId: 'potato', sourceContainerId: 'despensa' } });
  await wait(600);

  console.log('3. Look at tabla');
  dispatch({ type: 'MASCOT_MOVE', payload: { mascotId: 'chef', targetContainerId: 'board' } });
  await wait(600);

  console.log('4. Drop potato in tabla');
  dispatch({ type: 'MASCOT_DROP', payload: { mascotId: 'chef', targetContainerId: 'board' } });
  await wait(600);

  console.log('5. Flip Tortilla!');
  dispatch({ type: 'MASCOT_FLIP', payload: { mascotId: 'chef' } });
})();
```
