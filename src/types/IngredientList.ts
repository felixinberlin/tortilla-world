import type { Ingredient } from './Ingredient'

export interface IngredientList {
  id: string
  name: string
  ingredients: Ingredient[]
}

export interface List {
  id: string
  title: string
  seedFromCatalog?: boolean
  seedIngredients?: string[]
  consumesOnDrag?: boolean   // true = item is removed from this list when dragged out
}