import { describe, it, expect } from 'vitest'
import { getIngredientsForList } from './queries'
import { ingredients as catalog } from '../data/catalog/ingredients'
import { recipe as concebolla } from '../data/catalog/recipes/concebolla'
import type { Entity } from '../types/Entity'

function makeEntity(id: string, lists: string[], y = 0): Entity {
  return {
    id,
    type: 'ingredient',
    position: { x: 0, y },
    size: { width: 1, height: 1 },
    state: 'idle',
    lists,
  }
}

function allInDespensa(): Record<string, Entity> {
  return Object.fromEntries(
    catalog.map((ingredient, index) => [
      ingredient.id,
      makeEntity(ingredient.id, ['despensa'], index),
    ]),
  )
}

describe('getIngredientsForList', () => {

  // ── real entity membership ─────────────────────────────────────────────────

  it('returns entities belonging to the list, sorted by position.y', () => {
    const entities: Record<string, Entity> = {
      onion: makeEntity('onion', ['despensa'], 1),
      potato: makeEntity('potato', ['despensa'], 0),
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result.map((i) => i.id)).toEqual(['potato', 'onion'])
  })

  it('ignores entities that do not belong to this list', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', ['despensa'], 0),
      onion: makeEntity('onion', ['kitchen'], 0),
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result.map((i) => i.id)).toEqual(['potato'])
  })

  it('returns an entity that belongs to multiple lists in each of those lists', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', ['despensa', 'kitchen'], 0),
      onion: makeEntity('onion', ['despensa'], 1),
    }
    const inDespensa = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    const inKitchen = getIngredientsForList(entities, { id: 'kitchen', title: 'Kitchen' })

    expect(inDespensa.map((i) => i.id)).toContain('potato')
    expect(inKitchen.map((i) => i.id)).toContain('potato')
  })

  it('moving to a third list does not remove the item from the other two', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', ['despensa', 'kitchen', 'fire'], 0),
    }
    const inDespensa = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    const inKitchen = getIngredientsForList(entities, { id: 'kitchen', title: 'Kitchen' })
    const inFire = getIngredientsForList(entities, { id: 'fire', title: 'Fire' })

    expect(inDespensa.map((i) => i.id)).toContain('potato')
    expect(inKitchen.map((i) => i.id)).toContain('potato')
    expect(inFire.map((i) => i.id)).toContain('potato')
  })

  it('ignores non-ingredient entities in the same list', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', ['despensa'], 0),
      tortilla: {
        id: 'tortilla',
        type: 'character',
        position: { x: 0, y: 0 },
        size: { width: 1, height: 1 },
        state: 'idle',
        lists: ['despensa'],
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
      potato: makeEntity('potato', ['despensa'], 0),
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
      oil: makeEntity('oil', ['fire'], 0),
    }
    const result = getIngredientsForList(entities, {
      id: 'fire',
      title: 'Fire',
      seedIngredients: ['oil', 'garlic'],
    })
    expect(result.map((i) => i.id)).toEqual(['oil'])
  })

  // ── view model correctness ─────────────────────────────────────────────────

  it('enriches entities with name and icon from the catalog', () => {
    const entities = { potato: makeEntity('potato', ['despensa'], 0) }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result[0]).toMatchObject({ id: 'potato', name: 'Potatoes', icon: '🥔' })
  })

  it('falls back to id as name and 🥔 icon for unknown entity ids', () => {
    const entities: Record<string, Entity> = {
      mystery: {
        id: 'mystery',
        type: 'ingredient',
        position: { x: 0, y: 0 },
        size: { width: 1, height: 1 },
        state: 'idle',
        lists: ['despensa'],
      },
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result[0]).toMatchObject({ id: 'mystery', name: 'mystery', icon: '🥔' })
  })

})