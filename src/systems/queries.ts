import type { Entity } from '../types/Entity'
import type { Ingredient } from '../types/Ingredient'
import { ingredients as ingredientCatalog } from '../data/catalog/ingredients'

/** Combines a world entity with its static catalog metadata (name, icon) for rendering. */
export function toIngredientView(entity: Entity): Ingredient {
  const catalogEntry = ingredientCatalog.find((ingredient) => ingredient.id === entity.id)
  return {
    id: entity.id,
    name: catalogEntry?.name ?? entity.id,
    icon: catalogEntry?.icon ?? '🥔',
  }
}

/**
 * Reads entities for one list out of the store. When the store has no
 * entities yet for a "seedFromCatalog" list (i.e. on first load), falls
 * back to the static catalog so the UI isn't empty before anything moves.
 */
export function getIngredientsForList(
  entities: Record<string, Entity>,
  listId: string,
  fallbackCatalog: Ingredient[] = [],
) {
  const matching = Object.values(entities)
    .filter((entity) => entity.type === 'ingredient' && entity.state === listId)
    .sort((left, right) => left.position.y - right.position.y)
    .map(toIngredientView)

  return matching.length > 0 ? matching : fallbackCatalog
}