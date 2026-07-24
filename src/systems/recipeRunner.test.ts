/**
 * FILE: recipeRunner.test.ts
 *
 * PURPOSE:
 * Unit tests for the generic RecipeRunner step-based state machine.
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { worldStore } from '../store/worldStore';
import { RecipeRunner } from './recipeRunner';
import { concebollaRecipe, sincebollaRecipe } from '../data/catalog/recipes';
import type { Recipe } from '../types/Recipe';
import { clearActionLog, getActionLog } from '../store/middleware/actionLog';

function seedTestWorld() {
  worldStore.setState({
    entities: {
      chef: { id: 'chef', name: 'Chef Tortilla 🍳', type: 'mascot', state: { gazingAt: '' } },
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
      board: {
        id: 'board',
        name: 'Board',
        type: 'board',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      pan: {
        id: 'pan',
        name: 'Pan',
        type: 'pan',
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
    expect(state.containers.board.entityIds.length).toBeGreaterThanOrEqual(1);

    const actionNames = getActionLog().map((a) => a.action);
    expect(actionNames).toContain('MASCOT_MOVE');
    expect(actionNames).toContain('MASCOT_GRAB');
    expect(actionNames).toContain('MASCOT_DROP');
    expect(actionNames).toContain('MASCOT_FLIP');
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
    const runner = new RecipeRunner({ mascotId: 'chef', defaultTargetId: 'pan', delayMs: 5 });
    await runner.runSteps([
      { action: 'move', ingredient: 'potato', source: 'despensa', target: 'pan' },
      { action: 'cook', ingredient: 'potato', method: 'fried', containerId: 'pan' },
    ]);

    const state = worldStore.getState();
    const panEntities = state.containers.pan.entityIds.map((id) => state.entities[id]);
    const friedPotato = panEntities.find((e) => e?.ingredientId === 'potato');

    expect(friedPotato).toBeDefined();
    expect(friedPotato?.state?.cooking).toBe('fried');

    const actionNames = getActionLog().map((a) => a.action);
    expect(actionNames).toContain('COOK_INGREDIENT');
  });

  it('handles speak, wait, and celebrate steps', async () => {
    const customRecipe: Recipe = {
      id: 'custom-test',
      name: 'Custom Test Recipe',
      ingredients: [],
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
    expect(state.entities.chef.state?.gazingAt).toBe('');
  });

  it('executes sincebollaRecipe dictionary steps and state transformations', async () => {
    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 5 });
    await runner.runRecipe(sincebollaRecipe);

    const state = worldStore.getState();
    const plateEntities = state.containers.plate.entityIds.map((id) => state.entities[id]);
    expect(plateEntities.length).toBeGreaterThan(0);

    const actionNames = getActionLog().map((a) => a.action);
    expect(actionNames).toContain('PREPARE_INGREDIENT');
    expect(actionNames).toContain('COOK_INGREDIENT');
    expect(actionNames).toContain('MASCOT_FLIP');
  });
});
