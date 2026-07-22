import { worldStore } from '../store/worldStore';

export interface MascotState {
  id: string;
  gazingAt: string | null;
}

export function updateMascotTarget(mascotId: string, targetContainerId: string | null): void {
  worldStore.getState().dispatch({
    type: 'UPDATE_ENTITY_STATE',
    payload: {
      entityId: mascotId,
      changes: { gazingAt: targetContainerId },
    },
  });
}