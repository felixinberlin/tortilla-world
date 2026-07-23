import { describe, expect, it } from 'vitest';
import { recipes, concebollaRecipe, sincebollaRecipe } from './index';
import { ingredients as ingredientCatalog } from '../ingredients';
import type { RecipeList } from '../../../types/RecipeList';

describe('Recipe Catalog', () => {
  it('exports a valid RecipeList array', () => {
    const list: RecipeList = recipes;
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThanOrEqual(2);
  });

  it('contains concebolla and sincebolla recipes', () => {
    const ids = recipes.map((r) => r.id);
    expect(ids).toContain('concebolla');
    expect(ids).toContain('sincebolla');
  });

  it('validates that every recipe has required properties', () => {
    recipes.forEach((recipe) => {
      expect(recipe.id).toBeTruthy();
      expect(recipe.name).toBeTruthy();
      expect(Array.isArray(recipe.ingredients)).toBe(true);
      expect(recipe.ingredients.length).toBeGreaterThan(0);
    });
  });

  it('ensures all recipe ingredients refer to valid catalog ingredients', () => {
    const catalogIds = ingredientCatalog.map((i) => i.id);

    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((req) => {
        expect(req.id).toBeTruthy();
        expect(req.ingredientId).toBeTruthy();
        expect(catalogIds).toContain(req.ingredientId);
        expect(req.amount).toBeGreaterThan(0);
        expect(req.unit).toBeTruthy();
      });
    });
  });

  it('distinguishes concebolla (with onion) and sincebolla (without onion)', () => {
    const concebollaOnion = concebollaRecipe.ingredients.find((i) => i.ingredientId === 'onion');
    const sincebollaOnion = sincebollaRecipe.ingredients.find((i) => i.ingredientId === 'onion');

    expect(concebollaOnion).toBeDefined();
    expect(sincebollaOnion).toBeUndefined();
  });
});
