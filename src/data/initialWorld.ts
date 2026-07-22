/**
 * FILE: initialWorld.ts
 *
 * PURPOSE:
 * Provides standard initial world bootstrap entities and containers.
 *
 * RESPONSIBILITY:
 * - Defines starting kitchen environment state.
 * - Specifies default containers, capacities, rules, and seed entities.
 */

import type { Container, Entity } from '../types/world';

export const initialEntities: Record<string, Entity> = {
  'potato-1': {
    id: 'potato-1',
    name: 'Potato',
    type: 'ingredient',
    state: {
      icon: '🥔',
      cutState: 'whole',
      cookState: 'raw',
    },
  },
  'egg-1': {
    id: 'egg-1',
    name: 'Egg',
    type: 'ingredient',
    state: {
      icon: '🥚',
      cookState: 'raw',
    },
  },
  'onion-1': {
    id: 'onion-1',
    name: 'Onion',
    type: 'ingredient',
    state: {
      icon: '🧅',
      cutState: 'whole',
      cookState: 'raw',
    },
  },
  'oil-1': {
    id: 'oil-1',
    name: 'Olive Oil',
    type: 'ingredient',
    state: {
      icon: '🫒',
    },
  },
  'salt-1': {
    id: 'salt-1',
    name: 'Salt',
    type: 'ingredient',
    state: {
      icon: '🧂',
    },
  },
  'pepper-1': {
    id: 'pepper-1',
    name: 'Bell Pepper',
    type: 'ingredient',
    state: {
      icon: '🫑',
      cutState: 'whole',
    },
  },
  'knife-1': {
    id: 'knife-1',
    name: 'Chef Knife',
    type: 'tool',
    state: {
      icon: '🔪',
    },
  },
  'chef': {
    id: 'chef',
    name: 'Tortilla Mascot',
    type: 'mascot',
    state: {
      gazingAt: null,
      emotion: 'curious',
    },
  },
};

export const initialContainers: Record<string, Container> = {
  storage: {
    id: 'storage',
    name: '📦 Pantry Storage',
    type: 'storage',
    entityIds: ['potato-1', 'egg-1', 'onion-1', 'oil-1', 'salt-1', 'pepper-1', 'knife-1'],
    rules: {
      allowedTypes: ['ingredient', 'tool'],
    },
  },
  board: {
    id: 'board',
    name: '🔪 Cutting Board',
    type: 'board',
    entityIds: [],
    rules: {
      maxCapacity: 3,
      allowedTypes: ['ingredient', 'tool'],
    },
  },
  pan: {
    id: 'pan',
    name: '🍳 Cooking Pan',
    type: 'pan',
    entityIds: [],
    rules: {
      maxCapacity: 4,
      allowedTypes: ['ingredient'],
    },
  },
  plate: {
    id: 'plate',
    name: '🍽️ Service Plate',
    type: 'plate',
    entityIds: [],
    rules: {
      maxCapacity: 6,
      allowedTypes: ['ingredient'],
    },
  },
  trash: {
    id: 'trash',
    name: '🗑️ Trash Bin',
    type: 'trash',
    entityIds: [],
    rules: {
      allowedTypes: ['ingredient', 'tool'],
    },
  },
};
