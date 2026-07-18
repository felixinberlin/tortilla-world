import type { Ingredient } from '../../types/Ingredient'
import type { RecipeIngredient } from '../../types/RecipeIngredient'
import './Ingredients.css'
import { RecipeIngredientItem } from './RecipeIngredientItem'

interface RecipeIngredientListProps {
  ingredients: RecipeIngredient[]
  ingredientCatalog: Ingredient[]
}

export function RecipeIngredientList({
  ingredients,
  ingredientCatalog,
}: RecipeIngredientListProps) {
  const ingredientsById = new Map(
    ingredientCatalog.map((ingredient) => [ingredient.id, ingredient]),
  )

  return (
    <ul className="recipe-ingredient-list">
      {ingredients.map((recipeIngredient) => {
        const ingredient = ingredientsById.get(recipeIngredient.ingredientId)

        if (!ingredient) {
          return null
        }

        return (
          <RecipeIngredientItem
            key={recipeIngredient.id}
            amount={recipeIngredient.amount}
            ingredient={ingredient}
            unit={recipeIngredient.unit}
          />
        )
      })}
    </ul>
  )
}