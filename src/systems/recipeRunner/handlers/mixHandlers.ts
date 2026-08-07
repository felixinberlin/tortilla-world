/**
 * FILE: src/systems/recipeRunner/handlers/mixHandlers.ts
 *
 * PURPOSE:
 * Step handlers for combination steps ('mix', 'beat', 'combine').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, flipTortilla, equipTool, unequipTool, speakTortilla } from '../../mascotActions';
import { resolveContainerId } from '../../../engine/containerRules';
import { getActionRecommendation } from '../../actionRecommendations';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type MixStep = Extract<RecipeStep, { action: 'mix' | 'beat' | 'combine' }>;

export async function handleMixStep(
  ctx: RecipeRunnerContext,
  step: MixStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const targetContainerId = resolveContainerId(
    step.targetContainerId || workstationDefaultContainerId || 'bowl'
  );
  const inputKeys = step.inputs || step.ingredients || [];
  const inputEntityIds: string[] = [];

  // 1. Resolve each input entity ID from RecipeContext and ensure it is moved to target container
  for (const rawInput of inputKeys) {
    const inputEntityId = ctx.getBoundEntityId(rawInput);
    if (!inputEntityId) {
      throw new Error(`[RecipeRunner] Cannot mix: No bound entity found for input "${rawInput}"`);
    }

    const realEntityId = await ctx.ensureEntityInWorkspace(inputEntityId, targetContainerId);
    inputEntityIds.push(realEntityId);
  }

  // Format descriptive speech message for mascot speech bubble and Zustand store state
  const formattedInputs = inputKeys.map((key) => {
    const boundId = ctx.getBoundEntityId(key);
    const entity = boundId ? worldStore.getState().entities[boundId] : undefined;

    const parts: string[] = [];
    if (entity?.state) {
      const cooking = entity.state.cooking as string | undefined;
      if (cooking && cooking !== 'raw') {
        if (cooking === 'fry' || cooking === 'fried' || cooking === 'cooked') {
          parts.push('cooked');
        } else {
          parts.push(cooking);
        }
      }
      const prep = entity.state.preparation as string | undefined;
      if (prep && prep !== 'whole' && prep !== 'raw') {
        parts.push(prep);
      }
    }

    if (parts.length === 0) {
      if (key === 'potatoes') {
        parts.push('cooked', 'sliced');
      } else if (key === 'eggs') {
        parts.push('beaten');
      } else if (key === 'onions') {
        parts.push('cooked', 'diced');
      }
    }

    parts.push(key);
    return parts.join(' ');
  });

  const containerName =
    targetContainerId === 'bowl' || targetContainerId === 'preparation_bowl'
      ? 'preparation bowl'
      : targetContainerId.replace('_', ' ');
  const mixMessage = `Mix ${formattedInputs.join(', ')} in the ${containerName} -> ${step.output || 'mixture'}`;

  const mixTool = ('tool' in step && typeof step.tool === 'string' ? step.tool : undefined) || 'whisk';

  const rec = step.instruction || step.recommendation || getActionRecommendation({
    action: step.action,
    style: 'beaten',
    toolId: mixTool,
  });

  speakTortilla(`${rec} (${mixMessage})`, 3000, ctx.mascotId);

  moveTortillaTo(targetContainerId, ctx.mascotId);
  equipTool(mixTool, ctx.mascotId);
  await ctx.wait();
  flipTortilla(ctx.mascotId);
  await ctx.wait();

  // Wait for a moment while mixing before creating the mixture
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

  unequipTool(ctx.mascotId);
}
