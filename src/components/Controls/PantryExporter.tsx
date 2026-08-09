/**
 * FILE: PantryExporter.tsx
 *
 * PURPOSE:
 * React component for selecting preset Pantry Kits and exporting/building custom PantryKit JSON definitions.
 *
 * RESPONSIBILITY:
 * - Allows switching between Pantry Kit presets (base, tortilla, empty).
 * - Scans current entities in `despensa` container to construct a valid PantryKit schema.
 * - Exports or copies the generated PantryKit JSON object for creator workflows.
 */

import React, { useState, useMemo } from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import { PANTRY_KITS } from '../../data/catalog/pantryKits';
import type { PantryKit, PantryItemRequirement } from '../../types/pantry';
import type { Entity } from '../../types/world';
import './PantryExporter.scss';

export interface PantryExporterProps {
  className?: string;
  showPresetSelector?: boolean;
}

export const PantryExporter: React.FC<PantryExporterProps> = ({
  className = '',
  showPresetSelector = true,
}) => {
  const activePantryKitId = useStore(worldStore, (state) => state.activePantryKitId || 'base_pantry');
  const setPantryKit = useStore(worldStore, (state) => state.setPantryKit);
  const entities = useStore(worldStore, (state) => state.entities);
  const containers = useStore(worldStore, (state) => state.containers);

  const [copied, setCopied] = useState<boolean>(false);
  const [showJsonModal, setShowJsonModal] = useState<boolean>(false);

  // Get current entities sitting inside the despensa container
  const despensaEntities = useMemo(() => {
    const despensa = containers.despensa;
    if (!despensa || !despensa.entityIds) return [];
    return despensa.entityIds.map((id) => entities[id]).filter(Boolean) as Entity[];
  }, [containers.despensa, entities]);

  // Construct a clean PantryKit definition based on current despensa contents
  const generatedPantryKit = useMemo((): PantryKit => {
    const grouped: Record<string, { count: number; name: string; icon?: string; sampleState?: Record<string, unknown> }> = {};

    despensaEntities.forEach((ent) => {
      const catalogId = ent.ingredientId || ent.id.split('_')[0] || ent.id;
      const entAmount = typeof ent.state?.amount === 'number' ? ent.state.amount : 1;
      if (!grouped[catalogId]) {
        grouped[catalogId] = {
          count: 0,
          name: ent.name ? ent.name.replace(/^[\p{Emoji}\s]+/u, '').trim() || ent.name : catalogId,
          icon: ent.icon || '📦',
          sampleState: ent.state ? JSON.parse(JSON.stringify(ent.state)) : undefined,
        };
      }
      grouped[catalogId].count += entAmount;
    });

    const items: PantryItemRequirement[] = Object.entries(grouped).map(([catId, info]) => ({
      catalogId: catId,
      quantity: info.count,
      name: info.name,
      icon: info.icon,
      ...(info.sampleState && Object.keys(info.sampleState).length > 0 ? { initialState: info.sampleState } : {}),
    }));

    return {
      id: 'custom_pantry_exported',
      name: 'Custom Exported Pantry Kit',
      description: `Exported pantry snapshot containing ${despensaEntities.length} active items.`,
      items,
    };
  }, [despensaEntities]);

  const jsonString = useMemo(() => JSON.stringify(generatedPantryKit, null, 2), [generatedPantryKit]);

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Failed to copy PantryKit JSON:', err);
    }
  };

  const handleDownloadJson = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedPantryKit.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`pantry-exporter ${className}`}>
      {showPresetSelector && (
        <div className="pantry-presets-section">
          <div className="pantry-section-title">
            <span>🧺 Pantry Kit Preset</span>
            <span className="pantry-badge">
              {activePantryKitId === 'tortilla_pantry'
                ? '🍳 Tortilla'
                : activePantryKitId === 'empty_pantry'
                ? '🧹 Empty'
                : '📦 Base'}
            </span>
          </div>

          <div className="pantry-presets-grid">
            {Object.values(PANTRY_KITS).map((kit) => {
              const isActive = activePantryKitId === kit.id;
              return (
                <button
                  key={kit.id}
                  type="button"
                  className={`pantry-preset-card ${isActive ? 'active' : ''}`}
                  onClick={() => setPantryKit(kit.id)}
                  title={`Switch pantry starter kit to ${kit.name}`}
                >
                  <div className="pantry-icon">
                    {kit.id === 'empty_pantry' ? '🧹' : kit.id === 'tortilla_pantry' ? '🍳' : '🧺'}
                  </div>
                  <div className="pantry-info">
                    <span className="pantry-name">{kit.name}</span>
                    <span className="pantry-desc">{kit.items.length} item types</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Exporter Controls */}
      <div className="pantry-export-actions">
        <div className="pantry-summary">
          <span>📦 Despensa Snapshot:</span>
          <strong>{despensaEntities.length} items</strong>
        </div>

        <div className="pantry-btn-group">
          <button
            type="button"
            className="pantry-export-btn"
            onClick={() => setShowJsonModal(!showJsonModal)}
          >
            📋 {showJsonModal ? 'Hide JSON' : 'Export PantryKit JSON'}
          </button>
        </div>
      </div>

      {showJsonModal && (
        <div className="pantry-json-preview">
          <div className="pantry-json-header">
            <span>PantryKit JSON Definition</span>
            <div className="pantry-json-actions">
              <button type="button" className="btn-copy" onClick={handleCopyJson}>
                {copied ? '✅ Copied!' : '📋 Copy'}
              </button>
              <button type="button" className="btn-download" onClick={handleDownloadJson}>
                💾 Download
              </button>
            </div>
          </div>
          <pre className="pantry-json-code">{jsonString}</pre>
        </div>
      )}
    </div>
  );
};

export default PantryExporter;
