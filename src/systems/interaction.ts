import type { Entity } from '../types/Entity'

export type IngredientListState = 'full' | 'empty'

interface DragMoveEvent {
  activeId: string
  overId: string
}

interface DragMoveResult {
  fullIds: string[]
  emptyIds: string[]
}

function parseListItemId(compositeId: string) {
  const [listId, itemId] = compositeId.split('::')
  if (!listId || !itemId) return null
  return { listId, itemId }
}

/** Pure: given current orderings + a drag event, returns the next orderings. */
export function resolveListReorder(
  event: DragMoveEvent,
  currentFullIds: string[],
  currentEmptyIds: string[],
): DragMoveResult | null {
  const source = parseListItemId(event.activeId)
  const target = parseListItemId(event.overId)
  if (!source || !target) return null

  const sourceState = source.listId as IngredientListState
  const targetState = target.listId as IngredientListState
  const ingredientId = source.itemId

  const sourceIds = sourceState === 'full' ? currentFullIds : currentEmptyIds
  const targetIds = targetState === 'full' ? currentFullIds : currentEmptyIds

  if (!sourceIds.includes(ingredientId)) return null

  const targetIndex = targetIds.findIndex((itemId) => event.overId.endsWith(itemId))
  const insertAt = targetIndex === -1 ? targetIds.length : targetIndex

  let nextFullIds = currentFullIds
  let nextEmptyIds = currentEmptyIds

  if (sourceState === targetState) {
    const reordered = sourceIds.filter((itemId) => itemId !== ingredientId)
    reordered.splice(insertAt, 0, ingredientId)
    nextFullIds = sourceState === 'full' ? reordered : currentFullIds
    nextEmptyIds = sourceState === 'empty' ? reordered : currentEmptyIds
  } else {
    const reorderedSource = sourceIds.filter((itemId) => itemId !== ingredientId)
    const reorderedTarget = [...targetIds]
    reorderedTarget.splice(insertAt, 0, ingredientId)
    nextFullIds = sourceState === 'full' ? reorderedSource : targetState === 'full' ? reorderedTarget : currentFullIds
    nextEmptyIds = sourceState === 'empty' ? reorderedSource : targetState === 'empty' ? reorderedTarget : currentEmptyIds
  }

  return { fullIds: nextFullIds, emptyIds: nextEmptyIds }
}

/** Commit step: writes a resolved ordering into the world via the store's updateEntity. */
export function applyListOrder(
  updateEntity: (entityId: string, changes: Partial<Omit<Entity, 'id'>>) => void,
  itemIds: string[],
  listState: IngredientListState,
) {
  itemIds.forEach((itemId, index) => {
    updateEntity(itemId, { state: listState, position: { x: 0, y: index } })
  })
}