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

export type EntityType = 'ingredient' | 'tool' | 'product' | 'mascot' | 'container' | string;
export type ContainerType = 'storage' | 'board' | 'plate' | 'trash' | 'bowl' | 'sink' | 'workstation' | 'burner';

export interface IngredientState {
  preparation?: PreparationStyle;
  cooking?: CookingMethod;
  status?: string;
  [key: string]: unknown;
}

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  icon?: string;
  ingredientId?: string;
  state?: IngredientState;
}

export interface ContainerRules {
  maxCapacity?: number;
  allowedTypes?: EntityType[];
  uniqueTypesOnly?: boolean;
  consumesOnDrag?: boolean;
  isImmutable?: boolean;
  customValidator?: ( 
    container: Container,
    entity: Entity,
    currentEntities: Entity[]
  ) => boolean;
}

export interface Container {
  id: string;
  name: string;
  type: ContainerType;
  entityIds: string[];
  rules?: ContainerRules;
}

export interface WorldState {
  entities: Record<string, Entity>;
  containers: Record<string, Container>;
  dispatch: (action: WorldAction) => void;
}

export type { WorldAction, WorldEvent };