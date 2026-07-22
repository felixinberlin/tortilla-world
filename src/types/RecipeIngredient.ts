/**
 * FILE: RecipeIngredient.ts
 *
 * PURPOSE:
 * Defines ingredient usage inside recipes.
 *
 * RESPONSIBILITY:
 * - Stores ingredient quantity and unit information.
 */

export interface RecipeIngredient {
  id: string
  ingredientId: string
  amount: number
  unit: string
}
