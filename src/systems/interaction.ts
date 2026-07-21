import type { Entity } from '../types/Entity'

interface DragMoveEvent {
  activeId: string
  overId: string
}

interface ListFlags {
  consumesOnDrag?: boolean
}

export interface ReorderOptions {
  /**
   * Groups items for the "already in target" duplicate check — e.g. two
   * different physical instances of "potato" should still be treated as
   * the same ingredient for blocking purposes. Defaults to identity, which
   * treats every raw item id as its own group.
   */
  groupOf?: (itemId: string) => string
  /**
   * Produces the id for a brand-new instance created by a copy (dragging
   * out of a non-consuming source). MUST be unique per call in real usage,
   * or the copy will collide with another item. Defaults to a random
   * suffix so callers who don't care can ignore this entirely.
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

function parseDraggedItem(compositeId: string) {
  const [listId, itemId] = compositeId.split('::')
  if (!listId || !itemId) return null
  return { listId, itemId }
}

function parseDropTarget(compositeId: string) {
  const [listId, itemId] = compositeId.split('::')
  if (!listId) return null
  return { listId, itemId: itemId ?? null }
}

function defaultCreateCopyId(itemId: string): string {
  return `${itemId}--copy--${Math.random().toString(36).slice(2, 8)}`
}

/**
 * Pure: resolves a drag event into the next list state.
 *
 * listFlags tells us which lists consume on drag (move semantics)
 * vs which copy. A list not present in listFlags defaults to copy.
 *
 * Same-list reorder: always move, never creates a duplicate.
 * Any cross-list transfer is blocked if the target already contains an
 *   instance of the same group — this applies to moves as much as copies,
 *   so an ingredient moved back into a list it already occupies (e.g. a
 *   pantry item that was copied out and later dragged back) doesn't pile
 *   up as a second instance next to the one already there.
 * Cross-list from consuming source: the SAME instance moves — removed
 *   from source, added to target. Only the source's flag decides this;
 *   the target's own consumesOnDrag flag is irrelevant here.
 * Cross-list from non-consuming source: the source instance is left
 *   completely untouched, and a brand-new instance is created in the
 *   target. This is what keeps two ingredients of the same type from
 *   becoming secretly the same entity — dragging one out of the pantry
 *   must never let a later move of the copy drag the pantry item along
 *   with it.
 */
export function resolveListReorder(
  event: DragMoveEvent,
  lists: Record<string, string[]>,
  listFlags: Record<string, ListFlags> = {},
  options: ReorderOptions = {},
): ReorderResult | null {
  const source = parseDraggedItem(event.activeId)
  const target = parseDropTarget(event.overId)
  if (!source || !target) return null

  const sourceIds = lists[source.listId]
  const targetIds = lists[target.listId]
  if (!sourceIds || !targetIds || !sourceIds.includes(source.itemId)) return null

  const groupOf = options.groupOf ?? ((itemId: string) => itemId)
  const createCopyId = options.createCopyId ?? defaultCreateCopyId

  const targetIndex = target.itemId ? targetIds.indexOf(target.itemId) : -1
  const insertAt = targetIndex === -1 ? targetIds.length : targetIndex

  const next = { ...lists }
  const sourceConsumes = listFlags[source.listId]?.consumesOnDrag ?? false

  if (source.listId === target.listId) {
    // Same list: always reorder, never block, never duplicate.
    const reordered = sourceIds.filter((itemId) => itemId !== source.itemId)
    reordered.splice(insertAt, 0, source.itemId)
    next[source.listId] = reordered
    return { lists: next, changedListId: source.listId, removedFromListId: null, copy: null }
  }

  // Cross-list: block if the target already holds an instance of the same
  // group, whether this ends up being a move or a copy.
  const sourceGroup = groupOf(source.itemId)
  if (targetIds.some((itemId) => groupOf(itemId) === sourceGroup)) return null

  if (sourceConsumes) {
    // Move: the same instance leaves the source and enters the target.
    next[source.listId] = sourceIds.filter((itemId) => itemId !== source.itemId)
    const reorderedTarget = [...targetIds]
    reorderedTarget.splice(insertAt, 0, source.itemId)
    next[target.listId] = reorderedTarget
    return { lists: next, changedListId: target.listId, removedFromListId: source.listId, copy: null }
  }

  // Copy: source instance is left alone. A new instance is created for
  // the target so the two can never become entangled.
  const newItemId = createCopyId(source.itemId)
  const reorderedTarget = [...targetIds]
  reorderedTarget.splice(insertAt, 0, newItemId)
  next[target.listId] = reorderedTarget
  return {
    lists: next,
    changedListId: target.listId,
    removedFromListId: null,
    copy: { sourceItemId: source.itemId, newItemId },
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