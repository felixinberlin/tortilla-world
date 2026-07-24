/**
 * FILE: src/systems/recipeRunner/types.ts
 *
 * PURPOSE:
 * Type definitions and execution context contract for RecipeRunner and its step handlers.
 */

import type { Recipe } from '../../types/Recipe';

export interface RecipeRunnerOptions {
  mascotId?: string;
  defaultSourceId?: string;
  defaultTargetId?: string;
  delayMs?: number;
}

export interface RecipeRunnerContext {
  mascotId: string;
  defaultSourceId: string;
  defaultTargetId: string;
  delayMs: number;
  currentRecipe?: Recipe;

  wait(ms?: number): Promise<void>;
  resolveIngredientId(targetOrKey?: string): string | undefined;
  ensureIngredientInWorkspace(
    ingredientCatalogId: string,
    targetContainerId?: string
  ): Promise<string | undefined>;
}
