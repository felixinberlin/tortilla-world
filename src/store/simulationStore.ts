/**
 * FILE: simulationStore.ts
 *
 * PURPOSE:
 * Base integration layer store combining minimal 3D simulation state with the timeline slice.
 */

import { create } from 'zustand';
import { createStore } from 'zustand/vanilla';
import type { StoreApi, StateCreator } from 'zustand';
import type { TimelineSlice, TimelineEvent } from './slices/timelineSlice';
import { createTimelineSlice } from './slices/timelineSlice';

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface SimulationEntity {
  id: string;
  position: Vector3;
  velocity: Vector3;
}

export interface ForceAppliedPayload {
  entityId: string;
  force: Vector3;
}

export interface ForceAppliedEvent extends TimelineEvent<'FORCE_APPLIED', ForceAppliedPayload> {
  id: string;
  type: 'FORCE_APPLIED';
  payload: ForceAppliedPayload;
  timestamp?: number;
}

export type SimulationEvent = ForceAppliedEvent;

export interface SimulationState {
  entities: Record<string, SimulationEntity>;
}

export interface SimulationActions {
  applyForce: (entityId: string, force: Vector3) => void;
  resetSimulation: () => void;
  handleReplayEvent: (event: SimulationEvent) => void;
}

export type SimulationStoreState = SimulationState & SimulationActions & TimelineSlice<SimulationEvent>;

export const createSimulationStoreState = (
  initialEntities: Record<string, SimulationEntity> = {}
): StateCreator<SimulationStoreState> => (set, get, store) => {
  const timelineSlice = createTimelineSlice<SimulationEvent, SimulationStoreState>()(set, get, store);

  const applyForceInternal = (entityId: string, force: Vector3) => {
    set((state) => {
      const currentEntity = state.entities[entityId] || {
        id: entityId,
        position: { x: 0, y: 0, z: 0 },
        velocity: { x: 0, y: 0, z: 0 },
      };

      const newVelocity: Vector3 = {
        x: currentEntity.velocity.x + force.x,
        y: currentEntity.velocity.y + force.y,
        z: currentEntity.velocity.z + force.z,
      };

      const newPosition: Vector3 = {
        x: currentEntity.position.x + newVelocity.x,
        y: currentEntity.position.y + newVelocity.y,
        z: currentEntity.position.z + newVelocity.z,
      };

      return {
        entities: {
          ...state.entities,
          [entityId]: {
            ...currentEntity,
            velocity: newVelocity,
            position: newPosition,
          },
        },
      };
    });
  };

  return {
    ...timelineSlice,

    entities: initialEntities,

    applyForce: (entityId: string, force: Vector3) => {
      applyForceInternal(entityId, force);

      const event: ForceAppliedEvent = {
        id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        type: 'FORCE_APPLIED',
        payload: {
          entityId,
          force,
        },
        timestamp: Date.now(),
      };

      get().recordEvent(event);
    },

    resetSimulation: () => {
      set({
        entities: initialEntities,
      });
    },

    handleReplayEvent: (event: SimulationEvent) => {
      switch (event.type) {
        case 'FORCE_APPLIED':
          applyForceInternal(event.payload.entityId, event.payload.force);
          break;
        default:
          break;
      }
    },
  };
};

export function createSimulationStore(initialEntities: Record<string, SimulationEntity> = {}): StoreApi<SimulationStoreState> {
  return createStore<SimulationStoreState>(createSimulationStoreState(initialEntities));
}

export const useSimulationStore = create<SimulationStoreState>(createSimulationStoreState());
