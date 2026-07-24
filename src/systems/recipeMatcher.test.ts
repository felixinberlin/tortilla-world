import { describe, expect, it } from 'vitest'
import { countMatchingIngredients } from './recipeMatcher'
import type { Recipe } from '../types/Recipe'
import type { Entity } from '../types/world'

describe('countMatchingIngredients', () => {
  const sampleRecipe: Recipe = {
    id: 'test-recipe',
    name: 'Test Recipe',
    ingredients: [
      { id: 'req-1', ingredientId: 'potato', amount: 3, unit: 'pcs' },
      { id: 'req-2', ingredientId: 'egg', amount: 4, unit: 'pcs' },
      { id: 'req-3', ingredientId: 'onion', amount: 1, unit: 'pcs' },
    ],
    steps: [],
  }

  it('returns zeros when recipe is undefined', () => {
    const result = countMatchingIngredients(undefined, [])
    expect(result.matchingCount).toBe(0)
    expect(result.totalCount).toBe(0)
    expect(result.matchingIngredientIds).toEqual([])
    expect(result.missingIngredientIds).toEqual([])
  })

  it('returns zero matching count when workspace is empty', () => {
    const result = countMatchingIngredients(sampleRecipe, [])
    expect(result.matchingCount).toBe(0)
    expect(result.totalCount).toBe(3)
    expect(result.matchingIngredientIds).toEqual([])
    expect(result.missingIngredientIds).toEqual(['potato', 'egg', 'onion'])
  })

  it('correctly matches entities present in workspace', () => {
    const workspaceEntities: Entity[] = [
      { id: 'potato_123', ingredientId: 'potato', name: 'Potato', type: 'ingredient' },
      { id: 'egg_456', ingredientId: 'egg', name: 'Egg', type: 'ingredient' },
    ]

    const result = countMatchingIngredients(sampleRecipe, workspaceEntities)
    expect(result.matchingCount).toBe(2)
    expect(result.totalCount).toBe(3)
    expect(result.matchingIngredientIds).toEqual(['potato', 'egg'])
    expect(result.missingIngredientIds).toEqual(['onion'])
  })

  it('handles entities without explicit ingredientId field by fallback prefix parsing', () => {
    const workspaceEntities: Entity[] = [
      { id: 'onion_999', name: 'Onion', type: 'ingredient' },
    ]

    const result = countMatchingIngredients(sampleRecipe, workspaceEntities)
    expect(result.matchingCount).toBe(1)
    expect(result.matchingIngredientIds).toEqual(['onion'])
  })

  it('ignores non-ingredient entities in workspace', () => {
    const workspaceEntities: Entity[] = [
      { id: 'knife_1', name: 'Knife', type: 'tool' },
      { id: 'potato_100', ingredientId: 'potato', name: 'Potato', type: 'ingredient' },
    ]

    const result = countMatchingIngredients(sampleRecipe, workspaceEntities)
    expect(result.matchingCount).toBe(1)
    expect(result.matchingIngredientIds).toEqual(['potato'])
  })
})
