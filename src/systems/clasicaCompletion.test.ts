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

    // 3. Plato (plate) contains ONLY mixture
    expect(state.containers.plate.entityIds).toHaveLength(1);
    const servedEntityId = state.containers.plate.entityIds[0];
    const servedEntity = state.entities[servedEntityId];
    expect(servedEntity).toBeDefined();
    expect(servedEntity.name).toBe('mixture');

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
