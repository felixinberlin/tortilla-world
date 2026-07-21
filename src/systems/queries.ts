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

/**
 * Read-only snapshot of which entity ids live in each list, sorted by
 * position.y. Used by drop rules and interaction — never falls back to
 * seed data; only reflects what's actually in the store.
 */
export function getListMembership(
  entities: Record<string, Entity>,
  listIds: string[],
): Record<string, string[]> {
  const membership = Object.fromEntries(listIds.map((listId) => [listId, [] as string[]]))

  for (const entity of Object.values(entities)) {
    if (entity.type !== 'ingredient' || !entity.listId || !(entity.listId in membership)) continue
    membership[entity.listId].push(entity.id)
  }

  for (const listId of listIds) {
    membership[listId].sort((leftId, rightId) => {
      const leftY = entities[leftId]?.position.y ?? 0
      const rightY = entities[rightId]?.position.y ?? 0
      return leftY - rightY
    })
  }

  return membership
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