/**
 * FILE: gazeStore.ts
 *
 * PURPOSE:
 * Stores mascot gaze/attention state.
 *
 * RESPONSIBILITY:
 * - Tracks what the mascot is looking at.
 * - Provides gaze information to UI components.
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { GazeTarget } from '../systems/gaze';
import { gazeEntityId } from '../systems/gaze';

interface GazeState {
  /**
   * Whatever the mascot should be looking at right now.
   * null → fall back to idle eye position.
   */
  target: GazeTarget;
  setTarget: (target: GazeTarget) => void;
  clearTarget: () => void;
}

/**
 * Standalone gaze store — separate from worldStore so UI components
 * (TortillaSvg, eye-tracking overlays) can subscribe to gaze changes
 * with fine-grained selectors and zero coupling to world state shape.
 *
 * Uses subscribeWithSelector middleware so callers can subscribe to
 * slices of gaze state without triggering on unrelated updates.
 *
 * @example
 *   // React component: only re-renders when entityId changes
 *   const entityId = useGazeStore((s) => gazeEntityId(s.target));
 *
 *   // Outside React: subscribe to entity-gaze changes only
 *   useGazeStore.subscribe(
 *     (s) => gazeEntityId(s.target),
 *     (id) => console.log('now gazing at entity', id)
 *   );
 */
export const useGazeStore = create<GazeState>()(
  subscribeWithSelector((set) => ({
    target: null,
    setTarget: (target) => set({ target }),
    clearTarget: () => set({ target: null }),
  }))
);

// Re-export the narrow helper so consumers don't need a separate import.
export { gazeEntityId };