/**
 * FILE: src/services/dbService.ts
 *
 * PURPOSE:
 * Firestore database service for Recipes, Kitchen Tools, Ingredients, and Kitchen Configurations.
 * Supports multi-format recipe persistence, ingredient indexing, and search filters.
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { catalogTools } from '../data/catalog/tools';
import { ingredients as catalogIngredients } from '../data/catalog/ingredients';
import { KITCHEN_WORKSTATIONS } from '../data/catalog/workstations';

export interface SavedRecipeFormats {
  mascotSequence?: Array<Record<string, unknown>>;
  recipeJson?: Record<string, unknown>;
  fullSessionLog?: Record<string, unknown>;
}

export interface SavedRecipe {
  id: string;
  title: string;
  description: string;
  author: string;
  ingredients: string[]; // Normalized array of ingredient IDs for search index (e.g. ['egg', 'garlic', 'potato'])
  tags: string[];
  hasMascotSupport: boolean;
  formats: SavedRecipeFormats;
  createdAt: string;
  updatedAt: string;
}

export interface SavedTool {
  id: string;
  name: string;
  icon: string;
  category: string;
  description?: string;
}

export interface SavedIngredient {
  id: string;
  name: string;
  icon: string;
  category?: string;
}

export interface SavedKitchenConfig {
  id: string;
  name: string;
  workstations: Array<Record<string, unknown>>;
  isDefault: boolean;
  createdAt?: string;
}

const RECIPES_COLLECTION = 'recipes';
const TOOLS_COLLECTION = 'kitchen_tools';
const INGREDIENTS_COLLECTION = 'ingredients';
const CONFIGS_COLLECTION = 'kitchen_configs';

/**
 * Normalizes string or array of ingredients into lowercase ID array for searching
 */
export function normalizeIngredientIds(rawIngredients: Array<string | { id?: string; entityId?: string; ingredientId?: string }>): string[] {
  const set = new Set<string>();
  for (const item of rawIngredients) {
    if (typeof item === 'string') {
      const clean = item.trim().toLowerCase();
      if (clean) set.add(clean);
    } else if (item && typeof item === 'object') {
      const key = item.entityId || item.ingredientId || item.id || '';
      if (key) set.add(key.trim().toLowerCase());
    }
  }
  return Array.from(set);
}

/**
 * Helper to recursively remove undefined values from objects/arrays before sending to Firestore
 */
export function sanitizeForFirestore<T>(data: T): T {
  if (data === undefined) {
    return null as unknown as T;
  }
  if (data === null || typeof data !== 'object') {
    return data;
  }
  if (Array.isArray(data)) {
    return data
      .filter((item) => item !== undefined)
      .map((item) => sanitizeForFirestore(item)) as unknown as T;
  }
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (value !== undefined) {
      result[key] = sanitizeForFirestore(value);
    }
  }
  return result as T;
}

// ==========================================
// RECIPES DB OPERATIONS
// ==========================================

