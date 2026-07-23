/**
 * FILE: IngredientListItem.tsx
 *
 * PURPOSE:
 * UI wrapper for an ingredient inside a list.
 *
 * RESPONSIBILITY:
 * - Connects ingredient rendering with list interactions.
 * - Provides drag/drop related UI behavior.
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

  const style: React.CSSProperties | undefined = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 1000 : 1,
        cursor: 'grab',
      }
    : {
        cursor: 'grab',
      };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`ingredient-list-item ${isDragging ? 'dragging' : ''}`}
    >
      <span className="ingredient-name">{entity.name}</span>
    </div>
  );
};