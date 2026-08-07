import { describe, expect, it } from 'vitest';
import { applyIngredientTransformation } from './ingredientState';
import { worldStore } from '../store/worldStore';
import type { Entity } from '../types/world';

describe('Ingredient Capability Rules', () => {
  it('cannot wash salt', () => {
    const saltEntity: Entity = {
      id: 'salt_1',
      name: 'Salt 🧂',
      type: 'ingredient',
      ingredientId: 'salt',
      state: { status: 'raw' },
    };

    const result = applyIngredientTransformation(saltEntity, 'wash');
    expect(result).toBeNull();
  });

  it('can wash potatoes', () => {
    const potatoEntity: Entity = {
      id: 'potato_1',
      name: 'Potatoes 🥔',
      type: 'ingredient',
      ingredientId: 'potato',
      state: { status: 'raw' },
    };

    const result = applyIngredientTransformation(potatoEntity, 'wash');
    expect(result).not.toBeNull();
    expect(result?.state?.preparation).toBe('washed');
    expect(result?.name).toContain('Washed');
  });

  it('cannot cut a raw egg', () => {
    const rawEgg: Entity = {
      id: 'egg_1',
      name: 'Egg 🥚',
      type: 'ingredient',
      ingredientId: 'egg',
      state: { preparation: 'whole', cooking: 'raw' },
    };

    const result = applyIngredientTransformation(rawEgg, 'cut');
    expect(result).toBeNull();
  });

  it('can cut a cooked/boiled egg', () => {
    const boiledEgg: Entity = {
      id: 'egg_1',
      name: 'Boiled Egg 🥚',
      type: 'ingredient',
      ingredientId: 'egg',
      state: { preparation: 'whole', cooking: 'boiled' },
    };

    const result = applyIngredientTransformation(boiledEgg, 'cut');
    expect(result).not.toBeNull();
    expect(result?.name).toContain('Cut');
  });

  it('only allows separating a whole raw egg, not yolk or tomato', () => {
    worldStore.setState({
      entities: {
        tomato_1: { id: 'tomato_1', name: 'Tomato 🍅', type: 'ingredient', ingredientId: 'tomato', state: {} },
        yolk_1: { id: 'yolk_1', name: 'Yolk 🟡', type: 'ingredient', ingredientId: 'yolk', state: {} },
        egg_1: { id: 'egg_1', name: 'Egg 🥚', type: 'ingredient', ingredientId: 'egg', state: {} },
      },
      containers: {
        bowl: { id: 'bowl', name: 'Bowl', type: 'bowl', entityIds: ['tomato_1', 'yolk_1', 'egg_1'], rules: {} },
      },
    });

    // Dispatch separate on bowl
    worldStore.getState().dispatch({
      type: 'SEPARATE_CONTAINER_CONTENTS',
      payload: { containerId: 'bowl' },
    });

    // Tomato and yolk should remain untouched
    const entities = worldStore.getState().entities;
    expect(entities['tomato_1'].state?.consumed).not.toBe(true);
    expect(entities['yolk_1'].state?.consumed).not.toBe(true);

    // Egg should be consumed and separated into new yolk and egg_white
    expect(entities['egg_1'].state?.consumed).toBe(true);

    const bowlContainer = worldStore.getState().containers['bowl'];
    const activeBowlEntities = bowlContainer.entityIds
      .map((id) => entities[id])
      .filter((e) => e && !e.state?.consumed);

    // bowl should have tomato_1, yolk_1, plus newly created yolk and egg_white from separating egg_1
    expect(activeBowlEntities.some((e) => e.ingredientId === 'tomato')).toBe(true);
    expect(activeBowlEntities.filter((e) => e.ingredientId === 'yolk').length).toBe(2);
    expect(activeBowlEntities.some((e) => e.ingredientId === 'egg_white')).toBe(true);
  });
});
