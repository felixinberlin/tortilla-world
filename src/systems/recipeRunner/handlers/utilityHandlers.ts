/**
 * FILE: src/systems/recipeRunner/handlers/utilityHandlers.ts
 *
 * PURPOSE:
 * Step handlers for utility, narrative, and completion steps ('serve', 'wait', 'instruction', 'speak', 'celebrate').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, flipTortilla, clearTortillaGaze } from '../../mascotActions';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type ServeStep = Extract<RecipeStep, { action: 'serve' }>;
type WaitStep = Extract<RecipeStep, { action: 'wait' }>;
type InstructionStep = Extract<RecipeStep, { action: 'instruction' }>;
type SpeakStep = Extract<RecipeStep, { action: 'speak' }>;
type CelebrateStep = Extract<RecipeStep, { action: 'celebrate' }>;

export async function handleServeStep(
  ctx: RecipeRunnerContext,
  step: ServeStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const targetContainerId = step.containerId || workstationDefaultContainerId || 'plate';
  moveTortillaTo(targetContainerId, ctx.mascotId);
  await ctx.wait();

  // Move all cooked/prepared items from pan, bowl, or board to plate
  const state = worldStore.getState();
  for (const sourceCId of ['pan', 'bowl', 'board']) {
    const container = state.containers[sourceCId];
    if (container && container.entityIds.length > 0) {
      [...container.entityIds].forEach((entityId) => {
        worldStore.getState().dispatch({
          type: 'MOVE_ENTITY',
          payload: {
            entityId,
            targetContainerId: targetContainerId,
          },
        });
      });
    }
  }
  await ctx.wait();
}

export async function handleWaitStep(
  ctx: RecipeRunnerContext,
  step: WaitStep
): Promise<void> {
  await ctx.wait(step.durationMs);
}

export async function handleInstructionStep(
  ctx: RecipeRunnerContext,
  step: InstructionStep
): Promise<void> {
  const text = step.text || step.instruction;
  if (text) {
    worldStore.getState().dispatch({
      type: 'UPDATE_ENTITY_STATE',
      payload: {
        entityId: step.mascotId || ctx.mascotId,
        changes: { speechMessage: text },
      },
    });
  }
  await ctx.wait();
}

export async function handleSpeakStep(
  ctx: RecipeRunnerContext,
  step: SpeakStep
): Promise<void> {
  worldStore.getState().dispatch({
    type: 'UPDATE_ENTITY_STATE',
    payload: {
      entityId: step.mascotId || ctx.mascotId,
      changes: { speechMessage: step.message },
    },
  });
  await ctx.wait();
}

export async function handleCelebrateStep(
  ctx: RecipeRunnerContext,
  step: CelebrateStep
): Promise<void> {
  flipTortilla(step.mascotId || ctx.mascotId);
  await ctx.wait(900);
  clearTortillaGaze(step.mascotId || ctx.mascotId);
}