/**
 * FILE: index.ts
 *
 * PURPOSE:
 * Master export and catalog for all recipe definitions.
 *
 * RESPONSIBILITY:
 * - Collects all available recipes into a typed RecipeList.
 * - Provides a single entry point for accessing recipes.
 * - New recipes only need to be added here to appear in the catalog.
 */

import type { RecipeList } from '../../../types/Recipe'

import { concebollaRecipe } from './concebolla';
import { clasicaRecipe } from './clasica';
import { conpimientosRecipe } from './conpimientos';

export const recipes: RecipeList = [
  concebollaRecipe,
  clasicaRecipe,
  conpimientosRecipe,
];

export const sincebollaRecipe = clasicaRecipe;

export {
  concebollaRecipe,
  clasicaRecipe,
  conpimientosRecipe,
};