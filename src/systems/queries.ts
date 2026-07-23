/**
 * FILE: queries.ts
 *
 * PURPOSE:
 * Read-only world queries and selectors.
 *
 * RESPONSIBILITY:
 * - Finds entities by ID or container.
 * - Filters world state data for systems and components.
 *
 * SHOULD NOT:
 * - Modify world state.
 */

import type { Container, Entity, WorldState } from '../types/world';

/**
 * Retrieves an entity by its unique ID from the world state.
 */
export const getEntityById = (state: WorldState, entityId: string): Entity | undefined => {
  return state.entities[entityId];
};

/**
 * Retrieves the container that currently holds the given entity ID.
 */
export const getContainerByEntityId = (
  state: WorldState,
  entityId: string
): Container | undefined => {
  return Object.values(state.containers).find((container) =>
    container.entityIds.includes(entityId)
  );
};

/**
 * Retrieves all entities contained within a specific container.
 */
export const getEntitiesInContainer = (state: WorldState, containerId: string): Entity[] => {
  const container = state.containers[containerId];
  if (!container) return [];

  return container.entityIds
    .map((id) => state.entities[id])
    .filter((entity): entity is Entity => entity !== undefined);
};