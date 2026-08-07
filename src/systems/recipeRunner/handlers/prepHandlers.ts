/**
 * FILE: src/systems/recipeRunner/handlers/prepHandlers.ts
 *
 * PURPOSE:
 * Step handlers for ingredient preparation steps ('cut', 'prepare', 'peel', 'wash', 'rinse', 'drain').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, equipTool, unequipTool, speakTortilla } from '../../mascotActions';
import { resolveContainerId } from '../../../engine/containerRules';
import { getActionRecommendation } from '../../actionRecommendations';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type PrepStep = Extract<
  RecipeStep,
  { action: 'cut' | 'prepare' | 'peel' | 'wash' | 'rinse' | 'drain' | 'clean' | 'separate' }
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

  const prepStyle = (() => {
    if ('preparation' in step && step.preparation) return step.preparation;
    if ('style' in step && step.style) return step.style;
    if (step.action === 'peel') return 'peeled';
    if (step.action === 'wash') return 'washed';
    return 'prepared';
  })();

  // Resolve tool for step (custom step tool or auto-deduced)
  const stepTool = ('tool' in step && typeof step.tool === 'string' ? step.tool : undefined) ||
    ('toolId' in step && typeof step.toolId === 'string' ? step.toolId : undefined) ||
    (step.action === 'peel' || prepStyle === 'peeled'
      ? 'peeler'
      : prepStyle === 'beaten'
      ? 'whisk'
      : step.action === 'cut' || prepStyle === 'sliced' || prepStyle === 'diced'
      ? 'knife'
      : undefined);

  const defaultContainerForPrep =
    prepStyle === 'beaten' || prepStyle === 'mixed'
      ? 'bowl'
      : ctx.defaultTargetId;

  const targetContainerId = resolveContainerId(
    step.containerId || workstationDefaultContainerId || defaultContainerForPrep
  );

  // Ensure bound entity is in workspace
  entityId = await ctx.ensureEntityInWorkspace(entityId, targetContainerId);

  // 1. Move mascot to workstation and equip tool if present
  moveTortillaTo(targetContainerId, ctx.mascotId);
  if (stepTool) {
    equipTool(stepTool, ctx.mascotId);
  }

  // 2. Speak recommendation advice for step
  const recommendation =
    ('instruction' in step && typeof step.instruction === 'string' && step.instruction) ||
    ('recommendation' in step && typeof step.recommendation === 'string' && step.recommendation) ||
    getActionRecommendation({
      action: step.action,
      style: prepStyle,
      toolId: stepTool,
      ingredientName: rawKey,
    });
  speakTortilla(recommendation, 2500, ctx.mascotId);

  await ctx.wait();

  if (step.action === 'separate' || prepStyle === 'separated') {
    worldStore.getState().dispatch({
      type: 'SEPARATE_EGG',
      payload: {
        entityId,
        containerId: targetContainerId,
      },
    });

    const state = worldStore.getState();
    const container = state.containers[targetContainerId];
    if (container) {
      const yolkEntity = container.entityIds
        .map((id) => state.entities[id])
        .find((e) => e?.ingredientId === 'yolk');
      const eggWhiteEntity = container.entityIds
        .map((id) => state.entities[id])
        .find((e) => e?.ingredientId === 'egg_white');

      if (yolkEntity) {
        ctx.updateBindingIfCopied(entityId, yolkEntity.id, 'yolk');
        ctx.updateBindingIfCopied(entityId, yolkEntity.id, 'yema');
      }
      if (eggWhiteEntity) {
        ctx.updateBindingIfCopied(entityId, eggWhiteEntity.id, 'egg_white');
        ctx.updateBindingIfCopied(entityId, eggWhiteEntity.id, 'clara');
      }
    }
  } else {
    worldStore.getState().dispatch({
      type: 'PREPARE_INGREDIENT',
      payload: {
        entityId,
        preparation: prepStyle,
      },
    });
  }

  await ctx.wait();

  // Unequip tool when step completes
  if (stepTool) {
    unequipTool(ctx.mascotId);
  }
}