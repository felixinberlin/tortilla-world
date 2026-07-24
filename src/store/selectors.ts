/**
 * FILE: selectors.ts
 *
 * PURPOSE:
 * Reusable Zustand selectors for components and systems.
 *
 * RESPONSIBILITY:
 * - Provides memoized or simple state derivation selectors.
 * - Prevents unnecessary React re-renders by selecting narrow slices of state.
 */

import type { WorldState } from '../types/world';
import type { Container, Entity } from '../types/world';

/** Selects all entities from the world state */
export const selectEntities = (state: WorldState): Record<string, Entity> => state.entities;

/** Selects a single entity by its ID */
export const selectEntityById = (id: string) => (state: WorldState): Entity | undefined =>
  state.entities[id];

/** Selects all containers from the world state */
export const selectContainers = (state: WorldState): Record<string, Container> => state.containers;

/** Selects a single container by its ID */
export const selectContainerById = (id: string) => (state: WorldState): Container | undefined =>
  state.containers[id];

/** Selects all resolved entities contained in a given container ID */
export const selectContainerEntities = (containerId: string) => (state: WorldState): Entity[] => {
  const container = state.containers[containerId];
  if (!container) return [];
  return container.entityIds
    .map((id) => state.entities[id])
    .filter((e): e is Entity => Boolean(e));
};

/** Selects the mascot entity */
export const selectMascot = (mascotId: string = 'chef') => (state: WorldState): Entity | undefined =>
  state.entities[mascotId];
