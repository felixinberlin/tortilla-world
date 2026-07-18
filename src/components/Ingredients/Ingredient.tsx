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
