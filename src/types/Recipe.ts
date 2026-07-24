/**
 * FILE: Recipe.ts
 *
 * PURPOSE:
 * Defines recipe data structure.
 *
 * RESPONSIBILITY:
 * - Represents a recipe with required ingredients and steps.
 * - Supports both array and key-based dictionary ingredient declarations.
 */

import type { RecipeIngredient } from './RecipeIngredient';
import type { RecipeStep } from './RecipeStep';

export interface RecipeIngredientDictItem {
  ingredientId: string;
  amount: number;
  unit: string;
  name?: string;
}

export type RecipeIngredients =
  | RecipeIngredient[]
  | Record<string, RecipeIngredientDictItem>;

export interface Recipe {
  id: string;
  name: string;
  ingredients: RecipeIngredients;
  steps: RecipeStep[];
}

export type RecipeList = Recipe[];

/**
 * Normalizes a Recipe's ingredients into a standard array of RecipeIngredient.
 */
export function getRecipeIngredientsArray(recipe: Recipe): RecipeIngredient[] {
  if (Array.isArray(recipe.ingredients)) {
    return recipe.ingredients;
  }

  return Object.entries(recipe.ingredients).map(([key, item]) => ({
    id: `${recipe.id}-${key}`,
    ingredientId: item.ingredientId,
    amount: item.amount,
    unit: item.unit,
  }));
}
