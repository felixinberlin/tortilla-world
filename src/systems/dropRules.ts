/**
 * FILE: dropRules.ts
 *
 * PURPOSE:
 * Defines rules for drag and drop interactions.
 *
 * RESPONSIBILITY:
 * - Determines whether an entity can enter a container.
 * - Validates possible world transitions.
 *
 * SHOULD NOT:
 * - Modify state.
 */

export interface DragEndpoint {
  listId: string
  itemId: string
}

export interface DropTarget {
  listId: string
  itemId: string | null
}

export interface ParsedDrag {
  source: DragEndpoint
  target: DropTarget
}

export type DropKind = 'same-list-reorder' | 'cross-list-move' | 'cross-list-copy'

export interface ApprovedDrop {
  kind: DropKind
  source: DragEndpoint
  target: DropTarget
  insertAt: number
}

export interface ListFlags {
  consumesOnDrag?: boolean
}

export interface DropRuleOptions {
  /**
   * Groups items for the "already in target" duplicate check — e.g. two
   * different physical instances of "potato" should still be treated as
   * the same ingredient for blocking purposes.
   */
  groupOf?: (itemId: string) => string
}

export function parseDrag(activeId: string, overId: string): ParsedDrag | null {
  const sourceParts = activeId.split('::')
  const targetParts = overId.split('::')

  const sourceListId = sourceParts[0]
  const sourceItemId = sourceParts[1]
  const targetListId = targetParts[0]

  if (!sourceListId || !sourceItemId || !targetListId) return null

  return {
    source: { listId: sourceListId, itemId: sourceItemId },
    target: { listId: targetListId, itemId: targetParts[1] ?? null },
  }
}

/**
 * Read-only gate: can this drag-and-drop happen?
 *
 * Same-list reorder: always allowed.
 * Cross-list: blocked when the target already holds an instance of the
 * same group. Otherwise allowed as a move (consuming source) or copy
 * (non-consuming source) — the kind is decided here so interaction.ts
 * only has to apply it.
 */
export function evaluateDrop(
  drag: ParsedDrag,
  lists: Record<string, string[]>,
  listFlags: Record<string, ListFlags> = {},
  options: DropRuleOptions = {},
): ApprovedDrop | null {
  const sourceIds = lists[drag.source.listId]
  const targetIds = lists[drag.target.listId]
  if (!sourceIds || !targetIds || !sourceIds.includes(drag.source.itemId)) return null

  const targetIndex = drag.target.itemId ? targetIds.indexOf(drag.target.itemId) : -1
  const insertAt = targetIndex === -1 ? targetIds.length : targetIndex

  if (drag.source.listId === drag.target.listId) {
    return {
      kind: 'same-list-reorder',
      source: drag.source,
      target: drag.target,
      insertAt,
    }
  }

  const groupOf = options.groupOf ?? ((itemId: string) => itemId)
  const sourceGroup = groupOf(drag.source.itemId)
  if (targetIds.some((itemId) => groupOf(itemId) === sourceGroup)) return null

  const sourceConsumes = listFlags[drag.source.listId]?.consumesOnDrag ?? false

  return {
    kind: sourceConsumes ? 'cross-list-move' : 'cross-list-copy',
    source: drag.source,
    target: drag.target,
    insertAt,
  }
}
