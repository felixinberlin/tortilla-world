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
} from '../../engine/ingredientState';

export interface EntitySlice {
  entities: Record<string, Entity>;
  addEntity: (
    entity: { id: string; name: string; type: Entity['type']; state?: Record<string, unknown> },
    containerId: string
  ) => void;
  removeEntity: (entityId: string) => void;
  updateEntityState: (entityId: string, changes: Record<string, unknown>) => void;
  prepareIngredient: (entityId: string, preparation: PreparationStyle) => void;
  cookIngredient: (entityId: string, cooking: CookingMethod) => void;
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

    set(
      (state) => {
        const entity = state.entities[entityId];
        if (!entity) return;

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
});
