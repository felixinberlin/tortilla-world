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
import { DndContext } from '@dnd-kit/core';
import { worldStore } from '../../store/worldStore';
import { IngredientList } from '../Ingredients/IngredientList';
import { useSceneDragAndDrop } from './useSceneDragAndDrop';

export const Scene: React.FC = () => {
  // 1. Mount the drag-and-drop input listeners and dispatch handler
  const { sensors, handleDragEnd } = useSceneDragAndDrop();

  // 2. Query the pure simulation state for rendering (hiding despensa container from UI view)
  const containersMap = useStore(worldStore, (state) => state.containers);
  const containers = Object.values(containersMap).filter((c) => c.id !== 'despensa');

  return (
    // 3. The DndContext wrapper acts as the physical input boundary
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="scene">
        {containers.map((container) => (
  <IngredientList
    key={container.id}
    container={container}
  />
))}
      </div>
    </DndContext>
  );
};