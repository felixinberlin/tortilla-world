/**
 * FILE: Scene.tsx
 *
 * PURPOSE:
 * Main game scene renderer.
 *
 * RESPONSIBILITY:
 * - Displays containers and entities in the living kitchen.
 * - Connects world state with visual components.
 * - Provides dnd-kit context with DragOverlay for drag preview.
 * - Integrates DevPanel & Mascot companions.
 */

import React from 'react';
import { useStore } from 'zustand';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { worldStore } from '../../store/worldStore';
import { IngredientList } from '../Ingredients/IngredientList';
import { Mascot } from '../Mascot/Mascot';
import { DevPanel } from '../DevPanel/DevPanel';
import { useSceneDragAndDrop } from './useSceneDragAndDrop';

export const Scene: React.FC = () => {
  const { sensors, activeEntityId, handleDragStart, handleDragEnd } = useSceneDragAndDrop();

  const containersMap = useStore(worldStore, (state) => state.containers);
  const entitiesMap = useStore(worldStore, (state) => state.entities);
  const containers = Object.values(containersMap);

  const activeEntity = activeEntityId ? entitiesMap[activeEntityId] : null;
  const activeIcon = (activeEntity?.state?.icon as string) || (activeEntity?.type === 'tool' ? '🔧' : '🥬');

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="kitchen-app">
        <header className="app-header">
          <div className="header-title">
            <h1>Tortilla World 🌮</h1>
            <p className="subtitle">Interactive Kitchen Simulation & Entity Engine</p>
          </div>
          <Mascot mascotId="chef" />
        </header>

        <main className="scene-grid">
          {containers.map((container) => (
            <IngredientList key={container.id} container={container} />
          ))}
        </main>

        <DevPanel />

        <DragOverlay>
          {activeEntity ? (
            <div className="drag-overlay-item">
              <span className="item-icon">{activeIcon}</span>
              <span className="item-name">{activeEntity.name}</span>
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};