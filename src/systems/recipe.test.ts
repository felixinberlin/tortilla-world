import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';
import { evaluateRecipeProgress, assembleDish } from './recipe';

describe('Recipe Evaluation Engine', () => {
  beforeEach(() => {
    worldStore.setState({
      entities: {
        'potato-1': {
          id: 'potato-1',
          name: 'Diced Fried Potato',
          type: 'ingredient',
          state: { cutState: 'diced', cookState: 'fried' },
        },
        'egg-1': {
          id: 'egg-1',
          name: 'Fried Egg',
          type: 'ingredient',
          state: { cookState: 'fried' },
        },
        'onion-1': {
          id: 'onion-1',
          name: 'Diced Fried Onion',
          type: 'ingredient',
          state: { cutState: 'diced', cookState: 'fried' },
        },
      },
      containers: {
        plate: {
          id: 'plate',
          name: 'Service Plate',
          type: 'plate',
          entityIds: ['potato-1', 'egg-1'],
        },
      },
    });
  });

  it('calculates partial recipe progress for Sin Cebolla recipe', () => {
    const progress = evaluateRecipeProgress('plate', 'sincebolla');
    expect(progress.percentage).toBe(100);
    expect(progress.isComplete).toBe(true);
  });

  it('calculates partial progress for Con Cebolla recipe when onion is missing', () => {
    const progress = evaluateRecipeProgress('plate', 'concebolla');
    expect(progress.percentage).toBe(67);
    expect(progress.isComplete).toBe(false);
    expect(progress.missingRequirements).toContain('Diced Fried Onion');
  });

  it('assembles dish when recipe is 100% complete', () => {
    // Add onion to plate
    worldStore.setState((state) => ({
      containers: {
        ...state.containers,
        plate: {
          ...state.containers.plate,
          entityIds: ['potato-1', 'egg-1', 'onion-1'],
        },
      },
    }));

    const assembled = assembleDish('plate', 'concebolla');
    expect(assembled).toBe(true);

    const plateEntities = worldStore.getState().containers.plate.entityIds;
    expect(plateEntities).toHaveLength(1);
    const dish = worldStore.getState().entities[plateEntities[0]];
    expect(dish.state?.isCompletedDish).toBe(true);
  });
});
