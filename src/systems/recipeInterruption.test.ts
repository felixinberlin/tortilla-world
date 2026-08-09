/**
 * FILE: src/systems/recipeInterruption.test.ts
 *
 * PURPOSE:
 * Unit tests for Advanced Replay Interruption, Pre-Step Validator, Mascot Action Logging, and ZIP Exporter.
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { worldStore } from '../store/worldStore';
import { validateNextStep } from './recipeValidator';
import { RecipeRunner } from './recipeRunner';
import { exportSessionAsZip } from '../utils/exporter';
import type { RecipeStep } from '../types/RecipeStep';

function seedTestWorld() {
  worldStore.setState({
    simMode: 'FREE_COOK',
    recordedActions: [
      { type: 'MOVE_ENTITY', payload: { entityId: 'egg', targetContainerId: 'board' }, timestampMs: 100 },
      { type: 'PREPARE_INGREDIENT', payload: { entityId: 'egg', preparation: 'beaten' }, timestampMs: 200 },
      { type: 'COOK_INGREDIENT', payload: { entityId: 'egg', cooking: 'scrambled' }, timestampMs: 300 },
    ],
    currentActionIndex: 1,
    entities: {
      egg: { id: 'egg', ingredientId: 'egg', name: 'Egg', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      potato: { id: 'potato', ingredientId: 'potato', name: 'Potato', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw', consumed: true } },
    },
    containers: {
      despensa: { id: 'despensa', name: 'Despensa', type: 'storage', entityIds: ['egg'], rules: {} },
      board: { id: 'board', name: 'Board', type: 'board', entityIds: [], rules: {} },
    },
    dispatch: worldStore.getState().dispatch,
  });
}

describe('Advanced Replay Interruption & Pre-Step Validator', () => {
  beforeEach(() => {
    seedTestWorld();
  });

  it('interrupts recipe and truncates actionLog when INTERRUPT_RECIPE is dispatched', () => {
    worldStore.setState({ simMode: 'RECIPE_AUTO' });

    worldStore.getState().dispatch({ type: 'INTERRUPT_RECIPE' });

    const state = worldStore.getState();
    expect(state.simMode).toBe('FREE_COOK');
    // currentActionIndex was 1, so recordedActions should be truncated to length 1
    expect(state.recordedActions.length).toBe(1);
    expect(state.recordedActions[0].type).toBe('MOVE_ENTITY');
  });

  it('auto-interrupts recipe when user manual override action occurs during RECIPE_AUTO', () => {
    worldStore.setState({ simMode: 'RECIPE_AUTO' });

    worldStore.getState().dispatch({
      type: 'SET_FOCUS',
      payload: { containerId: 'board', isUserOverride: true },
    });

    const state = worldStore.getState();
    expect(state.simMode).toBe('FREE_COOK');
  });

  it('validateNextStep returns true when required entity exists and is unconsumed', () => {
    const step: RecipeStep = { action: 'move', ingredient: 'egg', source: 'despensa', target: 'board' };
    const isValid = validateNextStep(step, worldStore.getState());
    expect(isValid).toBe(true);
  });

  it('validateNextStep returns false when required entity is consumed', () => {
    const step: RecipeStep = { action: 'cut', ingredient: 'potato', containerId: 'board' };
    const isValid = validateNextStep(step, worldStore.getState());
    expect(isValid).toBe(false);
  });

  it('RecipeRunner halts step execution if validateNextStep fails', async () => {
    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 1 });
    const invalidStep: RecipeStep = { action: 'cook', ingredient: 'potato', containerId: 'board' };

    await expect(runner.executeStep(invalidStep)).rejects.toThrow('Timeline altered');
    expect(worldStore.getState().simMode).toBe('FREE_COOK');
  });

  it('exportSessionAsZip generates a valid zip bundle with 3 files without throwing', async () => {
    await expect(
      exportSessionAsZip(worldStore.getState(), { title: 'Test Session' })
    ).resolves.not.toThrow();
  });
});
