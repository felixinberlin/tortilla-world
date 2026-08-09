/**
 * FILE: ingredientAmountUtils.ts
 *
 * PURPOSE:
 * Utility functions for ingredient quantity and unit management in creator/record mode.
 *
 * RESPONSIBILITY:
 * - Provides default quantities and supported units for ingredient catalog items.
 * - Formats ingredient amount strings (e.g., "3 pieces garlic", "4 eggs", "300 gr potatoes").
 * - Calculates current quantities in store containers.
 * - Synchronizes state changes with store entities.
 */

import { worldStore } from '../store/worldStore';
import { ingredients as catalogIngredients } from '../data/catalog/ingredients';
import type { Entity } from '../types/world';

export interface IngredientAmountConfig {
  defaultQty: number;
  units: string[];
  defaultUnit: string;
  step: number;
}

export const INGREDIENT_AMOUNT_CONFIGS: Record<string, IngredientAmountConfig> = {
  garlic: { defaultQty: 3, units: ['pieces', 'cloves', 'pcs'], defaultUnit: 'pieces', step: 1 },
  egg: { defaultQty: 4, units: ['eggs', 'pcs'], defaultUnit: 'eggs', step: 1 },
  potato: { defaultQty: 300, units: ['gr', 'pieces', 'pcs'], defaultUnit: 'gr', step: 50 },
  onion: { defaultQty: 2, units: ['pieces', 'pcs', 'gr'], defaultUnit: 'pieces', step: 1 },
  oil: { defaultQty: 50, units: ['ml', 'tbsp', 'tsp'], defaultUnit: 'ml', step: 10 },
  salt: { defaultQty: 5, units: ['gr', 'pinch'], defaultUnit: 'gr', step: 1 },
  pepper: { defaultQty: 1, units: ['pieces', 'pcs'], defaultUnit: 'pieces', step: 1 },
  chorizo: { defaultQty: 100, units: ['gr', 'pieces'], defaultUnit: 'gr', step: 25 },
  tomato: { defaultQty: 2, units: ['pieces', 'pcs'], defaultUnit: 'pieces', step: 1 },
  flour: { defaultQty: 100, units: ['gr'], defaultUnit: 'gr', step: 25 },
  sugar: { defaultQty: 50, units: ['gr'], defaultUnit: 'gr', step: 10 },
  rice: { defaultQty: 150, units: ['gr'], defaultUnit: 'gr', step: 25 },
  milk: { defaultQty: 200, units: ['ml'], defaultUnit: 'ml', step: 50 },
  butter: { defaultQty: 25, units: ['gr'], defaultUnit: 'gr', step: 5 },
  cheese: { defaultQty: 50, units: ['gr', 'pieces'], defaultUnit: 'gr', step: 10 },
};

const DEFAULT_CONFIG: IngredientAmountConfig = {
  defaultQty: 1,
  units: ['pieces', 'pcs', 'gr'],
  defaultUnit: 'pieces',
  step: 1,
};

export function getIngredientConfig(catalogId: string): IngredientAmountConfig {
  const baseId = catalogId.includes('_') ? catalogId.split('_')[0] : catalogId;
  return INGREDIENT_AMOUNT_CONFIGS[baseId] || INGREDIENT_AMOUNT_CONFIGS[catalogId] || DEFAULT_CONFIG;
}

/**
 * Gets current count, unit, and matching entities in kitchen despensa for an ingredient.
 */
export function getIngredientCountAndUnit(
  catalogId: string,
  entities: Record<string, Entity>
): { count: number; unit: string; matchingEntities: Entity[] } {
  const baseId = catalogId.includes('_') ? catalogId.split('_')[0] : catalogId;
  const config = getIngredientConfig(catalogId);

  const matching = Object.values(entities).filter((e) => {
    const eBase = e.ingredientId || e.id.split('_')[0];
    return eBase === baseId || e.id === catalogId || e.ingredientId === catalogId;
  });

  if (matching.length === 0) {
    return { count: 0, unit: config.defaultUnit, matchingEntities: [] };
  }

  // Check if first entity has explicit custom amount/unit in state
  const customAmount = matching[0].state?.amount as number | undefined;
  const customUnit = matching[0].state?.unit as string | undefined;

  return {
    count: customAmount ?? matching.length,
    unit: customUnit || config.defaultUnit,
    matchingEntities: matching,
  };
}

