/**
 * FILE: Ingredient.ts
 *
 * PURPOSE:
 * Defines ingredient data structures.
 *
 * RESPONSIBILITY:
 * - Represents ingredient definitions.
 */

import type { IngredientCapabilities } from './IngredientCapability';

export interface Ingredient {
  id: string;
  name: string;
  icon: string;
  capabilities?: IngredientCapabilities;
}
