/**
 * FILE: src/systems/recipeRunner/handlers/moveHandlers.ts
 *
 * PURPOSE:
 * Step handlers for item relocation steps ('move', 'grab', 'drop').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, grabIngredient, dropIngredient } from '../../mascotActions';
import { getIngredientCatalogId } from '../../../engine/containerRules';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type MoveStep = Extract<RecipeStep, { action: 'move' }>;
type GrabStep = Extract<RecipeStep, { action: 'grab' }>;
type DropStep = Extract<RecipeStep, { action: 'drop' }>;

export async function handleMoveStep(
  ctx: RecipeRunnerContext,
  step: MoveStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const source = step.source || ctx.defaultSourceId;
  const target = step.target || workstationDefaultContainerId || ctx.defaultTargetId;
  const rawKey = step.ingredient || step.target;
  const ingredientId = ctx.resolveIngredientId(rawKey) || rawKey;

  // Check if target container already contains this ingredient
  const state = worldStore.getState();
  const targetContainer = state.containers[target];
  if (targetContainer && ingredientId) {
    const currentEntities = targetContainer.entityIds
      .map((id) => state.entities[id])
      .filter(Boolean);
    const alreadyPresent = currentEntities.some(
      (e) => e.type === 'ingredient' && getIngredientCatalogId(e) === ingredientId
    );
    if (alreadyPresent) {
      return; // Skip move if ingredient is already present
    }
  }

  // 1. Move mascot gaze to source container
  moveTortillaTo(source, ctx.mascotId);
  await ctx.wait();

  // 2. Grab ingredient from source container
  if (ingredientId) {
    grabIngredient(ingredientId, source, ctx.mascotId);
    await ctx.wait();
  }

  // 3. Move mascot gaze to target container
  moveTortillaTo(target, ctx.mascotId);
  await ctx.wait();

  // 4. Drop ingredient into target container
  dropIngredient(target, undefined, ctx.mascotId);
  await ctx.wait();
}

export async function handleGrabStep(
  ctx: RecipeRunnerContext,
  step: GrabStep
): Promise<void> {
  const source = step.source || ctx.defaultSourceId;
  const ingredientId = ctx.resolveIngredientId(step.ingredient) || step.ingredient;
  moveTortillaTo(source, ctx.mascotId);
  await ctx.wait();

  if (ingredientId) {
    grabIngredient(ingredientId, source, ctx.mascotId);
    await ctx.wait();
  }
}

export async function handleDropStep(
  ctx: RecipeRunnerContext,
  step: DropStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const target = step.target || workstationDefaultContainerId || ctx.defaultTargetId;
  moveTortillaTo(target, ctx.mascotId);
  await ctx.wait();

  dropIngredient(target, step.positionIndex, ctx.mascotId);
  await ctx.wait();
}
