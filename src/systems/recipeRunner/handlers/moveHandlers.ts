/**
 * FILE: src/systems/recipeRunner/handlers/moveHandlers.ts
 *
 * PURPOSE:
 * Step handlers for item relocation steps ('move', 'grab', 'drop').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, grabIngredient, dropIngredient } from '../../mascotActions';
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


  const entityId = ctx.getBoundEntityId(rawKey);

  if (!entityId) {
    return;
  }

  ctx.validateEntity(entityId, 'move');

  const state = worldStore.getState();
  const targetContainer = state.containers[target];


  if (targetContainer && targetContainer.entityIds.includes(entityId)) {
    return; // Skip move if entity is already in target container
  }

  // 1. Move mascot gaze to source container
  moveTortillaTo(source, ctx.mascotId);
  await ctx.wait();

  // 2. Grab ingredient from source container
  grabIngredient(entityId, source, ctx.mascotId);
  await ctx.wait();

  // 3. Move mascot gaze to target container
  moveTortillaTo(target, ctx.mascotId);
  await ctx.wait();

  // 4. Drop ingredient into target container
  dropIngredient(target, undefined, ctx.mascotId);
  await ctx.wait();

  // Check if drop created a copy entity (from immutable storage)
  const newState = worldStore.getState();
  const newTargetContainer = newState.containers[target];
  if (newTargetContainer && !newTargetContainer.entityIds.includes(entityId)) {
    const copiedId = newTargetContainer.entityIds[newTargetContainer.entityIds.length - 1];
    if (copiedId) {
      ctx.updateBindingIfCopied(entityId, copiedId, rawKey);
    }
  }
}

export async function handleGrabStep(
  ctx: RecipeRunnerContext,
  step: GrabStep
): Promise<void> {
  const source = step.source || ctx.defaultSourceId;
  const entityId = ctx.getBoundEntityId(step.ingredient) || step.ingredient;

  if (entityId) {
    ctx.validateEntity(entityId, 'grab');
  }

  moveTortillaTo(source, ctx.mascotId);
  await ctx.wait();

  if (entityId) {
    grabIngredient(entityId, source, ctx.mascotId);
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
