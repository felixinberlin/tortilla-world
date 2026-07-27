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

import React, { useState } from 'react';
import { useStore } from 'zustand';
import { DndContext } from '@dnd-kit/core';
import { worldStore } from '../../store/worldStore';
import { ContainerView } from '../World/ContainerView';
import { useSceneDragAndDrop } from './useSceneDragAndDrop';
import { RecipePlayer } from './RecipePlayer';
import { ActionRecorder } from '../Controls/ActionRecorder';
import { IngredientsSidebar } from '../Controls/IngredientsSidebar';
import './RecipePlayer.scss';

export const Scene: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'player' | 'recorder'>('player');
  const dispatch = useStore(worldStore, (state) => state.dispatch);

  // 1. Mount the drag-and-drop input listeners and dispatch handler
  const { sensors, handleDragStart, handleDragOver, handleDragEnd } = useSceneDragAndDrop();

  // 2. Query the pure simulation state for rendering (hiding despensa container from UI view)
  const containersMap = useStore(worldStore, (state) => state.containers);
  const containers = Object.values(containersMap).filter((c) => c.id !== 'despensa');

  const renderWorkspace = (leftNode?: React.ReactNode, rightNode?: React.ReactNode) => (
    <div className="scene-workspace">
      {leftNode}
      <div className="scene">
        {containers.map((container) => (
          <ContainerView key={container.id} container={container} />
        ))}
      </div>
      {rightNode}
    </div>
  );

  const [isPanelExpanded, setIsPanelExpanded] = useState(false);

  return (
    // 3. The DndContext wrapper acts as the physical input boundary
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="scene-container">
        {/* Mobile Expand/Collapse Toggle */}
        <div className="mobile-panel-toggle">
          <button
            type="button"
            onClick={() => setIsPanelExpanded(!isPanelExpanded)}
            className="panel-toggle-btn"
          >
            {isPanelExpanded ? '🔼 Hide Controls' : '🔽 Show Controls & Modes'}
          </button>
        </div>

        <div className={`scene-controls-wrapper ${isPanelExpanded ? 'expanded' : 'collapsed'}`}>
          {/* Mode Selector Navigation Tabs & Reset Control */}
          <div className="mode-tabs">
            <button
              type="button"
              className={`mode-tab-btn ${activeMode === 'player' ? 'active' : ''}`}
              onClick={() => setActiveMode('player')}
            >
              📖 Play Catalog Recipe Mode
            </button>
            <button
              type="button"
              className={`mode-tab-btn ${activeMode === 'recorder' ? 'active' : ''}`}
              onClick={() => setActiveMode('recorder')}
            >
              🎥 Action Recorder & Translator Mode
            </button>
            <button
              type="button"
              className="reset-kitchen-header-btn"
              onClick={() => dispatch({ type: 'RESET_WORLD' })}
              title="Clean the kitchen and reset all containers"
            >
              🔄 Reset Kitchen
            </button>
          </div>

          {activeMode === 'player' ? (
            <RecipePlayer renderWorkspace={() => null} />
          ) : (
            <div className="action-recorder-layout">
              <ActionRecorder />
              <IngredientsSidebar />
            </div>
          )}
        </div>

        {/* Render Workspace independently so it doesn't get collapsed */}
        <div className="scene-workspace-independent" style={{ marginTop: '20px' }}>
            {renderWorkspace()}
        </div>
      </div>
    </DndContext>
  );
};