/**
 * Formats a clean display text e.g., "3 pieces garlic", "4 eggs", "300 gr potatoes"
 */
export function formatIngredientAmountLabel(
  catalogId: string,
  quantity: number,
  unit: string
): string {
  const catalogIng = catalogIngredients.find((i) => i.id === catalogId);
  const name = catalogIng?.name || catalogId;

  if (quantity === 0) return `0 ${unit} ${name}`;

  if (unit === 'eggs') {
    return `${quantity} eggs`;
  }
  if (unit === 'pieces' || unit === 'pcs') {
    return `${quantity} ${quantity === 1 ? 'piece' : 'pieces'} ${name.toLowerCase()}`;
  }
  if (unit === 'cloves') {
    return `${quantity} ${quantity === 1 ? 'clove' : 'cloves'} ${name.toLowerCase()}`;
  }
  return `${quantity} ${unit} ${name.toLowerCase()}`;
}

/**
 * Synchronizes ingredient quantity and unit in worldStore.
 */
export function syncIngredientQuantity(
  catalogId: string,
  targetQty: number,
  unit: string
): void {
  const state = worldStore.getState();
  const baseId = catalogId.includes('_') ? catalogId.split('_')[0] : catalogId;
  const catalogIng = catalogIngredients.find((i) => i.id === catalogId || i.id === baseId);

  const { matchingEntities } = getIngredientCountAndUnit(catalogId, state.entities);

  if (targetQty <= 0) {
    matchingEntities.forEach((ent) => {
      state.dispatch({ type: 'REMOVE_ENTITY', payload: { entityId: ent.id } });
    });
    return;
  }

  const isContinuous = ['gr', 'g', 'ml', 'tbsp', 'tsp', 'pinch'].includes(unit);

  if (isContinuous) {
    // Single entity with custom weight/volume amount
    if (matchingEntities.length === 0) {
      const newId = `${baseId}_1`;
      state.dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: {
            id: newId,
            ingredientId: baseId,
            name: `${catalogIng?.icon || '📦'} ${targetQty} ${unit} ${catalogIng?.name || baseId}`,
            type: 'ingredient',
            icon: catalogIng?.icon,
            state: { amount: targetQty, unit, weightGrams: unit === 'gr' || unit === 'g' ? targetQty : undefined },
          },
          containerId: 'despensa',
        },
      });
    } else {
      // Remove any extra duplicate continuous entities
      matchingEntities.slice(1).forEach((ent) => {
        state.dispatch({ type: 'REMOVE_ENTITY', payload: { entityId: ent.id } });
      });

      // Update the main continuous entity
      state.dispatch({
        type: 'UPDATE_ENTITY_STATE',
        payload: {
          entityId: matchingEntities[0].id,
          changes: {
            amount: targetQty,
            unit,
            weightGrams: unit === 'gr' || unit === 'g' ? targetQty : undefined,
          },
        },
      });
    }
  } else {
    // Piece / Discrete entity count (e.g., 3 pieces garlic, 4 eggs)
    const currentCount = matchingEntities.length;

    if (currentCount < targetQty) {
      for (let i = currentCount + 1; i <= targetQty; i++) {
        let uniqueId = `${baseId}_${i}`;
        let counter = i;
        while (state.entities[uniqueId]) {
          counter++;
          uniqueId = `${baseId}_${counter}`;
        }

        state.dispatch({
          type: 'ADD_ENTITY',
          payload: {
            entity: {
              id: uniqueId,
              ingredientId: baseId,
              name: `${catalogIng?.icon || '📦'} ${catalogIng?.name || baseId}`,
              type: 'ingredient',
              icon: catalogIng?.icon,
              state: { amount: 1, unit: unit || 'pcs' },
            },
            containerId: 'despensa',
          },
        });
      }
    } else if (currentCount > targetQty) {
      const toRemove = matchingEntities.slice(targetQty);
      toRemove.forEach((ent) => {
        state.dispatch({ type: 'REMOVE_ENTITY', payload: { entityId: ent.id } });
      });
    }
  }
}
