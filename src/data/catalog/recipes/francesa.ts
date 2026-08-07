/**
 * FILE: francesa.ts
 *
 * PURPOSE:
 * Recipe export for Tortilla Francesa.
 *
 * RESPONSIBILITY:
 * - Loaded dynamically from francesa.json via loadRecipe.
 * - Re-exports francesaRecipe and francesaCooklang for backward compatibility.
 */

import { loadRecipe, getRecipeCooklang } from '../../../systems/recipeLoader';
import type { Recipe } from '../../../types/Recipe';

export const francesaRecipe: Recipe = loadRecipe('francesa');
export const francesaCooklang: string = getRecipeCooklang('francesa');
export const recipe: Recipe = francesaRecipe;
