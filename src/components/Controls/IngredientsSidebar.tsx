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
import { useTranslation } from '../../i18n/useTranslation';
import { getRecipeWorkstationIds } from '../../systems/recipeWorkstations';
import { recipes } from '../../data/catalog/recipes';
import './IngredientsSidebar.scss';

export const IngredientsSidebar: React.FC = () => {
  const { t } = useTranslation();
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

  // Handle quick-adding an entity into the primary workstation (e.g., board, bowl, or burner)
  const handleQuickAdd = (entityId: string) => {
    const activeRecipeId = worldStore.getState().activeRecipeId;
    const activeRecipe = recipes.find((r) => r.id === activeRecipeId) || recipes[0];
    const wsIds = getRecipeWorkstationIds(activeRecipe, containers);

    // Find a target container matching active recipe workstations
    const targetId =
      (wsIds.has('board') && containers['board']?.id) ||
      (wsIds.has('bowl') && containers['bowl']?.id) ||
      (wsIds.has('burner1') && containers['burner1']?.id) ||
      containers['bowl']?.id ||
      containers['board']?.id ||
      Object.keys(containers).find((id) => id !== 'despensa') ||
      'bowl';

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
          <span>🧺 {t('ui.ingredientsCatalog')}</span>
        </div>
        <div className="sidebar-subtitle">
          {t('ui.sidebarSubtitle')}
        </div>
      </div>

      <div className="sidebar-search">
        <input
          type="text"
          placeholder={t('ui.searchIngredientsPlaceholder')}
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
              title={`${t('verbs.take')} ${item.name}`}
            >
              ➕ {t('verbs.take')}
            </button>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="no-results">{t('ui.noIngredientsFound', { query: searchQuery })}</div>
      )}
    </div>
  );
};
