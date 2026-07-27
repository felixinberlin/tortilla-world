/**
 * FILE: RecipeSchema.ts
 *
 * PURPOSE:
 * Defines strict TypeScript interface for runtime JSON recipe data structures.
 *
 * RESPONSIBILITY:
 * - Provides RecipeJSON interface matching decoupled JSON recipe assets.
 * - Supports fields for id, name, description, difficulty, cooklang, tags, hints, steps, and requirements/ingredients.
 */

import type { RecipeStep } from './RecipeStep';
import type { RequirementDictItem, Requirement } from './Requirement';

export interface RecipeJSON {
  id: string;
  name: string;
  description?: string;
  difficulty?: 'easy' | 'medium' | 'hard' | string;
  cooklang?: string;
  tags?: string[];
  hints?: string[];
  requirements?: Record<string, RequirementDictItem> | Requirement[];
  ingredients?: Record<string, RequirementDictItem> | Requirement[];
  steps: RecipeStep[];
}
