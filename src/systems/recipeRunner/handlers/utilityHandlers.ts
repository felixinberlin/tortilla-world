/**
 * FILE: src/systems/recipeRunner/handlers/utilityHandlers.ts
 *
 * PURPOSE:
 * Step handlers for utility, narrative, and completion steps ('serve', 'wait', 'instruction', 'speak', 'celebrate').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, flipTortilla, clearTortillaGaze } from '../../mascotActions';
import { resolveContainerId } from '../../../engine/containerRules';
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
  const targetContainerId = resolveContainerId(
    step.containerId || workstationDefaultContainerId || 'plate'
  );
  moveTortillaTo(targetContainerId, ctx.mascotId);
  await ctx.wait();

  const state = worldStore.getState();
  const serveName = step.as || step.name || step.output;

  if (step.target) {
    const targetEntityId = ctx.getBoundEntityId(step.target);
    if (targetEntityId) {
      const currentContainer = Object.values(state.containers).find((c) =>
        c.entityIds.includes(targetEntityId)
      );
      if (currentContainer && currentContainer.id !== targetContainerId) {
        worldStore.getState().dispatch({
          type: 'MOVE_ENTITY',
          payload: {
            entityId: targetEntityId,
            targetContainerId,
          },
        });
      }
      if (serveName) {
        worldStore.getState().dispatch({
          type: 'UPDATE_ENTITY_STATE',
          payload: {
            entityId: targetEntityId,
            changes: { name: serveName },
          },
        });
      }
    }
  } else {
    // Move all active (unconsumed) bound recipe entities to target container (plate)
    const boundEntityIds = new Set(Object.values(ctx.recipeContext.bindings));

    for (const entityId of boundEntityIds) {
      const entity = state.entities[entityId];
      if (entity && !entity.state?.consumed) {
        const currentContainer = Object.values(state.containers).find((c) =>
          c.entityIds.includes(entityId)
        );
        if (currentContainer && currentContainer.id !== targetContainerId) {
          worldStore.getState().dispatch({
            type: 'MOVE_ENTITY',
            payload: {
              entityId,
              targetContainerId,
            },
          });
        }
        if (serveName) {
          worldStore.getState().dispatch({
            type: 'UPDATE_ENTITY_STATE',
            payload: {
              entityId,
              changes: { name: serveName },
            },
          });
        }
      }
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

    const lower = text.toLowerCase();
    if (
      lower.includes('toggle heat') ||
      lower.includes('turn on heat') ||
      lower.includes('turn off heat') ||
      lower.includes('heat on') ||
      lower.includes('burner')
    ) {
      let targetContainerId = 'burner1';
      if (lower.includes('burner2') || lower.includes('burner 2')) {
        targetContainerId = 'burner2';
      } else if (lower.includes('burner1') || lower.includes('burner 1')) {
        targetContainerId = 'burner1';
      }

      const container = worldStore.getState().containers[targetContainerId];
      if (container) {
        if (lower.includes('turn on') && !container.isOn) {
          worldStore.getState().dispatch({ type: 'TOGGLE_BURNER', payload: { containerId: targetContainerId } });
        } else if (lower.includes('turn off') && container.isOn) {
          worldStore.getState().dispatch({ type: 'TOGGLE_BURNER', payload: { containerId: targetContainerId } });
        } else if (lower.includes('toggle heat') || lower.includes('toggle burner') || lower.includes('burner')) {
          worldStore.getState().dispatch({ type: 'TOGGLE_BURNER', payload: { containerId: targetContainerId } });
        }
      }
    }
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