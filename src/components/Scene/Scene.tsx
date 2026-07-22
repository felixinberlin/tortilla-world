import React from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import { IngredientList } from '../Ingredients/IngredientList';

export const Scene: React.FC = () => {
  const containers = useStore(
    worldStore,
    (state) => state.containers
  );

  const containerList = Object.values(containers);

  return (
    <div className="scene">
      {containerList.map((container) => (
        <IngredientList
          key={container.id}
          containerEntityIds={container.entityIds}
        />
      ))}
    </div>
  );
};