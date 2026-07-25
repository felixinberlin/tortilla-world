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

import React from 'react';
import type { Requirement } from '../../types/Requirement';
import type { Entity } from '../../types/world';
import { ingredients } from '../../data/catalog/ingredients';
import { catalogTools as tools } from '../../data/catalog/tools';
import { EntityView } from '../World/EntityView';

interface RequirementViewProps {
  requirement: Requirement;
}

export const RequirementView: React.FC<RequirementViewProps> = ({ requirement }) => {
  const catalogIng = ingredients.find((i) => i.id === requirement.entityId);
  const catalogTool = tools.find((t: { id: string }) => t.id === requirement.entityId);

  const syntheticEntity: Entity = {
    id: `req-${requirement.entityId}`,
    name: requirement.name || catalogIng?.name || catalogTool?.name || requirement.entityId,
    type: catalogTool ? 'tool' : 'ingredient',
    icon: catalogIng?.icon || catalogTool?.icon,
    ingredientId: requirement.entityId,
  };

  return (
    <li className="requirement-view">
      <EntityView entity={syntheticEntity} readOnly />
      <span className="requirement-view__amount">
        {requirement.amount} {requirement.unit}
      </span>
    </li>
  );
};
