// src/systems/gaze.ts

import { worldStore } from '../store/worldStore';

export const MASCOT_ID = 'mascot';

export type GazeTarget = string | null;

export interface MascotState {
  gazingAt?: string | null;
  expression?: string;
}

/**
 * Calculates the primary target container or entity that the mascot should gaze towards.
 * Queries current world state from worldStore.
 */
export const calculateGazeTarget = (
  hoveredContainerId?: string | null,
  activeEntityId?: string | null
): GazeTarget => {
  const { entities, containers } = worldStore.getState();

  // If an entity is actively being dragged, prioritize its target container or current location
  if (activeEntityId) {
    const activeEntity = entities[activeEntityId];
    if (activeEntity) {
      return hoveredContainerId ?? activeEntity.containerId;
    }
  }

  // If hovering over a valid container, gaze at that container
  if (hoveredContainerId && containers[hoveredContainerId]) {
    return hoveredContainerId;
  }

  return null;
};

/**
 * Updates the mascot entity's gaze state by dispatching an UPDATE_ENTITY_STATE world action.
 */
export const updateMascotGaze = (targetId: string | null): void => {
  const store = worldStore.getState();
  const mascot = store.entities[MASCOT_ID];

  if (!mascot) return;

  const currentGaze = (mascot.state as MascotState | undefined)?.gazingAt;

  // No-op if mascot is already gazing at this target
  if (currentGaze === targetId) return;

  store.dispatch({
    type: 'UPDATE_ENTITY_STATE',
    timestamp: Date.now(),
    payload: {
      entityId: MASCOT_ID,
      statePatch: {
        gazingAt: targetId
      }
    }
  });
};