import { describe, expect, it } from 'vitest';
import { recipes, concebollaRecipe, clasicaRecipe, francesaRecipe } from './index';
import { ingredients as ingredientCatalog } from '../ingredients';
import type { RecipeList } from '../../../types/Recipe';
import { getRecipeRequirementsArray } from '../../../types/Recipe';

describe('Recipe Catalog', () => {
  it('exports a valid RecipeList array', () => {
    const list: RecipeList = recipes;
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThanOrEqual(3);
  });

  it('contains concebolla, clasica and francesa recipes', () => {
    const ids = recipes.map((r) => r.id);
    expect(ids).toContain('concebolla');
    expect(ids).toContain('clasica');
    expect(ids).toContain('francesa');
  });

  it('validates that every recipe has required properties', () => {
    recipes.forEach((recipe) => {
      expect(recipe.id).toBeTruthy();
      expect(recipe.name).toBeTruthy();
      const requirements = getRecipeRequirementsArray(recipe);
      expect(Array.isArray(requirements)).toBe(true);
      expect(requirements.length).toBeGreaterThan(0);
    });
  });

  it('ensures all recipe requirements refer to valid catalog entities', () => {
    const catalogIds = ingredientCatalog.map((i) => i.id);

    recipes.forEach((recipe) => {
      const requirements = getRecipeRequirementsArray(recipe);
      requirements.forEach((req) => {
        expect(req.id).toBeTruthy();
        expect(req.entityId).toBeTruthy();
        expect(catalogIds).toContain(req.entityId);
        expect(req.amount).toBeGreaterThan(0);
        expect(req.unit).toBeTruthy();
      });
    });
  });

  it('distinguishes concebolla (with onion), clasica, and francesa (no potato/onion)', () => {
    const concebollaOnion = getRecipeRequirementsArray(concebollaRecipe).find((i) => i.entityId === 'onion');
    const clasicaOnion = getRecipeRequirementsArray(clasicaRecipe).find((i) => i.entityId === 'onion');
    const francesaPotato = getRecipeRequirementsArray(francesaRecipe).find((i) => i.entityId === 'potato');

    expect(concebollaOnion).toBeDefined();
    expect(clasicaOnion).toBeUndefined();
    expect(francesaPotato).toBeUndefined();
    expect(francesaRecipe.id).toBe('francesa');
  });
});
