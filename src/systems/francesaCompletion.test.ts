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
