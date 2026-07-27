/**
 * FILE: clasica.ts
 *
 * PURPOSE:
 * Recipe export for Tortilla Clásica (without onion).
 *
 * RESPONSIBILITY:
 * - Loaded dynamically from clasica.json via loadRecipe.
 * - Re-exports clasicaRecipe and clasicaCooklang for backward compatibility.
 */

import { loadRecipe, getRecipeCooklang } from '../../../systems/recipeLoader';
import type { Recipe } from '../../../types/Recipe';

export const clasicaRecipe: Recipe = loadRecipe('clasica');
export const clasicaCooklang: string = getRecipeCooklang('clasica');
export const recipe: Recipe = clasicaRecipe;
