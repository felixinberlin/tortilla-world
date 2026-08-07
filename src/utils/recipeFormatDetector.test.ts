import { describe, it, expect } from 'vitest';
import {
  detectRecipeFormat,
  getPlayableActionsFromFormat,
  convertDeclarativeStepsToActions,
  buildSavedRecipePayload,
} from './recipeFormatDetector';
import type { Recipe } from '../types/Recipe';
import type { RecipeStep } from '../types/RecipeStep';
import type { WorldAction } from '../types/actions';
import type { SavedRecipe } from '../services/dbService';

describe('recipeFormatDetector utility', () => {
  it('detects Declarative Recipe JSON format correctly', () => {
    const declarativeRecipe: Recipe = {
      id: 'test_tortilla_1',
      name: 'Spanish Omelette',
      requirements: {},
      steps: [
        { action: 'move', ingredient: 'potato', source: 'despensa', target: 'board' },
        { action: 'prepare', ingredient: 'potato', style: 'sliced', target: 'board' },
      ],
    };

    const info = detectRecipeFormat(declarativeRecipe);
    expect(info.type).toBe('declarative');
    expect(info.typeLabel).toBe('Declarative Recipe');
    expect(info.title).toBe('Spanish Omelette');
    expect(info.stepOrActionCount).toBe(2);
    expect(info.declarativeRecipe).toEqual(declarativeRecipe);
  });

  it('detects Mascot Action Sequence format correctly', () => {
    const mascotSequence: WorldAction[] = [
      { type: 'MASCOT_MOVE', payload: { targetContainerId: 'board' } },
      { type: 'MASCOT_GRAB', payload: { entityId: 'potato_1' } },
      { type: 'MOVE_ENTITY', payload: { entityId: 'potato_1', targetContainerId: 'board' } },
    ];

    const info = detectRecipeFormat(mascotSequence);
    expect(info.type).toBe('mascot_sequence');
    expect(info.typeLabel).toBe('Mascot Action Sequence');
    expect(info.stepOrActionCount).toBe(3);
    expect(info.mascotSequence).toEqual(mascotSequence);
  });

  it('detects Full Session Log format correctly', () => {
    const sessionLog = {
      version: '1.0',
      title: 'Full Kitchen Session',
      zustandInit: { entities: {}, containers: {} },
      actions: [
        { type: 'MOVE_ENTITY', payload: { entityId: 'egg_1', targetContainerId: 'pan' } },
        { type: 'TOGGLE_BURNER', payload: { containerId: 'burner1', isHeated: true } },
      ],
    };

    const info = detectRecipeFormat(sessionLog);
    expect(info.type).toBe('full_session_log');
    expect(info.typeLabel).toBe('Full Session Log');
    expect(info.title).toBe('Full Kitchen Session');
    expect(info.stepOrActionCount).toBe(2);
    expect(info.fullSessionLog).toEqual(sessionLog);
  });

  it('detects SavedRecipe Firestore database object formats correctly', () => {
    const savedRecipe: SavedRecipe = {
      id: 'db_recipe_101',
      title: 'Cloud Spanish Omelette',
      description: 'A delicious recipe stored in DB',
      author: 'Chef Maria',
      ingredients: ['potato', 'egg'],
      tags: ['custom'],
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
      hasMascotSupport: true,
      formats: {
        recipeJson: {
          id: 'cloud_1',
          name: 'Cloud Omelette',
          requirements: {},
          steps: [{ action: 'move', ingredient: 'egg', target: 'pan' }],
        },
        mascotSequence: [{ type: 'MASCOT_MOVE', payload: { targetContainerId: 'pan' } }],
      },
    };

    const info = detectRecipeFormat(savedRecipe);
    expect(info.type).toBe('declarative');
    expect(info.title).toBe('Cloud Omelette');
    expect(info.stepOrActionCount).toBe(1);
  });

  it('converts declarative steps to playable WorldActions', () => {
    const steps = [
      { action: 'move', ingredient: 'potato', target: 'board' },
      { action: 'prepare', ingredient: 'potato', style: 'sliced' },
      { action: 'cook', ingredient: 'potato', method: 'fried', target: 'pan' },
    ];

    const actions = convertDeclarativeStepsToActions(steps as unknown as RecipeStep[]);
    expect(actions).toHaveLength(3);
    expect(actions[0].type).toBe('MOVE_ENTITY');
    expect(actions[1].type).toBe('PREPARE_INGREDIENT');
    expect(actions[2].type).toBe('COOK_INGREDIENT');
  });

  it('extracts playable actions from any detected format', () => {
    const sessionLogInfo = detectRecipeFormat({
      zustandInit: {},
      actions: [{ type: 'MOVE_ENTITY', payload: { entityId: 'egg_1' } }],
    });

    const playable = getPlayableActionsFromFormat(sessionLogInfo);
    expect(playable.actions).toHaveLength(1);
    expect(playable.actions[0].type).toBe('MOVE_ENTITY');
  });

  it('handles unknown/invalid formats gracefully', () => {
    const unknownData = { foo: 'bar', baz: 123 };
    const info = detectRecipeFormat(unknownData);

    expect(info.type).toBe('unknown');
    expect(info.typeLabel).toBe('Unknown Format');
    expect(info.stepOrActionCount).toBe(0);

    const playable = getPlayableActionsFromFormat(info);
    expect(playable.actions).toHaveLength(0);
  });

  it('builds a SavedRecipe database payload from detected info', () => {
    const mascotInfo = detectRecipeFormat([
      { type: 'MASCOT_MOVE', payload: { targetContainerId: 'board' } },
    ]);

    const payload = buildSavedRecipePayload('My Mascot Routine', 'Description', 'Author', mascotInfo);
    expect(payload.title).toBe('My Mascot Routine');
    expect(payload.formats?.mascotSequence).toBeDefined();
    expect(payload.tags).toContain('mascot_sequence');
  });
});
