/**
 * FILE: geminiCapabilityPlanner.test.ts
 *
 * PURPOSE:
 * Unit tests for the Gemini Capability Planner system.
 * Verifies system instructions building, capability catalog context generation,
 * and AI proposed plan validation outcomes against ingredient capabilities.
 */

import { describe, it, expect } from 'vitest';
import {
  buildCookingAgentSystemInstructions,
  validateAIPlan,
  evaluateKitchenLogicEngine,
  formatKitchenLogicEngineInput,
  KITCHEN_LOGIC_ENGINE_SYSTEM_INSTRUCTIONS,
} from './geminiCapabilityPlanner';

describe('Gemini Capability Planner', () => {
  describe('Kitchen Logic Engine Prompt & Evaluator', () => {
    it('provides system instructions matching the AI Studio Kitchen Logic Engine role', () => {
      expect(KITCHEN_LOGIC_ENGINE_SYSTEM_INSTRUCTIONS).toContain('Role');
      expect(KITCHEN_LOGIC_ENGINE_SYSTEM_INSTRUCTIONS).toContain('You are the Kitchen Logic Engine.');
      expect(KITCHEN_LOGIC_ENGINE_SYSTEM_INSTRUCTIONS).toContain('Omission Implies False');
      expect(KITCHEN_LOGIC_ENGINE_SYSTEM_INSTRUCTIONS).toContain('Enforce Prerequisites');
    });

    it('formats input text matching standard INTENT / CURRENT STATE / INGREDIENT DATA blocks', () => {
      const formatted = formatKitchenLogicEngineInput('I want to peel the salt.', [], {
        id: 'salt',
        capabilities: { season: {}, dissolve: {} },
      });
      expect(formatted).toContain('INTENT: I want to peel the salt.');
      expect(formatted).toContain('CURRENT STATE: []');
      expect(formatted).toContain('INGREDIENT DATA:');
      expect(formatted).toContain('"salt"');
    });

    it('Test Case 1: The Hallucination Check (Peeling Salt)', () => {
      const result = evaluateKitchenLogicEngine('I want to peel the salt.', [], {
        id: 'salt',
        capabilities: { season: {}, dissolve: {} },
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain("action 'peel' is not defined in the capabilities for 'salt'");
      expect(result.missing_prerequisites).toEqual([]);
      expect(result.recommended_tools).toEqual([]);
    });

    it('Test Case 2: The Prerequisite Check (Slicing an Unpeeled Potato)', () => {
      const result = evaluateKitchenLogicEngine('I want to slice the potato.', ['raw'], {
        id: 'potato',
        capabilities: {
          peel: { tools: ['peeler', 'knife'] },
          slice: {
            tools: ['knife', 'mandoline'],
            requires: { preparation: ['peeled'] },
          },
        },
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain("requires the preparation state 'peeled'");
      expect(result.missing_prerequisites).toEqual(['peeled']);
      expect(result.recommended_tools).toEqual([]);
    });

    it('Test Case 3: The Successful Action (Slicing a Peeled Potato)', () => {
      const result = evaluateKitchenLogicEngine('I want to slice the potato.', ['peeled', 'raw'], {
        id: 'potato',
        capabilities: {
          peel: { tools: ['peeler', 'knife'] },
          slice: {
            tools: ['knife', 'mandoline'],
            requires: { preparation: ['peeled'] },
          },
        },
      });

      expect(result.allowed).toBe(true);
      expect(result.reason).toContain("The 'slice' action is allowed and all prerequisite preparation states are met.");
      expect(result.missing_prerequisites).toEqual([]);
      expect(result.recommended_tools).toEqual(['knife', 'mandoline']);
    });
  });

  describe('buildCookingAgentSystemInstructions', () => {
    it('generates system instructions containing grounding rules and catalog context', () => {
      const instructions = buildCookingAgentSystemInstructions();

      expect(instructions).toContain('You are the Kitchen Logic Engine.');
      expect(instructions).toContain('Omission Implies False');
      expect(instructions).toContain('[INGREDIENT CAPABILITY SCHEMA CATALOG]');
      expect(instructions).toContain('"potato"');
      expect(instructions).toContain('"egg"');
      expect(instructions).toContain('"salt"');
    });

    it('filters system instructions catalog context when specific ingredient IDs are provided', () => {
      const instructions = buildCookingAgentSystemInstructions(['potato', 'salt']);

      expect(instructions).toContain('"potato"');
      expect(instructions).toContain('"salt"');
      expect(instructions).not.toContain('"chorizo"');
    });
  });

  describe('validateAIPlan', () => {
    it('approves valid multi-step multi-ingredient plan', () => {
      const outcome = validateAIPlan('Make fried potatoes with salt', [
        { ingredientId: 'potato', action: 'peel' },
        { ingredientId: 'potato', action: 'slice' },
        { ingredientId: 'potato', action: 'fry' },
        { ingredientId: 'salt', action: 'season' },
      ]);

      expect(outcome.approved).toBe(true);
      expect(outcome.userIntent).toBe('Make fried potatoes with salt');
      expect(outcome.steps.length).toBe(4);
      expect(outcome.message).toContain('successfully validated');
    });

    it('rejects plan attempting unlisted action on ingredient (hallucination)', () => {
      const outcome = validateAIPlan('Dice the salt and peel it', [
        { ingredientId: 'salt', action: 'dice' },
      ]);

      expect(outcome.approved).toBe(false);
      expect(outcome.message).toContain('Step [dice on salt] failed capability schema check');
      expect(outcome.message).toContain("Action 'dice' is disallowed for 'salt'");
    });

    it('rejects plan attempting action with missing prerequisite state', () => {
      const outcome = validateAIPlan('Mince the raw garlic directly', [
        { ingredientId: 'garlic', action: 'mince' },
      ]);

      expect(outcome.approved).toBe(false);
      expect(outcome.message).toContain('Step [mince on garlic] failed capability schema check');
      expect(outcome.message).toContain('requires preparation state [peeled]');
    });

    it('approves garlic plan when prerequisite peel step is included', () => {
      const outcome = validateAIPlan('Peel and mince garlic', [
        { ingredientId: 'garlic', action: 'peel' },
        { ingredientId: 'garlic', action: 'mince' },
      ]);

      expect(outcome.approved).toBe(true);
      expect(outcome.validation.finalIngredientStates.garlic.preparation).toBe('minced');
    });

    it('rejects plan with unlisted tool', () => {
      const outcome = validateAIPlan('Peel potato with a spoon', [
        { ingredientId: 'potato', action: 'peel', toolUsed: 'spoon' },
      ]);

      expect(outcome.approved).toBe(false);
      expect(outcome.message).toContain("Tool 'spoon' is not allowed");
    });

    it('approves plan with valid allowed tool', () => {
      const outcome = validateAIPlan('Peel potato with a peeler', [
        { ingredientId: 'potato', action: 'peel', toolUsed: 'peeler' },
      ]);

      expect(outcome.approved).toBe(true);
    });
  });
});
