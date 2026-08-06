/**
 * FILE: ingredientCapabilities.test.ts
 *
 * PURPOSE:
 * Unit tests verifying ingredient capability schema grounding, hallucination prevention,
 * and prerequisite validation.
 */

import { describe, it, expect } from 'vitest';
import {
  validateIngredientAction,
  validateActionSequence,
  getIngredientCapabilities,
  generateCapabilityPromptContext,
} from './ingredientCapabilities';
import { INGREDIENT_CAPABILITIES_CATALOG } from '../data/catalog/ingredientCapabilities';
import {
  buildCookingAgentSystemInstructions,
  validateAIPlan,
} from './geminiCapabilityPlanner';

describe('Ingredient Capability Schema Catalog', () => {
  it('defines structured capabilities for at least Potato, Egg, and Salt', () => {
    expect(INGREDIENT_CAPABILITIES_CATALOG.potato).toBeDefined();
    expect(INGREDIENT_CAPABILITIES_CATALOG.egg).toBeDefined();
    expect(INGREDIENT_CAPABILITIES_CATALOG.salt).toBeDefined();

    const promptContext = generateCapabilityPromptContext(['potato']);
    expect(promptContext).toContain('"potato"');

    const potatoCaps = getIngredientCapabilities('potato');
    expect(potatoCaps?.peel).toBeDefined();
    expect(potatoCaps?.slice?.requires?.preparation).toContain('peeled');


    const eggCaps = getIngredientCapabilities('egg');
    expect(eggCaps?.crack).toBeDefined();
    expect(eggCaps?.peel?.requires?.cooking).toContain('boiled');

    const saltCaps = getIngredientCapabilities('salt');
    expect(saltCaps?.season).toBeDefined();
    expect(saltCaps?.peel).toBeUndefined(); // Omission implies false
  });
});

describe('Hallucination Prevention (Unlisted Actions)', () => {
  it('rejects peeling salt because action is omitted from schema', () => {
    const result = validateIngredientAction('salt', 'peel');
    expect(result.valid).toBe(false);
    expect(result.reason).toContain("Action 'peel' is disallowed for 'salt'");
  });

  it('rejects dicing salt', () => {
    const result = validateIngredientAction('salt', 'dice');
    expect(result.valid).toBe(false);
    expect(result.reason).toContain("Action 'dice' is disallowed for 'salt'");
  });

  it('rejects unknown ingredient', () => {
    const result = validateIngredientAction('magic_dust', 'peel');
    expect(result.valid).toBe(false);
    expect(result.reason).toContain("is not defined in the capability schema catalog");
  });
});

describe('Prerequisite Enforcement (Missing Prerequisites)', () => {
  it('refuses to slice a potato if state is not peeled', () => {
    const result = validateIngredientAction('potato', 'slice', { preparation: 'raw' });
    expect(result.valid).toBe(false);
    expect(result.reason).toContain("requires preparation state [peeled]");
    expect(result.missingPrerequisites?.actual).toBe('raw');
  });

  it('allows slicing a potato if state is peeled', () => {
    const result = validateIngredientAction('potato', 'slice', { preparation: 'peeled' });
    expect(result.valid).toBe(true);
  });

  it('refuses to peel a raw egg unless boiled', () => {
    const result = validateIngredientAction('egg', 'peel', { cooking: 'raw' });
    expect(result.valid).toBe(false);
    expect(result.reason).toContain("requires cooking state [boiled]");
  });

  it('allows peeling a boiled egg', () => {
    const result = validateIngredientAction('egg', 'peel', { cooking: 'boiled' });
    expect(result.valid).toBe(true);
  });

  it('refuses to beat an uncracked raw egg', () => {
    const result = validateIngredientAction('egg', 'beat', { preparation: 'raw' });
    expect(result.valid).toBe(false);
    expect(result.reason).toContain("requires preparation state [cracked]");
  });

  it('allows beating a cracked egg', () => {
    const result = validateIngredientAction('egg', 'beat', { preparation: 'cracked' });
    expect(result.valid).toBe(true);
  });
});

describe('Tool Constraints Validation', () => {
  it('rejects using a spatula to peel a potato', () => {
    const result = validateIngredientAction('potato', 'peel', { preparation: 'raw' }, 'spatula');
    expect(result.valid).toBe(false);
    expect(result.reason).toContain("Tool 'spatula' is not allowed");
  });

  it('allows using a peeler to peel a potato', () => {
    const result = validateIngredientAction('potato', 'peel', { preparation: 'raw' }, 'peeler');
    expect(result.valid).toBe(true);
  });
});

describe('Multi-Step Sequence Validation & State Evolution', () => {
  it('validates a correct multi-step sequence (peel potato -> slice potato -> fry potato)', () => {
    const steps = [
      { ingredientId: 'potato', action: 'peel' },
      { ingredientId: 'potato', action: 'slice' },
      { ingredientId: 'potato', action: 'fry' },
    ];
    const seqResult = validateActionSequence(steps);
    expect(seqResult.valid).toBe(true);
    expect(seqResult.finalIngredientStates.potato.preparation).toBe('sliced');
    expect(seqResult.finalIngredientStates.potato.cooking).toBe('fried');
  });

  it('detects missing prerequisite in multi-step sequence when peel is skipped', () => {
    const steps = [
      { ingredientId: 'potato', action: 'slice' },
    ];
    const seqResult = validateActionSequence(steps);
    expect(seqResult.valid).toBe(false);
    expect(seqResult.failedStepIndex).toBe(0);
    expect(seqResult.reason).toContain('requires preparation state [peeled]');
  });

  it('validates egg sequence (boil egg -> peel egg)', () => {
    const steps = [
      { ingredientId: 'egg', action: 'boil' },
      { ingredientId: 'egg', action: 'peel' },
    ];
    const seqResult = validateActionSequence(steps);
    expect(seqResult.valid).toBe(true);
    expect(seqResult.finalIngredientStates.egg.cooking).toBe('boiled');
    expect(seqResult.finalIngredientStates.egg.preparation).toBe('peeled');
  });
});

describe('Gemini AI Grounding & System Instruction Building', () => {
  it('builds system instructions containing strict grounding rules and capability JSON', () => {
    const instructions = buildCookingAgentSystemInstructions(['potato', 'salt']);
    expect(instructions).toContain('No Hallucinations');
    expect(instructions).toContain('"potato"');
    expect(instructions).toContain('"salt"');
    expect(instructions).toContain('[INGREDIENT CAPABILITY SCHEMA CATALOG]');
  });

  it('validates AI proposed plan and catches hallucinated actions', () => {
    const outcome = validateAIPlan('Peel the salt and fry it', [
      { ingredientId: 'salt', action: 'peel' },
    ]);
    expect(outcome.approved).toBe(false);
    expect(outcome.message).toContain("Action 'peel' is disallowed for 'salt'");
  });

  it('validates AI proposed plan and approves valid sequence', () => {
    const outcome = validateAIPlan('Crack egg and beat it', [
      { ingredientId: 'egg', action: 'crack' },
      { ingredientId: 'egg', action: 'beat' },
    ]);
    expect(outcome.approved).toBe(true);
  });
});
