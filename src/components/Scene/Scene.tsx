// src/components/Scene/Scene.tsx

import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useSceneDragAndDrop } from './useSceneDragAndDrop';
import { IngredientList } from '../Ingredients/IngredientList';

export const Scene: React.FC = () => {
  const { containers, sensors, handleDragEnd } = useSceneDragAndDrop();

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="scene-container">
        {containers.map((container) => (
          <IngredientList key={container.id} containerId={container.id} />
        ))}
      </div>
    </DndContext>
  );
};