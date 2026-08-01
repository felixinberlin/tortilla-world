/**
 * FILE: RequirementView.tsx
 *
 * PURPOSE:
 * Displays a single required entity inside a recipe.
 *
 * RESPONSIBILITY:
 * - Uses EntityView in readOnly mode to visualize required entity.
 * - Always uses fresh catalog data to keep Required Materials immutable.
 *
 * NOTE: Required Materials should show the original, uncooked state of ingredients.
 * Even if an ingredient gets cooked (e.g., oil heated), the Required Materials list
 * should always display the same original names. We achieve this by always using
 * fresh catalog data instead of world state (which gets mutated during cooking).
 * - Renders requirement quantity and unit.
 */

import React, { useEffect } from 'react';
import type { Requirement } from '../../types/Requirement';
import type { Entity } from '../../types/world';
import { worldStore } from '../../store/worldStore';
import { ingredients } from '../../data/catalog/ingredients';
import { catalogTools as tools } from '../../data/catalog/tools';
import { EntityView } from '../World/EntityView';

interface RequirementViewProps {
  requirement: Requirement;
}

export const RequirementView: React.FC<RequirementViewProps> = ({ requirement }) => {
  // const entities = useStore(worldStore, (state) => state.entities);
  const catalogIng = ingredients.find((i) => i.id === requirement.entityId);
  const catalogTool = tools.find((t: { id: string }) => t.id === requirement.entityId);

  /**
   * CHANGE: Always use fresh catalog data for Required Materials.
   *
   * WHY: This ensures Required Materials remain visually immutable throughout the recipe,
   * regardless of any state changes (cooking, consumed, etc.) in the world state.
   *
   * EXAMPLE:
   *   - Catalog says: { icon: '🫒', name: 'Olive Oil' }
   *   - After heating: world state has { cooking: 'heat' } but display stays "Olive Oil"
   *   - Not: "Heat Olive Oil" (which would be wrong)
   *
   * We intentionally ignore realEntity to keep the UI clean and consistent.
   */
  const entity: Entity = {
    id: requirement.entityId,
    name: requirement.name || catalogIng?.name || catalogTool?.name || requirement.entityId,
    type: (catalogTool ? 'tool' : 'ingredient') as 'tool' | 'ingredient',
    icon: catalogIng?.icon || catalogTool?.icon,
    ingredientId: requirement.entityId,
    state: {}, // Always fresh, never mutated
  };

  useEffect(() => {
    const store = worldStore.getState();
    const existing = store.entities[requirement.entityId];
    if (!existing) {
      // If entity doesn't exist in world state yet, create it in pantry
      store.dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: {
            id: requirement.entityId,
            name: requirement.name || catalogIng?.name || catalogTool?.name || requirement.entityId,
            type: (catalogTool ? 'tool' : 'ingredient') as 'tool' | 'ingredient',
            icon: catalogIng?.icon || catalogTool?.icon,
            ingredientId: requirement.entityId,
            state: {},
          },
          containerId: 'despensa',
        },
      });
    }
  }, [requirement.entityId, catalogIng?.name, catalogIng?.icon, catalogTool?.name, catalogTool?.icon, catalogTool, requirement.name]);

  return (
    <li className="requirement-view">
      <EntityView entity={entity} containerId="despensa" readOnly={true} />
      <span className="requirement-view__amount">
        {requirement.amount} {requirement.unit}
      </span>
    </li>
  );
};