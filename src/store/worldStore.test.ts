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
        rules: { allowedTypes: ['ingredient'], uniqueTypesOnly: true },
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
});
