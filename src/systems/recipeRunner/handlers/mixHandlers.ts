/**
 * FILE: src/systems/recipeRunner/handlers/mixHandlers.ts
 *
 * PURPOSE:
 * Step handlers for combination steps ('mix', 'beat', 'combine').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, flipTortilla } from '../../mascotActions';
import { getIngredientCatalogId } from '../../../engine/containerRules';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type MixStep = Extract<RecipeStep, { action: 'mix' | 'beat' | 'combine' }>;

export async function handleMixStep(
  ctx: RecipeRunnerContext,
  step: MixStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const targetContainerId = step.targetContainerId || workstationDefaultContainerId || 'bowl';
  const inputs = step.inputs || (step as any).ingredients || [];

  if (inputs && inputs.length > 0) {
    for (const rawInput of inputs) {
      const ingredientId = ctx.resolveIngredientId(rawInput) || rawInput;
      if (ingredientId) {
        await ctx.ensureIngredientInWorkspace(ingredientId, targetContainerId);

        // Move entity to target container (e.g. bowl) if it's currently on board/pan
        const state = worldStore.getState();
        const entityIdInWorld = Object.values(state.containers)
          .flatMap((c) => c.entityIds)
          .find((id) => {
            const e = state.entities[id];
            return e && getIngredientCatalogId(e) === ingredientId;
          });

        if (entityIdInWorld) {
          const sourceContainer = Object.values(state.containers).find((c) =>
            c.entityIds.includes(entityIdInWorld)
          );
          if (sourceContainer && sourceContainer.id !== targetContainerId) {
            worldStore.getState().dispatch({
              type: 'MOVE_ENTITY',
              payload: {
                entityId: entityIdInWorld,
                targetContainerId,
              },
            });
          }
        }
      }
    }
  }

  moveTortillaTo(targetContainerId, ctx.mascotId);
  await ctx.wait();
  flipTortilla(ctx.mascotId);
  await ctx.wait();
}
