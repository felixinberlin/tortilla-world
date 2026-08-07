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
import { loadRecipe } from '../recipeLoader';
import { getRecipeWorkstationIds } from '../recipeWorkstations';
import type { Recipe, RecipeRequirementDictItem } from '../../types/Recipe';
import type { RecipeStep } from '../../types/RecipeStep';
import type { Entity } from '../../types/world';
import type { RecipeRunnerOptions, RecipeRunnerContext, RecipeContextData } from './types';
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
  public useMascot: boolean;
  public currentRecipe?: Recipe;
  public recipeContext: RecipeContextData;

  constructor(options: RecipeRunnerOptions = {}) {
    this.mascotId = options.mascotId || 'chef';
    this.defaultSourceId = options.defaultSourceId || 'despensa';
    this.defaultTargetId = options.defaultTargetId || '';
    this.delayMs = options.delayMs ?? 600;
    this.useMascot = options.useMascot ?? true;
    this.recipeContext = {
      recipeId: '',
      bindings: {},
    };
  }

  public async wait(ms?: number): Promise<void> {
    const duration = ms ?? this.delayMs;
    if (duration <= 0) return;
    await new Promise((resolve) => setTimeout(resolve, duration));
  }

  public bindRecipeContext(recipeOrId: Recipe | string): void {
    const recipe: Recipe = typeof recipeOrId === 'string' ? loadRecipe(recipeOrId) : recipeOrId;
    this.currentRecipe = recipe;
    this.recipeContext = {
      recipeId: recipe.id,
      bindings: {},
    };

    // Dynamically set defaultTargetId based on recipe's workstations if not explicitly provided
    const wsIds = getRecipeWorkstationIds(recipe);
    if (!this.defaultTargetId || this.defaultTargetId === 'board') {
      if (wsIds.has('board')) {
        this.defaultTargetId = 'board';
      } else if (wsIds.has('bowl')) {
        this.defaultTargetId = 'bowl';
      } else if (wsIds.has('burner1')) {
        this.defaultTargetId = 'burner1';
      } else {
        const first = Array.from(wsIds).find((id) => id !== 'despensa' && id !== 'plate');
        this.defaultTargetId = first || 'bowl';
      }
    }

    const boundIds = new Set<string>();

    const findOrCreateAvailableEntity = (
      ingredientCatalogId: string,
      aliasKey?: string
    ): string => {
      const state = worldStore.getState();
      const allEntities = Object.values(state.entities);

      // 1. Check for unconsumed, unbound entity in active workspace containers
      const activeWorkspaceContainerIds = Object.values(state.containers)
        .filter((c) => c.type !== 'storage' && c.id !== 'despensa')
        .map((c) => c.id);

      for (const cId of activeWorkspaceContainerIds) {
        const container = state.containers[cId];
        if (container) {
          const workspaceCandidate = container.entityIds
            .map((id) => state.entities[id])
            .find((e) => {
              if (!e || e.type !== 'ingredient' || e.state?.consumed || boundIds.has(e.id)) {
                return false;
              }
              const catId = getIngredientCatalogId(e);
              return (
                catId === ingredientCatalogId ||
                e.ingredientId === ingredientCatalogId ||
                e.id === ingredientCatalogId ||
                (aliasKey && e.id === aliasKey)
              );
            });
          if (workspaceCandidate) {
            boundIds.add(workspaceCandidate.id);
            return workspaceCandidate.id;
          }
        }
      }

      // 2. Check for unconsumed, unbound entity anywhere in world
      const unboundCandidate = allEntities.find((e) => {
        if (!e || e.type !== 'ingredient' || e.state?.consumed || boundIds.has(e.id)) {
          return false;
        }
        const catId = getIngredientCatalogId(e);
        return (
          catId === ingredientCatalogId ||
          e.ingredientId === ingredientCatalogId ||
          e.id === ingredientCatalogId ||
          (aliasKey && e.id === aliasKey)
        );
      });

      if (unboundCandidate) {
        boundIds.add(unboundCandidate.id);
        return unboundCandidate.id;
      }

      // 3. If no unbound entity exists, check for template entity in immutable storage (e.g. despensa)
      const immutableCandidate = allEntities.find((e) => {
        if (!e || e.type !== 'ingredient' || e.state?.consumed) return false;
        const catId = getIngredientCatalogId(e);
        return (
          catId === ingredientCatalogId ||
          e.ingredientId === ingredientCatalogId ||
          e.id === ingredientCatalogId ||
          (aliasKey && e.id === aliasKey)
        );
      });

      if (immutableCandidate) {
        return immutableCandidate.id;
      }

      // 4. Fallback: spawn new ingredient entity in despensa or board
      const newEntityId = `${ingredientCatalogId}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const newEntity: Entity = {
        id: newEntityId,
        name: ingredientCatalogId.charAt(0).toUpperCase() + ingredientCatalogId.slice(1),
        type: 'ingredient',
        ingredientId: ingredientCatalogId,
        state: { preparation: 'whole', cooking: 'raw' },
      };

      const targetContainerId = state.containers[this.defaultSourceId] ? this.defaultSourceId : 'board';
      worldStore.getState().dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: newEntity,
          containerId: targetContainerId,
        },
      });

      boundIds.add(newEntityId);
      return newEntityId;
    };

    const reqs = recipe.requirements || (recipe as unknown as { ingredients?: unknown }).ingredients;

    if (Array.isArray(reqs)) {
      for (const item of reqs) {
        const rawItem = item as { entityId?: string; ingredientId?: string; id?: string };
        const entityIdKey = rawItem.entityId || rawItem.ingredientId || '';
        const entityId = findOrCreateAvailableEntity(entityIdKey, rawItem.id);
        this.recipeContext.bindings[entityIdKey] = entityId;
        if (rawItem.id) {
          this.recipeContext.bindings[rawItem.id] = entityId;
        }
      }
    } else if (reqs && typeof reqs === 'object') {
      for (const [key, item] of Object.entries(
        reqs as Record<string, RecipeRequirementDictItem>
      )) {
        const rawItem = item as { entityId?: string; ingredientId?: string };
        const entityIdKey = rawItem.entityId || rawItem.ingredientId || key;
        const entityId = findOrCreateAvailableEntity(entityIdKey, key);
        this.recipeContext.bindings[key] = entityId;
        this.recipeContext.bindings[entityIdKey] = entityId;
      }
    }

    this.bindStepsContext(recipe.steps, boundIds);
  }

  private bindStepsContext(steps: RecipeStep[], boundIds: Set<string>): void {
    const state = worldStore.getState();

    for (const step of steps) {
      if (step.action === 'mix' || step.action === 'beat' || step.action === 'combine') {
        const inputs = step.inputs || step.ingredients || [];
        for (const inputKey of inputs) {
          if (!this.recipeContext.bindings[inputKey]) {
            const catId = this.resolveIngredientId(inputKey) || inputKey;
            const candidate = Object.values(state.entities).find(
              (e) =>
                e &&
                e.type === 'ingredient' &&
                !e.state?.consumed &&
                !boundIds.has(e.id) &&
                (getIngredientCatalogId(e) === catId || e.ingredientId === catId || e.id === inputKey)
            );
            if (candidate) {
              this.recipeContext.bindings[inputKey] = candidate.id;
              this.recipeContext.bindings[catId] = candidate.id;
              boundIds.add(candidate.id);
            }
          }
        }
      } else if ('ingredient' in step || 'target' in step) {
        const rawKey =
          ('ingredient' in step ? step.ingredient : undefined) ||
          ('target' in step ? step.target : undefined);
        if (rawKey && rawKey !== 'mixture' && !this.recipeContext.bindings[rawKey]) {
          const catId = this.resolveIngredientId(rawKey) || rawKey;
          const candidate = Object.values(state.entities).find(
            (e) =>
              e &&
              e.type === 'ingredient' &&
              !e.state?.consumed &&
              !boundIds.has(e.id) &&
              (getIngredientCatalogId(e) === catId || e.ingredientId === catId || e.id === rawKey)
          );
          if (candidate) {
            this.recipeContext.bindings[rawKey] = candidate.id;
            this.recipeContext.bindings[catId] = candidate.id;
            boundIds.add(candidate.id);
          }
        }
      }
    }
  }

  public getBoundEntityId(targetOrKey?: string): string | undefined {
    if (!targetOrKey) return undefined;
    if (this.recipeContext.bindings[targetOrKey]) {
      return this.recipeContext.bindings[targetOrKey];
    }
    const resolvedCatId = this.resolveIngredientId(targetOrKey);
    if (resolvedCatId && this.recipeContext.bindings[resolvedCatId]) {
      return this.recipeContext.bindings[resolvedCatId];
    }
    const state = worldStore.getState();
    if (state.entities[targetOrKey]) {
      return targetOrKey;
    }
    return undefined;
  }

  public validateEntity(entityId: string, stepAction: string = 'step'): Entity {
    const state = worldStore.getState();
    const entity = state.entities[entityId];
    if (!entity) {
      throw new Error(
        `[RecipeRunner] Validation failed for ${stepAction}: Entity "${entityId}" does not exist in world state.`
      );
    }
    if (entity.state?.consumed) {
      throw new Error(
        `[RecipeRunner] Validation failed for ${stepAction}: Entity "${entityId}" (${entity.name}) has already been consumed.`
      );
    }
    return entity;
  }

  public updateBindingIfCopied(
    oldEntityId: string,
    newEntityId: string,
    specificKey?: string
  ): void {
    if (oldEntityId === newEntityId) return;
    if (specificKey && this.recipeContext.bindings[specificKey] === oldEntityId) {
      this.recipeContext.bindings[specificKey] = newEntityId;
    } else {
      for (const key in this.recipeContext.bindings) {
        if (this.recipeContext.bindings[key] === oldEntityId) {
          this.recipeContext.bindings[key] = newEntityId;
        }
      }
    }
  }

  public async ensureEntityInWorkspace(
    entityId: string,
    targetContainerId: string = this.defaultTargetId
  ): Promise<string> {
    const state = worldStore.getState();
    this.validateEntity(entityId, 'ensureEntityInWorkspace');

    const targetContainer = state.containers[targetContainerId];
    if (targetContainer && targetContainer.entityIds.includes(entityId)) {
      return entityId;
    }

    const mascot = state.entities[this.mascotId];
    const rawHolding = mascot?.state?.holdingEntityIds as string[] | undefined;
    const singleHolding = mascot?.state?.holdingEntityId as string | undefined;
    const holdingIds = Array.isArray(rawHolding) && rawHolding.length > 0 ? rawHolding : singleHolding ? [singleHolding] : [];

    if (holdingIds.includes(entityId)) {
      return entityId;
    }

    let currentContainerId = this.defaultSourceId;
    for (const container of Object.values(state.containers)) {
      if (container.entityIds.includes(entityId)) {
        currentContainerId = container.id;
        break;
      }
    }

    await handleMoveStep(
      this,
      {
        action: 'move',
        ingredient: entityId,
        source: currentContainerId,
        target: targetContainerId,
      },
      targetContainerId
    );

    const updatedState = worldStore.getState();
    const updatedTargetContainer = updatedState.containers[targetContainerId];
    if (updatedTargetContainer) {
      if (updatedTargetContainer.entityIds.includes(entityId)) {
        return entityId;
      }
      const copyId = updatedTargetContainer.entityIds[updatedTargetContainer.entityIds.length - 1];
      if (copyId) {
        this.updateBindingIfCopied(entityId, copyId);
        return copyId;
      }
    }
    return entityId;
  }

  public resolveIngredientId(targetOrKey?: string): string | undefined {
    if (!targetOrKey) return undefined;
    const reqs = this.currentRecipe?.requirements || (this.currentRecipe as unknown as { ingredients?: unknown })?.ingredients;
    if (reqs && !Array.isArray(reqs)) {
      const dict = reqs as Record<string, { entityId?: string; ingredientId?: string }>;
      if (dict[targetOrKey]) {
        return dict[targetOrKey].entityId || dict[targetOrKey].ingredientId;
      }
      const match = Object.values(dict).find(
        (item) => (item.entityId || item.ingredientId) === targetOrKey
      );
      if (match) {
        return match.entityId || match.ingredientId;
      }
    }
    return targetOrKey;
  }

  public async ensureIngredientInWorkspace(
    ingredientCatalogId: string,
    targetContainerId: string = this.defaultTargetId
  ): Promise<string | undefined> {
    const boundId = this.getBoundEntityId(ingredientCatalogId);
    if (boundId) {
      return this.ensureEntityInWorkspace(boundId, targetContainerId);
    }
    return undefined;
  }

  public async runRecipe(recipeOrId: Recipe | string): Promise<void> {
    const recipe: Recipe = typeof recipeOrId === 'string' ? loadRecipe(recipeOrId) : recipeOrId;
    this.bindRecipeContext(recipe);
    await this.runSteps(recipe.steps);
  }

  public async runSteps(steps: RecipeStep[]): Promise<void> {
    if (!this.recipeContext.recipeId) {
      this.recipeContext.recipeId = 'steps_run';
      this.bindStepsContext(steps, new Set<string>());
    }
    for (const step of steps) {
      await this.executeStep(step);
    }
  }

  public async executeStep(step: RecipeStep): Promise<void> {
    const workstation = findWorkstationForStep(step);

    if (!worldStore.getState().userOverride) {
      const containerId =
        (step as { containerId?: string; targetContainerId?: string }).containerId ||
        (step as { containerId?: string; targetContainerId?: string }).targetContainerId ||
        workstation.defaultContainerId;

      if (containerId) {
        worldStore.getState().setFocus({
          containerId,
          mode: 'focused',
        });
      }
    }

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
      case 'clean':
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
