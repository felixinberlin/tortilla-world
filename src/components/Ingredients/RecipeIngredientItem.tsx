/**
 * FILE: RecipeIngredientItem.tsx
 *
 * PURPOSE:
 * Displays an ingredient used in a recipe.
 *
 * RESPONSIBILITY:
 * - Shows ingredient amount and unit.
 * - Represents recipe-specific ingredient data.
 */

import type { Ingredient } from '../../types/Ingredient'

interface RecipeIngredientItemProps {
  key?: string | number
  ingredient: Ingredient
  amount: number
  unit: string
}

export function RecipeIngredientItem({
  ingredient,
  amount,
  unit,
}: RecipeIngredientItemProps) {
  return (
    <li className="recipe-ingredient-item">
      <span aria-hidden="true">{ingredient.icon}</span>
      <span className="recipe-ingredient-name">{ingredient.name}</span>
      <span className="recipe-ingredient-amount">
        {amount} {unit}
      </span>
    </li>
  )
}
