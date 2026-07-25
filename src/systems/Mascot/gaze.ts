/**
 * FILE: gaze.ts
 *
 * PURPOSE:
 * Calculates gaze behavior.
 *
 * RESPONSIBILITY:
 * - Determines what objects attract attention.
 * - Updates gaze-related state.
 */

import { worldStore } from '../../store/worldStore';

export interface GazePoint {
  x: number;
  y: number;
}

/**
 * Discriminated union describing what the mascot is looking at.
 *
 * - entity  → a specific world entity (container or ingredient) by id
 * - mouse   → the user's cursor position (resolved by the UI layer)
 * - point   → an explicit SVG/screen coordinate
 * - null    → not gazing at anything; fall back to idle eye position
 */
export type GazeTarget =
  | { type: 'entity'; entityId: string }
  | { type: 'mouse' }
  | { type: 'point'; point: GazePoint }
  | null;

/** Narrow helper — returns the entityId when gazing at an entity, else null. */
export function gazeEntityId(target: GazeTarget): string | null {
  return target?.type === 'entity' ? target.entityId : null;
}

interface GazeState {
  gazingAt?: GazeTarget;
}

/**
 * Updates what target a mascot is looking at.
 * No-ops if the target is structurally identical to the current one.
 */
export function updateMascotGaze(mascotId: string, targetId: GazeTarget): void {
  const current = getMascotGazeTarget(mascotId);

  // Structural equality check — avoids redundant dispatches for the same target.
  if (JSON.stringify(current) === JSON.stringify(targetId)) return;

  worldStore.getState().dispatch({
    type: 'UPDATE_ENTITY_STATE',
    payload: {
      entityId: mascotId,
      changes: { gazingAt: targetId },
    },
  });
}

/** Returns the current gaze target for a mascot entity. */
export function getMascotGazeTarget(mascotId: string): GazeTarget {
  const entity = worldStore.getState().entities[mascotId];
  if (!entity) return null;
  const state = entity.state as GazeState | undefined;
  return state?.gazingAt ?? null;
}

/**
 * Subscribes to gaze changes for a given mascot.
 * Uses Zustand's vanilla subscribe so callers outside React can react to gaze updates
 * without polling or re-rendering unrelated components.
 *
 * Returns an unsubscribe function.
 *
 * @example
 *   const unsub = subscribeToGaze('chef', (target) => console.log(target));
 *   // later:
 *   unsub();
 */
export function subscribeToGaze(
  mascotId: string,
  callback: (target: GazeTarget) => void
): () => void {
  let prev = getMascotGazeTarget(mascotId);

  return worldStore.subscribe((state) => {
    const next = (state.entities[mascotId]?.state as GazeState | undefined)?.gazingAt ?? null;
    // Only fire when the gaze actually changes (structural check).
    if (JSON.stringify(next) !== JSON.stringify(prev)) {
      prev = next;
      callback(next);
    }
  });
}