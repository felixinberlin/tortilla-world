/**
 * FILE: recipeMatcher.ts
 *
 * PURPOSE:
 * Utility functions for evaluating recipe completion and matching requirements against workspace entities.
 *
 * RESPONSIBILITY:
 * - Computes matching requirements and counts for a recipe given active world entities.
 * - Identifies matched and missing entity IDs.
 */

import { getRecipeRequirementsArray } from '../types/Recipe'
import type { Recipe } from '../types/Recipe'
import type { Entity } from '../types/world'
import { getIngredientCatalogId } from '../engine/containerRules'

export interface RecipeMatchResult {
  matchingCount: number
  totalCount: number
  matchingRequirementIds: string[]
  missingRequirementIds: string[]
  // Backward compatibility aliases
  matchingIngredientIds: string[]
  missingIngredientIds: string[]
}

/**
 * Calculates matching requirement count and detailed breakdown for a given recipe
 * based on entities present in workspace containers.
 */
export function countMatchingRequirements(
  recipe: Recipe | undefined | null,
  entities: Entity[]
): RecipeMatchResult {
  if (!recipe) {
    return {
      matchingCount: 0,
      totalCount: 0,
      matchingRequirementIds: [],
      missingRequirementIds: [],
      matchingIngredientIds: [],
      missingIngredientIds: [],
    }
  }

  const requirements = getRecipeRequirementsArray(recipe)

  const workspaceEntityIds = new Set(
    entities
      .filter((e) => Boolean(e))
      .map((e) => e.ingredientId || getIngredientCatalogId(e) || e.id)
  )

  const matchingRequirementIds: string[] = []
  const missingRequirementIds: string[] = []

  for (const req of requirements) {
    const reqId = req.entityId || (req as unknown as { ingredientId?: string }).ingredientId || ''
    if (workspaceEntityIds.has(reqId)) {
      matchingRequirementIds.push(reqId)
    } else {
      missingRequirementIds.push(reqId)
    }
  }

  return {
    matchingCount: matchingRequirementIds.length,
    totalCount: requirements.length,
    matchingRequirementIds,
    missingRequirementIds,
    matchingIngredientIds: matchingRequirementIds,
    missingIngredientIds: missingRequirementIds,
  }
}

/** Alias for backward compatibility */
export const countMatchingIngredients = countMatchingRequirements

