/**
 * FILE: defaults.ts
 *
 * PURPOSE:
 * Initial seed data for world state.
 *
 * RESPONSIBILITY:
 * - Provides default entity definitions (mascot, ingredients, tools).
 * - Provides default container definitions (despensa, sink, board, bowl, pan, plate).
 */

import type { Container, Entity } from '../types/world';
import { ingredients as catalogIngredients } from '../data/catalog/ingredients';
import { catalogTools } from '../data/catalog/tools';

export const defaultEntities: Record<string, Entity> = {
  chef: { id: 'chef', name: 'Chef Tortilla 🍳', type: 'mascot', state: { gazingAt: 'Despensa' } },
  ...catalogIngredients.reduce((acc, item) => {
    acc[item.id] = {
      id: item.id,
      ingredientId: item.id,
      name: `${item.icon} ${item.name}`,
      type: 'ingredient',
      state: {},
    };
    return acc;
  }, {} as Record<string, Entity>),
  ...catalogTools.reduce((acc, item) => {
    acc[item.id] = {
      id: item.id,
      name: `${item.icon} ${item.name}`,
      type: 'tool',
      state: {},
    };
    return acc;
  }, {} as Record<string, Entity>),
};

export const defaultContainers: Record<string, Container> = {
  despensa: {
    id: 'despensa',
    name: 'Despensa (All Ingredients - Immutable Catalog)',
    type: 'storage',
    entityIds: [...catalogIngredients.map((i) => i.id), ...catalogTools.map((t) => t.id)],
    rules: {
      maxCapacity: 30,
      allowedTypes: ['ingredient', 'tool'],
      consumesOnDrag: false,
      isImmutable: true,
    },
  },
  sink: {
    id: 'sink',
    name: 'Fregadero (Sink)',
    type: 'sink',
    entityIds: [],
    rules: { maxCapacity: 10, allowedTypes: ['ingredient', 'tool'] },
  },
  board: {
    id: 'board',
    name: 'Tabla (Cutting Board)',
    type: 'board',
    entityIds: [],
    rules: { maxCapacity: 10, allowedTypes: ['ingredient', 'tool'] },
  },
  bowl: {
    id: 'bowl',
    name: 'Bol (Preparation Bowl)',
    type: 'bowl',
    entityIds: [],
    rules: { maxCapacity: 10, allowedTypes: ['ingredient', 'tool'] },
  },
  pan: {
    id: 'pan',
    name: 'Sartén (Skillet)',
    type: 'pan',
    entityIds: [],
    rules: { maxCapacity: 5, allowedTypes: ['ingredient', 'tool'] },
  },
  plate: {
    id: 'plate',
    name: 'Plato (Plate)',
    type: 'plate',
    entityIds: [],
    rules: { maxCapacity: 5, allowedTypes: ['ingredient', 'tool'] },
  },
};
