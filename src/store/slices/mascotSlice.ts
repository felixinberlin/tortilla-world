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

    // Read current holding IDs array
    const rawHoldingIds = mascot.state?.holdingEntityIds as string[] | undefined;
    const singleHoldingId = mascot.state?.holdingEntityId as string | undefined;

    const currentHoldingIds: string[] = Array.isArray(rawHoldingIds) && rawHoldingIds.length > 0
      ? [...rawHoldingIds]
      : singleHoldingId
      ? [singleHoldingId]
      : [];

    if (currentHoldingIds.length >= 2) {
      // Hands are full (up to 2 items)
      return;
    }

    // Resolve target entity from state.entities & containers
    let grabbedEntity: Entity | undefined;

    // 1. If sourceContainerId is specified, check that container first
    if (sourceContainerId && state.containers[sourceContainerId]) {
      const sourceContainer = state.containers[sourceContainerId];
      const matchInSource = sourceContainer.entityIds.find(
        (id) => id === entityId || state.entities[id]?.ingredientId === entityId || id.startsWith(`${entityId}_`)
      );
      if (matchInSource) {
        grabbedEntity = state.entities[matchInSource];
      }
    }

    // 2. If entityId is a specific entity instance (not a catalog/storage ID), check state.entities directly
    if (
      !grabbedEntity &&
      state.entities[entityId] &&
      !state.containers.despensa?.entityIds.includes(entityId)
    ) {
      grabbedEntity = state.entities[entityId];
    }

    // 3. Search non-storage workstation containers for an active instance
    if (!grabbedEntity) {
      for (const container of Object.values(state.containers)) {
        if (container.rules?.isImmutable) continue;
        const matchId = container.entityIds.find(
          (id) => id === entityId || state.entities[id]?.ingredientId === entityId || id.startsWith(`${entityId}_`)
        );
        if (matchId) {
          grabbedEntity = state.entities[matchId];
          break;
        }
      }
    }

    // 4. Fallback to exact entityId or catalog entity in storage
    if (!grabbedEntity) {
      grabbedEntity =
        state.entities[entityId] ||
        Object.values(state.entities).find(
          (e): e is Entity => Boolean(e) && Boolean(e.ingredientId === entityId || e.id.startsWith(entityId))
        );
    }

    const actualEntityId = grabbedEntity ? grabbedEntity.id : entityId;

    currentHoldingIds.push(actualEntityId);

    const foundSource =
      sourceContainerId && state.containers[sourceContainerId]
        ? state.containers[sourceContainerId]
        : Object.values(state.containers).find(
            (c) => !c.rules?.isImmutable && c.entityIds.includes(actualEntityId)
          ) ||
          Object.values(state.containers).find((c) => c.entityIds.includes(actualEntityId));

    set(
      (draft) => {
        const m = draft.entities[mascotId];
        if (!m) return;
        if (foundSource && !foundSource.rules?.isImmutable) {
          const srcContainer = draft.containers[foundSource.id];
          if (srcContainer) {
            srcContainer.entityIds = srcContainer.entityIds.filter((id) => id !== actualEntityId);
          }
        }
        const grabGaze: GazeTarget = { type: 'entity', entityId: actualEntityId };
        m.state = {
          ...m.state,
          holdingEntityId: currentHoldingIds[currentHoldingIds.length - 1],
          holdingEntityIds: currentHoldingIds,
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

    const rawHoldingIds = mascot.state?.holdingEntityIds as string[] | undefined;
    const singleHoldingId = mascot.state?.holdingEntityId as string | undefined;

    const currentHoldingIds: string[] = Array.isArray(rawHoldingIds) && rawHoldingIds.length > 0
      ? [...rawHoldingIds]
      : singleHoldingId
      ? [singleHoldingId]
      : [];

    if (currentHoldingIds.length === 0) {
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

    const itemsToDrop: Array<{
      finalEntityId: string;
      entityToMove: Entity;
      copyEntity?: Entity;
      sourceContainer?: typeof targetContainer;
      isSourceImmutable?: boolean;
    }> = [];

    const sourceContainerId = mascot.state?.sourceContainerId as string | undefined;

    for (const hId of currentHoldingIds) {
      let entityToMove: Entity | undefined = state.entities[hId];
      if (!entityToMove) {
        entityToMove = Object.values(state.entities).find(
          (e): e is Entity => Boolean(e) && Boolean(e.ingredientId === hId || e.id.startsWith(hId))
        );
      }

      if (!entityToMove) {
        entityToMove = {
          id: hId,
          ingredientId: hId.split('_')[0],
          name: hId.charAt(0).toUpperCase() + hId.slice(1),
          type: 'ingredient',
          state: {},
        };
      }

      const sourceContainer =
        sourceContainerId && state.containers[sourceContainerId]?.entityIds.includes(entityToMove.id)
          ? state.containers[sourceContainerId]
          : Object.values(state.containers).find((c) => c.entityIds.includes(entityToMove!.id));

      const isSourceImmutable =
        sourceContainer?.rules?.isImmutable || sourceContainer?.rules?.consumesOnDrag === false;

      let finalEntityId = entityToMove.id;
      let copyEntity: Entity | undefined;

      if (sourceContainer && sourceContainer.id !== targetContainerId && isSourceImmutable) {
        const copyId = `${entityToMove.id}_${Date.now()}_${Math.floor(Math.random() * 10000)}_${Math.floor(Math.random() * 10000)}`;
        copyEntity = {
          ...entityToMove,
          id: copyId,
          ingredientId: entityToMove.ingredientId || entityToMove.id.split('_')[0],
        };

        const currentEntities = [
          ...targetContainer.entityIds.map((id) => state.entities[id]),
          ...itemsToDrop.map((i) => i.copyEntity || i.entityToMove),
        ].filter((e): e is Entity => Boolean(e));

        const result = validateContainerRules(targetContainer, copyEntity, currentEntities);
        if (!result.allowed) {
          continue;
        }

        finalEntityId = copyId;
      } else {
        const currentEntities = [
          ...targetContainer.entityIds.map((id) => state.entities[id]),
          ...itemsToDrop.map((i) => i.copyEntity || i.entityToMove),
        ].filter((e): e is Entity => Boolean(e) && e.id !== entityToMove!.id);

        const result = validateContainerRules(targetContainer, entityToMove, currentEntities);
        if (!result.allowed) {
          continue;
        }
      }

      itemsToDrop.push({
        finalEntityId,
        entityToMove,
        copyEntity,
        sourceContainer,
        isSourceImmutable,
      });
    }

    if (itemsToDrop.length === 0) return;

    set(
      (draft) => {
        for (const item of itemsToDrop) {
          if (item.copyEntity) {
            draft.entities[item.copyEntity.id] = item.copyEntity;
          } else if (!draft.entities[item.entityToMove.id]) {
            draft.entities[item.entityToMove.id] = item.entityToMove;
          }

          if (item.sourceContainer && !item.isSourceImmutable) {
            draft.containers[item.sourceContainer.id].entityIds = draft.containers[
              item.sourceContainer.id
            ].entityIds.filter((id) => id !== item.entityToMove.id);
          }

          if (typeof positionIndex === 'number') {
            draft.containers[targetContainerId].entityIds.splice(positionIndex, 0, item.finalEntityId);
          } else {
            draft.containers[targetContainerId].entityIds.push(item.finalEntityId);
          }
        }

        const m = draft.entities[mascotId];
        if (m) {
          m.state = {
            ...m.state,
            holdingEntityId: undefined,
            holdingEntityIds: [],
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
