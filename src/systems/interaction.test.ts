import { describe, it, expect } from 'vitest'
import { resolveListReorder, applyListReorder } from './interaction'
import type { Entity } from '../types/Entity'

function makeEntity(id: string, ingredientId: string, listId: string | null): Entity {
  return {
    id,
    type: 'ingredient',
    ingredientId,
    position: { x: 0, y: 0 },
    size: { width: 1, height: 1 },
    state: 'idle',
    listId,
  }
}

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
  expect(result?.copy).toBeNull()
})

it('dragging from a non-consuming list keeps the item in the source', () => {
  const result = resolveListReorder(
    { activeId: 'despensa::potato', overId: 'kitchen' },
    { despensa: ['potato', 'onion'], kitchen: [] },
    { despensa: {}, kitchen: { consumesOnDrag: true } },
    { createCopyId: () => 'potato-copy' },
  )
  expect(result?.lists).toEqual({
    despensa: ['potato', 'onion'],  // original untouched
    kitchen: ['potato-copy'],       // a NEW instance, not "potato" again
  })
  expect(result?.removedFromListId).toBeNull()
  expect(result?.copy).toEqual({ sourceItemId: 'potato', newItemId: 'potato-copy' })
})

it('a consuming target never overrides a non-consuming source, even dragging onto fire', () => {
  // Regression test: the target's own consumesOnDrag flag must never force
  // a move. Only the source's flag decides move vs copy.
  const result = resolveListReorder(
    { activeId: 'despensa::potato', overId: 'fire' },
    { despensa: ['potato', 'onion'], fire: [] },
    { despensa: {}, fire: { consumesOnDrag: true } },
    { createCopyId: () => 'potato-copy' },
  )
  expect(result?.lists).toEqual({
    despensa: ['potato', 'onion'],  // stays: source doesn't consume
    fire: ['potato-copy'],
  })
  expect(result?.changedListId).toBe('fire')
  expect(result?.removedFromListId).toBeNull()
})

it('BUG regression: a copy is a distinct instance, so moving it later never touches the original', () => {
  // This is the exact scenario reported: salt sits in both despensa (pantry)
  // and kitchen (prepped) — but as two separate entities, not one shared
  // one. Moving the kitchen instance into fire must leave despensa's
  // instance completely alone.
  const copyStep = resolveListReorder(
    { activeId: 'despensa::salt#despensa', overId: 'kitchen' },
    { despensa: ['salt#despensa'], kitchen: [], fire: [] },
    { despensa: {}, kitchen: { consumesOnDrag: true }, fire: { consumesOnDrag: true } },
    { createCopyId: () => 'salt#kitchen' },
  )
  expect(copyStep?.copy).toEqual({ sourceItemId: 'salt#despensa', newItemId: 'salt#kitchen' })

  // Now move the kitchen instance (the copy) into fire.
  const moveStep = resolveListReorder(
    { activeId: 'kitchen::salt#kitchen', overId: 'fire' },
    { despensa: ['salt#despensa'], kitchen: ['salt#kitchen'], fire: [] },
    { despensa: {}, kitchen: { consumesOnDrag: true }, fire: { consumesOnDrag: true } },
  )
  expect(moveStep?.lists).toEqual({
    despensa: ['salt#despensa'],  // untouched — this is the whole point
    kitchen: [],
    fire: ['salt#kitchen'],
  })
  expect(moveStep?.removedFromListId).toBe('kitchen')
})

it('blocks copying when the target already holds an instance of the same ingredient group', () => {
  const result = resolveListReorder(
    { activeId: 'despensa::potato#despensa', overId: 'kitchen' },
    { despensa: ['potato#despensa'], kitchen: ['potato#kitchen'] },
    {},
    { groupOf: (id) => id.split('#')[0] },
  )
  expect(result).toBeNull()
})

