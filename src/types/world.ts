/**
 * FILE: world.ts
 *
 * PURPOSE:
 * Defines complete world state structures.
 *
 * RESPONSIBILITY:
 * - Describes the game world's data model.
 */

import type { WorldAction, WorldEvent } from './actions';
import type { PreparationStyle, CookingMethod } from './RecipeStep';
import type { BaseWorldEvent } from './WorldEvent';

export type EntityType = 'ingredient' | 'tool' | 'product' | 'mascot' | 'container' | string;
export type ContainerType = 'storage' | 'board' | 'plate' | 'trash' | 'bowl' | 'sink' | 'workstation' | 'burner';

export interface FlavorNote {
  sourceCatalogId: string; // e.g., 'garlic', 'rosemary', 'chili'
  intensity: number;       // 0.0 to 1.0 (or 0 to 100)
}

export interface EntityState {
  preparation?: PreparationStyle | string[] | string;
  cooking?: CookingMethod | string[] | string;
  doneness?: string;
  temperature?: number;

  // Property Transfer Extensions:
  flavorProfile?: FlavorNote[];
  remainingFlavor?: number; // Default 1.0; decreases as flavor transfers out

  status?: string;
  [key: string]: unknown;
}

export type IngredientState = EntityState;

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  icon?: string;
  ingredientId?: string;
  status?: string;
  state?: EntityState;
}

export interface ContainerRules {
  maxCapacity?: number;
  allowedTypes?: EntityType[];
  consumesOnDrag?: boolean;
  isImmutable?: boolean;
  allowDuplicateIngredients?: boolean;
}

export interface Container {
  id: string;
  name: string;
  type: ContainerType;
  entityIds: string[];
  rules?: ContainerRules;
  isOn?: boolean;
  cookCondition?: string;
  timer?: string;
}

export interface WorldState {
  entities: Record<string, Entity>;
  containers: Record<string, Container>;
  dispatch: (action: WorldAction) => void;
}

export type { WorldAction, WorldEvent, BaseWorldEvent };
export * from './pantry';