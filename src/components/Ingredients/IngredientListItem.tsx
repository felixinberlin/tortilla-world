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
  containerId?: string;
}

export const IngredientListItem: React.FC<IngredientListItemProps> = ({ entity, containerId }) => {
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

  // Determine ingredient state badge (Raw, Prepared, Cooking, Finished)
  const renderStateBadge = () => {
    if (entity.type !== 'ingredient') return null;

    const prep = entity.state?.preparation as string | undefined;
    const cooking = entity.state?.cooking as string | undefined;
    const status = entity.state?.status as string | undefined;

    if (containerId === 'plate' || status?.includes('cooked') || status?.includes('fried') || status?.includes('tortilla')) {
      return <span className="ingredient-state-badge state-finished">Finished ✨</span>;
    }
    if (cooking && cooking !== 'raw') {
      return <span className="ingredient-state-badge state-cooking">Cooking 🔥</span>;
    }
    if (prep) {
      return <span className="ingredient-state-badge state-prepared">Prepared 🔪</span>;
    }
    return <span className="ingredient-state-badge state-raw">Raw 🌾</span>;
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
      {renderStateBadge()}
    </div>
  );
};