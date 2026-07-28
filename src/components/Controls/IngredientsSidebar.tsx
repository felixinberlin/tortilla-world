/**
 * FILE: IngredientsSidebar.tsx
 *
 * PURPOSE:
 * Right-side ingredients and tools catalog panel for recording mode.
 *
 * RESPONSIBILITY:
 * - Displays all available ingredients and tools from the catalog.
 * - Enables drag-and-drop or quick-add into kitchen workstations.
 * - Filters items by category (All, Ingredients, Tools) and search query.
 */

import React, { useState, useMemo } from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import { ingredients } from '../../data/catalog/ingredients';
import { EntityView } from '../World/EntityView';
import './IngredientsSidebar.scss';

export const IngredientsSidebar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const entities = useStore(worldStore, (state) => state.entities);
  const containers = useStore(worldStore, (state) => state.containers);

  // Ingredients catalog list
  const catalogList = useMemo(() => {
    return ingredients.map((ing) => {
      const existing = entities[ing.id];
      if (existing) return existing;
      return {
        id: ing.id,
        ingredientId: ing.id,
        name: `${ing.icon} ${ing.name}`,
        type: 'ingredient' as const,
        state: {},
      };
    });
  }, [entities]);

  // Filter items based on searchQuery
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return catalogList;

    const query = searchQuery.toLowerCase();
    return catalogList.filter(
      (item) => item.name.toLowerCase().includes(query) || item.id.toLowerCase().includes(query)
    );
  }, [catalogList, searchQuery]);

  // Handle quick-adding an entity into the primary workstation (e.g., board or bowl)
  const handleQuickAdd = (entityId: string) => {
    // Find a target container (preferably board or bowl, or first available workstation)
    const targetId =
      containers['board']?.id ||
      containers['bowl']?.id ||
      Object.keys(containers).find((id) => id !== 'despensa') ||
      'board';

    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId,
        targetContainerId: targetId,
      },
    });
  };

  return (
    <div className="ingredients-sidebar-container" data-container-id="despensa">
      <div className="sidebar-header">
        <div className="sidebar-title">
          <span>🧺 Ingredients Catalog</span>
        </div>
        <div className="sidebar-subtitle">
          Drag items or tap ➕ to place into the kitchen workstation
        </div>
      </div>

      <div className="sidebar-search">
        <input
          type="text"
          placeholder="🔍 Search ingredients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="items-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="sidebar-item-card">
            <div className="item-entity-wrapper">
              <EntityView entity={item} containerId="despensa" readOnly={false} />
            </div>
            <button
              type="button"
              className="quick-add-btn"
              onClick={() => handleQuickAdd(item.id)}
              title={`Add ${item.name} to workstation`}
            >
              ➕ Take
            </button>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="no-results">No ingredients found matching "{searchQuery}"</div>
      )}
    </div>
  );
};
