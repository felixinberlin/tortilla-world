import { useMemo, useRef } from 'react'
import { PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { useWorldStore } from '../../store/worldStore'
import { useShallow } from 'zustand/react/shallow'
import { getIngredientsForList } from '../../systems/queries'
import { resolveListReorder, applyListReorder } from '../../systems/interaction'
import type { Ingredient } from '../../types/Ingredient'

export function useSceneDragAndDrop() {
  const lists = useWorldStore((state) => state.lists)
  const entities = useWorldStore((state) => state.entities)
  const updateEntity = useWorldStore((state) => state.updateEntity)
  const addEntity = useWorldStore((state) => state.addEntity)

  // Used only to react to membership changes — the id -> listId mapping
  // itself is read fresh from `entities` inside handleDragEnd.
  const entityMemberships = useWorldStore(
    useShallow((state) =>
      Object.fromEntries(Object.values(state.entities).map((e) => [e.id, e.listId]))
    )
  )

  const listsById = useMemo(() => {
    const result: Record<string, Ingredient[]> = {}
    for (const list of Object.values(lists)) {
      result[list.id] = getIngredientsForList(entities, list)
    }
    return result
  }, [entityMemberships, lists])

  const copyCounter = useRef(0)

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

    const listFlags = Object.fromEntries(
      Object.values(lists).map((list) => [list.id, { consumesOnDrag: list.consumesOnDrag ?? false }]),
    )

    const result = resolveListReorder(
      { activeId: String(event.active.id), overId: String(event.over.id) },
      currentLists,
      listFlags,
      {
        // Two entities of the same ingredient type should block each other
        // from stacking in one list, even though they're different instances.
        groupOf: (itemId) => entities[itemId]?.ingredientId ?? itemId,
        // Unique, deterministic-enough id for a freshly copied instance.
        createCopyId: (itemId) => `${itemId}--copy-${Date.now()}-${copyCounter.current++}`,
      },
    )

    if (!result) return

    applyListReorder(updateEntity, addEntity, (id) => entities[id], result)
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