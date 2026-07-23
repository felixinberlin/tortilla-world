import type { RecipeIngredient } from '../../../types/RecipeIngredient'

/**
 * FILE: concebolla.ts
 *
 * PURPOSE:
 * Recipe definition for Tortilla con cebolla.
 *
 * RESPONSIBILITY:
 * - Defines the ingredients and quantities required for this recipe.
 */

export const concebollaRecipe = {
  id: 'concebolla',
  name: 'Tortilla con Cebolla',
  ingredients: [
    { id: 'concebolla-potato', ingredientId: 'potato', amount: 4, unit: 'pcs' },
    { id: 'concebolla-egg', ingredientId: 'egg', amount: 6, unit: 'pcs' },
    { id: 'concebolla-oil', ingredientId: 'oil', amount: 100, unit: 'ml' },
    { id: 'concebolla-onion', ingredientId: 'onion', amount: 1, unit: 'pcs' },
    { id: 'concebolla-salt', ingredientId: 'salt', amount: 1, unit: 'tsp' },
    { id: 'concebolla-pepper', ingredientId: 'pepper', amount: 1, unit: 'pinch' },
  ] satisfies RecipeIngredient[],
}

export const recipe = concebollaRecipe