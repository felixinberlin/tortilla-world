import { describe, expect, it } from 'vitest'
import { countMatchingRequirements } from './recipeMatcher'
import type { Recipe } from '../types/Recipe'
import type { Entity } from '../types/world'

describe('countMatchingRequirements', () => {
  const sampleRecipe: Recipe = {
    id: 'test-recipe',
    name: 'Test Recipe',
    requirements: [
      { id: 'req-1', entityId: 'potato', amount: 3, unit: 'pcs' },
      { id: 'req-2', entityId: 'egg', amount: 4, unit: 'pcs' },
      { id: 'req-3', entityId: 'onion', amount: 1, unit: 'pcs' },
    ],
    steps: [],
  }

  it('returns zeros when recipe is undefined', () => {
    const result = countMatchingRequirements(undefined, [])
    expect(result.matchingCount).toBe(0)
    expect(result.totalCount).toBe(0)
    expect(result.matchingRequirementIds).toEqual([])
    expect(result.missingRequirementIds).toEqual([])
  })

  it('returns zero matching count when workspace is empty', () => {
    const result = countMatchingRequirements(sampleRecipe, [])
    expect(result.matchingCount).toBe(0)
    expect(result.totalCount).toBe(3)
    expect(result.matchingRequirementIds).toEqual([])
    expect(result.missingRequirementIds).toEqual(['potato', 'egg', 'onion'])
  })

  it('correctly matches entities present in workspace', () => {
    const workspaceEntities: Entity[] = [
      { id: 'potato_123', ingredientId: 'potato', name: 'Potato', type: 'ingredient' },
      { id: 'egg_456', ingredientId: 'egg', name: 'Egg', type: 'ingredient' },
    ]

    const result = countMatchingRequirements(sampleRecipe, workspaceEntities)
    expect(result.matchingCount).toBe(2)
    expect(result.totalCount).toBe(3)
    expect(result.matchingRequirementIds).toEqual(['potato', 'egg'])
    expect(result.missingRequirementIds).toEqual(['onion'])
  })

  it('handles entities without explicit ingredientId field by fallback prefix parsing', () => {
    const workspaceEntities: Entity[] = [
      { id: 'onion_999', name: 'Onion', type: 'ingredient' },
    ]

    const result = countMatchingRequirements(sampleRecipe, workspaceEntities)
    expect(result.matchingCount).toBe(1)
    expect(result.matchingRequirementIds).toEqual(['onion'])
  })

  it('matches tool or product entities in workspace', () => {
    const workspaceEntities: Entity[] = [
      { id: 'knife_1', name: 'Knife', type: 'tool' },
      { id: 'potato_100', ingredientId: 'potato', name: 'Potato', type: 'ingredient' },
    ]

    const result = countMatchingRequirements(sampleRecipe, workspaceEntities)
    expect(result.matchingCount).toBe(1)
    expect(result.matchingRequirementIds).toEqual(['potato'])
  })
})

