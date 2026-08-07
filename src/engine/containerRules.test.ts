/**
 * FILE: containerRules.test.ts
 *
 * PURPOSE:
 * Unit tests for container validation rules, ingredient capability matching,
 * workstation supported actions, and duplicate ingredient prevention.
 */

import { describe, it, expect } from 'vitest';
import {
  validateContainerRules,
  getWorkstationSupportedActions,
  getIngredientVerbs,
} from './containerRules';
import type { Container, Entity } from '../types/world';

describe('containerRules - Workstation Supported Actions & Ingredient Capability Validation', () => {
  describe('getWorkstationSupportedActions', () => {
    it('returns supported actions for standard workstation containers', () => {
      const sink: Container = { id: 'sink_1', name: 'Sink', type: 'sink', entityIds: [] };
      const board: Container = { id: 'board_1', name: 'Cutting Board', type: 'board', entityIds: [] };
      const bowl: Container = { id: 'bowl_1', name: 'Bowl', type: 'bowl', entityIds: [] };
      const burner: Container = { id: 'burner_1', name: 'Burner', type: 'burner', entityIds: [] };

      expect(getWorkstationSupportedActions(sink)).toContain('wash');
      expect(getWorkstationSupportedActions(board)).toContain('cut');
      expect(getWorkstationSupportedActions(bowl)).toContain('whisk');
      expect(getWorkstationSupportedActions(burner)).toContain('fry');
    });

    it('returns null for unrestricted storage, trash, and serving plate containers', () => {
      const pantry: Container = { id: 'despensa', name: 'Despensa', type: 'storage', entityIds: [] };
      const trash: Container = { id: 'trash', name: 'Trash', type: 'trash', entityIds: [] };
      const plate: Container = { id: 'plate', name: 'Plate', type: 'plate', entityIds: [] };

      expect(getWorkstationSupportedActions(pantry)).toBeNull();
      expect(getWorkstationSupportedActions(trash)).toBeNull();
      expect(getWorkstationSupportedActions(plate)).toBeNull();
    });
  });

  describe('getIngredientVerbs', () => {
    it('returns catalog capabilities for standard ingredients', () => {
      const potato: Entity = { id: 'potato_1', ingredientId: 'potato', name: 'Potato', type: 'ingredient' };
      const salt: Entity = { id: 'salt_1', ingredientId: 'salt', name: 'Salt', type: 'ingredient' };

      const potatoVerbs = getIngredientVerbs(potato);
      expect(potatoVerbs).toContain('peel');
      expect(potatoVerbs).toContain('fry');

      const saltVerbs = getIngredientVerbs(salt);
      expect(saltVerbs).toContain('season');
      expect(saltVerbs).toContain('mix');
      expect(saltVerbs).not.toContain('peel');
    });

    it('returns mixture verbs for mixture entities', () => {
      const mixture: Entity = { id: 'mixture_1', name: 'Egg Mixture', type: 'mixture' };
      const mixtureVerbs = getIngredientVerbs(mixture);

      expect(mixtureVerbs).toContain('cook');
      expect(mixtureVerbs).toContain('fry');
      expect(mixtureVerbs).toContain('flip');
    });
  });

  describe('validateContainerRules', () => {
    const sinkContainer: Container = { id: 'sink', name: 'Sink', type: 'sink', entityIds: [] };
    const boardContainer: Container = { id: 'board', name: 'Tabla', type: 'board', entityIds: [] };

    it('refuses placing salt into the sink due to zero matching action verbs', () => {
      const salt: Entity = { id: 'salt_1', ingredientId: 'salt', name: 'Sal', type: 'ingredient' };
      const result = validateContainerRules(sinkContainer, salt, []);

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('has no allowed transformations at Sink');
    });

    it('allows placing potato on cutting board because cut/peel capability matches board', () => {
      const potato: Entity = { id: 'potato_1', ingredientId: 'potato', name: 'Potato', type: 'ingredient' };
      const result = validateContainerRules(boardContainer, potato, []);

      expect(result.allowed).toBe(true);
    });

    it('refuses duplicate identical ingredients in the same container', () => {
      const potato1: Entity = { id: 'potato_1', ingredientId: 'potato', name: 'Potato 1', type: 'ingredient' };
      const potato2: Entity = { id: 'potato_2', ingredientId: 'potato', name: 'Potato 2', type: 'ingredient' };
      const boardWithPotato: Container = { id: 'board', name: 'Tabla', type: 'board', entityIds: ['potato_1'] };

      const result = validateContainerRules(boardWithPotato, potato2, [potato1]);

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('already contains');
    });

    it('refuses placement when container capacity limit is reached', () => {
      const limitedContainer: Container = {
        id: 'board_small',
        name: 'Small Board',
        type: 'board',
        entityIds: ['item_1'],
        rules: { maxCapacity: 1 },
      };
      const egg: Entity = { id: 'egg_1', ingredientId: 'egg', name: 'Egg', type: 'ingredient' };
      const existingItem: Entity = { id: 'item_1', ingredientId: 'knife', name: 'Knife', type: 'tool' };

      const result = validateContainerRules(limitedContainer, egg, [existingItem]);

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('is full');
    });
  });
});
