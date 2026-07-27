/**
 * FILE: entitySlice.ts
 *
 * PURPOSE:
 * Zustand slice for entity management (ingredients, tools, mascot entities).
 *
 * RESPONSIBILITY:
 * - Mutates entity records in world state.
 * - Handles adding, removing, updating, preparing, and cooking entities.
 */

import type { StateCreator } from 'zustand/vanilla';
import type { Entity } from '../../types/world';
import type { PreparationStyle, CookingMethod } from '../../types/RecipeStep';
import type { WorldStateStore } from '../types';
import { validateContainerRules } from '../../engine/containerRules';
import {
  derivePreparationStatus,
  deriveCookingStatus,
  formatPreparedName,
  formatCookedName,
  applyIngredientTransformation,
} from '../../engine/ingredientState';

export interface EntitySlice {
  entities: Record<string, Entity>;
  addEntity: (
    entity: {
      id: string;
      name: string;
      type: Entity['type'];
      icon?: string;
      ingredientId?: string;
      state?: Record<string, unknown>;
    },
    containerId: string
  ) => void;
  removeEntity: (entityId: string) => void;
  updateEntityState: (entityId: string, changes: Record<string, unknown>) => void;
  prepareIngredient: (entityId: string, preparation: PreparationStyle) => void;
  cookIngredient: (entityId: string, cooking: CookingMethod) => void;
  transformIngredient: (
    entityId: string,
    transformation: 'wash' | 'cut' | 'peel' | 'cook' | 'mix'
  ) => void;
  useIngredient: (entityId: string, usedIn?: string) => void;
  revertIngredientUsage: (entityId: string, previousContainerId?: string) => void;
  consumeIngredient: (entityId: string, consumedBy?: string) => void;
}

export const createEntitySlice: StateCreator<
  WorldStateStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  EntitySlice
> = (set, get) => ({
  entities: {},

  addEntity: (entity, containerId) => {
    const targetContainer = get().containers[containerId];
    if (!targetContainer) return;

    const currentEntities = targetContainer.entityIds
      .map((id) => get().entities[id])
      .filter((e): e is Entity => Boolean(e));

    const result = validateContainerRules(
      targetContainer,
      entity as Entity,
      currentEntities
    );
    if (!result.allowed) return;

    set(
      (state) => {
        state.entities[entity.id] = entity as Entity;
        state.containers[containerId].entityIds.push(entity.id);
      },
      false,
      'ADD_ENTITY'
    );
  },

  removeEntity: (entityId) => {
    set(
      (state) => {
        delete state.entities[entityId];
        for (const cId in state.containers) {
          state.containers[cId].entityIds = state.containers[cId].entityIds.filter(
            (id) => id !== entityId
          );
        }
      },
      false,
      'REMOVE_ENTITY'
    );
  },

  updateEntityState: (entityId, changes) => {
    set(
      (state) => {
        const targetEntity = state.entities[entityId];
        if (!targetEntity) return;

        targetEntity.state = {
          ...targetEntity.state,
          ...changes,
        };
      },
      false,
      'UPDATE_ENTITY_STATE'
    );
  },

  prepareIngredient: (entityId, preparation) => {
    const targetEntity = get().entities[entityId];
    if (!targetEntity) return;

    const status = derivePreparationStatus(targetEntity, preparation);
    const updatedName = formatPreparedName(targetEntity, preparation);

    set(
      (state) => {
        const entity = state.entities[entityId];
        if (!entity) return;

        entity.name = updatedName;
        entity.state = {
          ...entity.state,
          preparation,
          status,
        };
      },
      false,
      'PREPARE_INGREDIENT'
    );
  },

  cookIngredient: (entityId, cooking) => {
    const targetEntity = get().entities[entityId];
    if (!targetEntity) return;

    const status = deriveCookingStatus(targetEntity, cooking);
    const updatedName = formatCookedName(targetEntity, cooking);

    set(
      (state) => {
        const entity = state.entities[entityId];
        if (!entity) return;

        entity.name = updatedName;
        entity.state = {
          ...entity.state,
          cooking,
          status,
        };
      },
      false,
      'COOK_INGREDIENT'
    );
  },

  transformIngredient: (entityId, transformation) => {
    const targetEntity = get().entities[entityId];
    if (!targetEntity) return;

    const result = applyIngredientTransformation(targetEntity, transformation);
    if (!result) return;

    set(
      (state) => {
        const entity = state.entities[entityId];
        if (!entity) return;

        entity.name = result.name;
        entity.status = result.status;
        entity.state = {
          ...entity.state,
          ...result.state,
        };
      },
      false,
      'TRANSFORM_INGREDIENT'
    );
  },

  useIngredient: (entityId, usedIn) => {
    const state = get();
    const entity = state.entities[entityId];
    if (!entity) return;

    let previousContainerId: string | undefined;
    for (const cId in state.containers) {
      if (state.containers[cId].entityIds.includes(entityId)) {
        previousContainerId = cId;
        break;
      }
    }

    set(
      (draft) => {
        const targetEntity = draft.entities[entityId];
        if (!targetEntity) return;

        // Remove from current container(s)
        for (const cId in draft.containers) {
          draft.containers[cId].entityIds = draft.containers[cId].entityIds.filter(
            (id) => id !== entityId
          );
        }

        // If usedIn matches an existing container ID, add to that container
        if (usedIn && draft.containers[usedIn]) {
          draft.containers[usedIn].entityIds.push(entityId);
        }

        // Mark consumed and update entity state
        targetEntity.state = {
          ...targetEntity.state,
          consumed: true,
          consumedBy: usedIn,
          previousContainerId: previousContainerId || (targetEntity.state?.previousContainerId as string | undefined),
          status: 'consumed',
        };
      },
      false,
      'USE_INGREDIENT'
    );

    // Emit domain event
    get().emitEvent({
      type: 'INGREDIENT_CONSUMED',
      payload: {
        entityId,
        consumedBy: usedIn,
      },
    });
  },

  revertIngredientUsage: (entityId, previousContainerId) => {
    set(
      (draft) => {
        const targetEntity = draft.entities[entityId];
        if (!targetEntity) return;

        const targetContainerId =
          previousContainerId || (targetEntity.state?.previousContainerId as string | undefined);

        // Remove from current containers
        for (const cId in draft.containers) {
          draft.containers[cId].entityIds = draft.containers[cId].entityIds.filter(
            (id) => id !== entityId
          );
        }

        // Restore to previous container if valid
        if (targetContainerId && draft.containers[targetContainerId]) {
          draft.containers[targetContainerId].entityIds.push(entityId);
        }

        // Revert consumed state
        if (targetEntity.state) {
          delete targetEntity.state.consumed;
          delete targetEntity.state.consumedBy;
          delete targetEntity.state.previousContainerId;
          if (targetEntity.state.status === 'consumed') {
            delete targetEntity.state.status;
          }
        }
      },
      false,
      'REVERT_INGREDIENT_USAGE'
    );
  },

  consumeIngredient: (entityId, consumedBy) => {
    get().useIngredient(entityId, consumedBy);
  },
});
