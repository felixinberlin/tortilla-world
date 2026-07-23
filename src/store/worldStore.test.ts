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
        pan: {
          id: 'pan',
          name: 'Pan',
          type: 'pan',
          entityIds: [],
        },
      },
    });

    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'pan' },
    });

    const state = worldStore.getState();
    // Source container retains original entity
    expect(state.containers.pantry.entityIds).toEqual(['potato']);
    // Target container gets a copy instance
    expect(state.containers.pan.entityIds.length).toBe(1);
    const copyId = state.containers.pan.entityIds[0];
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
        pan: {
          id: 'pan',
          name: 'Pan',
          type: 'pan',
          entityIds: ['potato'],
        },
      },
    });

    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato_copy', targetContainerId: 'pan' },
    });

    const state = worldStore.getState();
    // Pan should still only have 1 potato because duplicate ingredient is blocked
    expect(state.containers.pan.entityIds).toEqual(['potato']);
  });
});
