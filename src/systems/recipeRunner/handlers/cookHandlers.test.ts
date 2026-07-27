/**
 * FILE: src/systems/recipeRunner/handlers/cookHandlers.test.ts
 *
 * PURPOSE:
 * Unit tests for cooking step handlers and oil heating behavior.
 *
 * RESPONSIBILITY:
 * - Verify oil heating doesn't mark oil as consumed
 * - Verify oil stays in the burner1/container after heating
 * - Verify oil IS consumed when it's used as a cooking medium
 * - Distinguish between oil as target vs oil as cooking medium
 * - Test garlic cooking and other ingredients
 * - Verify Required Materials immutability concept
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { worldStore } from '../../../store/worldStore';
import { handleCookStep, handleFlipStep } from './cookHandlers';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type CookStep = Extract<RecipeStep, { action: 'cook' }>;
type FlipStep = Extract<RecipeStep, { action: 'flip' }>;

/**
 * Helper: Create mock RecipeRunnerContext
 */
function createMockContext(overrides?: Partial<RecipeRunnerContext>): RecipeRunnerContext {
  return {
    mascotId: 'chef_1',
    defaultSourceId: 'burner1try',
    defaultTargetId: 'board',
    delayMs: 0, // No delay in tests
    recipeContext: {
      recipeId: 'test_recipe',
      bindings: {},
    },
    getBoundEntityId: vi.fn((key: string) => {
      const mapping: Record<string, string> = {
        oil: 'oil_1',
        potatoes: 'potatoes_1',
        garlic: 'garlic_1',
        mixture: 'mixture_1',
      };
      return mapping[key] || null;
    }),
    validateEntity: vi.fn((id: string) => ({ id })),
    updateBindingIfCopied: vi.fn(),
    wait: vi.fn(async () => {}),
    bindStepsContext: vi.fn(),
    ensureEntityInWorkspace: vi.fn(async (id: string, targetContainerId: string) => {
      const state = worldStore.getState();
      const currentContainer = Object.values(state.containers).find((c) =>
        c.entityIds.includes(id)
      );
      if (!currentContainer || currentContainer.id !== targetContainerId) {
        state.dispatch({
          type: 'MOVE_ENTITY',
          payload: { entityId: id, targetContainerId },
        });
      }
      return id;
    }),
    ensureIngredientInWorkspace: vi.fn(async (id: string) => id),
    resolveIngredientId: vi.fn((key: string) => key),
    currentRecipe: undefined,
    bindRecipeContext: vi.fn(),
    runRecipe: vi.fn(),
    runSteps: vi.fn(),
    executeStep: vi.fn(),
    ...overrides,
  } as unknown as RecipeRunnerContext;
}

/**
 * Helper: Setup world state with ingredients
 */
function seedWorld() {
  worldStore.setState({
    entities: {
      oil_1: {
        id: 'oil_1',
        name: '🫒 Olive Oil',
        type: 'ingredient',
        ingredientId: 'oil',
        state: {},
      },
      potatoes_1: {
        id: 'potatoes_1',
        name: '🥔 Potatoes',
        type: 'ingredient',
        ingredientId: 'potatoes',
        state: { preparation: 'sliced' },
      },
      garlic_1: {
        id: 'garlic_1',
        name: '🧄 Garlic',
        type: 'ingredient',
        ingredientId: 'garlic',
        state: { preparation: 'peeled' },
      },
      eggs_1: {
        id: 'eggs_1',
        name: '🥚 Eggs',
        type: 'ingredient',
        ingredientId: 'egg',
        state: {},
      },
    },
    containers: {
      burner1: {
        id: 'burner1',
        name: 'burner1',
        type: 'workstation',
        entityIds: [],
      },
      burner1try: {
        id: 'burner1try',
        name: 'burner1try',
        type: 'storage',
        entityIds: ['oil_1', 'potatoes_1', 'garlic_1', 'eggs_1'],
      },
      board: {
        id: 'board',
        name: 'Board',
        type: 'workstation',
        entityIds: [],
      },
    },
    events: [],
  });
}

