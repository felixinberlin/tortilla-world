import { describe, it, expect } from 'vitest'
import { getIngredientsForList, getListMembership } from './queries'
import { ingredients as catalog } from '../data/catalog/ingredients'
import { recipe as concebolla } from '../data/catalog/recipes/concebolla'
import type { Entity } from '../types/Entity'

function makeEntity(id: string, ingredientId: string, listId: string | null, y = 0): Entity {
  return {
    id,
    type: 'ingredient',
    ingredientId,
    position: { x: 0, y },
    size: { width: 1, height: 1 },
    state: 'idle',
    listId,
  }
}

function allInDespensa(): Record<string, Entity> {
  return Object.fromEntries(
    catalog.map((ingredient, index) => [
      ingredient.id,
      makeEntity(ingredient.id, ingredient.id, 'despensa', index),
    ]),
  )
}

describe('getListMembership', () => {
  it('returns entity ids grouped by listId, sorted by position.y', () => {
    const entities: Record<string, Entity> = {
      onion: makeEntity('onion', 'onion', 'despensa', 1),
      potato: makeEntity('potato', 'potato', 'despensa', 0),
      oil: makeEntity('oil', 'oil', 'fire', 0),
    }
    expect(getListMembership(entities, ['despensa', 'fire', 'kitchen'])).toEqual({
      despensa: ['potato', 'onion'],
      fire: ['oil'],
      kitchen: [],
    })
  })

  it('ignores non-ingredient entities and entities with no listId', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'potato', 'despensa', 0),
      tortilla: {
        id: 'tortilla',
        type: 'character',
        ingredientId: 'tortilla',
        position: { x: 0, y: 0 },
        size: { width: 1, height: 1 },
        state: 'idle',
        listId: null,
      },
    }
    expect(getListMembership(entities, ['despensa'])).toEqual({ despensa: ['potato'] })
  })
})

