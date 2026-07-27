/**
 * FILE: replayEngine.test.ts
 *
 * PURPOSE:
 * Unit tests for EventStore, replayEngine, and analytics reporting utilities.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';
import { eventStore } from './EventStore';
import { replayEvents } from './replayEngine';
import { getRecipeMetrics, getAuditTrail, exportToCSV } from './analytics';

describe('EventStore and Replay Engine', () => {
  beforeEach(() => {
    worldStore.getState().resetWorld();
    eventStore.clear();
  });

  it('dispatches actions, exports JSON, clears store, replays events, and achieves matching state', () => {
    // 1. Dispatch 5 arbitrary actions
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato_1', targetContainerId: 'tabla_1' },
    });

    worldStore.getState().dispatch({
      type: 'TOGGLE_BURNER',
      payload: { containerId: 'burner_1', isOn: true, cookCondition: 'boil' },
    });

    worldStore.getState().dispatch({
      type: 'PREPARE_INGREDIENT',
      payload: { entityId: 'egg_1', preparation: 'beaten' },
    });

    worldStore.getState().dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: { id: 'custom_spice_1', name: 'Oregano', type: 'ingredient' },
        containerId: 'pantry_1',
      },
    });

    worldStore.getState().dispatch({
      type: 'MASCOT_MOVE',
      payload: { mascotId: 'chef', targetContainerId: 'tabla_1' },
    });

    // Verify 5 events recorded in EventStore
    const eventsBefore = eventStore.getEvents();
    expect(eventsBefore.length).toBe(5);

    // Capture state before reset
    const entitiesBefore = JSON.parse(JSON.stringify(worldStore.getState().entities));
    const containersBefore = JSON.parse(JSON.stringify(worldStore.getState().containers));

    // Export JSON
    const exportedJSON = eventStore.exportJSON();
    expect(typeof exportedJSON).toBe('string');

    // Clear world store and event store
    worldStore.getState().resetWorld();
    eventStore.clear();

    expect(worldStore.getState().entities).not.toEqual(entitiesBefore);
    expect(eventStore.getEvents().length).toBe(0);

    // Import JSON into eventStore and run replayEngine
    eventStore.importJSON(exportedJSON);
    expect(eventStore.getEvents().length).toBe(5);

    replayEvents(eventStore.getEvents());

    // Assert that replayed state matches original pre-clear state
    const entitiesAfter = JSON.parse(JSON.stringify(worldStore.getState().entities));
    const containersAfter = JSON.parse(JSON.stringify(worldStore.getState().containers));

    expect(entitiesAfter).toEqual(entitiesBefore);
    expect(containersAfter).toEqual(containersBefore);
  });

  it('computes analytics recipe metrics, audit trails, and exports valid CSV', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato_1', targetContainerId: 'tabla_1' },
    });

    worldStore.getState().dispatch({
      type: 'MASCOT_MOVE',
      payload: { mascotId: 'chef', targetContainerId: 'burner_1' },
    });

    const events = eventStore.getEvents();

    // Test getRecipeMetrics
    const metrics = getRecipeMetrics(events);
    expect(metrics.stepCount).toBe(2);
    expect(typeof metrics.durationMs).toBe('number');

    // Test getAuditTrail
    const playerTrail = getAuditTrail(events, 'player');
    const mascotTrail = getAuditTrail(events, 'mascot');
    expect(playerTrail.length).toBe(1);
    expect(mascotTrail.length).toBe(1);

    // Test exportToCSV
    const csv = exportToCSV(events);
    expect(csv).toContain('id,sequenceNumber,timestamp,version,actor,actionType,actionPayload');
    expect(csv).toContain('MOVE_ENTITY');
    expect(csv).toContain('MASCOT_MOVE');
  });
});
