/**
 * FILE: src/systems/recipeRunner/types.ts
 *
 * PURPOSE:
 * Type definitions and execution context contract for RecipeRunner and its step handlers.
 */

import type { Recipe } from '../../types/Recipe';
import type { Entity } from '../../types/world';

export interface RecipeContextData {
  recipeId: string;
  /**
   * Maps key/alias/ingredient name (e.g. 'potatoes', 'egg', 'mixture') to a specific stable Entity ID.
   */
  bindings: Record<string, string>;
}

export interface RecipeRunnerOptions {
  mascotId?: string;
  defaultSourceId?: string;
  defaultTargetId?: string;
  delayMs?: number;
  useMascot?: boolean;
}

export interface RecipeRunnerContext {
  mascotId: string;
  defaultSourceId: string;
  defaultTargetId: string;
  delayMs: number;
  useMascot?: boolean;
  currentRecipe?: Recipe;
  recipeContext: RecipeContextData;

  wait(ms?: number): Promise<void>;

  /**
   * Binds initial recipe ingredients to entity IDs in the world state.
   */
  bindRecipeContext(recipe: Recipe): void;

  /**
   * Retrieves the bound Entity ID for a target or key from RecipeContext.
   */
  getBoundEntityId(targetOrKey?: string): string | undefined;

  /**
   * Validates that an entity exists and is not consumed. Throws descriptive error on failure.
   */
  validateEntity(entityId: string, stepAction?: string): Entity;

  /**
   * Ensures specified bound entity is in target workspace container or held by mascot.
   */
  ensureEntityInWorkspace(
    entityId: string,
    targetContainerId?: string
  ): Promise<string>;

  /**
   * Updates bindings if an entity ID changed (e.g. copied from immutable storage).
   */
  updateBindingIfCopied(oldEntityId: string, newEntityId: string, specificKey?: string): void;

  resolveIngredientId(targetOrKey?: string): string | undefined;
  ensureIngredientInWorkspace(
    ingredientCatalogId: string,
    targetContainerId?: string
  ): Promise<string | undefined>;
}
