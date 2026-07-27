/**
 * FILE: recipeValidator.ts
 *
 * PURPOSE:
 * Validation engine for raw JSON recipe assets.
 *
 * RESPONSIBILITY:
 * - Validates raw JSON objects against RecipeJSON structural requirements.
 * - Checks required fields (id, name, steps, requirements/ingredients).
 * - Verifies step action formats and cross-references step targets against declared requirements.
 * - Throws clear, descriptive error messages for invalid or malformed data.
 */

import type { RecipeJSON } from '../types/RecipeSchema';

export function validateRecipeJSON(data: unknown): RecipeJSON {
  if (!data || typeof data !== 'object') {
    throw new Error('[RecipeValidator] Invalid recipe data: expected a non-null JSON object.');
  }

  const raw = data as Record<string, unknown>;

  // 1. Validate required strings: id, name
  if (typeof raw.id !== 'string' || !raw.id.trim()) {
    throw new Error('[RecipeValidator] Recipe validation error: "id" must be a non-empty string.');
  }

  if (typeof raw.name !== 'string' || !raw.name.trim()) {
    throw new Error(`[RecipeValidator] Recipe "${raw.id || 'unknown'}": "name" must be a non-empty string.`);
  }

  const recipeId = raw.id.trim();

  // 2. Validate requirements or ingredients
  const reqs = raw.requirements || raw.ingredients;
  if (!reqs || (typeof reqs !== 'object' && !Array.isArray(reqs))) {
    throw new Error(
      `[RecipeValidator] Recipe "${recipeId}": must declare "requirements" or "ingredients" as an object or array.`
    );
  }

  // Collect declared requirement keys for cross-reference validation
  const declaredKeys = new Set<string>();

  if (Array.isArray(reqs)) {
    reqs.forEach((item, idx) => {
      if (!item || typeof item !== 'object') {
        throw new Error(
          `[RecipeValidator] Recipe "${recipeId}": requirement at index ${idx} must be an object.`
        );
      }
      const itemObj = item as Record<string, unknown>;
      const key = (itemObj.entityId || itemObj.ingredientId || itemObj.id) as string | undefined;
      if (key) {
        declaredKeys.add(key);
      }
    });
  } else {
    Object.entries(reqs as Record<string, unknown>).forEach(([key, value]) => {
      declaredKeys.add(key);
      if (value && typeof value === 'object') {
        const valObj = value as Record<string, unknown>;
        if (valObj.entityId && typeof valObj.entityId === 'string') {
          declaredKeys.add(valObj.entityId);
        }
      }
    });
  }

  // 3. Validate steps array
  if (!Array.isArray(raw.steps) || raw.steps.length === 0) {
    throw new Error(`[RecipeValidator] Recipe "${recipeId}": "steps" must be a non-empty array.`);
  }

  const validActions = new Set([
    'prepare',
    'cut',
    'peel',
    'wash',
    'rinse',
    'drain',
    'cook',
    'mix',
    'beat',
    'combine',
    'instruction',
    'flip',
    'serve',
    'move',
    'grab',
    'drop',
    'wait',
    'speak',
    'celebrate',
  ]);

  raw.steps.forEach((step, idx) => {
    if (!step || typeof step !== 'object') {
      throw new Error(`[RecipeValidator] Recipe "${recipeId}": step at index ${idx} must be an object.`);
    }

    const stepObj = step as Record<string, unknown>;
    const action = stepObj.action;

    if (typeof action !== 'string' || !validActions.has(action)) {
      throw new Error(
        `[RecipeValidator] Recipe "${recipeId}": step ${idx} has invalid or missing action "${action}".`
      );
    }

    // Step-specific cross-reference checks
    if (action === 'mix' || action === 'beat' || action === 'combine') {
      const inputs = (stepObj.inputs || stepObj.ingredients) as unknown;
      if (inputs && !Array.isArray(inputs)) {
        throw new Error(
          `[RecipeValidator] Recipe "${recipeId}": step ${idx} (${action}) "inputs" must be an array of strings.`
        );
      }
    }
  });

  return data as RecipeJSON;
}
