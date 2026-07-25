/**
 * FILE: src/systems/recipeRunner/handlers/cookHandlers.ts
 *
 * PURPOSE:
 * Step handlers for cooking and thermal steps ('cook', 'flip').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, flipTortilla } from '../../mascotActions';
import { getIngredientCatalogId } from '../../../engine/containerRules';
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
  const ingredientId = ctx.resolveIngredientId(rawKey);
  const cookingMethod = step.method || 'cooked';
  const containerId = step.containerId || workstationDefaultContainerId || 'pan';

  if (step.instruction) {
    worldStore.getState().dispatch({
      type: 'UPDATE_ENTITY_STATE',
      payload: {
        entityId: step.mascotId || ctx.mascotId,
        changes: { speechMessage: step.instruction },
      },
    });
  }

  if (ingredientId && ingredientId !== 'mixture') {
    await ctx.ensureIngredientInWorkspace(ingredientId, containerId);
  }

  moveTortillaTo(containerId, ctx.mascotId);
  await ctx.wait();

  const state = worldStore.getState();
  const container = state.containers[containerId] || state.containers.pan;

  if (container) {
    if (rawKey === 'mixture' || ingredientId === 'mixture') {
      // Transfer items from prep/cutting containers to cooking container
      for (const prepCId of ['bowl', 'board']) {
        const prepContainer = worldStore.getState().containers[prepCId];
        if (prepContainer && prepContainer.entityIds.length > 0) {
          [...prepContainer.entityIds].forEach((id) => {
            worldStore.getState().dispatch({
              type: 'MOVE_ENTITY',
              payload: {
                entityId: id,
                targetContainerId: containerId,
              },
            });
          });
        }
      }

      // Cook all ingredients in target cooking container
      const currentContainerState = worldStore.getState().containers[containerId] || container;
      currentContainerState.entityIds.forEach((id) => {
        worldStore.getState().dispatch({
          type: 'COOK_INGREDIENT',
          payload: {
            entityId: id,
            cooking: cookingMethod,
          },
        });
      });
    } else if (ingredientId) {
      let targetEntityId = container.entityIds.find((id) => {
        const e = state.entities[id];
        return e && getIngredientCatalogId(e) === ingredientId;
      });

      // If ingredient is on another container (e.g. board/bowl) but target is cooking container, transfer it
      if (!targetEntityId) {
        for (const sourceCId of ['board', 'bowl', 'sink']) {
          const sourceContainer = state.containers[sourceCId];
          const foundId = sourceContainer?.entityIds.find((id) => {
            const e = state.entities[id];
            return e && getIngredientCatalogId(e) === ingredientId;
          });
          if (foundId) {
            worldStore.getState().dispatch({
              type: 'MOVE_ENTITY',
              payload: {
                entityId: foundId,
                targetContainerId: containerId,
              },
            });
            targetEntityId = foundId;
            break;
          }
        }
      }

      if (targetEntityId) {
        worldStore.getState().dispatch({
          type: 'COOK_INGREDIENT',
          payload: {
            entityId: targetEntityId,
            cooking: cookingMethod,
          },
        });
      }
    }
  }
  await ctx.wait();
}

export async function handleFlipStep(
  ctx: RecipeRunnerContext,
  step: FlipStep
): Promise<void> {
  const targetContainer = step.target === 'mixture' ? 'pan' : step.target || 'pan';
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

  // Update entities in target cooking container state to flipped
  const state = worldStore.getState();
  const panContainer = state.containers[targetContainer];
  if (panContainer) {
    panContainer.entityIds.forEach((entityId) => {
      worldStore.getState().dispatch({
        type: 'UPDATE_ENTITY_STATE',
        payload: {
          entityId,
          changes: { isFlipped: true, status: 'flipped-tortilla' },
        },
      });
    });
  }

  await ctx.wait();
}
