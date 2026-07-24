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
import { catalogTools } from '../data/catalog/tools';

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
  ...catalogTools.reduce((acc, item) => {
    acc[item.id] = {
      id: item.id,
      name: `${item.icon} ${item.name}`,
      type: 'tool',
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
    entityIds: [...catalogIngredients.map((i) => i.id), ...catalogTools.map((t) => t.id)],
    rules: {
      maxCapacity: 30,
      allowedTypes: ['ingredient', 'tool'],
      consumesOnDrag: false,
      isImmutable: true,
    },
  },
  sink: {
    id: 'sink',
    name: 'Fregadero (Sink)',
    type: 'sink',
    entityIds: [],
    rules: { maxCapacity: 10, allowedTypes: ['ingredient', 'tool'] },
  },
  board: {
    id: 'board',
    name: 'Tabla (Cutting Board)',
    type: 'board',
    entityIds: [],
    rules: { maxCapacity: 10, allowedTypes: ['ingredient', 'tool'] },
  },
  bowl: {
    id: 'bowl',
    name: 'Bol (Preparation Bowl)',
    type: 'bowl',
    entityIds: [],
    rules: { maxCapacity: 10, allowedTypes: ['ingredient', 'tool'] },
  },
  pan: {
    id: 'pan',
    name: 'Sartén (Skillet)',
    type: 'pan',
    entityIds: [],
    rules: { maxCapacity: 5, allowedTypes: ['ingredient', 'tool'] },
  },
  plate: {
    id: 'plate',
    name: 'Plato (Plate)',
    type: 'plate',
    entityIds: [],
    rules: { maxCapacity: 5, allowedTypes: ['ingredient', 'tool'] },
  },
};

function entitiesIn(container: Container, entities: Record<string, Entity>): Entity[] {
  return container.entityIds
    .map((id) => entities[id])
    .filter((entity): entity is Entity => Boolean(entity));
}

/**
 * Normalizes an ingredient entity ID or ingredientId to a singular ingredient key for generic status formatting.
 * Examples: 'potatoes' | 'potato' -> 'potatoe'
 *           'onions' | 'onion' -> 'onion'
 *           'carrots' | 'carrot' -> 'carrot'
 */
function getIngredientSingularKey(targetEntity: Entity): string {
  const baseKey = (targetEntity.ingredientId || targetEntity.id.split('_')[0] || 'ingredient').toLowerCase();
  if (baseKey.startsWith('potato')) return 'potatoe';
  if (baseKey.startsWith('tomato')) return 'tomato';
  if (baseKey.startsWith('onion')) return 'onion';
  if (baseKey.startsWith('carrot')) return 'carrot';
  if (baseKey.endsWith('es') && baseKey.length > 3) return baseKey.slice(0, -2);
  if (baseKey.endsWith('s') && !['cheese', 'glass'].includes(baseKey) && baseKey.length > 2) return baseKey.slice(0, -1);
  return baseKey;
}

/**
 * Derives the generic status string for a prepared ingredient.
 * Examples:
 * - preparation 'peeled' -> 'peeled'
 * - preparation 'sliced' for potato -> 'sliced-potatoe'
 * - preparation 'diced' for onion -> 'diced-onion'
 */
function derivePreparationStatus(targetEntity: Entity, preparation: string): string {
  const singularKey = getIngredientSingularKey(targetEntity);
  return preparation === 'peeled' ? 'peeled' : `${preparation}-${singularKey}`;
}

/**
 * Derives the generic status string for a cooked ingredient.
 * Examples:
 * - cooking 'fried' with prep 'sliced' for potato -> 'fried-sliced-potatoe'
 */
function deriveCookingStatus(targetEntity: Entity, cooking: string): string {
  const singularKey = getIngredientSingularKey(targetEntity);
  const prep = targetEntity.state?.preparation;
  if (cooking === 'raw') {
    return prep ? (prep === 'peeled' ? 'peeled' : `${prep}-${singularKey}`) : 'raw';
  }
  return `${cooking}-${prep ? prep + '-' : ''}${singularKey}`;
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

          case 'PREPARE_INGREDIENT': {
            const { entityId, preparation } = action.payload;
            set(
              (state: WorldState) => {
                const targetEntity = state.entities[entityId];
                if (!targetEntity) return state;

                const singularKey = getIngredientSingularKey(targetEntity);
                const status = derivePreparationStatus(targetEntity, preparation);

                const baseKey = (targetEntity.ingredientId || targetEntity.id.split('_')[0] || 'ingredient').toLowerCase();
                const catalogItem = catalogIngredients.find((i) => i.id === targetEntity.ingredientId || i.id === baseKey || i.id === singularKey);
                const icon = catalogItem?.icon || (targetEntity.name.match(/^(\p{Emoji}|\p{Extended_Pictographic})/u)?.[0] ?? '');
                const baseName = catalogItem?.name || targetEntity.name.replace(/^(\p{Emoji}|\p{Extended_Pictographic})\s*/u, '');

                const capitalizedPrep = preparation.charAt(0).toUpperCase() + preparation.slice(1);
                const updatedName = `${icon} ${capitalizedPrep} ${baseName}`.trim();

                return {
                  ...state,
                  entities: {
                    ...state.entities,
                    [entityId]: {
                      ...targetEntity,
                      name: updatedName,
                      state: {
                        ...targetEntity.state,
                        preparation,
                        status,
                      },
                    },
                  },
                };
              },
              false,
              'PREPARE_INGREDIENT'
            );
            break;
          }

          case 'COOK_INGREDIENT': {
            const { entityId, cooking } = action.payload;
            set(
              (state: WorldState) => {
                const targetEntity = state.entities[entityId];
                if (!targetEntity) return state;

                const status = deriveCookingStatus(targetEntity, cooking);

                return {
                  ...state,
                  entities: {
                    ...state.entities,
                    [entityId]: {
                      ...targetEntity,
                      state: {
                        ...targetEntity.state,
                        cooking,
                        status,
                      },
                    },
                  },
                };
              },
              false,
              'COOK_INGREDIENT'
            );
            break;
          }

          case 'MASCOT_FLIP': {
            const mascotId = action.payload.mascotId || 'chef';
            set(
              (state: WorldState) => {
                const targetEntity = state.entities[mascotId];
                if (!targetEntity) return state;

                return {
                  ...state,
                  entities: {
                    ...state.entities,
                    [mascotId]: {
                      ...targetEntity,
                      state: {
                        ...targetEntity.state,
                        state: 'flipping',
                        isFlipping: true,
                      },
                    },
                  },
                };
              },
              false,
              'MASCOT_FLIP'
            );

            setTimeout(() => {
              set(
                (state: WorldState) => {
                  const targetEntity = state.entities[mascotId];
                  if (!targetEntity || targetEntity.state?.state !== 'flipping') return state;

                  return {
                    ...state,
                    entities: {
                      ...state.entities,
                      [mascotId]: {
                        ...targetEntity,
                        state: {
                          ...targetEntity.state,
                          state: 'idle',
                          isFlipping: false,
                        },
                      },
                    },
                  };
                },
                false,
                'RESET_MASCOT_FLIP'
              );
            }, 800);
            break;
          }

          case 'MASCOT_MOVE': {
            const mascotId = action.payload.mascotId || 'chef';
            const { targetContainerId } = action.payload;
            set(
              (state: WorldState) => {
                const targetEntity = state.entities[mascotId];
                if (!targetEntity) return state;

                return {
                  ...state,
                  entities: {
                    ...state.entities,
                    [mascotId]: {
                      ...targetEntity,
                      state: {
                        ...targetEntity.state,
                        gazingAt: targetContainerId,
                        targetContainerId,
                      },
                    },
                  },
                };
              },
              false,
              'MASCOT_MOVE'
            );
            break;
          }

          case 'MASCOT_GRAB': {
            const mascotId = action.payload.mascotId || 'chef';
            const { entityId, sourceContainerId } = action.payload;
            set(
              (state: WorldState) => {
                const mascot = state.entities[mascotId];
                if (!mascot) return state;
                const grabbedEntity = state.entities[entityId];
                if (!grabbedEntity) return state;

                const foundSource = sourceContainerId
                  ? state.containers[sourceContainerId]
                  : Object.values(state.containers).find((c) => c.entityIds.includes(entityId));

                return {
                  ...state,
                  entities: {
                    ...state.entities,
                    [mascotId]: {
                      ...mascot,
                      state: {
                        ...mascot.state,
                        holdingEntityId: entityId,
                        sourceContainerId: foundSource?.id,
                        gazingAt: foundSource?.id || mascot.state?.gazingAt,
                      },
                    },
                  },
                };
              },
              false,
              'MASCOT_GRAB'
            );
            break;
          }

          case 'MASCOT_DROP': {
            const mascotId = action.payload.mascotId || 'chef';
            const { targetContainerId, positionIndex } = action.payload;

            set(
              (state: WorldState) => {
                const mascot = state.entities[mascotId];
                if (!mascot) return state;

                const holdingEntityId = mascot.state?.holdingEntityId as string | undefined;

                if (!holdingEntityId) {
                  return {
                    ...state,
                    entities: {
                      ...state.entities,
                      [mascotId]: {
                        ...mascot,
                        state: {
                          ...mascot.state,
                          gazingAt: targetContainerId,
                        },
                      },
                    },
                  };
                }

                const entityToMove = state.entities[holdingEntityId];
                const targetContainer = state.containers[targetContainerId];
                if (!entityToMove || !targetContainer) return state;

                const sourceContainerId = mascot.state?.sourceContainerId as string | undefined;
                const sourceContainer = sourceContainerId
                  ? state.containers[sourceContainerId]
                  : Object.values(state.containers).find((c) => c.entityIds.includes(holdingEntityId));

                const isSourceImmutable =
                  sourceContainer?.rules?.isImmutable || sourceContainer?.rules?.consumesOnDrag === false;

                let finalEntityId = holdingEntityId;
                const newEntities = { ...state.entities };

                if (sourceContainer && sourceContainer.id !== targetContainerId && isSourceImmutable) {
                  const copyId = `${entityToMove.id}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
                  const copyEntity: Entity = {
                    ...entityToMove,
                    id: copyId,
                    ingredientId: entityToMove.ingredientId || entityToMove.id.split('_')[0],
                  };

                  const currentEntities = entitiesIn(targetContainer, state.entities);
                  const result = validateContainerRules(targetContainer, copyEntity, currentEntities);
                  if (!result.allowed) return state;

                  finalEntityId = copyId;
                  newEntities[copyId] = copyEntity;
                } else {
                  const currentEntities = entitiesIn(targetContainer, state.entities).filter(
                    (e) => e.id !== holdingEntityId
                  );
                  const result = validateContainerRules(targetContainer, entityToMove, currentEntities);
                  if (!result.allowed) return state;
                }

                const newContainers = { ...state.containers };

                if (sourceContainer && !isSourceImmutable) {
                  newContainers[sourceContainer.id] = {
                    ...sourceContainer,
                    entityIds: sourceContainer.entityIds.filter((id) => id !== holdingEntityId),
                  };
                }

                const targetIds = [...(newContainers[targetContainerId]?.entityIds || [])];
                if (typeof positionIndex === 'number') {
                  targetIds.splice(positionIndex, 0, finalEntityId);
                } else {
                  targetIds.push(finalEntityId);
                }

                newContainers[targetContainerId] = {
                  ...targetContainer,
                  entityIds: targetIds,
                };

                return {
                  ...state,
                  entities: {
                    ...newEntities,
                    [mascotId]: {
                      ...mascot,
                      state: {
                        ...mascot.state,
                        holdingEntityId: undefined,
                        sourceContainerId: undefined,
                        gazingAt: targetContainerId,
                      },
                    },
                  },
                  containers: newContainers,
                };
              },
              false,
              'MASCOT_DROP'
            );
            break;
          }
        }
      },
    })),
    { name: 'tortilla-world' }
  )
);
