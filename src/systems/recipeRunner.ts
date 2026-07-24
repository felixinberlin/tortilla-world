/**
 * FILE: recipeRunner.ts
 *
 * PURPOSE:
 * Generic step-based recipe execution engine (RecipeRunner).
 *
 * RESPONSIBILITY:
 * - Iterates over declarative RecipeSteps sequentially.
 * - Dispatches appropriate world and mascot actions.
 * - Modifies existing entity state for preparation/cooking without destroying/recreating entities.
 * - Supports dictionary ingredients, step aliases, automatic ingredient resolution, and serving.
 */

import { worldStore } from '../store/worldStore';
import { moveTortillaTo, grabIngredient, dropIngredient, flipTortilla } from './mascotActions';
import { getIngredientCatalogId } from '../engine/containerRules';
import type { Recipe, RecipeIngredientDictItem } from '../types/Recipe';
import type { RecipeStep } from '../types/RecipeStep';

export interface RecipeRunnerOptions {
  mascotId?: string;
  defaultSourceId?: string;
  defaultTargetId?: string;
  delayMs?: number;
}

export class RecipeRunner {
  private mascotId: string;
  private defaultSourceId: string;
  private defaultTargetId: string;
  private delayMs: number;
  private currentRecipe?: Recipe;

  constructor(options: RecipeRunnerOptions = {}) {
    this.mascotId = options.mascotId || 'chef';
    this.defaultSourceId = options.defaultSourceId || 'despensa';
    this.defaultTargetId = options.defaultTargetId || 'board';
    this.delayMs = options.delayMs ?? 600;
  }

  private async wait(ms?: number): Promise<void> {
    const duration = ms ?? this.delayMs;
    if (duration <= 0) return;
    await new Promise((resolve) => setTimeout(resolve, duration));
  }

  /**
   * Resolves a step target or key (e.g. 'potatoes') to catalog ingredient ID ('potato').
   */
  private resolveIngredientId(targetOrKey?: string): string | undefined {
    if (!targetOrKey) return undefined;
    if (this.currentRecipe && !Array.isArray(this.currentRecipe.ingredients)) {
      const dict = this.currentRecipe.ingredients as Record<string, RecipeIngredientDictItem>;
      if (dict[targetOrKey]) {
        return dict[targetOrKey].ingredientId;
      }
    }
    return targetOrKey;
  }

