import { useMemo } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { IngredientList } from '../Ingredients/IngredientList'
import { useWorldStore } from '../../store/worldStore'
import { ingredients as ingredientCatalog } from '../../data/ingredients'
import type { Entity } from '../../types/Entity'
import type { Ingredient } from '../../types/Ingredient'

type IngredientListState = 'full' | 'empty'

interface IngredientView extends Ingredient {}

function toIngredientView(entity: Entity): IngredientView {
  const catalogEntry = ingredientCatalog.find((ingredient) => ingredient.id === entity.id)

  return {
    id: entity.id,
    name: catalogEntry?.name ?? entity.id,
    icon: catalogEntry?.icon ?? '🥔',
  }
}

function getIngredientsForList(
  entities: Record<string, Entity>,
  listState: IngredientListState,
  fallbackCatalog: Ingredient[] = [],
) {
  const matchingEntities = Object.values(entities).filter(
    (entity) => entity.type === 'ingredient' && entity.state === listState,
  )

  if (matchingEntities.length > 0) {
    return matchingEntities
      .slice()
      .sort((left, right) => left.position.y - right.position.y)
      .map((entity) => toIngredientView(entity))
  }

  // The initial “full” list is seeded from the ingredient catalog when the store has not
  // created any entity rows yet. The “empty” list starts empty until an item is moved there.
  if (listState === 'full') {
    return fallbackCatalog.map((ingredient) => ({
      id: ingredient.id,
      name: ingredient.name,
      icon: ingredient.icon,
    }))
  }

  return []
}

function applyListOrder(
  updateEntity: (entityId: string, changes: Partial<Omit<Entity, 'id'>>) => void,
  itemIds: string[],
  listState: IngredientListState,
) {
  itemIds.forEach((itemId, index) => {
    updateEntity(itemId, {
      state: listState,
      position: { x: 0, y: index },
    })
  })
}

export function Scene() {
  const entities = useWorldStore((state) => state.entities)
  const updateEntity = useWorldStore((state) => state.updateEntity)

  const fullIngredients = useMemo(
    () => getIngredientsForList(entities, 'full', ingredientCatalog),
    [entities],
  )

  const emptyIngredients = useMemo(() => getIngredientsForList(entities, 'empty'), [entities])

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

    const sourceState = sourceListId as IngredientListState
    const targetState = targetListId as IngredientListState
    const sourceItems = sourceState === 'full' ? fullIngredients : emptyIngredients
    const targetItems = targetState === 'full' ? fullIngredients : emptyIngredients

    if (!sourceItems.some((item) => item.id === ingredientId)) {
      return
    }

    const sourceIds = sourceItems.map((item) => item.id)
    const targetIds = targetItems.map((item) => item.id)
    const currentFullIds = fullIngredients.map((item) => item.id)
    const currentEmptyIds = emptyIngredients.map((item) => item.id)
    const targetIndex = targetIds.findIndex((itemId) => overId.endsWith(itemId))
    const insertAt = targetIndex === -1 ? targetIds.length : targetIndex

    let nextFullIds = currentFullIds
    let nextEmptyIds = currentEmptyIds

    if (sourceState === targetState) {
      const reorderedIds = sourceIds.filter((itemId) => itemId !== ingredientId)
      reorderedIds.splice(insertAt, 0, ingredientId)

      nextFullIds = sourceState === 'full' ? reorderedIds : currentFullIds
      nextEmptyIds = sourceState === 'empty' ? reorderedIds : currentEmptyIds
    } else {
      const reorderedSourceIds = sourceIds.filter((itemId) => itemId !== ingredientId)
      const reorderedTargetIds = [...targetIds]
      reorderedTargetIds.splice(insertAt, 0, ingredientId)

      nextFullIds = sourceState === 'full' ? reorderedSourceIds : targetState === 'full' ? reorderedTargetIds : currentFullIds
      nextEmptyIds = sourceState === 'empty' ? reorderedSourceIds : targetState === 'empty' ? reorderedTargetIds : currentEmptyIds
    }

    // Update both lists from a single, consistent snapshot so the dragged item does not
    // briefly disappear while the store rerenders.
    applyListOrder(updateEntity, nextFullIds, 'full')
    applyListOrder(updateEntity, nextEmptyIds, 'empty')
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
