/**
 * FILE: ArchitectureVisualizer.tsx
 *
 * PURPOSE:
 * Interactive developer visualizer for Tortilla World's simulation architecture,
 * active recipe analysis, ingredient capabilities, workstation topology, and store state.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import { getWorkstationSupportedActions } from '../../engine/containerRules';
import { recipes } from '../../data/catalog/recipes';
import { loadAllCustomRecipes } from '../../services/customRecipeService';
import { getRecipeRequirementsArray } from '../../types/Recipe';
import type { Recipe } from '../../types/Recipe';
import type { RecipeStep } from '../../types/RecipeStep';
import { getRecipeWorkstationIds } from '../../systems/recipeWorkstations';
import { INGREDIENT_CAPABILITIES_CATALOG } from '../../data/catalog/ingredientCapabilities';
import './ArchitectureVisualizer.scss';

function extractStepDetails(step: Record<string, unknown>): {
  action: string;
  ingredient: string;
  targetContainer: string;
  description: string;
} {
  const stepObj = step as Record<string, string | string[] | undefined>;
  const action = String(stepObj.action || stepObj.type || 'ACTION').toUpperCase();
  const ingredient = String(
    stepObj.ingredient ||
      stepObj.ingredientId ||
      stepObj.target ||
      (Array.isArray(stepObj.inputs) ? stepObj.inputs.join(', ') : '') ||
      ''
  );
  const targetContainer = String(
    stepObj.containerId ||
      stepObj.targetContainer ||
      stepObj.targetContainerId ||
      stepObj.target ||
      stepObj.source ||
      ''
  );
  const description = String(
    stepObj.instruction ||
      stepObj.text ||
      stepObj.description ||
      stepObj.recommendation ||
      `${action} ${ingredient} ${targetContainer ? 'in ' + targetContainer : ''}`
  ).trim();

  return { action, ingredient, targetContainer, description };
}

export const ArchitectureVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recipe' | 'topology' | 'pipeline' | 'rules'>('recipe');
  const [customRecipes, setCustomRecipes] = useState<Recipe[]>([]);

  const activeRecipeId = useStore(worldStore, (state) => state.activeRecipeId);
  const entitiesMap = useStore(worldStore, (state) => state.entities);
  const containersMap = useStore(worldStore, (state) => state.containers);
  const activeKitId = useStore(worldStore, (state) => state.activeKitId);
  const recordedActions = useStore(worldStore, (state) => state.recordedActions || []);

  const totalEntities = Object.keys(entitiesMap).length;
  const activeContainersCount = Object.keys(containersMap).length;

  // Asynchronously load custom recipes
  useEffect(() => {
    loadAllCustomRecipes()
      .then((list) => setCustomRecipes(list || []))
      .catch(() => setCustomRecipes([]));
  }, []);

  // Resolve all available recipes
  const allRecipes = useMemo(() => {
    return [...recipes, ...customRecipes];
  }, [customRecipes]);

  // Resolve currently active recipe object
  const activeRecipe = useMemo<Recipe>(() => {
    if (activeRecipeId === 'recording') {
      const syntheticSteps: RecipeStep[] = recordedActions.map((a) => ({
        action: 'instruction' as const,
        text: `${a.type} ${a.payload?.entityId || ''} ${a.payload?.containerId ? '-> ' + a.payload.containerId : ''}`,
        ingredient: a.payload?.entityId,
        containerId: a.payload?.containerId || a.payload?.targetContainer,
      })) as RecipeStep[];

      return {
        id: 'recording',
        name: 'Recorded Recipe Session',
        requirements: [],
        steps: syntheticSteps,
      };
    }
    return allRecipes.find((r) => r.id === activeRecipeId) || recipes[0];
  }, [activeRecipeId, allRecipes, recordedActions]);

  // Active recipe required ingredients
  const activeRequirements = useMemo(() => {
    return activeRecipe ? getRecipeRequirementsArray(activeRecipe) : [];
  }, [activeRecipe]);

  // Workstation IDs required for active recipe
  const activeWorkstationIds = useMemo(() => {
    return getRecipeWorkstationIds(activeRecipe, containersMap);
  }, [activeRecipe, containersMap]);

  // Deep ingredient capability and world store analysis
  const ingredientAnalysis = useMemo(() => {
    return activeRequirements.map((req) => {
      const baseId = req.entityId?.toLowerCase() || req.name?.toLowerCase() || '';
      const capCatalog = INGREDIENT_CAPABILITIES_CATALOG[baseId];
      const capabilitiesList = capCatalog?.capabilities
        ? Object.keys(capCatalog.capabilities)
        : [];

      // Find matching live entities in worldStore
      const matchingEntities = Object.values(entitiesMap).filter((ent) => {
        const entId = ent.id.toLowerCase();
        const entType = ent.type.toLowerCase();
        return (
          entId === baseId ||
          entType === baseId ||
          entId.includes(baseId) ||
          entType.includes(baseId)
        );
      });

      // Find where these entities are currently stored
      const locations = matchingEntities.map((ent) => {
        const container = Object.values(containersMap).find((c) =>
          c.entityIds.includes(ent.id)
        );
        return {
          entityId: ent.id,
          entityName: ent.name || ent.id,
          containerId: container?.id || 'unknown',
          containerName: container?.name || container?.id || 'Unknown',
          state: ent.state,
        };
      });

      return {
        req,
        baseId,
        capName: capCatalog?.name || req.name || baseId,
        capabilitiesList,
        matchingEntities,
        locations,
      };
    });
  }, [activeRequirements, entitiesMap, containersMap]);

  // Active workstations vs kitchen containers analysis
  const workstationAnalysis = useMemo(() => {
    return Object.values(containersMap).map((container) => {
      const isRequiredForRecipe = activeWorkstationIds.has(container.id);
      const supportedVerbs = getWorkstationSupportedActions(container) || [];
      const itemsInside = container.entityIds
        .map((id) => entitiesMap[id])
        .filter(Boolean);

      return {
        container,
        isRequiredForRecipe,
        supportedVerbs,
        itemsInside,
      };
    });
  }, [containersMap, activeWorkstationIds, entitiesMap]);

  return (
    <div className="arch-visualizer">
      {/* Header */}
      <div className="arch-header">
        <div className="arch-title-row">
          <h3>📐 Tortilla World Architecture Visualizer</h3>
          <span className="arch-dev-tag">Dev Engine Inspector</span>
        </div>
        <p>
          Live visual analysis of the active recipe (<strong>{activeRecipe.name}</strong>), its required ingredients,
          supported capability actions, active workstations, and real-time world state.
        </p>
      </div>

      {/* Real-time Stat Bar */}
      <div className="arch-stats-row">
        <div className="arch-stat-card">
          <span className="stat-label">Active Recipe</span>
          <span className="stat-value">🍳 {activeRecipe.name}</span>
        </div>
        <div className="arch-stat-card">
          <span className="stat-label">Required Ingredients</span>
          <span className="stat-value">🧂 {activeRequirements.length}</span>
        </div>
        <div className="arch-stat-card">
          <span className="stat-label">Active Workstations</span>
          <span className="stat-value">🔪 {activeWorkstationIds.size}</span>
        </div>
        <div className="arch-stat-card">
          <span className="stat-label">Preset Kit</span>
          <span className="stat-value">🧰 {activeKitId?.toUpperCase() || 'DEFAULT'}</span>
        </div>
        <div className="arch-stat-card">
          <span className="stat-label">Active Entities</span>
          <span className="stat-value">📦 {totalEntities}</span>
        </div>
        <div className="arch-stat-card">
          <span className="stat-label">Total Containers</span>
          <span className="stat-value">🍳 {activeContainersCount}</span>
        </div>
      </div>

      {/* View Tabs */}
      <div className="arch-tabs">
        <button
          type="button"
          className={`arch-tab-btn ${activeTab === 'recipe' ? 'active' : ''}`}
          onClick={() => setActiveTab('recipe')}
        >
          🎯 Active Recipe & World Analysis
        </button>
        <button
          type="button"
          className={`arch-tab-btn ${activeTab === 'topology' ? 'active' : ''}`}
          onClick={() => setActiveTab('topology')}
        >
          🌐 Container & Entity Topology
        </button>
        <button
          type="button"
          className={`arch-tab-btn ${activeTab === 'pipeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('pipeline')}
        >
          ⚡ Action Execution Pipeline
        </button>
        <button
          type="button"
          className={`arch-tab-btn ${activeTab === 'rules' ? 'active' : ''}`}
          onClick={() => setActiveTab('rules')}
        >
          📜 AGENTS.md Architectural Rules
        </button>
      </div>

      {/* Tab Content 0: Active Recipe & World Analysis */}
      {activeTab === 'recipe' && (
        <div className="active-recipe-analysis">
          {/* Active Recipe Banner */}
          <div className="active-recipe-card">
            <div className="recipe-badge-icon">
              {activeRecipe.id === 'concebolla'
                ? '🧅'
                : activeRecipe.id === 'yema'
                ? '🟡'
                : activeRecipe.id === 'francesa'
                ? '🍳'
                : activeRecipe.id === 'clasica'
                ? '🥔'
                : '⭐'}
            </div>
            <div className="recipe-info">
              <div className="recipe-title-row">
                <h4>{activeRecipe.name}</h4>
                <span className="recipe-id-tag">ID: {activeRecipe.id}</span>
              </div>
              <p className="recipe-meta-text">
                Active recipe blueprint requiring <strong>{activeRequirements.length}</strong> ingredients,{' '}
                <strong>{activeWorkstationIds.size}</strong> workstations, and executing across{' '}
                <strong>{activeRecipe.steps?.length || 0}</strong> declarative steps.
              </p>
            </div>
          </div>

          {/* Section A: Ingredients & Capability Actions Matrix */}
          <div className="arch-section-box">
            <div className="section-title-row">
              <h5>🧪 Recipe Ingredients & Action Capabilities</h5>
              <span className="section-count-badge">{ingredientAnalysis.length} items</span>
            </div>
            <p className="section-desc">
              Capability catalog schemas for ingredients in this recipe, defining allowed action verbs and tracking their live location in the world.
            </p>

            <div className="ingredients-analysis-grid">
              {ingredientAnalysis.map((item, idx) => (
                <div key={`${item.baseId}-${idx}`} className="ingredient-analysis-card">
                  <div className="ing-card-header">
                    <span className="ing-name">
                      {item.capName} ({item.req.amount} {item.req.unit || ''})
                    </span>
                    <span className="ing-base-id">{item.baseId}</span>
                  </div>

                  {/* Capability Verbs */}
                  <div className="ing-capabilities">
                    <span className="cap-label">Allowed Action Verbs:</span>
                    <div className="cap-chips">
                      {item.capabilitiesList.length > 0 ? (
                        item.capabilitiesList.map((verb) => (
                          <span key={verb} className="cap-chip">
                            ⚡ {verb}
                          </span>
                        ))
                      ) : (
                        <span className="no-cap-text">(Basic placement)</span>
                      )}
                    </div>
                  </div>

                  {/* Live Store Tracking */}
                  <div className="ing-live-locations">
                    <span className="cap-label">Live World Store Instances:</span>
                    {item.locations.length > 0 ? (
                      <div className="locations-list">
                        {item.locations.map((loc) => {
                          const prepState = loc.state?.preparation ? `[${loc.state.preparation}]` : '';
                          const cookState = loc.state?.cooking ? `[${loc.state.cooking}]` : '';
                          const statusState = loc.state?.status ? `(${loc.state.status})` : '';
                          return (
                            <div key={loc.entityId} className="location-item">
                              <span className="loc-container">📍 {loc.containerName}</span>
                              <span className="loc-state">
                                {loc.entityName} {prepState} {cookState} {statusState}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <span className="empty-loc-text">⚠️ None active in world store</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section B: Active Workstations & World Mapping */}
          <div className="arch-section-box">
            <div className="section-title-row">
              <h5>🍳 Active Workstations & World State</h5>
              <span className="section-count-badge">
                {workstationAnalysis.filter((w) => w.isRequiredForRecipe).length} Required / {workstationAnalysis.length} Total
              </span>
            </div>
            <p className="section-desc">
              Workstations required by <strong>{activeRecipe.name}</strong>, showing supported action verbs and live container contents.
            </p>

            <div className="workstations-analysis-grid">
              {workstationAnalysis.map(({ container, isRequiredForRecipe, supportedVerbs, itemsInside }) => (
                <div
                  key={container.id}
                  className={`workstation-analysis-card ${isRequiredForRecipe ? 'required' : 'optional'} ${
                    container.isOn ? 'is-heating' : ''
                  }`}
                >
                  <div className="ws-card-header">
                    <div className="ws-title-group">
                      <span className="ws-name">{container.name}</span>
                      <span className="ws-id-code">#{container.id}</span>
                    </div>
                    <span className={`ws-req-badge ${isRequiredForRecipe ? 'active-req' : 'idle'}`}>
                      {isRequiredForRecipe ? '⭐ Required' : 'Standby'}
                    </span>
                  </div>

                  {container.isOn && (
                    <div className="ws-heating-banner">
                      🔥 Stove Active & Heating
                    </div>
                  )}

                  <div className="ws-supported-verbs">
                    <span className="cap-label">Supported Workstation Verbs:</span>
                    <div className="verb-chips">
                      {supportedVerbs.length > 0 ? (
                        supportedVerbs.map((verb) => (
                          <span key={verb} className="ws-verb-chip">
                            {verb}
                          </span>
                        ))
                      ) : (
                        <span className="no-cap-text">Storage only</span>
                      )}
                    </div>
                  </div>

                  <div className="ws-contents">
                    <span className="cap-label">
                      Items Inside ({itemsInside.length}
                      {container.rules?.maxCapacity ? `/${container.rules.maxCapacity}` : ''}):
                    </span>
                    {itemsInside.length > 0 ? (
                      <div className="items-pills">
                        {itemsInside.map((ent) => (
                          <span key={ent.id} className="item-pill">
                            📦 {ent.name || ent.id}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="empty-ws-text">(Empty)</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section C: Recipe Step Action Flow */}
          <div className="arch-section-box">
            <div className="section-title-row">
              <h5>📋 Recipe Step Action Flow</h5>
              <span className="section-count-badge">{activeRecipe.steps?.length || 0} steps</span>
            </div>

            <div className="recipe-steps-pipeline">
              {activeRecipe.steps && activeRecipe.steps.length > 0 ? (
                activeRecipe.steps.map((rawStep, idx) => {
                  const details = extractStepDetails(rawStep as Record<string, unknown>);
                  return (
                    <div key={`step-${idx}`} className="recipe-step-node">
                      <div className="step-idx">{idx + 1}</div>
                      <div className="step-details">
                        <div className="step-action-row">
                          <span className="step-verb">{details.action}</span>
                          {details.ingredient && <span className="step-ent-tag">📦 {details.ingredient}</span>}
                          {details.targetContainer && (
                            <span className="step-ws-tag">🎯 {details.targetContainer}</span>
                          )}
                        </div>
                        <p className="step-desc-text">{details.description}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no-steps-box">No declarative steps recorded for this recipe session.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 1: Topology Graph */}
      {activeTab === 'topology' && (
        <div className="topology-grid">
          {Object.values(containersMap).map((container) => {
            const supportedVerbs = getWorkstationSupportedActions(container);
            const insideEntities = container.entityIds
              .map((id) => entitiesMap[id])
              .filter(Boolean);

            return (
              <div key={container.id} className="container-node">
                <div className="node-header">
                  <span className="node-name">{container.name}</span>
                  <span className="node-badge">
                    {container.entityIds.length}
                    {container.rules?.maxCapacity ? `/${container.rules.maxCapacity}` : ''} items
                  </span>
                </div>

                {supportedVerbs && supportedVerbs.length > 0 && (
                  <div className="node-verbs">
                    {supportedVerbs.slice(0, 5).map((verb) => (
                      <span key={verb} className="verb-chip">
                        {verb}
                      </span>
                    ))}
                    {supportedVerbs.length > 5 && (
                      <span className="verb-chip">+{supportedVerbs.length - 5}</span>
                    )}
                  </div>
                )}

                <div className="node-entities-list">
                  {insideEntities.length === 0 ? (
                    <span className="empty-node">(Empty)</span>
                  ) : (
                    insideEntities.map((ent) => (
                      <div key={ent.id} className="entity-item">
                        <span className="entity-title">{ent.name || ent.id}</span>
                        <span className="entity-type">{ent.type}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab Content 2: Execution Pipeline Flowchart */}
      {activeTab === 'pipeline' && (
        <div className="pipeline-flow">
          <div className="pipeline-step">
            <div className="step-num">1</div>
            <div className="step-content">
              <span className="step-title">User Interaction Boundary (Input)</span>
              <span className="step-desc">
                Drag and drop gestures via <code>dnd-kit</code> or automated recipe steps via{' '}
                <code>RecipeRunner</code> trigger intent.
              </span>
              <div className="step-details">
                <span className="detail-tag">dnd-kit sensors</span>
                <span className="detail-tag">ActionRecorder</span>
                <span className="detail-tag">RecipeRunner</span>
              </div>
            </div>
          </div>

          <div className="pipeline-step">
            <div className="step-num">2</div>
            <div className="step-content">
              <span className="step-title">Validation Engine (Rules)</span>
              <span className="step-desc">
                <code>containerRules.ts</code> evaluates workstation supported actions, capability catalog matching, capacity bounds, and duplicate ingredient limits.
              </span>
              <div className="step-details">
                <span className="detail-tag">validateContainerRules()</span>
                <span className="detail-tag">INGREDIENT_CAPABILITIES_CATALOG</span>
                <span className="detail-tag">Mascot Speech Refusal</span>
              </div>
            </div>
          </div>

          <div className="pipeline-step">
            <div className="step-num">3</div>
            <div className="step-content">
              <span className="step-title">Store Dispatcher (Action Systems)</span>
              <span className="step-desc">
                Pure system actions (<code>MOVE_ENTITY</code>, <code>TRANSFORM_ENTITY</code>, <code>ADD_CONTAINER</code>) run as Zustand state transitions.
              </span>
              <div className="step-details">
                <span className="detail-tag">containerSlice</span>
                <span className="detail-tag">entitySlice</span>
                <span className="detail-tag">mascotSlice</span>
              </div>
            </div>
          </div>

          <div className="pipeline-step">
            <div className="step-num">4</div>
            <div className="step-content">
              <span className="step-title">World State Storage (Zustand & Immer)</span>
              <span className="step-desc">
                Centralized simulation store updates entity ownership and container order without re-creating objects or losing identity.
              </span>
              <div className="step-details">
                <span className="detail-tag">worldStore.ts</span>
                <span className="detail-tag">Identity Preservation</span>
                <span className="detail-tag">Action Logger</span>
              </div>
            </div>
          </div>

          <div className="pipeline-step">
            <div className="step-num">5</div>
            <div className="step-content">
              <span className="step-title">Reactive Views & Animation Layer</span>
              <span className="step-desc">
                React components render container views, drag overlays, and Framer Motion layout animations reacting to state changes.
              </span>
              <div className="step-details">
                <span className="detail-tag">ContainerView</span>
                <span className="detail-tag">ChefMascot</span>
                <span className="detail-tag">Framer Motion</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 3: Core Architectural Principles (AGENTS.md) */}
      {activeTab === 'rules' && (
        <div className="rules-checklist">
          <div className="rule-card">
            <div className="rule-status">✓</div>
            <div className="rule-body">
              <span className="rule-title">Rule 1 — Business Logic Outside Components</span>
              <span className="rule-desc">
                React components are purely visual boundaries. World rules and actions are dispatched to system slice handlers.
              </span>
            </div>
          </div>

          <div className="rule-card">
            <div className="rule-status">✓</div>
            <div className="rule-body">
              <span className="rule-title">Rule 2 — Zustand Is the World State</span>
              <span className="rule-desc">
                The single source of truth for entities, containers, relationships, and mascot states lives inside Zustand.
              </span>
            </div>
          </div>

          <div className="rule-card">
            <div className="rule-status">✓</div>
            <div className="rule-body">
              <span className="rule-title">Rule 3 — Entities Keep Identity</span>
              <span className="rule-desc">
                Entities are never deleted and re-created on drag/move; only container ownership changes.
              </span>
            </div>
          </div>

          <div className="rule-card">
            <div className="rule-status">✓</div>
            <div className="rule-body">
              <span className="rule-title">Rule 4 — Containers Enforce Rules</span>
              <span className="rule-desc">
                Containers decide maximum capacity, allowed entity types, and supported culinary actions.
              </span>
            </div>
          </div>

          <div className="rule-card">
            <div className="rule-status">✓</div>
            <div className="rule-body">
              <span className="rule-title">Rule 5 — Container Contents Are Ordered</span>
              <span className="rule-desc">
                Container contents are stored as ordered arrays (<code>entityIds: string[]</code>) for deterministic rendering and animations.
              </span>
            </div>
          </div>

          <div className="rule-card">
            <div className="rule-status">✓</div>
            <div className="rule-body">
              <span className="rule-title">Rule 6 — Ingredient Uniqueness & Workstation Capabilities</span>
              <span className="rule-desc">
                Containers disallow duplicate identical ingredients and enforce matching capability verbs between ingredients and workstations.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchitectureVisualizer;
