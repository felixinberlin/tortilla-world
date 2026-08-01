/**
 * FILE: src/systems/recipeRunner/handlers/cookHandlers.ts
 *
 * PURPOSE:
 * Step handlers for cooking and thermal steps ('cook', 'flip').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, flipTortilla } from '../../mascotActions';
import { resolveContainerId } from '../../../engine/containerRules';
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
  let entityId = ctx.getBoundEntityId(rawKey);

  if (!entityId) {
    throw new Error(`[RecipeRunner] No entity bound for cook step target: "${rawKey}"`);
  }

  entityId = ctx.validateEntity(entityId, 'cook').id;

  const cookingMethod = step.method || 'cooked';
  const rawContainerId = step.containerId || workstationDefaultContainerId || 'burner1';
  const containerId = resolveContainerId(rawContainerId);

  if (step.instruction) {
    worldStore.getState().dispatch({
      type: 'UPDATE_ENTITY_STATE',
      payload: {
        entityId: step.mascotId || ctx.mascotId,
        changes: { speechMessage: step.instruction },
      },
    });
  }

  // Ensure bound entity is brought to cooking container via mascot actions if not already there
  entityId = await ctx.ensureEntityInWorkspace(entityId, containerId);

  moveTortillaTo(containerId, ctx.mascotId);
  await ctx.wait();

  // Turn ON fire if currently off
  const containerBefore = worldStore.getState().containers[containerId];
  if (containerBefore && !containerBefore.isOn) {
    worldStore.getState().dispatch({
      type: 'TOGGLE_BURNER',
      payload: { containerId },
    });
  }

  worldStore.getState().dispatch({
    type: 'COOK_INGREDIENT',
    payload: {
      entityId,
      cooking: cookingMethod,
    },
  });

  const cookName = step.as || step.name || step.output;
  if (cookName) {
    worldStore.getState().dispatch({
      type: 'UPDATE_ENTITY_STATE',
      payload: {
        entityId,
        changes: { name: cookName },
      },
    });
  }

  // Consume cooking medium helper ingredients currently in the cooking container (e.g. oil)
    /**
   * IMPORTANT: Distinguish between oil as the primary cooking target vs oil as a cooking medium.
   *
   * Scenario 1: Oil is the target (method='heat')
   *   Step: { action: 'cook', target: 'oil', method: 'heat' }
   *   Expected: Oil is heated, NOT consumed
   *   Reason: Oil is the subject being cooked, not a helper ingredient
   *
   * Scenario 2: Oil is a cooking medium
   *   Step: { action: 'cook', target: 'potatoes', method: 'fry' }
   *   Expected: Oil in the container IS consumed (used for frying)
   *   Reason: Oil is helping to cook the potatoes
   * 
   *   Scenario 3: Oil as dressing
   *   Step: { action: 'serve', target: 'mixture', method: 'dress' }
   *   Expected: fresh Oil in the container where the finished tortilla is
   *   Reason: Oil is dressiing for the tortilla
   *
   * Without this check, oil gets consumed even when it's the cooking target,
   * preventing oil reuse and causing "Heat Olive Oil" name change in Required Materials.
   */
  const cookingContainer = worldStore.getState().containers[containerId];

  // Only consume helper ingredients (like oil) if they are NOT the target of THIS cooking step
  const isOilTheTarget =
    rawKey === 'oil' ||
    rawKey?.toLowerCase().includes('oil') ||
    rawKey?.toLowerCase().includes('aceite');

  if (!isOilTheTarget && cookingContainer) {
    // Consume cooking medium helper ingredients currently in the cooking container (e.g. oil)
    const otherEntityIds = cookingContainer.entityIds.filter((id) => id !== entityId);
    for (const otherId of otherEntityIds) {
      const otherEntity = worldStore.getState().entities[otherId];
      const isOil =
        otherEntity?.ingredientId === 'oil' ||
        otherEntity?.id?.includes('oil') ||
        otherEntity?.name?.toLowerCase().includes('oil') ||
        otherEntity?.name?.toLowerCase().includes('aceite');

      if (otherEntity && otherEntity.type === 'ingredient' && !otherEntity.state?.consumed && isOil) {
        worldStore.getState().dispatch({
          type: 'USE_INGREDIENT',
          payload: {
            entityId: otherId,
            usedIn: entityId,
          },
        });
      }
    }
  }

  await ctx.wait();

  // Turn OFF fire when cooking step finishes
  const containerAfter = worldStore.getState().containers[containerId];
  if (containerAfter && containerAfter.isOn) {
    worldStore.getState().dispatch({
      type: 'TOGGLE_BURNER',
      payload: { containerId },
    });
  }
}

export async function handleFlipStep(
  ctx: RecipeRunnerContext,
  step: FlipStep
): Promise<void> {
  const state = worldStore.getState();
  const rawKey = step.target;
  let targetContainer = 'burner1';

  if (rawKey) {
    const resolved = resolveContainerId(rawKey);
    if (state.containers[resolved]) {
      targetContainer = resolved;
    } else {
      // Find container currently holding this entity (e.g. 'Huevo batido' or 'mixture')
      const boundEntityId = ctx.getBoundEntityId(rawKey) || rawKey;
      for (const container of Object.values(state.containers)) {
        if (container.entityIds.includes(boundEntityId)) {
          targetContainer = container.id;
          break;
        }
      }
    }
  }

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
