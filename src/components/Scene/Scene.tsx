/**
 * FILE: Scene.tsx
 *
 * PURPOSE:
 * Main game scene renderer.
 *
 * RESPONSIBILITY:
 * - Displays entities in the world.
 * - Connects world state with visual components.
 *
 * DOMAIN:
 * The bridge between game world and React UI.
 */

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