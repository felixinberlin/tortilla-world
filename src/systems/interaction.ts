import type { Entity } from '../types/Entity'
import type { ApprovedDrop } from './dropRules'

export interface ReorderOptions {
  /**
   * Produces the id for a brand-new instance created by a copy (dragging
   * out of a non-consuming source). MUST be unique per call in real usage,
   * or the copy will collide with another item.
   */
  createCopyId?: (itemId: string) => string
}

export interface ReorderResult {
  lists: Record<string, string[]>
  changedListId: string
  removedFromListId: string | null
  /**
   * Set only when this resolution created a brand-new instance (i.e. a
   * copy out of a non-consuming source). `sourceItemId` is the original,
   * untouched instance; `newItemId` is the id inserted into the target
   * list. The two are intentionally different entities from this point
   * on — moving one must never affect the other.
   */
  copy: { sourceItemId: string; newItemId: string } | null
}

function defaultCreateCopyId(itemId: string): string {
  return `${itemId}--copy--${Math.random().toString(36).slice(2, 8)}`
}

/**
 * Pure: given an already-approved drop, compute the next list ordering.
 * Validation lives in dropRules.ts — this function only rearranges ids.
 */
export function resolveListReorder(
  drop: ApprovedDrop,
  lists: Record<string, string[]>,
  options: ReorderOptions = {},
): ReorderResult | null {
  const sourceIds = lists[drop.source.listId]
  const targetIds = lists[drop.target.listId]
  if (!sourceIds || !targetIds) return null

  const createCopyId = options.createCopyId ?? defaultCreateCopyId
  const next = { ...lists }

  if (drop.kind === 'same-list-reorder') {
    const reordered = sourceIds.filter((itemId) => itemId !== drop.source.itemId)
    reordered.splice(drop.insertAt, 0, drop.source.itemId)
    next[drop.source.listId] = reordered
    return { lists: next, changedListId: drop.source.listId, removedFromListId: null, copy: null }
  }

  if (drop.kind === 'cross-list-move') {
    next[drop.source.listId] = sourceIds.filter((itemId) => itemId !== drop.source.itemId)
    const reorderedTarget = [...targetIds]
    reorderedTarget.splice(drop.insertAt, 0, drop.source.itemId)
    next[drop.target.listId] = reorderedTarget
    return { lists: next, changedListId: drop.target.listId, removedFromListId: drop.source.listId, copy: null }
  }

  const newItemId = createCopyId(drop.source.itemId)
  const reorderedTarget = [...targetIds]
  reorderedTarget.splice(drop.insertAt, 0, newItemId)
  next[drop.target.listId] = reorderedTarget
  return {
    lists: next,
    changedListId: drop.target.listId,
    removedFromListId: null,
    copy: { sourceItemId: drop.source.itemId, newItemId },
  }
}

/**
 * Commit step: writes the changed list's ordering into the store.
 *
 * Each entity belongs to exactly one list at a time (`entity.listId`), so
 * there's nothing to clean up on the source side — reassigning listId (or,
 * for a copy, creating a new entity) is the entire move. The source list's
 * contents are derived live from entity.listId elsewhere (queries.ts), so
 * they update automatically once this runs.
 */
export function applyListReorder(
  updateEntity: (entityId: string, changes: Partial<Omit<Entity, 'id'>>) => void,
  addEntity: (entity: Entity) => void,
  getEntity: (entityId: string) => Entity | undefined,
  result: ReorderResult,
) {
  const itemIds = result.lists[result.changedListId]

  itemIds.forEach((itemId, index) => {
    const position = { x: 0, y: index }

    if (result.copy && itemId === result.copy.newItemId) {
      const original = getEntity(result.copy.sourceItemId)
      if (!original) return
      addEntity({
        id: itemId,
        type: original.type,
        ingredientId: original.ingredientId,
        position,
        size: original.size,
        state: 'idle',
        listId: result.changedListId,
      })
      return
    }

    updateEntity(itemId, { position, listId: result.changedListId })
  })
}
