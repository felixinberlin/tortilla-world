import { describe, it, expect } from 'vitest';
import {
  translateHumanActionsToMascotActions,
  translateHumanActionsToRecipe,
} from './recipeTranslator';
import type { RecordedAction } from '../types/recording';

describe('recipeTranslator system', () => {
  it('translates human MOVE_ENTITY into interleaved mascot move, grab, move, drop, and move_entity actions', () => {
    const humanActions: RecordedAction[] = [
      {
        type: 'MOVE_ENTITY',
        payload: { entityId: 'patata_1', targetContainerId: 'board', sourceContainerId: 'despensa' },
        timestampMs: 1000,
      },
    ];

    const translated = translateHumanActionsToMascotActions(humanActions);

    expect(translated).toHaveLength(5);
    expect(translated[0].type).toBe('MASCOT_MOVE');
    expect(translated[0].payload.targetContainerId).toBe('despensa');

    expect(translated[1].type).toBe('MASCOT_GRAB');
    expect(translated[1].payload.entityId).toBe('patata_1');

    expect(translated[2].type).toBe('MASCOT_MOVE');
    expect(translated[2].payload.targetContainerId).toBe('board');

    expect(translated[3].type).toBe('MASCOT_DROP');
    expect(translated[3].payload.targetContainerId).toBe('board');

    expect(translated[4].type).toBe('MOVE_ENTITY');
    expect(translated[4].payload.entityId).toBe('patata_1');
  });

  it('translates TOGGLE_BURNER and PREPARE_INGREDIENT with mascot move focus', () => {
    const humanActions: RecordedAction[] = [
      {
        type: 'TOGGLE_BURNER',
        payload: { containerId: 'burner1' },
        timestampMs: 1000,
      },
      {
        type: 'PREPARE_INGREDIENT',
        payload: { entityId: 'cebolla_1', preparation: 'sliced' },
        timestampMs: 1300,
      },
    ];

    const translated = translateHumanActionsToMascotActions(humanActions);

    expect(translated[0].type).toBe('MASCOT_MOVE');
    expect(translated[0].payload.targetContainerId).toBe('burner1');
    expect(translated[1].type).toBe('TOGGLE_BURNER');

    expect(translated[2].type).toBe('MASCOT_MOVE');
    expect(translated[3].type).toBe('PREPARE_INGREDIENT');
  });

  it('translates human action sequence into a declarative Recipe object', () => {
    const humanActions: RecordedAction[] = [
      {
        type: 'MOVE_ENTITY',
        payload: { entityId: 'patata_1', targetContainerId: 'board', sourceContainerId: 'despensa' },
        timestampMs: 1000,
      },
      {
        type: 'PREPARE_INGREDIENT',
        payload: { entityId: 'patata_1', preparation: 'sliced' },
        timestampMs: 1300,
      },
    ];

    const recipe = translateHumanActionsToRecipe(humanActions, { recipeName: 'Test Tortilla' });

    expect(recipe.name).toBe('Test Tortilla');
    expect(recipe.requirements).toHaveProperty('patata');
    expect(recipe.steps.length).toBeGreaterThan(2);

    const moveStep = recipe.steps.find((s) => s.action === 'move');
    expect(moveStep).toBeDefined();
    if (moveStep && moveStep.action === 'move') {
      expect(moveStep.ingredient).toBe('patata');
      expect(moveStep.target).toBe('board');
    }

    const prepStep = recipe.steps.find((s) => s.action === 'prepare');
    expect(prepStep).toBeDefined();
    if (prepStep && prepStep.action === 'prepare') {
      expect(prepStep.preparation).toBe('sliced');
    }
  });
});
