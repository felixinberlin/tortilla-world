import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';
import { createPeelEntity } from './ingredientState';

describe('Peeling produces peel entities', () => {
  beforeEach(() => {
    worldStore.getState().dispatch({ type: 'RESET_WORLD' });

    const store = worldStore.getState();
    store.addWorkstationContainer({
      id: 'board',
      name: 'Tabla de cortar',
      type: 'board',
      entityIds: [],
      rules: { maxCapacity: 10, allowedTypes: ['ingredient', 'tool'] },
    });
  });

  it('createPeelEntity returns valid peel entity structure', () => {
    const potato = {
      id: 'potato_1',
      name: 'Potato',
      type: 'ingredient' as const,
      ingredientId: 'potato',
      icon: '🥔',
    };

    const peel = createPeelEntity(potato);
    expect(peel.id).toBe('potato_1_peel');
    expect(peel.name).toContain('Peels');
    expect(peel.ingredientId).toBe('potato_peels');
    expect(peel.state?.isPeel).toBe(true);
    expect(peel.state?.sourceEntityId).toBe('potato_1');
  });

  it('produces peel entity in container when calling prepareIngredient with "peeled"', () => {
    const store = worldStore.getState();

    store.dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: { id: 'potato_1', name: 'Potato', type: 'ingredient', ingredientId: 'potato' },
        containerId: 'board',
      },
    });

    store.dispatch({
      type: 'PREPARE_INGREDIENT',
      payload: {
        entityId: 'potato_1',
        preparation: 'peeled',
      },
    });

    const state = worldStore.getState();
    const board = state.containers.board;

    expect(board.entityIds).toContain('potato_1');
    expect(board.entityIds).toContain('potato_1_peel');

    const peel = state.entities['potato_1_peel'];
    expect(peel).toBeDefined();
    expect(peel.state?.isPeel).toBe(true);
  });

  it('produces peel entity in container when calling transformIngredient with "peel"', () => {
    const store = worldStore.getState();

    store.dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: { id: 'garlic_1', name: 'Garlic', type: 'ingredient', ingredientId: 'garlic' },
        containerId: 'board',
      },
    });

    store.transformIngredient('garlic_1', 'peel');

    const state = worldStore.getState();
    const board = state.containers.board;

    expect(board.entityIds).toContain('garlic_1');
    expect(board.entityIds).toContain('garlic_1_peel');

    const peel = state.entities['garlic_1_peel'];
    expect(peel).toBeDefined();
    expect(peel.name).toContain('Garlic Peels');
    expect(peel.state?.isPeel).toBe(true);
  });
});
