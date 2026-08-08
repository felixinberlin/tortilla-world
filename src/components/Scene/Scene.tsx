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

import React, { useState, useMemo } from 'react';
import { useStore } from 'zustand';
import { DndContext } from '@dnd-kit/core';
import { worldStore } from '../../store/worldStore';
import { ContainerView } from '../World/ContainerView';
import { useSceneDragAndDrop } from './useSceneDragAndDrop';
import { RecipePlayer } from './RecipePlayer';
import { RecipeDatabaseModal } from '../Controls/RecipeDatabaseModal';
import { ArchitectureVisualizer } from '../Dev/ArchitectureVisualizer';
import { useDevMode } from '../../utils/devMode';
import { useTranslation } from '../../i18n/useTranslation';
import { recipes } from '../../data/catalog/recipes';
import { getRecipeWorkstationIds } from '../../systems/recipeWorkstations';
import './RecipePlayer.scss';

export const Scene: React.FC = () => {
  const isDev = useDevMode();
  const { t } = useTranslation();
  const [forcePublishMode, setForcePublishMode] = useState<boolean>(false);

  // Active mode logic: in slim publish mode default to player, in dev mode default to database
  const effectiveDevMode = isDev && !forcePublishMode;
  const [activeMode, setActiveMode] = useState<'player' | 'cookbook' | 'recorder' | 'database' | 'architecture'>(
    effectiveDevMode ? 'database' : 'player'
  );

  // 1. Mount the drag-and-drop input listeners and dispatch handler
  const { sensors, handleDragStart, handleDragOver, handleDragEnd } = useSceneDragAndDrop();

  // 2. Query simulation state and active recipe to filter visible workstations
  const containersMap = useStore(worldStore, (state) => state.containers);
  const activeRecipeId = useStore(worldStore, (state) => state.activeRecipeId);

  const isRecording = useStore(worldStore, (state) => state.isRecording);

  const activeRecipe = useMemo(
    () => recipes.find((r) => r.id === activeRecipeId) || recipes[0],
    [activeRecipeId]
  );

  const recipeWorkstationIds = useMemo(
    () => getRecipeWorkstationIds(activeRecipe, containersMap),
    [activeRecipe, containersMap]
  );

  const containers = useMemo(() => {
    return Object.values(containersMap).filter((container) => {
      // Always hide despensa (pantry) from main workstation row
      if (container.id === 'despensa') return false;

      // Show all workstations in recording or dev inspection modes
      if (isRecording || activeMode === 'database' || activeMode === 'architecture') return true;

      // Filter strictly by workstations generated for the active recipe
      return recipeWorkstationIds.has(container.id);
    });
  }, [containersMap, recipeWorkstationIds, isRecording, activeMode]);

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
            {isPanelExpanded ? t('scene.hideControls') : t('scene.showControls')}
          </button>
        </div>

        {/* Dev Mode Toolbar - only rendered if developer mode is active */}
        {isDev && effectiveDevMode && (
          <div className="dev-admin-bar" style={{ display: 'flex', gap: '8px', padding: '8px 16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>🛠️ Dev Admin:</span>
            <button
              type="button"
              className={`mode-tab-btn ${activeMode === 'player' ? 'active' : ''}`}
              onClick={() => setActiveMode('player')}
              style={{ padding: '4px 10px', fontSize: '0.8rem', borderRadius: '8px' }}
            >
              🍳 Player
            </button>
            <button
              type="button"
              className={`mode-tab-btn ${activeMode === 'database' ? 'active' : ''}`}
              onClick={() => setActiveMode('database')}
              style={{ padding: '4px 10px', fontSize: '0.8rem', borderRadius: '8px' }}
            >
              {t('scene.tabs.database')}
            </button>
            <button
              type="button"
              className={`mode-tab-btn ${activeMode === 'architecture' ? 'active' : ''}`}
              onClick={() => setActiveMode('architecture')}
              style={{ padding: '4px 10px', fontSize: '0.8rem', borderRadius: '8px' }}
            >
              📐 Architecture
            </button>

            <button
              type="button"
              className="mode-toggle-pill"
              style={{
                marginLeft: 'auto',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: '1px solid #cbd5e1',
                backgroundColor: '#e0f2fe',
                color: '#0369a1',
              }}
              onClick={() => setForcePublishMode(true)}
              title="Switch to Slim Published View"
            >
              {t('scene.devModeActive')}
            </button>
          </div>
        )}

        <div className={`scene-controls-wrapper ${isPanelExpanded ? 'expanded' : 'collapsed'}`}>
          {activeMode === 'database' && effectiveDevMode ? (
            <RecipeDatabaseModal />
          ) : activeMode === 'architecture' && effectiveDevMode ? (
            <ArchitectureVisualizer />
          ) : (
            <RecipePlayer renderWorkspace={renderWorkspace} />
          )}
        </div>
      </div>
    </DndContext>
  );
};
