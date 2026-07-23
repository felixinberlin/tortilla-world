/**
 * FILE: concebolla.ts
 *
 * PURPOSE:
 * Recipe definition for Tortilla con cebolla.
 *
 * RESPONSIBILITY:
 * - Specifies ingredients needed for the con cebolla recipe variant.
 */

import { ingredients } from '../ingredients'

export const recipe = {
  id: 'concebolla',
  name: 'Con Cebolla',
  ingredients: [
    ingredients.find((i) => i.id === 'potato'),
    ingredients.find((i) => i.id === 'egg'),
    ingredients.find((i) => i.id === 'oil'),
    ingredients.find((i) => i.id === 'salt'),
    ingredients.find((i) => i.id === 'pepper'),
    ingredients.find((i) => i.id === 'onion'),
  ],
}