import { DndContext, closestCenter } from '@dnd-kit/core'
import { IngredientList } from '../Ingredients/IngredientList'
import { useSceneDragAndDrop } from './useSceneDragAndDrop'

export function Scene() {
  const { panels, sensors, handleDragEnd } = useSceneDragAndDrop()

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