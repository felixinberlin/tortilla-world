/**
 * FILE: src/systems/recipeRunner/handlers/prepHandlers.ts
 *
 * PURPOSE:
 * Step handlers for ingredient preparation steps ('cut', 'prepare', 'peel', 'wash', 'rinse', 'drain').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo } from '../../mascotActions';
import { getIngredientCatalogId } from '../../../engine/containerRules';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type PrepStep = Extract<
  RecipeStep,
  { action: 'cut' | 'prepare' | 'peel' | 'wash' | 'rinse' | 'drain' }
>;

export async function handlePrepStep(
  ctx: RecipeRunnerContext,
  step: PrepStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const rawKey = step.target || step.ingredient;
  const ingredientId = ctx.resolveIngredientId(rawKey);
  // 'preparation' and 'style' only exist on the prepare/cut/peel/wash variant,
  // not on rinse/drain — narrow by checking action before accessing them.
  const prepStyle = (() => {
    if ('preparation' in step && step.preparation) return step.preparation;
    if ('style' in step && step.style) return step.style;
    if (step.action === 'peel') return 'peeled';
    if (step.action === 'wash') return 'washed';
    return 'prepared';
  })();
  const targetContainerId = step.containerId || workstationDefaultContainerId || ctx.defaultTargetId;

  if (ingredientId && ingredientId !== 'mixture') {
    await ctx.ensureIngredientInWorkspace(ingredientId, targetContainerId);
  }

  moveTortillaTo(targetContainerId, ctx.mascotId);
  await ctx.wait();

  const state = worldStore.getState();
  let targetEntityId: string | undefined;

  if (ingredientId) {
    // Search workstation containers for the matching ingredient
    for (const cId of [targetContainerId, 'board', 'bowl', 'pan', 'plate']) {
      const container = state.containers[cId];
      if (container) {
        targetEntityId = container.entityIds.find((id) => {
          const e = state.entities[id];
          return e && getIngredientCatalogId(e) === ingredientId;
        });
        if (targetEntityId) break;
      }
    }
  }

  if (!targetEntityId) {
    const mascot = state.entities[ctx.mascotId];
    targetEntityId = mascot?.state?.holdingEntityId as string | undefined;
  }

  if (targetEntityId) {
    worldStore.getState().dispatch({
      type: 'PREPARE_INGREDIENT',
      payload: {
        entityId: targetEntityId,
        preparation: prepStyle,
      },
    });
  }
  await ctx.wait();
}