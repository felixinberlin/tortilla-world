/**
 * FILE: IngredientListItem.tsx
 *
 * PURPOSE:
 * Draggable UI component for rendering an entity inside a container.
 *
 * RESPONSIBILITY:
 * - Renders entity icon, name, and state badge.
 * - Connects dnd-kit useDraggable hook.
 */

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { Entity } from '../../types/world';

interface IngredientListItemProps {
  entity: Entity;
}

export const IngredientListItem: React.FC<IngredientListItemProps> = ({ entity }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: entity.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.4 : 1,
      }
    : undefined;

  const icon = (entity.state?.icon as string) || (entity.type === 'tool' ? '🔧' : '🥬');
  const cutState = entity.state?.cutState as string | undefined;
  const cookState = entity.state?.cookState as string | undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`ingredient-item ${isDragging ? 'dragging' : ''} type-${entity.type}`}
    >
      <span className="item-icon">{icon}</span>
      <span className="item-name">{entity.name}</span>
      {cutState && <span className="state-badge cut-badge">{cutState}</span>}
      {cookState && <span className="state-badge cook-badge">{cookState}</span>}
    </div>
  );
};