/**
 * FILE: src/systems/recipeRunner/handlers/mixHandlers.ts
 *
 * PURPOSE:
 * Step handlers for combination steps ('mix', 'beat', 'combine').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, flipTortilla } from '../../Mascot/mascotActions';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type MixStep = Extract<RecipeStep, { action: 'mix' | 'beat' | 'combine' }>;

export async function handleMixStep(
  ctx: RecipeRunnerContext,
  step: MixStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const targetContainerId = step.targetContainerId || workstationDefaultContainerId || 'bowl';
  const inputKeys = step.inputs || step.ingredients || [];
  const inputEntityIds: string[] = [];

  // 1. Resolve each input entity ID from RecipeContext and ensure it is moved to target container
  for (const rawInput of inputKeys) {
    const inputEntityId = ctx.getBoundEntityId(rawInput);
    if (!inputEntityId) {
      throw new Error(`[RecipeRunner] Cannot mix: No bound entity found for input "${rawInput}"`);
    }

    ctx.validateEntity(inputEntityId, 'mix');

    // Ensure input entity is in target container (e.g. bowl)
    const state = worldStore.getState();
    const currentContainer = Object.values(state.containers).find((c) =>
      c.entityIds.includes(inputEntityId)
    );

    if (currentContainer && currentContainer.id !== targetContainerId) {
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: inputEntityId,
          targetContainerId,
        },
      });
    }

    inputEntityIds.push(inputEntityId);
  }

  moveTortillaTo(targetContainerId, ctx.mascotId);
  await ctx.wait();
  flipTortilla(ctx.mascotId);
  await ctx.wait();

  // 2. Create real mixture entity in target container
  const recipeId = ctx.recipeContext.recipeId || 'recipe';
  const mixtureId = `mixture_${recipeId}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const outputName = step.output || 'Mixture';

  worldStore.getState().dispatch({
    type: 'ADD_ENTITY',
    payload: {
      entity: {
        id: mixtureId,
        name: outputName,
        type: 'ingredient',
        state: {
          preparation: 'mixed',
          cooking: 'raw',
          status: 'mixed',
          components: inputEntityIds,
        },
      },
      containerId: targetContainerId,
    },
  });

  // 3. Use inputs
  for (const inputId of inputEntityIds) {
    worldStore.getState().dispatch({
      type: 'USE_INGREDIENT',
      payload: {
        entityId: inputId,
        usedIn: mixtureId,
      },
    });
  }

  // 4. Bind mixture entity in RecipeContext
  ctx.recipeContext.bindings['mixture'] = mixtureId;
  if (step.output) {
    ctx.recipeContext.bindings[step.output] = mixtureId;
  }
}
