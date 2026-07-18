import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { Ingredient } from '../../types/Ingredient'
import './Ingredients.css'
import { IngredientListItem } from './IngredientListItem'

interface IngredientListProps {
  ingredients: Ingredient[]
  listId: string
  title: string
}

export function IngredientList({ ingredients, listId, title }: IngredientListProps) {
  const { setNodeRef } = useDroppable({ id: listId })

  return (
    <div className="ingredient-list-panel" ref={setNodeRef}>
      <div className="ingredient-list-header">
        <h3>{title}</h3>
        <span>{ingredients.length} items</span>
      </div>

      <SortableContext items={ingredients.map((ingredient) => `${listId}::${ingredient.id}`)} strategy={verticalListSortingStrategy}>
        <ul className="ingredient-list">
          {ingredients.map((ingredient) => (
            <IngredientListItem key={`${listId}::${ingredient.id}`} ingredient={ingredient} listId={listId} />
          ))}
        </ul>
      </SortableContext>
    </div>
  )
}