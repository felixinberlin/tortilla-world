// src/systems/mascot.ts

import { worldStore } from '../store/worldStore';

export const MASCOT_ID = 'mascot';

export interface MascotState {
  gazingAt?: string | null;
  expression?: string;
}

export const updateMascotGaze = (targetContainerId: string) => {
  const state = worldStore.getState();
  const mascot = state.entities[MASCOT_ID];
  if (!mascot) return;

  state.dispatch({
    type: 'UPDATE_ENTITY_STATE',
    timestamp: Date.now(),
    payload: {
      entityId: MASCOT_ID,
      statePatch: { gazingAt: targetContainerId }
    }
  });
};