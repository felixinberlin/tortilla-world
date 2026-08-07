/**
 * FILE: src/utils/sessionLogUtils.test.ts
 *
 * PURPOSE:
 * Unit tests for session log ingredient filtering and plate dish naming during recording.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { filterUnusedIngredientsFromState } from './sessionLogUtils';
import { worldStore } from '../store/worldStore';
import type { SerializedWorldState, RecordedAction } from '../types/recording';

describe('sessionLogUtils - filterUnusedIngredientsFromState', () => {
  it('filters out unused raw ingredients in despensa while keeping used ones and non-ingredients', () => {
    const mockSnapshot: SerializedWorldState = {
      entities: {
        pan: { id: 'pan', name: 'Pan', type: 'tool' },
        patata_used: { id: 'patata_used', name: 'Potato Used', type: 'ingredient' },
        patata_unused: { id: 'patata_unused', name: 'Potato Unused', type: 'ingredient' },
        huevo_unused: { id: 'huevo_unused', name: 'Egg Unused', type: 'ingredient' },
      },
      containers: {
        despensa: { id: 'despensa', name: 'Pantry', type: 'storage', entityIds: ['patata_unused', 'huevo_unused'] },
        board: { id: 'board', name: 'Board', type: 'workstation', entityIds: ['patata_used'] },
      },
    };

    const mockActions: RecordedAction[] = [
      {
        type: 'MOVE_ENTITY',
        timestampMs: 100,
        payload: {
          entityId: 'patata_used',
          sourceContainerId: 'despensa',
          targetContainerId: 'board',
        },
      },
    ];

    const filtered = filterUnusedIngredientsFromState(mockSnapshot, mockActions);

    // Non-ingredients (tools) and used ingredients should be kept
    expect(filtered.entities['pan']).toBeDefined();
    expect(filtered.entities['patata_used']).toBeDefined();

    // Unused ingredients in despensa should be removed
    expect(filtered.entities['patata_unused']).toBeUndefined();
    expect(filtered.entities['huevo_unused']).toBeUndefined();

    // Container entityIds should be filtered accordingly
    expect(filtered.containers['despensa'].entityIds).toEqual([]);
    expect(filtered.containers['board'].entityIds).toEqual(['patata_used']);
  });
});

describe('Recording - Plate Dish Naming', () => {
  beforeEach(() => {
    worldStore.getState().resetWorld();
    worldStore.getState().clearRecording();
  });

  it('updates entity name on plate when customDishName is passed to stopRecording', () => {
    const store = worldStore.getState();

    // Start recording
    store.startRecording();

    // Move a dish/mixture entity to the plate
    store.dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: {
          id: 'cooked_tortilla_1',
          name: 'Tortilla en sartén',
          type: 'ingredient',
          state: { isCooked: true },
        },
        containerId: 'plate',
      },
    });

    // Check entity is on plate
    expect(worldStore.getState().containers['plate']?.entityIds).toContain('cooked_tortilla_1');

    // Stop recording with custom dish name
    worldStore.getState().stopRecording('Tortilla de la Abuela Especial');

    // Entity on plate should now be renamed
    const updatedEntity = worldStore.getState().entities['cooked_tortilla_1'];
    expect(updatedEntity?.name).toBe('Tortilla de la Abuela Especial');

    // Recording should be stopped
    expect(worldStore.getState().isRecording).toBe(false);
  });
});
