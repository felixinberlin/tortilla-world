import { describe, it, expect } from 'vitest'
import { resolveListReorder } from './interaction'

describe('resolveListReorder', () => {
  it('moves an item from full to empty', () => {
    const result = resolveListReorder(
      { activeId: 'full::potato', overId: 'empty::egg' },
      ['potato', 'egg'],
      ['egg'],
    )
    expect(result).toEqual({ fullIds: ['egg'], emptyIds: ['potato', 'egg'] })
  })

  it('reorders within the same list', () => {
    const result = resolveListReorder(
      { activeId: 'full::egg', overId: 'full::potato' },
      ['potato', 'egg'],
      [],
    )
    expect(result?.fullIds).toEqual(['egg', 'potato'])
  })

  it('returns null when the item is not in the source list', () => {
    const result = resolveListReorder(
      { activeId: 'full::onion', overId: 'empty::egg' },
      ['potato'],
      ['egg'],
    )
    expect(result).toBeNull()
  })
})