// src/components/Ingredients/IngredientListItem.tsx

import React from 'react';
import { useWorldStore } from '../../store/worldStore';
import type { WorldState } from '../../store/worldStore';
import type { Entity } from '../../types/world';

interface Props {
  entity: Entity;
}

export const IngredientListItem: React.FC<Props> = ({ entity }) => {
  const dispatch = useWorldStore((state: WorldState) => state.dispatch);

  const handleRemove = () => {
    dispatch({
      type: 'MOVE_ENTITY',
      timestamp: Date.now(),
      payload: {
        entityId: entity.id,
        fromContainerId: entity.containerId,
        toContainerId: 'trash'
      }
    });
  };

  return (
    <div className="ingredient-item">
      <span>{entity.name}</span>
      <button onClick={handleRemove}>Discard</button>
    </div>
  );
};