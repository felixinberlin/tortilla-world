/**
 * FILE: sincebolla.ts
 *
 * PURPOSE:
 * Recipe definition for Tortilla sin cebolla.
 *
 * RESPONSIBILITY:
 * - Specifies ingredients needed for the sin cebolla recipe variant.
 */

import type { RecipeIngredient } from '../../../types/RecipeIngredient'

export const sincebollaRecipe = {
  id: 'sincebolla',
  name: 'Tortilla sin Cebolla',
  ingredients: [
    { id: 'sincebolla-potato', ingredientId: 'potato', amount: 4, unit: 'pcs' },
    { id: 'sincebolla-egg', ingredientId: 'egg', amount: 6, unit: 'pcs' },
    { id: 'sincebolla-oil', ingredientId: 'oil', amount: 100, unit: 'ml' },
    { id: 'sincebolla-salt', ingredientId: 'salt', amount: 1, unit: 'tsp' },
    { id: 'sincebolla-pepper', ingredientId: 'pepper', amount: 1, unit: 'pinch' },
  ] satisfies RecipeIngredient[],
}

export const recipe = sincebollaRecipe