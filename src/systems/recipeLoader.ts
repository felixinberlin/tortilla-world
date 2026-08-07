/**
 * FILE: recipeLoader.ts
 *
 * PURPOSE:
 * Ingestion and hydration system for JSON recipe definitions.
 *
 * RESPONSIBILITY:
 * - Reads JSON recipe assets safely and validates them via validateRecipeJSON.
 * - Hydrates validated JSON data into runtime Recipe objects.
 * - Provides registry accessors (loadRecipe, loadAllRecipes, getAvailableRecipeIds, getRecipeCooklang).
 */

import type { Recipe } from '../types/Recipe';
import type { RecipeJSON } from '../types/RecipeSchema';
import { validateRecipeJSON } from './recipeValidator';

import clasicaJSON from '../data/catalog/recipes/clasica.json';
import concebollaJSON from '../data/catalog/recipes/concebolla.json';
import francesaJSON from '../data/catalog/recipes/francesa.json';
import eggSeparationJSON from '../data/catalog/recipes/egg_separation_test.json';

const recipeRegistry: Record<string, unknown> = {
  clasica: clasicaJSON,
  sincebolla: clasicaJSON,
  concebolla: concebollaJSON,
  francesa: francesaJSON,
  egg_separation_test: eggSeparationJSON,
};

const cooklangRegistry: Record<string, string> = {
  clasica: clasicaJSON.cooklang || '',
  sincebolla: clasicaJSON.cooklang || '',
  concebolla: concebollaJSON.cooklang || '',
  francesa: francesaJSON.cooklang || '',
  egg_separation_test: eggSeparationJSON.cooklang || '',
};

/**
 * Loads a recipe by ID string or validates and hydrates a raw RecipeJSON object.
 */
export function loadRecipe(idOrData: string | unknown): Recipe {
  let rawData: unknown;

  if (typeof idOrData === 'string') {
    const recipeKey = idOrData.trim().toLowerCase();
    rawData = recipeRegistry[recipeKey];
    if (!rawData) {
      throw new Error(`[RecipeLoader] Unknown recipe ID: "${idOrData}". Available IDs: ${getAvailableRecipeIds().join(', ')}`);
    }
  } else {
    rawData = idOrData;
  }

  const validated: RecipeJSON = validateRecipeJSON(rawData);

  const requirements = validated.requirements || validated.ingredients || {};

  const recipe: Recipe = {
    id: validated.id,
    name: validated.name,
    requirements,
    steps: validated.steps,
  };

  // Attach optional metadata properties if available
  if (validated.description) (recipe as unknown as Record<string, unknown>).description = validated.description;
  if (validated.difficulty) (recipe as unknown as Record<string, unknown>).difficulty = validated.difficulty;
  if (validated.tags) (recipe as unknown as Record<string, unknown>).tags = validated.tags;
  if (validated.hints) (recipe as unknown as Record<string, unknown>).hints = validated.hints;
  if (validated.cooklang) (recipe as unknown as Record<string, unknown>).cooklang = validated.cooklang;

  return recipe;
}

/**
 * Returns a list of all available recipe IDs in the registry.
 */
export function getAvailableRecipeIds(): string[] {
  return ['concebolla', 'clasica', 'francesa'];
}

/**
 * Loads all known recipes in the catalog as a Recipe array.
 */
export function loadAllRecipes(): Recipe[] {
  return [
    loadRecipe('concebolla'),
    loadRecipe('clasica'),
    loadRecipe('francesa'),
  ];
}

/**
 * Retrieves the human-readable Cooklang string for a recipe by ID.
 */
export function getRecipeCooklang(id: string): string {
  const key = id.trim().toLowerCase();
  return cooklangRegistry[key] || '';
}
