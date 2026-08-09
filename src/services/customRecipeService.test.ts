/**
 * FILE: src/services/customRecipeService.test.ts
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getStoredCustomRecipes,
  setStoredCustomRecipes,
  saveCustomRecipe,
  loadAllCustomRecipes,
} from './customRecipeService';
import type { RecordedAction } from '../types/recording';

describe('customRecipeService', () => {
  let store: Record<string, string> = {};

  beforeEach(() => {
    store = {};
    const mockLocalStorage = {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
      clear: vi.fn(() => {
        store = {};
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key];
      }),
    };

    vi.stubGlobal('window', {
      localStorage: mockLocalStorage,
      dispatchEvent: vi.fn(),
      location: { search: '', href: 'http://localhost' },
    });

    vi.restoreAllMocks();
  });

  it('retrieves empty array when no custom recipes exist', () => {
    expect(getStoredCustomRecipes()).toEqual([]);
  });

  it('saves and loads custom recipes to/from localStorage', () => {
    const dummyRecipe = {
      id: 'test_1',
      name: 'Test Recipe',
      requirements: {},
      steps: [],
    };
    setStoredCustomRecipes([dummyRecipe]);

    const loaded = getStoredCustomRecipes();
    expect(loaded).toHaveLength(1);
    expect(loaded[0].name).toBe('Test Recipe');
  });

  it('saves custom recipe with metadata inspired by francesa', async () => {
    const mockActions: RecordedAction[] = [
      {
        type: 'MOVE_ENTITY',
        payload: { entityId: 'egg', targetContainerId: 'bowl' },
        timestampMs: 100,
      },
      {
        type: 'PREPARE_INGREDIENT',
        payload: { entityId: 'egg', preparation: 'beaten' },
        timestampMs: 500,
      },
    ];

    const metadata = {
      name: 'Tortilla Francesa de la Casa',
      description: 'Mi versión rápida de tortilla francesa con huevos de corral.',
      difficulty: 'easy' as const,
      tags: ['traditional', 'spanish', 'french', 'custom'],
      hints: ['Batir bien antes de verter.'],
      author: 'Chef Felix',
    };

    const recipe = await saveCustomRecipe(mockActions, metadata);

    const recObj = recipe as unknown as Record<string, unknown>;
    expect(recipe.name).toBe('Tortilla Francesa de la Casa');
    expect(recObj.description).toBe('Mi versión rápida de tortilla francesa con huevos de corral.');
    expect(recObj.difficulty).toBe('easy');
    expect(recObj.tags).toContain('french');
    expect(recObj.hints).toContain('Batir bien antes de verter.');

    const stored = getStoredCustomRecipes();
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe(recipe.id);
  });

  it('combines local storage and database recipes in loadAllCustomRecipes', async () => {
    const dummyRecipe = {
      id: 'local_1',
      name: 'Local Recipe',
      requirements: {},
      steps: [],
    };
    setStoredCustomRecipes([dummyRecipe]);

    const all = await loadAllCustomRecipes();
    expect(all.some((r) => r.id === 'local_1')).toBe(true);
  });
});
