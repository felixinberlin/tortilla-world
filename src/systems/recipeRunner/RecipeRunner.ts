/**
 * FILE: src/systems/recipeRunner/RecipeRunner.ts
 *
 * PURPOSE:
 * Workstation and tool-driven recipe execution engine (RecipeRunner).
 *
 * RESPONSIBILITY:
 * - Iterates over declarative RecipeSteps sequentially.
 * - Dynamically determines required workstation and tools for each step.
 * - Dispatches appropriate world and mascot actions via step handlers.
 * - Modifies existing entity state for preparation/cooking without destroying/recreating entities.
 * - Preserves data-driven architecture and keeps recipes decoupled from kitchen locations.
 */

import { worldStore } from '../../store/worldStore';
import { getIngredientCatalogId } from '../../engine/containerRules';
import { findWorkstationForStep } from '../../engine/workstations';
import type { Recipe, RecipeIngredientDictItem } from '../../types/Recipe';
import type { RecipeStep } from '../../types/RecipeStep';
import type { RecipeRunnerOptions, RecipeRunnerContext } from './types';
import { handleMoveStep, handleGrabStep, handleDropStep } from './handlers/moveHandlers';
import { handlePrepStep } from './handlers/prepHandlers';
import { handleCookStep, handleFlipStep } from './handlers/cookHandlers';
import { handleMixStep } from './handlers/mixHandlers';
import {
  handleServeStep,
  handleWaitStep,
  handleInstructionStep,
  handleSpeakStep,
  handleCelebrateStep,
} from './handlers/utilityHandlers';

export class RecipeRunner implements RecipeRunnerContext {
  public mascotId: string;
  public defaultSourceId: string;
  public defaultTargetId: string;
  public delayMs: number;
  public currentRecipe?: Recipe;

  constructor(options: RecipeRunnerOptions = {}) {
    this.mascotId = options.mascotId || 'chef';
    this.defaultSourceId = options.defaultSourceId || 'despensa';
    this.defaultTargetId = options.defaultTargetId || 'board';
    this.delayMs = options.delayMs ?? 600;
  }

  public async wait(ms?: number): Promise<void> {
    const duration = ms ?? this.delayMs;
    if (duration <= 0) return;
    await new Promise((resolve) => setTimeout(resolve, duration));
  }

  /**
   * Resolves a step target or key (e.g. 'potatoes') to catalog ingredient ID ('potato').
   */
  public resolveIngredientId(targetOrKey?: string): string | undefined {
    if (!targetOrKey) return undefined;
    if (this.currentRecipe && !Array.isArray(this.currentRecipe.ingredients)) {
      const dict = this.currentRecipe.ingredients as Record<string, RecipeIngredientDictItem>;
      if (dict[targetOrKey]) {
        return dict[targetOrKey].ingredientId;
      }
      const match = Object.values(dict).find(
        (item) => item.ingredientId === targetOrKey
      );
      if (match) {
        return match.ingredientId;
      }
    }
    return targetOrKey;
  }

  /**
   * Ensures specified ingredient is present in active workstation containers or mascot hand.
   * If absent, automatically moves ingredient from defaultSourceId to targetContainerId.
   */
  public async ensureIngredientInWorkspace(
    ingredientCatalogId: string,
    targetContainerId: string = this.defaultTargetId
  ): Promise<string | undefined> {
    const state = worldStore.getState();
    // Exclude storage/pantry containers when checking if ingredient is already in active workspace
    const activeWorkspaceContainerIds = Object.values(state.containers)
      .filter((c) => c.type !== 'storage' && c.id !== 'despensa')
      .map((c) => c.id);

    for (const cId of activeWorkspaceContainerIds) {
      const container = state.containers[cId];
      if (container) {
        const foundId = container.entityIds.find((id) => {
          const e = state.entities[id];
          return e && getIngredientCatalogId(e) === ingredientCatalogId;
        });
        if (foundId) return foundId;
      }
    }

    const mascot = state.entities[this.mascotId];
    if (mascot?.state?.holdingEntityId) {
      const held = state.entities[mascot.state.holdingEntityId as string];
      if (held && getIngredientCatalogId(held) === ingredientCatalogId) {
        return held.id;
      }
    }

    // Move missing ingredient from source to target workstation container
    await this.executeStep({
      action: 'move',
      ingredient: ingredientCatalogId,
      source: this.defaultSourceId,
      target: targetContainerId,
    });

    const updatedState = worldStore.getState();
    const targetContainer = updatedState.containers[targetContainerId];
    if (targetContainer) {
      return targetContainer.entityIds.find((id) => {
        const e = updatedState.entities[id];
        return e && getIngredientCatalogId(e) === ingredientCatalogId;
      });
    }
    return undefined;
  }

  /**
   * Executes all steps of a given Recipe sequentially.
   */
  public async runRecipe(recipe: Recipe): Promise<void> {
    this.currentRecipe = recipe;
    await this.runSteps(recipe.steps);
  }

  /**
   * Executes a list of declarative steps sequentially.
   */
  public async runSteps(steps: RecipeStep[]): Promise<void> {
    for (const step of steps) {
      await this.executeStep(step);
    }
  }

  /**
   * Executes an individual step by resolving workstation and required tools.
   */
  public async executeStep(step: RecipeStep): Promise<void> {
    const workstation = findWorkstationForStep(step);

    switch (step.action) {
      case 'move':
        return handleMoveStep(this, step, workstation.defaultContainerId);
      case 'grab':
        return handleGrabStep(this, step);
      case 'drop':
        return handleDropStep(this, step, workstation.defaultContainerId);

      case 'cut':
      case 'prepare':
      case 'peel':
      case 'wash':
      case 'rinse':
      case 'drain':
        return handlePrepStep(this, step, workstation.defaultContainerId);

      case 'cook':
        return handleCookStep(this, step, workstation.defaultContainerId);
      case 'flip':
        return handleFlipStep(this, step);

      case 'mix':
      case 'beat':
      case 'combine':
        return handleMixStep(this, step, workstation.defaultContainerId);

      case 'serve':
        return handleServeStep(this, step, workstation.defaultContainerId);

      case 'wait':
        return handleWaitStep(this, step);
      case 'instruction':
        return handleInstructionStep(this, step);
      case 'speak':
        return handleSpeakStep(this, step);
      case 'celebrate':
        return handleCelebrateStep(this, step);
    }
  }
}
