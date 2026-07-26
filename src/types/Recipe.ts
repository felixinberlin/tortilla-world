/**
 * FILE: Recipe.ts
 *
 * PURPOSE:
 * Defines recipe data structure.
 *
 * RESPONSIBILITY:
 * - Represents a recipe with required entities (requirements) and steps.
 * - Supports both array and key-based dictionary requirement declarations.
 */

import type { Requirement, RequirementDictItem } from './Requirement';
import type { RecipeStep } from './RecipeStep';

export type RecipeRequirementDictItem = RequirementDictItem;

export type RecipeRequirements =
  | Requirement[]
  | Record<string, RequirementDictItem>;

export interface RecipeVessel {
  /** References a VesselCatalogItem id (e.g. 'sarten', 'sarten_grande', 'oven') */
  vesselType: string;
}

export interface Recipe {
  id: string;
  name: string;
  /**
   * Declares which cooking vessels this recipe needs.
   * Keys are local aliases used in step `vessel` fields.
   * The runner assigns real container IDs at runtime by matching vesselType → ContainerType.
   *
   * @example
   * vessels: {
   *   big_pan:   { vesselType: 'sarten_grande' },
   *   small_pan: { vesselType: 'sarten' },
   * }
   */
  vessels?: Record<string, RecipeVessel>;
  requirements: RecipeRequirements;
  steps: RecipeStep[];
}

export type RecipeList = Recipe[];

/**
 * Normalizes a Recipe's requirements into a standard array of Requirement objects.
 */
export function getRecipeRequirementsArray(recipe: Recipe): Requirement[] {
  const reqs = recipe.requirements;
  if (Array.isArray(reqs)) {
    return reqs.map((item) => ({
      ...item,
      entityId: item.entityId || (item as unknown as { ingredientId?: string }).ingredientId || '',
    }));
  }

  if (reqs && typeof reqs === 'object') {
    return Object.entries(reqs).map(([key, item]) => ({
      id: `${recipe.id}-${key}`,
      entityId: item.entityId || item.ingredientId || key,
      amount: item.amount,
      unit: item.unit,
      name: item.name,
    }));
  }

  return [];
}

/** Legacy alias helper for backward compatibility during transition */
export const getRecipeIngredientsArray = getRecipeRequirementsArray;