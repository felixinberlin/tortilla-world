/**
 * FILE: actionExportFormats.test.ts
 *
 * PURPOSE:
 * Unit tests validating all 3 export formats (Mascot Action Sequence, Declarative Recipe File,
 * and Full Session Log with zustandInit / actions / events / zustandEnd) using emitted BaseWorldEvents.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';
import { eventStore } from './EventStore';
import {
  translateHumanActionsToMascotActions,
  translateHumanActionsToRecipe,
} from './recipeTranslator';

describe('Action Export Formats & EventStore Integration', () => {
  beforeEach(() => {
    worldStore.getState().resetWorld();
    eventStore.clear();
  });

  it('generates a valid Mascot Action Sequence from emitted EventStore events', () => {
    // Dispatch human actions to emit events into eventStore
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'patata_1', targetContainerId: 'board' },
    });

    worldStore.getState().dispatch({
      type: 'PREPARE_INGREDIENT',
      payload: { entityId: 'patata_1', preparation: 'sliced' },
    });

    const emittedEvents = eventStore.getEvents();
    expect(emittedEvents.length).toBe(2);

    // Translate emitted BaseWorldEvents directly to Mascot Action Sequence
    const mascotSequence = translateHumanActionsToMascotActions(emittedEvents);

    expect(mascotSequence.length).toBeGreaterThan(5);
    expect(mascotSequence[0].type).toBe('MASCOT_MOVE');
    expect(mascotSequence[1].type).toBe('MASCOT_GRAB');
    expect(mascotSequence[2].type).toBe('MASCOT_MOVE');
    expect(mascotSequence[3].type).toBe('MASCOT_DROP');
    expect(mascotSequence[4].type).toBe('MOVE_ENTITY');
  });

  it('generates a valid Declarative Recipe JSON object from emitted EventStore events', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'patata_1', targetContainerId: 'board' },
    });

    worldStore.getState().dispatch({
      type: 'PREPARE_INGREDIENT',
      payload: { entityId: 'patata_1', preparation: 'sliced' },
    });

    const emittedEvents = eventStore.getEvents();
    const recipe = translateHumanActionsToRecipe(emittedEvents, {
      recipeName: 'Test Tortilla Recipe',
    });

    expect(recipe.name).toBe('Test Tortilla Recipe');
    expect(recipe.requirements).toHaveProperty('patata');
    expect(recipe.steps).toBeDefined();

    const moveStep = recipe.steps.find((s) => s.action === 'move');
    expect(moveStep).toBeDefined();
    if (moveStep && moveStep.action === 'move') {
      expect(moveStep.ingredient).toBe('patata');
      expect(moveStep.target).toBe('board');
    }
  });

  it('builds a full 3rd format session log containing zustandInit, actions, events, and zustandEnd', () => {
    worldStore.getState().startRecording();

    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'huevo_1', targetContainerId: 'bowl_1' },
    });

    worldStore.getState().stopRecording();

    const currentState = worldStore.getState();
    const initialRecordingState = currentState.initialRecordingState;
    const recordedActions = currentState.recordedActions;
    const events = eventStore.getEvents();

    const fullSessionLog = {
      version: '1.0.0',
      title: 'Tortilla World Action Session Log',
      recordedAt: new Date().toISOString(),
      zustandInit: initialRecordingState || {
        entities: currentState.entities,
        containers: currentState.containers,
      },
      actions: recordedActions,
      events: events,
      zustandEnd: {
        entities: currentState.entities,
        containers: currentState.containers,
      },
      metadata: {
        actionCount: recordedActions.length,
        eventCount: events.length,
      },
    };

    expect(fullSessionLog.zustandInit).toHaveProperty('entities');
    expect(fullSessionLog.zustandInit).toHaveProperty('containers');
    expect(fullSessionLog.actions.length).toBe(1);
    expect(fullSessionLog.events.length).toBe(1);
    expect(fullSessionLog.zustandEnd).toHaveProperty('entities');
    expect(fullSessionLog.zustandEnd).toHaveProperty('containers');
  });
});
