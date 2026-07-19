import type { Entity } from '../types/Entity'

interface DragMoveEvent {
  activeId: string
  overId: string
}

/** The item being dragged — always composite, e.g. "full::tomato". */
function parseDraggedItem(compositeId: string) {
  const [listId, itemId] = compositeId.split('::')
  if (!listId || !itemId) return null
  return { listId, itemId }
}

/**
 * The drop target — either a specific item ("despensa::onion") or a bare
 * list container id ("kitchen") when dropping into an empty/blank area.
 */
function parseDropTarget(compositeId: string) {
  const [listId, itemId] = compositeId.split('::')
  if (!listId) return null
  return { listId, itemId: itemId ?? null }
}

/**
 * Pure: given the current id order of every list and a drag event,
 * returns the next order. Two rules:
 *   - Cross-list: COPY semantics — source list is never modified.
 *     Blocked if the item is already in the target list.
 *   - Same-list: MOVE semantics — reorder only, no duplicate created.
 */
export function resolveListReorder(
  event: DragMoveEvent,
  lists: Record<string, string[]>,
): Record<string, string[]> | null {
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
    // Same list: reorder. No duplicate possible.
    const reordered = sourceIds.filter((itemId) => itemId !== source.itemId)
    reordered.splice(insertAt, 0, source.itemId)
    next[source.listId] = reordered
  } else {
    // Cross list: copy. Block if already present in target.
    if (targetIds.includes(source.itemId)) return null
    const reorderedTarget = [...targetIds]
    reorderedTarget.splice(insertAt, 0, source.itemId)
    next[target.listId] = reorderedTarget
  }

  return next
}

export function applyListOrders(
  updateEntity: (entityId: string, changes: Partial<Omit<Entity, 'id'>>) => void,
  lists: Record<string, string[]>,
) {
  for (const [listId, itemIds] of Object.entries(lists)) {
    itemIds.forEach((itemId, index) => {
      updateEntity(itemId, { state: listId, position: { x: 0, y: index } })
    })
  }
}