describe('Cook Handlers - Oil & Ingredient Cooking', () => {
  beforeEach(() => {
    seedWorld();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Test Group 1: Oil Heating (Primary Target)', () => {
    it('1.1: Heat oil - Oil should NOT be marked as consumed', async () => {
      const ctx = createMockContext();

      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };

      await handleCookStep(ctx, heatOilStep, 'burner1');

      const state = worldStore.getState();
      const oil = state.entities.oil_1;

      expect(oil.state?.consumed).not.toBe(true);
      expect(oil.state?.consumedBy).toBeUndefined();
    });

    it('1.2: Heat oil - Oil should be moved to burner1', async () => {
      const ctx = createMockContext();

      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };

      await handleCookStep(ctx, heatOilStep, 'burner1');

      const state = worldStore.getState();
      const burner1Container = state.containers.burner1;

      expect(burner1Container.entityIds).toContain('oil_1');
    });

    it('1.3: Heat oil - Oil state should show cooking method "heat"', async () => {
      const ctx = createMockContext();

      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };

      await handleCookStep(ctx, heatOilStep, 'burner1');

      const state = worldStore.getState();
      const oil = state.entities.oil_1;

      expect(oil.state?.cooking).toBe('heat');
    });

  });

  describe('Test Group 2: Garlic Cooking & Removal', () => {
    it('2.1: Fry garlic - Garlic should be marked with cooking state', async () => {
      const ctx = createMockContext();

      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
        instruction: 'Que no se quemen.', // Don't let them burn
      };

      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      const state = worldStore.getState();
      const garlic = state.entities.garlic_1;

      expect(garlic.state?.cooking).toBe('fry');
    });

    it('2.2: Fry garlic - Garlic should be moved to burner1', async () => {
      const ctx = createMockContext();

      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
      };

      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      const state = worldStore.getState();
      const burner1Container = state.containers.burner1;

      expect(burner1Container.entityIds).toContain('garlic_1');
    });

    it('2.3: Fry garlic - Garlic should NOT be consumed (it\'s the target)', async () => {
      const ctx = createMockContext();

      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
      };

      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      const state = worldStore.getState();
      const garlic = state.entities.garlic_1;

      expect(garlic.state?.consumed).not.toBe(true);
      expect(garlic.state?.consumedBy).toBeUndefined();
    });

    it('2.4: Fry garlic - Oil should be consumed as cooking medium', async () => {
      const ctx = createMockContext();

      // First heat oil
      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep, 'burner1');

      // Now fry garlic
      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
      };
      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      const state = worldStore.getState();
      const oil = state.entities.oil_1;

      // Oil should be consumed since garlic (not oil) is the target
      expect(oil.state?.consumed).toBe(true);
      expect(oil.state?.consumedBy).toBe('garlic_1');
    });
  });

  describe('Test Group 3: Frying with Oil (Oil as Cooking Medium)', () => {
    it('3.1: Fry potatoes - Oil should be consumed as cooking medium', async () => {
      const ctx = createMockContext();

      // Heat oil first
      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep, 'burner1');

      // Move potatoes to burner1 manually for test
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'potatoes_1',
          targetContainerId: 'burner1',
        },
      });

      // Fry potatoes
      const fryPotatoesStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };
      await handleCookStep(ctx, fryPotatoesStep, 'burner1');

      const state = worldStore.getState();
      const oil = state.entities.oil_1;

      // Oil SHOULD be consumed when potatoes are fried
      expect(oil.state?.consumed).toBe(true);
      expect(oil.state?.consumedBy).toBe('potatoes_1');
    });

    it('3.2: Potatoes should NOT be consumed (they are the target)', async () => {
      const ctx = createMockContext();

      // Heat oil
      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep, 'burner1');

      // Move potatoes to burner1
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'potatoes_1',
          targetContainerId: 'burner1',
        },
      });

      // Fry potatoes
      const fryPotatoesStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };
      await handleCookStep(ctx, fryPotatoesStep, 'burner1');

      const state = worldStore.getState();
      const potatoes = state.entities.potatoes_1;

      expect(potatoes.state?.consumed).not.toBe(true);
      expect(potatoes.state?.consumedBy).toBeUndefined();
    });
  });

  describe('Test Group 4: Complete Cooking Sequence', () => {
    it('4.1: Full sequence - Heat oil, fry garlic, fry potatoes', async () => {
      const ctx = createMockContext();

      // Step 1: Heat oil
      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep, 'burner1');

      // Verify oil is in burner1 but not consumed
      let state = worldStore.getState();
      let oil = state.entities.oil_1;
      expect(state.containers.burner1.entityIds).toContain('oil_1');
      expect(oil.state?.consumed).not.toBe(true);
      expect(oil.state?.cooking).toBe('heat');

      // Step 2: Fry garlic
      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
      };
      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      // Verify garlic is in burner1, oil is consumed
      state = worldStore.getState();
      const garlic = state.entities.garlic_1;
      oil = state.entities.oil_1;
      expect(state.containers.burner1.entityIds).toContain('garlic_1');
      expect(garlic.state?.cooking).toBe('fry');
      expect(oil.state?.consumed).toBe(true);

      // Step 3: Move potatoes to burner1 (simulating move step)
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'potatoes_1',
          targetContainerId: 'burner1',
        },
      });

      // Step 4: Fry potatoes (oil already consumed, won't be consumed again)
      const fryPotatoesStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };
      await handleCookStep(ctx, fryPotatoesStep, 'burner1');

      // Final state check
      state = worldStore.getState();
      const potatoes = state.entities.potatoes_1;
      oil = state.entities.oil_1;

      expect(state.containers.burner1.entityIds).toContain('potatoes_1');
      expect(potatoes.state?.cooking).toBe('fry');
      expect(oil.state?.consumed).toBe(true); // Still consumed from garlic step
    });

    it('4.2: Oil consumption happens only once per session', async () => {
      const ctx = createMockContext();

      // Heat oil
      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep, 'burner1');

      // Fry garlic (consumes oil)
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'garlic_1',
          targetContainerId: 'burner1',
        },
      });

      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
      };
      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      let state = worldStore.getState();
      let oil = state.entities.oil_1;
      const firstConsumption = oil.state?.consumedBy;

      // Fry potatoes (oil already consumed, shouldn't be consumed again)
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'potatoes_1',
          targetContainerId: 'burner1',
        },
      });

      const fryPotatoesStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };
      await handleCookStep(ctx, fryPotatoesStep, 'burner1');

      state = worldStore.getState();
      oil = state.entities.oil_1;

      // Oil should still be consumed by garlic, not potatoes
      expect(oil.state?.consumedBy).toBe(firstConsumption);
      expect(oil.state?.consumedBy).toBe('garlic_1');
    });
  });

  describe('Test Group 5: Flip Step', () => {
    it('5.1: Flip mixture - Should mark mixture as flipped', async () => {
      const ctx = createMockContext();

      // Create a mixture entity
      worldStore.getState().dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: {
            id: 'mixture_1',
            name: '🍳 Mixture',
            type: 'ingredient',
            ingredientId: 'mixture',
            state: {},
          },
          containerId: 'burner1',
        },
      });

      const flipStep: FlipStep = {
        action: 'flip',
        target: 'mixture',
        instruction: 'Dale la vuelta a la tortilla.',
      };

      await handleFlipStep(ctx, flipStep);

      const state = worldStore.getState();
      const mixture = state.entities.mixture_1;

      expect(mixture.state?.isFlipped).toBe(true);
    });
  });

  describe('Test Group 6: Edge Cases', () => {
    it('6.1: Cook oil again - Should NOT consume it again', async () => {
      const ctx = createMockContext();

      // Heat oil first time
      const heatOilStep1: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep1, 'burner1');

      let state = worldStore.getState();
      let oil = state.entities.oil_1;
      expect(oil.state?.cooking).toBe('heat');

      // Try to heat oil again (should just update state)
      const heatOilStep2: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep2, 'burner1');

      state = worldStore.getState();
      oil = state.entities.oil_1;

      // Oil should still not be consumed
      expect(oil.state?.consumed).not.toBe(true);
    });

    it('6.2: Multiple ingredients in burner1 - Only oil consumed', async () => {
      const ctx = createMockContext();

      // Setup: Move multiple items to burner1
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'oil_1',
          targetContainerId: 'burner1',
        },
      });

      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'eggs_1',
          targetContainerId: 'burner1',
        },
      });

      // Fry potatoes
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'potatoes_1',
          targetContainerId: 'burner1',
        },
      });

      const fryStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };

      await handleCookStep(ctx, fryStep, 'burner1');

      const state = worldStore.getState();
      const oil = state.entities.oil_1;
      const eggs = state.entities.eggs_1;

      // Oil should be consumed
      expect(oil.state?.consumed).toBe(true);

      // Eggs should not be consumed (not detected as cooking medium)
      expect(eggs.state?.consumed).not.toBe(true);
    });

    it('6.3: Fire control - Mascot turns fire ON before cooking and OFF after cooking', async () => {
      const fireStates: boolean[] = [];

      const ctx = createMockContext({
        wait: vi.fn(async () => {
          // Record burner1 isOn state during wait
          const isOn = Boolean(worldStore.getState().containers.burner1?.isOn);
          fireStates.push(isOn);
        }),
      });

      // Ensure burner1 is off initially
      worldStore.setState({
        containers: {
          ...worldStore.getState().containers,
          burner1: {
            id: 'burner1',
            name: 'burner1',
            type: 'workstation',
            entityIds: [],
            isOn: false,
          },
        },
      });

      const cookStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };

      await handleCookStep(ctx, cookStep, 'burner1');

      // During cooking (in first wait after toggle or second wait), fire was turned ON
      expect(fireStates).toContain(true);

      // After cooking step finishes, burner1 fire is turned OFF
      const finalBurnerState = worldStore.getState().containers.burner1;
      expect(finalBurnerState.isOn).toBe(false);
    });
  });
});