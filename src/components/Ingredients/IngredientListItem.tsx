import React from 'react';
import { worldStore } from '../../store/worldStore';
import type { Entity } from '../../types/world';

interface IngredientListItemProps {
  entity: Entity;
}

export const IngredientListItem: React.FC<IngredientListItemProps> = ({ entity }) => {
  const handleRemove = () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId: entity.id,
        targetContainerId: 'storage',
      },
    });
  };

  return (
    <div className="ingredient-list-item">
      <span>{entity.name}</span>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};