describe('getIngredientsForList', () => {

  // ── real entity membership ─────────────────────────────────────────────────

  it('returns entities belonging to the list, sorted by position.y', () => {
    const entities: Record<string, Entity> = {
      onion: makeEntity('onion', 'onion', 'despensa', 1),
      potato: makeEntity('potato', 'potato', 'despensa', 0),
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result.map((i) => i.id)).toEqual(['potato', 'onion'])
  })

  it('ignores entities that do not belong to this list', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'potato', 'despensa', 0),
      onion: makeEntity('onion', 'onion', 'kitchen', 0),
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result.map((i) => i.id)).toEqual(['potato'])
  })

  it('two instances of the same ingredient in different lists are independent', () => {
    // Regression guard: an ingredient existing in two lists must be two
    // separate entities (separate ids), each pinned to exactly one list —
    // never one entity shared across both.
    const entities: Record<string, Entity> = {
      'potato#despensa': makeEntity('potato#despensa', 'potato', 'despensa', 0),
      'potato#kitchen': makeEntity('potato#kitchen', 'potato', 'kitchen', 0),
    }
    const inDespensa = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    const inKitchen = getIngredientsForList(entities, { id: 'kitchen', title: 'Kitchen' })

    expect(inDespensa.map((i) => i.id)).toEqual(['potato#despensa'])
    expect(inKitchen.map((i) => i.id)).toEqual(['potato#kitchen'])
  })

  it('an entity belongs to exactly one list — it never appears in a second one', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'potato', 'kitchen', 0),
    }
    const inDespensa = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    const inKitchen = getIngredientsForList(entities, { id: 'kitchen', title: 'Kitchen' })

    expect(inDespensa.map((i) => i.id)).not.toContain('potato')
    expect(inKitchen.map((i) => i.id)).toContain('potato')
  })

  it('ignores non-ingredient entities in the same list', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'potato', 'despensa', 0),
      tortilla: {
        id: 'tortilla',
        type: 'character',
        ingredientId: 'tortilla',
        position: { x: 0, y: 0 },
        size: { width: 1, height: 1 },
        state: 'idle',
        listId: 'despensa',
      },
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result.map((i) => i.id)).toEqual(['potato'])
  })

  it('returns empty when no entities belong to this list and no seed is configured', () => {
    const result = getIngredientsForList(allInDespensa(), { id: 'trash', title: 'Basura' })
    expect(result).toEqual([])
  })

  // ── seedFromCatalog ────────────────────────────────────────────────────────

  it('falls back to full catalog when seedFromCatalog is true and no entities match', () => {
    const result = getIngredientsForList({}, { id: 'despensa', title: 'Despensa', seedFromCatalog: true })
    expect(result.map((i) => i.id)).toEqual(catalog.map((i) => i.id))
  })

  it('despensa shows all ingredients on startup', () => {
    const result = getIngredientsForList(allInDespensa(), {
      id: 'despensa',
      title: 'Despensa',
      seedFromCatalog: true,
    })
    expect(result).toHaveLength(catalog.length)
    expect(result.map((i) => i.id)).toEqual(catalog.map((i) => i.id))
  })

  it('real entity membership takes priority over seedFromCatalog', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'potato', 'despensa', 0),
    }
    const result = getIngredientsForList(entities, {
      id: 'despensa',
      title: 'Despensa',
      seedFromCatalog: true,
    })
    expect(result.map((i) => i.id)).toEqual(['potato'])
  })

  // ── seedIngredients ────────────────────────────────────────────────────────

  it('kitchen shows concebolla recipe ingredients on startup', () => {
    const kitchenIngredients = concebolla.ingredients
      .filter((i): i is NonNullable<typeof i> => i !== undefined)
      .map((i) => i.id)

    const result = getIngredientsForList(allInDespensa(), {
      id: 'kitchen',
      title: 'Kitchen',
      seedIngredients: kitchenIngredients,
    })
    expect(result.map((i) => i.id)).toEqual(kitchenIngredients)
  })

  it('fire shows only oil on startup', () => {
    const result = getIngredientsForList(allInDespensa(), {
      id: 'fire',
      title: 'Fire',
      seedIngredients: ['oil'],
    })
    expect(result.map((i) => i.id)).toEqual(['oil'])
  })

  it('trash is empty on startup', () => {
    const result = getIngredientsForList(allInDespensa(), { id: 'trash', title: 'Basura' })
    expect(result).toEqual([])
  })

  it('seedIngredients skips ids not found in the catalog', () => {
    const result = getIngredientsForList({}, {
      id: 'kitchen',
      title: 'Kitchen',
      seedIngredients: ['potato', 'unicorn-meat', 'egg'],
    })
    expect(result.map((i) => i.id)).toEqual(['potato', 'egg'])
  })

  it('real entity membership takes priority over seedIngredients', () => {
    const entities: Record<string, Entity> = {
      oil: makeEntity('oil', 'oil', 'fire', 0),
    }
    const result = getIngredientsForList(entities, {
      id: 'fire',
      title: 'Fire',
      seedIngredients: ['oil', 'garlic'],
    })
    expect(result.map((i) => i.id)).toEqual(['oil'])
  })

  // ── view model correctness ─────────────────────────────────────────────────

  it('enriches entities with name and icon from the catalog, keyed by ingredientId', () => {
    const entities = { 'potato#despensa': makeEntity('potato#despensa', 'potato', 'despensa', 0) }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result[0]).toMatchObject({ id: 'potato#despensa', name: 'Potatoes', icon: '🥔' })
  })

  it('falls back to ingredientId as name and 🥔 icon for unknown ingredient ids', () => {
    const entities: Record<string, Entity> = {
      'mystery#despensa': {
        id: 'mystery#despensa',
        type: 'ingredient',
        ingredientId: 'mystery',
        position: { x: 0, y: 0 },
        size: { width: 1, height: 1 },
        state: 'idle',
        listId: 'despensa',
      },
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result[0]).toMatchObject({ id: 'mystery#despensa', name: 'mystery', icon: '🥔' })
  })

})