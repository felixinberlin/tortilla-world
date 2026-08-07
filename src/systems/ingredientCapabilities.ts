/**
 * FILE: ingredientCapabilities.ts
 *
 * PURPOSE:
 * Engine and system logic to validate ingredient cooking actions against capability schemas,
 * simulate state evolution, and build AI prompt context.
 *
 * RESPONSIBILITY:
 * - Grounding AI reasoning by checking allowed actions, required tools, and state prerequisites.
 * - Generating system instructions and context schemas for LLM prompts.
 * - Validating multi-step action sequences to catch hallucinations and missing prerequisites.
 */

import { INGREDIENT_CAPABILITIES_CATALOG } from '../data/catalog/ingredientCapabilities';
import type {
  IngredientActionValidationResult,
  IngredientCapabilities,
  CapabilityDefinition,
} from '../types/IngredientCapability';

export interface IngredientState {
  preparation?: string;
  cooking?: string;
  temperature?: string;
}

/**
 * Normalizes action names to lowercase standard verbs.
 */
function normalizeAction(action: string): string {
  const lowered = action.toLowerCase().trim();
  if (lowered === 'slice' || lowered === 'dice' || lowered === 'cut' || lowered === 'chop' || lowered === 'mince') {
    return lowered;
  }
  if (lowered === 'whisk' || lowered === 'beat') {
    return 'beat';
  }
  return lowered;
}

/**
 * Normalizes state terms (e.g. 'raw', 'whole', 'peeled', 'boiled').
 */
function normalizeState(term?: string): string {
  if (!term) return 'raw';
  const lowered = term.toLowerCase().trim();
  if (lowered === 'raw' || lowered === 'whole' || lowered === 'none') return 'raw';
  return lowered;
}

/**
 * Retrieves capability definition for a specific ingredient and action.
 */
export function getIngredientCapability(
  ingredientId: string,
  action: string
): CapabilityDefinition | undefined {
  const catalogItem = INGREDIENT_CAPABILITIES_CATALOG[ingredientId.toLowerCase()];
  if (!catalogItem || !catalogItem.capabilities) return undefined;

  const normalizedAct = normalizeAction(action);
  const caps = catalogItem.capabilities;

  if (caps[normalizedAct]) return caps[normalizedAct];
  if (caps[action]) return caps[action];

  return undefined;
}

/**
 * Gets all capability definitions for a given ingredient.
 */
export function getIngredientCapabilities(ingredientId: string): IngredientCapabilities | undefined {
  const catalogItem = INGREDIENT_CAPABILITIES_CATALOG[ingredientId.toLowerCase()];
  return catalogItem?.capabilities;
}

/**
 * Validates whether an action can be performed on an ingredient given its current state and tool.
 */
export function validateIngredientAction(
  ingredientId: string,
  action: string,
  currentState?: IngredientState,
  toolUsed?: string
): IngredientActionValidationResult {
  const cleanId = ingredientId.toLowerCase();
  const catalogItem = INGREDIENT_CAPABILITIES_CATALOG[cleanId];

  // If ingredient is not in capability catalog, allow or flag dependent on catalog mode
  if (!catalogItem) {
    // If not found in strict schema catalog, reject unknown ingredient capability
    return {
      valid: false,
      reason: `Ingredient '${ingredientId}' is not defined in the capability schema catalog.`,
      missingPrerequisites: {
        type: 'capability',
        expected: ['defined capability schema'],
        actual: 'unknown ingredient',
      },
    };
  }

  const capability = getIngredientCapability(cleanId, action);

  // Omission implies false - if action is omitted in schema, it is disallowed
  if (!capability) {
    const allowed = Object.keys(catalogItem.capabilities || {});
    return {
      valid: false,
      reason: `Action '${action}' is disallowed for '${ingredientId}'. Allowed actions: [${allowed.join(', ')}].`,
      missingPrerequisites: {
        type: 'capability',
        expected: allowed,
        actual: action,
      },
    };
  }

  // Check state prerequisites if defined in schema
  const prep = normalizeState(currentState?.preparation);
  const cook = normalizeState(currentState?.cooking);

  if (capability.requires?.preparation && capability.requires.preparation.length > 0) {
    const requiredPreps = capability.requires.preparation.map((p) => p.toLowerCase());
    if (!requiredPreps.includes(prep)) {
      return {
        valid: false,
        reason: `Action '${action}' on '${ingredientId}' requires preparation state [${requiredPreps.join(', ')}], but current preparation is '${prep}'.`,
        missingPrerequisites: {
          type: 'preparation',
          expected: requiredPreps,
          actual: prep,
        },
      };
    }
  }

  if (capability.requires?.cooking && capability.requires.cooking.length > 0) {
    const requiredCooks = capability.requires.cooking.map((c) => c.toLowerCase());
    if (!requiredCooks.includes(cook)) {
      return {
        valid: false,
        reason: `Action '${action}' on '${ingredientId}' requires cooking state [${requiredCooks.join(', ')}], but current cooking state is '${cook}'.`,
        missingPrerequisites: {
          type: 'cooking',
          expected: requiredCooks,
          actual: cook,
        },
      };
    }
  }

  // Check tool compatibility if a tool was explicitly provided
  if (toolUsed && capability.tools && capability.tools.length > 0) {
    const cleanTool = toolUsed.toLowerCase();
    const allowedTools = capability.tools.map((t) => t.toLowerCase());
    if (!allowedTools.includes(cleanTool)) {
      return {
        valid: false,
        reason: `Tool '${toolUsed}' is not allowed for action '${action}' on '${ingredientId}'. Allowed tools: [${allowedTools.join(', ')}].`,
        missingPrerequisites: {
          type: 'tool',
          expected: allowedTools,
          actual: cleanTool,
        },
      };
    }
  }

  return { valid: true };
}

