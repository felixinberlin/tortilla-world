/**
 * FILE: IngredientsSidebar.tsx
 *
 * PURPOSE:
 * Right-side ingredients catalog panel for creator / recording mode.
 *
 * RESPONSIBILITY:
 * - Displays ingredients separated into Basic (eggs, potato, olive oil, salt, garlic) and Others.
 * - Others list is hidden by default and can be toggled.
 * - Supports drag-and-drop between Basic and Others lists to reassign categories.
 * - Enables drag-and-drop or quick-add into kitchen workstations.
 */

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useStore } from 'zustand';
import { useDroppable } from '@dnd-kit/core';
import { worldStore } from '../../store/worldStore';
import { ingredients } from '../../data/catalog/ingredients';
import { EntityView } from '../World/EntityView';
import { useTranslation } from '../../i18n/useTranslation';
import type { Entity } from '../../types/world';
import './IngredientsSidebar.scss';

const LOCAL_STORAGE_KEY = 'tortilla_world_basic_ingredient_ids';
const DEFAULT_BASIC_IDS = ['egg', 'potato', 'oil', 'salt', 'garlic'];

function getInitialBasicIds(): string[] {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load basic ingredient categories from localStorage:', err);
  }
  return DEFAULT_BASIC_IDS;
}

interface CatalogItem extends Entity {
  ingredientId: string;
}

interface DroppableCategoryProps {
  id: string;
  title: string;
  items: CatalogItem[];
  isBasic: boolean;
  onQuickAdd: (id: string) => void;
  onMoveCategory: (ingredientId: string, targetCategory: 'basic' | 'other') => void;
  onDropNative: (e: React.DragEvent, targetCategory: 'basic' | 'other') => void;
}

