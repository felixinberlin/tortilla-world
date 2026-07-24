/**
 * FILE: concebolla.ts
 *
 * PURPOSE:
 * Recipe definition for Tortilla con cebolla.
 *
 * RESPONSIBILITY:
 * - Defines the ingredients, quantities, and step-by-step actions required for this recipe.
 */

import type { Recipe } from '../../../types/Recipe';

export const concebollaRecipe: Recipe = {
  id: 'concebolla',
  name: 'Tortilla con Cebolla',
  ingredients: [
    { id: 'concebolla-potato', ingredientId: 'potato', amount: 4, unit: 'pcs' },
    { id: 'concebolla-egg', ingredientId: 'egg', amount: 6, unit: 'pcs' },
    { id: 'concebolla-oil', ingredientId: 'oil', amount: 100, unit: 'ml' },
    { id: 'concebolla-onion', ingredientId: 'onion', amount: 1, unit: 'pcs' },
    { id: 'concebolla-salt', ingredientId: 'salt', amount: 1, unit: 'tsp' },
    { id: 'concebolla-pepper', ingredientId: 'pepper', amount: 1, unit: 'pinch' },
  ],
  steps: [
    { action: 'move', ingredient: 'potato', source: 'despensa', target: 'board' },
    { action: 'move', ingredient: 'egg', source: 'despensa', target: 'board' },
    { action: 'move', ingredient: 'oil', source: 'despensa', target: 'board' },
    { action: 'move', ingredient: 'onion', source: 'despensa', target: 'board' },
    { action: 'move', ingredient: 'salt', source: 'despensa', target: 'board' },
    { action: 'move', ingredient: 'pepper', source: 'despensa', target: 'board' },
    { action: 'celebrate' },
  ],
};

export const recipe = concebollaRecipe;
