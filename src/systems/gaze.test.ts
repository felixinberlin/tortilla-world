// src/systems/gaze.test.ts

import { describe, it, expect, beforeEach } from 'vitest';
import { calculateGazeTarget, updateMascotGaze, MASCOT_ID, type MascotState } from './gaze';
import { worldStore } from '../store/worldStore';

describe('Gaze System (src/systems/gaze.ts)', () => {
  beforeEach(() => {
    // Reset store to a clean baseline before each test
    worldStore.setState({
      entities: {
        [MASCOT_ID]: {
          id: MASCOT_ID,
          name: 'Mascot',
          type: 'tool',
          containerId: 'bench',
          state: { expression: 'happy', gazingAt: null }
        },
        ingredient1: {
          id: 'ingredient1',
          name: 'Ingredient 1',
          type: 'ingredient',
          containerId: 'pan',
          state: {}
        }
      },
      containers: {
        bench: { id: 'bench', name: 'Bench', type: 'surface', rules: { maxCapacity: Infinity }, entityIds: [MASCOT_ID] },
        pan: { id: 'pan', name: 'Pan', type: 'pan', rules: { maxCapacity: Infinity }, entityIds: ['ingredient1'] },
        plate: { id: 'plate', name: 'Plate', type: 'plate', rules: { maxCapacity: Infinity }, entityIds: [] }
      }
    });
  });

  describe('calculateGazeTarget', () => {
    it('returns null when no hover container or active entity is provided', () => {
      expect(calculateGazeTarget()).toBeNull();
      expect(calculateGazeTarget(null, null)).toBeNull();
    });

    it('returns hoveredContainerId when hovering over a valid container', () => {
      expect(calculateGazeTarget('pan')).toBe('pan');
      expect(calculateGazeTarget('plate')).toBe('plate');
    });

    it('returns null when hovering over a non-existent container', () => {
      expect(calculateGazeTarget('non_existent_container')).toBeNull();
    });

    it('returns active entity container location when dragging an entity with no hover target', () => {
      expect(calculateGazeTarget(null, 'ingredient1')).toBe('pan');
    });

    it('prioritizes hovered target container over active entity container location during drag', () => {
      expect(calculateGazeTarget('plate', 'ingredient1')).toBe('plate');
    });

    it('returns null when active entity ID does not exist in world state', () => {
      expect(calculateGazeTarget(null, 'non_existent_entity')).toBeNull();
    });

    it('falls back to valid hover container if active entity ID is invalid', () => {
      expect(calculateGazeTarget('bench', 'non_existent_entity')).toBe('bench');
    });

    it('dynamically reflects updated entity container locations from store', () => {
      // Simulate moving ingredient1 to plate in world state
      worldStore.setState({
        ...worldStore.getState(),
        entities: {
          ...worldStore.getState().entities,
          ingredient1: {
            ...worldStore.getState().entities['ingredient1'],
            containerId: 'plate'
          }
        }
      });

      expect(calculateGazeTarget(null, 'ingredient1')).toBe('plate');
    });
  });

  describe('updateMascotGaze', () => {
    it('updates mascot gazingAt state by dispatching an action to world store', () => {
      updateMascotGaze('pan');

      const mascot = worldStore.getState().entities[MASCOT_ID];
      expect((mascot.state as MascotState).gazingAt).toBe('pan');
    });

    it('allows clearing mascot gaze target back to null', () => {
      updateMascotGaze('pan');
      expect((worldStore.getState().entities[MASCOT_ID].state as MascotState).gazingAt).toBe('pan');

      updateMascotGaze(null);
      expect((worldStore.getState().entities[MASCOT_ID].state as MascotState).gazingAt).toBeNull();
    });

    it('preserves existing state properties on mascot entity when gaze changes', () => {
      updateMascotGaze('plate');

      const mascot = worldStore.getState().entities[MASCOT_ID];
      expect(mascot.state).toEqual({
        expression: 'happy',
        gazingAt: 'plate'
      });
    });

    it('is idempotent and does not emit redundant state updates when target is unchanged', () => {
      updateMascotGaze('pan');
      const stateBefore = worldStore.getState().entities[MASCOT_ID];

      // Second call with same target
      updateMascotGaze('pan');
      const stateAfter = worldStore.getState().entities[MASCOT_ID];

      // Reference equality proves no redundant store dispatch occurred
      expect(stateBefore).toBe(stateAfter);
    });

    it('handles missing mascot entity gracefully without throwing an error', () => {
      // Remove mascot from store
      const { [MASCOT_ID]: _, ...entitiesWithoutMascot } = worldStore.getState().entities;
      worldStore.setState({
        ...worldStore.getState(),
        entities: entitiesWithoutMascot
      });

      expect(() => updateMascotGaze('pan')).not.toThrow();
    });
  });
});