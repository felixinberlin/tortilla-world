/**
 * FILE: RequirementView.tsx
 *
 * PURPOSE:
 * Displays a single required entity inside a recipe.
 *
 * RESPONSIBILITY:
 * - Uses EntityView in readOnly mode to visualize required entity.
 * - Renders requirement quantity and unit.
 */

import React, { useEffect } from 'react';
import { useStore } from 'zustand';
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
  const entities = useStore(worldStore, (state) => state.entities);
  const catalogIng = ingredients.find((i) => i.id === requirement.entityId);
  const catalogTool = tools.find((t: { id: string }) => t.id === requirement.entityId);

  const realEntity = entities[requirement.entityId];

  const entity: Entity = realEntity || {
    id: requirement.entityId,
    name: requirement.name || catalogIng?.name || catalogTool?.name || requirement.entityId,
    type: catalogTool ? 'tool' : 'ingredient',
    icon: catalogIng?.icon || catalogTool?.icon,
    ingredientId: requirement.entityId,
    state: {},
  };

  useEffect(() => {
    const store = worldStore.getState();
    const existing = store.entities[requirement.entityId];
    if (!existing) {
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
    } else {
      const despensa = store.containers['despensa'];
      if (despensa && !despensa.entityIds.includes(requirement.entityId)) {
        store.dispatch({
          type: 'MOVE_ENTITY',
          payload: { entityId: requirement.entityId, targetContainerId: 'despensa' },
        });
      }
    }
  }, [requirement.entityId, catalogIng?.name, catalogIng?.icon, catalogTool?.name, catalogTool?.icon, catalogTool, requirement.name]);

  return (
    <li className="requirement-view">
      <EntityView entity={entity} containerId="despensa" readOnly={false} />
      <span className="requirement-view__amount">
        {requirement.amount} {requirement.unit}
      </span>
    </li>
  );
};
