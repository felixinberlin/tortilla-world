// src/systems/queries.test.ts
import { describe, it, expect } from 'vitest'
import { getIngredientsForList } from './queries'
import type { Entity } from '../types/Entity'

describe('getIngredientsForList', () => {
  it('returns entities matching the given list, sorted by position', () => {
    const entities: Record<string, Entity> = {
      onion: { id: 'onion', type: 'ingredient', position: { x: 0, y: 1 }, size: { width: 1, height: 1 }, state: 'empty' },
      potato: { id: 'potato', type: 'ingredient', position: { x: 0, y: 0 }, size: { width: 1, height: 1 }, state: 'empty' },
    }
    const result = getIngredientsForList(entities, 'empty')
    expect(result.map((item) => item.id)).toEqual(['potato', 'onion'])
  })

  it('falls back to the catalog when no entities match', () => {
    const result = getIngredientsForList({}, 'full', [{ id: 'egg', name: 'Egg', icon: '🥚' }])
    expect(result).toEqual([{ id: 'egg', name: 'Egg', icon: '🥚' }])
  })
})