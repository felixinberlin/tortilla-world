/**
 * FILE: pantryKits.ts
 *
 * PURPOSE:
 * Catalog of preset Pantry Kits (initial pantry resources).
 *
 * RESPONSIBILITY:
 * - Provides preset configurations of initial pantry resources (ingredients, tools, quantities).
 * - Decouples initial pantry state from physical kitchen layout and recipes.
 * - Offers fallback resolver function `resolvePantryWorkspace(kitId?: string)`.
 */

import type { PantryKit } from '../../types/pantry';
import type { Entity } from '../../types/world';
import { ingredients as catalogIngredients } from './ingredients';
import { catalogTools } from './tools';

export const PANTRY_KITS: Record<string, PantryKit> = {
  base_pantry: {
    id: 'base_pantry',
    name: 'Despensa Base (Standard Pantry)',
    description: 'Standard starting pantry containing potatoes, eggs, onions, olive oil, salt, garlic, and tomato.',
    items: [
      { catalogId: 'potato', quantity: 3, name: 'Potato', icon: '🥔' },
      { catalogId: 'egg', quantity: 4, name: 'Egg', icon: '🥚' },
      { catalogId: 'onion', quantity: 2, name: 'Onion', icon: '🧅' },
      { catalogId: 'oil', quantity: 1, name: 'Olive Oil', icon: '🫒' },
      { catalogId: 'salt', quantity: 1, name: 'Salt', icon: '🧂' },
      { catalogId: 'garlic', quantity: 1, name: 'Garlic', icon: '🧄' },
      { catalogId: 'tomato', quantity: 1, name: 'Tomato', icon: '🍅' },
    ],
  },
  tortilla_pantry: {
    id: 'tortilla_pantry',
    name: 'Despensa Tortillera (Spanish Tortilla Pantry)',
    description: 'Ideal starting inventory for cooking Spanish Tortillas with extra eggs and potatoes.',
    items: [
      { catalogId: 'potato', quantity: 4, name: 'Potato', icon: '🥔' },
      { catalogId: 'egg', quantity: 6, name: 'Egg', icon: '🥚' },
      { catalogId: 'onion', quantity: 2, name: 'Onion', icon: '🧅' },
      { catalogId: 'oil', quantity: 1, name: 'Olive Oil', icon: '🫒' },
      { catalogId: 'salt', quantity: 1, name: 'Salt', icon: '🧂' },
    ],
  },
  empty_pantry: {
    id: 'empty_pantry',
    name: 'Despensa Vacía (Empty Pantry)',
    description: 'Empty starting pantry canvas with zero initial ingredients.',
    items: [],
  },
};

/**
 * Resolves a PantryKit by ID or falls back to `base_pantry` if undefined or invalid.
 */
export function resolvePantryWorkspace(kitId?: string): PantryKit {
  if (kitId && PANTRY_KITS[kitId]) {
    return PANTRY_KITS[kitId];
  }
  return PANTRY_KITS.base_pantry;
}

/**
 * Instantiates world entities and despensa container entity IDs from a PantryKit.
 */
export function instantiatePantryEntities(pantryKit: PantryKit): {
  entities: Record<string, Entity>;
  despensaEntityIds: string[];
} {
  const entities: Record<string, Entity> = {
    chef: {
      id: 'chef',
      name: 'Chef Tortilla 🍳',
      type: 'mascot',
      state: { gazingAt: { type: 'entity', entityId: 'despensa' } },
    },
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

  const despensaEntityIds: string[] = [];
  const kit = pantryKit || PANTRY_KITS.base_pantry;

  kit.items.forEach((req) => {
    const catalogIng = catalogIngredients.find((i) => i.id === req.catalogId);
    const catalogTool = catalogTools.find((t) => t.id === req.catalogId);

    const baseIcon = req.icon || catalogIng?.icon || catalogTool?.icon || '📦';
    const baseName =
      req.name ||
      (catalogIng
        ? `${catalogIng.icon} ${catalogIng.name}`
        : catalogTool
        ? `${catalogTool.icon} ${catalogTool.name}`
        : req.catalogId);
    const entityType = catalogTool ? 'tool' : 'ingredient';

    for (let i = 0; i < req.quantity; i++) {
      const id = req.quantity === 1 && !entities[req.catalogId] ? req.catalogId : `${req.catalogId}_${i + 1}`;
      entities[id] = {
        id,
        ingredientId: req.catalogId,
        name: baseName,
        type: entityType,
        icon: baseIcon,
        state: req.initialState ? JSON.parse(JSON.stringify(req.initialState)) : {},
      };
      despensaEntityIds.push(id);
    }
  });

  return { entities, despensaEntityIds };
}
