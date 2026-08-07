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
  const baseId = entity.ingredientId || entity.id.split('_')[0];
  const preparation = entity.state?.preparation || '';
  const cooking = entity.state?.cooking || (entity.status && entity.status !== 'raw' ? entity.status : '');
  if (preparation || cooking) {
    return `${baseId}:${preparation}:${cooking}`;
  }
  return baseId;
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
  if (lower === 'basura' || lower === 'trash' || lower === 'papelera') {
    return 'trash';
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
  if (entity.type === 'ingredient' && !rules?.allowDuplicateIngredients) {
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

  return { allowed: true };
}