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

/** The single source of truth for which lists exist. Add a row, get a list. */
const PANEL_CONFIG = [
  { id: 'full', title: 'Full list', seedFromCatalog: true },
  { id: 'empty', title: 'Empty list', seedFromCatalog: false },
  { id: 'empty2', title: 'Empty list 2', seedFromCatalog: false },
  { id: 'empty3', title: 'Empty list 3', seedFromCatalog: false },
]

function toIngredientView(entity: Entity): Ingredient {
  const catalogEntry = ingredientCatalog.find((ingredient) => ingredient.id === entity.id)
  return {
    id: entity.id,
    name: catalogEntry?.name ?? entity.id,
    icon: catalogEntry?.icon ?? '🥔',
  }
}

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
  const entities = useWorldStore((state) => state.entities)
  const updateEntity = useWorldStore((state) => state.updateEntity)

  const listsById = useMemo(() => {
    const result: Record<string, Ingredient[]> = {}
    for (const panel of PANEL_CONFIG) {
      result[panel.id] = getIngredientsForList(
        entities,
        panel.id,
        panel.seedFromCatalog ? ingredientCatalog : [],
      )
    }
    return result
  }, [entities])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over) return

    const currentLists = Object.fromEntries(
      PANEL_CONFIG.map((panel) => [panel.id, listsById[panel.id].map((item) => item.id)]),
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
    () => PANEL_CONFIG.map((panel) => ({ ...panel, ingredients: listsById[panel.id] })),
    [listsById],
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