export interface SequenceStepInput {
  stepId?: string;
  ingredientId: string;
  action: string;
  toolUsed?: string;
}

export interface SequenceValidationResult {
  valid: boolean;
  failedStepIndex?: number;
  failedStep?: SequenceStepInput;
  reason?: string;
  finalIngredientStates: Record<string, IngredientState>;
}

/**
 * Validates a sequence of planned actions and simulates state evolution across steps.
 */
export function validateActionSequence(
  steps: SequenceStepInput[],
  initialStates: Record<string, IngredientState> = {}
): SequenceValidationResult {
  const ingredientStates: Record<string, IngredientState> = {};

  // Copy initial states
  for (const [key, val] of Object.entries(initialStates)) {
    ingredientStates[key.toLowerCase()] = { ...val };
  }

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const ingId = step.ingredientId.toLowerCase();
    const currentState = ingredientStates[ingId] || { preparation: 'raw', cooking: 'raw' };

    const valResult = validateIngredientAction(ingId, step.action, currentState, step.toolUsed);

    if (!valResult.valid) {
      return {
        valid: false,
        failedStepIndex: i,
        failedStep: step,
        reason: valResult.reason,
        finalIngredientStates: ingredientStates,
      };
    }

    // Evolve simulated state upon successful action
    const normAction = normalizeAction(step.action);
    const updatedState = { ...currentState };

    if (normAction === 'peel') {
      updatedState.preparation = 'peeled';
    } else if (normAction === 'slice' || normAction === 'cut') {
      updatedState.preparation = 'sliced';
    } else if (normAction === 'dice') {
      updatedState.preparation = 'diced';
    } else if (normAction === 'mince') {
      updatedState.preparation = 'minced';
    } else if (normAction === 'crack') {

      updatedState.preparation = 'cracked';
    } else if (normAction === 'beat' || normAction === 'whisk') {
      updatedState.preparation = 'beaten';
    } else if (normAction === 'boil') {
      updatedState.cooking = 'boiled';
    } else if (normAction === 'fry') {
      updatedState.cooking = 'fried';
    }

    ingredientStates[ingId] = updatedState;
  }

  return {
    valid: true,
    finalIngredientStates: ingredientStates,
  };
}

/**
 * Generates structured context schema text suitable for injecting into Gemini AI system instructions.
 */
export function generateCapabilityPromptContext(filterIngredientIds?: string[]): string {
  const entries = Object.entries(INGREDIENT_CAPABILITIES_CATALOG);
  const filtered = filterIngredientIds && filterIngredientIds.length > 0
    ? entries.filter(([id]) => filterIngredientIds.map((f) => f.toLowerCase()).includes(id.toLowerCase()))
    : entries;

  const catalogObj: Record<string, unknown> = {};
  for (const [id, item] of filtered) {
    catalogObj[id] = {
      capabilities: item.capabilities,
    };
  }

  return `
[INGREDIENT CAPABILITY SCHEMA CATALOG]
Rule: Omission implies FALSE. You MUST NOT plan or generate actions for an ingredient unless explicitly listed in its capabilities.
Prerequisites (requires) MUST be satisfied before executing an action.

JSON Catalog:
${JSON.stringify(catalogObj, null, 2)}
`.trim();
}
