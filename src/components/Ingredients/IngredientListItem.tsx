import type { Ingredient as IngredientModel } from '../../types/Ingredient'
import { Ingredient } from './Ingredient'

interface IngredientListItemProps {
  ingredient: IngredientModel
}

export function IngredientListItem({ ingredient }: IngredientListItemProps) {
  return (
    <li className="ingredient-list-item">
      <Ingredient ingredient={ingredient} />
    </li>
  )
}
