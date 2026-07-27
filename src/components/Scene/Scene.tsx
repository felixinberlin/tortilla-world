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

  return (
    // 3. The DndContext wrapper acts as the physical input boundary
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="scene-container">
        {/* Mode Selector Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          <button
            type="button"
            className={`mode-tab-btn ${activeMode === 'player' ? 'active' : ''}`}
            onClick={() => setActiveMode('player')}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '15px',
              cursor: 'pointer',
              border: '2px solid var(--warm-border, #e2e8f0)',
              background: activeMode === 'player' ? '#d97706' : '#ffffff',
              color: activeMode === 'player' ? '#ffffff' : '#334155',
              boxShadow: activeMode === 'player' ? '0 2px 6px rgba(217,119,6,0.3)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            📖 Play Catalog Recipe Mode
          </button>
          <button
            type="button"
            className={`mode-tab-btn ${activeMode === 'recorder' ? 'active' : ''}`}
            onClick={() => setActiveMode('recorder')}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '15px',
              cursor: 'pointer',
              border: '2px solid var(--warm-border, #e2e8f0)',
              background: activeMode === 'recorder' ? '#8b5cf6' : '#ffffff',
              color: activeMode === 'recorder' ? '#ffffff' : '#334155',
              boxShadow: activeMode === 'recorder' ? '0 2px 6px rgba(139,92,246,0.3)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            🎥 Action Recorder & Translator Mode
          </button>
        </div>

        {activeMode === 'player' ? (
          <RecipePlayer renderWorkspace={renderWorkspace} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <ActionRecorder />
            {renderWorkspace(null, <IngredientsSidebar />)}
          </div>
        )}
      </div>
    </DndContext>
  );
};
