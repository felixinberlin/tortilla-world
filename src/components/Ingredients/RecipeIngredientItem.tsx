import type { Ingredient } from '../../types/Ingredient'

interface RecipeIngredientItemProps {
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
