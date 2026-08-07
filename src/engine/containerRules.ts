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
import { INGREDIENT_CAPABILITIES_CATALOG } from '../data/catalog/ingredientCapabilities';

export interface ValidationResult {
  allowed: boolean;
  reason?: string;
}

/**
 * Resolves supported action verbs for a workstation container.
 * Storage/pantry, trash, and serving plates return null (no verb restrictions).
 */
export function getWorkstationSupportedActions(container: Container): string[] | null {
  const cId = container.id.toLowerCase().trim();
  const cType = (container.type || '').toLowerCase().trim();

  // Storage/Pantry, Trash, and Plate are open storage/discard/serving containers without transformation restrictions
  if (
    cId === 'despensa' ||
    cId === 'pantry' ||
    cType === 'storage' ||
    cId === 'trash' ||
    cId === 'basura' ||
    cType === 'trash' ||
    cId === 'plate' ||
    cId === 'plato' ||
    cType === 'plate'
  ) {
    return null;
  }

  if (cType === 'sink' || cId.startsWith('sink') || cId.startsWith('fregadero')) {
    return ['wash', 'rinse', 'drain', 'clean'];
  }

  if (cType === 'board' || cId.startsWith('board') || cId.startsWith('tabla') || cId.includes('cutting')) {
    return ['prepare', 'cut', 'peel', 'slice', 'dice', 'mince'];
  }

  if (cType === 'bowl' || cId.startsWith('bowl') || cId.startsWith('bol')) {
    return ['crack', 'beat', 'whisk', 'mix', 'season', 'knead', 'dissolve', 'separate', 'pour', 'combine'];
  }

  if (
    cType === 'burner' ||
    cId.startsWith('burner') ||
    cId.startsWith('fuego') ||
    cId.includes('pan') ||
    cId.includes('stove') ||
    cId.includes('sarten')
  ) {
    return ['heat', 'fry', 'boil', 'steam', 'grill', 'bake', 'roast', 'cook', 'season', 'mix', 'combine'];
  }

  return null;
}

/**
 * Retrieves allowed action verbs/transformations for an ingredient entity.
 */
export function getIngredientVerbs(entity: Entity): string[] | null {
  if (entity.type !== 'ingredient') return null;

  // Look up catalog capability definition
  const baseId = entity.ingredientId || entity.id.split('_')[0];
  const catalogItem = INGREDIENT_CAPABILITIES_CATALOG[baseId];

  if (catalogItem && catalogItem.capabilities) {
    return Object.keys(catalogItem.capabilities);
  }

  // Fallback if entity state has capabilities directly attached
  if (entity.state && typeof entity.state === 'object' && 'capabilities' in entity.state) {
    const caps = (entity.state as Record<string, unknown>).capabilities;
    if (caps && typeof caps === 'object') {
      return Object.keys(caps);
    }
  }

  return null;
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
  if (lower === 'fuego3' || lower === 'fuego 3' || lower === 'burner3') {
    return 'burner3';
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
  if (lower === 'tabla2' || lower === 'board2' || lower === 'cutting_board2') {
    return 'board2';
  }
  if (lower === 'bol' || lower === 'bowl') {
    return 'bowl';
  }
  if (lower === 'bol2' || lower === 'bowl2') {
    return 'bowl2';
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
        reason: `¡Oye! '${container.name}' already contains '${entity.name || targetIngredientId}'.`,
      };
    }
  }

  // 2. Workstation Transformations vs Ingredient Capabilities Validation
  const supportedActions = getWorkstationSupportedActions(container);
  if (supportedActions && entity.type === 'ingredient') {
    const ingredientVerbs = getIngredientVerbs(entity);
    if (ingredientVerbs && ingredientVerbs.length > 0) {
      const hasMatchingVerb = ingredientVerbs.some((verb) => supportedActions.includes(verb));
      if (!hasMatchingVerb) {
        return {
          allowed: false,
          reason: `¡Oye! ${entity.name || 'This ingredient'} has no allowed transformations at ${container.name}!`,
        };
      }
    }
  }

  if (!rules) {
    return { allowed: true };
  }

  // 3. Capacity Check
  if (
    rules.maxCapacity !== undefined &&
    container.entityIds.length >= rules.maxCapacity
  ) {
    return {
      allowed: false,
      reason: `¡Oye! '${container.name}' is full (${rules.maxCapacity} items max).`,
    };
  }

  // 4. Allowed Types Check
  if (rules.allowedTypes && !rules.allowedTypes.includes(entity.type)) {
    return {
      allowed: false,
      reason: `¡Oye! '${container.name}' does not accept ${entity.type}s.`,
    };
  }

  return { allowed: true };
}