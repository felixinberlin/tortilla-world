// src/systems/gaze.ts

import { worldStore } from '../store/worldStore';

export type GazeTarget = string | null;

interface GazeState {
  gazingAt?: GazeTarget;
}

/**
 * Updates what target a mascot is looking at.
 */
export function updateMascotGaze(
  mascotId: string,
  targetId: GazeTarget
): void {
  const currentTarget = getMascotGazeTarget(mascotId);

  if (currentTarget === targetId) {
    return;
  }

  worldStore.getState().dispatch({
    type: 'UPDATE_ENTITY_STATE',
    payload: {
      entityId: mascotId,
      changes: {
        gazingAt: targetId,
      },
    },
  });
}

/**
 * Returns the current gaze target.
 */
export function getMascotGazeTarget(
  mascotId: string
): GazeTarget {
  const entity = worldStore.getState().entities[mascotId];

  if (!entity) {
    return null;
  }

  const state = entity.state as GazeState | undefined;

  return state?.gazingAt ?? null;
}