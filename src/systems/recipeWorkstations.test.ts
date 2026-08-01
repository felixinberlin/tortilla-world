/**
 * FILE: recipeWorkstations.test.ts
 *
 * PURPOSE:
 * Unit tests for recipe workstation resolution and container filtering.
 */

import { describe, expect, it } from 'vitest';
import { getRecipeWorkstationIds } from './recipeWorkstations';
import { clasicaRecipe, concebollaRecipe, francesaRecipe } from '../data/catalog/recipes';
import { defaultContainers } from '../store/defaults';
import { worldStore } from '../store/worldStore';
import type { Recipe } from '../types/Recipe';

describe('Recipe Workstations Filtering', () => {
  it('does NOT include burner2 (Fuego 2) for clasica recipe', () => {
    const workstationIds = getRecipeWorkstationIds(clasicaRecipe);

    expect(workstationIds.has('burner1')).toBe(true);
    expect(workstationIds.has('burner2')).toBe(false);
  });

  it('does NOT include sink or board for francesa recipe', () => {
    const workstationIds = getRecipeWorkstationIds(francesaRecipe);

    expect(workstationIds.has('sink')).toBe(false);
    expect(workstationIds.has('board')).toBe(false);
    expect(workstationIds.has('bowl')).toBe(true);
    expect(workstationIds.has('burner1')).toBe(true);
    expect(workstationIds.has('plate')).toBe(true);
  });

  it('includes burner1 and burner2 for concebolla recipe', () => {
    const workstationIds = getRecipeWorkstationIds(concebollaRecipe);

    expect(workstationIds.has('sink')).toBe(true);
    expect(workstationIds.has('board')).toBe(true);
    expect(workstationIds.has('bowl')).toBe(true);
    expect(workstationIds.has('burner1')).toBe(true);
    expect(workstationIds.has('burner2')).toBe(true);
    expect(workstationIds.has('plate')).toBe(true);
  });

  it('includes plate (plato) for clasica and concebolla recipes', () => {
    const clasicaWorkstations = getRecipeWorkstationIds(clasicaRecipe);
    const concebollaWorkstations = getRecipeWorkstationIds(concebollaRecipe);

    expect(clasicaWorkstations.has('plate')).toBe(true);
    expect(concebollaWorkstations.has('plate')).toBe(true);
  });

  it('includes sink when a recipe step uses clean action', () => {
    const recipeWithClean: Recipe = {
      id: 'test_clean_recipe',
      name: 'Clean Recipe Test',
      requirements: [],
      steps: [
        { action: 'clean', target: 'pan', containerId: 'sink' },
      ],
    };

    const workstations = getRecipeWorkstationIds(recipeWithClean);
    expect(workstations.has('sink')).toBe(true);
  });

  it('ensures default container state for burner2 is off and empty', () => {
    expect(defaultContainers.burner2.isOn).toBe(false);
    expect(defaultContainers.burner2.entityIds.length).toBe(0);
  });

  it('resets kitchen world state back to initial state on resetWorld', () => {
    const store = worldStore.getState();

    // Modify world state
    store.dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: { id: 'temp_potato', name: 'Temp Potato', type: 'ingredient', state: {} },
        containerId: 'board',
      },
    });

    expect(worldStore.getState().containers.board.entityIds).toContain('temp_potato');

    // Reset world state before playing or changing recipes
    store.resetWorld();

    expect(worldStore.getState().containers.board.entityIds).not.toContain('temp_potato');
    expect(worldStore.getState().containers.burner2.entityIds.length).toBe(0);
  });
});
