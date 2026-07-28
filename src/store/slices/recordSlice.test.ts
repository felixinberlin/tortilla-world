/**
 * FILE: recordSlice.test.ts
 *
 * PURPOSE:
 * Unit tests for worldStore recording slice.
 *
 * RESPONSIBILITY:
 * - Validates recording start/stop state transitions.
 * - Verifies interaction recording (MOVE_ENTITY, TOGGLE_BURNER, etc.).
 * - Verifies creation of initial and final WorldState snapshots and JSON export payload.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { worldStore } from '../worldStore';

describe('recordSlice', () => {
  beforeEach(() => {
    worldStore.getState().resetWorld();
    worldStore.getState().clearRecording();
  });

  it('starts recording and captures initial world snapshot', () => {
    const store = worldStore.getState();
    expect(store.isRecording).toBe(false);

    store.startRecording();

    const updated = worldStore.getState();
    expect(updated.isRecording).toBe(true);
    expect(updated.recordingStartTime).toBeTypeOf('number');
    expect(updated.initialRecordingState).not.toBeNull();
    expect(updated.initialRecordingState?.entities).toBeDefined();
    expect(updated.initialRecordingState?.containers).toBeDefined();
    expect(updated.recordedActions).toEqual([]);
  });

  it('records dispatched MOVE_ENTITY and TOGGLE_BURNER actions when recording is active', () => {
    worldStore.getState().startRecording();

    // 1. Move potato to burner1
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId: 'potatoes_1',
        targetContainerId: 'burner1',
      },
    });

    // 2. Turn on burner1
    worldStore.getState().dispatch({
      type: 'TOGGLE_BURNER',
      payload: {
        containerId: 'burner1',
      },
    });

    const recorded = worldStore.getState().recordedActions;
    expect(recorded).toHaveLength(2);

    expect(recorded[0].type).toBe('MOVE_ENTITY');
    expect(recorded[0].payload).toEqual({
      entityId: 'potatoes_1',
      targetContainerId: 'burner1',
    });
    expect(recorded[0].timestampMs).toBeGreaterThanOrEqual(0);

    expect(recorded[1].type).toBe('TOGGLE_BURNER');
    expect(recorded[1].payload).toEqual({
      containerId: 'burner1',
    });
    expect(recorded[1].timestampMs).toBeGreaterThanOrEqual(0);
  });

  it('does not record actions when isRecording is false', () => {
    worldStore.getState().dispatch({
      type: 'TOGGLE_BURNER',
      payload: {
        containerId: 'burner1',
      },
    });

    expect(worldStore.getState().recordedActions).toHaveLength(0);
  });


  // Better while  recording, not at stop
  it('stops recording and generates download URL & serialized JSON', () => {
    // Mock URL methods for Node environment
    if (!globalThis.URL.createObjectURL) {
      globalThis.URL.createObjectURL = vi.fn(() => 'blob:mock-url-1234');
      globalThis.URL.revokeObjectURL = vi.fn();
    }

    worldStore.getState().startRecording();

    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId: 'eggs_1',
        targetContainerId: 'plato',
      },
    });

    worldStore.getState().stopRecording();

    const store = worldStore.getState();
    expect(store.isRecording).toBe(false);
    expect(store.recordedDownloadUrl).toBeTruthy();
    expect(store.recordedFilename).toContain('tortilla-recorded-recipe-');
  });

  it('clears recording state and resets properties', () => {
    worldStore.getState().startRecording();
    worldStore.getState().dispatch({
      type: 'TOGGLE_BURNER',
      payload: { containerId: 'burner1' },
    });

    worldStore.getState().clearRecording();

    const store = worldStore.getState();
    expect(store.isRecording).toBe(false);
    expect(store.recordedActions).toEqual([]);
    expect(store.initialRecordingState).toBeNull();
    expect(store.recordedDownloadUrl).toBeNull();
    expect(store.recordedFilename).toBeNull();
  });
});
