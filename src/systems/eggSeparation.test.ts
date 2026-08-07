/**
 * FILE: src/systems/eggSeparation.test.ts
 *
 * PURPOSE:
 * Unit and integration tests for the egg separation process.
 *
 * VERIFIES:
 * - Direct dispatch of SEPARATE_CONTAINER_CONTENTS consumes the egg and spawns yolk and egg_white entities in the container.
 * - Running a recipe step with action 'separate' transforms the egg into yolk and egg_white.
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { worldStore } from '../store/worldStore';
import { RecipeRunner } from './recipeRunner';
import { loadRecipe } from './recipeLoader';

function seedTestWorld() {
  worldStore.setState({
    entities: {
      chef: { id: 'chef', name: 'Chef Tortilla 🍳', type: 'mascot', state: { gazingAt: null } },
      egg_1: { id: 'egg_1', ingredientId: 'egg', name: 'Egg', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
    },
    containers: {
      despensa: {
        id: 'despensa',
        name: 'Despensa',
        type: 'storage',
        entityIds: ['egg_1'],
        rules: { isImmutable: true },
      },
      bowl: {
        id: 'bowl',
        name: 'Bowl',
        type: 'bowl',
        entityIds: ['egg_1'],
        rules: {},
      },
    },
  });
}

describe('Egg Separation System', () => {
  beforeEach(() => {
    seedTestWorld();
  });

  it('should transform an egg into yolk and egg_white entities upon SEPARATE_CONTAINER_CONTENTS', () => {
    const bowlBefore = worldStore.getState().containers['bowl'];
    expect(bowlBefore.entityIds).toContain('egg_1');

    // Dispatch SEPARATE_CONTAINER_CONTENTS on bowl
    worldStore.getState().dispatch({
      type: 'SEPARATE_CONTAINER_CONTENTS',
      payload: { containerId: 'bowl' },
    });

    // 3. Verify original egg is marked consumed
    const eggEntity = worldStore.getState().entities['egg_1'];
    expect(eggEntity.state?.consumed).toBe(true);

    // 4. Verify bowl now contains yolk and egg_white entities
    const bowlAfter = worldStore.getState().containers['bowl'];
    const activeBowlEntities = bowlAfter.entityIds
      .map((id) => worldStore.getState().entities[id])
      .filter((e) => e && !e.state?.consumed);

    expect(activeBowlEntities.length).toBe(2);
    const yolk = activeBowlEntities.find((e) => e.ingredientId === 'yolk');
    const eggWhite = activeBowlEntities.find((e) => e.ingredientId === 'egg_white');

    expect(yolk).toBeDefined();
    expect(eggWhite).toBeDefined();
    expect(yolk?.state?.status).toBe('yolk');
    expect(eggWhite?.state?.status).toBe('egg-white');
  });

  it('should execute separate step in a recipe using RecipeRunner', async () => {
    const testRecipe = loadRecipe('egg_separation_test');
    expect(testRecipe).toBeDefined();

    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 1 });
    await runner.runRecipe(testRecipe);

    // Verify egg in bowl was separated into yolk and egg_white
    const bowl = worldStore.getState().containers['bowl'];
    const activeBowlEntities = bowl.entityIds
      .map((id) => worldStore.getState().entities[id])
      .filter((e) => e && !e.state?.consumed);

    expect(activeBowlEntities.length).toBe(2);
    expect(activeBowlEntities.some((e) => e.ingredientId === 'yolk')).toBe(true);
    expect(activeBowlEntities.some((e) => e.ingredientId === 'egg_white')).toBe(true);
  });
});
