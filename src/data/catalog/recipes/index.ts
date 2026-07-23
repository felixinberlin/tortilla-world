/**
 * FILE: index.ts
 *
 * PURPOSE:
 * Master export and catalog for all recipe definitions.
 *
 * RESPONSIBILITY:
 * - Collects all available recipes into a typed RecipeList.
 * - Provides a single entry point for accessing recipes.
 * - New recipes only need to be added here to appear in the catalog.
 */

import type { RecipeList } from '../../../types/Recipe'

import { concebollaRecipe } from './concebolla'
import { sincebollaRecipe } from './sincebolla'

/**
 * Master recipe catalog.
 *
 * Used by systems that need access to all available recipes.
 */
export const recipes: RecipeList = [
  concebollaRecipe,
  sincebollaRecipe,
]

/**
 * Individual recipe exports.
 *
 * Useful for:
 * - Recipe detail views
 * - Testing
 * - Debugging
 * - Future recipe editors
 */
export {
  concebollaRecipe,
  sincebollaRecipe,
}