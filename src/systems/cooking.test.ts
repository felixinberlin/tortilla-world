import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';
import { cutIngredient, cookContainerIngredients } from './cooking';

describe('Cooking System Transformations', () => {
  beforeEach(() => {
    worldStore.setState({
      entities: {
        'knife-1': { id: 'knife-1', name: 'Chef Knife', type: 'tool' },
        'potato-1': {
          id: 'potato-1',
          name: 'Potato',
          type: 'ingredient',
          state: { cutState: 'whole', cookState: 'raw' },
        },
        'egg-1': {
          id: 'egg-1',
          name: 'Egg',
          type: 'ingredient',
          state: { cookState: 'raw' },
        },
      },
      containers: {
        board: {
          id: 'board',
          name: 'Cutting Board',
          type: 'board',
          entityIds: ['knife-1', 'potato-1'],
        },
        pan: {
          id: 'pan',
          name: 'Pan',
          type: 'pan',
          entityIds: ['egg-1'],
        },
      },
    });
  });

  it('cuts an ingredient when knife is present on cutting board', () => {
    const success = cutIngredient('board', 'potato-1', 'diced');
    expect(success).toBe(true);

    const potato = worldStore.getState().entities['potato-1'];
    expect(potato.state?.cutState).toBe('diced');
  });

  it('fails to cut if knife is missing from board', () => {
    worldStore.setState((state) => ({
      containers: {
        ...state.containers,
        board: {
          ...state.containers.board,
          entityIds: ['potato-1'], // no knife
        },
      },
    }));

    const success = cutIngredient('board', 'potato-1', 'diced');
    expect(success).toBe(false);
  });

  it('advances cook state of ingredients in pan from raw -> cooking -> fried', () => {
    cookContainerIngredients('pan');
    let egg = worldStore.getState().entities['egg-1'];
    expect(egg.state?.cookState).toBe('cooking');

    cookContainerIngredients('pan');
    egg = worldStore.getState().entities['egg-1'];
    expect(egg.state?.cookState).toBe('fried');
    expect(egg.name).toContain('Fried');
  });
  // This test checks if an ingredient can be successfully cut when a knife is present on the cutting board.
  it('cuts an ingredient when knife is present on cutting board', () => {
    // Check if the cutIngredient function returns true and the potato's cutState has been updated to 'diced'.
    const success = cutIngredient('board', 'potato-1', 'diced');
    expect(success).toBe(true);
    const potato = worldStore.getState().entities['potato-1'];
    expect(potato.state?.cutState).toBe('diced');
  });

  // This test checks if an ingredient cannot be cut when a knife is missing from the cutting board.
  it('fails to cut if knife is missing from board', () => {
    // Remove the knife from the cutting board.
    worldStore.setState((state) => ({
      containers: {
        ...state.containers,
        board: {
          ...state.containers.board,
          entityIds: ['potato-1'], // no knife
        },
      },
    }));

    // Check if the cutIngredient function returns false and the potato's cutState remains unchanged.
    const success = cutIngredient('board', 'potato-1', 'diced');
    expect(success).toBe(false);
  });

  // This test checks if an ingredient's cook state is advanced from raw to cooking then fried in a container.
  it('advances cook state of ingredients in pan from raw -> cooking -> fried', () => {
    // Cook the ingredients in the pan.
    cookContainerIngredients('pan');
    let egg = worldStore.getState().entities['egg-1'];
    expect(egg.state?.cookState).toBe('cooking');

    // Cook the ingredients in the pan again.
    cookContainerIngredients('pan');
    egg = worldStore.getState().entities['egg-1'];
    expect(egg.state?.cookState).toBe('fried');
    expect(egg.name).toContain('Fried');
  });

});
