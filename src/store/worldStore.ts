// src/store/worldStore.ts

import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';
import type { Container, Entity, WorldAction } from '../types/world';
import { ContainerAuthority } from '../engine/containerRules';

export interface WorldState {
  entities: Record<string, Entity>;
  containers: Record<string, Container>;

  // Direct State Methods
  getEntity: (id: string) => Entity | undefined;
  getContainer: (id: string) => Container | undefined;
  getEntitiesInContainer: (containerId: string) => Entity[];

  // Central Action Dispatcher
  dispatch: (action: WorldAction) => { success: boolean; error?: string };
}

export const worldStore = createStore<WorldState>((set, get) => ({
  entities: {},
  containers: {},

  getEntity: (id) => get().entities[id],
  getContainer: (id) => get().containers[id],
  getEntitiesInContainer: (containerId) => {
    const container = get().containers[containerId];
    if (!container) return [];
    return container.entityIds
      .map((id) => get().entities[id])
      .filter((e): e is Entity => e !== undefined);
  },

  dispatch: (action: WorldAction) => {
    const state = get();

    switch (action.type) {
      case 'MOVE_ENTITY': {
        const { entityId, fromContainerId, toContainerId, targetIndex } = action.payload;
        const entity = state.entities[entityId];
        const targetContainer = state.containers[toContainerId];

        if (!entity) return { success: false, error: `Entity '${entityId}' does not exist.` };
        if (!targetContainer) return { success: false, error: `Container '${toContainerId}' does not exist.` };

        const currentTargetEntities = state.getEntitiesInContainer(toContainerId);
        const validation = ContainerAuthority.canAccept(targetContainer, entity, currentTargetEntities);
        if (!validation.valid) {
          return { success: false, error: validation.reason };
        }

        set((prevState) => {
          const updatedContainers = { ...prevState.containers };
          const updatedEntities = { ...prevState.entities };

          if (fromContainerId && updatedContainers[fromContainerId]) {
            const sourceContainer = updatedContainers[fromContainerId];
            updatedContainers[fromContainerId] = {
              ...sourceContainer,
              entityIds: sourceContainer.entityIds.filter((id) => id !== entityId)
            };
          }

          updatedEntities[entityId] = {
            ...entity,
            containerId: toContainerId
          };

          const targetEntityIds = [...updatedContainers[toContainerId].entityIds];
          if (targetIndex !== undefined && targetIndex >= 0 && targetIndex <= targetEntityIds.length) {
            targetEntityIds.splice(targetIndex, 0, entityId);
          } else {
            targetEntityIds.push(entityId);
          }

          updatedContainers[toContainerId] = {
            ...updatedContainers[toContainerId],
            entityIds: targetEntityIds
          };

          return {
            entities: updatedEntities,
            containers: updatedContainers
          };
        });

        return { success: true };
      }

      case 'UPDATE_ENTITY_STATE': {
        const { entityId, statePatch } = action.payload;
        const entity = state.entities[entityId];
        if (!entity) return { success: false, error: `Entity '${entityId}' not found.` };

        set((prevState) => ({
          entities: {
            ...prevState.entities,
            [entityId]: {
              ...entity,
              state: { ...entity.state, ...statePatch }
            }
          }
        }));

        return { success: true };
      }

      default:
        return { success: false, error: 'Unhandled action type.' };
    }
  }
}));

/**
 * React Hook helper to read worldStore reactively within components.
 */
export const useWorldStore = <T>(selector: (state: WorldState) => T): T =>
  useStore(worldStore, selector);