const DroppableCategoryList: React.FC<DroppableCategoryProps> = ({
  id,
  title,
  items,
  isBasic,
  onQuickAdd,
  onMoveCategory,
  onDropNative,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  const { t } = useTranslation();

  return (
    <div
      ref={setNodeRef}
      className={`category-section ${isBasic ? 'category-basic' : 'category-other'} ${
        isOver ? 'category-dropzone--over' : ''
      }`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDropNative(e, isBasic ? 'basic' : 'other')}
    >
      <div className="category-header">
        <div className="category-title-wrapper">
          <span className="category-icon">{isBasic ? '⭐' : '📦'}</span>
          <span className="category-title">{title}</span>
        </div>
        <span className="category-badge">{items.length}</span>
      </div>

      {items.length === 0 ? (
        <div className="empty-category-hint">{t('ui.dropToCategorize')}</div>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <div
              key={item.id}
              className="sidebar-item-card"
              draggable
              onDragStart={(e) => {
                const baseId = item.ingredientId || item.id;
                e.dataTransfer.setData('text/plain', baseId);
                e.dataTransfer.setData('source-category', isBasic ? 'basic' : 'other');
              }}
            >
              <div className="item-entity-wrapper">
                <EntityView entity={item} containerId="despensa" readOnly={false} />
              </div>
              <div className="item-card-actions">
                <button
                  type="button"
                  className="quick-add-btn"
                  onClick={() => onQuickAdd(item.id)}
                  title={`${t('verbs.take')} ${item.name}`}
                >
                  ➕ {t('verbs.take')}
                </button>
                <button
                  type="button"
                  className="shift-category-btn"
                  onClick={() => onMoveCategory(item.ingredientId || item.id, isBasic ? 'other' : 'basic')}
                  title={isBasic ? t('ui.moveToOthers') : t('ui.moveToBasic')}
                >
                  {isBasic ? '⬇️ ' + t('ui.moveToOthers') : '⬆️ ' + t('ui.moveToBasic')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const IngredientsSidebar: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isOthersShown, setIsOthersShown] = useState<boolean>(false);
  const [basicIds, setBasicIds] = useState<string[]>(getInitialBasicIds);

  const entities = useStore(worldStore, (state) => state.entities);

  // Save basicIds to localStorage when modified
  const updateBasicIds = useCallback((newBasicIds: string[]) => {
    setBasicIds(newBasicIds);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newBasicIds));
    } catch (err) {
      console.warn('Failed to save basic ingredient categories:', err);
    }
  }, []);

  const moveToBasic = useCallback(
    (rawId: string) => {
      const baseId = rawId.includes('#') ? rawId.split('#')[0] : rawId;
      if (!basicIds.includes(baseId)) {
        updateBasicIds([...basicIds, baseId]);
      }
    },
    [basicIds, updateBasicIds]
  );

  const moveToOthers = useCallback(
    (rawId: string) => {
      const baseId = rawId.includes('#') ? rawId.split('#')[0] : rawId;
      if (basicIds.includes(baseId)) {
        updateBasicIds(basicIds.filter((id) => id !== baseId));
      }
    },
    [basicIds, updateBasicIds]
  );

  const handleResetCategories = useCallback(() => {
    updateBasicIds(DEFAULT_BASIC_IDS);
  }, [updateBasicIds]);

  // Listen for dnd-kit drop events dispatched by useSceneDragAndDrop
  useEffect(() => {
    const handleCategoryMove = (e: Event) => {
      const customEv = e as CustomEvent<{ entityId: string; targetCategory: string }>;
      if (!customEv.detail) return;
      const { entityId, targetCategory } = customEv.detail;

      if (targetCategory === 'basic-ingredients-list') {
        moveToBasic(entityId);
      } else if (targetCategory === 'other-ingredients-list') {
        moveToOthers(entityId);
      }
    };

    window.addEventListener('move-ingredient-category', handleCategoryMove);
    return () => window.removeEventListener('move-ingredient-category', handleCategoryMove);
  }, [moveToBasic, moveToOthers]);

  // Master catalog list mapped to Entities
  const catalogList: CatalogItem[] = useMemo(() => {
    return ingredients.map((ing) => {
      const existing = entities[ing.id];
      if (existing) return { ...existing, ingredientId: ing.id };
      return {
        id: ing.id,
        ingredientId: ing.id,
        name: `${ing.icon} ${ing.name}`,
        type: 'ingredient' as const,
        state: {},
      };
    });
  }, [entities]);

  // Separate catalog into Basic vs Other items
  const { basicItems, otherItems } = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch = (item: CatalogItem) => {
      if (!query) return true;
      return item.name.toLowerCase().includes(query) || item.id.toLowerCase().includes(query);
    };

    const basic: CatalogItem[] = [];
    const other: CatalogItem[] = [];

    for (const item of catalogList) {
      if (!matchesSearch(item)) continue;
      const isBasic = basicIds.includes(item.ingredientId) || basicIds.includes(item.id);
      if (isBasic) {
        basic.push(item);
      } else {
        other.push(item);
      }
    }

    return { basicItems: basic, otherItems: other };
  }, [catalogList, basicIds, searchQuery]);

  // Automatically expand Others list if user is actively searching and there are matching items in Others
  const effectiveShowOthers = isOthersShown || (searchQuery.trim().length > 0 && otherItems.length > 0);

  // Handle quick-adding / taking an ingredient into Tortilla's hands (up to 2 items max)
  const handleQuickAdd = (entityId: string) => {
    const state = worldStore.getState();
    const mascot = state.entities['chef'];
    const rawHolding = mascot?.state?.holdingEntityIds as string[] | undefined;
    const singleHolding = mascot?.state?.holdingEntityId as string | undefined;

    const holdingEntityIds: string[] = Array.isArray(rawHolding) && rawHolding.length > 0
      ? rawHolding
      : singleHolding
      ? [singleHolding]
      : [];

    if (holdingEntityIds.length >= 2) {
      // Hands are full (max 2 items)
      state.dispatch({
        type: 'UPDATE_ENTITY_STATE',
        payload: {
          entityId: 'chef',
          changes: {
            speechMessage: t('ui.handsFull') || '¡Mis manos están ocupadas! Deja un ingrediente primero.',
          },
        },
      });
      setTimeout(() => {
        worldStore.getState().dispatch({
          type: 'UPDATE_ENTITY_STATE',
          payload: { entityId: 'chef', changes: { speechMessage: undefined } },
        });
      }, 2500);
      return;
    }

    // Tortilla has a free hand! Take the ingredient into her hand
    state.dispatch({
      type: 'MASCOT_GRAB',
      payload: {
        entityId,
        sourceContainerId: 'despensa',
      },
    });
  };

  const handleMoveCategory = (ingredientId: string, targetCategory: 'basic' | 'other') => {
    if (targetCategory === 'basic') {
      moveToBasic(ingredientId);
    } else {
      moveToOthers(ingredientId);
    }
  };

  const handleDropNative = (e: React.DragEvent, targetCategory: 'basic' | 'other') => {
    e.preventDefault();
    const ingId = e.dataTransfer.getData('text/plain');
    if (ingId) {
      handleMoveCategory(ingId, targetCategory);
    }
  };

  const isCustomized = useMemo(() => {
    if (basicIds.length !== DEFAULT_BASIC_IDS.length) return true;
    return !DEFAULT_BASIC_IDS.every((id) => basicIds.includes(id));
  }, [basicIds]);

  return (
    <div className={`ingredients-sidebar-container ${isCollapsed ? 'collapsed' : ''}`} data-container-id="despensa">
      <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div className="sidebar-title">
            <span>🧺 {t('ui.ingredientsCatalog')}</span>
          </div>
          {!isCollapsed && <div className="sidebar-subtitle">{t('ui.sidebarSubtitle')}</div>}
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {isCustomized && !isCollapsed && (
            <button
              type="button"
              onClick={handleResetCategories}
              className="reset-categories-btn"
              title={t('ui.resetCategories')}
            >
              🔄
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="toggle-sidebar-btn"
          >
            {isCollapsed ? `👁️ ${t('ui.showIngredients')}` : `🙈 ${t('ui.hideIngredients')}`}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <>
          <div className="sidebar-search">
            <input
              type="text"
              placeholder={t('ui.searchIngredientsPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="sidebar-categories-container">
            {/* Basic Ingredients Section */}
            <DroppableCategoryList
              id="basic-ingredients-list"
              title={t('ui.basicIngredients')}
              items={basicItems}
              isBasic={true}
              onQuickAdd={handleQuickAdd}
              onMoveCategory={handleMoveCategory}
              onDropNative={handleDropNative}
            />

            {/* Other Ingredients Section Header & Toggle */}
            <div className="others-toggle-row">
              <button
                type="button"
                className="toggle-others-btn"
                onClick={() => setIsOthersShown(!isOthersShown)}
              >
                {effectiveShowOthers
                  ? `🙈 ${t('ui.hideOthers')} (${otherItems.length})`
                  : `👁️ ${t('ui.showOthers')} (${otherItems.length})`}
              </button>
            </div>

            {/* Other Ingredients Section */}
            {effectiveShowOthers && (
              <DroppableCategoryList
                id="other-ingredients-list"
                title={t('ui.otherIngredients')}
                items={otherItems}
                isBasic={false}
                onQuickAdd={handleQuickAdd}
                onMoveCategory={handleMoveCategory}
                onDropNative={handleDropNative}
              />
            )}
          </div>

          {basicItems.length === 0 && otherItems.length === 0 && (
            <div className="no-results">{t('ui.noIngredientsFound', { query: searchQuery })}</div>
          )}
        </>
      )}
    </div>
  );
};
