import { describe, expect, it } from 'vitest';
import { recipes, concebollaRecipe, clasicaRecipe } from './index';
import { ingredients as ingredientCatalog } from '../ingredients';
import type { RecipeList } from '../../../types/Recipe';
import { getRecipeRequirementsArray } from '../../../types/Recipe';

describe('Recipe Catalog', () => {
  it('exports a valid RecipeList array', () => {
    const list: RecipeList = recipes;
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThanOrEqual(2);
  });

  it('contains concebolla and clasica recipes', () => {
    const ids = recipes.map((r) => r.id);
    expect(ids).toContain('concebolla');
    expect(ids).toContain('clasica');
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

  it('distinguishes concebolla (with onion) and clasica (without onion)', () => {
    const concebollaOnion = getRecipeRequirementsArray(concebollaRecipe).find((i) => i.entityId === 'onion');
    const clasicaOnion = getRecipeRequirementsArray(clasicaRecipe).find((i) => i.entityId === 'onion');

    expect(concebollaOnion).toBeDefined();
    expect(clasicaOnion).toBeUndefined();
  });

it('you can use the small pan', () => {
    const step = {
      action: 'cook',
      target: 'potatoes',
      method: 'fry',
      cooking_area: 'cooking_area_sarten',
    };

    const cooking_area_sarten = {
      id: 'cooking_area_sarten',
      name: 'Sartén (Skillet)',
      type: 'pan',
      entityIds: [],
      rules: { maxCapacity: 5, allowedTypes: ['ingredient', 'tool'] },
    };

    expect(step.cooking_area).toBe(cooking_area_sarten.id);
    expect(cooking_area_sarten.type).toBe('pan');
  });
  it('you can use the big pan', () => {
    const step = {
      action: 'cook',
      target: 'potatoes',
      method: 'fry',
      cooking_area: 'cooking_area_sarten_grande',
    };

    const cooking_area_sarten_grande = {
      id: 'cooking_area_sarten_grande',
      name: 'Sartén (Skillet)',
      type: 'pan',
      entityIds: [],
      rules: { maxCapacity: 5, allowedTypes: ['ingredient', 'tool'] },
    };

    expect(step.cooking_area).toBe(cooking_area_sarten_grande.id);
    expect(cooking_area_sarten_grande.type).toBe('pan');
  });

  it('concebolla uses the small pan', () => {
    const step = {
      action: 'cook',
      target: 'oil',
      method: 'heat',
      cooking_area: 'cooking_area_sarten',
    };

    const cooking_area_sarten = {
      id: 'cooking_area_sarten',
      name: 'Sartén (Skillet)',
      type: 'pan',
      entityIds: [],
      rules: { maxCapacity: 5, allowedTypes: ['ingredient', 'tool'] },
    };

    const concebollasteps = concebollaRecipe.steps;

    expect(concebollasteps).toContainEqual(step);
    expect(step.cooking_area).toBe(cooking_area_sarten.id);
    expect(cooking_area_sarten.type).toBe('pan');
  });
  it('concebolla uses both pans', () => {
    const stepLarge = {
      action: 'cook',
      target: 'oil',
      method: 'heat',
      cooking_area: 'cooking_area_sarten_grande',
    };

    const stepSmall = {
      action: 'cook',
      target: 'oil',
      method: 'heat',
      cooking_area: 'cooking_area_sarten',
    };

    const cooking_area_sarten_grande = {
      id: 'cooking_area_sarten_grande',
      name: 'Sartén (Skillet)',
      type: 'pan',
      entityIds: [],
      rules: { maxCapacity: 5, allowedTypes: ['ingredient', 'tool'] },
    };

    const cooking_area_sarten = {
      id: 'cooking_area_sarten',
      name: 'Sartén (Skillet)',
      type: 'pan',
      entityIds: [],
      rules: { maxCapacity: 5, allowedTypes: ['ingredient', 'tool'] },
    };

    const concebollasteps = concebollaRecipe.steps;

    expect(concebollasteps).toContainEqual(stepLarge);
    expect(concebollasteps).toContainEqual(stepSmall);
    
    expect(stepLarge.cooking_area).toBe(cooking_area_sarten_grande.id);
    expect(cooking_area_sarten_grande.type).toBe('pan');

    expect(stepSmall.cooking_area).toBe(cooking_area_sarten.id);
    expect(cooking_area_sarten.type).toBe('pan');
  });
});
