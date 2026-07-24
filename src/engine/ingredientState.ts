/**
 * FILE: ingredientState.ts
 *
 * PURPOSE:
 * Helpers for deriving ingredient status and display name transformations.
 *
 * RESPONSIBILITY:
 * - Derives preparation status strings (e.g., 'sliced-potatoe', 'peeled').
 * - Derives cooking status strings (e.g., 'fried-sliced-potatoe').
 * - Formats updated ingredient names with emoji and preparation.
 */

import type { Entity } from '../types/world';
import { ingredients as catalogIngredients } from '../data/catalog/ingredients';

/**
 * Normalizes an ingredient entity ID or ingredientId to a singular ingredient key for generic status formatting.
 * Examples: 'potatoes' | 'potato' -> 'potatoe'
 *           'onions' | 'onion' -> 'onion'
 *           'carrots' | 'carrot' -> 'carrot'
 */
export function getIngredientSingularKey(targetEntity: Entity): string {
  const baseKey = (targetEntity.ingredientId || targetEntity.id.split('_')[0] || 'ingredient').toLowerCase();
  if (baseKey.startsWith('potato')) return 'potatoe';
  if (baseKey.startsWith('tomato')) return 'tomato';
  if (baseKey.startsWith('onion')) return 'onion';
  if (baseKey.startsWith('carrot')) return 'carrot';
  if (baseKey.endsWith('es') && baseKey.length > 3) return baseKey.slice(0, -2);
  if (baseKey.endsWith('s') && !['cheese', 'glass'].includes(baseKey) && baseKey.length > 2) return baseKey.slice(0, -1);
  return baseKey;
}

/**
 * Derives the generic status string for a prepared ingredient.
 * Examples:
 * - preparation 'peeled' -> 'peeled'
 * - preparation 'sliced' for potato -> 'sliced-potatoe'
 * - preparation 'diced' for onion -> 'diced-onion'
 */
export function derivePreparationStatus(targetEntity: Entity, preparation: string): string {
  const singularKey = getIngredientSingularKey(targetEntity);
  return preparation === 'peeled' ? 'peeled' : `${preparation}-${singularKey}`;
}

/**
 * Derives the generic status string for a cooked ingredient.
 * Examples:
 * - cooking 'fried' with prep 'sliced' for potato -> 'fried-sliced-potatoe'
 */
export function deriveCookingStatus(targetEntity: Entity, cooking: string): string {
  const singularKey = getIngredientSingularKey(targetEntity);
  const prep = targetEntity.state?.preparation;
  if (cooking === 'raw') {
    return prep ? (prep === 'peeled' ? 'peeled' : `${prep}-${singularKey}`) : 'raw';
  }
  return `${cooking}-${prep ? prep + '-' : ''}${singularKey}`;
}

/**
 * Formats an ingredient entity's display name after preparation.
 */
export function formatPreparedName(targetEntity: Entity, preparation: string): string {
  const singularKey = getIngredientSingularKey(targetEntity);
  const baseKey = (targetEntity.ingredientId || targetEntity.id.split('_')[0] || 'ingredient').toLowerCase();
  const catalogItem = catalogIngredients.find(
    (i) => i.id === targetEntity.ingredientId || i.id === baseKey || i.id === singularKey
  );
  const icon = catalogItem?.icon || (targetEntity.name.match(/^(\p{Emoji}|\p{Extended_Pictographic})/u)?.[0] ?? '');
  const baseName = catalogItem?.name || targetEntity.name.replace(/^(\p{Emoji}|\p{Extended_Pictographic})\s*/u, '');

  const capitalizedPrep = preparation.charAt(0).toUpperCase() + preparation.slice(1);
  return `${icon} ${capitalizedPrep} ${baseName}`.trim();
}
