// src/systems/movement.ts

import { worldStore } from '../store/worldStore';

/**
 * Requests that an entity be moved to another container.
 * The reducer determines the source container automatically.
 */
export function moveEntity(
  entityId: string,
  targetContainerId: string,
  positionIndex?: number
): void {
  worldStore.getState().dispatch({
    type: 'MOVE_ENTITY',
    payload: {
      entityId,
      targetContainerId,
      positionIndex,
    },
  });
}