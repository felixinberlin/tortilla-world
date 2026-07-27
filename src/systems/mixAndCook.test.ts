/**
 * FILE: mixAndCook.test.ts
 *
 * PURPOSE:
 * Unit tests for Mix and Cook actions, dynamic naming, and cooking conditions.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';

describe('Mix & Cook Actions with Dynamic Naming & Conditions', () => {
  beforeEach(() => {
    worldStore.getState().resetWorld();
    worldStore.getState().setActiveRecipeName('Tortilla Española Clásica');
  });

  describe('1. The Mix Action (Bowl)', () => {
    it('combines bowl ingredients into a single mixture with sequential default name (mixture_1)', () => {
      const store = worldStore.getState();

      // Setup: Add potato and egg into bowl
      store.dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: { id: 'potato_1', name: 'Potato', type: 'ingredient', ingredientId: 'potato' },
          containerId: 'bowl',
        },
      });
      store.dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: { id: 'egg_1', name: 'Egg', type: 'ingredient', ingredientId: 'egg' },
          containerId: 'bowl',
        },
      });

      expect(worldStore.getState().containers.bowl.entityIds).toEqual(['potato_1', 'egg_1']);

      // Dispatch MIX_CONTAINER_CONTENTS without custom name
      store.dispatch({
        type: 'MIX_CONTAINER_CONTENTS',
        payload: { containerId: 'bowl' },
      });

      const updatedBowl = worldStore.getState().containers.bowl;
      expect(updatedBowl.entityIds).toHaveLength(1);

      const mixtureId = updatedBowl.entityIds[0];
      const mixtureEntity = worldStore.getState().entities[mixtureId];

      expect(mixtureEntity).toBeDefined();
      expect(mixtureEntity.name).toBe('mixture_1');
      expect(mixtureEntity.state?.preparation).toBe('mixed');
      expect(mixtureEntity.state?.status).toBe('mixed');
    });

    it('allows overriding mixture name with customName during mix dispatch', () => {
      const store = worldStore.getState();

      store.dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: { id: 'onion_1', name: 'Onion', type: 'ingredient', ingredientId: 'onion' },
          containerId: 'bowl',
        },
      });

      store.dispatch({
        type: 'MIX_CONTAINER_CONTENTS',
        payload: { containerId: 'bowl', customName: 'Cebolla Batida' },
      });

      const updatedBowl = worldStore.getState().containers.bowl;
      const mixtureEntity = worldStore.getState().entities[updatedBowl.entityIds[0]];

      expect(mixtureEntity.name).toBe('Cebolla Batida');
    });

    it('generates sequential mixture names for subsequent mixtures (mixture_2)', () => {
      const store = worldStore.getState();

      // First mixture
      store.dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: { id: 'item_a', name: 'A', type: 'ingredient' },
          containerId: 'bowl',
        },
      });
      store.dispatch({
        type: 'MIX_CONTAINER_CONTENTS',
        payload: { containerId: 'bowl' },
      });

      // Move mixture out of bowl
      const mix1Id = worldStore.getState().containers.bowl.entityIds[0];
      store.dispatch({
        type: 'MOVE_ENTITY',
        payload: { entityId: mix1Id, targetContainerId: 'plate' },
      });

      // Second mixture
      store.dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: { id: 'item_b', name: 'B', type: 'ingredient' },
          containerId: 'bowl',
        },
      });
      store.dispatch({
        type: 'MIX_CONTAINER_CONTENTS',
        payload: { containerId: 'bowl' },
      });

      const mix2Id = worldStore.getState().containers.bowl.entityIds[0];
      const mix2Entity = worldStore.getState().entities[mix2Id];

      expect(mix2Entity.name).toBe('mixture_2');
    });
  });

  describe('2. The Cook Action (Cooking Area / Pan & Conditions)', () => {
    it('toggles heat and stores time-based and condition-based cooking targets', () => {
      const store = worldStore.getState();

      // Turn heat on with time-based target '10 min'
      store.dispatch({
        type: 'TOGGLE_HEAT',
        payload: { containerId: 'burner1', isOn: true, cookCondition: '10 min' },
      });

      let burner = worldStore.getState().containers.burner1;
      expect(burner.isOn).toBe(true);
      expect(burner.cookCondition).toBe('10 min');
      expect(burner.timer).toBe('10 min');

      // Turn heat off
      store.dispatch({
        type: 'TOGGLE_HEAT',
        payload: { containerId: 'burner1', isOn: false },
      });

      burner = worldStore.getState().containers.burner1;
      expect(burner.isOn).toBe(false);
      expect(burner.cookCondition).toBeUndefined();

      // Turn heat on with condition-based target 'until brown'
      store.dispatch({
        type: 'TOGGLE_HEAT',
        payload: { containerId: 'burner1', isOn: true, cookCondition: 'until brown' },
      });

      burner = worldStore.getState().containers.burner1;
      expect(burner.isOn).toBe(true);
      expect(burner.cookCondition).toBe('until brown');
    });

    it('cooks container contents and sets state to cooked with custom final name', () => {
      const store = worldStore.getState();

      // Prepare mixture in bowl
      store.dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: { id: 'p_1', name: 'Potato', type: 'ingredient' },
          containerId: 'bowl',
        },
      });
      store.dispatch({
        type: 'MIX_CONTAINER_CONTENTS',
        payload: { containerId: 'bowl', customName: 'Base Batter' },
      });

      const mixtureId = worldStore.getState().containers.bowl.entityIds[0];

      // Move mixture to burner1
      store.dispatch({
        type: 'MOVE_ENTITY',
        payload: { entityId: mixtureId, targetContainerId: 'burner1' },
      });

      // Set heat condition
      store.dispatch({
        type: 'TOGGLE_HEAT',
        payload: { containerId: 'burner1', isOn: true, cookCondition: 'until golden' },
      });

      // Cook with final custom name 'Oma tortilla'
      store.dispatch({
        type: 'COOK_CONTAINER_CONTENTS',
        payload: { containerId: 'burner1', customName: 'Oma tortilla' },
      });

      const cookedMixture = worldStore.getState().entities[mixtureId];
      expect(cookedMixture.name).toBe('Oma tortilla');
      expect(cookedMixture.status).toBe('cooked');
      expect(cookedMixture.state?.cooking).toBe('cooked');
      expect(cookedMixture.state?.cookCondition).toBe('until golden');
    });

    it('defaults cooked mixture name to active recipe name if customName is omitted', () => {
      const store = worldStore.getState();
      worldStore.getState().setActiveRecipeName('Tortilla con Cebolla');

      store.dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: { id: 'p_2', name: 'Potato', type: 'ingredient' },
          containerId: 'bowl',
        },
      });
      store.dispatch({
        type: 'MIX_CONTAINER_CONTENTS',
        payload: { containerId: 'bowl' },
      });

      const mixtureId = worldStore.getState().containers.bowl.entityIds[0];

      store.dispatch({
        type: 'MOVE_ENTITY',
        payload: { entityId: mixtureId, targetContainerId: 'burner1' },
      });

      // Cook without custom name
      store.dispatch({
        type: 'COOK_CONTAINER_CONTENTS',
        payload: { containerId: 'burner1' },
      });

      const cookedMixture = worldStore.getState().entities[mixtureId];
      expect(cookedMixture.name).toBe('Tortilla con Cebolla');
      expect(cookedMixture.status).toBe('cooked');
    });
  });
});
