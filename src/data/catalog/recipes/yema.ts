/**
 * FILE: yema.ts
 *
 * PURPOSE:
 * Recipe export for Tortilla de Yema (Omelette with extra egg yolk).
 *
 * RESPONSIBILITY:
 * - Loaded dynamically from yema.json via loadRecipe.
 * - Re-exports yemaRecipe and yemaCooklang for backward compatibility.
 */

import { loadRecipe, getRecipeCooklang } from '../../../systems/recipeLoader';
import type { Recipe } from '../../../types/Recipe';

export const yemaRecipe: Recipe = loadRecipe('yema');
export const yemaCooklang: string = getRecipeCooklang('yema');
export const recipe: Recipe = yemaRecipe;
