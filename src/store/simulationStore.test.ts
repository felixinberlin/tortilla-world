/**
 * FILE: simulationStore.test.ts
 *
 * PURPOSE:
 * Vitest tests verifying timeline integration with simulation store.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createSimulationStore } from './simulationStore';
import type { Vector3, ForceAppliedEvent } from './simulationStore';

describe('useSimulationStore Timeline Integration', () => {
  let store: ReturnType<typeof createSimulationStore>;

  beforeEach(() => {
    store = createSimulationStore();
  });

  it('Test 1 — Record three forces in deterministic order', () => {
    const forceA: Vector3 = { x: 10, y: 0, z: 0 };
    const forceB: Vector3 = { x: 0, y: 5, z: 0 };
    const forceC: Vector3 = { x: -2, y: -1, z: 3 };

    store.getState().applyForce('box-1', forceA);
    store.getState().applyForce('box-1', forceB);
    store.getState().applyForce('box-1', forceC);

    const state = store.getState();

    // 1. All three actions executed on simulation entity
    const entity = state.entities['box-1'];
    expect(entity).toBeDefined();
    expect(entity.velocity).toEqual({ x: 8, y: 4, z: 3 });
    expect(entity.position).toEqual({ x: 28, y: 9, z: 3 });

    // 2. Exactly 3 timeline events recorded
    expect(state.events.length).toBe(3);

    // 3. All events are FORCE_APPLIED
    expect(state.events.every((e: ForceAppliedEvent) => e.type === 'FORCE_APPLIED')).toBe(true);

    // 4. Payloads preserved in exact order A -> B -> C
    expect(state.events[0].payload).toEqual({ entityId: 'box-1', force: forceA });
    expect(state.events[1].payload).toEqual({ entityId: 'box-1', force: forceB });
    expect(state.events[2].payload).toEqual({ entityId: 'box-1', force: forceC });
  });

  it('Test 2 — Replay the sequence in order via stepForward()', () => {
    const forceA: Vector3 = { x: 5, y: 2, z: 0 };
    const forceB: Vector3 = { x: -1, y: 3, z: 1 };
    const forceC: Vector3 = { x: 2, y: -2, z: -1 };

    store.getState().applyForce('box-2', forceA);
    store.getState().applyForce('box-2', forceB);
    store.getState().applyForce('box-2', forceC);

    const targetStateAfterOriginal = JSON.parse(JSON.stringify(store.getState().entities));

    // Reset simulation state to initial (empty) while preserving timeline events
    store.getState().resetSimulation();
    expect(store.getState().entities['box-2']).toBeUndefined();

    // Replay step 1 (Force A)
    store.getState().stepForward();
    expect(store.getState().currentIndex).toBe(0);
    expect(store.getState().entities['box-2'].velocity).toEqual({ x: 5, y: 2, z: 0 });

    // Replay step 2 (Force B)
    store.getState().stepForward();
    expect(store.getState().currentIndex).toBe(1);
    expect(store.getState().entities['box-2'].velocity).toEqual({ x: 4, y: 5, z: 1 });

    // Replay step 3 (Force C)
    store.getState().stepForward();
    expect(store.getState().currentIndex).toBe(2);

    // Verify final state matches original state exactly
    expect(store.getState().entities).toEqual(targetStateAfterOriginal);
  });

  it('Test 3 — Playback does not corrupt the timeline or duplicate events', () => {
    const forceA: Vector3 = { x: 1, y: 1, z: 1 };
    const forceB: Vector3 = { x: 2, y: 2, z: 2 };
    const forceC: Vector3 = { x: 3, y: 3, z: 3 };

    store.getState().applyForce('box-3', forceA);
    store.getState().applyForce('box-3', forceB);
    store.getState().applyForce('box-3', forceC);

    expect(store.getState().events.length).toBe(3);

    store.getState().resetSimulation();

    // Step through playback
    store.getState().stepForward();
    store.getState().stepForward();
    store.getState().stepForward();

    // Verify events array is NOT duplicated (still exactly 3)
    expect(store.getState().events.length).toBe(3);
    expect(store.getState().events[0].payload.force).toEqual(forceA);
    expect(store.getState().events[1].payload.force).toEqual(forceB);
    expect(store.getState().events[2].payload.force).toEqual(forceC);
  });
});
