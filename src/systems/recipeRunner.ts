/**
 * FILE: recipeRunner.ts
 *
 * PURPOSE:
 * Workstation and tool-driven recipe execution engine (RecipeRunner).
 *
 * RESPONSIBILITY:
 * - Iterates over declarative RecipeSteps sequentially.
 * - Dynamically determines required workstation and tools for each step.
 * - Dispatches appropriate world and mascot actions.
 * - Modifies existing entity state for preparation/cooking without destroying/recreating entities.
 * - Preserves data-driven architecture and keeps recipes decoupled from kitchen locations.
 */

import { worldStore } from '../store/worldStore';
import { moveTortillaTo, grabIngredient, dropIngredient, flipTortilla } from './mascotActions';
import { getIngredientCatalogId } from '../engine/containerRules';
import { findWorkstationForStep } from '../engine/workstations';
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
   * Ensures specified ingredient is present in active workstation containers or mascot hand.
   * If absent, automatically moves ingredient from defaultSourceId to targetContainerId.
   */
  private async ensureIngredientInWorkspace(
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
      case 'move': {
        const source = step.source || this.defaultSourceId;
        const target = step.target || workstation.defaultContainerId || this.defaultTargetId;
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
        const target = step.target || workstation.defaultContainerId || this.defaultTargetId;
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
        const targetContainerId = step.containerId || workstation.defaultContainerId || this.defaultTargetId;

        if (ingredientId && ingredientId !== 'mixture') {
          await this.ensureIngredientInWorkspace(ingredientId, targetContainerId);
        }

        moveTortillaTo(targetContainerId, this.mascotId);
        await this.wait();

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
        const containerId = step.containerId || workstation.defaultContainerId || 'pan';

        if (ingredientId && ingredientId !== 'mixture') {
          await this.ensureIngredientInWorkspace(ingredientId, containerId);
        }

        moveTortillaTo(containerId, this.mascotId);
        await this.wait();

        const state = worldStore.getState();
        const container = state.containers[containerId] || state.containers.pan;

        if (container) {
          if (rawKey === 'mixture' || ingredientId === 'mixture') {
            // Transfer items from prep/cutting containers to cooking container if cooking container is empty
            let currentContainerState = worldStore.getState().containers[containerId] || container;
            if (currentContainerState.entityIds.length === 0) {
              for (const prepCId of ['bowl', 'board']) {
                const prepContainer = worldStore.getState().containers[prepCId];
                if (prepContainer && prepContainer.entityIds.length > 0) {
                  [...prepContainer.entityIds].forEach((id) => {
                    worldStore.getState().dispatch({
                      type: 'MOVE_ENTITY',
                      payload: {
                        entityId: id,
                        targetContainerId: containerId,
                      },
                    });
                  });
                  break;
                }
              }
            }

            // Cook all ingredients in target cooking container
            currentContainerState = worldStore.getState().containers[containerId] || container;
            currentContainerState.entityIds.forEach((id) => {
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

            // If ingredient is on another container (e.g. board/bowl) but target is cooking container, transfer it
            if (!targetEntityId) {
              for (const sourceCId of ['board', 'bowl', 'sink']) {
                const sourceContainer = state.containers[sourceCId];
                const foundId = sourceContainer?.entityIds.find((id) => {
                  const e = state.entities[id];
                  return e && getIngredientCatalogId(e) === ingredientId;
                });
                if (foundId) {
                  worldStore.getState().dispatch({
                    type: 'MOVE_ENTITY',
                    payload: {
                      entityId: foundId,
                      targetContainerId: containerId,
                    },
                  });
                  targetEntityId = foundId;
                  break;
                }
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
        const targetContainerId = step.targetContainerId || workstation.defaultContainerId || 'bowl';

        if (step.inputs && step.inputs.length > 0) {
          for (const rawInput of step.inputs) {
            const ingredientId = this.resolveIngredientId(rawInput);
            if (ingredientId) {
              await this.ensureIngredientInWorkspace(ingredientId, targetContainerId);
            }
          }
        }

        moveTortillaTo(targetContainerId, this.mascotId);
        await this.wait();
        flipTortilla(this.mascotId);
        await this.wait();
        break;
      }

      case 'serve': {
        const targetContainerId = step.containerId || workstation.defaultContainerId || 'plate';
        moveTortillaTo(targetContainerId, this.mascotId);
        await this.wait();

        // Move all cooked/prepared items from pan, bowl, or board to plate
        const state = worldStore.getState();
        for (const sourceCId of ['pan', 'bowl', 'board']) {
          const container = state.containers[sourceCId];
          if (container && container.entityIds.length > 0) {
            [...container.entityIds].forEach((entityId) => {
              worldStore.getState().dispatch({
                type: 'MOVE_ENTITY',
                payload: {
                  entityId,
                  targetContainerId: targetContainerId,
                },
              });
            });
          }
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
