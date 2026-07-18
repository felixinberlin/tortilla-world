import type { Ingredient } from '../types/Ingredient'
import type { IngredientList } from '../types/IngredientList'

const potato: Ingredient = {
  id: 'potato',
  name: 'Potato',
  icon: '🥔',
}
const egg: Ingredient  = { id: 'egg', name: 'egg', icon: '🥚' }

export const ingredientsList: IngredientList[] = [
    {
        id: 'main',
        name: 'Main Ingredients',
        ingredients: [
            potato,
            egg
        ]
    }
]