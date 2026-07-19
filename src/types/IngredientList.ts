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
}