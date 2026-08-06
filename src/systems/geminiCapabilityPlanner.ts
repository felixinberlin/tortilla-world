/**
 * FILE: geminiCapabilityPlanner.ts
 *
 * PURPOSE:
 * Bridges Gemini AI model prompts with the Ingredient Capability Schema catalog.
 * Implements the Kitchen Logic Engine prompt specification for AI Studio.
 *
 * RESPONSIBILITY:
 * - Generates strict System Instructions for AI Studio / Gemini API containing ingredient capabilities.
 * - Formats input prompts and strictly evaluates user intent against JSON ingredient capability schemas.
 * - Validates AI-generated or requested cooking action sequences against hard capability schema.
 */

import { generateCapabilityPromptContext, validateActionSequence } from './ingredientCapabilities';
import type { SequenceStepInput, SequenceValidationResult } from './ingredientCapabilities';

/**
 * AI Studio System Instructions for the Kitchen Logic Engine.
 */
export const KITCHEN_LOGIC_ENGINE_SYSTEM_INSTRUCTIONS = `
Role
You are the Kitchen Logic Engine. Your sole purpose is to validate cooking actions against a strictly defined Ingredient Catalog. You do not use general knowledge or common sense to determine if a cooking action is possible; you rely only on the provided JSON data.

Core Directives
Omission Implies False: If an action is not explicitly listed in an ingredient's capabilities object, that action is physically impossible. You must firmly reject the action.

Enforce Prerequisites: If an action contains a requires object, you must verify that the ingredient is currently in that exact state before allowing the action. If it is not, reject the action and state what preparation is missing.

Recommend Tools: If an action is allowed, include the specified tools or workstation in your response.

No Hallucinations: Never suggest an alternative action or tool that is not explicitly defined in the ingredient's JSON block.

Input Format
You will receive prompts in the following format:
INTENT: [What the user wants to do]
CURRENT STATE: [The current state of the ingredient, if any]
INGREDIENT DATA: [The JSON schema for the ingredient]

Output Format
You must output your evaluation strictly as a JSON object matching this schema:

JSON
{
  "allowed": boolean,
  "reason": "String explaining why it was allowed or rejected based ON THE DATA.",
  "missing_prerequisites": ["List of missing states, or empty array"],
  "recommended_tools": ["List of tools/workstations, or empty array"]
}
`.trim();

export interface KitchenLogicEngineEvaluationOutput {
  allowed: boolean;
  reason: string;
  missing_prerequisites: string[];
  recommended_tools: string[];
}

export interface IngredientDataInput {
  id: string;
  capabilities: Record<string, {
    tools?: string[];
    workstation?: string;
    requires?: {
      preparation?: string[];
      cooking?: string[];
    };
  }>;
}

/**
 * Formats standard input prompt for the Kitchen Logic Engine.
 */
export function formatKitchenLogicEngineInput(
  intent: string,
  currentState: string[],
  ingredientData: IngredientDataInput | object
): string {
  return `INTENT: ${intent}\nCURRENT STATE: ${JSON.stringify(currentState)}\nINGREDIENT DATA: ${JSON.stringify(
    ingredientData
  )}`;
}

/**
 * Evaluates a user intent against ingredient capabilities using the Kitchen Logic Engine rules.
 */
export function evaluateKitchenLogicEngine(
  intent: string,
  currentState: string[],
  ingredientData: IngredientDataInput
): KitchenLogicEngineEvaluationOutput {
  const lowerIntent = intent.toLowerCase();

  // Extract key action verb from intent
  const verbs = ['peel', 'slice', 'dice', 'cut', 'mince', 'fry', 'boil', 'beat', 'whisk', 'season', 'dissolve', 'crack', 'pour'];
  const matchedVerb = verbs.find((v) => lowerIntent.includes(v)) || lowerIntent.split(' ')[0];

  const capabilities = ingredientData.capabilities || {};
  const capability = capabilities[matchedVerb];

  // Rule 1: Omission Implies False
  if (!capability) {
    return {
      allowed: false,
      reason: `The action '${matchedVerb}' is not defined in the capabilities for '${ingredientData.id}'.`,
      missing_prerequisites: [],
      recommended_tools: [],
    };
  }

  // Rule 2: Enforce Prerequisites
  const requiredPreps = capability.requires?.preparation || [];
  const requiredCooks = capability.requires?.cooking || [];
  const allRequired = [...requiredPreps, ...requiredCooks];

  const missingPrereqs = allRequired.filter(
    (req) => !currentState.map((s) => s.toLowerCase()).includes(req.toLowerCase())
  );

  if (missingPrereqs.length > 0) {
    return {
      allowed: false,
      reason: `The '${matchedVerb}' action requires the preparation state '${missingPrereqs[0]}', which is currently missing.`,
      missing_prerequisites: missingPrereqs,
      recommended_tools: [],
    };
  }

  // Rule 3: Recommend Tools
  const tools = capability.tools || (capability.workstation ? [capability.workstation] : []);

  return {
    allowed: true,
    reason: `The '${matchedVerb}' action is allowed and all prerequisite preparation states are met.`,
    missing_prerequisites: [],
    recommended_tools: tools,
  };
}

/**
 * Builds system instructions for Gemini model grounded on the Ingredient Capability Schema.
 */
export function buildCookingAgentSystemInstructions(ingredientIds?: string[]): string {
  const capabilityContext = generateCapabilityPromptContext(ingredientIds);

  return `${KITCHEN_LOGIC_ENGINE_SYSTEM_INSTRUCTIONS}\n\n${capabilityContext}`;
}

export interface AIPlanValidationOutcome {
  approved: boolean;
  userIntent: string;
  steps: SequenceStepInput[];
  validation: SequenceValidationResult;
  message: string;
}

/**
 * Grounds and validates a proposed AI cooking plan against the ingredient capability schema catalog.
 */
export function validateAIPlan(
  userIntent: string,
  proposedPlan: SequenceStepInput[]
): AIPlanValidationOutcome {
  const result = validateActionSequence(proposedPlan);

  if (!result.valid && result.failedStep) {
    const failed = result.failedStep;
    return {
      approved: false,
      userIntent,
      steps: proposedPlan,
      validation: result,
      message: `Invalid cooking plan for intent "${userIntent}": Step [${failed.action} on ${failed.ingredientId}] failed capability schema check. Reason: ${result.reason}`,
    };
  }

  return {
    approved: true,
    userIntent,
    steps: proposedPlan,
    validation: result,
    message: `Plan for intent "${userIntent}" successfully validated against ingredient capability schema.`,
  };
}

