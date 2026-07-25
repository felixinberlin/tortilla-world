/**
 * FILE: Requirement.ts
 *
 * PURPOSE:
 * Defines entity requirement usage inside recipes.
 *
 * RESPONSIBILITY:
 * - Stores required entity information, quantity, and unit.
 */

export interface Requirement {
  id?: string;
  entityId: string;
  amount: number;
  unit: string;
  name?: string;
}

export interface RequirementDictItem {
  entityId?: string;
  ingredientId?: string; // Legacy fallback
  amount: number;
  unit: string;
  name?: string;
}
