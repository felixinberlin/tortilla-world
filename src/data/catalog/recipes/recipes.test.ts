import { describe, expect, it } from 'vitest';
import { recipes, concebollaRecipe, clasicaRecipe, francesaRecipe, yemaRecipe } from './index';
import { ingredients as ingredientCatalog } from '../ingredients';
import type { RecipeList } from '../../../types/Recipe';
import { getRecipeRequirementsArray } from '../../../types/Recipe';

describe('Recipe Catalog', () => {
  it('exports a valid RecipeList array', () => {
    const list: RecipeList = recipes;
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThanOrEqual(4);
  });

  it('contains concebolla, clasica, francesa, and yema recipes', () => {
    const ids = recipes.map((r) => r.id);
    expect(ids).toContain('concebolla');
    expect(ids).toContain('clasica');
    expect(ids).toContain('francesa');
    expect(ids).toContain('yema');
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

  it('distinguishes concebolla (with onion), clasica, francesa, and yema', () => {
    const concebollaOnion = getRecipeRequirementsArray(concebollaRecipe).find((i) => i.entityId === 'onion');
    const clasicaOnion = getRecipeRequirementsArray(clasicaRecipe).find((i) => i.entityId === 'onion');
    const francesaPotato = getRecipeRequirementsArray(francesaRecipe).find((i) => i.entityId === 'potato');
    const yemaEggReqs = getRecipeRequirementsArray(yemaRecipe).filter((i) => i.entityId === 'egg');

    expect(concebollaOnion).toBeDefined();
    expect(clasicaOnion).toBeUndefined();
    expect(francesaPotato).toBeUndefined();
    expect(francesaRecipe.id).toBe('francesa');
    expect(yemaEggReqs.length).toBeGreaterThanOrEqual(1);
    expect(yemaRecipe.id).toBe('yema');
  });
});
