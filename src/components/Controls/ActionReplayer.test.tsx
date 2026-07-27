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
});
