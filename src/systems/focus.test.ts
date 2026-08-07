/**
 * FILE: focus.test.ts
 *
 * PURPOSE:
 * Unit tests for focus system calculations.
 *
 * RESPONSIBILITY:
 * - Validates container focus classes (primary, secondary, focus-background).
 * - Ensures ingredients/entities inside containers never lose visibility or get background opacity.
 * - Validates mascot focus class and action focus inference.
 */

import { describe, it, expect } from 'vitest';
import {
  getContainerFocusClass,
  getEntityFocusClass,
  getMascotFocusClass,
  inferFocusFromAction,
} from './focus';
import type { FocusTarget } from '../types/focus';

describe('Focus System', () => {
  const activeFocus: FocusTarget = {
    mode: 'focused',
    containerId: 'board',
    entityIds: ['potato'],
  };

  const normalFocus: FocusTarget = {
    mode: 'normal',
  };

  describe('getContainerFocusClass', () => {
    it('returns empty string in normal focus mode', () => {
      expect(getContainerFocusClass('board', normalFocus)).toBe('');
    });

    it('returns focus-primary for the explicitly targeted container', () => {
      expect(getContainerFocusClass('board', activeFocus)).toBe('focus-primary');
    });

    it('returns focus-secondary for related containers', () => {
      // board's related containers include 'sink', 'bowl', 'pantry', 'despensa'
      expect(getContainerFocusClass('sink', activeFocus)).toBe('focus-secondary');
      expect(getContainerFocusClass('bowl', activeFocus)).toBe('focus-secondary');
    });

    it('returns focus-secondary if container is actively on or being used', () => {
      expect(
        getContainerFocusClass('burner1', activeFocus, {
          isBeingUsed: true,
        })
      ).toBe('focus-secondary');
    });

    it('returns focus-background for inactive workstations (giving unused effect to frame)', () => {
      expect(getContainerFocusClass('burner1', activeFocus)).toBe('focus-background');
      expect(getContainerFocusClass('plate', activeFocus)).toBe('focus-background');
    });
  });

  describe('getEntityFocusClass', () => {
    it('returns empty string in normal focus mode', () => {
      expect(getEntityFocusClass('potato', 'board', normalFocus)).toBe('');
    });

    it('returns focus-primary for explicitly targeted entity IDs', () => {
      expect(getEntityFocusClass('potato', 'board', activeFocus)).toBe('focus-primary');
    });

    it('returns focus-primary for entities inside the focused primary container', () => {
      expect(getEntityFocusClass('onion', 'board', activeFocus)).toBe('focus-primary');
    });

    it('returns focus-secondary for entities inside workstations so ingredients stay visible', () => {
      expect(getEntityFocusClass('egg', 'burner1', activeFocus)).toBe('focus-secondary');
      expect(getEntityFocusClass('oil', 'despensa', activeFocus)).toBe('focus-secondary');
    });
  });

  describe('getMascotFocusClass', () => {
    it('returns empty string in normal focus mode', () => {
      expect(getMascotFocusClass(normalFocus)).toBe('');
    });

    it('returns focus-primary in active focus mode', () => {
      expect(getMascotFocusClass(activeFocus)).toBe('focus-primary');
    });
  });

  describe('inferFocusFromAction', () => {
    it('infers containerId and entityIds from MOVE_ENTITY', () => {
      const res = inferFocusFromAction({
        type: 'MOVE_ENTITY',
        payload: { entityId: 'egg', targetContainerId: 'bowl' },
      });
      expect(res).toEqual({
        containerId: 'bowl',
        entityIds: ['egg'],
      });
    });

    it('infers containerId from MASCOT_MOVE', () => {
      const res = inferFocusFromAction({
        type: 'MASCOT_MOVE',
        payload: { mascotId: 'chef', targetContainerId: 'burner1' },
      });
      expect(res).toEqual({
        containerId: 'burner1',
      });
    });

    it('infers containerId and entityIds from MASCOT_GRAB', () => {
      const res = inferFocusFromAction({
        type: 'MASCOT_GRAB',
        payload: { mascotId: 'chef', entityId: 'oil', sourceContainerId: 'despensa' },
      });
      expect(res).toEqual({
        containerId: 'despensa',
        entityIds: ['oil'],
      });
    });
  });
});
