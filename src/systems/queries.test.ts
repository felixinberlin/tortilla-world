import { describe, it, expect } from 'vitest'
import { getIngredientsForList } from './queries'
import { ingredients as catalog } from '../data/catalog/ingredients'
import { recipe as concebolla } from '../data/catalog/recipes/concebolla'
import type { Entity } from '../types/Entity'

function makeEntity(id: string, state: string, y: number): Entity {
  return { id, type: 'ingredient', position: { x: 0, y }, size: { width: 1, height: 1 }, state }
}

function allInDespensa(): Record<string, Entity> {
  return Object.fromEntries(
    catalog.map((ingredient, index) => [
      ingredient.id,
      makeEntity(ingredient.id, 'despensa', index),
    ]),
  )
}

describe('getIngredientsForList', () => {

  // ── real entity state ──────────────────────────────────────────────────────

  it('returns entities matching the list, sorted by position.y', () => {
    const entities: Record<string, Entity> = {
      onion: makeEntity('onion', 'despensa', 1),
      potato: makeEntity('potato', 'despensa', 0),
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result.map((i) => i.id)).toEqual(['potato', 'onion'])
  })

  it('ignores entities that belong to a different list', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'despensa', 0),
      onion: makeEntity('onion', 'kitchen', 0),
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result.map((i) => i.id)).toEqual(['potato'])
  })

  it('ignores non-ingredient entities in the same list', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'despensa', 0),
      tortilla: { id: 'tortilla', type: 'character', position: { x: 0, y: 0 }, size: { width: 1, height: 1 }, state: 'despensa' },
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result.map((i) => i.id)).toEqual(['potato'])
  })

  it('returns empty when no entities match and no seed is configured', () => {
    const result = getIngredientsForList(allInDespensa(), { id: 'trash', title: 'Basura' })
    expect(result).toEqual([])
  })

  // ── seedFromCatalog ────────────────────────────────────────────────────────

  it('falls back to full catalog when seedFromCatalog is true and no entities match', () => {
    const result = getIngredientsForList({}, { id: 'despensa', title: 'Despensa', seedFromCatalog: true })
    expect(result.map((i) => i.id)).toEqual(catalog.map((i) => i.id))
  })

  it('despensa shows all ingredients on startup (all entities state: despensa)', () => {
    const result = getIngredientsForList(allInDespensa(), {
      id: 'despensa',
      title: 'Despensa',
      seedFromCatalog: true,
    })
    expect(result).toHaveLength(catalog.length)
    expect(result.map((i) => i.id)).toEqual(catalog.map((i) => i.id))
  })

  it('real entities take priority over seedFromCatalog fallback', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'despensa', 0),
    }
    const result = getIngredientsForList(entities, {
      id: 'despensa',
      title: 'Despensa',
      seedFromCatalog: true,
    })
    // only the real entity, not the whole catalog
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
    const result = getIngredientsForList(allInDespensa(), {
      id: 'trash',
      title: 'Basura',
    })
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

  it('real entities take priority over seedIngredients fallback', () => {
    const entities: Record<string, Entity> = {
      oil: makeEntity('oil', 'fire', 0),
    }
    const result = getIngredientsForList(entities, {
      id: 'fire',
      title: 'Fire',
      seedIngredients: ['oil', 'garlic'],
    })
    // seedIngredients has garlic too, but real state wins
    expect(result.map((i) => i.id)).toEqual(['oil'])
  })

  // ── view model correctness ─────────────────────────────────────────────────

  it('enriches entities with name and icon from the catalog', () => {
    const entities = { potato: makeEntity('potato', 'despensa', 0) }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result[0]).toMatchObject({ id: 'potato', name: 'Potatoes', icon: '🥔' })
  })

  it('falls back to id as name and 🥔 icon for unknown entity ids', () => {
    const entities = {
      mystery: { id: 'mystery', type: 'ingredient' as const, position: { x: 0, y: 0 }, size: { width: 1, height: 1 }, state: 'despensa' },
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result[0]).toMatchObject({ id: 'mystery', name: 'mystery', icon: '🥔' })
  })

})