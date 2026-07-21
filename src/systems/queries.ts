import type { Entity } from '../types/Entity'
import type { Ingredient } from '../types/Ingredient'
import type { List } from '../types/IngredientList'
import { ingredients as ingredientCatalog } from '../data/catalog/ingredients'

export function toIngredientView(entity: Entity): Ingredient {
  const catalogEntry = ingredientCatalog.find((ingredient) => ingredient.id === entity.ingredientId)
  return {
    id: entity.id,
    name: catalogEntry?.name ?? entity.ingredientId,
    icon: catalogEntry?.icon ?? '🥔',
  }
}

export function getIngredientsForList(
  entities: Record<string, Entity>,
  list: List,
): Ingredient[] {
  const matching = Object.values(entities)
    .filter((entity) => entity.type === 'ingredient' && entity.listId === list.id)
    .sort((left, right) => left.position.y - right.position.y)
    .map(toIngredientView)

  if (matching.length > 0) return matching

  if (list.seedFromCatalog) return [...ingredientCatalog]

  if (list.seedIngredients) {
    return list.seedIngredients
      .map((id) => ingredientCatalog.find((i) => i.id === id))
      .filter((i): i is Ingredient => i !== undefined)
  }

  return []
}