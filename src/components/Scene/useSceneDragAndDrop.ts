import { useMemo } from 'react'
import { PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { useWorldStore } from '../../store/worldStore'
import { getIngredientsForList } from '../../systems/queries'
import { resolveListReorder, applyListOrders } from '../../systems/interaction'
import type { Ingredient } from '../../types/Ingredient'

export function useSceneDragAndDrop() {
  const lists = useWorldStore((state) => state.lists)
  const entities = useWorldStore((state) => state.entities)
  const updateEntity = useWorldStore((state) => state.updateEntity)

  const listsById = useMemo(() => {
    const result: Record<string, Ingredient[]> = {}
    for (const list of Object.values(lists)) {
      result[list.id] = getIngredientsForList(entities, list)
    }
    return result
  }, [entities, lists])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over) return

    const currentLists = Object.fromEntries(
      Object.values(lists).map((list) => [list.id, listsById[list.id].map((item) => item.id)]),
    )

    const result = resolveListReorder(
      { activeId: String(event.active.id), overId: String(event.over.id) },
      currentLists,
    )

    if (!result) return

    // Only write the list that actually changed.
    // Writing all lists would overwrite entity.state for items that exist
    // in multiple lists simultaneously via copy semantics.
    applyListOrders(updateEntity, { [result.changedListId]: result.lists[result.changedListId] })
  }

  const panels = useMemo(
    () =>
      Object.values(lists).map((list) => ({
        id: list.id,
        title: list.title,
        ingredients: listsById[list.id],
      })),
    [lists, listsById],
  )

  return { panels, sensors, handleDragEnd }
}