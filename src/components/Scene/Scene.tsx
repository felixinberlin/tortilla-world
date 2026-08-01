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
import { CookbookView } from '../Recipe/CookbookView';
import { ActionRecorder } from '../Controls/ActionRecorder';
import { IngredientsSidebar } from '../Controls/IngredientsSidebar';
import { RecipeDatabaseModal } from '../Controls/RecipeDatabaseModal';
import { useDevMode } from '../../utils/devMode';
import { useTranslation } from '../../i18n/useTranslation';
import { recipes } from '../../data/catalog/recipes';
import { getRecipeWorkstationIds } from '../../systems/recipeWorkstations';
import './RecipePlayer.scss';
import { useEffect } from 'react';


export const Scene: React.FC = () => {
  const isDev = useDevMode();
  const { t } = useTranslation();
  const [forcePublishMode, setForcePublishMode] = useState<boolean>(false);

  // Active mode logic: in slim publish mode default to player, in dev mode default to database
  const effectiveDevMode = isDev && !forcePublishMode;
  const [activeMode, setActiveMode] = useState<'player' | 'cookbook' | 'recorder' | 'database'>(
    effectiveDevMode ? 'database' : 'player'
  );

  useEffect(() => {
    console.log('Mode changed:', activeMode);
    const win = window as unknown as {
      dataLayer?: Array<Record<string, unknown>>;
    };
    win.dataLayer = win.dataLayer || [];

    win.dataLayer.push({
      event: "mode_changed",
      mode: activeMode,
    });
  }, [activeMode]);

  // 1. Mount the drag-and-drop input listeners and dispatch handler
  const { sensors, handleDragStart, handleDragOver, handleDragEnd } = useSceneDragAndDrop();

  // 2. Query simulation state and active recipe to filter visible workstations
  const containersMap = useStore(worldStore, (state) => state.containers);
  const activeRecipeId = useStore(worldStore, (state) => state.activeRecipeId);

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

      // Show all workstations in recorder or database modes
      if (activeMode === 'recorder' || activeMode === 'database') return true;

      // Filter strictly by workstations generated for the active recipe
      return recipeWorkstationIds.has(container.id);
    });
  }, [containersMap, recipeWorkstationIds, activeMode]);

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

        <div className={`scene-controls-wrapper ${isPanelExpanded ? 'expanded' : 'collapsed'}`}>
          {/* Mode Selector Navigation Tabs */}
          <div className="mode-tabs">
            {effectiveDevMode && (
              <button
                type="button"
                className={`mode-tab-btn ${activeMode === 'database' ? 'active' : ''}`}
                onClick={() => setActiveMode('database')}
              >
                {t('scene.tabs.database')}
              </button>
            )}

            <button
              type="button"
              className={`mode-tab-btn ${activeMode === 'player' ? 'active' : ''}`}
              onClick={() => setActiveMode('player')}
            >
              {t('scene.tabs.playRecipe')}
            </button>

            <button
              type="button"
              className={`mode-tab-btn ${activeMode === 'cookbook' ? 'active' : ''}`}
              onClick={() => setActiveMode('cookbook')}
            >
              {t('scene.tabs.cookbook')}
            </button>

            <button
              type="button"
              className={`mode-tab-btn ${activeMode === 'recorder' ? 'active' : ''}`}
              onClick={() => setActiveMode('recorder')}
            >
              {t('scene.tabs.actionRecorder')}
            </button>

            {/* Dev Mode Indicator & Toggle */}
            {isDev && (
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
                  backgroundColor: effectiveDevMode ? '#e0f2fe' : '#f1f5f9',
                  color: effectiveDevMode ? '#0369a1' : '#475569',
                }}
                onClick={() => {
                  setForcePublishMode(!forcePublishMode);
                  if (effectiveDevMode) setActiveMode('player');
                }}
                title="Toggle between Developer Admin Mode and Slim Published View"
              >
                {effectiveDevMode ? t('scene.devModeActive') : t('scene.slimPublishPreview')}
              </button>
            )}
          </div>

          {activeMode === 'database' && effectiveDevMode ? (
            <RecipeDatabaseModal />
          ) : activeMode === 'cookbook' ? (
            <CookbookView />
          ) : activeMode === 'player' ? (
            <RecipePlayer />
          ) : (
            <div className="action-recorder-layout">
              <ActionRecorder isDev={effectiveDevMode} />
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
