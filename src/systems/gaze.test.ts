/**
 * FILE: gaze.test.ts
 *
 * PURPOSE:
 * Unit tests for gaze system.
 *
 * RESPONSIBILITY:
 * - Validates mascot gaze target updates, structural equality, and idempotency.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';
import { updateMascotGaze, getMascotGazeTarget } from './gaze';
import type { GazeTarget } from './gaze';

const  FIRE_GAZE: GazeTarget = { type: 'entity', entityId: ' burner1' };

describe('Gaze System', () => {
  beforeEach(() => {
    worldStore.setState({
      entities: {
        chef: {
          id: 'chef',
          name: 'Chef',
          type: 'mascot',
          state: {
            gazingAt: undefined,
          },
        },
      },
      containers: {
        bench: {
          id: 'bench',
          name: 'Workbench',
          type: 'board',
          rules: { maxCapacity: 1 },
          entityIds: [],
        },
        burner1: {
          id: 'burner1',
          name: 'burner1',
          type: 'burner',
          rules: { maxCapacity: Infinity },
          entityIds: [],
        },
        plate: {
          id: 'plate',
          name: 'Plate',
          type: 'storage',
          rules: { maxCapacity: Infinity },
          entityIds: [],
        },
      },
    });
  });

  it('updates mascot gaze target correctly', () => {
    updateMascotGaze('chef',  FIRE_GAZE);
    expect(getMascotGazeTarget('chef')).toEqual( FIRE_GAZE);
  });

  it('is idempotent when gazing at the same target', () => {
    updateMascotGaze('chef',  FIRE_GAZE);
    const firstState = worldStore.getState();

    updateMascotGaze('chef', { type: 'entity', entityId: ' burner1' }); // structurally identical
    const secondState = worldStore.getState();

    expect(firstState).toBe(secondState);
  });

  it('updates when gazing at a different entity', () => {
    updateMascotGaze('chef',  FIRE_GAZE);
    updateMascotGaze('chef', { type: 'entity', entityId: 'plate' });
    expect(getMascotGazeTarget('chef')).toEqual({ type: 'entity', entityId: 'plate' });
  });

  it('can gaze at mouse', () => {
    updateMascotGaze('chef', { type: 'mouse' });
    expect(getMascotGazeTarget('chef')).toEqual({ type: 'mouse' });
  });

  it('can gaze at a point', () => {
    const pointGaze: GazeTarget = { type: 'point', point: { x: 100, y: 200 } };
    updateMascotGaze('chef', pointGaze);
    expect(getMascotGazeTarget('chef')).toEqual(pointGaze);
  });

  it('can clear gaze to null', () => {
    updateMascotGaze('chef',  FIRE_GAZE);
    updateMascotGaze('chef', null);
    expect(getMascotGazeTarget('chef')).toBeNull();
  });
});
