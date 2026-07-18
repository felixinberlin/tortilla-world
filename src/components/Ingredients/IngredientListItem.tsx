import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Ingredient as IngredientModel } from '../../types/Ingredient'
import { Ingredient } from './Ingredient'

interface IngredientListItemProps {
  ingredient: IngredientModel
  listId: string
}

export function IngredientListItem({ ingredient, listId }: IngredientListItemProps) {
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

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="ingredient-list-item"
      {...attributes}
      {...listeners}
    >
      <Ingredient ingredient={ingredient} />
    </li>
  )
}
