/**
 * FILE: containerSlice.ts
 *
 * PURPOSE:
 * Zustand slice for container management and entity transfers/movements.
 *
 * RESPONSIBILITY:
 * - Mutates container entity IDs in world state.
 * - Enforces container rules and handles immutable source container copies.
 */

import type { StateCreator } from 'zustand/vanilla';
import type { Container, Entity } from '../../types/world';
import type { WorldStateStore } from '../types';
import { validateContainerRules } from '../../engine/containerRules';

export interface ContainerSlice {
  containers: Record<string, Container>;
  moveEntity: (entityId: string, targetContainerId: string, positionIndex?: number) => void;
  emptyTrash: () => void;
  addWorkstationContainer: (
    typeOrContainer: 'board' | 'burner' | 'bowl' | 'sink' | 'plate' | 'trash' | Container
  ) => void;
  removeWorkstationContainer: (containerId: string) => void;
}

export const createContainerSlice: StateCreator<
  WorldStateStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  ContainerSlice
> = (set, get) => ({
  containers: {},

  addWorkstationContainer: (typeOrContainer) => {
    set(
      (draft) => {
        if (typeof typeOrContainer === 'object' && typeOrContainer !== null) {
          const container = typeOrContainer as Container;
          draft.containers[container.id] = JSON.parse(JSON.stringify(container));
          return;
        }

        const type = typeOrContainer;
        const currentContainers = Object.values(draft.containers);
        const existingOfType = currentContainers.filter(
          (c) => c.type === type || c.id.startsWith(type) || c.id.includes(type)
        );
        const count = existingOfType.length;

        let newId: string;
        let newName: string;
        let rules: Container['rules'] = { maxCapacity: 10, allowedTypes: ['ingredient', 'tool'] };
        let isOn: boolean | undefined = undefined;

        if (type === 'board') {
          newId = count === 0 && !draft.containers['board'] ? 'board' : `board${count + 1}`;
          newName = `Tabla ${count + 1} (Cutting Board ${count + 1})`;
        } else if (type === 'burner') {
          newId = count === 0 && !draft.containers['burner1'] ? 'burner1' : `burner${count + 1}`;
          newName = `Fuego ${count + 1} (Burner ${count + 1})`;
          rules = { maxCapacity: 5, allowedTypes: ['ingredient', 'tool'] };
          isOn = false;
        } else if (type === 'bowl') {
          newId = count === 0 && !draft.containers['bowl'] ? 'bowl' : `bowl${count + 1}`;
          newName = `Bol ${count + 1} (Prep Bowl ${count + 1})`;
        } else if (type === 'sink') {
          newId = count === 0 && !draft.containers['sink'] ? 'sink' : `sink${count + 1}`;
          newName = `Fregadero ${count + 1} (Sink ${count + 1})`;
        } else if (type === 'plate') {
          newId = count === 0 && !draft.containers['plate'] ? 'plate' : `plate${count + 1}`;
          newName = `Plato ${count + 1} (Serving Plate ${count + 1})`;
        } else if (type === 'trash') {
          newId = count === 0 && !draft.containers['trash'] ? 'trash' : `trash${count + 1}`;
          newName = `Basura ${count + 1} (Trash ${count + 1})`;
          rules = { maxCapacity: 20, allowedTypes: ['ingredient', 'tool'] };
        } else {
          newId = `${type}_${Date.now()}`;
          newName = `${type} (${count + 1})`;
        }

        if (draft.containers[newId]) {
          newId = `${type}_${Date.now()}`;
        }

        const newContainer: Container = {
          id: newId,
          name: newName,
          type,
          entityIds: [],
          rules,
          ...(isOn !== undefined ? { isOn } : {}),
        };

        draft.containers[newId] = newContainer;
      },
      false,
      'ADD_CONTAINER'
    );
  },

  removeWorkstationContainer: (containerId: string) => {
    if (containerId === 'despensa') return;
    set(
      (draft) => {
        const targetContainer = draft.containers[containerId];
        if (!targetContainer) return;

        const orphanEntityIds = targetContainer.entityIds || [];
        if (orphanEntityIds.length > 0 && draft.containers['despensa']) {
          orphanEntityIds.forEach((eId) => {
            if (!draft.containers['despensa'].entityIds.includes(eId)) {
              draft.containers['despensa'].entityIds.push(eId);
            }
          });
        }

        delete draft.containers[containerId];
      },
      false,
      'REMOVE_CONTAINER'
    );
  },

  emptyTrash: () => {
    set(
      (draft) => {
        const trashContainer = draft.containers['trash'];
        if (trashContainer) {
          trashContainer.entityIds.forEach((id) => {
            delete draft.entities[id];
          });
          trashContainer.entityIds = [];
        }
      },
      false,
      'EMPTY_TRASH'
    );
  },

  moveEntity: (entityId, targetContainerId, positionIndex) => {
    const state = get();
    if (targetContainerId === 'chef' || targetContainerId === 'tortilla' || targetContainerId === 'mascot') {
      state.mascotGrab(entityId, undefined, 'chef');
      return;
    }

    const entity = state.entities[entityId];
    const targetContainer = state.containers[targetContainerId];
    if (!entity || !targetContainer) return;

    const sourceContainer = Object.values(state.containers).find((c) =>
      c.entityIds.includes(entityId)
    );

    const isSourceImmutable =
      sourceContainer?.rules?.isImmutable || sourceContainer?.rules?.consumesOnDrag === false;
    const isTargetPlate = targetContainerId === 'plate' || targetContainerId === 'plato';

    // Immutable source container logic: create a copy instance in target
    if (sourceContainer && sourceContainer.id !== targetContainerId && isSourceImmutable) {
      const copyId = `${entity.id}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const copyEntity: Entity = {
        ...entity,
        id: copyId,
        ingredientId: entity.ingredientId || entity.id.split('_')[0],
      };
      if (isTargetPlate) {
        copyEntity.name = state.activeRecipeName || 'Tortilla Española Clásica';
      }

      const currentEntities = targetContainer.entityIds
        .map((id) => state.entities[id])
        .filter((e): e is Entity => Boolean(e));
      const result = validateContainerRules(targetContainer, copyEntity, currentEntities);
      if (!result.allowed) {
        if (result.reason) {
          set(
            (draft) => {
              const mascot = draft.entities['chef'];
              if (mascot) {
                mascot.state = {
                  ...mascot.state,
                  speechMessage: result.reason,
                  targetContainerId,
                  gazingAt: { type: 'entity', entityId: targetContainerId },
                };
              }
            },
            false,
            'MASCOT_REFUSAL_SPEECH'
          );
          setTimeout(() => {
            set(
              (draft) => {
                const mascot = draft.entities['chef'];
                if (mascot && mascot.state?.speechMessage === result.reason) {
                  mascot.state = {
                    ...mascot.state,
                    speechMessage: undefined,
                  };
                }
              },
              false,
              'CLEAR_MASCOT_REFUSAL_SPEECH'
            );
          }, 3500);
        }
        return;
      }

      set(
        (draft) => {
          draft.entities[copyId] = copyEntity;
          if (typeof positionIndex === 'number') {
            draft.containers[targetContainerId].entityIds.splice(positionIndex, 0, copyId);
          } else {
            draft.containers[targetContainerId].entityIds.push(copyId);
          }
          const mascot = draft.entities['chef'];
          if (mascot) {
            const rawHolding = mascot.state?.holdingEntityIds as string[] | undefined;
            const updatedHolding = rawHolding ? rawHolding.filter((id) => id !== entityId) : [];
            mascot.state = {
              ...mascot.state,
              gazingAt: { type: 'entity', entityId: targetContainerId },
              targetContainerId,
              holdingEntityIds: updatedHolding,
              holdingEntityId: updatedHolding.length > 0 ? updatedHolding[updatedHolding.length - 1] : undefined,
            };
          }
        },
        false,
        'MOVE_ENTITY'
      );

      if (targetContainer.type === 'sink' || targetContainerId.includes('sink') || targetContainerId.includes('fregadero')) {
        get().transformIngredient(copyId, 'wash');
      }
      return;
    }

    // Reordering within the same container never re-checks rules
    if (sourceContainer?.id !== targetContainerId) {
      const currentEntities = targetContainer.entityIds
        .map((id) => state.entities[id])
        .filter((e): e is Entity => Boolean(e) && e.id !== entityId);
      const result = validateContainerRules(targetContainer, entity, currentEntities);
      if (!result.allowed) {
        if (result.reason) {
          set(
            (draft) => {
              const mascot = draft.entities['chef'];
              if (mascot) {
                mascot.state = {
                  ...mascot.state,
                  speechMessage: result.reason,
                  targetContainerId,
                  gazingAt: { type: 'entity', entityId: targetContainerId },
                };
              }
            },
            false,
            'MASCOT_REFUSAL_SPEECH'
          );
          setTimeout(() => {
            set(
              (draft) => {
                const mascot = draft.entities['chef'];
                if (mascot && mascot.state?.speechMessage === result.reason) {
                  mascot.state = {
                    ...mascot.state,
                    speechMessage: undefined,
                  };
                }
              },
              false,
              'CLEAR_MASCOT_REFUSAL_SPEECH'
            );
          }, 3500);
        }
        return;
      }
    }

    set(
      (draft) => {
        if (sourceContainer) {
          draft.containers[sourceContainer.id].entityIds = draft.containers[
            sourceContainer.id
          ].entityIds.filter((id) => id !== entityId);
        }

        if (typeof positionIndex === 'number') {
          draft.containers[targetContainerId].entityIds.splice(positionIndex, 0, entityId);
        } else {
          draft.containers[targetContainerId].entityIds.push(entityId);
        }

        if (isTargetPlate) {
          const activeRecipeName = state.activeRecipeName || 'Tortilla Española Clásica';
          const ent = draft.entities[entityId];
          if (ent) {
            const isGenericOrMixture =
              !ent.name ||
              ent.name.startsWith('mixture_') ||
              ent.name.toLowerCase().includes('mixture') ||
              ent.name.toLowerCase().includes('mezcla') ||
              ent.name.toLowerCase().includes('huevo batido') ||
              ent.name.toLowerCase().includes('raw');

            if (isGenericOrMixture) {
              ent.name = activeRecipeName;
            }
          }
        }

        const mascot = draft.entities['chef'];
        if (mascot) {
          const rawHolding = mascot.state?.holdingEntityIds as string[] | undefined;
          const updatedHolding = rawHolding ? rawHolding.filter((id) => id !== entityId) : [];
          mascot.state = {
            ...mascot.state,
            gazingAt: { type: 'entity', entityId: targetContainerId },
            targetContainerId,
            holdingEntityIds: updatedHolding,
            holdingEntityId: updatedHolding.length > 0 ? updatedHolding[updatedHolding.length - 1] : undefined,
          };
        }
      },
      false,
      'MOVE_ENTITY'
    );

    if (targetContainer.type === 'sink' || targetContainerId.includes('sink') || targetContainerId.includes('fregadero')) {
      get().transformIngredient(entityId, 'wash');
    }
  },
});
