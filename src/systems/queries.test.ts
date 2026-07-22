// src/systems/queries.test.ts
import { describe, expect, it } from 'vitest';
import { getContainerByEntityId, getEntitiesInContainer, getEntityById } from './queries';
import type { WorldState } from '../types/world';

describe('Query System', () => {
  const mockState: WorldState = {
    entities: {
      tomato: { id: 'tomato', name: 'Tomato', type: 'ingredient', state: { sliced: false } },
      onion: { id: 'onion', name: 'Onion', type: 'ingredient', state: { sliced: true } },
    },
    containers: {
      pantry: {
        id: 'pantry',
        name: 'Pantry',
        type: 'storage',
        rules: { maxCapacity: 10 },
        entityIds: ['tomato'],
      },
      board: {
        id: 'board',
        name: 'Cutting Board',
        type: 'board',
        rules: { maxCapacity: 2 },
        entityIds: ['onion'],
      },
    },
    dispatch: () => {},
  };

  it('retrieves an entity by ID', () => {
    const entity = getEntityById(mockState, 'tomato');
    expect(entity).toBeDefined();
    expect(entity?.name).toBe('Tomato');
  });

  it('finds the parent container for a given entity ID', () => {
    const container = getContainerByEntityId(mockState, 'onion');
    expect(container).toBeDefined();
    expect(container?.id).toBe('board');
  });

  it('returns all entities inside a specified container', () => {
    const boardEntities = getEntitiesInContainer(mockState, 'board');
    expect(boardEntities).toHaveLength(1);
    expect(boardEntities[0].id).toBe('onion');
  });
});