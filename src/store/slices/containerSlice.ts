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
}

export const createContainerSlice: StateCreator<
  WorldStateStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  ContainerSlice
> = (set, get) => ({
  containers: {},

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
      if (!result.allowed) return;

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
      return;
    }

    // Reordering within the same container never re-checks rules
    if (sourceContainer?.id !== targetContainerId) {
      const currentEntities = targetContainer.entityIds
        .map((id) => state.entities[id])
        .filter((e): e is Entity => Boolean(e) && e.id !== entityId);
      const result = validateContainerRules(targetContainer, entity, currentEntities);
      if (!result.allowed) return;
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
  },
});
