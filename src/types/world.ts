// src/types/world.ts

export type EntityType = 'ingredient' | 'tool' | 'utensil' | 'dish';

/**
 * Pure simulation entity.
 * Entities do not hold business logic or container movement logic[cite: 18].
 */
export interface Entity {
  id: string;
  type: EntityType;
  name: string;
  containerId: string | null;
  state: Record<string, unknown>; // e.g. { chopped: true, temperature: 180 }
}

export type ContainerType = 'inventory' | 'cutting_board' | 'pan' | 'plate' | 'trash';

/**
 * Container-specific validation constraints enforced by the Container Authority.
 */
export interface ContainerRules {
  maxCapacity: number;
  allowedTypes?: EntityType[];
  uniqueTypesOnly?: boolean;
  customValidator?: (container: Container, entity: Entity, currentEntities: Entity[]) => boolean;
}

/**
 * Containers manage spatial ordering and entity ownership[cite: 21, 22].
 */
export interface Container {
  id: string;
  type: ContainerType;
  name: string;
  entityIds: string[]; // Strict ordering of entity IDs
  rules: ContainerRules;
}

/**
 * Standardized simulation actions.
 */
export type ActionType = 'MOVE_ENTITY' | 'UPDATE_ENTITY_STATE' | 'REGISTER_ENTITY' | 'REGISTER_CONTAINER';

export interface BaseAction<T extends ActionType, P> {
  type: T;
  timestamp: number;
  payload: P;
}

export type MoveEntityAction = BaseAction<
  'MOVE_ENTITY',
  {
    entityId: string;
    fromContainerId: string | null;
    toContainerId: string;
    targetIndex?: number;
  }
>;

export type UpdateEntityStateAction = BaseAction<
  'UPDATE_ENTITY_STATE',
  {
    entityId: string;
    statePatch: Record<string, unknown>;
  }
>;

export type WorldAction = MoveEntityAction | UpdateEntityStateAction;