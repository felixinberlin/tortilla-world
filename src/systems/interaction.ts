import type { Entity } from '../types/Entity'

interface DragMoveEvent {
  activeId: string
  overId: string
}

interface ListFlags {
  consumesOnDrag?: boolean
}

export interface ReorderResult {
  lists: Record<string, string[]>
  changedListId: string
  removedFromListId: string | null
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

/**
 * Pure: resolves a drag event into the next list state.
 *
 * listFlags tells us which lists consume on drag (move semantics)
 * vs which copy. A list not present in listFlags defaults to copy.
 *
 * Same-list reorder: always move, never creates a duplicate.
 * Cross-list from consuming source: item removed from source, added to target.
 * Cross-list from non-consuming source: item stays in source, added to target.
 *   Blocked if item already in target.
 * 
 * FIX: If the TARGET list consumes on drag, we ALWAYS perform a move,
 * regardless of the source's consumption flag. This fixes the bug where
 * items dragged to 'fire' (which consumes) were being copied instead of moved.
 */
export function resolveListReorder(
  event: DragMoveEvent,
  lists: Record<string, string[]>,
  listFlags: Record<string, ListFlags> = {},
): ReorderResult | null {
  const source = parseDraggedItem(event.activeId)
  const target = parseDropTarget(event.overId)
  if (!source || !target) return null

  const sourceIds = lists[source.listId]
  const targetIds = lists[target.listId]
  if (!sourceIds || !targetIds || !sourceIds.includes(source.itemId)) return null

  const targetIndex = target.itemId ? targetIds.indexOf(target.itemId) : -1
  const insertAt = targetIndex === -1 ? targetIds.length : targetIndex

  const next = { ...lists }
  const sourceConsumes = listFlags[source.listId]?.consumesOnDrag ?? false
  const targetConsumes = listFlags[target.listId]?.consumesOnDrag ?? false

  if (source.listId === target.listId) {
    // Same list: always reorder, never block, never duplicate.
    const reordered = sourceIds.filter((itemId) => itemId !== source.itemId)
    reordered.splice(insertAt, 0, source.itemId)
    next[source.listId] = reordered
    return { lists: next, changedListId: source.listId, removedFromListId: null }
  }

  // FIX: If target consumes on drag, treat it as a move (remove from source)
  if (targetConsumes) {
    // Move: remove from source, add to target.
    next[source.listId] = sourceIds.filter((itemId) => itemId !== source.itemId)
    const reorderedTarget = [...targetIds]
    reorderedTarget.splice(insertAt, 0, source.itemId)
    next[target.listId] = reorderedTarget
    return { lists: next, changedListId: target.listId, removedFromListId: source.listId }
  }

  if (sourceConsumes) {
    // Move: remove from source, add to target.
    next[source.listId] = sourceIds.filter((itemId) => itemId !== source.itemId)
    const reorderedTarget = [...targetIds]
    reorderedTarget.splice(insertAt, 0, source.itemId)
    next[target.listId] = reorderedTarget
    return { lists: next, changedListId: target.listId, removedFromListId: source.listId }
  }

  // Copy: source stays, item added to target.
  // Blocked if already in target.
  if (targetIds.includes(source.itemId)) return null
  const reorderedTarget = [...targetIds]
  reorderedTarget.splice(insertAt, 0, source.itemId)
  next[target.listId] = reorderedTarget
  return { lists: next, changedListId: target.listId, removedFromListId: null }
}

/**
 * Commit step: writes the changed list into the store via updateEntity.
 * When removedFromListId is set, also strips that list from entity.lists.
 */
export function applyListOrders(
  updateEntity: (entityId: string, changes: Partial<Omit<Entity, 'id'>>) => void,
  getEntity: (entityId: string) => Entity | undefined,
  lists: Record<string, string[]>,
  removedFromListId: string | null = null,
) {
  for (const [listId, itemIds] of Object.entries(lists)) {
    itemIds.forEach((itemId, index) => {
      const entity = getEntity(itemId)
      const currentLists = entity?.lists ?? []

      let updatedLists = currentLists.includes(listId)
        ? currentLists
        : [...currentLists, listId]

      if (removedFromListId) {
        updatedLists = updatedLists.filter((id) => id !== removedFromListId)
      }

      updateEntity(itemId, {
        lists: updatedLists,
        position: { x: 0, y: index },
      })
    })
  }
}