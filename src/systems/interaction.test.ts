import { describe, it, expect } from 'vitest'
import { resolveListReorder } from './interaction'

describe('resolveListReorder', () => {

  // ── cross-list: copy semantics ─────────────────────────────────────────────

  it('copies an item to another list, source stays untouched', () => {
    const result = resolveListReorder(
      { activeId: 'full::potato', overId: 'despensa::egg' },
      { full: ['potato', 'onion'], despensa: ['egg'] },
    )
    expect(result).toEqual({
      full: ['potato', 'onion'],   // source unchanged
      despensa: ['potato', 'egg'], // potato inserted before egg
    })
  })

  it('copies into an empty list', () => {
    const result = resolveListReorder(
      { activeId: 'full::potato', overId: 'kitchen' },
      { full: ['potato', 'onion'], kitchen: [] },
    )
    expect(result).toEqual({
      full: ['potato', 'onion'],
      kitchen: ['potato'],
    })
  })

  it('copies between two arbitrary lists', () => {
    const result = resolveListReorder(
      { activeId: 'despensa::onion', overId: 'kitchen::garlic' },
      { despensa: ['onion'], kitchen: ['garlic'] },
    )
    expect(result).toEqual({
      despensa: ['onion'],
      kitchen: ['onion', 'garlic'],
    })
  })

  it('blocks copying an item that is already in the target list', () => {
    const result = resolveListReorder(
      { activeId: 'full::potato', overId: 'despensa' },
      { full: ['potato', 'onion'], despensa: ['potato', 'egg'] },
    )
    expect(result).toBeNull()
  })

  it('blocks copying even when dropping on blank space in a list that already has the item', () => {
    const result = resolveListReorder(
      { activeId: 'full::potato', overId: 'despensa' },
      { full: ['potato'], despensa: ['potato'] },
    )
    expect(result).toBeNull()
  })

  // ── same-list: reorder semantics ───────────────────────────────────────────

  it('reorders within the same list', () => {
    const result = resolveListReorder(
      { activeId: 'full::egg', overId: 'full::potato' },
      { full: ['potato', 'egg'], despensa: [] },
    )
    expect(result?.full).toEqual(['egg', 'potato'])
    expect(result?.despensa).toEqual([]) // untouched
  })

  it('reorders even when the item also exists in another list', () => {
    const result = resolveListReorder(
      { activeId: 'full::onion', overId: 'full::potato' },
      { full: ['potato', 'onion'], despensa: ['onion'] },
    )
    expect(result?.full).toEqual(['onion', 'potato'])
    expect(result?.despensa).toEqual(['onion']) // untouched
  })

  // ── guard: invalid drags ───────────────────────────────────────────────────

  it('returns null when the item is not in the source list', () => {
    const result = resolveListReorder(
      { activeId: 'full::garlic', overId: 'despensa' },
      { full: ['potato'], despensa: [] },
    )
    expect(result).toBeNull()
  })

  it('returns null when source list does not exist', () => {
    const result = resolveListReorder(
      { activeId: 'ghost::potato', overId: 'kitchen' },
      { full: ['potato'], kitchen: [] },
    )
    expect(result).toBeNull()
  })
})