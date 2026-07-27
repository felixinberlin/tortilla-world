/**
 * FILE: recipeLoader.test.ts
 *
 * PURPOSE:
 * Comprehensive unit tests for RecipeLoader and RecipeValidator.
 */

import { describe, it, expect } from 'vitest';
import {
  loadRecipe,
  loadAllRecipes,
  getAvailableRecipeIds,
  getRecipeCooklang,
} from './recipeLoader';
import { validateRecipeJSON } from './recipeValidator';
import { getRecipeRequirementsArray } from '../types/Recipe';

describe('RecipeValidator', () => {
  it('passes validation for valid recipe JSON', () => {
    const validJSON = {
      id: 'test_recipe',
      name: 'Test Recipe',
      requirements: {
        potato: { entityId: 'potato', amount: 1, unit: 'pcs' },
      },
      steps: [
        { action: 'prepare', target: 'potato', preparation: 'peeled' },
        { action: 'celebrate' },
      ],
    };

    const validated = validateRecipeJSON(validJSON);
    expect(validated.id).toBe('test_recipe');
    expect(validated.name).toBe('Test Recipe');
  });

  it('throws error if input is not an object', () => {
    expect(() => validateRecipeJSON(null)).toThrow('expected a non-null JSON object');
    expect(() => validateRecipeJSON('invalid')).toThrow('expected a non-null JSON object');
  });

  it('throws error if "id" is missing or empty', () => {
    expect(() => validateRecipeJSON({ name: 'Test', steps: [], requirements: {} })).toThrow('"id" must be a non-empty string');
    expect(() => validateRecipeJSON({ id: '   ', name: 'Test', steps: [], requirements: {} })).toThrow('"id" must be a non-empty string');
  });

  it('throws error if "name" is missing or empty', () => {
    expect(() => validateRecipeJSON({ id: 'r1', name: '', steps: [], requirements: {} })).toThrow('"name" must be a non-empty string');
  });

  it('throws error if "requirements" and "ingredients" are missing', () => {
    expect(() => validateRecipeJSON({ id: 'r1', name: 'R1', steps: [{ action: 'celebrate' }] })).toThrow('must declare "requirements" or "ingredients"');
  });

  it('throws error if "steps" is empty or not an array', () => {
    expect(() => validateRecipeJSON({ id: 'r1', name: 'R1', requirements: {}, steps: [] })).toThrow('"steps" must be a non-empty array');
  });

  it('throws error if step action is invalid', () => {
    const invalidStepJSON = {
      id: 'r1',
      name: 'R1',
      requirements: { potato: { amount: 1, unit: 'pcs' } },
      steps: [{ action: 'invalid_action_type' }],
    };
    expect(() => validateRecipeJSON(invalidStepJSON)).toThrow('invalid or missing action');
  });
});

describe('RecipeLoader', () => {
  it('loads clasica recipe by ID correctly', () => {
    const recipe = loadRecipe('clasica');
    expect(recipe.id).toBe('clasica');
    expect(recipe.name).toBe('Clásica');
    expect(recipe.steps.length).toBeGreaterThan(0);

    const reqs = getRecipeRequirementsArray(recipe);
    expect(reqs.length).toBeGreaterThan(0);
    expect(reqs.some((r) => r.entityId === 'potato')).toBe(true);
  });

  it('loads concebolla recipe by ID correctly', () => {
    const recipe = loadRecipe('concebolla');
    expect(recipe.id).toBe('concebolla');
    expect(recipe.name).toBe('Tortilla con Cebolla');

    const reqs = getRecipeRequirementsArray(recipe);
    expect(reqs.some((r) => r.entityId === 'onion')).toBe(true);
  });

  it('loads all recipes using loadAllRecipes', () => {
    const all = loadAllRecipes();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBe(2);
    expect(all.map((r) => r.id)).toEqual(['concebolla', 'clasica']);
  });

  it('returns available recipe IDs', () => {
    const ids = getAvailableRecipeIds();
    expect(ids).toContain('concebolla');
    expect(ids).toContain('clasica');
  });

  it('retrieves cooklang string for valid recipe ID', () => {
    const clasicaCooklang = getRecipeCooklang('clasica');
    expect(clasicaCooklang).toContain('Peel the @potatoes');

    const concebollaCooklang = getRecipeCooklang('concebolla');
    expect(concebollaCooklang).toContain('Dice the @onions');
  });

  it('throws an error when attempting to load an unknown recipe ID', () => {
    expect(() => loadRecipe('non_existent_recipe')).toThrow('Unknown recipe ID');
  });
});