export async function saveRecipeToDb(
  recipeData: Omit<SavedRecipe, 'createdAt' | 'updatedAt' | 'id'> & { id?: string }
): Promise<SavedRecipe> {
  const id = recipeData.id || `recipe_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  const normalizedIngredients = normalizeIngredientIds(recipeData.ingredients);

  const newRecipe: SavedRecipe = {
    ...recipeData,
    id,
    ingredients: normalizedIngredients,
    tags: recipeData.tags || ['custom'],
    hasMascotSupport: recipeData.hasMascotSupport ?? true,
    author: recipeData.author || 'Anonymous Chef',
    createdAt: now,
    updatedAt: now,
  };

  const sanitized = sanitizeForFirestore(newRecipe);
  const docRef = doc(db, RECIPES_COLLECTION, id);
  await setDoc(docRef, sanitized, { merge: true });

  return newRecipe;
}

export async function fetchAllRecipesFromDb(): Promise<SavedRecipe[]> {
  try {
    const colRef = collection(db, RECIPES_COLLECTION);
    const snapshot = await getDocs(colRef);
    const recipes: SavedRecipe[] = [];
    snapshot.forEach((d) => {
      recipes.push(d.data() as SavedRecipe);
    });
    // Sort client-side by updatedAt desc
    return recipes.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
  } catch (err) {
    console.warn('Failed to fetch recipes from Firestore:', err);
    return [];
  }
}

export async function fetchRecipeByIdFromDb(id: string): Promise<SavedRecipe | null> {
  try {
    const docRef = doc(db, RECIPES_COLLECTION, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data() as SavedRecipe;
    }
    return null;
  } catch (err) {
    console.warn(`Failed to fetch recipe ${id}:`, err);
    return null;
  }
}

export async function deleteRecipeFromDb(id: string): Promise<boolean> {
  try {
    const docRef = doc(db, RECIPES_COLLECTION, id);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.warn(`Failed to delete recipe ${id}:`, err);
    return false;
  }
}

/**
 * Searches recipes by ingredient IDs (e.g. ['garlic', 'egg']), tag, text match, or mascot support.
 */
export async function searchRecipesInDb(options: {
  ingredientQuery?: string[]; // e.g. ['garlic', 'egg']
  tag?: string;
  hasMascotSupport?: boolean;
  searchTerm?: string;
}): Promise<SavedRecipe[]> {
  const allRecipes = await fetchAllRecipesFromDb();

  return allRecipes.filter((recipe) => {
    // Ingredient Search matching
    if (options.ingredientQuery && options.ingredientQuery.length > 0) {
      const recipeIngs = recipe.ingredients || [];
      const matchesAll = options.ingredientQuery.every((ing) =>
        recipeIngs.some((ri) => ri.toLowerCase().includes(ing.toLowerCase()))
      );
      if (!matchesAll) return false;
    }

    // Mascot support filter
    if (options.hasMascotSupport !== undefined) {
      if (recipe.hasMascotSupport !== options.hasMascotSupport) return false;
    }

    // Tag filter
    if (options.tag) {
      const hasTag = recipe.tags?.some((t) => t.toLowerCase() === options.tag?.toLowerCase());
      if (!hasTag) return false;
    }

    // Search term in title/description
    if (options.searchTerm) {
      const term = options.searchTerm.toLowerCase();
      const inTitle = recipe.title?.toLowerCase().includes(term);
      const inDesc = recipe.description?.toLowerCase().includes(term);
      const inTag = recipe.tags?.some((t) => t.toLowerCase().includes(term));
      const inIng = recipe.ingredients?.some((i) => i.toLowerCase().includes(term));
      if (!inTitle && !inDesc && !inTag && !inIng) return false;
    }

    return true;
  });
}

// ==========================================
// KITCHEN TOOLS DB OPERATIONS
// ==========================================

export async function fetchKitchenToolsFromDb(): Promise<SavedTool[]> {
  try {
    const colRef = collection(db, TOOLS_COLLECTION);
    const snapshot = await getDocs(colRef);
    const tools: SavedTool[] = [];
    snapshot.forEach((d) => tools.push(d.data() as SavedTool));
    if (tools.length === 0) {
      return seedDefaultToolsInDb();
    }
    return tools;
  } catch (err) {
    console.warn('Failed to fetch tools:', err);
    return catalogTools;
  }
}

export async function seedDefaultToolsInDb(): Promise<SavedTool[]> {
  const seeded: SavedTool[] = catalogTools.map((t) => ({
    id: t.id,
    name: t.name,
    icon: t.icon,
    category: t.category,
  }));

  for (const tool of seeded) {
    const docRef = doc(db, TOOLS_COLLECTION, tool.id);
    await setDoc(docRef, sanitizeForFirestore(tool), { merge: true });
  }

  return seeded;
}

// ==========================================
// INGREDIENTS DB OPERATIONS
// ==========================================

export async function fetchIngredientsFromDb(): Promise<SavedIngredient[]> {
  try {
    const colRef = collection(db, INGREDIENTS_COLLECTION);
    const snapshot = await getDocs(colRef);
    const list: SavedIngredient[] = [];
    snapshot.forEach((d) => list.push(d.data() as SavedIngredient));
    if (list.length === 0) {
      return seedDefaultIngredientsInDb();
    }
    return list;
  } catch (err) {
    console.warn('Failed to fetch ingredients:', err);
    return catalogIngredients;
  }
}

export async function seedDefaultIngredientsInDb(): Promise<SavedIngredient[]> {
  const seeded: SavedIngredient[] = catalogIngredients.map((i) => ({
    id: i.id,
    name: i.name,
    icon: i.icon,
    category: 'pantry',
  }));

  for (const ing of seeded) {
    const docRef = doc(db, INGREDIENTS_COLLECTION, ing.id);
    await setDoc(docRef, sanitizeForFirestore(ing), { merge: true });
  }

  return seeded;
}

// ==========================================
// KITCHEN CONFIGURATIONS DB OPERATIONS
// ==========================================

export async function fetchKitchenConfigsFromDb(): Promise<SavedKitchenConfig[]> {
  try {
    const colRef = collection(db, CONFIGS_COLLECTION);
    const snapshot = await getDocs(colRef);
    const configs: SavedKitchenConfig[] = [];
    snapshot.forEach((d) => configs.push(d.data() as SavedKitchenConfig));
    if (configs.length === 0) {
      return [await seedDefaultKitchenConfigInDb()];
    }
    return configs;
  } catch (err) {
    console.warn('Failed to fetch kitchen configs:', err);
    return [];
  }
}

export async function seedDefaultKitchenConfigInDb(): Promise<SavedKitchenConfig> {
  const defaultConfig: SavedKitchenConfig = {
    id: 'default_tortilla_kitchen',
    name: 'Standard Tortilla World Kitchen Layout',
    workstations: Object.values(KITCHEN_WORKSTATIONS) as unknown as Array<Record<string, unknown>>,
    isDefault: true,
    createdAt: new Date().toISOString(),
  };

  const docRef = doc(db, CONFIGS_COLLECTION, defaultConfig.id);
  await setDoc(docRef, sanitizeForFirestore(defaultConfig), { merge: true });

  return defaultConfig;
}

// ==========================================
// SEED DEFAULT STARTER RECIPES IN DB
// ==========================================

export async function seedDefaultRecipesInDb(): Promise<SavedRecipe[]> {
  const defaultRecipes: Array<Omit<SavedRecipe, 'createdAt' | 'updatedAt'>> = [
    {
      id: 'clasica_tortilla_db',
      title: 'Classic Spanish Tortilla de Patatas',
      description: 'The authentic Spanish potato & egg omelette recipe.',
      author: 'Ms. Tortilla',
      ingredients: ['potato', 'egg', 'onion', 'oil', 'salt'],
      tags: ['classic', 'spanish', 'tortilla', 'signature'],
      hasMascotSupport: true,
      formats: {
        recipeJson: {
          id: 'clasica_tortilla_db',
          name: 'Classic Spanish Tortilla de Patatas',
          requirements: {
            potato: { entityId: 'potato', name: 'Potato', amount: 3, unit: 'whole' },
            egg: { entityId: 'egg', name: 'Egg', amount: 4, unit: 'whole' },
            onion: { entityId: 'onion', name: 'Onion', amount: 1, unit: 'whole' },
            oil: { entityId: 'oil', name: 'Olive Oil', amount: 50, unit: 'ml' },
            salt: { entityId: 'salt', name: 'Salt', amount: 1, unit: 'pinch' },
          },
          steps: [
            { id: '1', action: 'peel', ingredient: 'potato', workstation: 'cutting_station', tool: 'peeler' },
            { id: '2', action: 'cut', ingredient: 'potato', workstation: 'cutting_station', tool: 'knife' },
            { id: '3', action: 'cut', ingredient: 'onion', workstation: 'cutting_station', tool: 'knife' },
            { id: '4', action: 'cook', ingredient: 'potato', workstation: 'cooking_station', tool: 'pan', heat: 'medium' },
            { id: '5', action: 'beat', ingredient: 'egg', workstation: 'preparation_station', tool: 'whisk' },
            { id: '6', action: 'mix', inputs: ['potato', 'egg', 'onion'], target: 'bowl', workstation: 'preparation_station' },
            { id: '7', action: 'cook', ingredient: 'mixture', workstation: 'cooking_station', tool: 'pan', heat: 'medium' },
            { id: '8', action: 'flip', ingredient: 'mixture', workstation: 'cooking_station' },
            { id: '9', action: 'serve', target: 'plate', workstation: 'serving_station' },
          ],
        },
      },
    },
    {
      id: 'garlic_egg_tortilla_db',
      title: 'Garlic & Egg Special Tortilla',
      description: 'Savoury garlic infused potato tortilla with extra fresh eggs.',
      author: 'Chef Anonymous',
      ingredients: ['garlic', 'egg', 'potato', 'oil', 'salt'],
      tags: ['garlic', 'savoury', 'quick', 'egg_rich'],
      hasMascotSupport: true,
      formats: {
        recipeJson: {
          id: 'garlic_egg_tortilla_db',
          name: 'Garlic & Egg Special Tortilla',
          requirements: {
            garlic: { entityId: 'garlic', name: 'Garlic', amount: 2, unit: 'cloves' },
            egg: { entityId: 'egg', name: 'Egg', amount: 5, unit: 'whole' },
            potato: { entityId: 'potato', name: 'Potato', amount: 2, unit: 'whole' },
            oil: { entityId: 'oil', name: 'Olive Oil', amount: 40, unit: 'ml' },
            salt: { entityId: 'salt', name: 'Salt', amount: 1, unit: 'pinch' },
          },
          steps: [
            { id: '1', action: 'cut', ingredient: 'garlic', workstation: 'cutting_station', tool: 'knife' },
            { id: '2', action: 'cut', ingredient: 'potato', workstation: 'cutting_station', tool: 'knife' },
            { id: '3', action: 'cook', ingredient: 'garlic', workstation: 'cooking_station', tool: 'pan', heat: 'medium' },
            { id: '4', action: 'beat', ingredient: 'egg', workstation: 'preparation_station', tool: 'whisk' },
            { id: '5', action: 'mix', inputs: ['garlic', 'egg', 'potato'], target: 'bowl', workstation: 'preparation_station' },
            { id: '6', action: 'cook', ingredient: 'mixture', workstation: 'cooking_station', tool: 'pan' },
            { id: '7', action: 'serve', target: 'plate', workstation: 'serving_station' },
          ],
        },
      },
    },
    {
      id: 'simple_scramble_no_mascot',
      title: 'Autonomous Quick Scrambled Eggs & Garlic',
      description: 'Fast egg scramble that runs autonomously without Ms. Tortilla Mascot.',
      author: 'Kitchen Automation',
      ingredients: ['egg', 'garlic', 'butter', 'salt'],
      tags: ['fast', 'breakfast', 'no_mascot', 'autonomous'],
      hasMascotSupport: false,
      formats: {
        recipeJson: {
          id: 'simple_scramble_no_mascot',
          name: 'Autonomous Quick Scrambled Eggs & Garlic',
          requirements: {
            egg: { entityId: 'egg', name: 'Egg', amount: 3, unit: 'whole' },
            garlic: { entityId: 'garlic', name: 'Garlic', amount: 1, unit: 'clove' },
            butter: { entityId: 'butter', name: 'Butter', amount: 10, unit: 'g' },
          },
          steps: [
            { id: '1', action: 'beat', ingredient: 'egg', workstation: 'preparation_station', tool: 'whisk' },
            { id: '2', action: 'cook', ingredient: 'egg', workstation: 'cooking_station', tool: 'pan' },
            { id: '3', action: 'serve', target: 'plate', workstation: 'serving_station' },
          ],
        },
      },
    },
  ];

  const savedList: SavedRecipe[] = [];
  for (const r of defaultRecipes) {
    const saved = await saveRecipeToDb(r);
    savedList.push(saved);
  }

  return savedList;
}
