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
