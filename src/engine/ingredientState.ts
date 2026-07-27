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

/**
 * Formats an ingredient entity's display name after cooking.
 */
export function formatCookedName(targetEntity: Entity, cooking: string): string {
  if (
    targetEntity.id.startsWith('mixture_') ||
    targetEntity.ingredientId === 'mixture' ||
    targetEntity.name.toLowerCase().includes('mixture')
  ) {
    return targetEntity.name;
  }

  const singularKey = getIngredientSingularKey(targetEntity);
  const baseKey = (targetEntity.ingredientId || targetEntity.id.split('_')[0] || 'ingredient').toLowerCase();
  const catalogItem = catalogIngredients.find(
    (i) => i.id === targetEntity.ingredientId || i.id === baseKey || i.id === singularKey
  );
  const icon = catalogItem?.icon || (targetEntity.name.match(/^(\p{Emoji}|\p{Extended_Pictographic})/u)?.[0] ?? '');
  const baseName = catalogItem?.name || targetEntity.name.replace(/^(\p{Emoji}|\p{Extended_Pictographic})\s*/u, '');

  const cookingWord = cooking === 'fry' || cooking === 'fried' ? 'Cooked' : cooking.charAt(0).toUpperCase() + cooking.slice(1);
  const prep = targetEntity.state?.preparation;
  const prepWord = prep && prep !== 'whole' && prep !== 'raw' ? prep.charAt(0).toUpperCase() + prep.slice(1) + ' ' : '';
  return `${icon} ${cookingWord} ${prepWord}${baseName}`.trim();
}

/**
 * Extracts applied stage verbs from entity state or status string.
 */
export function getTransformationsFromEntity(entity: Entity): string[] {
  if (Array.isArray(entity.state?.transformations)) {
    return [...(entity.state.transformations as string[])];
  }

  const status = (entity.state?.status || entity.status || '').toLowerCase();
  const prep = (entity.state?.preparation || '').toLowerCase();
  const cooking = (entity.state?.cooking || '').toLowerCase();

  const stages: string[] = [];

  if (status.includes('washed') || prep === 'washed') {
    stages.push('washed');
  }
  if (status.includes('peeled') || prep === 'peeled') {
    stages.push('peeled');
  }
  if (
    status.includes('cutted') ||
    status.includes('sliced') ||
    status.includes('diced') ||
    status.includes('cut') ||
    prep === 'sliced' ||
    prep === 'diced' ||
    prep === 'cut'
  ) {
    stages.push('cutted');
  }
  if (status.includes('cooked') || status.includes('fried') || (cooking && cooking !== 'raw')) {
    stages.push('cooked');
  }
  if (status.includes('mixed') || prep === 'mixed') {
    stages.push('mixed');
  }

  return stages;
}

/**
 * Applies a workstation transformation ('wash', 'cut', 'peel', 'cook', 'mix') to an ingredient entity.
 * Ensures idempotency (cannot wash or cut multiple times with extra effect) and
 * updates both state.status (e.g., 'washed-onion', 'peeled-cutted-cooked-tomatoes') and display name.
 */
export function applyIngredientTransformation(
  entity: Entity,
  transformation: 'wash' | 'cut' | 'peel' | 'cook' | 'mix'
): { status: string; name: string; state: Record<string, unknown> } | null {
  if (entity.type !== 'ingredient') return null;

  const stageMap: Record<string, string> = {
    wash: 'washed',
    peel: 'peeled',
    cut: 'cutted',
    cook: 'cooked',
    mix: 'mixed',
  };
  const stage = stageMap[transformation] || transformation;

  const currentTransformations = getTransformationsFromEntity(entity);

  // Idempotency: if already transformed with this stage, return null (no extra effect)
  if (currentTransformations.includes(stage)) {
    return null;
  }

  const updatedTransformations = [...currentTransformations, stage];

  // Base key derivation (e.g., 'onion', 'egg', 'tomatoes', 'potatoes')
  const rawBase = (entity.ingredientId || entity.id.split('_')[0] || 'ingredient').toLowerCase();

  // Create combined status string e.g., 'washed-onion', 'peeled-cutted-cooked-tomatoes'
  const newStatus = `${updatedTransformations.join('-')}-${rawBase}`;

  // Retrieve metadata for icon and base name
  const singularKey = getIngredientSingularKey(entity);
  const catalogItem = catalogIngredients.find(
    (i) => i.id === entity.ingredientId || i.id === rawBase || i.id === singularKey
  );

  const icon = catalogItem?.icon || (entity.name.match(/^(\p{Emoji}|\p{Extended_Pictographic})/u)?.[0] ?? '');
  let baseName = entity.name
    .replace(/^(\p{Emoji}|\p{Extended_Pictographic})\s*/u, '')
    .replace(/\b(Washed|Peeled|Cutted|Cut|Sliced|Diced|Cooked|Fried|Mixed)\b/gi, '')
    .trim();

  if (!baseName && catalogItem?.name) {
    baseName = catalogItem.name;
  }

  const titleCaseStage = (s: string) => {
    if (s === 'cutted') return 'Cut';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const formattedAdjectives = updatedTransformations.map(titleCaseStage).join(' ');
  const newName = `${icon} ${formattedAdjectives} ${baseName}`.trim();

  const updatedState = {
    ...entity.state,
    status: newStatus,
    transformations: updatedTransformations,
    preparation:
      stage === 'peeled'
        ? 'peeled'
        : stage === 'cutted'
        ? 'cut'
        : stage === 'washed'
        ? 'washed'
        : (entity.state?.preparation as string),
    cooking: stage === 'cooked' ? 'cooked' : (entity.state?.cooking as string),
  };

  return {
    status: newStatus,
    name: newName,
    state: updatedState,
  };
}
