import { describe, it, expect } from 'vitest'
import { parseDrag, evaluateDrop } from './dropRules'

const kitchenConsumes = { kitchen: { consumesOnDrag: true }, fire: { consumesOnDrag: true } }

describe('parseDrag', () => {
  it('parses a dragged item and a list drop target', () => {
    expect(parseDrag('despensa::potato', 'kitchen')).toEqual({
      source: { listId: 'despensa', itemId: 'potato' },
      target: { listId: 'kitchen', itemId: null },
    })
  })

  it('parses a dragged item and an item drop target', () => {
    expect(parseDrag('despensa::egg', 'despensa::potato')).toEqual({
      source: { listId: 'despensa', itemId: 'egg' },
      target: { listId: 'despensa', itemId: 'potato' },
    })
  })

  it('returns null for malformed ids', () => {
    expect(parseDrag('potato', 'kitchen')).toBeNull()
    expect(parseDrag('despensa::potato', '')).toBeNull()
  })
})

describe('evaluateDrop', () => {
  it('approves same-list reorder without duplicate checks', () => {
    const drag = parseDrag('despensa::egg', 'despensa::potato')!
    const drop = evaluateDrop(drag, { despensa: ['potato', 'egg'], kitchen: [] })
    expect(drop).toMatchObject({
      kind: 'same-list-reorder',
      insertAt: 0,
    })
  })

  it('approves a move from a consuming source', () => {
    const drag = parseDrag('kitchen::potato', 'fire')!
    const drop = evaluateDrop(
      drag,
      { kitchen: ['potato', 'egg'], fire: [] },
      kitchenConsumes,
    )
    expect(drop?.kind).toBe('cross-list-move')
  })

  it('approves a copy from a non-consuming source', () => {
    const drag = parseDrag('despensa::potato', 'kitchen')!
    const drop = evaluateDrop(
      drag,
      { despensa: ['potato', 'onion'], kitchen: [] },
      { despensa: {}, kitchen: { consumesOnDrag: true } },
    )
    expect(drop?.kind).toBe('cross-list-copy')
  })

  it('never lets a consuming target override a non-consuming source', () => {
    const drag = parseDrag('despensa::potato', 'fire')!
    const drop = evaluateDrop(
      drag,
      { despensa: ['potato', 'onion'], fire: [] },
      { despensa: {}, fire: { consumesOnDrag: true } },
    )
    expect(drop?.kind).toBe('cross-list-copy')
  })

  it('blocks copying when the target already holds the same ingredient group', () => {
    const drag = parseDrag('despensa::potato#despensa', 'kitchen')!
    const drop = evaluateDrop(
      drag,
      { despensa: ['potato#despensa'], kitchen: ['potato#kitchen'] },
      {},
      { groupOf: (id) => id.split('#')[0] },
    )
    expect(drop).toBeNull()
  })

  it('blocks copying an item already in the target list (default identity grouping)', () => {
    const drag = parseDrag('despensa::potato', 'kitchen')!
    const drop = evaluateDrop(
      drag,
      { despensa: ['potato', 'onion'], kitchen: ['potato', 'egg'] },
    )
    expect(drop).toBeNull()
  })

  it('blocks copying even when dropping on blank space in a list that already has the item', () => {
    const drag = parseDrag('despensa::potato', 'kitchen')!
    const drop = evaluateDrop(
      drag,
      { despensa: ['potato'], kitchen: ['potato'] },
    )
    expect(drop).toBeNull()
  })

  it('returns null when the item is not in the source list', () => {
    const drag = parseDrag('despensa::garlic', 'kitchen')!
    const drop = evaluateDrop(drag, { despensa: ['potato'], kitchen: [] })
    expect(drop).toBeNull()
  })

  it('returns null when source list does not exist', () => {
    const drag = parseDrag('ghost::potato', 'kitchen')!
    const drop = evaluateDrop(drag, { despensa: ['potato'], kitchen: [] })
    expect(drop).toBeNull()
  })
})
