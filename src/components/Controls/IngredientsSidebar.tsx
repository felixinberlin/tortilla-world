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
import { catalogTools } from '../../data/catalog/tools';
import { EntityView } from '../World/EntityView';
import type { Entity } from '../../types/world';
import './IngredientsSidebar.scss';

export const IngredientsSidebar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'ingredients' | 'tools'>('all');

  const entities = useStore(worldStore, (state) => state.entities);
  const containers = useStore(worldStore, (state) => state.containers);

  // Combine ingredients and tools catalog list
  const catalogList = useMemo(() => {
    const ingEntities: Entity[] = ingredients.map((ing) => {
      const existing = entities[ing.id];
      if (existing) return existing;
      return {
        id: ing.id,
        ingredientId: ing.id,
        name: `${ing.icon} ${ing.name}`,
        type: 'ingredient',
        state: {},
      };
    });

    const toolEntities: Entity[] = catalogTools.map((tool) => {
      const existing = entities[tool.id];
      if (existing) return existing;
      return {
        id: tool.id,
        name: `${tool.icon} ${tool.name}`,
        type: 'tool',
        state: {},
      };
    });

    return { ingEntities, toolEntities };
  }, [entities]);

  // Filter items based on activeTab and searchQuery
  const filteredItems = useMemo(() => {
    let items: Entity[] = [];
    if (activeTab === 'all') {
      items = [...catalogList.ingEntities, ...catalogList.toolEntities];
    } else if (activeTab === 'ingredients') {
      items = catalogList.ingEntities;
    } else if (activeTab === 'tools') {
      items = catalogList.toolEntities;
    }

    if (!searchQuery.trim()) return items;

    const query = searchQuery.toLowerCase();
    return items.filter(
      (item) => item.name.toLowerCase().includes(query) || item.id.toLowerCase().includes(query)
    );
  }, [catalogList, activeTab, searchQuery]);

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
          placeholder="🔍 Search ingredients or tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="sidebar-category-tabs">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All ({catalogList.ingEntities.length + catalogList.toolEntities.length})
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
          onClick={() => setActiveTab('ingredients')}
        >
          Ingredients ({catalogList.ingEntities.length})
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'tools' ? 'active' : ''}`}
          onClick={() => setActiveTab('tools')}
        >
          Tools ({catalogList.toolEntities.length})
        </button>
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
