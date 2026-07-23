/**
 * FILE: world.ts
 *
 * PURPOSE:
 * Defines complete world state structures.
 *
 * RESPONSIBILITY:
 * - Describes the game world's data model.
 */

import type { WorldAction } from './actions';

export type EntityType = 'ingredient' | 'tool' | 'mascot';
export type ContainerType = 'storage' | 'pan' | 'board' | 'plate' | 'trash';

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  ingredientId?: string;
  state?: Record<string, unknown>;
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

export type { WorldAction };