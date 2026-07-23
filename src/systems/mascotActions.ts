/**
 * FILE: mascotActions.ts
 *
 * PURPOSE:
 * Action dispatcher helpers for mascot (Tortilla) commands.
 *
 * RESPONSIBILITY:
 * - Provides reusable, generic action dispatchers for AI agents or UI triggers.
 * - Handles tortilla movement, grabbing ingredients from containers, dropping ingredients into containers, and flipping.
 */

import { worldStore } from '../store/worldStore';

/**
 * Triggers Tortilla flip animation and records action in store.
 */
export function flipTortilla(mascotId: string = 'chef'): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_FLIP',
    payload: { mascotId },
  });
}

/**
 * Moves Tortilla gaze/focus to a specific container in the world.
 */
export function moveTortillaTo(targetContainerId: string, mascotId: string = 'chef'): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_MOVE',
    payload: { mascotId, targetContainerId },
  });
}

/**
 * Commands Tortilla to grab/pick up an ingredient from a container.
 */
export function grabIngredient(
  entityId: string,
  sourceContainerId?: string,
  mascotId: string = 'chef'
): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_GRAB',
    payload: { mascotId, entityId, sourceContainerId },
  });
}

/**
 * Commands Tortilla to drop the currently held ingredient into a target container.
 */
export function dropIngredient(
  targetContainerId: string,
  positionIndex?: number,
  mascotId: string = 'chef'
): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_DROP',
    payload: { mascotId, targetContainerId, positionIndex },
  });
}
