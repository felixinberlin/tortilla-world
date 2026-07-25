/**
 * FILE: src/systems/recipeRunner/handlers/cookHandlers.ts
 *
 * PURPOSE:
 * Step handlers for cooking and thermal steps ('cook', 'flip').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, flipTortilla } from '../../Mascot/mascotActions';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type CookStep = Extract<RecipeStep, { action: 'cook' }>;
type FlipStep = Extract<RecipeStep, { action: 'flip' }>;

export async function handleCookStep(
  ctx: RecipeRunnerContext,
  step: CookStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const rawKey = step.target || step.ingredient;
  const entityId = ctx.getBoundEntityId(rawKey);

  if (!entityId) {
    throw new Error(`[RecipeRunner] No entity bound for cook step target: "${rawKey}"`);
  }

  ctx.validateEntity(entityId, 'cook');

  const cookingMethod = step.method || 'cooked';
  const containerId = step.containerId || step.cooking_area || workstationDefaultContainerId  || '';

  if (step.instruction) {
    worldStore.getState().dispatch({
      type: 'UPDATE_ENTITY_STATE',
      payload: {
        entityId: step.mascotId || ctx.mascotId,
        changes: { speechMessage: step.instruction },
      },
    });
  }

  // Ensure bound entity is moved to cooking container if not already there
  const state = worldStore.getState();
  const currentContainer = Object.values(state.containers).find((c) =>
    c.entityIds.includes(entityId!)
  );

  if (!currentContainer || currentContainer.id !== containerId) {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId,
        targetContainerId: containerId,
      },
    });
  }

  moveTortillaTo(containerId, ctx.mascotId);
  await ctx.wait();

  worldStore.getState().dispatch({
    type: 'COOK_INGREDIENT',
    payload: {
      entityId,
      cooking: cookingMethod,
    },
  });

  await ctx.wait();
}

export async function handleFlipStep(
  ctx: RecipeRunnerContext,
  step: FlipStep
): Promise<void> {
  const rawKey = step.target;
  const targetContainer = rawKey === 'mixture' ? 'pan' : rawKey || 'pan';
  const instructionText = step.instruction;

  if (instructionText) {
    worldStore.getState().dispatch({
      type: 'UPDATE_ENTITY_STATE',
      payload: {
        entityId: step.mascotId || ctx.mascotId,
        changes: { speechMessage: instructionText },
      },
    });
  }

  moveTortillaTo(targetContainer, ctx.mascotId);
  await ctx.wait();

  flipTortilla(step.mascotId || ctx.mascotId);

  if (rawKey) {
    const entityId = ctx.getBoundEntityId(rawKey);
    if (entityId) {
      ctx.validateEntity(entityId, 'flip');
      worldStore.getState().dispatch({
        type: 'UPDATE_ENTITY_STATE',
        payload: {
          entityId,
          changes: { isFlipped: true, status: 'flipped-tortilla' },
        },
      });
    }
  } else {
    // If no target specified, flip all active bound entities in target container
    const state = worldStore.getState();
    const container = state.containers[targetContainer];
    if (container) {
      container.entityIds.forEach((entityId) => {
        worldStore.getState().dispatch({
          type: 'UPDATE_ENTITY_STATE',
          payload: {
            entityId,
            changes: { isFlipped: true, status: 'flipped-tortilla' },
          },
        });
      });
    }
  }

  await ctx.wait();
}
