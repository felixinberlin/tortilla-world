/**
 * FILE: Recipe.ts
 *
 * PURPOSE:
 * Defines recipe data structure.
 *
 * RESPONSIBILITY:
 * - Represents a recipe with required ingredients.
 */

import type { RecipeIngredient } from './RecipeIngredient'

export interface Recipe {
  id: string
  name: string
  ingredients: RecipeIngredient[]
}

export type RecipeList = Recipe[]



