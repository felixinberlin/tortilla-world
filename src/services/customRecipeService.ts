/**
 * FILE: src/services/customRecipeService.ts
 *
 * PURPOSE:
 * Storage and management service for custom user recipes.
 * Handles persistence to localStorage and Firestore dbService,
 * ensuring custom recipes appear in RecipePlayer selector, Cookbook, and Database hub.
 */

import type { Recipe } from '../types/Recipe';
import { saveRecipeToDb, fetchAllRecipesFromDb, type SavedRecipe } from './dbService';
import { translateHumanActionsToRecipe } from '../systems/recipeTranslator';
import type { RecordedAction } from '../types/recording';

const LOCAL_STORAGE_KEY = 'tortilla_custom_recipes_v1';

export interface CustomRecipeMetadata {
  id?: string;
  name: string;
  description: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
  hints?: string[];
  author?: string;
  baseRecipeId?: string;
}

/**
 * Loads custom recipes stored in localStorage.
 */
export function getStoredCustomRecipes(): Recipe[] {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return [];
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.warn('Failed to parse custom recipes from localStorage:', err);
    return [];
  }
}

/**
 * Saves a list of custom recipes to localStorage.
 */
export function setStoredCustomRecipes(recipesList: Recipe[]): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipesList));
  } catch (err) {
    console.warn('Failed to store custom recipes in localStorage:', err);
  }
}

/**
 * Creates and persists a custom recipe from recorded actions and metadata (inspired by francesa.json).
 */
export async function saveCustomRecipe(
  recordedActions: RecordedAction[],
  metadata: CustomRecipeMetadata
): Promise<Recipe> {
  const recipeId = metadata.id || `custom_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const recipeName = metadata.name.trim() || 'Custom Tortilla';

  // Translate recorded actions into a declarative Recipe object
  const translated = translateHumanActionsToRecipe(recordedActions, {
    recipeId,
    recipeName,
  });

  const fullRecipe: Recipe = {
    ...translated,
    id: recipeId,
    name: recipeName,
  };

  // Attach metadata inspired by francesa.json
  const recipeRec = fullRecipe as unknown as Record<string, unknown>;
  recipeRec.description = metadata.description.trim() || 'Receta personalizada de Tortilla.';
  recipeRec.difficulty = metadata.difficulty || 'easy';
  recipeRec.tags = metadata.tags && metadata.tags.length > 0
    ? metadata.tags
    : ['custom', 'spanish', 'traditional', 'francesa'];
  recipeRec.hints = metadata.hints && metadata.hints.length > 0
    ? metadata.hints
    : ['Disfrutar caliente y servir con cariño.'];
  recipeRec.author = metadata.author?.trim() || 'Chef Tortilla';

  // 1. Save to local storage
  const existing = getStoredCustomRecipes();
  const updatedList = [fullRecipe, ...existing.filter((r) => r.id !== recipeId)];
  setStoredCustomRecipes(updatedList);

  // 2. Save to dbService (Firestore / fallback)
  try {
    const ingredientsArr = Object.keys(fullRecipe.requirements || {});
    await saveRecipeToDb({
      id: recipeId,
      title: recipeName,
      description: recipeRec.description as string,
      author: recipeRec.author as string,
      ingredients: ingredientsArr.length > 0 ? ingredientsArr : ['egg', 'potato'],
      tags: recipeRec.tags as string[],
      hasMascotSupport: true,
      formats: {
        recipeJson: recipeRec,
        mascotSequence: recordedActions as unknown as Array<Record<string, unknown>>,
      },
    });
  } catch (err) {
    console.warn('Failed to save custom recipe to dbService:', err);
  }

  // 3. Dispatch global custom event for live updates across UI
  window.dispatchEvent(new CustomEvent('custom-recipe-saved', { detail: fullRecipe }));

  return fullRecipe;
}

/**
 * Loads all custom recipes combined from localStorage and Firestore.
 */
export async function loadAllCustomRecipes(): Promise<Recipe[]> {
  const local = getStoredCustomRecipes();
  try {
    const dbRecipes: SavedRecipe[] = await fetchAllRecipesFromDb();
    const parsedDb: Recipe[] = dbRecipes.map((saved) => {
      if (saved.formats?.recipeJson && typeof saved.formats.recipeJson === 'object') {
        const rJson = saved.formats.recipeJson as unknown as Recipe;
        return {
          ...rJson,
          id: saved.id,
          name: saved.title || rJson.name || 'Saved Recipe',
        };
      }
      return translateHumanActionsToRecipe(
        (saved.formats?.mascotSequence || []) as unknown as RecordedAction[],
        {
          recipeId: saved.id,
          recipeName: saved.title || 'Saved Recipe',
        }
      );
    });

    const map = new Map<string, Recipe>();
    for (const r of local) map.set(r.id, r);
    for (const r of parsedDb) {
      if (!map.has(r.id)) map.set(r.id, r);
    }

    return Array.from(map.values());
  } catch {
    return local;
  }
}