describe('resolveListReorder', () => {

  // ── cross-list: copy semantics ─────────────────────────────────────────────

  it('copies an item to another list, source stays untouched, target gets a new id', () => {
    const result = resolveListReorder(
      { activeId: 'despensa::potato', overId: 'kitchen::egg' },
      { despensa: ['potato', 'onion'], kitchen: ['egg'] },
      {},
      { createCopyId: () => 'potato-copy' },
    )
    expect(result?.lists).toEqual({
      despensa: ['potato', 'onion'],
      kitchen: ['potato-copy', 'egg'],
    })
    expect(result?.changedListId).toBe('kitchen')
    expect(result?.copy).toEqual({ sourceItemId: 'potato', newItemId: 'potato-copy' })
  })

  it('copies into an empty list', () => {
    const result = resolveListReorder(
      { activeId: 'despensa::potato', overId: 'kitchen' },
      { despensa: ['potato', 'onion'], kitchen: [] },
      {},
      { createCopyId: () => 'potato-copy' },
    )
    expect(result?.lists).toEqual({
      despensa: ['potato', 'onion'],
      kitchen: ['potato-copy'],
    })
  })

  it('default createCopyId still produces an id different from the source', () => {
    const result = resolveListReorder(
      { activeId: 'despensa::potato', overId: 'kitchen' },
      { despensa: ['potato'], kitchen: [] },
    )
    expect(result?.copy?.newItemId).not.toBe('potato')
    expect(result?.lists.kitchen[0]).not.toBe('potato')
  })

  it('blocks copying an item already in the target list (default identity grouping)', () => {
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
    expect(result?.copy).toBeNull()
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

describe('applyListReorder', () => {
  it('moves an existing entity by updating its listId and position', () => {
    const calls: Array<[string, Partial<Omit<Entity, 'id'>>]> = []
    const updateEntity = (id: string, changes: Partial<Omit<Entity, 'id'>>) => calls.push([id, changes])
    const addEntity = () => { throw new Error('should not create a new entity for a plain move') }
    const getEntity = (id: string) => makeEntity(id, id, 'kitchen')

    applyListReorder(updateEntity, addEntity, getEntity, {
      lists: { fire: ['potato'] },
      changedListId: 'fire',
      removedFromListId: 'kitchen',
      copy: null,
    })

    expect(calls).toEqual([['potato', { position: { x: 0, y: 0 }, listId: 'fire' }]])
  })

  it('creates a brand-new entity for a copy, leaving the original alone', () => {
    const updateCalls: Array<[string, unknown]> = []
    const addCalls: Entity[] = []
    const updateEntity = (id: string, changes: Partial<Omit<Entity, 'id'>>) => updateCalls.push([id, changes])
    const addEntity = (entity: Entity) => addCalls.push(entity)
    const original = makeEntity('salt#despensa', 'salt', 'despensa')
    const getEntity = (id: string) => (id === 'salt#despensa' ? original : undefined)

    applyListReorder(updateEntity, addEntity, getEntity, {
      lists: { kitchen: ['salt#kitchen'] },
      changedListId: 'kitchen',
      removedFromListId: null,
      copy: { sourceItemId: 'salt#despensa', newItemId: 'salt#kitchen' },
    })

    expect(updateCalls).toEqual([])  // original entity never touched
    expect(addCalls).toEqual([{
      id: 'salt#kitchen',
      type: 'ingredient',
      ingredientId: 'salt',
      position: { x: 0, y: 0 },
      size: { width: 1, height: 1 },
      state: 'idle',
      listId: 'kitchen',
    }])
  })

  it('writes position.y as insertion order', () => {
    const calls: Array<[string, Partial<Omit<Entity, 'id'>>]> = []
    const updateEntity = (id: string, changes: Partial<Omit<Entity, 'id'>>) => calls.push([id, changes])
    const addEntity = () => { throw new Error('unexpected addEntity') }
    const getEntity = (id: string) => makeEntity(id, id, 'kitchen')

    applyListReorder(updateEntity, addEntity, getEntity, {
      lists: { kitchen: ['egg', 'potato', 'onion'] },
      changedListId: 'kitchen',
      removedFromListId: null,
      copy: null,
    })

    expect(calls[0][1].position).toEqual({ x: 0, y: 0 })
    expect(calls[1][1].position).toEqual({ x: 0, y: 1 })
    expect(calls[2][1].position).toEqual({ x: 0, y: 2 })
  })
})