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
import { ingredients as ingredientCatalog } from '../../data/catalog/ingredients'
import { resolveListReorder, applyListOrders } from '../../systems/interaction'
import type { Entity } from '../../types/Entity'
import type { Ingredient } from '../../types/Ingredient'

function toIngredientView(entity: Entity): Ingredient {
  const catalogEntry = ingredientCatalog.find((ingredient) => ingredient.id === entity.id)
  return {
    id: entity.id,
    name: catalogEntry?.name ?? entity.id,
    icon: catalogEntry?.icon ?? '🥔',
  }
}

/**
 * Reads entities for one list out of the store. When the store has no
 * entities yet for a "seedFromCatalog" list (i.e. on first load), falls
 * back to the static catalog so the UI isn't empty before anything moves.
 */
function getIngredientsForList(
  entities: Record<string, Entity>,
  listId: string,
  fallbackCatalog: Ingredient[] = [],
) {
  const matching = Object.values(entities)
    .filter((entity) => entity.type === 'ingredient' && entity.state === listId)
    .sort((left, right) => left.position.y - right.position.y)
    .map(toIngredientView)

  return matching.length > 0 ? matching : fallbackCatalog
}

export function Scene() {
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

    const currentLists = Object.fromEntries(
      Object.values(lists).map((list) => [list.id, listsById[list.id].map((item) => item.id)]),
    )

    const result = resolveListReorder(
      { activeId: String(event.active.id), overId: String(event.over.id) },
      currentLists,
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

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <section aria-label="Tortilla world" className="scene-panel">
        {panels.map((panel) => (
          <IngredientList
            key={panel.id}
            ingredients={panel.ingredients}
            listId={panel.id}
            title={panel.title}
          />
        ))}
      </section>
    </DndContext>
  )
}