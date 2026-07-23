/**
 * FILE: IngredientList.tsx
 *
 * PURPOSE:
 * Displays a collection/container of ingredients.
 *
 * RESPONSIBILITY:
 * - Renders container title and its inner entities.
 * - Acts as a droppable target for drag-and-drop.
 */

import { useStore } from 'zustand';
import { useDroppable } from '@dnd-kit/core';
import { worldStore } from '../../store/worldStore';
import type { Container, Entity } from '../../types/world';
import { IngredientListItem } from './IngredientListItem';

interface IngredientListProps {
  key?: string | number;
  container: Container;
}

export function IngredientList({ container }: IngredientListProps) {
  const entities = useStore(worldStore, (state) => state.entities);

  // Set up dnd-kit droppable binding for this container
  const { setNodeRef, isOver } = useDroppable({
    id: container.id,
  });

  const containerEntities = container.entityIds
    .map((id: string) => entities[id])
    .filter((e: Entity | undefined): e is Entity => Boolean(e));

  return (
    <div 
      ref={setNodeRef} 
      data-container-id={container.id}
      className={`ingredient-list ${isOver ? 'drag-over' : ''}`}
    >
      <h3>{container.name}</h3>
      <div className="items-container">
        {containerEntities.map((entity: Entity) => (
          <IngredientListItem key={entity.id} entity={entity} />
        ))}
        {containerEntities.length === 0 && (
          <span className="empty-hint">Drop ingredients here</span>
        )}
      </div>
    </div>
  );
}