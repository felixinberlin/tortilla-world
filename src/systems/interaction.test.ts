/**
 * FILE: interaction.test.ts
 *
 * PURPOSE:
 * Unit tests for interaction system and reordering resolutions.
 *
 * RESPONSIBILITY:
 * - Validates resolveListReorder and applyListReorder behavior.
 */

import { describe, it, expect } from 'vitest'
import { evaluateDrop, parseDrag } from './dropRules'
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

function resolveDrag(
  activeId: string,
  overId: string,
  lists: Record<string, string[]>,
  listFlags: Record<string, { consumesOnDrag?: boolean }> = {},
  options: { groupOf?: (itemId: string) => string; createCopyId?: (itemId: string) => string } = {},
) {
  const drag = parseDrag(activeId, overId)
  if (!drag) return null
  const drop = evaluateDrop(drag, lists, listFlags, { groupOf: options.groupOf })
  if (!drop) return null
  return resolveListReorder(drop, lists, { createCopyId: options.createCopyId })
}

const kitchenConsumes = { kitchen: { consumesOnDrag: true }, fire: { consumesOnDrag: true } }

// ── consumesOnDrag: move vs copy semantics ─────────────────────────────────

it('dragging from a consuming list removes the item from the source', () => {
  const result = resolveDrag(
    'kitchen::potato',
    'fire',
    { kitchen: ['potato', 'egg'], fire: [] },
    kitchenConsumes,
  )
  expect(result?.lists).toEqual({
    kitchen: ['egg'],
    fire: ['potato'],
  })
  expect(result?.changedListId).toBe('fire')
  expect(result?.removedFromListId).toBe('kitchen')
  expect(result?.copy).toBeNull()
})

it('dragging from a non-consuming list keeps the item in the source', () => {
  const result = resolveDrag(
    'despensa::potato',
    'kitchen',
    { despensa: ['potato', 'onion'], kitchen: [] },
    { despensa: {}, kitchen: { consumesOnDrag: true } },
    { createCopyId: () => 'potato-copy' },
  )
  expect(result?.lists).toEqual({
    despensa: ['potato', 'onion'],
    kitchen: ['potato-copy'],
  })
  expect(result?.removedFromListId).toBeNull()
  expect(result?.copy).toEqual({ sourceItemId: 'potato', newItemId: 'potato-copy' })
})

it('a consuming target never overrides a non-consuming source, even dragging onto fire', () => {
  const result = resolveDrag(
    'despensa::potato',
    'fire',
    { despensa: ['potato', 'onion'], fire: [] },
    { despensa: {}, fire: { consumesOnDrag: true } },
    { createCopyId: () => 'potato-copy' },
  )
  expect(result?.lists).toEqual({
    despensa: ['potato', 'onion'],
    fire: ['potato-copy'],
  })
  expect(result?.changedListId).toBe('fire')
  expect(result?.removedFromListId).toBeNull()
})

it('BUG regression: a copy is a distinct instance, so moving it later never touches the original', () => {
  const copyStep = resolveDrag(
    'despensa::salt#despensa',
    'kitchen',
    { despensa: ['salt#despensa'], kitchen: [], fire: [] },
    { despensa: {}, kitchen: { consumesOnDrag: true }, fire: { consumesOnDrag: true } },
    { createCopyId: () => 'salt#kitchen' },
  )
  expect(copyStep?.copy).toEqual({ sourceItemId: 'salt#despensa', newItemId: 'salt#kitchen' })

  const moveStep = resolveDrag(
    'kitchen::salt#kitchen',
    'fire',
    { despensa: ['salt#despensa'], kitchen: ['salt#kitchen'], fire: [] },
    { despensa: {}, kitchen: { consumesOnDrag: true }, fire: { consumesOnDrag: true } },
  )
  expect(moveStep?.lists).toEqual({
    despensa: ['salt#despensa'],
    kitchen: [],
    fire: ['salt#kitchen'],
  })
  expect(moveStep?.removedFromListId).toBe('kitchen')
})

describe('resolveListReorder', () => {
  it('copies an item to another list, source stays untouched, target gets a new id', () => {
    const drag = parseDrag('despensa::potato', 'kitchen::egg')!
    const drop = evaluateDrop(drag, { despensa: ['potato', 'onion'], kitchen: ['egg'] })!
    const result = resolveListReorder(drop, { despensa: ['potato', 'onion'], kitchen: ['egg'] }, {
      createCopyId: () => 'potato-copy',
    })
    expect(result?.lists).toEqual({
      despensa: ['potato', 'onion'],
      kitchen: ['potato-copy', 'egg'],
    })
    expect(result?.changedListId).toBe('kitchen')
    expect(result?.copy).toEqual({ sourceItemId: 'potato', newItemId: 'potato-copy' })
  })

  it('copies into an empty list', () => {
    const drag = parseDrag('despensa::potato', 'kitchen')!
    const drop = evaluateDrop(drag, { despensa: ['potato', 'onion'], kitchen: [] })!
    const result = resolveListReorder(drop, { despensa: ['potato', 'onion'], kitchen: [] }, {
      createCopyId: () => 'potato-copy',
    })
    expect(result?.lists).toEqual({
      despensa: ['potato', 'onion'],
      kitchen: ['potato-copy'],
    })
  })

  it('default createCopyId still produces an id different from the source', () => {
    const drag = parseDrag('despensa::potato', 'kitchen')!
    const drop = evaluateDrop(drag, { despensa: ['potato'], kitchen: [] })!
    const result = resolveListReorder(drop, { despensa: ['potato'], kitchen: [] })
    expect(result?.copy?.newItemId).not.toBe('potato')
    expect(result?.lists.kitchen[0]).not.toBe('potato')
  })

  it('reorders within the same list', () => {
    const drag = parseDrag('despensa::egg', 'despensa::potato')!
    const drop = evaluateDrop(drag, { despensa: ['potato', 'egg'], kitchen: [] })!
    const result = resolveListReorder(drop, { despensa: ['potato', 'egg'], kitchen: [] })
    expect(result?.lists.despensa).toEqual(['egg', 'potato'])
    expect(result?.lists.kitchen).toEqual([])
    expect(result?.changedListId).toBe('despensa')
    expect(result?.copy).toBeNull()
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

    expect(updateCalls).toEqual([])
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
