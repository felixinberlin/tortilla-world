/**
 * FILE: mascotSlice.ts
 *
 * PURPOSE:
 * Zustand slice for mascot (Chef Tortilla) state actions.
 *
 * RESPONSIBILITY:
 * - Mutates mascot gaze, flip, grab, and drop states.
 */

import type { StateCreator } from 'zustand/vanilla';
import type { Entity } from '../../types/world';
import type { WorldStateStore } from '../types';
import { validateContainerRules } from '../../engine/containerRules';

export interface MascotSlice {
  mascotFlip: (mascotId?: string) => void;
  mascotMove: (targetContainerId: string, mascotId?: string) => void;
  mascotGrab: (entityId: string, sourceContainerId?: string, mascotId?: string) => void;
  mascotDrop: (targetContainerId: string, positionIndex?: number, mascotId?: string) => void;
}

export const createMascotSlice: StateCreator<
  WorldStateStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  MascotSlice
> = (set, get) => ({
  mascotFlip: (mascotId = 'chef') => {
    set(
      (draft) => {
        const mascot = draft.entities[mascotId];
        if (!mascot) return;
        mascot.state = {
          ...mascot.state,
          state: 'flipping',
          isFlipping: true,
        };
      },
      false,
      'MASCOT_FLIP'
    );

    setTimeout(() => {
      set(
        (draft) => {
          const mascot = draft.entities[mascotId];
          if (!mascot || mascot.state?.state !== 'flipping') return;
          mascot.state = {
            ...mascot.state,
            state: 'idle',
            isFlipping: false,
          };
        },
        false,
        'RESET_MASCOT_FLIP'
      );
    }, 800);
  },

  mascotMove: (targetContainerId, mascotId = 'chef') => {
    set(
      (draft) => {
        const mascot = draft.entities[mascotId];
        if (!mascot) return;
        mascot.state = {
          ...mascot.state,
          gazingAt: targetContainerId,
          targetContainerId,
        };
      },
      false,
      'MASCOT_MOVE'
    );
  },

  mascotGrab: (entityId, sourceContainerId, mascotId = 'chef') => {
    const state = get();
    const mascot = state.entities[mascotId];
    if (!mascot) return;
    const grabbedEntity = state.entities[entityId];
    if (!grabbedEntity) return;

    const foundSource = sourceContainerId
      ? state.containers[sourceContainerId]
      : Object.values(state.containers).find((c) => c.entityIds.includes(entityId));

    set(
      (draft) => {
        const m = draft.entities[mascotId];
        if (!m) return;
        m.state = {
          ...m.state,
          holdingEntityId: entityId,
          sourceContainerId: foundSource?.id,
          gazingAt: foundSource?.id || m.state?.gazingAt,
        };
      },
      false,
      'MASCOT_GRAB'
    );
  },

  mascotDrop: (targetContainerId, positionIndex, mascotId = 'chef') => {
    const state = get();
    const mascot = state.entities[mascotId];
    if (!mascot) return;

    const holdingEntityId = mascot.state?.holdingEntityId as string | undefined;

    if (!holdingEntityId) {
      set(
        (draft) => {
          const m = draft.entities[mascotId];
          if (m) {
            m.state = { ...m.state, gazingAt: targetContainerId };
          }
        },
        false,
        'MASCOT_DROP'
      );
      return;
    }

    const entityToMove = state.entities[holdingEntityId];
    const targetContainer = state.containers[targetContainerId];
    if (!entityToMove || !targetContainer) return;

    const sourceContainerId = mascot.state?.sourceContainerId as string | undefined;
    const sourceContainer = sourceContainerId
      ? state.containers[sourceContainerId]
      : Object.values(state.containers).find((c) => c.entityIds.includes(holdingEntityId));

    const isSourceImmutable =
      sourceContainer?.rules?.isImmutable || sourceContainer?.rules?.consumesOnDrag === false;

    let finalEntityId = holdingEntityId;
    let copyEntity: Entity | undefined;

    if (sourceContainer && sourceContainer.id !== targetContainerId && isSourceImmutable) {
      const copyId = `${entityToMove.id}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      copyEntity = {
        ...entityToMove,
        id: copyId,
        ingredientId: entityToMove.ingredientId || entityToMove.id.split('_')[0],
      };

      const currentEntities = targetContainer.entityIds
        .map((id) => state.entities[id])
        .filter((e): e is Entity => Boolean(e));
      const result = validateContainerRules(targetContainer, copyEntity, currentEntities);
      if (!result.allowed) return;

      finalEntityId = copyId;
    } else {
      const currentEntities = targetContainer.entityIds
        .map((id) => state.entities[id])
        .filter((e): e is Entity => Boolean(e) && e.id !== holdingEntityId);
      const result = validateContainerRules(targetContainer, entityToMove, currentEntities);
      if (!result.allowed) return;
    }

    set(
      (draft) => {
        if (copyEntity) {
          draft.entities[copyEntity.id] = copyEntity;
        }

        if (sourceContainer && !isSourceImmutable) {
          draft.containers[sourceContainer.id].entityIds = draft.containers[
            sourceContainer.id
          ].entityIds.filter((id) => id !== holdingEntityId);
        }

        if (typeof positionIndex === 'number') {
          draft.containers[targetContainerId].entityIds.splice(positionIndex, 0, finalEntityId);
        } else {
          draft.containers[targetContainerId].entityIds.push(finalEntityId);
        }

        const m = draft.entities[mascotId];
        if (m) {
          m.state = {
            ...m.state,
            holdingEntityId: undefined,
            sourceContainerId: undefined,
            gazingAt: targetContainerId,
          };
        }
      },
      false,
      'MASCOT_DROP'
    );
  },
});