  /**
   * Ensures specified ingredient is present in active workspace containers or mascot hand.
   * If absent, automatically moves ingredient from defaultSourceId to defaultTargetId.
   */
  private async ensureIngredientInWorkspace(ingredientCatalogId: string): Promise<string | undefined> {
    const state = worldStore.getState();
    const workspaceContainers = ['board', 'pan', 'plate'];

    for (const cId of workspaceContainers) {
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

    // Move missing ingredient from source to target container
    await this.executeStep({
      action: 'move',
      ingredient: ingredientCatalogId,
      source: this.defaultSourceId,
      target: this.defaultTargetId,
    });

    const updatedState = worldStore.getState();
    const targetContainer = updatedState.containers[this.defaultTargetId];
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
   * Executes an individual step.
   */
  public async executeStep(step: RecipeStep): Promise<void> {
    switch (step.action) {
      case 'move': {
        const source = step.source || this.defaultSourceId;
        const target = step.target || this.defaultTargetId;
        const rawKey = step.ingredient || step.target;
        const ingredientId = this.resolveIngredientId(rawKey) || rawKey;

        // Check if target container already contains this ingredient
        const state = worldStore.getState();
        const targetContainer = state.containers[target];
        if (targetContainer && ingredientId) {
          const currentEntities = targetContainer.entityIds
            .map((id) => state.entities[id])
            .filter(Boolean);
          const alreadyPresent = currentEntities.some(
            (e) => e.type === 'ingredient' && getIngredientCatalogId(e) === ingredientId
          );
          if (alreadyPresent) {
            break; // Skip move if ingredient is already present
          }
        }

        // 1. Move mascot gaze to source container
        moveTortillaTo(source, this.mascotId);
        await this.wait();

        // 2. Grab ingredient from source container
        if (ingredientId) {
          grabIngredient(ingredientId, source, this.mascotId);
          await this.wait();
        }

        // 3. Move mascot gaze to target container
        moveTortillaTo(target, this.mascotId);
        await this.wait();

        // 4. Drop ingredient into target container
        dropIngredient(target, undefined, this.mascotId);
        await this.wait();
        break;
      }

      case 'grab': {
        const source = step.source || this.defaultSourceId;
        const ingredientId = this.resolveIngredientId(step.ingredient) || step.ingredient;
        moveTortillaTo(source, this.mascotId);
        await this.wait();

        if (ingredientId) {
          grabIngredient(ingredientId, source, this.mascotId);
          await this.wait();
        }
        break;
      }

      case 'drop': {
        const target = step.target || this.defaultTargetId;
        moveTortillaTo(target, this.mascotId);
        await this.wait();

        dropIngredient(target, step.positionIndex, this.mascotId);
        await this.wait();
        break;
      }

      case 'cut':
      case 'prepare': {
        const rawKey = step.target || step.ingredient;
        const ingredientId = this.resolveIngredientId(rawKey);
        const prepStyle = step.preparation || step.style || 'prepared';

        if (ingredientId && ingredientId !== 'mixture') {
          await this.ensureIngredientInWorkspace(ingredientId);
        }

        const containerId = step.containerId || this.defaultTargetId;
        moveTortillaTo(containerId, this.mascotId);
        await this.wait();

        const state = worldStore.getState();
        let targetEntityId: string | undefined;

        if (ingredientId) {
          // Search workspace containers for the matching ingredient
          for (const cId of [containerId, 'board', 'pan', 'plate']) {
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
          const mascot = state.entities[this.mascotId];
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
        await this.wait();
        break;
      }

      case 'cook': {
        const rawKey = step.target || step.ingredient;
        const ingredientId = this.resolveIngredientId(rawKey);
        const cookingMethod = step.method || 'cooked';
        const containerId = step.containerId || 'pan';

        if (ingredientId && ingredientId !== 'mixture') {
          await this.ensureIngredientInWorkspace(ingredientId);
        }

        moveTortillaTo(containerId, this.mascotId);
        await this.wait();

        const state = worldStore.getState();
        const container = state.containers[containerId] || state.containers.pan;

        if (container) {
          if (rawKey === 'mixture' || ingredientId === 'mixture') {
            // Cook all ingredients in pan
            container.entityIds.forEach((id) => {
              worldStore.getState().dispatch({
                type: 'COOK_INGREDIENT',
                payload: {
                  entityId: id,
                  cooking: cookingMethod,
                },
              });
            });
          } else if (ingredientId) {
            let targetEntityId = container.entityIds.find((id) => {
              const e = state.entities[id];
              return e && getIngredientCatalogId(e) === ingredientId;
            });

            // If ingredient is on board but target is pan, move it to pan
            if (!targetEntityId && containerId === 'pan') {
              const boardContainer = state.containers.board;
              const boardEntityId = boardContainer?.entityIds.find((id) => {
                const e = state.entities[id];
                return e && getIngredientCatalogId(e) === ingredientId;
              });
              if (boardEntityId) {
                worldStore.getState().dispatch({
                  type: 'MOVE_ENTITY',
                  payload: {
                    entityId: boardEntityId,
                    targetContainerId: 'pan',
                  },
                });
                targetEntityId = boardEntityId;
              }
            }

            if (targetEntityId) {
              worldStore.getState().dispatch({
                type: 'COOK_INGREDIENT',
                payload: {
                  entityId: targetEntityId,
                  cooking: cookingMethod,
                },
              });
            }
          }
        }
        await this.wait();
        break;
      }

      case 'mix':
      case 'beat': {
        if (step.inputs && step.inputs.length > 0) {
          for (const rawInput of step.inputs) {
            const ingredientId = this.resolveIngredientId(rawInput);
            if (ingredientId) {
              await this.ensureIngredientInWorkspace(ingredientId);
            }
          }
        }

        const containerId = step.targetContainerId || this.defaultTargetId;
        moveTortillaTo(containerId, this.mascotId);
        await this.wait();
        flipTortilla(this.mascotId);
        await this.wait();
        break;
      }

      case 'serve': {
        const targetContainerId = step.containerId || 'plate';
        moveTortillaTo(targetContainerId, this.mascotId);
        await this.wait();

        // Move all items from pan to plate
        const state = worldStore.getState();
        const pan = state.containers.pan;
        if (pan && pan.entityIds.length > 0) {
          [...pan.entityIds].forEach((entityId) => {
            worldStore.getState().dispatch({
              type: 'MOVE_ENTITY',
              payload: {
                entityId,
                targetContainerId: targetContainerId,
              },
            });
          });
        }
        await this.wait();
        break;
      }

      case 'wait': {
        await this.wait(step.durationMs);
        break;
      }

      case 'flip': {
        flipTortilla(step.mascotId || this.mascotId);
        await this.wait();
        break;
      }

      case 'speak': {
        worldStore.getState().dispatch({
          type: 'UPDATE_ENTITY_STATE',
          payload: {
            entityId: step.mascotId || this.mascotId,
            changes: { speechMessage: step.message },
          },
        });
        await this.wait();
        break;
      }

      case 'celebrate': {
        flipTortilla(step.mascotId || this.mascotId);
        await this.wait(900);
        moveTortillaTo('', step.mascotId || this.mascotId);
        break;
      }
    }
  }
}

