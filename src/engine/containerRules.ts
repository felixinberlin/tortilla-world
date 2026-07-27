/**
 * FILE: containerRules.ts
 *
 * PURPOSE:
 * Generic container behavior rules.
 *
 * RESPONSIBILITY:
 * - Defines reusable rules for lists/containers.
 * - Determines allowed contents and constraints.
 *
 * DOMAIN:
 * Game engine logic independent from React.
 */

import type { Container, Entity } from '../types/world';
import { worldStore } from '../store/worldStore';

export interface ValidationResult {
  allowed: boolean;
  reason?: string;
}

export function getIngredientCatalogId(entity: Entity): string {
  if (entity.ingredientId) return entity.ingredientId;
  return entity.id.split('_')[0];
}

export function resolveContainerId(containerId: string): string {
  if (!containerId) return 'burner1';
  const state = worldStore.getState();
  if (state.containers[containerId]) return containerId;

  const lower = containerId.toLowerCase().trim();
  if (
    lower === 'pan' ||
    lower === 'burner' ||
    lower === 'fuego' ||
    lower === 'fuego1' ||
    lower === 'fuego 1' ||
    lower === 'stove' ||
    lower === 'sarten' ||
    lower === 'sartén'
  ) {
    return 'burner1';
  }
  if (lower === 'fuego2' || lower === 'fuego 2' || lower === 'burner2') {
    return 'burner2';
  }
  if (lower === 'pantry' || lower === 'despensa') {
    return 'despensa';
  }
  if (lower === 'fregadero' || lower === 'sink') {
    return 'sink';
  }
  if (lower === 'tabla' || lower === 'board' || lower === 'cutting_board') {
    return 'board';
  }
  if (lower === 'bol' || lower === 'bowl') {
    return 'bowl';
  }
  if (lower === 'plato' || lower === 'plate') {
    return 'plate';
  }

  return containerId;
}

export function validateContainerRules(
  container: Container,
  entity: Entity,
  currentEntitiesInContainer: Entity[]
): ValidationResult {
  const rules = container.rules;

  // 1. Ingredient Uniqueness Check (Rule 6: A container cannot contain two identical ingredients)
  if (entity.type === 'ingredient') {
    const targetIngredientId = getIngredientCatalogId(entity);
    const hasDuplicateIngredient = currentEntitiesInContainer.some(
      (e) => e.type === 'ingredient' && getIngredientCatalogId(e) === targetIngredientId
    );
    if (hasDuplicateIngredient) {
      return {
        allowed: false,
        reason: `Container '${container.name}' already contains ingredient '${targetIngredientId}'.`,
      };
    }
  }

  if (!rules) {
    return { allowed: true };
  }

  // 2. Capacity Check
  if (
    rules.maxCapacity !== undefined &&
    container.entityIds.length >= rules.maxCapacity
  ) {
    return {
      allowed: false,
      reason: `Container '${container.name}' capacity reached (${rules.maxCapacity} items max).`,
    };
  }

  // 3. Allowed Types Check
  if (rules.allowedTypes && !rules.allowedTypes.includes(entity.type)) {
    return {
      allowed: false,
      reason: `Container '${container.name}' does not accept entity type '${entity.type}'.`,
    };
  }

  // 4. Unique Types Check
  if (rules.uniqueTypesOnly) {
    const hasTypeAlready = currentEntitiesInContainer.some(
      (e) => e.type === entity.type
    );
    if (hasTypeAlready) {
      return {
        allowed: false,
        reason: `Container '${container.name}' already contains an entity of type '${entity.type}'.`,
      };
    }
  }

  // 5. Custom Validator Check
  if (rules.customValidator) {
    const passesCustom = rules.customValidator(
      container,
      entity,
      currentEntitiesInContainer
    );
    if (!passesCustom) {
      return {
        allowed: false,
        reason: `Entity '${entity.name}' failed custom container rules for '${container.name}'.`,
      };
    }
  }

  return { allowed: true };
}