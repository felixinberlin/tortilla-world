/**
 * FILE: ActionReplayer.test.tsx
 *
 * PURPOSE:
 * Unit tests for ActionReplayer component logic.
 */

import { describe, it, expect } from 'vitest';
import { actionPlayer } from '../../systems/actionPlayer';
import { worldStore } from '../../store/worldStore';
import type { WorldAction } from '../../types/actions';

describe('ActionReplayer component logic', () => {
  it('integrates with ActionPlayer to replay uploaded actions', async () => {
    worldStore.getState().resetWorld();

    const actions: WorldAction[] = [
      {
        type: 'TOGGLE_BURNER',
        payload: { containerId: 'burner1' },
      },
      {
        type: 'ADD_ENTITY',
        payload: {
          entity: {
            id: 'potato_test_1',
            name: 'Potato',
            type: 'ingredient',
          },
          containerId: 'burner1',
        },
      },
    ];

    await actionPlayer.playLog(actions, { delayMs: 10 });

    const store = worldStore.getState();
    expect(store.containers.burner1.isOn).toBe(true);
    expect(store.containers.burner1.entityIds).toContain('potato_test_1');
  });

  it('syncs uploaded actions with setRecordedActions in worldStore', () => {
    worldStore.getState().resetWorld();

    const sampleActions = [
      {
        type: 'MOVE_ENTITY',
        payload: { entityId: 'patata', targetContainerId: 'board' },
        timestampMs: Date.now(),
      },
    ];

    worldStore.getState().setRecordedActions(sampleActions);

    expect(worldStore.getState().recordedActions).toHaveLength(1);
    expect(worldStore.getState().recordedActions[0].type).toBe('MOVE_ENTITY');
  });

  it('handles playing uploaded Declarative Recipe formats', async () => {
    worldStore.getState().resetWorld();

    const declarativeRecipe = {
      id: 'uploaded_dec_1',
      name: 'Uploaded Declarative Recipe',
      requirements: {},
      steps: [
        { id: '1', action: 'move', ingredient: 'patata', target: 'board' },
        { id: '2', action: 'prepare', ingredient: 'patata', style: 'sliced' },
      ],
    };

    const { detectRecipeFormat, getPlayableActionsFromFormat } = await import(
      '../../utils/recipeFormatDetector'
    );

    const detected = detectRecipeFormat(declarativeRecipe);
    expect(detected.type).toBe('declarative');
    expect(detected.typeLabel).toBe('Declarative Recipe');

    const playable = getPlayableActionsFromFormat(detected);
    expect(playable.actions).toHaveLength(2);

    await actionPlayer.playLog(playable.actions, { delayMs: 10 });
    expect(worldStore.getState().recordedActions.length).toBeGreaterThanOrEqual(1);
  });

  it('handles playing uploaded Full Session Log formats', async () => {
    worldStore.getState().resetWorld();

    const fullSessionLog = {
      version: '1.0',
      title: 'Full Session Recording',
      zustandInit: { entities: {}, containers: {} },
      actions: [
        { type: 'TOGGLE_BURNER', payload: { containerId: 'burner1' } },
      ],
    };

    const { detectRecipeFormat, getPlayableActionsFromFormat } = await import(
      '../../utils/recipeFormatDetector'
    );

    const detected = detectRecipeFormat(fullSessionLog);
    expect(detected.type).toBe('full_session_log');
    expect(detected.typeLabel).toBe('Full Session Log');

    const playable = getPlayableActionsFromFormat(detected);
    expect(playable.actions).toHaveLength(1);

    await actionPlayer.playLog(playable.actions, { delayMs: 10 });
    expect(worldStore.getState().containers.burner1.isOn).toBe(true);
  });
});
