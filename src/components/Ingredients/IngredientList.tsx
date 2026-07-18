import type { Ingredient } from '../../types/Ingredient'
import './Ingredients.css'
import { IngredientListItem } from './IngredientListItem'

interface IngredientListProps {
  ingredients: Ingredient[]
}

export function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <ul className="ingredient-list">
      {ingredients.map((ingredient) => (
        <IngredientListItem key={ingredient.id} ingredient={ingredient} />
      ))}
    </ul>
  )
}