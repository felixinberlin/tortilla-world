import { describe, it, expect } from 'vitest'
import { resolveListReorder, applyListOrders } from './interaction'
import type { Entity } from '../types/Entity'


// ── consumesOnDrag: move vs copy semantics ─────────────────────────────────

it('dragging from a consuming list removes the item from the source', () => {
  const result = resolveListReorder(
    { activeId: 'kitchen::potato', overId: 'fire' },
    { kitchen: ['potato', 'egg'], fire: [] },
    { kitchen: { consumesOnDrag: true }, fire: { consumesOnDrag: true } },
  )
  expect(result?.lists).toEqual({
    kitchen: ['egg'],   // potato removed
    fire: ['potato'],
  })
  expect(result?.changedListId).toBe('fire')
  expect(result?.removedFromListId).toBe('kitchen')
})

it('dragging from a non-consuming list keeps the item in the source', () => {
  const result = resolveListReorder(
    { activeId: 'despensa::potato', overId: 'kitchen' },
    { despensa: ['potato', 'onion'], kitchen: [] },
    { despensa: {}, kitchen: { consumesOnDrag: true } },
  )
  expect(result?.lists).toEqual({
    despensa: ['potato', 'onion'],  // potato stays
    kitchen: ['potato'],
  })
  expect(result?.removedFromListId).toBeNull()
})

it('applyListOrders removes the item from entity.lists when source consumes', () => {
  const calls: Array<[string, Partial<Omit<Entity, 'id'>>]> = []
  const updateEntity = (id: string, changes: Partial<Omit<Entity, 'id'>>) => calls.push([id, changes])
  const getEntity = (): Entity => ({
    id: 'potato', type: 'ingredient', position: { x: 0, y: 0 },
    size: { width: 1, height: 1 }, state: 'idle',
    lists: ['despensa', 'kitchen'],
  })

  applyListOrders(updateEntity, getEntity, { fire: ['potato'] }, 'kitchen')

  const potatoCall = calls.find(([id]) => id === 'potato')
  expect(potatoCall?.[1].lists).toEqual(['despensa', 'fire'])  // kitchen removed, fire added
})

describe('resolveListReorder', () => {

    

  // ── cross-list: copy semantics ─────────────────────────────────────────────

  it('copies an item to another list, source stays untouched', () => {
    const result = resolveListReorder(
      { activeId: 'despensa::potato', overId: 'kitchen::egg' },
      { despensa: ['potato', 'onion'], kitchen: ['egg'] },
    )
    expect(result?.lists).toEqual({
      despensa: ['potato', 'onion'],
      kitchen: ['potato', 'egg'],
    })
    expect(result?.changedListId).toBe('kitchen')
  })

  it('copies into an empty list', () => {
    const result = resolveListReorder(
      { activeId: 'despensa::potato', overId: 'kitchen' },
      { despensa: ['potato', 'onion'], kitchen: [] },
    )
    expect(result?.lists).toEqual({
      despensa: ['potato', 'onion'],
      kitchen: ['potato'],
    })
    expect(result?.changedListId).toBe('kitchen')
  })

  it('copies between two arbitrary lists', () => {
    const result = resolveListReorder(
      { activeId: 'despensa::onion', overId: 'kitchen::garlic' },
      { despensa: ['onion'], kitchen: ['garlic'] },
    )
    expect(result?.lists).toEqual({
      despensa: ['onion'],
      kitchen: ['onion', 'garlic'],
    })
  })

  it('copying to a new list does not remove the item from other lists it appears in', () => {
    const result = resolveListReorder(
      { activeId: 'despensa::potato', overId: 'fire' },
      { despensa: ['potato', 'onion'], kitchen: ['potato', 'egg'], fire: [] },
    )
    expect(result?.lists).toEqual({
      despensa: ['potato', 'onion'],
      kitchen: ['potato', 'egg'],
      fire: ['potato'],
    })
    expect(result?.changedListId).toBe('fire')
  })

  it('blocks copying an item already in the target list', () => {
    const result = resolveListReorder(
      { activeId: 'despensa::potato', overId: 'kitchen' },
      { despensa: ['potato', 'onion'], kitchen: ['potato', 'egg'] },
    )
    expect(result).toBeNull()
  })

  it('blocks copying even when dropping on blank space in a list that already has the item', () => {
    const result = resolveListReorder(
      { activeId: 'despensa::potato', overId: 'kitchen' },
      { despensa: ['potato'], kitchen: ['potato'] },
    )
    expect(result).toBeNull()
  })

  // ── same-list: reorder semantics ───────────────────────────────────────────

  it('reorders within the same list', () => {
    const result = resolveListReorder(
      { activeId: 'despensa::egg', overId: 'despensa::potato' },
      { despensa: ['potato', 'egg'], kitchen: [] },
    )
    expect(result?.lists.despensa).toEqual(['egg', 'potato'])
    expect(result?.lists.kitchen).toEqual([])
    expect(result?.changedListId).toBe('despensa')
  })

  it('reorders even when the item also exists in another list', () => {
    const result = resolveListReorder(
      { activeId: 'despensa::onion', overId: 'despensa::potato' },
      { despensa: ['potato', 'onion'], kitchen: ['onion'] },
    )
    expect(result?.lists.despensa).toEqual(['onion', 'potato'])
    expect(result?.lists.kitchen).toEqual(['onion'])
  })

  // ── guard: invalid drags ───────────────────────────────────────────────────

  it('returns null when the item is not in the source list', () => {
    const result = resolveListReorder(
      { activeId: 'despensa::garlic', overId: 'kitchen' },
      { despensa: ['potato'], kitchen: [] },
    )
    expect(result).toBeNull()
  })

  it('returns null when source list does not exist', () => {
    const result = resolveListReorder(
      { activeId: 'ghost::potato', overId: 'kitchen' },
      { despensa: ['potato'], kitchen: [] },
    )
    expect(result).toBeNull()
  })
})

