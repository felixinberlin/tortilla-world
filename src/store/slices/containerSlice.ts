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
}

export const createContainerSlice: StateCreator<
  WorldStateStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  ContainerSlice
> = (set, get) => ({
  containers: {},

  moveEntity: (entityId, targetContainerId, positionIndex) => {
    const state = get();
    const entity = state.entities[entityId];
    const targetContainer = state.containers[targetContainerId];
    if (!entity || !targetContainer) return;

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
      },
      false,
      'MOVE_ENTITY'
    );
  },
});
