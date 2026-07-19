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
import { resolveListReorder, applyListOrder } from '../../systems/interaction'
import type { Entity } from '../../types/Entity'
import type { Ingredient } from '../../types/Ingredient'
import type { IngredientListState } from '../../systems/interaction'

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

    const result = resolveListReorder(
      { activeId: String(event.active.id), overId: String(event.over.id) },
      fullIngredients.map((item) => item.id),
      emptyIngredients.map((item) => item.id),
    )

    if (!result) {
      return
    }

    // Update both lists from a single, consistent snapshot so the dragged item does not
    // briefly disappear while the store rerenders.
    applyListOrder(updateEntity, result.fullIds, 'full')
    applyListOrder(updateEntity, result.emptyIds, 'empty')
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