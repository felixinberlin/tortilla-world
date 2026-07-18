import { useMemo, useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import type { Ingredient } from '../../types/Ingredient'
import { IngredientList } from '../Ingredients/IngredientList'
import { ingredients as initialFullIngredients } from '../../data/ingredients';

function reorderItems(items: Ingredient[], activeId: string, overId: string) {
  const oldIndex = items.findIndex((item) => activeId.endsWith(item.id))
  const newIndex = items.findIndex((item) => overId.endsWith(item.id))

  if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
    return items
  }

  const reordered = [...items]
  const [moved] = reordered.splice(oldIndex, 1)
  reordered.splice(newIndex, 0, moved)
  return reordered
}

export function Scene() {
  const [fullIngredients, setFullIngredients] = useState<Ingredient[]>(initialFullIngredients)
  const [emptyIngredients, setEmptyIngredients] = useState<Ingredient[]>([])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over) {
      return
    }

    const activeId = String(event.active.id)
    const overId = String(event.over.id)
    const [sourceListId, ingredientId] = activeId.split('::')
    const [targetListId] = overId.split('::')

    if (!sourceListId || !ingredientId || !targetListId) {
      return
    }

    if (sourceListId === targetListId) {
      if (sourceListId === 'full') {
        setFullIngredients((current) => reorderItems(current, activeId, overId))
      } else {
        setEmptyIngredients((current) => reorderItems(current, activeId, overId))
      }
      return
    }

    const sourceItems = sourceListId === 'full' ? fullIngredients : emptyIngredients
    const targetItems = targetListId === 'full' ? fullIngredients : emptyIngredients
    const ingredient = sourceItems.find((item) => item.id === ingredientId)

    if (!ingredient) {
      return
    }

    const updatedSource = sourceItems.filter((item) => item.id !== ingredient.id)
    const updatedTarget = [...targetItems]
    const targetIndex = updatedTarget.findIndex((item) => overId.endsWith(item.id))
    const insertAt = targetIndex === -1 ? updatedTarget.length : targetIndex
    updatedTarget.splice(insertAt, 0, ingredient)

    if (sourceListId === 'full') {
      setFullIngredients(updatedSource)
    } else {
      setEmptyIngredients(updatedSource)
    }

    if (targetListId === 'full') {
      setFullIngredients(updatedTarget)
    } else {
      setEmptyIngredients(updatedTarget)
    }
  }

  const panels = useMemo(
    () => [
      { id: 'full', title: 'Full list', ingredients: fullIngredients },
      { id: 'empty', title: 'Empty list', ingredients: emptyIngredients },
    ],
    [emptyIngredients, fullIngredients],
  )

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <section aria-label="Tortilla world" className="scene-panel">
        {panels.map((panel) => (
          <IngredientList key={panel.id} ingredients={panel.ingredients} listId={panel.id} title={panel.title} />
        ))}
      </section>
    </DndContext>
  )
}
