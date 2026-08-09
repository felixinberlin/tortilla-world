/**
 * FILE: WorkstationSelector.tsx
 *
 * PURPOSE:
 * Cozy, mobile-first component for selecting kitchen layout presets (kits)
 * and dynamically adding workstation containers (cutting board, burner, bowl, sink, plate, trash).
 */

import React, { useMemo } from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import { WORKSTATION_KITS } from '../../data/catalog/workstations';
import type { WorkstationKitId } from '../../types/workstations';
import { PantryExporter } from './PantryExporter';
import './WorkstationSelector.scss';

interface WorkstationSelectorProps {
  /** Mode: 'creator' allows adding workstations & picking kit presets; 'player' focuses on preset kits */
  mode?: 'creator' | 'player';
  showKitPresets?: boolean;
  showAddWorkstations?: boolean;
  showPantryKits?: boolean;
  className?: string;
}

interface WorkstationTypeDefinition {
  type: 'board' | 'burner' | 'bowl' | 'sink' | 'plate' | 'trash';
  icon: string;
  name: string;
  subtitle: string;
  accentColor: string;
}

const WORKSTATION_TYPES: WorkstationTypeDefinition[] = [
  { type: 'board', icon: '🪵', name: 'Tabla', subtitle: 'Cutting & Peeling', accentColor: '#b45309' },
  { type: 'burner', icon: '🍳', name: 'Fuego', subtitle: 'Cooking & Heat', accentColor: '#dc2626' },
  { type: 'bowl', icon: '🥣', name: 'Bol', subtitle: 'Prep & Mixing', accentColor: '#2563eb' },
  { type: 'sink', icon: '🚰', name: 'Fregadero', subtitle: 'Washing Station', accentColor: '#0284c7' },
  { type: 'plate', icon: '🍽️', name: 'Plato', subtitle: 'Serving Plate', accentColor: '#16a34a' },
  { type: 'trash', icon: '🗑️', name: 'Basura', subtitle: 'Trash & Waste', accentColor: '#64748b' },
];

export const WorkstationSelector: React.FC<WorkstationSelectorProps> = ({
  mode = 'creator',
  showKitPresets = true,
  showAddWorkstations = true,
  showPantryKits = true,
  className = '',
}) => {
  const activeKitId = useStore(worldStore, (state) => state.activeKitId || 'base');
  const setWorkstationKit = useStore(worldStore, (state) => state.setWorkstationKit);
  const containers = useStore(worldStore, (state) => state.containers);
  const dispatch = useStore(worldStore, (state) => state.dispatch);

  // Calculate current count of each workstation type in active kitchen layout
  const containerCounts = useMemo(() => {
    const counts: Record<string, number> = {
      board: 0,
      burner: 0,
      bowl: 0,
      sink: 0,
      plate: 0,
      trash: 0,
    };
    Object.values(containers).forEach((c) => {
      const id = c.id.toLowerCase();
      if (id.startsWith('board') || id.startsWith('tabla')) counts.board++;
      else if (id.startsWith('burner') || id.startsWith('fuego')) counts.burner++;
      else if (id.startsWith('bowl') || id.startsWith('bol')) counts.bowl++;
      else if (id.startsWith('sink') || id.startsWith('fregadero')) counts.sink++;
      else if (id.startsWith('plate') || id.startsWith('plato')) counts.plate++;
      else if (id.startsWith('trash') || id.startsWith('basura')) counts.trash++;
    });
    return counts;
  }, [containers]);

  return (
    <div className={`workstation-selector ${className}`}>
      {/* 1. Kit Preset Toggles */}
      {showKitPresets && (
        <div className="kit-presets-section">
          <div className="ws-section-title">
            <span>🧰 Kitchen Preset Layout</span>
            <span className="ws-badge">
              {activeKitId === 'empty' ? '🧹 Empty' : activeKitId === 'compact' ? '📦 Compact' : '🏠 Standard'}
            </span>
          </div>
          <div className="kit-presets-grid">
            {Object.values(WORKSTATION_KITS).map((kit) => {
              const isActive = activeKitId === kit.id;
              return (
                <button
                  key={kit.id}
                  type="button"
                  className={`kit-preset-card ${isActive ? 'active' : ''}`}
                  onClick={() => setWorkstationKit(kit.id as WorkstationKitId)}
                  title={`Switch layout to ${kit.name}: ${kit.description}`}
                >
                  <div className="kit-icon">
                    {kit.id === 'empty' ? '🧹' : kit.id === 'compact' ? '📦' : '🏠'}
                  </div>
                  <div className="kit-info">
                    <span className="kit-name">{kit.name}</span>
                    <span className="kit-desc">{kit.description}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Dynamic Add Workstations Section (In Creator Mode) */}
      {showAddWorkstations && mode === 'creator' && (
        <div className="add-workstations-wrapper">
          <div className="ws-section-title">
            <span>➕ Customize Workstations</span>
            <span className="ws-badge">Tap to Add</span>
          </div>

          <div className="workstation-cards-grid">
            {WORKSTATION_TYPES.map((ws) => {
              const count = containerCounts[ws.type] || 0;
              return (
                <button
                  key={ws.type}
                  type="button"
                  className="ws-type-card"
                  onClick={() => dispatch({ type: 'ADD_CONTAINER', payload: { workstationType: ws.type } })}
                  title={`Add a new ${ws.name} workstation to your kitchen layout`}
                >
                  <div className="ws-card-top">
                    <span className="ws-card-icon">{ws.icon}</span>
                    <span className={`ws-count-badge ${count > 0 ? 'has-items' : ''}`}>
                      ×{count}
                    </span>
                  </div>

                  <div className="ws-card-body">
                    <span className="ws-card-name">{ws.name}</span>
                    <span className="ws-card-action">➕ Add</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Pantry Kits Selector & Exporter Section */}
      {showPantryKits && <PantryExporter />}
    </div>
  );
};

export default WorkstationSelector;
