/**
 * FILE: concebolla.ts
 *
 * PURPOSE:
 * Recipe export for Tortilla con cebolla.
 *
 * RESPONSIBILITY:
 * - Loaded dynamically from concebolla.json via loadRecipe.
 * - Re-exports concebollaRecipe and concebollaCooklang for backward compatibility.
 */

import { loadRecipe, getRecipeCooklang } from '../../../systems/recipeLoader';
import type { Recipe } from '../../../types/Recipe';

export const concebollaRecipe: Recipe = loadRecipe('concebolla');
export const concebollaCooklang: string = getRecipeCooklang('concebolla');
export const recipe: Recipe = concebollaRecipe;
