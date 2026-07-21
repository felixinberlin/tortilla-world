// src/systems/movement.ts

import { worldStore } from '../store/worldStore';

export const moveEntityToContainer = (
  entityId: string,
  fromContainerId: string | null,
  toContainerId: string,
  targetIndex?: number
) => {
  return worldStore.getState().dispatch({
    type: 'MOVE_ENTITY',
    timestamp: Date.now(),
    payload: {
      entityId,
      fromContainerId,
      toContainerId,
      targetIndex
    }
  });
};