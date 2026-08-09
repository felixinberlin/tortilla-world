/**
 * FILE: pantry.ts
 *
 * PURPOSE:
 * Contracts for Pantry Kits (initial ingredient/resource sets).
 *
 * RESPONSIBILITY:
 * - Defines initial pantry item requirements (catalog ID, quantity, initial state).
 * - Defines preset pantry kit configurations to decouple initial inventory from recipes.
 */

export interface PantryItemRequirement {
  catalogId: string;
  quantity: number;
  initialState?: Record<string, unknown>;
  name?: string;
  icon?: string;
}

export interface PantryKit {
  id: string;
  name: string;
  description?: string;
  items: PantryItemRequirement[];
}
