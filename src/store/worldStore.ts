import { createStore } from 'zustand/vanilla';
import type { WorldState, WorldAction, Entity } from '../types/world';

export const worldStore = createStore<WorldState>((set) => ({
  entities: {},
  containers: {},
  dispatch: (action: WorldAction) => {
    switch (action.type) {
      case 'MOVE_ENTITY': {
        const { entityId, targetContainerId, positionIndex } = action.payload;
        set((state: WorldState) => {
          const sourceContainer = Object.values(state.containers).find((c) =>
            c.entityIds.includes(entityId)
          );
          const targetContainer = state.containers[targetContainerId];

          if (!targetContainer) return state;

          const newContainers = { ...state.containers };

          if (sourceContainer) {
            newContainers[sourceContainer.id] = {
              ...sourceContainer,
              entityIds: sourceContainer.entityIds.filter((id) => id !== entityId),
            };
          }

          const targetIds = [...(newContainers[targetContainerId]?.entityIds || [])];
          if (typeof positionIndex === 'number') {
            targetIds.splice(positionIndex, 0, entityId);
          } else {
            targetIds.push(entityId);
          }

          newContainers[targetContainerId] = {
            ...targetContainer,
            entityIds: targetIds,
          };

          return { ...state, containers: newContainers };
        });
        break;
      }

      case 'ADD_ENTITY': {
        const { entity, containerId } = action.payload;
        set((state: WorldState) => {
          const targetContainer = state.containers[containerId];
          if (!targetContainer) return state;

          return {
            ...state,
            entities: {
              ...state.entities,
              [entity.id]: entity as Entity,
            },
            containers: {
              ...state.containers,
              [containerId]: {
                ...targetContainer,
                entityIds: [...targetContainer.entityIds, entity.id],
              },
            },
          };
        });
        break;
      }

      case 'REMOVE_ENTITY': {
        const { entityId } = action.payload;
        set((state: WorldState) => {
          const newEntities = { ...state.entities };
          delete newEntities[entityId];

          const newContainers = { ...state.containers };
          for (const cId in newContainers) {
            newContainers[cId] = {
              ...newContainers[cId],
              entityIds: newContainers[cId].entityIds.filter((id) => id !== entityId),
            };
          }

          return {
            ...state,
            entities: newEntities,
            containers: newContainers,
          };
        });
        break;
      }

      case 'UPDATE_ENTITY_STATE': {
        const { entityId, changes } = action.payload;
        set((state: WorldState) => {
          const targetEntity = state.entities[entityId];
          if (!targetEntity) return state;

          return {
            ...state,
            entities: {
              ...state.entities,
              [entityId]: {
                ...targetEntity,
                state: {
                  ...targetEntity.state,
                  ...changes,
                },
              },
            },
          };
        });
        break;
      }
    }
  },
}));