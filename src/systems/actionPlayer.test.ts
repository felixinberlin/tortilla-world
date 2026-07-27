/**
 * FILE: actionPlayer.test.ts
 *
 * PURPOSE:
 * Unit tests for ActionPlayer replay engine.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { actionPlayer } from './actionPlayer';
import { worldStore } from '../store/worldStore';
import type { WorldAction } from '../types/actions';

describe('ActionPlayer', () => {
  beforeEach(() => {
    actionPlayer.stop();
    worldStore.getState().resetWorld();
  });

  it('resets world state and dispatches actions sequentially', async () => {
    const actions: WorldAction[] = [
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
      {
        type: 'TOGGLE_BURNER',
        payload: { containerId: 'burner1' },
      },
    ];

    const onStep = vi.fn();
    const onComplete = vi.fn();

    await actionPlayer.playLog(actions, {
      delayMs: 10,
      onStep,
      onComplete,
    });

    expect(onStep).toHaveBeenCalledTimes(2);
    expect(onStep).toHaveBeenNthCalledWith(1, 1, 2, actions[0]);
    expect(onStep).toHaveBeenNthCalledWith(2, 2, 2, actions[1]);
    expect(onComplete).toHaveBeenCalledTimes(1);

    const store = worldStore.getState();
    expect(store.containers.burner1.isOn).toBe(true);
    expect(store.containers.burner1.entityIds).toContain('potato_test_1');
  });

  it('can stop playback prematurely', async () => {
    const actions: WorldAction[] = [
      {
        type: 'TOGGLE_BURNER',
        payload: { containerId: 'burner1' },
      },
      {
        type: 'TOGGLE_BURNER',
        payload: { containerId: 'burner1' },
      },
      {
        type: 'TOGGLE_BURNER',
        payload: { containerId: 'burner1' },
      },
    ];

    const onStep = vi.fn();
    const onStop = vi.fn();

    const playbackPromise = actionPlayer.playLog(actions, {
      delayMs: 100,
      onStep,
      onStop,
    });

    // Let step 1 run then stop
    await new Promise((r) => setTimeout(r, 20));
    actionPlayer.stop();

    await playbackPromise;

    expect(onStop).toHaveBeenCalled();
    expect(onStep).toHaveBeenCalledTimes(1);
  });
});
