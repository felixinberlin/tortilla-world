import type { Ingredient } from '../../types/Ingredient'

interface IngredientListItemProps {
  ingredient: Ingredient
}

export function IngredientListItem({ ingredient }: IngredientListItemProps) {
  return (
    <li className="ingredient-list-item">
      <span aria-hidden="true">{ingredient.icon}</span>
      <span>{ingredient.name}</span>
    </li>
  )
}
