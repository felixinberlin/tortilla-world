/**
 * FILE: index.ts
 *
 * PURPOSE:
 * Master export and catalog for all recipe definitions.
 *
 * RESPONSIBILITY:
 * - Collects all available JSON recipes dynamically via loadAllRecipes.
 * - Provides a single entry point for accessing recipes.
 */

import type { RecipeList, Recipe } from '../../../types/Recipe';
import { loadAllRecipes, loadRecipe } from '../../../systems/recipeLoader';

export const concebollaRecipe: Recipe = loadRecipe('concebolla');
export const clasicaRecipe: Recipe = loadRecipe('clasica');
export const sincebollaRecipe: Recipe = clasicaRecipe;

/**
 * Master recipe catalog.
 * Loaded dynamically from decoupled JSON recipe definitions.
 */
export const recipes: RecipeList = loadAllRecipes();
