/**
 * FILE: recipe.ts
 *
 * PURPOSE:
 * Evaluates recipe completion and combines prepared ingredients into dishes.
 *
 * RESPONSIBILITY:
 * - Compares container contents against target recipe requirements.
 * - Computes percentage progress.
 * - Assembles completed dish entity when all requirements are satisfied.
 */

import { worldStore } from '../store/worldStore';
import type { Entity, WorldState } from '../types/world';

export interface RecipeRequirement {
  ingredientId: string;
  name: string;
  requiredCutState?: 'diced' | 'sliced';
  requiredCookState?: 'fried' | 'cooking';
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  requirements: RecipeRequirement[];
}

export const recipes: Record<string, Recipe> = {
  concebolla: {
    id: 'concebolla',
    name: 'Spanish Tortilla (Con Cebolla)',
    description: 'Classic Spanish tortilla with fried diced potatoes, onions, and eggs.',
    requirements: [
      { ingredientId: 'potato', name: 'Diced Fried Potato', requiredCutState: 'diced', requiredCookState: 'fried' },
      { ingredientId: 'egg', name: 'Fried Egg', requiredCookState: 'fried' },
      { ingredientId: 'onion', name: 'Diced Fried Onion', requiredCutState: 'diced', requiredCookState: 'fried' },
    ],
  },
  sincebolla: {
    id: 'sincebolla',
    name: 'Spanish Tortilla (Sin Cebolla)',
    description: 'Purist Spanish tortilla with fried diced potatoes and eggs only.',
    requirements: [
      { ingredientId: 'potato', name: 'Diced Fried Potato', requiredCutState: 'diced', requiredCookState: 'fried' },
      { ingredientId: 'egg', name: 'Fried Egg', requiredCookState: 'fried' },
    ],
  },
};

export interface RecipeProgress {
  recipeId: string;
  percentage: number;
  fulfilledCount: number;
  totalCount: number;
  isComplete: boolean;
  missingRequirements: string[];
}

export function evaluateRecipeProgress(
  containerId: string,
  recipeId: string = 'concebolla'
): RecipeProgress {
  const recipe = recipes[recipeId];
  if (!recipe) {
    return { recipeId, percentage: 0, fulfilledCount: 0, totalCount: 0, isComplete: false, missingRequirements: [] };
  }

  const state: WorldState = worldStore.getState();
  const container = state.containers[containerId];
  if (!container) {
    return { recipeId, percentage: 0, fulfilledCount: 0, totalCount: recipe.requirements.length, isComplete: false, missingRequirements: recipe.requirements.map(r => r.name) };
  }

  const containerEntities: Entity[] = container.entityIds
    .map((id) => state.entities[id])
    .filter((e): e is Entity => Boolean(e));

  let fulfilledCount = 0;
  const missingRequirements: string[] = [];

  recipe.requirements.forEach((req) => {
    const match = containerEntities.some((entity) => {
      const isBaseMatch = entity.id.startsWith(req.ingredientId);
      if (!isBaseMatch) return false;

      if (req.requiredCutState && entity.state?.cutState !== req.requiredCutState) {
        return false;
      }
      if (req.requiredCookState && entity.state?.cookState !== req.requiredCookState) {
        return false;
      }
      return true;
    });

    if (match) {
      fulfilledCount++;
    } else {
      missingRequirements.push(req.name);
    }
  });

  const totalCount = recipe.requirements.length;
  const percentage = Math.round((fulfilledCount / totalCount) * 100);
  const isComplete = fulfilledCount === totalCount;

  return {
    recipeId,
    percentage,
    fulfilledCount,
    totalCount,
    isComplete,
    missingRequirements,
  };
}

/**
 * Assembles loose ingredients in a container into a finished Dish entity if 100% complete.
 */
export function assembleDish(containerId: string, recipeId: string = 'concebolla'): boolean {
  const progress = evaluateRecipeProgress(containerId, recipeId);
  if (!progress.isComplete) {
    return false;
  }

  const state: WorldState = worldStore.getState();
  const recipe = recipes[recipeId];
  const container = state.containers[containerId];
  if (!container || !recipe) return false;

  const dishId = `tortilla-dish-${Date.now()}`;
  const dishEntity: Entity = {
    id: dishId,
    name: recipe.name,
    type: 'ingredient',
    state: {
      icon: '🍳🫓',
      isCompletedDish: true,
      cookState: 'fried',
    },
  };

  // Remove individual ingredients
  container.entityIds.forEach((id) => {
    state.dispatch({ type: 'REMOVE_ENTITY', payload: { entityId: id } });
  });

  // Add completed dish to container
  state.dispatch({
    type: 'ADD_ENTITY',
    payload: {
      entity: dishEntity,
      containerId,
    },
  });

  return true;
}
