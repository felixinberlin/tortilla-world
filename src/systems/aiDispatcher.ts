/**
 * FILE: aiDispatcher.ts
 *
 * PURPOSE:
 * Autonomous AI action execution queue and plan dispatcher.
 *
 * RESPONSIBILITY:
 * - Accepts structured AI action plans.
 * - Validates and executes action steps sequentially through worldStore.
 * - Halts execution safely if any step violates world container rules.
 *
 * ARCHITECTURE RULES:
 * AI does not directly modify Zustand state.
 * AI produces actions that pass through store dispatch validation.
 */

import { worldStore } from '../store/worldStore';
import type { WorldAction } from '../types/world';

export interface AIPlanStep {
  description: string;
  action: WorldAction;
}

export interface AIActionPlan {
  name: string;
  steps: AIPlanStep[];
}

export interface AIExecutionResult {
  success: boolean;
  executedStepsCount: number;
  failedStepIndex?: number;
  reason?: string;
}

/**
 * Executes an AI plan synchronously or step-by-step.
 */
export function executeAIPlan(plan: AIActionPlan): AIExecutionResult {
  let executedCount = 0;

  for (let i = 0; i < plan.steps.length; i++) {
    const step = plan.steps[i];

    // Snapshot last rejection timestamp
    const initialRejectionTime = worldStore.getState().lastRejection?.timestamp || 0;

    // Dispatch AI action step
    worldStore.getState().dispatch(step.action);

    // Check if store rejected the action
    const currentRejection = worldStore.getState().lastRejection;
    if (currentRejection && currentRejection.timestamp > initialRejectionTime) {
      return {
        success: false,
        executedStepsCount: executedCount,
        failedStepIndex: i,
        reason: `Step '${step.description}' failed: ${currentRejection.reason}`,
      };
    }

    executedCount++;
  }

  return {
    success: true,
    executedStepsCount: executedCount,
  };
}

/**
 * Helper to build an AI cooking action plan for preparing a Tortilla.
 */
export function createTortillaAIPlan(): AIActionPlan {
  return {
    name: 'Prepare Tortilla de Patatas',
    steps: [
      {
        description: 'Move Knife to Cutting Board',
        action: { type: 'MOVE_ENTITY', payload: { entityId: 'knife-1', targetContainerId: 'board' } },
      },
      {
        description: 'Move Potato to Cutting Board',
        action: { type: 'MOVE_ENTITY', payload: { entityId: 'potato-1', targetContainerId: 'board' } },
      },
      {
        description: 'Move Onion to Cutting Board',
        action: { type: 'MOVE_ENTITY', payload: { entityId: 'onion-1', targetContainerId: 'board' } },
      },
      {
        description: 'Move Egg to Cooking Pan',
        action: { type: 'MOVE_ENTITY', payload: { entityId: 'egg-1', targetContainerId: 'pan' } },
      },
    ],
  };
}
