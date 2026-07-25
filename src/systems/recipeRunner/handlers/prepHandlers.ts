/**
 * FILE: src/systems/recipeRunner/handlers/prepHandlers.ts
 *
 * PURPOSE:
 * Step handlers for ingredient preparation steps ('cut', 'prepare', 'peel', 'wash', 'rinse', 'drain').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo } from '../../Mascot/mascotActions';
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
  let entityId = ctx.getBoundEntityId(rawKey);

  if (!entityId) {
    return;
  }

  ctx.validateEntity(entityId, step.action);

  const targetContainerId = step.containerId || workstationDefaultContainerId || ctx.defaultTargetId;

  // Ensure bound entity is in workspace
  entityId = await ctx.ensureEntityInWorkspace(entityId, targetContainerId);

  moveTortillaTo(targetContainerId, ctx.mascotId);
  await ctx.wait();

  const prepStyle = (() => {
    if ('preparation' in step && step.preparation) return step.preparation;
    if ('style' in step && step.style) return step.style;
    if (step.action === 'peel') return 'peeled';
    if (step.action === 'wash') return 'washed';
    return 'prepared';
  })();

  worldStore.getState().dispatch({
    type: 'PREPARE_INGREDIENT',
    payload: {
      entityId,
      preparation: prepStyle,
    },
  });

  await ctx.wait();
}