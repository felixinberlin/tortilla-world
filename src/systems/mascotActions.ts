/**
 * FILE: mascotActions.ts
 *
 * PURPOSE:
 * Action dispatcher helpers for mascot (Tortilla) commands.
 *
 * RESPONSIBILITY:
 * - Provides reusable, generic action dispatchers for AI agents or UI triggers.
 * - Handles tortilla movement, grabbing ingredients from containers, dropping ingredients into containers, and flipping.
 */

import { worldStore } from '../store/worldStore';
import { recipes } from '../data/catalog/recipes';
import { RecipeRunner } from './recipeRunner';

/**
 * Triggers Tortilla flip animation and records action in store.
 */
export function flipTortilla(mascotId: string = 'chef'): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_FLIP',
    payload: { mascotId },
  });
}

/**
 * Moves Tortilla gaze/focus to a specific container in the world.
 */
export function moveTortillaTo(targetContainerId: string, mascotId: string = 'chef'): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_MOVE',
    payload: { mascotId, targetContainerId },
  });
}

/**
 * Commands Tortilla to grab/pick up an ingredient from a container.
 */
export function grabIngredient(
  entityId: string,
  sourceContainerId?: string,
  mascotId: string = 'chef'
): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_GRAB',
    payload: { mascotId, entityId, sourceContainerId },
  });
}

/**
 * Commands Tortilla to drop the currently held ingredient into a target container.
 */
export function dropIngredient(
  targetContainerId: string,
  positionIndex?: number,
  mascotId: string = 'chef'
): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_DROP',
    payload: { mascotId, targetContainerId, positionIndex },
  });
}

/**
 * Commands Tortilla to execute a sequence:
 * 1. Move focus to despensa
 * 2. Grab potato from despensa
 * 3. Move focus to board (tabla)
 * 4. Drop potato into board
 * 5. Flip Tortilla mascot
 */
export async function runTortillaPotatoScript(
  mascotId: string = 'chef',
  delayMs: number = 600
): Promise<void> {
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // 1. Look at despensa
  moveTortillaTo('despensa', mascotId);
  await wait(delayMs);

  // 2. Grab potato from despensa
  grabIngredient('potato', 'despensa', mascotId);
  await wait(delayMs);

  // 3. Look at board (tabla)
  moveTortillaTo('board', mascotId);
  await wait(delayMs);

  // 4. Drop potato in board
  dropIngredient('board', undefined, mascotId);
  await wait(delayMs);

  // 5. Flip Tortilla
  flipTortilla(mascotId);
  await wait(900);

  // 6. Return home gracefully
  moveTortillaTo('', mascotId);
}

/**
 * Commands Tortilla to follow a recipe by running its step-based state machine.
 */
export async function runFollowRecipeScript(
  recipeId: string,
  mascotId: string = 'chef',
  targetContainerId: string = 'board',
  delayMs: number = 600
): Promise<void> {
  const activeRecipe = recipes.find((r) => r.id === recipeId);
  if (!activeRecipe) return;

  const runner = new RecipeRunner({
    mascotId,
    defaultTargetId: targetContainerId,
    delayMs,
  });

  await runner.runRecipe(activeRecipe);
}
