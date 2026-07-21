import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Ingredient as IngredientModel } from '../../types/Ingredient'
import { useWorldStore } from '../../store/worldStore'
import { Ingredient } from './Ingredient'

interface IngredientListItemProps {
  ingredient: IngredientModel
  listId: string
}

export function IngredientListItem({ ingredient, listId }: IngredientListItemProps) {
  const removeEntity = useWorldStore((state) => state.removeEntity)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `${listId}::${ingredient.id}` })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  }

  const showRemove = listId !== 'despensa'

  const handleRemove = () => {
    removeEntity(ingredient.id)
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="ingredient-list-item"
    >
      <div className="ingredient-list-item-body" {...attributes} {...listeners}>
        <Ingredient ingredient={ingredient} />
      </div>
      {showRemove && (
        <button
          type="button"
          className="ingredient-remove"
          aria-label={`Remove ${ingredient.name}`}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={handleRemove}
        >
          ×
        </button>
      )}
    </li>
  )
}
