import type { Entity } from '../types/Entity'

interface DragMoveEvent {
  activeId: string
  overId: string
}

export interface ReorderResult {
  lists: Record<string, string[]>
  changedListId: string
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

export function resolveListReorder(
  event: DragMoveEvent,
  lists: Record<string, string[]>,
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

  if (source.listId === target.listId) {
    const reordered = sourceIds.filter((itemId) => itemId !== source.itemId)
    reordered.splice(insertAt, 0, source.itemId)
    next[source.listId] = reordered
    return { lists: next, changedListId: source.listId }
  } else {
    if (targetIds.includes(source.itemId)) return null
    const reorderedTarget = [...targetIds]
    reorderedTarget.splice(insertAt, 0, source.itemId)
    next[target.listId] = reorderedTarget
    return { lists: next, changedListId: target.listId }
  }
}

/**
 * Adds an entity to a list by appending the listId to entity.lists.
 * Does not remove from other lists — copy semantics are preserved.
 */
export function applyListOrders(
  updateEntity: (entityId: string, changes: Partial<Omit<Entity, 'id'>>) => void,
  getEntity: (entityId: string) => Entity | undefined,
  lists: Record<string, string[]>,
) {
  for (const [listId, itemIds] of Object.entries(lists)) {
    itemIds.forEach((itemId, index) => {
      const entity = getEntity(itemId)
      const currentLists = entity?.lists ?? []
      const updatedLists = currentLists.includes(listId)
        ? currentLists
        : [...currentLists, listId]
      updateEntity(itemId, {
        lists: updatedLists,
        position: { x: 0, y: index },
      })
    })
  }
}