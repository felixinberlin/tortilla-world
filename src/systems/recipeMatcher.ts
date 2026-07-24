/**
 * FILE: recipeMatcher.ts
 *
 * PURPOSE:
 * Utility functions for evaluating recipe completion and matching ingredients against workspace entities.
 *
 * RESPONSIBILITY:
 * - Computes matching ingredients and counts for a recipe given active world entities.
 * - Identifies matched and missing ingredient IDs.
 */

import { getRecipeIngredientsArray } from '../types/Recipe'
import type { Recipe } from '../types/Recipe'
import type { Entity } from '../types/world'
import { getIngredientCatalogId } from '../engine/containerRules'

export interface RecipeMatchResult {
  matchingCount: number
  totalCount: number
  matchingIngredientIds: string[]
  missingIngredientIds: string[]
}

/**
 * Calculates matching ingredient count and detailed breakdown for a given recipe
 * based on entities present in workspace containers.
 */
export function countMatchingIngredients(
  recipe: Recipe | undefined | null,
  entities: Entity[]
): RecipeMatchResult {
  if (!recipe) {
    return {
      matchingCount: 0,
      totalCount: 0,
      matchingIngredientIds: [],
      missingIngredientIds: [],
    }
  }

  const recipeIngredients = getRecipeIngredientsArray(recipe)

  const workspaceIngredientIds = new Set(
    entities
      .filter((e) => e && e.type === 'ingredient')
      .map((e) => getIngredientCatalogId(e))
  )

  const matchingIngredientIds: string[] = []
  const missingIngredientIds: string[] = []

  for (const req of recipeIngredients) {
    if (workspaceIngredientIds.has(req.ingredientId)) {
      matchingIngredientIds.push(req.ingredientId)
    } else {
      missingIngredientIds.push(req.ingredientId)
    }
  }

  return {
    matchingCount: matchingIngredientIds.length,
    totalCount: recipeIngredients.length,
    matchingIngredientIds,
    missingIngredientIds,
  }
}
