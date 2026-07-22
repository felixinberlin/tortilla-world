/**
 * FILE: Ingredient.tsx
 *
 * PURPOSE:
 * Visual representation of one ingredient.
 *
 * RESPONSIBILITY:
 * - Displays ingredient information.
 * - Handles ingredient presentation only.
 *
 * SHOULD NOT:
 * - Manage inventory.
 * - Apply game rules.
 * - Modify world state.
 */

import type { Ingredient as IngredientModel } from '../../types/Ingredient'

interface IngredientProps {
  ingredient: IngredientModel
}

export function Ingredient({ ingredient }: IngredientProps) {
  return (
    <>
      <span aria-hidden="true">{ingredient.icon}</span>
      <span>{ingredient.name}</span>
    </>
  )
}
