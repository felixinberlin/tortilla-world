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
import type { GazeTarget } from '../../systems/gaze';

export interface MascotSlice {
  mascotFlip: (mascotId?: string) => void;
  mascotMove: (targetContainerId: string, mascotId?: string) => void;
  mascotGrab: (entityId: string, sourceContainerId?: string, mascotId?: string) => void;
  mascotDrop: (targetContainerId: string, positionIndex?: number, mascotId?: string) => void;
  mascotClearGaze: (mascotId?: string) => void;
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
        const gaze: GazeTarget = { type: 'entity', entityId: targetContainerId };
        mascot.state = {
          ...mascot.state,
          gazingAt: gaze,
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

    // Resolve target entity from state.entities
    let grabbedEntity: Entity | undefined = state.entities[entityId];
    if (!grabbedEntity) {
      grabbedEntity = Object.values(state.entities).find(
        (e): e is Entity => Boolean(e) && Boolean(e.ingredientId === entityId || e.id.startsWith(entityId))
      );
    }

    const actualEntityId = grabbedEntity ? grabbedEntity.id : entityId;

    const foundSource = sourceContainerId
      ? state.containers[sourceContainerId]
      : Object.values(state.containers).find((c) => c.entityIds.includes(actualEntityId));

    set(
      (draft) => {
        const m = draft.entities[mascotId];
        if (!m) return;
        const grabGaze: GazeTarget = { type: 'entity', entityId: actualEntityId };
        m.state = {
          ...m.state,
          holdingEntityId: actualEntityId,
          sourceContainerId: foundSource?.id,
          gazingAt: grabGaze,
          targetContainerId: foundSource?.id || m.state?.targetContainerId,
        };
      },
      false,
      'MASCOT_GRAB'
    );
  },

  mascotClearGaze: (mascotId = 'chef') => {
    set(
      (draft) => {
        const mascot = draft.entities[mascotId];
        if (!mascot) return;
        mascot.state = { ...mascot.state, gazingAt: null, targetContainerId: undefined };
      },
      false,
      'MASCOT_CLEAR_GAZE'
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
            m.state = {
              ...m.state,
              gazingAt: { type: 'entity', entityId: targetContainerId },
              targetContainerId,
            };
          }
        },
        false,
        'MASCOT_DROP'
      );
      return;
    }

    const targetContainer = state.containers[targetContainerId];
    if (!targetContainer) return;

    let entityToMove: Entity | undefined = state.entities[holdingEntityId];
    if (!entityToMove) {
      entityToMove = Object.values(state.entities).find(
        (e): e is Entity => Boolean(e) && Boolean(e.ingredientId === holdingEntityId || e.id.startsWith(holdingEntityId))
      );
    }

    if (!entityToMove) {
      entityToMove = {
        id: holdingEntityId,
        ingredientId: holdingEntityId.split('_')[0],
        name: holdingEntityId.charAt(0).toUpperCase() + holdingEntityId.slice(1),
        type: 'ingredient',
        state: {},
      };
    }

    const sourceContainerId = mascot.state?.sourceContainerId as string | undefined;
    const sourceContainer = sourceContainerId
      ? state.containers[sourceContainerId]
      : Object.values(state.containers).find((c) => c.entityIds.includes(entityToMove.id));

    const isSourceImmutable =
      sourceContainer?.rules?.isImmutable || sourceContainer?.rules?.consumesOnDrag === false;

    let finalEntityId = entityToMove.id;
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
      if (!result.allowed) {
        return;
      }

      finalEntityId = copyId;
    } else {
      const currentEntities = targetContainer.entityIds
        .map((id) => state.entities[id])
        .filter((e): e is Entity => Boolean(e) && e.id !== entityToMove.id);
      const result = validateContainerRules(targetContainer, entityToMove, currentEntities);
      if (!result.allowed) {
        return;
      }
    }

    set(
      (draft) => {
        if (copyEntity) {
          draft.entities[copyEntity.id] = copyEntity;
        } else if (!draft.entities[entityToMove.id]) {
          draft.entities[entityToMove.id] = entityToMove;
        }

        if (sourceContainer && !isSourceImmutable) {
          draft.containers[sourceContainer.id].entityIds = draft.containers[
            sourceContainer.id
          ].entityIds.filter((id) => id !== entityToMove.id);
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
            gazingAt: { type: 'entity', entityId: targetContainerId } satisfies GazeTarget,
            targetContainerId,
          };
        }
      },
      false,
      'MASCOT_DROP'
    );
  },
});
