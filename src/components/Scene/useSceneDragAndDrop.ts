import { useMemo } from 'react'
import { PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { useWorldStore } from '../../store/worldStore'
import { getIngredientsForList } from '../../systems/queries'
import { resolveListReorder, applyListOrders } from '../../systems/interaction'
import { ingredients as ingredientCatalog } from '../../data/catalog/ingredients'
import type { Ingredient } from '../../types/Ingredient'

/** Owns everything Scene needs to display and drag ingredients between lists. */
export function useSceneDragAndDrop() {
  const lists = useWorldStore((state) => state.lists)
  const entities = useWorldStore((state) => state.entities)
  const updateEntity = useWorldStore((state) => state.updateEntity)

  const listsById = useMemo(() => {
    const result: Record<string, Ingredient[]> = {}
    for (const list of Object.values(lists)) {
      result[list.id] = getIngredientsForList(
        entities,
        list.id,
        list.seedFromCatalog ? ingredientCatalog : [],
      )
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

    //const toListId = event.over.id; // this will be the list when empty
    //const toIndex = event.over.data?.current?.index ?? 0;


    const currentLists = Object.fromEntries(
      Object.values(lists).map((list) => [list.id, listsById[list.id].map((item) => item.id)]),
    )

    const isUniquePerList = (itemId: string) => entities[itemId]?.type === 'ingredient'

    const result = resolveListReorder(
      { activeId: String(event.active.id), overId: String(event.over.id) },
      currentLists,
      isUniquePerList,
    )

    if (result) {
      applyListOrders(updateEntity, result)
    }
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