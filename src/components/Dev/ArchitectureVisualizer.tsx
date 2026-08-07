/**
 * FILE: ArchitectureVisualizer.tsx
 *
 * PURPOSE:
 * Interactive developer visualizer for Tortilla World's simulation architecture,
 * entity-container topology graphs, system pipelines, and live store state.
 */

import React, { useState } from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import { getWorkstationSupportedActions } from '../../engine/containerRules';
import './ArchitectureVisualizer.scss';

export const ArchitectureVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'topology' | 'pipeline' | 'rules'>('topology');

  const entitiesMap = useStore(worldStore, (state) => state.entities);
  const containersMap = useStore(worldStore, (state) => state.containers);
  const activeKitId = useStore(worldStore, (state) => state.activeKitId);
  const recordedActions = useStore(worldStore, (state) => state.recordedActions || []);

  const totalEntities = Object.keys(entitiesMap).length;
  const activeContainersCount = Object.keys(containersMap).length;

  return (
    <div className="arch-visualizer">
      {/* Header */}
      <div className="arch-header">
        <div className="arch-title-row">
          <h3>📐 Tortilla World Architecture Visualizer</h3>
          <span className="arch-dev-tag">Dev Engine Inspector</span>
        </div>
        <p>
          Live visual layout of entity-container relationships, store state, action pipelines, and
          AGENTS.md architectural principles.
        </p>
      </div>

      {/* Real-time Stat Bar */}
      <div className="arch-stats-row">
        <div className="arch-stat-card">
          <span className="stat-label">Active Entities</span>
          <span className="stat-value">📦 {totalEntities}</span>
        </div>
        <div className="arch-stat-card">
          <span className="stat-label">Containers</span>
          <span className="stat-value">🍳 {activeContainersCount}</span>
        </div>
        <div className="arch-stat-card">
          <span className="stat-label">Preset Kit</span>
          <span className="stat-value">🧰 {activeKitId?.toUpperCase()}</span>
        </div>
        <div className="arch-stat-card">
          <span className="stat-label">Recorded Actions</span>
          <span className="stat-value">📜 {recordedActions.length}</span>
        </div>
      </div>

      {/* View Tabs */}
      <div className="arch-tabs">
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
