/**
 * FILE: cooking.ts
 *
 * PURPOSE:
 * Handles cooking transformations and entity state changes.
 *
 * RESPONSIBILITY:
 * - Performs cutting transformations (Knife + Cutting Board).
 * - Performs cooking/frying transformations (Pan + Heat).
 * - Updates entity state and names according to cooking rules.
 *
 * SHOULD NOT:
 * - Contain UI code.
 */

import { worldStore } from '../store/worldStore';
import type { WorldState } from '../types/world';

export type CutState = 'whole' | 'sliced' | 'diced';
export type CookState = 'raw' | 'cooking' | 'fried' | 'burnt';

/**
 * Cuts an ingredient on a cutting board using a knife tool.
 */
export function cutIngredient(
  boardContainerId: string,
  targetEntityId: string,
  targetCutState: CutState = 'diced'
): boolean {
  const state: WorldState = worldStore.getState();
  const board = state.containers[boardContainerId];
  const targetEntity = state.entities[targetEntityId];

  if (!board || !targetEntity || !board.entityIds.includes(targetEntityId)) {
    return false;
  }

  // Check if container has a knife tool present
  const hasKnife = board.entityIds.some((id) => {
    const e = state.entities[id];
    return e && e.type === 'tool' && (e.id.includes('knife') || e.name.toLowerCase().includes('knife'));
  });

  if (!hasKnife) {
    return false;
  }

  const currentCut = (targetEntity.state?.cutState as string) || 'whole';
  if (currentCut === targetCutState) {
    return false;
  }

  const newName = targetCutState === 'diced' ? `Diced ${targetEntity.name.replace(/^Diced\s+/, '')}` : targetEntity.name;

  state.dispatch({
    type: 'TRANSFORM_ENTITY',
    payload: {
      entityId: targetEntityId,
      newState: {
        cutState: targetCutState,
        name: newName,
      },
    },
  });

  return true;
}

/**
 * Advances the cooking state of all ingredients inside a cooking container (e.g. pan).
 */
export function cookContainerIngredients(panContainerId: string): void {
  const state: WorldState = worldStore.getState();
  const pan = state.containers[panContainerId];
  if (!pan) return;

  pan.entityIds.forEach((entityId) => {
    const entity = state.entities[entityId];
    if (!entity || entity.type !== 'ingredient') return;

    const currentCook: CookState = (entity.state?.cookState as CookState) || 'raw';
    let nextCook: CookState = currentCook;

    if (currentCook === 'raw') nextCook = 'cooking';
    else if (currentCook === 'cooking') nextCook = 'fried';
    else if (currentCook === 'fried') nextCook = 'burnt';

    if (nextCook !== currentCook) {
      let prefix = '';
      if (nextCook === 'fried') prefix = 'Fried ';
      else if (nextCook === 'burnt') prefix = 'Burnt ';

      const baseName = entity.name.replace(/^(Diced|Raw|Fried|Burnt)\s+/, '');
      const cutPrefix = entity.state?.cutState === 'diced' ? 'Diced ' : '';
      const updatedName = `${prefix}${cutPrefix}${baseName}`;

      state.dispatch({
        type: 'TRANSFORM_ENTITY',
        payload: {
          entityId,
          newState: {
            cookState: nextCook,
            name: updatedName,
          },
        },
      });
    }
  });
}
