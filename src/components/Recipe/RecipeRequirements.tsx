/**
 * FILE: RecipeRequirements.tsx
 *
 * PURPOSE:
 * Displays all requirements for a recipe.
 *
 * RESPONSIBILITY:
 * - Renders list of required entities.
 */

import React from 'react';
import type { Requirement } from '../../types/Requirement';
import { RequirementView } from './RequirementView';

interface RecipeRequirementsProps {
  requirements: Requirement[];
}

export const RecipeRequirements: React.FC<RecipeRequirementsProps> = ({ requirements }) => {
  return (
    <ul className="recipe-requirements">
      {requirements.map((req, idx) => (
        <RequirementView key={req.id || `${req.entityId}-${idx}`} requirement={req} />
      ))}
    </ul>
  );
};
