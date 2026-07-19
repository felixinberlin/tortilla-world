import { describe, it, expect } from 'vitest'
import { resolveListReorder } from './interaction'

describe('resolveListReorder', () => {
  it('moves an item from full to empty', () => {
    const result = resolveListReorder(
      { activeId: 'full::potato', overId: 'empty::egg' },
      { full: ['potato', 'egg'], empty: ['egg'] },
    )
    expect(result).toEqual({ full: ['egg'], empty: ['potato', 'egg'] })
  })

  it('reorders within the same list', () => {
    const result = resolveListReorder(
      { activeId: 'full::egg', overId: 'full::potato' },
      { full: ['potato', 'egg'], empty: [] },
    )
    expect(result?.full).toEqual(['egg', 'potato'])
  })

  it('returns null when the item is not in the source list', () => {
    const result = resolveListReorder(
      { activeId: 'full::onion', overId: 'empty::egg' },
      { full: ['potato'], empty: ['egg'] },
    )
    expect(result).toBeNull()
  })

  it('moves an item between two arbitrary non-full/empty lists', () => {
    const result = resolveListReorder(
      { activeId: 'empty2::onion', overId: 'empty3::garlic' },
      { full: [], empty: [], empty2: ['onion'], empty3: ['garlic'] },
    )
    expect(result).toEqual({
      full: [],
      empty: [],
      empty2: [],
      empty3: ['onion', 'garlic'],
    })
  })
})