describe('applyListOrders', () => {
  it('adds the entity to the target list without removing it from others', () => {
    const calls: Array<[string, Partial<Omit<Entity, 'id'>>]> = []
    const updateEntity = (id: string, changes: Partial<Omit<Entity, 'id'>>) => calls.push([id, changes])
    const getEntity = (id: string): Entity => ({
      id,
      type: 'ingredient',
      position: { x: 0, y: 0 },
      size: { width: 1, height: 1 },
      state: 'idle',
      lists: ['despensa', 'kitchen'],
    })

    applyListOrders(updateEntity, getEntity, { fire: ['potato'] })

    expect(calls[0][1].lists).toEqual(['despensa', 'kitchen', 'fire'])
  })

  it('does not duplicate the list if already present', () => {
    const calls: Array<[string, Partial<Omit<Entity, 'id'>>]> = []
    const updateEntity = (id: string, changes: Partial<Omit<Entity, 'id'>>) => calls.push([id, changes])
    const getEntity = (id: string): Entity => ({
      id,
      type: 'ingredient',
      position: { x: 0, y: 0 },
      size: { width: 1, height: 1 },
      state: 'idle',
      lists: ['fire'],
    })

    applyListOrders(updateEntity, getEntity, { fire: ['potato'] })

    expect(calls[0][1].lists).toEqual(['fire'])
  })

  it('writes position.y as insertion order', () => {
    const calls: Array<[string, Partial<Omit<Entity, 'id'>>]> = []
    const updateEntity = (id: string, changes: Partial<Omit<Entity, 'id'>>) => calls.push([id, changes])
    const getEntity = (): Entity => ({
      id: 'x', type: 'ingredient', position: { x: 0, y: 0 },
      size: { width: 1, height: 1 }, state: 'idle', lists: [],
    })

    applyListOrders(updateEntity, getEntity, { kitchen: ['egg', 'potato', 'onion'] })

    expect(calls[0][1].position).toEqual({ x: 0, y: 0 })
    expect(calls[1][1].position).toEqual({ x: 0, y: 1 })
    expect(calls[2][1].position).toEqual({ x: 0, y: 2 })
  })
})

