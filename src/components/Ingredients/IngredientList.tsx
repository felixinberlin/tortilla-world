// src/components/Ingredients/IngredientList.tsx

import React from 'react';
import { IngredientListItem } from './IngredientListItem';
import { useWorldStore } from '../../store/worldStore';
import type { WorldState } from '../../store/worldStore';

interface Props {
  containerId: string;
}

export const IngredientList: React.FC<Props> = ({ containerId }) => {
  const container = useWorldStore((state: WorldState) => state.containers[containerId]);
  const entities = useWorldStore((state: WorldState) => state.entities);

  if (!container) return null;

  const containerEntities = container.entityIds
    .map((id) => entities[id])
    .filter((e) => Boolean(e));

  return (
    <div className="ingredient-list">
      <h3>{container.name}</h3>
      {containerEntities.map((entity) => (
        <IngredientListItem key={entity.id} entity={entity} />
      ))}
    </div>
  );
};