/**
 * FILE: worldStore.ts
 *
 * PURPOSE:
 * Central Zustand store for the game world.
 *
 * RESPONSIBILITY:
 * - Owns world state.
 * - Stores entities, containers and relationships.
 * - Executes state transitions.
 *
 * ARCHITECTURE:
 * Systems request changes.
 * Store applies valid state mutations.
 */

import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import type { Container, Entity, WorldAction, WorldState } from '../types/world';
import { validateContainerRules } from '../engine/containerRules';
import { actionLog } from './middleware/actionLog';
import { ingredients as catalogIngredients } from '../data/catalog/ingredients';

const defaultEntities: Record<string, Entity> = {
  chef: { id: 'chef', name: 'Chef Tortilla 🍳', type: 'mascot', state: { gazingAt: 'Despensa' } },
  ...catalogIngredients.reduce((acc, item) => {
    acc[item.id] = {
      id: item.id,
      ingredientId: item.id,
      name: `${item.icon} ${item.name}`,
      type: 'ingredient',
      state: {},
    };
    return acc;
  }, {} as Record<string, Entity>),
};

const defaultContainers: Record<string, Container> = {
  despensa: {
    id: 'despensa',
    name: 'Despensa (All Ingredients - Immutable Catalog)',
    type: 'storage',
    entityIds: catalogIngredients.map((i) => i.id),
    rules: {
      maxCapacity: 20,
      allowedTypes: ['ingredient', 'tool'],
      consumesOnDrag: false,
      isImmutable: true,
    },
  },
  board: {
    id: 'board',
    name: 'Tabla (Cutting Board)',
    type: 'board',
    entityIds: [],
    rules: { maxCapacity: 3, allowedTypes: ['ingredient'] },
  },
  pan: {
    id: 'pan',
    name: 'Sartén (Skillet)',
    type: 'pan',
    entityIds: [],
    rules: { maxCapacity: 5, allowedTypes: ['ingredient'] },
  },
  plate: {
    id: 'plate',
    name: 'Plato (Plate)',
    type: 'plate',
    entityIds: [],
    rules: { maxCapacity: 5, allowedTypes: ['ingredient'] },
  },
};

function entitiesIn(container: Container, entities: Record<string, Entity>): Entity[] {
  return container.entityIds
    .map((id) => entities[id])
    .filter((entity): entity is Entity => Boolean(entity));
}

export const worldStore = createStore<WorldState>()(
  devtools(
    actionLog((set) => ({
      entities: defaultEntities,
      containers: defaultContainers,
      dispatch: (action: WorldAction) => {
        switch (action.type) {
          case 'MOVE_ENTITY': {
            const { entityId, targetContainerId, positionIndex } = action.payload;
            set(
              (state: WorldState) => {
                const entity = state.entities[entityId];
                const targetContainer = state.containers[targetContainerId];
                if (!entity || !targetContainer) return state;

                const sourceContainer = Object.values(state.containers).find((c) =>
                  c.entityIds.includes(entityId)
                );

                const isSourceImmutable =
                  sourceContainer?.rules?.isImmutable || sourceContainer?.rules?.consumesOnDrag === false;

                // Immutable source container logic: create a copy instance in target
                if (sourceContainer && sourceContainer.id !== targetContainerId && isSourceImmutable) {
                  const copyId = `${entity.id}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
                  const copyEntity: Entity = {
                    ...entity,
                    id: copyId,
                    ingredientId: entity.ingredientId || entity.id.split('_')[0],
                  };

                  const currentEntities = entitiesIn(targetContainer, state.entities);
                  const result = validateContainerRules(targetContainer, copyEntity, currentEntities);
                  if (!result.allowed) return state;

                  const targetIds = [...(state.containers[targetContainerId]?.entityIds || [])];
                  if (typeof positionIndex === 'number') {
                    targetIds.splice(positionIndex, 0, copyId);
                  } else {
                    targetIds.push(copyId);
                  }

                  return {
                    ...state,
                    entities: {
                      ...state.entities,
                      [copyId]: copyEntity,
                    },
                    containers: {
                      ...state.containers,
                      [targetContainerId]: {
                        ...targetContainer,
                        entityIds: targetIds,
                      },
                    },
                  };
                }

                // Reordering within the same container never re-checks rules
                if (sourceContainer?.id !== targetContainerId) {
                  const currentEntities = entitiesIn(targetContainer, state.entities).filter(
                    (e) => e.id !== entityId
                  );
                  const result = validateContainerRules(targetContainer, entity, currentEntities);
                  if (!result.allowed) return state;
                }

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
              },
              false,
              'MOVE_ENTITY'
            );
            break;
          }

          case 'ADD_ENTITY': {
            const { entity, containerId } = action.payload;
            set(
              (state: WorldState) => {
                const targetContainer = state.containers[containerId];
                if (!targetContainer) return state;

                const currentEntities = entitiesIn(targetContainer, state.entities);
                const result = validateContainerRules(
                  targetContainer,
                  entity as Entity,
                  currentEntities
                );
                if (!result.allowed) return state;

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
              },
              false,
              'ADD_ENTITY'
            );
            break;
          }

          case 'REMOVE_ENTITY': {
            const { entityId } = action.payload;
            set(
              (state: WorldState) => {
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
              },
              false,
              'REMOVE_ENTITY'
            );
            break;
          }

          case 'UPDATE_ENTITY_STATE': {
            const { entityId, changes } = action.payload;
            set(
              (state: WorldState) => {
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
              },
              false,
              'UPDATE_ENTITY_STATE'
            );
            break;
          }
        }
      },
    })),
    { name: 'tortilla-world' }
  )
);
