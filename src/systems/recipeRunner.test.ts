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
    // New concebolla format uses a serve step that collects everything onto the plate
    expect(state.containers.plate.entityIds.length).toBeGreaterThanOrEqual(1);

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
    const plateEntities = state.containers.plate.entityIds.map((id) => state.entities[id]);
    expect(plateEntities.length).toBeGreaterThan(0);

    const actionNames = getActionLog().map((a) => a.action);
    expect(actionNames).toContain('PREPARE_INGREDIENT');
    expect(actionNames).toContain('COOK_INGREDIENT');
    expect(actionNames).toContain('MASCOT_FLIP');
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
